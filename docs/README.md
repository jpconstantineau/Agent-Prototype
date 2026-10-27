# Daylist: an agent loop inside Chrome

A to-do manager with an in-page chatbot side panel. Tasks live in IndexedDB; Chrome's Prompt API selects actions; WebMCP exposes the page's five tools. The app has no cloud inference, API keys, Python dependency, or application backend. A tiny Node server serves static files during development. The side panel is part of the page, not a Chrome extension.

## Run

Requires Node 20+ to run the development server:

```sh
cd docs
npm start
```

Open **http://localhost:5173** in desktop Chrome. Runtime code has no npm dependencies or build step. `npm install` is only needed for tests. The hosted prototype is at **https://jpconstantineau.github.io/Agent-Prototype/** once GitHub Pages deploys. Its relative asset links also support other HTTPS subdirectories.

In repository **Settings → Pages**, select **Deploy from a branch**, **main**, and **/docs**. This directory's `index.html` and `src/` form the static app, and `.nojekyll` disables Jekyll processing. The server and test files are development tools and are not needed by visitors. `node_modules` and test artifacts are ignored by Git.

Use **New task** to start immediately, or **Enable local AI** to start the model. The first model download can take several minutes; progress appears in the panel. Enter sends a chat request; Shift+Enter inserts a newline. **Stop** cancels the current run. Expand each tool activity card to inspect its arguments and actual result.

The task list has one set of filters with collection counts and a search field. Creating a task returns to All tasks and clears search so the new item is visible. The optional **Assistant** panel starts closed on mobile; unsupported browsers show a compact setup explanation. See [the interface rationale](DESIGN.md) for the review and purpose of each page element.

Try:

- “Add a high-priority task to review the prototype.”
- “Find tasks about groceries.”
- “Rename the prototype task to Review the Chrome prototype.”
- “Complete the prototype review.”
- “List all open tasks.”

## Browser setup

The app checks `LanguageModel.availability()` and starts a session from a button click. Supported hardware and model availability depend on the Chrome installation; consult the [Prompt API guide](https://developer.chrome.com/docs/ai/prompt-api) and [built-in AI setup and troubleshooting](https://developer.chrome.com/docs/ai/get-started). `chrome://on-device-internals` helps diagnose model issues. The app currently requests English text input/output. Model downloads are handled by Chrome, outside this application's static server.

For local WebMCP development, enable `chrome://flags/#enable-webmcp-testing` and relaunch Chrome, as described in [Chrome's WebMCP setup](https://developer.chrome.com/docs/ai/webmcp). Hosted deployments may require the relevant origin trial. Do not assume the flag or API surface exists in every Chrome version.

The adapter prefers `document.modelContext` and recognizes earlier `navigator.modelContext` implementations. See the [imperative API documentation](https://developer.chrome.com/docs/ai/webmcp/imperative-api). On builds with discovery and execution, the chatbot calls the registered tools through `getTools()` and `executeTool()`. Registration-only builds expose tools externally while the chatbot uses the shared dispatcher. If WebMCP is unavailable or registration fails, the status explicitly reports the page-tool fallback. If the Prompt API is unavailable, chat stays disabled and manual task management still works. There is no simulated AI fallback.

## How the framework maps to the original

| Python harness | Browser companion |
| --- | --- |
| `duckdb_agent/loop.py` | `src/agent.js`: bounded model → action → observation loop |
| Anthropic client and native tool-use blocks | `LanguageModel` session and JSON-schema-constrained action envelopes |
| Tool definitions and dispatch in `tools.py` | `ToolRegistry` in `src/tools.js`, shared by UI and WebMCP |
| DuckDB connection | `TodoStore` in `src/store.js`, atomic IndexedDB transactions |
| Tool-result messages | JSON observation envelopes passed into the next `session.prompt()` |
| Run outcomes and tracing | Explicit status, iteration count, event trace, and visible activity cards |

The Prompt API session retains previous prompt/response turns automatically. We implement the tool-calling protocol in the application using `responseConstraint`; this does not depend on an experimental native Prompt API tool-use option. Each response is either:

```json
{"type":"tool_call","name":"add_item","arguments":{"title":"Buy coffee"}}
```

or:

```json
{"type":"final","message":"Added Buy coffee to your list."}
```

The registry revalidates every argument before execution. Tool observations contain `success` and the saved item or query results, or an `error` string. Invalid model actions are returned for correction without executing them. Failed tools feed errors back into the next model step. Runs stop after 12 model calls. A final action ends the run; limits, cancellation, and model failures have distinct statuses. Unlike the Python loop's final wrap-up call, hitting the limit here returns a deterministic stop message without another inference or write.

The app resets the model session after an abnormal run, preventing a cancelled or partially completed request from leaking into the next conversation. Already committed mutations remain saved. Conversations and traces are held only in page memory and disappear on reload; tasks persist.

## Tool contracts

| Tool | Required inputs | Optional inputs |
| --- | --- | --- |
| `add_item` | `title` | `notes`, `priority`, `dueDate` |
| `edit_item` | `id`, at least one editable field | `title`, `notes`, `priority`, `dueDate` |
| `complete_item` | `id` | `completed` (defaults to `true`; `false` reopens) |
| `list_items` | none | `status`, `limit`, `offset` |
| `search_items` | `query` | `status`, `limit`, `offset` |

Titles: 1–200 nonblank characters. Notes: at most 2,000 characters. Priority: `low`, `normal`, or `high`. Dates: a valid `YYYY-MM-DD` or `""` to clear. IDs are stable positive JSON integers, such as `1`, `2`, or `3`, generated by IndexedDB. Copy `result.item.id` after adding, or the matching `result.items` entry after listing/searching, directly into the next tool call. For example, an item with `"id":3` is completed with `{"id":3}`. IDs are not list positions, and strings such as `"3"`, UUIDs, fractions, and invented aliases are rejected. The agent searches only when an ID is unknown and asks when a singular reference is ambiguous. Search matches literal substrings in titles and notes, ignoring case. Status is `all`, `open`, or `completed`.

Database version 2 replaces version 1 UUID keys with auto-incrementing numeric keys. The first load after upgrading migrates existing tasks in a single IndexedDB upgrade transaction, preserving titles, notes, priority, due dates, completion state, and timestamps. A failed upgrade rolls back the schema and records together. Existing IDs change once during migration; reload older tabs and obtain fresh IDs from the tools instead of reusing UUIDs from old conversations. Subsequent reloads retain the numeric keys and counter, and concurrent tabs share IndexedDB’s key generator. If another tab blocks the upgrade, close it and reload. The app still supports completion/reopening rather than deletion.

Lists default to 25 items, with a maximum of 50 per call. Tool results additionally use a 12,000-character page budget to protect local-model context; full item fields are preserved and fewer items are returned when needed. Results include `total`, `offset`, `truncated`, and `nextOffset` (null at the end). Follow `nextOffset` to enumerate every match without skipping items. UI lists also paginate. The current store filters in memory after an IndexedDB `getAll()`; very large collections would benefit from indexed cursor queries or a full-text index.

Each saved item has `id`, `title`, `notes`, `priority`, `dueDate`, `completed`, `createdAt`, `updatedAt`, and `completedAt`. Read-modify-write operations share a single read/write transaction, preserving unrelated fields during concurrent edits. Successful writes notify the UI after commit and notify other tabs through BroadcastChannel. Native WebMCP transport failures terminate the run without automatically replaying potentially committed writes.

## Reuse or extend

`AgentLoop` accepts a registry/executor with `definitions()` and `execute(name, args, {signal})`, a session with `prompt()`, an iteration bound, and an event callback. Model creation is separate so it can happen inside a user gesture:

```js
const store = await TodoStore.open();
const registry = new ToolRegistry(store);
const connection = await registerWebMCP(registry);
// Inside a button click:
const session = await createModelSession(registry);
const agent = new AgentLoop({
  registry: connection.executor || registry,
  session,
  maxIterations: 12,
  onEvent: event => console.log(event),
});
const result = await agent.run('List my open tasks', { signal: controller.signal });
```

Add a tool to `ToolRegistry.tools` with a name, description, schema, and execute function. The action schema, system prompt, native registration, and dispatcher derive from this list. `src/schema.js` deliberately validates only the JSON Schema subset used here; extend it or replace it with a full validator before introducing new schema keywords.

## Test

```sh
npm install
npm test
npm run test:browser
```

Unit tests use `fake-indexeddb` and scripted model sessions to exercise the loop, validation, commit semantics, pagination, cancellation, concurrency, numeric ID allocation, migration/rollback, and WebMCP adapters without downloading an AI model. Browser tests use installed Google Chrome, real IndexedDB, and test-only scripted Prompt API responses. They cover CRUD, persistence, cross-tab refresh, unsafe text rendering, multi-tool chat through a WebMCP contract mock, migration from UUID keys, completion using a listed numeric ID, cancellation, and mobile layout. A separate test detects and exercises native WebMCP when the installed Chrome exposes it; it explicitly skips when unavailable.

Set `PLAYWRIGHT_CHANNEL=chromium` and run `npx playwright install chromium` to use Playwright's Chromium instead. Real Gemini Nano inference requires a compatible browser/device and a downloaded model; scripted tests do not establish the model's task accuracy. Before relying on bulk edits, manually evaluate representative requests and ambiguous references with the actual local model.

## Local storage and boundaries

Tasks are scoped to the browser profile and origin (including port). Keep using the same localhost URL; another port, `127.0.0.1` instead of `localhost`, another profile, or incognito has separate data. Clearing site storage removes tasks. This prototype has no cloud sync, deletion tool, export, or persistent chat history.

All task and chat content is rendered as text. The app does not evaluate model output as JavaScript. The system prompt treats task data as untrusted and requires successful tool observations before claiming changes. These instructions help but cannot guarantee model behavior; registered WebMCP tools can mutate this origin's tasks when invoked by authorized browser agents. A general-purpose external agent must enforce its own user authorization rules.
