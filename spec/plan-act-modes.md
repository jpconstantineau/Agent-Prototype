# Plan and Act conversation modes

Status: approved design; not implemented. Extends [agent configuration](agent-library.md), [execution permissions](execution-permissions.md), [proposals](proposed-plans.md), [model routes](local-model-endpoint.md), and [context management](context-compaction.md). Uses browser-owned policy and vanilla JavaScript; no Cline runtime dependency.

## Purpose

Give the user an explicit research/planning phase that prevents domain changes while an approach is being clarified. A separate Act phase can execute the chosen task under existing permissions. Independent phase routes let a stronger local model plan work that Nano can later execute within its smaller context.

## User intent

Explore and refine a request in Plan mode, inspect the proposed approach, and deliberately switch to Act when ready. Return to Plan when more clarification is needed and understand which model and capabilities are active.

## Agent intent

Follow the active phase and its admitted tool catalog. In Plan, read permitted evidence, ask questions, and present an approach. In Act, fulfill the current authorized request through normal tools. The agent cannot switch phases, broaden grants, or treat a mode change as approval for arbitrary operations.

## Distinction from existing specs

Agent-library settings are the saved baseline for a named agent. Execution permissions determine which eligible operations are denied, require approval, or can execute automatically. A progress plan displays steps, and a proposed task batch freezes exact changes for review. Plan/Act is a temporary conversation phase layered over those settings; it neither rewrites the saved configuration nor replaces exact-call approvals.

Plan's read-only ceiling applies even if execution-permissions.enabled is false or level is automatic. Selecting Act removes only that additional phase restriction. It does not enable Disabled tools, select a new project, approve a pending batch, publish a skill, start a schedule, or send a new user request. Direct human editing controls remain usable under their own explicit human services.

## Configuration and binding contract

Add closed agent setting extensions.planAct `{enabled:boolean,defaultPhase:'plan'|'act',planModelRouteId:ID|null,actModelRouteId:ID|null}`. Migration defaults false/act/null/null preserve current behavior; offer Plan as a deliberate default for new profiles. Null route inherits the applicable main-role route. Routes are human-configured device-local references, not provider URLs/secrets in the agent body. Invalid or unresolved routes follow existing visible fallback rules, never another agent's credentials.

When enabled, persist thread phase `{version:1,phase:'plan'|'act',revision:Revision,changedAt:Instant}` and an immutable transition receipt. With the feature disabled the effective phase is act under normal policy, and no misleading mode switch is shown. A newly enabled feature on an existing thread requires explicit Apply while idle; do not retroactively claim prior work ran in Plan. Save phase/configuration references in run and session snapshots.

Human setPhase input is closed `{threadId,expectedThreadRevision,expectedPhaseRevision,phase}`. Success `{success:true,threadId,threadRevision,phase,phaseRevision,transitionId,status:'applied'}` follows successful replacement preparation and binding commit. Domain failures use shared codes. No model tool or WebMCP registration is introduced. Only the user can change phase; an assistant's prose recommendation or a button drawn in generated HTML is not a transition command.

## Phase effect policy

| Operation | Plan | Act |
| --- | --- | --- |
| Task/document/attachment/history reads | Allowed only within current grants and normal approvals | Same |
| Questions, progress updates, structured completion | Allowed within their existing lifecycles | Same |
| Tool/skill discovery and approved skill loading | Allowed, with unchanged budgets and source scope | Same |
| Scoped read-only helpers/recall/processing/diagnosis | Allowed if independently enabled and granted | Same |
| Task/document/memory/preference/skill writes, reminder/schedule/goal creation/reporting, board mutations, suggestions | Denied to the agent | Normal current-request and permission rules |
| Pipeline execution or routed worker dispatch that could write | Denied | Normal pipeline/board admission rules |

Logging, immutable result persistence, context compaction/pruning, and run-progress bookkeeping are harness state, not domain mutations. A Plan conversation can discuss a prospective task-change batch, but propose_plan's Apply path cannot bypass the Plan ceiling; prepare an exact batch only after Act or through an explicit human-owned draft service. Team coordination has the narrowly documented bookkeeping exception in [team coordination](agent-team-coordination.md); it grants no domain writes or extra workers. Generic unknown-effect tools are denied in Plan. Maintain a reviewed per-tool effect/purpose registry, not a model's self-declared safe flag.

For denied writes return permission_denied with a short explanation and an app-owned Open mode control; do not execute a substitute tool. A child or team work attempt inherits the parent's Plan ceiling, and a saved Act configuration cannot override it. A schedule/pipeline already independently authorized before this thread's phase change retains its own scope, but no background work can claim this foreground thread's phase as its authority. Stop all remains the explicit way to stop separately running work.

## Transition and prompt assembly

Allow a transition only at an idle/safely settled boundary with no executing tool, undecided form/approval, or unresolved child. For a busy thread show Stop and switch or Wait until finished, without claiming the change is immediate. Recheck current policy and pending state after awaits. Prepare the candidate phase catalog/instructions/route, measure required context, then atomically commit the phase/thread revision and receipt before activating the session generation. On failure keep the old phase active and show why.

Inject an application-owned phase packet `{version:1,phase,phaseRevision,phaseAuthority:'human',configurationRevision}` into session setup. Plan instructions say: “Investigate and clarify using permitted reads. Produce a useful approach. Do not change saved domain records or change mode. A proposed plan is not executed work.” Act instructions say: “Carry out the current authorized request under effective permissions. Reuse planning evidence, verify current revisions before writes, and do not repeat settled operations.” Both preserve the normal tool_call/final action schema and exact receipt semantics.

Carry the exact latest human request and accepted constraints, selected plan, necessary references, and prior operation receipts across the transition. A stronger planner's entire transcript may exceed Nano's window. Use existing bounded compaction with the exact constraints/manifest retained, then measure the Act session's actual contextWindow. If required material cannot fit, show a smaller-context/model choice; do not silently drop conditions or assert Nano read the full plan. The host enforces read-only behavior independently of prompt quality.

Changing phase or route does not reset main/child/helper/goal/pipeline counters. A user must explicitly Continue/send a request after switching; setPhase alone performs no inference or tool execution. An explicitly labeled Switch to Act and continue action is one human command containing both choices, using the same settled-boundary checks and current task snapshot. Returning to Plan invalidates unstarted write approvals and prepared write actions; it never reverses committed changes.

## UI, storage, and integration

Show native Plan/Act segmented controls beside the composer, a current phase/model badge, and a short capabilities explanation. Mode selection is separate from per-agent permission settings. Settings exposes default phase and optional phase-specific routes with effective-policy previews. The plan handoff view links exact plan/evidence, unresolved questions, chosen Act model, and measured/unknown context. Ordinary simple requests can start directly in Act when selected by the user.

Persist bindings/transition receipts in IndexedDB and emit control.changed feature phase with actual human attribution. Compaction, fallback, reopening, steering, and diagnostic views preserve the exact phase revision. Reload restores the phase but starts no work. Sync durable phase selection with expected revisions; another device must resolve routes/current policy locally and cannot resume merely because an Act selection arrived. Public exports omit endpoint details and credentials.

Implement phase-policy.js and phase-controller.js around the shared scheduler, registry, and session manager. Tests must prove Plan blocks writes across chat, helpers, composition, team/board/pipeline entry points, and externally exposed agent transports; manual controls remain explicitly human. Cover mode/config conflicts, candidate preparation failure, pending interactions, Stop, stale approvals, no inference on selection, local-planner-to-Nano handoff, unknown effects, and no budget reset.

Sources: [Cline Plan/Act docs](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/docs/core-workflows/plan-and-act.mdx), [SDK presets](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/sdk/packages/core/src/extensions/tools/presets.ts), and [extension toggle](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/apps/vscode/src/core/controller/state/togglePlanActModeProto.ts). Cline's CLI/core permits guarded shell investigation in Plan; this browser design has no shell and uses its own stricter domain-effect ceiling.
