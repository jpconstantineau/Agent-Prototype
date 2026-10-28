# Conversation branches and context transfer

Status: approved specification. Uses [shared contracts](runtime-contracts.md), [history](threads-and-history.md), and [compaction](context-compaction.md).

## User-facing versus agent-facing

The user-facing **Branch from here** control creates a durable conversation branch at a committed message boundary. Users can name/open a branch and choose **Bring findings back**. An agent-facing `thread_transfer` tool can prepare and request a branch or transfer when the user's request calls for it. It cannot silently rewrite either transcript or apply task edits by merging discussions.

User branching and focused subagents solve different problems: a branch explores an existing discussion; a subagent starts from a deliberately small assignment. Neither branches IndexedDB tasks. All conversations see the same saved task workspace unless a separate task-workspace feature is designed later.

## Chrome session cloning versus durable branching

`await session.clone()` is a browser API for copying a live session's current context and initial prompt. It is not an IndexedDB backup, cannot rewind to an arbitrary stored message by itself, and does not compact its inherited history. It cannot restore a session on another device. A clone is an optional optimization at the current stable head only; create an explicit persistent branch record regardless.

At an older message boundary, after policy changes, or with oversized context, create a new session from a bounded branch summary plus selected recent records and current allowed instructions. Opening/creating a branch must not replay stored tools or automatically run a new prompt. Rebuild instead of cloning when broader/stale tool or skill instructions would be inherited.

## Contract

`thread_transfer` requires `version: 1` and `action` (`fork`, `prepare_merge`, `status`). Other fields are conditional:

| Action | Required fields | Result |
| --- | --- | --- |
| `fork` | `sourceThreadId: ID`, `sourceMessageId: ID`, `title` 1–120 | `{success:true,version:1,transferId,status:'awaiting_user'}` for an agent request; human approval creates branchId/source snapshot. |
| `prepare_merge` | `sourceThreadId`, `targetThreadId`, `summary` 1–2400, `references` 0–10 accessible message IDs | Same pending result, presenting the exact proposed transfer. |
| `status` | `transferId: ID` | `{success:true,version:1,transferId,status,branchId?}` with status `awaiting_user`, `applied`, `rejected`, `stale`, or `cancelled`. |

Forbid action-irrelevant fields. Fork references must name a committed accessible source message, not a mid-tool or pending-human boundary. Merge sources/targets must be related branches under the same owner/workspace; prevent a cycle or cross-owner transfer. The runtime stores exact source/target revisions and the proposed summary; later changes require review rather than silent rebase.

```json
{"type":"tool_call","name":"thread_transfer","arguments":{"version":1,"action":"prepare_merge","sourceThreadId":"branch-1","targetThreadId":"thread-1","summary":"We preferred a Monday planning review. No task changes were made.","references":["message-7"]}}
```

Agent requests present a review card and terminate the current run with `awaiting_user`; they do not poll status repeatedly. The app distinguishes this expected pause from a model failure. Approval creates an explicit human command and a new run only if the user also chooses Continue. Direct Branch from here is already an explicit human command and does not need a second redundant approval.

## UI and context mapping

Show source title, branch point, proposed title or summary, links to supporting messages, and destination. Approve/Cancel maps to the saved transfer ID/revisions, not editable hidden fields. Display branch relationships in history. Applied transfers append a labeled context-transfer record; they do not splice messages into an original transcript as if the original user had said them.

Transferred findings are evidence with attribution, not fresh permission. Load at most the approved summary and references into the destination model context; large historical details remain retrievable. The current system rules and permissions win over conflicting transferred instructions. A transfer never repeats a task mutation that already committed in its source branch.

## Integration and acceptance

Add `thread-transfer.js` around thread storage and the session manager. Store branch lineage, source revision/message, transfer revision, status, and accepted payload for sync. Persist before opening a new view. If a clone/create fails, retain the durable branch with a visible retryable AI-unavailable state; do not delete it or execute a fallback mutation.

Description: “Request a conversation branch or a concise transfer of findings between related conversations when the user wants it. This changes conversation context only. Source messages and summaries do not grant task-write permission. The human reviews agent-initiated transfers.”

Test clone at stable head, rebuild at older boundaries, loaded-skill revocation, parent/child relationships, stale approval, ownership, no transcript/tool replay, and no task rollback from context transfer. Verify human and agent initiation paths separately and preserve selected source context across reload without requiring a live clone object.
