import { test } from 'node:test';
import assert from 'node:assert/strict';
import { harness, scriptedSession, call, final } from './helpers.js';
import { UserInputBroker } from '../src/user-input-broker.js';
import { validateQuestionRequest, canonicalAnswers, validateQuestionResult } from '../src/user-input-contract.js';
import { createChatExecutor } from '../src/chat-executor.js';
import { AgentLoop, systemPrompt } from '../src/agent.js';
import { registerWebMCP } from '../src/tools.js';

export const question = () => ({ version: 1, title: 'Choose a task', questions: [{ id: 'task', header: 'Task', question: 'Which task?', mode: 'single', required: true, allowCustomAnswer: true,
  options: [{ id: 'read', label: 'Read book', description: 'Task #1', recommended: true }, { id: 'write', label: 'Write book', description: 'Task #2' }] }] });
const submission = id => ({ requestId: id, answers: [{ questionId: 'task', kind: 'choice', optionIds: ['write'] }] });
const ready = () => { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; };

test('question contract rejects incompatible modes, duplicate IDs/labels, bad versions, extra fields, and oversize text', () => {
  validateQuestionRequest(question());
  const mutations = [q=>q.version=2, q=>q.questions=[], q=>q.extra=true, q=>q.questions[0].id='bad.id', q=>q.questions.push(q.questions[0]), q=>q.questions[0].options[1].id='read', q=>q.questions[0].options[1].label=' READ BOOK ', q=>q.questions[0].options[1].recommended=true, q=>q.questions[0].mode='text', q=>q.questions[0].options.pop(), q=>q.questions[0].question=' ', q=>q.questions[0].question='x'.repeat(601), q=>q.questions[0].options[0].callback='write()'];
  for (const mutate of mutations) { const q=question(); mutate(q); assert.throws(()=>validateQuestionRequest(q)); }
});

test('all answer routes validate semantics and preserve only active canonical answers', () => {
  const q=question(); q.questions[0].mode='multi'; q.questions.push({id:'note',header:'Note',question:'Any note?',mode:'text',required:false,allowCustomAnswer:false,options:[]});
  const result=canonicalAnswers(q,{requestId:'request',answers:[{questionId:'note',kind:'text',text:'  line one\nline two  '},{questionId:'task',kind:'choice',optionIds:['write','read']}]});
  assert.deepEqual(result.answers,[{questionId:'task',kind:'choice',optionIds:['read','write']},{questionId:'note',kind:'text',text:'line one\nline two'}]);
  const skipped=canonicalAnswers(q,{requestId:'request',answers:[{questionId:'task',kind:'text',text:'  Another task  '},{questionId:'note',kind:'skipped'}]});
  assert.equal(skipped.answers[0].text,'Another task');
  const cases=[
    [[], 'missing_answer'], [[{questionId:'task',kind:'choice',optionIds:['absent']}],'unknown_option'],
    [[{questionId:'task',kind:'choice',optionIds:['write','read']}],'invalid_count'], [[{questionId:'task',kind:'skipped'}],'skip_not_allowed'],
    [[{questionId:'task',kind:'text',text:' '}],'text_required'], [[{questionId:'task',kind:'text',text:'x'.repeat(2001)}],'text_too_long'],
    [[{questionId:'task',kind:'choice',optionIds:['read','read']}],'invalid_count'], [[{questionId:'other',kind:'skipped'}],'unknown_question'],
    [[{questionId:'task',kind:'text',text:'valid',extra:'hidden'}],'invalid_kind'],
  ];
  for(const [answers,code] of cases) assert(canonicalAnswers(question(),{requestId:'r',answers}).errors.some(e=>e.code===code),code);
  assert(!canonicalAnswers(question(),{requestId:'r',answers:[{questionId:'task',kind:'text',text:'x'.repeat(2000)}]}).errors);
  const fixed=question();fixed.questions[0].allowCustomAnswer=false;
  assert.equal(canonicalAnswers(fixed,{requestId:'r',answers:[{questionId:'task',kind:'text',text:'Other'}]}).errors[0].code,'invalid_kind');
});

test('broker waits, freezes arguments, rejects stale/invalid/duplicate answers, and settles exactly once', async () => {
  const broker=new UserInputBroker(),events=[];broker.beginRun('run',{emit:e=>events.push(e)});
  const args=question(),pending=broker.request(args);args.title='Mutated';
  const id=events[0].requestId; assert.equal(events[0].arguments.title,'Choose a task'); assert(Object.isFrozen(events[0].arguments.questions));
  assert.equal(broker.submit(submission('old')).accepted,false);
  assert.equal(broker.submit({requestId:id,answers:[]}).accepted,false);
  assert.equal((await broker.request(question())).code,'busy');
  assert.equal(broker.submit(submission(id)).accepted,true);
  const result=await pending;validateQuestionResult(events[0].arguments,result);
  assert.equal(broker.submit(submission(id)).accepted,false);
  assert.deepEqual(events.map(e=>e.type),['user_input_requested','user_input_submitted']);
  broker.endRun('other');assert(broker.run);broker.endRun('run');assert.equal(broker.run,null);
});

test('abort, disposal, already-aborted requests, host exceptions and run ownership do not orphan promises', async () => {
  for(const mode of ['abort','dispose','end']) {
    const broker=new UserInputBroker(),controller=new AbortController(),events=[];
    broker.beginRun('run',{emit:e=>events.push(e)});
    const pending=broker.request(question(),{signal:controller.signal});
    const rejected=assert.rejects(pending,{name:'AbortError'});
    if(mode==='abort')controller.abort();else if(mode==='dispose')broker.dispose();else broker.endRun('run');
    await rejected;assert.equal(events.at(-1).type,'user_input_cancelled');assert.equal(broker.pending,null);
    assert.equal(broker.submit(submission(events[0].requestId)).accepted,false);broker.dispose();
  }
  const broker=new UserInputBroker();broker.beginRun('run',{emit(){throw new Error('Host missing');}});
  await assert.rejects(broker.request(question()),/Host missing/);assert.equal(broker.pending,null);
  const c=new AbortController();c.abort();assert.throws(()=>broker.request(question(),{signal:c.signal}),{name:'AbortError'});
  assert.throws(()=>broker.beginRun('second',{emit(){}}),/busy/);broker.dispose();
});

test('search → question → answer → fresh read → selected write → final stays in one bounded run', async t => {
  const {registry}=await harness(t);await registry.execute('add_item',{title:'Read book'});await registry.execute('add_item',{title:'Write book'});
  const broker=new UserInputBroker(),executor=createChatExecutor(registry,broker),waiting=ready(),inputs=[];
  const session=scriptedSession([call('search_items',{query:'book',status:'open'}),call('request_user_input',question()),input=>{
    const packet=JSON.parse(input);assert.equal(packet.kind,'tool_result');assert.equal(packet.request,'book is done');assert.equal(packet.arguments.questions[0].options[1].id,'write');assert.equal(packet.result.answers[0].optionIds[0],'write');assert(packet.localDate);
    return call('search_items',{query:'book',status:'open'});
  },call('complete_item',{id:2}),final('Completed Write book.')],inputs);
  const agent=new AgentLoop({registry:executor,session,interactionBroker:broker,onEvent:e=>{if(e.type==='user_input_requested')waiting.resolve(e);}});
  const running=agent.run('book is done');const event=await waiting.promise;
  assert.equal(inputs.length,2);assert.equal(agent.busy,true);assert.equal((await registry.execute('list_items',{})).items.filter(x=>x.completed).length,0);
  broker.submit(submission(event.requestId));assert.equal(broker.submit(submission(event.requestId)).accepted,false);
  const result=await running;assert.equal(result.status,'completed');assert.equal(result.iterations,5);assert.equal(inputs.length,5);
  const items=(await registry.execute('list_items',{})).items;assert.equal(items.find(i=>i.id===1).completed,false);assert.equal(items.find(i=>i.id===2).completed,true);
  assert(!/return a final question/.test(systemPrompt(executor.definitions())));
});

test('question on final iteration opens no card; submission followed immediately by Stop causes no continuation', async t => {
  const {registry}=await harness(t),broker=new UserInputBroker();let requested=0;
  const agent=new AgentLoop({registry:createChatExecutor(registry,broker),session:scriptedSession([call('request_user_input',question())]),interactionBroker:broker,maxIterations:1,onEvent:e=>{if(e.type==='user_input_requested')requested++;}});
  assert.equal((await agent.run('Help choose')).status,'max_iterations');assert.equal(requested,0);
  const controller=new AbortController(),inputs=[];
  const next=new AgentLoop({registry:createChatExecutor(registry,broker),interactionBroker:broker,session:scriptedSession([call('request_user_input',question())],inputs),onEvent:e=>{if(e.type==='user_input_requested'){broker.submit(submission(e.requestId));controller.abort();}}});
  assert.equal((await next.run('Choose',{signal:controller.signal})).status,'cancelled');assert.equal(inputs.length,1);
});

test('question remains local around native WebMCP dispatch and never registers externally', async t => {
  const {registry}=await harness(t),registered=new Map();let native=0;
  const context={registerTool:tool=>registered.set(tool.name,tool),getTools:()=>[...registered.values()],executeTool:async(tool,args,opts)=>{native++;return registered.get(tool.name).execute(args,opts);}};
  const connection=await registerWebMCP(registry,{context}),broker=new UserInputBroker();
  const executor=createChatExecutor(connection.executor,broker);assert.equal(executor.definitions().length,6);assert.equal(registered.size,5);assert(!registered.has('request_user_input'));
  await executor.execute('add_item',{title:'Native'});assert.equal(native,1);
  broker.beginRun('run',{emit:e=>{if(e.type==='user_input_requested')broker.submit(submission(e.requestId));}});
  assert.equal((await executor.execute('request_user_input',question())).status,'answered');assert.equal(native,1);broker.endRun('run');
});
