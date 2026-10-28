# Checkpoints and undoing run changes

Status: approved intent specification. Uses [shared contracts](runtime-contracts.md). This deliberately states storage capabilities and behavioral requirements rather than prescribing a detailed database schema.

## Purpose

Make agent changes understandable and conditionally reversible without erasing unrelated manual or later changes. A durable mutation journal lets recovery depend on saved receipts and revisions rather than conversational claims.

## User intent

Review exactly what a run changed and undo eligible changes while retaining conversation evidence and respecting subsequent edits.

## Agent intent

Inspect the read-only run_changes report to explain actual committed work. The agent cannot execute or approve restoration, erase its audit history, or declare a change undone without the human service's result.

## Purpose and surfaces

Provide a user-facing **Review changes** and **Undo changes from this run** action. The user must be able to understand and reverse a run's local Daylist mutations without rewinding unrelated manual work. Chat rewind and task undo are separate: a user may keep the conversation as evidence while reversing its saved changes, or branch a discussion without changing task data.

The agent may inspect a read-only `run_changes` report to explain its work. It cannot approve/execute restoration, erase its audit trail, or declare its own changes undone. User controls call an application service directly. Undo is available even if AI is disabled; no model inference is needed to construct or execute the inverse.

## Storage intent

An implementation needs enough durable information to attribute every committed task mutation to an actor, thread, run, and unique operation. It must retain the affected task's stable identity, exact before/after values or equivalent reversible delta, ordering, and a revision/precondition proving whether it is still safe to reverse. An addition needs a way to reverse the existence of that newly added item; an edit/completion needs a way to restore its prior values. Store those facts atomically with the actual mutation, including changes made through proposals and authorized WebMCP calls.

Do not promise rollback for old records that lack this information. A migration may expose undo only for future runs. Retention must be explicit: deleting a checkpoint or aging out its journal removes that undo opportunity, not the saved tasks themselves. A compaction summary is not a reversible journal.

Concurrent manual edits, later agent runs, and synced remote edits must be detected. Never restore an entire database snapshot over them. The safe version-1 policy is all-or-nothing undo of the selected run: if any affected record fails its current precondition, make no changes and show a conflict review. The user can resolve it manually; no automatic “force restore” is needed.

## Contracts

Agent `run_changes` input requires `version:1`, `runId:ID`; optional cursor and limit integer 1–20 default 10. Scope is the current authorized workspace. Result is `{success:true,version:1,runId,changes,nextCursor,undoAvailability}`. Each change has `changeId`, stable task reference with current local numeric handle where available, `kind:'added'|'edited'|'completed'|'reopened'`, bounded before/after field summaries, and `conflict` boolean. `undoAvailability` is `available`, `conflicted`, `already_undone`, `expired`, or `not_recorded`.

```json
{"type":"tool_call","name":"run_changes","arguments":{"version":1,"runId":"run-1","limit":10}}
```

The user-only service exposes `previewUndo({runId})` and `applyUndo({previewId,expectedRevision})`. Preview returns a stable ID/revision, readable inverse effects, conflict reasons, and expiry no longer than ten minutes. Apply returns `{status:'undone',undoId,runId,changedTaskIds}` or an explicit conflict/error with nothing changed. Task IDs returned to a device use its mapping; preserve stable identities in stored receipts. Duplicate apply of the same preview returns its original receipt without another inverse.

## UI mapping and lifecycle

Review changes shows task labels and exact affected fields grouped by run, with provenance and outcome. Undo opens the preview, shows whether new tasks will disappear and which values will be restored, and provides Confirm undo/Cancel. If no reversible information exists, explain why instead of showing an enabled control. A stale preview requires refresh.

Applying undo is itself a recorded human operation, linked to the original run. Keep the conversation and receipts readable with an Undone label. Do not silently reopen/continue the old agent run after undo. Invalidate any active sessions/proposals whose assumptions depend on the restored data; their next work must read fresh state. Do not resurrect cancelled schedules/queued messages or reverse external effects merely because tasks were restored. Redo is out of scope for version 1.

Undo is disabled while any run is actively changing the selected records; stop/finish it first. Recheck preconditions immediately before commit anyway. For multiple changes to one task within a run, the inverse service must reconstruct the run's net effect correctly in reverse order rather than replaying an arbitrary list of old values.

## Sync and implementation boundary

Extend task mutation services, not just the chat view: otherwise manual/WebMCP/proposal paths would escape attribution. IndexedDB supports the local atomicity boundary. A future Azure API must enforce equivalent revisions and idempotent inverse operations server-side. A device without up-to-date task revisions cannot advertise safe cloud-wide undo. Pending sync conflicts hold undo; an offline local undo syncs as a new conditional operation, not a command to overwrite the remote database.

Description for the read tool: “Inspect changes actually committed by a run. This does not undo anything. Report conflicts and the user's review/undo option accurately.”

## Acceptance

Verify additions, edits, completion/reopen, multiple mutations per task, partially failed runs, proposal batches, duplicate undo, cancellation before commit, and retention expiry. Introduce a later manual/synced edit and prove undo neither overwrites it nor partially reverses other records. Browser tests cover preview, explicit confirmation, conflict explanation, disabled AI, unchanged conversation evidence, and independent task/chat actions. Detailed store/index/Cosmos design can be decided during implementation as long as these invariants hold.
