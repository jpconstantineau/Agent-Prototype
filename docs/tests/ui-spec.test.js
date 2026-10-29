import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {rules,tokens,contrastPairs} from '../../UI-Spec/system.mjs';
import {outputs,cssText} from '../../UI-Spec/build.mjs';
import {validateRegistry,validateGenerated,checkFamilies,contrast} from '../../UI-Spec/validate.mjs';
const root=new URL('../../',import.meta.url);

test('every CSS declaration maps to a purpose, user intent and actual verification family',async()=>{
  assert.equal(validateRegistry(rules),true);
  const used=new Set(rules.map(r=>r.check));assert.deepEqual(used,checkFamilies);
  const tests=await readFile(new URL('../e2e/ui-spec.spec.js',import.meta.url),'utf8');
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
  const html=await readFile(new URL('../ui-spec/index.html',import.meta.url),'utf8'),js=await readFile(new URL('../ui-spec/reference.js',import.meta.url),'utf8');
  assert.equal((html.match(/rel="stylesheet"/g)||[]).length,1);assert(!/<style\b|\sstyle\s*=/.test(html));assert(!/\.style\b|setAttribute\(['"]style|insertRule|adoptedStyleSheets/.test(js));assert(!/@import/.test(cssText()));
  assert.throws(()=>validateGenerated(cssText()+'body { color: red; }',cssText(),'extra.css'),/Generated file differs/);
  assert.equal((cssText().match(/\/\* [a-z][a-z0-9-]*\.\d+ \*\//g)||[]).length,rules.reduce((n,r)=>n+r.declarations.length,0));
});
test('semantic color pairings meet text and control contrast thresholds',()=>{
  for(const [fg,bg,minimum] of contrastPairs)assert(contrast(tokens.colors[fg],tokens.colors[bg])>=minimum,`${fg}/${bg}: ${contrast(tokens.colors[fg],tokens.colors[bg]).toFixed(2)} < ${minimum}`);
});
test('every CSS custom property is declared and consumed; Google token references resolve',()=>{
  const defined=new Set(rules.flatMap(r=>r.declarations).filter(d=>d.property.startsWith('--')).map(d=>d.property));
  const consumed=new Set([...cssText().matchAll(/var\((--[a-z0-9-]+)/g)].map(m=>m[1]));
  assert.deepEqual(defined,consumed);
  for(const [,path] of JSON.stringify(tokens).matchAll(/\{([a-zA-Z0-9.-]+)\}/g)) {
    let node=tokens;for(const key of path.split('.'))node=node?.[key];assert(node!==undefined,`Unknown token ${path}`);
  }
});
test('Google DESIGN.md uses canonical headings and generated structured token groups',async()=>{
  const text=await readFile(new URL('UI-Spec/DESIGN.md',root),'utf8');
  assert(text.startsWith('---\nversion: "alpha"\n'));assert.deepEqual([...text.matchAll(/^## (.+)$/gm)].map(m=>m[1]),['Overview','Colors','Typography','Layout','Elevation & Depth','Shapes','Components',"Do's and Don'ts"]);
  for(const group of ['colors','typography','spacing','rounded','components'])assert(text.includes(`\n${group}:\n`));
  const lint=JSON.parse(await readFile(new URL('UI-Spec/reports/design-md-lint.json',root),'utf8'));
  assert.equal(lint.inputSha256,createHash('sha256').update(text).digest('hex'),'Official lint snapshot is stale. Re-run the documented lint procedure.');
  assert.equal(lint.report.summary.errors,0);assert.deepEqual(lint.report.findings.filter(f=>f.severity==='warning').map(f=>f.path),['colors.border','colors.divider','colors.focus']);
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
