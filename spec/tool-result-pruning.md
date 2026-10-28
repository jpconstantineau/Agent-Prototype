# Selective pruning of old model-facing tool results

Status: approved design; not implemented. Extends [large-result storage](large-tool-results.md), [context compaction](context-compaction.md), and [observability](observability.md). Deterministic harness maintenance; no new model tool or summarization inference is required.

## Purpose

Recover working context occupied by earlier evidence that is no longer immediately needed. Keep full source results and exact operational facts accessible while avoiding a summarization call merely to remove obsolete search output.

## User intent

See when older payloads were omitted, inspect the exact original result, and understand measured context savings. Configure pruning per agent without deleting conversation history.

## Agent intent

The agent does not invoke or configure pruning. It uses the resulting compact references and retrieves earlier details through existing result tools when needed. A reference is not proof that unseen content was read.

## Eligibility and settings

Add runtime.pruning `{enabled:boolean,keepRecentExchanges:integer 2–6}` default false/3. Enabling requires usable result_read eligibility/admission through Include or working Discover bootstrap, as with offloading. This service may store a previously inline supported result before projecting it; disabling general incoming offloading does not remove this explicit pruning capability. Required result-control projections and body size/storage limits are exactly those of large-tool-results. A producer with no reviewed compact control projection is ineligible.

Eligible content is a completed older read result such as a document excerpt, search page, or task-list page. Protect the last keepRecentExchanges complete assistant/action/result exchanges, the current pending observation, any referenced pending assignment/review, and results needed to reconcile uncertain effects. Never prune human instructions/answers, approval decisions, loaded skill bodies, persona/role/project instructions, exact operation receipts, or authoritative manifests. Write results are not eligible in v1 even when their large data payload was separately offloaded. Repeated read retrieval may make a result recent again; it does not undo full-body retention.

## Projection contract

At a safe boundary, persist candidate bodies first and build an immutable projection record `{version:1,projectionId,threadId,sourceBoundary,sourceSessionGeneration,entries,createdAt,status}`. sourceBoundary is a committed position; generation is a positive safe integer; entries has 1–12 records; status prepared/active/failed/superseded. Each entry is `{callId,resultId,originalPayloadId,control,bodyIdentity}`. IDs are host-generated references, bodyIdentity identifies exact immutable bytes, and control is the registered tool-specific closed projection <=2000 characters. The stored record's source/ownership/grant checks use the original call; merely knowing resultId does not confer access.

The new model-facing observation uses the existing tool_result_reference envelope, retaining request/name/control/storedResult/instruction. Label it “Earlier read payload omitted from active context; full original is available through result_read.” Keep the actual call/result pairing and source coverage/cursors. Do not shorten arbitrary JSON, cut a string in the middle and call it complete, fabricate a semantic summary, or replace the original transcript/event payload.

The authoritative context manifest records projectionId plus exact original call/result/body references and still-needed control facts. Projection text is derived context, not a user message or fresh permission. Reading original history shows the original full result and a separate indicator of what was supplied in each inference generation.

## Rebuild algorithm

1. At the normal context check, if measured usage reaches 70% (or the configured compaction trigger), inspect eligible results oldest first. With unknown usage use the existing conservative packet bound and show savings as unknown rather than token arithmetic.
2. Select at most 12 payloads whose deterministic replacement materially reduces serialized content. Persist supported original bodies and the prepared projection; if storage/quota/eligibility fails, leave the active context unchanged.
3. Build a candidate session from the current authorized application/configuration sources, exact human constraints, current checkpoint/recent context, and projected older exchanges. No model summary is requested. Respect current source revocations and detect stale source boundaries before activation.
4. Measure the candidate with its response schema and reply reserve. Activate only if it fits and is smaller than the current comparable measured view; when no comparable measurement exists, enforce the conservative packet bound and disclose unknown savings. Aim for the existing compaction target, but do not claim it is guaranteed.
5. Commit the active projection/session generation before swapping. Destroy a failed/stale candidate and keep the old usable session. At most one prune rebuild per main run; if still too large, use normal bounded compaction or stop. A child has at most one within its existing budget/lifecycle.

Chrome retained history cannot be edited in place by changing a local JavaScript array. Use the existing fresh-session rebuild path; clone() does not remove old payloads. HTTP uses a newly projected canonical ledger, retaining raw ledger records separately. Rebuilding incurs no inference itself, though creation/download/user activation can fail. Do not promise provider cache savings or copy OpenClaw's Anthropic-specific thresholds/headers into the browser adapter.

## Lifecycle and UI mapping

Serialize with inference, tools, steering admission, and context maintenance. Pending interactions and unconsumed media block replacement under the common rules. Stop cancels candidate preparation; exact completed effects remain saved. Compaction subsumes obsolete projections into its source manifest and never treats a projected preview as the complete original. Fallback reconstructs the same permitted evidence/projection or compacts further within normal limits; it does not repeat a read/write to recreate lost output. Deleted/expired result bodies become unavailable and cannot be silently reconstructed from supposedly pruned logs.

Show a Context reduced marker with affected result count, source links, generation, and before/after usage with measured/estimated/unknown labels. The run inspector displays original result versus submitted projection. A human Open original action loads the retained record without inference. Disabling pruning affects subsequent rebuilds; it does not silently refill an already reduced session. Restoring old details requires selected retrieval or an explicit bounded rebuild and cannot violate current permissions.

Use result-pruning.js and the existing session/context manager plus immutable result/body stores. Emit control.changed feature pruning and context.changed with actual usage; payload links preserve the exact candidate projection. Retain projection/source references with their run under ordinary history policy. Future sync transports durable projections as optional derived evidence, not a live session or a mandate to use another device's context limits.

## Acceptance

Verify old reads shrink while recent results/receipts/current constraints remain exact, every reference remains retrievable, result_read revocation prevents activation, body persistence failure leaves the old context intact, and replacement failures/Stop do not activate stale projections. Test Unicode/JSON exactness, original transcript preservation, manifest recovery, compaction/fallback interaction, no inference budget consumed by deterministic pruning, and genuine measurement on a supported Chrome build.

Source inspiration: [OpenClaw session pruning](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/concepts/session-pruning.md).
