# Harness event logging and run inspector

Status: approved specification. A harness service and user-facing diagnostic UI, not an agent-controlled tool. Extends [threads/history](threads-and-history.md) with a separate IndexedDB event store. Uses [agent configurations](agent-library.md), [large results](large-tool-results.md), [permissions](execution-permissions.md), and [runtime contracts](runtime-contracts.md).

## Outcome and logging scope

Log every application-visible agent interaction and its outcome so the user can troubleshoot failures and improve instructions/prompts. Cover accepted human messages and structured answers; session preparation; the exact app-authored initial prompts, submitted prompt packets, and response constraints; model responses and validation failures; requested and executed tools; full supported results or body references; approval/form/proposal decisions; subagent lifecycle; discovery/skill loads; compaction/offloading; cancellation, interruption, errors, and final output.

This is more than the chat transcript. The transcript remains a curated conversation view. The event log records what the harness submitted, received, validated, executed, and persisted, with causality and configuration versions. Do not request or fabricate hidden chain-of-thought, model-internal prompts, browser internals, token probabilities, or unavailable metrics. Chrome's retained session state is not an inspectable full internal transcript: reconstruct application-submitted context from recorded initial prompts/exchanges and compaction manifests, and label it accordingly.

Logging is enabled as a core local harness behavior. An agent cannot disable, edit, delete, or search unrestricted diagnostic logs. Humans control retention, export, deletion, and optional future diagnostic sharing. No upload, third-party telemetry, automatic prompt tuning, or automatic test replay is included. Future Azure sync of logs needs a distinct user choice because prompt/result payloads can contain personal documents and conversation data.

## IndexedDB records and correlation

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

Key metadata contracts:

- model.requested/responded/invalid: inferenceId:ID, iteration integer 1–12 (child/maintenance limits validated by run type), sessionGeneration integer >=1, maintenance boolean, inputContextUsage/outputContextUsage/contextWindow each nonnegative finite number or null, usageUnit `context_tokens` or `unknown`. Unknown metrics are null, never zero. Raw payload references carry submitted input/options/schema and returned text respectively; invalid records reference the raw response plus bounded validation error.
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

Payload records require payloadId, owner, mediaType (`application/json`/`text/plain`), charLength, byteLength, content hash, immutable body pointer, completeness (`full`, `redacted`, `omitted`), and reason string 0–240. Reuse supported body storage limits, including 200000 characters/1 MiB per body. Larger submitted packets must be bounded before inference; oversized unexpected responses retain bounded safe text marked omitted with original observed size when known. Never label a prefix full. Chunking transport output is not license to inject it into context. Binary attachment data remains in attachment storage with modality/identity references, not repeated bytes in each log.

```json
{"version":1,"eventId":"event-1","ownerId":"owner-1","deviceId":"device-1","threadId":"thread-1","runId":"run-1","streamId":"run-1","sequence":4,"occurredAt":"2026-10-28T15:00:00.000Z","recordedAt":"2026-10-28T15:00:00.000Z","kind":"tool.finished","actor":"main_agent","agentId":"agent-1","configurationRevision":2,"parentRunId":null,"callId":"call-1","interactionId":null,"policyRevision":3,"catalogRevision":1,"status":"succeeded","durationMs":12,"payloadRef":"payload-1","details":{"toolName":"list_items","definitionRevision":1,"operationId":"operation-1","parentCallId":null,"approvalId":null,"outcome":"succeeded","receiptIds":[]}}
```

Index owner+thread+committed position, owner+streamId+sequence (unique), owner+kind+occurredAt, and owner+call/interaction IDs as needed. Allocate stream sequence and append atomically; eventId makes retries idempotent. Wall timestamps across devices cannot establish causal order. Preserve parent run/call relationships and device identity; future sync needs stable append IDs and server-validated ownership, not last-write-wins replacement of whole logs. Setup events use a dedicated preparation stream with null runId; the run's session.prepared links its preparationStreamId. A new live run on another device gets a new run/stream identity rather than allocating competing sequences in a shared active run.

## Instrumentation and failure behavior

Use one append service called by the session manager, interaction brokers, scheduler, and executor. Do not rely only on rendered onAgentEvent callbacks: errors before mounting a card still require records. Record session.prepared with status started and the exact app-authored initial prompt/options before LanguageModel.create(), then a succeeded or failed event linked to that preparation stream. Persist a model.requested event and supported submitted payload before invoking prompt; persist its response before dispatching any emitted tool. Record validation outcomes without changing the original returned text. A model-generated tool request alone is not a tool.started event.

Persist tool.requested before the permission gate, interaction events while waiting, and tool.started immediately before invocation. Domain writes must commit the authoritative mutation receipt and matching completion event atomically in the same IndexedDB transaction where possible. Keep durable call state/receipt as the source of truth if a remote/native transport cannot participate. An uncertain result is marked uncertain and reconciled by operation identity or explicit read; never guessed successful or blindly retried. Record errors/cancellation once and retain already committed outcomes.

No IndexedDB transaction spans a model call, human wait, network request, or OPFS I/O. Stage immutable bodies first and commit metadata/event pointers afterward, following the shared crash-safe body protocol. On logging failure pause the agent before any new inference/tool call, show Logging unavailable, and offer storage management/export. If an operation already committed, show its durable receipt and the logging failure; never roll it back or repeat it merely to complete the trace. Recovery appends a bounded logging-gap/interruption description as runtime.interrupted when storage works again. Do not pretend every event survived a process crash before append.

An orderly Stop records cancellation and session disposal. On reload mark unclosed runs interrupted and reference their last committed sequence; do not invent missing responses or replay requests. Use the same service for child/maintenance runs and nested composition calls with parentCallId links. Human waiting and background suspension are separate from model/tool execution time.

## Sensitive data, retention, and export

Capture application prompts/results needed for review, including user instructions and tool arguments. Never log credentials, auth/cookie/header values, access tokens, connection secrets, live DOM/session objects, or hidden browser state. Redact known sensitive structured fields before append and mark the payload redacted. Do not claim free-form secret detection is reliable: document that chat/document text can be sensitive and keep logs local by default. Unsubmitted keystrokes and form drafts are not accepted interactions and do not enter the log.

Initial retention: 30 days, 100000 events, or 100 MiB of diagnostic payloads per owner, whichever requires cleanup first. Humans can change these within storage availability, export selected runs, or delete logs. Before storage pressure blocks a run, prune oldest completed unpinned run payloads under the visible policy. Keep a small metadata tombstone stating a payload was pruned; never show a complete reconstructed prompt after deleting its source. Active runs, pending interactions, and operation-recovery receipts are pinned. Domain receipts/history/results have their own retention and must not be deleted simply because diagnostic logs expire.

The Logging settings panel shows usage, retention, what is captured, export/delete controls, and any payload omissions. Deleting chat or documents offers a clearly scoped related-log deletion choice; retained logs may otherwise contain historical copies. Shared body reference accounting must honor explicit owner deletion across domains. No diagnostic payload is an undeletable forever-copy. Minimal non-content operation receipts may remain under separate integrity requirements, which the UI explains.

Exports use versioned JSON/JSONL plus optionally separately referenced payloads, scoped to selected runs. Warn that the export contains actual prompts/results and let the human review/redact it. Export cannot contain executable replay commands, credentials, OPFS handles, or live model objects. Import, if later implemented, is read-only inspection and never automatically executes historical tools. Copying a prior request into the composer is an explicit new human action, with current permissions and actual mutations possible.

## Run inspector UI and prompt improvement

Extend the thread/history UI with an Inspect run action and a separate Runs view. Filter by agent revision, date range, outcome, tool name, and main/child/scheduled/maintenance type. Paginate events; do not load every payload to show the list. Summary cards show actual outcome, durations, counts, errors, measured context usage, approvals, and offloaded-result count. Missing values display Unknown. Do not infer output token counts, provider costs, model identity, or concurrent execution from unavailable APIs.

An expandable chronological timeline shows accepted input -> exact submitted prompt/schema -> raw structured response -> validation -> permission decision -> actual tool execution/result -> continuation/final. Link children, compaction checkpoints, result/document revisions, and configuration/skill sources. Default to plain text/pretty JSON; the safe Markdown viewer is optional for appropriate content. Never execute HTML/code found in a diagnostic payload. Show omitted/redacted/pruned payloads explicitly.

Provide an Application context view assembled from the initial prompt, exact recorded input packets, automatic session-retained model outputs, and rebuild checkpoints for that generation. This is evidence of what the app supplied, not a claim of access to Chrome's internal prompt. Distinguish original full tool results from the smaller observations actually sent to the model. Highlight validation errors, repeated calls, context growth, denied tools, and waits using recorded facts.

For prompt improvement, let the human compare two selected runs/configuration revisions side by side, copy a submitted packet, and export a diagnostic bundle. Creating a revised configuration uses the normal library editor and explicit Save. Do not let historical text rewrite current instructions automatically. A future evaluation/replay harness is a separate decision; this spec provides its evidence but does not run old mutations.

## Implementation and acceptance

Add event-contract.js, event-store.js, instrumentation hooks, and run-inspector.js. Keep log append/payload persistence separate from rendering and tool result shaping. Same-origin script access is the ordinary browser storage boundary; logs do not create a new secure enclave. Apply current human ownership/access checks before viewing/exporting; agents' bounded history tools do not automatically gain diagnostic payload access. Future authenticated sync revalidates scope server-side.

Test sequence/idempotent append, domain receipt atomicity, raw-versus-model-observation distinction, unsupported metrics, payload redaction/omission, quota cleanup, failed logging, crash interruption, no replay, and child/composition correlation. Browser tests verify native filters, pagination, safe payload rendering, references after reload, selected-run export, and deletion without removing task data. A scripted main -> tool -> form/approval -> child -> compaction flow must provide an inspectable event chain with actual versions and outcomes. Real local-model runs validate timing/context instrumentation separately from scripted transport tests.

Browser storage reference: [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB). The application owns its event schema, lifecycle, and retention; IndexedDB supplies object stores, indexes, and transactions.
