# Shared browser agent runtime contracts

Status: shared baseline implemented in the app on 2026-10-28. Requirements referencing optional epic features remain integration contracts for their future implementations, not a claim that those features exist. See [implementation scope](../docs/README.md#foundation-implementation). MUST is normative; SHOULD is the recommended default.

## Purpose

Define shared protocol, identity, policy, lifecycle, persistence, and context rules before individual features are implemented. Common contracts prevent separately built tools from disagreeing about authority, cancellation, receipts, or recovery.

## User intent

The user does not act through a standalone control in this infrastructure spec. They rely on consistent behavior across features, while the maintainer uses these requirements to implement and integrate them.

## Agent intent

The agent does not invoke this spec as a tool. Its structured actions and interactions across feature tools must follow the shared envelopes, permissions, and budgets enforced by the harness.

## 1. Integration with the actual application

At the inspected baseline, `docs/src/agent.js` derives tool branches from `definitions()`, parses one complete JSON response per model call, and invokes `execute(name, arguments, { signal })`. It retains a maximum of 12 inference calls per run. `app.js` owns one model session, composer state, event rendering, and Stop. `tools.js` owns five task tools and the WebMCP adapter. `store.js` persists tasks in IndexedDB. Chat/history currently disappear on reload.

Preserve that architecture while introducing small ES modules for the selected capability. Proposed modules are implementation destinations, not files already present. Tool descriptions and their input schemas must have one source reused by the model prompt, constrained response schema, and execution validator. UI-only operations must never be falsely advertised as model tools. [Discovery](capability-policy.md#feature-tool-discovery) distinguishes eligible definitions from the smaller admitted catalog actually supplied to each model step; do not always serialize the entire eligible registry.

Compose a chat executor around `connection.executor || registry`, as defined in [the question spec](request-user-input.md). New chat-runtime tools execute locally. They do not get registered through the existing WebMCP task registry by default. Gate the existing five WebMCP registrations and all local dispatch through the same effective user policy; do not expose disabled task tools through another transport. Manual user task controls are separate from agent permissions.

The approved [local-model adapter](local-model-endpoint.md) generalizes inference while retaining this executor. Direct LanguageModel/session.prompt examples elsewhere describe the Chrome adapter; endpoint inference uses its separate tested HTTP contract. Only the browser executes tool actions. New [in-app guidance](interactive-experiences.md#feature-in-app-guidance) actions may be explicitly exposed through WebMCP as a reviewed exception to the local-only default, with the same policy/foreground checks.

[Agent personas](agent-configuration.md#feature-agent-personas) are human-managed communication configuration, not model tools. Resolve and pin their exact revisions in controller-owned context/configuration snapshots. Rebuild, compaction, and provider fallback retain those sources and count their guidance in the active context budget; style cannot change policy or tool receipts.

Extend systemPrompt/tool-guidance intent routing before adding these features: explicit factual memory, skill learning, project/document questions, workflow starts, and board assignments take precedence over the original bare-task-add fallback when that is the actual human intent. Do not classify by a word alone: “remember that the report uses Monday weeks” is factual capture, while “remind me in 30 minutes” is scheduling. Application-authored workflow/assignment kinds have explicit routing; source text and reference contents never become new action requests. Preserve the established Daylist default for ordinary task requests, and test that reading/learning a document does not inadvertently add it as a task.

## 2. Protocol and schema conventions

Models continue to emit exactly one of these existing action shapes:

```json
{"type":"tool_call","name":"update_plan","arguments":{"version":1,"steps":[{"id":"inspect","text":"Inspect overdue tasks","status":"in_progress"}]}}
```

```json
{"type":"final","message":"Your requested changes are complete."}
```

Each tool's field tables are normative schema definitions: every listed required field is required; unlisted fields are forbidden on each object; arrays recursively validate their elements. `?` denotes optional, not nullable. An explicitly nullable field is described as such. Defaults are applied by the application only where stated. All versioned new inputs use integer `version: 1`; unsupported versions fail. Existing task-tool inputs keep their existing format.

Common scalar names used in tables:

| Name | Definition |
| --- | --- |
| `ID` | Nonblank opaque string, 1–80 JavaScript characters. Application-created records use `crypto.randomUUID()`; model references must exactly match accessible records. |
| `LocalID` | ASCII string matching `/^[a-z][a-z0-9_]{0,63}$/`; unique within its containing array. |
| `Revision` | Positive safe integer for local optimistic checks; server sync may use an opaque revision token instead. Never compare tokens lexicographically. |
| `Instant` | Canonical UTC ISO timestamp produced/validated by the application, such as `2026-10-28T15:00:00.000Z`. |
| `Cursor` | Opaque pagination token, at most 512 characters; only the application interprets it. |

Unless otherwise specified, strings with minimum length reject whitespace-only content; `.length` measures UTF-16 code units, not model tokens. Apply explicit text length limits before DOM insertion. Do not truncate identifiers, tool arguments, saved changes, or human answers to make them valid. Truncated read results must say so and supply a continuation cursor/offset.

Success objects use `{ success: true, ...toolSpecificFields }`. The fields and examples in each spec define the rest of that result. Application-generated failures use:

```json
{"success":false,"error":"The selected record changed. Read its current revision before retrying.","code":"conflict"}
```

`error` is a nonblank application message of at most 500 characters. `code` is one of `invalid_arguments`, `not_found`, `disabled`, `permission_denied`, `conflict`, `busy`, `unavailable`, `budget_exceeded`, or `unsupported`. Existing task failures with only `error` remain compatible. Catch only expected domain errors into these results. Abort rejects with `AbortError`; unexpected errors stop the run. A failed write is not evidence that it committed; an ambiguous transport failure must not trigger blind replay.

Model observations remain JSON strings in the next user-role input:

```json
{"kind":"tool_result","request":"Help organize overdue tasks","name":"update_plan","result":{"success":true,"version":1,"revision":1,"steps":[{"id":"inspect","text":"Inspect overdue tasks","status":"in_progress"}]},"instruction":"This updates progress only. Continue the original task."}
```

Instructions in observations are fixed application guidance. Tool data, skill examples, retrieved messages, and rendered artifacts cannot replace system rules or authorize unrelated actions. Human clarification is trusted only as a response to its actual pending request. Persist enough correlation metadata outside the model envelope to reconstruct what happened.

[Large results](context-management.md#feature-large-tool-results) define an alternate tool_result_reference observation with a validated compact control projection and immutable result reference. This changes only the application observation, not the model action envelope. Never offload mandatory question/approval answers, admission schemas, grants, or authoritative receipts. [Clock grounding](time-and-reminders.md#feature-current-date-time) adds application-owned acceptedAt/timezone context to relative-time requests and answers.

Extend `schema.js` before using arrays (`items`, `minItems`, `maxItems`, string `uniqueItems`), finite numbers with bounds, explicit nulls where specified, or other new keywords. Implement cross-field conditions in dedicated semantic validators rather than assuming the small current validator supports full JSON Schema. Parse once, validate again at execution, and validate results before observations. Never evaluate model output as parent-page JavaScript.

## 3. Actors, identities, and persistence

Use a browser-owned execution context `{ threadId, runId, ownerId, deviceId, actor, policyRevision }`. `actor` distinguishes human, main agent, delegated agent, scheduler, and system maintenance. Tools never accept a model-supplied owner as authority. Session objects are transient; durable threads and tool-operation records are plain data. Restoring history creates a new session and does not replay recorded tool calls.

The [project extension](agent-configuration.md#feature-project-context) adds controller-owned projectId/null, projectRevision/null, agentId/configurationRevision, and exact resource grants. Context references, project metadata, and workflow/board packets cannot alter owner or grant ceilings. [Factual memory](memory-and-learning.md#feature-persistent-memory) and [learned skills](skill-library.md#feature-skill-learning-extension) are separate domains with their own capture/publication rules; neither is a transaction log or a new human authorization.

New entities need stable origin-independent IDs, schema versions, ownership, logical relationships, revisions, and deletion/tombstone semantics suitable for future sync. Preserve numeric task IDs for compatibility with existing tools; they are local handles. Before cross-device task sync, add a stable task identity and map each device's numeric handle to it. Two devices' task `id: 3` must not be treated as the same task. Do not change current task keys casually or expose unstable local handles in cross-device references.

Write durable task mutation attribution and the mutation itself atomically. UI notifications follow transaction commit. No IndexedDB transaction stays open while waiting for a model, human, network call, or child agent. Treat `versionchange`, quota failure, and blocked upgrades as recoverable application states with visible failure; do not silently discard history.

The database design is intentionally not prescribed here. Implementers must support the stated invariants and migrate existing tasks without data loss. Attachments/blobs, full transcripts, skill bodies, summaries, and operation journals are separate bounded records rather than one ever-growing thread object.

### Future Azure/Cosmos DB boundary

The browser continues to work locally. A future authenticated Azure Static Web Apps API mediates sync with Cosmos DB; no database credentials belong in browser code or model context. Design an adapter for outbound idempotent operations and inbound revisions, ownership validation, conflict responses, and tombstones. Server authorization is authoritative once cloud storage exists. Never trust a client-supplied ownership field by itself.

Persist an outbox operation ID with a local mutation to permit retry without duplication. Surface conflicts rather than silently choosing a task or overwriting a newer preference. Do not sync live resolvers, DOM state, in-flight sessions, device leases, or draft secret values. A synced schedule is a definition, not permission for every device to execute it. A cross-device single-executor guarantee needs server arbitration or an explicit executing-device rule. This is an integration boundary, not an assertion that backend routes already exist.

## 4. Policy, lifecycle, and context

Policy is checked before generation, immediately before dispatch, and at commit for sensitive mutations. Effective permissions intersect user settings, main/subagent role profiles, thread restrictions, parent restrictions, task/schedule grants, and runtime capabilities. Disabled removes eligibility; Include admits eligible definitions/skill bodies up front; Discover permits bounded on-demand admission/loading. Exposure is not authorization. A skill or transcript cannot grant tools. Rebuilding may be necessary to remove stale instructions; hiding a tool alone is insufficient.

The [agent library](agent-configuration.md#feature-agent-library) contains versioned role instructions, narrower tool/skill settings, permission levels, and bounded runtime configuration. Threads pin a configuration revision; current global/role revocations still apply. [Execution permissions](capability-policy.md#feature-execution-permissions) add an optional deny/ask/automatic gate after eligibility/admission. Approval binds exact frozen arguments and never broadens a hard prohibition. New schema metadata records application-reviewed domain effects independently from context-exposure classification.

Only one model call may run per session at a time. Use `AbortController`, a session generation counter, and stable operation IDs so late callbacks cannot append to the wrong run. Check cancellation after every await and before any write or continuation. Stop releases pending questions, proposals, child work, and listeners; already committed operations stay saved. A recoverable read/validation failure becomes a tool result, while cancellation follows the run's distinct cancelled outcome.

Add an explicit `awaiting_user` run outcome for the nonblocking review requests in preferences/branching. When such a tool returns `status: 'awaiting_user'`, emit/persist its result and stop the loop without another model call, returning a deterministic explanation and the pending record ID. Unlike a model error, this is a normal pause: update `app.js`, which currently treats every non-completed result as abnormal, to retain the review and hold automatic queue draining. Approval/rejection is a direct human service action, not an automatically fabricated new chat request. Continue only on an explicit user action. Blocking question/task-proposal tools instead keep their original run pending until answered; do not mix these two lifecycles.

All interactive brokers share a controller-owned interaction slot per active thread, including the original question tool, [rich input extension](interactive-experiences.md#feature-structured-input-extension), proposals, and exact-call approvals. Reject or defer a second blocking interaction rather than replacing another interaction and orphaning its resolver. Persistent nonblocking review cards are separately identified and revision checked; only the active run's interaction may resume that run. Define teardown in the session manager so stopping one child or one view cannot settle another interaction.

Skill publication reviews use the same nonblocking awaiting_user lifecycle. Curation, board review, and workflow Start are direct human services bound to frozen records/revisions; a generated form answer is not their approval. Chrome-only [voice](interactive-experiences.md#feature-voice-interaction) produces a reviewed composer/field draft, never a tool call or approval click. A [context picker](conversation-lifecycle.md#feature-context-references) grants exact selected source access under existing policy, not owner-wide access.

Non-inference waiting does not consume model iterations. Retain the 12-call main-run bound; feature specs state any child/maintenance budgets explicitly. If a blocking tool is emitted on the last permitted inference step, do not open a form or start work requiring an impossible continuation. Finish deterministically with the limit outcome.

Use a session manager rather than scattering raw `session` references in new modules. It serializes generation, compaction, rebuilding, policy invalidation, and disposal. The main thread still owns Prompt API interaction. Background timers may determine due work but cannot guarantee inference when the document is closed or suspended.

All text providers, board attempts, maintenance reviews, and child sessions share this scheduler and existing hard budgets. HTTP generation attempts count even if they fail before Chrome fallback. Fallback reconstructs bounded current context and exact receipts at a safe boundary; it does not replay mutations, reset counters, or widen permissions. A stronger model/context window does not automatically raise app-level limits. Board execution remains open-page and requires explicit device arbitration before claiming cross-device exclusivity.

Bound catalog descriptions, retrieval results, and tool observations before invoking the model. Keep authoritative pending state, grants, applied-operation IDs, and task revisions outside prose summaries. Summaries are context aids, not transaction logs or permissions. Do not infer that `clone()` makes a context smaller; [branching](conversation-lifecycle.md#feature-thread-branches) and [compaction](context-management.md#feature-context-compaction) define different operations.

## 5. UI, audit, and tests

Use native labeled controls, keyboard focus, and visible busy/error states. Render source as plain text unless a surface explicitly opts into the safe [Markdown renderer](document-workspace.md#feature-markdown-rendering) or isolated HTML artifacts. These are different presentation boundaries; Markdown never executes scripts. A tool result is shown after its actual commit/settlement. Human controls are never represented by fabricated model calls. Log transitions and accepted actions, not every keystroke. Cap in-memory traces and paginate persistent history.

[Observability](diagnostics.md#feature-observability) supplies a separate agentEvents IndexedDB object store and immutable payload references. Capture every application-visible inference/tool/interaction lifecycle, actual submitted prompt/schema, raw response, validated action, result, and relevant configuration versions. Do not log credentials or solicit hidden reasoning. Keep domain receipts atomic with mutations; logging failures pause further agent work rather than encouraging replay. A curated transcript is not a substitute for this diagnostic event stream.

All features need unit coverage at their lowest behavioral boundary and browser coverage for meaningful interactions. Tests use scripted sessions to prove plumbing; real local-model evaluations are separately labeled. New specifications do not imply running the unimplemented features now. From `docs/`, the current verification commands are `npm test` and `npm run test:browser` after installing existing dev dependencies. No production dependency or build framework is required.

## 6. OpenClaw-review extension contracts

The approved extensions are [loop detection](context-management.md#feature-tool-loop-detection), [event reminders](time-and-reminders.md#feature-event-reminders), [durable goals](work-lifecycle.md#feature-conversation-goals), [steering](conversation-lifecycle.md#feature-run-steering), [structured processing](workflows-and-processing.md#feature-structured-processing), [memory consolidation](memory-and-learning.md#feature-memory-consolidation), [recall](memory-and-learning.md#feature-context-aware-recall), [pipelines](workflows-and-processing.md#feature-workflow-pipelines), [result pruning](context-management.md#feature-tool-result-pruning), [observability agent](diagnostics.md#feature-observability-agent), and [suggestions](work-lifecycle.md#feature-follow-up-suggestions). [Side questions](future-reference.md#feature-side-questions-reference) remain reference-only. These are complete browser adaptations, not imports of OpenClaw code or dependencies.

New shared evidence references are closed `{kind,id,revision}`: kind is message/document/memory/skill/result/run/operation/event; id is ID. Versioned message/document/memory/skill require a non-null Revision; immutable result/run/operation/event use null. A result may identify a registered immutable processing/status snapshot in its own namespace; the domain resolver must verify the kind/namespace rather than treating every ID as interchangeable. Resolve owner/project/grants, exact revision existence, and actual source coverage before use. Referencing an ID does not grant access. Selected-range references in context-references retain their richer original contract. Source quotes/offsets are verified against the exact retained source revision, not today's body.

Every new tool definition uses the same strict input schema for model descriptions, responseSchema, and dispatch validation; examples with omitted optional values are expanded by their declared defaults only. All finite JSON objects are plain data; reject unknown keys and unsafe prototype properties. Human service commands bypass inference and generate honest domain/UI receipts. Metadata fields such as ownerId, actor, runId, resource grants, goal/pipeline counters, and provider identity come from the controller, never model input. None of these tools is externally exposed through WebMCP by default.

Registry classification is read/effect read for goal_read, reminder_list, recall_context, runtime_status, diagnostic_events, followup_list, and pipeline_status; write/effect write for reminder_create/reminder_cancel, goal_create/goal_report, and followup_suggest/followup_withdraw. structured_process is maintenance/effect read (only diagnostic/result persistence), with no executor in its inner inference. diagnose_runtime is maintenance/effect read and creates only its bounded diagnostic worker. pipeline_run is maintenance/effect write for starting the approved interpreter; it still needs the exact authorized invocation and every inner tool uses its own normal effect/permission gate. Human Start receipts can satisfy the exact start authorization without asking twice. Helpers cannot invoke any of these orchestrators recursively, and inner diagnostic tools are usable only with their explicit scoped grant. Deterministic harness services such as pruning/loop detection have no fake callable definition.

Fixed processing/recall/diagnostic helpers are controller-managed bounded contexts. They are not a general escape from the subagent role's policy. Intersect the applicable role/global ceilings and the feature's exact source/tool grants, admit only that fixed catalog, and never enable a Disabled entry by starting a helper. The human feature setting authorizes the fixed helper purpose; general delegate_task eligibility is separate. These helpers cannot launch one another recursively. Helper inference uses the existing aggregate of at most 12 child/helper calls per parent run, plus each feature's smaller limit. Independent human-started memory-review and diagnostic attempts have the explicitly stated two/six-call limits and do not receive a hidden 12-call main loop. A registered structured-processing step has no tool executor at all.

Use an app-owned inference purpose value agent_action/processor_output/memory_review/recall/diagnosis/compaction in configurationSnapshot payloads. The adapter accepts the corresponding approved exact schema; the parent action envelope remains tool_call/final. The HTTP response schema name follows that purpose while the local adapter retains its existing one-assistant-content and no-native-tools rules. Do not execute an auxiliary output even if it contains text resembling a tool call. Stronger helper routes are explicit saved route references, with measured/estimated/unknown context accounting and all existing fallback/cancellation/credential boundaries. Memory consolidation's larger selected-input allowance is explicit in that spec and does not raise ordinary context/call limits.

Goal continuations and pipeline execution are explicitly approved bounded orchestration extensions to the original queue. Controller-created continuation records are never labeled as fresh human messages and do not acquire a fresh unlimited budget. The queue remains the owner of scheduling; ordinary user entries retain their own original-request status. A queued pipeline_run hands off its foreground parent to awaiting_user without another parent generation; its authorized typed interpreter advances steps until a durable gate/terminal state. Ordinary tools cannot exploit this exception just by returning status queued. Register lifecycle behavior in trusted tool metadata.

All extension counters count actual attempted generation, including failures/corrections/fallback; count shared goal/pipeline totals once per inferenceId even when also counted in a parent/helper budget. A successful tool receipt never becomes another effect just because a new session or invocation begins. Awaiting input, checkpoint review, deterministic status collection, pruning, and a session rebuild without generation consume no model calls. They can still fail and must be visible. At budget exhaustion retain exact human input/committed effects and stop; do not start an interaction requiring an impossible model continuation.

Rebuild manifests additionally preserve goal bindings/counters, admitted steering batches, reminder match receipts, loop state, selected recall sources, result projections, pipeline checkpoint/step receipts, and configuration/persona revisions as applicable. Keep these values authoritative and bounded by each feature's limits. Stale/deleted/revoked data cannot re-enter via summaries. Persist reports/checkpoints in IndexedDB with immutable bodies, expected-revision changes, operation IDs, and future authenticated sync boundaries; synced definitions are not execution grants for every device.

## 7. Cline-review extension contracts

The approved extensions are [Plan/Act phases](capability-policy.md#feature-plan-act-modes), [conditional guidance](agent-configuration.md#feature-conditional-instruction-rules), [agent-team coordination](agent-coordination.md#feature-agent-team-coordination), and [completion reports](work-lifecycle.md#feature-completion-reports). Conversation imports, configurable lifecycle checks/hooks, and multi-document change sets were declined. These specifications adapt browser-owned records and effect policy; they do not load Cline SDK or native integrations.

Effective phase is controller-owned and precedes tool generation/dispatch. Plan denies domain-changing effects regardless of an optional approval layer being disabled. Existing read-only/global/role/resource restrictions remain hard ceilings. A phase change is a human service, not a model tool or a grant to execute every saved plan. Phase-specific routes inherit existing local endpoint/Chrome fallback restrictions, actual context measurement, and the same counters. No phase switch, rule activation, teammate message, or terminal-report correction creates additional inference allowance.

Rule bindings/revisions and deterministic activation snapshots belong in session/configuration/context manifests. Resolve guidance after role/project instructions and before explicit preferences/persona under the agent-library precedence contract. Only app-owned permitted resource metadata, phase, project, and frozen workflow identities can activate conditions. A candidate action generated before newly applicable guidance/phase/policy is not allowed to run merely because it parsed: use the relevant safe-boundary skip/rebuild/reconsider path and preserve a truthful not-executed observation. Unknown/malformed rules never fail open.

Team tools are local-only: team_read/team_mailbox are read/effect read; team_send/team_submit_fragment/team_review_fragment/team_finalize are write/effect write over their coordination records. The Plan ceiling has the explicitly bounded bookkeeping exception documented in the team spec; normal read_only/ask/deny policy still applies. Generic children/fixed helpers cannot acquire team membership or these tools. Membership/assignment/start/budget changes and outcome acceptance are direct human services; no team message authorizes another operation or automatically starts a worker. Team counters add an explicit ceiling over existing run/board/helper/goal limits and count each inferenceId once in that aggregate.

report_run_completion is maintenance/effect read with trusted terminal behavior terminal_report. Extend the executor/AgentLoop integration to persist its actual tool result and validated report, then return a deterministic terminal outcome without another generation. It can run on the last permitted inference because it requires no model continuation. A rejected report consumes its ordinary call and can be corrected only if allowance remains. The unchanged final branch remains available for compatible informational/optional-mode replies; required action-report mode handles missing reports explicitly without hidden calls. Domain completion still belongs to goal_report/work_report/pipeline receipts/human team acceptance, not a generic outcome label.

Preserve exact phase/configuration/rule activation sources, team membership/window/message/fragment references, and completion-evidence support in authoritative bounded manifests and diagnostic payloads. No additional raw log access, external messaging, imported transcript execution, or model-written configuration is implied. Use the shared evidence-reference and optimistic revision/idempotency contracts; do not infer semantic success from a verified boolean or a valid JSON object alone.
