# Structured run completion reports and evidence

Status: approved extension; not implemented. Uses [runtime contracts](runtime-contracts.md), [operation receipts](checkpoints-and-undo.md), [goals](conversation-goals.md), [work board](agent-work-board.md), [team outcomes](agent-team-coordination.md), and [observability](observability.md). Applies to ordinary agent runs as well as work linked to those domains.

## Purpose

Distinguish a finished reply from a fulfilled action request, and preserve what completed, what remains, and which evidence supports the claims. A structured report gives users and maintainers a consistent result without trusting a model's bare verified flag.

## User intent

See a concise completed/partial/blocked outcome with deliverables and links to actual changes or supporting evidence. Understand outstanding work and decide whether to continue, clarify, or review a separate domain result.

## Agent intent

Submit an accurate outcome with bounded claims, evidence, deliverables, and remaining work. The agent cannot fabricate successful receipts, declare a pending review approved, or mark a goal/board/team complete merely by ending a run.

## Scope and settings

Add extensions.completionReports `{enabled:boolean,mode:'optional'|'required_for_action_runs'}` default false/optional on migration. Simple informational answers keep the existing `{type:'final',message}` path. Enabled optional mode admits the report tool when eligible. Required mode requires a valid report for a run that attempted an authorized domain action; actual committed writes/failures are identified by the controller, not a model classification. It does not require unnecessary tests, a new review prompt, or a long report for every answer.

Registry metadata marks the terminal report tool as local maintenance with effect read: it records outcome bookkeeping only, grants no domain action, and does not require approval merely to display a result. It remains configurable through the ordinary eligibility policy. Settings validates enabled/required mode requires report_run_completion eligibility and a working Include/Discover path before running action tasks. A disabled tool cannot be smuggled into the final schema as a hidden action.

## Closed model input and response

report_run_completion takes `{version:1,outcome,summary,claims,deliverables,remaining}`. outcome is completed/partial/blocked; summary plain text 1–2000; claims 0–8; deliverables 0–5 using the existing board contract `{kind:'document'|'result'|'attachment',id,revision,bodyId}`; remaining 0–8 nonblank strings <=240. Total input must serialize to <=6000 characters. All object fields are required, unknown properties fail, and IDs/ownership/run scope come from the controller.

A claim is closed `{kind:'observation'|'change'|'analysis',text:1–240,evidenceRefs}`. evidenceRefs is 0–3 exact shared references. Observation requires at least one permitted source actually read or explicitly supplied in this run; change requires at least one successful committed operation receipt from this run or the controller's explicitly linked prior goal/pipeline/assignment receipts. For kind operation, id is the returned operationReceiptId resolved by the receipt service, not an invented or merely requested call ID. A submitted call, progress-plan status, diagnostic assertion, or old unverified transcript cannot prove a write. Analysis may have zero references for an ordinary explanation or inference; the UI labels it agent analysis, not receipt-backed verification. Source validity does not mechanically prove the meaning of a paraphrase.

completed requires remaining:[] and no known unsettled required work; partial/blocked require at least one remaining item. A run can complete a requested draft while that draft is still subject to a later separate human decision, but its claim must be that the draft was produced, not that its proposed effects were applied. Required criteria and current explicit human intent determine which lifecycle gates belong to this request. Unknown requirements cannot be certified by an arbitrary boolean.

```json
{"type":"tool_call","name":"report_run_completion","arguments":{"version":1,"outcome":"partial","summary":"The review draft is saved; the conflicting retention period still needs your decision.","claims":[{"kind":"change","text":"Saved the draft as document revision 2.","evidenceRefs":[{"kind":"operation","id":"operation-save-2","revision":null}]}],"deliverables":[{"kind":"document","id":"doc-review","revision":2,"bodyId":null}],"remaining":["Choose which retention period the final policy should use."]}}
```

On success return `{success:true,version:1,reportId,revision:1,outcome,status:'recorded'}`. Store the validated input plus controller evidence-validation results, source binding, usage totals, and createdAt in an immutable report. Each claim gets an application-owned support label receipt_backed/source_linked/agent_analysis; no model-supplied support/confidence/verification flag is accepted. Retrying the same call/operation returns the original report, not another terminal event.

## Validation and terminal lifecycle

Validate structure, source ownership/current grants/retention/exact revisions, actual observed ranges, deliverable existence, operation success, and scope. For change claims verify the receipt's actual affected IDs/revisions support the linked deliverables; if a document advanced later, say revision 2 was saved rather than claiming it is still the latest head. An operation result with uncertain status blocks a verified change claim until normal domain reconciliation resolves it. Never run the mutation again as a completion check.

Check no unresolved active tool/child/helper, accepted-but-undelivered required human answer, pending exact approval, or required uncommitted domain action is being labeled completed. Missing domain evidence returns conflict or invalid_arguments with a bounded explanation. The model can correct the report only within remaining calls; a rejected report does not record completion. The harness cannot prove that all free-form human requirements were semantically satisfied, so show the criteria/evidence and distinguish verified operation facts from the agent's overall outcome judgment.

The tool is terminal through trusted registry metadata, like a typed return, not a request for another model generation. Persist the report/result and run terminal receipt, render the deterministic result card and summary, then end the run. Map completed to completed; partial/blocked to needs_attention, holding automatic queue/goal continuation. A valid report emitted on the last permitted inference is allowed because no model continuation is required. Cancellation and terminal errors retain their real lifecycle outcomes instead of a fabricated completion report; an app-generated interruption card can link actual settled effects separately.

Required-mode final-only output after an action attempt is stored as an unstructured assistant reply but does not certify completion. If calls remain, permit one explicit bounded correction asking for the report. At the limit show a deterministic “Completion report unavailable” notice with real operation receipts and outcome needs_attention. No hidden extra inference, provider switch, auto-created goal, or replay is allowed to tidy the report. Optional mode does not downgrade an ordinary compatible final reply merely because it lacks this extension.

## Model guidance and domain integration

Description: “Report what actually completed and what remains. Support change claims with successful operation receipts and observations with read sources. Use partial/blocked when required work is unfinished. Analysis is an interpretation, not verified execution. This tool ends the run and sends the shown summary; do not call it before required children, actions, or approvals settle.” Include the schema and description through the same definitions/responseSchema/dispatch validator path as all local tools. The parent action union remains tool_call/final; no native model-tool or new response role is required.

goal_report, work_report, pipeline terminal receipts, and human team outcome acceptance remain their own authoritative contracts. A completion report may reference them through immutable operation/result evidence but cannot replace or silently invoke them. Reuse the same evidence/receipt validators to avoid two definitions of “committed.” Board tools that already terminate an attempt render their own deterministic outcome; do not require another inference for this report after a terminal work_report. They can create an app-owned equivalent view from their actual receipts, clearly attributed to the controller rather than a fabricated model call.

In Plan, a report can complete an analysis/planning request with source-linked observations/analysis. It cannot claim that planning changed domain records. Rebuild/compaction/fallback retain exact operation/remaining-work facts and counters. A model switch cannot create missing verification evidence. Team fragments may use reports as source-linked analysis, but the coordinator/human team review still governs the combined outcome. Generic children keep their concise result contract and do not gain domain completion/report tools through this feature.

## UI, persistence, and acceptance

The completion card shows outcome text/icon, summary, claims with support labels, exact deliverable links, evidence links, and remaining work. Keep a compact collapsed default with native Expand evidence controls. Do not put a universal “Verified” badge on all claims; a saved receipt proves a write, not content quality or user satisfaction. Continue/Clarify prefills a deliberate next request; it does not automatically repeat unfinished or uncertain calls. Mandatory review controls stay on their actual domain cards.

Use completion-report.js for validation/terminal handling, a small report view, and immutable IndexedDB records linked to thread/run/operation history. Emit control.changed feature completion plus the real tool/run events, including correction failures and actual counters. Reports are not a separate source of private persistent memory. Normal deletion/privacy/retention can remove payloads; display missing evidence honestly and never rehydrate forgotten content from a report. Future sync preserves immutable identity/ownership and deduplicates receipts without granting another device permission to continue.

Verify completed/partial/blocked field consistency, stale or absent evidence, requested-versus-committed effects, changed deliverable heads, remaining children/approvals, exact receipt linkage, no duplicate terminal events, last-call handling, required versus optional modes, lightweight informational replies, Plan claims, cancelled/error outcomes, fallback/compaction, safe rendering, and no automatic domain state transition from an outcome label. Real-model evaluation should measure honest reporting separately from deterministic source checks.

Sources: [Cline submit schema](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/sdk/packages/core/src/extensions/tools/schemas.ts) and [terminal tool implementation](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/sdk/packages/core/src/extensions/tools/definitions.ts). Cline's summary/verified mechanism inspires the feature; the browser contract above uses scoped evidence and actual receipts instead of trusting a boolean.
