# Durable agent work board and review handoffs

Status: approved specification. Uses [agent library](agent-library.md), [projects](project-context.md), [workflow templates](workflow-templates.md), [permissions](execution-permissions.md), [subagents](subagents.md), and [observability](observability.md). A durable queue/state machine, distinct from Daylist tasks, a run's progress plan, and temporary read-only subagents.

## Purpose

Support work that must survive a conversation, pause for human review, or pass between named agents. Durable assignments, dependencies, attempts, and receipts make interrupted work recoverable without replaying completed operations.

## User intent

Assign bounded work to agents, see its status and deliverables, resolve blockers, and accept or request changes to a specific reviewed attempt.

## Agent intent

Read assigned work, append progress or evidence, report a blocker or deliverable, and create follow-ups only within an approved route and grant. The agent cannot widen its assignment or approve its own required human review.

## Records, assignment, and states

Each project may have one board in v1, with an Unassigned board for existing users. A work item has workId:ID, board/project identity, owner, revision, title 1–120, instruction 1–2000, assignee agentId/configurationRevision, state queued/running/blocked/review/done/cancelled, reviewRequired boolean default true, dependsOn 0–10 unique work IDs, resourceRefs 0–10, grantedTools 0–20 unique names, grantedSkills 0–3 IDs, createdAt/updatedAt, and current attemptId:ID|null. Resource references use the [context-reference](context-references.md) shapes. IDs are not Daylist numeric task IDs.

Store comments as separate append records with commentId, workId, actor/run, createdAt, text 1–2000, and sourceRefs 0–10. Store attempts separately with attemptId, item revision snapshot, configuration/project/provider references, immutable assignment/grants, run/thread IDs, state, operation receipts, and bounded summary. Deliverables are existing document/result/attachment references with exact versions/body identities, not arbitrary disk paths or untrusted external URLs. Work metadata cannot secretly enable a tool or change agent configuration.

Bound the serialized instruction/resource assignment packet to 4000 characters at create/edit. work_read's first page returns that packet plus compact identity/revision/state, with no comments if none fit. A subsequent comments cursor returns item:null plus workId/revision and complete comment records under the same 5000-character page cap. Each comment including sourceRefs must serialize to <=3000 characters. Thus a long fixed assignment is not repeated on every page or allowed to prevent progress through comments.

State transitions are controller-owned: queued -> running by atomic claim; running -> blocked/review/done by a validated report; review -> done or queued by a human review decision; blocked -> queued by explicit human unblock; queued/blocked/review -> cancelled by the human. Stop an active attempt records interruption and leaves the item blocked with a clear resumable status, not queued for automatic replay. Unmet dependencies keep queued items visibly not ready. Done dependencies gate readiness; cycles/cross-board links are rejected. Adding dependencies to running work is forbidden.

## Human controls and authority

[Follow-up suggestions](follow-up-suggestions.md) provide a pending review inbox before work enters this board. Accept as board item creates one unstarted item through the ordinary human Create/grant review path; Start remains separate. A suggestion does not count as a completed assignment or acquire the current attempt's grants. [Goals](conversation-goals.md) can link a board deliverable as evidence, but each domain retains its own reviewed completion and budgets.

The board offers columns plus a list/table alternative, Create, Assign, Start ready work, Pause dispatcher, Stop attempt, Comment, Review, Request changes, Unblock, Cancel, and attempt history. Creating/assigning a work item is a concrete human authorization of its instruction, selected resources, and grant ceiling. Before starting, show the exact agent revision, project, capabilities, permissions, and deliverables/review requirements. An agent assignment cannot be more permissive than the creating human's explicit grant; an agent-created follow-up also intersects the creator's current grants.

Changing assignee, instruction, resources, dependencies, or grants requires an idle item and expectedRevision. Widening grants is human-only. An agent may propose a follow-up for an already human-approved routing target, but cannot select an arbitrary stronger agent from the library. Only the explicitly configured handoff route/target is eligible. Subagents v1 cannot create board work as a way to escape their read-only restriction.

Direct human services use `{workId,expectedRevision,...typedChanges}` or `{body}` for create. Start accepts workId/expectedRevision and returns `{workId,attemptId,runId,status:'queued_for_execution'}` after claim/queue preparation, not task completion. Review accepts `{workId,expectedRevision,attemptId,decision:'accept'|'request_changes',feedback?}`; feedback 1–2000 is required for request_changes. Accept verifies the exact reviewed attempt/deliverables/current revision before moving to done. An old review card cannot approve a later attempt.

## Agent tools and interaction

All inputs are closed, version 1; scope comes from the assigned controller context. Read-only tools may be delegated only with explicit board/item grants. New tools start Disabled.

| Tool | Input besides version | Success besides success/version |
| --- | --- | --- |
| work_list | state? enum, cursor?, limit? 1–10 default 5 | items of workId/title/revision/state/assignee/readiness; nextCursor |
| work_read | workId, cursor?, limit? 1–10 default 5 | item metadata, bounded instruction/resources, comments, nextCursor; total <=5000 characters |
| work_comment | workId, expectedRevision, text 1–2000, sourceRefs 0–10 | commentId, workId, revision, operationReceiptId |
| work_create | title, instruction, dependsOn 0–10, resourceRefs 0–10 | workId, revision, state:'queued', operationReceiptId; assignee/grants resolved only from the approved route |
| work_report | state blocked/review/done, summary 1–2000, deliverables 0–10 typed exact references | workId, attemptId, revision, actual state, operationReceiptId |

work_report accepts no workId/attempt ownership arguments: the host binds it to the caller's actual active assignment. A normal chat without an active assignment cannot report another agent's work done. Done requires reviewRequired:false set by the human, required deliverable existence/version checks, no unresolved writes/children, and a completion receipt. Otherwise return review as the actual state. A report requesting review/blocked ends the attempt with awaiting_user; done ends it completed. The controller renders a deterministic handoff summary without another hidden model call. Human review never executes past tool calls again.

```json
{"type":"tool_call","name":"work_report","arguments":{"version":1,"state":"review","summary":"The weekly review draft is saved and ready for your review.","deliverables":[{"kind":"document","id":"doc-1","revision":2,"bodyId":null}]}}
```

A deliverable is `{kind:'document'|'result'|'attachment',id:ID,revision:Revision|null,bodyId:ID|null}`. Documents require revision; immutable result/attachment records require bodyId and revision null. The host validates accessible retained content and originating attempt/reference grants. Existence checks do not prove semantic quality; reviewRequired provides the human content decision. No Git/PR completion contract is included.

The tool descriptions distinguish work state from actual domain effects: “Report only verified deliverables and receipts. If blocked, explain what is missing. A comment or requested review does not complete the work. Do not use board creation to acquire broader permissions or recursively dispatch unlimited work.” Board writes use normal permission gates; read/comment visibility never confers execution authority. Each append/mutation is idempotent and revision checked.

## Dispatcher, context, and recovery

Default dispatch is explicit Start; an optional human-enabled open-page dispatcher selects ready authorized items. Maximum 50 unfinished items per project, one active board attempt, two items started per user start batch, 12 main inference calls per attempt, and existing child/maintenance ceilings. An agent-created work_create may create at most two follow-ups per attempt under its fixed route and grants; reaching a cap stops further creation. No worker chain silently widens this budget. Require another human Start/approved schedule occurrence for additional batches.

Create a fresh bounded worker session using the named configuration's main profile, intersected with item grants/current hard policy, selected project, resource references, and permitted memory/skills. Board workers are foreground harness-managed main_agent actors with runType board; they are not unrestricted subprocesses. A larger endpoint model does not bypass per-attempt limits or change v1 child restrictions. Prior comments are paged/selected as data; never inject the whole board as instructions.

Claim an item and persist attempt identity atomically. Hold a same-origin Web Lock for active dispatch where supported plus durable claim ownership/generation checks; browser tabs cannot both mutate the same attempt. Without suitable local arbitration, allow only one explicitly active dispatcher and refuse another. No cross-device single-executor guarantee is claimed until the future server API provides leases/fencing or a designated executing-device rule. A synced board definition is not permission for every device to run it.

On reload/page termination, mark unfinished attempts interrupted/blocked. Resume is a human action creating a new attempt from current domain state, exact prior receipts, and a bounded progress summary. Never rerun a saved tool-call list, auto-accept a review, or infer that a missing completion event means a write did not commit. Retries do not inherit consumed approval tokens. After repeated failures (two attempts by default) show a blocked diagnostic and require explicit correction/review before another attempt. Page suspension/closed-page and model-activation limitations match scheduled work.

## Integration and acceptance

Add work-board-store.js, work-tools.js, and a board dispatcher/view sharing the inference scheduler. Persist state, comments, attempts, claim generations, deliverable references, and receipts in IndexedDB. Domain mutations and events remain atomic where possible; board/report commits are not substitutes for the actual document/task receipts. Future Azure sync preserves IDs/revisions/ownership/dependency edges and holds conflicts instead of duplicating attempts.

Test atomic claims, dependency cycles/readiness, exact review attempts, human grant expansion, routed follow-up restrictions, max follow-ups/batches, read-only child denial, Stop, crash after a domain write, no replay on Resume, and provider fallback. Browser tests cover column/list accessibility, comments, review/request-changes, paused dispatch, and another-tab contention. Verify Daylist task completion is independent of work-board state unless an explicit authorized task tool actually runs.
