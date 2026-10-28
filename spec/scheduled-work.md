# Reminders for the agent and scheduled work

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). A schedule reminds the agent to perform a bounded task later; it is distinct from a task due date.

## Actors and execution promise

The agent can create/update, list, and delete schedules when the human asks for future work. The user has a schedule manager with the same operations plus Pause/Resume and Run now. No schedule is inferred merely because a task mentions a date. A standalone page cannot guarantee waking Chrome or running a model while closed, suspended, or without a ready model session. Display the supported promise: “Runs while Daylist is open and local AI is enabled.” No hidden service worker inference, background API key, or notification permission is assumed.

## Contracts

`schedule_task` input requires `version: 1`, `title` (1–120), `prompt` (1–2000), and `schedule`. To edit, additionally require `scheduledTaskId: ID` and `expectedRevision`; version 1 replaces all editable fields instead of ambiguous patches. Optional `enabled` defaults true on creation. `schedule` is exactly one of:

- `{ kind: 'once', at: Instant }`, at least one minute in the future on creation.
- `{ kind: 'daily', hour, minute, timeZone }`; hour 0–23, minute 0–59, zone an IANA identifier accepted by `Intl.DateTimeFormat` (1–80 characters).
- `{ kind: 'weekly', weekdays, hour, minute, timeZone }`; weekdays is 1–7 unique integers, Monday=1 through Sunday=7.

```json
{"type":"tool_call","name":"schedule_task","arguments":{"version":1,"title":"Morning overdue review","prompt":"Summarize my overdue tasks without changing them.","schedule":{"kind":"daily","hour":9,"minute":0,"timeZone":"America/Regina"}}}
```

Success: `{ success: true, version: 1, scheduledTaskId, revision, enabled, nextRunAt, executionMode: 'open_page', grantedTools }`; `nextRunAt` is Instant or null when disabled/finished. `grantedTools` is a canonical array of enabled tool names allowed for that schedule. The model cannot grant them in its arguments; the service derives them from the human's request/current settings and obtains user selection where scope is unclear. Default scheduled jobs are read-only; write jobs require an explicit human grant with a visible description.

`list_scheduled_tasks` requires version; optional cursor/limit (1–20, default 10). Return `{success:true,version:1,items,nextCursor}`. Each item contains ID, title, prompt, schedule, enabled, revision, nextRunAt, and `lastRunStatus` (`never`, `running`, `completed`, `failed`, `missed`, `needs_attention`); null cursor means end. `delete_scheduled_task` requires version, ID, expectedRevision and returns ID plus `status:'deleted'`. Human Pause/Resume and Run now call services using expected revisions. Run now returns a run ID and `status:'queued'`, not a claim of completion.

## UI and timing rules

Show human-readable recurrence, time zone, next due time, last outcome, and the open-page limitation on each schedule. Enable/Pause maps to enabled; Edit replaces the stored schedule; Delete tombstones it; Run now enqueues one occurrence. A permission summary lists the granted operations. Input forms use native date/time/weekday controls and clarify ambiguous natural-language dates through `request_user_input`.

Interpret daily/weekly times in their saved zone, not the device's changed zone. Define DST deterministically: nonexistent wall time runs at the first later valid instant that day; repeated wall time runs once at its first occurrence. Implement a tested local-calendar conversion routine or a supported native Temporal API behind detection; do not assume Date can parse IANA wall times directly. No new runtime dependency is required, but unsupported zones/conversion must fail clearly.

For relative requests use [current date/time grounding](current-date-time.md): read a fresh device clock sample and preserve the accepted source message's timestamp/zone. “In 30 minutes” anchors to when the instruction was accepted, not when model processing finishes. Link the application-owned resolution receipt to the concrete saved schedule. If delay makes the target past, ask for the intended time rather than shifting it silently. A scheduled occurrence uses its saved [agent configuration](agent-library.md) reference plus current hard eligibility/permission restrictions; a required execution approval holds unattended work as needs_attention.

The schedule service captures the creating thread's agentId/configurationRevision as application-owned metadata; the model cannot choose a more permissive library agent through schedule arguments. The human schedule editor may explicitly change that binding while idle with a revision check. If its referenced configuration is unavailable, hold needs_attention instead of substituting the latest/default agent.

On opening/resuming, detect missed occurrences and mark them missed. Version 1 never catches up by silently running old writes. Offer one human-initiated Run now, then compute the next occurrence. While open, recheck against wall-clock time after visibility changes; timers are hints, not exact guarantees. Prevent overlapping executions; coalesce an occurrence already claimed/running. One-off definitions become finished after their accepted occurrence.

## Runtime, storage, and model guidance

Use `schedules.js` plus the queue service, with stable occurrence keys `(scheduleId, scheduledInstant)`, revision/lease checks, and a durable run link. A job starts in a fresh thread/run with current capabilities intersected with its saved grants. Do not load unrelated chat history or auto-resume a pending human question: mark needs_attention with a link to answer later. Disabling the scheduling tool stops agent edits; disabling execution or revoking its grants also holds affected jobs. Cancelling an active occurrence does not delete future recurrence.

Description: “Schedule work only when the human asks you to act later or repeatedly. Use explicit local time/zone. State the returned next time and open-page limit. Creating a schedule does not mean it has run. Do not broaden its tool grants or replace a task due date.” List/delete descriptions must distinguish definitions from task records.

Persist definitions/occurrence receipts in IndexedDB and sync through the future API. Until server arbitration exists, one designated device owns execution; other devices show schedules without executing them. Backend/cloud execution is a future mode requiring separate design, not implied by this spec.

## Acceptance

Test DST boundaries, changed device zones, clock jumps, suspension/reopen, missed runs, one-off completion, overlap, duplicate claims, revocation, and mutation permission checks. Scripted jobs must remain within saved grants and never falsely report future execution. UI tests cover readable zone/time, pause/delete/revision conflicts, Run now status, and needs_attention. Do not create real schedules while testing the specification.
