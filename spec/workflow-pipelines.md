# Resumable typed workflow pipelines

Status: approved extension; not implemented. Extends [workflow templates](workflow-templates.md), [structured processing](structured-processing.md), [execution permissions](execution-permissions.md), [questions](structured-input-extension.md), and [observability](observability.md). A vanilla JavaScript interpreter over validated JSON, without script evaluation.

## Purpose

Execute a known sequence reliably with fewer model orchestration decisions. Durable step receipts and explicit human checkpoints let a small model or the user resume work without repeating completed writes.

## User intent

Define a reusable sequence, inspect its concrete tools/resources, supply parameters, start it, review intermediate drafts, and resume or cancel it. Know which steps committed and why a later step is waiting.

## Agent intent

Invoke a human-approved enabled pipeline with valid parameters when requested, inspect its status, and consume its final result. The agent cannot author executable workflow code, approve its own checkpoints, widen grants, or recursively launch pipelines.

## Definition contract

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

## Definition, grants, and invocation

Add extensions.pipelines `{enabled:boolean}` default false. Human Create/Save services use `{body}` / `{pipelineId,expectedRevision,body}` and return canonical ID/revision. Preview resolves schemas, required tools/processors, effect classifications, resource references, context costs, and unresolved mappings without inference or execution. Imports validate every step and leave unknown tools/routes unavailable; no plugin installation.

Human Start takes `{pipelineId,pipelineRevision,parameters,resourceRefs,grantSelection}`. Review the full definition, expected effects, selected agent/configuration/project, resources, and actual grant ceiling before Start. Agent pipeline_run takes `{version:1,pipelineId,pipelineRevision,parameters}` only, resolves resources/grants from an already human-approved thread binding, and requires an explicit current request to run it. It cannot invent grantSelection or choose a different agent. Agent start without a prepared grant binding returns permission_denied with a Setup action.

pipeline_run success is `{success:true,version:1,pipelineRunId,status:'queued'}`. The parent run ends awaiting_user with a deterministic pipeline card; it does not poll or launch another worker while the pipeline owns execution. The controller can execute automatically authorized steps after this admission under the explicit run grant, with human gates below. A later completed result is displayed; resuming a parent agent is an explicit Continue action. pipeline_status requires version/pipelineRunId, returns `{success:true,version:1,pipelineRunId,revision,status,currentStepId,completedStepIds,resultRef}`; lists <=8, IDs/null as appropriate. It reads only a run already granted to that thread and cannot consume inference through polling. There is no agent resume/approve tool in v1.

## Durable execution and budgets

Store a run `{version:1,pipelineRunId,revision,definitionSnapshot,configurationSnapshot,parameters,resourceGrants,status,nextStepIndex,createdAt,updatedAt,usedInferenceCalls,stepReceipts}`. status queued/running/awaiting_review/awaiting_input/awaiting_permission/completed/failed/interrupted/cancelled; index 0–8. Step records identify exact definition/input source revisions, materialized arguments, operationId, state pending/running/committed/failed/uncertain/skipped, output body reference, actual effect receipt, and timing. Receipts append once under `(pipelineRunId,stepId,attemptId)`; parameters and previous output bodies are immutable for that attempt.

One active pipeline per thread and one inference at a time through the shared scheduler. Maximum eight steps, eight tool executions, and 12 total attempted model calls per pipeline invocation, including its originating pipeline_run model call, process corrections/fallbacks, and any expressly attributable helpers. Process steps have their two-call ceiling as well. Human input/review waits consume no calls. The pipeline has no general agent loop and no hidden summarizer. Insufficient budget holds failed/needs attention with completed receipts intact; Resume cannot silently reset it. A human can explicitly start a new reviewed attempt/window, preserving lifetime history and reconciling prior effects.

Before each step resolve bindings from exact earlier committed output, validate against the captured current tool schema, and intersect saved grants with current policy/role/resource access. Definition changes or current schema incompatibility hold; never adapt to a different tool/version silently. Permission gating uses the same exact-call service. An automatic permission level cannot skip a pipeline review step. Ordinary tool approval and a review step serve distinct purposes: review approves the shown data/draft, while each subsequent effect still validates its exact operation and grants. When possible the review UI can show the subsequent exact action, but its receipt must bind that action explicitly to count as execution approval.

Commit domain effects and idempotent operation receipts through their normal services. After a crash, reconcile the running step's operation ID before deciding whether it committed. A verified committed step advances without executing again. An uncertain external outcome holds for human recovery; no automatic retry. A definite read failure may retry once by an explicit human Retry command under the same total budget. Completed earlier writes are not rolled back by a later failure; link the existing undo/history services for deliberate reversal.

## Human checkpoints and continuation

A review step materializes value and persists `{checkpointId,pipelineRunId,stepId,revision,sourceIdentities,title,instruction,valueRef,state}` before showing it. Human decision `{checkpointId,expectedRevision,decision:'approve'|'reject'}` returns accepted state/receipt. Approve records review completion; reject cancels remaining steps. No editable hidden replacement value is accepted. To revise a draft, create a new explicit data/processor step or new attempt with a visible version; the approval of an earlier draft cannot apply to the new one.

An input step uses the richer question schema and typed answer validator, but stores a durable checkpoint with exact form/answer revisions. It terminates its pipeline execution slice in awaiting_input; it does not reuse the original question tool's in-memory promise or alter its wire contract. Human Submit answers through the shared interaction slot, persists them, and permits the next pipeline slice. Unrelated chat text never answers a checkpoint. Only one active blocking interaction per thread; a second pipeline cannot replace it.

Resume `{pipelineRunId,expectedRevision}` is a direct human service after interruption or a resolved gate. Recheck saved definition/bindings/current grants and settle prior effects before moving to nextStepIndex. Changing parameters requires a new reviewed attempt; completed outputs cannot be rewritten in place. Stop/Cancel abort active inference and stop future steps, preserving real completed effects. A pending user steer holds at the next pipeline step boundary and offers Cancel/revise pipeline; it cannot silently rewrite a saved typed sequence through prose.

## UI, persistence, and integration

Use a native ordered step editor with Add step, known tool/processor selectors, parameter/output-path mappings, validation errors, Preview, Save, and Start. Run view shows each step's exact tool/processor, input/output references, committed/pending/uncertain state, human checkpoint, Retry/Resume/Cancel, and partial effects. Use safe JSON/text/Markdown views, not model-authored controls. Do not claim the entire pipeline succeeded when only a queued start or review completed.

Use pipeline-contract.js, pipeline-runner.js, and IndexedDB stores for definitions, runs, checkpoints, and receipts. Emit control.changed feature pipeline plus actual tool/processing/interaction events, with source step IDs in immutable payloads. A workflow template may reference an exact pipeline revision as an alternative execution kind; the existing request template stays unchanged. Scheduled pipeline execution needs its own explicitly reviewed normal schedule grants and holds needs_attention at a human gate; schedules never auto-answer forms. Goals may link a pipeline result but cannot override its pauses or counters. v1 subagents cannot invoke pipelines.

Reload offers explicit Resume from the first unsettled step and never auto-applies a review. Runs are open-page only. Future sync transports definitions, checkpoints, source revisions, receipts, and tombstones; one designated execution device is required until authoritative server claims exist. A copied resume identifier alone is not ownership or permission.

## Acceptance

Verify schema/binding validation, missing/forward/prototype paths, exact tool versions, partial failure, approval/input gates across reload, stale decisions, current-policy revocation, double clicks, uncertain effect reconciliation, Stop, quota errors, processor fallback counts, and no recursive pipelines. An end-to-end sample must read -> process -> review -> save, then reload after save and prove the save is not repeated.

Source inspiration: [OpenClaw Lobster](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/lobster.md). No Lobster DSL, CLI, runtime package, or Node dependency is required.
