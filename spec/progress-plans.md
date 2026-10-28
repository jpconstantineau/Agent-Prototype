# Agent progress plans

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). Inspired by provider `update_plan`/todo events surfaced in T3 Code, not a direct import of provider code.

## Intent and actors

Expose a compact working checklist for multi-step requests. This is an agent-facing `update_plan` tool and a user-facing progress view. Steps describe the agent's work, not saved Daylist tasks. Updating a step never invokes `add_item` or `complete_item`. The human can collapse the view; manual editing of agent statuses is out of scope.

## Contract

`update_plan` replaces the current run's complete plan atomically. Required fields: `version: 1`, `steps` (1–12 entries). Optional `explanation` is text up to 400 characters. Each step is a closed object with required `id: LocalID`, `text` (1–200 characters), and `status` (`pending`, `in_progress`, `completed`, `cancelled`). IDs are unique and at most one step is in progress. No more than 2400 total step-text characters are accepted. Existing IDs retain their meaning; a changed task gets a new ID. Removing a step is allowed only when the explanation says why; the event history retains the old plan.

```json
{"type":"tool_call","name":"update_plan","arguments":{"version":1,"explanation":"First inspect current tasks, then organize them.","steps":[{"id":"inspect","text":"Inspect overdue tasks","status":"in_progress"},{"id":"organize","text":"Organize the relevant tasks","status":"pending"}]}}
```

Return `{ success: true, version: 1, revision, steps }`, with optional `explanation` only if supplied. `revision` is a browser-assigned positive integer scoped to the run. The canonical stored list is returned; unknown fields, duplicate IDs, or multiple active steps fail without replacing it. No caller-supplied run ID or task ID can redirect updates.

## UI mapping

Render a single run-scoped card above the current activity: text labels from `steps[].text`, icons plus text for statuses, and `completed/total` as a progress count. Cancelled steps are counted in total but not completed. Use a native `<details>` for collapse, an `<ol>` for sequence, and a small polite status for changes; avoid re-announcing the entire checklist. Do not show editable task checkboxes. Recommended label: “Assistant progress”. The explanation is optional supporting text, not private reasoning.

Show the same card revision rather than appending a duplicate card per update. Expandable history can reveal accepted revisions. Empty/invalid requests do not erase a visible plan. Agent failure or Stop labels the plan Interrupted and preserves statuses as last reported; the runtime does not falsely mark unfinished steps completed. A final reply with open steps shows an incomplete-plan notice without causing another inference solely to tidy the UI.

## Model presentation and continuation

Description: “Track the work you are doing on the current request. Supply the entire current plan with stable step IDs and no more than one in-progress step. This changes progress display only, not saved tasks. Use for multi-step work; avoid planning a trivial one-step action. Mark a step completed only after its actual work succeeds.”

Include the definition in enabled chat-tool descriptions and `responseSchema()`. After a successful result, the observation says to continue the original request; changing the plan does not satisfy it. A plan step cannot authorize a mutation or substitute for a human-approved proposal. Model calls spent updating the plan count toward the existing run limit, so use few, meaningful updates.

## Storage and implementation

Add `progress-plan.js` for validation/reduction and rendering helpers in a small view module. Route via the composed chat executor in `agent.js`/`app.js`. Persist accepted plan events with thread/run attribution once thread persistence exists. Until then it may be memory-only. A compact current plan can be carried through compaction; the authoritative revision remains in application state.

## Acceptance

Test replacement, stable identity, invalid-status and duplicate-ID rejection, cancellation/finalization, and no task-store mutations. A scripted agent must update progress around a real read or change and cannot claim a task write from a plan-only result. Browser tests cover text safety, collapse, progress announcements, and showing the last accepted revision after interruption. Disabling the tool removes it from generation and dispatch while historical cards stay readable.
