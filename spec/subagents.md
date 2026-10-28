# Focused subagents with bounded context

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md), [history](threads-and-history.md), and [capability policy](capability-controls.md). The primary purpose is context isolation, not guaranteed parallel speed or a different model.

## Actors and scope

The main agent can delegate a focused task through `delegate_task`, inspect it with `task_status`, and cancel it with `task_cancel`. Users see each child in an expandable card and can stop it or its parent. Children are independent Prompt API sessions with an explicit task packet, a restricted executor, their own bounded history, and a concise result. They do not inherit the parent's transcript automatically.

Version 1 children are read-only analysts. They may read current task data, selected attachments, and explicitly allowed history/skills. They cannot mutate tasks/preferences, ask the human directly, schedule work, alter the queue/policy, render arbitrary artifacts, or spawn grandchildren. If a child needs a human answer or unavailable data, it reports that need to the parent. The parent asks and decides what to send back via a new bounded assignment.

## Tool contracts

`delegate_task` requires `version: 1`, `task` (1–2000 characters), `context` (0–4000 characters), `allowedTools` (0–8 unique eligible names permitted by the child policy), `allowedSkills` (0–3 unique eligible skill IDs), and `maxResultChars` (integer 400–3000). Child policy permits data reads, authorized tool discovery/skill loading, and restricted read composition; it forbids the actions listed above. Optional title is 1–80 characters. Caller scope supplies parent thread/run and the user-managed subagent profile; model arguments cannot select an owner or bypass that profile. Reject forbidden grants rather than silently expanding/replacing them. An empty allowedSkills means no skill content/catalog is available to this child.

The large-result extension adds optional allowedResults: 0–5 unique accessible result IDs, default empty. The host validates the parent's access before delegating these references and records the exact grant in child state. A result ID merely mentioned in task/context prose is not a grant. Reading one still requires an eligible/admitted result retrieval tool in allowedTools. Child offloading settings require the same retrieval dependency; children can read their own newly produced results within their scope without gaining access to sibling outputs.

```json
{"type":"tool_call","name":"delegate_task","arguments":{"version":1,"title":"Overdue task analysis","task":"Identify recurring themes in overdue tasks; do not change anything.","context":"Return a short factual summary and task references from current reads.","allowedTools":["list_items","search_items"],"allowedSkills":[],"maxResultChars":1200}}
```

Success immediately returns `{success:true,version:1,taskId,threadId,status:'queued'}`. This means accepted, not finished. The child starts only through the scheduler after that observation is persisted. Max two active/queued children per parent run, one active child model session at a time, max six inference calls per child, and 12 total child calls per parent run. These are enforced budgets, not hints.

## Separate child tool and skill settings

Resolve the user's subagent profile independently from the main profile, then intersect it with global policy, parent eligibility, explicit allowedTools/allowedSkills, read-only child restrictions, and record-access scope. Profile Include entries enter the child's initial schema/context only when eligible under that intersection; Discover entries remain on demand. Include does not override a task grant. A parent may grant a Discover tool it is allowed to use without copying its own admission state into the child, but it must know the exact accessible definition. Skills can be eligible for a child without copying their already-loaded bodies from the parent; load the exact selected revisions under the child's own budgets.

Apply the parent's selected [agent configuration](agent-library.md) subagent settings and any human-designated child template revision inside this intersection. The model cannot select a more permissive library entry. Parent and child [execution permissions](execution-permissions.md) combine restrictively; automatic mode never grants v1 children writes. Reads of [saved large results](large-tool-results.md) require explicit delegated result references, not access to every result under the same owner. Record configuration/grant revisions in the diagnostic event stream.

If child discovery is wanted, include search_tools/describe_tool in allowedTools along with the actual granted read tools; discovery cannot reveal tools outside that grant. For child skill loading, grant the appropriate list_skills/load_skill/read_skill_resource tools and explicit skill IDs. Include skills require load_skill eligibility and must fit the child context before inference. The example's empty skill grant means no preload. Settings previews the resolved child profile, while the child card records the actual narrower grants and revisions used. Revoking either parent/global eligibility or the child profile cancels/rebuilds affected work; widening a profile does not widen a running assignment automatically.

If app_execute is permitted for read-only analysis, all tools it could call must also appear in the child's grant and admitted catalog. Nested composition never grants a write, direct storage access, or new child. These same restrictions apply after child compaction or a queued assignment resumes.

`task_status` requires version, taskId, and optional `wait` boolean default true. It only addresses that parent's children. With wait true the service awaits a state milestone without polling or another model call; the inference scheduler may suspend the parent and run the child. Success has `taskId`, `status` (`queued`, `running`, `completed`, `failed`, `cancelled`, `needs_input`), and, when terminal, `result` or `error`. With wait false return a single snapshot. Expose a wait only when the parent has budget for a continuation.

`task_cancel` requires version/taskId; returns `{success:true,version:1,taskId,status:'cancelled'}` or the unchanged terminal status. Idempotent cancellation retains already produced results and never cancels unrelated siblings. Stop parent cancels its unstarted/running children.

## Result packet

A successful child result is a closed object with summary (1–maxResultChars), references (0–20 objects `{kind:'task'|'message'|'attachment'|'document',id:ID}`), uncertainties (0–5 strings up to 200), and needsInput boolean. The host validates record existence/access; document references retain their read revision in the supporting application receipt. Task-local numeric handles map to durable identities where available. A summary cannot forge existence or grant parent mutations.

If the child exceeds the result bound, request one bounded correction within its remaining budget or fail with `budget_exceeded`; never inject an unbounded transcript into the parent. Parent observations include the concise packet and a child thread reference only. Store full child history separately for human inspection and bounded authorized retrieval.

## UI and model guidance

Map title/task/status to a card with waiting/running/result/error labels, a Stop child button, and Open details. Distinguish Child needs information from a live human question. Display sequential execution honestly. Do not show fabricated simultaneous thinking animations.

Tool description: “Delegate a small read-only analysis with only the context needed. Children do not inherit this conversation. Supply explicit tool limits and request a short result. Do not delegate trivial work or duplicate the same task. Use task_status to await its result and task_cancel to stop it. A child's recommendation does not authorize a mutation.” Parent must finish or cancel child work before its final response; the runtime holds the run incomplete otherwise, without silently executing beyond budgets.

## Implementation and acceptance

Add `subagents.js` and a shared inference scheduler. Do not recursively instantiate an unrestricted AgentLoop using the parent executor. Fresh LanguageModel.create() sessions receive current child policy, independently admitted definitions/skill sections, and the bounded packet. Session creation/download failures become child failures; where user activation is required show an enable action. Do not clone a full parent context to achieve isolation. A minimal base may be cloned only with matching role policy, Include content, and no parent history. Use [tool discovery](tool-discovery.md) for per-child schema updates.

Persist child identity/state/results in IndexedDB. On reload mark unfinished children interrupted; do not repeat analysis or writes automatically. Test context isolation, permissions, result limits, parent/child Stop races, disabled tools/skills, no grandchildren, bounded waits, session cleanup, and no child mutation. A scripted parent must consume one short packet, not the whole child transcript. Evaluate actual hardware resource behavior separately from protocol correctness.
