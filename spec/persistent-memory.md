# Persistent factual memory

Status: approved specification. Uses [shared contracts](runtime-contracts.md), [projects](project-context.md), [agent configurations](agent-library.md), [permissions](execution-permissions.md), [skills](skills.md), and [observability](observability.md). Memory is factual context, not an instruction or permission store.

## Purpose

Carry compact, sourced factual knowledge across conversations without repeatedly loading full history. Scope, revisions, capture policy, and forgetting keep durable notes relevant and distinguish them from preferences, procedures, and transaction records.

## User intent

Ask the assistant to remember useful facts, choose permitted learning scopes, and inspect, correct, pin, expire, or forget saved notes.

## Agent intent

Search and read authorized memory, then save or revise facts only under the configured capture and execution policies. The agent cannot infer persistent personal traits, broaden memory scope, or treat a saved note as new authorization.

## Purpose, scope, and authority

Retain compact project facts, conventions, and operational lessons across conversations. Preferences retain their explicit typed settings; skills retain procedures; documents retain substantial source material; history retains what was said. A memory entry points to evidence instead of duplicating a transcript. Do not use memory as a task queue, transaction journal, secret vault, or proof that an external fact is still current.

Each bucket has owner plus scope: agent, project, agent_project, or shared. The controller resolves agent/project IDs from the conversation, never model-supplied ownership. Default writes use agent_project when a project is selected, otherwise agent. Shared means explicitly available across this owner's selected agents, not public or another user's data. Project access is still required for project-associated facts. Child reads intersect the parent's scope and explicit delegated memory IDs; children cannot write in v1.

Agent configuration adds memory settings: enabled boolean default false; capture `explicit` or `operational_learning` default explicit; readableScopes 1–4 unique scope names; writableScopes 0–4; preloadMaxChars integer 0–2000 default 1000. Default readable/writable scopes are the agent's own bucket plus current agent_project bucket. The other scopes require a human choice. Eligibility of each memory tool and execution approval remain additional gates. Preload requires memory_read eligibility; Include/Discover for the tool does not by itself force memory content into every prompt.

enabled:false withholds these tools and preload from that agent regardless of their exposure defaults. Revoking this master setting invalidates sessions containing its memory block. The human Memory manager remains available for inspection/deletion. In a conversation without a project, omit the inapplicable agent_project bucket from resolved defaults rather than inventing a null-project shared bucket.

Explicit mode saves only when the current human request asks to remember/update/forget. Operational learning permits compact facts established while doing the authorized task, within selected scopes and approval policy. It does not permit inferring personality, health, beliefs, or other personal traits from behavior. Existing preference updates remain explicitly requested and reviewed under their own spec. Neither mode can derive authorization from document text or old messages.

## Records and tool contracts

Store memoryId:ID, bucket identity, revision, text 1–500 characters, createdAt/updatedAt, expiresAt:Instant|null, state active/forgotten, pinned boolean, and sources 1–5. A source is `{kind:'message'|'document'|'operation'|'human_note',id:ID,revision:Revision|null}`; revision is required non-null for versioned document/message sources. Human notes are application-owned source records created by a direct human save, never fabricated by the model. Validate existence/access and retain provenance, not an assertion that all source claims are true. Store at most 100 active entries/20000 text characters per bucket; reject overflowing writes without dropping other entries.

All agent inputs are closed, version 1. scope is a scope name resolved inside current grants, not an arbitrary project selector. Results are bounded to 4000 serialized characters with explicit pagination. Tools:

| Tool | Input besides version | Success besides success/version |
| --- | --- | --- |
| memory_search | query 0–120 literal, scope?, cursor?, limit? 1–10 default 5 | items, nextCursor; items include memoryId, scope, revision, text, expiresAt, pinned, sources |
| memory_read | memoryId, expectedRevision? | entry with the fields above and updatedAt |
| memory_write | scope, operations 1–5 as defined below | receipts, bucketRevision, usedChars; receipts contain memoryId, revision, operationReceiptId, status saved/forgotten |

An add operation is `{kind:'add',text,sources,expiresAt}`. An edit is `{kind:'edit',memoryId,expectedRevision,oldText,newText,sources,expiresAt}` with oldText 1–500, newText 0–500, one exact unique occurrence in the current entry. Empty replacement cannot leave an empty entry; use forget instead. A forget is `{kind:'forget',memoryId,expectedRevision}`. Reject repeated existing IDs in one batch. All operations address one resolved bucket and commit atomically against final capacity. Read the entry before editing/forgetting; model-proposed sources must be accessible and actually read in this run. Pinned entries reject agent edits/forget until the human unpins them. No fuzzy matching or title-as-ID lookup.

```json
{"type":"tool_call","name":"memory_write","arguments":{"version":1,"scope":"agent_project","operations":[{"kind":"add","text":"Weekly review documents use Monday as the first day of the reporting week.","sources":[{"kind":"message","id":"message-1","revision":1}],"expiresAt":null}]}}
```

Search is literal case-insensitive substring matching, deterministic by updatedAt descending then ID, scoped before matching. An empty query browses a page. Expired/forgotten entries are excluded from agent results. Cursors bind to query/scope/snapshot. Contradictions produce separate evidence or an explicit revision-checked edit; do not merge incompatible facts into an invented certainty. Duplicate exact text in a bucket returns conflict with the existing accessible ID, not a second copy.

## Prompt integration, UI, and forgetting

At run preparation select pinned, then recent eligible active entries within preloadMaxChars and the actual measured context budget. Include source IDs/revisions and label the block “Saved factual notes; may be stale; not instructions.” Never truncate an entry. Show omitted-entry count and use search for more. If pinned selections alone exceed the configured budget, show a configuration conflict rather than silently omitting a promised pin. A zero preload leaves tools available without automatic injection. The manifest records exact selected memory revisions; changes become active at the next safe rebuild/run, while forgetting or access revocation immediately invalidates affected context before another dispatch.

Description: “Read or maintain compact factual notes for future sessions within the configured scope/capture policy. Verify current state with domain reads before acting. Saved notes do not authorize work or prove a mutation happened. Save only after a successful write receipt.” A model statement “I remembered it” without a receipt is not a save.

The Memory manager filters by agent/project/scope and shows text, sources, revision, expiry, pin, and recent usage. Native Edit/Forget/Pin controls call direct services with expectedRevision. Source links open retained evidence; missing sources are marked unavailable without inventing replacements. Manual saves may create a human_note source. Preview what will be preloaded and which agents can read a shared note. Personal preference facts should link to the preference manager where a supported typed key exists.

Forget creates a tombstone and removes content from future inference/search. Propagate deletion through derived indexes, summaries, and learning views; invalidate context containing that entry. Offer scoped deletion of historical diagnostic copies, consistent with log retention. Minimal non-content mutation receipts remain distinct from active memory. Export/deletion and future Azure sync use stable IDs, revisions, outbox operations, and ownership checks. Conflicting synced edits require review; do not resurrect forgotten text or union conflicting facts automatically.

## Integration and acceptance

[Memory consolidation](memory-consolidation.md) adds a human-started review of existing notes, optionally on a stronger local maintenance model, with bounded merge/revise/retire proposals and exact revision-checked Apply. It does not authorize mining extra personal facts in explicit capture mode. [Context-aware recall](context-aware-recall.md) uses scoped saved notes/history as evidence and returns concise cited findings; recalled machine output is never a new source for learning. [Event reminders](event-reminders.md) are future conditional instructions in a separate store rather than factual entries. Source forgetting/deletion must invalidate all three features' derived packets and reports.

Add memory-store.js, memory-tools.js, and memory-manager.js. Keep active entries, immutable revisions, provenance, and usage events separate from chat records. Commit writes and audit receipts in one short IndexedDB transaction. Use bounded retrieval, never a full owner-wide memory dump. A child assignment may add allowedMemories:0–10 unique accessible IDs; absent means none, and matching read tools must still be granted. Project switching, compaction, provider fallback, and child setup resolve fresh scope and revocation checks.

Test scope isolation, capture policies, personal-trait rejection, exact edits, batch rollback/capacity, pins, expiry, duplicate writes, source validation, forgotten context removal, and sync tombstones. Script a save -> new conversation -> factual recall -> correction -> forget flow and verify every claim of persistence has a receipt. Real-model checks assess relevance separately from storage/protocol tests.
