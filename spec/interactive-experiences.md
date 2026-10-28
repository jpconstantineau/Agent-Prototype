# Structured interaction, visual artifacts, guidance, and voice

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Provide optional ways to ask, explain, navigate, and converse beyond plain text while keeping native forms, sandboxed HTML, registered page actions, and browser speech in their appropriate execution boundaries.

## User intent

Answer rich typed questions, inspect interactive explanations, follow app-owned navigation/tours, and dictate or listen using supported Chrome/browser capabilities.

## Agent intent

Request native structured forms, produce isolated visual artifacts, or invoke registered in-app guidance when enabled. Voice is a user-facing input/output service, not an agent tool, and none of these surfaces supplies hidden approval or arbitrary page control.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Structured input extension](#feature-structured-input-extension) | Agent asks; human submits | Extend the original question broker with bounded typed controls and supporting data. |
| [Inline visualizations](#feature-inline-visualizations) | Agent renders; human interacts | Own isolated HTML artifacts with no application permissions. |
| [In-app guidance](#feature-in-app-guidance) | Agent; registered page actions | Own approved app targets/tips/tours and optional explicit WebMCP exposure. |
| [Voice interaction](#feature-voice-interaction) | Human and browser speech services | Own reviewed dictation and local browser speech output with capability checks. |

## Integration and delivery

The standalone request-user-input specification remains the unchanged baseline protocol and broker. Rich forms are an optional extension with a separate tool/schema; they collect typed answers rather than execute app actions. Proposed changes and exact-call approvals retain their dedicated application-owned review surfaces.

Native form DOM, safe Markdown rendering, sandboxed HTML artifacts, and registered page guidance are separate trust boundaries. An artifact cannot call app tools; page guidance cannot use arbitrary selectors or scripts; no renderer grants source access. Keep their individual switches and UI lifecycles.

Implement the original broker and safe rendering first, then optional forms/artifacts and registered guidance. Voice only submits a human-reviewed transcript and uses actual Chrome/browser support; it cannot approve sensitive actions by recognition or add external speech providers.

<a id="feature-structured-input-extension"></a>

## Structured input extension

Status: approved extension. The original [request-user-input.md](request-user-input.md) remains unchanged and implementable independently. This document adds an optional richer agent-facing tool, request_user_form, sharing the original broker lifecycle. Uses [runtime contracts](runtime-contracts.md), [safe Markdown](document-workspace.md#feature-markdown-rendering), and [permission controls](capability-policy.md#feature-execution-permissions).

<a id="feature-structured-input-extension-purpose"></a>

### Purpose

Extend simple clarification with typed fields and bounded supporting tables or charts. A separate JSON component contract supports richer answers through native controls while preserving the original question protocol.

<a id="feature-structured-input-extension-user-intent"></a>

### User intent

Complete a structured form, inspect its supporting information, correct validation errors, and explicitly submit typed answers or stop.

<a id="feature-structured-input-extension-agent-intent"></a>

### Agent intent

Use request_user_form when a richer interaction is needed, then continue with the validated human values. The agent cannot make the form execute app actions or treat its Submit button as approval for hidden changes.

<a id="feature-structured-input-extension-intent-and-relationship-to-the-original"></a>

### Intent and relationship to the original

Use request_user_input for ordinary one-to-three-question clarification. Use this extension for typed fields, related settings, a small editable input form, or a guided choice accompanied by a table/chart. The model describes data and registered components in JSON. Vanilla JavaScript renders native DOM controls; there is no OpenUI language, React component dependency, generated JavaScript, or HTML evaluation.

Forms collect answers; they never directly call tools or mutate app records. The agent receives the submitted values, then chooses an independently validated tool call if the user's request authorizes it. A Submit label cannot become an approval for hidden operations. Exact execution approvals and proposed task batches keep their dedicated application-owned review surfaces. For standalone interactive explanations without answers, use the existing isolated html_render tool.

<a id="feature-structured-input-extension-model-input-contract"></a>

### Model input contract

request_user_form requires a closed object: version:1, title 1–80 characters, description 0–600, nodes 1–40, and rootId:LocalID. Total serialized arguments <=16000 characters, <=12 field nodes, maximum tree depth 6. Every node has id:LocalID, globally unique within the request, and one of these closed shapes. All fields shown are required unless marked optional.

| type | Other fields | DOM mapping |
| --- | --- | --- |
| `group` | label 0–120, children 1–12 distinct node IDs | fieldset/legend for a named group, otherwise a div |
| `text` | text 0–2000, format `plain` or `markdown` | textContent or shared safe Markdown renderer |
| `table` | caption 1–120, columns 1–6 of `{key:LocalID,label:1–80}`, rows 0–30 of arrays of string/finite number/boolean/null cells | caption, th scope=col, tbody; each row length equals column count |
| `bar_chart` | title 1–120, unit 0–40, values 1–12 of `{label:1–80,value:finite number >=0}` | local SVG bars plus a native text table conveying identical values |
| `field` | label 1–120, help 0–240, required boolean, input as below | explicit label, help, native input and field error |

rootId must identify a group. All nodes are reachable from it exactly once; reject cycles, unknown children, multiple parents, and orphan nodes. Table column keys and chart labels are unique. No references load document/attachment content, network resources, or arbitrary app data. The model must already have obtained data through authorized reads and include only the bounded relevant values. Do not invent demonstration data when presenting the user's records. Charts cannot imply totals for incomplete data; include a visible text node identifying coverage limitations.

Field input is one of these closed objects:

| kind | Other fields | Validation and control |
| --- | --- | --- |
| `text` or `textarea` | maxLength integer 1–2000 | input type=text or textarea; trim outer whitespace on submit |
| `number` | min finite number, max finite number, integer boolean | input type=number; min <= max; reject empty/NaN/infinite/out-of-range; integer requires safe integer |
| `date` | none | input type=date; real calendar YYYY-MM-DD, not a UTC instant |
| `time` | none | input type=time at minute precision; HH:mm 00:00–23:59; no inferred timezone |
| `select` or `multiselect` | options 2–12 of `{id:LocalID,label:1–120,description:0–240}` | radio group or checkbox group; unique IDs and trimmed/case-folded labels |
| `checkbox` | none | one labeled checkbox representing a boolean, including false |

No model-supplied defaults, event handlers, URLs, code, styling, hidden fields, conditional expressions, regex patterns, file/credential inputs, or direct tool bindings. A required checkbox requires an explicit human answer but does not require true; render Yes/No radios or an equivalent explicitly answered boolean control so untouched is distinct from false. Optional fields have an explicit Skip control. Empty required fields never coerce to zero/false. Date/time entries requiring a timezone use another explicit field or the current preference; ambiguity returns to the agent rather than an implicit browser conversion.

```json
{"type":"tool_call","name":"request_user_form","arguments":{"version":1,"title":"Plan a reminder","description":"Choose the local date and time. This form does not save the reminder.","rootId":"root","nodes":[{"id":"root","type":"group","label":"Reminder details","children":["day","time"]},{"id":"day","type":"field","label":"Date","help":"Your planning timezone applies.","required":true,"input":{"kind":"date"}},{"id":"time","type":"field","label":"Time","help":"Use a 24-hour time.","required":true,"input":{"kind":"time"}}]}}
```

The tool description should remain short: “Ask for typed answers with registered native controls and bounded supporting tables/charts. Use ordinary request_user_input for simple clarification. Submission supplies answers only; it never approves or executes app changes. No code or raw HTML.” Include the exact schema in the ordinary admitted responseConstraint. If richer authoring guidance must load on demand, use the existing tool-discovery/skill mechanism; do not invent an unadvertised fenced-output parser.

<a id="feature-structured-input-extension-human-submission-and-model-result"></a>

### Human submission and model result

The controller generates requestId/runId and captures immutable arguments plus a requestRevision:Revision. The browser submission is `{requestId,expectedRevision,answers}`. answers contains exactly one entry for each field in tree traversal order, at most 12, with one of these closed variants:

- `{fieldId:LocalID,kind:'text',text}` for text/textarea/date/time; text respects the selected field's rule.
- `{fieldId,kind:'number',value}` for number, finite and within the field bounds.
- `{fieldId,kind:'boolean',value:boolean}` for checkbox.
- `{fieldId,kind:'choice',optionIds}` for select/multiselect; unique known IDs, exactly one for select, 1–12 for multi.
- `{fieldId,kind:'skipped'}` only for optional fields.

Validate against the pending snapshot, not merely the answer schema. Reject unknown/duplicate fields, mismatched kinds, skipped required fields, inactive request identities, and unrelated properties. Canonicalize options to displayed order. Cap the serialized answers at 6000 characters without truncation; show a card-level budget error and preserve the draft if exceeded. The UI displays the remaining answer budget alongside individual field limits.

```json
{"requestId":"form-1","expectedRevision":1,"answers":[{"fieldId":"day","kind":"text","text":"2026-10-29"},{"fieldId":"time","kind":"text","text":"09:30"}]}
```

On accepted submission resolve the waiting tool with `{success:true,version:1,requestId,requestRevision,status:'answered',answers}`. Persist the accepted answer plus the request snapshot/reference before the next inference. No pending promise survives reload. A recovered incomplete form is marked interrupted; the user may copy drafts into a fresh request but cannot settle the old run.

broker.submit returns `{accepted:true}` or `{accepted:false,errors:[{fieldId:LocalID|null,code,message}]}`. Codes: stale_request, missing_answer, duplicate_answer, unknown_field, invalid_kind, invalid_value, unknown_option, skip_not_allowed, answer_budget_exceeded. Invalid submissions leave the form open and do not become model results. Stop rejects with AbortError and produces a Cancelled card, not a synthetic skipped answer.

<a id="feature-structured-input-extension-ui-lifecycle-and-persistence"></a>

### UI, lifecycle, and persistence

Use the original independent inline form outside the chat composer. Place title/description first, then the component tree, validation summary, Submit, and Stop. Render labels/help with safe text nodes; generate DOM IDs locally. Keep table/chart data read-only. Submit is the sole answer action; field changes do not submit, start inference, or call tools. Keyboard navigation, focus on the first invalid field, screen-reader announcements, small-screen scrolling, and a read-only submitted summary are required. Disallow streaming partially parsed controls; mount only a complete validated tool call.

Share the controller's single interaction slot with request_user_input and proposed-plan review. A second blocking interaction fails busy instead of replacing the first. Subagents v1 cannot call either question tool. Waiting consumes no inference steps; on the last permitted step do not open a form that cannot be followed by a continuation. Recheck policy, active generation, IDs, and revision at submission; settle once even with duplicate clicks or Stop races. Clear listeners/drafts on teardown according to explicit retention rules.

Add structured-input-contract.js and a component renderer; extend the broker through a typed adapter rather than changing the original question/answer wire contract. Persist requests/answers in thread events and [observability](diagnostics.md#feature-observability); unsubmitted keystrokes are local drafts, not interaction logs. Eligible/admitted tools remain distinct. This extension starts Disabled and is never registered as an external WebMCP task tool by default.

<a id="feature-structured-input-extension-acceptance"></a>

### Acceptance

Test tree reachability/depth/size, every field mapping and answer variant, zero/false versus missing, real dates, timezone ambiguity, option tampering, budget errors, XSS/prototype names, double submission, Stop, policy revocation, reload, and the shared interaction slot. A scripted session must request a form, receive exact typed answers, and then explicitly call any requested mutation. Verify that submitting the form itself never changes tasks, documents, schedules, or permissions. Run all existing original-question contract tests unchanged.

---

<a id="feature-inline-visualizations"></a>

## Inline visualizations

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). Adapts T3's `html_render` idea to a standalone page; server-based `html_preview` screenshots are not included.

<a id="feature-inline-visualizations-purpose"></a>

### Purpose

Explain data or ideas more clearly with a self-contained chart, diagram, or local interactive illustration. Isolate generated presentation code so a richer explanation does not acquire the application's privileges.

<a id="feature-inline-visualizations-user-intent"></a>

### User intent

View and interact with an illustration, expand it, inspect or download its source, and remove it from view.

<a id="feature-inline-visualizations-agent-intent"></a>

### Agent intent

Use html_render to present information already obtained for the request with accessible alternatives. The agent cannot use artifact scripts to read app data, call tools, or perform hidden mutations.

<a id="feature-inline-visualizations-intent-and-actors"></a>

### Intent and actors

An agent-facing `html_render` tool displays a self-contained chart, diagram, or interactive explanation in chat. The user can expand, inspect source, download, or remove the artifact from view. Artifact scripts are isolated presentation code; they have no task mutation, model-session, attachment, authentication, or policy APIs.

<a id="feature-inline-visualizations-contract"></a>

### Contract

Required input: `version: 1`, `title` (1–120 characters), `html` (1–48000 characters), and `height` (integer 160–1200 CSS pixels). All fields are closed and validated. The HTML is a complete document containing its own styles and optional script. Reject network resources and content that exceeds the budget; do not silently cut a document. Inputs do not include JavaScript callbacks or task-store handles.

```json
{"type":"tool_call","name":"html_render","arguments":{"version":1,"title":"Tasks by priority","html":"<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><title>Tasks by priority</title><style>body{font:16px system-ui;padding:16px}</style><h1>Tasks by priority</h1><p>High: 2. Normal: 5. Low: 1.</p></html>","height":240}}
```

Success: `{ success: true, version: 1, artifactId: ID, title, status: 'rendered', height }`. It means the frame was mounted, not that the model's facts or JavaScript are correct. Return `unsupported` or `invalid_arguments` on isolation/resource-policy failure. Never report a screenshot or visual quality check that did not occur. Error events may later update artifact diagnostics outside the original tool result.

<a id="feature-inline-visualizations-ui-and-isolation-mapping"></a>

### UI and isolation mapping

Map title to a plain-text card heading and iframe `title`; HTML goes only into the frame's `srcdoc`; height sets a bounded wrapper height. Use `<iframe sandbox="allow-scripts">` without `allow-same-origin`, popup, download, form, or top-navigation privileges. Embed an application-supplied restrictive CSP before model content: default/network/connect/object/base/form/frame/worker sources denied; only inline script/style and local `data:` image resources needed by this feature are allowed. Do not grant `language-model` or WebMCP permissions to the frame. Test actual browser enforcement, including CSS resource URLs and nested frames.

The parent never inserts generated HTML with `innerHTML` or executes its scripts. Do not implement arbitrary postMessage commands. If resizing/diagnostics are supported, inject a fixed application bridge into the isolated document and accept only bounded diagnostic/resize messages from that exact `contentWindow`, with a per-mount nonce and exact message schema. Opaque-origin `event.origin === 'null'` is not sufficient authentication. No returned message may invoke parent tools or write state. The frame's requested size never bypasses parent limits.

Show a static heading, requested viewport, scrollable content, and source/download controls outside the frame. User interaction stays inside it; keyboard focus may leave it normally. Downloads are initiated by the parent after a user gesture and contain the HTML, without embedded task credentials or app handles. Removal disposes the frame and revokes parent-created object URLs; history may retain the artifact metadata/content subject to retention settings.

<a id="feature-inline-visualizations-model-instructions-and-context"></a>

### Model instructions and context

Description: “Display a finished self-contained visualization of information already obtained for the current request. Supply accessible HTML, inline CSS, and optional local interaction. No external resources or app access. Rendering does not change saved tasks. Keep it concise and include text alternatives.”

Prefer compact static charts for small results; include only task fields needed for the visualization. Do not keep full HTML in every subsequent observation or compaction summary: return an artifact reference and short title. An artifact cannot serve as a new permission prompt or pretend that clicking it applies task changes. For actual changes use existing tools or a separate reviewed proposal.

<a id="feature-inline-visualizations-integration-limits-and-acceptance"></a>

### Integration, limits, and acceptance

Add `artifacts.js` and `artifact-view.js`; compose local execution and render via `onAgentEvent()`. Persist content separately from thread messages in IndexedDB, with ownership and removal/tombstone references for future sync. Default maximum: 10 artifacts or 1 MiB per thread; reject new ones with a clear limit until the user removes retained artifacts. Unmount on Stop/teardown if still mounting.

Test malicious HTML cannot access parent storage, navigate the page, fetch URLs, open windows, run tools, or forge another artifact's bridge messages. Test a working local interaction, long content/mobile scrolling, errors, download cleanup, ownership, disabled dispatch, and no invented screenshot support. Infinite loops and resource-heavy generated scripts remain a limitation of in-page rendering; provide a user Close artifact control and document the option to disable script execution entirely. No claim of a perfect resource sandbox is made.

---

<a id="feature-in-app-guidance"></a>

## In-app guidance

Status: approved specification. Agent-facing page guidance tools plus dismissible human controls, linked to the app's registered WebMCP actions. Uses [capability controls](capability-policy.md#feature-capability-controls), [execution policy](capability-policy.md#feature-execution-permissions), [observability](diagnostics.md#feature-observability), and [structured input](interactive-experiences.md#feature-structured-input-extension). This is app navigation, not arbitrary browser/DOM automation.

<a id="feature-in-app-guidance-purpose"></a>

### Purpose

Help users find and understand app features using registered page actions rather than fragile selectors or automated clicks. Shared dispatch with WebMCP keeps local guidance and approved external exposure under the same rules.

<a id="feature-in-app-guidance-user-intent"></a>

### User intent

Ask to see a relevant view or control, follow a short explanation or tour, and dismiss or disable guidance whenever desired.

<a id="feature-in-app-guidance-agent-intent"></a>

### Agent intent

Discover registered targets, open an authorized view when requested, and show a bounded tip or tour. The agent cannot create page actions, click arbitrary controls, change permissions, or move focus from background work.

<a id="feature-in-app-guidance-registered-targets-and-action-ownership"></a>

### Registered targets and action ownership

Define one application-owned page-action registry. Each entry has actionId:LocalID, targetId:LocalID, label 1–120, description 0–240, action kind navigate/highlight, supported view state, domain effect, and an internal handler/DOM resolver. Code registers these entries; models supply only known IDs. DOM nodes, selectors, URLs, callback code, storage handles, and credentials never enter model arguments. Stable target IDs such as memory_manager or agent_permissions replace generated CSS selectors.

Navigation actions open app views or exact currently permitted record views; they do not press arbitrary controls, submit forms, change settings, or grant permissions. Domain mutations remain their own registered tools with exact contracts and approval. A visual link to an action does not imply it can bypass its domain service. Background/child/scheduled agents cannot move focus or start tours; v1 guidance is available only to the foreground main conversation after a relevant human request.

<a id="feature-in-app-guidance-agent-contracts-and-dom-mapping"></a>

### Agent contracts and DOM mapping

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

<a id="feature-in-app-guidance-webmcp-mapping"></a>

### WebMCP mapping

Reuse the existing registerWebMCP adapter and current feature-detected context registration API; local chat and external page agents call the same action dispatcher/validators. The project baseline supports document.modelContext with a navigator.modelContext compatibility path. Do not invent a separate remote MCP server or assume WebMCP supplies authentication, arbitrary DOM access, or a standalone browser automation API.

Extend user policy with explicit external exposure choices for these registered navigation/guidance tools, default off. The model's local Include/Discover mode does not grant external registration. Register only selected enabled page tools; unregister on revocation where supported and retain dispatch-time checks for stale references. An external call must bind to the visible page's authorized actor/project scope; if the transport cannot establish required foreground/user intent or an approval host, return unavailable/permission_denied rather than borrow a chat run's authority. External targets do not expose chat content or owner-wide data merely because the page is open.

For declarative WebMCP forms, use the browser's supported tool-name/description annotations only on genuine app controls whose existing submit handler validates the same contract. Merely highlighting a form is not submission; an external agent submit is an agent action with policy/approval, not a trusted human click. Model output cannot author/register new declarative tools or alter annotations. Implementers must use current Chrome WebMCP definitions and test supported builds; if registration is unavailable, the local dispatcher still supports in-app chat guidance and manual UI.

<a id="feature-in-app-guidance-settings-storage-and-acceptance"></a>

### Settings, storage, and acceptance

Appearance/help settings include Enable agent guidance, Enable tours, and separately expose eligible guidance actions through WebMCP. These are human-only choices; revocation dismisses active guidance. Registry handlers are code, not synced records. Persist preferences and bounded tip/tour lifecycle events in IndexedDB, not live element references. User state and app navigation histories do not become a new always-injected prompt block.

Add page-actions.js and guidance-view.js; route approved registration through the same policy service as other WebMCP tools. Test discovered IDs versus arbitrary selectors, stale registries, foreground restrictions, disabled external exposure, genuine mutation gates, hidden-target leaks, tour dismissal, missing targets, focus/accessibility, and no automatic clicks. Native WebMCP browser tests must be labeled separately from local dispatcher mocks.

Reference: [Chrome WebMCP](https://developer.chrome.com/docs/ai/webmcp). Registration interfaces evolve; application action identities, permissions, and completion semantics above remain the required contract.

---

<a id="feature-voice-interaction"></a>

## Voice interaction

Status: approved specification. Uses only Chrome/browser APIs for recording, recognition, transcription, and playback. No endpoint/cloud speech provider, external speech library, or server audio service. Uses [attachments](conversation-lifecycle.md#feature-attachments), [questions](request-user-input.md), [structured input](interactive-experiences.md#feature-structured-input-extension), and [observability](diagnostics.md#feature-observability).

<a id="feature-voice-interaction-purpose"></a>

### Purpose

Offer spoken input and readable replies through Chrome/browser speech APIs while keeping the normal text workflow usable. Mandatory transcript review and capability checks prevent recording from becoming an unreviewed instruction or a hidden cloud route.

<a id="feature-voice-interaction-user-intent"></a>

### User intent

Choose supported local speech options, explicitly record or dictate, review and send the transcript, and control optional read-aloud playback.

<a id="feature-voice-interaction-agent-intent"></a>

### Agent intent

The agent does not act through this spec to open the microphone, choose a speech provider, or start playback. It receives a reviewed message through the ordinary chat contract; browser-controlled transcription and synthesis remain separate from agent tools.

<a id="feature-voice-interaction-actors-and-capability-choices"></a>

### Actors and capability choices

Voice is a human-controlled input/output surface, not an agent tool that opens the microphone. The human chooses a language, presses Record/Dictate, reviews text, and explicitly sends it. Replies retain normal text and optionally have Read aloud. Browser availability, microphone permission, installed language packs, Prompt API audio support, and local synthesis voices are separate capabilities. A configured [local text LLM](local-model-endpoint.md) does not receive microphone bytes or replace this Chrome-only speech path.

Input path A is on-device Web Speech recognition when supported: feature-detect SpeechRecognition, processLocally, and its available/install methods. Set processLocally=true before start; check available({langs:[language],processLocally:true}). For downloadable packs offer a user-initiated install and then retry availability. Never set processLocally=false as a fallback, including on prefixed legacy implementations. If local processing cannot be established, this path is unavailable. Model training downloads/language packs may need network installation; recognition after setup must use the declared on-device path.

Input path B records a bounded clip using getUserMedia({audio:true}) and MediaRecorder, then uses a fresh tool-free Chrome LanguageModel session that actually supports audio. It asks only for transcription into `{transcript:string}` with maxLength 4000 through responseConstraint. Declare matching expectedInputs/Outputs in availability/create. One transcription inference, no task executor, no skill/memory retrieval, no main-agent prompt, and no domain mutation. Prompt API audio may be unavailable on a device; detect rather than assume GPU/model support. Transcription errors/hallucinations remain possible, which is why review is mandatory.

Select a supported path through human settings, not a silent network/provider switch. If neither is available, retain typed chat and optionally attach a supported clip through the existing attachment flow. That attachment must still be explicitly sent; a recording alone is not a task instruction. No always-listening wake word, continuous background recording, or realtime interruption is part of v1.

<a id="feature-voice-interaction-uicontroller-contracts"></a>

### UI/controller contracts

Device-local voice settings are closed `{enabled:boolean,language:string,recognition:'on_device_speech'|'prompt_audio',readAloud:'manual'|'conversation_opt_in',voiceURI:string|null,rate:number}`. language is a supported BCP-47 tag 1–40; voiceURI is an exact currently available local voice ID <=240 or null; rate 0.5–2 default 1. Defaults: disabled, device language, preferred supported path, manual, null, 1. Save never activates a microphone or downloads a model/pack automatically. Device voice identifiers/availability do not sync as portable agent settings.

Controller state is idle -> requesting_permission -> recording -> processing -> review -> submitted, with error/cancelled terminal exits returning to idle. A recordingId:ID and generation token prevent stale callbacks updating another draft. Maximum duration 60 seconds and recorded bytes 10 MiB, with a visible countdown and Stop/Discard. Use MediaRecorder.isTypeSupported plus actual decode/input compatibility; do not relabel a WebM blob as WAV. If conversion is necessary, use tested browser decoding/encoding code with explicit bounds, or reject unsupported encoding.

The direct human Send voice-draft operation is `{recordingId,expectedRevision,text}` with nonblank edited text 1–4000. It resolves to the same accepted user-message service as typed text, returning messageId/acceptedAt; source metadata is `{kind:'voice_transcript',recordingId,edited:boolean}`. It does not bypass the queue or directly answer a pending question. Dictation into a question/form field changes only that field's draft; the original question/form Submit still produces its exact structured answer. The model never decides whether a transcript is an approval click.

```json
{"recordingId":"recording-1","expectedRevision":1,"text":"Remind me in 30 minutes to review the meeting notes."}
```

Display permission/download status, elapsed recording time, Stop, Discard, transcript editor, and Send. Interim recognition text is draft only and cannot trigger tools. Empty/unrecognized audio yields no accepted user message. Do not auto-retry recording after denial. Stop all media tracks, recognition sessions, transcription sessions, listeners, buffers, and object URLs on Discard/teardown/page hiding while recording. Stop model work and Stop recording are clearly labeled independent controls; global teardown stops both.

Relative-time instructions anchor to when the reviewed transcript is explicitly sent, unless the user deliberately specifies an earlier instant. Preserve recording time as provenance, not a hidden alternative anchor. The clock tool still refreshes current time as specified. A queued transcript is an accepted message with its original acceptedAt and stale-resource checks.

<a id="feature-voice-interaction-local-speech-output"></a>

### Local speech output

Use speechSynthesis.getVoices(), voiceschanged, and SpeechSynthesisUtterance. Select only voices with localService===true; do not fall back to a remote voice or a provider endpoint when none exists. If the selected local voice disappears, stop and offer another available local voice or text. A voice list initially empty is not a permanent failure; handle asynchronous discovery with a bounded visible wait.

Read accepted final text or a user-selected passage, stripping Markdown syntax through the safe renderer's plain-text extraction. Do not speak raw tool JSON, credentials, hidden notes, unsubmitted drafts, or every streaming token. Maximum spoken passage 4000 characters; split at sentence boundaries into app-owned queued utterances. Read aloud/Stop/Pause/Resume are native accessible controls. Conversation opt-in permits automatic final-reply reading in that foreground conversation only; it does not start input recording. Stop speech must work without cancelling a completed task or fabricating a model result. No downloadable audio file is promised by browser synthesis.

<a id="feature-voice-interaction-logging-persistence-and-acceptance"></a>

### Logging, persistence, and acceptance

Persist only accepted transcript/source metadata by default. Keep unsubmitted audio/transcripts ephemeral; explicitly saving audio uses the normal attachment storage/retention flow. Diagnostic events record capability/path, duration, errors, transcription prompt/result where an inference actually ran, and accepted edited text. Speech recognition interim results and audio bytes are not copied into logs. A transcription is a maintenance inference with no tools; it cannot inherit the local endpoint fallback route.

Add voice-controller.js and voice-view.js with small adapters for the detected APIs. Test user activation/permission denial, local-only recognition enforcement, pack download failure, codec mismatches, duration/byte limits, stale callbacks, mandatory review, typed answer validation, local voice filtering, playback cancellation, and teardown. Real Chrome audio/recognition tests are separate from mocked event tests. Verify no audio, recognition request, or speech-synthesis request is sent to an endpoint by this feature. Only the reviewed transcript explicitly sent by the human may enter the ordinary selected text-provider route. Typed chat works when every speech API is unavailable.

References: [Chrome Prompt API](https://developer.chrome.com/docs/ai/prompt-api), [on-device Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API), and [local synthesis voices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService). Feature detection and actual native support govern which controls are enabled.
