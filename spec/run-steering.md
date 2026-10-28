# Safe-boundary redirection of active work

Status: approved extension; not implemented. Extends the existing [request queue](request-queue.md) without changing its Queue for later default. Uses [permissions](execution-permissions.md), [history](threads-and-history.md), [goals](conversation-goals.md), and [observability](observability.md).

## Purpose

Let a human correct or narrow ongoing work before the agent takes further actions. Explicit admission states avoid confusing a submitted correction with guidance the model has already received.

## User intent

Send “Only use this year's notes” or another correction to the active run, see when it becomes effective, and keep an unrelated request queued for its own later turn.

## Agent intent

The agent does not invoke steering or author steering messages. It receives exact admitted human guidance and reconsiders the remaining task using actual prior outcomes. A correction does not undo committed changes or grant prohibited capabilities.

## Browser integration boundary

Chrome prompt() accepts one prepared request. This feature is a harness-owned queue around inference/tool boundaries, not a new native injection method or mutation of a request already being generated. Use extensions.steering `{enabled:boolean}` default false; disabled preserves the earlier queue behavior. Only the foreground human who owns the thread can redirect that thread's active run. Main agents cannot steer children through this API; child assignments and cancellation retain their own contracts.

After a model response settles but before starting its proposed tool, check for a pending steer. If present, store the raw assistant action but skip the unstarted call, append a synthetic observation saying not_executed_due_to_steering, then admit the guidance and ask the model to reconsider within remaining budget. No tool.started or successful domain receipt is fabricated. If a tool has already started, let its cancellation/settlement contract finish, record the real result, and admit guidance before the next inference. Stop is the explicit way to request cancellation of active work.

Inference and dispatch share one scheduler. A controller-owned effect-start flag makes it clear whether a tool has actually begun. A pending steer at a blocking question/approval is held; ordinary composer text cannot masquerade as that interaction's answer. The UI offers Answer/Cancel interaction or Stop and redirect. A pending exact approval is invalidated if changed intent makes the proposed call stale; never apply an old approval to new arguments.

## Closed service and state contracts

There is no model tool. Human submit takes `{threadId,expectedRunId,text}`: IDs are shared ID, text nonblank 1–4000; attachment support is deferred to normal queue submission. Store `{version:1,steerId,revision,threadId,targetRunId,text,acceptedAt,state,inferenceId}` plus host owner/device attribution. state is pending/admitted/queued/cancelled; inferenceId is ID/null, non-null only after an admitted inference submission attempt. Pending records are immutable in text: Cancel and resubmit replaces an unadmitted correction. At most three pending steers and 6000 pending characters per run; reject overflow preserving composer text.

Submit returns `{success:true,steerId,revision,status:'pending',targetRunId}`. Cancel `{steerId,expectedRevision}` returns status cancelled only if still pending; an already admitted record returns conflict. All failures use shared codes. If the target run is idle/ended/changed, return conflict with the text preserved and explicit Queue for later or Send as new request controls. Do not silently redirect another run or turn a failed steer into a new authorized task.

At admission atomically bind pending steers in accepted order to one next inference packet with stable steeringBatchId. Append the actual human messages and a controller context envelope:

```json
{"kind":"steering_context","version":1,"steeringBatchId":"steer-batch-1","runId":"run-1","items":[{"steerId":"steer-1","revision":1,"text":"Use only this year's notes."}],"remainingMainCalls":4}
```

Items preserve exact text, at most three/6000 characters. remainingMainCalls is host-supplied integer 1–12. The controller identifies these as current human instructions, preserving the original request and actual successful receipts. Guidance at this layer remains subject to application policy. Source/quote text attached to a message stays data. Append the envelope once per inference preparation; fallback retains the same steeringBatchId rather than consuming it again.

Mark admitted only when committed to the candidate packet selected for submission; retain attempted/submitted evidence in the normal inference log. If preparation definitively fails before submission, keep pending. If submission is uncertain, retain admitted with diagnostic status unknown rather than replay automatically. The UI's “Applied to next model request” means supplied to the model, not proof it understood or completed the correction.

## Final responses, limits, and recovery

If guidance arrived while the model was producing a final, persist that output as superseded by guidance, show it only with that label, and request reconsideration if budget remains. Preserve public useful text in history; never silently substitute one answer as if it answered the newer correction. If the last allowed call is consumed, finish needs_attention, keep pending guidance visible, and offer an explicit new run. Do not invoke another prompt simply because a steer is waiting.

Steering does not reset main/child/goal/pipeline budgets, identical-error streaks, or permission checks. A genuinely changed request/outcome may break a loop under the detector's normal rule, but the admission operation alone does not erase evidence. Current hard revocations take effect before dispatch even if a candidate action was generated earlier. Compaction must preserve admitted exact text and unread pending steers separately; it cannot summarize away a new correction before its first submission.

Reload leaves pending steers held with their interrupted run, offering explicit Send as new request or discard. Already admitted guidance remains in history and source manifests; no past call is re-executed. A synced pending steer is not an execution command on another device. Emit control.changed feature steering and retain batch/admission events and real receipts.

## UI mapping and implementation checks

The busy composer offers Queue for later (existing default), Redirect current work, and Stop. Show a pending correction card with exact text, target run, Cancel, and Pending/Applied/Needs new run labels. Explanations state that already started work can finish before the correction takes effect. No false “agent saw it” claim merely on Save. Use native buttons and polite status updates without taking focus from the composer or human forms.

Add steering-controller.js around the existing scheduler, not a second AgentLoop. Verify before-tool admission, during-tool settlement, final response races, quota/prepare failure, Stop, stale run IDs, pending forms, held queue ordering, last-call limits, multiple corrections, no fabricated success for a skipped call, and fallback/reload exactly-once admission. Keep the original question wire contract unchanged.

Source inspiration: [OpenClaw steering](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/steer.md).
