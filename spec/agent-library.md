# Saved agent library and configuration revisions

Status: approved specification. The library is the user-facing container for the existing [tool/skill settings](capability-controls.md), [skills](skills.md), [permissions](execution-permissions.md), and context/runtime settings. It introduces no agent-facing configuration-write tool. Uses [history](threads-and-history.md), [subagents](subagents.md), and [observability](observability.md).

## Purpose and actors

Save named configurations such as Planner or Document reviewer and start conversations with a selected configuration. A configuration is data for the harness: instructions, capability choices, permission behavior, and supported runtime limits. It is not a live model, a conversation, a skill, an application identity, or a remote-model API credential. Multiple threads can use one revision without sharing model context.

The human creates, duplicates, edits, saves, archives, exports/imports, and deletes configurations. Agents may be told their active name/revision and effective capabilities; they cannot create configurations, switch roles, alter permissions, or pick a more permissive agent on their own. Choosing a configuration does not start inference until the user sends a request. Manual task management continues when local AI is unavailable.

## Record contract

Store agentId:ID, owner/workspace, current revision, createdAt/updatedAt, archived/deletion state, and immutable revision bodies. The editable closed body requires these fields:

| Field | Definition |
| --- | --- |
| `version` | Integer 1 |
| `name` / `description` | Nonblank 1–80 / text 0–400 characters; duplicate names allowed, identity is agentId |
| `instructions` | Plain text 0–4000; user-authored role instructions below application rules |
| `roles` | Closed object with main and subagent role settings described below |
| `runtime` | Closed object of the supported settings below |

A role contains `{tools,skills,permissions}`. tools and skills are arrays of at most 100 unique `{id,mode}` records; tool IDs are exact registry names and skill IDs are stored skill identities. mode is inherit/disabled/include/discover. Missing entries inherit the existing global/role policy. permissions uses the exact [execution-permissions](execution-permissions.md) contract; main and subagent are independent settings. This contains references to skill bodies, not duplicated SKILL.md text.

Resolve global and existing main/subagent policy first. A library configuration can deny or change exposure of an already eligible capability, but cannot enable a global/role-disabled capability. Include/Discover only applies inside that eligible set. Then apply thread restrictions, parent scope, and assignment/schedule grants. An explicit disabled entry at any applicable hard ceiling wins. The role preview explains why a saved entry is ineffective; never silently discard it and imply it is active. Main and subagent contexts/admissions are computed independently.

runtime is a closed object requiring:

- mainMaxCalls: integer 1–12, default 12. Smaller per-agent limit; no increase beyond the shared harness ceiling.
- childMaxCalls: integer 1–6, default 6. Existing parent aggregate/queue ceilings still apply.
- subagentsEnabled: boolean default false; cannot enable a globally disabled delegate_task or relax read-only v1 children.
- offloading: `{enabled:boolean,inlineMaxChars:integer 1000–6000}`, defaults false/4000 until the human enables retrieval and this feature; [large-result](large-tool-results.md) limits and retrieval dependency remain authoritative.
- compaction: `{enabled:boolean,triggerRatio:number,targetRatio:number}`; defaults true/0.70/0.45, require 0.50 <= triggerRatio <=0.75 and 0.25 <= targetRatio <=0.50 and targetRatio < triggerRatio. Reserve at least 20% for reply/next exchange. Existing two-attempt/maintenance ceilings remain.

Enforce defaults during explicit creation/migration, not silently on malformed imports. Turning off compaction/offloading means the run stops when context cannot fit; it never disables browser/model limits. Tool eligibility controls richer forms, visualizations, questions, schedules, and discovery; do not add redundant switches that disagree with those settings. Logging is a harness service with its own retention controls, not a tool an agent can disable.

Version 1 uses the app's existing text-first Chrome LanguageModel options and capability detection. It does not allow arbitrary cloud model names, temperature/topK, provider secrets, responseSchema overrides, or API endpoint configuration. Add supported Chrome options only through a versioned browser adapter and current definitions; website and extension options may differ. Native model identity/version is recorded as available or Unknown, not invented from an agent name. Attachments keep their own detected modality/session requirements.

## User service contracts and UI mapping

These are direct application services, not model tool calls:

| Operation | Closed input | Result |
| --- | --- | --- |
| Create | `{body}` | `{agentId,revision:1,status:'saved'}` |
| Save | `{agentId,expectedRevision,body}` | `{agentId,revision,status:'saved'}` |
| Start conversation | `{agentId,revision}` | `{threadId,agentId,configurationRevision}` without starting inference |
| Apply to idle conversation | `{threadId,expectedThreadRevision,agentId,configurationRevision}` | `{threadId,configurationRevision,status:'applied'}` after safe rebuild |
| Archive/delete | `{agentId,expectedRevision}` with separate command names | `{agentId,revision,status:'archived'|'deleted'}` |

Domain failures use `{success:false,code,error}` as elsewhere. Validate body, referenced registry/skills, bootstrap dependencies, budgets, and owner before committing. Duplicate creates a new ID and revision 1; it does not share editable identity. Imports are bounded <=64000 serialized characters and strictly validated; an imported ID cannot overwrite another configuration. Unknown tools/skills are shown as unresolved/Disabled until the human maps and enables them through Settings. Imports never silently install code or connectors. Reject schema versions that cannot be safely interpreted.

The library lists name, description, updated time, effective tool/skill counts, and permission summary; search by name/description with pagination. A New/Duplicate editor provides Instructions, Tools, Skills, Permissions, Runtime, and a computed Effective settings preview. Use textareas, labeled selects, native checkboxes, and clear inherited/blocked indicators. Save includes expectedRevision; unsaved drafts never become active. Show Include context costs and discovery dependencies before Save. A Test action opens a clearly labeled new test thread under the same real permissions; it does not imply writes are simulated. A separate dry-run tool sandbox is not part of this spec.

No configuration body contains credentials or browser handles. Export omits ownership/auth/runtime secrets and includes portable known IDs plus descriptions for human mapping. Keep source instructions inspectable with ordinary safe text/Markdown views. Imported descriptions/instructions never become markup or authority automatically.

## Binding, updates, and prompt assembly

At thread creation save agentId and an immutable configuration revision snapshot/reference. At run start record the snapshot, current global/role policy revisions, preference revision, actual eligible/admitted tools, and exact skill revisions loaded. Skill bodies are resolved to current approved revisions at run preparation; changing a loaded skill invalidates/rebuilds sessions as required by the skills spec. Historical logs retain which version actually ran. Never reconstruct an old run using today's skill body and call it the original prompt.

Editing a library entry affects new threads. Existing threads visibly retain their selected revision until the user chooses Apply latest/change agent while idle. Before Save, show this scope explicitly; a library edit alone is not an immediate revocation of already bound permissions. Global/role disable and thread restrictions remain immediate hard revocations across all revisions. Provide an “Also apply to this conversation” action after stopping/finishing its run; applying broadens permissions only by explicit human action, never through background sync.

On Apply, validate current eligibility/permissions, persist the new binding, and build a replacement model session at a safe boundary with its current configuration. Preserve conversation history and exact operation receipts. Do not reuse an old privileged system prompt or assume clone() removes old instructions. If the replacement cannot fit or be created, leave the previous binding active and show failure; do not claim the new agent applied. Hold pending forms/approvals until answered/cancelled before switching. Deleting a library entry prevents new selection but retains historical snapshots for existing threads; a user can archive or separately revoke capabilities if work must stop.

Prompt assembly order is application rules/protocol, current effective policy and runtime facts, active agent role instructions, explicit user preferences, eligible Include skills, necessary discovered content, then bounded conversation context. All lower-priority configuration must obey application policy. Inference stores only the bounded active material; full drafts/snapshots remain in IndexedDB. Fail clearly when required Include content or instructions cannot fit; do not truncate and claim the configuration is active.

## Subagent configurations

An agent's subagent role settings are the default container for child exposure and permission controls. Optionally the human may designate one saved library revision as a child template through a separate binding `{parentAgentId,parentRevision,childAgentId,childRevision}`. At most one template in v1; no automatic role routing or model-selected library search is introduced. Reject self/cyclic delegation configurations; children never spawn grandchildren.

delegate_task keeps its original wire contract. The controller selects the configured template (or parent's subagent role), combines its role instructions with the bounded assignment, and intersects child settings with global subagent policy, parent eligibility, explicit allowedTools/allowedSkills, and read-only v1 restrictions. Parent/child execution permission policies combine restrictively. A template cannot add tools, skill access, writes, or larger budgets outside those intersections. Log parent and child configuration revisions and show them in the child card. Main instructions/history are not automatically copied into a child context.

## Storage, integration, and acceptance

Add agent-config-store.js, agent-config.js validators/resolver, and a library/editor view. IndexedDB stores metadata, immutable revisions, and drafts separately from threads/logs. Default retain 20 unreferenced revisions; pinned thread/run/child bindings remain available under explicit history retention rules. Deleting a configuration is a tombstone, not deletion of its conversations or documents. Future API sync validates owner, revision, references, and conflicts; concurrent permission edits require review rather than a permissive union. Live admissions and browser support do not sync as configuration facts.

Migrate the existing app to a visible Default agent retaining its five tool behavior and existing app instructions. Existing custom preferences remain preferences; do not silently move them into agent instructions. All newly added capabilities remain Disabled until enabled. Record migration/default versions so future tools do not become enabled merely because a profile was saved earlier.

Test migration, create/duplicate/archive/delete, revision conflicts, config-versus-thread scope, malformed imports, unknown skills/tools, Include budget failures, discovery bootstrap, and explicit Apply rollback. Verify an automatic child template cannot escape the parent's read-only/grant limits. Browser tests cover library selection, unsaved draft separation, reload, and the exact configuration shown for a run. Log actual assembled instructions/configuration references for troubleshooting without claiming access to Chrome's hidden internal prompt.
