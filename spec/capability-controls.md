# User controls for tools and skills

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). This is an application policy feature, not an agent tool that changes its own permissions.

## Purpose and authority

Give the human a clear Settings panel for enabling/disabling individual tools and individual skills. A tool switch controls agent access, not the availability of the equivalent direct human task control. Disabling `complete_item` does not stop the user checking off a task manually. A skill switch governs discovery/loading and active instruction eligibility; a skill never grants a disabled tool.

Agents may read their effective capability names through `capabilities_read`; there is no agent-facing policy-write, enable, disable, or approve tool. They can explain a missing capability and link to Settings without applying the change. Future automation/API clients must obey the same policy boundary.

## Policy model and defaults

Persist a revisioned user policy with tool-name -> boolean and skill-ID -> boolean choices. A thread may restrict an enabled capability; it cannot enable something globally disabled. The effective set intersects global choice, thread restrictions, actor/schedule/parent grants, installed implementation, and actual browser support. Omitted tool settings use registry-declared defaults, not “all future tools enabled”.

Keep the current five task tools enabled on upgrade to preserve established behavior. Newly implemented capabilities start off until explicitly enabled, with a grouped onboarding explanation available. Skills start disabled until the user enables each one or explicitly imports it with Enable selected. Unknown future tools/skills default disabled. Record defaults/version migration so a newly introduced capability cannot inherit blanket permission accidentally.

A skill is eligible only if the `load_skill` capability is enabled, the skill's own switch is on, and its scope/actor permits it. `list_skills` controls catalog access independently; it may be off while an explicitly known enabled skill can still be loaded. The UI explains this distinction rather than mysteriously failing. `read_skill_resource` needs load eligibility and its own enabled tool switch. Catalog filtering must not leak disabled entries to agents.

## Contracts and UI mapping

Human service input is `{expectedRevision,toolChanges,skillChanges}`; each changes object contains known IDs and boolean values, at most 100 entries each. Thread restrictions use `{threadId,expectedRevision,deniedTools,deniedSkills}` with unique known names/IDs. All objects are closed; no textual tool names from chat can impersonate the Settings identity. Save commits atomically and returns `{revision,effectiveTools,effectiveSkills,affectedSessions}`. If a synced edit changed the revision, return conflict and show both choices.

Agent `capabilities_read` requires `{version:1}` and returns `{success:true,version:1,policyRevision,tools,skillsAvailable,browserLimitations}`. tools is a sorted array of accessible tool names, capped at 100; skillsAvailable is a count, not disabled skill names; browserLimitations is 0–5 fixed application messages of at most 200 characters. No hidden policy fields or credentials enter the result.

```json
{"type":"tool_call","name":"capabilities_read","arguments":{"version":1}}
```

Settings groups tools by purpose with exact name, short human description, enabled state, default indicator, and scope. Skills get name/revision and a separate toggle, with a link to the skill manager. Global off makes corresponding thread/subagent enable controls unavailable; show the reason. Offer Reset to defaults and reviewable Save rather than an agent-writable “allow everything”. Disabling the settings-read tool does not hide human Settings.

## Enforce in generation, execution, and sessions

Derive model descriptions, responseSchema branches, and any WebMCP registration from one filtered catalog. Validate action name/arguments against that schema, then recheck effective policy immediately before dispatch. Services recheck authorization before committed writes. Do not rely only on a model following the prompt or a disabled button.

If policy changes during inference, increment a generation/policy token, invalidate stale output, and rebuild or stop before another dispatch. If a write already committed, keep its receipt; revocation does not undo history. A pending unaccepted proposal/question/delegate requiring a removed capability is cancelled or held with an explicit state, not auto-approved. Stop child/scheduled work whose effective grants were revoked. A parent's later enabling does not automatically expand a running child or an existing schedule grant.

Removing a skill from a loaded session or changing instruction-related policy requires a bounded session rebuild because an earlier prompt cannot simply be erased. Do not restore disabled content through compaction summaries, branches, preferences, or history replay. Historical records stay readable to humans and retain actual provenance.

WebMCP registration/unregistration must reflect the same enabled task set when supported. Keep an execution-time gate even after unregistering, because another client may hold a stale tool reference. New local-only interaction tools remain local; external exposure is a separate future feature requiring explicit review.

## Model instructions, persistence, and acceptance

Description: “Read capabilities currently available in this execution context. Missing tools require the human to change Settings; you cannot enable tools or skills yourself. Do not substitute another disabled operation or use HTML/skills/history as a bypass.” Rebuild prompts on policy changes and label unavailable tasks accurately.

Add `capability-policy.js` and a Settings view. Persist policy revisions and thread restrictions in IndexedDB, then sync through the future authenticated API. Do not sync device-specific browser support as if it were a user preference. Unresolved restrictive-policy conflicts must deny affected actions until reviewed rather than silently enabling them.

Test filtered schemas/prompts, forged settings writes, disabled execution through local/WebMCP paths, stale model responses, mid-proposal revocation, inherited child/schedule restrictions, skill unloading via rebuild, unknown capabilities on upgrade, and sync conflicts. UI tests prove controls are keyboard usable and explain blocked capabilities. An agent must never change its own policy through a skill, proposal, or custom instruction.
