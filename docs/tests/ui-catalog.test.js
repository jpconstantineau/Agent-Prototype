import {test} from 'node:test';
import assert from 'node:assert/strict';
import {catalog,includedCatalog,validateCatalog} from '../../UI-Spec/component-catalog.mjs';
import {examples,validateExamples} from '../../UI-Spec/catalog-examples.mjs';
import {rules} from '../../UI-Spec/system.mjs';
import {dashboardExamples,percentage} from '../../UI-Spec/dashboard-examples.mjs';
test('reviewed core catalogs have complete, unique classification and runnable class/markup coverage',()=>{
 assert.deepEqual(validateCatalog(),{shadcn:66,daisy:68});assert.equal(catalog.length,96);assert.equal(includedCatalog.length,87);validateExamples(includedCatalog);
 for(const c of includedCatalog)for(const name of c.classes){assert(new RegExp('class="[^"]*\\b'+name+'\\b').test(examples[c.id]),c.id+': missing class in example '+name);assert(rules.some(r=>r.selector.includes('.'+name)),c.id+': missing audited CSS '+name);}
 assert.throws(()=>validateCatalog([...catalog,catalog[0]]),/Invalid catalog/);assert.throws(()=>validateExamples([{id:'missing'}]),/Missing example/);
 for(const c of catalog.filter(c=>c.kind==='script'))assert(!examples[c.id],'Do not present a CSS shell as a runnable widget: '+c.id);
});

test('dashboard examples retain supplied values, audited classes and a valid shared scale',()=>{
 assert.equal(dashboardExamples.length,8);assert.equal(new Set(dashboardExamples.map(c=>c.id)).size,8);
 for(const example of dashboardExamples){assert(example.purpose.length>=40&&example.intent.length>=40);assert(!/<script\b|\son[a-z]+\s*=|\sstyle\s*=|<style\b/.test(example.html));for(const cls of example.classes){assert(example.html.includes(cls));assert(rules.some(r=>r.selector.includes('.'+cls)));}}
 assert.equal(percentage(0),0);assert.equal(percentage(54,0,80),67.5);assert.equal(percentage(80,0,80),100);assert.equal(percentage(0,-10,10),50);
 for(const args of [[null],[NaN],[Infinity],[-1],[101],[1,1,1],[1,2,1],['54']])assert.throws(()=>percentage(...args),/Invalid dashboard/);
});
test('catalog motion frames are explicitly scoped, audited and have opt-in plus reduced-motion rules',()=>{
 const frames=rules.filter(r=>r.keyframes);assert.equal(frames.length,5);assert.deepEqual(new Set(frames.map(r=>r.keyframes)),new Set(['ui-catalog-spin','ui-catalog-word','ui-catalog-loading-border']));
 for(const frame of frames){assert.equal(frame.check,'catalog');assert(frame.declarations.every(d=>d.purpose&&d.intent));}
 for(const r of rules.filter(r=>r.declarations.some(d=>d.property==='animation'&&d.value!=='none')))assert(r.selector.includes(':has(.ui-motion-enable:checked)'),'Animation needs explicit opt-in: '+r.id);
 assert(rules.some(r=>r.media==='(prefers-reduced-motion: reduce)'&&r.declarations.some(d=>d.property==='animation'&&d.value==='none')));
});
