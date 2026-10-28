# Safe Markdown rendering

Status: approved specification, separate from [Markdown editing](markdown-editor.md) and [HTML visualizations](inline-visualizations.md). Uses [documents](documents.md) and [runtime contracts](runtime-contracts.md).

## Intent, actors, and dialect

Render user documents and, optionally behind a presentation setting, assistant messages as readable Markdown. Rendering is a pure presentation service, not an agent execution tool. The source is always available and unchanged. File content, task titles, tool errors, and diagnostic JSON remain plain text unless a surface explicitly opts in. Markdown cannot call app tools or supply system instructions.

Use an explicitly named versioned dialect `daylist-markdown-v1`, based on a documented CommonMark subset. Supported blocks: paragraphs, ATX headings 1–6, thematic breaks, fenced code blocks, blockquotes, and ordered/unordered lists with at most six nested levels. Supported inlines: escaped punctuation, code spans, emphasis/strong, and inline links. Add a small explicit extension for `- [ ]`/`- [x]` list markers, rendered as noninteractive task indicators.

Version 1 excludes raw HTML execution, images with external URLs, reference-style links, tables, footnotes, math, embedded diagrams, executable code, and custom plugins. Preserve unsupported syntax as escaped visible source rather than dropping it. This is not a claim of full CommonMark or GitHub-flavored Markdown compliance. The editor exports ordinary Markdown source and labels preview limitations without rewriting unsupported sections. A later dialect version can add features with its own fixtures.

## Plain JavaScript parser and renderer boundary

Provide `parseMarkdown(source, {dialect,limits})` returning a validated bounded plain AST plus diagnostics; then `renderMarkdown(ast, {linkPolicy,attachmentResolver})` returning a `DocumentFragment`. No TypeScript/React or new runtime package is required. An in-repository scanner/parser separates block parsing from inline parsing; do not implement the whole language through chained regex-to-innerHTML replacements. Code fences/spans suppress inline interpretation correctly, and escaped delimiters remain data.

AST nodes are closed tagged objects with source start/end offsets and type-specific fields. Allowed tags are document, paragraph, heading, list, list_item, blockquote, thematic_break, code_block, text, code_span, emphasis, strong, link, and task_marker. Every child sequence is bounded. Heading level is 1–6; list start is integer 1–999999; code info text is at most 80 characters and is a label, never a CSS selector/import. No arbitrary element/attribute node exists.

Accept at most the document source size limit, 20000 AST nodes, six block nesting levels, and 16 inline nesting levels. Parsing yields/checks cancellation between chunks or runs in a Worker with copied data. On budget/unsupported complexity, return a plain-text source fallback and a small diagnostic; never leave half-parsed HTML in the parent document. The AST/result carries source version/hash so an old worker response cannot overwrite a new preview.

## DOM safety and URL mapping

Create allowed elements through `document.createElement`, append text nodes through `textContent`/`createTextNode`, and assign only known safe attributes. Source never enters innerHTML, srcdoc, eval, style declarations, event handlers, or unrestricted URLs. Fenced JavaScript/HTML is inert `<pre><code>` with a Copy button owned by the app. Raw `<script>` and malformed HTML appear as visible text.

For inline links, parse the destination with URL and allow only `https:` or `http:` when explicitly clicked by the user. Reject javascript/data/blob/file and unknown custom schemes. Block relative URLs unless they are application-generated resolved document/message anchors from trusted metadata, not path guesses. External links use a visible destination/tooltip, `rel="noopener noreferrer"`, and no automatic prefetch. The renderer itself makes no network request. No tracked remote images are loaded in v1; image syntax remains visible text with an unsupported-image diagnostic.

If future local image support is added, resolve only explicitly accessible attachment IDs through a trusted resolver and revoke its object URLs on disposal; never accept arbitrary blob URLs from Markdown source. This is separate from the accepted image-attachment Prompt API path and is not silently included by this spec.

## Surface mappings and accessibility

Document preview renders the full bounded source in a scrollable article with a title supplied by document metadata. Map source headings into an appropriate nested section range within that article so they do not replace the page's main heading. Preserve visible list numbering, code whitespace, quoted text, and normal selection/copy. Task indicators have accessible checked/unchecked descriptions but no write handlers. Copy code copies only the source block content, not line labels or toolbar text.

Assistant-message rendering is opt-in and uses identical rules. Human-entered chat text may stay plain to avoid surprising formatting changes. Existing JSON tool receipts stay in escaped preformatted diagnostics. The HTML visualization tool keeps its separate sandboxed iframe contract; Markdown is never upgraded into that richer executable surface just because it contains HTML.

On typing, preview updates are not a live region; announce only render errors or an explicit user request. Links and app-generated buttons remain keyboard accessible. Mobile layouts wrap prose and scroll long code horizontally inside its own container. Plain-text fallback remains usable without losing source.

## Compatibility and acceptance

Use [CommonMark's published specification](https://spec.commonmark.org/0.31.2/) as a reference for the supported subset, with independently written fixtures or attribution/license handling for any copied material. Record dialect version on derived previews; persisted source is dialect-independent. Do not promise full compliance until tests establish it.

Test each supported block/inline feature, nesting/escape precedence, malformed inputs, unsupported syntax preservation, code fences containing HTML, dangerous URL schemes, huge/deep input, cancellation, and stale render tokens. Security tests must prove no script execution or network loads from source. Browser tests cover meaningful headings/list semantics, code copy, focus, scrolling, and editor source unchanged after preview. Golden DOM/text tests verify the intentionally supported dialect rather than implementation-mirroring parser calls.
