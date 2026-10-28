# Focused subagents with bounded context

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md), [history](threads-and-history.md), and [capability policy](capability-controls.md). The primary purpose is context isolation, not guaranteed parallel speed or a different model.

## Actors and scope

The main agent can delegate a focused task through `delegate_task`, inspect it with `task_status`, and cancel it with `task_cancel`. Users see each child in an expandable card and can stop it or its parent. Children are independent Prompt API sessions with an explicit task packet, a restricted executor, their own bounded history, and a concise result. They do not inherit the parent's transcript automatically.

Version 1 children are read-only analysts. They may read current task data, selected attachments, and explicitly allowed history/skills. They cannot mutate tasks/preferences, ask the human directly, schedule work, alter the queue/policy, render arbitrary artifacts, or spawn grandchildren. If a child needs a human answer or unavailable data, it reports that need to the parent. The parent asks and decides what to send back via a new bounded assignment.

## Tool contracts

`delegate_task` requires `version: 1`, `task` (1–2000 characters), `context` (0–4000 characters), `allowedTools` (0–8 unique enabled read-tool names), and `maxResultChars` (integer 400–3000). Optional `title` is 1–80 characters. Caller scope supplies the parent thread/run; model arguments cannot select another owner or broader permissions. Reject attempts to include forbidden tools rather than silently granting alternatives.

```json
{"type":"tool_call","name":"delegate_task","arguments":{"version":1,"title":"Overdue task analysis","task":"Identify recurring themes in overdue tasks; do not change anything.","context":"Return a short factual summary and task references from current reads.","allowedTools":["list_items","search_items"],"maxResultChars":1200}}
```

Success immediately returns `{success:true,version:1,taskId,threadId,status:'queued'}`. This means accepted, not finished. The child starts only through the scheduler after that observation is persisted. Max two active/queued children per parent run, one active child model session at a time, max six inference calls per child, and 12 total child calls per parent run. These are enforced budgets, not hints.

`task_status` requires version, taskId, and optional `wait` boolean default true. It only addresses that parent's children. With wait true the service awaits a state milestone without polling or another model call; the inference scheduler may suspend the parent and run the child. Success has `taskId`, `status` (`queued`, `running`, `completed`, `failed`, `cancelled`, `needs_input`), and, when terminal, `result` or `error`. With wait false return a single snapshot. Expose a wait only when the parent has budget for a continuation.

`task_cancel` requires version/taskId; returns `{success:true,version:1,taskId,status:'cancelled'}` or the unchanged terminal status. Idempotent cancellation retains already produced results and never cancels unrelated siblings. Stop parent cancels its unstarted/running children.

## Result packet

A successful child result is a closed object with `summary` (1–maxResultChars), `references` (0–20 objects `{kind:'task'|'message'|'attachment',id:ID}`), `uncertainties` (0–5 strings up to 200), and `needsInput` boolean. For task references, the service converts local numeric handles to durable accessible references where available; a plain summary cannot forge existence. Reject invented references after validation. Child output is evidence from a lower-trust worker, not authority to run new parent actions.

If the child exceeds the result bound, request one bounded correction within its remaining budget or fail with `budget_exceeded`; never inject an unbounded transcript into the parent. Parent observations include the concise packet and a child thread reference only. Store full child history separately for human inspection and bounded authorized retrieval.

## UI and model guidance

Map title/task/status to a card with waiting/running/result/error labels, a Stop child button, and Open details. Distinguish Child needs information from a live human question. Display sequential execution honestly. Do not show fabricated simultaneous thinking animations.

Tool description: “Delegate a small read-only analysis with only the context needed. Children do not inherit this conversation. Supply explicit tool limits and request a short result. Do not delegate trivial work or duplicate the same task. Use task_status to await its result and task_cancel to stop it. A child's recommendation does not authorize a mutation.” Parent must finish or cancel child work before its final response; the runtime holds the run incomplete otherwise, without silently executing beyond budgets.

## Implementation and acceptance

Add `subagents.js` and a shared inference scheduler. Do not recursively instantiate an unrestricted `AgentLoop` using the parent executor. Fresh `LanguageModel.create()` sessions receive current system policy, allowed definitions, and the bounded packet. Session creation/download failures become child failures; where user activation is required show a user action to enable rather than manufacturing it. Do not clone a full parent context to achieve isolation. A pre-initialized minimal base may be cloned only with compatible policy and no parent history.

Persist child identity/state/results in IndexedDB. On reload mark unfinished children interrupted; do not repeat analysis or writes automatically. Test context isolation, permissions, result limits, parent/child Stop races, disabled tools/skills, no grandchildren, bounded waits, session cleanup, and no child mutation. A scripted parent must consume one short packet, not the whole child transcript. Evaluate actual hardware resource behavior separately from protocol correctness.
