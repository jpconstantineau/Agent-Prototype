# Reusable workflows and bounded structured processing

Status: approved design, not implemented. Consolidated by shared purpose on 2026-10-28; feature contracts and opt-in boundaries remain in force.

## Purpose

Turn repeated user intent into inspectable, resumable browser workflows without arbitrary script execution. Parameter templates, typed pipelines, isolated model transformations, and declarative read composition form distinct building blocks of the same bounded automation use case.

## User intent

Prepare reusable requests, inspect frozen parameters and grants, start or schedule an instance, and resume durable human checkpoints while seeing exactly which steps ran.

## Agent intent

Invoke approved pipeline instances or registered processors and compose only permitted reads where enabled. The agent cannot generate executable code, rewrite workflow definitions, approve checkpoints, recursively orchestrate helpers, or obtain tools inside an isolated processor.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [Workflow templates](#feature-workflow-templates) | Human and instance builder | Own parameterized request definitions and frozen invocation values. |
| [Workflow pipelines](#feature-workflow-pipelines) | Human; bounded interpreter | Own typed step sequencing, durable gates, receipts, and continuation. |
| [Structured processing](#feature-structured-processing) | Registered helper; agent/workflow invokes | Own isolated schema-constrained transformations with no tool executor. |
| [App read composition](#feature-app-composition) | Agent; declarative interpreter | Combine registered bounded reads and deterministic projections without inference. |

## Integration and delivery

A template creates a frozen request/instance; a pipeline interprets an approved typed sequence. Processing is a tool-free inference step returning validated data; composition is deterministic registered-read logic. These are not four alternate scripting engines or duplicate workflow stores.

Share invocation identity, validated bindings, source grants, and receipts while retaining each closed input/result schema. Every inner tool still passes current capability, phase, and exact-call permission checks. Human input/review gates use the original broker and richer forms without treating Submit as hidden mutation approval.

Implement templates and deterministic binding validation first, then processors/composition, then durable pipelines after queue and checkpoint services. Count failures, corrections, and provider fallback in the stated aggregate budgets; a persisted checkpoint or resumed instance never resets them.

<a id="feature-workflow-templates"></a>

## Workflow templates

Status: approved specification. A user-facing task launcher reusing [agent configurations](agent-configuration.md#feature-agent-library), [skills](skill-library.md#feature-skills), [structured forms](interactive-experiences.md#feature-structured-input-extension), [context references](conversation-lifecycle.md#feature-context-references), and [scheduling](time-and-reminders.md#feature-scheduled-work). It is not an executable script/plugin format.

<a id="feature-workflow-templates-purpose"></a>

### Purpose

Package a recurring request, agent configuration, selected skills, source references, and typed parameters for consistent reuse. Frozen instances make one-off and scheduled runs reproducible without turning templates into scripts or permission grants.

<a id="feature-workflow-templates-user-intent"></a>

### User intent

Create and choose a template, fill its parameters, review the resolved configuration and resources, and explicitly start it once or schedule it.

<a id="feature-workflow-templates-agent-intent"></a>

### Agent intent

The agent may list eligible templates through the optional read-only workflow_list tool and execute the bounded request after the human starts it. It cannot press Start, create schedule authority, or choose a more permissive configuration through a template.

<a id="feature-workflow-templates-template-and-instance-contracts"></a>

### Template and instance contracts

The approved [pipeline extension](workflows-and-processing.md#feature-workflow-pipelines) adds closed template field execution, default `{kind:'agent_request'}` on migration, or `{kind:'pipeline',pipelineId,pipelineRevision}`. For pipeline mode require an accessible exact definition and a parameter set whose answer object validates its inputSchema directly using identical parameter IDs; no expression/interpolation adapter is added. skillRefs must be empty because pipeline processors do not load arbitrary skill instructions; contextRefs become explicit prepared source grants. instruction remains human-visible task description, not a second agent run. Human Prepare/Start uses the pipeline preview and exact grant selection, then creates the pipeline run instead of starting a general agent loop. Parameters/references/configuration remain frozen in the instance. Scheduled instances need the normal explicit schedule grant and hold at human checkpoints; neither templates nor schedules auto-approve review/input steps.

A workflow is a repeatable request, distinct from an agent's general identity. Store templateId, owner, revision, title 1–120, description 0–400, instruction 1–2000, agentId/configurationRevision, projectId:ID|null, skillRefs 0–3 of `{skillId,revision}`, contextRefs 0–5 using the context-reference contract, and parameters 0–8. All references use exact revisions; missing/disabled resources fail preparation instead of being silently skipped. No template grants permissions or installs capabilities.

Each parameter is `{id:LocalID,label:1–120,help:0–240,required:boolean,input}` with input using text/textarea/number/date/time/select/multiselect/checkbox from the rich-input extension. Validate IDs/options/cardinality with that contract. Parameters are values, not JavaScript expressions or commands. Store instruction and the typed parameter object separately; do not interpolate values into executable strings, URLs, selectors, or JSON source. A template can describe how parameter values should be used but cannot supply a hidden tool call or a tool permission override.

Human Save accepts `{templateId?,expectedRevision?,body}`; ID/revision are both present for an update and absent for create. Domain validation returns `{templateId,revision,status:'saved'}`. A run preparation accepts `{templateId,expectedRevision,answers,mode:'once'|'schedule'}`. answers follows the form extension's typed field answer variants and <=4000 serialized characters. Preparing returns `{instanceId,revision,status:'ready',reviewPacket}`. ReviewPacket shows exact agent/project/configuration, requested instruction, typed values, skill/resource revisions, and effective capabilities/permissions. It does not execute inference or create a schedule yet.

```json
{"templateId":"template-1","expectedRevision":2,"answers":[{"fieldId":"period","kind":"choice","optionIds":["this_week"]}],"mode":"once"}
```

Human Start accepts `{instanceId,expectedRevision}` and commits one immutable instance plus a queued run/thread reference. Schedule mode additionally requires a normal validated schedule object and explicit schedule grant selection. Use an application-generated instance/start operation ID to prevent double clicks creating two runs/jobs. The agent cannot click Start or choose a more permissive agent. An optional agent tool `workflow_list` requires `{version:1,query?:0–120,cursor?,limit?:1–10}` and returns templateId/revision/title/description only for eligible project-scoped templates; this read does not prepare or start them. No agent-facing workflow execution tool in v1.

<a id="feature-workflow-templates-ui-and-execution"></a>

### UI and execution

The workflow library offers Search, New, Duplicate, Edit, Run once, Schedule, and Archive. The editor uses native controls for instruction, agent/project and skill/resource pickers, and parameter definitions; no code editor is required. Starting renders the parameter form, then the concrete review packet and Start/Cancel. If a template selects another project, open a new conversation bound to it after human review rather than changing the current active thread silently.

Start creates the usual bounded request packet: `{kind:'workflow_request',instanceId,instruction,parameters,referenceManifest}`. It uses the same loop, schemas, permissions, operation receipts, context checks, and logs as ordinary chat. Source material is data; only allowed approved skill bodies have guidance status. Required skills must fit the active skill/context budget or preparation fails with a shortening/selection action. Do not temporarily enable disabled skills to satisfy a template.

Schedules save the template instance's exact configuration/resource references and typed parameter values. Because schedule prompt is limited to 2000 characters, store only a bounded application-authored request plus instance ID in that field; the trusted scheduler resolves the immutable instance and verifies its grants. This is an explicitly recognized application request type, not an instruction to follow arbitrary IDs from a model string. On occurrence, recheck ownership, project, current hard policy, and referenced availability. Changed/deleted/unavailable required resources hold needs_attention; never substitute latest versions automatically. All page-open and missed-run limits remain in force.

The workflowInstanceId is separate application-owned schedule metadata written only by the validated human launcher. The scheduler resolves that metadata binding, never an ID parsed from a free-form prompt. A model calling schedule_task with look-alike JSON text gains no workflow-instance authority.

<a id="feature-workflow-templates-persistence-and-acceptance"></a>

### Persistence and acceptance

Add workflow-store.js, template validators, and a launcher/editor. IndexedDB separates mutable template heads, immutable revisions, and run instances. Archive hides future selection but does not cancel existing schedules; show and manage those links explicitly. Future sync preserves instance/start IDs and detects conflicting template edits without merging permission choices. Export portable plain-data templates without credentials/handles; imports require human ID mapping and remain inert until reviewed.

Test typed parameters, missing resources, revision mismatch, context budget failure, literal parameter injection, double Start, no implicit scheduling, explicit project/agent selection, disabled skills, and occurrence needs_attention. Verify template runs use the actual configured revisions and cannot escape the same tool checks as typed chat.

---

<a id="feature-workflow-pipelines"></a>

## Workflow pipelines

Status: approved extension; not implemented. Extends [workflow templates](workflows-and-processing.md#feature-workflow-templates), [structured processing](workflows-and-processing.md#feature-structured-processing), [execution permissions](capability-policy.md#feature-execution-permissions), [questions](interactive-experiences.md#feature-structured-input-extension), and [observability](diagnostics.md#feature-observability). A vanilla JavaScript interpreter over validated JSON, without script evaluation.

<a id="feature-workflow-pipelines-purpose"></a>

### Purpose

Execute a known sequence reliably with fewer model orchestration decisions. Durable step receipts and explicit human checkpoints let a small model or the user resume work without repeating completed writes.

<a id="feature-workflow-pipelines-user-intent"></a>

### User intent

Define a reusable sequence, inspect its concrete tools/resources, supply parameters, start it, review intermediate drafts, and resume or cancel it. Know which steps committed and why a later step is waiting.

<a id="feature-workflow-pipelines-agent-intent"></a>

### Agent intent

Invoke a human-approved enabled pipeline with valid parameters when requested, inspect its status, and consume its final result. The agent cannot author executable workflow code, approve its own checkpoints, widen grants, or recursively launch pipelines.

<a id="feature-workflow-pipelines-definition-contract"></a>

### Definition contract

Store immutable definitions `{version:1,pipelineId,revision,name,description,inputSchema,steps,output}` under the current owner/project. name 1–120; description 0–400; inputSchema uses the bounded subset in structured-processing. At most eight steps with unique LocalID IDs, strictly ordered, no cycles/branches/loops/parallel execution in v1. Definition serialized size <=24000 characters. output is one binding described below; final materialized data <=6000 characters or an existing large-result reference with exact control facts.

Steps are a closed tagged union:

| kind | Other required fields |
| --- | --- |
| tool | id, toolName:known exact name, definitionRevision, arguments:binding tree |
| process | id, processorId, processorRevision, input:binding tree |
| review | id, title:1–120, instruction:1–500, value:binding tree |
| input | id, form:the rich-input extension's validated native-control form definition |

Bindings are finite JSON trees whose leaves are `{literal:value}`, `{parameter:path}`, or `{step:earlierStepId,path}`. path is 0–6 safe property names/array indices using result_select's rules; reject prototype names. literal is bounded finite JSON <=4000 serialized characters. Objects/arrays that assemble a tool argument are explicitly `{object:{field:binding,...}}` / `{array:[binding,...]}` with <=30 members and depth <=6. Reject ambiguous objects, missing fields/paths, forward references, executable strings, expressions, selectors, arbitrary URLs, dynamic tool names, and a value that cannot satisfy the target tool schema. Do not interpolate JSON into JavaScript or HTML.

The following is one tool step; it reads a parameter value without executable interpolation:

```json
{"kind":"tool","id":"find","toolName":"search_items","definitionRevision":1,"arguments":{"object":{"query":{"parameter":["query"]},"limit":{"literal":5}}}}
```

Tool-step allowlist is reviewed application code: ordinary granted task/document reads/writes and bounded result reads. Exclude pipeline/goal/schedule/board dispatch, delegation, discovery, skill/config changes, diagnostics, guidance, arbitrary computation, external MCP, and interaction tools. Questions/approval/input use their explicit pipeline step/broker path, never nested tool waits. Every process step uses a saved approved processor revision; each review/input step halts rather than holding a live promise across reload.

<a id="feature-workflow-pipelines-definition-grants-and-invocation"></a>

### Definition, grants, and invocation

Add extensions.pipelines `{enabled:boolean}` default false. Human Create/Save services use `{body}` / `{pipelineId,expectedRevision,body}` and return canonical ID/revision. Preview resolves schemas, required tools/processors, effect classifications, resource references, context costs, and unresolved mappings without inference or execution. Imports validate every step and leave unknown tools/routes unavailable; no plugin installation.

Human Start takes `{pipelineId,pipelineRevision,parameters,resourceRefs,grantSelection}`. Review the full definition, expected effects, selected agent/configuration/project, resources, and actual grant ceiling before Start. Agent pipeline_run takes `{version:1,pipelineId,pipelineRevision,parameters}` only, resolves resources/grants from an already human-approved thread binding, and requires an explicit current request to run it. It cannot invent grantSelection or choose a different agent. Agent start without a prepared grant binding returns permission_denied with a Setup action.

pipeline_run success is `{success:true,version:1,pipelineRunId,status:'queued'}`. The parent run ends awaiting_user with a deterministic pipeline card; it does not poll or launch another worker while the pipeline owns execution. The controller can execute automatically authorized steps after this admission under the explicit run grant, with human gates below. A later completed result is displayed; resuming a parent agent is an explicit Continue action. pipeline_status requires version/pipelineRunId, returns `{success:true,version:1,pipelineRunId,revision,status,currentStepId,completedStepIds,resultRef}`; lists <=8, IDs/null as appropriate. It reads only a run already granted to that thread and cannot consume inference through polling. There is no agent resume/approve tool in v1.

<a id="feature-workflow-pipelines-durable-execution-and-budgets"></a>

### Durable execution and budgets

Store a run `{version:1,pipelineRunId,revision,definitionSnapshot,configurationSnapshot,parameters,resourceGrants,status,nextStepIndex,createdAt,updatedAt,usedInferenceCalls,stepReceipts}`. status queued/running/awaiting_review/awaiting_input/awaiting_permission/completed/failed/interrupted/cancelled; index 0–8. Step records identify exact definition/input source revisions, materialized arguments, operationId, state pending/running/committed/failed/uncertain/skipped, output body reference, actual effect receipt, and timing. Receipts append once under `(pipelineRunId,stepId,attemptId)`; parameters and previous output bodies are immutable for that attempt.

One active pipeline per thread and one inference at a time through the shared scheduler. Maximum eight steps, eight tool executions, and 12 total attempted model calls per pipeline invocation, including its originating pipeline_run model call, process corrections/fallbacks, and any expressly attributable helpers. Process steps have their two-call ceiling as well. Human input/review waits consume no calls. The pipeline has no general agent loop and no hidden summarizer. Insufficient budget holds failed/needs attention with completed receipts intact; Resume cannot silently reset it. A human can explicitly start a new reviewed attempt/window, preserving lifetime history and reconciling prior effects.

Before each step resolve bindings from exact earlier committed output, validate against the captured current tool schema, and intersect saved grants with current policy/role/resource access. Definition changes or current schema incompatibility hold; never adapt to a different tool/version silently. Permission gating uses the same exact-call service. An automatic permission level cannot skip a pipeline review step. Ordinary tool approval and a review step serve distinct purposes: review approves the shown data/draft, while each subsequent effect still validates its exact operation and grants. When possible the review UI can show the subsequent exact action, but its receipt must bind that action explicitly to count as execution approval.

Commit domain effects and idempotent operation receipts through their normal services. After a crash, reconcile the running step's operation ID before deciding whether it committed. A verified committed step advances without executing again. An uncertain external outcome holds for human recovery; no automatic retry. A definite read failure may retry once by an explicit human Retry command under the same total budget. Completed earlier writes are not rolled back by a later failure; link the existing undo/history services for deliberate reversal.

<a id="feature-workflow-pipelines-human-checkpoints-and-continuation"></a>

### Human checkpoints and continuation

A review step materializes value and persists `{checkpointId,pipelineRunId,stepId,revision,sourceIdentities,title,instruction,valueRef,state}` before showing it. Human decision `{checkpointId,expectedRevision,decision:'approve'|'reject'}` returns accepted state/receipt. Approve records review completion; reject cancels remaining steps. No editable hidden replacement value is accepted. To revise a draft, create a new explicit data/processor step or new attempt with a visible version; the approval of an earlier draft cannot apply to the new one.

An input step uses the richer question schema and typed answer validator, but stores a durable checkpoint with exact form/answer revisions. It terminates its pipeline execution slice in awaiting_input; it does not reuse the original question tool's in-memory promise or alter its wire contract. Human Submit answers through the shared interaction slot, persists them, and permits the next pipeline slice. Unrelated chat text never answers a checkpoint. Only one active blocking interaction per thread; a second pipeline cannot replace it.

Resume `{pipelineRunId,expectedRevision}` is a direct human service after interruption or a resolved gate. Recheck saved definition/bindings/current grants and settle prior effects before moving to nextStepIndex. Changing parameters requires a new reviewed attempt; completed outputs cannot be rewritten in place. Stop/Cancel abort active inference and stop future steps, preserving real completed effects. A pending user steer holds at the next pipeline step boundary and offers Cancel/revise pipeline; it cannot silently rewrite a saved typed sequence through prose.

<a id="feature-workflow-pipelines-ui-persistence-and-integration"></a>

### UI, persistence, and integration

Use a native ordered step editor with Add step, known tool/processor selectors, parameter/output-path mappings, validation errors, Preview, Save, and Start. Run view shows each step's exact tool/processor, input/output references, committed/pending/uncertain state, human checkpoint, Retry/Resume/Cancel, and partial effects. Use safe JSON/text/Markdown views, not model-authored controls. Do not claim the entire pipeline succeeded when only a queued start or review completed.

Use pipeline-contract.js, pipeline-runner.js, and IndexedDB stores for definitions, runs, checkpoints, and receipts. Emit control.changed feature pipeline plus actual tool/processing/interaction events, with source step IDs in immutable payloads. A workflow template may reference an exact pipeline revision as an alternative execution kind; the existing request template stays unchanged. Scheduled pipeline execution needs its own explicitly reviewed normal schedule grants and holds needs_attention at a human gate; schedules never auto-answer forms. Goals may link a pipeline result but cannot override its pauses or counters. v1 subagents cannot invoke pipelines.

Reload offers explicit Resume from the first unsettled step and never auto-applies a review. Runs are open-page only. Future sync transports definitions, checkpoints, source revisions, receipts, and tombstones; one designated execution device is required until authoritative server claims exist. A copied resume identifier alone is not ownership or permission.

<a id="feature-workflow-pipelines-acceptance"></a>

### Acceptance

Verify schema/binding validation, missing/forward/prototype paths, exact tool versions, partial failure, approval/input gates across reload, stale decisions, current-policy revocation, double clicks, uncertain effect reconciliation, Stop, quota errors, processor fallback counts, and no recursive pipelines. An end-to-end sample must read -> process -> review -> save, then reload after save and prove the save is not repeated.

Source inspiration: [OpenClaw Lobster](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/lobster.md). No Lobster DSL, CLI, runtime package, or Node dependency is required.

---

<a id="feature-structured-processing"></a>

## Structured processing

Status: approved design; not implemented. Extends [subagents](agent-coordination.md#feature-subagents), [workflows](workflows-and-processing.md#feature-workflow-templates), and the [inference adapter](local-model-endpoint.md). Uses the Chrome responseConstraint JSON Schema interface and local validation. No SDK or native model tool execution is required.

<a id="feature-structured-processing-purpose"></a>

### Purpose

Make focused extraction, classification, and transformation return bounded validated data that a workflow can reliably consume. Isolation avoids sending the main conversation or mutation tools to a helper that only needs a small input and result schema.

<a id="feature-structured-processing-user-intent"></a>

### User intent

Define or select a reusable transformation, inspect its input/output contract, test it deliberately, and review the result before any domain changes use it.

<a id="feature-structured-processing-agent-intent"></a>

### Agent intent

Call an enabled transformation with permitted input and consume its typed result. The helper produces data only; it cannot invoke tools, save tasks, change permissions, load skills, or continue the caller's broader assignment.

<a id="feature-structured-processing-definition-and-schema-contract"></a>

### Definition and schema contract

Store versioned owner-scoped definitions `{version:1,processorId,revision,name,description,instruction,inputSchema,outputSchema,maxInputChars,maxOutputChars}`. name 1–80, description 0–400, instruction 1–2000, maxInputChars integer 100–12000 default 4000, maxOutputChars integer 100–6000 default 2000. Definitions and imports are human-managed; the model selects an existing ID/revision and cannot submit executable schema code or pick an endpoint.

Both schemas use this closed bounded subset: object with properties/required/additionalProperties:false; array with items/minItems/maxItems <=50; string with minLength/maxLength <=12000 and optional literal enum of <=20 strings; integer/number with finite minimum/maximum; boolean; null; or anyOf of <=4 such branches. Require maxLength/maxItems on every variable-size branch, depth <=6, <=60 total property nodes, serialized schema <=8000 characters each. Reject $ref, recursive schemas, formats, patterns, external URLs, defaults, prototype-sensitive property names, and unknown keywords. Every object property is required; nullable fields represent missing values. Use one tested compiler/validator for browser and HTTP response dialects, enforcing enums and finite numbers locally. Data strings never become schema or prompt source.

The baseline docs/src/schema.js validator does not implement array, number, or null validation. Extend the shared validator before exposing this subset; unknown types/keywords must fail closed rather than pass by falling through. Validate arrays recursively with cardinality, numbers with finite bounds, null by exact equality, and safe integer requirements where domain IDs/counters require them. Provider-constrained output does not replace local validation. The schema-editor import validator and runtime value validator are separate responsibilities; accepting a schema shape is not proof a generated value satisfies it.

Example outputSchema:

```json
{"type":"object","properties":{"title":{"type":"string","maxLength":200},"dueDate":{"anyOf":[{"type":"string","maxLength":10},{"type":"null"}]},"priority":{"type":"string","enum":["low","normal","high"],"maxLength":6}},"required":["title","dueDate","priority"],"additionalProperties":false}
```

Format correctness such as an actual calendar date is a domain validation after structural validation. A valid object alone does not prove factual extraction accuracy or authorize adding it to Daylist.

Settings extensions.processing `{enabled:boolean,modelRouteId:ID|null}` default false/null. Null inherits the applicable role route. A human may choose a stronger approved local route; profiles/secrets stay in device Settings. The configured route and both schemas are pinned for an operation. Imported unresolved routes remain unavailable until mapped. Enabled does not override processor-specific access, tool policy, or resource grants.

<a id="feature-structured-processing-model-tool-and-direct-ui-services"></a>

### Model tool and direct UI services

structured_process input is closed `{version:1,processorId,processorRevision,input,sourceRefs}`. input is finite JSON matching inputSchema and serializing within maxInputChars; sourceRefs are 0–10 shared accessible evidence references. The host verifies source availability and permission but cannot prove arbitrary supplied text was faithfully extracted from it; citations refer to provenance, not correctness. Tool access does not grant arbitrary document reads. Input referenced only by prose is not fetched automatically.

```json
{"type":"tool_call","name":"structured_process","arguments":{"version":1,"processorId":"processor-task-fields","processorRevision":1,"input":{"text":"Prepare the quarterly review next Monday."},"sourceRefs":[{"kind":"message","id":"message-1","revision":1}]}}
```

Success is `{success:true,version:1,processingId,processorId,processorRevision,output,sourceRefs,provider,modelIdentity,attempts}`. output matches the exact outputSchema and output limit; provider chrome/local_http, modelIdentity string <=200 or null; attempts integer 1–2 including failed/correction attempts. Return actual used provider, never infer it from persona/name. Failure uses the shared envelope and keeps processingId in the supporting call receipt/diagnostic reference. Do not return a partially valid object as success.

Human Create/Save take `{body}` or `{processorId,expectedRevision,body}` and return ID/revision; Test takes processorId/revision/input/sourceRefs and uses the same inference/permissions/validation path under a separately visible test allowance. Preview displays schema and instruction without inference. Definition edits affect new operations; a running operation pins its revision. Delete/archive prevents new selection while retained operations preserve immutable references. No per-call model-supplied instruction/schema/provider overrides in v1.

<a id="feature-structured-processing-isolation-and-chrome-mapping"></a>

### Isolation and Chrome mapping

Prepare a fresh inference context with the application contract, approved processor instruction, explicit JSON data input, and source labels. Do not clone the parent conversation, inject unrelated memory/persona/skills, include an executor, register WebMCP tools, or interpret an output field as a tool call. The helper's only output is outputSchema. Use LanguageModel.create with detected text capabilities, then prompt(inputPacket,{responseConstraint:outputSchema,signal}) through the adapter. With HTTP, use the same exact schema via the supported response_format adapter. responseSchema for the parent agent still contains structured_process as one ordinary tool branch.

The provider interface therefore accepts an approved caller-selected response schema; the name agent_action in the original HTTP example becomes processor_output for this operation. This is a controller-owned schema, not an arbitrary server tool plugin. A rejected dialect fails or follows the existing safe fallback policy; no unconstrained text downgrade. Permit one bounded corrective generation after invalid JSON/schema output, with error paths only and no new data reads. Maximum two attempted helper calls, including fallback. Both count against the parent's child/helper aggregate of 12 and, if bound, goal/pipeline totals; the parent's invocation also consumes its ordinary main iteration. A child may invoke only with explicit grant, no nested delegation, and enough remaining child/helper budget. Never create an extra hidden allowance through retries.

If the input exceeds the chosen context budget, return budget_exceeded and offer a smaller explicit chunk or a human-selected larger route. No silent input truncation. All helper calls run through the shared scheduler, are cancellable with the parent, and are logged with exact supplied schemas/input and returned output. Saving the output is an explicit normal domain action under its own permissions.

<a id="feature-structured-processing-ui-persistence-and-verification"></a>

### UI, persistence, and verification

The transformation editor uses native name/instruction text fields, a bounded schema form or JSON textarea with error paths, input/output size settings, route selection, Preview, and Test. The processing card shows name/revision, actual provider, running/valid/invalid/cancelled state, source references, and escaped pretty JSON. A Save as document action uses the existing document service after a human click. It never auto-creates tasks from extracted fields.

Use processor-store.js, processor-contract.js, and processing-controller.js; retain immutable definitions/results plus operation IDs in IndexedDB. Full stored outputs follow large-result retention; compact control receipts remain available. Future sync validates definition ownership/revisions and maps device routes explicitly. On reload interrupted processing is held; Test/Retry is a deliberate new operation, not replay of a dependent mutation.

Verify schema-depth/size rejection, unsupported keywords, finite JSON, source access, exact output validation, date-domain validation, tool-bearing malicious output treated as data, correction/fallback aggregate accounting, route isolation, Stop, stale definition edits, and no parent transcript/secret leakage. Real-model tests evaluate extraction quality separately from deterministic schema correctness.

Source inspiration: [OpenClaw LLM task](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/llm-task.md); implementation uses only the browser application's adapters.

---

<a id="feature-app-composition"></a>

## App read composition

Status: approved for interaction with the app. Uses [runtime contracts](runtime-contracts.md), [discovery](capability-policy.md#feature-tool-discovery), [capability policy](capability-policy.md#feature-capability-controls), and [subagents](agent-coordination.md#feature-subagents). Inspired by OpenCode CodeMode; version 1 deliberately accepts a small declarative program rather than arbitrary JavaScript source.

<a id="feature-app-composition-purpose"></a>

### Purpose

Compute reliable filters, projections, and grouped counts without sending every intermediate record to the model. A bounded declarative program keeps app computation small, inspectable, and subject to the existing read permissions.

<a id="feature-app-composition-user-intent"></a>

### User intent

The user does not author or invoke composition programs through a dedicated UI in this spec. They request an analysis, inspect the resulting calls and coverage, and can stop the run.

<a id="feature-app-composition-agent-intent"></a>

### Agent intent

Use app_execute to combine permitted reads and deterministic transformations, then return only the useful result. The agent must preserve pagination limits and cannot use composition for writes or arbitrary JavaScript.

<a id="feature-app-composition-purpose-and-authority"></a>

### Purpose and authority

Expose agent-facing `app_execute` to read app data, filter/group it, and return a compact answer without copying every intermediate record into model context. The user sees its actual tool calls and final data summary and can cancel through Stop. This is not DOM automation, browser-console access, a plugin loader, or permission to use arbitrary scripts. It works through the same validated app-tool services as normal calls.

Version 1 permits read-only calls and pure transformations. Writes still use normal single tools or reviewed proposal batches and their receipts. The restriction is intentional: a compact aggregation cannot hide a sequence of task/document changes behind one apparent read operation. Main/child profiles and document/thread access scopes still apply.

<a id="feature-app-composition-program-contract"></a>

### Program contract

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

<a id="feature-app-composition-execution-and-result"></a>

### Execution and result

Validate the whole graph and literal call inputs before starting. Check each tool is currently admitted to the caller's catalog and classified read-only; reject interactions/maintenance/external connectors, app_execute recursion, child delegation, and skill loading inside a program. Preflight does not replace authorization on each call. A tool response with success:false stops the program and is recorded as a failed call; it is not ordinary task data passed to later transforms. Later policy revocation stops remaining steps. No silent native-to-local retry occurs on transport errors.

Run steps sequentially through a small JavaScript reducer. Pure transformations may run in a Worker with copies; all external calls are host messages resolved by the controller, which alone holds service references. No unrestricted code generation is necessary. Enforce five seconds elapsed time, ten host calls, 10000 input records, 1 MiB intermediate serialized data, depth 16, and 6000 result characters per execution. Yield between chunks so Stop remains responsive. Time limits do not promise that a browser can preempt arbitrary native work; no arbitrary work is admitted.

[Execution permissions](capability-policy.md#feature-execution-permissions) apply to each host read. If approval waiting is supported, exclude human wait from the five-second active-execution limit and use the shared interaction slot; otherwise reject approval-requiring compositions during preflight, before any step. [Result retrieval tools](context-management.md#feature-large-tool-results) may be composed as ordinary bounded reads. Record each nested call with parentCallId in [observability](diagnostics.md#feature-observability); compacting the model observation never hides the executed calls from the human inspector.

Result: `{success:true,version:1,executionId,value,coverage,toolCalls}`. value is bounded plain JSON. coverage is an array up to ten `{stepId,complete:boolean,nextCursor? or nextOffset?}` reflecting source pagination; do not return both cursor and offset. toolCalls contains exact stepId/tool/status (`completed`, `failed`, `cancelled`) without repeating unbounded outputs. On expected failure return the common error plus executionId and admitted-call receipts. Abort rejects, preserving partial read receipts for human inspection. No partial result is labeled a successful complete computation.

<a id="feature-app-composition-ui-descriptions-and-integration"></a>

### UI, descriptions, and integration

Render an expandable composition card: requested operations, actual read calls, coverage warning, elapsed time, final bounded value/error. A compact answer may be charted separately with html_render; it cannot invoke that tool implicitly. The model description says: “Compose permitted app reads and bounded transformations. Return only useful summary data. No arbitrary JavaScript or writes. Inspect coverage; a page count is not a full-dataset count.”

Add `app-composition.js`, graph/step validators, and optional Worker transformer. Route host calls through the current executor with original run/actor scope; record each call for audit and resource accounting. This one model action consumes one inference iteration, but all inner host calls count against a separate enforced call budget. If a subagent is permitted app_execute, its constituent calls must also be permitted under that child's profile and grants.

Test graph validation, scalar comparison semantics, page coverage, malicious property names, prohibited tools/recursion, budget/Stop handling, and no changes to app state. Script a bounded aggregation and verify intermediate task records do not enter the model observation. A future JavaScript-like interpreter would require a separately reviewed language/runtime spec; do not implement this v1 contract with new Function or iframe eval.
