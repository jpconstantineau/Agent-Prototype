import { test } from 'node:test';
import assert from 'node:assert/strict';
import { harness, scriptedSession, call, final } from './helpers.js';
import { TodoStore } from '../src/store.js';
import { RuntimeStore } from '../src/runtime-store.js';
import { ProviderProfileStore } from '../src/provider-profile-store.js';
import { AgentLoop } from '../src/agent.js';
import { ToolPolicy } from '../src/runtime.js';
import { ToolRegistry, registerWebMCP } from '../src/tools.js';

test('task changes, attribution receipt, stable identity, and outbox commit atomically and survive reload',async t=>{
  const {store,name}=await harness(t),runtime=new RuntimeStore(store.db),identity=await runtime.get('settings','local-identity');
  const registry=new ToolRegistry(store,{identity});
  const added=await registry.execute('add_item',{title:'Durable'},{context:{runId:'run',threadId:'thread',operationId:'operation'}});
  assert(added.operationReceiptId);assert(added.item.stableId);assert.equal(added.item.revision,1);
  const receipt=await runtime.get('operations',added.operationReceiptId),outbox=await runtime.get('outbox',added.operationReceiptId);
  assert.equal(receipt.runId,'run');assert.equal(receipt.actor,'main_agent');assert.equal(receipt.ownerId,identity.ownerId);assert.equal(outbox.payload.id,added.item.id);
  const updated=await registry.execute('edit_item',{id:added.item.id,notes:'Updated'});assert.equal(updated.item.revision,2);assert.equal(updated.item.stableId,added.item.stableId);
  store.close();const reopened=await TodoStore.open(name,{broadcast:false});t.after(()=>reopened.close());
  assert.equal((await reopened.list()).items[0].stableId,added.item.stableId);
  assert.equal((await new RuntimeStore(reopened.db).get('operations','operation')).runId,'run');
});

test('duplicate operation ID rolls back rather than repeating a mutation or allocating a task',async t=>{
  const {store,registry}=await harness(t);const options={context:{operationId:'same-operation'}};
  await registry.execute('add_item',{title:'Once'},options);
  await assert.rejects(registry.execute('add_item',{title:'Twice'},options));
  assert.equal((await store.list()).total,1);
});

test('schema-v2 migration preserves numeric handles/data and allocates independent stable IDs',async t=>{
  const name=`v2-${crypto.randomUUID()}`;
  await new Promise((resolve,reject)=>{const r=indexedDB.open(name,2);r.onupgradeneeded=()=>{const s=r.result.createObjectStore('items',{keyPath:'id',autoIncrement:true});s.createIndex('createdAt','createdAt');s.add({id:17,title:'Old task',notes:'Keep',priority:'normal',completed:false,dueDate:'',createdAt:'2026-01-01',updatedAt:'2026-01-01',completedAt:null});};r.onsuccess=()=>{r.result.close();resolve();};r.onerror=()=>reject(r.error);});
  const store=await TodoStore.open(name,{broadcast:false});t.after(()=>store.close());
  const task=(await store.list()).items[0];assert.equal(task.id,17);assert.equal(task.title,'Old task');assert.equal(task.notes,'Keep');assert.equal(task.revision,1);assert(task.stableId);
  assert.equal((await store.add({title:'Next'})).item.id,18);
});

test('the same eligibility gate covers model catalog, dispatch, stale WebMCP and manual exceptions',async t=>{
  const {store}=await harness(t),policy=new ToolPolicy(),registry=new ToolRegistry(store,{policy}),registered=new Map();
  const connection=await registerWebMCP(registry,{context:{registerTool:t=>registered.set(t.name,t),unregisterTool:name=>registered.delete(name)}});
  const stale=registered.get('add_item');policy.setEnabled('add_item',false);
  assert.equal(registered.has('add_item'),false);assert(!registry.definitions().some(t=>t.name==='add_item'));
  assert.equal((await registry.execute('add_item',{title:'Denied'})).code,'disabled');assert.equal(JSON.parse(await stale.execute({title:'Denied too'})).code,'disabled');
  assert.equal((await registry.execute('add_item',{title:'Human'},{actor:'human'})).success,true);assert.equal((await store.list()).total,1);connection.dispose();
});

test('policy changed after generation prevents dispatch; unexpected exceptions stop instead of inventing tool results',async t=>{
  const {store}=await harness(t),policy=new ToolPolicy(),registry=new ToolRegistry(store,{policy});
  const session=scriptedSession([()=>{policy.setEnabled('add_item',false);return call('add_item',{title:'Blocked'});}]);
  assert.equal((await new AgentLoop({registry,session,policy}).run('Add')).status,'policy_changed');assert.equal((await store.list()).total,0);
  const broken=new ToolRegistry({add(){throw new Error('Unexpected failure');}});await assert.rejects(broken.execute('add_item',{title:'No false result'}),/Unexpected/);
});

test('visible prompts, schema, raw actions, tool receipts and final run status are persisted separately from history',async t=>{
  const {store,registry}=await harness(t),runtime=new RuntimeStore(store.db);
  const result=await new AgentLoop({registry,runtime,session:scriptedSession([call('add_item',{title:'Logged'}),final('Saved')])}).run('Add Logged');
  assert.equal(result.status,'completed');const events=await runtime.events(result.runId);
  assert(events.some(e=>e.type==='inference_start'&&e.responseSchema.anyOf&&JSON.parse(e.input).kind==='user_request'));
  assert(events.some(e=>e.type==='inference_result'&&JSON.parse(e.text).name==='add_item'));
  assert(events.some(e=>e.type==='tool_result'&&e.result.operationReceiptId));assert.equal((await runtime.get('agentRuns',result.runId)).status,'completed');
});

test('diagnostic storage failure prevents further inference or writes',async t=>{
  const {registry}=await harness(t);let calls=0;
  const runtime={put:async()=>{},record:async()=>{throw new Error('Quota');}};
  const result=await new AgentLoop({registry,runtime,session:{prompt:async()=>{calls++;return JSON.stringify(call('add_item',{title:'Must not save'}));}}}).run('Add');
  assert.equal(result.status,'model_error');assert.match(result.text,/Diagnostic storage/);assert.equal(calls,0);assert.equal((await registry.execute('list_items',{})).total,0);
});

test('device settings reject stale revisions and never persist credentials',async t=>{
  const {store}=await harness(t),runtime=new RuntimeStore(store.db),profiles=new ProviderProfileStore(runtime),initial=await profiles.load();
  const saved=await profiles.save({route:initial.route,profile:null,allowLan:false},0);assert.equal(saved.version,1);
  await assert.rejects(profiles.save({route:{...initial.route,revision:2},profile:null,allowLan:false},0),e=>e.code==='conflict');
  assert(!JSON.stringify(await runtime.get('settings','device-model-route')).includes('token'));
});

test('revocation during an IndexedDB write aborts both task and receipt before commit',async t=>{
  const {store}=await harness(t),policy=new ToolPolicy(),registry=new ToolRegistry(store,{policy});
  const pending=registry.execute('add_item',{title:'Revoke while pending'});
  policy.setEnabled('add_item',false);
  assert.equal((await pending).code,'disabled');
  assert.equal((await store.list()).total,0);
  const runtime=new RuntimeStore(store.db);
  const all=await runtime.transaction(['operations'],'readonly',(tx,done)=>{const r=tx.objectStore('operations').getAll();r.onsuccess=()=>done(r.result);});
  assert.equal(all.length,0);
});

test('page-owned interruption updates only its active run and preserves original metadata',async t=>{
  const {store}=await harness(t),runtime=new RuntimeStore(store.db);
  await runtime.put('agentRuns',{id:'current',status:'running',acceptedAt:'original'});
  await runtime.put('agentRuns',{id:'other-tab',status:'running'});
  await runtime.interruptRun('current');
  assert.equal((await runtime.get('agentRuns','current')).status,'interrupted');assert.equal((await runtime.get('agentRuns','current')).acceptedAt,'original');
  assert.equal((await runtime.get('agentRuns','other-tab')).status,'running');
});
