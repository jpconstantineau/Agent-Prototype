# Memory consolidation with review and a maintenance model

Status: approved extension; not implemented. Uses [persistent memory](persistent-memory.md), [learning overview](learning-overview.md), [agent library](agent-library.md), [structured inference](structured-processing.md), and [local routes](local-model-endpoint.md). Reuses the existing memory store and forgetting rules.

## Purpose

Keep durable factual notes compact and useful as duplicates, contradictions, and outdated information accumulate. A stronger local model can inspect a larger bounded evidence packet and propose a concise result suitable for Nano's smaller working window.

## User intent

Choose which agent/project memory to review and which model should perform the review. Inspect proposed changes and their evidence, accept selected changes, reject them, or protect notes with pins.

## Agent intent

The maintenance agent proposes structured changes to existing authorized notes. It does not apply its own proposals, infer new personal facts from unrelated history, rewrite preferences/skills/personas, or treat consolidation as permission to enlarge memory scope.

## Configuration and source selection

Add extensions.memoryReview `{enabled:boolean,modelRouteId:ID|null,maxInputChars:integer 4000–64000}` default false/null/24000. Null inherits the main role's approved text route. A human may select a stronger local route specifically for maintenance while leaving conversation on Chrome. Routes remain device-local references with credentials outside model context. The higher input cap is an explicitly approved maintenance allowance, not an increase to ordinary run/child context limits. Measure the actual packet against the selected route; characters are only an application limit.

Version 1 starts through human Review now, not a daemon, schedule, or new agent-facing consolidation tool. Scope is one currently authorized memory bucket, selected in the manager, with at most 50 active entries and 50 retained provenance excerpts totaling the chosen input limit. A paginated bucket may be reviewed in separately explicit batches. Do not imply the full bucket was reviewed when some entries/sources were omitted. Source selection includes exact memory ID/revision/text/pin/expiry/source references and bounded accessible evidence already attached to those notes. Omitted/missing evidence is labeled; it cannot support a new confident replacement.

Only stored facts permitted by the original memory capture policy are eligible. Explicit capture mode permits revising/merging already saved facts under human review, not mining all historical conversation for additional facts. Agent/project/shared bucket boundaries remain intact. Pinned entries may be described as conflicts but never altered by an assisted proposal until the human unpins them outside this operation. Forgotten/deleted content and diagnostic copies are excluded, including any prior machine-generated review diary.

## Review service and structured response

Human Prepare takes `{agentId,configurationRevision,scope,expectedBucketRevision}`. scope is agent/project/agent_project/shared resolved by the controller. Success returns `{success:true,reviewId,revision:1,status:'preparing'}` with a persisted run link. The scheduler prepares a tool-free maintenance context with exact input packet and schema. At most two attempted generations including correction/fallback, total output <=6000 characters, under the shared scheduler and any attributable goal budget. No domain tool executor or automatic memory-write callback is provided to the model.

The closed model output is `{version:1,summary,items,uncertainties}`. summary 0–600; uncertainties 0–5 strings <=200; items 0–4 closed union branches:

| action | Required fields besides action |
| --- | --- |
| revise | itemId:LocalID, input:{memoryId,revision}, text:1–500, sourceRefs:1–5, reason:1–300 |
| merge | itemId, inputs:2–3 unique {memoryId,revision}, targetMemoryId (one input), text:1–500, sourceRefs:1–5, reason |
| retire | itemId, input:{memoryId,revision}, reason:1–300, sourceRefs:1–5 |

All sourceRefs use shared evidence references restricted to the prepared packet. No new memory IDs, settings, executable code, open-ended replacements, or unsupported properties are accepted. An input may occur in at most one item. Total underlying operations <=5: revise/retire each cost one; merge costs its input count (edit the target, forget the other inputs). No keep action is necessary; unmentioned entries remain unchanged. Empty items is a valid No changes suggested result.

```json
{"version":1,"summary":"Two notes describe the same reporting convention.","items":[{"action":"merge","itemId":"merge_reporting","inputs":[{"memoryId":"memory-1","revision":2},{"memoryId":"memory-2","revision":1}],"targetMemoryId":"memory-1","text":"Weekly reports begin on Monday.","sourceRefs":[{"kind":"message","id":"message-1","revision":1}],"reason":"Both source notes state the same convention."}],"uncertainties":[]}
```

Validate cited sources, exact source revisions, pin states, text/capacity limits, and the five-operation cap before saving a ready review. Structural validation does not prove semantic equivalence; the human sees original texts, evidence, and proposed after values. Conflicting evidence appears as uncertainty or a proposed explicitly qualified note, never an unsupported resolution merely based on recency.

## Review records, Apply, and UI mapping

Persist `{version:1,reviewId,revision,agentId,configurationRevision,scope,bucketRevision,sourceSnapshot,routeSnapshot,createdAt,status,proposal,decisionReceipts}`. sourceSnapshot contains exact eligible memory/provenance IDs/revisions and coverage; routeSnapshot records actual provider/profile/model identity plus configured route. proposal is the validated output above or null while preparing/failed; decisionReceipts is an append list. status preparing/ready/applied/rejected/stale/failed. Snapshot/proposal bodies are immutable; metadata revisions and receipts record decisions.

Apply input is `{reviewId,expectedRevision,acceptedItemIds}` with 1–4 unique offered IDs. Require the full bucket revision and all selected dependencies unchanged; stale Apply commits nothing. Build equivalent memory-domain edit/forget operations from the stored proposal (the UI cannot substitute hidden text). Recheck current memory policy, pin/deletion/source permissions and final capacity. Commit selected operations, bucket revision, provenance/merge links, decision receipt, and applied review state atomically. The review becomes applied even if only a subset was selected; unselected suggestions are closed as declined. A later change requires a new review, avoiding partially live stale proposals. Human Reject closes a ready report without changing memory.

Merge keeps one existing identity, stores full input lineage in the review/audit record, and forgets superseded entries through the existing tombstone machinery. The active note's 1–5 provenance links must retain sufficient original evidence; if they cannot fit, fail and ask for a narrower proposal. Never resurrect forgotten text in source lookups, indexes, summaries, or a review report. An undo request uses explicit conflict-checked human edits/new records; it cannot blindly reverse subsequent corrections or privacy deletion.

UI controls: scope selector, Maintenance model, input budget, Preview sources/coverage, Review now, Cancel, Pin, Accept selected, Reject, and Open evidence. Each suggestion shows before/after text, affected IDs, action, sources, reason, and uncertainty. Nothing is preaccepted. Show actual provider and degraded/fallback outcomes; Preview does not infer. Generating a report never changes active memory or enables a disabled memory tool.

## Larger-context routing, fallback, and lifecycle

A stronger model gets only the selected packet, not an owner's entire history, secrets, other projects, or privileged tools. Default prompts ask for concise sourced factual notes appropriate for the existing 500-character entry and preload limits. Capacity remains 100 entries/20000 text characters per bucket; using a larger model does not enlarge Nano's preload budget. Reports remain outside the chat prompt unless selected as evidence.

If the maintenance route fails and Chrome fallback is allowed, first measure the same required packet/schema. If it cannot fit, hold failed/needs attention with Smaller batch or Choose model actions. Do not silently discard half the evidence or claim all sources were consolidated. A human can prepare a smaller batch as a new review. Apply never runs during inference and never follows automatically after fallback. Stop cancels maintenance; reload leaves interrupted reports failed and editable sources untouched.

Use memory-review.js, the existing memory domain service, and a native review view. Store review reports/diffs/receipts separately in IndexedDB, emit control.changed feature memory_review, and expose accepted transitions in learning overview. Review retention default 20 completed reports per agent; pins and privacy deletion override ordinary cleanup. Future sync validates exact source/bucket revisions and human acceptance; stale devices cannot reapply merges or undo forget tombstones.

## Acceptance

Verify duplicate merge, contradiction visibility, stale source/bucket rejection, pins, missing evidence, operation-count and capacity bounds, atomic Apply, accepted subset closure, exact provenance, forgotten-source removal, and no historical self-reinforcement. Test larger local packet, Chrome fallback overflow, cancellation/reload, zero-change reports, route isolation, and real-model factual preservation separately from schema/transaction correctness.

Source inspiration: [OpenClaw consolidation](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/concepts/dreaming.md). The browser adaptation uses explicit human review and no sleep phases or filesystem diary dependency.
