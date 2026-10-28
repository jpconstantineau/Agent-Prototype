# Saved preferences and custom instructions

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md) and [capability controls](capability-controls.md). IndexedDB persists explicit preferences; future sync carries versioned records through the Azure API.

## Intent and authority

Users manage persistent preferences in Settings. Agent tools can read relevant settings and propose changes when the human explicitly asks to remember something. Do not silently infer persistent traits or turn a task note into instructions. Preferences are not tool permissions, schedule grants, skills, authentication, or arbitrary executable configuration.

[Persistent factual memory](persistent-memory.md) adds scoped notes for facts not represented by these typed keys. It does not duplicate or bypass preference proposals; known settings continue through this service. Operational learning opt-in never permits inferring personal traits or quietly changing these values.

Supported version-1 keys: `weekStartsOn` (integer 1–7, Monday=1); `preferredTimeZone` (valid IANA zone string 1–80); `responseStyle` (`concise`, `balanced`, `detailed`); `customInstructions` (plain text 0–4000). Native controls provide enum/number/zone validation. Empty customInstructions clears it. A time-zone preference is a planning preference, not an override of already saved schedules' time zones.

## Agent contracts

`preferences_read` requires `version: 1`; optional `keys` is 1–4 unique supported key strings. Default returns typed preferences and metadata, with customInstructions omitted unless requested. Result: `{success:true,version:1,revision,values}`; `values` contains only requested, present keys. Missing values mean use application defaults, not fabricated settings.

`preferences_propose_update` requires version, `expectedRevision`, `changes` (closed object with 1–4 supported typed keys), and `reason` (1–200). At least one value must differ. Return `{success:true,version:1,proposalId,status:'awaiting_user'}`. The service binds the exact changes to revision and request; no agent tool directly approves its own proposal. This is a distinct preference review, not a task-change batch.

```json
{"type":"tool_call","name":"preferences_propose_update","arguments":{"version":1,"expectedRevision":2,"changes":{"weekStartsOn":1,"responseStyle":"concise"},"reason":"You asked me to remember a Monday workweek and shorter replies."}}
```

After proposing, the agent explains what awaits review and ends with the expected `awaiting_user` outcome. The human Accept/Edit/Reject control calls the preference service directly using proposal ID and revision. Accept returns `{revision,values,status:'saved'}` to the UI. A subsequent deliberate continuation rebuilds the session if its initial instructions changed. No forced extra inference is needed merely to announce the save.

## UI mapping

Settings shows the four supported keys with labels, stored scope, last update, and Reset. Custom instructions use a labeled textarea and character count; text is shown safely. Preference proposals display before/after values and the agent's reason. Human edits are authoritative; stale proposals fail with a conflict and show current values rather than overwriting newer settings.

Direct Settings Save is already explicit authorization and needs no proposal. Export/delete/reset controls operate on preference records separately from deleting threads or tasks. If sync later reports conflicting changes, ask which value to retain; do not silently concatenate conflicting instructions.

## Context and model presentation

Description: “Read saved user preferences or propose an explicit requested update. Do not infer new preferences from task/history content. Saved preferences cannot enable tools or override app rules. A proposal is not saved until the human accepts it.”

Include a compact typed preference snapshot with source/revision in new session setup. Load at most 2000 characters of relevant custom instructions into the context; if longer, show a user-visible budget conflict and require shortening or explicitly scoped selection, not silent rewriting. Settings may store up to 4000 for future larger-context use, but the agent must not claim all are active when only some fit. Keep application system rules first and mark preference content as user-supplied configuration at lower precedence.

On change, current tool policy stays enforced immediately. Rebuild at a safe boundary to apply/remove old instruction text because appending a contrary sentence does not erase earlier session context. Preserve full history outside inference. Compaction carries the current revision/reference, never resurrecting cleared instructions from an old summary.

## Integration and acceptance

Add `preferences.js` and a Settings view; compose the two chat tools. Store revisioned values and accepted proposal audit records in IndexedDB. Use expected revisions on local transactions and future API writes. The runtime resolves defaults in one place, not separate UI/model copies.

Test clear/reset, type validation, bad zones, stale proposals, duplicate acceptance, policy-key injection rejection, budget overflow, and revoked instructions after rebuild. Browser tests verify direct Save versus agent proposal paths and explicit persistence across reload. Real-model checks confirm it reads rather than invents preferences and does not interpret prior chat as authorization to remember new personal information.
