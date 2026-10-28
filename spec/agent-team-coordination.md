# Bounded agent-team coordination and combined outcomes

Status: approved extension; not implemented. Extends the existing [work board](agent-work-board.md), [agent library](agent-library.md), [subagents](subagents.md), [goals](conversation-goals.md), [completion reports](completion-reports.md), and [observability](observability.md). Coordination is application-owned IndexedDB state; no external messaging or daemon.

## Purpose

Allow approved agents working toward one mission to exchange concise clarifications and assemble source-linked contributions into a combined deliverable. Reuse the existing assignment/attempt system so coordination does not become a second task board or an uncontrolled recursive worker chain.

## User intent

Choose a coordinator and specialists, review their assignments and grants, inspect messages/contributions, pause or stop work, and review the assembled outcome. Resume a bounded collaboration later without replaying completed effects.

## Agent intent

Read the bound team mission, exchange information with approved members, submit result fragments, and assemble the findings. The coordinator may organize/review contributions but cannot enlarge membership, permissions, source scope, or budgets. Messages are evidence or clarification requests, not new execution authority.

## Team versus existing delegation and board work

Generic v1 subagents remain small read-only parent/child analyses without peer messaging or grandchildren. A board item is a durable assignment with its own attempt and grant. A team adds an explicit mission, approved member directory, mailbox, and outcome group over selected existing board assignments. It does not duplicate tasks, claim Daylist task IDs as work IDs, or turn ordinary children into unrestricted peers.

Team specialists are named configurations executing normal board main-role attempts, not generic delegate_task children. Their actual grants may be read-only or permit explicitly reviewed domain changes under the board's normal rules. The current coordinator conversation is not itself an extra concurrently active board attempt. Keep the board's one-active-attempt limit, two items per human start batch, per-attempt 12-call ceiling, and shared inference scheduler. Coordination can run sequentially; no simultaneous Nano execution is promised.

## Configuration, records, and human admission

Add extensions.teams `{enabled:boolean,maxMembers:integer 2–3,maxInferenceCalls:integer 12–60,maxMessages:integer 4–40}` default false/3/24/20. These are ceilings, not automatic permission to start work. Generic child roles cannot enable the team tools through this flag. Fixed processing/recall/diagnostic helpers cannot join teams or recursively dispatch teammates.

A closed team body is `{version:1,name,mission,projectId,coordinator,members,workIds,maxInferenceCalls,maxMessages}`. name 1–120, mission 1–2000; projectId ID/null must equal the selected board/project; coordinator is `{memberId:ID,agentId,configurationRevision,threadId}` supplied/verified by the controller. members has 1–2 specialist records `{memberId,agentId,configurationRevision,label:1–80,workIds:1–2 IDs}`; maxMembers includes the coordinator. All member IDs unique, configurations exact, selected work IDs unique and on the same board. Top-level workIds is their union, at most two in the start batch. No member receives another member's tool or resource grants by inclusion.

Metadata stores teamId, ownerId, revision, state ready/running/paused/review/complete/cancelled, createdAt/updatedAt, source bindings, aggregate inference/message counters, current budget window, and outcome references. Membership and mission edits require an idle/paused team and expectedRevision; changing a running assignment uses the normal board edit/review path. Do not silently reset counters on edits. Retain explicit immutable windows and lifetime usage when a human later authorizes additional work.

Human Create/Save uses `{body}` / `{teamId,expectedRevision,body}`. Start `{teamId,expectedRevision}` presents the concrete mission, members/configuration revisions, selected board instructions, effective grants/phases, dependencies/review requirements, total budget, and executing device. It starts at most two ready items under that frozen selection. Pause/Resume/Cancel and Stop member are direct human services with expected revisions. Resume after a crash reconciles prior attempts/receipts and requires explicit selection of any new attempt; it never repeats saved tool requests. Missing configurations/resources hold work, not substitute a stronger/default agent.

## Agent tools and structured contracts

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

## Delivery, fragments, and outcomes

Stored does not mean delivered, read, or answered. Mailbox reads return exact message IDs, sender, reply link, text, source references, and createdAt; record supplied-to-inference IDs separately from human-visible read state. Only needed unread messages are admitted as a labeled bounded team_context packet <=4000 characters at the next safe boundary. No message directly dispatches a tool, switches agent/project, approves a call, or becomes a fabricated human message.

A message can be consumed during an already authorized ready/running attempt or when a human resumes work. It cannot wake a completed worker into an unlimited new turn, bypass a blocked board dependency, or reset the team window. The coordinator can explicitly ask the user to resume/reassign when more analysis is required. Normal phase/current-policy ceilings still apply. All messages count toward maxMessages, with a maximum two sent per member per run; retries of the same operation are idempotent. A new content/reply consumes a new slot. Loop detection includes repetitive mailbox/message patterns using stable domain identities.

Fragments are immutable versioned result snapshots with team/member/work/attempt identity, summary, source/deliverable references, createdAt, and an immutable stored-result body. Correcting one creates a new revision with exact supersession lineage; a message does not silently replace it. The coordinator's review records bind the exact revision; state is submitted/considered/needs_clarification. Finalize requires every referenced revision to have been considered. A combined outcome snapshots the offered fragment revisions and unresolved issues, with source attribution preserved; it does not splice all member histories into the coordinator context. A superseded fragment invalidates an unaccepted outcome for review rather than silently changing its contents.

team_finalize returns awaiting_user and ends the coordinator run without another hidden inference. The native outcome card shows the combined summary, contributors, evidence, deliverables, and unresolved issues. Human decision `{outcomeId,expectedRevision,decision:'accept'|'request_changes',feedback?}` records the exact decision; feedback 1–1000 is required for request_changes. Accept requires no unresolved required board review/attempt/effect and moves the team to complete. If prerequisites remain, show them and reject premature acceptance; do not auto-approve individual board reviews. Requested changes pause the team until the human authorizes the next bounded attempt/window.

## Budgets, phase, and persistence

Team totals count every attempted generation from the coordinator while bound to this mission, member board attempts, and their permitted helpers/maintenance, once per inferenceId. Individual run/child/goal/pipeline ceilings remain additional restrictions; fallback or a new thread cannot reset the team counter. Exhaustion pauses and shows partial results using stored facts, with explicit human budget extension required. Team helpers remain subject to the generic child cap; no grandchildren. Active team membership in another mission cannot reuse a run to escape accounting.

team_read/team_mailbox are read/effect read; team_send/team_submit_fragment/team_review_fragment/team_finalize are write/effect write for their exact local coordination records. The Plan phase has a narrow bookkeeping exception permitting those coordination operations, while normal execution permission levels/overrides still apply: a separately configured read_only level can deny these writes, and an ask decision remains required when applicable. Assignment changes, work_create/work_report, domain writes, external messages, worker Start/Resume, and human acceptance remain their own gated operations and are not hidden inside coordination tools. A Plan coordinator cannot cause a team Act member to execute new writes under its request; the team window carries a Plan ceiling to all admitted attempts. Existing independent work keeps its separate authority and is not commandeered by a team message.

Use team-coordination.js and stores for teams, memberships, messages, delivery markers, fragments, outcomes, and budget windows alongside the existing board stores. Commit local coordination changes and their audit receipts atomically; emit control.changed feature team plus real tool/worker events. Card controls use native lists/tables and safe source views. Compaction retains only necessary messages/fragment references and exact authoritative counters, not whole mailboxes. A mission log is a derived view of these actual events, not another model-written source of permission.

Reload restores mission/mailbox/outcome state but holds unfinished work. Deleting/revoking a source invalidates derived previews and activation; do not reconstruct it from retained messages/logs. Future sync validates owner/project/membership and revisions, deduplicates message/accept IDs, and requires one designated execution device until server arbitration exists. Synced inbox delivery never grants inference on another device automatically.

## Acceptance

Verify no second task store, explicit membership, source access on both sides, message isolation and acknowledgements, repeated-send idempotency, stale/withdrawn contributors, fragment version review, premature outcome acceptance, one-active-board-attempt scheduling, Plan ceilings, generic-child exclusion, aggregate/goal budgets, Stop/reload, and no automatic wakeup/replay. A sample analyst/reviewer/coordinator exchange must produce a concise attributed outcome without the parent receiving every transcript or bypassing a human review.

Sources: [Cline teams](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/docs/sdk/guides/multi-agent-teams.mdx) and [CLI team state](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/docs/cli/agent-teams.mdx). At the reviewed revision these team tools are documented for SDK/CLI/Kanban rather than the VS Code extension. This browser design retains existing grant and execution ceilings instead of copying Cline's worker authority model.
