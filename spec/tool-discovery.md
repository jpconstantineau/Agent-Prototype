# On-demand tool discovery

Status: approved specification. Uses [runtime contracts](runtime-contracts.md), [capability controls](capability-controls.md), [skills](skills.md), and [subagents](subagents.md). Adapted from OpenCode's partial catalog/search approach; this version uses plain JSON actions, not TypeScript signatures or a JavaScript interpreter.

## Intent and actors

Keep the main agent's and each child's initial prompt small. A user chooses Disabled, Include, or Discover for each tool in its applicable profile. Include always places that tool's description/schema in that session's generation catalog; Discover makes an eligible tool available through discovery but initially omits its full schema. Neither mode bypasses dispatch permissions. Disabled tools are absent from both discovery and execution.

Expose agent-facing `search_tools` and `describe_tool`. Human Settings controls exposure. Tool discovery cannot install code, change settings, enable a disabled tool, or import external MCP definitions. Existing five task tools need not become discoverable unless the user changes their mode.

## Catalog and contracts

Every definition has exact `name` (1–80), short description (1–240), JSON `inputSchema`, optional namespace (LocalID), `definitionRevision: Revision`, and classification (`read`, `write`, `interaction`, `maintenance`). The host stores full descriptions of up to 1200 characters; search returns only the short description. Every schema must use the supported validator vocabulary and have a closed object at its root. A schema's serialized form is capped at 12000 characters, with depth 12 and 100 total property nodes; unsupported/oversized definitions are unavailable, not partially advertised.

`search_tools` requires `version:1`; optional `query` (0–120, default empty), `namespace` (LocalID), `cursor:Cursor`, `limit` (integer 1–10, default 5). It searches exact names, descriptions, and registered namespaces of eligible tools. Empty query browses a page. Literal terms, no regex or model-generated SQL. Result:

```json
{"success":true,"version":1,"catalogRevision":3,"items":[{"name":"thread_search","description":"Find relevant passages in saved conversations.","definitionRevision":1,"mode":"discover","admitted":false}],"nextCursor":null}
```

Search does not admit every result. `describe_tool` requires version, exact `name` (1–80), and `expectedDefinitionRevision`. It returns `{success:true,version:1,catalogRevision,name,description,inputSchema,definitionRevision,status:'admitted'}` only after validation, permission checks, and successful context budgeting. Stale definitions return conflict; inaccessible/disabled definitions expose no hidden schema. Repeated description of the same admitted revision returns status `already_admitted` and metadata, omitting duplicate description/schema. Schema changes invalidate admission even if the name remains the same.

```json
{"type":"tool_call","name":"describe_tool","arguments":{"version":1,"name":"thread_search","expectedDefinitionRevision":1}}
```

## Dynamic structured-output mapping

Keep two host-owned sets: **eligible definitions** allowed by effective policy and **admitted definitions** exposed to this session. Before each call to `session.prompt`, derive its `responseConstraint` from admitted definitions plus the existing final-answer branch. Initially admit Include tools and enabled discovery bootstrap tools. When describe_tool succeeds, persist its result, add its exact validated definition to the session manifest, and build the next call's schema. Only then may the model emit that discovered tool's action.

Do not keep the original `AgentLoop.schema` fixed for the entire run. Update `agent.js` to obtain a catalog snapshot at each inference boundary and bind emitted output to its policy/catalog revisions. Revalidate again at execution. No tool request outside that captured schema may be executed just because it is globally installed. If policy changed while a call was in flight, discard stale output before dispatch.

Definitions enter both the next constrained schema and a concise application-authored catalog-update observation, so the model knows exact names/arguments. This requires no native Prompt API tools option or new system prompt mid-session. On rebuilding a session, restore Include definitions first and only still-needed eligible discovered definitions from its manifest; do not reload every tool ever discovered in the thread.

## Budgets, bootstrap, and UI

Default maximum eight discovered admissions per session in addition to included tools. Measure actual context impact including response schemas and the definition-result observation; at most two discoveries per current task should normally suffice, but the hard run inference limit remains authoritative. If no room remains, return budget_exceeded without an admitted status. Do not evict an Include tool silently. Offer compaction/rebuild that drops unused discoveries, or a user change to the profile.

If any tool is set to Discover, enabled search_tools and describe_tool must be included as bootstrap definitions. Settings must show and validate this dependency; refuse an unusable save or offer to include them explicitly. Do not silently grant a user-disabled bootstrap tool. Compaction itself may run as controller maintenance without giving the agent a disabled request_compaction tool.

In Settings show exposure mode and role. In chat show small Discovered/Loaded definition activity entries with exact names, never a fake permission approval. A tool panel can list admitted and available-on-demand entries separately. Human inspection of catalog metadata does not count as an agent admission or inference.

## Model presentation and acceptance

Descriptions: “Search currently permitted tools by purpose. Read short results, then describe the exact tool to make its schema available. Discovery cannot enable disabled capabilities. Do not guess names or call tools that have not been admitted.” Describe says: “Load this exact tool definition for the next model step. This does not execute it.”

Implement `tool-catalog.js` with policy filtering/snapshots, two local executors, and session-manifest integration. Test disabled visibility, missing bootstrap, revision conflicts, context failures, repeated admissions, changing schemas, stale generation, and distinct main/child manifests. Script a search -> describe -> real call and prove that the real call is invalid before admission and valid after it. Verify fallback/manual Daylist controls work when discovery is off.
