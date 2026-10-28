# Skill learning and revision proposals

Status: approved extension to [skills](skills.md). The base read/loading design remains independently usable. Adds agent-facing draft/publish tools and a user-facing Learn/review flow, using [projects](project-context.md), [permissions](execution-permissions.md), [memory](persistent-memory.md), and [observability](observability.md).

## Intent and publication authority

Turn an approved demonstrated workflow, conversation, document, or supported text attachment into a reusable procedure. Capture repeatable steps, trigger conditions, pitfalls, and verification. Factual memory is for compact stable facts; a skill explains how to perform a class of work. Do not silently promote conversation logs, errors, or temporary task state into instructions. Sources are bounded existing app resources, not an authorization to fetch websites, read arbitrary files, execute scripts, or install packages.

Each agent configuration adds learning settings: enabled boolean default false; allowProactiveDrafts boolean default false; publishMode review/permission_policy default review. Explicit Learn requests can create drafts when enabled. Proactive drafts require opt-in and the source task's scope; they remain drafts. Review requires a dedicated human Publish decision; permission_policy permits skill_publish under configured execution levels, current task authorization, and hard restrictions. New skills always start globally Disabled; publication never enables them. Publishing a revision of an existing skill preserves its eligibility choices but invalidates affected future/loaded context under the base skill rules.

enabled:false withholds agent draft/publish tools; it does not disable the base read-only skill loader or manual human editor. All draft/publish methods still require their individual eligible/admitted tools when this feature is enabled.

## Draft records and contracts

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

## UI and agent interaction

The human Learn action selects source messages/documents/ranges and optional target skill, then opens a clearly labeled learning run. It passes a bounded standards-guided request to the ordinary model loop; it is not a separate autonomous ingestion service. The draft panel shows source links, new/existing skill identity, before/after diff, resource changes, validation findings, and Publish/Reject/Edit. Publish applies the frozen draft revision; selecting a skill row or loading a draft never publishes it.

In review mode, skill_publish creates a nonblocking review record and returns `{success:true,version:1,draftId,status:'awaiting_user',reviewId}`; the run stops under the shared awaiting_user lifecycle. The direct human decision `{reviewId,expectedRevision,decision:'publish'|'reject'}` settles it without a fabricated new model request. In permission_policy mode the normal gate can wait for exact-call approval then publish. Avoid a second generic approval on the dedicated human Publish action; hard denials/pins/revisions still apply. Draft saves are writes but not activation.

Descriptions: “Draft a compact reusable procedure from sources actually read. Prefer revising an appropriate existing skill over duplicates. Read the relevant current section before proposing a patch. A saved draft is not published or enabled; report only actual receipts. Do not claim an untested procedure was verified.” Skill content remains lower priority than application rules and current user intent.

## Lifecycle, integration, and acceptance

Use skill-drafts.js plus the shared skill validator/editor, not a parallel active skill store. Track agent/project origin, usage, and publication sources for [curation](skill-curation.md) and the [learning overview](learning-overview.md). Drafts retain at most 20 revisions and expire after 30 days unless pinned by an active review; warn before removal. Active skill revisions have their separate retention rules. Source deletion marks provenance unavailable and can require review/redaction of derived personal content, not silent substitution.

Changing a currently loaded skill requires safe session invalidation/rebuild; never rewrite an old system prompt or restore superseded instruction text from compaction. Children remain read-only and cannot draft/publish. Maintenance curation can propose bounded drafts only through its separately allowed review scope. Log draft edits, review decisions, publication receipts, and exact loaded revisions; future sync requires base/draft revision checks and ownership. Tests cover source-range validation, exact edit rollback, draft-versus-active separation, new-skill Disabled default, stale bases, pin protection, repeated Publish, Stop/review races, and no scope/permission escalation.
