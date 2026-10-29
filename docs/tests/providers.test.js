import { test } from 'node:test';
import assert from 'node:assert/strict';
import { object } from '../src/schema.js';
import { endpointUrl, validateProfile } from '../src/provider-profile-store.js';
import { LocalHttpProvider, parseCompletion, testEndpoint, discoverModels, parseModels } from '../src/local-http-provider.js';
import { ChromeProvider } from '../src/chrome-provider.js';
import { SessionManager } from '../src/session-manager.js';
import { AgentLoop, responseSchema, systemPrompt } from '../src/agent.js';
import { harness, call, final } from './helpers.js';
const profile=()=>({profileId:'profile',revision:1,label:'Local',baseUrl:'http://localhost:11434/v1/',model:'test-local',protocol:'openai_chat',schemaMode:'json_schema',contextWindowTokens:32768,inputCharLimit:24000,maxOutputTokens:2048,timeoutMs:5000});
const envelope=(action=final('ready'))=>({choices:[{index:0,message:{role:'assistant',content:JSON.stringify(action)},finish_reason:'stop'}],usage:{prompt_tokens:40,completion_tokens:10,total_tokens:50}});
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json'}});
const schema=object({type:{type:'string',const:'final'},message:{type:'string',minLength:1,maxLength:4000}},['type','message']);
const route=fallback=>({routeId:'route',revision:1,label:'Local',primary:'local_http',endpointProfileId:'profile',fallback});

test('model discovery uses authenticated bounded GET with inference URL restrictions and exact sorted IDs',async()=>{
  let request;
  const ids=await discoverModels({baseUrl:profile().baseUrl,token:'session-secret',fetchImpl:async(url,options)=>{
    request={url,options};return json({object:'list',data:[{id:'zeta',other:'ignored'},{id:'alpha'},{id:'zeta'},{id:' spaced '}]});
  }});
  assert.deepEqual(ids,[' spaced ','alpha','zeta']);assert.equal(request.url,'http://localhost:11434/v1/models');
  assert.equal(request.options.method,'GET');assert.equal(request.options.mode,'cors');assert.equal(request.options.credentials,'omit');assert.equal(request.options.redirect,'error');assert.equal(request.options.cache,'no-store');
  assert.deepEqual(request.options.headers,{Accept:'application/json',Authorization:'Bearer session-secret'});assert(!Object.hasOwn(request.options,'body'));
  await assert.rejects(discoverModels({baseUrl:'https://example.com/v1/',fetchImpl:()=>assert.fail('Must validate URL first')}),/loopback/);
  assert.deepEqual(parseModels({data:[]}),[]);
  for(const body of [{}, {data:null}, {data:[{}]}, {data:[{id:' '}]}, {data:[{id:4}]}, {data:[{id:'x'.repeat(201)}]}, {data:[{id:'bad\nname'}]}, {data:Array.from({length:1001},()=>({id:'a'}))}])assert.throws(()=>parseModels(body),/models data array/);
});

test('discovery errors remain sanitized and do not fall back or infer',async()=>{
  for(const status of [401,403,404,503]){
    await assert.rejects(discoverModels({baseUrl:profile().baseUrl,fetchImpl:async()=>json({error:'PRIVATE ERROR BODY'},status)}),e=>e.message.includes(`HTTP ${status}`)&&!e.message.includes('PRIVATE')&&!e.recoverable);
  }
  for(const response of [new Response('not json',{headers:{'content-type':'text/html'}}),new Response('{',{headers:{'content-type':'application/json'}}),new Response('x'.repeat(1024*1024+1),{headers:{'content-type':'application/json'}})])await assert.rejects(discoverModels({baseUrl:profile().baseUrl,fetchImpl:async()=>response}),/JSON|MiB/);
  await assert.rejects(discoverModels({baseUrl:profile().baseUrl,fetchImpl:async()=>{throw new TypeError('PRIVATE NETWORK DETAIL');}}),e=>e.code==='network'&&!e.message.includes('PRIVATE'));
});

test('discovery timeout and cancellation discard a transport which ignores abort',async t=>{
  t.mock.timers.enable({apis:['setTimeout']});
  let resolve;
  const c=new AbortController(),waiting=discoverModels({baseUrl:profile().baseUrl,fetchImpl:()=>new Promise(r=>{resolve=r;})},c.signal);
  const rejected=assert.rejects(waiting,{name:'AbortError'});c.abort();await rejected;resolve(json({data:[{id:'late'}]}));
  const timed=discoverModels({baseUrl:profile().baseUrl,timeoutMs:5000,fetchImpl:()=>new Promise(()=>{})});const timeout=assert.rejects(timed,e=>e.code==='timeout');t.mock.timers.tick(5001);await timeout;
});

test('endpoint URL and closed profile reject public hosts, LAN HTTP, userinfo and path/query tricks',()=>{
  for(const base of ['http://localhost:11434/v1/','http://127.0.0.1:8000/v1/','https://[::1]/v1/'])assert.match(endpointUrl(base),/chat\/completions$/);
  assert.match(endpointUrl('https://192.168.1.5/v1/',{allowLan:true}),/^https:/);
  for(const base of ['http://192.168.1.5/v1/','https://192.168.1.5/v1/','https://example.com/v1/','https://api.openai.com/v1/','http://user:pass@localhost/v1/','http://localhost/v1/?token=secret','http://localhost/v1/#fragment','http://localhost/v1','http://localhost/%2f/v1/','file:///v1/'])assert.throws(()=>endpointUrl(base));
  assert.throws(()=>validateProfile({...profile(),token:'secret'}));
  assert.throws(()=>validateProfile({...profile(),maxOutputTokens:8192,contextWindowTokens:1024}));
});

test('HTTP serialization has exact schema/messages, no native tools, omitted credentials, no redirects, and sanitized usage',async()=>{
  const sent=[];const p=new LocalHttpProvider({profile:profile(),token:'session-secret',fetchImpl:async(url,options)=>{sent.push({url,options});return json({...envelope(),reasoning_content:'NEVER LOG',extra:'metadata'});}});
  const messages=[{role:'system',content:'Rules'},{role:'user',content:'Earlier'},{role:'assistant',content:'Earlier response'}];
  const result=await p.generate('Next',schema,{messages});const request=sent[0],body=JSON.parse(request.options.body);
  assert.equal(request.url,'http://localhost:11434/v1/chat/completions');assert.equal(request.options.credentials,'omit');assert.equal(request.options.redirect,'error');assert.equal(request.options.cache,'no-store');
  assert.equal(request.options.headers.Authorization,'Bearer session-secret');assert(!request.options.body.includes('session-secret'));
  assert.deepEqual(body.messages,[...messages,{role:'user',content:'Next'}]);assert.deepEqual(body.response_format.json_schema.schema,schema);assert.equal(body.stream,false);assert.equal(body.n,1);assert(!Object.hasOwn(body,'tools'));assert(!Object.hasOwn(body,'tool_choice'));
  assert.equal(result.identity.model,'test-local');assert.equal(result.usage.input,40);assert(!JSON.stringify(result).includes('NEVER LOG'));
  p.dispose();assert.equal(p.token,'');
});

test('HTTP envelopes reject native calls, refusal, length, invalid usage, extra choices and oversized bodies',async()=>{
  const changes=[b=>b.choices.push(b.choices[0]),b=>b.choices[0].index=1,b=>b.choices[0].finish_reason='length',b=>b.choices[0].message.tool_calls=[],b=>b.choices[0].message.function_call={},b=>b.choices[0].message.refusal='no',b=>b.choices[0].message.content='',b=>b.choices[0].message.content='x'.repeat(48001),b=>b.choices[0].message.role='user',b=>b.usage.prompt_tokens=-1];
  for(const mutate of changes){const body=envelope();mutate(body);assert.throws(()=>parseCompletion(body));}
  const missing=parseCompletion({choices:envelope().choices});assert.equal(missing.usage.provenance,'unknown');assert.equal(missing.usage.input,null);
  for(const response of [new Response('<html>Error</html>',{headers:{'content-type':'text/html'}}),new Response('x'.repeat(1024*1024+1),{headers:{'content-type':'application/json'}}),new Response('{',{headers:{'content-type':'application/json'}})]) {
    const p=new LocalHttpProvider({profile:profile(),fetchImpl:async()=>response});await assert.rejects(p.generate('Test',schema,{messages:[]}),/JSON|MiB/);
  }
});

test('HTTP input bound stops before fetch and permission failures never become recoverable fallback',async()=>{
  let requests=0;const p=new LocalHttpProvider({profile:profile(),fetchImpl:async()=>{requests++;return json({},403);}});
  await assert.rejects(p.generate('x'.repeat(25000),schema,{messages:[]}),e=>e.code==='context_limit');assert.equal(requests,0);
  await assert.rejects(p.generate('hello',schema,{messages:[]}),e=>e.code==='permission_denied'&&!e.recoverable);assert.equal(requests,1);
});

test('timeout and Stop reject an endpoint which ignores abort; late results cannot continue',async t=>{
  t.mock.timers.enable({apis:['setTimeout']});
  const p=new LocalHttpProvider({profile:profile(),fetchImpl:()=>new Promise(()=>{})});
  const waiting=p.generate('hello',schema,{messages:[]});const rejected=assert.rejects(waiting,e=>e.code==='timeout');
  t.mock.timers.tick(5001);await rejected;
  const c=new AbortController();const stopped=p.generate('hello',schema,{messages:[]},c.signal);const aborted=assert.rejects(stopped,{name:'AbortError'});c.abort();await aborted;
});

test('Connect/Test is limited to three harmless schema probes without tool execution',async()=>{
  let count=0;const p=new LocalHttpProvider({profile:profile(),fetchImpl:async(_,options)=>{
    count++;const body=JSON.parse(options.body);assert.match(body.messages[0].content,/Harmless/);
    return json(envelope(count===2?{version:1,values:['ready'],optional:null}:final('ready')));
  }});
  const result=await testEndpoint(p,schema);assert.equal(result.status,'ready');assert.equal(count,3);assert.equal(result.schemaSignature,JSON.stringify(schema));
  const bad=new LocalHttpProvider({profile:profile(),fetchImpl:async()=>json(envelope({wrong:'shape'}))});await assert.rejects(testEndpoint(bad,schema),/structured-output/);
});

test('Chrome measures the exact next input/schema, uses actual capacity and never guesses 9216',async()=>{
  let measured;const p=new ChromeProvider({api:{create:()=>({contextWindow:8192,contextUsage:200,measureContextUsage:(input,options)=>{measured={input,options};return 300;},prompt:async()=>JSON.stringify(final('ok')),destroy(){}})}});
  await p.prepare([{role:'system',content:'rules'}]);const m=await p.measure({input:'next',responseSchema:schema});
  assert.equal(m.capacity,8192);assert.equal(m.reserve,1639);assert.equal(m.provenance,'measured');assert.equal(measured.input,'next');assert.equal(measured.options.responseConstraint,schema);p.dispose();
  const unknown=new ChromeProvider({api:{create:()=>({prompt(){},destroy(){}})}});await unknown.prepare([]);
  assert.equal((await unknown.measure({input:'next',responseSchema:schema})).capacity,null);unknown.dispose();
});

test('measured capacity and schema overhead stop generation before tools, and overflow invalidates the session',async t=>{
  const {registry}=await harness(t);let prompts=0;
  const native=Object.assign(new EventTarget(),{contextWindow:1000,contextUsage:500,measureContextUsage:async()=>400,prompt:async()=>{prompts++;return JSON.stringify(call('add_item',{title:'Must not save'}));},destroy(){}});
  const manager=new SessionManager({api:{create:()=>native}});await manager.prepare([{role:'system',content:'rules'}]);
  const agent=new AgentLoop({registry,session:manager});assert.equal((await agent.run('Add')).status,'model_error');assert.equal(prompts,0);
  native.contextWindow=2000;native.dispatchEvent(new Event('contextoverflow'));
  assert.equal((await agent.run('Add')).status,'model_error');assert.equal(prompts,0);assert.equal((await registry.execute('list_items',{})).total,0);
});

test('failed HTTP inference → Chrome reconstruction keeps committed receipts, does not replay writes, and counts failure',async t=>{
  const {registry}=await harness(t),actionSchema=responseSchema(registry.definitions());let http=0,chrome=0,initial;
  const manager=new SessionManager({route:route('automatic'),profile:profile(),testedSchemaSignature:JSON.stringify(actionSchema),fetchImpl:async()=>++http===1?json(envelope(call('add_item',{title:'Once'}))):json({},503),api:{availability:async()=> 'available',create:opts=>{initial=opts.initialPrompts;return{destroy(){},prompt:async input=>{chrome++;assert.equal(JSON.parse(input).result.item.title,'Once');assert(JSON.parse(input).result.operationReceiptId);return JSON.stringify(final('Saved once.'));}};}}});
  await manager.prepare([{role:'system',content:systemPrompt(registry.definitions())}],{responseSchema:actionSchema});
  const result=await new AgentLoop({registry,session:manager}).run('Add Once');
  assert.equal(result.status,'completed',result.text);assert.equal(result.iterations,3);assert.equal(http,2);assert.equal(chrome,1);assert.equal((await registry.execute('list_items',{})).total,1);
  assert.equal(initial.filter(m=>m.role==='assistant').length,1);assert(initial.some(m=>m.role==='user'&&JSON.parse(m.content).request==='Add Once'));assert.equal(result.trace.filter(e=>e.type==='provider_fallback').length,1);
});

test('fallback ask waits for explicit choice; off/auth/cancel/exhaustion never switch providers',async t=>{
  const {registry}=await harness(t),actionSchema=responseSchema(registry.definitions());
  for(const [fallback,status,max] of [['off',503,12],['automatic',403,12],['automatic',503,1]]){
    let creates=0;const m=new SessionManager({route:route(fallback),profile:profile(),testedSchemaSignature:JSON.stringify(actionSchema),fetchImpl:async()=>json({},status),api:{availability:async()=> 'available',create(){creates++;throw new Error('Unexpected fallback');}}});
    await m.prepare([],{responseSchema:actionSchema});await new AgentLoop({registry,session:m,maxIterations:max}).run('Help');assert.equal(creates,0);
  }
  let choice;const waiting=new Promise(r=>{choice=r;});let called=0;
  const m=new SessionManager({route:route('ask'),profile:profile(),testedSchemaSignature:JSON.stringify(actionSchema),fetchImpl:async()=>json({},503),requestFallback:async info=>{called++;await waiting;return info.create();},api:{create:()=>({destroy(){},prompt:async()=>JSON.stringify(final('Continued'))})}});
  await m.prepare([],{responseSchema:actionSchema});const running=new AgentLoop({registry,session:m}).run('Help');
  while(!called)await new Promise(r=>setImmediate(r));assert.equal(m.identity.provider,'local_http');choice();assert.equal((await running).iterations,2);
});
