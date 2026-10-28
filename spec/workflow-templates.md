# Reusable parameterized workflow templates

Status: approved specification. A user-facing task launcher reusing [agent configurations](agent-library.md), [skills](skills.md), [structured forms](structured-input-extension.md), [context references](context-references.md), and [scheduling](scheduled-work.md). It is not an executable script/plugin format.

## Template and instance contracts

A workflow is a repeatable request, distinct from an agent's general identity. Store templateId, owner, revision, title 1–120, description 0–400, instruction 1–2000, agentId/configurationRevision, projectId:ID|null, skillRefs 0–3 of `{skillId,revision}`, contextRefs 0–5 using the context-reference contract, and parameters 0–8. All references use exact revisions; missing/disabled resources fail preparation instead of being silently skipped. No template grants permissions or installs capabilities.

Each parameter is `{id:LocalID,label:1–120,help:0–240,required:boolean,input}` with input using text/textarea/number/date/time/select/multiselect/checkbox from the rich-input extension. Validate IDs/options/cardinality with that contract. Parameters are values, not JavaScript expressions or commands. Store instruction and the typed parameter object separately; do not interpolate values into executable strings, URLs, selectors, or JSON source. A template can describe how parameter values should be used but cannot supply a hidden tool call or a tool permission override.

Human Save accepts `{templateId?,expectedRevision?,body}`; ID/revision are both present for an update and absent for create. Domain validation returns `{templateId,revision,status:'saved'}`. A run preparation accepts `{templateId,expectedRevision,answers,mode:'once'|'schedule'}`. answers follows the form extension's typed field answer variants and <=4000 serialized characters. Preparing returns `{instanceId,revision,status:'ready',reviewPacket}`. ReviewPacket shows exact agent/project/configuration, requested instruction, typed values, skill/resource revisions, and effective capabilities/permissions. It does not execute inference or create a schedule yet.

```json
{"templateId":"template-1","expectedRevision":2,"answers":[{"fieldId":"period","kind":"choice","optionIds":["this_week"]}],"mode":"once"}
```

Human Start accepts `{instanceId,expectedRevision}` and commits one immutable instance plus a queued run/thread reference. Schedule mode additionally requires a normal validated schedule object and explicit schedule grant selection. Use an application-generated instance/start operation ID to prevent double clicks creating two runs/jobs. The agent cannot click Start or choose a more permissive agent. An optional agent tool `workflow_list` requires `{version:1,query?:0–120,cursor?,limit?:1–10}` and returns templateId/revision/title/description only for eligible project-scoped templates; this read does not prepare or start them. No agent-facing workflow execution tool in v1.

## UI and execution

The workflow library offers Search, New, Duplicate, Edit, Run once, Schedule, and Archive. The editor uses native controls for instruction, agent/project and skill/resource pickers, and parameter definitions; no code editor is required. Starting renders the parameter form, then the concrete review packet and Start/Cancel. If a template selects another project, open a new conversation bound to it after human review rather than changing the current active thread silently.

Start creates the usual bounded request packet: `{kind:'workflow_request',instanceId,instruction,parameters,referenceManifest}`. It uses the same loop, schemas, permissions, operation receipts, context checks, and logs as ordinary chat. Source material is data; only allowed approved skill bodies have guidance status. Required skills must fit the active skill/context budget or preparation fails with a shortening/selection action. Do not temporarily enable disabled skills to satisfy a template.

Schedules save the template instance's exact configuration/resource references and typed parameter values. Because schedule prompt is limited to 2000 characters, store only a bounded application-authored request plus instance ID in that field; the trusted scheduler resolves the immutable instance and verifies its grants. This is an explicitly recognized application request type, not an instruction to follow arbitrary IDs from a model string. On occurrence, recheck ownership, project, current hard policy, and referenced availability. Changed/deleted/unavailable required resources hold needs_attention; never substitute latest versions automatically. All page-open and missed-run limits remain in force.

The workflowInstanceId is separate application-owned schedule metadata written only by the validated human launcher. The scheduler resolves that metadata binding, never an ID parsed from a free-form prompt. A model calling schedule_task with look-alike JSON text gains no workflow-instance authority.

## Persistence and acceptance

Add workflow-store.js, template validators, and a launcher/editor. IndexedDB separates mutable template heads, immutable revisions, and run instances. Archive hides future selection but does not cancel existing schedules; show and manage those links explicitly. Future sync preserves instance/start IDs and detects conflicting template edits without merging permission choices. Export portable plain-data templates without credentials/handles; imports require human ID mapping and remain inert until reviewed.

Test typed parameters, missing resources, revision mismatch, context budget failure, literal parameter injection, double Start, no implicit scheduling, explicit project/agent selection, disabled skills, and occurrence needs_attention. Verify template runs use the actual configured revisions and cannot escape the same tool checks as typed chat.
