# Explicit context references in the composer

Status: approved specification. A human-facing @ picker and application-owned reference resolver. Uses [documents](documents.md), [attachments](attachments.md), [history](threads-and-history.md), [skills](skills.md), [projects](project-context.md), and [runtime contracts](runtime-contracts.md).

## Reference contract and scope

Let the user point to known saved material without pasting an entire document. References are stable data, not magic strings parsed from model output. The picker supports document, task, message, attachment, and skill. Version 1 never resolves OS paths, URLs, Git diffs, remote MCP resources, or arbitrary HTML selectors. Typed @ text becomes a reference only after an explicit picker selection; otherwise it remains ordinary user text.

Each closed reference is `{referenceId:LocalID,kind,resourceId:ID,revision:Revision|null,range:{offset,length}|null,intent:'data'|'skill'}`. The view generates referenceId. document/message/skill require exact non-null revisions; attachment bodies are immutable and revision null; task uses its current domain revision, with null allowed only before the legacy task migration. range is UTF-16 offset integer >=0 and length 1–3000 for text-bearing document/message/attachment, otherwise null. Validate source boundaries/surrogates. Skill intent is skill and requires range null; all other kinds require intent data. Task resourceId is the durable mapped identity or an application-issued scoped opaque reference, never a stringified numeric ID that another device interprets globally.

```json
{"referenceId":"review_notes","kind":"document","resourceId":"doc-1","revision":3,"range":{"offset":120,"length":800},"intent":"data"}
```

A send submission extends the composer service with `{text,references}`: text retains the current 1–4000 character bound, references has 0–8 unique resource/version/range selections. No model-supplied owner, project, or access grant is accepted. The controller validates every selected record and current policy at Send. If changed/deleted, hold the draft and offer Refresh reference; do not silently attach a different revision. Uncommitted editor text must be explicitly saved or copied as new user-provided text; a stable reference never claims to identify an unsaved draft.

## Context and tool mapping

Show a chip for each selection, with type/title/revision/range and Remove/Preview. Group picker results by current project and explicitly available shared resources. Humans may select an exact resource from another permitted project through a visibly confirmed per-request grant; this never enables project-wide search or changes the conversation binding. A child receives only explicitly delegated references. Opening the picker or preview does not start inference.

Before Send, show planned inline excerpts and estimated/measured context cost. Default to metadata plus references; include exact selected text ranges only within 3000 total inline characters and actual model budget. Do not truncate a selected range or drop a chip silently. Offer a smaller range or metadata-only reference when it cannot fit. Media uses the existing attachment modality/staging rules; a chip cannot imply the model received binary data. Skills use the same loader/eligibility/context budget as other explicit human skill selections; they are not document excerpts promoted into system instructions.

Resolve agent-visible text through shared resource services and policy checks, including document/attachment/history read eligibility. A reference grants access to selected data within current policy, never permission to enable a disabled tool. If the relevant read capability is disabled, show the blocked reference and require a human settings change or removal; do not inject the body through a privileged alternate path. Metadata-only references tell the model which admitted read tool can retrieve the allowed range, without assuming the whole document is authorized.

Application prompt packet is `{kind:'user_request',request,timeContext,contextReferences,inlineContext}`. contextReferences contains validated reference records plus safe title and resource read capability name; inlineContext contains 0–8 `{referenceId,text,offset,revision}` exact slices. It is explicitly labeled supplied source data. No change to the model's tool_call/final output envelope is required. Full source remains in its domain store. Persist accepted selections and actually submitted excerpts in history/logs, not every picker search keystroke.

## UI, lifecycle, and acceptance

Use an accessible combobox/listbox with type filter, keyboard selection, no custom HTML labels, and a plain-text source/range preview. A selection cannot press a permission Allow button or execute a task. On Send capture immutable references and the acceptedAt timestamp once; queued requests preserve that intent but recheck stale resources/access before execution. Revocation invalidates pending/resumed context and does not auto-replace the source. Removing a chip removes that draft association, not the saved document/task.

Add context-picker.js and reference-contract.js/controller resolution, reusing domain reads instead of adding another content store or generic read-anything tool. Future sync preserves durable resource IDs/revisions; unresolved references display unavailable on a device lacking the body. Test exact ranges, old versions, disabled reads, grants, stale queued sends, duplicate selections, dirty drafts, native media staging, skill budgets, injection text, and keyboard accessibility. Verify metadata-only references do not cause a full-body prompt expansion.
