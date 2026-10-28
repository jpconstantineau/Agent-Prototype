# Conditional instruction rules and selective guidance

Status: approved extension; not implemented. Uses [agent settings](agent-library.md), [project scope](project-context.md), [skills](skills.md), [phase](plan-act-modes.md), [context management](context-compaction.md), and [observability](observability.md). Rule records live in IndexedDB; no YAML parser, directory scan, or framework is required.

## Purpose

Supply relevant human-approved guidance without loading every instruction for every task. Structured conditions keep a small model's context focused while preserving inspectable reasons for which rules became active.

## User intent

Write reusable guidance, bind it to selected agents/roles/projects, enable it always or conditionally, test conditions, and see exactly why and when it applied. Understand when an ordinary agent instruction or skill is sufficient instead.

## Agent intent

The agent does not create, select, edit, or enable rules through this specification. It follows the resolved approved rule text and can explain the supplied activation metadata. It cannot turn document content into rules or acquire tools from rule prose.

## Distinction from the existing configuration model

| Existing feature | Its role | How conditional rules differ |
| --- | --- | --- |
| Agent library | Stable role instructions, tools, skills, permissions, routes, budgets | Rules are reusable text fragments selected by runtime work conditions; bindings/settings stay in the library |
| Project instructions | General guidance for the selected project | A rule can apply to only particular permitted resources or phases within that project |
| Preferences/personas | Explicit user settings and communication style | A rule supplies task-specific guidance and does not overwrite those saved values |
| Skills | Reusable procedures explicitly included/discovered/loaded | Rules activate through host-evaluated metadata, without model skill discovery; procedures should remain skills |
| Execution permissions | Enforced capability/effect authorization | Rule text is guidance, not an access-control mechanism |
| Event reminders | A saved future topic condition producing a reminder | Rules contribute approved operating guidance while their context condition is true; they do not consume reminder matches or schedule actions |

Use baseline instructions when the guidance applies to everything this agent does. Use a conditional rule when the same guidance is reusable and relevant only for a defined subset of work. For example, bind a concise report checklist only to a selected set of report document IDs; do not create a second agent solely to add that checklist. Version 1 adds no inferred tags or semantic classifier for “this looks like a report.” Such classification would require a separate explicit metadata design.

## Closed records and condition language

A rule revision is `{version:1,ruleId,revision,body}` with body `{name,description,guidance,priority,condition}`. name nonblank 1–80, description 0–400, guidance plain text 1–2000, priority integer 0–100 default 50. Metadata records ownerId, projectId:ID|null, createdAt/updatedAt, currentRevision, archive/tombstone state. A null project makes a rule reusable within this owner's explicit agent bindings; it never means automatic access across all projects. A project-scoped rule cannot activate in another project.

condition is a closed object with optional projectIds (1–10 IDs), resourceKinds (1–3 unique task/document/attachment), resourceIds (1–20 IDs), phases (1–2 unique plan/act), and workflowIds (1–10 template IDs). At least one property must be present; empty arrays and unknown properties are invalid. Alternatives within a property are OR; supplied properties combine with AND. Resource predicates must be satisfied by the same eligible candidate resource, not a kind from one resource and an ID from another. IDs are exact stable identities, never titles, numeric task handles, OS paths, globs, regex, executable expressions, URLs, or free-form model decisions. Rule text and conditions are stored separately; Markdown frontmatter is inert text on import unless explicitly mapped in a validated human editor.

```json
{"name":"Report checks","description":"Guidance for two selected project reports.","guidance":"State the reporting period, cite the source notes, and distinguish confirmed facts from open questions.","priority":50,"condition":{"resourceKinds":["document"],"resourceIds":["doc-report-a","doc-report-b"],"phases":["act"]}}
```

Each main/subagent role gains instructionRules:0–20 unique `{ruleId,revision,mode}` bindings, where mode disabled/include/conditional. Migration defaults [] in each role. Disabled omits the text; Include selects it regardless of condition but only within its rule/project/access scope; Conditional requires the condition to match. A rule definition by itself never applies globally. Add extensions.instructionRules `{enabled:boolean,maxActiveChars:integer 1000–4000}` default false/2000. This ceiling counts complete guidance strings plus source labels; a matching rule set that cannot fit fails with a visible configuration conflict, never silent omission. Tool admission modes remain separate despite the similar binding labels.

## Human services and UI mapping

Create `{body,projectId}` and Save `{ruleId,expectedRevision,body}` return `{success:true,ruleId,revision,status:'saved'}`; projectId is ID/null validated against the human's selected scope. Archive/Delete use ID/expectedRevision and prevent new selection while preserving retained pinned snapshots. Role binding changes use normal agent-library Save/Apply. No model rule-write tool is introduced.

Preview takes `{agentId,configurationRevision,role,projectId,phase,resourceRefs,workflowId}` with role main/subagent, project/workflow ID nullable, resourceRefs 0–20 exact existing context references. It performs no inference or effects. Success `{success:true,active,omitted,totalChars}`: each active entry `{ruleId,revision,mode,priority,matchedFields}`; omitted entries `{ruleId,revision,reason}` with reason disabled/scope_mismatch/condition_unmatched/unavailable. matchedFields is 0–5 known condition field names; Include uses []. Return no content from inaccessible sources, and show an explicit budget error if selected content exceeds policy. Preview inputs are hypothetical; actual run context is controller-owned and cannot be supplied through agent tool arguments.

The rule library/editor provides labeled Name, Description, Guidance, Priority, and native condition selectors. List role/project consumers, exact revisions, character cost, state, and a Why active explanation. Provide Test conditions, Save, Duplicate, Archive, and separate Apply-to-conversation controls. Empty conditions do not mean always active; choose Include explicitly. Invalid definitions/imports fail closed with field errors; do not adopt Cline's malformed-frontmatter fail-open behavior.

## Runtime evaluation and precedence

Build candidate resource metadata only from current approved context selections and validated targets the agent is actually about to read/edit. Validate owner/project/read grants before using any target as matching evidence. Ordinary words/path-looking strings in user text, retrieved document bodies, open but unrelated UI tabs, and historical tool output do not add candidates. workflowId is the frozen prepared instance's template reference; phase is the host's effective phase, default act if the phase feature is disabled.

At preparation resolve exact bound rule revisions and current scope, then evaluate conditions deterministically. Order active guidance by descending priority then ruleId. Application rules define authority: application policy/protocol and current human constraints first; agent role instructions; selected project instructions; these rule blocks; explicit saved preferences; persona; procedural skills/data under their established scope. Higher-priority rules prevail within the rule layer where text conflicts; ties require visible clarification for material conflicts. Sorting does not guarantee a model can resolve arbitrary contradictory prose, so the human can inspect/disable/edit ambiguous guidance. No rule overrides a hard denial or actual receipt.

At a new eligible target or phase/workflow change, recompute the set. If it changes, persist a new activation snapshot and rebuild the session at a safe boundary. An unstarted action generated before newly applicable guidance is skipped with a truthful not-executed observation; reconsider under the new context within remaining budget. Never execute the stale action merely because its JSON was valid. A target proposed on the last allowed inference cannot get an extra generation through activation; hold with a visible limit. No transaction or human interaction spans a replacement.

The application-authored prompt block identifies ruleId/revision, bound source, activation reason, priority, and exact guidance. It is not an invented tool observation. Store an authoritative activation snapshot `{snapshotId,configurationRevision,projectRevision,phaseRevision,workflowId,resourceRefs,activeRules,createdAt}` in context/session manifests; nullable references use null. activeRules records ruleId/revision/priority/matchedFields. Host metadata cannot be rewritten by a model summary. Compaction, fallback, and children reconstruct only currently applicable approved rule text, measure it, and do not blindly inherit the parent's set.

## Persistence, updates, and acceptance

Use instruction-rule-store.js, rule-conditions.js (pure evaluator), and settings/context-manager integration. Edits create immutable revisions. Existing configuration/thread bindings pin their chosen revision until explicit Apply; disabling or deleting access remains a current hard revocation and removes affected loaded text before dispatch. Revalidate queued work's actual candidates under its saved bindings/current ceilings. Rule deletion and source deletion never resurrect text through an activation summary. Future sync uses owner validation, revisions, tombstones, and explicit conflict resolution rather than concatenating instructions.

Emit control.changed feature rule with immutable activation payloads and record the exact assembled prompt via existing observability. Do not sync live admissions or treat a device's open tabs as cross-device context. Test same-resource AND semantics, cross-project denial, binding modes, unknown/malformed fields, stale revisions, full-text budget failure, mid-task target activation, phase transition, dirty/pending interaction boundaries, no extra calls, lower-priority injection attempts, revocation, and independent main/child bindings. Verify the distinction table's promised behavior through integration examples.

Sources: [Cline conditional rules](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/docs/customization/cline-rules.mdx#conditional-rules) and [extension evaluator](https://github.com/cline/cline/blob/f817e59f698f01487920c00ede2dbecad5c0fa50/apps/vscode/src/core/context/instructions/user-instructions/rule-conditionals.ts). This design uses strict browser record metadata instead of filesystem globs or YAML parsing.
