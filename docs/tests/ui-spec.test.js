import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {rules,tokens,contrastPairs,contrastExceptions,palettes} from '../../UI-Spec/system.mjs';
import {designFiles} from '../../UI-Spec/palettes.mjs';
import {outputs,cssText} from '../../UI-Spec/build.mjs';
import {validateRegistry,validateGenerated,checkFamilies,contrast} from '../../UI-Spec/validate.mjs';
import {densityTokens,densityProfiles,boxAudit,isBoxDeclaration,validateDensity,compactCoarseMinimum,coarseTargetMedia} from '../../UI-Spec/density.mjs';
const root=new URL('../../',import.meta.url);

test('every CSS declaration maps to a purpose, user intent and actual verification family',async()=>{
  assert.equal(validateRegistry(rules),true);
  const used=new Set(rules.map(r=>r.check));assert.deepEqual(used,checkFamilies);
  const tests=(await Promise.all(['ui-spec.spec.js','ui-prose.spec.js','ui-catalog.spec.js'].map(p=>readFile(new URL('../e2e/'+p,import.meta.url),'utf8')))).join('\n');
  for(const family of checkFamilies)assert(tests.includes(`'${family}'`),`Missing browser verification family ${family}`);
});
test('audit rejects missing intent, missing purpose, duplicate IDs and undeclared checks',()=>{
  for(const mutate of [r=>r[0].declarations[0].intent='',r=>r[0].declarations[0].purpose='',r=>r[1].declarations[0].id=r[0].declarations[0].id,r=>r[0].check='untracked',r=>r[0].declarations.push(r[0].declarations[0])]) {
    const changed=structuredClone(rules);mutate(changed);assert.throws(()=>validateRegistry(changed));
  }
});
test('all deployed CSS and generated review artifacts exactly match the normative registry',async()=>{
  for(const [path,expected] of await outputs())validateGenerated(await readFile(new URL(path,root),'utf8'),expected,path);
  const files=await readdir(new URL('../ui-spec/',import.meta.url));assert.deepEqual(files.filter(p=>p.endsWith('.css')),['design-system.css']);
  const html=(await Promise.all(['index.html','content.html','catalog.html'].map(p=>readFile(new URL('../ui-spec/'+p,import.meta.url),'utf8')))).join('\n'),js=await readFile(new URL('../ui-spec/reference.js',import.meta.url),'utf8')+await readFile(new URL('../ui-spec/appearance.js',import.meta.url),'utf8');
  assert.equal((html.match(/rel="stylesheet"/g)||[]).length,3);assert(!/<style\b|\sstyle\s*=/.test(html));assert(!/\.style\b|setAttribute\(['"]style|insertRule|adoptedStyleSheets/.test(js));assert(!/@import/.test(cssText()));
  assert.throws(()=>validateGenerated(cssText()+'body { color: red; }',cssText(),'extra.css'),/Generated file differs/);
  assert.equal((cssText().match(/\/\* [a-z][a-z0-9-]*\.\d+ \*\//g)||[]).length,rules.reduce((n,r)=>n+r.declarations.length,0));
});
test('all four complete palettes meet every text, boundary, focus and slider contrast threshold',()=>{
  assert.equal(Object.keys(palettes).length,4);
  for(const [key,palette] of Object.entries(palettes)) {
    assert.deepEqual(Object.keys(palette.colors).sort(),Object.keys(tokens.colors).sort());
    for(const [fg,bg,minimum] of contrastPairs)assert(contrast(palette.colors[fg],palette.colors[bg])>=minimum,`${key}: ${fg}/${bg}: ${contrast(palette.colors[fg],palette.colors[bg]).toFixed(2)} < ${minimum}`);
  }
});
test('normal structural fields remain achromatic and subdued across appearance preferences',()=>{
  const structural=['canvas','surface','subtle','ink','muted','border','divider','disabled','disabled-bg','success-bg','warning-bg'];
  const channels=hex=>hex.slice(1).match(/../g).map(v=>parseInt(v,16));
  for(const [key,{theme,colors}] of Object.entries(palettes)) {
    for(const role of structural) {
      assert.equal(new Set(channels(colors[role])).size,1,`${key}: ${role} must not add hue to normal structural content`);
      assert.equal(colors[role],palettes[`${theme}-standard`].colors[role],`${key}: status preference must not tint structural roles`);
    }
    const levels=['canvas','surface','subtle'].map(role=>channels(colors[role])[0]);
    assert.equal(new Set(levels).size,3,`${key}: structural planes need distinguishable gray levels`);
    assert(Math.max(...levels)-Math.min(...levels)<=24,`${key}: structural separation must stay within the documented quiet range`);
    for(const level of levels)assert(level>0&&level<255,`${key}: avoid pure black/white large structural fields`);
  }
  const notice=rules.find(r=>r.id==='notice').declarations.find(d=>d.property==='border-inline-start');
  assert.match(notice.value,/solid var\(--ui-border\)/,'Routine guidance must retain a neutral boundary across densities');
  assert.equal(rules.find(r=>r.id==='backdrop').declarations[0].value,'#00000080','Modal dimming must not tint the background');
});
test('azure and focus identity stay consistent across status preferences without weakening text or focus checks',()=>{
  assert.equal(contrastExceptions.length,1);
  const exception=contrastExceptions[0];assert.equal(exception.selector,'.btn-primary');
  assert.deepEqual(exception.fills,['primary','primary-hover']);assert.deepEqual(exception.backgrounds,['canvas','surface','subtle']);
  assert.match(exception.reason,/visible|written|label/);assert.match(exception.exclusions,/icon-only.*inputs.*selection marks.*focus/);
  for(const theme of ['light','dark'])assert.equal(palettes[`${theme}-standard`].colors.focus,palettes[`${theme}-distinct`].colors.focus,`${theme}: status preferences must preserve the focus cue`);
  for(const {colors} of Object.values(palettes)) {
    assert.equal(colors.primary,'#006aa8','The selected primary fill must not become a pale or alternate brand color');
    assert.equal(colors['on-primary'],'#ffffff');
    for(const fill of exception.fills)assert(contrastPairs.some(([fg,bg,min])=>fg==='on-primary'&&bg===fill&&min>=4.5));
    for(const bg of exception.backgrounds) {
      assert(contrastPairs.some(([fg,surface,min])=>fg==='interactive'&&surface===bg&&min>=4.5));
      assert(contrastPairs.some(([fg,surface,min])=>fg==='focus'&&surface===bg&&min>=3));
    }
  }
  assert(contrastPairs.some(([fg,bg,min])=>fg==='on-interactive'&&bg==='interactive'&&min>=3));
  assert.match(exception.source,/w3.org/);
});
test('every CSS custom property is declared and consumed; Google token references resolve',()=>{
  const defined=new Set(rules.flatMap(r=>r.declarations).filter(d=>d.property.startsWith('--')).map(d=>d.property));
  const consumed=new Set([...cssText().matchAll(/var\((--[a-z0-9-]+)/g)].map(m=>m[1]));
  assert.deepEqual(defined,consumed);
  for(const [,path] of JSON.stringify(tokens).matchAll(/\{([a-zA-Z0-9.-]+)\}/g)) {
    let node=tokens;for(const key of path.split('.'))node=node?.[key];assert(node!==undefined,`Unknown token ${path}`);
  }
});
test('box audit covers every geometry declaration and rejects unregistered or unexplained spacing decisions',()=>{
  assert.equal(validateDensity(rules),true);
  const expected=rules.flatMap(r=>r.declarations.filter(d=>isBoxDeclaration(d.property,d.value)).map(d=>d.id));
  const audit=boxAudit(rules);assert.deepEqual(audit.map(e=>e.id),expected);
  for(const entry of audit){assert(entry.purpose.length>=40);assert(entry.intent.length>=25);assert(entry.normal&&entry.compact&&entry.behavior);}
  for(const key of ['purpose','intent']){const broken=structuredClone(densityTokens);broken[0][key]='';assert.throws(()=>validateDensity(rules,broken),/density decision/);}
  const unknown=structuredClone(rules);unknown[0].declarations.push({...unknown[0].declarations[0],id:'unregistered-space.1',property:'--ui-unregistered-space',value:'7px'});
  assert.throws(()=>validateDensity(unknown),/Unregistered spacing token/);
  const pointer=audit.find(e=>e.id==='density-coarse-floor.1');assert.equal(pointer.normal,'Not active');assert.equal(pointer.compact,compactCoarseMinimum);
});
test('compact density reduces content clearance while preserving focus room and pointer target floors',()=>{
  const px=value=>parseFloat(value)*(value.endsWith('rem')?16:1);
  for(const token of densityTokens)assert(px(token.compact)<=px(token.normal),`${token.property} must not grow under compact density`);
  assert(px(densityProfiles.compact['--ui-space-sm'])>=6,'Field row gaps must clear the 3px outline plus 3px offset');
  assert(px(densityProfiles.compact['--ui-control-min'])>=36);assert(px(compactCoarseMinimum)>=44);assert.match(coarseTargetMedia,/any-pointer: coarse/);assert.match(coarseTargetMedia,/pointer: none/);
  assert(px(densityProfiles.compact['--ui-switch-stroke'])>=1);assert(px(densityProfiles.compact['--ui-notice-stroke'])>=3);
  for(const rule of rules.filter(r=>r.id.startsWith('density-')))assert(rule.declarations.every(d=>d.property.startsWith('--')),'Density must not shrink text or replace the native interaction tree');
});
test('Google DESIGN.md uses canonical headings and generated structured token groups',async()=>{
  const lint=JSON.parse(await readFile(new URL('UI-Spec/reports/design-md-lint.json',root),'utf8'));
  for(const [key,path] of Object.entries(designFiles)) {
    const text=await readFile(new URL(path,root),'utf8');
    assert(text.startsWith('---\nversion: "alpha"\n'));assert.deepEqual([...text.matchAll(/^## (.+)$/gm)].map(m=>m[1]),['Overview','Colors','Typography','Layout','Elevation & Depth','Shapes','Components',"Do's and Don'ts"]);
    for(const group of ['colors','typography','spacing','rounded','components'])assert(text.includes(`\n${group}:\n`));
    const result=lint.reports?.[key];assert(result,`Missing official lint for ${key}`);
    assert.equal(result.inputSha256,createHash('sha256').update(text).digest('hex'),`Official lint snapshot stale: ${key}`);
    assert.equal(result.report.summary.errors,0);assert.deepEqual(result.report.findings.filter(f=>f.severity==='warning').map(f=>f.path),['colors.border','colors.divider','colors.focus']);
  }
});
test('selected Bootstrap declarations match pinned, licensed upstream provenance',async()=>{
  const provenance=JSON.parse(await readFile(new URL('UI-Spec/bootstrap-provenance.json',root),'utf8'));
  assert.equal(provenance.version,'5.3.8');assert.match(provenance.sha256,/^[a-f0-9]{64}$/);
  for(const rule of rules.filter(r=>r.source==='bootstrap')) {
    const original=provenance.rules.find(r=>r.id===rule.id);assert(original,rule.id);
    assert.equal(rule.media,original.media);assert.deepEqual(rule.declarations.map(({property,value})=>({property,value})),original.declarations);
  }
  assert.match(await readFile(new URL('../ui-spec/BOOTSTRAP-LICENSE.txt',import.meta.url),'utf8'),/MIT License/);
});
