# In-app navigation, tips, and tours with WebMCP

Status: approved specification. Agent-facing page guidance tools plus dismissible human controls, linked to the app's registered WebMCP actions. Uses [capability controls](capability-controls.md), [execution policy](execution-permissions.md), [observability](observability.md), and [structured input](structured-input-extension.md). This is app navigation, not arbitrary browser/DOM automation.

## Registered targets and action ownership

Define one application-owned page-action registry. Each entry has actionId:LocalID, targetId:LocalID, label 1–120, description 0–240, action kind navigate/highlight, supported view state, domain effect, and an internal handler/DOM resolver. Code registers these entries; models supply only known IDs. DOM nodes, selectors, URLs, callback code, storage handles, and credentials never enter model arguments. Stable target IDs such as memory_manager or agent_permissions replace generated CSS selectors.

Navigation actions open app views or exact currently permitted record views; they do not press arbitrary controls, submit forms, change settings, or grant permissions. Domain mutations remain their own registered tools with exact contracts and approval. A visual link to an action does not imply it can bypass its domain service. Background/child/scheduled agents cannot move focus or start tours; v1 guidance is available only to the foreground main conversation after a relevant human request.

## Agent contracts and DOM mapping

All inputs are closed version 1. Each tool has independently configurable eligibility, with the human guidance preference as an additional ceiling:

| Tool | Input besides version | Success besides success/version |
| --- | --- | --- |
| ui_targets | cursor?, limit? 1–10 default 5 | items, nextCursor; items contain targetId, label, description, availableActions, registryRevision |
| ui_navigate | actionId, expectedRegistryRevision | actionId, viewId:LocalID, status:'opened' |
| ui_tip | targetId, expectedRegistryRevision, text 1–240 | tipId:ID, targetId, status:'shown' |
| ui_tour | steps 1–6 of `{targetId,text:1–240}`, expectedRegistryRevision | tourId:ID, status:'started', stepCount |

Only expose available targets in the current foreground view/authorized navigation registry; no private record labels leak through a target catalog. Reject unknown, hidden, removed, stale, or disabled targets with explicit failures. ui_navigate returns opened only after mounting the view; a matched handler alone is not proof the view appeared. Tips/tours return shown/started after rendering, not after the user reads/completes them. Completion/dismissal is a UI/log event, not an invented follow-up answer or new model inference.

```json
{"type":"tool_call","name":"ui_tip","arguments":{"version":1,"targetId":"memory_manager","expectedRegistryRevision":2,"text":"Open Memory to inspect or correct saved facts for this agent."}}
```

Tips use app-controlled popovers anchored through target resolvers. One tip or tour is visible at a time; a new request cannot replace an active human form/approval. A tour shows Next, Previous, Close, step count, and a text explanation; missing targets stop with an explanation rather than highlighting another control. Do not trap keyboard focus, auto-click a highlighted control, or obscure the composer/Stop. Honor reduced motion. Clicking the genuine app control follows its ordinary UI service, not a generated callback.

Descriptions instruct: “Guide the user within this app using discovered registered targets. Open a relevant view only when asked. Highlight sparingly, repeat essential instructions in chat, and never claim a user clicked/completed something merely because a tip was shown.” The tools cannot inspect other tabs/windows or use screen capture. Rich generated forms retain their own renderer/answer contract and cannot register new page actions.

## WebMCP mapping

Reuse the existing registerWebMCP adapter and current feature-detected context registration API; local chat and external page agents call the same action dispatcher/validators. The project baseline supports document.modelContext with a navigator.modelContext compatibility path. Do not invent a separate remote MCP server or assume WebMCP supplies authentication, arbitrary DOM access, or a standalone browser automation API.

Extend user policy with explicit external exposure choices for these registered navigation/guidance tools, default off. The model's local Include/Discover mode does not grant external registration. Register only selected enabled page tools; unregister on revocation where supported and retain dispatch-time checks for stale references. An external call must bind to the visible page's authorized actor/project scope; if the transport cannot establish required foreground/user intent or an approval host, return unavailable/permission_denied rather than borrow a chat run's authority. External targets do not expose chat content or owner-wide data merely because the page is open.

For declarative WebMCP forms, use the browser's supported tool-name/description annotations only on genuine app controls whose existing submit handler validates the same contract. Merely highlighting a form is not submission; an external agent submit is an agent action with policy/approval, not a trusted human click. Model output cannot author/register new declarative tools or alter annotations. Implementers must use current Chrome WebMCP definitions and test supported builds; if registration is unavailable, the local dispatcher still supports in-app chat guidance and manual UI.

## Settings, storage, and acceptance

Appearance/help settings include Enable agent guidance, Enable tours, and separately expose eligible guidance actions through WebMCP. These are human-only choices; revocation dismisses active guidance. Registry handlers are code, not synced records. Persist preferences and bounded tip/tour lifecycle events in IndexedDB, not live element references. User state and app navigation histories do not become a new always-injected prompt block.

Add page-actions.js and guidance-view.js; route approved registration through the same policy service as other WebMCP tools. Test discovered IDs versus arbitrary selectors, stale registries, foreground restrictions, disabled external exposure, genuine mutation gates, hidden-target leaks, tour dismissal, missing targets, focus/accessibility, and no automatic clicks. Native WebMCP browser tests must be labeled separately from local dispatcher mocks.

Reference: [Chrome WebMCP](https://developer.chrome.com/docs/ai/webmcp). Registration interfaces evolve; application action identities, permissions, and completion semantics above remain the required contract.
