import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {designFiles} from './palettes.mjs';
// Input is the official CLI's JSON stdout, not a claimed pass written by hand.
let input='';for await(const chunk of process.stdin)input+=chunk;
const report=JSON.parse(input.replace(/^\uFEFF/,''));
if(!report.summary || report.summary.errors!==0 || !Array.isArray(report.findings))throw Error('The official DESIGN.md lint report is missing or has errors.');
const palette=process.argv[2]||'light-standard';
if(!Object.hasOwn(designFiles,palette))throw Error('Unknown appearance combination.');
const inputPath=designFiles[palette],source=await readFile(new URL('../'+inputPath,import.meta.url),'utf8');
const target=new URL('./reports/design-md-lint.json',import.meta.url);
let snapshot={};try{snapshot=JSON.parse(await readFile(target,'utf8'));}catch{}
const reports=snapshot.reports||{};
reports[palette]={input:inputPath,inputSha256:createHash('sha256').update(source).digest('hex'),report};
await writeFile(target,JSON.stringify({tool:'@google/design.md',version:'0.4.0',reports},null,2)+'\n');
console.log(`Recorded ${palette} official lint: ${report.summary.errors} errors / ${report.summary.warnings} warnings. Review warnings before adoption.`);
