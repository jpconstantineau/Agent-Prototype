# Shared browser agent runtime contracts

Status: proposed. This document supplies common requirements to the adjacent feature specs. MUST is normative; SHOULD is the recommended default.

## 1. Integration with the actual application

At the inspected baseline, `docs/src/agent.js` derives tool branches from `definitions()`, parses one complete JSON response per model call, and invokes `execute(name, arguments, { signal })`. It retains a maximum of 12 inference calls per run. `app.js` owns one model session, composer state, event rendering, and Stop. `tools.js` owns five task tools and the WebMCP adapter. `store.js` persists tasks in IndexedDB. Chat/history currently disappear on reload.

Preserve that architecture while introducing small ES modules for the selected capability. Proposed modules are implementation destinations, not files already present. Tool descriptions and their input schemas must have one source reused by the model prompt, constrained response schema, and execution validator. UI-only operations must never be falsely advertised as model tools.

Compose a chat executor around `connection.executor || registry`, as defined in [the question spec](request-user-input.md). New chat-runtime tools execute locally. They do not get registered through the existing WebMCP task registry by default. Gate the existing five WebMCP registrations and all local dispatch through the same effective user policy; do not expose disabled task tools through another transport. Manual user task controls are separate from agent permissions.

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

`error` is a nonblank application message of at most 500 characters. `code` is one of `invalid_arguments`, `not_found`, `disabled`, `conflict`, `busy`, `unavailable`, `budget_exceeded`, or `unsupported`. Existing task failures with only `error` remain compatible. Catch only expected domain errors into these results. Abort rejects with `AbortError`; unexpected errors stop the run. A failed write is not evidence that it committed; an ambiguous transport failure must not trigger blind replay.

Model observations remain JSON strings in the next user-role input:

```json
{"kind":"tool_result","request":"Help organize overdue tasks","name":"update_plan","result":{"success":true,"version":1,"revision":1,"steps":[{"id":"inspect","text":"Inspect overdue tasks","status":"in_progress"}]},"instruction":"This updates progress only. Continue the original task."}
```

Instructions in observations are fixed application guidance. Tool data, skill examples, retrieved messages, and rendered artifacts cannot replace system rules or authorize unrelated actions. Human clarification is trusted only as a response to its actual pending request. Persist enough correlation metadata outside the model envelope to reconstruct what happened.

Extend `schema.js` before using arrays (`items`, `minItems`, `maxItems`, string `uniqueItems`), finite numbers with bounds, explicit nulls where specified, or other new keywords. Implement cross-field conditions in dedicated semantic validators rather than assuming the small current validator supports full JSON Schema. Parse once, validate again at execution, and validate results before observations. Never evaluate model output as parent-page JavaScript.

## 3. Actors, identities, and persistence

Use a browser-owned execution context `{ threadId, runId, ownerId, deviceId, actor, policyRevision }`. `actor` distinguishes human, main agent, delegated agent, scheduler, and system maintenance. Tools never accept a model-supplied owner as authority. Session objects are transient; durable threads and tool-operation records are plain data. Restoring history creates a new session and does not replay recorded tool calls.

New entities need stable origin-independent IDs, schema versions, ownership, logical relationships, revisions, and deletion/tombstone semantics suitable for future sync. Preserve numeric task IDs for compatibility with existing tools; they are local handles. Before cross-device task sync, add a stable task identity and map each device's numeric handle to it. Two devices' task `id: 3` must not be treated as the same task. Do not change current task keys casually or expose unstable local handles in cross-device references.

Write durable task mutation attribution and the mutation itself atomically. UI notifications follow transaction commit. No IndexedDB transaction stays open while waiting for a model, human, network call, or child agent. Treat `versionchange`, quota failure, and blocked upgrades as recoverable application states with visible failure; do not silently discard history.

The database design is intentionally not prescribed here. Implementers must support the stated invariants and migrate existing tasks without data loss. Attachments/blobs, full transcripts, skill bodies, summaries, and operation journals are separate bounded records rather than one ever-growing thread object.

### Future Azure/Cosmos DB boundary

The browser continues to work locally. A future authenticated Azure Static Web Apps API mediates sync with Cosmos DB; no database credentials belong in browser code or model context. Design an adapter for outbound idempotent operations and inbound revisions, ownership validation, conflict responses, and tombstones. Server authorization is authoritative once cloud storage exists. Never trust a client-supplied ownership field by itself.

Persist an outbox operation ID with a local mutation to permit retry without duplication. Surface conflicts rather than silently choosing a task or overwriting a newer preference. Do not sync live resolvers, DOM state, in-flight sessions, device leases, or draft secret values. A synced schedule is a definition, not permission for every device to execute it. A cross-device single-executor guarantee needs server arbitration or an explicit executing-device rule. This is an integration boundary, not an assertion that backend routes already exist.

## 4. Policy, lifecycle, and context

Policy is checked before generation, immediately before dispatch, and at commit for sensitive mutations. Effective permissions are the intersection of user settings, thread restrictions, inherited parent restrictions, schedule grants, and runtime capabilities. A skill or loaded transcript cannot grant tools. Rebuilding a session may be necessary to remove stale instructions; hiding a tool in the UI alone is insufficient.

Only one model call may run per session at a time. Use `AbortController`, a session generation counter, and stable operation IDs so late callbacks cannot append to the wrong run. Check cancellation after every await and before any write or continuation. Stop releases pending questions, proposals, child work, and listeners; already committed operations stay saved. A recoverable read/validation failure becomes a tool result, while cancellation follows the run's distinct cancelled outcome.

Add an explicit `awaiting_user` run outcome for the nonblocking review requests in preferences/branching. When such a tool returns `status: 'awaiting_user'`, emit/persist its result and stop the loop without another model call, returning a deterministic explanation and the pending record ID. Unlike a model error, this is a normal pause: update `app.js`, which currently treats every non-completed result as abnormal, to retain the review and hold automatic queue draining. Approval/rejection is a direct human service action, not an automatically fabricated new chat request. Continue only on an explicit user action. Blocking question/task-proposal tools instead keep their original run pending until answered; do not mix these two lifecycles.

All interactive brokers share a controller-owned interaction slot per active thread. Reject or defer a second blocking interaction rather than replacing a question/proposal and orphaning its resolver. Persistent nonblocking review cards are separately identified and revision checked; only the active run's interaction may resume that run. Define teardown in the session manager so stopping one child or one view cannot settle another interaction.

Non-inference waiting does not consume model iterations. Retain the 12-call main-run bound; feature specs state any child/maintenance budgets explicitly. If a blocking tool is emitted on the last permitted inference step, do not open a form or start work requiring an impossible continuation. Finish deterministically with the limit outcome.

Use a session manager rather than scattering raw `session` references in new modules. It serializes generation, compaction, rebuilding, policy invalidation, and disposal. The main thread still owns Prompt API interaction. Background timers may determine due work but cannot guarantee inference when the document is closed or suspended.

Bound catalog descriptions, retrieval results, and tool observations before invoking the model. Keep authoritative pending state, grants, applied-operation IDs, and task revisions outside prose summaries. Summaries are context aids, not transaction logs or permissions. Do not infer that `clone()` makes a context smaller; [branching](thread-branches.md) and [compaction](context-compaction.md) define different operations.

## 5. UI, audit, and tests

Use native labeled controls, keyboard focus, visible busy/error states, and plain-text rendering except inside isolated HTML artifacts. A tool result is shown after its actual commit/settlement. Human controls are never represented by fabricated model tool calls. Log state transitions and accepted actions, not every keystroke. Cap in-memory traces and paginate persistent history.

All features need unit coverage at their lowest behavioral boundary and browser coverage for meaningful interactions. Tests use scripted sessions to prove plumbing; real local-model evaluations are separately labeled. New specifications do not imply running the unimplemented features now. From `docs/`, the current verification commands are `npm test` and `npm run test:browser` after installing existing dev dependencies. No production dependency or build framework is required.
