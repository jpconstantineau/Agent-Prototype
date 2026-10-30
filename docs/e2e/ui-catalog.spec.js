import {test,expect} from '@playwright/test';
import {catalog,includedCatalog} from '../../UI-Spec/component-catalog.mjs';
import {palettes,rules} from '../../UI-Spec/system.mjs';
const family='catalog';
async function open(page,key='light-standard',density='normal'){
 await page.goto('./ui-spec/catalog.html');await page.getByRole('switch',{name:'Dark mode',exact:true}).setChecked(palettes[key].theme==='dark');await page.getByRole('switch',{name:'Distinct status colors',exact:true}).setChecked(palettes[key].vision==='distinct');await page.getByRole('switch',{name:'Compact mode',exact:true}).setChecked(density==='compact');
}
const noOverflow=async page=>expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
for(const density of ['normal','compact'])for(const key of Object.keys(palettes))test(family+' coverage, geometry and colors / '+key+' / '+density,async({page,request})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await open(page,key,density);
 await expect(page.locator('[data-component]')).toHaveCount(includedCatalog.length);
 for(const c of includedCatalog){const section=page.locator('[data-component="'+c.id+'"]');for(const cls of c.classes)expect(await section.locator('.ui-catalog-sample .'+cls).count(),c.id+' '+cls).toBeGreaterThan(0);}
 const rgb=hex=>'rgb('+hex.slice(1).match(/../g).map(x=>parseInt(x,16)).join(', ')+')';
 expect(await page.locator('.ui-card').first().evaluate(n=>({fg:getComputedStyle(n).color,bg:getComputedStyle(n).backgroundColor}))).toEqual({fg:rgb(palettes[key].colors.ink),bg:rgb(palettes[key].colors.surface)});
 expect(await page.locator('#catalog-button .ui-catalog-sample .btn-primary').evaluate(n=>({fg:getComputedStyle(n).color,bg:getComputedStyle(n).backgroundColor,border:getComputedStyle(n).borderTopColor}))).toEqual({fg:rgb(palettes[key].colors['on-primary']),bg:rgb(palettes[key].colors.primary),border:'rgba(0, 0, 0, 0)'});
 expect(await page.locator('.ui-radial-progress').evaluate(n=>getComputedStyle(n).backgroundImage)).toContain('270deg');
 const tones={success:'success',error:'danger',pending:'warning',info:'interactive',neutral:'muted'};
 for(const [tone,role] of Object.entries(tones)){
  const fill=rgb(palettes[key].colors[role]);const ink=rgb(palettes[key].colors['on-interactive']);
  const alert=page.locator('#catalog-alert .ui-alert.ui-tone--'+tone);await expect(alert).toHaveCSS('background-color',fill);await expect(alert).toHaveCSS('color',ink);
  const avatar=page.locator('#catalog-avatar .ui-avatar.ui-tone--'+tone);await expect(avatar).toHaveCSS('background-color',fill);await expect(avatar).toHaveCSS('color',ink);
  for(const cls of ['ui-badge','ui-status-indicator']){const mark=page.locator('#catalog-'+(cls==='ui-badge'?'badge':'status')+' .'+cls+'.ui-tone--'+tone);expect(await mark.evaluate(n=>getComputedStyle(n,'::before').backgroundColor)).toBe(fill);expect(await mark.evaluate(n=>parseFloat(getComputedStyle(n,'::before').width))).toBeGreaterThanOrEqual(10);}
  expect(await page.locator('#catalog-aura .ui-aura.ui-tone--'+tone).evaluate(n=>getComputedStyle(n).backgroundImage)).toContain(fill);
  const heading=page.locator('#catalog-alert-dialog .ui-alert.ui-tone--'+tone);await expect(heading).toHaveCSS('background-color',fill);await expect(heading.locator('h3')).toHaveCSS('color',ink);
 }
 await expect(page.locator('.ui-spinner')).toHaveCSS('border-top-width','3px');
 expect(await page.locator('#catalog-pagination .ui-pagination li').allTextContents()).toEqual(['1','2','3']);
 await expect(page.locator('#catalog-chat .ui-chat')).toHaveCount(2);await expect(page.locator('.ui-chat--outgoing .ui-bubble')).toHaveCSS('background-color',rgb(palettes[key].colors.interactive));await expect(page.locator('.ui-chat--outgoing .ui-bubble')).toHaveCSS('color',rgb(palettes[key].colors['on-interactive']));
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:960});await noOverflow(page);}
 const crumbCenters=await page.locator('.ui-breadcrumb li').evaluateAll(ns=>ns.map(n=>{const b=n.getBoundingClientRect();return b.y+b.height/2;}));expect(Math.max(...crumbCenters)-Math.min(...crumbCenters)).toBeLessThanOrEqual(1);await expect(page.locator('.ui-path-separator')).toHaveCount(2);
 const folder=page.locator('.ui-folder-tabs');await folder.getByRole('radio',{name:'Summary preview',exact:true}).focus();await page.keyboard.press('ArrowRight');await expect(folder.getByRole('radio',{name:'Details preview',exact:true})).toBeChecked();await expect(folder.locator('.ui-folder-tab').last()).toHaveCSS('outline-color',rgb(palettes[key].colors.focus));await expect(folder.locator('.ui-folder-tab').last()).toHaveCSS('outline-width','3px');await expect(folder.locator('.ui-folder-tab').last()).toHaveCSS('outline-offset','3px');
 const outgoing=await page.locator('.ui-chat--outgoing').boundingBox(),incoming=await page.locator('.ui-chat--incoming').boundingBox();expect(outgoing.x+outgoing.width).toBeGreaterThan(incoming.x+incoming.width);expect(outgoing.x).toBeGreaterThan(incoming.x);expect(incoming.y).toBeGreaterThan(outgoing.y);
 const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));expect(new Set(ids).size).toBe(ids.length);
 expect(await page.locator('[aria-labelledby],[aria-describedby],label[for],button[commandfor],button[popovertarget],button[interestfor]').evaluateAll(nodes=>nodes.flatMap(n=>['aria-labelledby','aria-describedby','for','commandfor','popovertarget','interestfor'].flatMap(a=>(n.getAttribute(a)||'').split(' ').filter(id=>id&&!document.getElementById(id)))))).toEqual([]);
 expect(await page.locator('script').evaluateAll(nodes=>nodes.map(n=>new URL(n.src).pathname.split('/').at(-1)))).toEqual(['appearance.js']);expect(await page.locator('[style], style').count()).toBe(0);
 const response=await request.get('./ui-spec/components.json');expect(response.status()).toBe(200);expect((await response.json()).components.length).toBe(catalog.length);
 await page.locator('#catalog-button').scrollIntoViewIfNeeded();await page.screenshot({path:'.tmp/catalog-'+key+'-'+density+'-controls.png'});await page.locator('#catalog-card').scrollIntoViewIfNeeded();await page.screenshot({path:'.tmp/catalog-'+key+'-'+density+'-cards.png'});expect(errors).toEqual([]);
});
test('catalog native controls, panels, fixed filter, swap and local theme work without scripts',async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,javaScriptEnabled:false,viewport:{width:390,height:844}});
 try{const page=await context.newPage();await page.goto('./ui-spec/catalog.html');
 await page.getByText('First explanation',{exact:true}).click();await expect(page.locator('.ui-accordion').first()).toHaveAttribute('open','');await page.getByText('Second explanation',{exact:true}).click();await expect(page.locator('.ui-accordion').first()).not.toHaveAttribute('open');
 const range=page.locator('#catalog-range');await range.focus();await range.press('ArrowRight');await expect(range).toHaveValue('51');
 await page.locator('#catalog-control-otp').fill('123456');await expect(page.locator('#catalog-control-otp')).toHaveValue('123456');
 await page.locator('.ui-folder-tab').filter({hasText:'Details preview'}).click();await expect(page.locator('.ui-folder-tabs').getByRole('radio',{name:'Details preview',exact:true})).toBeChecked();await expect(page.getByRole('heading',{name:'Details preview panel',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'Summary preview panel',exact:true})).not.toBeVisible();
 const folders=page.locator('.ui-folder-tabs');await folders.getByRole('radio',{name:'Details preview',exact:true}).focus();await page.keyboard.press('ArrowLeft');await expect(folders.getByRole('radio',{name:'Summary preview',exact:true})).toBeChecked();await expect(folders.locator('.ui-folder-tab').first()).toHaveCSS('outline-width','3px');await expect(folders.locator('.ui-folder-tab').first()).toHaveCSS('border-top-left-radius','12px');await expect(page.locator('h3').filter({hasText:'Summary preview panel'})).toBeVisible();
 const rating=page.locator('.ui-rating');await rating.getByRole('radio',{name:'3 of 5 stars',exact:true}).check();await expect(rating.locator('.ui-rating-star--filled:visible')).toHaveCount(3);await rating.getByRole('radio',{name:'3 of 5 stars',exact:true}).press('ArrowRight');await expect(rating.getByRole('radio',{name:'4 of 5 stars',exact:true})).toBeChecked();await expect(rating.locator('.ui-rating-star--filled:visible')).toHaveCount(4);
 const filter=page.locator('#catalog-filter');await filter.getByRole('radio',{name:'Open',exact:true}).check();await expect(filter.locator('.ui-filter-result:visible')).toHaveCount(1);await filter.getByRole('button',{name:'Reset example filter'}).click();await expect(filter.locator('.ui-filter-result:visible')).toHaveCount(2);
 await page.locator('#catalog-control-swap').check();await expect(page.locator('.ui-swap-detail')).toBeVisible();await expect(page.locator('.ui-swap-short')).not.toBeVisible();
 const before=await page.locator('.ui-theme-sandbox').evaluate(n=>getComputedStyle(n).backgroundColor);await page.locator('#catalog-local-theme').check();expect(await page.locator('.ui-theme-sandbox').evaluate(n=>getComputedStyle(n).backgroundColor)).not.toBe(before);await noOverflow(page);
 }finally{await context.close();}
});
test('catalog declarative dialogs and popovers provide native dismissal and focus return without scripts',async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,javaScriptEnabled:false,viewport:{width:390,height:844}});
 try{const page=await context.newPage();await page.goto('./ui-spec/catalog.html');
 for(const id of ['modal','alert-dialog','alert-dialog-success','alert-dialog-error','alert-dialog-pending','alert-dialog-neutral','drawer','sheet']){const opener=page.getByRole('button',{name:'Open '+id+' example',exact:true});await opener.click();const dialog=page.locator('#dialog-'+id);await expect(dialog).toBeVisible();await expect(page.getByRole('button',{name:'Close '+id+' example',exact:true})).toBeFocused();const box=await dialog.boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(391);await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(opener).toBeFocused();}
 for(const id of ['popover','dropdown','megamenu','corner-actions']){await page.getByRole('button',{name:'Open '+id+' example',exact:true}).click();await expect(page.locator('#popup-'+id)).toBeVisible();const box=await page.locator('#popup-'+id).boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(391);await page.keyboard.press('Escape');await expect(page.locator('#popup-'+id)).not.toBeVisible();}
 }finally{await context.close();}
});
test('catalog tooltip interest, Escape and hover gallery preserve native interaction',async({page})=>{
 await open(page);const tip=page.locator('#popup-tooltip');await page.locator('#invoker-tooltip').hover();await expect(tip).toBeVisible();await page.keyboard.press('Escape');await expect(tip).not.toBeVisible();
 await page.keyboard.press('Tab');await page.locator('#invoker-tooltip').focus();await expect(tip).toBeVisible();await page.keyboard.press('Escape');await expect(tip).not.toBeVisible();
 const gallery=page.locator('.ui-hover-gallery');await gallery.getByRole('radio',{name:'Preview 3',exact:true}).check();await page.mouse.move(0,0);await expect(gallery.locator('figure:visible')).toHaveCount(1);await expect(gallery.locator('figure[data-preview="three"]')).toBeVisible();await gallery.locator('label[data-preview="one"]').hover();await expect(gallery.locator('figure:visible')).toHaveCount(1);await expect(gallery.locator('figure[data-preview="one"]')).toBeVisible();await page.mouse.move(0,0);await expect(gallery.locator('figure[data-preview="three"]')).toBeVisible();
});
for(const density of ['normal','compact'])test('catalog text enlargement, native validation and optional motion / '+density,async({page})=>{
 await open(page,'light-standard',density);await page.locator('#catalog-email').fill('invalid');await page.getByRole('button',{name:'Check native example constraints'}).click();await expect(page.locator('.ui-validation-error')).toBeVisible();await page.locator('#catalog-email').fill('demo@example.test');await page.locator('#catalog-email').press('Tab');await expect(page.locator('.ui-validation-error')).not.toBeVisible();
 await expect(page.locator('.ui-skeleton')).toHaveCSS('animation-name','none');await page.locator('#catalog-skeleton-enable').check();await expect(page.locator('.ui-skeleton')).toHaveCSS('animation-name','ui-catalog-loading-border');
 const skeletonBox=await page.locator('.ui-skeleton').boundingBox();const borderPhase=async time=>page.locator('.ui-skeleton').evaluate((n,t)=>{for(const a of n.getAnimations()){a.pause();a.currentTime=t;}return getComputedStyle(n).borderTopColor;},time);expect(await borderPhase(0)).not.toBe(await borderPhase(2000));expect(await page.locator('.ui-skeleton').boundingBox()).toEqual(skeletonBox);
 await page.locator('#catalog-skeleton-enable').uncheck();await expect(page.locator('.ui-skeleton')).toHaveCSS('animation-name','none');await page.locator('#catalog-skeleton-enable').check();
 await expect(page.locator('.ui-spinner')).toHaveCSS('animation-name','none');await page.locator('#catalog-spin-enable').check();await expect(page.locator('.ui-spinner')).toHaveCSS('animation-name','ui-catalog-spin');await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.ui-spinner')).toHaveCSS('animation-name','none');await expect(page.locator('.ui-skeleton')).toHaveCSS('animation-name','none');
 await page.setViewportSize({width:390,height:844});await page.route('**/ui-spec/catalog-user-spacing.css',r=>r.fulfill({contentType:'text/css',body:'html{font-size:200%} p,label,li{line-height:1.5;letter-spacing:.12em;word-spacing:.16em} p{margin-bottom:2em}'}));await page.addStyleTag({url:new URL('catalog-user-spacing.css',page.url()).href});await noOverflow(page);await page.emulateMedia({forcedColors:'active'});await page.keyboard.press('Tab');await page.locator('.ui-collapse > summary').first().focus();expect(await page.locator('.ui-collapse > summary').first().evaluate(n=>getComputedStyle(n).outlineStyle)).toBe('solid');
});
test('catalog coarse pointer targets retain the protected floor',async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,isMobile:true,hasTouch:true,viewport:{width:390,height:844}});try{const page=await context.newPage();await open(page,'dark-distinct','compact');for(const n of await page.locator('.ui-catalog-sample .ui-button:visible,.ui-catalog-sample .ui-choice:visible,.ui-catalog-sample .ui-toggle-button:visible,.ui-catalog-sample .ui-range:visible,.ui-folder-tab,.ui-pagination a').all())expect((await n.boundingBox()).height).toBeGreaterThanOrEqual(44);await noOverflow(page);}finally{await context.close();}
});
test('catalog text animation has distinct phases and a complete static fallback',async({page})=>{
 await open(page);const labels=page.locator('.ui-text-rotate > span');await page.locator('#catalog-rotate-enable').check();
 expect(await labels.evaluateAll(ns=>ns.map(n=>getComputedStyle(n).animationDelay))).toEqual(['0s','3s','6s']);
 const phase=time=>labels.evaluateAll((ns,time)=>{for(const n of ns)for(const a of n.getAnimations()){a.pause();a.currentTime=time;}return ns.map(n=>Number(getComputedStyle(n).opacity));},time);
 expect(await phase(500)).toEqual([1,0,0]);expect(await phase(3500)).toEqual([0,1,0]);expect(await phase(6500)).toEqual([0,0,1]);
 await page.locator('#catalog-rotate-enable').uncheck();expect(await labels.evaluateAll(ns=>ns.map(n=>getComputedStyle(n).opacity))).toEqual(['1','1','1']);await expect(page.locator('#catalog-text-rotate .ui-catalog-sample').getByText('Complete persistent wording: Read · Review · Accept.',{exact:false})).toBeVisible();
});
test('catalog source/code scrolling and optional pointer wipe remain local',async({page})=>{
 await open(page);await page.setViewportSize({width:390,height:844});
 const code=page.locator('#catalog-code-block .ui-code-block');await code.focus();await code.press('ArrowRight');await expect.poll(()=>code.evaluate(n=>n.scrollLeft)).toBeGreaterThan(0);
 const scroll=page.locator('#catalog-scroll-area .ui-scroll-area');await scroll.focus();await scroll.press('PageDown');await expect.poll(()=>scroll.evaluate(n=>n.scrollTop)).toBeGreaterThan(0);
 const attachment=page.locator('#catalog-attachment');await attachment.getByText('Inspect Attachment HTML',{exact:true}).click();const source=attachment.locator('.ui-catalog-source');await source.focus();await expect(source).toContainText('<a class="ui-attachment"');expect(await source.evaluate(n=>getComputedStyle(n).outlineWidth)).toBe('3px');
 const wipe=page.locator('.ui-diff-before');await wipe.scrollIntoViewIfNeeded();const before=await wipe.boundingBox();await page.mouse.move(before.x+before.width-4,before.y+before.height-4);await page.mouse.down();await page.mouse.move(before.x+before.width+20,before.y+before.height-4,{steps:8});await page.mouse.up();expect((await wipe.boundingBox()).width).toBeGreaterThan(before.width+10);await expect(page.locator('.ui-diff img')).toHaveCount(2);await noOverflow(page);
});
