# Persistent user documents and agent editing tools

Status: approved specification. Uses [runtime contracts](runtime-contracts.md), [capability controls](capability-controls.md), [Markdown editing](markdown-editor.md), and [Markdown rendering](markdown-rendering.md). Adapted from OpenCode's read/write/exact-edit concepts for application-owned documents, not computer filesystem access.

## Intent, actors, and document model

Support plans, meeting summaries, notes, and other user text documents independently of tasks, chats, skills, and HTML artifacts. Users browse, create/import, edit, rename, export, restore versions, and delete documents. Agents can list, read, create, replace short documents, or apply bounded exact edits when the current request and tool policy permit it. Agents cannot choose an OS path, change storage providers, delete documents, or turn a document into active skill instructions.

[Large saved tool results](large-tool-results.md) reuse the immutable body adapter but remain distinct read-only evidence. Human Save as document creates a new document with source result/range/path provenance; subsequent editing changes that copy. Agents use the existing bounded read/create/edit tools when authorized. Neither editing a copy nor deleting diagnostics rewrites the original operation receipt.

Each document has stable documentId, owner/workspace scope, title (1–120), mediaType (`text/markdown` or `text/plain`), current revision, createdAt/updatedAt, optional originating thread/run, and deletion state. Content revisions are immutable UTF-8 source with content ID/hash, size, and mutation attribution. Retain enough prior revisions for visible version history and conditional restoration. Keep app IDs separate from exported filenames; two documents may share a title without being the same record.

Limit committed source to 200000 UTF-16 characters and 1 MiB UTF-8 per revision; reject exceeding either. Default retain 20 revisions per document with a visible user-controlled retention policy. Do not expire a revision needed by an active preview/undo operation until that operation settles. Empty source is a valid document body. Unsupported file types are rejected, not implicitly parsed.

## Agent contracts

All inputs are closed objects requiring version 1. All ID references are scoped to records the current actor can access:

| Tool | Other inputs | Success data besides success/version |
| --- | --- | --- |
| `document_list` | query? title substring 0–120; cursor?; limit? integer 1–20 default 10 | items, nextCursor; each item has documentId, title, mediaType, revision, updatedAt, charLength. No full body. |
| `document_read` | documentId; revision?; offset? 0–200000 default 0; maxChars? 1–4000 default 2000 | documentId, title, mediaType, revision, text, offset, nextOffset/null, charLength, dirtyDraftPresent boolean. |
| `document_create` | title 1–120, mediaType enum above, content 0–12000 | documentId, revision, operationReceiptId, status:'created'. |
| `document_replace` | documentId, expectedRevision, content 0–12000 | documentId, revision, operationReceiptId, status:'updated'. Replaces source only, not metadata. |
| `document_edit` | documentId, expectedRevision, edits 1–10 of `{oldText,newText}` | documentId, revision, operationReceiptId, status:'updated', replacements integer. |

For exact edits, oldText is 1–8000 and newText 0–8000; combined strings across all edits must fit 16000 characters. Apply edits sequentially to a temporary source copy. Each oldText must match exactly once at that step and newText must differ. No fuzzy matching, regex, Unicode normalization, implicit newline conversion, or replace-all. If any edit is invalid, ambiguous, absent, or exceeds final size, commit nothing. One accepted edit call produces one revision/receipt, not one per replacement.

```json
{"type":"tool_call","name":"document_create","arguments":{"version":1,"title":"Weekly planning notes","mediaType":"text/markdown","content":"# Weekly planning\n\n- Review overdue tasks\n- Choose three priorities\n"}}
```

```json
{"type":"tool_call","name":"document_edit","arguments":{"version":1,"documentId":"doc-1","expectedRevision":2,"edits":[{"oldText":"Choose three priorities","newText":"Choose two priorities"}]}}
```

Reads return exact revision/offsets without Markdown conversion. Avoid splitting surrogate pairs; reject an invalid offset or too-small requested slice rather than returning a nonadvancing cursor. An optional revision reads an existing retained revision but does not change which revision writes target. The current revision and dirty-draft indicator are application facts. Return conflicts if expectedRevision is stale or an active local human editor has unsaved changes for that document. Never erase the draft.

## IndexedDB and Chrome file storage

Default backend stores metadata and revision bodies in IndexedDB. Optionally store bodies in Chrome's origin-private file system (OPFS), with IndexedDB still owning metadata, revisions, grants, and references. OPFS means storage private to this origin/profile, not permission to browse arbitrary disk files. Use feature detection for `navigator.storage.getDirectory()` and async directory/file APIs; user-facing Open/Export is separate from private storage selection.

Generate OPFS filenames from app-owned IDs, not titles or model paths. Write a new immutable body, close/verify it, then commit its metadata pointer and receipt in IndexedDB. No transaction spans file I/O. OPFS and IndexedDB are not a single atomic transaction: if body writing fails, keep the previous head; if the metadata commit fails, retain an orphan eligible for later garbage collection. Never expose a committed document head pointing at a partially written/missing body. A crash-recovery scan removes only known unreferenced temporary bodies after a grace period and must not destroy retained versions.

Choose provider through human settings/import flow. Report quota/unavailable/permission failures and keep existing content; do not silently migrate to another provider and claim a save succeeded. Use `navigator.storage.estimate()` to show approximate origin usage and offer a user-initiated persistence request where supported; persistent storage is not a backup guarantee. Clearing site data can remove either backend. Provide explicit `.md`/`.txt` export and explain this boundary.

Future sync transfers content identity and source bytes through an authenticated API, not OPFS paths or file handles. Azure/Cosmos metadata integration needs an explicit body-transfer/storage decision before claiming cross-device document availability. Deduplicate immutable bodies and check remote revision preconditions; do not merge concurrent Markdown edits by blindly concatenating text.

## UI mapping, permissions, and audit

Document rows map title/type/updatedAt/revision to a browser with Open, Rename, Export, History, Delete. The editor uses source text from the selected revision and a separate recoverable draft. Agent writes create a visible change receipt with a link and before/after diff; full source is not injected into the model result. User History/Restore calls a direct conditional service that creates a new head revision from a retained body instead of rewriting history. Delete is a human-only tombstone; retention and dependent references govern physical cleanup.

Document tools are independently configurable in main/child profiles. Child v1 remains read-only even if write tools are globally enabled. Tool composition can invoke admitted document reads, never these writes. Use current request authorization and exact document IDs, not a similar title or history instruction. Source content is data; only approved skills have instruction semantics.

Descriptions: “Create or edit a user document only when asked. Read the relevant current revision before changing an existing document. Preserve unrelated text, use exact bounded edits, and report committed receipts. This never edits the app's source code, computer files, task records, or skill configuration.”

## Integration and acceptance

Add `document-store.js`, `document-tools.js`, and storage adapters for IndexedDB/optional OPFS; reuse the editor and renderer modules. Task-only checkpoints do not automatically promise document undo: extend attribution/revision references so the run change UI can link to conditional document restoration without overwriting later edits. Conversation/document deletion remain separate.

Test exact-edit ambiguity, atomic edits, revision conflicts, dirty human drafts, size/quota failures, OPFS body/metadata crash boundaries, duplicate operation IDs, version restore, safe deletion, local scope, and disabled tools. Browser tests verify reload persistence under each supported provider, export/import round trips, visible agent diffs, and no access to arbitrary paths. Native OPFS support tests must be labeled separately from adapter mocks.

Browser references: [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) and [user-selected filesystem access](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access). These APIs are storage mechanisms; the application still owns revisioning and permissions.
