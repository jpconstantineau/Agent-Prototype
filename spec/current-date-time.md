# Current date/time and relative-time anchoring

Status: approved specification. Adds an agent-facing read tool, get_current_datetime. Uses [preferences](preferences.md), [scheduling](scheduled-work.md), [runtime contracts](runtime-contracts.md), and [observability](observability.md). There is no dedicated clock settings panel beyond the existing timezone preference and ordinary tool controls.

## Purpose

Ground relative dates and times in an actual clock reading and the accepted instruction's timestamp. This prevents stale context or processing delays from silently shifting task dates and reminders.

## User intent

The user does not invoke a dedicated clock control through this spec. They express times naturally, such as tomorrow or in 30 minutes, and expect the app to resolve the intended date, time, and timezone correctly.

## Agent intent

Call get_current_datetime when interpreting relative time, refresh stale samples, and preserve the correct instruction or answer anchor. The agent must ask for clarification when the intended time remains ambiguous or has passed.

## Purpose and source of truth

Give the agent a fresh clock observation when the human says “tomorrow,” “in 30 minutes,” “next Friday,” or another relative time. The current app supplies only localDate at request start. Keep that field for compatibility, but also timestamp accepted human messages/answers in application state. A model must not infer the current clock from training data, a previous conversation, or a stale session prompt.

The tool samples the device clock, not an external time service. Capture one Date instance and derive every returned field from it, avoiding inconsistent fields across midnight. Use Date and Intl.DateTimeFormat; no network, geolocation, extension privilege, or native Prompt API tool facility is required. Device time can be wrong: label the source device_clock and do not promise server-authoritative time or cross-device synchronization.

## Input and result contract

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

## Relative-time interaction and anchoring

Description: “Read the current device date/time and effective planning timezone before interpreting relative dates or times. Use the returned sample and the accepted user-message timestamp. Refresh after a long pause. Do not guess the current date or treat a previous sample as permanently current.” Enable/admit it through normal tool controls; it cannot bypass Disabled. If unavailable, the agent requests an absolute date/time or explains the limitation instead of inventing a clock reading.

At acceptance of every user message, question answer, and rich-form answer, the controller records acceptedAt:Instant plus its current effective timezone and preference revision. Keep these facts outside model-generated prose. Add a bounded timeContext envelope to the user request/answered-tool observation with that source-message reference and timestamp. A later get_current_datetime observation shows how much time has passed and whether the zone changed.

Before committing a task due-date or schedule derived from relative wording, the run must have a successful current clock sample obtained for that request, in the applicable zone. Reuse a sample only while <=60 seconds old with no zone/preference change. After a long user/approval wait or page suspension, refresh before interpreting new relative wording or committing a still-relative proposal. Future absolute operations already explicitly reviewed keep their frozen dates; a refresh cannot silently move them.

Interpret “in 30 minutes” relative to when that instruction was accepted, not 30 minutes after a slow model finishes. Add 30 elapsed minutes to acceptedAt; a fresh sample validates that the computed due time is still future. “Tomorrow” uses the calendar day at acceptedAt in the captured planning zone. Relative wording in a newly submitted clarification is anchored to that answer's acceptedAt. The original message and the answer are distinct reference times. Include the resolved concrete time in the user's review/confirmation where the action already has one; do not add an unrelated confirmation to every clear request.

If a pause makes the computed target past, the user explicitly changes timezone, or “next Friday”/“later” remains materially ambiguous, ask for the intended time. Do not reschedule from now or change a saved zone automatically. A clock tool answers “what time is it”; it cannot decide the user's meaning. Duration arithmetic and future local-calendar conversion should be checked by the host service, not accepted solely because the model produced an ISO string.

For relative schedules, extend the schedule creation service with an application-owned resolution receipt: sourceMessageId, acceptedAt, sampleId, sourceText range, resolvedInstant or local calendar fields/zone, and preferenceRevision. The host validates accessibility and consistency, and links the concrete stored schedule. This receipt is not a new model-supplied authorization field or an automatic parser for every natural-language expression. Human review sees the resolved target; source text never becomes code. Task dueDate remains a date string, not a shifted UTC timestamp.

## UI, integration, and acceptance

Show the ordinary read trace with effective zone and sampled time; the inspector links its sampleId and related resolution receipt. A human-readable date accompanies the exact ISO value where useful. A change in device zone does not override a stored preferred zone. Timer execution, missed-run policy, page-open limits, and single-device arbitration remain the scheduler's responsibility.

Add clock.js for single-sample conversion, a small tool adapter, and injected clock/zone providers for deterministic tests. Date.now() records wall timestamps; performance.now() measures durations within the live page. Detect large wall-clock discontinuities between relative-time preparation and commit and require resolution again instead of assuming the device clock remained accurate. Persist observations/time context as events, not mutable global “now.” No cross-device clock synchronization claim is made.

Test one-sample consistency across midnight, preference/device zones, leap days, fractional-hour offsets, DST transitions, local-date correctness, invalid zones, and stale samples. Verify an instruction accepted at 09:00 for “in 30 minutes” resolves to 09:30 even if processed at 09:05; processing after 09:30 must not silently move it to 10:00. Test question/approval pauses, zone changes, Disabled behavior, and a scripted relative reminder flow with an actual clock read before creation.
