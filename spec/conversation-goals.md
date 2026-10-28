# Durable conversation goals and bounded continuation

Status: approved design; not implemented. Uses [history](threads-and-history.md), [progress plans](progress-plans.md), [work board](agent-work-board.md), [queue](request-queue.md), [loop detection](tool-loop-detection.md), and [runtime contracts](runtime-contracts.md).

## Purpose

Preserve an objective and unresolved questions while the user clarifies work over multiple visits or conversations. Make continuation explicit and bounded so a small model can advance a longer objective without losing its scope or resetting its consumed budget.

## User intent

Start a goal, clarify it over several sessions, inspect progress, attach a later conversation deliberately, and pause/resume/edit/cancel it. Choose whether the assistant may continue automatically while the page is open and how much work that permits.

## Agent intent

Read the bound goal, create one only on explicit request, and report verified completion or a real blocker. The agent cannot resume itself, widen budgets, switch the goal's agent/project, or treat a saved goal as permission for unrelated work.

## Goal and binding contracts

Store `{version:1,goalId,ownerId,revision,agentId,configurationRevision,projectId,objective,successCriteria,state,continuation,maxRuns,maxInferenceCalls,usedRuns,usedInferenceCalls,createdAt,updatedAt,summary,sourceRefs}`. projectId is ID/null; objective is nonblank 1–2000; successCriteria 0–5 strings of 1–200; summary plain text 0–1500; sourceRefs 0–10 shared evidence references. State is active/paused/blocked/limited/complete/cancelled; continuation is manual/automatic_open_page; maxRuns integer 1–5; maxInferenceCalls integer 1–60; used counters nonnegative safe integers. Defaults are manual, three runs, 24 total inference attempts, further limited by configuration ceilings. Summary is sourced progress, never hidden reasoning or an operation journal.

Each goal has one execution-owner thread at a time. Additional threads may reference it read-only. Binding record `{goalId,goalRevision,threadId,threadRevision,mode:'execution'|'reference'}` is controller-owned. User Attach/move execution uses expected goal/thread revisions, settles active work first, and validates identical owner/project and an explicitly selected compatible configuration. This enables continued clarification in a later conversation without making every thread a competing executor. Goals survive Chrome session destruction and reload. Opening a saved goal does not start inference.

Goal continuation settings are extensions.goals `{enabled:boolean,maxRuns:integer 1–5,maxInferenceCalls:integer 1–60}` default false/3/24. Body values cannot exceed those ceilings. A user can choose a smaller budget at Start/Resume; an agent cannot supply a larger one. Count normal, failed, fallback, child, recall, processing, and maintenance generation attempts attributable to pursuit against the same aggregate. Keep their individual existing ceilings as well. Context-window usage is a separate metric; unknown provider tokens cannot enforce an exact token budget, so version 1 uses counted calls/runs rather than a misleading token cap.

## Agent and human services

All model inputs are closed and version 1. goal_read takes no other fields and returns the bound full goal with used counters and remaining budgets. goal_create takes objective, successCriteria, and sourceRefs only; user intent/configuration supplies manual continuation and default budgets. Success is `{success:true,version:1,goalId,revision,state:'active',continuation:'manual',operationReceiptId}`. Existing unfinished binding returns conflict. goal_report takes expectedRevision, state complete/blocked, note 1–500, and evidence 0–10 shared references; success returns goalId/revision/state/operationReceiptId. Scope comes from the controller, never a model-supplied goalId or thread selector.

```json
{"type":"tool_call","name":"goal_report","arguments":{"version":1,"expectedRevision":3,"state":"blocked","note":"The proposal still needs your choice of retention period.","evidence":[{"kind":"message","id":"message-8","revision":1}]}}
```

Completion requires no unresolved required operation/review/child work plus accessible referenced deliverables where specified. Structural checks cannot prove semantic achievement; the report and criteria remain inspectable. A blocker identifies the missing human input/state and pauses automatic pursuit immediately rather than consuming repeated runs to prove the same blocker. A conversation about clarifying the objective need not be marked complete merely because a reply was delivered. These are domain writes subject to ordinary tool policy; children may read only a delegated goal snapshot and cannot report the parent goal.

Human Start `{body}` supplies objective/criteria/continuation/budgets; other commands use `{goalId,expectedRevision,...}`. Edit replaces objective/criteria while idle and preserves counters. Pause/Cancel stop further admission; Stop active run also pauses the goal. Resume can acknowledge a corrected blocker and authorize a new bounded allowance explicitly shown as an additional budget window. Retain cumulative lifetime counters and previous windows; never reset history. Attach, switch agent/project, or replace an objective is human-only. Changed constraints increment revision, invalidate prepared nudges and applicable approvals, and rebuild bounded context.

## Model context and continuation scheduler

At run start inject the exact objective/criteria/revision and bounded sourced progress plus authoritative receipt references. Do not silently truncate an objective; if required content cannot fit, show a budget conflict. Current human clarifications append as real messages; the agent proposes a revised objective through ordinary chat and the user explicitly saves it. The controller records the changed goal revision. Compaction/fallback preserve exact goal binding, active constraints, counters, and operation receipts.

Descriptions: “Use goal_create only when explicitly asked to establish a persistent objective. Read the current goal before reporting. Mark complete only after satisfying its full scope; report a concrete blocker when input or external state is required. You cannot resume, enlarge budgets, or erase consumed work.” Ordinary task chat does not silently become goal pursuit.

Automatic continuation requires the user's explicit automatic_open_page choice. After a settled run, atomically check the same goal revision/state, no pending interaction, no unconsumed user queue, remaining aggregate/run budgets, and current grants. Queue at most one controller-authored continuation carrying goalId/revision and a stable occurrence ID. At admission repeat those checks. A normal model final alone can leave the goal active; continue only within this authorization. A blocked/needs_attention/loop/error outcome holds, never nudges. Queued human requests take precedence and consume goal budgets only when explicitly bound to that goal. No timer scanner, page-close execution, or cross-device duplicate pursuit is promised.

Every run still has at most 12 main calls and existing child/maintenance limits. Reaching either goal total ends deterministically in limited with an honest progress summary from stored evidence; no extra inference solely for wrapping up. Final allowed calls cannot open interactions that require an impossible continuation. User clarification can be accepted/stored while limited; further inference requires explicit Resume authorization. A fresh thread, fallback, or delegated worker cannot reset the aggregate budget.

## UI, storage, and acceptance

Show a goal panel with exact objective, criteria, state, referencing conversations, progress/source links, per-window/lifetime usage, and continuation setting. Native Start/Pause/Resume/Edit/Attach/Cancel controls map to direct services. Distinguish the goal from saved Daylist tasks, run progress, and board assignments. A board item may link a goal as evidence but its completion remains its own reviewed transition. Use goal-store.js and goal-controller.js with immutable revision/history/window records, claims, outbox IDs, and control.changed feature goal.

Reload holds active work as paused/interrupted and offers Resume. One designated device executes until the future API provides authoritative claims; syncing a goal is not authorization for all devices to run it. Delete uses tombstones and explicit linked-history handling. Verify multi-visit clarification, explicit thread movement, stale goal edits/nudges, aggregate counts across fallback/children/maintenance, Stop, no silent budget reset, insufficient context, and completion reports with missing deliverables or outstanding approvals.

Source inspiration: [OpenClaw goals](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/goal.md). Browser budgets and cross-session clarification behavior are specified above.
