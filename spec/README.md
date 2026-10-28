# Browser agent capability specifications

Status: proposed design, not implemented. Approved in the repository review conversation on 2026-10-28. Runtime code remains unchanged.

Start with [shared runtime contracts](runtime-contracts.md), then read the feature being implemented. Each feature describes user controls, agent tools, structured inputs/results, UI mapping, lifecycle, integration, and acceptance criteria. All designs use vanilla JavaScript ES modules, browser APIs, and Chrome's Prompt API; there is no React/TypeScript requirement or native Prompt API tool-calling dependency.

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
| Relative date/time grounding | [Current date/time](current-date-time.md) | Agent reads device clock; harness preserves request anchors |
| Harness diagnostics | [Observability](observability.md) | Harness logs; human inspects and exports |

## Reference only: future decision

[External MCP connections](external-mcp-reference.md) records a possible future client architecture. It is not approved for implementation or activation. Existing WebMCP exposure and connecting to remote MCP servers are different directions. Web page fetching and web search were declined and are not included.

The private credential tool was declined. OS shells, Git/worktrees/PR management, simulator control, remote-machine linking, unrestricted browser automation, and server screenshot previews are not part of this browser-only design. HTML rendering does not imply that a standalone web page can capture arbitrary tabs. Existing task operations remain the five tools in `docs/src/tools.js`.

## Project baseline and sources

The target checkout was inspected at `a3221650e03f73a10deab3840e6cd7032dae9dc4`, including the original question spec. No Azure backend or sync implementation is present at that baseline. Future integration is an explicit requirement, not a claim of existing functionality.

The T3 Code review used [commit 4c9c7d0](https://github.com/pingdotgg/t3code/tree/4c9c7d0bb65765232bbb41f83d3fd17ec5e3af66). Useful reference areas were its provider plan events, `apps/server/src/mcp/toolkits/{html,thread,orchestrator,environment,attachment}`, provider skill discovery, and composer checkpoint/compaction flows. The specs describe adapted behavior in full; those sources are not implementation dependencies. Some capabilities are provider/UI features in T3 rather than standalone T3 tools.

The follow-up OpenCode review used [commit d6867f2](https://github.com/anomalyco/opencode/tree/d6867f221061f7688a9b784b840ec6b7e3c9d40a): its CodeMode catalog/search and confined tool composition, read/write/exact-edit tools, history-oriented adaptation of grep, and MCP resource discovery. The approved changes extend the existing history specification rather than duplicating it. Capability controls/subagents/skills now distinguish Disabled/Include/Discover and separate main/subagent profiles. OpenCode source and TypeScript/Effect packages are not runtime dependencies.

The TrueForge review used [commit e6a2e9e](https://github.com/truefoundry/trueforge/tree/e6a2e9ed0cb2f1e13837a4b845c5b2d2bf3a81a8). Approved additions adapt its large-result processing, OpenUI, exact-call approvals, saved agent library, current-date/time tool, and session diagnostics. The richer-input design is a separate extension; the original request-user-input.md is unchanged. Observability uses a separate IndexedDB object store and captures application-visible prompts/actions/results. Browser storage replaces sandbox files; JSON/native DOM replaces OpenUI/React. All behavior needed for implementation is specified here without importing TrueForge code or packages. Existing skills/discovery/subagents/schedules/compaction already cover the relevant overlapping features. Server sandboxes, cloud-provider setup, connector OAuth, and enterprise benchmarking are outside this browser-only addition; external MCP remains reference-only.

Browser interface references, checked 2026-10-28: [Prompt API](https://developer.chrome.com/docs/ai/prompt-api), [structured output](https://developer.chrome.com/docs/ai/structured-output-for-prompt-api), and [session management](https://developer.chrome.com/docs/ai/session-management). The application owns the protocols, persistence, policy, and UI described here.

## Suggested implementation order

1. Shared validation, capability policy, thread/run storage, observability append service, and the existing question broker.
2. Agent library/configuration snapshots, execution permission levels, discovery, skills/preferences, bounded history retrieval, and context accounting/compaction.
3. Progress plans, queue, attachments, subagents, branching, and constrained read composition.
4. Proposed task batches/reversible journal, document revisions/storage, Markdown editing/rendering, and large-result storage/retrieval.
5. Rich input extension, inline HTML artifacts, clock grounding, and scheduled work. Add the diagnostic inspector as events become available. External MCP remains a future decision outside this implementation order.

Build each feature behind its own switch and keep manual Daylist task management available when AI is unavailable. Do not implement all capabilities merely to ship one. Specs are independently reviewable while sharing the common contracts.
