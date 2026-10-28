# Queued follow-up requests

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). Adapts T3's queue management without assuming native model steering.

## Purpose

Capture follow-up instructions while a run is busy without pretending an in-flight model call can be edited. A durable queue preserves human intent and starts later work only at an appropriate boundary.

## User intent

Queue messages, inspect and edit unstarted requests, reorder them, or cancel them before execution.

## Agent intent

Read the current thread's queued requests through queue_read when useful. The agent cannot author, edit, reorder, cancel, or prematurely execute human-authored queued instructions.

## User controls versus agent tools

The queue is primarily user-facing. While an agent works, the composer accepts a follow-up with a **Queue message** action. The user can list, inspect, edit, reorder, and cancel their unstarted entries. An agent may inspect its thread's queue using a read-only `queue_read` tool. Version 1 does not let an agent edit, cancel, reorder, or invent human-authored queued instructions. The app's UI commands call the queue service directly, not by asking the model to manage the queue.

Do not expose “promote to steer” in version 1. Chrome's ongoing `prompt()` call is not a mutable stream of new human instructions. A later steering feature would need an explicit safe-boundary protocol, not a pretend mid-generation injection.

## Structured contracts

Agent tool `queue_read` requires `version: 1`; optional `entryId: ID`, `cursor: Cursor`, `limit` (integer 1–20, default 10). Reading an entry forbids cursor/limit. No thread selector is accepted; reads are scoped to the active thread. Results contain `{ success: true, version: 1, items, nextCursor }`. Each item has `entryId`, `revision`, `text` (1–4000 characters), `createdAt: Instant`, `state: 'queued'`. `nextCursor` is a string or null. At most 8000 total text characters are returned per read; partial lists supply a cursor, not silently omitted items.

```json
{"type":"tool_call","name":"queue_read","arguments":{"version":1,"limit":5}}
```

Human service commands are closed objects: `enqueue({threadId,text,attachmentIds})`, `edit({entryId,expectedRevision,text})`, `cancel({entryId,expectedRevision})`, `reorder({entryId,expectedRevision,beforeEntryId})`, and `resume({threadId})`. `attachmentIds` is an array of 0–4 accessible attachment IDs; `beforeEntryId` is ID or null for the end. The app supplies identity and revisions. Text must be 1–4000 nonblank characters. Successful writes return the accepted entry and its new revision; conflicts preserve the draft for review. References to missing or started entries fail, not redirect to a similar message.

Queue state transitions are `queued -> claimed -> running -> completed|failed|cancelled`; a human cancel applies only to queued entries. The active run's Stop cancels running work separately. Persist state and a unique execution claim; record the resulting run ID. An entry runs at most once for a given claim. On an uncertain crash during a write, mark interrupted for review rather than automatically replaying it.

## UI mapping and execution

Show numbered queued-message cards below the active conversation, distinct from already sent messages. Display original text, attachment names, and Edit/Move up/Move down/Cancel controls. Editing preserves the previous composer draft. Native buttons must work with keyboard and touch; do not require drag-and-drop. A disabled edit button explains that the message already started. Queue status announces additions and execution, not every reorder keystroke.

When a run ends normally, atomically claim the next entry and start a new `agent.run()` in that thread. Keep the session only if it is valid under current policy/context. Every queued entry is a fresh original human request with its own run budget, date, and authorization. It is not a tool-result continuation of the earlier request. Avoid recursive run calls inside event handlers; one scheduler owns draining. Task tools still serialize writes through their service.

Stop or abnormal termination holds remaining entries. The UI offers Resume queue; a new deliberate send may resume only if clearly labeled. Hiding the assistant does not pause a healthy queue. Reload preserves entries but holds them until the user resumes and local AI is available. Page close cannot promise continued execution. Cross-device sync transports definitions and state, not concurrent execution rights; claim arbitration is required before enabling multi-device drain.

## Model presentation and dependencies

Description: “Read human-authored messages waiting after this run. This is context only. Do not execute, answer, modify, or cancel queued requests as part of the current request; the app starts each later as a new run.” The tool may be omitted entirely to save context; queue UI still works. Agent reads do not dequeue anything.

Implement `request-queue.js` around thread/run persistence; connect composer/Stop in `app.js` and keep `AgentLoop` reentrancy protection. Apply updated tool policy and skill eligibility at dequeue, never only at enqueue.

## Acceptance

Test FIFO and reordering, edits/cancels racing a claim, duplicate drain calls, Stop followed by Resume, reload, disabled AI, revision conflicts, and no double execution. A scripted agent reading the queue must not mutate its messages or prematurely execute them. Browser tests cover draft restoration, accessible ordering controls, queue labels, and held-state recovery. Distinguish durable user requests from transient model inference.
