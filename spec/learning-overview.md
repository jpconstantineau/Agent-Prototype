# Learning overview, provenance, and timeline

Status: approved specification. A human-facing view of persisted knowledge, distinct from the [run inspector](observability.md). Uses [memory](persistent-memory.md), [skill learning](skill-learning-extension.md), [curation](skill-curation.md), and [project scope](project-context.md). No new agent tool or autonomous inference is required.

## Purpose

Make persisted learning visible separately from execution logs. A source-linked timeline lets the user understand what facts and procedures survived a conversation and identify knowledge that needs correction or review.

## User intent

Inspect learning by agent and project, follow its provenance, and open the appropriate manager to correct, forget, publish, archive, or restore an entry.

## Agent intent

The agent does not act through this spec. It has no learning-overview tool and cannot use this diagnostic view to change knowledge; any edits or reads occur through the separately governed domain features.

## Meaning of the view

Show what survived individual conversations: saved/updated/forgotten facts, drafted/published/revised skills, and accepted curation transitions. A successful run does not automatically count as learning. Drafts, suggestions, published knowledge, loaded skills, and actual use have separate labels. Publication and usage are application receipts, not assertions that the content is true or useful.

Default to a paginated timeline/list filtered by agent, project, date range, kind, and active/draft/archived/forgotten state. An optional relationship view uses native SVG/DOM with a table alternative, maximum 100 nodes/200 edges per page. No React, graph database, WebGL library, embeddings service, or model-generated relationship inference is needed. The list remains fully functional without the graph.

## Read model and contracts

Build a derived read model from domain metadata and append events, not by reparsing arbitrary chat text. A human query is `{agentId:ID|null,projectId:ID|null,kinds:1–3 unique 'memory'|'skill'|'curation',state:'all'|'active'|'draft'|'inactive',since:Instant|null,until:Instant|null,cursor:Cursor|null,limit:integer 1–50}`. Defaults are current agent/project, all kinds/state, no time bounds, null cursor, limit 20. Null filter means all human-accessible records, never access for an agent executor. Reject reversed date ranges; pagination binds a stable source boundary.

Each result item is a closed `{itemId:ID,kind,title:1–120,summary:0–240,agentId:ID|null,projectId:ID|null,occurredAt:Instant,action,state,resourceId:ID,resourceRevision:Revision,sourceRefs,receiptId:ID|null}`. action is saved/updated/forgotten/drafted/published/viewed/used/suggested/archived/restored. state is active/draft/inactive. sourceRefs has 0–10 accessible typed `{kind:'message'|'document'|'memory'|'skill'|'run'|'curation',id:ID,revision:Revision|null}` references. Use minimal non-content titles for forgotten/deleted personal entries. Do not reconstruct deleted text from log payloads just to populate the timeline.

Return `{items,nextCursor,totals}`. totals is `{activeMemories,activeSkills,drafts,pendingReviews}` with nonnegative safe counts for the selected authorized filters, computed from a stable read snapshot. If counts cannot be computed within budget, return totals:null and display Unknown rather than partial counts labeled totals. Derived storage/index generations support restart and reindex after import/sync.

Edges are only evidence-backed types: derived_from, revises, used_in, and consolidated_into. An edge stores source/target typed IDs/revisions plus its real receipt/source reference. Shared words or a model's guess do not establish an edge. If a future similarity view is added, it needs an explicitly labeled separate relation that cannot be confused with provenance. The graph is not an authorization or dependency execution engine.

## UI mapping and actions

Map each item to a row/card showing actor/agent, project, action, timestamp, revision, and source links. Open displays the existing Memory manager, Skill draft/editor, Curation report, source message/document, or Run inspector. Correct, Forget, Publish, Archive, Restore, and Pin route to the existing domain services and their actual confirmation/revision rules. Clicking an edge never grants access, runs a workflow, loads a skill into the current model, or replays a source request.

Display missing/deleted/pruned source evidence honestly, including whether a version is no longer retained. The user can inspect a skill's version history and contributing sources, then deliberately edit or reject it. Per-agent usage is shown separately from global totals so an unused association does not imply a shared skill is globally unused. Use accessible labels, keyboard navigation, restrained motion, and safe text/Markdown boundaries.

## Storage and acceptance

Add learning-index.js and learning-view.js. Store only derived metadata and pointers in IndexedDB; source domains remain authoritative. A rebuild cannot resurrect forgotten memory, restore an archived skill, or change policy. Future sync uses domain receipts and stable IDs to deduplicate learning events; do not sum duplicate usage events from two devices. User export is explicitly scoped and may contain personal source text only if selected through the normal export review.

Test save-versus-draft labels, real provenance edges, source deletion, forgotten-text removal, agent/project filters, stable pagination, unknown totals, index recovery, and delegated domain actions. Verify opening the overview uses no model inference and cannot mutate knowledge until the human invokes an existing explicit action.
