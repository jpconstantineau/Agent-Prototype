# Isolated structured AI processing steps

Status: approved design; not implemented. Extends [subagents](subagents.md), [workflows](workflow-templates.md), and the [inference adapter](local-model-endpoint.md). Uses the Chrome responseConstraint JSON Schema interface and local validation. No SDK or native model tool execution is required.

## Purpose

Make focused extraction, classification, and transformation return bounded validated data that a workflow can reliably consume. Isolation avoids sending the main conversation or mutation tools to a helper that only needs a small input and result schema.

## User intent

Define or select a reusable transformation, inspect its input/output contract, test it deliberately, and review the result before any domain changes use it.

## Agent intent

Call an enabled transformation with permitted input and consume its typed result. The helper produces data only; it cannot invoke tools, save tasks, change permissions, load skills, or continue the caller's broader assignment.

## Definition and schema contract

Store versioned owner-scoped definitions `{version:1,processorId,revision,name,description,instruction,inputSchema,outputSchema,maxInputChars,maxOutputChars}`. name 1–80, description 0–400, instruction 1–2000, maxInputChars integer 100–12000 default 4000, maxOutputChars integer 100–6000 default 2000. Definitions and imports are human-managed; the model selects an existing ID/revision and cannot submit executable schema code or pick an endpoint.

Both schemas use this closed bounded subset: object with properties/required/additionalProperties:false; array with items/minItems/maxItems <=50; string with minLength/maxLength <=12000 and optional literal enum of <=20 strings; integer/number with finite minimum/maximum; boolean; null; or anyOf of <=4 such branches. Require maxLength/maxItems on every variable-size branch, depth <=6, <=60 total property nodes, serialized schema <=8000 characters each. Reject $ref, recursive schemas, formats, patterns, external URLs, defaults, prototype-sensitive property names, and unknown keywords. Every object property is required; nullable fields represent missing values. Use one tested compiler/validator for browser and HTTP response dialects, enforcing enums and finite numbers locally. Data strings never become schema or prompt source.

The baseline docs/src/schema.js validator does not implement array, number, or null validation. Extend the shared validator before exposing this subset; unknown types/keywords must fail closed rather than pass by falling through. Validate arrays recursively with cardinality, numbers with finite bounds, null by exact equality, and safe integer requirements where domain IDs/counters require them. Provider-constrained output does not replace local validation. The schema-editor import validator and runtime value validator are separate responsibilities; accepting a schema shape is not proof a generated value satisfies it.

Example outputSchema:

```json
{"type":"object","properties":{"title":{"type":"string","maxLength":200},"dueDate":{"anyOf":[{"type":"string","maxLength":10},{"type":"null"}]},"priority":{"type":"string","enum":["low","normal","high"],"maxLength":6}},"required":["title","dueDate","priority"],"additionalProperties":false}
```

Format correctness such as an actual calendar date is a domain validation after structural validation. A valid object alone does not prove factual extraction accuracy or authorize adding it to Daylist.

Settings extensions.processing `{enabled:boolean,modelRouteId:ID|null}` default false/null. Null inherits the applicable role route. A human may choose a stronger approved local route; profiles/secrets stay in device Settings. The configured route and both schemas are pinned for an operation. Imported unresolved routes remain unavailable until mapped. Enabled does not override processor-specific access, tool policy, or resource grants.

## Model tool and direct UI services

structured_process input is closed `{version:1,processorId,processorRevision,input,sourceRefs}`. input is finite JSON matching inputSchema and serializing within maxInputChars; sourceRefs are 0–10 shared accessible evidence references. The host verifies source availability and permission but cannot prove arbitrary supplied text was faithfully extracted from it; citations refer to provenance, not correctness. Tool access does not grant arbitrary document reads. Input referenced only by prose is not fetched automatically.

```json
{"type":"tool_call","name":"structured_process","arguments":{"version":1,"processorId":"processor-task-fields","processorRevision":1,"input":{"text":"Prepare the quarterly review next Monday."},"sourceRefs":[{"kind":"message","id":"message-1","revision":1}]}}
```

Success is `{success:true,version:1,processingId,processorId,processorRevision,output,sourceRefs,provider,modelIdentity,attempts}`. output matches the exact outputSchema and output limit; provider chrome/local_http, modelIdentity string <=200 or null; attempts integer 1–2 including failed/correction attempts. Return actual used provider, never infer it from persona/name. Failure uses the shared envelope and keeps processingId in the supporting call receipt/diagnostic reference. Do not return a partially valid object as success.

Human Create/Save take `{body}` or `{processorId,expectedRevision,body}` and return ID/revision; Test takes processorId/revision/input/sourceRefs and uses the same inference/permissions/validation path under a separately visible test allowance. Preview displays schema and instruction without inference. Definition edits affect new operations; a running operation pins its revision. Delete/archive prevents new selection while retained operations preserve immutable references. No per-call model-supplied instruction/schema/provider overrides in v1.

## Isolation and Chrome mapping

Prepare a fresh inference context with the application contract, approved processor instruction, explicit JSON data input, and source labels. Do not clone the parent conversation, inject unrelated memory/persona/skills, include an executor, register WebMCP tools, or interpret an output field as a tool call. The helper's only output is outputSchema. Use LanguageModel.create with detected text capabilities, then prompt(inputPacket,{responseConstraint:outputSchema,signal}) through the adapter. With HTTP, use the same exact schema via the supported response_format adapter. responseSchema for the parent agent still contains structured_process as one ordinary tool branch.

The provider interface therefore accepts an approved caller-selected response schema; the name agent_action in the original HTTP example becomes processor_output for this operation. This is a controller-owned schema, not an arbitrary server tool plugin. A rejected dialect fails or follows the existing safe fallback policy; no unconstrained text downgrade. Permit one bounded corrective generation after invalid JSON/schema output, with error paths only and no new data reads. Maximum two attempted helper calls, including fallback. Both count against the parent's child/helper aggregate of 12 and, if bound, goal/pipeline totals; the parent's invocation also consumes its ordinary main iteration. A child may invoke only with explicit grant, no nested delegation, and enough remaining child/helper budget. Never create an extra hidden allowance through retries.

If the input exceeds the chosen context budget, return budget_exceeded and offer a smaller explicit chunk or a human-selected larger route. No silent input truncation. All helper calls run through the shared scheduler, are cancellable with the parent, and are logged with exact supplied schemas/input and returned output. Saving the output is an explicit normal domain action under its own permissions.

## UI, persistence, and verification

The transformation editor uses native name/instruction text fields, a bounded schema form or JSON textarea with error paths, input/output size settings, route selection, Preview, and Test. The processing card shows name/revision, actual provider, running/valid/invalid/cancelled state, source references, and escaped pretty JSON. A Save as document action uses the existing document service after a human click. It never auto-creates tasks from extracted fields.

Use processor-store.js, processor-contract.js, and processing-controller.js; retain immutable definitions/results plus operation IDs in IndexedDB. Full stored outputs follow large-result retention; compact control receipts remain available. Future sync validates definition ownership/revisions and maps device routes explicitly. On reload interrupted processing is held; Test/Retry is a deliberate new operation, not replay of a dependent mutation.

Verify schema-depth/size rejection, unsupported keywords, finite JSON, source access, exact output validation, date-domain validation, tool-bearing malicious output treated as data, correction/fallback aggregate accounting, route isolation, Stop, stale definition edits, and no parent transcript/secret leakage. Real-model tests evaluate extraction quality separately from deterministic schema correctness.

Source inspiration: [OpenClaw LLM task](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/llm-task.md); implementation uses only the browser application's adapters.
