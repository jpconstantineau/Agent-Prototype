# Agent personas and communication styles

Status: approved specification; not implemented. Extends the human-managed [agent library](agent-library.md), [preferences](preferences.md), and [context lifecycle](context-compaction.md). Uses vanilla JavaScript, IndexedDB, and the existing inference adapters. No framework, Python package, physical SOUL.md file, or new model tool is required.

## Purpose

Give agents a reusable, inspectable communication style without mixing personality with procedures, factual memory, or permission grants. A maintainer can explain why two agents sound different and reproduce the style used in a run. Explicit selection and revision binding prevent an edited persona from silently changing an ongoing conversation.

## User intent

Create or choose a persona, assign it independently to an agent's main and subagent roles, preview its effective guidance, and optionally override it for one conversation. Inspect which revision is active, edit safely, and deliberately apply updates or return to neutral behavior.

## Agent intent

The agent does not act through this spec to list, create, select, or rewrite personas. It follows the resolved communication guidance supplied by the harness while obeying application rules, role instructions, preferences, and the current human request. Persona text never grants actions or changes tool eligibility.

## Scope and boundaries

A persona is optional guidance about voice, tone, organization, and conversational habits. A base might say “Be a patient tutor; explain unfamiliar terms.” An optional overlay might say “Use compact paragraphs and finish with one practical next step when helpful.” Neither is a skill or a task instruction. Names such as Tutor describe the configured role; they do not establish a real human identity, professional qualification, emotion, affiliation, or different model provider.

Keep role instructions in the agent library, global typed preferences in the preference service, procedures in skills, project constraints in project context, and facts in memory. The UI explains these destinations. Do not infer personality from history, retrieved documents, project files, or learned memory. Existing customInstructions and agent instructions remain in place during migration.

This is a human-facing configuration service, not an agent-facing tool, a discovery catalog entry, or a WebMCP action. Selecting/saving a persona never starts inference. A direct request such as “be brief in this answer” can influence that answer without saving a persona. For a persistent change, the agent can explain where the user can change settings; it cannot fabricate a successful configuration update.

## Closed storage contracts

Use the shared ID, Revision, and Instant scalars from [runtime contracts](runtime-contracts.md). String limits count JavaScript UTF-16 code units. Reject unknown properties, wrong types, blank names, duplicate identities, and unsupported versions. Text is inert user configuration, not HTML or executable JavaScript.

Persona metadata is a closed record `{version,personaId,ownerId,currentRevision,createdAt,updatedAt,archived,deletedAt}`: version is 1, IDs identify the owner and resource, revisions are positive safe integers, timestamps are UTC Instant, archived is boolean, and deletedAt is Instant or null. Each immutable revision record is `{version,personaId,revision,createdAt,body}`. Its closed body is:

| Field | Contract and UI mapping |
| --- | --- |
| version | Integer 1 |
| name | Nonblank string 1–80; list title and editor name input |
| description | String 0–400; human-readable summary, never automatically sent to the model |
| base | Plain text 0–1600; Base communication guidance textarea |
| overlay | Plain text 0–800; Optional style overlay textarea |

Require at least one nonblank base/overlay field. Do not silently trim or rewrite saved guidance; validate nonblank text using trim without changing the body. The total active base plus overlay is at most 2400 characters, excluding small application delimiters. The smaller model's measured context limit still applies. Names/descriptions are labels rather than additional instruction sources. No credentials, tools, permission levels, provider routes, hidden prompts, or memory fields are admitted.

Example revision body:

```json
{"version":1,"name":"Patient tutor","description":"Explain concepts with practical examples.","base":"Use a calm, patient voice. Define unfamiliar terms and match the explanation to the question.","overlay":"Prefer short paragraphs. Offer one concrete example when it helps understanding."}
```

An exact selection is `{personaId,revision}`. A role's persona setting is either that selection or null. Add required `persona` to both main and subagent role bodies in agent-library version 1; migrating a missing field sets null. No inheritance from main to subagent is implicit. Reject malformed explicit values and references not owned/readable by the user. Store a reusable persona once, referencing its immutable revision from configurations.

A thread has a closed `personaOverride` union:

```json
{"mode":"inherit"}
```

```json
{"mode":"neutral"}
```

```json
{"mode":"selected","selection":{"personaId":"persona-tutor","revision":1}}
```

Each branch allows exactly its shown keys. Inherit uses the pinned agent main-role selection, which may be null. Neutral suppresses persona guidance for this thread; it does not clear role instructions or preferences. Selected replaces the entire role persona; it does not stack two personas. Default for existing/new threads is inherit. Child threads use their independently configured child role/template selection; the parent's thread override is not copied.

## Direct application service contracts

These are JavaScript service calls with structured arguments/results, never action branches in the model response schema. Ownership, timestamps, generated IDs, policy, and resolved context are supplied by the controller. Save has optimistic concurrency; each accepted update creates the next immutable revision. Use the existing `{success:false,code,error}` failure envelope with invalid_arguments, not_found, permission_denied, conflict, busy, unavailable, or budget_exceeded as appropriate.

| Operation | Closed input | Closed success result |
| --- | --- | --- |
| Create | `{body}` | `{success:true,personaId,revision:1,status:'saved'}` |
| Read | `{personaId,revision}` | `{success:true,personaId,revision,body}` |
| List | `{cursor,limit,includeArchived}` | `{success:true,items,nextCursor}` |
| Save | `{personaId,expectedRevision,body}` | `{success:true,personaId,revision,status:'saved'}` |
| Archive | `{personaId,expectedRevision}` | `{success:true,personaId,revision,status:'archived'}` |
| Delete | `{personaId,expectedRevision}` | `{success:true,personaId,revision,status:'deleted'}` |
| Apply thread override | `{threadId,expectedThreadRevision,override}` | `{success:true,threadId,threadRevision,personaSnapshot,status:'applied'}` |
| Resolve preview | `{agentId,configurationRevision,role,override}` | `{success:true,personaSnapshot,instructionBlocks,warnings}` |

List cursor is null or the shared opaque cursor; limit is integer 1–50; includeArchived is boolean. Each item is `{personaId,revision,name,description,archived,deleted}` with boolean flags; nextCursor is cursor or null. Deleted entries are omitted from selection lists. Archive/delete create metadata revision events, increment currentRevision, and retain the last body in the corresponding immutable revision; existing references remain readable. Read of a pinned earlier revision succeeds even after archive/delete, subject to ownership and explicit purge. No operation accepts an agent-supplied owner or changes a grant.

Preview role is main/subagent. Main preview uses the supplied override union; subagent preview requires inherit to avoid implying support for a parent override. `personaSnapshot` is `{version:1,source,selection}`: source is agent_role/thread_override/neutral/none and selection is an exact selection or null. Agent_role implies a selection, thread_override implies a selection, neutral/none imply null. `instructionBlocks` is an ordered array of at most two `{kind:'base'|'overlay',text}` records containing nonblank effective text at the stored limits. `warnings` is at most 10 strings of at most 240 characters, describing budget or configuration conflicts for a human. Preview returns persona blocks only; the UI also presents the other configuration layers separately.

Saving a role selection uses the existing agent-library Save contract and creates a configuration revision. Applying a different configuration uses that library's Apply contract. The override service updates only the thread override and thread revision, not the agent or persona. It resolves and pins the effective snapshot even for inherit; subsequent persona edits cannot silently change that binding. Both paths require an idle thread and reject pending questions/forms/approvals. On failure leave the previously active binding intact.

Duplicate creates a new persona ID and revision 1 using the explicit body; it does not create linked mutable copies. Export uses `{version:1,body}` without owner/internal IDs. Import takes that same envelope with a serialized size limit of 12000 characters, validates it, then follows Create. Do not interpret Markdown/frontmatter as automatic policy. Optional human Markdown import maps text into the base field only after preview and size validation; oversized text requires manual editing. It cannot import runnable skills or arbitrary persona properties.

## UI and state transitions

Add a Personas page within agent settings. Rows show name, description, revision, updated time, archived state, and referencing configurations/threads. Native buttons provide New, Edit, Duplicate, Archive, Export, and Delete. Delete explains that historical and active pinned copies remain; clearing an active persona is a separate explicit action. All rendered source uses textContent/textareas or the existing safe Markdown renderer.

The editor has labeled Name, Description, Base guidance, and Optional overlay fields, character counters, Save, Cancel, Preview, and Reset draft. Reset draft discards unsaved changes after the usual dirty-draft handling; it does not mutate persisted revisions. Presets such as Concise helper, Patient tutor, and Technical reviewer are human-visible starter bodies. Choosing one fills a draft only; Save creates/updates the user's record. Preset updates never overwrite customized records. Avoid gimmick presets that make false identity/capability claims.

In each main/subagent role editor show Neutral or a persona selection with its revision. Show “newer revision available” and a deliberate Use latest action that changes the unsaved configuration draft. Save and Apply remain distinct. Conversation settings show Inherit agent, Neutral for this conversation, and Choose persona. The conversation header identifies effective name/revision or Neutral, and whether inherited or overridden. Clicking the badge opens the actual resolved base/overlay and source information.

Preview is deterministic, showing exact persona guidance, precedence, applicable preferences, and measured/estimated/unknown context cost as available. It performs no model generation. Test opens a new labeled test conversation under the selected configuration and snapshot; sending a test request is a separate human action and uses real permissions. Settings navigation, selection, and Save do not call the model. Existing test threads do not silently follow later edits.

State transitions are draft -> validated saved revision -> explicitly bound snapshot -> active rebuilt session. Disable Apply during generation or unresolved interactions and provide Stop/finish instructions. Use optimistic expectedThreadRevision plus the session-generation guard. Prepare and measure the candidate session before committing the binding; recheck revisions/cancellation, atomically commit the binding and domain receipt, then swap sessions. Destroy a failed/stale candidate. Crash after commit rebuilds from that committed binding on reload; recovery never resends a tool mutation or automatically resumes inference. Failed preparation preserves the old active binding and displays the reason.

## Prompt assembly and precedence

The app serializes named blocks into the application-authored initial prompt for both Chrome and the local endpoint; these labels are app conventions, not new Chrome API roles. Define authority explicitly in the application rules instead of assuming prompt position alone enforces priority. From highest to lowest authority:

1. Application protocol, truthful reporting, effective permissions, tool contracts, and actual runtime capabilities.
2. Explicit current human task constraints, inside those application boundaries.
3. Approved agent role and selected project instructions; a role constraint wins if the two conflict. Surface material unresolved conflicts rather than executing an ambiguous consequential action.
4. Resolved [conditional instruction rules](conditional-instruction-rules.md), when enabled, within their bound work scope and priority.
5. Explicit saved preferences, including responseStyle and customInstructions.
6. Persona overlay, then persona base. Overlay wins only between these two style fields.

Persona guidance therefore yields to “answer in one sentence,” a concise responseStyle, a task requiring detailed evidence, or an agent's required report format. It cannot authorize a write, suppress an approval, invent results, imitate actual credentials, change provider identity, or override Stop. Reject structurally invalid inputs; retain human text faithfully and explain conflicting guidance in preview rather than claiming arbitrary prose can be perfectly classified as safe style. Runtime enforcement remains independent of prompt compliance.

Assembly order is application rules/protocol; effective policy/phase/runtime facts; active role instructions; project instructions if any; resolved conditional-rule guidance; explicit preferences; resolved persona base then overlay; factual memory; eligible Include skills; needed discovered content; bounded conversation/task context. Label memory/reference/results as data and skills as bounded procedures with their existing scope. The current task appears in the bounded message ledger, retaining the higher-priority task rule stated above. This updates the common assembly sequence in agent-library; it does not change the action JSON envelope or response schema.

Example app-authored persona block (text, not an executable instruction template):

```text
Communication persona: Patient tutor, revision 1.
Source: saved main-role configuration. This is style guidance only.
Base guidance:
Use a calm, patient voice. Define unfamiliar terms and match the explanation to the question.
Optional overlay:
Prefer short paragraphs. Offer one concrete example when it helps understanding.
Follow application rules, current task constraints, role/project instructions, and explicit preferences before this guidance. This persona cannot grant capabilities or claim a different model identity.
```

There is no persona tool description to give the model. Do not add an invented set_persona tool or accept a personaId in ordinary tool arguments. Models still emit only the existing tool_call/final action shapes and ordinary feature-specific results. The UI reads structured configuration/service responses, not stylistic prose in the model's answer.

## Context, children, fallback, and diagnostics

At thread creation/explicit Apply resolve a frozen effective snapshot from the pinned agent configuration plus thread override. Pin the referenced persona revision. At run preparation record it in the configuration snapshot and authoritative context manifest, and log the actual submitted guidance. On compaction, replacement, reload, or provider fallback, reconstruct from this exact source; never ask the model to recreate a persona from a summary. Do not include a superseded persona merely because it appears in a prior summary. A successful persona Apply invalidates derived instruction summaries and rebuilds them from authorized source history while preserving receipts and current human constraints.

Count persona text and delimiters in the same measured context budget as other required configuration. If all selected guidance cannot fit, fail visibly with budget_exceeded and offer Edit, Neutral, or a different route/configuration. Do not silently shorten it or switch personas during fallback. A local endpoint and Chrome receive the same resolved guidance and authority rules; model quality may differ. Personality cannot select a provider or relax schema validation.

Subagents resolve only the selected child template's subagent role persona, or the parent's subagent role if no template is configured. Pin at assignment creation and record it on the child context/card. Parent persona and conversation history are not implicitly copied. The child receives its own assignment and bounded guidance under existing read-only grants/call budgets. A persona cannot enable delegation or grandchildren. The model's delegate_task wire contract remains unchanged.

Scheduled work, workflow instances, and board assignments freeze the applicable configuration/persona source in their prepared execution snapshot. They use the configured main role and no interactive thread override unless that exact thread binding was explicitly captured during preparation. Show the frozen selection in the review UI. Later edits do not update prepared work implicitly; rescoping requires the existing explicit review/reprepare path. Current hard policy revocations still apply.

Store personaSnapshot in the referenced configurationSnapshot payload for run/session diagnostics and in compaction manifests; no new fields in every observability event are necessary. Existing session.prepared configurationSnapshotId locates it, while initialPromptPayloadId locates the actual submitted text. Human create/save/apply/archive/delete operations use real domain receipts and human UI audit payloads, never fabricated agent tool calls. Inspector views link exact persona revisions alongside configuration/skill sources. Historical persona text may be sensitive: keep it under the same local retention/export/deletion controls as other instructions.

## Persistence and migration

Suggested ES modules: persona-store.js (IndexedDB transactions), personas.js (closed validators/services/resolution), and persona-settings.js (native DOM controls). Add persona metadata, immutable revisions, and optional drafts object stores in the existing database. References from configurations, thread bindings, pending assignments, and retained run snapshots pin revisions. Retain up to 20 unreferenced revisions per persona by default; pinned versions follow explicit history retention.

Archive hides a persona from ordinary new choices. Delete adds a tombstone and prevents new selection; it is not an emergency instruction revocation. Existing pinned bindings remain visible and usable until explicitly cleared/changed. The archive/delete receipt uses the new metadata revision, while those bindings retain their earlier exact body revision. A separate explicit privacy purge must enumerate dependent threads, stop affected runs, clear bindings, invalidate checkpoints, and redact/delete retained source payloads before removing pinned bodies. Never claim complete historical reconstruction after purge. No silent replacement by today's persona or neutral fallback on a missing pinned revision: report unavailable and request a deliberate selection.

Migrate all existing roles to persona:null and threads to personaOverride:{mode:'inherit'} with a none snapshot. Preserve existing customInstructions, responseStyle, app instructions, and conversation content. Add starter presets only as choices, not automatically active configuration. Do not search the website's origin/project storage for SOUL.md and treat it as authority. Browser documents named SOUL.md remain ordinary documents unless a human explicitly copies/imports guidance through this editor.

Future Azure Static Web Apps API/Cosmos sync transports owner-scoped immutable bodies, revisions, and tombstones with expected-revision checks. Concurrent edits produce an explicit conflict or separate revision for review, never a concatenated or last-writer-wins persona applied to an active thread. Live session objects, provider credentials, and admission state do not sync. A different device resolves the pinned body and measures its own model budget before preparing a session.

## Acceptance criteria

- Validate all closed unions, length limits, ownership, missing revisions, stale saves/applies, and import envelopes. Verify Neutral differs from Inherit and main/child selections resolve independently.
- Confirm editing a persona/configuration never changes a pinned thread, test thread, queued assignment, or active session without its specified explicit application path.
- Exercise Apply preparation failure, Stop races, revision races, reload after commit, pending question/approval blocking, and missing/deleted/purged source handling. No old/new instruction mixture or repeated mutation is allowed.
- Inspect actual submitted blocks on both inference routes. Confirm compaction and fallback preserve the exact selection and that oversized required guidance gives a visible conflict rather than truncation.
- Check typed preferences and current requests take precedence over persona style; “pretend the write succeeded” cannot alter real receipts or approvals. Evaluate real-model style adherence separately from deterministic policy and serialization tests.
- Confirm the model receives no persona mutation tool, Save/select/Preview makes no inference call, Markdown/HTML is inert, and tests run under real disclosed permissions.
- Verify default migration preserves existing behavior and that logs identify the exact persona revision and actual submitted text without secrets or hidden reasoning.

## Design provenance

Inspired by Hermes Agent's separation between a durable SOUL.md base and optional personality guidance, inspected at [8acb7f6](https://github.com/NousResearch/hermes-agent/tree/8acb7f65801fa7548b223244dee57465adfda8ec): [SOUL.md](https://github.com/NousResearch/hermes-agent/blob/8acb7f65801fa7548b223244dee57465adfda8ec/SOUL.md), [personality selection](https://github.com/NousResearch/hermes-agent/blob/8acb7f65801fa7548b223244dee57465adfda8ec/hermes_cli/personality.py), and [prompt loading](https://github.com/NousResearch/hermes-agent/blob/8acb7f65801fa7548b223244dee57465adfda8ec/agent/prompt_builder.py). This specification deliberately uses IndexedDB records and explicit immutable bindings. Everything required for the browser implementation is defined here; Hermes files and packages are not runtime dependencies.
