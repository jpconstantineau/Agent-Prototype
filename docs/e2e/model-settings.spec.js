import { test, expect } from '@playwright/test';

async function openLocal(page) {
  await page.getByRole('button',{name:'Model settings',exact:true}).click();
  await page.getByRole('combobox',{name:'Text model',exact:true}).selectOption('local_http');
}
const selector=page=>page.getByRole('combobox',{name:'Model',exact:true});
const load=page=>page.getByRole('button',{name:'Load models',exact:true});

test('model picker loads exact IDs safely and requires explicit selection before saving',async({page})=>{
  const requests=[],inference=[];
  const unsafe='<img src=x onerror=alert(1)>', exact=' model with spaces ';
  await page.route('http://localhost:11434/v1/models',async route=>{
    requests.push({method:route.request().method(),headers:route.request().headers(),body:route.request().postData()});
    await route.fulfill({contentType:'application/json',body:JSON.stringify({object:'list',data:[{id:'zeta'},{id:exact},{id:unsafe},{id:'alpha'},{id:'alpha'}]})});
  });
  page.on('request',request=>{if(request.url().endsWith('/chat/completions'))inference.push(request);});
  await page.goto('./');await openLocal(page);
  await expect(selector(page)).toBeDisabled();expect(requests).toHaveLength(0);
  await page.getByLabel('Session bearer token (optional)',{exact:true}).fill('catalog-secret');
  await load(page).click();await expect(selector(page)).toBeEnabled();
  await expect(selector(page)).toHaveValue('');
  expect(await selector(page).locator('option').allTextContents()).toEqual(['Select a model',exact,unsafe,'alpha','zeta']);
  await expect(page.locator('#model-dialog img')).toHaveCount(0);
  await page.getByRole('button',{name:'Save settings',exact:true}).click();
  await expect(page.locator('[data-settings-error]')).toContainText('select an available model');
  await selector(page).selectOption(exact);
  await page.getByLabel('I configured this endpoint to use a locally served, inference-only model',{exact:true}).check();
  await page.getByRole('button',{name:'Save settings',exact:true}).click();
  await expect(page.locator('#endpoint-status')).toContainText('settings saved');
  expect(requests).toHaveLength(1);expect(requests[0].method).toBe('GET');expect(requests[0].body).toBeNull();expect(requests[0].headers.authorization).toBe('Bearer catalog-secret');expect(inference).toHaveLength(0);
  const settings=await page.evaluate(async()=>{
    const{TodoStore}=await import('./src/store.js');const{RuntimeStore}=await import('./src/runtime-store.js');const store=await TodoStore.open();
    try{return await new RuntimeStore(store.db).get('settings','device-model-route');}finally{store.close();}
  });
  expect(settings.profile.model).toBe(exact);expect(JSON.stringify(settings)).not.toContain('catalog-secret');
  await page.getByRole('button',{name:'Close model settings',exact:true}).click();
  await page.getByRole('button',{name:'Model settings',exact:true}).click();
  await expect(page.locator('#models-status')).toContainText(`Saved model: ${exact}`);
  await load(page).click();await expect(selector(page)).toHaveValue(exact);
});

test('empty, unsupported and removed catalogs can be retried; connection changes invalidate selection',async({page})=>{
  let response={data:[]},status=200;
  await page.route('http://localhost:11434/v1/models',route=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(response)}));
  await page.goto('./');await openLocal(page);
  await load(page).click();await expect(page.locator('#models-status')).toContainText('no models');await expect(selector(page)).toBeDisabled();
  status=404;response={error:'PRIVATE SERVER BODY'};
  await load(page).click();await expect(page.locator('[data-settings-error]')).toContainText('HTTP 404');await expect(page.locator('#model-dialog')).not.toContainText('PRIVATE SERVER BODY');await expect(selector(page)).toBeDisabled();
  status=200;response={data:[{id:'first'}]};
  await load(page).click();await selector(page).selectOption('first');
  await page.getByLabel('I configured this endpoint to use a locally served, inference-only model',{exact:true}).check();
  await page.getByRole('button',{name:'Save settings',exact:true}).click();await expect(page.locator('#endpoint-status')).toContainText('settings saved');
  response={data:[{id:'second'}]};await load(page).click();await expect(page.locator('#models-status')).toContainText('no longer available');await expect(selector(page)).toHaveValue('');
  await selector(page).selectOption('second');
  await page.getByLabel('Session bearer token (optional)',{exact:true}).fill('changed');await expect(selector(page)).toBeDisabled();
  await load(page).click();await selector(page).selectOption('second');
  await page.getByRole('button',{name:'Forget session token',exact:true}).click();await expect(selector(page)).toBeDisabled();
  await load(page).click();await selector(page).selectOption('second');
  await page.getByLabel('Base URL',{exact:true}).fill('http://localhost:8000/v1/');await expect(selector(page)).toBeDisabled();await expect(selector(page)).toHaveValue('');
});

test('late discovery responses cannot restore choices after address change or dialog close',async({page})=>{
  await page.addInitScript(()=>{
    const original=window.fetch.bind(window);window.modelResponses=[];
    window.fetch=(url,options)=>String(url).endsWith('/models')?new Promise(resolve=>window.modelResponses.push(id=>resolve(new Response(JSON.stringify({data:[{id}]}),{headers:{'content-type':'application/json'}})))):original(url,options);
  });
  await page.goto('./');await openLocal(page);await load(page).click();
  await expect(load(page)).toBeDisabled();
  await page.getByLabel('Base URL',{exact:true}).fill('http://localhost:8000/v1/');
  await load(page).click();await page.evaluate(()=>window.modelResponses[1]('current'));
  await expect(selector(page).locator('option')).toHaveCount(2);
  await page.evaluate(()=>window.modelResponses[0]('stale-address'));
  await expect(selector(page).locator('option')).toHaveText(['Select a model','current']);
  await load(page).click();await page.getByRole('button',{name:'Close model settings',exact:true}).click();
  await page.getByRole('button',{name:'Model settings',exact:true}).click();await load(page).click();
  await page.evaluate(()=>window.modelResponses[3]('reopened'));
  await expect(selector(page).locator('option')).toHaveText(['Select a model','reopened']);
  await page.evaluate(()=>window.modelResponses[2]('stale-dialog'));
  await expect(selector(page).locator('option')).toHaveText(['Select a model','reopened']);
});
