// Values are authored decisions, not a blanket scale transform.
// Every token states both its purpose and the user's intended benefit.
const decision=(property,normal,compact,purpose,intent)=>({property,normal,compact,purpose,intent});
export const densityTokens=[
  decision('--ui-space-xs','0.25rem','0.25rem','Keep a minimum inset around compact status text.','Read a short state without touching its boundary in either density.'),
  decision('--ui-space-sm','0.5rem','0.375rem','Separate tightly related labels, marks and field rows while leaving room for the offset focus ring.','Identify related content and see focus without excessive empty space.'),
  decision('--ui-space-md','0.75rem','0.5rem','Give individual values, cells and action clusters local separation.','Scan neighboring values without confusing their ownership.'),
  decision('--ui-space-lg','1rem','0.75rem','Separate body blocks and provide local reading insets.','Read related paragraphs and controls as distinct steps.'),
  decision('--ui-space-xl','1.5rem','1rem','Inset panels and separate peer blocks and Bootstrap gutters.','Distinguish groups while fitting more working content in compact mode.'),
  decision('--ui-space-section','2rem','1.5rem','Give page entry and empty-state explanations a clear start.','Recognize a working area without spending excessive height on clearance.'),
  decision('--ui-space-page','3rem','2rem','Separate major topics and leave trailing document room.','Locate a new section while reducing repeated scrolling in compact mode.'),
  decision('--ui-radius-small','0.375rem','0.25rem','Keep small controls and states visibly bounded without oversized corners.','Recognize the same control family at either density.'),
  decision('--ui-radius-panel','0.75rem','0.5rem','Distinguish containing panels from their smaller controls.','Recognize a group boundary while compact panels use less corner space.'),
  decision('--ui-control-min','2.75rem','2.25rem','Set a minimum native target height, allowing content to grow rather than fixing height.','Activate controls comfortably; compact fine-pointer targets stay at least 36px at the default root, with a separate 44px coarse/no-pointer floor.'),
  decision('--ui-control-pad-block','0.5rem','0.25rem','Give entered values and button labels vertical breathing room independently of minimum target height.','Read text inside a control while compact mode recovers redundant interior space.'),
  decision('--ui-notes-min','7rem','5.5rem','Provide a usable initial multi-line notes viewport without fixing its eventual height.','Read several note lines and enlarge the native textarea when needed.'),
  decision('--ui-notice-stroke','4px','3px','Mark routine guidance with a neutral emphasis stroke, narrower in compact mode.','Recognize contextual guidance without a heavy decorative edge.'),
  decision('--ui-switch-stroke','2px','1px','Keep a crisp visible switch track with an integer-pixel boundary.','Locate the native preference mark while the compact track occupies less space.'),
  decision('--ui-switch-width','3rem','2.5rem','Provide space for two visibly different thumb positions.','Recognize on/off position without relying on track hue.'),
  decision('--ui-switch-height','1.75rem','1.5rem','Fit the decorative thumb inside a track shorter than its full clickable label.','See the preference mark while retaining the larger label target.'),
  decision('--ui-switch-thumb','1.125rem','1rem','Keep the decorative thumb large enough to identify in its selected position.','Distinguish on/off position without oversized marks in compact mode.'),
  decision('--ui-swatch-size','3rem','2.5rem','Provide a visible color sample without letting demonstration patches dominate the reference.','Compare actual color roles while compact mode shows more samples and content.'),
  decision('--ui-dialog-clearance','1rem','0.75rem','Keep a modal inside the viewport with an external escape margin.','Read and scroll a blocking decision without losing its edges at narrow widths.'),
];
export const densityProfiles=Object.fromEntries(['normal','compact'].map(key=>[key,Object.fromEntries(densityTokens.map(t=>[t.property,t[key]]))]));
export const coarseTargetMedia='(any-pointer: coarse), (pointer: none)';
export const compactCoarseMinimum='2.75rem';

export function isBoxDeclaration(property,value='') {
  if(property.startsWith('--'))return densityTokens.some(t=>t.property===property)||/^--bs-gutter-/.test(property)||/^(?:-?\d*\.?\d+(?:px|rem|em|ch|%|vh|dvh)|calc\()/.test(value);
  if(/^(?:border|outline).*-(?:color|style)$/.test(property))return false;
  return /^(?:margin|padding|(?:row-|column-)?gap$|scroll-margin|border|outline|(?:min-|max-)?(?:inline|block)-size$|(?:min-|max-)?(?:width|height)$|box-sizing$|inset|top$|right$|bottom$|left$|transform$|grid-template-columns$|flex$|flex-basis$|font-size$|line-height$|text-underline-offset$|text-indent$|list-style-position$|resize$)/.test(property);
}
function resolve(value,profile) {
  const vars={...profile,'--bs-gutter-x':profile['--ui-space-xl'],'--bs-gutter-y':profile['--ui-space-xl']};
  return value.replace(/var\((--[a-z0-9-]+)\)/g,(match,key)=>vars[key]??match);
}
export function boxAudit(rules) {
  return rules.flatMap(rule=>rule.declarations.filter(d=>isBoxDeclaration(d.property,d.value)).map(d=>{
    const token=densityTokens.find(t=>t.property===d.property);
    const behavior=rule.source==='bootstrap'?'Framework baseline; project gutter override governs density':rule.id==='density-compact'?'Compact override':rule.id==='density-coarse-floor'?'Protected pointer floor':token||/var\(--ui-(?:space|radius|control|notes|notice|switch|swatch|dialog)-/.test(d.value)?'Density governed':'Protected geometry or structural reset';
    const conditionalToken=['density-compact','density-coarse-floor'].includes(rule.id);
    return {id:d.id,selector:rule.selector,condition:rule.media,property:d.property,value:d.value,normal:conditionalToken?'Not active':token?token.normal:resolve(d.value,densityProfiles.normal),compact:conditionalToken?d.value:token?token.compact:resolve(d.value,densityProfiles.compact),behavior,purpose:d.purpose,intent:d.intent};
  }));
}
export function validateDensity(rules,decisions=densityTokens) {
  const names=new Set();
  for(const t of decisions) {
    if(names.has(t.property)||!/^--ui-[a-z-]+$/.test(t.property)||!/^\d+(?:\.\d+)?(?:rem|px)$/.test(t.normal)||!/^\d+(?:\.\d+)?(?:rem|px)$/.test(t.compact)||typeof t.purpose!=='string'||t.purpose.length<35||typeof t.intent!=='string'||t.intent.length<35)throw new Error('Missing or invalid density decision: '+t.property);
    names.add(t.property);
  }
  for(const rule of rules)for(const d of rule.declarations)if(d.property.startsWith('--')&&isBoxDeclaration(d.property,d.value)&&!names.has(d.property)&&!/^--bs-gutter-/.test(d.property))throw new Error('Unregistered spacing token: '+d.property);
  for(const entry of boxAudit(rules))if(!entry.purpose||!entry.intent||!entry.behavior||!entry.normal||!entry.compact)throw new Error('Unreviewed box setting: '+entry.id);
  return true;
}
