// Document presentation only. The renderer's allowed AST/HTML remains a separate contract.
export const proseHeadings = [
  {level:1,size:'2rem',rhythm:'1.2',purpose:'Identify the document title at the largest reading size.'},
  {level:2,size:'1.75rem',rhythm:'1.25',purpose:'Separate major document sections below the title.'},
  {level:3,size:'1.5rem',rhythm:'1.25',purpose:'Identify a subsection within a major document topic.'},
  {level:4,size:'1.25rem',rhythm:'1.3',purpose:'Mark a local topic without competing with its parent section.'},
  {level:5,size:'1.125rem',rhythm:'1.35',purpose:'Distinguish a detailed subdivision while staying above body size.'},
  {level:6,size:'1rem',rhythm:'1.4',purpose:'Keep the deepest heading readable at body size, with heading weight.'},
];
export function installProse(rule) {
  const add=(id,selector,purpose,intent,declarations,media=null)=>rule(id,selector,purpose,intent,'prose',declarations,media);
  const blocks='p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table';
  const headings='h1, h2, h3, h4, h5, h6';
  add('prose-root','.ui-prose','Provide an opt-in reading surface for document content.','Read a document without changing application navigation, forms or task lists.',[
    ['display','flow-root','Contain block margin behavior within the document surface without clipping focus or content.'],
    ['max-inline-size','65ch','Limit sustained reading width while allowing the available viewport to be narrower.'],
    ['min-inline-size','0','Let embedded documents shrink inside flex/grid workspaces instead of forcing page overflow.'],
    ['color','var(--ui-ink)','Keep document text on the existing contrast-checked ink role.'],
    ['line-height','1.5','Use the same readable body rhythm in both density profiles.'],
  ]);
  add('prose-reset',`.ui-prose :where(${blocks})`,'Give document block spacing one explicit owner.','Read paragraphs, quotations and lists without accumulated browser-default margins.',[
    ['margin-block','0','Reset both block margins before applying sibling rhythm; the first/last block adds no outside margin.'],
    ['margin-inline','0','Remove browser quote/figure side margins so their documented inset owns horizontal space.'],
  ]);
  add('prose-rhythm',`.ui-prose :where(${blocks}) + :where(${blocks})`,'Separate consecutive document blocks.','Recognize a new reading block without doubled trailing and leading margins.',[
    ['margin-block-start','var(--ui-space-lg)','Use one 16px normal / 12px compact gap between ordinary neighboring blocks.'],
  ]);
  add('prose-heading',`.ui-prose :where(${headings})`,'Keep all six document ranks visibly related.','Find the document structure using readable, consistent heading emphasis.',[
    ['font-weight','600','Distinguish headings from 400-weight body text without extra colors or all-caps labels.'],
    ['scroll-margin-block-start','var(--ui-space-lg)','Leave breathing room above a heading reached by an anchor without adding flow height.'],
  ]);
  for(const h of proseHeadings)add(`prose-h${h.level}`,`.ui-prose h${h.level}`,'Express the document heading hierarchy.','Recognize a heading rank without reducing text size in compact mode.',[
    ['font-size',h.size,h.purpose+' This size is protected in both densities.'],
    ['line-height',h.rhythm,'Keep wrapped heading lines together while allowing glyphs and annotations room.'],
  ]);
  add('prose-heading-before',`.ui-prose :where(${blocks}) + :where(${headings})`,'Make a new document topic distinct from preceding content.','Associate the heading with what follows rather than the paragraph before it.',[
    ['margin-block-start','var(--ui-space-xl)','Use 24px normal / 16px compact before a heading, greater than its following gap.'],
  ]);
  add('prose-heading-after',`.ui-prose :where(${headings}) + :where(${blocks})`,'Connect a heading to its introductory content.','Start reading the correct section without an oversized gap below its title.',[
    ['margin-block-start','var(--ui-space-md)','Use 12px normal / 8px compact after a heading; when two headings are consecutive, this nearer grouping takes precedence.'],
  ]);
  add('prose-lists','.ui-prose :where(ul, ol)','Keep list markers outside aligned item text.','Follow wrapped items and distinguish nesting without inserting typed bullet characters.',[
    ['padding-inline-start','var(--ui-space-xl)','Reserve a 24px normal / 16px compact bullet gutter using logical direction.'],
    ['list-style-position','outside','Align wrapped text with item text rather than wrapping beneath the marker.'],
  ]);
  add('prose-bullets','.ui-prose ul','Keep unordered content recognizable at every nesting level.','Recognize a real list even when browser default nested marker choices differ.',[['list-style-type','disc','Use a familiar filled bullet; indentation and native list semantics carry nesting.']]);
  add('prose-numbering','.ui-prose ol','Keep sequence visible and preserve native start/value semantics.','Read steps in their actual order, including explicit continuation numbers.',[
    ['list-style-type','decimal','Use native decimal counters rather than CSS-generated essential numbers.'],
    ['padding-inline-start','4ch','Reserve a protected character-based gutter for ordinary multi-digit step numbers.'],
  ]);
  add('prose-wide-numbering','.ui-prose ol[start], .ui-prose ol.ui-list-wide','Allow larger explicit starting numbers.','Read up to six-digit sequence numbers without clipping them at the content edge.',[['padding-inline-start','8ch','Reserve six digits, punctuation and separation; this structural marker allowance does not shrink with density.']]);
  add('prose-item-gap','.ui-prose li + li','Separate sibling list items.','Scan individual points while keeping them grouped more closely than independent paragraphs.',[['margin-block-start','var(--ui-space-sm)','Use 8px normal / 6px compact between item boxes.']]);
  add('prose-nested-list','.ui-prose li > :where(ul, ol)','Keep a nested list attached to its owning item.','Read supporting subpoints as part of the parent rather than a new document block.',[['margin-block-start','var(--ui-space-sm)','Use the related-content gap after the parent text; no extra list bottom margin is added.']]);
  add('prose-loose-item','.ui-prose li > p + p','Separate paragraphs within one list item.','Read a longer explanation without confusing each paragraph with a new numbered step.',[['margin-block-start','var(--ui-space-sm)','Use one related-content gap rather than full document paragraph separation.']]);
  add('prose-term','.ui-prose dt','Identify a definition term without changing its semantics.','Find the term whose explanation follows.',[['font-weight','600','Use heading-like emphasis at body size, without pretending a term is a section heading.']]);
  add('prose-definition','.ui-prose dd','Associate a definition with its preceding term.','Read a term and explanation as one entry with a modest inset.',[
    ['margin-inline-start','var(--ui-space-lg)','Inset definitions by 16px normal / 12px compact instead of the browser default 40px.'],
    ['margin-block','var(--ui-space-xs) 0','Keep 4px after the term and no trailing margin that could double the next entry gap.'],
  ]);
  add('prose-next-term','.ui-prose dd + dt','Separate consecutive definition entries.','Recognize where the next term starts.',[['margin-block-start','var(--ui-space-md)','Use a 12px normal / 8px compact entry boundary.']]);
  add('prose-quote','.ui-prose blockquote','Set quoted material apart without suggesting an alert.','Distinguish another author’s words while reading them at normal body contrast.',[
    ['padding-inline-start','var(--ui-space-lg)','Separate quote text from its neutral start rule by 16px normal / 12px compact.'],
    ['border-inline-start','var(--ui-notice-stroke) solid var(--ui-border)','Reuse the neutral 4px normal / 3px compact guidance stroke as a quotation boundary.'],
  ]);
  add('prose-attribution','.ui-prose .ui-attribution','Identify a quotation attribution.','Find the source separately from the quoted passage.',[['font-size','0.875rem','Use the existing readable secondary size, unchanged by density.'],['color','var(--ui-muted)','Use the checked supporting-text role rather than fading the entire quote.']]);
  add('prose-strong','.ui-prose :where(strong, b)','Make textual importance visible.','Recognize emphasis without relying on color.',[['font-weight','700','Use a stronger weight than headings where the author marks inline importance or attention.']]);
  add('prose-emphasis','.ui-prose :where(em, i, cite, dfn)','Retain recognizable inline emphasis and titles.','Distinguish stress, a cited work or a defined term from ordinary prose.',[['font-style','italic','Retain native italic semantics without changing text color or size.']]);
  add('prose-mark','.ui-prose mark','Identify a relevant text passage using a neutral framed highlight.','Locate highlighted content in either brightness without mistaking it for success or error.',[
    ['background-color','var(--ui-subtle)','Reuse the contrast-tested neutral support plane instead of browser-default yellow.'],
    ['color','var(--ui-ink)','Keep highlighted text at full reading contrast on that plane.'],
    ['outline','1px solid currentColor','Make the highlight detectable through its boundary as well as a small background difference.'],
  ]);
  add('prose-insertion','.ui-prose ins','Keep inserted text visibly distinct without green coding.','Recognize an insertion alongside a written change explanation.',[['text-decoration-line','underline','Use a non-color insertion cue.'],['text-decoration-style','double','Distinguish insertion from ordinary underlined links.']]);
  add('prose-deletion','.ui-prose :where(del, s)','Keep removed or outdated text visible.','Compare the original wording with its replacement.',[['text-decoration-line','line-through','Preserve readable source words while indicating their removal or loss of relevance.']]);
  add('prose-monospace','.ui-prose :where(code, pre, kbd, samp)','Make literal code, key names and machine output identifiable.','Copy exact characters without proportional text disguising their spacing.',[
    ['font-family','ui-monospace, Consolas, "Liberation Mono", monospace','Use installed monospace fonts without a remote font dependency.'],
    ['font-size','0.875em','Keep literal text readable while avoiding oversized monospace glyphs.'],
    ['color','var(--ui-ink)','Keep code and output at checked reading contrast, including inside links.'],
  ]);
  add('prose-inline-code','.ui-prose :not(pre) > code','Separate a short literal identifier from surrounding prose.','Recognize code without treating it as a button or reducing its copyable content.',[
    ['background-color','var(--ui-subtle)','Use the existing neutral secondary plane rather than a new syntax palette.'],
    ['padding-inline','var(--ui-space-xs)','Keep 4px at either edge of the identifier without adding line-height-changing block padding.'],
    ['box-decoration-break','clone','Keep the inline code inset/background on each wrapped fragment.'],
  ]);
  add('prose-pre','.ui-prose pre','Preserve exact source layout inside a bounded reading block.','Inspect indentation and long code lines without horizontal scrolling of the whole page.',[
    ['max-inline-size','100%','Bound the preformatted box by its document container.'],
    ['overflow','auto','Keep long lines and enlarged text reachable inside the code box.'],
    ['white-space','pre','Preserve source spaces and newlines; wrapping is not silently inserted into code.'],
    ['overflow-wrap','normal','Prevent the inherited prose wrapping rule from breaking literal source layout.'],
    ['padding','var(--ui-space-lg)','Inset code by 16px normal / 12px compact, leaving room for focus.'],
    ['border','1px solid var(--ui-divider)','Give the code region a quiet boundary without implying an editable form.'],
    ['background-color','var(--ui-subtle)','Keep the code block neutral in every palette.'],
  ]);
  add('prose-pre-code','.ui-prose pre code','Keep the code block’s type scale single-owned.','Read a code block without compounded font-size reduction.',[['font-size','inherit','Cancel the nested 0.875em reduction; the pre element already owns that scale.']]);
  add('prose-key','.ui-prose kbd','Identify keyboard input as a key name.','Recognize an instruction such as Ctrl and Enter without a fake interactive button.',[
    ['padding','0 var(--ui-space-xs)','Reserve a small inline inset while preserving the paragraph rhythm.'],
    ['border','1px solid var(--ui-border)','Use a clear neutral key boundary, never a hover/click state.'],
    ['border-radius','var(--ui-radius-small)','Relate the small keycap shape to other bounded UI without adding a shadow.'],
  ]);
  add('prose-abbreviation','.ui-prose abbr[title]','Signal that an abbreviation has an expansion.','Notice supplementary terminology without confusing it with a link.',[['text-decoration','underline dotted','Use a dotted underline rather than the solid link convention; prose must still explain the term on first use.'],['text-underline-offset','0.2em','Separate the indicator from letter descenders as for existing text links.']]);
  add('prose-annotations','.ui-prose :where(sub, sup)','Keep small baseline annotations readable.','Read formula indices and references without changing the whole line rhythm.',[['font-size','0.875em','Use a readable relative annotation size instead of a tiny absolute label.'],['line-height','0','Let the surrounding body line own spacing while native sub/super vertical alignment places the annotation.']]);
  add('prose-rule','.ui-prose hr','Mark a thematic change using a quiet separator.','Recognize a break in topic without an alarm-like color band.',[['border','0','Remove browser inset borders before drawing one intended edge.'],['border-block-start','1px solid var(--ui-divider)','Draw one passive divider with protected 1px width.']]);
  add('prose-table-region','.ui-prose .ui-prose-table','Contain a document table’s two-dimensional layout.','Compare wide columns using a named keyboard-accessible region without panning the page.',[['max-inline-size','100%','Bound the region to the prose width.'],['overflow-x','auto','Keep horizontal scrolling local to the table.'],['padding','var(--ui-space-sm)','Reserve 8px normal / 6px compact inner clearance for links and their focus outlines.']]);
  add('prose-table','.ui-prose table','Fit document tables to their content and reading region.','Read a small table without inheriting the application example’s six-column width.',[['inline-size','100%','Use the available comparison width.'],['min-inline-size','0','Override the .table sample’s 36rem minimum when reused inside a document.'],['border-collapse','collapse','Avoid doubled cell dividers.'],['overflow-wrap','normal','Keep words and identifiers intact for comparison; a wide table scrolls inside its named region instead of squeezing columns to single letters.']]);
  add('prose-cell','.ui-prose :where(th, td)','Keep document cells legible and related to their headers.','Compare values using semantic columns without cramped or overflowing cells.',[['padding','var(--ui-space-sm) var(--ui-space-md)','Use 8/12px normal and 6/8px compact vertical/horizontal clearance.'],['text-align','start','Align ordinary text with its reading direction.'],['vertical-align','top','Align multiline cells at the start of each record.'],['border-block-end','1px solid var(--ui-divider)','Separate rows without heavy full grids.']]);
  add('prose-table-caption','.ui-prose caption','Introduce the comparison before its data.','Know the table’s purpose before navigating its headers.',[['caption-side','top','Keep the caption before the data.'],['text-align','start','Align the caption with reading order.'],['padding-block-end','var(--ui-space-sm)','Separate the caption from header cells by the related-content gap.'],['color','var(--ui-muted)','Use the checked supporting role.']]);
  add('prose-image','.ui-prose img','Fit an explicitly permitted image without distortion.','Inspect local document media without horizontal page overflow.',[['display','block','Avoid an inline baseline gap below an illustration.'],['max-inline-size','100%','Scale down an image wider than its reading container.'],['block-size','auto','Preserve intrinsic aspect ratio, including dimensions reserved by HTML width/height.']]);
  add('prose-figure-caption','.ui-prose figcaption','Keep a figure’s explanation attached to its image.','Read the image’s meaning and source without confusing the caption with body content.',[['margin-block-start','var(--ui-space-sm)','Use the related-content gap between media and its caption.'],['font-size','0.875rem','Use the existing readable secondary size.'],['color','var(--ui-muted)','Keep the explanation readable in every palette.']]);
  add('prose-details','.ui-prose details','Bound optional supporting document material.','Recognize information that can be expanded without hiding the main explanation.',[['padding','var(--ui-space-lg)','Leave 16px normal / 12px compact inset for text and focus.'],['border','1px solid var(--ui-divider)','Identify the optional group with a quiet boundary.']]);
  add('prose-summary','.ui-prose summary','Keep native disclosure activation visible and comfortable.','Open optional material with click, touch, Enter or Space and see its current state.',[['min-block-size','var(--ui-control-min)','Use the governed fine/coarse pointer target floor on the native summary.'],['cursor','pointer','Confirm activation without replacing the native triangle or keyboard behavior.'],['font-weight','600','Distinguish the persistent disclosure label from its revealed content.']]);
  add('prose-summary-focus','.ui-prose summary:focus-visible','Expose keyboard focus on a native disclosure label.','Find the disclosure receiving keyboard input in every appearance.',[['outline','3px solid var(--ui-focus)','Match the protected keyboard focus perimeter used by other native controls.'],['outline-offset','3px','Separate keyboard focus from the disclosure text and containing border.']]);
  add('prose-summary-forced-focus','.ui-prose summary:focus-visible','Respect the system focus color on document disclosures.','Find the optional-content control under a forced-color preference.',[['outline-color','Highlight','Use the user-selected platform focus role rather than the authored palette.']], '(forced-colors: active)');
  add('prose-summary-content','.ui-prose details[open] > summary + *','Separate an expanded disclosure from its label.','Recognize which content was revealed by the summary.',[['margin-block-start','var(--ui-space-sm)','Use one related-content gap after the open summary.']]);
  add('prose-task-list','.ui-prose .ui-task-list','Present task markers as read-only document information.','Read checked and unchecked states without accidentally changing application tasks.',[['list-style-type','none','Avoid a second bullet beside the explicitly worded task indicator.']]);
  add('prose-task-marker','.ui-prose .ui-task-marker','Keep a noninteractive task status next to its text.','Recognize the written Done/Open state without mistaking it for an actionable checkbox.',[['font-weight','600','Emphasize the explicit state word without color dependence.']]);
  add('prose-forced-mark','.ui-prose mark','Keep marked text readable in the platform contrast palette.','Find highlighted passages when authored colors are replaced by the user.',[['background-color','Mark','Use the system highlight background.'],['color','MarkText','Use its paired system text foreground.']], '(forced-colors: active)');
}
