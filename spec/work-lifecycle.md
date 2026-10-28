# Work planning, reviewed changes, and evidence-based outcomes

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Connect an agent run to visible progress, durable objectives, reviewable task changes, trustworthy completion, and optional future work. These features share evidence and run identity while retaining different meanings of plan, approval, completion, and undo.

## User intent

See progress, continue an objective across visits, inspect and explicitly apply task batches, inspect outcome evidence, undo eligible changes, and accept or dismiss suggested next work.

## Agent intent

Update progress, read/create/report an authorized goal, propose exact task batches, report supported run outcomes, and suggest future work. The agent cannot Apply or undo on the human’s behalf through these review surfaces, and a report or suggestion does not authorize new execution.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Progress plans](#feature-progress-plans) | Agent; human inspects | Own the run-local checklist and visible progress. |
| [Conversation goals](#feature-conversation-goals) | Human; agent reports; harness continues | Own durable objectives and explicitly bounded continuation. |
| [Proposed task changes](#feature-proposed-plans) | Agent proposes; human applies | Own exact task-batch proposals and atomic reviewed Apply. |
| [Checkpoints and undo](#feature-checkpoints-and-undo) | Human and journal service | Own actual mutation receipts and conflict-aware restoration. |
| [Completion reports](#feature-completion-reports) | Agent; harness validates | Own terminal run reports linked to actual evidence. |
| [Follow-up suggestions](#feature-follow-up-suggestions) | Agent proposes; human accepts | Own a pending inbox that does not execute accepted ideas automatically. |

## Integration and delivery

A progress checklist is neither a durable goal nor a task-change proposal. Apply authorizes only the displayed exact task batch. Checkpoints derive from committed operation receipts, not from the model’s planned changes. Keep those contracts distinct even when the UI presents a continuous work timeline.

The run report explains completed/partial/blocked with verified evidence. It does not complete a goal, board assignment, team review, or pipeline; each owner retains its own transition. Accepted follow-ups create the specified unstarted work/draft, rather than a hidden continuation.

Implement run/evidence identity and the reversible mutation journal before reviewed batches/undo and terminal reporting. Layer goal continuation over the existing queue and scheduler; preserve aggregate budgets and single-owner bindings across visits.

<a id="feature-progress-plans"></a>

## Progress plans

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). Inspired by provider `update_plan`/todo events surfaced in T3 Code, not a direct import of provider code.

<a id="feature-progress-plans-purpose"></a>

### Purpose

Make the agent's current approach and progress visible during a multi-step request. A working checklist helps the human follow the run and the agent track remaining work without creating saved Daylist tasks.

<a id="feature-progress-plans-user-intent"></a>

### User intent

See what the agent plans to do, which step is active, and what finished or changed. The user may collapse the view but does not manually edit agent step statuses through this spec.

<a id="feature-progress-plans-agent-intent"></a>

### Agent intent

Use update_plan to maintain an honest, compact checklist as the run proceeds. The agent must distinguish reported progress from actual task mutations and base completion claims on real results.

<a id="feature-progress-plans-intent-and-actors"></a>

### Intent and actors

[Durable goals](work-lifecycle.md#feature-conversation-goals) preserve the overall objective across runs and later conversations. This plan remains run-scoped and cannot start goal continuation, mark a goal achieved, or change its budget. Plans can link a goal binding as controller metadata while retaining their original wire contract.

Expose a compact working checklist for multi-step requests. This is an agent-facing `update_plan` tool and a user-facing progress view. Steps describe the agent's work, not saved Daylist tasks. Updating a step never invokes `add_item` or `complete_item`. The human can collapse the view; manual editing of agent statuses is out of scope.

<a id="feature-progress-plans-contract"></a>

### Contract

`update_plan` replaces the current run's complete plan atomically. Required fields: `version: 1`, `steps` (1–12 entries). Optional `explanation` is text up to 400 characters. Each step is a closed object with required `id: LocalID`, `text` (1–200 characters), and `status` (`pending`, `in_progress`, `completed`, `cancelled`). IDs are unique and at most one step is in progress. No more than 2400 total step-text characters are accepted. Existing IDs retain their meaning; a changed task gets a new ID. Removing a step is allowed only when the explanation says why; the event history retains the old plan.

```json
{"type":"tool_call","name":"update_plan","arguments":{"version":1,"explanation":"First inspect current tasks, then organize them.","steps":[{"id":"inspect","text":"Inspect overdue tasks","status":"in_progress"},{"id":"organize","text":"Organize the relevant tasks","status":"pending"}]}}
```

Return `{ success: true, version: 1, revision, steps }`, with optional `explanation` only if supplied. `revision` is a browser-assigned positive integer scoped to the run. The canonical stored list is returned; unknown fields, duplicate IDs, or multiple active steps fail without replacing it. No caller-supplied run ID or task ID can redirect updates.

<a id="feature-progress-plans-ui-mapping"></a>

### UI mapping

Render a single run-scoped card above the current activity: text labels from `steps[].text`, icons plus text for statuses, and `completed/total` as a progress count. Cancelled steps are counted in total but not completed. Use a native `<details>` for collapse, an `<ol>` for sequence, and a small polite status for changes; avoid re-announcing the entire checklist. Do not show editable task checkboxes. Recommended label: “Assistant progress”. The explanation is optional supporting text, not private reasoning.

Show the same card revision rather than appending a duplicate card per update. Expandable history can reveal accepted revisions. Empty/invalid requests do not erase a visible plan. Agent failure or Stop labels the plan Interrupted and preserves statuses as last reported; the runtime does not falsely mark unfinished steps completed. A final reply with open steps shows an incomplete-plan notice without causing another inference solely to tidy the UI.

<a id="feature-progress-plans-model-presentation-and-continuation"></a>

### Model presentation and continuation

[Plan/Act](capability-policy.md#feature-plan-act-modes) controls the conversation's permitted effects, while this progress checklist only describes work. Neither a completed plan step nor a [completion report](work-lifecycle.md#feature-completion-reports) invents a domain receipt. An informational Plan request can finish with an ordinary reply; structured action reports remain optional unless the human configured their documented requirement.

Description: “Track the work you are doing on the current request. Supply the entire current plan with stable step IDs and no more than one in-progress step. This changes progress display only, not saved tasks. Use for multi-step work; avoid planning a trivial one-step action. Mark a step completed only after its actual work succeeds.”

Include the definition in enabled chat-tool descriptions and `responseSchema()`. After a successful result, the observation says to continue the original request; changing the plan does not satisfy it. A plan step cannot authorize a mutation or substitute for a human-approved proposal. Model calls spent updating the plan count toward the existing run limit, so use few, meaningful updates.

<a id="feature-progress-plans-storage-and-implementation"></a>

### Storage and implementation

Add `progress-plan.js` for validation/reduction and rendering helpers in a small view module. Route via the composed chat executor in `agent.js`/`app.js`. Persist accepted plan events with thread/run attribution once thread persistence exists. Until then it may be memory-only. A compact current plan can be carried through compaction; the authoritative revision remains in application state.

<a id="feature-progress-plans-acceptance"></a>

### Acceptance

Test replacement, stable identity, invalid-status and duplicate-ID rejection, cancellation/finalization, and no task-store mutations. A scripted agent must update progress around a real read or change and cannot claim a task write from a plan-only result. Browser tests cover text safety, collapse, progress announcements, and showing the last accepted revision after interruption. Disabling the tool removes it from generation and dispatch while historical cards stay readable.

---

<a id="feature-conversation-goals"></a>

## Conversation goals

Status: approved design; not implemented. Uses [history](conversation-lifecycle.md#feature-threads-and-history), [progress plans](work-lifecycle.md#feature-progress-plans), [work board](agent-coordination.md#feature-agent-work-board), [queue](conversation-lifecycle.md#feature-request-queue), [loop detection](context-management.md#feature-tool-loop-detection), and [runtime contracts](runtime-contracts.md).

<a id="feature-conversation-goals-purpose"></a>

### Purpose

Preserve an objective and unresolved questions while the user clarifies work over multiple visits or conversations. Make continuation explicit and bounded so a small model can advance a longer objective without losing its scope or resetting its consumed budget.

<a id="feature-conversation-goals-user-intent"></a>

### User intent

Start a goal, clarify it over several sessions, inspect progress, attach a later conversation deliberately, and pause/resume/edit/cancel it. Choose whether the assistant may continue automatically while the page is open and how much work that permits.

<a id="feature-conversation-goals-agent-intent"></a>

### Agent intent

Read the bound goal, create one only on explicit request, and report verified completion or a real blocker. The agent cannot resume itself, widen budgets, switch the goal's agent/project, or treat a saved goal as permission for unrelated work.

<a id="feature-conversation-goals-goal-and-binding-contracts"></a>

### Goal and binding contracts

Store `{version:1,goalId,ownerId,revision,agentId,configurationRevision,projectId,objective,successCriteria,state,continuation,maxRuns,maxInferenceCalls,usedRuns,usedInferenceCalls,createdAt,updatedAt,summary,sourceRefs}`. projectId is ID/null; objective is nonblank 1–2000; successCriteria 0–5 strings of 1–200; summary plain text 0–1500; sourceRefs 0–10 shared evidence references. State is active/paused/blocked/limited/complete/cancelled; continuation is manual/automatic_open_page; maxRuns integer 1–5; maxInferenceCalls integer 1–60; used counters nonnegative safe integers. Defaults are manual, three runs, 24 total inference attempts, further limited by configuration ceilings. Summary is sourced progress, never hidden reasoning or an operation journal.

Each goal has one execution-owner thread at a time. Additional threads may reference it read-only. Binding record `{goalId,goalRevision,threadId,threadRevision,mode:'execution'|'reference'}` is controller-owned. User Attach/move execution uses expected goal/thread revisions, settles active work first, and validates identical owner/project and an explicitly selected compatible configuration. This enables continued clarification in a later conversation without making every thread a competing executor. Goals survive Chrome session destruction and reload. Opening a saved goal does not start inference.

Goal continuation settings are extensions.goals `{enabled:boolean,maxRuns:integer 1–5,maxInferenceCalls:integer 1–60}` default false/3/24. Body values cannot exceed those ceilings. A user can choose a smaller budget at Start/Resume; an agent cannot supply a larger one. Count normal, failed, fallback, child, recall, processing, and maintenance generation attempts attributable to pursuit against the same aggregate. Keep their individual existing ceilings as well. Context-window usage is a separate metric; unknown provider tokens cannot enforce an exact token budget, so version 1 uses counted calls/runs rather than a misleading token cap.

<a id="feature-conversation-goals-agent-and-human-services"></a>

### Agent and human services

All model inputs are closed and version 1. goal_read takes no other fields and returns the bound full goal with used counters and remaining budgets. goal_create takes objective, successCriteria, and sourceRefs only; user intent/configuration supplies manual continuation and default budgets. Success is `{success:true,version:1,goalId,revision,state:'active',continuation:'manual',operationReceiptId}`. Existing unfinished binding returns conflict. goal_report takes expectedRevision, state complete/blocked, note 1–500, and evidence 0–10 shared references; success returns goalId/revision/state/operationReceiptId. Scope comes from the controller, never a model-supplied goalId or thread selector.

```json
{"type":"tool_call","name":"goal_report","arguments":{"version":1,"expectedRevision":3,"state":"blocked","note":"The proposal still needs your choice of retention period.","evidence":[{"kind":"message","id":"message-8","revision":1}]}}
```

Completion requires no unresolved required operation/review/child work plus accessible referenced deliverables where specified. Structural checks cannot prove semantic achievement; the report and criteria remain inspectable. A blocker identifies the missing human input/state and pauses automatic pursuit immediately rather than consuming repeated runs to prove the same blocker. A conversation about clarifying the objective need not be marked complete merely because a reply was delivered. These are domain writes subject to ordinary tool policy; children may read only a delegated goal snapshot and cannot report the parent goal.

Human Start `{body}` supplies objective/criteria/continuation/budgets; other commands use `{goalId,expectedRevision,...}`. Edit replaces objective/criteria while idle and preserves counters. Pause/Cancel stop further admission; Stop active run also pauses the goal. Resume can acknowledge a corrected blocker and authorize a new bounded allowance explicitly shown as an additional budget window. Retain cumulative lifetime counters and previous windows; never reset history. Attach, switch agent/project, or replace an objective is human-only. Changed constraints increment revision, invalidate prepared nudges and applicable approvals, and rebuild bounded context.

<a id="feature-conversation-goals-model-context-and-continuation-scheduler"></a>

### Model context and continuation scheduler

At run start inject the exact objective/criteria/revision and bounded sourced progress plus authoritative receipt references. Do not silently truncate an objective; if required content cannot fit, show a budget conflict. Current human clarifications append as real messages; the agent proposes a revised objective through ordinary chat and the user explicitly saves it. The controller records the changed goal revision. Compaction/fallback preserve exact goal binding, active constraints, counters, and operation receipts.

Descriptions: “Use goal_create only when explicitly asked to establish a persistent objective. Read the current goal before reporting. Mark complete only after satisfying its full scope; report a concrete blocker when input or external state is required. You cannot resume, enlarge budgets, or erase consumed work.” Ordinary task chat does not silently become goal pursuit.

Automatic continuation requires the user's explicit automatic_open_page choice. After a settled run, atomically check the same goal revision/state, no pending interaction, no unconsumed user queue, remaining aggregate/run budgets, and current grants. Queue at most one controller-authored continuation carrying goalId/revision and a stable occurrence ID. At admission repeat those checks. A normal model final alone can leave the goal active; continue only within this authorization. A blocked/needs_attention/loop/error outcome holds, never nudges. Queued human requests take precedence and consume goal budgets only when explicitly bound to that goal. No timer scanner, page-close execution, or cross-device duplicate pursuit is promised.

Every run still has at most 12 main calls and existing child/maintenance limits. Reaching either goal total ends deterministically in limited with an honest progress summary from stored evidence; no extra inference solely for wrapping up. Final allowed calls cannot open interactions that require an impossible continuation. User clarification can be accepted/stored while limited; further inference requires explicit Resume authorization. A fresh thread, fallback, or delegated worker cannot reset the aggregate budget.

<a id="feature-conversation-goals-ui-storage-and-acceptance"></a>

### UI, storage, and acceptance

Show a goal panel with exact objective, criteria, state, referencing conversations, progress/source links, per-window/lifetime usage, and continuation setting. Native Start/Pause/Resume/Edit/Attach/Cancel controls map to direct services. Distinguish the goal from saved Daylist tasks, run progress, and board assignments. A board item may link a goal as evidence but its completion remains its own reviewed transition. Use goal-store.js and goal-controller.js with immutable revision/history/window records, claims, outbox IDs, and control.changed feature goal.

Reload holds active work as paused/interrupted and offers Resume. One designated device executes until the future API provides authoritative claims; syncing a goal is not authorization for all devices to run it. Delete uses tombstones and explicit linked-history handling. Verify multi-visit clarification, explicit thread movement, stale goal edits/nudges, aggregate counts across fallback/children/maintenance, Stop, no silent budget reset, insufficient context, and completion reports with missing deliverables or outstanding approvals.

Source inspiration: [OpenClaw goals](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/goal.md). Browser budgets and cross-session clarification behavior are specified above.

---

<a id="feature-proposed-plans"></a>

## Proposed task changes

Status: approved specification. Uses [shared contracts](runtime-contracts.md) and [checkpoints](work-lifecycle.md#feature-checkpoints-and-undo). This is a browser adaptation of T3's proposed-plan review, not its progress checklist.

<a id="feature-proposed-plans-purpose"></a>

### Purpose

Make a requested review concrete by freezing the exact task changes before they run. A proposal and explicit Apply decision prevent the model from reinterpreting approval or repeating already-applied mutations.

<a id="feature-proposed-plans-user-intent"></a>

### User intent

Inspect the actual before/after changes and choose Apply, Request revision, or Reject when a review is wanted.

<a id="feature-proposed-plans-agent-intent"></a>

### Agent intent

Use propose_plan to present a bounded change set and wait for its decision. The agent cannot approve itself and must report applied receipts without executing the same changes again.

<a id="feature-proposed-plans-intent-and-authority"></a>

### Intent and authority

The agent may present a concrete task-change proposal when the human asks to review an approach before execution or a complex ambiguous request benefits from review. The user sees exact changes and chooses Apply, Request revision, or Reject. Do not introduce redundant approvals for clear additions/edits already authorized in chat. `update_plan` reports progress; `propose_plan` freezes a reviewable batch. Neither confers general permission.

An agent-facing `propose_plan` tool creates the proposal and waits for the human decision. Apply is a user-only service operation; there is no agent tool that approves its own plan. Applying uses the frozen operations directly, not a new model-generated interpretation of “approved”.

<a id="feature-proposed-plans-contract"></a>

### Contract

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

<a id="feature-proposed-plans-ui-mapping"></a>

### UI mapping

Map title/summary to the card heading/explanation. Each operation displays the actual task identity, changed fields, before/after values, and unchanged-field omission. An addition shows “New task” and its concrete fields. Human-readable dates accompany exact saved dates. Plain text is escaped. The card displays batch size and a statement that Apply changes precisely these items.

Apply submits the saved proposal ID/revision. Request revision opens a labeled feedback field; Reject records refusal and changes nothing. Neither closes an unrelated pending question. Freeze controls synchronously on decision and settle once. A model cannot hide operations behind a different summary: the UI always derives changes from validated operations/snapshots.

<a id="feature-proposed-plans-apply-and-continuation"></a>

### Apply and continuation

At Apply, recheck task revisions, enabled capabilities, proposal identity, and active run/signal. If any task changed, mark Stale and ask for a fresh proposal; never overwrite a manual or synced edit. Apply the local batch and its mutation journal atomically in one short transaction; failure leaves all tasks unchanged. No transaction spans the human wait. Store an application-generated apply-operation ID for idempotent duplicate clicks/retry and an undo association.

The same run resumes after the tool result. Description: “Present exact task operations for user review when review is requested or needed. Wait for the decision. Applied receipts mean those changes already happened: do not execute them again. Rejection means no approval. Revision feedback applies only to this proposal.” A successful applied proposal is not followed by repeating the same existing task tools. A revised proposal gets a new identity and fresh task revisions.

<a id="feature-proposed-plans-integration-and-acceptance"></a>

### Integration and acceptance

Implement `proposals.js`, a broker/view like the question interaction, and a transactional task batch service. Keep all task-field validation in shared task-domain code. Persist proposal state/receipts with thread/run references; reload cancels/holds unaccepted proposals and never auto-applies. Deleting a proposal does not undo its committed changes. Sync must preserve apply IDs and detect revision conflicts rather than reapplying a remote batch.

Test exact preview/application agreement, stale tasks, disabled writes during review, duplicate Apply, malformed operations, atomic rollback, rejection/revision feedback, and Stop/Apply races. Browser tests verify every changed field is visible and no task changes before Apply. A scripted continuation must report receipts without repeating mutations. Undo is explicitly separate from rejecting an already applied proposal.

---

<a id="feature-checkpoints-and-undo"></a>

## Checkpoints and undo

Status: approved intent specification. Uses [shared contracts](runtime-contracts.md). This deliberately states storage capabilities and behavioral requirements rather than prescribing a detailed database schema.

<a id="feature-checkpoints-and-undo-purpose"></a>

### Purpose

Make agent changes understandable and conditionally reversible without erasing unrelated manual or later changes. A durable mutation journal lets recovery depend on saved receipts and revisions rather than conversational claims.

<a id="feature-checkpoints-and-undo-user-intent"></a>

### User intent

Review exactly what a run changed and undo eligible changes while retaining conversation evidence and respecting subsequent edits.

<a id="feature-checkpoints-and-undo-agent-intent"></a>

### Agent intent

Inspect the read-only run_changes report to explain actual committed work. The agent cannot execute or approve restoration, erase its audit history, or declare a change undone without the human service's result.

<a id="feature-checkpoints-and-undo-purpose-and-surfaces"></a>

### Purpose and surfaces

Provide a user-facing **Review changes** and **Undo changes from this run** action. The user must be able to understand and reverse a run's local Daylist mutations without rewinding unrelated manual work. Chat rewind and task undo are separate: a user may keep the conversation as evidence while reversing its saved changes, or branch a discussion without changing task data.

The agent may inspect a read-only `run_changes` report to explain its work. It cannot approve/execute restoration, erase its audit trail, or declare its own changes undone. User controls call an application service directly. Undo is available even if AI is disabled; no model inference is needed to construct or execute the inverse.

<a id="feature-checkpoints-and-undo-storage-intent"></a>

### Storage intent

An implementation needs enough durable information to attribute every committed task mutation to an actor, thread, run, and unique operation. It must retain the affected task's stable identity, exact before/after values or equivalent reversible delta, ordering, and a revision/precondition proving whether it is still safe to reverse. An addition needs a way to reverse the existence of that newly added item; an edit/completion needs a way to restore its prior values. Store those facts atomically with the actual mutation, including changes made through proposals and authorized WebMCP calls.

Do not promise rollback for old records that lack this information. A migration may expose undo only for future runs. Retention must be explicit: deleting a checkpoint or aging out its journal removes that undo opportunity, not the saved tasks themselves. A compaction summary is not a reversible journal.

Concurrent manual edits, later agent runs, and synced remote edits must be detected. Never restore an entire database snapshot over them. The safe version-1 policy is all-or-nothing undo of the selected run: if any affected record fails its current precondition, make no changes and show a conflict review. The user can resolve it manually; no automatic “force restore” is needed.

<a id="feature-checkpoints-and-undo-contracts"></a>

### Contracts

Agent `run_changes` input requires `version:1`, `runId:ID`; optional cursor and limit integer 1–20 default 10. Scope is the current authorized workspace. Result is `{success:true,version:1,runId,changes,nextCursor,undoAvailability}`. Each change has `changeId`, stable task reference with current local numeric handle where available, `kind:'added'|'edited'|'completed'|'reopened'`, bounded before/after field summaries, and `conflict` boolean. `undoAvailability` is `available`, `conflicted`, `already_undone`, `expired`, or `not_recorded`.

```json
{"type":"tool_call","name":"run_changes","arguments":{"version":1,"runId":"run-1","limit":10}}
```

The user-only service exposes `previewUndo({runId})` and `applyUndo({previewId,expectedRevision})`. Preview returns a stable ID/revision, readable inverse effects, conflict reasons, and expiry no longer than ten minutes. Apply returns `{status:'undone',undoId,runId,changedTaskIds}` or an explicit conflict/error with nothing changed. Task IDs returned to a device use its mapping; preserve stable identities in stored receipts. Duplicate apply of the same preview returns its original receipt without another inverse.

<a id="feature-checkpoints-and-undo-ui-mapping-and-lifecycle"></a>

### UI mapping and lifecycle

Review changes shows task labels and exact affected fields grouped by run, with provenance and outcome. Undo opens the preview, shows whether new tasks will disappear and which values will be restored, and provides Confirm undo/Cancel. If no reversible information exists, explain why instead of showing an enabled control. A stale preview requires refresh.

Applying undo is itself a recorded human operation, linked to the original run. Keep the conversation and receipts readable with an Undone label. Do not silently reopen/continue the old agent run after undo. Invalidate any active sessions/proposals whose assumptions depend on the restored data; their next work must read fresh state. Do not resurrect cancelled schedules/queued messages or reverse external effects merely because tasks were restored. Redo is out of scope for version 1.

Undo is disabled while any run is actively changing the selected records; stop/finish it first. Recheck preconditions immediately before commit anyway. For multiple changes to one task within a run, the inverse service must reconstruct the run's net effect correctly in reverse order rather than replaying an arbitrary list of old values.

<a id="feature-checkpoints-and-undo-sync-and-implementation-boundary"></a>

### Sync and implementation boundary

Extend task mutation services, not just the chat view: otherwise manual/WebMCP/proposal paths would escape attribution. IndexedDB supports the local atomicity boundary. A future Azure API must enforce equivalent revisions and idempotent inverse operations server-side. A device without up-to-date task revisions cannot advertise safe cloud-wide undo. Pending sync conflicts hold undo; an offline local undo syncs as a new conditional operation, not a command to overwrite the remote database.

Description for the read tool: “Inspect changes actually committed by a run. This does not undo anything. Report conflicts and the user's review/undo option accurately.”

<a id="feature-checkpoints-and-undo-acceptance"></a>

### Acceptance

Verify additions, edits, completion/reopen, multiple mutations per task, partially failed runs, proposal batches, duplicate undo, cancellation before commit, and retention expiry. Introduce a later manual/synced edit and prove undo neither overwrites it nor partially reverses other records. Browser tests cover preview, explicit confirmation, conflict explanation, disabled AI, unchanged conversation evidence, and independent task/chat actions. Detailed store/index/Cosmos design can be decided during implementation as long as these invariants hold.

---

<a id="feature-completion-reports"></a>

## Completion reports

Status: approved extension; not implemented. Uses [runtime contracts](runtime-contracts.md), [operation receipts](work-lifecycle.md#feature-checkpoints-and-undo), [goals](work-lifecycle.md#feature-conversation-goals), [work board](agent-coordination.md#feature-agent-work-board), [team outcomes](agent-coordination.md#feature-agent-team-coordination), and [observability](diagnostics.md#feature-observability). Applies to ordinary agent runs as well as work linked to those domains.

<a id="feature-completion-reports-purpose"></a>

### Purpose

Distinguish a finished reply from a fulfilled action request, and preserve what completed, what remains, and which evidence supports the claims. A structured report gives users and maintainers a consistent result without trusting a model's bare verified flag.

<a id="feature-completion-reports-user-intent"></a>

### User intent

See a concise completed/partial/blocked outcome with deliverables and links to actual changes or supporting evidence. Understand outstanding work and decide whether to continue, clarify, or review a separate domain result.

<a id="feature-completion-reports-agent-intent"></a>

### Agent intent

Submit an accurate outcome with bounded claims, evidence, deliverables, and remaining work. The agent cannot fabricate successful receipts, declare a pending review approved, or mark a goal/board/team complete merely by ending a run.

<a id="feature-completion-reports-scope-and-settings"></a>

### Scope and settings

Add extensions.completionReports `{enabled:boolean,mode:'optional'|'required_for_action_runs'}` default false/optional on migration. Simple informational answers keep the existing `{type:'final',message}` path. Enabled optional mode admits the report tool when eligible. Required mode requires a valid report for a run that attempted an authorized domain action; actual committed writes/failures are identified by the controller, not a model classification. It does not require unnecessary tests, a new review prompt, or a long report for every answer.

Registry metadata marks the terminal report tool as local maintenance with effect read: it records outcome bookkeeping only, grants no domain action, and does not require approval merely to display a result. It remains configurable through the ordinary eligibility policy. Settings validates enabled/required mode requires report_run_completion eligibility and a working Include/Discover path before running action tasks. A disabled tool cannot be smuggled into the final schema as a hidden action.

<a id="feature-completion-reports-closed-model-input-and-response"></a>

### Closed model input and response

report_run_completion takes `{version:1,outcome,summary,claims,deliverables,remaining}`. outcome is completed/partial/blocked; summary plain text 1–2000; claims 0–8; deliverables 0–5 using the existing board contract `{kind:'document'|'result'|'attachment',id,revision,bodyId}`; remaining 0–8 nonblank strings <=240. Total input must serialize to <=6000 characters. All object fields are required, unknown properties fail, and IDs/ownership/run scope come from the controller.

A claim is closed `{kind:'observation'|'change'|'analysis',text:1–240,evidenceRefs}`. evidenceRefs is 0–3 exact shared references. Observation requires at least one permitted source actually read or explicitly supplied in this run; change requires at least one successful committed operation receipt from this run or the controller's explicitly linked prior goal/pipeline/assignment receipts. For kind operation, id is the returned operationReceiptId resolved by the receipt service, not an invented or merely requested call ID. A submitted call, progress-plan status, diagnostic assertion, or old unverified transcript cannot prove a write. Analysis may have zero references for an ordinary explanation or inference; the UI labels it agent analysis, not receipt-backed verification. Source validity does not mechanically prove the meaning of a paraphrase.

completed requires remaining:[] and no known unsettled required work; partial/blocked require at least one remaining item. A run can complete a requested draft while that draft is still subject to a later separate human decision, but its claim must be that the draft was produced, not that its proposed effects were applied. Required criteria and current explicit human intent determine which lifecycle gates belong to this request. Unknown requirements cannot be certified by an arbitrary boolean.

```json
{"type":"tool_call","name":"report_run_completion","arguments":{"version":1,"outcome":"partial","summary":"The review draft is saved; the conflicting retention period still needs your decision.","claims":[{"kind":"change","text":"Saved the draft as document revision 2.","evidenceRefs":[{"kind":"operation","id":"operation-save-2","revision":null}]}],"deliverables":[{"kind":"document","id":"doc-review","revision":2,"bodyId":null}],"remaining":["Choose which retention period the final policy should use."]}}
```

On success return `{success:true,version:1,reportId,revision:1,outcome,status:'recorded'}`. Store the validated input plus controller evidence-validation results, source binding, usage totals, and createdAt in an immutable report. Each claim gets an application-owned support label receipt_backed/source_linked/agent_analysis; no model-supplied support/confidence/verification flag is accepted. Retrying the same call/operation returns the original report, not another terminal event.

<a id="feature-completion-reports-validation-and-terminal-lifecycle"></a>

### Validation and terminal lifecycle

Validate structure, source ownership/current grants/retention/exact revisions, actual observed ranges, deliverable existence, operation success, and scope. For change claims verify the receipt's actual affected IDs/revisions support the linked deliverables; if a document advanced later, say revision 2 was saved rather than claiming it is still the latest head. An operation result with uncertain status blocks a verified change claim until normal domain reconciliation resolves it. Never run the mutation again as a completion check.

Check no unresolved active tool/child/helper, accepted-but-undelivered required human answer, pending exact approval, or required uncommitted domain action is being labeled completed. Missing domain evidence returns conflict or invalid_arguments with a bounded explanation. The model can correct the report only within remaining calls; a rejected report does not record completion. The harness cannot prove that all free-form human requirements were semantically satisfied, so show the criteria/evidence and distinguish verified operation facts from the agent's overall outcome judgment.

The tool is terminal through trusted registry metadata, like a typed return, not a request for another model generation. Persist the report/result and run terminal receipt, render the deterministic result card and summary, then end the run. Map completed to completed; partial/blocked to needs_attention, holding automatic queue/goal continuation. A valid report emitted on the last permitted inference is allowed because no model continuation is required. Cancellation and terminal errors retain their real lifecycle outcomes instead of a fabricated completion report; an app-generated interruption card can link actual settled effects separately.

Required-mode final-only output after an action attempt is stored as an unstructured assistant reply but does not certify completion. If calls remain, permit one explicit bounded correction asking for the report. At the limit show a deterministic “Completion report unavailable” notice with real operation receipts and outcome needs_attention. No hidden extra inference, provider switch, auto-created goal, or replay is allowed to tidy the report. Optional mode does not downgrade an ordinary compatible final reply merely because it lacks this extension.

<a id="feature-completion-reports-model-guidance-and-domain-integration"></a>

### Model guidance and domain integration

Description: “Report what actually completed and what remains. Support change claims with successful operation receipts and observations with read sources. Use partial/blocked when required work is unfinished. Analysis is an interpretation, not verified execution. This tool ends the run and sends the shown summary; do not call it before required children, actions, or approvals settle.” Include the schema and description through the same definitions/responseSchema/dispatch validator path as all local tools. The parent action union remains tool_call/final; no native model-tool or new response role is required.

goal_report, work_report, pipeline terminal receipts, and human team outcome acceptance remain their own authoritative contracts. A completion report may reference them through immutable operation/result evidence but cannot replace or silently invoke them. Reuse the same evidence/receipt validators to avoid two definitions of “committed.” Board tools that already terminate an attempt render their own deterministic outcome; do not require another inference for this report after a terminal work_report. They can create an app-owned equivalent view from their actual receipts, clearly attributed to the controller rather than a fabricated model call.

In Plan, a report can complete an analysis/planning request with source-linked observations/analysis. It cannot claim that planning changed domain records. Rebuild/compaction/fallback retain exact operation/remaining-work facts and counters. A model switch cannot create missing verification evidence. Team fragments may use reports as source-linked analysis, but the coordinator/human team review still governs the combined outcome. Generic children keep their concise result contract and do not gain domain completion/report tools through this feature.

<a id="feature-completion-reports-ui-persistence-and-acceptance"></a>

### UI, persistence, and acceptance

The completion card shows outcome text/icon, summary, claims with support labels, exact deliverable links, evidence links, and remaining work. Keep a compact collapsed default with native Expand evidence controls. Do not put a universal “Verified” badge on all claims; a saved receipt proves a write, not content quality or user satisfaction. Continue/Clarify prefills a deliberate next request; it does not automatically repeat unfinished or uncertain calls. Mandatory review controls stay on their actual domain cards.

Use completion-report.js for validation/terminal handling, a small report view, and immutable IndexedDB records linked to thread/run/operation history. Emit control.changed feature completion plus the real tool/run events, including correction failures and actual counters. Reports are not a separate source of private persistent memory. Normal deletion/privacy/retention can remove payloads; display missing evidence honestly and never rehydrate forgotten content from a report. Future sync preserves immutable identity/ownership and deduplicates receipts without granting another device permission to continue.

Verify completed/partial/blocked field consistency, stale or absent evidence, requested-versus-committed effects, changed deliverable heads, remaining children/approvals, exact receipt linkage, no duplicate terminal events, last-call handling, required versus optional modes, lightweight informational replies, Plan claims, cancelled/error outcomes, fallback/compaction, safe rendering, and no automatic domain state transition from an outcome label. Real-model evaluation should measure honest reporting separately from deterministic source checks.

Sources: [Cline submit schema](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/sdk/packages/core/src/extensions/tools/schemas.ts) and [terminal tool implementation](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/sdk/packages/core/src/extensions/tools/definitions.ts). Cline's summary/verified mechanism inspires the feature; the browser contract above uses scoped evidence and actual receipts instead of trusting a boolean.

---

<a id="feature-follow-up-suggestions"></a>

## Follow-up suggestions

Status: approved extension; not implemented. Uses [work board](agent-coordination.md#feature-agent-work-board), [history](conversation-lifecycle.md#feature-threads-and-history), [agent library](agent-configuration.md#feature-agent-library), and [observability](diagnostics.md#feature-observability). Suggestions are durable proposals; their creation does not start work.

<a id="feature-follow-up-suggestions-purpose"></a>

### Purpose

Preserve an actionable issue discovered during a request without expanding the current assignment. A lightweight inbox separates evidence-backed suggestions from authorized work and prevents useful follow-ups disappearing in a final paragraph.

<a id="feature-follow-up-suggestions-user-intent"></a>

### User intent

Ask the agent to note something for later, inspect its reason/evidence, edit it, accept it into a work item or new conversation draft, or dismiss it. Decide explicitly whether any work should start.

<a id="feature-follow-up-suggestions-agent-intent"></a>

### Agent intent

Record a concrete follow-up within the configured suggestion policy and withdraw its own still-pending suggestion when the evidence changes. It cannot accept a suggestion, assign a stronger agent, create execution authority, or use suggestions instead of completing the current authorized request.

<a id="feature-follow-up-suggestions-policy-and-record-contract"></a>

### Policy and record contract

Add extensions.suggestions `{enabled:boolean,mode:'explicit'|'observed_findings',maxPending:integer 1–50}` default false/explicit/20. Explicit mode requires a current human request to record the follow-up. observed_findings additionally permits at most two evidence-backed suggestions discovered while fulfilling the authorized task; enabling this mode is a human configuration choice. Neither permits searching unrelated material just to generate more work, inferring personal traits, or ignoring an explicit “do not suggest follow-ups.” The two-per-run cap applies in either mode. A child cannot suggest or withdraw in v1.

Store `{version:1,suggestionId,ownerId,revision,agentId,configurationRevision,projectId,threadId,runId,title,reason,instruction,sourceRefs,state,humanEdited,createdAt,updatedAt,acceptedTarget}`. projectId is ID/null; title nonblank 1–120; reason 1–500; instruction 1–2000; sourceRefs 1–5 shared evidence references; state pending/accepted/dismissed/withdrawn; humanEdited is boolean initially false and permanently true after a human edit; acceptedTarget null or `{kind:'board_item'|'conversation_draft',id:ID}`. Require source IDs to have been actually observed in this run or supplied by the human. A suggestion identifies its originating agent/configuration but does not bind a future executor or grants.

The instruction must stand alone with source references and uncertainty, not “do the thing mentioned above.” Never copy an unbounded transcript or credentials. Suggestions containing only vague improvement claims should be rejected by agent guidance and human review; validators guarantee shape/evidence accessibility, not subjective usefulness. Cap pending records per agent/project as configured; return budget_exceeded without evicting another suggestion.

<a id="feature-follow-up-suggestions-agent-contracts-and-presentation"></a>

### Agent contracts and presentation

All inputs are closed, version 1, with standard domain failures.

| Tool | Input besides version | Success besides success/version |
| --- | --- | --- |
| followup_suggest | title, reason, instruction, sourceRefs | suggestionId, revision, state:'pending', operationReceiptId |
| followup_list | cursor?, limit? 1–10 default 5 | items of suggestionId/revision/title/reason/state/sourceRefs, nextCursor |
| followup_withdraw | suggestionId, expectedRevision, reason 1–300 | suggestionId, revision, state:'withdrawn', operationReceiptId |

Listing is scoped to pending suggestions from this agent/project visible to this thread, <=6000 serialized characters per page. The human inbox can browse other states. A model cannot withdraw another agent's or a human-edited suggestion, an accepted suggestion, or one that has been dismissed by the user. Its exact owner lineage and pending revision must match. Human edits mark the suggestion human-owned for subsequent changes, preserving the original attribution and history.

```json
{"type":"tool_call","name":"followup_suggest","arguments":{"version":1,"title":"Resolve retention-policy conflict","reason":"Two reviewed notes specify different retention periods.","instruction":"Review the two cited policies, ask which rule is authoritative, and prepare a proposed correction for review.","sourceRefs":[{"kind":"document","id":"doc-policy-a","revision":2},{"kind":"document","id":"doc-policy-b","revision":1}]}}
```

Description: “Record a specific supported follow-up only when requested or permitted by observed-findings policy. This saves a pending suggestion; nothing starts. Include a self-contained instruction and actual evidence. Do not create duplicates, silently expand the assignment, or claim the work was scheduled/completed.” Suggest/withdraw are domain writes under ordinary tool permissions; they use idempotent operation IDs. List is read-only. Tool inclusion/discovery controls remain independent.

Prevent exact duplicates by a normalized title/instruction/source-identity key within active agent/project pending suggestions, returning conflict plus the accessible existing ID. Do not use speculative semantic matching to hide a distinct suggestion. Repeated same-operation calls return their existing receipt without consuming the two-per-run cap again. Withdrawing an old suggestion and creating a replacement still consumes a new creation slot; it cannot evade limits.

<a id="feature-follow-up-suggestions-human-inbox-and-acceptance"></a>

### Human inbox and acceptance

Native cards show title, why it matters, exact proposed instruction, source links, originating run/agent, age, and state. Controls are Inspect, Edit, Accept as board item, Prepare conversation, and Dismiss. Nothing is preaccepted. Edit uses `{suggestionId,expectedRevision,body}` replacing title/reason/instruction/sourceRefs only; it does not execute them. Dismiss takes ID/revision and optional note <=300. Neither asks the model to interpret a click.

Accept input is `{suggestionId,expectedRevision,target:'board_item'|'conversation_draft'}`. For a board item, the human reviews/selects its normal assignee/project/resources/grants/review requirement through the existing board Create service. Acceptance creates an unstarted queued item; Start remains explicit under the board contract. For conversation_draft create a durable draft reference with the instruction and sources in a composer, without inference or an accepted user message. Sending is a separate explicit human action. This draft is an application-owned object, not a live model session or a promise that Chrome is ready.

Acceptance atomically binds one suggestion revision to one target creation operation/receipt. Double clicks/retries return the same target; stale or withdrawn suggestions cannot be accepted. Validate source availability and current permissions; if source versions are missing, preserve the proposal and ask the human to revise it rather than substituting today's body. Accepting does not automatically assign prior task grants or treat the originating document as current authorization. A user can edit the future instruction before Start/Send; the target's actual accepted revision becomes its own evidence.

After acceptance, suggestion state remains accepted even if the target is later cancelled; display the real target state separately. A model cannot retract accepted work by withdrawing its old suggestion. General saved Daylist tasks are not created by this feature. If the human wants a Daylist task, the normal explicit task tool/UI path handles that request.

<a id="feature-follow-up-suggestions-persistence-integration-and-acceptance-checks"></a>

### Persistence, integration, and acceptance checks

Use followup-store.js, followup-tools.js, and an inbox view sharing the existing board/thread draft services. Store immutable revision and acceptance receipts in IndexedDB, plus source references and tombstones. Emit control.changed feature suggestion and actual tool events; pending cards do not block the current run or own the shared interaction slot. Suggested work does not count as current-task progress. Goals, queues, and pipelines cannot auto-accept it.

Keep pending suggestions until user action within configured capacity; offer human archive/delete with explicit retention. Source deletion removes inaccessible previews while showing that evidence is missing; it does not reconstruct deleted text from logs. Future API sync deduplicates append/accept operations, handles concurrent dismiss/accept by revision conflict, and never starts a target on every device. Reload preserves suggestions but starts no work.

Verify explicit versus observed policy, two-per-run/capacity limits, source checks, duplicate IDs, stale/human-edited withdrawal denial, single target creation, revision conflicts, source deletion, safe rendering, and no inference or domain effects on Accept-as-draft. An end-to-end test records an issue during a read, finishes the original request, accepts later, and proves execution occurs only after the separate Start/Send.

Source inspiration: [OpenClaw suggestion tools](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/src/agents/tools/task-suggestion-tools.ts). This design makes browser suggestions durable and explicitly reviewed.
