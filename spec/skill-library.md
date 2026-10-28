# Reusable skills, learned drafts, and per-agent curation

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Support the lifecycle of reusable procedural guidance in one versioned IndexedDB skill library: discover/load approved content, propose learned procedures, publish governed revisions, and maintain per-agent associations without silently changing shared consumers.

## User intent

Import or write skills, review learned drafts, publish revisions, choose role-specific exposure, and curate stale or duplicate associations while understanding which agents depend on them.

## Agent intent

Discover/load eligible approved skill sections and resources; when separately enabled, draft or revise learned procedures. The agent cannot enable skills, widen capabilities, or bypass the configured publication gate or curation review. Loading instructions never executes them or creates a fresh task request.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Skill discovery and loading](#feature-skills) | Human; agent reads guidance | Own skill records, resources, revisions, and bounded instruction loading. |
| [Skill learning](#feature-skill-learning-extension) | Agent drafts; configured publication gate | Own opt-in learned drafts and exact revision publication proposals. |
| [Skill curation](#feature-skill-curation) | Harness proposes; human reviews | Own per-agent usage review, pins, and shared-consumer effects. |

## Integration and delivery

All chapters use the same skill IDs, revisions, and resource bodies. A learned draft is not a published revision; publication is not enablement; curation does not silently rewrite consumers. Publication defaults to dedicated human review; the existing permission_policy option still uses its configured exact-call execution gate and task authorization. Keep these gates explicit even when the manager presents them together.

Capability policy owns Disabled/Include/Discover and role ceilings. The loader owns active ranges and context limits; rebuild after revocation so a stale session cannot continue acting on disabled guidance. Learned content remains lower-priority guidance, not system authority.

Implement the loader and human manager first, then opt-in draft learning and curation. The learning-overview chapter in memory-and-learning reads this same library for provenance. Online skill catalogs remain reference-only and are not a dependency.

<a id="feature-skills"></a>

## Skill discovery and loading

Status: approved specification. Uses [shared contracts](runtime-contracts.md), [capability controls](capability-policy.md#feature-capability-controls), and [compaction](context-management.md#feature-context-compaction). Skills are instruction records, not required filesystem files or executable plugins.

<a id="feature-skills-purpose"></a>

### Purpose

Make reusable procedural guidance available without filling every model context with every skill. Versioned IndexedDB records and selective loading let agents retrieve only the approved instructions and resources needed for a task.

<a id="feature-skills-user-intent"></a>

### User intent

Create or import skills, inspect and edit them, choose eligibility and exposure, and see which revisions and sections are active.

<a id="feature-skills-agent-intent"></a>

### Agent intent

Discover eligible skills, load relevant approved sections, and read bounded supporting resources. This base spec does not let the agent author, install, or enable skills; learned drafts use the separately governed extension.

<a id="feature-skills-purpose-and-actors"></a>

### Purpose and actors

A skill packages reusable instructions such as weekly planning or task triage. The user creates/imports, edits, versions, enables/disables, and removes skills in a manager. The agent sees a bounded catalog through `list_skills`, reads relevant instruction sections with `load_skill`, and optionally loads bounded supporting resources with `read_skill_resource`. Agents cannot author/install/enable skills or broaden tool permissions in version 1. A loaded skill can guide already authorized work; it does not itself request new task mutations.

That restriction describes the base loader. The separately approved [skill-learning extension](skill-library.md#feature-skill-learning-extension) adds opt-in draft/publish tools without changing this read contract; enablement remains human-only. [Curation](skill-library.md#feature-skill-curation) reviews per-agent associations and shared consumers. An [online catalog](future-reference.md#feature-skill-catalog-reference) is reference-only for a later decision, not a dependency of loading or learning.

<a id="feature-skills-persistence-and-skill-structure"></a>

### Persistence and skill structure

Store stable skill ID, owner, display name 1–80, short description 1–240, positive revision, schema version, body 1–16000 characters, eligibility/exposure mode references, optional resource metadata, and update/delete provenance in IndexedDB. Global/main/subagent modes come from the policy service, not inconsistent duplicate booleans in a skill record. Resource records are UTF-8 text up to 16000 characters each, at most five per skill. Allowed resource names are LocalID plus an optional `.txt`, `.md`, `.json`, or `.csv` suffix. Names are keys, never paths or URLs.

Publishing an edit creates a new revision. Existing accepted runs refer to the exact loaded revision until a safe session rebuild or explicit reload; a model cannot quietly switch to changed instructions. Import is a user action accepting a closed plain-data package with body/resources after validation and review. No imported JavaScript is evaluated and no shell/file access is implied. Sync metadata/bodies through the future API with ownership, revisions, and tombstones; local file export is optional portability, not the primary storage format.

<a id="feature-skills-agent-contracts"></a>

### Agent contracts

All tools require version 1 and current skill-policy checks:

| Tool | Additional inputs | Success fields besides success/version |
| --- | --- | --- |
| `list_skills` | query? 1–120, cursor?, limit? integer 1–10 default 5 | items, nextCursor; each item has skillId, revision, name, description, and resource names only. |
| `load_skill` | skillId, expectedRevision, offset? integer 0–16000 default 0, maxChars? integer 200–4000 default 2000 | skillId, revision, name, text, offset, nextOffset, resource metadata, and status (`loaded_section` or `already_loaded`). |
| `read_skill_resource` | skillId, expectedRevision, resourceName 1–80, offset? 0–16000 default 0, maxChars? 200–4000 default 2000 | skillId, revision, resourceName, text, offset, nextOffset. |

```json
{"type":"tool_call","name":"load_skill","arguments":{"version":1,"skillId":"weekly-planning","expectedRevision":2,"maxChars":2000}}
```

`text` is an exact bounded slice of the approved version; nextOffset is integer or null. Offsets must refer to character boundaries and never split surrogate pairs. `load_skill` records the loaded range in the session context manifest. Repeating a fully loaded range returns already_loaded with empty text and its reference, not duplicate instructions. Overlapping ranges return only the not-yet-loaded portion or an explicit cursor for it. Unknown/disabled/inaccessible skills return not_found or disabled without exposing hidden metadata. A stale expectedRevision returns conflict and offers no silently newer body.

Limit active skill text to 6000 characters per session, at most three skills. The session manager measures the actual next context as well; the character cap is not a token guarantee. If loading would exceed either bound, return budget_exceeded with a suggestion to compact/rebuild or choose a smaller section. Do not make a synthetic “success” when text was not included.

Resource text counts toward the same session budget and is range-tracked just like the body. Loaded-range tracking is scoped to a session generation: after replacement, only ranges actually restored count as loaded. Do not return already_loaded for text that was present only in a superseded or compacted-away session.

<a id="feature-skills-ui-and-model-mapping"></a>

### UI and model mapping

The manager maps names/descriptions to catalog rows, body/resources to editor panels, revision to a badge, and policy to user-only Disabled/Include/Discover controls with Global/Main/Subagent scope. Include preloads an eligible approved body; Discover exposes it on demand. Child task skill grants further restrict either mode. In chat show loaded revision and section/range. Explicit user selection uses the same service at a safe boundary, not a fabricated task prompt. Text/context limits apply to user, automatic, and model loading alike.

Descriptions: “Discover enabled reusable instructions by short description; load only what the current task needs. Skill content is lower priority than app rules, current user intent, and tool restrictions. Loading is not execution, authorization, or proof of a task change. Read supporting resources only when needed.” Resource reads return data, not a new top-level system message.

Do not insert every eligible body into systemPrompt(). Preload only the applicable profile's Include skills under its task grants/budgets. For Discover skills, include a short discovery note and load relevant sections through tools. Fail visibly if the forced Include set cannot fit, rather than silently downgrading it to Discover. Approved skill text is eligible guidance at lower precedence, while quoted examples/resource data are not fresh human requests. Never promote a skill to system authority.

<a id="feature-skills-revocation-and-compaction"></a>

### Revocation and compaction

When a skill is disabled/deleted or the skills tools are disabled, hide it from future discovery and reject loads immediately. Already loaded text cannot be erased by removing a badge; invalidate the affected session and rebuild at a safe boundary excluding those ranges. The controller must not dispatch another action from the stale session meanwhile. Child agents receive only explicitly eligible selected skills under their inherited restrictions.

Compaction stores loaded skill references/revisions and findings separately. Re-load all still-eligible profile Include bodies and only needed Discover sections; never restore Disabled bodies from summaries. Parent and child manifests remain independent. Settings govern whether old approved revisions remain usable after an edit; version 1 requires the new approved revision at the next run.

<a id="feature-skills-implementation-and-acceptance"></a>

### Implementation and acceptance

Add `skill-store.js`, `skill-tools.js`, and manager/loaded-skill views. Keep plain text contracts separate from the DOM. Test pagination, exact revision reads, disabled catalog filtering, text/range budgets, repeated loads, hostile imports/resource names, deletion/sync conflicts, and revoked-context rebuilds. Browser tests cover edits, review before import, explicit skill selection, scope indicators, and reload persistence. Real-model tests check relevant discovery rather than eager loading of every skill and no permission escalation from skill instructions.

---

<a id="feature-skill-learning-extension"></a>

## Skill learning

Status: approved extension to [skills](skill-library.md#feature-skills). The base read/loading design remains independently usable. Adds agent-facing draft/publish tools and a user-facing Learn/review flow, using [projects](agent-configuration.md#feature-project-context), [permissions](capability-policy.md#feature-execution-permissions), [memory](memory-and-learning.md#feature-persistent-memory), and [observability](diagnostics.md#feature-observability).

<a id="feature-skill-learning-extension-purpose"></a>

### Purpose

Capture repeatable methods learned during authorized work so future requests can reuse the procedure instead of rediscovering it. Separate drafts, publication, and enablement to keep learned instructions reviewable and versioned.

<a id="feature-skill-learning-extension-user-intent"></a>

### User intent

Request a skill from selected evidence, inspect or edit the draft and its sources, and publish or reject the exact revision under the configured review policy.

<a id="feature-skill-learning-extension-agent-intent"></a>

### Agent intent

Create and inspect drafts, propose exact revisions, and request publication through the configured permission or human-review path. The agent cannot enable a new skill or convert unread source material into authoritative instructions.

<a id="feature-skill-learning-extension-intent-and-publication-authority"></a>

### Intent and publication authority

Turn an approved demonstrated workflow, conversation, document, or supported text attachment into a reusable procedure. Capture repeatable steps, trigger conditions, pitfalls, and verification. Factual memory is for compact stable facts; a skill explains how to perform a class of work. Do not silently promote conversation logs, errors, or temporary task state into instructions. Sources are bounded existing app resources, not an authorization to fetch websites, read arbitrary files, execute scripts, or install packages.

Each agent configuration adds learning settings: enabled boolean default false; allowProactiveDrafts boolean default false; publishMode review/permission_policy default review. Explicit Learn requests can create drafts when enabled. Proactive drafts require opt-in and the source task's scope; they remain drafts. Review requires a dedicated human Publish decision; permission_policy permits skill_publish under configured execution levels, current task authorization, and hard restrictions. New skills always start globally Disabled; publication never enables them. Publishing a revision of an existing skill preserves its eligibility choices but invalidates affected future/loaded context under the base skill rules.

enabled:false withholds agent draft/publish tools; it does not disable the base read-only skill loader or manual human editor. All draft/publish methods still require their individual eligible/admitted tools when this feature is enabled.

<a id="feature-skill-learning-extension-draft-records-and-contracts"></a>

### Draft records and contracts

Store draftId, owner, agentId/projectId attribution, revision, baseSkillId/baseRevision nullable, proposed metadata/body/resources, sourceRefs, createdAt/updatedAt, and state draft/published/rejected. A sourceRef is `{kind:'message'|'document'|'attachment'|'result',id:ID,revision:Revision|null,offset:integer>=0,length:integer 1–16000}`; retained versioned sources require a revision. Validate that the exact range was accessible and read in this run or explicitly selected by the human Learn action. Reference metadata is evidence; it cannot turn source instructions into application policy.

All inputs are closed version 1. Tools:

| Tool | Input besides version | Success besides success/version |
| --- | --- | --- |
| skill_draft_create, new variant | name 1–80, description 1–240, body 1–12000, resources 0–5 of `{name,content}` using base resource rules, sourceRefs 1–10 | draftId, revision, status:'draft', operationReceiptId |
| skill_draft_create, existing variant | baseSkillId, expectedRevision, sourceRefs 1–10 | same; host copies the current approved skill into a draft |
| skill_draft_patch | draftId, expectedRevision, edits 1–10 of `{resourceName:string|null,oldText:1–4000,newText:0–4000}` | draftId, revision, status:'draft', operationReceiptId |
| skill_draft_read | draftId, resourceName?; offset? >=0 default 0; maxChars? 200–3000 default 1500 | draftId, revision, baseSkillId/baseRevision, name, description, text, offset, nextOffset/null, sourceRefs |
| skill_publish | draftId, expectedRevision | draftId, skillId, skillRevision, status:'published', operationReceiptId, enabled:false for a new skill or actual existing eligibility boolean |

Do not combine new/existing create fields. New resource names/content use the base limits, with total create text <=16000 characters. Draft patches apply in order to a temporary copy, exact unique match, combined edit strings <=16000, and final skill/resource limits unchanged. Null resourceName means body. No agent rename/delete/resource-add tool is introduced in this version; the human editor can revise metadata/supporting resources directly using the draft revision. Draft reads do not load the draft as active skill guidance or mark base skill ranges loaded.

```json
{"type":"tool_call","name":"skill_draft_create","arguments":{"version":1,"name":"Weekly project review","description":"Use when preparing a weekly project review.","body":"# Weekly project review\n\n## Procedure\n1. Read current open tasks.\n2. Group priorities and identify blockers.\n3. Draft a review document.\n\n## Verification\nCheck task references and document save receipts.","resources":[],"sourceRefs":[{"kind":"message","id":"message-1","revision":1,"offset":0,"length":120}]}}
```

Publish validates final source/metadata/resource structure, current base revision, writable scope, pin state, policy, and context impact. Existing-skill publication requires an eligible accessible target and exact base revision; no forced overwrite after a concurrent edit. Draft publishing is atomic and idempotent by application operation ID. Stale publication fails conflict; published drafts return their existing receipt without another revision. No executable resource, environment variable, network configuration, or tool/skill enablement is allowed in draft metadata.

<a id="feature-skill-learning-extension-ui-and-agent-interaction"></a>

### UI and agent interaction

The human Learn action selects source messages/documents/ranges and optional target skill, then opens a clearly labeled learning run. It passes a bounded standards-guided request to the ordinary model loop; it is not a separate autonomous ingestion service. The draft panel shows source links, new/existing skill identity, before/after diff, resource changes, validation findings, and Publish/Reject/Edit. Publish applies the frozen draft revision; selecting a skill row or loading a draft never publishes it.

In review mode, skill_publish creates a nonblocking review record and returns `{success:true,version:1,draftId,status:'awaiting_user',reviewId}`; the run stops under the shared awaiting_user lifecycle. The direct human decision `{reviewId,expectedRevision,decision:'publish'|'reject'}` settles it without a fabricated new model request. In permission_policy mode the normal gate can wait for exact-call approval then publish. Avoid a second generic approval on the dedicated human Publish action; hard denials/pins/revisions still apply. Draft saves are writes but not activation.

Descriptions: “Draft a compact reusable procedure from sources actually read. Prefer revising an appropriate existing skill over duplicates. Read the relevant current section before proposing a patch. A saved draft is not published or enabled; report only actual receipts. Do not claim an untested procedure was verified.” Skill content remains lower priority than application rules and current user intent.

<a id="feature-skill-learning-extension-lifecycle-integration-and-acceptance"></a>

### Lifecycle, integration, and acceptance

Use skill-drafts.js plus the shared skill validator/editor, not a parallel active skill store. Track agent/project origin, usage, and publication sources for [curation](skill-library.md#feature-skill-curation) and the [learning overview](memory-and-learning.md#feature-learning-overview). Drafts retain at most 20 revisions and expire after 30 days unless pinned by an active review; warn before removal. Active skill revisions have their separate retention rules. Source deletion marks provenance unavailable and can require review/redaction of derived personal content, not silent substitution.

Changing a currently loaded skill requires safe session invalidation/rebuild; never rewrite an old system prompt or restore superseded instruction text from compaction. Children remain read-only and cannot draft/publish. Maintenance curation can propose bounded drafts only through its separately allowed review scope. Log draft edits, review decisions, publication receipts, and exact loaded revisions; future sync requires base/draft revision checks and ownership. Tests cover source-range validation, exact edit rollback, draft-versus-active separation, new-skill Disabled default, stale bases, pin protection, repeated Publish, Stop/review races, and no scope/permission escalation.

---

<a id="feature-skill-curation"></a>

## Skill curation

Status: approved specification. Uses [skill learning](skill-library.md#feature-skill-learning-extension), [agent library](agent-configuration.md#feature-agent-library), [skills](skill-library.md#feature-skills), [permissions](capability-policy.md#feature-execution-permissions), and [learning overview](memory-and-learning.md#feature-learning-overview). Primarily a human library-maintenance feature, with bounded optional harness review.

<a id="feature-skill-curation-purpose"></a>

### Purpose

Keep a growing skill library useful by identifying stale or overlapping procedures per agent. Usage evidence, shared-consumer checks, pins, and recoverable transitions prevent maintenance for one agent from breaking another agent's work.

<a id="feature-skill-curation-user-intent"></a>

### User intent

Review recommendations, protect important skills, accept specific changes, and inspect or restore archived material with its affected consumers visible.

<a id="feature-skill-curation-agent-intent"></a>

### Agent intent

An optional bounded maintenance agent reviews permitted candidates and proposes revisions or consolidations. It cannot apply curation decisions, enable merged skills, or alter protected consumers without the specified human actions.

<a id="feature-skill-curation-scope-and-settings"></a>

### Scope and settings

Track actual skill loading/use/revision activity per agent and project, then recommend stale-skill review, targeted edits, consolidation, or recoverable archive. A loaded skill was viewed, not necessarily useful; record explicit application use separately where available. Never infer success merely from a model saying the skill helped. Disabled content remains inaccessible to agents/maintenance even if humans can inspect it.

Each agent configuration adds curation settings `{enabled,idleReview,intervalDays,staleDays,archiveSuggestionDays,maxCandidates}`: booleans default false/false; intervalDays integer 1–90 default 7; staleDays 7–365 default 30; archiveSuggestionDays 14–730 default 90 and >=staleDays; maxCandidates 1–6 default 4. First observation seeds the next-review date instead of launching immediately. Review now is a direct user action. Idle review requires the page open, no active inference/interaction/write, at least 30 minutes since human/agent activity, and enabled local AI/provider. It makes suggestions only and cannot prompt for browser/model installation unattended.

Usage records key skillId + revision + agentId + projectId/null and record lastViewedAt, lastUsedAt/null, loads, and explicit use receipts. Default to the selected agent's eligible skill associations; do not treat other agents' use as this agent's use. A shared skill's global archive, merge, or publication must account for every current agent/schedule/template reference. “Unused by Planner” can recommend removing Planner's association, never archiving a skill still used by Reviewer. Inactive/paused schedules still protect referenced skills.

Removing an association writes an explicit disabled skill entry in the affected agent role, rather than omitting a key that could inherit Include again. It creates a new configuration revision and follows the library's existing-thread Apply rules; show pinned conversations/board assignments still using older bindings. Global archive/merge review includes active conversation, board, and draft/review references as protected consumers. Historical evidence is retained separately and is not itself an always-active skill grant.

<a id="feature-skill-curation-review-records-and-contract"></a>

### Review records and contract

A direct review request is `{agentId,configurationRevision,projectId:ID|null,mode:'metadata'|'assisted'}`. Resolve scope before reading. metadata uses deterministic statistics only. assisted uses a fresh maintenance session, maximum four model calls, one review page of <=6 candidates, <=6000 source characters total, and <=3000 output characters. It receives only approved accessible metadata and bounded relevant sections, never all skill bodies or active chat context. Run it through the shared provider scheduler; a larger local model does not raise these limits automatically.

The host saves `{reviewId,revision,agentId,configurationRevision,projectId,sourceSnapshot,createdAt,status,items}`. status is ready/failed/applied/rejected/stale. sourceSnapshot lists candidate skill IDs/revisions and association revisions. Each of at most six closed items has suggestionId:LocalID, action keep/remove_association/archive/propose_revision/consolidate, skillIds 1–3 unique IDs, reason 1–300, evidenceIds 0–5 accessible usage/source IDs, and draftId:ID|null. propose_revision/consolidate require a validated draft before applying content; a model recommendation alone cannot become a replacement body.

```json
{"reviewId":"review-1","expectedRevision":1,"acceptedSuggestionIds":["remove_unused_association"]}
```

This is a human Apply selection, not an agent tool. At Apply, recheck every source revision, global/role policy, pin, and current references. If any accepted item is stale, apply none of the selected batch and show the conflicts. Only the user-confirmed frozen operations commit. A consolidation creates a new or revised skill with explicit provenance and preserved supporting resources; validate referenced resource keys and rewrite only declared links, never flatten/delete unknown content. Do not silently rewrite schedules/templates to a different skill: show every affected binding and require explicit acceptance, or keep the old skill active.

A newly created consolidation target stays Disabled under the skill-learning rule. The human must explicitly enable it through capability Settings before dependent active bindings can switch; curation cannot smuggle enablement into a content merge. Until then retain the old skills/bindings and mark the suggestion awaiting setup.

<a id="feature-skill-curation-pins-archive-and-ui"></a>

### Pins, archive, and UI

Users can pin skills globally or pin an agent's association. Global pins block automated/agent content changes and archive; association pins protect that agent's selection. Review may explain a protected overlap but cannot modify it. Unpin is human-only. Human edits remain possible through a clearly explicit pin-aware editor. Archive is a reversible domain state, not destructive deletion. It removes active discovery/loading and invalidates loaded contexts. Restore creates a new revision/state with prior exposure choices reviewed rather than automatically enabling a previously disabled skill.

The Library review view filters by agent/project, shows actual last view/use counts, candidate reasons, source evidence, affected consumers, content/resource diffs, and protection reasons. Actions: Review now, Inspect, Pin, Accept selected, Reject, Archive history, Restore. Default nothing is preaccepted. Metadata-only stale labels do not hide a skill. An automatic idle review adds a badge/report and never applies recommendations or steals focus. Users may pause curation for one agent without disabling skills for other agents.

<a id="feature-skill-curation-persistence-and-acceptance"></a>

### Persistence and acceptance

Store usage counters, review reports, pins, associations, and reversible archive receipts in IndexedDB, separate from skill bodies. Commit accepted transitions and audit events atomically. Keep at most 20 completed reviews per agent by visible retention; pin active draft/review dependencies. No closed-page worker inference, permanent background daemon, or automatic purge is implied. Future sync merges usage append IDs idempotently, detects revision conflicts, and does not let one device's stale “unused” view archive another device's active skill.

Add skill-curation.js and the review view; reuse draft/publish and policy services. Test per-agent usage separation, shared-skill/schedule protection, pins, stale snapshots, atomic Apply, no automatic changes on idle review, Stop, page suspension, revision/resource preservation, and restore without enabling unrelated tools. Logs and the learning overview distinguish suggested, accepted, published, archived, and restored outcomes.
