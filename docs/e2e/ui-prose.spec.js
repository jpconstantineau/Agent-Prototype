import {test,expect} from '@playwright/test';
import {palettes} from '../../UI-Spec/system.mjs';
const family='prose';
const noOverflow=async page=>expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
async function content(page,density='normal',key='light-standard'){
  await page.goto('./ui-spec/content.html');
  await page.getByRole('switch',{name:'Dark mode',exact:true}).setChecked(palettes[key].theme==='dark');
  await page.getByRole('switch',{name:'Distinct status colors',exact:true}).setChecked(palettes[key].vision==='distinct');
  await page.getByRole('switch',{name:'Compact mode',exact:true}).setChecked(density==='compact');
}
for(const density of ['normal','compact'])for(const key of Object.keys(palettes))test(`document content ${key} / ${density}: ${family} hierarchy, rhythm and palette`,async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await content(page,density,key);
  const headings=await page.locator('.ui-prose :is(h1,h2,h3,h4,h5,h6)').evaluateAll(nodes=>nodes.slice(0,6).map(n=>({tag:n.tagName,size:parseFloat(getComputedStyle(n).fontSize),weight:getComputedStyle(n).fontWeight})));
  const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));expect(new Set(ids).size).toBe(ids.length);expect(await page.locator('[aria-labelledby],[aria-describedby]').evaluateAll(nodes=>nodes.flatMap(n=>['aria-labelledby','aria-describedby'].flatMap(attr=>(n.getAttribute(attr)||'').split(' ').filter(id=>id&&!document.getElementById(id)))))).toEqual([]);
  expect(headings.map(h=>h.tag)).toEqual(['H1','H2','H3','H4','H5','H6']);expect(headings.map(h=>h.size)).toEqual([32,28,24,20,18,16]);expect(headings.every(h=>h.weight==='600')).toBe(true);
  const rhythm=await page.locator('.ui-prose').evaluate(n=>{const s=e=>getComputedStyle(e),h=n.querySelector('#lists');return{before:s(h).marginBlockStart,after:s(h.nextElementSibling).marginBlockStart,first:s(n.firstElementChild).marginBlockStart,last:s(n.lastElementChild).marginBlockEnd,body:s(n).fontSize,code:s(n.querySelector('pre code')).fontSize,pre:s(n.querySelector('pre')).fontSize};});
  expect(rhythm).toMatchObject({before:density==='normal'?'24px':'16px',after:density==='normal'?'12px':'8px',first:'0px',last:'0px',body:'16px'});expect(rhythm.code).toBe(rhythm.pre);
  const rgb=hex=>'rgb('+hex.slice(1).match(/../g).map(v=>parseInt(v,16)).join(', ')+')';
  expect(await page.locator('mark').evaluate(n=>{const s=getComputedStyle(n);return{fg:s.color,bg:s.backgroundColor,outline:s.outlineStyle}})).toEqual({fg:rgb(palettes[key].colors.ink),bg:rgb(palettes[key].colors.subtle),outline:'solid'});
  expect(await page.locator('#wide-table thead th').evaluateAll(nodes=>nodes.every(n=>{const range=document.createRange();range.selectNodeContents(n);return range.getClientRects().length===1;}))).toBe(true);
  await expect(page.locator('#numbered-steps')).toHaveAttribute('start','98');await expect(page.locator('#large-number')).toHaveAttribute('start','999999');expect(await page.locator('#task-markers input, #task-markers button, #task-markers [tabindex]').count()).toBe(0);
  await expect(page.locator('#code-sample code')).toContainText("<script>alert('inert example')</script>");expect(await page.locator('.ui-prose script').count()).toBe(0);
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});await noOverflow(page);const image=await page.locator('#image-figure img').boundingBox();expect(image.width/image.height).toBeCloseTo(4,1);expect(await page.locator('#small-table').evaluate(n=>n.getBoundingClientRect().width<=n.parentElement.clientWidth)).toBe(true);}
  await page.setViewportSize({width:390,height:844});await page.locator('#document-title').scrollIntoViewIfNeeded();await page.screenshot({path:`.tmp/prose-${key}-${density}-mobile.png`});
  await page.setViewportSize({width:1440,height:960});await page.locator('#lists').scrollIntoViewIfNeeded();await page.screenshot({path:`.tmp/prose-${key}-${density}-lists.png`});expect(errors).toEqual([]);
});
test('prose keyboard scrolling, disclosure semantics, media fallback and scope',async({page})=>{
  await content(page,'compact');await page.setViewportSize({width:320,height:844});
  for(const selector of ['#code-sample','#wide-table-region']){const region=page.locator(selector);expect(await region.evaluate(n=>n.scrollWidth>n.clientWidth),selector+' should exercise overflow').toBe(true);await region.focus();expect(await region.evaluate(n=>getComputedStyle(n).outlineWidth)).toBe('3px');await region.press('ArrowRight');await expect.poll(()=>region.evaluate(n=>n.scrollLeft)).toBeGreaterThan(0);}
  const summary=page.locator('summary');await summary.focus();await summary.press('Enter');await expect(page.locator('details')).toHaveAttribute('open','');await summary.press('Space');await expect(page.locator('details')).not.toHaveAttribute('open');
  expect(await page.locator('#image-figure img').evaluate(n=>n.complete&&n.naturalWidth===960)).toBe(true);expect(await page.locator('#missing-image').evaluate(n=>n.complete&&n.naturalWidth===0&&Boolean(n.alt))).toBe(true);
  await page.goto('./ui-spec/');expect(await page.locator('#foundation-title').evaluate(n=>getComputedStyle(n).fontSize)).toBe('24px');expect(await page.locator('#forms h3').first().evaluate(n=>getComputedStyle(n).fontSize)).toBe('18px');
});
for(const density of ['normal','compact'])test(`prose enlarged text, user spacing and forced colors / ${density}`,async({page})=>{
  await content(page,density);await page.setViewportSize({width:390,height:844});
  await page.route('**/ui-spec/prose-user-spacing.css',route=>route.fulfill({contentType:'text/css',body:'html { font-size:200%; } .ui-prose p, .ui-prose li { line-height:1.5; letter-spacing:.12em; word-spacing:.16em; } .ui-prose p { margin-bottom:2em; }'}));await page.addStyleTag({url:new URL('prose-user-spacing.css',page.url()).href});await noOverflow(page);
  await page.emulateMedia({forcedColors:'active'});await page.keyboard.press('Tab');await page.locator('summary').focus();expect(await page.locator('summary').evaluate(n=>getComputedStyle(n).outlineStyle)).toBe('solid');expect(await page.locator('mark').evaluate(n=>{const s=getComputedStyle(n);return s.color!==s.backgroundColor})).toBe(true);await noOverflow(page);
});
test('prose remains readable and disclosures work without JavaScript',async({browser,baseURL})=>{
  const context=await browser.newContext({baseURL,javaScriptEnabled:false,viewport:{width:390,height:844}});
  try{const page=await context.newPage();await page.goto('./ui-spec/content.html');await expect(page.locator('noscript')).toBeVisible();await expect(page.getByRole('switch',{name:'Compact mode',exact:true})).toBeDisabled();await page.locator('summary').click();await expect(page.locator('details')).toHaveAttribute('open','');await noOverflow(page);}finally{await context.close();}
});
