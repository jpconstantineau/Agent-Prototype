export const checkFamilies = new Set(['tokens','reflow','type','focus','editing','controls','grid','navigation','targets','panels','contrast','validation','table','states','colors','dialog','forced-colors','density']);
export function validateGenerated(actual, expected, path) {
  if (actual !== expected) throw new Error(`Generated file differs: ${path}. Run node UI-Spec/build.mjs.`);
}
export function validateRegistry(rules) {
  const ids = new Set();
  const remember = id => { if (typeof id !== 'string' || !/^[a-z][a-z0-9-]*(?:\.\d+)?$/.test(id) || ids.has(id)) throw new Error(`Invalid or duplicate decision ID: ${id}`); ids.add(id); };
  for (const r of rules) {
    remember(r.id);
    if (!r.selector || /[{}]/.test(r.selector) || !checkFamilies.has(r.check) || !['project','bootstrap'].includes(r.source) || !r.declarations?.length) throw new Error(`Invalid rule scope/source/check: ${r.id}`);
    const properties = new Set();
    for (const d of r.declarations) {
      remember(d.id);
      if (!/^--?[a-z][a-z0-9-]*$|^[a-z][a-z0-9-]*$/.test(d.property) || properties.has(d.property) || !d.value || /[;{}]/.test(d.value)) throw new Error(`Invalid or duplicate property/value: ${d.id}`);
      properties.add(d.property);
      if (typeof d.purpose !== 'string' || d.purpose.length < 40 || !d.purpose.startsWith(`${r.purpose} `) || typeof d.intent !== 'string' || d.intent.length < 25 || d.intent !== r.intent || d.check !== r.check || d.status !== 'proposed') throw new Error(`Missing purpose/intent/review mapping: ${d.id}`);
    }
  }
  return true;
}
export function contrast(a,b) {
  const lum = hex => {
    const c=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
    return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;
  };
  const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
}
