# External MCP connections: reference only

Status: reference for a later implementation decision. This is not approved for implementation or activation. It records the additional OpenCode resource tools considered during review and must not add live connections, permissions, backend routes, or production dependencies.

## Purpose

Preserve a possible architecture for accessing external services without committing the project to implement it. Explain the distinction between exposing page actions through WebMCP and becoming a client of remote MCP servers.

## User intent

Evaluate whether external connections are worth adding later, including their data access, authentication, and permission implications. This reference does not authorize a live connection or installation.

## Agent intent

No agent acts through this reference-only spec today. If separately approved later, an agent could discover and use only explicitly connected, scoped resources or tools under the proposed policy.

## Distinguish the two directions

The app already exposes its own task operations through WebMCP where Chrome supports it. That does not automatically make the app a client of arbitrary remote MCP servers. An external connection would let this agent discover/read another service's resources or, under a separate grant, invoke that service's tools. The original five page tools and local agent features continue working without it.

Potential value: read an approved calendar or document repository through a configured service. Unselected web search/page fetching remain declined. Remote MCP cannot be used as an unnoticed workaround for those decisions; enabling any future connection requires the user's separate choice and policy review.

## Proposed actor and protocol boundaries

The human would create/authorize, inspect, disable, and remove connections. The model would never supply a server URL as a new permission grant or handle authentication tokens. A browser-compatible HTTP transport could connect directly only where network/auth constraints permit; otherwise a future authenticated Azure API adapter could mediate it. No assumption of stdio subprocesses or local machine access is valid in the hosted page.

Candidate resource tools, all requiring version 1 and current connection grants:

| Tool | Inputs | Intended successful data |
| --- | --- | --- |
| `list_connected_resources` | connectionId? ID, cursor?, limit? 1–10 default 5 | Paged resource metadata: connectionId, resourceId, title, mediaType, revision if supplied, and templates kept distinct from concrete resources. |
| `read_connected_resource` | connectionId, discovered resourceId, cursor?, maxChars? 500–4000 default 2000 | Attributed bounded text, content metadata, nextCursor/null, and source revision; binary references require supported attachment handling. |

These are application-normalized contracts, not claims of native MCP method names. An adapter must map actual server resource listing/templates/reads, validate returned schemas, and bound content before model insertion. Server-provided descriptions and bodies remain untrusted data. Existing attachment support does not make PDF/DOCX output automatically model-readable.

If remote tools were later enabled, register exact connection-scoped names and validated schemas through the same tool-discovery catalog; separate read/write grants and require execution checks at the adapter. A remote namespace must not override a local built-in or bootstrap tool. Resource access and tool invocation need independent controls. Never put authentication material in tool definitions, traces, artifacts, or model results.

## UI and storage intent

A future Connections panel would show service identity, authorized account, transport, granted resource/tool scopes, last status, and Disconnect. The agent could list only granted connections. Disconnection immediately blocks new remote calls and invalidates stale definitions; it does not pretend that already completed remote effects were reversed. Human-readable results identify the connection and source.

Persist nonsecret connection metadata and user grants in IndexedDB. Credential handling belongs to a separately reviewed identity/backend design; the declined request_secret tool is not reintroduced. Cross-device sync must not blindly copy device-bound credentials or assert that authorization on one device grants all others the same session.

## Decisions required before implementation

Decide supported server/transport versions, authentication and backend responsibility, allowed destinations, per-user ownership, read-only versus write support, schema vocabulary, result budgets, rate limits, error/reconnect semantics, and privacy disclosures. Account for browser CORS and redirect restrictions without describing a proxy as a bypass of service authorization. Specify how a user revokes a connection and what retained data is deleted. Make idempotency/uncertain-commit rules explicit before remote writes.

A future approval should add concrete connection validation, consent, authentication, transport conformance, ownership, disabled-policy, pagination/limits, cancellation, and revocation tests. Until then, the runtime should have no enabled external MCP tools and Settings should not imply a connected service exists. This note is an architectural reference, not a build checklist authorizing the feature.
