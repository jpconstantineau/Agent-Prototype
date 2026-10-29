# Daylist: an agent loop inside Chrome

A to-do manager with an in-page chatbot side panel. Tasks live in IndexedDB; Chrome’s Prompt API or an explicitly configured local OpenAI-compatible endpoint selects actions; WebMCP exposes the page’s five task tools. The local chat adds a sixth, private question tool. There is no cloud inference provider, Python dependency, or application backend. An optional endpoint bearer token stays only in page memory. A tiny Node server serves static files during development. The side panel is part of the page, not a Chrome extension.

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

- “Buy milk tomorrow.” — bare task text is added as a task, preserving its wording.
- “Add a high-priority task to review the prototype.”
- “Find tasks about groceries.”
- “Rename the prototype task to Review the Chrome prototype.”
- “Complete the prototype review.”
- “List all open tasks.”

Bare prompts describing work to do default to creating a task, without an extra confirmation. For unclear action phrases, present/imperative or future-looking wording ("finish book", "complete book", "I will finish the book") adds the original wording as a task title. Affirmative past/completed-state wording ("completed book", "I finished the book", "book is done") instead looks for an existing task to complete. The assistant must not guess whether "book" means reading or writing. Negation, questions, hypotheticals, explicit commands, and conversation context take precedence over tense alone: "what have I completed?" reads tasks, "I haven't finished" does not mark done, and a reply choosing a previously offered task completes that selection rather than adding it. Bare text longer than the 200-character title limit requires a shorter title rather than silent truncation.

Completion lookup uses the shared subject, such as `book`, and inspects relevant result pages. One plausible target can be completed; multiple plausible targets require a question listing their titles/IDs and a user choice before any mutation. A single item on a paginated result is not proof of a unique match. If no task fits, the assistant asks which task was meant rather than creating a replacement. A known numeric ID or clearly established reference can identify the task directly.

Tool descriptions in `src/tool-guidance.js` explain when to choose each tool, give concrete argument examples, and distinguish read requests (“What have I completed?” → `list_items`) from mutations (“Mark it done” → `complete_item`). The same descriptions reach the system prompt, constrained response schema, and WebMCP registration. Tool-result prompts retain the original user request and a per-tool continuation hint, so a lookup for a completion request leads to the status change rather than ending at the search result. These are model instructions, not a hard-coded natural-language router; scripted tests verify plumbing and task effects, not real-model intent accuracy.

## Browser setup

The app checks `LanguageModel.availability()` and starts a session from a button click. Supported hardware and model availability depend on the Chrome installation; consult the [Prompt API guide](https://developer.chrome.com/docs/ai/prompt-api) and [built-in AI setup and troubleshooting](https://developer.chrome.com/docs/ai/get-started). `chrome://on-device-internals` helps diagnose model issues. The app currently requests English text input/output. Model downloads are handled by Chrome, outside this application's static server.

For local WebMCP development, enable `chrome://flags/#enable-webmcp-testing` and relaunch Chrome, as described in [Chrome's WebMCP setup](https://developer.chrome.com/docs/ai/webmcp). Hosted deployments may require the relevant origin trial. Do not assume the flag or API surface exists in every Chrome version.

The adapter prefers `document.modelContext` and recognizes earlier `navigator.modelContext` implementations. See the [imperative API documentation](https://developer.chrome.com/docs/ai/webmcp/imperative-api). On builds with discovery and execution, the chatbot calls the registered tools through `getTools()` and `executeTool()`. Registration-only builds expose tools externally while the chatbot uses the shared dispatcher. If WebMCP is unavailable or registration fails, the status explicitly reports the page-tool fallback. If the Prompt API is unavailable, chat remains usable with a tested local endpoint. Without either provider, manual task management still works. There is no simulated AI fallback.

## How the framework maps to the original

| Python harness | Browser companion |
| --- | --- |
| `duckdb_agent/loop.py` | `src/agent.js`: bounded model → action → observation loop |
| Anthropic client and native tool-use blocks | `SessionManager`, Chrome/local adapters, and JSON-schema-constrained action envelopes |
| Tool definitions and dispatch in `tools.py` | `ToolRegistry` in `src/tools.js`, shared by UI and WebMCP |
| DuckDB connection | `TodoStore` in `src/store.js`, atomic IndexedDB transactions |
| Tool-result messages | JSON observation envelopes passed to the next provider-neutral generation |
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

The app resets the model session after an abnormal run, preventing a cancelled or partially completed request from leaking into the next conversation. Already committed mutations remain saved. The visible conversation and unanswered drafts are memory-only. Runs and application-visible diagnostic events persist separately in IndexedDB; expand Browser connection & setup to download the last run’s log. They are troubleshooting records, not a resumable conversation and never replay tools.

## Tool contracts

| Tool | Required inputs | Optional inputs |
| --- | --- | --- |
| `add_item` | `title` | `notes`, `priority`, `dueDate` |
| `edit_item` | `id`, at least one editable field | `title`, `notes`, `priority`, `dueDate` |
| `complete_item` | `id` | `completed` (defaults to `true`; `false` reopens) |
| `list_items` | none | `status`, `limit`, `offset` |
| `search_items` | `query` | `status`, `limit`, `offset` |
| `request_user_input` (chat only) | `version:1`, `title`, `questions` | Per-question recommendation/custom/skip controls in the [complete question contract](../spec/request-user-input.md) |

Titles: 1–200 nonblank characters. Notes: at most 2,000 characters. Priority: `low`, `normal`, or `high`. Dates: a valid `YYYY-MM-DD` or `""` to clear. IDs are stable positive JSON integers, such as `1`, `2`, or `3`, generated by IndexedDB. Copy `result.item.id` after adding, or the matching `result.items` entry after listing/searching, directly into the next tool call. For example, an item with `"id":3` is completed with `{"id":3}`. IDs are not list positions, and strings such as `"3"`, UUIDs, fractions, and invented aliases are rejected. The agent searches only when an ID is unknown and asks when a singular reference is ambiguous. Search matches literal substrings in titles and notes, ignoring case. Status is `all`, `open`, or `completed`.

Database version 3 retains version 2 numeric handles and adds stable UUID identities, revisions, operation receipts, a dormant sync outbox, runtime events/runs, and device-local model settings. Version 1 UUID keys still migrate to numeric handles. The first load after upgrading migrates existing tasks in a single IndexedDB upgrade transaction, preserving titles, notes, priority, due dates, completion state, and timestamps. A failed upgrade rolls back the schema and records together. Existing IDs change once during migration; reload older tabs and obtain fresh IDs from the tools instead of reusing UUIDs from old conversations. Subsequent reloads retain the numeric keys and counter, and concurrent tabs share IndexedDB’s key generator. If another tab blocks the upgrade, close it and reload. The app still supports completion/reopening rather than deletion.

Lists default to 25 items, with a maximum of 50 per call. Tool results additionally use a 12,000-character page budget to protect local-model context; full item fields are preserved and fewer items are returned when needed. Results include `total`, `offset`, `truncated`, and `nextOffset` (null at the end). Follow `nextOffset` to enumerate every match without skipping items. UI lists also paginate. The current store filters in memory after an IndexedDB `getAll()`; very large collections would benefit from indexed cursor queries or a full-text index.

Each saved item has `id`, `title`, `notes`, `priority`, `dueDate`, `completed`, `createdAt`, `updatedAt`, `completedAt`, `stableId`, `revision`, `schemaVersion`, and `tombstone`. Successful mutations additionally return `operationReceiptId`; the receipt and outbox record commit in the same transaction as the task. The outbox does not currently transmit data or provide cloud sync. Read-modify-write operations share a single read/write transaction, preserving unrelated fields during concurrent edits. Successful writes notify the UI after commit and notify other tabs through BroadcastChannel. Native WebMCP transport failures terminate the run without automatically replaying potentially committed writes.

## Foundation implementation

The [shared runtime](../spec/runtime-contracts.md), [structured questions](../spec/request-user-input.md), and [local endpoint/fallback](../spec/local-model-endpoint.md) foundations now have a vanilla-JavaScript implementation. Their references to other epics remain requirements for those future features; memory, skills, agents, compaction, workflows, and cloud sync are not activated by this work.

| Foundation | Implementation |
| --- | --- |
| Shared runtime | Closed recursive schema validation; controller-owned run/thread/owner/device identity; common tool eligibility hooks including WebMCP and commit-time revocation; atomic receipts/outbox; separate diagnostic events; one generation at a time; 12-attempt limit including failed inference/fallback; distinct cancellation; repeated-error stops. |
| Questions | Immutable request/answer contracts, one pending broker, native form controls, explicit skip/custom answers, run-local continuation, stale/duplicate rejection, Stop/teardown, answer summaries, accessibility and hidden-panel indicator. |
| Text inference | Provider-neutral canonical message ledger, Chrome measurements and reply reserve, strict local HTTP schema/envelopes, device-local Settings/Test, visible automatic/ask/off fallback, user-gesture Chrome activation, and no replay of browser mutations. |

### Answering questions

The agent calls request_user_input when needed. Its native form supports one to three single-choice, multiple-choice, or text questions. No option is initially selected, including recommendations. Custom answers replace choices; optional questions need an explicit Skip. Answer and continue resumes the **same run**; answers are never fresh add-task requests. Selection and typing do not infer or write tasks. Cancel request and Stop share cancellation. Closing the assistant keeps the draft and shows Answer needed; reload loses unanswered drafts. Manual task controls remain available while waiting.

The question tool wraps connection.executor || registry through createChatExecutor. It is never placed in ToolRegistry.tools or registered externally through WebMCP. Only the five task tools use the native/page transport. Tool argument schemas come from the canonical definitions; the prompt lists their guidance and the response constraint carries exact schemas without duplicating the argument schemas in the prompt.

### Configuring local inference

Open Model settings, choose Local OpenAI-compatible endpoint, enter an exact /v1/ base URL and optional session token, click Load models, select a model from the endpoint’s list, confirm the server uses a locally served inference-only model, and Save settings. Connect / Test sends at most three harmless probes, including the nested question contract, and never executes their proposed actions. A successful test enables the endpoint for the exact saved profile/schema. The model name is a selector populated by GET /v1/models, with no typing required. Refresh restores the saved model only if it is still listed. Empty, unavailable, or malformed catalogs leave local selection blocked with retry guidance. Changing the address, credentials, or LAN approval clears the catalog and cancels pending discovery; late responses cannot restore stale choices. Re-test after editing or reloading; saving alone does not infer. Forget session token clears the in-memory credential and invalidates readiness.

Only loopback HTTP(S) and explicitly approved private LAN HTTPS are accepted. Public/cloud endpoints, LAN HTTP, URL credentials/query/fragments, custom headers, network scanning, and redirects are rejected. The server must implement strict OpenAI-compatible /chat/completions response_format JSON Schema, reject context overflow rather than truncate, and allow this page’s actual origin through CORS (GET for /models, POST for /chat/completions, Content-Type and optional Authorization). Browser local-network permission, TLS, mixed-content rules and deployment CSP still apply. A local address does not prove a server is not proxying to a cloud model. There is no relay or security bypass.

The development server allows loopback connections in CSP. For a private LAN HTTPS origin, start it with LOCAL_MODEL_ORIGINS set to a comma-separated list of exact private origins, for example https://192.168.1.20:8443. Restart the server after changing this variable. Other deployments must provide the corresponding connect-src rule themselves; page code cannot widen a response-header CSP. CORS must allow the app origin, not every network or credentialed wildcard origins.

Defaults are a 24,000-character local request cap, 2,048 output tokens, 90-second timeout, and 32,768 **operator-configured** context tokens. Limits are validated and do not certify server capacity. Chrome capacity comes only from the current session’s contextWindow/contextUsage/measureContextUsage. The display distinguishes measured, configured/estimated, and Unknown; no hard-coded 9,216 quota or characters-to-tokens conversion is used. Chrome admission reserves 20% for reply/continuation. Oversize packets and overflow stop visibly without silently dropping context; semantic compaction is a separate unimplemented epic.

Automatic fallback occurs only for eligible inference-service/network failures with remaining attempts. Ask waits for an explicit choice; Off stops. Auth/permission refusal, invalid actions, domain-tool errors, cancellation and exhausted budgets do not switch providers. Chrome fallback reconstructs settled context and receipts, measures the actual new window, and continues at the next counted inference boundary. It never replays tools, resets budgets, or guarantees Chrome availability. If activation/download is needed, Enable Chrome and Continue creates it directly from that click.

### Runtime modules and extension boundary

AgentLoop accepts the executor, SessionManager (or a compatibility prompt session), question broker, diagnostic store, policy and controller identity. SessionManager serializes and invalidates generations. chrome-provider.js and local-http-provider.js implement prepare/generate/measure/dispose. user-input-contract.js, user-input-broker.js and user-input-view.js keep contracts, lifecycle and DOM separate. runtime-store.js owns diagnostics/settings; store.js owns atomic task mutations/receipts. Provider Settings is a human service, never a model tool.

Add future capabilities through their own approved epic and the shared policy/dispatcher interfaces. UI-only services must not become fabricated tool calls. Unsupported schema keywords fail closed; add and test a validator keyword before using it. New task tools must declare their actual result contract. Owner/device UUIDs identify local application records; they are not user accounts or server authentication. Later configuration, role/exposure/permission, context-rebuild and diagnostic-inspector features remain separate work; the current policy hook is an enforcement service, not that full settings UI.

## Test

```sh
npm ci
npm test
npm run test:browser
```

Unit tests use `fake-indexeddb` and scripted model sessions to exercise the loop, validation, commit semantics, pagination, cancellation, concurrency, numeric ID allocation, migration/rollback, and WebMCP adapters without downloading an AI model. Browser tests use installed Google Chrome, real IndexedDB, test-only scripted Prompt API responses, and intercepted HTTP model envelopes. They also exercise radio/checkbox/text forms, custom/skip/IME behavior, hidden-panel drafts, Stop/reload, local Settings probes, token exclusion, failed-inference fallback after a committed write, and auth refusal. They cover CRUD, persistence, cross-tab refresh, unsafe text rendering, multi-tool chat through a WebMCP contract mock, migration from UUID keys, completion using a listed numeric ID, cancellation, and mobile layout. A separate test detects and exercises native WebMCP when the installed Chrome exposes it; it explicitly skips when unavailable.

Set `PLAYWRIGHT_CHANNEL=chromium` and run `npx playwright install chromium` to use Playwright's Chromium instead. Real Gemini Nano inference requires a compatible browser/device and a downloaded model; scripted tests do not establish the model's task accuracy. Before relying on bulk edits, manually evaluate representative requests and ambiguous references with the actual local model.

## Local storage and boundaries

Tasks are scoped to the browser profile and origin (including port). Keep using the same localhost URL; another port, `127.0.0.1` instead of `localhost`, another profile, or incognito has separate data. Clearing site storage removes tasks. This prototype has no cloud sync, deletion tool, task export, or persistent chat UI. Run-log export is available; clearing this origin’s site storage removes its tasks, settings, receipts and diagnostics.

All task and chat content is rendered as text. The app does not evaluate model output as JavaScript. The system prompt treats task data as untrusted and requires successful tool observations before claiming changes. These instructions help but cannot guarantee model behavior; registered WebMCP tools can mutate this origin's tasks when invoked by authorized browser agents. A general-purpose external agent must enforce its own user authorization rules.

Implementation validation on 2026-10-28 passed all 60 unit tests and 20 Chrome browser tests, plus Markdown-link/JSON-example and whitespace checks. It used installed Chrome 155.0.8059.79. Its native Prompt API was present but availability was unavailable, so no Gemini Nano inference or model download ran. Endpoint protocol tests use mocks/interception; a real local server was not configured. These checks prove control flow and browser integration, not model quality, real-server CORS/locality, tokenizer behavior, or server-side schema enforcement.
