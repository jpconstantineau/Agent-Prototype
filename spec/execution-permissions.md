# Execution permissions and exact-call approval

Status: approved specification. This is user-facing agent configuration enforced by the harness, not a model tool for granting itself authority. Uses [capability controls](capability-controls.md), [agent library](agent-library.md), [proposals](proposed-plans.md), and [observability](observability.md).

## Purpose

Decide when an eligible tool operation may run automatically, must wait for exact-call approval, or is prohibited. This gives different agents appropriate autonomy while keeping approvals tied to concrete arguments and current policy.

## User intent

Choose permission levels and overrides, inspect a proposed tool call, and allow it once or deny it with optional feedback.

## Agent intent

The agent does not act through this spec to configure permissions or approve calls. It submits ordinary tool requests, waits when the harness requires a human decision, and respects the actual denial or execution outcome.

## Separate eligibility, exposure, and execution

Disabled/Include/Discover answers whether a tool is eligible and how its schema enters context. Permission levels answer whether an eligible admitted operation is prohibited, requires human approval, or may run automatically within the current human request. Approval never enables a disabled tool, admits an undiscovered schema, broadens record scope, or overrides the read-only subagent limit. Manual user controls remain independent of agent permissions.

Store permissions inside each saved agent configuration, with separate main and subagent settings. A thread binds a configuration revision; a child also intersects its parent's restrictions and explicit assignment grants. The model sees a compact effective-policy explanation but cannot edit settings. Agent/skill instructions are lower-priority configuration content, not executable policy.

## Settings contract and levels

Permission settings are a closed `{enabled,level,overrides}` object. enabled is boolean; level is one of read_only, confirm_writes, confirm_all, automatic. overrides is up to 100 unique `{tool,rule}` objects; tool is a known exact registry name 1–80 and rule is ask or deny. Missing overrides means an empty array only when migrating an older record; new saves require the field. No wildcard, unknown name, model-generated policy, or override that bypasses a level's denial is accepted.

| Level, when enabled | Read operations | Write/destructive/unknown operations |
| --- | --- | --- |
| `read_only` | Automatic unless explicitly ask/deny | Denied; no approval button can override |
| `confirm_writes` | Automatic unless explicitly ask/deny | Ask before execution |
| `confirm_all` | Ask | Ask |
| `automatic` | Automatic unless explicitly ask/deny | Automatic unless explicitly ask/deny |

enabled:false disables this optional approval layer and treats its level/overrides as dormant. Base capability rules, current-request authorization, v1 child restrictions, and mandatory human reviews still apply. Label this “Additional execution approval off,” never “No permissions.” On upgrade preserve the five existing main task tools' behavior with enabled:false. New user-created configurations default enabled:true with confirm_writes for main, read_only for subagents. Do not silently change the approval behavior of an existing saved configuration. The UI always previews the effective result.

The application registry supplies effect (`read`, `write`, `destructive`, `unknown`) separately from existing tool classification (`read`, `write`, `interaction`, `maintenance`). Persistent audit/log/cache writes inside a read tool are harness maintenance and do not make the underlying domain read a write. Never trust a remote tool's self-declared read label as proof; the future MCP adapter must apply reviewed metadata or unknown. Unknown defaults to gated under confirm_writes and denied under read_only.

Interaction tools such as questions, richer forms, preferences proposals, and proposed task batches retain their own human submission/review lifecycle. They are not subjected to a preliminary generic approval merely to display a question. Controller maintenance (context accounting, offloading, compaction) follows its own policy and limits. Agent-requested maintenance follows its enabled capability and explicit override deny; ask overrides are supported only for domain-operation tools and rejected for interactions/controller-only features. Settings explains those exemptions. This prevents recursive permission questions.

Combine enabled permission policies from applicable parent and child configurations and any human thread restrictions: deny is strongest, then ask, then automatic. A disabled optional layer contributes no additional restriction; it cannot cancel another applicable layer. Per-tool deny always wins within an enabled layer; ask can only tighten an otherwise permitted operation. Schedules retain saved grants and apply current execution restrictions; an unattended run requiring approval stops needs_attention rather than silently approving itself.

```json
{"enabled":true,"level":"confirm_writes","overrides":[{"tool":"document_replace","rule":"deny"},{"tool":"thread_read","rule":"ask"}]}
```

## Dispatch and approval contract

After action/schema validation and capability admission checks, resolve target identity, read expected revisions when required, and evaluate permissions. Denial returns the common failed result with code permission_denied and changes nothing. Asking creates a browser-owned approval record before the domain tool is invoked. No tool call has executed merely because an approval card exists.

The closed approval record contains approvalId, revision, owner/thread/run/actor references, callId, toolName, definitionRevision, immutable validated arguments, configurationRevision, effectivePolicyRevision, createdAt, expiresAt, and status. Status is pending, allowed, denied, cancelled, expired, stale, or executed. Default expiration is ten minutes, measured against a monotonic deadline while the page lives; store the UTC deadline for display/recovery. Recovered pending records are interrupted/stale, never automatically allowed.

The human submits `{approvalId,expectedRevision,decision:'allow_once'|'deny',reason?}`. reason is optional plain text 1–500 for deny and forbidden for allow_once. There is no model-facing approval tool, fabricated user answer, approval via a generated form, or session-wide “Allow everything” button. Broader automation behavior is changed deliberately in the agent configuration UI.

```json
{"approvalId":"approval-1","expectedRevision":1,"decision":"allow_once"}
```

The service returns to the UI `{accepted:true,approvalId,status}` or `{accepted:false,error,code}`. Accepted Allow means the one-use approval was recorded, not that the tool succeeded. Recheck active run/signal, policy/definition revision, ownership, record versions, and exact arguments immediately before invocation. A changed argument, stale target, or policy change invalidates approval and requires a new decision or a fresh tool call. The approval record and callId bind exact arguments, never just the tool name or label. The executor, not the model, resumes that frozen call once.

The waiting agent tool promise settles with its actual tool result after execution. Deny/expiration returns `{success:false,code:'permission_denied',error}`. For this failure only, the application tool-result observation additionally carries approvalDecision: `{approvalId,decision:'deny'|'expired',reason:string|null}`; reason is the exact accepted human text up to 500 characters or null. Keep the ordinary result/error closed and store the same decision in audit events. This labeled decision data cannot authorize unrelated work. Stop rejects AbortError and does not make another model call. Repeated Allow clicks cannot repeat the domain call: persist one-use consumption and call state. Domain writes still require their idempotency receipt; a consumed approval alone does not prove a write committed.

## UI and lifecycle

Agent settings presents an enable switch, a labeled level select with the behavior table, main/subagent scope, and per-tool Ask/Deny overrides. Show inherited parent/global constraints and effective Automatic/Ask/Denied for each operation. Saving uses the agent revision precondition and shows affected conversations. A permission configuration can never include browser credentials or origin storage handles.

An approval card shows the actual tool name, acting main/child agent, target identities, all validated arguments, and domain before/after where available. The preview derives from application data; a model-supplied summary cannot hide arguments. Use plain text or the safe renderer. Long values are expandable and inspectable before Allow; do not silently truncate the reviewed value. Place Allow once and Deny outside model-generated content. Deny optionally expands a reason field. Show expiry and decided/executed/failed status separately.

Use the controller's single blocking interaction slot. The run remains pending while the human decides; waiting consumes no inference steps. The final-step rule forbids opening a gate requiring a continuation beyond the run budget. A queued approval does not queue a second model inference. Teardown releases listeners, marks cancellation, and prevents stale cards from resuming a new run. After Allow, an already committed write survives a subsequent Stop; show its receipt.

A proposed task batch's explicit Apply is already an exact approval of its frozen operations, so do not ask twice. At Apply evaluate current eligibility and hard denials for every operation. Where the permission policy requires approval, the validated Apply interaction satisfies it only for those exact operations and revisions. Preference Accept and other human-only saves similarly cannot be performed by an agent. Structured question/form answers are never equivalent to these application-owned approvals.

Composition v1 stays read-only. An inner read that needs approval uses the same gate with the composition/step identity visible, rather than bypassing it. Exclude human waiting time from its five-second active-execution budget and extend composition's cancellation state accordingly. No thread may have both a pending composition approval and another active interaction. If this integration is unavailable, reject such a composition before executing its first step and direct the agent to ordinary single read tools.

## Integration and acceptance

Add permission-policy.js and an approval broker/view around domain dispatch, before the current executor invokes native/local task services. Gate every agent transport, not just one chat renderer. External WebMCP callers require an identified controller/approval host for gated calls; otherwise deny them, never expose approval-free execution through a fallback. Dedicated manual app controls do not use this agent gate.

Keep approval state and events in IndexedDB with run/call correlation and exact operation receipts. On reload inspect persisted call state; do not replay an uncertain write. Sync copies audit/configuration records through the future authenticated API, but another device cannot consume an in-page pending approval without a separate arbitration design. In v1 approvals are decided on the originating live page only. No live promise, DOM state, or implicit grant is synced.

Test all levels/enable states/overrides, policy intersection, new-tool unknown effects, Disabled/Discover barriers, stale arguments/revisions, malicious summaries, deny/expiry, duplicate clicks, Stop races, crash after consumption, and mutation receipt recovery. Verify question/form/proposal interactions avoid recursive or duplicate approval and that read-only children remain read-only under automatic mode. Log decisions and actual outcomes distinctly.
