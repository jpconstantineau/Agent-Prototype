# Focused delegation, durable assignments, and agent teams

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Coordinate work across bounded agent contexts using one assignment/evidence model. Focused read-only children, durable main-role board workers, and approved team coordination share scheduling and receipts while requiring intentionally different authority boundaries.

## User intent

Delegate focused analysis, assign durable work to named agents, inspect attempt evidence, review results, and optionally approve a small team with clear members and budgets.

## Agent intent

Delegate scoped read-only analysis, report authorized board work, and exchange bounded team messages/fragments only as an approved member. Generic children cannot become board workers, launch descendants, gain team tools, or approve domain outcomes.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Focused subagents](#feature-subagents) | Parent agent; scoped read-only child | Own isolated analytical contexts, child grants, result packets, and child budgets. |
| [Agent work board](#feature-agent-work-board) | Human; assigned main-role workers | Own durable assignments, dependencies, attempts, and human review. |
| [Agent teams](#feature-agent-team-coordination) | Human-approved members and coordinator | Coordinate existing board assignments and bounded fragments/mailboxes. |

## Integration and delivery

The board is the sole durable work store. Teams reference its existing assignments rather than adding another task system. Generic delegate_task children remain read-only; explicitly assigned main-role board workers use their separately approved settings and grants.

Share the scheduler, source/evidence identities, and actual operation receipts, but retain child/run/board/goal/team ceilings as intersecting limits. Team messages are information, not human instructions, approvals, or automatic wake-ups. Coordinator review does not replace human outcome acceptance.

Implement children after context isolation and policy, board workers after persistent runs/receipts, and teams last after board admission, mailboxes, and aggregate accounting. Separate main/subagent tools and skills remain enforced for every role and helper.

<a id="feature-subagents"></a>

## Focused subagents

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md), [history](conversation-lifecycle.md#feature-threads-and-history), and [capability policy](capability-policy.md#feature-capability-controls). The primary purpose is context isolation, not guaranteed parallel speed or a different model.

<a id="feature-subagents-purpose"></a>

### Purpose

Isolate focused analysis in a small independent context and return a concise result to the parent. Explicit grants and budgets let delegation help with context pressure without multiplying unrestricted agents.

<a id="feature-subagents-user-intent"></a>

### User intent

See delegated work and its outcome, inspect details when needed, and stop a child or the parent run.

<a id="feature-subagents-agent-intent"></a>

### Agent intent

The main agent delegates a bounded read-only task and consumes or cancels its result; the child analyzes only the supplied context and grants. Children cannot write, directly ask the human, or spawn further agents in v1.

<a id="feature-subagents-actors-and-scope"></a>

### Actors and scope

The main agent can delegate a focused task through `delegate_task`, inspect it with `task_status`, and cancel it with `task_cancel`. Users see each child in an expandable card and can stop it or its parent. Children are independent Prompt API sessions with an explicit task packet, a restricted executor, their own bounded history, and a concise result. They do not inherit the parent's transcript automatically.

Version 1 children are read-only analysts. They may read current task data, selected attachments, and explicitly allowed history/skills. They cannot mutate tasks/preferences, ask the human directly, schedule work, alter the queue/policy, render arbitrary artifacts, or spawn grandchildren. If a child needs a human answer or unavailable data, it reports that need to the parent. The parent asks and decides what to send back via a new bounded assignment.

<a id="feature-subagents-tool-contracts"></a>

### Tool contracts

`delegate_task` requires `version: 1`, `task` (1–2000 characters), `context` (0–4000 characters), `allowedTools` (0–8 unique eligible names permitted by the child policy), `allowedSkills` (0–3 unique eligible skill IDs), and `maxResultChars` (integer 400–3000). Child policy permits data reads, authorized tool discovery/skill loading, and restricted read composition; it forbids the actions listed above. Optional title is 1–80 characters. Caller scope supplies parent thread/run and the user-managed subagent profile; model arguments cannot select an owner or bypass that profile. Reject forbidden grants rather than silently expanding/replacing them. An empty allowedSkills means no skill content/catalog is available to this child.

The large-result extension adds optional allowedResults: 0–5 unique accessible result IDs, default empty. The host validates the parent's access before delegating these references and records the exact grant in child state. A result ID merely mentioned in task/context prose is not a grant. Reading one still requires an eligible/admitted result retrieval tool in allowedTools. Child offloading settings require the same retrieval dependency; children can read their own newly produced results within their scope without gaining access to sibling outputs.

The [memory extension](memory-and-learning.md#feature-persistent-memory) similarly adds allowedMemories:0–10 accessible IDs, default empty, validated against parent scope. Project/document/attachment/board reads require explicit controller-maintained resource grants from the assignment, never IDs mentioned only in prose. The selected [text-provider route](local-model-endpoint.md) can differ under human configuration but cannot change grant limits, read-only status, or budgets. Children cannot draft/publish skills, create board work, start voice input, or manipulate foreground guidance.

```json
{"type":"tool_call","name":"delegate_task","arguments":{"version":1,"title":"Overdue task analysis","task":"Identify recurring themes in overdue tasks; do not change anything.","context":"Return a short factual summary and task references from current reads.","allowedTools":["list_items","search_items"],"allowedSkills":[],"maxResultChars":1200}}
```

Success immediately returns `{success:true,version:1,taskId,threadId,status:'queued'}`. This means accepted, not finished. The child starts only through the scheduler after that observation is persisted. Max two active/queued children per parent run, one active child model session at a time, max six inference calls per child, and 12 total child calls per parent run. These are enforced budgets, not hints.

<a id="feature-subagents-separate-child-tool-and-skill-settings"></a>

### Separate child tool and skill settings

Resolve the user's subagent profile independently from the main profile, then intersect it with global policy, parent eligibility, explicit allowedTools/allowedSkills, read-only child restrictions, and record-access scope. Profile Include entries enter the child's initial schema/context only when eligible under that intersection; Discover entries remain on demand. Include does not override a task grant. A parent may grant a Discover tool it is allowed to use without copying its own admission state into the child, but it must know the exact accessible definition. Skills can be eligible for a child without copying their already-loaded bodies from the parent; load the exact selected revisions under the child's own budgets.

Apply the parent's selected [agent configuration](agent-configuration.md#feature-agent-library) subagent settings and any human-designated child template revision inside this intersection. The model cannot select a more permissive library entry. Parent and child [execution permissions](capability-policy.md#feature-execution-permissions) combine restrictively; automatic mode never grants v1 children writes. Reads of [saved large results](context-management.md#feature-large-tool-results) require explicit delegated result references, not access to every result under the same owner. Record configuration/grant revisions in the diagnostic event stream.

If child discovery is wanted, include search_tools/describe_tool in allowedTools along with the actual granted read tools; discovery cannot reveal tools outside that grant. For child skill loading, grant the appropriate list_skills/load_skill/read_skill_resource tools and explicit skill IDs. Include skills require load_skill eligibility and must fit the child context before inference. The example's empty skill grant means no preload. Settings previews the resolved child profile, while the child card records the actual narrower grants and revisions used. Revoking either parent/global eligibility or the child profile cancels/rebuilds affected work; widening a profile does not widen a running assignment automatically.

If app_execute is permitted for read-only analysis, all tools it could call must also appear in the child's grant and admitted catalog. Nested composition never grants a write, direct storage access, or new child. These same restrictions apply after child compaction or a queued assignment resumes.

`task_status` requires version, taskId, and optional `wait` boolean default true. It only addresses that parent's children. With wait true the service awaits a state milestone without polling or another model call; the inference scheduler may suspend the parent and run the child. Success has `taskId`, `status` (`queued`, `running`, `completed`, `failed`, `cancelled`, `needs_input`), and, when terminal, `result` or `error`. With wait false return a single snapshot. Expose a wait only when the parent has budget for a continuation.

`task_cancel` requires version/taskId; returns `{success:true,version:1,taskId,status:'cancelled'}` or the unchanged terminal status. Idempotent cancellation retains already produced results and never cancels unrelated siblings. Stop parent cancels its unstarted/running children.

<a id="feature-subagents-result-packet"></a>

### Result packet

A successful child result is a closed object with summary (1–maxResultChars), references (0–20 objects `{kind:'task'|'message'|'attachment'|'document',id:ID}`), uncertainties (0–5 strings up to 200), and needsInput boolean. The host validates record existence/access; document references retain their read revision in the supporting application receipt. Task-local numeric handles map to durable identities where available. A summary cannot forge existence or grant parent mutations.

If the child exceeds the result bound, request one bounded correction within its remaining budget or fail with `budget_exceeded`; never inject an unbounded transcript into the parent. Parent observations include the concise packet and a child thread reference only. Store full child history separately for human inspection and bounded authorized retrieval.

<a id="feature-subagents-ui-and-model-guidance"></a>

### UI and model guidance

Map title/task/status to a card with waiting/running/result/error labels, a Stop child button, and Open details. Distinguish Child needs information from a live human question. Display sequential execution honestly. Do not show fabricated simultaneous thinking animations.

Tool description: “Delegate a small read-only analysis with only the context needed. Children do not inherit this conversation. Supply explicit tool limits and request a short result. Do not delegate trivial work or duplicate the same task. Use task_status to await its result and task_cancel to stop it. A child's recommendation does not authorize a mutation.” Parent must finish or cancel child work before its final response; the runtime holds the run incomplete otherwise, without silently executing beyond budgets.

<a id="feature-subagents-implementation-and-acceptance"></a>

### Implementation and acceptance

[Cline-inspired teams](agent-coordination.md#feature-agent-team-coordination) are an explicit extension over board main-role assignments, not permission for generic children to message peers, mutate domains, or spawn grandchildren. [Plan](capability-policy.md#feature-plan-act-modes) propagates a hard domain-effect ceiling to admitted children. Resolve the child's own [instruction-rule bindings](agent-configuration.md#feature-conditional-instruction-rules) against its actual scope rather than inheriting all parent rules. Existing concise child results remain the terminal contract; ordinary children do not gain the main [completion-report tool](work-lifecycle.md#feature-completion-reports).

The OpenClaw extensions reuse fixed read-only helper infrastructure for [structured processing](workflows-and-processing.md#feature-structured-processing), [recall](memory-and-learning.md#feature-context-aware-recall), and the [observability agent](diagnostics.md#feature-observability-agent). Their exact purpose/scoped grants and controller-owned schemas are defined in those specs and [runtime contracts](runtime-contracts.md#6-openclaw-review-extension-contracts). They share the 12-call parent child/helper aggregate and cannot invoke one another recursively. Diagnostic event reads require the explicit diagnostic scope; no ordinary child gains log access. [Pipelines](workflows-and-processing.md#feature-workflow-pipelines), goal reporting, event-reminder writes, and follow-up suggestion writes remain forbidden to generic v1 children.

The [persona extension](agent-configuration.md#feature-agent-personas) resolves the child template's subagent-role persona, or the parent's subagent-role persona when no template is configured. Pin the exact revision at assignment creation and show it on the child card. Parent main-role persona and thread overrides are not implicitly inherited. This adds controller-owned context only; delegate_task arguments and child grants remain unchanged.

Add `subagents.js` and a shared inference scheduler. Do not recursively instantiate an unrestricted AgentLoop using the parent executor. Fresh LanguageModel.create() sessions receive current child policy, independently admitted definitions/skill sections, and the bounded packet. Session creation/download failures become child failures; where user activation is required show an enable action. Do not clone a full parent context to achieve isolation. A minimal base may be cloned only with matching role policy, Include content, and no parent history. Use [tool discovery](capability-policy.md#feature-tool-discovery) for per-child schema updates.

Persist child identity/state/results in IndexedDB. On reload mark unfinished children interrupted; do not repeat analysis or writes automatically. Test context isolation, permissions, result limits, parent/child Stop races, disabled tools/skills, no grandchildren, bounded waits, session cleanup, and no child mutation. A scripted parent must consume one short packet, not the whole child transcript. Evaluate actual hardware resource behavior separately from protocol correctness.

---

<a id="feature-agent-work-board"></a>

## Agent work board

Status: approved specification. Uses [agent library](agent-configuration.md#feature-agent-library), [projects](agent-configuration.md#feature-project-context), [workflow templates](workflows-and-processing.md#feature-workflow-templates), [permissions](capability-policy.md#feature-execution-permissions), [subagents](agent-coordination.md#feature-subagents), and [observability](diagnostics.md#feature-observability). A durable queue/state machine, distinct from Daylist tasks, a run's progress plan, and temporary read-only subagents.

<a id="feature-agent-work-board-purpose"></a>

### Purpose

Support work that must survive a conversation, pause for human review, or pass between named agents. Durable assignments, dependencies, attempts, and receipts make interrupted work recoverable without replaying completed operations.

<a id="feature-agent-work-board-user-intent"></a>

### User intent

Assign bounded work to agents, see its status and deliverables, resolve blockers, and accept or request changes to a specific reviewed attempt.

<a id="feature-agent-work-board-agent-intent"></a>

### Agent intent

Read assigned work, append progress or evidence, report a blocker or deliverable, and create follow-ups only within an approved route and grant. The agent cannot widen its assignment or approve its own required human review.

<a id="feature-agent-work-board-records-assignment-and-states"></a>

### Records, assignment, and states

Each project may have one board in v1, with an Unassigned board for existing users. A work item has workId:ID, board/project identity, owner, revision, title 1–120, instruction 1–2000, assignee agentId/configurationRevision, state queued/running/blocked/review/done/cancelled, reviewRequired boolean default true, dependsOn 0–10 unique work IDs, resourceRefs 0–10, grantedTools 0–20 unique names, grantedSkills 0–3 IDs, createdAt/updatedAt, and current attemptId:ID|null. Resource references use the [context-reference](conversation-lifecycle.md#feature-context-references) shapes. IDs are not Daylist numeric task IDs.

Store comments as separate append records with commentId, workId, actor/run, createdAt, text 1–2000, and sourceRefs 0–10. Store attempts separately with attemptId, item revision snapshot, configuration/project/provider references, immutable assignment/grants, run/thread IDs, state, operation receipts, and bounded summary. Deliverables are existing document/result/attachment references with exact versions/body identities, not arbitrary disk paths or untrusted external URLs. Work metadata cannot secretly enable a tool or change agent configuration.

Bound the serialized instruction/resource assignment packet to 4000 characters at create/edit. work_read's first page returns that packet plus compact identity/revision/state, with no comments if none fit. A subsequent comments cursor returns item:null plus workId/revision and complete comment records under the same 5000-character page cap. Each comment including sourceRefs must serialize to <=3000 characters. Thus a long fixed assignment is not repeated on every page or allowed to prevent progress through comments.

State transitions are controller-owned: queued -> running by atomic claim; running -> blocked/review/done by a validated report; review -> done or queued by a human review decision; blocked -> queued by explicit human unblock; queued/blocked/review -> cancelled by the human. Stop an active attempt records interruption and leaves the item blocked with a clear resumable status, not queued for automatic replay. Unmet dependencies keep queued items visibly not ready. Done dependencies gate readiness; cycles/cross-board links are rejected. Adding dependencies to running work is forbidden.

<a id="feature-agent-work-board-human-controls-and-authority"></a>

### Human controls and authority

[Follow-up suggestions](work-lifecycle.md#feature-follow-up-suggestions) provide a pending review inbox before work enters this board. Accept as board item creates one unstarted item through the ordinary human Create/grant review path; Start remains separate. A suggestion does not count as a completed assignment or acquire the current attempt's grants. [Goals](work-lifecycle.md#feature-conversation-goals) can link a board deliverable as evidence, but each domain retains its own reviewed completion and budgets.

The board offers columns plus a list/table alternative, Create, Assign, Start ready work, Pause dispatcher, Stop attempt, Comment, Review, Request changes, Unblock, Cancel, and attempt history. Creating/assigning a work item is a concrete human authorization of its instruction, selected resources, and grant ceiling. Before starting, show the exact agent revision, project, capabilities, permissions, and deliverables/review requirements. An agent assignment cannot be more permissive than the creating human's explicit grant; an agent-created follow-up also intersects the creator's current grants.

Changing assignee, instruction, resources, dependencies, or grants requires an idle item and expectedRevision. Widening grants is human-only. An agent may propose a follow-up for an already human-approved routing target, but cannot select an arbitrary stronger agent from the library. Only the explicitly configured handoff route/target is eligible. Subagents v1 cannot create board work as a way to escape their read-only restriction.

Direct human services use `{workId,expectedRevision,...typedChanges}` or `{body}` for create. Start accepts workId/expectedRevision and returns `{workId,attemptId,runId,status:'queued_for_execution'}` after claim/queue preparation, not task completion. Review accepts `{workId,expectedRevision,attemptId,decision:'accept'|'request_changes',feedback?}`; feedback 1–2000 is required for request_changes. Accept verifies the exact reviewed attempt/deliverables/current revision before moving to done. An old review card cannot approve a later attempt.

<a id="feature-agent-work-board-agent-tools-and-interaction"></a>

### Agent tools and interaction

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

<a id="feature-agent-work-board-dispatcher-context-and-recovery"></a>

### Dispatcher, context, and recovery

The approved [team extension](agent-coordination.md#feature-agent-team-coordination) links a small approved roster/mission/mailbox/outcome to these same assignments. Named specialists execute existing board main-role attempts; generic v1 children retain their restrictions. Team membership does not duplicate the board or relax its one-active-attempt/two-items-per-start limits. A coordinator can exchange scoped information and assemble fragments, but board work_report and required human reviews remain authoritative. Phase and aggregate team/goal ceilings apply before admission and dispatch; stored messages alone do not start another attempt.

Default dispatch is explicit Start; an optional human-enabled open-page dispatcher selects ready authorized items. Maximum 50 unfinished items per project, one active board attempt, two items started per user start batch, 12 main inference calls per attempt, and existing child/maintenance ceilings. An agent-created work_create may create at most two follow-ups per attempt under its fixed route and grants; reaching a cap stops further creation. No worker chain silently widens this budget. Require another human Start/approved schedule occurrence for additional batches.

Create a fresh bounded worker session using the named configuration's main profile, intersected with item grants/current hard policy, selected project, resource references, and permitted memory/skills. Board workers are foreground harness-managed main_agent actors with runType board; they are not unrestricted subprocesses. A larger endpoint model does not bypass per-attempt limits or change v1 child restrictions. Prior comments are paged/selected as data; never inject the whole board as instructions.

Claim an item and persist attempt identity atomically. Hold a same-origin Web Lock for active dispatch where supported plus durable claim ownership/generation checks; browser tabs cannot both mutate the same attempt. Without suitable local arbitration, allow only one explicitly active dispatcher and refuse another. No cross-device single-executor guarantee is claimed until the future server API provides leases/fencing or a designated executing-device rule. A synced board definition is not permission for every device to run it.

On reload/page termination, mark unfinished attempts interrupted/blocked. Resume is a human action creating a new attempt from current domain state, exact prior receipts, and a bounded progress summary. Never rerun a saved tool-call list, auto-accept a review, or infer that a missing completion event means a write did not commit. Retries do not inherit consumed approval tokens. After repeated failures (two attempts by default) show a blocked diagnostic and require explicit correction/review before another attempt. Page suspension/closed-page and model-activation limitations match scheduled work.

<a id="feature-agent-work-board-integration-and-acceptance"></a>

### Integration and acceptance

Add work-board-store.js, work-tools.js, and a board dispatcher/view sharing the inference scheduler. Persist state, comments, attempts, claim generations, deliverable references, and receipts in IndexedDB. Domain mutations and events remain atomic where possible; board/report commits are not substitutes for the actual document/task receipts. Future Azure sync preserves IDs/revisions/ownership/dependency edges and holds conflicts instead of duplicating attempts.

Test atomic claims, dependency cycles/readiness, exact review attempts, human grant expansion, routed follow-up restrictions, max follow-ups/batches, read-only child denial, Stop, crash after a domain write, no replay on Resume, and provider fallback. Browser tests cover column/list accessibility, comments, review/request-changes, paused dispatch, and another-tab contention. Verify Daylist task completion is independent of work-board state unless an explicit authorized task tool actually runs.

---

<a id="feature-agent-team-coordination"></a>

## Agent teams

Status: approved extension; not implemented. Extends the existing [work board](agent-coordination.md#feature-agent-work-board), [agent library](agent-configuration.md#feature-agent-library), [subagents](agent-coordination.md#feature-subagents), [goals](work-lifecycle.md#feature-conversation-goals), [completion reports](work-lifecycle.md#feature-completion-reports), and [observability](diagnostics.md#feature-observability). Coordination is application-owned IndexedDB state; no external messaging or daemon.

<a id="feature-agent-team-coordination-purpose"></a>

### Purpose

Allow approved agents working toward one mission to exchange concise clarifications and assemble source-linked contributions into a combined deliverable. Reuse the existing assignment/attempt system so coordination does not become a second task board or an uncontrolled recursive worker chain.

<a id="feature-agent-team-coordination-user-intent"></a>

### User intent

Choose a coordinator and specialists, review their assignments and grants, inspect messages/contributions, pause or stop work, and review the assembled outcome. Resume a bounded collaboration later without replaying completed effects.

<a id="feature-agent-team-coordination-agent-intent"></a>

### Agent intent

Read the bound team mission, exchange information with approved members, submit result fragments, and assemble the findings. The coordinator may organize/review contributions but cannot enlarge membership, permissions, source scope, or budgets. Messages are evidence or clarification requests, not new execution authority.

<a id="feature-agent-team-coordination-team-versus-existing-delegation-and-board-work"></a>

### Team versus existing delegation and board work

Generic v1 subagents remain small read-only parent/child analyses without peer messaging or grandchildren. A board item is a durable assignment with its own attempt and grant. A team adds an explicit mission, approved member directory, mailbox, and outcome group over selected existing board assignments. It does not duplicate tasks, claim Daylist task IDs as work IDs, or turn ordinary children into unrestricted peers.

Team specialists are named configurations executing normal board main-role attempts, not generic delegate_task children. Their actual grants may be read-only or permit explicitly reviewed domain changes under the board's normal rules. The current coordinator conversation is not itself an extra concurrently active board attempt. Keep the board's one-active-attempt limit, two items per human start batch, per-attempt 12-call ceiling, and shared inference scheduler. Coordination can run sequentially; no simultaneous Nano execution is promised.

<a id="feature-agent-team-coordination-configuration-records-and-human-admission"></a>

### Configuration, records, and human admission

Add extensions.teams `{enabled:boolean,maxMembers:integer 2–3,maxInferenceCalls:integer 12–60,maxMessages:integer 4–40}` default false/3/24/20. These are ceilings, not automatic permission to start work. Generic child roles cannot enable the team tools through this flag. Fixed processing/recall/diagnostic helpers cannot join teams or recursively dispatch teammates.

A closed team body is `{version:1,name,mission,projectId,coordinator,members,workIds,maxInferenceCalls,maxMessages}`. name 1–120, mission 1–2000; projectId ID/null must equal the selected board/project; coordinator is `{memberId:ID,agentId,configurationRevision,threadId}` supplied/verified by the controller. members has 1–2 specialist records `{memberId,agentId,configurationRevision,label:1–80,workIds:1–2 IDs}`; maxMembers includes the coordinator. All member IDs unique, configurations exact, selected work IDs unique and on the same board. Top-level workIds is their union, at most two in the start batch. No member receives another member's tool or resource grants by inclusion.

Metadata stores teamId, ownerId, revision, state ready/running/paused/review/complete/cancelled, createdAt/updatedAt, source bindings, aggregate inference/message counters, current budget window, and outcome references. Membership and mission edits require an idle/paused team and expectedRevision; changing a running assignment uses the normal board edit/review path. Do not silently reset counters on edits. Retain explicit immutable windows and lifetime usage when a human later authorizes additional work.

Human Create/Save uses `{body}` / `{teamId,expectedRevision,body}`. Start `{teamId,expectedRevision}` presents the concrete mission, members/configuration revisions, selected board instructions, effective grants/phases, dependencies/review requirements, total budget, and executing device. It starts at most two ready items under that frozen selection. Pause/Resume/Cancel and Stop member are direct human services with expected revisions. Resume after a crash reconciles prior attempts/receipts and requires explicit selection of any new attempt; it never repeats saved tool requests. Missing configurations/resources hold work, not substitute a stronger/default agent.

<a id="feature-agent-team-coordination-agent-tools-and-structured-contracts"></a>

### Agent tools and structured contracts

All inputs are closed version 1, scoped to the controller-bound team/member. There is no arbitrary teamId/owner/configuration argument or model-facing spawn/add-member/approve-budget tool.

| Tool | Input besides version | Success besides success/version |
| --- | --- | --- |
| team_read | none | teamId, revision, mission, members (IDs/labels/roles/selected work IDs/status), remainingInferenceCalls, remainingMessages |
| team_send | recipientMemberId, text:1–1200, sourceRefs:0–5, replyTo:ID|null | messageId, state:'stored', operationReceiptId |
| team_mailbox | cursor?, limit? 1–5 default 3 | messages, nextCursor; <=4000 serialized characters |
| team_submit_fragment | workId, attemptId, summary:1–1500, evidenceRefs:1–5, deliverables:0–3 | fragmentId, fragmentRevision:1, state:'submitted', operationReceiptId |
| team_review_fragment | fragmentId, expectedRevision, decision:'considered'|'needs_clarification', note:0–500 | fragmentId, fragmentRevision, state, operationReceiptId |
| team_finalize | summary:1–2000, fragmentRefs:1–6 of {fragmentId,revision}, unresolved:0–5 strings <=240 | outcomeId, revision:1, status:'awaiting_user' |

Source/evidence references use the shared exact evidence-reference contract. Deliverables use the existing board shape `{kind,id,revision,bodyId}`. A fragment references the caller's actual assigned work/attempt and settled accessible results; it cannot report another worker's assignment complete. Work/attempt IDs are checked against the host binding. Fragment submission is not work_report, and neither changes a board reviewRequired gate. The coordinator alone reviews fragments and finalizes; a contributor cannot mark its own report accepted. “Considered” means used in assembly, not a quality certification or human approval.

```json
{"type":"tool_call","name":"team_send","arguments":{"version":1,"recipientMemberId":"member-reviewer","text":"Does the cited decision apply to both report periods, or only the latest one?","sourceRefs":[{"kind":"document","id":"doc-report","revision":3}],"replyTo":null}}
```

Message record `{version:1,messageId,teamId,senderMemberId,recipientMemberId,text,sourceRefs,replyTo,createdAt,operationId}` is immutable. No broadcast in v1; each recipient costs one message. Recipient must be active and explicitly approved, and every attached reference must be accessible under both sender and recipient grants. Reject inaccessible attachments rather than sharing their content through prose. The host cannot detect all manually copied sensitive text, so the membership/grant preview and bounded agent instructions remain necessary. Only intended recipient and coordinator see a message through agent tools; the human inspector can see the team history.

<a id="feature-agent-team-coordination-delivery-fragments-and-outcomes"></a>

### Delivery, fragments, and outcomes

Stored does not mean delivered, read, or answered. Mailbox reads return exact message IDs, sender, reply link, text, source references, and createdAt; record supplied-to-inference IDs separately from human-visible read state. Only needed unread messages are admitted as a labeled bounded team_context packet <=4000 characters at the next safe boundary. No message directly dispatches a tool, switches agent/project, approves a call, or becomes a fabricated human message.

A message can be consumed during an already authorized ready/running attempt or when a human resumes work. It cannot wake a completed worker into an unlimited new turn, bypass a blocked board dependency, or reset the team window. The coordinator can explicitly ask the user to resume/reassign when more analysis is required. Normal phase/current-policy ceilings still apply. All messages count toward maxMessages, with a maximum two sent per member per run; retries of the same operation are idempotent. A new content/reply consumes a new slot. Loop detection includes repetitive mailbox/message patterns using stable domain identities.

Fragments are immutable versioned result snapshots with team/member/work/attempt identity, summary, source/deliverable references, createdAt, and an immutable stored-result body. Correcting one creates a new revision with exact supersession lineage; a message does not silently replace it. The coordinator's review records bind the exact revision; state is submitted/considered/needs_clarification. Finalize requires every referenced revision to have been considered. A combined outcome snapshots the offered fragment revisions and unresolved issues, with source attribution preserved; it does not splice all member histories into the coordinator context. A superseded fragment invalidates an unaccepted outcome for review rather than silently changing its contents.

team_finalize returns awaiting_user and ends the coordinator run without another hidden inference. The native outcome card shows the combined summary, contributors, evidence, deliverables, and unresolved issues. Human decision `{outcomeId,expectedRevision,decision:'accept'|'request_changes',feedback?}` records the exact decision; feedback 1–1000 is required for request_changes. Accept requires no unresolved required board review/attempt/effect and moves the team to complete. If prerequisites remain, show them and reject premature acceptance; do not auto-approve individual board reviews. Requested changes pause the team until the human authorizes the next bounded attempt/window.

<a id="feature-agent-team-coordination-budgets-phase-and-persistence"></a>

### Budgets, phase, and persistence

Team totals count every attempted generation from the coordinator while bound to this mission, member board attempts, and their permitted helpers/maintenance, once per inferenceId. Individual run/child/goal/pipeline ceilings remain additional restrictions; fallback or a new thread cannot reset the team counter. Exhaustion pauses and shows partial results using stored facts, with explicit human budget extension required. Team helpers remain subject to the generic child cap; no grandchildren. Active team membership in another mission cannot reuse a run to escape accounting.

team_read/team_mailbox are read/effect read; team_send/team_submit_fragment/team_review_fragment/team_finalize are write/effect write for their exact local coordination records. The Plan phase has a narrow bookkeeping exception permitting those coordination operations, while normal execution permission levels/overrides still apply: a separately configured read_only level can deny these writes, and an ask decision remains required when applicable. Assignment changes, work_create/work_report, domain writes, external messages, worker Start/Resume, and human acceptance remain their own gated operations and are not hidden inside coordination tools. A Plan coordinator cannot cause a team Act member to execute new writes under its request; the team window carries a Plan ceiling to all admitted attempts. Existing independent work keeps its separate authority and is not commandeered by a team message.

Use team-coordination.js and stores for teams, memberships, messages, delivery markers, fragments, outcomes, and budget windows alongside the existing board stores. Commit local coordination changes and their audit receipts atomically; emit control.changed feature team plus real tool/worker events. Card controls use native lists/tables and safe source views. Compaction retains only necessary messages/fragment references and exact authoritative counters, not whole mailboxes. A mission log is a derived view of these actual events, not another model-written source of permission.

Reload restores mission/mailbox/outcome state but holds unfinished work. Deleting/revoking a source invalidates derived previews and activation; do not reconstruct it from retained messages/logs. Future sync validates owner/project/membership and revisions, deduplicates message/accept IDs, and requires one designated execution device until server arbitration exists. Synced inbox delivery never grants inference on another device automatically.

<a id="feature-agent-team-coordination-acceptance"></a>

### Acceptance

Verify no second task store, explicit membership, source access on both sides, message isolation and acknowledgements, repeated-send idempotency, stale/withdrawn contributors, fragment version review, premature outcome acceptance, one-active-board-attempt scheduling, Plan ceilings, generic-child exclusion, aggregate/goal budgets, Stop/reload, and no automatic wakeup/replay. A sample analyst/reviewer/coordinator exchange must produce a concise attributed outcome without the parent receiving every transcript or bypassing a human review.

Sources: [Cline teams](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/docs/sdk/guides/multi-agent-teams.mdx) and [CLI team state](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/docs/cli/agent-teams.mdx). At the reviewed revision these team tools are documented for SDK/CLI/Kanban rather than the VS Code extension. This browser design retains existing grant and execution ceilings instead of copying Cline's worker authority model.
