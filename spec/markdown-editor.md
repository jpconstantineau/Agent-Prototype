# Markdown source editing in the app

Status: approved specification, separate from agent document tools and rendering. Uses [documents](documents.md) and [Markdown rendering](markdown-rendering.md). This is primarily a user-facing feature, not a new agent tool.

## Intent and interface

Give users a reliable editor for `.md` documents stored by the app. Version 1 is a source editor built from a native labeled `<textarea>`, optional formatting buttons, and a preview pane. There is no contenteditable/WYSIWYG serialization requirement, framework, or runtime editor dependency. Source remains the canonical document; preview HTML is a derived view.

Provide document title, Markdown/plain-text indicator, source editor, Write/Preview/Split controls, Save, Revert draft, Export, and Version history. On small screens toggle Write/Preview instead of forcing two narrow columns. Show the committed revision, unsaved/saving/saved/conflict state, character budget, and storage provider. Never show Saved before the storage service commits.

Toolbar buttons insert/edit source syntax for heading, bold, italic, inline code, fenced code, link, unordered/ordered list, blockquote, and task-list marker. They act only on the textarea selection with `selectionStart`, `selectionEnd`, and `setRangeText`; inserting a link uses a small labeled form. The toolbar must not create executable HTML or bypass URL checks. Preview toggles do not change the source or create a document revision.

## Draft and save contracts

The user-only editor service consumes closed commands:

| Command | Required data | Behavior |
| --- | --- | --- |
| `open` | documentId; optional revision | Load exact source and committed revision metadata without starting AI. Historical revisions open read-only until explicitly restored/copied. |
| `saveDraft` | documentId, baseRevision, draftId, source, selection | Persist recoverable unsaved source separately from committed versions. selection has integer start/end within source and direction forward/backward/none. |
| `commit` | documentId, expectedRevision, draftId, source | Validate limits and atomically publish one new document revision/receipt, or return conflict/error preserving draft. |
| `discardDraft` | documentId, draftId | Remove only that editor draft after explicit user action; no task or committed-source change. |

Return `{status:'saved',documentId,revision,operationReceiptId}` only on commit. Failure returns a clear code/message and leaves the draft intact. Source uses the document limit of 200000 UTF-16 characters and 1 MiB UTF-8; no automatic truncation. A restored or externally edited current revision cannot be overwritten using the old expectedRevision.

Draft persistence may be debounced after input with a maximum two-second delay; this is a UI save debounce, not an agent polling loop. Persist soon after composition ends and on explicit Save/visibility changes where possible; do not promise guaranteed async saving during abrupt page closure. Surface draft-storage failures. On reopen offer Recover draft, Compare to current, or Discard. The base revision stays attached even if another actor advanced the head. Do not automatically commit a recovered draft.

## Editing behavior and accessibility

Preserve source text and selection across preview toggles, pane resize, and toolbar operations. Respect IME composition and native clipboard/undo behavior. Enter inserts a newline; it never sends a chat request. Tab keeps normal focus navigation unless the user explicitly enables a documented indentation shortcut. Ctrl/Cmd+S saves only when the document editor is focused; do not override browser shortcuts globally. Visible Save remains available.

Provide keyboard-accessible toolbar names and focus indicators, descriptive error text, and normal document focus order. Live preview updates after bounded/debounced parsing, without replacing the textarea, moving the caret, or announcing its whole contents on every keystroke. For very large input show manual Refresh preview rather than blocking typing. Every render request carries a draft revision token; a stale parse cannot replace a newer preview.

No Markdown task checkbox toggles a Daylist task. In source editing, typing `- [x]` changes document text only. Rendered checkboxes are read-only in v1. No source syntax invokes an agent tool, loads a skill, enables permissions, or runs a fenced code block.

## Conflicts, history, and exports

A local unsaved draft marks the document busy for agent writes; the agent's service returns conflict rather than overwriting it. Incoming synced revisions may still appear while editing: show a conflict notice and a comparison view. The user chooses to keep editing a copy, reload after discarding, or explicitly merge then commit against the current revision. Do not choose latest-write-wins based on timestamps.

The compare view shows escaped source lines and before/after changes, not executable Markdown. Version history can open a read-only source/preview pair and request a conditional restore through the document service. Export downloads exact current source as `.md`/`.txt` via a user gesture; importing reads UTF-8 after validation and creates a new document or a separately reviewed replacement. OS file pickers are a user-facing portability flow, not the embedded storage backend or a tool permission grant.

## Implementation and acceptance

Add `markdown-editor.js` for DOM/commands and draft integration. It uses the same document service as agent writes, with actor human. The renderer accepts source plus an explicit dialect/version; no editor-specific HTML blobs enter persistence. Title changes are metadata operations with revision checks, not hidden source rewrites.

Test toolbar selection/undo behavior, IME, draft recovery after reload, interrupted saves, storage quota failure, large source preview, stale parse results, source exactness, version restore, and concurrent agent/remote edits. Browser tests verify keyboard save, mobile preview switching, focus retention, line wrapping, and no task mutation from document checkboxes. Agent calls are tested separately in documents.md; do not pretend source-editor behavior is implemented by merely adding document tools.
