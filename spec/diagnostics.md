# Harness observability and scoped diagnostic analysis

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Make agent behavior inspectable from the actual prompts, actions, results, and state transitions, then provide a tightly scoped read-only diagnostic assistant over selected evidence. Logging and diagnosis share evidence identity but have different privileges and actors.

## User intent

Inspect and export runs, troubleshoot failures, understand configuration/model behavior, and optionally request a bounded analysis of selected diagnostic records.

## Agent intent

Ordinary agents are observed by the harness and cannot disable core logging or read unrestricted logs. The separately enabled diagnostic worker may inspect only its selected grant and return sourced findings; it cannot repair runtime state or mutate user data.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Harness logging and run inspector](#feature-observability) | Harness records; human inspects | Own the agentEvents/payload stores, instrumentation, retention, and inspector. |
| [Observability agent](#feature-observability-agent) | Human requests; scoped read-only worker | Own runtime-status/diagnostic reads and bounded diagnosis over selected evidence. |

## Integration and delivery

The diagnostic event stream is separate from curated conversation history and domain receipts. It records application-visible prompts/results, never hidden model reasoning or secrets. Domain effects retain atomic receipts even if diagnostic logging fails.

The observability worker consumes a deliberately selected projection from this same stream; it does not get an unrestricted log database or implicit source grants. Keep its fixed catalog, limits, and no-repair boundary explicit in UI and dispatch.

Implement append/correlation and failure handling early, then the human inspector, and only then opt-in diagnosis. Link evidence across configuration, policy, context recovery, workflows, and assignments using the shared IDs rather than duplicating their records in diagnostic headers.

<a id="feature-observability"></a>

## Harness logging and run inspector

Status: approved specification. A harness service and user-facing diagnostic UI, not an agent-controlled tool. Extends [threads/history](conversation-lifecycle.md#feature-threads-and-history) with a separate IndexedDB event store. Uses [agent configurations](agent-configuration.md#feature-agent-library), [large results](context-management.md#feature-large-tool-results), [permissions](capability-policy.md#feature-execution-permissions), and [runtime contracts](runtime-contracts.md).

<a id="feature-observability-purpose"></a>

### Purpose

Retain enough evidence to troubleshoot agent behavior and improve prompts: what the app submitted, what the model returned, what was validated, and what actually executed. Separate diagnostic events from chat history so failures and recovery remain inspectable.

<a id="feature-observability-user-intent"></a>

### User intent

Inspect runs, prompts, tool calls, decisions, timing, and results; compare configurations; and control diagnostic retention, export, and deletion.

<a id="feature-observability-agent-intent"></a>

### Agent intent

The agent does not act through this spec to write, edit, disable, or inspect unrestricted diagnostic logs. The harness records its interactions automatically, and the human uses the inspector; no logging tool is exposed to the model.

<a id="feature-observability-outcome-and-logging-scope"></a>

### Outcome and logging scope

Log every application-visible agent interaction and its outcome so the user can troubleshoot failures and improve instructions/prompts. Cover accepted human messages and structured answers; session preparation; the exact app-authored initial prompts, submitted prompt packets, and response constraints; model responses and validation failures; requested and executed tools; full supported results or body references; approval/form/proposal decisions; subagent lifecycle; discovery/skill loads; compaction/offloading; cancellation, interruption, errors, and final output.

This is more than the chat transcript. The transcript remains a curated conversation view. The event log records what the harness submitted, received, validated, executed, and persisted, with causality and configuration versions. Do not request or fabricate hidden chain-of-thought, model-internal prompts, browser internals, token probabilities, or unavailable metrics. Chrome's retained session state is not an inspectable full internal transcript: reconstruct application-submitted context from recorded initial prompts/exchanges and compaction manifests, and label it accordingly.

Logging is enabled as a core local harness behavior. An agent cannot disable, edit, delete, or search unrestricted diagnostic logs. Humans control retention, export, deletion, and optional future diagnostic sharing. No upload, third-party telemetry, automatic prompt tuning, or automatic test replay is included. Future Azure sync of logs needs a distinct user choice because prompt/result payloads can contain personal documents and conversation data.

<a id="feature-observability-indexeddb-records-and-correlation"></a>

### IndexedDB records and correlation

Add an `agentEvents` object store in the same application IndexedDB database, separate from chat messages/tasks. A separate object store satisfies independent indexing/retention while allowing related domain receipts and events in one transaction. Store large payload bodies in `agentEventPayloads` or the shared immutable body adapter; events reference them. Do not create an unrelated second database that prevents transactional mutation attribution. Upgrade existing stores without deleting tasks or histories.

Each event is a closed versioned record with these required fields:

| Field | Definition |
| --- | --- |
| version / eventId | 1 / ID; application-generated stable append ID |
| ownerId / deviceId | Scoped IDs supplied by the application |
| threadId / runId | ID or null for session preparation before a run; never both absent for run activity |
| streamId / sequence | ID / positive safe integer; streamId equals runId for run activity, otherwise a dedicated preparation ID; unique sequence within that stream |
| occurredAt / recordedAt | Wall-clock Instant; time of occurrence and successful append preparation |
| kind | One of the event kinds below |
| actor | human, main_agent, subagent, scheduler, system |
| agentId / configurationRevision | ID/Revision or null for an unconfigured/system event |
| parentRunId / callId / interactionId | ID or null, populated where applicable |
| policyRevision / catalogRevision | Revision or null if not applicable |
| status | started, pending, succeeded, failed, denied, cancelled, interrupted, or informational |
| durationMs | Finite number >=0 or null; measured with performance.now() on the same page |
| payloadRef | ID or null, referencing an immutable payload |
| details | Small closed kind-specific metadata object, <=2000 serialized characters |

Canonical event kinds: user.accepted, session.prepared, session.disposed, run.started, run.finished, model.requested, model.responded, model.invalid, tool.requested, tool.started, tool.finished, interaction.opened, interaction.decided, capability.changed, skill.loaded, child.changed, context.changed, result.stored, runtime.error, and runtime.interrupted. Unknown versions/kinds are preserved as unsupported records for human export, not executed or blindly rendered as HTML. Define exact metadata validators per kind in event-contract.js; no arbitrary error object or browser object goes into details.

The Hermes extensions add typed kinds model.route_changed, knowledge.changed, workflow.changed, work.changed, ui.changed, and speech.changed with details contracts below. Add projectId:ID|null to event headers, defaulting null when reading older v1 records. runType additionally allows board; interactionType additionally allows skill_review. user.accepted source additionally allows voice_transcript, workflow, and board_start. Existing historical event records remain readable without rewriting them. Knowledge provenance remains domain metadata; diagnostic retention alone cannot resurrect forgotten content.

Key metadata contracts:

- model.requested/responded/invalid: inferenceId:ID, iteration integer 1–12 (child/maintenance limits validated by run type), sessionGeneration integer >=1, maintenance boolean, inputContextUsage/outputContextUsage/contextWindow each nonnegative finite number or null, usageUnit `context_tokens` or `unknown`. Unknown metrics are null, never zero. Raw payload references carry submitted input/options/schema and returned text respectively; invalid records reference the raw response plus bounded validation error.

With the provider extension, these model metadata records also contain provider:`chrome`/`local_http`, profileId:ID|null, modelIdentity:string up to 200 or null, and usageProvenance:`measured`/`estimated`/`unknown`; usageUnit additionally permits provider_tokens. Migrate older rows to chrome/null/unknown as appropriate without inventing an old model identity. Capture exact raw assistant action content and sanitized HTTP metadata, never reasoning_content, native hidden reasoning, auth headers, or whole HTTP/browser objects. Record session.prepared around the selected adapter's prepare operation, not exclusively LanguageModel.create().
- tool.requested/started/finished: toolName 1–80, definitionRevision, operationId:ID, parentCallId:ID|null, approvalId:ID|null, outcome `not_started`/`pending`/`succeeded`/`failed`/`cancelled`/`uncertain`, receiptIds 0–20 IDs. Tool inputs/results live in payloads. A requested call need not have started.
- interaction.opened/decided: interactionType `question`/`form`/`approval`/`task_proposal`/`preference_proposal`/`branch_review`, requestRevision, decision `pending`/`answered`/`allowed`/`denied`/`applied`/`rejected`/`revise`/`cancelled`/`expired`. Link exact request and submitted decision payloads.
- run.started/finished: runType main/subagent/scheduled/maintenance, inputMessageId:ID|null, outcome `pending`/`completed`/`max_iterations`/`awaiting_user`/`needs_attention`/`failed`/`cancelled`/`interrupted`, activeDurationMs and humanWaitDurationMs numbers >=0 or null. Total elapsed time is separately derived, not confused with model execution.

The remaining closed details shapes are below. Every listed field is required; nullable IDs/metrics use explicit null. Text reasons are at most 240 characters. Collections contain at most 20 IDs unless stated otherwise. Configuration/skill bodies remain referenced by immutable version, with actual submitted portions captured in prompt payloads.

| Kind | details fields |
| --- | --- |
| user.accepted | messageId:ID, acceptedAt:Instant, source:`composer`/`question`/`form`, timeZone:string or null |
| session.prepared | preparationStreamId:ID, sessionGeneration:positive integer, configurationSnapshotId:ID, initialPromptPayloadId:ID, supportedModelIdentity:string up to 120 or null |
| session.disposed | sessionGeneration:positive integer, reason:string |
| capability.changed | previousPolicyRevision:Revision or null, nextPolicyRevision:Revision, affectedNames:0–20 strings up to 80, affectedCount:integer >=0 |
| skill.loaded | skillId:ID, skillRevision:Revision, resourceId:ID or null, offset:integer >=0, length:integer >=0 |
| child.changed | taskId:ID, childRunId:ID or null, childThreadId:ID, childConfigurationRevision:Revision, state:`queued`/`running`/`completed`/`failed`/`cancelled`/`needs_input` |
| context.changed | checkpointId:ID or null, stage:`checking`/`prepared`/`active`/`failed`/`overflow`, previousUsage:nonnegative number or null, nextUsage:nonnegative number or null, reason:string |
| result.stored | resultId:ID, sourceCallId:ID, charLength:integer >=0, byteLength:integer >=0 |
| runtime.error | code:string 1–80, message:string 1–500, recoverable:boolean |
| runtime.interrupted | reason:string, lastCommittedSequence:integer >=0, gapKnown:boolean |

Additional closed details shapes for the extensions (IDs/revisions are nullable only where shown):

| Kind | details fields |
| --- | --- |
| model.route_changed | previousProvider:`chrome`/`local_http`/null, nextProvider:`chrome`/`local_http`, profileId:ID|null, reason:string, automatic:boolean |
| knowledge.changed | resourceKind:`memory`/`skill`/`skill_draft`/`curation`, resourceId:ID, revision:Revision, action:`saved`/`updated`/`forgotten`/`drafted`/`published`/`suggested`/`archived`/`restored`/`pinned`, receiptId:ID|null |
| workflow.changed | templateId:ID, templateRevision:Revision, instanceId:ID|null, action:`prepared`/`started`/`scheduled`/`cancelled`, relatedRunId:ID|null |
| work.changed | workId:ID, revision:Revision, attemptId:ID|null, state:`queued`/`running`/`blocked`/`review`/`done`/`cancelled`, receiptId:ID|null |
| ui.changed | guidanceId:ID|null, actionId:LocalID|null, targetId:LocalID|null, action:`opened`/`tip_shown`/`tour_started`/`step_changed`/`dismissed`, stepIndex:integer 0–5 or null |
| speech.changed | recordingId:ID|null, path:`on_device_speech`/`prompt_audio`/`local_synthesis`, state:`started`/`stopped`/`processed`/`submitted`/`cancelled`/`failed`, durationMs:nonnegative number|null, errorCode:string 0–80 |

Human project/configuration edits use the existing versioned domain receipts plus bounded tool/UI audit payloads; no domain mutation must be represented as a fabricated model action. Skill review decisions link their actual review/draft revisions. Recognition interim text and unsubmitted audio are not diagnostic payloads.

The [persona extension](agent-configuration.md#feature-agent-personas) stores personaSnapshot in the immutable configurationSnapshot payload referenced by session.prepared and in compaction manifests. Capture the actual submitted base/overlay in initial prompt payloads and link the exact source revision in the inspector. Persona edits are human configuration receipts, never fabricated model tool calls; existing event headers/details need no new persona fields.

The OpenClaw extensions add event kind control.changed with closed details `{feature,resourceId,resourceRevision,action}`. feature is loop/reminder/goal/steering/processing/memory_review/recall/pipeline/pruning/diagnostics/suggestion; resourceId is ID; resourceRevision is Revision or null for immutable results; action is a registered LocalID <=80 naming the actual domain transition. Store complete validated request/report/checkpoint/decision in immutable payloads, not arbitrary details keys. Use actual human/system/agent attribution and domain receipts; this event does not substitute for a mutation receipt. Auxiliary inference purposes and exact schemas live in referenced configuration snapshots. Existing headers and per-tool/inference events remain the canonical correlation.

The approved [observability agent](diagnostics.md#feature-observability-agent) is a narrow exception permitting selected read-only diagnostic metadata/excerpts. It requires an explicit scoped grant and fixed worker catalog. The unrestricted inspector, log administration, exports/deletion, repairs, and prompt tuning remain human-controlled. Snapshot its source boundary before running it so it cannot recursively inspect its own new events. No other helper or history tool gains diagnostic access by this extension.

The Cline extensions additionally admit control.changed feature values phase/rule/team/completion under the same closed details contract. Store actual phase transitions, rule activation reasons/revisions, team membership/window/message/fragment/outcome identities, and completion claim-support results in immutable source payloads. Snapshot the exact phase/rule/team bindings for each submitted context. Human acceptance is distinct from coordinator consideration or a model's completed label. Reuse actual tool/run/board events; no new top-level event headers, hidden reasoning, executable hooks, external telemetry, or broader diagnostic permissions are introduced.

Payload records require payloadId, owner, mediaType (`application/json`/`text/plain`), charLength, byteLength, content hash, immutable body pointer, completeness (`full`, `redacted`, `omitted`), and reason string 0–240. Reuse supported body storage limits, including 200000 characters/1 MiB per body. Larger submitted packets must be bounded before inference; oversized unexpected responses retain bounded safe text marked omitted with original observed size when known. Never label a prefix full. Chunking transport output is not license to inject it into context. Binary attachment data remains in attachment storage with modality/identity references, not repeated bytes in each log.

```json
{"version":1,"eventId":"event-1","ownerId":"owner-1","deviceId":"device-1","threadId":"thread-1","runId":"run-1","streamId":"run-1","sequence":4,"occurredAt":"2026-10-28T15:00:00.000Z","recordedAt":"2026-10-28T15:00:00.000Z","kind":"tool.finished","actor":"main_agent","agentId":"agent-1","configurationRevision":2,"parentRunId":null,"callId":"call-1","interactionId":null,"policyRevision":3,"catalogRevision":1,"status":"succeeded","durationMs":12,"payloadRef":"payload-1","details":{"toolName":"list_items","definitionRevision":1,"operationId":"operation-1","parentCallId":null,"approvalId":null,"outcome":"succeeded","receiptIds":[]}}
```

Index owner+thread+committed position, owner+streamId+sequence (unique), owner+kind+occurredAt, and owner+call/interaction IDs as needed. Allocate stream sequence and append atomically; eventId makes retries idempotent. Wall timestamps across devices cannot establish causal order. Preserve parent run/call relationships and device identity; future sync needs stable append IDs and server-validated ownership, not last-write-wins replacement of whole logs. Setup events use a dedicated preparation stream with null runId; the run's session.prepared links its preparationStreamId. A new live run on another device gets a new run/stream identity rather than allocating competing sequences in a shared active run.

<a id="feature-observability-instrumentation-and-failure-behavior"></a>

### Instrumentation and failure behavior

Use one append service called by the session manager, interaction brokers, scheduler, and executor. Do not rely only on rendered onAgentEvent callbacks: errors before mounting a card still require records. Record session.prepared with status started and the exact app-authored initial prompt/options before LanguageModel.create(), then a succeeded or failed event linked to that preparation stream. Persist a model.requested event and supported submitted payload before invoking prompt; persist its response before dispatching any emitted tool. Record validation outcomes without changing the original returned text. A model-generated tool request alone is not a tool.started event.

Persist tool.requested before the permission gate, interaction events while waiting, and tool.started immediately before invocation. Domain writes must commit the authoritative mutation receipt and matching completion event atomically in the same IndexedDB transaction where possible. Keep durable call state/receipt as the source of truth if a remote/native transport cannot participate. An uncertain result is marked uncertain and reconciled by operation identity or explicit read; never guessed successful or blindly retried. Record errors/cancellation once and retain already committed outcomes.

No IndexedDB transaction spans a model call, human wait, network request, or OPFS I/O. Stage immutable bodies first and commit metadata/event pointers afterward, following the shared crash-safe body protocol. On logging failure pause the agent before any new inference/tool call, show Logging unavailable, and offer storage management/export. If an operation already committed, show its durable receipt and the logging failure; never roll it back or repeat it merely to complete the trace. Recovery appends a bounded logging-gap/interruption description as runtime.interrupted when storage works again. Do not pretend every event survived a process crash before append.

An orderly Stop records cancellation and session disposal. On reload mark unclosed runs interrupted and reference their last committed sequence; do not invent missing responses or replay requests. Use the same service for child/maintenance runs and nested composition calls with parentCallId links. Human waiting and background suspension are separate from model/tool execution time.

<a id="feature-observability-sensitive-data-retention-and-export"></a>

### Sensitive data, retention, and export

Capture application prompts/results needed for review, including user instructions and tool arguments. Never log credentials, auth/cookie/header values, access tokens, connection secrets, live DOM/session objects, or hidden browser state. Redact known sensitive structured fields before append and mark the payload redacted. Do not claim free-form secret detection is reliable: document that chat/document text can be sensitive and keep logs local by default. Unsubmitted keystrokes and form drafts are not accepted interactions and do not enter the log.

Initial retention: 30 days, 100000 events, or 100 MiB of diagnostic payloads per owner, whichever requires cleanup first. Humans can change these within storage availability, export selected runs, or delete logs. Before storage pressure blocks a run, prune oldest completed unpinned run payloads under the visible policy. Keep a small metadata tombstone stating a payload was pruned; never show a complete reconstructed prompt after deleting its source. Active runs, pending interactions, and operation-recovery receipts are pinned. Domain receipts/history/results have their own retention and must not be deleted simply because diagnostic logs expire.

The Logging settings panel shows usage, retention, what is captured, export/delete controls, and any payload omissions. Deleting chat or documents offers a clearly scoped related-log deletion choice; retained logs may otherwise contain historical copies. Shared body reference accounting must honor explicit owner deletion across domains. No diagnostic payload is an undeletable forever-copy. Minimal non-content operation receipts may remain under separate integrity requirements, which the UI explains.

Exports use versioned JSON/JSONL plus optionally separately referenced payloads, scoped to selected runs. Warn that the export contains actual prompts/results and let the human review/redact it. Export cannot contain executable replay commands, credentials, OPFS handles, or live model objects. Import, if later implemented, is read-only inspection and never automatically executes historical tools. Copying a prior request into the composer is an explicit new human action, with current permissions and actual mutations possible.

<a id="feature-observability-run-inspector-ui-and-prompt-improvement"></a>

### Run inspector UI and prompt improvement

Extend the thread/history UI with an Inspect run action and a separate Runs view. Filter by agent revision, date range, outcome, tool name, and main/child/scheduled/maintenance type. Paginate events; do not load every payload to show the list. Summary cards show actual outcome, durations, counts, errors, measured context usage, approvals, and offloaded-result count. Missing values display Unknown. Do not infer output token counts, provider costs, model identity, or concurrent execution from unavailable APIs.

An expandable chronological timeline shows accepted input -> exact submitted prompt/schema -> raw structured response -> validation -> permission decision -> actual tool execution/result -> continuation/final. Link children, compaction checkpoints, result/document revisions, and configuration/skill sources. Default to plain text/pretty JSON; the safe Markdown viewer is optional for appropriate content. Never execute HTML/code found in a diagnostic payload. Show omitted/redacted/pruned payloads explicitly.

Provide an Application context view assembled from the initial prompt, exact recorded input packets, automatic session-retained model outputs, and rebuild checkpoints for that generation. This is evidence of what the app supplied, not a claim of access to Chrome's internal prompt. Distinguish original full tool results from the smaller observations actually sent to the model. Highlight validation errors, repeated calls, context growth, denied tools, and waits using recorded facts.

For prompt improvement, let the human compare two selected runs/configuration revisions side by side, copy a submitted packet, and export a diagnostic bundle. Creating a revised configuration uses the normal library editor and explicit Save. Do not let historical text rewrite current instructions automatically. A future evaluation/replay harness is a separate decision; this spec provides its evidence but does not run old mutations.

<a id="feature-observability-implementation-and-acceptance"></a>

### Implementation and acceptance

Add event-contract.js, event-store.js, instrumentation hooks, and run-inspector.js. Keep log append/payload persistence separate from rendering and tool result shaping. Same-origin script access is the ordinary browser storage boundary; logs do not create a new secure enclave. Apply current human ownership/access checks before viewing/exporting; agents' bounded history tools do not automatically gain diagnostic payload access. Future authenticated sync revalidates scope server-side.

Test sequence/idempotent append, domain receipt atomicity, raw-versus-model-observation distinction, unsupported metrics, payload redaction/omission, quota cleanup, failed logging, crash interruption, no replay, and child/composition correlation. Browser tests verify native filters, pagination, safe payload rendering, references after reload, selected-run export, and deletion without removing task data. A scripted main -> tool -> form/approval -> child -> compaction flow must provide an inspectable event chain with actual versions and outcomes. Real local-model runs validate timing/context instrumentation separately from scripted transport tests.

Browser storage reference: [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB). The application owns its event schema, lifecycle, and retention; IndexedDB supplies object stores, indexes, and transactions.

---

<a id="feature-observability-agent"></a>

## Observability agent

Status: approved extension; not implemented. Extends [observability](diagnostics.md#feature-observability), [agent configurations](agent-configuration.md#feature-agent-library), [subagent isolation](agent-coordination.md#feature-subagents), and [inference routes](local-model-endpoint.md). Grants bounded diagnostic reads, never unrestricted logging administration.

<a id="feature-observability-agent-purpose"></a>

### Purpose

Explain why a capability failed using current runtime facts and selected recorded evidence. A dedicated diagnostic agent can connect schema, policy, context, provider, and storage failures without guessing or changing the app while investigating.

<a id="feature-observability-agent-user-intent"></a>

### User intent

Ask why a run failed, choose the run/evidence to inspect, review the explanation and supporting events, and follow explicit recovery actions. Keep repair, permission changes, exports, and data deletion under direct user control.

<a id="feature-observability-agent-agent-intent"></a>

### Agent intent

The main agent can read bounded runtime status and, when requested, invoke a focused observability worker. The worker diagnoses granted evidence and suggests next steps; it cannot repair storage, edit prompts/configuration, enable tools, test mutations, replay calls, or inspect unrelated logs.

<a id="feature-observability-agent-read-only-contracts"></a>

### Read-only contracts

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

<a id="feature-observability-agent-scope-preparation-and-worker-configuration"></a>

### Scope preparation and worker configuration

Add extensions.diagnostics `{enabled:boolean,modelRouteId:ID|null}` default false/null. runtime_status tool eligibility remains independent; the dedicated worker additionally requires diagnostics enabled and its fixed read-only policy. A human Diagnose action selects up to three accessible runs from one agent/project and a time boundary, plus optional exact payload excerpts. The current failed run may be preselected visibly. Default evidence is sanitized event metadata, validation paths, error codes, timing, capability decisions, counters, and operation receipts. Prompts/results can contain personal content and are excluded until the user explicitly selects bounded excerpts in the inspector. No full-owner log access is inferred from enabling the feature.

Prepare immutable `{scopeId,revision,runIds,throughPositions,eventIds,payloadSelections,expiresAt}` supplied by the host. At most 100 events, 10 payload excerpts, 12000 source characters total; expiry <=one hour. Payload selections specify immutable payload ID plus offset/length under its retained size, <=2000 characters each. Confirm ownership, retention, redaction, project grants, and selection at every read. The worker cannot expand its own scope. Freeze throughPositions before worker creation so it does not recursively inspect its own diagnostic log stream.

Use an application-supplied Observability agent preset within the existing child-role/template mechanism, intersected with these extra diagnostic grants. Fresh context contains diagnostic instructions, the question, source manifest, and only runtime_status/diagnostic_events definitions. No normal task/document/history/memory tools, skills, writes, external connectors, guidance, grandchildren, or human-question tool. This is a narrow explicit exception to the original absence of agent log reads; unrestricted inspector/admin access stays human-only. The worker may use a configured stronger local route but route choice cannot expand evidence. Maximum six helper inference attempts and five reads, also inside parent helper aggregate/goal limits. Direct human diagnosis has its own six-call attempt, not an unlimited new main run.

<a id="feature-observability-agent-structured-diagnosis-and-model-guidance"></a>

### Structured diagnosis and model guidance

The worker returns closed `{version:1,summary,findings,unknowns}`. summary 1–800; findings 0–5 of `{checkId:LocalID,severity:'info'|'warning'|'error',explanation:1–400,evidenceRefs:1–5,recommendedActionId:LocalID|null}`; unknowns 0–5 strings <=200. Total <=4000 characters. Evidence references must name actual granted status snapshots/events; the shared reference kind result can identify an immutable status snapshot in the diagnostic result namespace. Validate each reference/action against scope/registry. Unverified causes belong in unknowns, not findings phrased as confirmed facts.

```json
{"version":1,"summary":"The document change was denied by the configured tool policy.","findings":[{"checkId":"document_write_policy","severity":"error","explanation":"The tool request was rejected before execution. No successful write receipt was recorded.","evidenceRefs":[{"kind":"event","id":"event-12","revision":null}],"recommendedActionId":"agent_permissions"}],"unknowns":[]}
```

Guidance: “Diagnose only selected evidence and current status. Separate observed facts, possible causes, and unknowns. A requested action is not proof it ran; a missing log is not proof no effect committed. Cite the source event/check. Recommend a registered manual action rather than changing configuration or replaying a failed call.” Domain state may require the human to run an ordinary authorized domain read in the main conversation; the diagnostic agent cannot acquire new tools to settle it.

<a id="feature-observability-agent-ui-lifecycle-and-persistence"></a>

### UI, lifecycle, and persistence

Provide Inspect health (deterministic, no inference) and Ask observability agent (explicit inference) in the run inspector/error card. Show chosen runs/excerpts, scope expiry, actual model, progress/call usage, Cancel, findings with source links, and unknowns. Clicking a recommended action opens registered Settings/help; it does not grant permissions, start repairs, or run tests. A diagnosis is advisory even if it says the next step is obvious. Direct user controls for repair can be designed separately.

Use runtime-health.js for pure collectors and diagnostic-agent.js for scoped orchestration, sharing event-store readers and the inference scheduler. Save scope/diagnosis/source references and real model interactions in IndexedDB; emit control.changed feature diagnostics. Logging remains enabled during diagnosis. If logging/storage failure prevents new persisted inference, display deterministic cached health/error facts and offer export/manual recovery without pretending a diagnostic model ran. Retention/deletion/pruning can make evidence unavailable; show the gap. Reload cancels/holds unfinished diagnosis, with explicit Retry and current scope checks. Future sync of diagnostic payloads remains separately opt-in under observability policy.

<a id="feature-observability-agent-acceptance"></a>

### Acceptance

Verify unknown browser metrics, no permission prompts/repair/model download during status reads, route/CORS ambiguity, scope expiry/cross-project denial, default metadata-only selection, exact payload bounds, redaction, missing/pruned events, evidence/action validation, no self-observation loop, helper budget/Stop/fallback, and no writes from worker output. Diagnose a schema error and a denied tool call with actual selected events, and verify the UI does not equate a suggested fix with a performed repair.

Sources: [OpenClaw health](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/gateway/health.md) and [structured checks](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/cli/doctor/health-contract.md). The focused browser agent is the adapted design above; OpenClaw's CLI/repair machinery is not a dependency.
