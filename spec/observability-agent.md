# Read-only observability agent and runtime health tools

Status: approved extension; not implemented. Extends [observability](observability.md), [agent configurations](agent-library.md), [subagent isolation](subagents.md), and [inference routes](local-model-endpoint.md). Grants bounded diagnostic reads, never unrestricted logging administration.

## Purpose

Explain why a capability failed using current runtime facts and selected recorded evidence. A dedicated diagnostic agent can connect schema, policy, context, provider, and storage failures without guessing or changing the app while investigating.

## User intent

Ask why a run failed, choose the run/evidence to inspect, review the explanation and supporting events, and follow explicit recovery actions. Keep repair, permission changes, exports, and data deletion under direct user control.

## Agent intent

The main agent can read bounded runtime status and, when requested, invoke a focused observability worker. The worker diagnoses granted evidence and suggests next steps; it cannot repair storage, edit prompts/configuration, enable tools, test mutations, replay calls, or inspect unrelated logs.

## Read-only contracts

All agent inputs are closed, version 1. Status queries supply no owner/thread selectors; controller scope applies. runtime_status requires categories:1–6 unique model/context/tools/storage/queue/interactions. Success returns `{success:true,version:1,snapshotId,observedAt,checks}` with at most 12 checks. A check is `{checkId:LocalID,category,status,summary,observedAt,details,actionId}`. status ready/warning/blocked/unknown; summary 1–240; actionId a registered app navigation ID or null, never a command/URL. details is the category-specific closed shape:

| Category | details |
| --- | --- |
| model | provider chrome/local_http/null, modelIdentity string <=200/null, availability ready/downloadable/downloading/unavailable/unknown, lastErrorCode string <=80/null |
| context | usage/window nonnegative number/null, provenance measured/estimated/unknown, requiredContentFits boolean/null |
| tools | eligibleCount/admittedCount nonnegative integers, policyRevision, blockedNames 0–10 names granted to caller |
| storage | databaseState ready/blocked/unavailable/unknown, usageBytes/quotaBytes nonnegative number/null, persistenceGranted boolean/null |
| queue | pendingCount integer >=0, held boolean, activeRunId ID/null |
| interactions | pendingType question/form/approval/review/null, interactionId ID/null, state waiting/settling/idle |

Status collection is side-effect free except ordinary diagnostic logging. Read cached/provider availability and existing browser state; no model download/session creation, file picker, permission prompt, endpoint test generation, database repair, or storage.persist() request. navigator.storage.estimate()/persisted() may be used when supported, with missing/failed metrics reported unknown. Existing connection failures often do not distinguish CORS, CSP, local-network permission, TLS, or reachability; list possibilities instead of asserting a cause absent evidence. Unknown quota is not zero available storage.

diagnose_runtime input `{version:1,question}` with question nonblank 1–600. The controller requires an explicit human diagnosis request and a diagnostic scope prepared from the selected run/current runtime. Success returns `{success:true,version:1,diagnosisId,status:'queued'}`; await completion through the existing child lifecycle/card, not repeated status inference. The diagnostic worker alone receives diagnostic_events `{version:1,cursor?,limit?:1–10}` returning selected event metadata and approved payload excerpts under a 6000-character page cap, with nextCursor/coverage. No agent-supplied arbitrary run ID, payload ID, owner search, or raw database query.

## Scope preparation and worker configuration

Add extensions.diagnostics `{enabled:boolean,modelRouteId:ID|null}` default false/null. runtime_status tool eligibility remains independent; the dedicated worker additionally requires diagnostics enabled and its fixed read-only policy. A human Diagnose action selects up to three accessible runs from one agent/project and a time boundary, plus optional exact payload excerpts. The current failed run may be preselected visibly. Default evidence is sanitized event metadata, validation paths, error codes, timing, capability decisions, counters, and operation receipts. Prompts/results can contain personal content and are excluded until the user explicitly selects bounded excerpts in the inspector. No full-owner log access is inferred from enabling the feature.

Prepare immutable `{scopeId,revision,runIds,throughPositions,eventIds,payloadSelections,expiresAt}` supplied by the host. At most 100 events, 10 payload excerpts, 12000 source characters total; expiry <=one hour. Payload selections specify immutable payload ID plus offset/length under its retained size, <=2000 characters each. Confirm ownership, retention, redaction, project grants, and selection at every read. The worker cannot expand its own scope. Freeze throughPositions before worker creation so it does not recursively inspect its own diagnostic log stream.

Use an application-supplied Observability agent preset within the existing child-role/template mechanism, intersected with these extra diagnostic grants. Fresh context contains diagnostic instructions, the question, source manifest, and only runtime_status/diagnostic_events definitions. No normal task/document/history/memory tools, skills, writes, external connectors, guidance, grandchildren, or human-question tool. This is a narrow explicit exception to the original absence of agent log reads; unrestricted inspector/admin access stays human-only. The worker may use a configured stronger local route but route choice cannot expand evidence. Maximum six helper inference attempts and five reads, also inside parent helper aggregate/goal limits. Direct human diagnosis has its own six-call attempt, not an unlimited new main run.

## Structured diagnosis and model guidance

The worker returns closed `{version:1,summary,findings,unknowns}`. summary 1–800; findings 0–5 of `{checkId:LocalID,severity:'info'|'warning'|'error',explanation:1–400,evidenceRefs:1–5,recommendedActionId:LocalID|null}`; unknowns 0–5 strings <=200. Total <=4000 characters. Evidence references must name actual granted status snapshots/events; the shared reference kind result can identify an immutable status snapshot in the diagnostic result namespace. Validate each reference/action against scope/registry. Unverified causes belong in unknowns, not findings phrased as confirmed facts.

```json
{"version":1,"summary":"The document change was denied by the configured tool policy.","findings":[{"checkId":"document_write_policy","severity":"error","explanation":"The tool request was rejected before execution. No successful write receipt was recorded.","evidenceRefs":[{"kind":"event","id":"event-12","revision":null}],"recommendedActionId":"agent_permissions"}],"unknowns":[]}
```

Guidance: “Diagnose only selected evidence and current status. Separate observed facts, possible causes, and unknowns. A requested action is not proof it ran; a missing log is not proof no effect committed. Cite the source event/check. Recommend a registered manual action rather than changing configuration or replaying a failed call.” Domain state may require the human to run an ordinary authorized domain read in the main conversation; the diagnostic agent cannot acquire new tools to settle it.

## UI, lifecycle, and persistence

Provide Inspect health (deterministic, no inference) and Ask observability agent (explicit inference) in the run inspector/error card. Show chosen runs/excerpts, scope expiry, actual model, progress/call usage, Cancel, findings with source links, and unknowns. Clicking a recommended action opens registered Settings/help; it does not grant permissions, start repairs, or run tests. A diagnosis is advisory even if it says the next step is obvious. Direct user controls for repair can be designed separately.

Use runtime-health.js for pure collectors and diagnostic-agent.js for scoped orchestration, sharing event-store readers and the inference scheduler. Save scope/diagnosis/source references and real model interactions in IndexedDB; emit control.changed feature diagnostics. Logging remains enabled during diagnosis. If logging/storage failure prevents new persisted inference, display deterministic cached health/error facts and offer export/manual recovery without pretending a diagnostic model ran. Retention/deletion/pruning can make evidence unavailable; show the gap. Reload cancels/holds unfinished diagnosis, with explicit Retry and current scope checks. Future sync of diagnostic payloads remains separately opt-in under observability policy.

## Acceptance

Verify unknown browser metrics, no permission prompts/repair/model download during status reads, route/CORS ambiguity, scope expiry/cross-project denial, default metadata-only selection, exact payload bounds, redaction, missing/pruned events, evidence/action validation, no self-observation loop, helper budget/Stop/fallback, and no writes from worker output. Diagnose a schema error and a denied tool call with actual selected events, and verify the UI does not equate a suggested fix with a performed repair.

Sources: [OpenClaw health](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/gateway/health.md) and [structured checks](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/cli/doctor/health-contract.md). The focused browser agent is the adapted design above; OpenClaw's CLI/repair machinery is not a dependency.
