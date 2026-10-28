# Side questions and temporary clarification chat

Status: reference only; future implementation decision required. The user approved documenting this option, not implementing or enabling it. Relates to [branches](thread-branches.md), [context references](context-references.md), [history](threads-and-history.md), and [observability](observability.md).

## Purpose

Describe a possible lightweight clarification surface that keeps tangential questions outside the main task's working context. Maintainers can assess its value and resource cost later without treating it as approved implementation work.

## User intent

Ask about a selected passage or current activity, inspect a focused answer, clear the side conversation, and explicitly bring useful findings into the main discussion if desired.

## Agent intent

The main agent does not open or control this surface. A separate read-only responder would answer only the side question using a bounded snapshot; it would not resume or redirect the main assignment, invoke mutation tools, or persist new memory.

## Possible interface and contracts

An Ask a side question button on selected text opens a side panel and fills a quoted draft. Opening/prefilling does not infer. The user edits and presses Send, or opens the panel without a selection. Selection references use exact message/document revision and UTF-16 offsets from context-references; no arbitrary DOM selector or privileged screen snapshot is needed.

Proposed human Submit input is closed `{threadId,question,sourceRefs}`: question nonblank 1–2000, sourceRefs 0–3 existing selected-range reference objects. Success `{success:true,sideId,questionId,status:'queued'}` is acceptance, not an answer. A separate completion record is `{version:1,sideId,questionId,status,answer,sourceRefs,errorCode}`; status completed/failed/cancelled, answer string 0–2400 nonblank only for completed, errorCode known shared code/null, sourceRefs are verified supplied sources. All IDs/ownership come from the controller. There is no new model tool in the main agent schema.

The side responder output schema is closed `{version:1,answer,sourceRefs}` with answer 1–2400 and at most three verified evidence references. It uses a fresh tool-free text context containing the side question, selected sources, and an app-built relevant snapshot <=6000 characters. Do not copy the entire live parent session or assume clone() yields a smaller or permission-safe context. Maximum two attempted generations per submitted question including correction/fallback, with a visible per-panel allowance of six until another explicit human reset. Scheduling is shared: no guarantee of simultaneous Nano execution. Main tools/approvals keep their own lifecycle.

## Separation, transfer, and retention

Side exchanges would remain outside the main transcript and automatic main context. A visible Transfer to main action uses the existing reviewed context-transfer service, with a source snapshot and a concise human-selected finding; no silent merge. This may require extending transfer sources to a typed side result in the future implementation decision. Selecting text does not authorize changing its source or sending a new main request.

Ephemeral is a UI/history retention choice, not a promise of zero diagnostic traces. The accepted user question, submitted packet, actual provider, output, validation, cancellation, and transfer would still be logged under observability policy and shown clearly. No unsubmitted selection/draft is logged. A future implementation must choose whether side exchanges survive reload; the proposed default is memory-only UI state with no auto-resume, while retained diagnostic copies follow explicit user retention/deletion controls. Hiding the panel preserves its in-memory draft; Clear cancels its own request and clears only side UI state.

No agent-facing side-chat starter, autonomous learning, page navigation, writes, external service, shell, native app control, or unrestricted parent-history access is proposed. Route selection would follow existing approved text routes and measured budgets; switching provider cannot broaden selected sources. Large or unavailable sources require an explicit smaller selection. Main Stop should visibly offer Stop main / Stop all so a side task is never mistaken for cancelled work.

## Future decision and verification

Before implementation decide whether the interface justifies extra model sessions, how mobile presents it, retention across reload, budget accounting relative to goals, and the exact reviewed-transfer extension. Keep this document out of the approved implementation sequence and default tool registry/configuration. Nothing in it authorizes a new capability switch being enabled now.

If later approved, verify source isolation, selected-range revisions, no inference on open/prefill, scheduling and cancellation, unsupported model handling, safe source rendering, logging disclosure, no main-context changes without Transfer, and no tool effects from the responder. Real-model tests should measure whether the separate context helps small-window tasks rather than assume improvement.

Source inspiration: [OpenClaw side questions](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/btw.md). This reference defines a possible browser adaptation without adopting gateway RPC or Codex thread-fork behavior.
