# Per-agent skill curation

Status: approved specification. Uses [skill learning](skill-learning-extension.md), [agent library](agent-library.md), [skills](skills.md), [permissions](execution-permissions.md), and [learning overview](learning-overview.md). Primarily a human library-maintenance feature, with bounded optional harness review.

## Scope and settings

Track actual skill loading/use/revision activity per agent and project, then recommend stale-skill review, targeted edits, consolidation, or recoverable archive. A loaded skill was viewed, not necessarily useful; record explicit application use separately where available. Never infer success merely from a model saying the skill helped. Disabled content remains inaccessible to agents/maintenance even if humans can inspect it.

Each agent configuration adds curation settings `{enabled,idleReview,intervalDays,staleDays,archiveSuggestionDays,maxCandidates}`: booleans default false/false; intervalDays integer 1–90 default 7; staleDays 7–365 default 30; archiveSuggestionDays 14–730 default 90 and >=staleDays; maxCandidates 1–6 default 4. First observation seeds the next-review date instead of launching immediately. Review now is a direct user action. Idle review requires the page open, no active inference/interaction/write, at least 30 minutes since human/agent activity, and enabled local AI/provider. It makes suggestions only and cannot prompt for browser/model installation unattended.

Usage records key skillId + revision + agentId + projectId/null and record lastViewedAt, lastUsedAt/null, loads, and explicit use receipts. Default to the selected agent's eligible skill associations; do not treat other agents' use as this agent's use. A shared skill's global archive, merge, or publication must account for every current agent/schedule/template reference. “Unused by Planner” can recommend removing Planner's association, never archiving a skill still used by Reviewer. Inactive/paused schedules still protect referenced skills.

Removing an association writes an explicit disabled skill entry in the affected agent role, rather than omitting a key that could inherit Include again. It creates a new configuration revision and follows the library's existing-thread Apply rules; show pinned conversations/board assignments still using older bindings. Global archive/merge review includes active conversation, board, and draft/review references as protected consumers. Historical evidence is retained separately and is not itself an always-active skill grant.

## Review records and contract

A direct review request is `{agentId,configurationRevision,projectId:ID|null,mode:'metadata'|'assisted'}`. Resolve scope before reading. metadata uses deterministic statistics only. assisted uses a fresh maintenance session, maximum four model calls, one review page of <=6 candidates, <=6000 source characters total, and <=3000 output characters. It receives only approved accessible metadata and bounded relevant sections, never all skill bodies or active chat context. Run it through the shared provider scheduler; a larger local model does not raise these limits automatically.

The host saves `{reviewId,revision,agentId,configurationRevision,projectId,sourceSnapshot,createdAt,status,items}`. status is ready/failed/applied/rejected/stale. sourceSnapshot lists candidate skill IDs/revisions and association revisions. Each of at most six closed items has suggestionId:LocalID, action keep/remove_association/archive/propose_revision/consolidate, skillIds 1–3 unique IDs, reason 1–300, evidenceIds 0–5 accessible usage/source IDs, and draftId:ID|null. propose_revision/consolidate require a validated draft before applying content; a model recommendation alone cannot become a replacement body.

```json
{"reviewId":"review-1","expectedRevision":1,"acceptedSuggestionIds":["remove_unused_association"]}
```

This is a human Apply selection, not an agent tool. At Apply, recheck every source revision, global/role policy, pin, and current references. If any accepted item is stale, apply none of the selected batch and show the conflicts. Only the user-confirmed frozen operations commit. A consolidation creates a new or revised skill with explicit provenance and preserved supporting resources; validate referenced resource keys and rewrite only declared links, never flatten/delete unknown content. Do not silently rewrite schedules/templates to a different skill: show every affected binding and require explicit acceptance, or keep the old skill active.

A newly created consolidation target stays Disabled under the skill-learning rule. The human must explicitly enable it through capability Settings before dependent active bindings can switch; curation cannot smuggle enablement into a content merge. Until then retain the old skills/bindings and mark the suggestion awaiting setup.

## Pins, archive, and UI

Users can pin skills globally or pin an agent's association. Global pins block automated/agent content changes and archive; association pins protect that agent's selection. Review may explain a protected overlap but cannot modify it. Unpin is human-only. Human edits remain possible through a clearly explicit pin-aware editor. Archive is a reversible domain state, not destructive deletion. It removes active discovery/loading and invalidates loaded contexts. Restore creates a new revision/state with prior exposure choices reviewed rather than automatically enabling a previously disabled skill.

The Library review view filters by agent/project, shows actual last view/use counts, candidate reasons, source evidence, affected consumers, content/resource diffs, and protection reasons. Actions: Review now, Inspect, Pin, Accept selected, Reject, Archive history, Restore. Default nothing is preaccepted. Metadata-only stale labels do not hide a skill. An automatic idle review adds a badge/report and never applies recommendations or steals focus. Users may pause curation for one agent without disabling skills for other agents.

## Persistence and acceptance

Store usage counters, review reports, pins, associations, and reversible archive receipts in IndexedDB, separate from skill bodies. Commit accepted transitions and audit events atomically. Keep at most 20 completed reviews per agent by visible retention; pin active draft/review dependencies. No closed-page worker inference, permanent background daemon, or automatic purge is implied. Future sync merges usage append IDs idempotently, detects revision conflicts, and does not let one device's stale “unused” view archive another device's active skill.

Add skill-curation.js and the review view; reuse draft/publish and policy services. Test per-agent usage separation, shared-skill/schedule protection, pins, stale snapshots, atomic Apply, no automatic changes on idle review, Stop, page suspension, revision/resource preservation, and restore without enabling unrelated tools. Logs and the learning overview distinguish suggested, accepted, published, archived, and restored outcomes.
