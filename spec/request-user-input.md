# Structured user questions for Daylist

Status: implementation specification; no runtime changes are included.

Baseline: `jpconstantineau/Agent-Prototype` commit `013490507869ab5a0bce63f8cf219ef3e1e7c0d1`, inspected on 2026-10-28.

## 1. Outcome and scope

Add a `request_user_input` tool to the in-page assistant. When the assistant needs information, it returns a structured tool call. Daylist displays an inline form, waits for an explicit human submission, and supplies a structured tool result to the same agent run. The assistant can then continue the original task.

Examples include choosing between similarly named saved tasks, supplying a shorter task title, and clarifying a missing detail. Asking a question must not create or modify a task. Selecting an option must not itself execute the task operation it describes.

The implementation uses browser-native ES modules, plain JavaScript objects, promises, DOM elements, and Chrome's text Prompt API. It requires no TypeScript, React, UI framework, runtime npm dependency, application server, or native Prompt API tool-calling extension. Existing development test dependencies remain appropriate.

Version 1 supports one pending request in the current chat, one to three questions per request, single selection, multiple selection, free text, an optional custom answer for choice questions, and explicit skipping of optional questions. It excludes attachments, asynchronous background questions, persistent chat, multi-tab answering, and external-agent invocation of the question tool.

## 2. Fit with this project

The application is served from `docs/`; this specification lives outside that published directory. These are the relevant existing entry points:

| Existing file | Current behavior | Required change |
| --- | --- | --- |
| `docs/src/agent.js` | `responseSchema()` derives `tool_call` branches from definitions. `systemPrompt()` lists tools. `AgentLoop.run()` executes tools and returns JSON observations through `session.prompt()`. | Pass the composed chat executor to session creation and the loop. Update clarification instructions, observation context, events, and the final-iteration rule described below. |
| `docs/src/tool-guidance.js` | Central task intent rules, tool descriptions, examples, and continuation instructions. | Add the question description and replace prose-final clarification guidance for the local chat. Retain existing task intent rules. |
| `docs/src/schema.js` | Small validator for objects, scalars, and `anyOf`. | Add recursive array validation before introducing nested question/answer arrays. |
| `docs/src/tools.js` | Five IndexedDB task tools; optional WebMCP registration/discovery/dispatch. | Keep those five task tools and their transport behavior. The question tool is composed around their selected executor. |
| `docs/src/app.js` | Session lifecycle, `onAgentEvent()`, activity cards, composer controls, Stop, panel visibility, and page teardown. | Own the pending-question broker and view, wire events, and cancel pending work during teardown. |
| `docs/index.html` | Conversation `#messages`, `#activity-status`, and the `#chat-form` composer. | Render an independent question form inside the conversation, outside `#chat-form`. |
| `docs/src/styles.css` | Imports the theme and styles the assistant. | Add question-card, choice, validation, pending, and read-only summary styles using current tokens. |
| `docs/src/store.js` | IndexedDB transactions and change broadcasts. | No database or migration changes. |

The existing loop already keeps `busy` true while it awaits `registry.execute()`. The new tool can wait on a promise at that boundary. A question does not need to terminate `run()`, start another run, recreate the model session, or consume inference calls while the user is thinking.

### 2.1 Proposed module boundaries

Add these browser modules under `docs/src/`:

| Module | Responsibility |
| --- | --- |
| `user-input-contract.js` | Input/result schemas, semantic validators, constants, tool definition, and canonical answer construction. No DOM or inference. |
| `user-input-broker.js` | One pending request; generate IDs, hold the promise, validate submission, settle once, handle cancellation, and emit lifecycle events. No task writes. |
| `user-input-view.js` | Build native DOM controls, maintain local drafts, render errors and final summaries, and invoke broker submission. No model calls or task writes. |
| `chat-executor.js` | Combine task-tool definitions with the local question definition; route question execution to the broker and all other tools to the selected task executor. |

Names are proposed implementation names. The contracts and behavior below are normative. MUST denotes a required behavior; SHOULD denotes a default that may change only with an explicit documented reason.

## 3. Model-to-application contract

### 3.1 Reuse the existing action envelope

Keep both existing action types. A question is a regular `tool_call`, not another top-level action type:

```json
{
  "type": "tool_call",
  "name": "request_user_input",
  "arguments": {
    "version": 1,
    "title": "Choose the completed task",
    "questions": [
      {
        "id": "completed_task",
        "header": "Task",
        "question": "Which book task did you finish?",
        "mode": "single",
        "required": true,
        "allowCustomAnswer": true,
        "options": [
          {
            "id": "task_3",
            "label": "Read book",
            "description": "Task #3"
          },
          {
            "id": "task_4",
            "label": "Write book",
            "description": "Task #4"
          }
        ]
      }
    ]
  }
}
```

The example IDs are illustrative. Numeric task IDs still come from actual saved-task tool results. An option ID is an opaque string within a question, not an executable argument or a task ID that the controller may parse into a mutation. The model maps the selected option to the task information it actually retrieved.

Normal answers still use `{"type":"final","message":"..."}`. All five existing task-call formats remain valid.

### 3.2 Complete input schema

The following is ordinary JavaScript suitable for `user-input-contract.js`. It uses the project's existing closed-object helper. `validate()` must first gain the array behavior in section 5.

```js
import { object } from './schema.js';

const identifier = { type: 'string', minLength: 1, maxLength: 64 };

export const questionOptionSchema = object({
  id: identifier,
  label: { type: 'string', minLength: 1, maxLength: 120 },
  description: { type: 'string', maxLength: 240 },
  recommended: { type: 'boolean' },
}, ['id', 'label', 'description']);

export const questionSchema = object({
  id: identifier,
  header: { type: 'string', minLength: 1, maxLength: 40 },
  question: { type: 'string', minLength: 1, maxLength: 600 },
  mode: { type: 'string', enum: ['single', 'multi', 'text'] },
  required: { type: 'boolean' },
  allowCustomAnswer: { type: 'boolean' },
  options: {
    type: 'array', minItems: 0, maxItems: 6,
    items: questionOptionSchema,
  },
}, ['id', 'header', 'question', 'mode', 'required', 'allowCustomAnswer', 'options']);

export const requestUserInputSchema = object({
  version: { type: 'integer', minimum: 1, maximum: 1 },
  title: { type: 'string', minLength: 1, maxLength: 80 },
  questions: {
    type: 'array', minItems: 1, maxItems: 3,
    items: questionSchema,
  },
}, ['version', 'title', 'questions']);
```

Semantic requirements after schema validation:

- IDs MUST match `/^[a-z][a-z0-9_]{0,63}$/`. Question IDs are unique within a request; option IDs are unique within their question. The same option ID may appear in different questions.
- All fields with `minLength: 1` MUST contain non-whitespace text. Whitespace is not silently repaired to make an invalid request valid. Display strings and IDs otherwise remain exactly as supplied.
- A `single` or `multi` question MUST have 2–6 options. A `text` question MUST have `options: []` and `allowCustomAnswer: false`; its primary input is already free text.
- At most one option per question may have `recommended: true`; absent means false. A recommendation is a visual annotation, never a default answer.
- Reject duplicate option labels after trimming and case folding within a question; they would make the form ambiguous. Repeated descriptions are allowed.
- Reject the whole request if any question is invalid. Do not show a partially valid form, truncate questions, rewrite their meaning, or create placeholder options.
- The schema version is an application protocol version. Unsupported versions are invalid arguments.

Question IDs, option IDs, title, and text are data. They MUST NOT become HTML, executable JavaScript, unescaped selectors, DOM element IDs, or property paths. Use generated DOM identifiers and `Map` for ID lookups.

## 4. Human-to-application and application-to-model contracts

### 4.1 Browser-owned identifiers

The run controller assigns `runId` when a chat run begins; the broker assigns `requestId` when it accepts a valid question request. Generate both with `crypto.randomUUID()`. They are strings local to this page lifecycle, not model-generated arguments, task IDs, or WebMCP call IDs.

The active request stores `{ runId, requestId, arguments }`. Its validated arguments MUST be detached from mutable caller objects and treated as immutable. The view receives that snapshot. A submitted ID cannot refer to a prior run's card, even when question IDs happen to repeat.

### 4.2 Submission object

The view calls `broker.submit()` with this plain object:

```json
{
  "requestId": "b1b44b29-e9c7-41d6-bdc2-4ea32988f8b0",
  "answers": [
    {
      "questionId": "completed_task",
      "kind": "choice",
      "optionIds": ["task_4"]
    }
  ]
}
```

There are exactly three allowed answer shapes:

```js
// These examples are alternatives, not one combined answer.
({ questionId: 'completed_task', kind: 'choice', optionIds: ['task_4'] });
({ questionId: 'shorter_title', kind: 'text', text: 'Review browser prototype' });
({ questionId: 'optional_note', kind: 'skipped' });
```

A custom answer to a choice question uses `kind: 'text'`, exactly like a primary text answer. It is an alternative to choices. Version 1 does not combine selected options and custom text in one answer.

### 4.3 Complete submission and success schemas

Place these definitions in the same contract module as the input schema; `identifier` is defined in section 3.2.

```js
const answerSchema = {
  anyOf: [
    object({
      questionId: identifier,
      kind: { type: 'string', const: 'choice' },
      optionIds: {
        type: 'array', minItems: 1, maxItems: 6,
        uniqueItems: true, items: identifier,
      },
    }, ['questionId', 'kind', 'optionIds']),
    object({
      questionId: identifier,
      kind: { type: 'string', const: 'text' },
      text: { type: 'string', minLength: 1, maxLength: 2000 },
    }, ['questionId', 'kind', 'text']),
    object({
      questionId: identifier,
      kind: { type: 'string', const: 'skipped' },
    }, ['questionId', 'kind']),
  ],
};

const answersSchema = {
  type: 'array', minItems: 1, maxItems: 3, items: answerSchema,
};
const requestIdSchema = { type: 'string', minLength: 1, maxLength: 80 };

export const userInputSubmissionSchema = object({
  requestId: requestIdSchema,
  answers: answersSchema,
}, ['requestId', 'answers']);

export const userInputSuccessSchema = object({
  success: { type: 'boolean', const: true },
  version: { type: 'integer', minimum: 1, maximum: 1 },
  requestId: requestIdSchema,
  status: { type: 'string', const: 'answered' },
  answers: answersSchema,
}, ['success', 'version', 'requestId', 'status', 'answers']);
```

Cross-check a submission against the immutable pending request, not merely its JSON shape:

1. Verify that the run is active, its signal is not aborted, the pending request is unsettled, and `requestId` matches exactly.
2. Require exactly one answer for each question, including explicit `skipped` answers. Reject missing, duplicate, and unknown question IDs.
3. For `choice`, verify the question is a choice mode, all option IDs exist, no IDs repeat, and cardinality is one for `single` or 1–6 for `multi` (bounded by available options).
4. For `text`, require `mode: 'text'` or `allowCustomAnswer: true`. Trim outer whitespace, preserve internal newlines and spaces, and require 1–2000 characters. Do not truncate oversized pasted text.
5. Permit `skipped` only when `required: false`. An empty answer is not an implicit skip.
6. Reject unrelated fields rather than dropping them. Inactive draft data is not part of the submitted object.
7. Canonicalize answer order to question order and choice IDs to displayed option order. Do not reorder the UI itself.

Lengths in this specification use JavaScript string `.length`, matching this project's validator and HTML controls. They are not token budgets. IDs are preserved byte-for-byte within the ASCII grammar.

`broker.submit()` returns synchronously either `{ accepted: true }` or `{ accepted: false, errors: [{ questionId, code, message }] }`. Use `questionId: null` for card-level errors. Stable error codes include `stale_request`, `missing_answer`, `duplicate_answer`, `unknown_question`, `unknown_option`, `invalid_kind`, `invalid_count`, `text_required`, `text_too_long`, and `skip_not_allowed`. Invalid UI submissions keep the pending promise and draft open; they do not become model observations.

On acceptance, atomically mark the request settled and resolve the execution promise with:

```json
{
  "success": true,
  "version": 1,
  "requestId": "b1b44b29-e9c7-41d6-bdc2-4ea32988f8b0",
  "status": "answered",
  "answers": [
    { "questionId": "completed_task", "kind": "choice", "optionIds": ["task_4"] }
  ]
}
```

This means only that the user supplied answers. It does not mean a task was saved. Actual mutations still require their existing tools and successful observations.

### 4.4 Tool errors and cancellation

Invalid model arguments return the existing tool-error convention, for example `{"success":false,"error":"Question completed_task has duplicate option IDs."}`. Emit an ordinary failed `tool_result` and let the bounded loop request a correction. No question card appears. Unsupported input, a missing UI host, or a second concurrent request also returns `success: false` without replacing any pending form. Error messages are produced by application code and should identify the invalid field without dumping all user data.

Cancellation is a rejected promise with an `AbortError`, not `success: true`, an empty successful answer list, or a synthetic user reply. It terminates the current run through its existing `cancelled` outcome. No further model call is made for that run. There is deliberately no model-facing cancellation-result schema in version 1. Record cancellation as a lifecycle event and mark the card Cancelled.

## 5. Validation and parsing

Extend `validate()` in `schema.js` with an array branch that checks `Array.isArray(value)`, `minItems`, `maxItems`, recursively validates every element through `items`, and implements `uniqueItems` for the string arrays used here. Do not let arrays pass through the current validator unchecked. Treat a schema keyword introduced by this feature as implemented and tested before using it; version 1 does not require `$ref`, conditional schemas, formats for UUIDs, or a third-party validator.

Apply validation at four boundaries: parsed model action, question execution, UI submission, and success result before it becomes a model observation. Schema validation checks types and shapes; dedicated semantic functions check relationships and current request identity. The controller MUST NOT trust Chrome's constrained generation as a replacement for runtime checks.

Keep `JSON.parse(raw)` followed by validation. Do not extract JSON with regex, strip code fences to accept malformed output, evaluate code, or dispatch a tool from partial streamed content. Continue using `session.prompt()` for complete action objects. Existing invalid-action recovery consumes the normal model-call budget and executes nothing.

## 6. UI and precise field mapping

### 6.1 Card layout

Append an inline question card to `#messages` in chronological order. It contains a heading from `arguments.title`, a short fixed instruction such as “Answer below to continue”, all 1–3 question groups, validation text, an **Answer and continue** submit button, and a **Cancel request** button. Show all questions in one form; this version has no question wizard, Next button, or automatic advance.

Use a native `<form>` for the card, `<fieldset>` and `<legend>` for each question, `<input type="radio">` for single selection, `<input type="checkbox">` for multiple selection, and `<textarea maxlength="2000">` for text. Keep this form outside the existing composer form. Buttons other than the submit control use `type="button"`.

Display the header as a short caption and the full question as the legend. Optional questions are explicitly labeled Optional. Option descriptions are secondary visible text associated with their input. A recommended option gets a “Recommended” text badge, without a checked state.

### 6.2 Contract-to-control mapping

| Contract value | UI behavior | Submitted answer |
| --- | --- | --- |
| `title` | Card heading, rendered as text. | Not editable or included in the answer. |
| `question.id` | Private lookup key scoped to this request. | Copied into `questionId`. |
| `header` / `question` | Caption / legend. | Recovered from pending arguments when constructing the observation. |
| `mode: 'single'` | One radio group with initially unchecked options. | `kind: 'choice'`, exactly one `optionIds` entry. |
| `mode: 'multi'` | Initially unchecked checkboxes with “Choose one or more”. | `kind: 'choice'`, all checked option IDs in display order. |
| `mode: 'text'` | An empty labeled textarea and a remaining-character indicator. | `kind: 'text'` with normalized `text`. |
| `option.id` | Bound through a closure or local mapping to the generated input. | Exact ID in `optionIds`; label text is never used as the ID. |
| `label` / `description` | Visible option text, rendered with `textContent`. | Not copied from the DOM into the result. |
| `recommended: true` | Visible recommendation badge. | No implicit selection or submission. |
| `allowCustomAnswer: true` | An additional UI-owned “Other answer” route and a textarea. | `kind: 'text'`; no option IDs. |
| `required: false` | “Skip this question” control with an Undo skip action. | `kind: 'skipped'` only after explicit skip. |
| Broker `requestId` | Private form identity. | Copied into the submission and validated before settling. |

For a single-choice question, Other answer is a radio row in the same group. For a multi-choice question, use a “Use a custom answer instead” checkbox; while active it disables the option inputs and enables the custom textarea. An unchecked custom toggle restores choice mode. The UI-owned custom route is never appended to `arguments.options` and never invents an option ID.

Drafts may remember inactive text/selections when the user switches modes. Only the active route is serialized. Skipping disables the question's inputs while preserving its draft; Undo skip restores it. Neither skipped nor inactive fields contribute hidden answers. Clearing every selected option leaves a question unanswered, not skipped.

No input is preselected or prefilled by the model. On initial render the submit button is disabled. Recompute readiness on input/change/skip: each question needs a valid active answer or an explicit permitted skip. The submit handler MUST validate again, even if the button was enabled. Keep inline errors after a failed submit until corrected; associate each with its group or input.

### 6.3 Waiting and settled states

While waiting, display “Waiting for your answer” in `#activity-status`. Keep `running` and `agent.busy` true. Retain the current composer text, but keep `#chat-input` read-only, Send unavailable, example buttons disabled, and New chat disabled, matching the current single-run policy. Do not route composer Enter to question submission. Stop remains usable. The card's Cancel request button calls the same abort-and-destroy path as Stop.

Question selection and typing never call the model. Only Answer and continue submits. A browser-generated submit from a choice control's Enter key is treated the same as pressing that button; prevent submission during IME composition. Enter inside a textarea inserts a newline. No document-wide number shortcuts or Enter handlers are needed.

When accepted, synchronously disable the form to prevent duplicate clicks, render a read-only summary containing the actual selected labels/text or “Skipped”, and announce “Answer sent. Continuing.” A single visible human-answer summary is enough; do not also append a duplicate ordinary chat message. Keep the original question and the detailed JSON activity inspectable. On cancellation, retain a read-only Cancelled card without presenting drafts as submitted answers.

The existing generic activity card for this tool SHOULD read “Question answered” and place the diagnostic arguments/result in `<details>`. Exclude human waiting time from any label that implies model execution speed; omit the millisecond label for this tool or explicitly label it total elapsed time including the human wait.

### 6.4 Accessibility, visibility, and small screens

Use native input semantics and associated labels, generated unique IDs, visible focus styles, and normal Tab order. Single-choice arrow navigation and checkbox Space behavior come from the browser. Do not imitate radios with generic clickable `<div>` elements.

Mount the question form in a region that is not repeatedly re-announced by the conversation's live log; use a small polite status announcement for arrival and settlement. For example, disable live announcements on the interactive card subtree and announce its title once through `#activity-status`. Avoid repeatedly rebuilding the card as the user types. Validation summaries use `role="alert"` only after an attempted submission.

If the assistant is visible when the question arrives, focus the card heading (`tabindex="-1"`) once so its context is available before the inputs. Do not move focus again on each edit. Focus the first invalid control after a failed submission. After acceptance/cancellation, if focus was inside the replaced card, move it to a persistent status element; return to the composer once the run finishes and the composer is available. Do not steal focus from someone working elsewhere.

Closing the assistant panel hides the card but does not cancel or submit it. The Assistant toggle displays a visible “Answer needed” indicator and an accessible label until resolved. Reopening while waiting focuses the question heading rather than the close button. If the panel was hidden before the request arrived, do not open it or steal focus; announce the waiting state and expose the indicator.

Keep the main task list usable during a question. The question card uses the existing panel width, wraps long text with `overflow-wrap: anywhere`, keeps actions visible without horizontal scrolling, and uses touch targets of at least 44 CSS pixels. Use existing theme colors with sufficient contrast and non-color state labels. The card is not a modal and does not trap focus.

## 7. Presenting the tool to the model

### 7.1 Definition and prompt inclusion

Export a single definition with `name`, `description`, and `inputSchema` in the same format as existing tools. Use this description, or equivalent wording preserving its rules:

> Ask the user for information needed to continue their current request. Supply 1–3 concise questions using single choice, multiple choice, or text. Use this for ambiguous saved-task references and missing required details. Ground task choices in actual tool results and use distinct option IDs. Recommendations are suggestions only. The application waits for an explicit user answer and returns it as a tool result. Never generate answers for the user. Continue the original task from the answer; do not create a task from a clarification reply. Do not ask for confirmation for clear task additions or clear authorized edits. Skipped questions supply no value.

Pass the composed definitions to both `createModelSession()` and the `AgentLoop` constructor. As a result, `systemPrompt(definitions)` includes the definition and `responseSchema(definitions)` includes the exact input schema under the existing tool-call branch. Never list a tool the active executor cannot execute. The success schema is for application validation; describe its structure in the system prompt rather than adding it as a possible model action.

### 7.2 Required instruction changes

The current prompt ends by telling the model to return a final reply when clarification is needed. Current intent rules and examples also use prose `final` questions. Update all those conflicting instructions in `agent.js` and the local-chat guidance:

- Use `request_user_input` for an actionable clarification. Use `final` for completed replies, explanations, unsupported operations, and unrecoverable failures.
- Inspect the tool result before continuing. `success: true` on this tool means only that the user answered.
- A choice answer refers to the option IDs in that request. Use the question/option definitions in the observation to interpret it. Never infer a task ID from an option label or array index.
- Text is the user's clarification within the original request. Do not reinterpret a selected task title or a shorter-title answer as a new standalone add request. If text introduces a different operation, explain or clarify its scope before proceeding.
- A skipped answer supplies no fact, preference, or authorization. If a required operation depends on a skipped optional value, explain what remains unresolved instead of guessing.
- Keep the original task intent rules: clear bare task text is added directly; ambiguous completion references require clarification; read requests do not authorize writes; successful mutations are not repeated.
- When a long-title request needs a shorter title, ask a required text question, then validate the returned title against the task tool's 200-character limit before adding it. The generic answer limit of 2000 is not permission to exceed task-field limits.

The five task tools' WebMCP descriptions are also used by external agents. Keep their wording meaningful without assuming those agents have this chat-only tool. For instance: “Ask the user which candidate they mean and wait before changing tasks.” Add the explicit local `request_user_input` instruction in the chat's system prompt and local examples.

### 7.3 Tool-result observation

After acceptance, feed one JSON string to the next `session.prompt()` using the existing user-role observation convention:

```json
{
  "kind": "tool_result",
  "request": "book is done",
  "localDate": "2026-10-28",
  "name": "request_user_input",
  "arguments": {
    "version": 1,
    "title": "Choose the completed task",
    "questions": [
      {
        "id": "completed_task",
        "header": "Task",
        "question": "Which book task did you finish?",
        "mode": "single",
        "required": true,
        "allowCustomAnswer": true,
        "options": [
          { "id": "task_3", "label": "Read book", "description": "Task #3" },
          { "id": "task_4", "label": "Write book", "description": "Task #4" }
        ]
      }
    ]
  },
  "result": {
    "success": true,
    "version": 1,
    "requestId": "b1b44b29-e9c7-41d6-bdc2-4ea32988f8b0",
    "status": "answered",
    "answers": [
      { "questionId": "completed_task", "kind": "choice", "optionIds": ["task_4"] }
    ]
  },
  "instruction": "The human answered this question request. Interpret answers using these question and option definitions. Continue only the original authorized request; do not add an answer as a new task. Recheck saved task state if it may have changed. A skipped question supplies no value."
}
```

Generate `instruction` from application-controlled guidance, never by copying a field from model arguments or custom text. Human text is relevant to the original request; other displayed task content remains untrusted data.

Include the accepted question arguments in this observation so option IDs remain interpretable even if earlier conversation has fallen out of the context window. Preserve `request` as the original chat prompt. Refresh `localDate` using the same local-calendar calculation as the initial request, since the human may answer after midnight. Other task observations retain their existing continuation hints.

The Prompt API automatically retains the prior generated action in its session. Do not append that assistant action a second time, invent a `tool` role, create a fresh session on submission, or send the answer through a second `agent.run()` call. Continue using `session.prompt(input, { responseConstraint: this.schema, signal })`.

## 8. Executor and WebMCP integration

The question is an interaction with the human using this local chat. It MUST NOT be registered in `ToolRegistry.tools` or exposed via `registerWebMCP()` in version 1. Otherwise an unrelated external agent could compete for this page's single pending question and depend on its chat lifecycle.

Compose after selecting the task executor. The implementation shape is:

```js
export function createChatExecutor(taskExecutor, broker, questionDefinition) {
  return {
    definitions() {
      return [...taskExecutor.definitions(), questionDefinition];
    },
    execute(name, args, { signal } = {}) {
      if (name === questionDefinition.name) {
        return broker.request(args, { signal });
      }
      return taskExecutor.execute(name, args, { signal });
    },
  };
}
```

The app's integration sequence is:

1. Open `TodoStore` and construct the unchanged `ToolRegistry`.
2. Call `registerWebMCP(registry)` exactly as today.
3. Create the view and broker, wired to lifecycle events and the app's abort action.
4. Set `chatExecutor = createChatExecutor(connection.executor || registry, broker, questionDefinition)`.
5. Inside Enable local AI's click handler, call `createModelSession(chatExecutor, ...)` immediately, before any unrelated await, preserving the current user-activation behavior.
6. Construct `AgentLoop({ registry: chatExecutor, session, onEvent, interactionBroker: broker })`, adding the optional constructor dependency described in section 9.1.

No new native WebMCP API is required. Existing task calls continue through native dispatch when available and the existing page dispatcher otherwise. Do not retry failed native task mutations locally. A local question always uses the broker, including on WebMCP-capable builds. Diagnostics should distinguish “5 page tools” from the additional chat interaction tool rather than implying it was externally registered.

## 9. Broker lifecycle and run behavior

### 9.1 Public surface

The broker exposes plain JavaScript methods:

| Method | Behavior |
| --- | --- |
| `beginRun(runId, { emit })` | Associate subsequent requests and their event sink with the one active run; refuse a second active run. |
| `request(args, { signal })` | Validate arguments; return a promise for a success result, a failed-tool object for argument/setup errors, or reject on abort. |
| `submit(submission)` | Validate against the active request; return acceptance/errors immediately; resolve the waiting promise once on acceptance. |
| `endRun(runId)` | Clear run ownership; abort any unresolved request belonging to that run. |
| `dispose()` | Idempotently abort pending work, remove listeners, and release references. |

Add an optional `interactionBroker` dependency to `AgentLoop`. Inside `run()`, after its concurrency guard and run-local `emit` function exist, generate `runId` and call `interactionBroker?.beginRun(runId, { emit })` within the existing try/finally. Call `interactionBroker?.endRun(runId)` in `finally` before releasing `busy`. This gives the broker access to the actual trace sink without leaking it through tool definitions or model arguments. `endRun()` must affect only its matching active run, including if setup threw. Existing callers without the optional dependency continue to work. App code still awaits one `agent.run()`; it does not separately start or finish broker runs. The pending card is not the authority for whether the run is still active.

The broker catches only expected argument/setup validation errors into `{ success: false, error }`. Unexpected exceptions reject normally and use the existing model-error cleanup. A disposed broker cannot create new cards.

### 9.2 State transitions

```text
No pending request
  -> validate model arguments
       invalid -> failed tool result; no card
       valid -> waiting (request promise unresolved)

Waiting
  -> draft edit / invalid submit -> waiting
  -> valid submit -> answered; resolve promise; resume same loop
  -> AbortSignal / disposal -> cancelled; reject promise; end run

Answered or cancelled
  -> stale or duplicate submit -> reject locally; never resolve again
```

Before publishing the pending event, the broker MUST check an already-aborted signal, create the pending record and settlement guard, attach its abort listener, and check the signal again. This closes the registration race. Both submit and abort paths synchronously check/set the same guard before doing DOM work or resolving/rejecting. Remove the abort listener and resolver references on either terminal path. Use `new DOMException('Request cancelled.', 'AbortError')` when no existing abort reason is appropriate.

Recheck `signal.throwIfAborted()` after awaiting tool execution and before emitting a successful result or invoking the model again. The current loop checks before model calls but needs this check at the new human-wait boundary. If submission wins and Stop happens immediately afterward, the recorded human response may remain visible, but the run still stops before another inference or write.

### 9.3 Events

Preserve the existing `model`, `invalid_response`, `tool_start`, and `tool_result` trace events. Add these lifecycle events to the same run trace and `onAgentEvent()` pipeline:

| Event | Fields besides `type` | Meaning |
| --- | --- | --- |
| `user_input_requested` | `runId`, `requestId`, `arguments` | Validated request is ready to render. |
| `user_input_submitted` | `runId`, `requestId`, `result` | Exactly one validated human submission was accepted. |
| `user_input_cancelled` | `runId`, `requestId`, `reason` | Pending promise was cancelled. `reason` is a fixed application label. |

Supply the broker's event sink from the current run so its events go through the loop's existing `emit` function, not just directly to the UI. Do not trace every keystroke. Clear the per-run sink in `finally`; never append late events to another run. Events contain serializable data only, not signals, callbacks, DOM nodes, or promises. UI exceptions must not leave an unresolved pending request; terminate the run and clean up if its host cannot render.

### 9.4 Bounds, teardown, and competing changes

- Keep the existing maximum of 12 model calls per run. The call that produces a question consumes one iteration; waiting, editing, validation errors in the form, and clicking Submit consume none. Continuation consumes the next iteration.
- If a question action is produced on the last permitted iteration, do not open a form that cannot be followed by a model step. Return the existing `max_iterations` outcome before dispatching that question, with a deterministic explanation that the step limit was reached. Existing task-tool last-iteration behavior can remain unchanged.
- Stop and Cancel request abort the active controller, reject the pending question, and destroy the session through one shared cancellation function. The existing abnormal-result handling releases the session and requires Enable local AI before another run.
- `releaseSession()`, `pagehide`, programmatic resets, initialization failure, and unexpected model/tool errors MUST dispose or cancel pending UI before dropping references. New chat remains disabled during a run. Panel close alone is not cancellation.
- A pending request and draft are memory-only. Reload loses them and does not replay or auto-submit anything. Task storage persists as it does today. Existing `pageshow` handling for back/forward cache remains in force.
- There is no answer timeout and no polling loop. Keep Stop and panel controls available while awaiting a human.
- Manual edits and other tabs may change tasks while the question is open. Do not lock IndexedDB or hold a transaction during the wait. Before a mutation based on a task choice, the model should read current relevant state, confirm the chosen numeric ID still identifies the intended task, and clarify again if it no longer does. Missing tasks remain ordinary tool failures. Reads after waiting must not replay successful earlier mutations.
- If the continuation exceeds the model's context budget, end with the existing failure path and preserve committed tasks. Do not silently drop question definitions or partially resend answers. Offer a new session through the existing UI. Context-overflow notices remain applicable.

## 10. Complete example interaction

Assume actual read results establish task #3 Read book and task #4 Write book.

1. The user sends “book is done”. The existing user-request envelope starts one run.
2. The model calls `search_items` with `{ "query": "book", "status": "open" }` and inspects relevant pages. It finds both plausible tasks.
3. The model calls `request_user_input` using the example in section 3. The loop remains busy, and there is no task mutation.
4. The user selects Write book. Selection changes the local draft only. No model call occurs.
5. The user presses Answer and continue. The view submits `completed_task -> task_4`; the broker validates and resolves once.
6. The loop feeds the section 7.3 observation to the same session. The answer is not a new task title.
7. The model rechecks current matching tasks. If #4 still matches the chosen task and the original intent, it calls `complete_item` with `{ "id": 4, "completed": true }`.
8. The completion tool commits, returns the saved task, and the model produces a normal final confirmation. Only task #4 changed.

Alternate answers:

- Other answer “Neither; I meant my library book task” returns `kind: 'text'`. The model performs a fresh lookup or clarification; it does not automatically add that text.
- A multi-choice question returns multiple option IDs only if its question explicitly permits multiple selection. That cannot broaden a singular original request into bulk changes without the user's explicit clarification of scope.
- Skipping an optional note returns `kind: 'skipped'`; it does not clear an existing saved note unless that change was separately authorized.
- Cancel request ends the run immediately, leaving earlier committed changes saved and both book tasks unmodified by the unanswered clarification.

## 11. Implementation sequence

1. Extend and test array validation in `schema.js`; add the contract module and test its semantic checks and response normalization.
2. Implement the broker with a single pending record, identity checks, event sink, and AbortSignal cleanup. Test it without a DOM or model.
3. Add the composed chat executor; verify task dispatch remains delegated and the question never reaches WebMCP.
4. Integrate the composed definitions into session creation/response constraints. Update every contradictory local prompt/example and add the question continuation hint and contextual observation.
5. Implement the vanilla DOM view and connect it through `app.js`, including activity state, focus, panel indicator, shared cancellation, and read-only summary.
6. Add styles using the existing theme. Update `docs/README.md` and `docs/DESIGN.md` to explain the question interaction, local-only tool boundary, cancellation, and memory-only drafts.
7. Run the automated checks below, then evaluate actual local-model behavior separately. Commit/push/publication is outside this specification-writing task.

## 12. Verification and acceptance criteria

Extend the existing `node:test`, scripted sessions, and Playwright setup. The feature's runtime must remain dependency-free; development tests may use the dependencies already in `docs/package.json`.

### 12.1 Contract and broker tests

- Accept each question mode and each response variant, including multiple questions, optional skip, custom choice text, and recommendation display metadata.
- Reject arrays with invalid items, out-of-range lengths, duplicate string IDs, duplicate labels, wrong types, extra properties, unsupported versions, blank text, and incompatible mode/options combinations.
- Reject text on a fixed-choice question, choices on a text question, duplicate/missing answers, unknown IDs, wrong single-choice cardinality, and skipping a required question.
- Preserve exact IDs, trim only answer text, canonicalize ordering, and keep inactive draft values out of the submission. Test 2000-character and oversized answers.
- An invalid submission leaves the promise pending. A valid submission resolves once. Repeated, late, cross-request, and cross-run submissions cannot affect current state.
- Already-aborted signals, abort during waiting, disposal, and submit/abort races release listeners and settle correctly. No timer or arbitrary sleep is needed to prove waiting; use controlled promises and event milestones.

### 12.2 Loop and executor tests

- A scripted sequence `search -> question -> answer -> read -> complete -> final` changes only the selected task and preserves original request context. The model receives the same question definitions and answer IDs displayed by the UI.
- Prove that no second model call and no task mutation occurs before the deferred human submission. Duplicate clicks cause one continuation.
- Validate both model and UI boundaries: malformed model arguments create no card; invalid answers create no tool observation; invalid success objects do not reach the model.
- Preserve budget accounting; test a question on iteration 12, abort immediately after submission, and an error during continuation. No extra call occurs after cancellation or exhaustion.
- Verify system prompt, constrained tool branch, and executor definitions agree. Remove assertions/examples that require ambiguous clarification to end in a prose `final` reply.
- Verify custom text is never passed to the initial `user_request` path. Clear additions remain direct `add_item` calls. Read-only requests remain read-only.
- Test both task-executor modes: WebMCP native dispatch and page fallback. Only the five task tools are registered; `request_user_input` always executes locally. Native transport failures are not replayed.

### 12.3 Browser tests and real-model evaluation

- Render radio, checkbox, and text questions with initial empty state. Exercise custom/choice switching, explicit skip/undo, multi-question submit, inline errors, and final answer summaries.
- Verify keyboard-only operation, textarea Enter, IME composition handling, visible focus, arrival/settlement announcements, and focus recovery after replacing the card.
- Stop/Cancel request during waiting must return control, leave a Cancelled card, and prevent all later writes from that run. Close/reopen must preserve the draft without answering.
- Exercise mobile panel layout, the hidden-panel Answer needed indicator, long labels, HTML-like input rendered as text, reload while waiting, and a task edited while a question is open.
- Re-run existing manual task, persistence, concurrency, task intent plumbing, cancellation, and WebMCP tests.

From `docs/`, install test dependencies if needed with `npm ci`, then run `npm test` and `npm run test:browser` in an environment with the configured Chrome available. Scripted sessions prove control flow, not model quality. Separately evaluate a compatible installed Chrome model with: ambiguous book completion, a 200+ character task title, a custom correction, a skipped optional field, and clear requests that must not cause unnecessary questions. Check the model follows the structured tool route, maps option IDs correctly, and continues after the human answer. Record browser/model availability and outcomes; do not label scripted results as real inference.

Acceptance requires the full question-to-answer-to-continuation path, deterministic cancellation, unchanged existing task persistence, and no framework/runtime-dependency additions.

## 13. Browser API references

This specification defines the application protocol in full; implementing it does not require consulting another application's source. These official references document the browser interface used underneath it:

- [Chrome Prompt API](https://developer.chrome.com/docs/ai/prompt-api): text sessions, `LanguageModel.availability()`, `LanguageModel.create()`, `prompt()`, AbortSignal support, and session destruction. Keep availability and creation options aligned and retain button-initiated model creation.
- [Structured output](https://developer.chrome.com/docs/ai/structured-output-for-prompt-api): `responseConstraint` accepts a JSON Schema. Runtime and semantic validation remain application responsibilities.
- [Session management](https://developer.chrome.com/docs/ai/session-management): continuing and managing a model conversation. This feature reuses the existing session and failure policy.

API documentation was checked on 2026-10-28. Detect actual browser capabilities at runtime as the current app already does. This design does not assume that the proposed native Prompt API `tools` option or tool-message constructors are available.
