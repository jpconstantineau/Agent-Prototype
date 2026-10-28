# Tool-loop detection and bounded recovery

Status: approved design; not implemented. Uses [runtime contracts](runtime-contracts.md), [agent settings](agent-library.md), [observability](observability.md), and [compaction](context-compaction.md). Vanilla JavaScript harness feature; no model-callable loop-policy tool.

## Purpose

Stop repeated failures and ineffective tool sequences before they waste a small model's call allowance or repeat unwanted effects. Preserve the actual outcomes so recovery never mistakes a loop warning for a successful operation.

## User intent

Understand why progress stopped, inspect the repeated calls, adjust optional detection sensitivity, and explicitly continue after correcting the cause.

## Agent intent

The agent does not configure or invoke the detector. It receives bounded recovery guidance and should change approach, ask for missing information, or explain a blocker within its remaining budget.

## Detection contract

Maintain a controller-owned rolling history of at most 12 settled calls per main run, six per child. Record requested tool name, canonical argument identity, stable outcome identity, success/error class, source call ID, and committed operation receipt IDs. Also record validation/unknown-tool rejections even though execution never started. Invalid action JSON has a separate identical-invalid-response streak. Compaction, fallback, and warning injection do not reset these records. A new human run begins fresh detection; a goal additionally retains a bounded last-run failure signature to prevent automatic continuation of the same stopped loop.

Canonicalize finite JSON by recursively sorting object keys, preserving array order and exact string/number values. Do not stringify arbitrary objects/getters. For result comparison use an application-reviewed per-tool projection: domain success/status, affected IDs and revisions, coverage/cursor, exact data or stable body-content identity, error code/message. Exclude only declared incidental fields such as duration, generated call/receipt IDs, and wrapper timestamps. Never ignore an actual data revision, a different page cursor, or a changed error cause. A fresh resultId alone does not mean a stored result's content changed. Detector identities remain private; model-visible results/receipts remain exact.

| Detector | Rule | Effect |
| --- | --- | --- |
| Identical errors | Same tool, arguments, and stable failure on three consecutive settled attempts | Always stop after the third failure; no extra model call |
| Invalid response | Three consecutive identical invalid model outputs/validation errors | Stop; none of the invalid responses executes |
| Repeated no progress | Same call/outcome, including successful reads, reaches warnAfter/stopAfter in the rolling window | Optional warning then stop |
| Alternating no progress | Repeated A/B call/outcome pairs, each unchanged, reach the same pair-count thresholds | Optional warning then stop |

Successful calls or changed arguments/error outcomes reset the consecutive identical-error streak. Changed arguments do not reset a previously established rolling A/B pattern unless the projected outcome changes. Syntactic detection does not promise semantic equivalence of arbitrary requests. Reads of current time and legitimate explicit refreshes use a producer-defined changing outcome; do not invent a new time just to reset a counter.

Add runtime.loopDetection `{enabled:boolean,warnAfter:integer,stopAfter:integer}`. Optional detectors default false/2/3 for migrated configurations; new profiles may offer an explicit small-model preset true/2/3. Require 2 <= warnAfter < stopAfter <= 6. The identical-error and invalid-response guards remain active regardless of enabled. Settings shows this distinction and current effective limits. Thresholds fit the existing 12-call main and six-call child ceilings; detection never extends either.

## Result and UI mapping

After a warning, persist the original tool result, then supply the usual observation plus an application-authored recovery field `{version:1,detector,count,action:'change_approach',message}`. detector is identical_errors/invalid_response/repeated_no_progress/alternating_no_progress; count is integer 1–12; message is 1–240 characters. This is an explicit optional extension to the host observation envelope, not part of the domain result. Raw results remain separately inspectable. At terminal detection there is no promised continuation observation: finish deterministically with run outcome needs_attention and an incident reference.

The immutable incident is `{version:1,incidentId,runId,detector,count,callIds,inferenceIds,createdAt,message}` using shared scalars, callIds 0–12, inferenceIds 0–3, message 1–240. For invalid output, callIds is empty and inferenceIds identifies the 1–3 attempts; other incidents use inferenceIds:[] and nonempty callIds. Unknown properties fail validation. Show a Loop detected card with reason, count, linked calls, original error, and Review/Continue controls. Continue starts a deliberate new run using current state and receipts; it does not replay the recorded calls. Stop remains available throughout. No model inference is spent tidying the card.

Model guidance: “Repeated unchanged results do not advance the request. Use different evidence or arguments only when justified, ask for missing input, or report the blocker. Do not repeat a successful mutation or treat a new receipt ID as progress.” Include this in application rules when the detector is active, independent of tool discovery.

## Polling, effects, and lifecycle

Existing task_status(wait:true) waits on a real milestone through the scheduler; time spent awaiting is not another call or loop hit. Repeated status reads with the same completed/unchanged state do count. Human answers, active approvals, and a genuinely waiting external operation do not accumulate elapsed-time hits. Only settled attempted calls count; polling timers outside inference do not fabricate calls.

For mutations, normal idempotency/authorization prevents duplication at dispatch. Loop detection after an effect cannot undo it and is not a replacement for those guards. Preserve committed receipts if detection stops the run. A stopped child returns a bounded failed/needs-input result to its parent and cannot consume a new assignment automatically. Goal continuations, pipelines, and scheduled attempts hold for review on terminal detection; they cannot reset counters by starting a replacement worker. Compaction/fallback must carry detection state in the authoritative manifest. Cancellation and logging failures stop normally rather than being reclassified as loops.

## Persistence and verification

Implement loop-detector.js with pure identity/count reducers plus executor/session-manager hooks. Store incidents and bounded state in IndexedDB with run attribution; emit control.changed feature loop through the shared diagnostic extension. Persist the incident before showing a claimed successful stop. Reload leaves unfinished work interrupted; it never restarts a detector-blocked job. Sync incident evidence as history, not as permission to execute on another device.

Verify reordered argument keys, array order, unchanged output with fresh wrapper IDs, actual data/cursor changes, three identical errors, alternating reads, unknown tools, invalid JSON, child limits, fallback/compaction preservation, warning text excluded from comparison, and Stop races. Test that partial mutation success remains visible and that warnings/Continue do not add hidden inference allowances.

Source inspiration: [OpenClaw tool-loop detection](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/loop-detection.md). Thresholds and browser lifecycle above are the complete adapted design.
