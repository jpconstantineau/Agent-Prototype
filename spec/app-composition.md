# Bounded app computation and tool composition

Status: approved for interaction with the app. Uses [runtime contracts](runtime-contracts.md), [discovery](tool-discovery.md), [capability policy](capability-controls.md), and [subagents](subagents.md). Inspired by OpenCode CodeMode; version 1 deliberately accepts a small declarative program rather than arbitrary JavaScript source.

## Purpose and authority

Expose agent-facing `app_execute` to read app data, filter/group it, and return a compact answer without copying every intermediate record into model context. The user sees its actual tool calls and final data summary and can cancel through Stop. This is not DOM automation, browser-console access, a plugin loader, or permission to use arbitrary scripts. It works through the same validated app-tool services as normal calls.

Version 1 permits read-only calls and pure transformations. Writes still use normal single tools or reviewed proposal batches and their receipts. The restriction is intentional: a compact aggregation cannot hide a sequence of task/document changes behind one apparent read operation. Main/child profiles and document/thread access scopes still apply.

## Program contract

Input requires `version:1`, `steps` (1–20 ordered closed objects), and `returnStep:LocalID`. Each step has a unique `id:LocalID`. Forward references/cycles and unused fields fail. Step variants are:

| kind | Other required fields | Meaning |
| --- | --- | --- |
| `call` | `tool` exact name 1–80, `arguments` closed literal input object | Invoke an admitted, eligible read-only app tool. |
| `select` | `from:LocalID`, `path` 0–8 field names, each 1–80 | Select a property/array from an earlier result. Own data properties only. Empty path selects its value. |
| `filter` | from, `field` 1–80, `operator` (`eq`, `lt`, `lte`, `gt`, `gte`, `contains`), `value` string up to 200/finite number/boolean/null | Filter an array of plain records. No coercion. contains means literal substring on strings only. |
| `group_count` | from, field 1–80 | Count an array of records by a scalar field; missing groups use a typed missing marker. |
| `project` | from, `fields` 1–10 unique field names 1–80 | Select exact visible data properties from each record. |
| `take` | from, `count` integer 1–100 | Take a bounded prefix. No implicit claim that all data was examined. |

`group_count` returns `[{key:{type:'string'|'number'|'boolean'|'null'|'missing',value?},count}]`; value is absent only for null/missing, and otherwise matches its type. Reject object/array keys. All transforms return copies; none can change the original store or call a property getter. Forbid `__proto__`, `prototype`, and `constructor` in property paths. No code strings, callbacks, eval, imports, loops, dynamic tool names, fetch, document/window, IndexedDB handles, timers, or filesystem API are available inside this program.

```json
{"type":"tool_call","name":"app_execute","arguments":{"version":1,"steps":[{"id":"read","kind":"call","tool":"list_items","arguments":{"status":"open","limit":50}},{"id":"items","kind":"select","from":"read","path":["items"]},{"id":"counts","kind":"group_count","from":"items","field":"priority"}],"returnStep":"counts"}}
```

The example covers the returned page, not necessarily all tasks. Version 1 has no pagination loop: callers explicitly add bounded call/select/transform steps for known pages or ask ordinary tools for more data. Preserve truncation/next-page metadata in coverage receipts. Do not label a count total when unread pages remain.

## Execution and result

Validate the whole graph and literal call inputs before starting. Check each tool is currently admitted to the caller's catalog and classified read-only; reject interactions/maintenance/external connectors, app_execute recursion, child delegation, and skill loading inside a program. Preflight does not replace authorization on each call. A tool response with success:false stops the program and is recorded as a failed call; it is not ordinary task data passed to later transforms. Later policy revocation stops remaining steps. No silent native-to-local retry occurs on transport errors.

Run steps sequentially through a small JavaScript reducer. Pure transformations may run in a Worker with copies; all external calls are host messages resolved by the controller, which alone holds service references. No unrestricted code generation is necessary. Enforce five seconds elapsed time, ten host calls, 10000 input records, 1 MiB intermediate serialized data, depth 16, and 6000 result characters per execution. Yield between chunks so Stop remains responsive. Time limits do not promise that a browser can preempt arbitrary native work; no arbitrary work is admitted.

Result: `{success:true,version:1,executionId,value,coverage,toolCalls}`. value is bounded plain JSON. coverage is an array up to ten `{stepId,complete:boolean,nextCursor? or nextOffset?}` reflecting source pagination; do not return both cursor and offset. toolCalls contains exact stepId/tool/status (`completed`, `failed`, `cancelled`) without repeating unbounded outputs. On expected failure return the common error plus executionId and admitted-call receipts. Abort rejects, preserving partial read receipts for human inspection. No partial result is labeled a successful complete computation.

## UI, descriptions, and integration

Render an expandable composition card: requested operations, actual read calls, coverage warning, elapsed time, final bounded value/error. A compact answer may be charted separately with html_render; it cannot invoke that tool implicitly. The model description says: “Compose permitted app reads and bounded transformations. Return only useful summary data. No arbitrary JavaScript or writes. Inspect coverage; a page count is not a full-dataset count.”

Add `app-composition.js`, graph/step validators, and optional Worker transformer. Route host calls through the current executor with original run/actor scope; record each call for audit and resource accounting. This one model action consumes one inference iteration, but all inner host calls count against a separate enforced call budget. If a subagent is permitted app_execute, its constituent calls must also be permitted under that child's profile and grants.

Test graph validation, scalar comparison semantics, page coverage, malicious property names, prohibited tools/recursion, budget/Stop handling, and no changes to app state. Script a bounded aggregation and verify intermediate task records do not enter the model observation. A future JavaScript-like interpreter would require a separately reviewed language/runtime spec; do not implement this v1 contract with new Function or iframe eval.
