# Reference-only integration and interaction options

Status: reference only. No implementation or activation is approved.

## Purpose

Keep deferred design ideas together so maintainers can evaluate them without mistaking documentation for implementation approval. External MCP, online skill catalogs, and side questions are independent future decisions rather than dependencies of approved epics.

## User intent

Evaluate possible future connections, skill update sources, and a separate clarification surface, including their data access and review implications. This reference authorizes no activation or installation.

## Agent intent

No agent acts through this reference epic today. Any future tools, responder, network access, or permissions require a separate implementation decision and the boundaries recorded in the relevant chapter.

## Epic scope and ownership

This canonical epic groups related feature contracts. Each chapter retains its individual enablement rules and mandatory harness requirements. Consolidation does not combine their tools, JSON schemas, stores, approvals, or budgets into a new universal contract. All chapters use vanilla JavaScript ES modules and browser/Chrome APIs under [shared runtime contracts](runtime-contracts.md).

| Feature chapter | Primary actor | Responsibility |
| --- | --- | --- |
| [External MCP connections](#feature-external-mcp-reference) | Future human approval; proposed scoped tools | Consider becoming an external MCP client, distinct from existing page WebMCP. |
| [Online skill catalogs](#feature-skill-catalog-reference) | Future human review | Consider optional catalog/import/update provenance without automatic enablement. |
| [Side questions](#feature-side-questions-reference) | Future human surface; separate read-only responder | Consider bounded temporary clarification outside the main context. |

## Integration and delivery

Every chapter remains reference-only. Grouping these ideas does not approve external network services, a registry, installation, a side responder, or any implementation dependency.

Approved manual skill imports, existing page WebMCP, history, and conversation branches continue independently. Previously declined web search/fetch, credential tools, conversation import, lifecycle hooks, multi-document change sets, and appearance work are not reintroduced through these references.

<a id="feature-external-mcp-reference"></a>

## External MCP connections

Status: reference for a later implementation decision. This is not approved for implementation or activation. It records the additional OpenCode resource tools considered during review and must not add live connections, permissions, backend routes, or production dependencies.

<a id="feature-external-mcp-reference-purpose"></a>

### Purpose

Preserve a possible architecture for accessing external services without committing the project to implement it. Explain the distinction between exposing page actions through WebMCP and becoming a client of remote MCP servers.

<a id="feature-external-mcp-reference-user-intent"></a>

### User intent

Evaluate whether external connections are worth adding later, including their data access, authentication, and permission implications. This reference does not authorize a live connection or installation.

<a id="feature-external-mcp-reference-agent-intent"></a>

### Agent intent

No agent acts through this reference-only spec today. If separately approved later, an agent could discover and use only explicitly connected, scoped resources or tools under the proposed policy.

<a id="feature-external-mcp-reference-distinguish-the-two-directions"></a>

### Distinguish the two directions

The app already exposes its own task operations through WebMCP where Chrome supports it. That does not automatically make the app a client of arbitrary remote MCP servers. An external connection would let this agent discover/read another service's resources or, under a separate grant, invoke that service's tools. The original five page tools and local agent features continue working without it.

Potential value: read an approved calendar or document repository through a configured service. Unselected web search/page fetching remain declined. Remote MCP cannot be used as an unnoticed workaround for those decisions; enabling any future connection requires the user's separate choice and policy review.

<a id="feature-external-mcp-reference-proposed-actor-and-protocol-boundaries"></a>

### Proposed actor and protocol boundaries

The human would create/authorize, inspect, disable, and remove connections. The model would never supply a server URL as a new permission grant or handle authentication tokens. A browser-compatible HTTP transport could connect directly only where network/auth constraints permit; otherwise a future authenticated Azure API adapter could mediate it. No assumption of stdio subprocesses or local machine access is valid in the hosted page.

Candidate resource tools, all requiring version 1 and current connection grants:

| Tool | Inputs | Intended successful data |
| --- | --- | --- |
| `list_connected_resources` | connectionId? ID, cursor?, limit? 1–10 default 5 | Paged resource metadata: connectionId, resourceId, title, mediaType, revision if supplied, and templates kept distinct from concrete resources. |
| `read_connected_resource` | connectionId, discovered resourceId, cursor?, maxChars? 500–4000 default 2000 | Attributed bounded text, content metadata, nextCursor/null, and source revision; binary references require supported attachment handling. |

These are application-normalized contracts, not claims of native MCP method names. An adapter must map actual server resource listing/templates/reads, validate returned schemas, and bound content before model insertion. Server-provided descriptions and bodies remain untrusted data. Existing attachment support does not make PDF/DOCX output automatically model-readable.

If remote tools were later enabled, register exact connection-scoped names and validated schemas through the same tool-discovery catalog; separate read/write grants and require execution checks at the adapter. A remote namespace must not override a local built-in or bootstrap tool. Resource access and tool invocation need independent controls. Never put authentication material in tool definitions, traces, artifacts, or model results.

<a id="feature-external-mcp-reference-ui-and-storage-intent"></a>

### UI and storage intent

A future Connections panel would show service identity, authorized account, transport, granted resource/tool scopes, last status, and Disconnect. The agent could list only granted connections. Disconnection immediately blocks new remote calls and invalidates stale definitions; it does not pretend that already completed remote effects were reversed. Human-readable results identify the connection and source.

Persist nonsecret connection metadata and user grants in IndexedDB. Credential handling belongs to a separately reviewed identity/backend design; the declined request_secret tool is not reintroduced. Cross-device sync must not blindly copy device-bound credentials or assert that authorization on one device grants all others the same session.

<a id="feature-external-mcp-reference-decisions-required-before-implementation"></a>

### Decisions required before implementation

Decide supported server/transport versions, authentication and backend responsibility, allowed destinations, per-user ownership, read-only versus write support, schema vocabulary, result budgets, rate limits, error/reconnect semantics, and privacy disclosures. Account for browser CORS and redirect restrictions without describing a proxy as a bypass of service authorization. Specify how a user revokes a connection and what retained data is deleted. Make idempotency/uncertain-commit rules explicit before remote writes.

A future approval should add concrete connection validation, consent, authentication, transport conformance, ownership, disabled-policy, pagination/limits, cancellation, and revocation tests. Until then, the runtime should have no enabled external MCP tools and Settings should not imply a connected service exists. This note is an architectural reference, not a build checklist authorizing the feature.

---

<a id="feature-skill-catalog-reference"></a>

## Online skill catalogs

Status: reference for a later implementation decision. The user did not approve building or activating online catalog access. Existing [human skill import](skill-library.md#feature-skills), [learning](skill-library.md#feature-skill-learning-extension), and [curation](skill-library.md#feature-skill-curation) do not depend on this proposal. This does not reopen declined agent web-fetch/search tools.

<a id="feature-skill-catalog-reference-purpose"></a>

### Purpose

Record a possible skill distribution and update lifecycle without making an online registry a prerequisite for local skills. Provenance and local-edit protection clarify what would be required before choosing to implement catalog access.

<a id="feature-skill-catalog-reference-user-intent"></a>

### User intent

Evaluate a future way to inspect, import, and review upstream skill updates while preserving local edits. This reference does not enable network catalogs or automatic installation.

<a id="feature-skill-catalog-reference-agent-intent"></a>

### Agent intent

The agent does not act through this reference-only spec. No catalog installation or update tool is approved here; even a future suggestion would leave download, review, and enablement under the proposed human controls.

<a id="feature-skill-catalog-reference-possible-user-facing-experience"></a>

### Possible user-facing experience

A future catalog could offer a curated bundled index or approved browser-accessible sources, with Browse, Search, Inspect package, Import as disabled, Check upstream, Compare, and Apply reviewed update. It is a human distribution/maintenance feature, not an agent tool that installs its own instructions. Any agent suggestion would link to a review surface without downloading/enabling code automatically.

Candidate provenance metadata: sourceId, canonical source URL/identifier, publisher text, exact upstream revision/content hash, importedAt, local skill ID/revision, original imported content identity, supported app/tool requirements, and review findings. Popularity/publisher labels are not proof of safety. Text/resource validation must reject unsupported executable helpers and preserve the current app's text-only skill boundary. No shell/package manager or executable plugin loader is implied.

The portable import body would be a closed versioned plain-data package `{version:1,name,description,body,resources,source}` under existing skill limits. source is `{identifier:1–240,revision:1–120,contentHash:1–128}` supplied/verified by the source adapter rather than trusted solely from package claims. A preview shows exact content/resources, required tools, unsupported instructions, and resulting Disabled status. Human import produces a new local skill ID/revision and receipt, not a foreign ID overwrite.

<a id="feature-skill-catalog-reference-update-semantics-to-preserve"></a>

### Update semantics to preserve

Track imported base hash separately from the editable local revision. An upstream difference is an available update, not permission to overwrite. If local content differs from its imported base, show a three-way comparison or create a separate draft; preserve local edits. Apply an exact reviewed draft with expected local revision. An imported update never enables a tool/skill, changes the agent's permissions, or executes resource scripts. Current live contexts follow normal skill-revision invalidation.

Use timeouts, response/package limits, cancellation, owner-scoped caches, and source-specific adapters. Cross-origin browser fetch needs actual source CORS support; a GitHub URL is not automatically a usable package API. A future authenticated Azure proxy is an explicit architecture decision, not an existing service or general URL-fetch bypass. No credentials belong in model context or portable packages. If access is unavailable, manual reviewed file import remains sufficient.

<a id="feature-skill-catalog-reference-decisions-deferred"></a>

### Decisions deferred

Choose supported catalogs/formats, whether network access is worthwhile, bundled versus remote indexes, license/provenance review, CORS/proxy operation, authentication, update cadence, trust/advisory checks, and human opt-in rules before implementation. Static scanning can flag known patterns but cannot prove a skill is safe or correct. No background polling, registry account, model-call budget, or external provider cost is approved by this reference.

If implemented later, test exact source/version tracking, local edit protection, malicious/oversized packages, origin restrictions, stale update drafts, offline behavior, and no auto-enablement. See [Hermes Skills Hub](https://github.com/NousResearch/hermes-agent/blob/8acb7f65801fa7548b223244dee57465adfda8ec/website/docs/user-guide/features/skills.md#skills-hub) as design background, not a runtime dependency.

---

<a id="feature-side-questions-reference"></a>

## Side questions

Status: reference only; future implementation decision required. The user approved documenting this option, not implementing or enabling it. Relates to [branches](conversation-lifecycle.md#feature-thread-branches), [context references](conversation-lifecycle.md#feature-context-references), [history](conversation-lifecycle.md#feature-threads-and-history), and [observability](diagnostics.md#feature-observability).

<a id="feature-side-questions-reference-purpose"></a>

### Purpose

Describe a possible lightweight clarification surface that keeps tangential questions outside the main task's working context. Maintainers can assess its value and resource cost later without treating it as approved implementation work.

<a id="feature-side-questions-reference-user-intent"></a>

### User intent

Ask about a selected passage or current activity, inspect a focused answer, clear the side conversation, and explicitly bring useful findings into the main discussion if desired.

<a id="feature-side-questions-reference-agent-intent"></a>

### Agent intent

The main agent does not open or control this surface. A separate read-only responder would answer only the side question using a bounded snapshot; it would not resume or redirect the main assignment, invoke mutation tools, or persist new memory.

<a id="feature-side-questions-reference-possible-interface-and-contracts"></a>

### Possible interface and contracts

An Ask a side question button on selected text opens a side panel and fills a quoted draft. Opening/prefilling does not infer. The user edits and presses Send, or opens the panel without a selection. Selection references use exact message/document revision and UTF-16 offsets from context-references; no arbitrary DOM selector or privileged screen snapshot is needed.

Proposed human Submit input is closed `{threadId,question,sourceRefs}`: question nonblank 1–2000, sourceRefs 0–3 existing selected-range reference objects. Success `{success:true,sideId,questionId,status:'queued'}` is acceptance, not an answer. A separate completion record is `{version:1,sideId,questionId,status,answer,sourceRefs,errorCode}`; status completed/failed/cancelled, answer string 0–2400 nonblank only for completed, errorCode known shared code/null, sourceRefs are verified supplied sources. All IDs/ownership come from the controller. There is no new model tool in the main agent schema.

The side responder output schema is closed `{version:1,answer,sourceRefs}` with answer 1–2400 and at most three verified evidence references. It uses a fresh tool-free text context containing the side question, selected sources, and an app-built relevant snapshot <=6000 characters. Do not copy the entire live parent session or assume clone() yields a smaller or permission-safe context. Maximum two attempted generations per submitted question including correction/fallback, with a visible per-panel allowance of six until another explicit human reset. Scheduling is shared: no guarantee of simultaneous Nano execution. Main tools/approvals keep their own lifecycle.

<a id="feature-side-questions-reference-separation-transfer-and-retention"></a>

### Separation, transfer, and retention

Side exchanges would remain outside the main transcript and automatic main context. A visible Transfer to main action uses the existing reviewed context-transfer service, with a source snapshot and a concise human-selected finding; no silent merge. This may require extending transfer sources to a typed side result in the future implementation decision. Selecting text does not authorize changing its source or sending a new main request.

Ephemeral is a UI/history retention choice, not a promise of zero diagnostic traces. The accepted user question, submitted packet, actual provider, output, validation, cancellation, and transfer would still be logged under observability policy and shown clearly. No unsubmitted selection/draft is logged. A future implementation must choose whether side exchanges survive reload; the proposed default is memory-only UI state with no auto-resume, while retained diagnostic copies follow explicit user retention/deletion controls. Hiding the panel preserves its in-memory draft; Clear cancels its own request and clears only side UI state.

No agent-facing side-chat starter, autonomous learning, page navigation, writes, external service, shell, native app control, or unrestricted parent-history access is proposed. Route selection would follow existing approved text routes and measured budgets; switching provider cannot broaden selected sources. Large or unavailable sources require an explicit smaller selection. Main Stop should visibly offer Stop main / Stop all so a side task is never mistaken for cancelled work.

<a id="feature-side-questions-reference-future-decision-and-verification"></a>

### Future decision and verification

Before implementation decide whether the interface justifies extra model sessions, how mobile presents it, retention across reload, budget accounting relative to goals, and the exact reviewed-transfer extension. Keep this document out of the approved implementation sequence and default tool registry/configuration. Nothing in it authorizes a new capability switch being enabled now.

If later approved, verify source isolation, selected-range revisions, no inference on open/prefill, scheduling and cancellation, unsupported model handling, safe source rendering, logging disclosure, no main-context changes without Transfer, and no tool effects from the responder. Real-model tests should measure whether the separate context helps small-window tasks rather than assume improvement.

Source inspiration: [OpenClaw side questions](https://github.com/openclaw/openclaw/blob/a74f408db7fbabcdca1089cec8d50f16d6a4f418/docs/tools/btw.md). This reference defines a possible browser adaptation without adopting gateway RPC or Codex thread-fork behavior.
