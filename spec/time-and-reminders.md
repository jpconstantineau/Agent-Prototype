# Clock grounding, scheduled work, and topic reminders

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Make future intent precise and inspectable in a browser page. Device time grounding, clock schedules, and topic-triggered reminders share temporal records and delivery receipts but must not confuse a reminder with authorization to perform work.

## User intent

Express relative times, schedule explicitly bounded work, request a reminder when a topic returns, and inspect, cancel, or resolve missed/expired entries.

## Agent intent

Read current device time and the accepted-request anchor, create or inspect authorized schedules, and record requested topic reminders through the contracts below. The agent cannot infer background execution guarantees or convert a reminder match into permission for another operation.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Current date and time](#feature-current-date-time) | Agent reads; harness anchors | Own device-clock observations and stable relative-request time anchors. |
| [Scheduled work](#feature-scheduled-work) | Human authorizes; agent schedules; harness runs | Own once/daily/weekly work with explicit bounded grants and open-page execution. |
| [Event reminders](#feature-event-reminders) | Agent saves when asked; harness matches | Own literal topic matches, expiry, cooldown, and bounded reminder delivery. |

## Integration and delivery

A clock schedule becomes due by time; an event reminder becomes relevant through its explicit literal match rules. They retain separate records and lifecycle semantics. Neither is factual memory, and neither can claim reliable closed-page/background execution in this design.

Use the accepted human-message time as the anchor for relative intent; ask through the existing question tool if the requested date/time is ambiguous. Device clock and timezone observations are visible evidence, not trusted server time. Delivery and execution receipts are distinct.

Implement clock grounding before schedules, then reuse the queue, scheduler, scoped grants, and device arbitration. Persist definitions for future sync, but syncing a schedule never grants every device permission to execute it.

<a id="feature-current-date-time"></a>

## Current date and time

Status: approved specification. Adds an agent-facing read tool, get_current_datetime. Uses [preferences](agent-configuration.md#feature-preferences), [scheduling](time-and-reminders.md#feature-scheduled-work), [runtime contracts](runtime-contracts.md), and [observability](diagnostics.md#feature-observability). There is no dedicated clock settings panel beyond the existing timezone preference and ordinary tool controls.

<a id="feature-current-date-time-purpose"></a>

### Purpose

Ground relative dates and times in an actual clock reading and the accepted instruction's timestamp. This prevents stale context or processing delays from silently shifting task dates and reminders.

<a id="feature-current-date-time-user-intent"></a>

### User intent

The user does not invoke a dedicated clock control through this spec. They express times naturally, such as tomorrow or in 30 minutes, and expect the app to resolve the intended date, time, and timezone correctly.

<a id="feature-current-date-time-agent-intent"></a>

### Agent intent

Call get_current_datetime when interpreting relative time, refresh stale samples, and preserve the correct instruction or answer anchor. The agent must ask for clarification when the intended time remains ambiguous or has passed.

<a id="feature-current-date-time-purpose-and-source-of-truth"></a>

### Purpose and source of truth

Give the agent a fresh clock observation when the human says “tomorrow,” “in 30 minutes,” “next Friday,” or another relative time. The current app supplies only localDate at request start. Keep that field for compatibility, but also timestamp accepted human messages/answers in application state. A model must not infer the current clock from training data, a previous conversation, or a stale session prompt.

The tool samples the device clock, not an external time service. Capture one Date instance and derive every returned field from it, avoiding inconsistent fields across midnight. Use Date and Intl.DateTimeFormat; no network, geolocation, extension privilege, or native Prompt API tool facility is required. Device time can be wrong: label the source device_clock and do not promise server-authoritative time or cross-device synchronization.

<a id="feature-current-date-time-input-and-result-contract"></a>

### Input and result contract

Input is the closed `{version:1}`. The application chooses effective timezone from a valid saved preferredTimeZone, otherwise the browser's resolved timezone. Do not let the model silently choose another user's locale/timezone. If a valid zone cannot be resolved, return unavailable rather than labeling UTC as the user's local zone.

```json
{"type":"tool_call","name":"get_current_datetime","arguments":{"version":1}}
```

Success is a closed object requiring the following fields:

| Field | Definition |
| --- | --- |
| success / version | true / 1 |
| sampledAt | Instant from captured Date.toISOString() |
| unixEpochMs | Safe integer milliseconds matching sampledAt |
| timeZone | Effective valid IANA zone string, 1–80 |
| timeZoneSource | `preference` or `device` |
| deviceTimeZone | Valid browser-resolved zone, or null if unavailable while preference is usable |
| localDate | Real YYYY-MM-DD in the effective zone |
| localTime | HH:mm:ss, 00–23 hours in the effective zone |
| utcOffsetMinutes | Finite integer, local minus UTC, for that instant/zone; e.g. -360 for Regina |
| source | `device_clock` |
| sampleId | Application-generated ID for audit/relative-time resolution references |

```json
{"success":true,"version":1,"sampledAt":"2026-10-28T15:00:00.000Z","unixEpochMs":1793199600000,"timeZone":"America/Regina","timeZoneSource":"preference","deviceTimeZone":"America/Regina","localDate":"2026-10-28","localTime":"09:00:00","utcOffsetMinutes":-360,"source":"device_clock","sampleId":"clock-1"}
```

Derive date/time parts using an explicit Gregorian calendar, Latin digits, and hourCycle h23, not locale-dependent string splitting. Validate actual zone/date values and zero-pad application output. getTimezoneOffset() describes the device's local zone; it is insufficient for an arbitrary preferred zone. Use a tested Intl parts-based offset routine for the captured instant, or a feature-detected supported Temporal implementation. This tool reports a current instant; it does not solve future wall-time conversion or recurrence DST by itself. The scheduling spec's explicit conversion rules remain applicable.

<a id="feature-current-date-time-relative-time-interaction-and-anchoring"></a>

### Relative-time interaction and anchoring

Description: “Read the current device date/time and effective planning timezone before interpreting relative dates or times. Use the returned sample and the accepted user-message timestamp. Refresh after a long pause. Do not guess the current date or treat a previous sample as permanently current.” Enable/admit it through normal tool controls; it cannot bypass Disabled. If unavailable, the agent requests an absolute date/time or explains the limitation instead of inventing a clock reading.

At acceptance of every user message, question answer, and rich-form answer, the controller records acceptedAt:Instant plus its current effective timezone and preference revision. Keep these facts outside model-generated prose. Add a bounded timeContext envelope to the user request/answered-tool observation with that source-message reference and timestamp. A later get_current_datetime observation shows how much time has passed and whether the zone changed.

Before committing a task due-date or schedule derived from relative wording, the run must have a successful current clock sample obtained for that request, in the applicable zone. Reuse a sample only while <=60 seconds old with no zone/preference change. After a long user/approval wait or page suspension, refresh before interpreting new relative wording or committing a still-relative proposal. Future absolute operations already explicitly reviewed keep their frozen dates; a refresh cannot silently move them.

Interpret “in 30 minutes” relative to when that instruction was accepted, not 30 minutes after a slow model finishes. Add 30 elapsed minutes to acceptedAt; a fresh sample validates that the computed due time is still future. “Tomorrow” uses the calendar day at acceptedAt in the captured planning zone. Relative wording in a newly submitted clarification is anchored to that answer's acceptedAt. The original message and the answer are distinct reference times. Include the resolved concrete time in the user's review/confirmation where the action already has one; do not add an unrelated confirmation to every clear request.

If a pause makes the computed target past, the user explicitly changes timezone, or “next Friday”/“later” remains materially ambiguous, ask for the intended time. Do not reschedule from now or change a saved zone automatically. A clock tool answers “what time is it”; it cannot decide the user's meaning. Duration arithmetic and future local-calendar conversion should be checked by the host service, not accepted solely because the model produced an ISO string.

For relative schedules, extend the schedule creation service with an application-owned resolution receipt: sourceMessageId, acceptedAt, sampleId, sourceText range, resolvedInstant or local calendar fields/zone, and preferenceRevision. The host validates accessibility and consistency, and links the concrete stored schedule. This receipt is not a new model-supplied authorization field or an automatic parser for every natural-language expression. Human review sees the resolved target; source text never becomes code. Task dueDate remains a date string, not a shifted UTC timestamp.

<a id="feature-current-date-time-ui-integration-and-acceptance"></a>

### UI, integration, and acceptance

Show the ordinary read trace with effective zone and sampled time; the inspector links its sampleId and related resolution receipt. A human-readable date accompanies the exact ISO value where useful. A change in device zone does not override a stored preferred zone. Timer execution, missed-run policy, page-open limits, and single-device arbitration remain the scheduler's responsibility.

Add clock.js for single-sample conversion, a small tool adapter, and injected clock/zone providers for deterministic tests. Date.now() records wall timestamps; performance.now() measures durations within the live page. Detect large wall-clock discontinuities between relative-time preparation and commit and require resolution again instead of assuming the device clock remained accurate. Persist observations/time context as events, not mutable global “now.” No cross-device clock synchronization claim is made.

Test one-sample consistency across midnight, preference/device zones, leap days, fractional-hour offsets, DST transitions, local-date correctness, invalid zones, and stale samples. Verify an instruction accepted at 09:00 for “in 30 minutes” resolves to 09:30 even if processed at 09:05; processing after 09:30 must not silently move it to 10:00. Test question/approval pauses, zone changes, Disabled behavior, and a scripted relative reminder flow with an actual clock read before creation.

---

<a id="feature-scheduled-work"></a>

## Scheduled work

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). A schedule reminds the agent to perform a bounded task later; it is distinct from a task due date.

<a id="feature-scheduled-work-purpose"></a>

### Purpose

Turn an explicit request for future agent work into a persisted, bounded schedule with visible timing and grants. State the open-page execution promise so reminders are not confused with task due dates or guaranteed background processing.

<a id="feature-scheduled-work-user-intent"></a>

### User intent

Ask for later or recurring work, inspect its concrete schedule and permissions, and pause, edit, delete, or run it now.

<a id="feature-scheduled-work-agent-intent"></a>

### Agent intent

Create, update, list, or delete schedules when authorized by the human's request. The agent must resolve relative time correctly, respect saved grants, and never infer a schedule merely from a task mentioning a date.

<a id="feature-scheduled-work-actors-and-execution-promise"></a>

### Actors and execution promise

[Event reminders](time-and-reminders.md#feature-event-reminders) add topic-triggered conversational reminders with keyword matching, expiry, cooldown, and match budgets. They use separate records/tools and do not authorize execution when a topic appears. [Goals](work-lifecycle.md#feature-conversation-goals) preserve an objective across visits with explicitly bounded continuation, while this specification remains the clock-based scheduling service. No feature promises inference while the page is closed.

The agent can create/update, list, and delete schedules when the human asks for future work. The user has a schedule manager with the same operations plus Pause/Resume and Run now. No schedule is inferred merely because a task mentions a date. A standalone page cannot guarantee waking Chrome or running a model while closed, suspended, or without a ready model session. Display the supported promise: “Runs while Daylist is open and local AI is enabled.” No hidden service worker inference, background API key, or notification permission is assumed.

<a id="feature-scheduled-work-contracts"></a>

### Contracts

`schedule_task` input requires `version: 1`, `title` (1–120), `prompt` (1–2000), and `schedule`. To edit, additionally require `scheduledTaskId: ID` and `expectedRevision`; version 1 replaces all editable fields instead of ambiguous patches. Optional `enabled` defaults true on creation. `schedule` is exactly one of:

- `{ kind: 'once', at: Instant }`, at least one minute in the future on creation.
- `{ kind: 'daily', hour, minute, timeZone }`; hour 0–23, minute 0–59, zone an IANA identifier accepted by `Intl.DateTimeFormat` (1–80 characters).
- `{ kind: 'weekly', weekdays, hour, minute, timeZone }`; weekdays is 1–7 unique integers, Monday=1 through Sunday=7.

```json
{"type":"tool_call","name":"schedule_task","arguments":{"version":1,"title":"Morning overdue review","prompt":"Summarize my overdue tasks without changing them.","schedule":{"kind":"daily","hour":9,"minute":0,"timeZone":"America/Regina"}}}
```

Success: `{ success: true, version: 1, scheduledTaskId, revision, enabled, nextRunAt, executionMode: 'open_page', grantedTools }`; `nextRunAt` is Instant or null when disabled/finished. `grantedTools` is a canonical array of enabled tool names allowed for that schedule. The model cannot grant them in its arguments; the service derives them from the human's request/current settings and obtains user selection where scope is unclear. Default scheduled jobs are read-only; write jobs require an explicit human grant with a visible description.

`list_scheduled_tasks` requires version; optional cursor/limit (1–20, default 10). Return `{success:true,version:1,items,nextCursor}`. Each item contains ID, title, prompt, schedule, enabled, revision, nextRunAt, and `lastRunStatus` (`never`, `running`, `completed`, `failed`, `missed`, `needs_attention`); null cursor means end. `delete_scheduled_task` requires version, ID, expectedRevision and returns ID plus `status:'deleted'`. Human Pause/Resume and Run now call services using expected revisions. Run now returns a run ID and `status:'queued'`, not a claim of completion.

<a id="feature-scheduled-work-ui-and-timing-rules"></a>

### UI and timing rules

Show human-readable recurrence, time zone, next due time, last outcome, and the open-page limitation on each schedule. Enable/Pause maps to enabled; Edit replaces the stored schedule; Delete tombstones it; Run now enqueues one occurrence. A permission summary lists the granted operations. Input forms use native date/time/weekday controls and clarify ambiguous natural-language dates through `request_user_input`.

Interpret daily/weekly times in their saved zone, not the device's changed zone. Define DST deterministically: nonexistent wall time runs at the first later valid instant that day; repeated wall time runs once at its first occurrence. Implement a tested local-calendar conversion routine or a supported native Temporal API behind detection; do not assume Date can parse IANA wall times directly. No new runtime dependency is required, but unsupported zones/conversion must fail clearly.

For relative requests use [current date/time grounding](time-and-reminders.md#feature-current-date-time): read a fresh device clock sample and preserve the accepted source message's timestamp/zone. “In 30 minutes” anchors to when the instruction was accepted, not when model processing finishes. Link the application-owned resolution receipt to the concrete saved schedule. If delay makes the target past, ask for the intended time rather than shifting it silently. A scheduled occurrence uses its saved [agent configuration](agent-configuration.md#feature-agent-library) reference plus current hard eligibility/permission restrictions; a required execution approval holds unattended work as needs_attention.

The schedule service captures the creating thread's agentId/configurationRevision as application-owned metadata; the model cannot choose a more permissive library agent through schedule arguments. The human schedule editor may explicitly change that binding while idle with a revision check. If its referenced configuration is unavailable, hold needs_attention instead of substituting the latest/default agent.

The [project](agent-configuration.md#feature-project-context) binding and exact [workflow instance](workflows-and-processing.md#feature-workflow-templates), when created through its human launcher, are also application-owned metadata. Resolve trusted workflowInstanceId bindings, never an ID parsed from a model's prompt string. Current hard policy and the chosen [text-provider route](local-model-endpoint.md) apply at execution; Chrome fallback does not repeat schedule creation or an occurrence's committed operations. [Skill curation](skill-library.md#feature-skill-curation) treats referenced skills as protected even while a schedule is paused.

On opening/resuming, detect missed occurrences and mark them missed. Version 1 never catches up by silently running old writes. Offer one human-initiated Run now, then compute the next occurrence. While open, recheck against wall-clock time after visibility changes; timers are hints, not exact guarantees. Prevent overlapping executions; coalesce an occurrence already claimed/running. One-off definitions become finished after their accepted occurrence.

<a id="feature-scheduled-work-runtime-storage-and-model-guidance"></a>

### Runtime, storage, and model guidance

Use `schedules.js` plus the queue service, with stable occurrence keys `(scheduleId, scheduledInstant)`, revision/lease checks, and a durable run link. A job starts in a fresh thread/run with current capabilities intersected with its saved grants. Do not load unrelated chat history or auto-resume a pending human question: mark needs_attention with a link to answer later. Disabling the scheduling tool stops agent edits; disabling execution or revoking its grants also holds affected jobs. Cancelling an active occurrence does not delete future recurrence.

Description: “Schedule work only when the human asks you to act later or repeatedly. Use explicit local time/zone. State the returned next time and open-page limit. Creating a schedule does not mean it has run. Do not broaden its tool grants or replace a task due date.” List/delete descriptions must distinguish definitions from task records.

Persist definitions/occurrence receipts in IndexedDB and sync through the future API. Until server arbitration exists, one designated device owns execution; other devices show schedules without executing them. Backend/cloud execution is a future mode requiring separate design, not implied by this spec.

<a id="feature-scheduled-work-acceptance"></a>

### Acceptance

Test DST boundaries, changed device zones, clock jumps, suspension/reopen, missed runs, one-off completion, overlap, duplicate claims, revocation, and mutation permission checks. Scripted jobs must remain within saved grants and never falsely report future execution. UI tests cover readable zone/time, pause/delete/revision conflicts, Run now status, and needs_attention. Do not create real schedules while testing the specification.

---

<a id="feature-event-reminders"></a>

## Event reminders

Status: approved design; not implemented. Extends [scheduled work](time-and-reminders.md#feature-scheduled-work), [memory](memory-and-learning.md#feature-persistent-memory), [clock grounding](time-and-reminders.md#feature-current-date-time), and [agent configurations](agent-configuration.md#feature-agent-library). Stores browser records, not filesystem notes.

<a id="feature-event-reminders-purpose"></a>

### Purpose

Remember an explicit future condition independently of the live context window. A topic-triggered reminder survives compaction and session changes without keeping its whole originating conversation in every prompt.

<a id="feature-event-reminders-user-intent"></a>

### User intent

Ask “When we discuss deployment, remind me to check rollback,” inspect the concrete trigger/scope, and edit, pause, or cancel it. Know when a reminder was matched and whether it was actually presented.

<a id="feature-event-reminders-agent-intent"></a>

### Agent intent

Create, list, or cancel event reminders only when requested. Report the saved trigger and scope accurately. A triggered reminder supplies conversational context; it does not authorize further tool actions.

<a id="feature-event-reminders-records-and-matching"></a>

### Records and matching

A closed reminder body is `{version:1,title,text,triggers,scope,cooldownSeconds,maxMatches,expiresAt}`. title is nonblank 1–120; text 1–500; triggers 1–8 unique strings of 1–80; scope is thread/agent_project/agent; cooldownSeconds integer 0–2592000 default 86400; maxMatches integer 1–20 default 3; expiresAt is future Instant, no later than 365 days from creation, default 90 days. Agent_project requires a selected project. Scope IDs and owner come from the controller. Thread scope is the creation default; widening requires explicit human intent shown in the receipt. No arbitrary thread/agent/project selector is admitted in model input.

Metadata stores reminderId, revision, ownerId, agentId, projectId/null, threadId/null, creating message ID/revision, state armed/paused/exhausted/expired/cancelled, matchedCount, lastMatchedAt/null, createdAt/updatedAt, and immutable body revisions. Bind the exact agent identity; configuration edits do not silently move reminders to other agents. Add settings extensions.eventReminders `{enabled:boolean,maxActive:integer 1–50}` default false/30; enabled plus each tool's eligibility gates model use and matching, while the human manager remains available. Effective policy/identity scopes still intersect.

Before an eligible accepted human chat message's first inference, compare literal text to armed in-scope reminders. Normalize message and trigger strings with Unicode NFKC plus lowercase, then split into Unicode letter/number tokens. Every token in at least one trigger entry must be present as a whole token; punctuation-only entries are invalid. Preserve original text for display. This is predictable keyword matching, not semantic detection. Ignore application-labeled quotation/reference segments, document/tool content, child output, diagnostic text, reminders themselves, workflow/schedule system inputs, and unsubmitted drafts. Ordinary typed quotation marks do not change literal matching; segment provenance comes from the composer/controller, not a model guessing which words are quoted. Steering messages are eligible only when actually admitted to inference. Never rescan historical messages on reopen.

Scan at most 50 active scoped records, sorted creation time then ID; return at most three matches and 1500 reminder-text characters per message. Check expiry/cooldown/budget/revision before committing matches. A match beyond the per-message budget stays unconsumed; show a count in diagnostics. Use the clock service's accepted-message anchor; browser timers are not required for matching. Expiry/cooldown can be evaluated lazily on reads/turns. No closed-page execution or external event subscription is implied.

<a id="feature-event-reminders-agent-contracts"></a>

### Agent contracts

All inputs are closed, version 1, and use the standard action envelope and domain failure codes.

| Tool | Input besides version | Success besides success/version |
| --- | --- | --- |
| reminder_create | body with its own version omitted; explicit values for all body fields after natural-language resolution | reminderId, revision, body, state:'armed', operationReceiptId |
| reminder_list | cursor?, limit? 1–10 default 5, includeInactive? boolean default false | items of reminderId/revision/body/state/matchedCount/lastMatchedAt, nextCursor |
| reminder_cancel | reminderId, expectedRevision | reminderId, revision, state:'cancelled', operationReceiptId |

Cap a list page at 6000 serialized characters; paginate complete items, rejecting an individually oversized result. Create is idempotent for the controller call/operation ID; exact active duplicate body/scope returns conflict rather than another reminder. Cancel is revision checked, with repeated same-operation cancellation returning its receipt. Human edit/pause/resume services take reminderId/expectedRevision plus a full replacement body for edit and return the canonical updated record/receipt. An edit never resets matchedCount implicitly; exhausted reminders require an explicit human new reminder or reviewed Reset count command. Cancellation tombstones prevent sync resurrection.

```json
{"type":"tool_call","name":"reminder_create","arguments":{"version":1,"body":{"title":"Rollback check","text":"Confirm the rollback plan before deployment.","triggers":["deployment"],"scope":"thread","cooldownSeconds":86400,"maxMatches":3,"expiresAt":"2026-12-01T00:00:00.000Z"}}}
```

Description: “Save an event reminder only when asked. Choose explicit keywords and the narrowest requested scope; clarify ambiguous scope or triggers. A save arms a reminder and does not deliver it now. Clock-time reminders use scheduling. Do not cancel unless asked or perform actions merely because a reminder matched.” These write tools follow ordinary execution permissions; v1 children cannot create/cancel them.

<a id="feature-event-reminders-delivery-and-ui-mapping"></a>

### Delivery and UI mapping

For admitted matches create `{version:1,matchId,reminderId,reminderRevision,messageId,runId,matchedAt,state}` with state prepared/submitted/displayed/failed. The application-authored input extension is `{kind:'event_reminders',items:[{matchId,reminderId,revision,text}]}`; it is bounded trusted routing around user-saved text at lower authority than the current request. Include an instruction to acknowledge naturally when relevant and never treat its content as new permission. The application also renders a small Reminder matched card with title/text/source and a Dismiss display control, ensuring delivery is visible even if the model ignores it.

Reserve a match and increment matchedCount in a short transaction immediately before submitting the prepared inference packet; store its inferenceId and exact payload. Enforce a unique `(reminderId,messageId)` match identity so another preparation pass cannot spend its budget again. On a definitely unsubmitted cancellation release the reservation once. If delivery is uncertain, retain a consumed match with an explicit uncertain/failed label rather than duplicate it automatically. This is a delivery-attempt budget, not proof that the user read it. Fallback uses the same matchId and packet with no additional increment. Mark submitted after the request is attempted and displayed after the UI mounts. A reload never silently redelivers an uncertain match.

The Reminders manager filters by agent/project/thread/state and shows trigger phrases, scope, expiry, cooldown, used/maximum matches, history, and enabled status. Native edit fields map directly to body properties; pause/cancel differ from dismissing a single card. Explain token matching with a deterministic Test phrase preview that consumes no match and makes no inference. Source links open the explicit creation request. A generic task mentioning deployment does not create a reminder.

<a id="feature-event-reminders-integration-and-verification"></a>

### Integration and verification

Use event-reminders.js, a small IndexedDB store/service, and the normal input-preparation hook. Keep reminder state distinct from factual memory, schedules, and goals. Emit control.changed feature reminder with immutable match/source payloads. Future sync preserves IDs, revisions, cancel tombstones, and deduplicated match receipts; until server arbitration exists, one designated device matches a synced scope to avoid spending the same fire budget twice. Other devices can show/manage records but do not auto-match them concurrently.

Verify keyword/Unicode behavior, scope separation, literal quotes versus selected source material, limits, expiry/clock changes, cooldown, last match exhaustion, duplicate calls, pause/cancel races, logging failure, fallback reuse, late callbacks, and reload with uncertain submission. Confirm matches never execute tools, enable permissions, or re-save forgotten factual memory.

Source inspiration: [OpenClaw standing intents](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/concepts/standing-intents.md).
