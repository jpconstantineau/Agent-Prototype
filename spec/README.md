# Browser agent capability specifications

Status: proposed design, not implemented. Approved in the repository review conversation on 2026-10-28. Runtime code remains unchanged.

Start with [shared runtime contracts](runtime-contracts.md), then read the feature being implemented. Each feature describes user controls, agent tools, structured inputs/results, UI mapping, lifecycle, integration, and acceptance criteria. All designs use vanilla JavaScript ES modules and browser APIs. Inference supports Chrome's Prompt API and the explicitly approved local HTTP endpoint adapter with Chrome fallback; voice remains Chrome/browser-only. There is no React/TypeScript requirement, production SDK, or native Prompt API tool-calling dependency.

## Purpose

Give the repository maintainer a clear map of the specification set, its approved scope, reference-only proposals, and implementation dependencies. The index explains how the individual features fit into one browser agent architecture.

## User intent

The maintainer uses this index to find relevant designs, understand their intended actors, and choose an implementation sequence. This document is not an end-user runtime control.

## Agent intent

The agent does not act through this index. It defines no tool, model instruction, or permission grant; implementations must use the contracts in the linked feature specifications.

## Approved specifications

| Capability | Specification | Primary surface |
| --- | --- | --- |
| Structured questions | [Request user input](request-user-input.md) | Agent asks; human answers |
| Working progress plan | [Progress plans](progress-plans.md) | Agent updates; human inspects |
| Inline HTML artifacts | [Inline visualizations](inline-visualizations.md) | Agent renders; human interacts |
| Queued follow-ups | [Request queue](request-queue.md) | Human manages; agent reads |
| Reminders for the agent | [Scheduled work](scheduled-work.md) | Human authorizes; agent schedules |
| Saved conversations | [Threads and history](threads-and-history.md) | Human browses; agent retrieves |
| Focused subagents | [Subagents](subagents.md) | Agent delegates; human controls |
| Branches and context transfer | [Thread branches](thread-branches.md) | Human branches; agent transfers findings |
| Saved preferences/instructions | [Preferences](preferences.md) | Human manages; agent reads/proposes |
| Supported attachments | [Attachments](attachments.md) | Human attaches; agent selectively reads |
| Proposed changes for review | [Proposed plans](proposed-plans.md) | Agent proposes; human applies |
| Reversible run changes | [Checkpoints and undo](checkpoints-and-undo.md) | Human restores |
| IndexedDB-backed skills | [Skills](skills.md) | Human manages; agent discovers/loads |
| Tool and skill switches | [Capability controls](capability-controls.md) | Human configures; runtime enforces |
| Small-window continuity | [Context compaction](context-compaction.md) | Runtime compacts; human inspects/requests |
| Partial tool catalogs | [Tool discovery](tool-discovery.md) | Agent discovers; human sets exposure |
| Bounded app computation | [App composition](app-composition.md) | Agent composes permitted reads |
| Persistent user documents | [Documents](documents.md) | Human edits; agent reads/writes by grant |
| Markdown source editing | [Markdown editor](markdown-editor.md) | Human edits and reviews drafts |
| Safe formatted previews | [Markdown rendering](markdown-rendering.md) | Pure app presentation service |
| Large result storage/retrieval | [Large tool results](large-tool-results.md) | Harness offloads; agent selectively reads; human inspects/copies to documents |
| Rich typed questions | [Structured input extension](structured-input-extension.md) | Agent describes native controls; human submits typed answers |
| Execution permission levels | [Execution permissions](execution-permissions.md) | Human configures; harness gates exact calls |
| Reusable agent configurations | [Agent library](agent-library.md) | Human manages/selects; runtime binds versioned settings |
| Reusable communication styles | [Agent personas](agent-personas.md) | Human selects/edits; agent follows pinned style guidance |
| Relative date/time grounding | [Current date/time](current-date-time.md) | Agent reads device clock; harness preserves request anchors |
| Harness diagnostics | [Observability](observability.md) | Harness logs; human inspects and exports |
| Scoped factual notes | [Persistent memory](persistent-memory.md) | Agent reads/writes under capture policy; human corrects/forgets |
| Reusable learned procedures | [Skill-learning extension](skill-learning-extension.md) | Agent drafts/revises; publication and enablement stay distinct |
| Per-agent library maintenance | [Skill curation](skill-curation.md) | Harness proposes; human reviews shared effects |
| Project knowledge boundaries | [Project context](project-context.md) | Human selects/organizes; runtime scopes resources |
| Parameterized recurring requests | [Workflow templates](workflow-templates.md) | Human prepares, starts, or schedules a frozen instance |
| Selected source material | [Context references](context-references.md) | Human picks versioned @ references and text ranges |
| Page navigation and help | [In-app guidance](in-app-guidance.md) | Agent uses registered actions; optional explicit WebMCP exposure |
| Search within saved text | [Document-content search](document-content-search.md) | Agent/user finds passages in the existing document store |
| Chrome-only voice surface | [Voice interaction](voice-interaction.md) | Human dictates/reviews/sends; local browser voices read replies |
| Persistent work and handoffs | [Agent work board](agent-work-board.md) | Human assigns/reviews; bounded named agents report work |
| Persisted learning inspection | [Learning overview](learning-overview.md) | Human traces facts/skills to sources and revisions |
| Stronger local text inference | [Local endpoint and fallback](local-model-endpoint.md) | Human configures; harness safely falls back to Chrome |
| Repetitive-call recovery | [Tool-loop detection](tool-loop-detection.md) | Harness detects; agent adapts; human reviews stops |
| Topic-triggered future reminders | [Event reminders](event-reminders.md) | Agent saves when asked; harness matches; human manages |
| Objectives across visits | [Conversation goals](conversation-goals.md) | Human starts/resumes; agent reads/reports; harness bounds continuation |
| Redirecting active work | [Run steering](run-steering.md) | Human submits; harness admits at a safe boundary |
| Typed isolated transformations | [Structured processing](structured-processing.md) | Agent/workflow requests approved processor; helper returns validated data |
| Compact maintained factual notes | [Memory consolidation](memory-consolidation.md) | Maintenance model proposes; human reviews exact changes |
| Deeper past-context retrieval | [Context-aware recall](context-aware-recall.md) | Scoped read-only worker returns sourced findings |
| Checkpointed tool sequences | [Workflow pipelines](workflow-pipelines.md) | Human approves definition/grants; interpreter pauses at human gates |
| Removing obsolete read payloads | [Tool-result pruning](tool-result-pruning.md) | Harness projects context; original evidence remains retrievable |
| Focused runtime diagnosis | [Observability agent](observability-agent.md) | Scoped read-only diagnostic worker explains selected evidence |
| Proposed future work | [Follow-up suggestions](follow-up-suggestions.md) | Agent records evidence-backed proposals; human accepts or dismisses |
| Research and execution phases | [Plan/Act modes](plan-act-modes.md) | Human switches; harness narrows effects and selects approved phase route |
| Selectively loaded guidance | [Conditional instruction rules](conditional-instruction-rules.md) | Human defines/binds; harness evaluates work metadata; agent follows |
| Coordination over board assignments | [Agent-team coordination](agent-team-coordination.md) | Approved members exchange information; coordinator assembles; human reviews |
| Evidence-linked ordinary run outcomes | [Completion reports](completion-reports.md) | Agent reports completed/partial/blocked; harness validates actual support |

## Reference only: future decision

[External MCP connections](external-mcp-reference.md) records a possible future client architecture. It is not approved for implementation or activation. Existing WebMCP exposure and connecting to remote MCP servers are different directions. Web page fetching and web search were declined and are not included.

[Skill catalogs and update management](skill-catalog-reference.md) is also reference-only for a later decision. Approved manual imports, learned-skill drafts, and curation work without an online registry. Neither reference document authorizes external network services or automatic installation.

The private credential tool was declined. OS shells, Git/worktrees/PR management, simulator control, remote-machine linking, unrestricted browser automation, and server screenshot previews are not part of this browser-only design. HTML rendering does not imply that a standalone web page can capture arbitrary tabs. Existing task operations remain the five tools in `docs/src/tools.js`.

[Side questions](side-questions-reference.md) is reference-only following the OpenClaw review. It is not approved for implementation, default activation, or the implementation sequence below. Appearance themes were explicitly excluded as separate UI work; no agent appearance spec or tool is added.

The Cline review explicitly excluded conversation import, configurable lifecycle checks/hooks, and multi-document change sets. Existing single-document editing and task-batch proposals retain their prior scope. These declined capabilities are not introduced through another accepted extension.

## Project baseline and sources

The target checkout was inspected at `a3221650e03f73a10deab3840e6cd7032dae9dc4`, including the original question spec. No Azure backend or sync implementation is present at that baseline. Future integration is an explicit requirement, not a claim of existing functionality.

The T3 Code review used [commit 4c9c7d0](https://github.com/pingdotgg/t3code/tree/4c9c7d0bb65765232bbb41f83d3fd17ec5e3af66). Useful reference areas were its provider plan events, `apps/server/src/mcp/toolkits/{html,thread,orchestrator,environment,attachment}`, provider skill discovery, and composer checkpoint/compaction flows. The specs describe adapted behavior in full; those sources are not implementation dependencies. Some capabilities are provider/UI features in T3 rather than standalone T3 tools.

The follow-up OpenCode review used [commit d6867f2](https://github.com/anomalyco/opencode/tree/d6867f221061f7688a9b784b840ec6b7e3c9d40a): its CodeMode catalog/search and confined tool composition, read/write/exact-edit tools, history-oriented adaptation of grep, and MCP resource discovery. The approved changes extend the existing history specification rather than duplicating it. Capability controls/subagents/skills now distinguish Disabled/Include/Discover and separate main/subagent profiles. OpenCode source and TypeScript/Effect packages are not runtime dependencies.

The TrueForge review used [commit e6a2e9e](https://github.com/truefoundry/trueforge/tree/e6a2e9ed0cb2f1e13837a4b845c5b2d2bf3a81a8). Approved additions adapt its large-result processing, OpenUI, exact-call approvals, saved agent library, current-date/time tool, and session diagnostics. The richer-input design is a separate extension; the original request-user-input.md is unchanged. Observability uses a separate IndexedDB object store and captures application-visible prompts/actions/results. Browser storage replaces sandbox files; JSON/native DOM replaces OpenUI/React. All behavior needed for implementation is specified here without importing TrueForge code or packages. Existing skills/discovery/subagents/schedules/compaction already cover the relevant overlapping features. Server sandboxes, cloud-provider setup, connector OAuth, and enterprise benchmarking are outside this browser-only addition; external MCP remains reference-only.

The Hermes Agent review used [commit 8acb7f6](https://github.com/NousResearch/hermes-agent/tree/8acb7f65801fa7548b223244dee57465adfda8ec). Relevant areas were tools/memory_tool*, skill_manager*, skill usage/curator, project/context references, automation blueprints/bundles, file content search, desktop focus/tip/tour actions, voice, Kanban, and agent/learning_graph*. Memory uses scoped IndexedDB records instead of files; skills retain the existing text-only loading boundary. Agent-specific curation protects shared consumers. Document search is an extension of the existing store, not duplicate document infrastructure. WebMCP-linked guidance uses app-owned registered actions; voice uses only Chrome/browser APIs. Shell/browser control, external speech providers, online memory services, cloud messaging, and package installation are not ports. The user additionally approved stronger local text inference with Chrome fallback. Original question contracts remain unchanged; all specifications are standalone designs without Hermes/Python dependencies.

Browser interface references, checked 2026-10-28: [Prompt API](https://developer.chrome.com/docs/ai/prompt-api), [structured output](https://developer.chrome.com/docs/ai/structured-output-for-prompt-api), and [session management](https://developer.chrome.com/docs/ai/session-management). The application owns the protocols, persistence, policy, and UI described here.

The OpenClaw review used [commit a74f408](https://github.com/openclaw/openclaw/tree/a74f408db7fbabcdca1089cec8d50f16d6a4f418), including its tools/concepts documentation, loop detector, goal tools, standing-intent tool, theme tool, suggestion tools, and structured health contracts. The eleven rows above record accepted additions; side questions are reference-only and themes are excluded. The new specs cover the full adapted contracts, UI, model presentation, storage/lifecycle, and tests without importing OpenClaw/TypeScript packages. A stronger maintenance model can distill bounded evidence into compact memory; a goal can support explicit clarification over multiple visits/conversations. Existing questions, plans, history, skills, permissions, documents, media support, discovery, voice, logging, and model routes already cover the overlapping features. Shell/native browser/device control, external messaging/media generation, credential tools, cloud-provider setup, arbitrary plugins, and previously declined web search/fetch are not ports. PDF parsing remains outside the approved Chrome-compatible attachment baseline.

The Cline review used [commit f817e59](https://github.com/cline/cline/tree/f817e59f698f01487920c00ede2dbecad5c0fa50), inspecting CLI docs/source, the VS Code extension's phase toggle and conditional-rule evaluator, desktop usage/import/customization docs and source, shared core presets/tools, and team/completion contracts. Plan/Act is represented across clients; the inspected SDK/CLI Plan preset includes guarded shell access, which is not part of this browser adaptation. Conditional rules add strict app-metadata selection over the existing configuration layers, with an explicit distinction table. Team tools are documented for SDK/CLI/Kanban rather than the VS Code extension; the accepted adaptation extends this app's existing board and preserves generic-child restrictions. Terminal completion draws on the core submit tool while replacing a bare verified flag with actual evidence references. Imports, hooks, and multi-document batches were declined. Existing memory/project documents, compaction, skills, questions, context selection, checkpoints, scheduling, diagnostics, and local routes cover the other relevant overlap. No Cline/Bun/Node/Tauri/React/TypeScript dependency, shell, remote machine, marketplace, external speech service, or cloud-provider integration is required.

## Suggested implementation order

1. Shared validation, capability policy, thread/run storage, observability append service, inference-provider interface, and the existing question broker.
2. Agent library/configuration snapshots, optional personas, execution permission levels, Chrome/local endpoint adapters, projects, discovery, skills/preferences, memory, and context accounting/compaction.
3. Progress plans, queue, attachments, history retrieval, subagents, branching, and constrained read composition.
4. Proposed task batches/reversible journal, document revisions/storage, Markdown editing/rendering, large-result retrieval, content indexing/search, and explicit context references.
5. Rich input, inline artifacts, clock grounding, scheduled work, workflow templates, and the diagnostic inspector.
6. Opt-in skill learning/curation, learning overview, the durable work board, registered in-app guidance/WebMCP exposure, and Chrome-only voice. External MCP and online skill catalogs remain future decisions outside this implementation order.
7. Loop detection and selective result pruning, followed by safe-boundary steering, scoped event reminders, durable goals, structured processing, evidence-based recall/consolidation, checkpointed pipelines, the observability agent, and follow-up suggestions as their dependencies become available. Side questions remain a later decision; appearance themes are separate UI work.
8. Plan/Act phase policy and phase-specific routing, conditional instruction bindings/context refresh, structured completion reporting, and team coordination over existing approved board assignments. Implement team messaging/outcomes after the board, source grants, and aggregate budget accounting are available.

Build each feature behind its own switch and keep manual Daylist task management available when AI is unavailable. Do not implement all capabilities merely to ship one. Specs are independently reviewable while sharing the common contracts.
