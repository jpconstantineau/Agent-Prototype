# Context compaction for small model windows

Status: approved specification. Uses [shared contracts](runtime-contracts.md), [history](threads-and-history.md), [skills](skills.md), and [capability policy](capability-controls.md).

## Purpose

Keep long tasks usable within a small model context window while retaining full history and exact operational facts. Controlled summaries and session rebuilding reduce context without losing permissions, pending work, or mutation receipts.

## User intent

Understand context usage, request Compact now when appropriate, and inspect the resulting summary while keeping access to the original conversation.

## Agent intent

Request compaction when old context crowds out remaining work and continue from the harness's validated replacement context. The agent does not rewrite policy, replace receipts with its own summary, or repeat earlier successful actions.

## Intent and surfaces

Reduce the context supplied to a live model without deleting stored history or losing the exact facts needed to continue. The runtime can compact automatically at safe boundaries. The user has **Compact now** and a context meter. An optional agent tool `request_compaction` asks the controller to compact; it does not let the model rewrite system rules or replace transaction records with prose.

Chrome exposes context usage/window information and may evict older exchanges on overflow. This is not an application-managed semantic summary. There is no assumption of a native `compact()` method. Session `clone()` copies context and is not compaction. Implement compaction as bounded summarization plus creation of a replacement session.

Under the [local endpoint extension](local-model-endpoint.md), use the inference adapter's measured/estimated/unknown budget contract and app-owned message ledger. HTTP servers do not inherit Chrome's context methods or clone semantics. Provider fallback may need a much smaller Chrome packet: preserve current project/memory/skill revisions and exact receipts, and stop if required content cannot fit. Tool-free summary sessions use the selected supported text route; Chrome-only speech transcription is separate.

## Budget and trigger rules

The [context-window reference](local-model-endpoint.md#context-window-reference-checked-2026-10-28) explains runtime capacity, the reported 9,216-token planning example, measurement units, and endpoint-versus-Chrome limits. Use each session's actual capacity rather than treating that example as a fixed API guarantee.

Read `contextUsage`/`contextWindow` when supported and measure the exact next input with `measureContextUsage(input, {responseConstraint})` when available. The controller must account for tool schema and incoming text/media, not compare character counts to token limits. Start an automatic compaction check at 70% usage and aim for at most 45% after rebuilding, reserving at least 20% for a reply/next tool cycle. These are configurable initial defaults, not guarantees about a particular device's model window.

[Agent configurations](agent-library.md) may lower/adjust those ratios only within their specified bounds. [Large-result processing](large-tool-results.md) reduces incoming observation size before the next inference; it does not remove earlier retained model context. Preserve immutable result references and exact control/operation facts in the context manifest. Log before/after measured usage, checkpoint/source references, and the actual replacement prompt through [observability](observability.md).

The approved [result-pruning extension](tool-result-pruning.md) can replace eligible older read payloads with retained references through one deterministic session rebuild before semantic compaction. It preserves original history/receipts and requires an accessible retrieval path. [Loop detection](tool-loop-detection.md) state survives either operation; maintenance cannot reset failure evidence. Goal counters/bindings, exact admitted steering messages, reminder match identities, recall-source revisions, and pipeline checkpoint receipts remain authoritative manifest facts under [shared extension contracts](runtime-contracts.md#6-openclaw-review-extension-contracts).

If usage/measurement APIs are absent, show an unknown meter and use conservative bounded application context packets; catch quota failures before any tool replay. If current system instructions plus required enabled schema alone do not fit, compaction cannot fix it: show the catalog/instruction budget issue and ask the user to narrow capabilities or instructions. Do not silently drop required tools or active human constraints.

Serialize compaction with inference. Safe points are between completed model/tool exchanges, with no in-flight write, undecided human question/proposal, or unconsumed media payload. A pending human answer is retained in application state and blocks session replacement until settled/cancelled. Stop cancels maintenance as well as ordinary work.

## Agent and controller contracts

`request_compaction` requires `version:1`; optional `reason` is 1–200 characters. It returns `{success:true,version:1,status:'requested'}` after registering one idempotent request for the next safe boundary. It does not recursively call prompt inside tool dispatch. Persist this tool observation, then the session manager performs the rebuild before the next normal generation. On the final allowed iteration return a limit outcome rather than start maintenance that implies an impossible continuation.

```json
{"type":"tool_call","name":"request_compaction","arguments":{"version":1,"reason":"Earlier investigation details are no longer needed for the remaining task."}}
```

The controller compaction checkpoint is a closed record with `checkpointId`, `threadId`, `throughPosition`, `sourceRevision`, `summary`, `contextManifest`, `createdAt`, and `status` (`prepared`, `active`, `failed`, `superseded`). Summary fields are: `goal` 1–600, `decisions` 0–8 strings up to 200, `openWork` 0–8 strings up to 200, `uncertainties` 0–5 strings up to 160, and `references` 0–20 accessible record IDs. Total serialized summary must be at most 4000 characters. Never store or request hidden reasoning.

The contextManifest is application-owned: current policy revision; applicable preference revision; eligible loaded skill IDs/revisions/ranges; current original request; exact completed operation IDs and task references/revisions; current progress plan reference; pending child/result references; and last committed source position. The [persona extension](agent-personas.md) adds the frozen personaSnapshot and exact selected revision; rebuild from that source, never a model summary of the persona. Explicit persona Apply invalidates superseded instruction summaries while preserving authoritative receipts and task constraints. Bound manifest lists to the run's real configured operation limits, with overflow stopping/reducing work explicitly. The model may propose a summary but cannot edit these authoritative values.

## Summarize, validate, rebuild

1. Persist completed history/events first and take a stable source boundary. Read only a bounded source packet: prior accepted summary plus recent complete exchanges and relevant records. Very long transcripts are processed in bounded chunks with stable cursors; do not attempt to stuff the entire history into a summarizer.
2. Use a fresh restricted text session to generate the structured summary. Its executor has no task tools and cannot load arbitrary history or skills. At most two summarization calls and one replacement-session creation per compaction attempt; expose maintenance usage separately from the main 12-step counter. Cap automatic compactions at two per main run to prevent loops.
3. Validate shape, lengths, references, and source revision. Merge authoritative operation/task/policy facts from the manifest, not the model's paraphrase. If summary changes an exact human constraint or contradicts known receipts, reject it. Preserve exact critical text outside the lossy summary.
4. Prepare a replacement session with current system instructions, the role profile's eligible Include tool definitions and skill bodies, applicable preferences, only still-needed Discover definitions/sections, the validated checkpoint, and a small recent tail. Retain exact definition/skill revisions in the context manifest. Forced Include content must fit or stop with a Settings action; compaction cannot silently remove it. Recreate through existing Prompt API options/capability checks. If user activation is required, pause for a visible Enable/Continue action rather than claiming automatic success.
5. Measure/bound the replacement and atomically activate its generation token/checkpoint only when ready. Until then retain the old session/state. On failure destroy temporary sessions and keep the old session if usable; otherwise stop with a clear context-limit outcome. Never mark compaction successful merely because summarization returned text.
6. Destroy the superseded session after the successful swap. Future loop iterations use the session manager's active session, not a stale `AgentLoop.session` reference. Continue with the preserved pending observation exactly once; do not replay prior actions.

If a contextoverflow event occurs unexpectedly, announce loss of earlier model context and rebuild from authoritative history before any subsequent mutation. A summary alone cannot prove which writes occurred. Recheck saved task state when references may be stale. A quota failure does not permit repeating earlier successful tools.

## UI, storage, and model presentation

The meter displays measured usage or Unknown and labels compaction Preparing/Ready/Failed. Compact now is disabled while an unsafe boundary is active, with an explanation; it can queue one maintenance request. Show a small checkpoint marker and View summary/source range. Full conversation remains available through history. Users cannot edit summary text as if it were a tool receipt; corrections are explicit new user messages.

Description: “Request a context reduction at the next safe boundary when old details crowd out remaining work. This does not delete history, undo changes, reset budgets, or grant permissions. Keep exact task references and successful actions in application records; do not repeat them after compaction.”

Add `context-manager.js` plus summary validation/storage. Persist summaries/manifests as revisioned derived records in IndexedDB; future sync can share durable checkpoints but never live session objects. Rebuild on another device using its current capabilities. Deleted/disabled skill bodies must not re-enter context through stored summaries; invalidate checkpoints containing revoked instruction content and regenerate the allowed context.

## Acceptance

Test trigger accounting including response schemas, unknown API support, oversized base prompt, safe-boundary waiting, Stop, summary errors, quota failures, swap rollback, and stale-session callbacks. Verify completed writes are not repeated, human constraints survive, revoked skills stay absent, source refs remain accessible, and full history is unchanged. Browser tests cover meter/status/Compact now and failure recovery. Real-model evaluation uses a long multi-step task with actual measured windows; scripted tests prove the orchestration, not semantic summary fidelity.
