import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
// Input is the official CLI's JSON stdout, not a claimed pass written by hand.
let input='';for await(const chunk of process.stdin)input+=chunk;
const report=JSON.parse(input.replace(/^\uFEFF/,''));
if(!report.summary || report.summary.errors!==0 || !Array.isArray(report.findings))throw Error('The official DESIGN.md lint report is missing or has errors.');
const source=await readFile(new URL('./DESIGN.md',import.meta.url),'utf8');
await writeFile(new URL('./reports/design-md-lint.json',import.meta.url),JSON.stringify({tool:'@google/design.md',version:'0.4.0',input:'UI-Spec/DESIGN.md',inputSha256:createHash('sha256').update(source).digest('hex'),report},null,2)+'\n');
console.log(`Recorded official lint: ${report.summary.errors} errors / ${report.summary.warnings} warnings. Review warnings before adoption.`);
