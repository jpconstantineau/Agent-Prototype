# Structured interactive input: extension to user questions

Status: approved extension. The original [request-user-input.md](request-user-input.md) remains unchanged and implementable independently. This document adds an optional richer agent-facing tool, request_user_form, sharing the original broker lifecycle. Uses [runtime contracts](runtime-contracts.md), [safe Markdown](markdown-rendering.md), and [permission controls](execution-permissions.md).

## Purpose

Extend simple clarification with typed fields and bounded supporting tables or charts. A separate JSON component contract supports richer answers through native controls while preserving the original question protocol.

## User intent

Complete a structured form, inspect its supporting information, correct validation errors, and explicitly submit typed answers or stop.

## Agent intent

Use request_user_form when a richer interaction is needed, then continue with the validated human values. The agent cannot make the form execute app actions or treat its Submit button as approval for hidden changes.

## Intent and relationship to the original

Use request_user_input for ordinary one-to-three-question clarification. Use this extension for typed fields, related settings, a small editable input form, or a guided choice accompanied by a table/chart. The model describes data and registered components in JSON. Vanilla JavaScript renders native DOM controls; there is no OpenUI language, React component dependency, generated JavaScript, or HTML evaluation.

Forms collect answers; they never directly call tools or mutate app records. The agent receives the submitted values, then chooses an independently validated tool call if the user's request authorizes it. A Submit label cannot become an approval for hidden operations. Exact execution approvals and proposed task batches keep their dedicated application-owned review surfaces. For standalone interactive explanations without answers, use the existing isolated html_render tool.

## Model input contract

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

## Human submission and model result

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

## UI, lifecycle, and persistence

Use the original independent inline form outside the chat composer. Place title/description first, then the component tree, validation summary, Submit, and Stop. Render labels/help with safe text nodes; generate DOM IDs locally. Keep table/chart data read-only. Submit is the sole answer action; field changes do not submit, start inference, or call tools. Keyboard navigation, focus on the first invalid field, screen-reader announcements, small-screen scrolling, and a read-only submitted summary are required. Disallow streaming partially parsed controls; mount only a complete validated tool call.

Share the controller's single interaction slot with request_user_input and proposed-plan review. A second blocking interaction fails busy instead of replacing the first. Subagents v1 cannot call either question tool. Waiting consumes no inference steps; on the last permitted step do not open a form that cannot be followed by a continuation. Recheck policy, active generation, IDs, and revision at submission; settle once even with duplicate clicks or Stop races. Clear listeners/drafts on teardown according to explicit retention rules.

Add structured-input-contract.js and a component renderer; extend the broker through a typed adapter rather than changing the original question/answer wire contract. Persist requests/answers in thread events and [observability](observability.md); unsubmitted keystrokes are local drafts, not interaction logs. Eligible/admitted tools remain distinct. This extension starts Disabled and is never registered as an external WebMCP task tool by default.

## Acceptance

Test tree reachability/depth/size, every field mapping and answer variant, zero/false versus missing, real dates, timezone ambiguity, option tampering, budget errors, XSS/prototype names, double submission, Stop, policy revocation, reload, and the shared interaction slot. A scripted session must request a form, receive exact typed answers, and then explicitly call any requested mutation. Verify that submitting the form itself never changes tasks, documents, schedules, or permissions. Run all existing original-question contract tests unchanged.
