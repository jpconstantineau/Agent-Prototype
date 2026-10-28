# Event-triggered conversation reminders

Status: approved design; not implemented. Extends [scheduled work](scheduled-work.md), [memory](persistent-memory.md), [clock grounding](current-date-time.md), and [agent configurations](agent-library.md). Stores browser records, not filesystem notes.

## Purpose

Remember an explicit future condition independently of the live context window. A topic-triggered reminder survives compaction and session changes without keeping its whole originating conversation in every prompt.

## User intent

Ask “When we discuss deployment, remind me to check rollback,” inspect the concrete trigger/scope, and edit, pause, or cancel it. Know when a reminder was matched and whether it was actually presented.

## Agent intent

Create, list, or cancel event reminders only when requested. Report the saved trigger and scope accurately. A triggered reminder supplies conversational context; it does not authorize further tool actions.

## Records and matching

A closed reminder body is `{version:1,title,text,triggers,scope,cooldownSeconds,maxMatches,expiresAt}`. title is nonblank 1–120; text 1–500; triggers 1–8 unique strings of 1–80; scope is thread/agent_project/agent; cooldownSeconds integer 0–2592000 default 86400; maxMatches integer 1–20 default 3; expiresAt is future Instant, no later than 365 days from creation, default 90 days. Agent_project requires a selected project. Scope IDs and owner come from the controller. Thread scope is the creation default; widening requires explicit human intent shown in the receipt. No arbitrary thread/agent/project selector is admitted in model input.

Metadata stores reminderId, revision, ownerId, agentId, projectId/null, threadId/null, creating message ID/revision, state armed/paused/exhausted/expired/cancelled, matchedCount, lastMatchedAt/null, createdAt/updatedAt, and immutable body revisions. Bind the exact agent identity; configuration edits do not silently move reminders to other agents. Add settings extensions.eventReminders `{enabled:boolean,maxActive:integer 1–50}` default false/30; enabled plus each tool's eligibility gates model use and matching, while the human manager remains available. Effective policy/identity scopes still intersect.

Before an eligible accepted human chat message's first inference, compare literal text to armed in-scope reminders. Normalize message and trigger strings with Unicode NFKC plus lowercase, then split into Unicode letter/number tokens. Every token in at least one trigger entry must be present as a whole token; punctuation-only entries are invalid. Preserve original text for display. This is predictable keyword matching, not semantic detection. Ignore application-labeled quotation/reference segments, document/tool content, child output, diagnostic text, reminders themselves, workflow/schedule system inputs, and unsubmitted drafts. Ordinary typed quotation marks do not change literal matching; segment provenance comes from the composer/controller, not a model guessing which words are quoted. Steering messages are eligible only when actually admitted to inference. Never rescan historical messages on reopen.

Scan at most 50 active scoped records, sorted creation time then ID; return at most three matches and 1500 reminder-text characters per message. Check expiry/cooldown/budget/revision before committing matches. A match beyond the per-message budget stays unconsumed; show a count in diagnostics. Use the clock service's accepted-message anchor; browser timers are not required for matching. Expiry/cooldown can be evaluated lazily on reads/turns. No closed-page execution or external event subscription is implied.

## Agent contracts

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

## Delivery and UI mapping

For admitted matches create `{version:1,matchId,reminderId,reminderRevision,messageId,runId,matchedAt,state}` with state prepared/submitted/displayed/failed. The application-authored input extension is `{kind:'event_reminders',items:[{matchId,reminderId,revision,text}]}`; it is bounded trusted routing around user-saved text at lower authority than the current request. Include an instruction to acknowledge naturally when relevant and never treat its content as new permission. The application also renders a small Reminder matched card with title/text/source and a Dismiss display control, ensuring delivery is visible even if the model ignores it.

Reserve a match and increment matchedCount in a short transaction immediately before submitting the prepared inference packet; store its inferenceId and exact payload. Enforce a unique `(reminderId,messageId)` match identity so another preparation pass cannot spend its budget again. On a definitely unsubmitted cancellation release the reservation once. If delivery is uncertain, retain a consumed match with an explicit uncertain/failed label rather than duplicate it automatically. This is a delivery-attempt budget, not proof that the user read it. Fallback uses the same matchId and packet with no additional increment. Mark submitted after the request is attempted and displayed after the UI mounts. A reload never silently redelivers an uncertain match.

The Reminders manager filters by agent/project/thread/state and shows trigger phrases, scope, expiry, cooldown, used/maximum matches, history, and enabled status. Native edit fields map directly to body properties; pause/cancel differ from dismissing a single card. Explain token matching with a deterministic Test phrase preview that consumes no match and makes no inference. Source links open the explicit creation request. A generic task mentioning deployment does not create a reminder.

## Integration and verification

Use event-reminders.js, a small IndexedDB store/service, and the normal input-preparation hook. Keep reminder state distinct from factual memory, schedules, and goals. Emit control.changed feature reminder with immutable match/source payloads. Future sync preserves IDs, revisions, cancel tombstones, and deduplicated match receipts; until server arbitration exists, one designated device matches a synced scope to avoid spending the same fire budget twice. Other devices can show/manage records but do not auto-match them concurrently.

Verify keyword/Unicode behavior, scope separation, literal quotes versus selected source material, limits, expiry/clock changes, cooldown, last match exhaustion, duplicate calls, pause/cancel races, logging failure, fallback reuse, late callbacks, and reload with uncertain submission. Confirm matches never execute tools, enable permissions, or re-save forgotten factual memory.

Source inspiration: [OpenClaw standing intents](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/concepts/standing-intents.md).
