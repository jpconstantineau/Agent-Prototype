# Reviewable follow-up suggestions

Status: approved extension; not implemented. Uses [work board](agent-work-board.md), [history](threads-and-history.md), [agent library](agent-library.md), and [observability](observability.md). Suggestions are durable proposals; their creation does not start work.

## Purpose

Preserve an actionable issue discovered during a request without expanding the current assignment. A lightweight inbox separates evidence-backed suggestions from authorized work and prevents useful follow-ups disappearing in a final paragraph.

## User intent

Ask the agent to note something for later, inspect its reason/evidence, edit it, accept it into a work item or new conversation draft, or dismiss it. Decide explicitly whether any work should start.

## Agent intent

Record a concrete follow-up within the configured suggestion policy and withdraw its own still-pending suggestion when the evidence changes. It cannot accept a suggestion, assign a stronger agent, create execution authority, or use suggestions instead of completing the current authorized request.

## Policy and record contract

Add extensions.suggestions `{enabled:boolean,mode:'explicit'|'observed_findings',maxPending:integer 1–50}` default false/explicit/20. Explicit mode requires a current human request to record the follow-up. observed_findings additionally permits at most two evidence-backed suggestions discovered while fulfilling the authorized task; enabling this mode is a human configuration choice. Neither permits searching unrelated material just to generate more work, inferring personal traits, or ignoring an explicit “do not suggest follow-ups.” The two-per-run cap applies in either mode. A child cannot suggest or withdraw in v1.

Store `{version:1,suggestionId,ownerId,revision,agentId,configurationRevision,projectId,threadId,runId,title,reason,instruction,sourceRefs,state,humanEdited,createdAt,updatedAt,acceptedTarget}`. projectId is ID/null; title nonblank 1–120; reason 1–500; instruction 1–2000; sourceRefs 1–5 shared evidence references; state pending/accepted/dismissed/withdrawn; humanEdited is boolean initially false and permanently true after a human edit; acceptedTarget null or `{kind:'board_item'|'conversation_draft',id:ID}`. Require source IDs to have been actually observed in this run or supplied by the human. A suggestion identifies its originating agent/configuration but does not bind a future executor or grants.

The instruction must stand alone with source references and uncertainty, not “do the thing mentioned above.” Never copy an unbounded transcript or credentials. Suggestions containing only vague improvement claims should be rejected by agent guidance and human review; validators guarantee shape/evidence accessibility, not subjective usefulness. Cap pending records per agent/project as configured; return budget_exceeded without evicting another suggestion.

## Agent contracts and presentation

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

## Human inbox and acceptance

Native cards show title, why it matters, exact proposed instruction, source links, originating run/agent, age, and state. Controls are Inspect, Edit, Accept as board item, Prepare conversation, and Dismiss. Nothing is preaccepted. Edit uses `{suggestionId,expectedRevision,body}` replacing title/reason/instruction/sourceRefs only; it does not execute them. Dismiss takes ID/revision and optional note <=300. Neither asks the model to interpret a click.

Accept input is `{suggestionId,expectedRevision,target:'board_item'|'conversation_draft'}`. For a board item, the human reviews/selects its normal assignee/project/resources/grants/review requirement through the existing board Create service. Acceptance creates an unstarted queued item; Start remains explicit under the board contract. For conversation_draft create a durable draft reference with the instruction and sources in a composer, without inference or an accepted user message. Sending is a separate explicit human action. This draft is an application-owned object, not a live model session or a promise that Chrome is ready.

Acceptance atomically binds one suggestion revision to one target creation operation/receipt. Double clicks/retries return the same target; stale or withdrawn suggestions cannot be accepted. Validate source availability and current permissions; if source versions are missing, preserve the proposal and ask the human to revise it rather than substituting today's body. Accepting does not automatically assign prior task grants or treat the originating document as current authorization. A user can edit the future instruction before Start/Send; the target's actual accepted revision becomes its own evidence.

After acceptance, suggestion state remains accepted even if the target is later cancelled; display the real target state separately. A model cannot retract accepted work by withdrawing its old suggestion. General saved Daylist tasks are not created by this feature. If the human wants a Daylist task, the normal explicit task tool/UI path handles that request.

## Persistence, integration, and acceptance checks

Use followup-store.js, followup-tools.js, and an inbox view sharing the existing board/thread draft services. Store immutable revision and acceptance receipts in IndexedDB, plus source references and tombstones. Emit control.changed feature suggestion and actual tool events; pending cards do not block the current run or own the shared interaction slot. Suggested work does not count as current-task progress. Goals, queues, and pipelines cannot auto-accept it.

Keep pending suggestions until user action within configured capacity; offer human archive/delete with explicit retention. Source deletion removes inaccessible previews while showing that evidence is missing; it does not reconstruct deleted text from logs. Future API sync deduplicates append/accept operations, handles concurrent dismiss/accept by revision conflict, and never starts a target on every device. Reload preserves suggestions but starts no work.

Verify explicit versus observed policy, two-per-run/capacity limits, source checks, duplicate IDs, stale/human-edited withdrawal denial, single target creation, revision conflicts, source deletion, safe rendering, and no inference or domain effects on Accept-as-draft. An end-to-end test records an issue during a read, finishes the original request, accepts later, and proves execution occurs only after the separate Start/Send.

Source inspiration: [OpenClaw suggestion tools](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/src/agents/tools/task-suggestion-tools.ts). This design makes browser suggestions durable and explicitly reviewed.
