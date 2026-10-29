import {test,expect} from '@playwright/test';
import {rules} from '../../UI-Spec/system.mjs';

// Family labels are checked against every declaration's verification mapping.
const families = {
  baseline: ['tokens','colors','contrast','type','panels','states','controls'],
  layout: ['grid','reflow','targets','navigation'],
  keyboard: ['focus','editing','validation'],
  comparison: ['table'], modal: ['dialog'], adaptive: ['forced-colors'],
};
const editor=page=>page.locator('[data-editor="title"]');
const titleInput=page=>page.getByLabel('Task title (required)',{exact:true});
async function reference(page) {
  await page.goto('./ui-spec/');
  await expect(page.locator('#decision-count')).toContainText('declarations shown');
}
async function noPageOverflow(page) {expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}

test(`reference baseline and complete CSSOM audit: ${families.baseline.join(', ')}`,async({page,request})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await reference(page);
  await expect(page.getByRole('heading',{level:1})).toHaveText('Clear work. Deliberate changes.');
  await expect(page.locator('#decision-rows tr')).toHaveCount(rules.reduce((n,r)=>n+r.declarations.length,0));
  const audit=await page.evaluate(rules=>{
    const leaves=[];const walk=list=>{for(const rule of list){if(rule instanceof CSSStyleRule)leaves.push(rule);else if(rule.cssRules)walk(rule.cssRules);}};
    walk(document.styleSheets[0].cssRules);
    const missing=[];
    rules.forEach((r,index)=>{
      const rule=leaves[index];if(!rule){missing.push(`Missing rule ${r.id}`);return;}
      for(const d of r.declarations) {
        const v=d.value.replace(/\s*!important$/,'');
        if(!CSS.supports(d.property,v))missing.push(`Unsupported ${d.id}`);
        if(!rule.style.getPropertyValue(d.property))missing.push(`Dropped ${d.id}`);
      }
    });
    return {count:leaves.length,missing,sheets:[...document.styleSheets].map(s=>s.href),bodySize:getComputedStyle(document.body).fontSize,helpSize:getComputedStyle(document.querySelector('.ui-help')).fontSize,images:document.images.length,inline:document.querySelectorAll('[style], style').length};
  },rules);
  expect(audit.count).toBe(rules.length);expect(audit.missing).toEqual([]);expect(audit.sheets).toHaveLength(1);expect(audit.sheets[0]).toMatch(/\/ui-spec\/design-system.css$/);expect(audit.inline).toBe(0);expect(audit.bodySize).toBe('16px');expect(audit.helpSize).toBe('14px');expect(audit.images).toBe(0);
  const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));expect(new Set(ids).size).toBe(ids.length);
  expect(await page.locator('[aria-describedby],[aria-labelledby],label[for]').evaluateAll(nodes=>nodes.flatMap(node=>['aria-describedby','aria-labelledby','for'].flatMap(attr=>(node.getAttribute(attr)||'').split(' ').filter(id=>id&&!document.getElementById(id)))))).toEqual([]);
  await expect(page.getByRole('progressbar',{name:'Example review progress · 3 of 5'})).toHaveAttribute('value','3');
  await expect(page.getByRole('button',{name:'Publish',exact:true})).toBeDisabled();
  const radios=page.getByRole('radio');await radios.nth(1).check();await expect(radios.nth(1)).toBeChecked();await expect(radios.nth(0)).not.toBeChecked();
  await page.getByRole('checkbox',{name:'Include mobile examples'}).uncheck();await expect(page.getByRole('checkbox')).not.toBeChecked();
  await page.getByLabel('Find a CSS decision',{exact:true}).fill('bs-row.1');await expect(page.locator('#decision-rows tr')).toHaveCount(1);
  await page.getByLabel('Find a CSS decision',{exact:true}).fill('impossible-purpose-query');await expect(page.locator('#decision-count')).toHaveText(/^0 of/);await expect(page.locator('#decision-rows tr')).toHaveCount(0);
  expect((await request.get('./ui-spec/decisions.json')).status()).toBe(200);
  for(const path of ['./package.json','./ui-spec/private.json','./ui-spec/../../UI-Spec/system.mjs'])expect((await request.get(path)).status()).toBe(404);
  expect(errors).toEqual([]);
});

test(`layout, source order and targets: ${families.layout.join(', ')}`,async({page})=>{
  await reference(page);
  for(const width of [320,390,767,768,991,992,1440]) {
    await page.setViewportSize({width,height:960});await noPageOverflow(page);
    const rects=await page.locator('#forms .row > *').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width};}));
    if(width<992)expect(rects[1].y).toBeGreaterThan(rects[0].y);else{expect(Math.abs(rects[0].y-rects[1].y)).toBeLessThan(1);expect(rects[0].w/rects[1].w).toBeCloseTo(2,1);}
    const paired=await page.locator('#foundations > .row > *').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().y));
    if(width<768)expect(paired[1]).toBeGreaterThan(paired[0]);else expect(Math.abs(paired[0]-paired[1])).toBeLessThan(1);
  }
  await page.setViewportSize({width:390,height:844});
  for(const control of await page.locator('summary,.ui-nav a,.ui-choice,.btn:visible').all())expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
  await page.screenshot({path:'.tmp/ui-reference-mobile.png',fullPage:false});
  await page.setViewportSize({width:1440,height:960});await page.screenshot({path:'.tmp/ui-reference-desktop.png',fullPage:false});
});

test(`click-to-edit validates, preserves drafts and cancels explicitly: ${families.keyboard.join(', ')}`,async({page})=>{
  await reference(page);await page.keyboard.press('Tab');await expect(page.locator('.ui-skip')).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
  const summary=editor(page).locator('summary');await summary.focus();await page.keyboard.press('Enter');await expect(titleInput(page)).toBeFocused();
  await titleInput(page).fill('Unsaved draft');await page.getByLabel('Find a CSS decision',{exact:true}).focus();await expect(editor(page).locator('[data-read-value]')).toHaveText('Review the interface guidelines');
  await summary.click();await expect(editor(page)).toHaveAttribute('open','');await expect(page.locator('#edit-status')).toContainText('Choose Save or Cancel');await expect(titleInput(page)).toHaveValue('Unsaved draft');
  await titleInput(page).fill('   ');await page.getByRole('button',{name:'Save title',exact:true}).click();await expect(page.locator('#title-error')).toBeVisible();await expect(titleInput(page)).toHaveAttribute('aria-invalid','true');await expect(titleInput(page)).toBeFocused();await expect(editor(page).locator('[data-read-value]')).toHaveText('Review the interface guidelines');
  await page.locator('#forms').screenshot({path:'.tmp/ui-reference-form-error.png'});
  const dangerous='<img src=x onerror=alert(1)>';await titleInput(page).fill(dangerous);await page.getByRole('button',{name:'Save title',exact:true}).click();await expect(editor(page)).not.toHaveAttribute('open','');await expect(summary).toBeFocused();await expect(editor(page).locator('[data-read-value]')).toHaveText(dangerous);await expect(editor(page).locator('img')).toHaveCount(0);
  await summary.press('Space');await titleInput(page).fill('Cancelled value');await titleInput(page).press('Escape');await expect(summary).toBeFocused();await summary.click();await expect(titleInput(page)).toHaveValue(dangerous);await page.getByRole('button',{name:'Cancel title',exact:true}).click();
  const notes=page.locator('[data-editor="notes"]');await notes.locator('summary').click();const textarea=page.getByLabel('Notes (optional)',{exact:true});await textarea.fill('First');await textarea.press('End');await textarea.press('Enter');await textarea.pressSequentially('Second');await expect(textarea).toHaveValue('First\nSecond');
  await textarea.dispatchEvent('keydown',{key:'Escape',isComposing:true});await expect(notes).toHaveAttribute('open','');await page.getByRole('button',{name:'Save notes',exact:true}).click();await expect(notes.locator('[data-read-value]')).toHaveText('First\nSecond');
  const priority=page.locator('[data-editor="priority"]');await priority.locator('summary').click();await page.getByLabel('Priority',{exact:true}).selectOption('high');await page.getByRole('button',{name:'Save priority',exact:true}).click();await expect(priority.locator('[data-read-value]')).toHaveText('High');
  const date=page.locator('[data-editor="date"]');await date.locator('summary').click();await page.getByLabel('Due date (optional)',{exact:true}).fill('2026-11-02');await page.getByRole('button',{name:'Save due date',exact:true}).click();await expect(date.locator('[data-read-value]')).toHaveText('2026-11-02');
  expect(await summary.evaluate(n=>getComputedStyle(n).outlineStyle)).toBeDefined();
  await summary.focus();expect(await summary.evaluate(n=>getComputedStyle(n).outlineWidth)).toBe('3px');
});

test(`comparison semantics and keyboard overflow: ${families.comparison.join(', ')}`,async({page})=>{
  await page.setViewportSize({width:320,height:844});await reference(page);
  const region=page.getByRole('region',{name:'Example review queue · three interface patterns',exact:true});
  await expect(region.locator('caption')).toHaveCount(1);await expect(region.locator('thead th[scope="col"]')).toHaveCount(6);await expect(region.locator('tbody th[scope="row"]')).toHaveCount(3);
  expect(await region.evaluate(n=>n.scrollWidth>n.clientWidth)).toBe(true);await region.focus();await region.press('ArrowRight');await expect.poll(()=>region.evaluate(n=>n.scrollLeft)).toBeGreaterThan(0);await noPageOverflow(page);
  expect(await region.locator('td.ui-numeric').first().evaluate(n=>getComputedStyle(n).textAlign)).toBe('end');
});

test(`native modal confirmation, cancellation and focus return: ${families.modal.join(', ')}`,async({page})=>{
  await page.setViewportSize({width:320,height:640});await reference(page);
  const open=page.getByRole('button',{name:'Review example decision',exact:true}),dialog=page.getByRole('dialog',{name:'Confirm an example decision'});
  await open.click();await expect(dialog).toBeVisible();await expect(page.getByRole('button',{name:'Cancel decision',exact:true})).toBeFocused();
  const box=await dialog.boundingBox();expect(box.x).toBeGreaterThanOrEqual(15);expect(box.width).toBeLessThanOrEqual(288);
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(open).toBeFocused();await expect(page.locator('#dialog-status')).toContainText('cancelled');
  await open.click();await page.getByRole('button',{name:'Confirm example',exact:true}).click();await expect(page.locator('#dialog-status')).toContainText('confirmed');await expect(open).toBeFocused();
  await open.click();await page.keyboard.press('Escape');await expect(page.locator('#dialog-status')).toContainText('cancelled');
});

test(`text enlargement, spacing, reduced motion and high contrast: ${families.adaptive.join(', ')}`,async({page})=>{
  await reference(page);await page.setViewportSize({width:390,height:844});
  // Test user overrides are intentionally outside the shipped stylesheet audit.
  await page.route('**/ui-spec/user-spacing.css',route=>route.fulfill({contentType:'text/css',body:'html { font-size: 200%; } p, label, summary { line-height: 1.5; letter-spacing: .12em; word-spacing: .16em; } p { margin-bottom: 2em; }'}));
  await page.addStyleTag({url:new URL('user-spacing.css',page.url()).href});
  await noPageOverflow(page);await editor(page).locator('summary').click();await titleInput(page).fill('A very long name '+ 'word '.repeat(12));await page.getByRole('button',{name:'Save title',exact:true}).click();await noPageOverflow(page);
  await page.emulateMedia({forcedColors:'active',reducedMotion:'reduce'});await page.keyboard.press('Tab');await editor(page).locator('summary').focus();
  expect(await editor(page).locator('summary').evaluate(n=>getComputedStyle(n).outlineStyle)).toBe('solid');
  expect(await page.locator('.btn-primary').first().evaluate(n=>({animation:getComputedStyle(n).animationName,transition:getComputedStyle(n).transitionDuration})) ).toEqual({animation:'none',transition:'0s'});
  await expect(page.getByRole('checkbox')).toBeVisible();
});

test('native HTML reference remains inspectable without JavaScript',async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(`${baseURL}ui-spec/`);await expect(page.locator('noscript p')).toBeVisible();expect(await page.locator('noscript p').evaluate(n=>n.textContent)).toContain('Native disclosures');await editor(page).locator('summary').click();await expect(titleInput(page)).toBeVisible();await expect(page.getByRole('button',{name:'Save title',exact:true})).toBeDisabled();await noPageOverflow(page);await context.close();
});
