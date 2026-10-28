# Browser agent capability specifications

Status: proposed designs, not implemented. Approved scope and reference-only decisions from the repository review remain unchanged. This consolidation on 2026-10-28 reduces 59 specification files to 18: 14 epics, three standalone foundations, and this index. Runtime code is unchanged.

## Purpose

Give maintainers a coherent implementation map organized by shared purpose and ownership rather than by the source repository where an idea was discovered. Feature chapters preserve their full contracts, UI mapping, model presentation, persistence, lifecycle, and acceptance criteria.

## User intent

Find the design for a use case, understand its human-facing controls and dependencies, and choose an implementation sequence. The index is maintainer guidance and is not a runtime control.

## Agent intent

The agent does not act through this index. Only tools explicitly defined in feature chapters are model-facing; reading an epic or enabling one feature does not grant the others.

## Foundations

Start with [shared runtime contracts](runtime-contracts.md). They own protocol envelopes, common validation, identity, persistence, cancellation, evidence, scheduling, and aggregate budgets; feature chapters specialize those contracts without creating alternate versions.

The original [structured user questions](request-user-input.md) remain a standalone, unchanged baseline protocol and broker. The [richer input chapter](interactive-experiences.md#feature-structured-input-extension) is still an optional separate contract, preserving the original review decision.

The standalone [local endpoint and Chrome fallback](local-model-endpoint.md) owns inference adapters and the [Prompt API context-window reference](local-model-endpoint.md#context-window-reference-checked-2026-10-28). Retaining it separately gives every epic one provider/capacity contract to reference.

All designs use vanilla JavaScript ES modules and browser/Chrome APIs. No React/TypeScript runtime, production SDK, arbitrary code execution, or native Prompt API tool-calling dependency is required. The app owns action validation and execution; voice remains Chrome/browser-only.

## Approved epics

| Epic | Feature chapters |
| --- | --- |
| [Agent configuration, guidance, and project scope](agent-configuration.md) | [Agent library](agent-configuration.md#feature-agent-library); [Project context](agent-configuration.md#feature-project-context); [Preferences](agent-configuration.md#feature-preferences); [Agent personas](agent-configuration.md#feature-agent-personas); [Conditional instruction rules](agent-configuration.md#feature-conditional-instruction-rules) |
| [Capability exposure, discovery, permissions, and phases](capability-policy.md) | [Capability controls](capability-policy.md#feature-capability-controls); [Tool discovery](capability-policy.md#feature-tool-discovery); [Execution permissions](capability-policy.md#feature-execution-permissions); [Plan and Act modes](capability-policy.md#feature-plan-act-modes) |
| [Conversation history, context selection, and request lifecycle](conversation-lifecycle.md) | [Threads and history](conversation-lifecycle.md#feature-threads-and-history); [Thread branches](conversation-lifecycle.md#feature-thread-branches); [Attachments](conversation-lifecycle.md#feature-attachments); [Context references](conversation-lifecycle.md#feature-context-references); [Request queue](conversation-lifecycle.md#feature-request-queue); [Run steering](conversation-lifecycle.md#feature-run-steering) |
| [Work planning, reviewed changes, and evidence-based outcomes](work-lifecycle.md) | [Progress plans](work-lifecycle.md#feature-progress-plans); [Conversation goals](work-lifecycle.md#feature-conversation-goals); [Proposed task changes](work-lifecycle.md#feature-proposed-plans); [Checkpoints and undo](work-lifecycle.md#feature-checkpoints-and-undo); [Completion reports](work-lifecycle.md#feature-completion-reports); [Follow-up suggestions](work-lifecycle.md#feature-follow-up-suggestions) |
| [Bounded context, selective evidence, and loop recovery](context-management.md) | [Large tool results](context-management.md#feature-large-tool-results); [Tool-result pruning](context-management.md#feature-tool-result-pruning); [Context compaction](context-management.md#feature-context-compaction); [Tool-loop detection](context-management.md#feature-tool-loop-detection) |
| [Versioned documents, Markdown editing, rendering, and search](document-workspace.md) | [Documents](document-workspace.md#feature-documents); [Markdown editor](document-workspace.md#feature-markdown-editor); [Markdown rendering](document-workspace.md#feature-markdown-rendering); [Document-content search](document-workspace.md#feature-document-content-search) |
| [Reusable skills, learned drafts, and per-agent curation](skill-library.md) | [Skill discovery and loading](skill-library.md#feature-skills); [Skill learning](skill-library.md#feature-skill-learning-extension); [Skill curation](skill-library.md#feature-skill-curation) |
| [Factual memory, recall, consolidation, and learning inspection](memory-and-learning.md) | [Persistent factual memory](memory-and-learning.md#feature-persistent-memory); [Context-aware recall](memory-and-learning.md#feature-context-aware-recall); [Memory consolidation](memory-and-learning.md#feature-memory-consolidation); [Learning overview](memory-and-learning.md#feature-learning-overview) |
| [Clock grounding, scheduled work, and topic reminders](time-and-reminders.md) | [Current date and time](time-and-reminders.md#feature-current-date-time); [Scheduled work](time-and-reminders.md#feature-scheduled-work); [Event reminders](time-and-reminders.md#feature-event-reminders) |
| [Reusable workflows and bounded structured processing](workflows-and-processing.md) | [Workflow templates](workflows-and-processing.md#feature-workflow-templates); [Workflow pipelines](workflows-and-processing.md#feature-workflow-pipelines); [Structured processing](workflows-and-processing.md#feature-structured-processing); [App read composition](workflows-and-processing.md#feature-app-composition) |
| [Focused delegation, durable assignments, and agent teams](agent-coordination.md) | [Focused subagents](agent-coordination.md#feature-subagents); [Agent work board](agent-coordination.md#feature-agent-work-board); [Agent teams](agent-coordination.md#feature-agent-team-coordination) |
| [Harness observability and scoped diagnostic analysis](diagnostics.md) | [Harness logging and run inspector](diagnostics.md#feature-observability); [Observability agent](diagnostics.md#feature-observability-agent) |
| [Structured interaction, visual artifacts, guidance, and voice](interactive-experiences.md) | [Structured input extension](interactive-experiences.md#feature-structured-input-extension); [Inline visualizations](interactive-experiences.md#feature-inline-visualizations); [In-app guidance](interactive-experiences.md#feature-in-app-guidance); [Voice interaction](interactive-experiences.md#feature-voice-interaction) |

## Why these boundaries

Each epic has one common user purpose, an ownership table, and integration/delivery guidance before the complete feature contracts. Related features share identities and services instead of duplicating infrastructure: one configuration resolver, thread history, document revision store, skill library, factual-memory store, work board, and diagnostic stream.

Consolidation does not collapse distinctions that affect authority or correctness. Exposure is separate from execution permission and phase; a progress plan is separate from a task-change proposal; run completion does not accept a board/team/goal outcome; history is separate from diagnostic logs; factual memory is separate from procedural skills; and a schedule is separate from a topic reminder. Read-only children remain distinct from explicitly assigned main-role workers. Native form answers, Markdown, sandboxed HTML, and registered app actions retain their own trust boundaries.

Optional capabilities retain separate switches and can be implemented independently; mandatory validation, core logging, and error guards remain mandatory. An epic is a delivery grouping, not an instruction to ship every chapter at once or a new database schema that merges all its records. Chapter contracts and shared runtime rules are normative; the epic guide explains how to connect them.

## Reference only: future decision

[External MCP connections](future-reference.md#feature-external-mcp-reference) records a possible future client architecture. It is not approved for implementation or activation. Existing WebMCP exposure and connecting to remote MCP servers are different directions. Web page fetching and web search were declined and are not included.

[Skill catalogs and update management](future-reference.md#feature-skill-catalog-reference) is also reference-only for a later decision. Approved manual imports, learned-skill drafts, and curation work without an online registry. Neither reference chapter authorizes external network services or automatic installation.

The private credential tool was declined. OS shells, Git/worktrees/PR management, simulator control, remote-machine linking, unrestricted browser automation, and server screenshot previews are not part of this browser-only design. HTML rendering does not imply that a standalone web page can capture arbitrary tabs. Existing task operations remain the five tools in `docs/src/tools.js`.

[Side questions](future-reference.md#feature-side-questions-reference) is reference-only following the OpenClaw review. It is not approved for implementation, default activation, or the implementation sequence below. Appearance themes were explicitly excluded as separate UI work; no agent appearance spec or tool is added.

The Cline review explicitly excluded conversation import, configurable lifecycle checks/hooks, and multi-document change sets. Existing single-document editing and task-batch proposals retain their prior scope. These declined capabilities are not introduced through another accepted extension.

## Project baseline and sources

The target checkout was inspected at `a3221650e03f73a10deab3840e6cd7032dae9dc4`, including the original question spec. No Azure backend or sync implementation is present at that baseline. Future integration is an explicit requirement, not a claim of existing functionality.

The T3 Code review used [commit 4c9c7d0](https://github.com/pingdotgg/t3code/tree/4c9c7d0bb65765232bbb41f83d3fd17ec5e3af66). Useful reference areas were its provider plan events, `apps/server/src/mcp/toolkits/{html,thread,orchestrator,environment,attachment}`, provider skill discovery, and composer checkpoint/compaction flows. The specs describe adapted behavior in full; those sources are not implementation dependencies. Some capabilities are provider/UI features in T3 rather than standalone T3 tools.

The follow-up OpenCode review used [commit d6867f2](https://github.com/anomalyco/opencode/tree/d6867f221061f7688a9b784b840ec6b7e3c9d40a): its CodeMode catalog/search and confined tool composition, read/write/exact-edit tools, history-oriented adaptation of grep, and MCP resource discovery. The approved changes extend the existing history specification rather than duplicating it. Capability controls/subagents/skills now distinguish Disabled/Include/Discover and separate main/subagent profiles. OpenCode source and TypeScript/Effect packages are not runtime dependencies.

The TrueForge review used [commit e6a2e9e](https://github.com/truefoundry/trueforge/tree/e6a2e9ed0cb2f1e13837a4b845c5b2d2bf3a81a8). Approved additions adapt its large-result processing, OpenUI, exact-call approvals, saved agent library, current-date/time tool, and session diagnostics. The richer-input design is a separate extension; the original request-user-input.md is unchanged. Observability uses a separate IndexedDB object store and captures application-visible prompts/actions/results. Browser storage replaces sandbox files; JSON/native DOM replaces OpenUI/React. All behavior needed for implementation is specified here without importing TrueForge code or packages. Existing skills/discovery/subagents/schedules/compaction already cover the relevant overlapping features. Server sandboxes, cloud-provider setup, connector OAuth, and enterprise benchmarking are outside this browser-only addition; external MCP remains reference-only.

The Hermes Agent review used [commit 8acb7f6](https://github.com/NousResearch/hermes-agent/tree/8acb7f65801fa7548b223244dee57465adfda8ec). Relevant areas were tools/memory_tool*, skill_manager*, skill usage/curator, project/context references, automation blueprints/bundles, file content search, desktop focus/tip/tour actions, voice, Kanban, and agent/learning_graph*. Memory uses scoped IndexedDB records instead of files; skills retain the existing text-only loading boundary. Agent-specific curation protects shared consumers. Document search is an extension of the existing store, not duplicate document infrastructure. WebMCP-linked guidance uses app-owned registered actions; voice uses only Chrome/browser APIs. Shell/browser control, external speech providers, online memory services, cloud messaging, and package installation are not ports. The user additionally approved stronger local text inference with Chrome fallback. Original question contracts remain unchanged; all specifications are standalone designs without Hermes/Python dependencies.

Browser interface references, checked 2026-10-28: [Prompt API](https://developer.chrome.com/docs/ai/prompt-api), [structured output](https://developer.chrome.com/docs/ai/structured-output-for-prompt-api), and [session management](https://developer.chrome.com/docs/ai/session-management). The application owns the protocols, persistence, policy, and UI described here.

The OpenClaw review used [commit a74f408](https://github.com/openclaw/openclaw/tree/a74f408db7fbabcdca1089cec8d50f16d6a4f418), including its tools/concepts documentation, loop detector, goal tools, standing-intent tool, theme tool, suggestion tools, and structured health contracts. Its eleven accepted additions are retained in the feature chapters above; side questions are reference-only and themes are excluded. The new specs cover the full adapted contracts, UI, model presentation, storage/lifecycle, and tests without importing OpenClaw/TypeScript packages. A stronger maintenance model can distill bounded evidence into compact memory; a goal can support explicit clarification over multiple visits/conversations. Existing questions, plans, history, skills, permissions, documents, media support, discovery, voice, logging, and model routes already cover the overlapping features. Shell/native browser/device control, external messaging/media generation, credential tools, cloud-provider setup, arbitrary plugins, and previously declined web search/fetch are not ports. PDF parsing remains outside the approved Chrome-compatible attachment baseline.

The Cline review used [commit f817e59](https://github.com/cline/cline/tree/f817e59f698f01487920c00ede2dbecad5c0fa50), inspecting CLI docs/source, the VS Code extension's phase toggle and conditional-rule evaluator, desktop usage/import/customization docs and source, shared core presets/tools, and team/completion contracts. Plan/Act is represented across clients; the inspected SDK/CLI Plan preset includes guarded shell access, which is not part of this browser adaptation. Conditional rules add strict app-metadata selection over the existing configuration layers, with an explicit distinction table. Team tools are documented for SDK/CLI/Kanban rather than the VS Code extension; the accepted adaptation extends this app's existing board and preserves generic-child restrictions. Terminal completion draws on the core submit tool while replacing a bare verified flag with actual evidence references. Imports, hooks, and multi-document batches were declined. Existing memory/project documents, compaction, skills, questions, context selection, checkpoints, scheduling, diagnostics, and local routes cover the other relevant overlap. No Cline/Bun/Node/Tauri/React/TypeScript dependency, shell, remote machine, marketplace, external speech service, or cloud-provider integration is required.

## Suggested implementation order

1. Shared runtime validation, policy, thread/run identity and storage, diagnostic append service, inference-provider interface, and the original question broker.
2. Agent configuration and project scope; capability exposure/discovery, exact-call permissions and Plan/Act; Chrome/local adapters and measured context accounting. Add persona/rule/preference layers through the same resolver.
3. Durable conversation history, source selection, queue/steering, and supported attachments; document revisions, safe rendering, and editor drafts.
4. Skills and factual-memory foundations; immutable tool results, pruning/compaction, and loop recovery; document passage search and bounded history/recall services.
5. Run progress, reviewed task batches, mutation receipts/undo, completion reports, and durable goals. Add follow-up proposals without automatic execution.
6. Clock grounding, open-page schedules and topic reminders; frozen workflow templates, isolated processing/read composition, then resumable pipelines after durable gates and queue support.
7. Bounded analytical children, durable board workers, then approved teams after source grants and aggregate accounting. Implement learned-skill publication, curation, reviewed memory consolidation, and the human learning overview as their stores become available.
8. Optional rich forms, isolated artifacts, registered guidance/WebMCP exposure, Chrome voice, and scoped diagnostic analysis after their broker/rendering/logging dependencies.

Keep optional features behind their own switches and keep manual Daylist task management available when inference is unavailable. The reference-only epic is outside this implementation order. Future Azure Static Web Apps/Cosmos DB sync remains a design boundary, not an existing backend or an implicit execution grant across devices.

## Consolidation map

Former files are now feature chapters in the linked canonical epic. They were removed to avoid maintaining duplicate specifications; Git history retains the prior versions. Anchors and internal cross-links target the corresponding chapters and sections. The original question specification is unchanged; the two other foundations retain their content with migrated cross-links.

| Canonical epic | Former specification files |
| --- | --- |
| [Agent configuration, guidance, and project scope](agent-configuration.md) | `agent-library.md`, `project-context.md`, `preferences.md`, `agent-personas.md`, `conditional-instruction-rules.md` |
| [Capability exposure, discovery, permissions, and phases](capability-policy.md) | `capability-controls.md`, `tool-discovery.md`, `execution-permissions.md`, `plan-act-modes.md` |
| [Conversation history, context selection, and request lifecycle](conversation-lifecycle.md) | `threads-and-history.md`, `thread-branches.md`, `attachments.md`, `context-references.md`, `request-queue.md`, `run-steering.md` |
| [Work planning, reviewed changes, and evidence-based outcomes](work-lifecycle.md) | `progress-plans.md`, `conversation-goals.md`, `proposed-plans.md`, `checkpoints-and-undo.md`, `completion-reports.md`, `follow-up-suggestions.md` |
| [Bounded context, selective evidence, and loop recovery](context-management.md) | `large-tool-results.md`, `tool-result-pruning.md`, `context-compaction.md`, `tool-loop-detection.md` |
| [Versioned documents, Markdown editing, rendering, and search](document-workspace.md) | `documents.md`, `markdown-editor.md`, `markdown-rendering.md`, `document-content-search.md` |
| [Reusable skills, learned drafts, and per-agent curation](skill-library.md) | `skills.md`, `skill-learning-extension.md`, `skill-curation.md` |
| [Factual memory, recall, consolidation, and learning inspection](memory-and-learning.md) | `persistent-memory.md`, `context-aware-recall.md`, `memory-consolidation.md`, `learning-overview.md` |
| [Clock grounding, scheduled work, and topic reminders](time-and-reminders.md) | `current-date-time.md`, `scheduled-work.md`, `event-reminders.md` |
| [Reusable workflows and bounded structured processing](workflows-and-processing.md) | `workflow-templates.md`, `workflow-pipelines.md`, `structured-processing.md`, `app-composition.md` |
| [Focused delegation, durable assignments, and agent teams](agent-coordination.md) | `subagents.md`, `agent-work-board.md`, `agent-team-coordination.md` |
| [Harness observability and scoped diagnostic analysis](diagnostics.md) | `observability.md`, `observability-agent.md` |
| [Structured interaction, visual artifacts, guidance, and voice](interactive-experiences.md) | `structured-input-extension.md`, `inline-visualizations.md`, `in-app-guidance.md`, `voice-interaction.md` |
| [Reference-only integration and interaction options](future-reference.md) | `external-mcp-reference.md`, `skill-catalog-reference.md`, `side-questions-reference.md` |
