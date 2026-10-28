# User controls for tools and skills

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). This is an application policy feature, not an agent tool that changes its own permissions.

## Purpose

Give the human explicit control over which tools and skills an agent may access and which definitions or instructions occupy context. Separate eligibility from Include/Discover exposure so a small context window does not require unrestricted access.

## User intent

Enable, disable, or change exposure for tools and skills globally and for main/subagent profiles, with a clear preview of the effective restrictions.

## Agent intent

Read effective capabilities through capabilities_read and use only eligible, admitted tools and allowed skills. The agent cannot change these settings, enable itself, or treat discovery as permission.

## Purpose and authority

Give the human a clear Settings panel for tool/skill eligibility and context exposure, separately for the main agent and subagents. Each entry has Disabled, Include, or Discover mode. Include forces an eligible tool definition or skill body into its session; Discover loads it only on demand. Neither mode authorizes an otherwise forbidden action. Disabling `complete_item` for agents does not stop the human checking off a task manually. Skill content never grants tool permission.

Agents may read their effective capability names through `capabilities_read`; there is no agent-facing policy-write, enable, disable, or approve tool. They can explain a missing capability and link to Settings without applying the change. Future automation/API clients must obey the same policy boundary.

The [agent library](agent-library.md) holds named configuration revisions containing narrower role-specific exposure settings. They cannot enable a capability forbidden here. [Execution permission levels](execution-permissions.md) separately decide Automatic/Ask/Denied for an otherwise eligible admitted call; Include never means approval. Library edits affect new bindings; global/role revocation here remains immediate across existing snapshots.

## Policy model and defaults

Persist a revisioned user policy with global tool/skill modes and two separate role profiles, `main` and `subagent`. Profile entries are `inherit`, `disabled`, `include`, or `discover`; global modes omit inherit. Global Disabled is a hard prohibition. For globally eligible entries, an explicit role mode replaces its global exposure default; Inherit uses that default. A thread may further deny tools/skills but cannot enable a global/role-disabled entry. A child also intersects its parent's eligible set and its explicit task grants. Missing entries use versioned defaults, not “all future tools enabled”.

| Mode | Discoverable metadata | Full context initially included | Eligible to execute/load |
| --- | --- | --- | --- |
| disabled | No | No | No |
| include | Yes | Yes, if otherwise eligible under actor/task scope | Yes, under normal execution checks |
| discover | Yes | No; admit/load on demand | Only after required admission/loading |

Eligibility and session admission are distinct. A parent can delegate a globally/profile-eligible read tool that is Discover but not yet admitted in its own session if it has first obtained the exact definition/metadata through authorized discovery. Child admission is independently computed from its subagent profile; copying the parent's active schema is incorrect. A parent's disabled capability cannot become usable indirectly through a more permissive child profile.

Keep the current five task tools in Include mode for the main role on upgrade to preserve established behavior. New capabilities/skills start Disabled until the human chooses Include or Discover. Subagents default to eligible reads only, further narrowed by their task grants; task/document writes and escalation tools remain unavailable in v1 regardless of profile display. Migrate any stored booleans explicitly: false -> Disabled, true tools -> Include, true skills -> Discover (matching the prior on-demand load design). Unknown entries default Disabled. Record policy schema/default versions.

A skill is eligible only if load_skill is not Disabled, its resolved role mode is not Disabled, and actor/scope grants allow it. Include preloads its approved body before first inference and on required session rebuilds; Discover exposes metadata/body through list_skills/load_skill. Supporting resource bodies are always on demand. Skill Include requires all forced bodies to fit the active skill/context budgets; fail session preparation with a clear Settings action instead of silently omitting or truncating one. list_skills controls catalog access independently; an explicitly known eligible skill may still load when listing is off. read_skill_resource requires both skill eligibility and its own tool eligibility/admission. Disabled metadata never leaks through discovery.

## Contracts and UI mapping

Human policy input is `{expectedRevision,scope,toolChanges,skillChanges}`. scope is `global`, `main`, or `subagent`; each changes object contains known names/IDs and valid mode strings, at most 100 entries each. Global mode values are disabled/include/discover; role mode values also permit inherit. Thread restrictions use `{threadId,expectedRevision,deniedTools,deniedSkills}` with unique known names/IDs. All objects are closed. Save commits atomically and returns `{revision,scope,effectiveTools,effectiveSkills,affectedSessions}` with modes, not booleans. Conflicting synced revisions preserve user choices for comparison.

Agent `capabilities_read` requires `{version:1}` and returns `{success:true,version:1,policyRevision,profile,tools,skillsAvailable,browserLimitations}`. profile is main/subagent; tools is a sorted array of at most 100 `{name,mode:'include'|'discover',admitted:boolean}` entries eligible for this actor, not hidden/disabled names. skillsAvailable is an eligible count, not secret skill metadata. browserLimitations is 0–5 fixed application messages up to 200 characters. This read does not itself admit/load anything.

```json
{"type":"tool_call","name":"capabilities_read","arguments":{"version":1}}
```

Settings has Global/Main agent/Subagents scope tabs and labeled selects or radio groups for each mode, with exact name, short description, effective value, and inherited/default indicators. Skills show name/revision plus independent modes. Explain Include as “Always in context” and Discover as “Available on demand”, not “optional permission”. Global Disabled and parent restrictions visibly constrain child settings. Show forced-context budget estimates, bootstrap dependencies, and why an entry is ineffective. Offer Reset and reviewable Save; no agent-writable Allow all. Disabling capabilities_read does not hide human Settings.

## Enforce in generation, execution, and sessions

Derive eligible and admitted model catalogs from one canonical registry. Only Include and explicitly admitted Discover definitions enter the current responseSchema; [tool discovery](tool-discovery.md) defines bootstrap and dynamic admission. Validate output against its captured catalog snapshot, then recheck effective policy/admission before dispatch and at writes. Existing WebMCP task registration reflects externally allowed task capabilities; internal Include/Discover exposure is not a new grant to external callers. Execution gates apply even to stale external references.

If policy changes during inference, increment a generation/policy token, invalidate stale output, and rebuild or stop before another dispatch. If a write already committed, keep its receipt; revocation does not undo history. A pending unaccepted proposal/question/delegate requiring a removed capability is cancelled or held with an explicit state, not auto-approved. Stop child/scheduled work whose effective grants were revoked. A parent's later enabling does not automatically expand a running child or an existing schedule grant.

Removing a skill from a loaded session or changing instruction-related policy requires a bounded session rebuild because an earlier prompt cannot simply be erased. Do not restore disabled content through compaction summaries, branches, preferences, or history replay. Historical records stay readable to humans and retain actual provenance.

WebMCP registration/unregistration must reflect the same enabled task set when supported. Keep an execution-time gate even after unregistering, because another client may hold a stale tool reference. New local-only interaction tools remain local; external exposure is a separate future feature requiring explicit review.

## Model instructions, persistence, and acceptance

The approved [OpenClaw extensions](runtime-contracts.md#6-openclaw-review-extension-contracts) add separately configurable tool definitions and closed per-agent feature settings. New tools remain Disabled until human enablement. A feature switch does not override global/role Disabled, source scope, or execution permission. Fixed helper catalogs are narrower than the applicable role's eligible catalog. The observability worker's selected diagnostic grant is an explicit exception, not a route to unrestricted logs. Side questions remain reference-only and appearance theming is excluded from these agent controls.

[Cline extensions](runtime-contracts.md#7-cline-review-extension-contracts) add a human phase ceiling, rule-text bindings, team tools over approved board assignments, and a terminal report tool. Rule Include/Conditional describes guidance selection and never enables a tool. Team tool eligibility remains per role; generic children cannot gain peer tools by configuration. Required completion-report mode must validate an eligible report tool/discovery path before action runs, rather than bypassing Disabled at finalization. New settings migrate disabled with baseline Act/optional behavior.

Description: “Read capabilities currently available in this execution context. Missing tools require the human to change Settings; you cannot enable tools or skills yourself. Do not substitute another disabled operation or use HTML/skills/history as a bypass.” Rebuild prompts on policy changes and label unavailable tasks accurately.

Add capability-policy.js and a Settings view. Persist mode/profile schema versions, policy revisions, and thread restrictions in IndexedDB, then sync through the future authenticated API. Live admission/loaded ranges remain session-local; rebuild from current modes instead of syncing a model's active catalog. Do not sync device support as a user preference. Restrictive-policy conflicts deny affected actions until reviewed. Changes to Include/Discover modes trigger a safe catalog/context refresh; disabling a loaded body invalidates that session.

Test mode/profile migration, forced catalog/skill inclusion, budget failure for oversized Include sets, discovery bootstrap, independent main/child admissions, policy intersection, forged settings writes, local/WebMCP enforcement, stale generation, revocation, unknown entries, and sync conflicts. UI tests exercise all scope tabs and modes with keyboard controls. Prove an agent cannot change its own policy or use a subagent, skill, or composition runner to bypass a disabled entry.
