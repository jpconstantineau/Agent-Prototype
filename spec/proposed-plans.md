# Proposed task changes and explicit Apply

Status: approved specification. Uses [shared contracts](runtime-contracts.md) and [checkpoints](checkpoints-and-undo.md). This is a browser adaptation of T3's proposed-plan review, not its progress checklist.

## Intent and authority

The agent may present a concrete task-change proposal when the human asks to review an approach before execution or a complex ambiguous request benefits from review. The user sees exact changes and chooses Apply, Request revision, or Reject. Do not introduce redundant approvals for clear additions/edits already authorized in chat. `update_plan` reports progress; `propose_plan` freezes a reviewable batch. Neither confers general permission.

An agent-facing `propose_plan` tool creates the proposal and waits for the human decision. Apply is a user-only service operation; there is no agent tool that approves its own plan. Applying uses the frozen operations directly, not a new model-generated interpretation of “approved”.

## Contract

Input requires `version:1`, `title` (1–120), `summary` (1–600), and `operations` (1–20 ordered closed objects). Each operation has `operationId:LocalID`, unique within this proposal, and exactly one of:

- `kind:'add'`, `fields`: title required 1–200, notes optional 0–2000, priority optional low/normal/high, dueDate optional valid YYYY-MM-DD or empty. Existing task defaults apply.
- `kind:'edit'`, `id`: existing positive safe integer local task ID, `expectedRevision:Revision`, `fields`: at least one of title, notes, priority, dueDate, with the same validators.
- `kind:'complete'`, id and expectedRevision as above, `completed`: required boolean.

No delete, arbitrary code, relative-date expressions, shell operations, or references to as-yet-uncreated tasks are permitted. Version 1 rejects more than one operation on the same existing task; consolidate its desired change. Additions need no invented IDs. Task reads must first be extended to return item revisions; do not use mutable title text or timestamps as a substitute for a tested revision check.

```json
{"type":"tool_call","name":"propose_plan","arguments":{"version":1,"title":"Move the review to Friday","summary":"Change only this task's due date.","operations":[{"operationId":"move_review","kind":"edit","id":3,"expectedRevision":2,"fields":{"dueDate":"2026-10-30"}}]}}
```

The service validates schema, task existence/ownership/revisions, and current capabilities before displaying anything. It creates a proposal ID/revision and stores immutable operations plus authoritative before/after snapshots. The model never supplies the before image. Human decision input is `{proposalId,expectedRevision,decision:'apply'|'reject'|'revise',feedback?}` with feedback 1–1000 required for revise and forbidden for other decisions. Stop cancels via AbortError instead of a fabricated answer.

Success result is `{success:true,version:1,proposalId,status,operations}` where status is `applied`, `rejected`, or `revision_requested`. On applied, operations are receipts `{operationId,status:'committed',itemId,operationReceiptId}`. On rejected/revision_requested the operations array is empty; feedback is included only for revision_requested. `success:true` means a human decision was accepted, not necessarily that tasks changed. Apply validation/storage failure returns a typed failed result without a misleading applied status.

## UI mapping

Map title/summary to the card heading/explanation. Each operation displays the actual task identity, changed fields, before/after values, and unchanged-field omission. An addition shows “New task” and its concrete fields. Human-readable dates accompany exact saved dates. Plain text is escaped. The card displays batch size and a statement that Apply changes precisely these items.

Apply submits the saved proposal ID/revision. Request revision opens a labeled feedback field; Reject records refusal and changes nothing. Neither closes an unrelated pending question. Freeze controls synchronously on decision and settle once. A model cannot hide operations behind a different summary: the UI always derives changes from validated operations/snapshots.

## Apply and continuation

At Apply, recheck task revisions, enabled capabilities, proposal identity, and active run/signal. If any task changed, mark Stale and ask for a fresh proposal; never overwrite a manual or synced edit. Apply the local batch and its mutation journal atomically in one short transaction; failure leaves all tasks unchanged. No transaction spans the human wait. Store an application-generated apply-operation ID for idempotent duplicate clicks/retry and an undo association.

The same run resumes after the tool result. Description: “Present exact task operations for user review when review is requested or needed. Wait for the decision. Applied receipts mean those changes already happened: do not execute them again. Rejection means no approval. Revision feedback applies only to this proposal.” A successful applied proposal is not followed by repeating the same existing task tools. A revised proposal gets a new identity and fresh task revisions.

## Integration and acceptance

Implement `proposals.js`, a broker/view like the question interaction, and a transactional task batch service. Keep all task-field validation in shared task-domain code. Persist proposal state/receipts with thread/run references; reload cancels/holds unaccepted proposals and never auto-applies. Deleting a proposal does not undo its committed changes. Sync must preserve apply IDs and detect revision conflicts rather than reapplying a remote batch.

Test exact preview/application agreement, stale tasks, disabled writes during review, duplicate Apply, malformed operations, atomic rollback, rejection/revision feedback, and Stop/Apply races. Browser tests verify every changed field is visible and no task changes before Apply. A scripted continuation must report receipts without repeating mutations. Undo is explicitly separate from rejecting an already applied proposal.
