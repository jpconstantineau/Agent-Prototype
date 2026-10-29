import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const provenance=JSON.parse(await readFile(new URL('./bootstrap-provenance.json',import.meta.url),'utf8'));
const response=await fetch(provenance.sourceUrl);if(!response.ok)throw Error(`Bootstrap source HTTP ${response.status}`);
const css=await response.text();
if(createHash('sha256').update(css).digest('hex')!==provenance.sha256)throw Error('Pinned Bootstrap source digest changed. Review the upstream file.');
for(const rule of provenance.rules)if(!css.includes(rule.original))throw Error(`Upstream rule differs: ${rule.id}`);
console.log(`Verified ${provenance.rules.length} literal Bootstrap ${provenance.version} grid rules and full-source digest.`);
