import { test, expect } from '@playwright/test';
const q = () => ({ version: 1, title: 'Clarify this request', questions: [
  { id:'task',header:'Task',question:'Which task?',mode:'single',required:true,allowCustomAnswer:true,options:[{id:'read',label:'Read book',description:'Task #1',recommended:true},{id:'write',label:'Write book',description:'Task #2'}] },
] });
async function scriptedQuestion(page, request = q()) {
  await page.addInitScript(request => {
    window.modelInputs=[];
    Object.defineProperty(window,'LanguageModel',{configurable:true,value:{availability:async()=> 'available',create:async()=>({destroy(){},async prompt(input){
      window.modelInputs.push(input);
      if(window.modelInputs.length===1)return JSON.stringify({type:'tool_call',name:'request_user_input',arguments:request});
      const packet=JSON.parse(input);
      if(packet.kind!=='tool_result'||packet.name!=='request_user_input'||packet.request!=='Help choose')throw new Error('Answer became a new request');
      return JSON.stringify({type:'final',message:'Received '+JSON.stringify(packet.result.answers)});
    }})}});
  }, request);
  await page.goto('./');
  await page.getByRole('button',{name:'Enable local AI',exact:true}).click();
  await page.locator('#chat-input').fill('Help choose');
  await page.getByRole('button',{name:'Send message',exact:true}).click();
  await expect(page.locator('.question-card')).toBeVisible();
}

test('question waits for explicit submission, keeps draft when panel closes, and resumes once',async({page})=>{
  await scriptedQuestion(page);
  await expect(page.getByRole('heading',{name:'Clarify this request'})).toBeFocused();
  await expect(page.getByRole('button',{name:'Answer and continue'})).toBeDisabled();
  await expect(page.getByRole('radio',{name:/Read book/})).not.toBeChecked();
  await expect(page.locator('#new-chat')).toBeDisabled();
  await page.getByRole('radio',{name:/Write book/}).check();
  expect(await page.evaluate(()=>window.modelInputs.length)).toBe(1);
  await page.getByRole('button',{name:'Close assistant',exact:true}).click();
  await expect(page.getByRole('button',{name:'Assistant — Answer needed'})).toBeVisible();
  await page.getByRole('button',{name:'Assistant — Answer needed'}).click();
  await expect(page.getByRole('radio',{name:/Write book/})).toBeChecked();
  await page.getByRole('button',{name:'Answer and continue'}).click();
  await expect(page.locator('.question-summary')).toContainText('Task: Write book');
  await expect(page.locator('.assistant-message').last()).toContainText('"optionIds":["write"]');
  expect(await page.evaluate(()=>window.modelInputs.length)).toBe(2);
  await expect(page.locator('.task-row')).toHaveCount(0);
  await expect(page.locator('#chat-input')).toBeFocused();
});

test('typed custom, multi-choice, explicit skip and IME/native textarea behavior map to canonical answers',async({page})=>{
  const request=q();
  request.questions.push({id:'tags',header:'Tags',question:'Select tags',mode:'multi',required:true,allowCustomAnswer:true,options:[{id:'first',label:'First tag',description:''},{id:'second',label:'Second tag',description:''}]}, {id:'note',header:'Note',question:'Any note?',mode:'text',required:false,allowCustomAnswer:false,options:[]});
  await scriptedQuestion(page,request);
  await page.getByRole('radio',{name:'Other answer',exact:true}).check();
  const custom=page.getByRole('textbox',{name:'Your custom answer',exact:true}).first();
  await custom.fill('A different task');await custom.press('Enter');await custom.press('B');
  expect(await page.evaluate(()=>window.modelInputs.length)).toBe(1);
  await page.getByRole('checkbox',{name:'Second tag',exact:true}).check();
  await page.getByRole('checkbox',{name:'Use a custom answer instead'}).check();
  const multiCustom=page.getByRole('textbox',{name:'Your custom answer',exact:true}).last();await multiCustom.fill('Inactive hidden answer');
  await page.getByRole('checkbox',{name:'Use a custom answer instead'}).uncheck();
  await expect(page.getByRole('checkbox',{name:'Second tag',exact:true})).toBeChecked();
  await page.getByRole('button',{name:'Skip this question',exact:true}).click();
  await expect(page.getByRole('button',{name:'Answer and continue'})).toBeEnabled();
  await custom.dispatchEvent('compositionstart');await expect(page.getByRole('button',{name:'Answer and continue'})).toBeDisabled();
  await custom.dispatchEvent('compositionend');await page.getByRole('button',{name:'Answer and continue'}).click();
  const packet=await page.evaluate(()=>JSON.parse(window.modelInputs[1]));
  expect(packet.result.answers).toEqual([{questionId:'task',kind:'text',text:'A different task\nB'},{questionId:'tags',kind:'choice',optionIds:['second']},{questionId:'note',kind:'skipped'}]);
  expect(JSON.stringify(packet)).not.toContain('Inactive hidden answer');
});

test('Stop and reload release pending questions without sending drafts or changing tasks',async({page})=>{
  await scriptedQuestion(page);
  await page.getByRole('radio',{name:/Read book/}).check();
  await page.getByRole('button',{name:'Cancel request',exact:true}).click();
  await expect(page.locator('.question-summary')).toContainText('Cancelled');
  await expect(page.locator('.assistant-message').last()).toContainText('Stopped');
  expect(await page.evaluate(()=>window.modelInputs.length)).toBe(1);
  await expect(page.getByRole('button',{name:'Enable local AI',exact:true})).toBeVisible();
  await page.reload();await expect(page.locator('.question-card')).toHaveCount(0);
  await expect(page.locator('.task-row')).toHaveCount(0);
});

test('oversized paste is rejected without silently truncating the human answer',async({page})=>{
  const request=q();request.questions[0]={id:'title',header:'Title',question:'Which title?',mode:'text',required:true,allowCustomAnswer:false,options:[]};
  await scriptedQuestion(page,request);
  const input=page.getByRole('textbox',{name:'Your answer',exact:true});await input.fill('Keep this draft');
  const prevented=await input.evaluate(node=>{const data=new DataTransfer();data.setData('text/plain','x'.repeat(2001));const event=new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:data});node.dispatchEvent(event);return event.defaultPrevented;});
  expect(prevented).toBe(true);await expect(input).toHaveValue('Keep this draft');await expect(page.getByText('That paste exceeds 2000 characters.',{exact:false})).toBeVisible();
  await expect(page.getByRole('button',{name:'Answer and continue'})).toBeDisabled();await input.fill('Reviewed shorter title');
  await page.getByRole('button',{name:'Answer and continue'}).click();await expect(page.locator('.assistant-message').last()).toContainText('Reviewed shorter title');
});

test('question surface is safe text, has no horizontal overflow and works at mobile width',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const request=q();request.title='<img src=x onerror=alert(1)>';request.questions[0].options[0].label='Long label '+ 'word '.repeat(19);
  // Start a request from the open mobile panel.
  await page.addInitScript(request=>Object.defineProperty(window,'LanguageModel',{configurable:true,value:{availability:async()=> 'available',create:async()=>({destroy(){},prompt:async()=>JSON.stringify({type:'tool_call',name:'request_user_input',arguments:request})})}}),request);
  await page.goto('./');await page.getByRole('button',{name:'Assistant',exact:true}).click();
  await page.getByRole('button',{name:'Enable local AI',exact:true}).click();
  await page.locator('#chat-input').fill('Help choose');await page.getByRole('button',{name:'Send message',exact:true}).click();
  await expect(page.getByRole('heading',{name:request.title,exact:true})).toBeVisible();
  await expect(page.locator('.question-card img')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:'.tmp/foundation-question-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Stop',exact:true}).click();
});

async function configureLocal(page,{fallback='automatic',token=''}={}) {
  await page.route('http://localhost:11434/v1/models',route=>route.fulfill({contentType:'application/json',body:JSON.stringify({data:[{id:'local-test-model'}]})}));
  await page.getByRole('button',{name:'Model settings',exact:true}).click();
  await page.getByRole('combobox',{name:'Text model',exact:true}).selectOption('local_http');
  await page.getByLabel('I configured this endpoint to use a locally served, inference-only model',{exact:true}).check();
  if(token)await page.getByLabel('Session bearer token (optional)',{exact:true}).fill(token);
  await page.getByRole('button',{name:'Load models',exact:true}).click();
  await page.getByRole('combobox',{name:'Model',exact:true}).selectOption('local-test-model');
  await page.getByRole('combobox',{name:'Chrome fallback',exact:true}).selectOption(fallback);
  await page.getByRole('button',{name:'Save settings',exact:true}).click();
  await expect(page.locator('#endpoint-status')).toContainText('settings saved');
  await page.getByRole('button',{name:'Connect / Test',exact:true}).click();
  await expect(page.locator('#endpoint-status')).toHaveText(/Ready|Blocked/);
  expect(await page.locator('#endpoint-status').textContent(), await page.locator('[data-settings-error]').textContent()).toContain('Ready');
  await page.getByRole('button',{name:'Close model settings',exact:true}).click();
}
const body=action=>({choices:[{index:0,message:{role:'assistant',content:JSON.stringify(action)},finish_reason:'stop'}]});

test('local Settings probes do not execute tools; failed inference falls back once without repeating a committed mutation',async({page})=>{
  const requests=[];let main=0;
  await page.addInitScript(()=>Object.defineProperty(window,'LanguageModel',{configurable:true,value:{availability:async()=> 'available',create:async opts=>{
    window.chromeInitial=opts.initialPrompts;
    return{destroy(){},prompt:async input=>{window.chromeInput=JSON.parse(input);return JSON.stringify({type:'final',message:'Saved the task once using Chrome fallback.'});}};
  }}}));
  await page.route('http://localhost:11434/v1/chat/completions',async route=>{
    const packet=route.request().postDataJSON();requests.push({packet,headers:route.request().headers()});
    let action;
    if(requests.length===2)action={version:1,values:['ready'],optional:null};
    else if(requests.length===1)action={type:'final',message:'ready'};
    else if(requests.length===3)action={type:'tool_call',name:'request_user_input',arguments:q()};
    else if(++main===1)action={type:'tool_call',name:'add_item',arguments:{title:'Only once'}};
    else {await route.fulfill({status:503,contentType:'application/json',body:'{}'});return;}
    await route.fulfill({contentType:'application/json',body:JSON.stringify(body(action))});
  });
  await page.goto('./');await configureLocal(page,{token:'private-session-token'});
  expect(requests).toHaveLength(3);await expect(page.locator('.task-row')).toHaveCount(0);
  await page.getByRole('button',{name:'Enable local AI',exact:true}).click();
  await page.locator('#chat-input').fill('Add Only once');await page.getByRole('button',{name:'Send message',exact:true}).click();
  await expect(page.locator('.assistant-message').last()).toContainText('using Chrome fallback');
  await expect(page.locator('.task-row')).toHaveCount(1);await expect(page.locator('.task-title')).toHaveText('Only once');
  await expect(page.locator('#provider-status')).toContainText('Fallback to Chrome');
  expect(requests).toHaveLength(5);
  const state=await page.evaluate(async()=>{const{TodoStore}=await import('./src/store.js');const{RuntimeStore}=await import('./src/runtime-store.js');const store=await TodoStore.open();try{return{settings:await new RuntimeStore(store.db).get('settings','device-model-route'),events:await new RuntimeStore(store.db).events()};}finally{store.close();}});
  expect(JSON.stringify(state)).not.toContain('private-session-token');
  expect(state.events.filter(e=>e.type==='model')).toHaveLength(3);
  const resumed=await page.evaluate(()=>window.chromeInput);expect(resumed.result.item.title).toBe('Only once');expect(resumed.result.operationReceiptId).toBeTruthy();
  expect(requests.every(r=>r.headers.authorization==='Bearer private-session-token')).toBe(true);
  expect(requests.every(r=>r.packet.model==='local-test-model')).toBe(true);
  const download=page.waitForEvent('download');await page.getByText('Browser connection & setup',{exact:true}).click();await page.getByRole('button',{name:'Download last run log'}).click();expect((await download).suggestedFilename()).toMatch(/^daylist-run-/);
});

test('local model works without Chrome; auth refusal stops without fallback or task changes',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'LanguageModel',{configurable:true,value:undefined}));
  let requests=0;
  await page.route('http://localhost:11434/v1/chat/completions',async route=>{
    requests++;const action=requests===2?{version:1,values:['ready'],optional:null}:requests===3?{type:'tool_call',name:'request_user_input',arguments:q()}:{type:'final',message:'ready'};
    await route.fulfill({status:requests>3?403:200,contentType:'application/json',body:JSON.stringify(requests>3?{}:body(action))});
  });
  await page.goto('./');await configureLocal(page);
  await page.getByRole('button',{name:'Enable local AI',exact:true}).click();
  await page.locator('#chat-input').fill('Show tasks');await page.getByRole('button',{name:'Send message',exact:true}).click();
  await expect(page.locator('.assistant-message').last()).toContainText('refused authentication');await expect(page.locator('.task-row')).toHaveCount(0);
  expect(requests).toBe(4);await expect(page.getByRole('button',{name:'Enable Chrome and Continue'})).toHaveCount(0);
});
