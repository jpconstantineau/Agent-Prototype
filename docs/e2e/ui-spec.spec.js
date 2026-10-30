import {test,expect} from '@playwright/test';
import {rules,palettes} from '../../UI-Spec/system.mjs';

// Family labels are checked against every declaration's verification mapping.
const families = {
  baseline: ['tokens','colors','contrast','type','panels','states','controls'],
  layout: ['grid','reflow','targets','navigation'],
  keyboard: ['focus','editing','validation'],
  comparison: ['table'], modal: ['dialog'], adaptive: ['forced-colors'],
};
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
  for(const control of await page.locator('.ui-nav a,.ui-choice,.btn:visible,.ui-inline-control').all())expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
  await page.screenshot({path:'.tmp/ui-reference-mobile.png',fullPage:false});
  await page.setViewportSize({width:1440,height:960});await page.screenshot({path:'.tmp/ui-reference-desktop.png',fullPage:false});
});

test(`prefilled values reveal native input chrome only on focus: ${families.keyboard.join(', ')}`,async({page})=>{
  await reference(page);await expect(page.locator('details, summary')).toHaveCount(0);
  const input=titleInput(page),save=page.getByRole('button',{name:'Save changes',exact:true}),cancel=page.getByRole('button',{name:'Cancel changes',exact:true});
  await expect(input).toHaveValue('Review the interface guidelines');await expect(input).toBeVisible();
  const before=await input.evaluate(n=>{window.originalInput=n;const r=n.getBoundingClientRect(),s=getComputedStyle(n);return {w:r.width,h:r.height,border:s.borderTopColor,bg:s.backgroundColor};});
  expect(before.border).toBe('rgba(0, 0, 0, 0)');expect(before.bg).toBe('rgba(0, 0, 0, 0)');
  await input.hover();expect(await input.evaluate(n=>getComputedStyle(n).borderTopColor)).toBe(before.border);
  await input.click();await expect(input).toBeFocused();
  const focused=await input.evaluate(n=>{const r=n.getBoundingClientRect(),s=getComputedStyle(n);return {same:n===window.originalInput,w:r.width,h:r.height,border:s.borderTopColor,bg:s.backgroundColor,outline:s.outlineWidth};});
  expect(focused.same).toBe(true);expect(focused.w).toBe(before.w);expect(focused.h).toBe(before.h);expect(focused.border).not.toBe(before.border);expect(focused.bg).not.toBe(before.bg);expect(focused.outline).toBe('3px');
  await input.fill('Unsaved draft');await page.getByLabel('Find a CSS decision',{exact:true}).focus();await expect(input).toHaveValue('Unsaved draft');await expect(page.locator('#edit-status')).toContainText('Unsaved');expect(await input.evaluate(n=>getComputedStyle(n).borderTopColor)).toBe(before.border);
  await cancel.click();await expect(input).toHaveValue('Review the interface guidelines');
  await input.fill('   ');await save.click();await expect(page.locator('#title-error')).toContainText('Error:');await expect(input).toHaveAttribute('aria-invalid','true');await expect(input).toBeFocused();
  await page.getByLabel('Find a CSS decision',{exact:true}).focus();expect(await input.evaluate(n=>getComputedStyle(n).borderTopColor)).not.toBe(before.border);
  await page.locator('#forms').screenshot({path:'.tmp/ui-reference-form-error.png'});
  const dangerous='<img src=x onerror=alert(1)>';await input.fill(dangerous);
  const notes=page.getByLabel('Notes (optional)',{exact:true});await notes.fill('First');await notes.press('End');await notes.press('Enter');await notes.pressSequentially('Second');await expect(notes).toHaveValue('First\nSecond');
  await notes.dispatchEvent('keydown',{key:'Escape',isComposing:true});await expect(notes).toHaveValue('First\nSecond');
  await page.getByLabel('Priority',{exact:true}).selectOption('high');await page.getByLabel('Due date (optional)',{exact:true}).fill('2026-11-02');await save.click();await expect(page.locator('#edit-status')).toContainText('saved in this page only');await expect(page.locator('#forms img')).toHaveCount(0);
  await input.fill('Cancel me');await notes.fill('Cancel notes');await input.press('Escape');await expect(input).toHaveValue(dangerous);await expect(notes).toHaveValue('First\nSecond');await expect(page.getByLabel('Priority',{exact:true})).toHaveValue('high');await expect(page.getByLabel('Due date (optional)',{exact:true})).toHaveValue('2026-11-02');
  await input.fill('Native Enter save');await input.press('Enter');await expect(page.locator('#edit-status')).toContainText('saved in this page only');
  await page.keyboard.press('Tab');await input.focus();expect(await input.evaluate(n=>getComputedStyle(n).outlineWidth)).toBe('3px');
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
  await page.route('**/ui-spec/user-spacing.css',route=>route.fulfill({contentType:'text/css',body:'html { font-size: 200%; } p, label, input, textarea { line-height: 1.5; letter-spacing: .12em; word-spacing: .16em; } p { margin-bottom: 2em; }'}));
  await page.addStyleTag({url:new URL('user-spacing.css',page.url()).href});
  await noPageOverflow(page);await titleInput(page).click();await titleInput(page).fill('A very long name '+ 'word '.repeat(12));await page.getByRole('button',{name:'Save changes',exact:true}).click();await noPageOverflow(page);
  await page.emulateMedia({forcedColors:'active',reducedMotion:'reduce'});await page.keyboard.press('Tab');await titleInput(page).focus();
  expect(await titleInput(page).evaluate(n=>getComputedStyle(n).outlineStyle)).toBe('solid');
  expect(await page.locator('.btn-primary').first().evaluate(n=>({animation:getComputedStyle(n).animationName,transition:getComputedStyle(n).transitionDuration})) ).toEqual({animation:'none',transition:'0s'});
  await expect(page.getByRole('checkbox')).toBeVisible();expect(await page.getByRole('switch',{name:'Dark mode',exact:true}).evaluate(n=>getComputedStyle(n).appearance)).toBe('auto');
});

test('native HTML reference remains inspectable without JavaScript',async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto(`${baseURL}ui-spec/`);await expect(page.locator('noscript p')).toBeVisible();expect(await page.locator('noscript p').evaluate(n=>n.textContent)).toContain('Prefilled fields');await expect(titleInput(page)).toBeVisible();await titleInput(page).click();expect(await titleInput(page).evaluate(n=>getComputedStyle(n).outlineWidth)).toBe('3px');await expect(page.getByRole('button',{name:'Save changes',exact:true})).toBeDisabled();await expect(page.getByRole('switch',{name:'Dark mode',exact:true})).toBeDisabled();await noPageOverflow(page);await context.close();
});

for(const [key,palette] of Object.entries(palettes)) test(`appearance ${key}: effective colors, direct editing and non-color cues`,async({page,context})=>{
  await reference(page);
  const dark=page.getByRole('switch',{name:'Dark mode',exact:true}),distinct=page.getByRole('switch',{name:'Distinct status colors',exact:true});
  await dark.setChecked(palette.theme==='dark');await distinct.setChecked(palette.vision==='distinct');
  await expect(page.locator('html')).toHaveAttribute('data-bs-theme',palette.theme);await expect(page.locator('html')).toHaveAttribute('data-vision',palette.vision);
  const actual=await page.evaluate(roles=>{const s=getComputedStyle(document.documentElement);return Object.fromEntries(roles.map(role=>[role,s.getPropertyValue(`--ui-${role}`).trim()]));},Object.keys(palette.colors));
  expect(actual).toEqual(palette.colors);
  const rgb=hex=>`rgb(${hex.slice(1).match(/../g).map(v=>parseInt(v,16)).join(', ')})`;
  const styles=await page.evaluate(()=>{
    const pair=selector=>{const s=getComputedStyle(document.querySelector(selector));return {fg:s.color,bg:s.backgroundColor};};
    return {body:pair('body'),panel:pair('.card'),header:pair('.ui-header'),notice:pair('.ui-notice'),table:pair('.table'),primary:pair('[data-inline-record] .btn-primary'),secondary:pair('[data-cancel]'),link:pair('.ui-nav a'),disabled:pair('button[aria-describedby="publish-help"]'),saved:pair('.ui-status:not(.ui-status-pending)'),pending:pair('.ui-status-pending'),error:pair('.ui-error')};
  });
  for(const [name,fg,bg] of [['body','ink','canvas'],['panel','ink','surface'],['primary','on-primary','primary'],['secondary','interactive','surface'],['disabled','disabled','disabled-bg'],['saved','success','success-bg'],['pending','warning','warning-bg']])expect(styles[name],`${key} effective ${name} colors`).toEqual({fg:rgb(palette.colors[fg]),bg:rgb(palette.colors[bg])});
  expect(styles.link.fg).toBe(rgb(palette.colors.interactive));
  for(const [name,role] of [['header','surface'],['notice','subtle'],['table','surface']])expect(styles[name].bg,`${key} quiet ${name} background`).toBe(rgb(palette.colors[role]));
  expect(await page.locator('.ui-notice').first().evaluate(n=>getComputedStyle(n).borderInlineStartColor)).toBe(rgb(palette.colors.border));
  expect(styles.error.fg).toBe(rgb(palette.colors.danger));
  expect(await page.locator('html').evaluate(n=>getComputedStyle(n).colorScheme)).toBe(palette.theme);
  for(const sample of await page.locator('[data-color-value]').all())await expect(sample).toHaveText(palette.colors[await sample.getAttribute('data-color-value')]);
  const primary=page.getByRole('button',{name:'Save changes',exact:true});
  await expect(primary).toHaveText('Save changes');
  expect(await primary.evaluate(n=>{const s=getComputedStyle(n);return {border:s.borderTopColor,outline:s.outlineStyle};})).toEqual({border:'rgba(0, 0, 0, 0)',outline:'none'});
  await primary.hover();expect(await primary.evaluate(n=>getComputedStyle(n).borderTopColor)).toBe('rgba(0, 0, 0, 0)');
  const sizeBefore=await primary.evaluate(n=>{const r=n.getBoundingClientRect();return {w:r.width,h:r.height};});
  await page.getByRole('button',{name:'Cancel changes',exact:true}).focus();await page.keyboard.press('Shift+Tab');await expect(primary).toBeFocused();
  expect(await primary.evaluate(n=>{const s=getComputedStyle(n),r=n.getBoundingClientRect();return {border:s.borderTopColor,outline:s.outlineWidth,offset:s.outlineOffset,color:s.outlineColor,w:r.width,h:r.height};})).toEqual({border:'rgba(0, 0, 0, 0)',outline:'3px',offset:'3px',color:rgb(palette.colors.focus),...sizeBefore});
  for(const control of await page.locator('input[type="checkbox"],input[type="radio"],progress').all())expect(await control.evaluate(n=>getComputedStyle(n).accentColor)).toBe(rgb(palette.colors.interactive));
  for(const control of await page.getByRole('switch').all()) {
    const checked=await control.isChecked();
    expect(await control.evaluate(n=>({track:getComputedStyle(n).backgroundColor,thumb:getComputedStyle(n,'::before').backgroundColor}))).toEqual({track:rgb(palette.colors[checked?'interactive':'muted']),thumb:rgb(palette.colors[checked?'on-interactive':'surface'])});
  }
  const input=titleInput(page);await input.fill('Draft survives a palette change');await page.getByLabel('Find a CSS decision',{exact:true}).focus();expect(await input.evaluate(n=>getComputedStyle(n).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
  await input.click();expect(await input.evaluate(n=>getComputedStyle(n).outlineWidth)).toBe('3px');
  expect(await input.evaluate(n=>{const s=getComputedStyle(n);return {fg:s.color,bg:s.backgroundColor,border:s.borderTopColor,focus:s.outlineColor};})).toEqual({fg:rgb(palette.colors.ink),bg:rgb(palette.colors.surface),border:rgb(palette.colors.border),focus:rgb(palette.colors.focus)});
  await page.getByRole('button',{name:'Save changes',exact:true}).click();await expect(input).toHaveValue('Draft survives a palette change');
  await page.getByRole('button',{name:'Save changes',exact:true}).hover();expect(await page.getByRole('button',{name:'Save changes',exact:true}).evaluate(n=>{const s=getComputedStyle(n);return {fg:s.color,bg:s.backgroundColor};})).toEqual({fg:rgb(palette.colors['on-primary']),bg:rgb(palette.colors['primary-hover'])});
  const pending=page.locator('.ui-status-pending').first();await expect(pending).toContainText(/Proposed|Pending/);
  if(palette.vision==='distinct') {expect(await pending.evaluate(n=>getComputedStyle(n).borderTopStyle)).toBe('dashed');expect(await page.locator('.ui-status:not(.ui-status-pending)').first().evaluate(n=>getComputedStyle(n).borderTopStyle)).toBe('solid');}
  await page.setViewportSize({width:390,height:844});await noPageOverflow(page);await page.locator('#forms').scrollIntoViewIfNeeded();await page.screenshot({path:`.tmp/ui-${key}-mobile.png`});
  await page.setViewportSize({width:1440,height:960});await page.locator('#forms').screenshot({path:`.tmp/ui-${key}-form.png`});
  const cdp=await context.newCDPSession(page);
  for(const type of ['protanopia','deuteranopia','tritanopia','achromatopsia']) {
    await cdp.send('Emulation.setEmulatedVisionDeficiency',{type});await expect(page.locator('.ui-error').last()).toContainText('error:');await expect(page.locator('.ui-status').filter({hasText:'Saved'}).first()).toBeVisible();
  }
  await page.locator('#choices-title').scrollIntoViewIfNeeded();await page.screenshot({path:`.tmp/ui-${key}-achromatopsia.png`});await cdp.send('Emulation.setEmulatedVisionDeficiency',{type:'none'});await cdp.detach();
  await page.emulateMedia({forcedColors:'active'});await input.focus();expect(await input.evaluate(n=>getComputedStyle(n).outlineStyle)).toBe('solid');expect(await dark.evaluate(n=>getComputedStyle(n).appearance)).toBe('auto');
  await primary.hover();expect(await primary.evaluate(n=>{const s=getComputedStyle(n);return s.borderTopColor===s.color&&s.borderTopColor!=='rgba(0, 0, 0, 0)';})).toBe(true);
  await page.getByRole('button',{name:'Cancel changes',exact:true}).focus();await page.keyboard.press('Shift+Tab');await expect(primary).toBeFocused();expect(await primary.evaluate(n=>getComputedStyle(n).outlineWidth)).toBe('3px');
});

test('appearance uses system brightness initially, persists explicit choices and preserves drafts',async({page})=>{
  await page.emulateMedia({colorScheme:'dark'});await reference(page);await expect(page.getByRole('switch',{name:'Dark mode',exact:true})).toBeChecked();
  await titleInput(page).fill('Keep this draft');const dark=page.getByRole('switch',{name:'Dark mode',exact:true}),distinct=page.getByRole('switch',{name:'Distinct status colors',exact:true});
  await dark.focus();await dark.press('Space');await expect(dark).not.toBeChecked();await distinct.check();await expect(titleInput(page)).toHaveValue('Keep this draft');await expect(page.locator('#edit-status')).toContainText('Unsaved');
  await page.reload();await expect(dark).not.toBeChecked();await expect(distinct).toBeChecked();await expect(titleInput(page)).toHaveValue('Review the interface guidelines');
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('daylist-ui-reference-appearance-v1')))).toEqual({theme:'light',vision:'distinct'});
});

test('denied preference storage keeps appearance and editing usable',async({page})=>{
  await page.emulateMedia({colorScheme:'light'});
  await page.addInitScript(()=>{Object.defineProperty(Storage.prototype,'getItem',{value(){throw new DOMException('Denied','SecurityError');}});Object.defineProperty(Storage.prototype,'setItem',{value(){throw new DOMException('Denied','SecurityError');}});});
  await reference(page);await page.getByRole('switch',{name:'Dark mode',exact:true}).check();await expect(page.locator('html')).toHaveAttribute('data-bs-theme','dark');await expect(page.locator('#appearance-status')).toContainText('cannot remember');await titleInput(page).fill('Still editable');await page.getByRole('button',{name:'Save changes',exact:true}).click();await expect(page.locator('#edit-status')).toContainText('saved');
});
