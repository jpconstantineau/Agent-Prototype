# Capability exposure, discovery, permissions, and phases

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Define one policy path from capability eligibility to model visibility and exact-call execution. Grouping these controls prevents Include, discovery, approval levels, and Plan/Act from becoming conflicting permission systems.

## User intent

Enable or disable tools and skills, decide what is included or discoverable, select permission levels, and switch between research and execution while seeing why an operation is allowed, waiting, or denied.

## Agent intent

Discover and describe only eligible tools, then call admitted definitions under the current execution policy and phase. The agent cannot enable tools, approve itself, change phase, or widen its role/resource grants.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Capability controls](#feature-capability-controls) | Human and harness | Own Disabled/Include/Discover settings and hard revocation across every transport. |
| [Tool discovery](#feature-tool-discovery) | Agent; harness admission | Search eligible definitions and build the bounded action schema. |
| [Execution permissions](#feature-execution-permissions) | Human and dispatch gate | Decide Automatic/Ask/Denied for each otherwise eligible exact call. |
| [Plan and Act modes](#feature-plan-act-modes) | Human and harness | Apply a phase effect ceiling and optional phase-specific inference route. |

## Integration and delivery

Use one canonical registry and policy resolver. Evaluate eligibility and resource/role ceilings, apply phase restrictions, construct the admitted catalog, and enforce the exact-call execution decision at dispatch and commit. A permitted discovery result never supplies approval, and Include never means Automatic.

Plan is an independent domain-effect ceiling even when the optional permission layer is disabled. Preserve the narrowly documented team-bookkeeping exception; it cannot authorize domain writes or grant generic children team tools. Manual user controls retain their own application-owned authority.

Implement policy before discovery or phase routing. Settings UI may share an effective-policy preview, while each feature retains its own closed contract, switch, and state. Recheck current revocations after generation and before effects; configuration snapshots do not freeze obsolete permission grants.

<a id="feature-capability-controls"></a>

## Capability controls

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). This is an application policy feature, not an agent tool that changes its own permissions.

<a id="feature-capability-controls-purpose"></a>

### Purpose

Give the human explicit control over which tools and skills an agent may access and which definitions or instructions occupy context. Separate eligibility from Include/Discover exposure so a small context window does not require unrestricted access.

<a id="feature-capability-controls-user-intent"></a>

### User intent

Enable, disable, or change exposure for tools and skills globally and for main/subagent profiles, with a clear preview of the effective restrictions.

<a id="feature-capability-controls-agent-intent"></a>

### Agent intent

Read effective capabilities through capabilities_read and use only eligible, admitted tools and allowed skills. The agent cannot change these settings, enable itself, or treat discovery as permission.

<a id="feature-capability-controls-purpose-and-authority"></a>

### Purpose and authority

Give the human a clear Settings panel for tool/skill eligibility and context exposure, separately for the main agent and subagents. Each entry has Disabled, Include, or Discover mode. Include forces an eligible tool definition or skill body into its session; Discover loads it only on demand. Neither mode authorizes an otherwise forbidden action. Disabling `complete_item` for agents does not stop the human checking off a task manually. Skill content never grants tool permission.

Agents may read their effective capability names through `capabilities_read`; there is no agent-facing policy-write, enable, disable, or approve tool. They can explain a missing capability and link to Settings without applying the change. Future automation/API clients must obey the same policy boundary.

The [agent library](agent-configuration.md#feature-agent-library) holds named configuration revisions containing narrower role-specific exposure settings. They cannot enable a capability forbidden here. [Execution permission levels](capability-policy.md#feature-execution-permissions) separately decide Automatic/Ask/Denied for an otherwise eligible admitted call; Include never means approval. Library edits affect new bindings; global/role revocation here remains immediate across existing snapshots.

<a id="feature-capability-controls-policy-model-and-defaults"></a>

### Policy model and defaults

Persist a revisioned user policy with global tool/skill modes and two separate role profiles, `main` and `subagent`. Profile entries are `inherit`, `disabled`, `include`, or `discover`; global modes omit inherit. Global Disabled is a hard prohibition. For globally eligible entries, an explicit role mode replaces its global exposure default; Inherit uses that default. A thread may further deny tools/skills but cannot enable a global/role-disabled entry. A child also intersects its parent's eligible set and its explicit task grants. Missing entries use versioned defaults, not “all future tools enabled”.

| Mode | Discoverable metadata | Full context initially included | Eligible to execute/load |
| --- | --- | --- | --- |
| disabled | No | No | No |
| include | Yes | Yes, if otherwise eligible under actor/task scope | Yes, under normal execution checks |
| discover | Yes | No; admit/load on demand | Only after required admission/loading |

Eligibility and session admission are distinct. A parent can delegate a globally/profile-eligible read tool that is Discover but not yet admitted in its own session if it has first obtained the exact definition/metadata through authorized discovery. Child admission is independently computed from its subagent profile; copying the parent's active schema is incorrect. A parent's disabled capability cannot become usable indirectly through a more permissive child profile.

Keep the current five task tools in Include mode for the main role on upgrade to preserve established behavior. New capabilities/skills start Disabled until the human chooses Include or Discover. Subagents default to eligible reads only, further narrowed by their task grants; task/document writes and escalation tools remain unavailable in v1 regardless of profile display. Migrate any stored booleans explicitly: false -> Disabled, true tools -> Include, true skills -> Discover (matching the prior on-demand load design). Unknown entries default Disabled. Record policy schema/default versions.

A skill is eligible only if load_skill is not Disabled, its resolved role mode is not Disabled, and actor/scope grants allow it. Include preloads its approved body before first inference and on required session rebuilds; Discover exposes metadata/body through list_skills/load_skill. Supporting resource bodies are always on demand. Skill Include requires all forced bodies to fit the active skill/context budgets; fail session preparation with a clear Settings action instead of silently omitting or truncating one. list_skills controls catalog access independently; an explicitly known eligible skill may still load when listing is off. read_skill_resource requires both skill eligibility and its own tool eligibility/admission. Disabled metadata never leaks through discovery.

<a id="feature-capability-controls-contracts-and-ui-mapping"></a>

### Contracts and UI mapping

Human policy input is `{expectedRevision,scope,toolChanges,skillChanges}`. scope is `global`, `main`, or `subagent`; each changes object contains known names/IDs and valid mode strings, at most 100 entries each. Global mode values are disabled/include/discover; role mode values also permit inherit. Thread restrictions use `{threadId,expectedRevision,deniedTools,deniedSkills}` with unique known names/IDs. All objects are closed. Save commits atomically and returns `{revision,scope,effectiveTools,effectiveSkills,affectedSessions}` with modes, not booleans. Conflicting synced revisions preserve user choices for comparison.

Agent `capabilities_read` requires `{version:1}` and returns `{success:true,version:1,policyRevision,profile,tools,skillsAvailable,browserLimitations}`. profile is main/subagent; tools is a sorted array of at most 100 `{name,mode:'include'|'discover',admitted:boolean}` entries eligible for this actor, not hidden/disabled names. skillsAvailable is an eligible count, not secret skill metadata. browserLimitations is 0–5 fixed application messages up to 200 characters. This read does not itself admit/load anything.

```json
{"type":"tool_call","name":"capabilities_read","arguments":{"version":1}}
```

Settings has Global/Main agent/Subagents scope tabs and labeled selects or radio groups for each mode, with exact name, short description, effective value, and inherited/default indicators. Skills show name/revision plus independent modes. Explain Include as “Always in context” and Discover as “Available on demand”, not “optional permission”. Global Disabled and parent restrictions visibly constrain child settings. Show forced-context budget estimates, bootstrap dependencies, and why an entry is ineffective. Offer Reset and reviewable Save; no agent-writable Allow all. Disabling capabilities_read does not hide human Settings.

<a id="feature-capability-controls-enforce-in-generation-execution-and-sessions"></a>

### Enforce in generation, execution, and sessions

Derive eligible and admitted model catalogs from one canonical registry. Only Include and explicitly admitted Discover definitions enter the current responseSchema; [tool discovery](capability-policy.md#feature-tool-discovery) defines bootstrap and dynamic admission. Validate output against its captured catalog snapshot, then recheck effective policy/admission before dispatch and at writes. Existing WebMCP task registration reflects externally allowed task capabilities; internal Include/Discover exposure is not a new grant to external callers. Execution gates apply even to stale external references.

If policy changes during inference, increment a generation/policy token, invalidate stale output, and rebuild or stop before another dispatch. If a write already committed, keep its receipt; revocation does not undo history. A pending unaccepted proposal/question/delegate requiring a removed capability is cancelled or held with an explicit state, not auto-approved. Stop child/scheduled work whose effective grants were revoked. A parent's later enabling does not automatically expand a running child or an existing schedule grant.

Removing a skill from a loaded session or changing instruction-related policy requires a bounded session rebuild because an earlier prompt cannot simply be erased. Do not restore disabled content through compaction summaries, branches, preferences, or history replay. Historical records stay readable to humans and retain actual provenance.

WebMCP registration/unregistration must reflect the same enabled task set when supported. Keep an execution-time gate even after unregistering, because another client may hold a stale tool reference. New local-only interaction tools remain local; external exposure is a separate future feature requiring explicit review.

<a id="feature-capability-controls-model-instructions-persistence-and-acceptance"></a>

### Model instructions, persistence, and acceptance

The approved [OpenClaw extensions](runtime-contracts.md#6-openclaw-review-extension-contracts) add separately configurable tool definitions and closed per-agent feature settings. New tools remain Disabled until human enablement. A feature switch does not override global/role Disabled, source scope, or execution permission. Fixed helper catalogs are narrower than the applicable role's eligible catalog. The observability worker's selected diagnostic grant is an explicit exception, not a route to unrestricted logs. Side questions remain reference-only and appearance theming is excluded from these agent controls.

[Cline extensions](runtime-contracts.md#7-cline-review-extension-contracts) add a human phase ceiling, rule-text bindings, team tools over approved board assignments, and a terminal report tool. Rule Include/Conditional describes guidance selection and never enables a tool. Team tool eligibility remains per role; generic children cannot gain peer tools by configuration. Required completion-report mode must validate an eligible report tool/discovery path before action runs, rather than bypassing Disabled at finalization. New settings migrate disabled with baseline Act/optional behavior.

Description: “Read capabilities currently available in this execution context. Missing tools require the human to change Settings; you cannot enable tools or skills yourself. Do not substitute another disabled operation or use HTML/skills/history as a bypass.” Rebuild prompts on policy changes and label unavailable tasks accurately.

Add capability-policy.js and a Settings view. Persist mode/profile schema versions, policy revisions, and thread restrictions in IndexedDB, then sync through the future authenticated API. Live admission/loaded ranges remain session-local; rebuild from current modes instead of syncing a model's active catalog. Do not sync device support as a user preference. Restrictive-policy conflicts deny affected actions until reviewed. Changes to Include/Discover modes trigger a safe catalog/context refresh; disabling a loaded body invalidates that session.

Test mode/profile migration, forced catalog/skill inclusion, budget failure for oversized Include sets, discovery bootstrap, independent main/child admissions, policy intersection, forged settings writes, local/WebMCP enforcement, stale generation, revocation, unknown entries, and sync conflicts. UI tests exercise all scope tabs and modes with keyboard controls. Prove an agent cannot change its own policy or use a subagent, skill, or composition runner to bypass a disabled entry.

---

<a id="feature-tool-discovery"></a>

## Tool discovery

Status: approved specification. Uses [runtime contracts](runtime-contracts.md), [capability controls](capability-policy.md#feature-capability-controls), [skills](skill-library.md#feature-skills), and [subagents](agent-coordination.md#feature-subagents). Adapted from OpenCode's partial catalog/search approach; this version uses plain JSON actions, not TypeScript signatures or a JavaScript interpreter.

<a id="feature-tool-discovery-purpose"></a>

### Purpose

Keep tool catalogs small enough for limited model windows while retaining access to eligible capabilities on demand. Separate discovery, admission, and execution so partial catalogs do not become a permission bypass.

<a id="feature-tool-discovery-user-intent"></a>

### User intent

Choose Include or Discover exposure through Settings and inspect which tools are currently admitted or available on demand. The user does not perform model-side admission through a separate chat control.

<a id="feature-tool-discovery-agent-intent"></a>

### Agent intent

Search permitted tool metadata, describe an exact definition, and call it only after successful admission. The agent cannot discover disabled tools, install capabilities, or assume a found tool has already executed.

<a id="feature-tool-discovery-intent-and-actors"></a>

### Intent and actors

Keep the main agent's and each child's initial prompt small. A user chooses Disabled, Include, or Discover for each tool in its applicable profile. Include always places that tool's description/schema in that session's generation catalog; Discover makes an eligible tool available through discovery but initially omits its full schema. Neither mode bypasses dispatch permissions. Disabled tools are absent from both discovery and execution.

Expose agent-facing `search_tools` and `describe_tool`. Human Settings controls exposure. Tool discovery cannot install code, change settings, enable a disabled tool, or import external MCP definitions. Existing five task tools need not become discoverable unless the user changes their mode.

<a id="feature-tool-discovery-catalog-and-contracts"></a>

### Catalog and contracts

Every definition has exact `name` (1–80), short description (1–240), JSON `inputSchema`, optional namespace (LocalID), `definitionRevision: Revision`, and classification (`read`, `write`, `interaction`, `maintenance`). The host stores full descriptions of up to 1200 characters; search returns only the short description. Every schema must use the supported validator vocabulary and have a closed object at its root. A schema's serialized form is capped at 12000 characters, with depth 12 and 100 total property nodes; unsupported/oversized definitions are unavailable, not partially advertised.

`search_tools` requires `version:1`; optional `query` (0–120, default empty), `namespace` (LocalID), `cursor:Cursor`, `limit` (integer 1–10, default 5). It searches exact names, descriptions, and registered namespaces of eligible tools. Empty query browses a page. Literal terms, no regex or model-generated SQL. Result:

```json
{"success":true,"version":1,"catalogRevision":3,"items":[{"name":"thread_search","description":"Find relevant passages in saved conversations.","definitionRevision":1,"mode":"discover","admitted":false}],"nextCursor":null}
```

Search does not admit every result. `describe_tool` requires version, exact `name` (1–80), and `expectedDefinitionRevision`. It returns `{success:true,version:1,catalogRevision,name,description,inputSchema,definitionRevision,status:'admitted'}` only after validation, permission checks, and successful context budgeting. Stale definitions return conflict; inaccessible/disabled definitions expose no hidden schema. Repeated description of the same admitted revision returns status `already_admitted` and metadata, omitting duplicate description/schema. Schema changes invalidate admission even if the name remains the same.

```json
{"type":"tool_call","name":"describe_tool","arguments":{"version":1,"name":"thread_search","expectedDefinitionRevision":1}}
```

<a id="feature-tool-discovery-dynamic-structured-output-mapping"></a>

### Dynamic structured-output mapping

Keep two host-owned sets: **eligible definitions** allowed by effective policy and **admitted definitions** exposed to this session. Before each call to `session.prompt`, derive its `responseConstraint` from admitted definitions plus the existing final-answer branch. Initially admit Include tools and enabled discovery bootstrap tools. When describe_tool succeeds, persist its result, add its exact validated definition to the session manifest, and build the next call's schema. Only then may the model emit that discovered tool's action.

Do not keep the original `AgentLoop.schema` fixed for the entire run. Update `agent.js` to obtain a catalog snapshot at each inference boundary and bind emitted output to its policy/catalog revisions. Revalidate again at execution. No tool request outside that captured schema may be executed just because it is globally installed. If policy changed while a call was in flight, discard stale output before dispatch.

Definitions enter both the next constrained schema and a concise application-authored catalog-update observation, so the model knows exact names/arguments. This requires no native Prompt API tools option or new system prompt mid-session. On rebuilding a session, restore Include definitions first and only still-needed eligible discovered definitions from its manifest; do not reload every tool ever discovered in the thread.

<a id="feature-tool-discovery-budgets-bootstrap-and-ui"></a>

### Budgets, bootstrap, and UI

Default maximum eight discovered admissions per session in addition to included tools. Measure actual context impact including response schemas and the definition-result observation; at most two discoveries per current task should normally suffice, but the hard run inference limit remains authoritative. If no room remains, return budget_exceeded without an admitted status. Do not evict an Include tool silently. Offer compaction/rebuild that drops unused discoveries, or a user change to the profile.

If any tool is set to Discover, enabled search_tools and describe_tool must be included as bootstrap definitions. Settings must show and validate this dependency; refuse an unusable save or offer to include them explicitly. Do not silently grant a user-disabled bootstrap tool. Compaction itself may run as controller maintenance without giving the agent a disabled request_compaction tool.

In Settings show exposure mode and role. In chat show small Discovered/Loaded definition activity entries with exact names, never a fake permission approval. A tool panel can list admitted and available-on-demand entries separately. Human inspection of catalog metadata does not count as an agent admission or inference.

<a id="feature-tool-discovery-model-presentation-and-acceptance"></a>

### Model presentation and acceptance

Descriptions: “Search currently permitted tools by purpose. Read short results, then describe the exact tool to make its schema available. Discovery cannot enable disabled capabilities. Do not guess names or call tools that have not been admitted.” Describe says: “Load this exact tool definition for the next model step. This does not execute it.”

Implement `tool-catalog.js` with policy filtering/snapshots, two local executors, and session-manifest integration. Test disabled visibility, missing bootstrap, revision conflicts, context failures, repeated admissions, changing schemas, stale generation, and distinct main/child manifests. Script a search -> describe -> real call and prove that the real call is invalid before admission and valid after it. Verify fallback/manual Daylist controls work when discovery is off.

---

<a id="feature-execution-permissions"></a>

## Execution permissions

Status: approved specification. This is user-facing agent configuration enforced by the harness, not a model tool for granting itself authority. Uses [capability controls](capability-policy.md#feature-capability-controls), [agent library](agent-configuration.md#feature-agent-library), [proposals](work-lifecycle.md#feature-proposed-plans), and [observability](diagnostics.md#feature-observability).

<a id="feature-execution-permissions-purpose"></a>

### Purpose

Decide when an eligible tool operation may run automatically, must wait for exact-call approval, or is prohibited. This gives different agents appropriate autonomy while keeping approvals tied to concrete arguments and current policy.

<a id="feature-execution-permissions-user-intent"></a>

### User intent

Choose permission levels and overrides, inspect a proposed tool call, and allow it once or deny it with optional feedback.

<a id="feature-execution-permissions-agent-intent"></a>

### Agent intent

The agent does not act through this spec to configure permissions or approve calls. It submits ordinary tool requests, waits when the harness requires a human decision, and respects the actual denial or execution outcome.

<a id="feature-execution-permissions-separate-eligibility-exposure-and-execution"></a>

### Separate eligibility, exposure, and execution

The [Plan/Act extension](capability-policy.md#feature-plan-act-modes) adds a conversation phase ceiling before this optional approval layer. Plan denies domain mutations even with enabled:false or automatic, and switching to Act restores only otherwise eligible operations. Team coordination's narrow local bookkeeping exception is explicit in [its spec](agent-coordination.md#feature-agent-team-coordination); these write tools still obey this layer's read_only/ask/deny rules. A rule, phase prompt, model route, or teammate message cannot grant authority or approve an operation.

Disabled/Include/Discover answers whether a tool is eligible and how its schema enters context. Permission levels answer whether an eligible admitted operation is prohibited, requires human approval, or may run automatically within the current human request. Approval never enables a disabled tool, admits an undiscovered schema, broadens record scope, or overrides the read-only subagent limit. Manual user controls remain independent of agent permissions.

Store permissions inside each saved agent configuration, with separate main and subagent settings. A thread binds a configuration revision; a child also intersects its parent's restrictions and explicit assignment grants. The model sees a compact effective-policy explanation but cannot edit settings. Agent/skill instructions are lower-priority configuration content, not executable policy.

<a id="feature-execution-permissions-settings-contract-and-levels"></a>

### Settings contract and levels

Permission settings are a closed `{enabled,level,overrides}` object. enabled is boolean; level is one of read_only, confirm_writes, confirm_all, automatic. overrides is up to 100 unique `{tool,rule}` objects; tool is a known exact registry name 1–80 and rule is ask or deny. Missing overrides means an empty array only when migrating an older record; new saves require the field. No wildcard, unknown name, model-generated policy, or override that bypasses a level's denial is accepted.

| Level, when enabled | Read operations | Write/destructive/unknown operations |
| --- | --- | --- |
| `read_only` | Automatic unless explicitly ask/deny | Denied; no approval button can override |
| `confirm_writes` | Automatic unless explicitly ask/deny | Ask before execution |
| `confirm_all` | Ask | Ask |
| `automatic` | Automatic unless explicitly ask/deny | Automatic unless explicitly ask/deny |

enabled:false disables this optional approval layer and treats its level/overrides as dormant. Base capability rules, current-request authorization, v1 child restrictions, and mandatory human reviews still apply. Label this “Additional execution approval off,” never “No permissions.” On upgrade preserve the five existing main task tools' behavior with enabled:false. New user-created configurations default enabled:true with confirm_writes for main, read_only for subagents. Do not silently change the approval behavior of an existing saved configuration. The UI always previews the effective result.

The application registry supplies effect (`read`, `write`, `destructive`, `unknown`) separately from existing tool classification (`read`, `write`, `interaction`, `maintenance`). Persistent audit/log/cache writes inside a read tool are harness maintenance and do not make the underlying domain read a write. Never trust a remote tool's self-declared read label as proof; the future MCP adapter must apply reviewed metadata or unknown. Unknown defaults to gated under confirm_writes and denied under read_only.

Interaction tools such as questions, richer forms, preferences proposals, and proposed task batches retain their own human submission/review lifecycle. They are not subjected to a preliminary generic approval merely to display a question. Controller maintenance (context accounting, offloading, compaction) follows its own policy and limits. Agent-requested maintenance follows its enabled capability and explicit override deny; ask overrides are supported only for domain-operation tools and rejected for interactions/controller-only features. Settings explains those exemptions. This prevents recursive permission questions.

Combine enabled permission policies from applicable parent and child configurations and any human thread restrictions: deny is strongest, then ask, then automatic. A disabled optional layer contributes no additional restriction; it cannot cancel another applicable layer. Per-tool deny always wins within an enabled layer; ask can only tighten an otherwise permitted operation. Schedules retain saved grants and apply current execution restrictions; an unattended run requiring approval stops needs_attention rather than silently approving itself.

```json
{"enabled":true,"level":"confirm_writes","overrides":[{"tool":"document_replace","rule":"deny"},{"tool":"thread_read","rule":"ask"}]}
```

<a id="feature-execution-permissions-dispatch-and-approval-contract"></a>

### Dispatch and approval contract

After action/schema validation and capability admission checks, resolve target identity, read expected revisions when required, and evaluate permissions. Denial returns the common failed result with code permission_denied and changes nothing. Asking creates a browser-owned approval record before the domain tool is invoked. No tool call has executed merely because an approval card exists.

The closed approval record contains approvalId, revision, owner/thread/run/actor references, callId, toolName, definitionRevision, immutable validated arguments, configurationRevision, effectivePolicyRevision, createdAt, expiresAt, and status. Status is pending, allowed, denied, cancelled, expired, stale, or executed. Default expiration is ten minutes, measured against a monotonic deadline while the page lives; store the UTC deadline for display/recovery. Recovered pending records are interrupted/stale, never automatically allowed.

The human submits `{approvalId,expectedRevision,decision:'allow_once'|'deny',reason?}`. reason is optional plain text 1–500 for deny and forbidden for allow_once. There is no model-facing approval tool, fabricated user answer, approval via a generated form, or session-wide “Allow everything” button. Broader automation behavior is changed deliberately in the agent configuration UI.

```json
{"approvalId":"approval-1","expectedRevision":1,"decision":"allow_once"}
```

The service returns to the UI `{accepted:true,approvalId,status}` or `{accepted:false,error,code}`. Accepted Allow means the one-use approval was recorded, not that the tool succeeded. Recheck active run/signal, policy/definition revision, ownership, record versions, and exact arguments immediately before invocation. A changed argument, stale target, or policy change invalidates approval and requires a new decision or a fresh tool call. The approval record and callId bind exact arguments, never just the tool name or label. The executor, not the model, resumes that frozen call once.

The waiting agent tool promise settles with its actual tool result after execution. Deny/expiration returns `{success:false,code:'permission_denied',error}`. For this failure only, the application tool-result observation additionally carries approvalDecision: `{approvalId,decision:'deny'|'expired',reason:string|null}`; reason is the exact accepted human text up to 500 characters or null. Keep the ordinary result/error closed and store the same decision in audit events. This labeled decision data cannot authorize unrelated work. Stop rejects AbortError and does not make another model call. Repeated Allow clicks cannot repeat the domain call: persist one-use consumption and call state. Domain writes still require their idempotency receipt; a consumed approval alone does not prove a write committed.

<a id="feature-execution-permissions-ui-and-lifecycle"></a>

### UI and lifecycle

Agent settings presents an enable switch, a labeled level select with the behavior table, main/subagent scope, and per-tool Ask/Deny overrides. Show inherited parent/global constraints and effective Automatic/Ask/Denied for each operation. Saving uses the agent revision precondition and shows affected conversations. A permission configuration can never include browser credentials or origin storage handles.

An approval card shows the actual tool name, acting main/child agent, target identities, all validated arguments, and domain before/after where available. The preview derives from application data; a model-supplied summary cannot hide arguments. Use plain text or the safe renderer. Long values are expandable and inspectable before Allow; do not silently truncate the reviewed value. Place Allow once and Deny outside model-generated content. Deny optionally expands a reason field. Show expiry and decided/executed/failed status separately.

Use the controller's single blocking interaction slot. The run remains pending while the human decides; waiting consumes no inference steps. The final-step rule forbids opening a gate requiring a continuation beyond the run budget. A queued approval does not queue a second model inference. Teardown releases listeners, marks cancellation, and prevents stale cards from resuming a new run. After Allow, an already committed write survives a subsequent Stop; show its receipt.

A proposed task batch's explicit Apply is already an exact approval of its frozen operations, so do not ask twice. At Apply evaluate current eligibility and hard denials for every operation. Where the permission policy requires approval, the validated Apply interaction satisfies it only for those exact operations and revisions. Preference Accept and other human-only saves similarly cannot be performed by an agent. Structured question/form answers are never equivalent to these application-owned approvals.

Composition v1 stays read-only. An inner read that needs approval uses the same gate with the composition/step identity visible, rather than bypassing it. Exclude human waiting time from its five-second active-execution budget and extend composition's cancellation state accordingly. No thread may have both a pending composition approval and another active interaction. If this integration is unavailable, reject such a composition before executing its first step and direct the agent to ordinary single read tools.

<a id="feature-execution-permissions-integration-and-acceptance"></a>

### Integration and acceptance

Add permission-policy.js and an approval broker/view around domain dispatch, before the current executor invokes native/local task services. Gate every agent transport, not just one chat renderer. External WebMCP callers require an identified controller/approval host for gated calls; otherwise deny them, never expose approval-free execution through a fallback. Dedicated manual app controls do not use this agent gate.

Keep approval state and events in IndexedDB with run/call correlation and exact operation receipts. On reload inspect persisted call state; do not replay an uncertain write. Sync copies audit/configuration records through the future authenticated API, but another device cannot consume an in-page pending approval without a separate arbitration design. In v1 approvals are decided on the originating live page only. No live promise, DOM state, or implicit grant is synced.

Test all levels/enable states/overrides, policy intersection, new-tool unknown effects, Disabled/Discover barriers, stale arguments/revisions, malicious summaries, deny/expiry, duplicate clicks, Stop races, crash after consumption, and mutation receipt recovery. Verify question/form/proposal interactions avoid recursive or duplicate approval and that read-only children remain read-only under automatic mode. Log decisions and actual outcomes distinctly.

---

<a id="feature-plan-act-modes"></a>

## Plan and Act modes

Status: approved design; not implemented. Extends [agent configuration](agent-configuration.md#feature-agent-library), [execution permissions](capability-policy.md#feature-execution-permissions), [proposals](work-lifecycle.md#feature-proposed-plans), [model routes](local-model-endpoint.md), and [context management](context-management.md#feature-context-compaction). Uses browser-owned policy and vanilla JavaScript; no Cline runtime dependency.

<a id="feature-plan-act-modes-purpose"></a>

### Purpose

Give the user an explicit research/planning phase that prevents domain changes while an approach is being clarified. A separate Act phase can execute the chosen task under existing permissions. Independent phase routes let a stronger local model plan work that Nano can later execute within its smaller context.

<a id="feature-plan-act-modes-user-intent"></a>

### User intent

Explore and refine a request in Plan mode, inspect the proposed approach, and deliberately switch to Act when ready. Return to Plan when more clarification is needed and understand which model and capabilities are active.

<a id="feature-plan-act-modes-agent-intent"></a>

### Agent intent

Follow the active phase and its admitted tool catalog. In Plan, read permitted evidence, ask questions, and present an approach. In Act, fulfill the current authorized request through normal tools. The agent cannot switch phases, broaden grants, or treat a mode change as approval for arbitrary operations.

<a id="feature-plan-act-modes-distinction-from-existing-specs"></a>

### Distinction from existing specs

Agent-library settings are the saved baseline for a named agent. Execution permissions determine which eligible operations are denied, require approval, or can execute automatically. A progress plan displays steps, and a proposed task batch freezes exact changes for review. Plan/Act is a temporary conversation phase layered over those settings; it neither rewrites the saved configuration nor replaces exact-call approvals.

Plan's read-only ceiling applies even if execution-permissions.enabled is false or level is automatic. Selecting Act removes only that additional phase restriction. It does not enable Disabled tools, select a new project, approve a pending batch, publish a skill, start a schedule, or send a new user request. Direct human editing controls remain usable under their own explicit human services.

<a id="feature-plan-act-modes-configuration-and-binding-contract"></a>

### Configuration and binding contract

Add closed agent setting extensions.planAct `{enabled:boolean,defaultPhase:'plan'|'act',planModelRouteId:ID|null,actModelRouteId:ID|null}`. Migration defaults false/act/null/null preserve current behavior; offer Plan as a deliberate default for new profiles. Null route inherits the applicable main-role route. Routes are human-configured device-local references, not provider URLs/secrets in the agent body. Invalid or unresolved routes follow existing visible fallback rules, never another agent's credentials.

When enabled, persist thread phase `{version:1,phase:'plan'|'act',revision:Revision,changedAt:Instant}` and an immutable transition receipt. With the feature disabled the effective phase is act under normal policy, and no misleading mode switch is shown. A newly enabled feature on an existing thread requires explicit Apply while idle; do not retroactively claim prior work ran in Plan. Save phase/configuration references in run and session snapshots.

Human setPhase input is closed `{threadId,expectedThreadRevision,expectedPhaseRevision,phase}`. Success `{success:true,threadId,threadRevision,phase,phaseRevision,transitionId,status:'applied'}` follows successful replacement preparation and binding commit. Domain failures use shared codes. No model tool or WebMCP registration is introduced. Only the user can change phase; an assistant's prose recommendation or a button drawn in generated HTML is not a transition command.

<a id="feature-plan-act-modes-phase-effect-policy"></a>

### Phase effect policy

| Operation | Plan | Act |
| --- | --- | --- |
| Task/document/attachment/history reads | Allowed only within current grants and normal approvals | Same |
| Questions, progress updates, structured completion | Allowed within their existing lifecycles | Same |
| Tool/skill discovery and approved skill loading | Allowed, with unchanged budgets and source scope | Same |
| Scoped read-only helpers/recall/processing/diagnosis | Allowed if independently enabled and granted | Same |
| Task/document/memory/preference/skill writes, reminder/schedule/goal creation/reporting, board mutations, suggestions | Denied to the agent | Normal current-request and permission rules |
| Pipeline execution or routed worker dispatch that could write | Denied | Normal pipeline/board admission rules |

Logging, immutable result persistence, context compaction/pruning, and run-progress bookkeeping are harness state, not domain mutations. A Plan conversation can discuss a prospective task-change batch, but propose_plan's Apply path cannot bypass the Plan ceiling; prepare an exact batch only after Act or through an explicit human-owned draft service. Team coordination has the narrowly documented bookkeeping exception in [team coordination](agent-coordination.md#feature-agent-team-coordination); it grants no domain writes or extra workers. Generic unknown-effect tools are denied in Plan. Maintain a reviewed per-tool effect/purpose registry, not a model's self-declared safe flag.

For denied writes return permission_denied with a short explanation and an app-owned Open mode control; do not execute a substitute tool. A child or team work attempt inherits the parent's Plan ceiling, and a saved Act configuration cannot override it. A schedule/pipeline already independently authorized before this thread's phase change retains its own scope, but no background work can claim this foreground thread's phase as its authority. Stop all remains the explicit way to stop separately running work.

<a id="feature-plan-act-modes-transition-and-prompt-assembly"></a>

### Transition and prompt assembly

Allow a transition only at an idle/safely settled boundary with no executing tool, undecided form/approval, or unresolved child. For a busy thread show Stop and switch or Wait until finished, without claiming the change is immediate. Recheck current policy and pending state after awaits. Prepare the candidate phase catalog/instructions/route, measure required context, then atomically commit the phase/thread revision and receipt before activating the session generation. On failure keep the old phase active and show why.

Inject an application-owned phase packet `{version:1,phase,phaseRevision,phaseAuthority:'human',configurationRevision}` into session setup. Plan instructions say: “Investigate and clarify using permitted reads. Produce a useful approach. Do not change saved domain records or change mode. A proposed plan is not executed work.” Act instructions say: “Carry out the current authorized request under effective permissions. Reuse planning evidence, verify current revisions before writes, and do not repeat settled operations.” Both preserve the normal tool_call/final action schema and exact receipt semantics.

Carry the exact latest human request and accepted constraints, selected plan, necessary references, and prior operation receipts across the transition. A stronger planner's entire transcript may exceed Nano's window. Use existing bounded compaction with the exact constraints/manifest retained, then measure the Act session's actual contextWindow. If required material cannot fit, show a smaller-context/model choice; do not silently drop conditions or assert Nano read the full plan. The host enforces read-only behavior independently of prompt quality.

Changing phase or route does not reset main/child/helper/goal/pipeline counters. A user must explicitly Continue/send a request after switching; setPhase alone performs no inference or tool execution. An explicitly labeled Switch to Act and continue action is one human command containing both choices, using the same settled-boundary checks and current task snapshot. Returning to Plan invalidates unstarted write approvals and prepared write actions; it never reverses committed changes.

<a id="feature-plan-act-modes-ui-storage-and-integration"></a>

### UI, storage, and integration

Show native Plan/Act segmented controls beside the composer, a current phase/model badge, and a short capabilities explanation. Mode selection is separate from per-agent permission settings. Settings exposes default phase and optional phase-specific routes with effective-policy previews. The plan handoff view links exact plan/evidence, unresolved questions, chosen Act model, and measured/unknown context. Ordinary simple requests can start directly in Act when selected by the user.

Persist bindings/transition receipts in IndexedDB and emit control.changed feature phase with actual human attribution. Compaction, fallback, reopening, steering, and diagnostic views preserve the exact phase revision. Reload restores the phase but starts no work. Sync durable phase selection with expected revisions; another device must resolve routes/current policy locally and cannot resume merely because an Act selection arrived. Public exports omit endpoint details and credentials.

Implement phase-policy.js and phase-controller.js around the shared scheduler, registry, and session manager. Tests must prove Plan blocks writes across chat, helpers, composition, team/board/pipeline entry points, and externally exposed agent transports; manual controls remain explicitly human. Cover mode/config conflicts, candidate preparation failure, pending interactions, Stop, stale approvals, no inference on selection, local-planner-to-Nano handoff, unknown effects, and no budget reset.

Sources: [Cline Plan/Act docs](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/docs/core-workflows/plan-and-act.mdx), [SDK presets](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/sdk/packages/core/src/extensions/tools/presets.ts), and [extension toggle](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/apps/vscode/src/core/controller/state/togglePlanActModeProto.ts). Cline's CLI/core permits guarded shell investigation in Plan; this browser design has no shell and uses its own stricter domain-effect ceiling.
