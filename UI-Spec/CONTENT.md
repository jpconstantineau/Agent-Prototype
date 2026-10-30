# Document content and typography

## Purpose

Fill document-formatting gaps with an opt-in `.ui-prose` layer: six heading ranks, predictable list/paragraph rhythm, inline meaning, quotations, literal content, tables, figures and disclosures. Every declaration in prose.mjs enters the existing CSS decision ledger and box audit. This presentation layer uses native HTML/CSS, independently of Markdown parsing, React or TypeScript.

## User intent

Navigate a document's structure, follow steps and nested points, distinguish quoted and literal text, compare data and understand media. Choose compact spacing without smaller reading text, lost content or hidden keyboard focus.

## Agent intent

Implementation agents map permitted content to semantic elements, scope document styles explicitly and retain a concrete purpose and user intent for every declaration. Runtime agents do not invoke this layer or gain tools/authority through formatted content. Rendering agent output follows the same source/permission contract as other document content.

## Scope and integration

[prose.mjs](prose.mjs) exports heading decisions and installs scoped rules through system.mjs's audited builder. Appended IDs begin prose-. Existing application heading sizes, declaration IDs, palettes and contrast requirements retain their contracts. Google DESIGN.md exposes six document typography tokens and matching component references alongside the application scale.

The [live specimen](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/content.html) is authored HTML, with the one generated stylesheet and the shared appearance preference script. It shares light/dark, standard/distinct and normal/compact preferences with the component reference. Native reading/disclosure works without JavaScript; the appearance switches require it. No inline styles, new framework or remote fonts are added. Production app screens are outside this reference change.

The [document workspace spec](../spec/document-workspace.md#feature-markdown-rendering-intent-actors-and-dialect) still governs daylist-markdown-v1: paragraphs, headings, bounded lists, blockquotes, thematic breaks, code, selected inlines/links and noninteractive task indicators. Broader HTML specimens do not add parser features or allow arbitrary HTML. Unsupported Markdown remains visible source. CSS cannot authorize executable content, remote images, links or tool calls.

## Six-level heading hierarchy

| Rank | Size | At a 16px root | Weight | Unitless line height | Purpose |
| --- | --- | --- | --- | --- | --- |
| h1 | 2rem | 32px | 600 | 1.2 | Document title |
| h2 | 1.75rem | 28px | 600 | 1.25 | Major section |
| h3 | 1.5rem | 24px | 600 | 1.25 | Subsection |
| h4 | 1.25rem | 20px | 600 | 1.3 | Local topic |
| h5 | 1.125rem | 18px | 600 | 1.35 | Detailed subdivision |
| h6 | 1rem | 16px | 600 | 1.4 | Deepest heading at body size |

Each rank is distinguishable; none is smaller than body text. Deep headings have additional relative line clearance, and h6 differs from 400-weight body through weight. These exact values are project choices. Both densities retain these sizes/weights/line heights; rem respects browser preferences. No added hue, uppercase or tracking substitutes for hierarchy.

Use semantic heading order. The standalone specimen has one h1 and a meaningful h2–h6 chain. Embedded documents must fit the host outline: consistently map source ranks into available levels and retain source rank separately if needed for presentation. Never silently clamp multiple ranks or add competing page titles. If six ranks cannot fit the host outline, offer a standalone reading view. Trusted application code owns anchor IDs; scroll margin uses lg without adding document-flow height.

## Box and margin ownership

`.ui-prose` is a flow root capped at 65ch with min-inline-size:0, checked ink and line-height:1.5. It contains outer margin collapse without clipping focus or contents. The cap limits reading distance; it is not a minimum width. Keep application forms/toolbars outside prose so document spacing cannot interfere with controls.

| Owner | Normal / compact at a 16px root | Purpose |
| --- | --- | --- |
| Block/inline margin reset | 0 | Replace default paragraph, quote and figure offsets; no extra outside first/last margin. |
| Consecutive ordinary blocks | 16 / 12px leading margin | One gap instead of competing trailing/leading margins. |
| Heading after content | 24 / 16px before | Strong topic boundary that attaches the heading to following content. |
| Content after a heading | 12 / 8px before | Connect the introduction to its title. This later rule also groups consecutive headings closely. |
| Sibling items / nested-list start | 8 / 6px | Keep points separate within their parent group. |
| Paragraphs in one loose item | 8 / 6px | Preserve one step with several explanatory paragraphs. |
| Definition inset | 16 / 12px | Associate definition and term without the default 40px inset. |
| Term-to-definition / next term | 4 / 4px; 12 / 8px | Keep one entry close and separate the next. |
| Quote inset / stroke | 16 / 12px; 4 / 3px | Neutral quotation geometry, not an alert. |
| Code/disclosure inset | 16 / 12px | Separate content from boundaries and preserve focus room. |
| Figure-caption separation | 8 / 6px | Attach explanation to its image. |

Ordinary flow margins can collapse. Earlier blocks have zero trailing margin, so the intended leading sibling gap remains the single effective separation. User text-spacing overrides must still work when they increase margins. All geometry declarations, including structural resets and protected type, appear in BOX-MODEL-AUDIT.md.

## Lists and definitions

Use real ul/ol/li and native markers, not typed bullets or CSS-generated essential numbering. Unordered lists use disc at every level; indentation and semantics convey nesting. Their outside-marker gutter uses xl: 24px normal / 16px compact. Wrapped lines align with item text. Ordered lists retain native decimal counters and start/value/reversed semantics, with a protected 4ch marker gutter. Explicit start attributes and `.ui-list-wide` use 8ch for up to six digits plus punctuation/separation; add the wide class if item count/value requires it without a start attribute.

Fixtures include wrapped items, six nested bullet levels, loose items with paragraphs/quotes, continuation at 98–100 and a 999999 start. These bounded examples do not prove every combination of deep nesting and six-digit numbering fits every viewport. Renderer integration must enforce its nesting limits, preserve unsupported source and assess such combinations before adoption. Do not renumber content for appearance. Definition lists retain dt/dd semantics: bold term, modest definition inset, explicit entry spacing.

Task markers use visible [Done]/[Open] words in noninteractive spans. They are selectable accessible text, without input roles, tabindex, handlers or tool writes. Their list removes the redundant bullet. A renderer can map source checkbox notation to these explicit equivalent words while leaving source unchanged.

## Inline elements and retained defaults

| Element | Behavior and user purpose |
| --- | --- |
| strong / b | 700 weight identifies importance/attention without hue; choose the correct semantics. |
| em / i / cite / dfn | Italic retains stress, alternate voice, work-title and defined-term distinctions without lower contrast. |
| small | Existing 0.875rem readable secondary size; not the size for main instructions. |
| mark | Ink on subtle with a 1px currentColor outline; identifiable neutral highlight without status coloring. Forced colors uses Mark/MarkText. The inline outline adds no flow height. |
| ins / del / s | Double underline for insertion, line-through for removal/outdated text. Surrounding wording explains changes; do not assume assistive technology announces these distinctions. |
| a | Existing blue interactive role, solid underline, focus and native activation. Renderer URL policy remains authoritative. |
| abbr[title] | Dotted underline with existing offset; visibly expand on first use because hover titles alone do not explain terms on touch. |
| sub / sup | 0.875em, line-height:0 and retained native sub/super alignment; keep annotations readable without inflating each body line. No clipping container may cut them off. |
| time / data | Retain text and machine-readable datetime/value; no decorative rule is necessary. |
| q | Retain native language-aware quotation marks; no duplicate generated quotation text. |
| br / wbr | Intentional break / optional break opportunity; never a substitute for paragraph spacing. |
| article / section / div / span | Use for real structure/scope; inherit unless an additional property has a concrete purpose. |
| address / ruby / rt / rp / bdi / bdo / var | Retain native semantics/defaults if a trusted surface needs them. Outside Markdown v1; specialist notation/language needs representative fixtures before claiming dedicated support. |

Every element does not need a CSS override. The inventory distinguishes recorded native behavior from authored declarations. Interactive widgets, media players, embeds, canvas and source SVG require separate contracts; this is not an arbitrary-HTML renderer.

## Literal content

code/pre/kbd/samp use installed ui-monospace, Consolas, Liberation Mono, monospace at 0.875em and checked ink. Inline code gets xs inline padding, a subtle background and box-decoration-break:clone for wrapped fragments. No syntax palette is introduced. Pre owns the single size reduction; pre code inherits it instead of compounding it. A pre block preserves whitespace, cancels prose's arbitrary wrapping, and uses a neutral inset/divider and local scrolling.

Scrollable code gets a trusted accessible name and tabindex=0; keyboard focus and arrow scrolling remain available. App-owned Copy controls, when integrated, copy source only, not labels or line numbers. Code is inert text, including the specimen's escaped script-like example. kbd adds a small neutral border/inset/radius to identify a key name without implying a clickable button. samp identifies output; it does not claim a real transaction succeeded.

## Tables, figures and disclosures

Document tables use caption, th scope, thead/tbody and native cells. Inline-size:100% and min-inline-size:0 allow small tables to fit instead of inheriting the application's 36rem six-column minimum. Table overflow-wrap:normal preserves whole words/identifiers rather than forcing columns down to single letters. Wide tables live in `.ui-prose-table`, a named tabindex=0 region with local horizontal scrolling and sm inner focus clearance. Cells use sm/md vertical/horizontal padding, start/top alignment and one quiet row divider. Captions precede data with sm separation and supporting contrast. Never hide columns, fake a grid or turn table elements into block cards. Domain-specific numeric alignment requires its own decision.

Images use display:block, max-inline-size:100% and block-size:auto to remove the inline baseline gap, constrain width and preserve aspect ratio. Trusted HTML width/height reserve the ratio; alt explains relevant content and figcaption supplies context/source. A missing-image fixture retains alt and caption. The local SVG contains neutral nonessential illustration attributes, not extra CSS. These styles do not allow remote URLs, inline SVG or images through Markdown v1; trusted attachment resolution/access/object-URL cleanup remains a separate implementation obligation.

Details/summary is for optional material. Native marker/open/keyboard behavior stays intact. Summary uses the governed target minimum, 600 label weight and pointer cursor. Container padding protects focus, with a dedicated 3px/3px :focus-visible treatment and forced-color Highlight override. Expanded content has one related-content gap. Required warnings/instructions/errors belong outside collapsed content.

## Review and verification

Review all eight appearance/density combinations in the specimen. Challenge heading differentiation, before/after gap ownership, hanging/nested markers, large numbering, loose paragraphs, quote attribution, highlight/change cues, code scrolling/copy, definitions, table headers, captions, media alternatives and summary focus. All new rules use the prose family and the existing audited color roles. No palette value or contrast threshold changes.

Browser checks cover sizes/rhythm/scope, eight combinations, 320/390/768/1440px reflow, six-level bullets, continued numbering, code/body size preservation, inert source, read-only markers, local scrolling, disclosure keyboard behavior, responsive/failing media, user spacing/forced colors and no JavaScript. CSSOM/source checks still cover every declaration and prohibit unaudited styles. Google lint binds eight documents to their digests. See VALIDATION.md for actual results and manual limits; tests do not approve design reasoning or certify assistive technology.

Primary references: [W3C headings](https://www.w3.org/WAI/tutorials/page-structure/headings/), [content structure](https://www.w3.org/WAI/tutorials/page-structure/content/), [WHATWG grouping content](https://html.spec.whatwg.org/multipage/grouping-content.html) and [text semantics](https://html.spec.whatwg.org/multipage/text-level-semantics.html). Exact visual values are project choices.
