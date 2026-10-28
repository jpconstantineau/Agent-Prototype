# Skill catalogs and upstream update management: reference only

Status: reference for a later implementation decision. The user did not approve building or activating online catalog access. Existing [human skill import](skills.md), [learning](skill-learning-extension.md), and [curation](skill-curation.md) do not depend on this proposal. This does not reopen declined agent web-fetch/search tools.

## Purpose

Record a possible skill distribution and update lifecycle without making an online registry a prerequisite for local skills. Provenance and local-edit protection clarify what would be required before choosing to implement catalog access.

## User intent

Evaluate a future way to inspect, import, and review upstream skill updates while preserving local edits. This reference does not enable network catalogs or automatic installation.

## Agent intent

The agent does not act through this reference-only spec. No catalog installation or update tool is approved here; even a future suggestion would leave download, review, and enablement under the proposed human controls.

## Possible user-facing experience

A future catalog could offer a curated bundled index or approved browser-accessible sources, with Browse, Search, Inspect package, Import as disabled, Check upstream, Compare, and Apply reviewed update. It is a human distribution/maintenance feature, not an agent tool that installs its own instructions. Any agent suggestion would link to a review surface without downloading/enabling code automatically.

Candidate provenance metadata: sourceId, canonical source URL/identifier, publisher text, exact upstream revision/content hash, importedAt, local skill ID/revision, original imported content identity, supported app/tool requirements, and review findings. Popularity/publisher labels are not proof of safety. Text/resource validation must reject unsupported executable helpers and preserve the current app's text-only skill boundary. No shell/package manager or executable plugin loader is implied.

The portable import body would be a closed versioned plain-data package `{version:1,name,description,body,resources,source}` under existing skill limits. source is `{identifier:1–240,revision:1–120,contentHash:1–128}` supplied/verified by the source adapter rather than trusted solely from package claims. A preview shows exact content/resources, required tools, unsupported instructions, and resulting Disabled status. Human import produces a new local skill ID/revision and receipt, not a foreign ID overwrite.

## Update semantics to preserve

Track imported base hash separately from the editable local revision. An upstream difference is an available update, not permission to overwrite. If local content differs from its imported base, show a three-way comparison or create a separate draft; preserve local edits. Apply an exact reviewed draft with expected local revision. An imported update never enables a tool/skill, changes the agent's permissions, or executes resource scripts. Current live contexts follow normal skill-revision invalidation.

Use timeouts, response/package limits, cancellation, owner-scoped caches, and source-specific adapters. Cross-origin browser fetch needs actual source CORS support; a GitHub URL is not automatically a usable package API. A future authenticated Azure proxy is an explicit architecture decision, not an existing service or general URL-fetch bypass. No credentials belong in model context or portable packages. If access is unavailable, manual reviewed file import remains sufficient.

## Decisions deferred

Choose supported catalogs/formats, whether network access is worthwhile, bundled versus remote indexes, license/provenance review, CORS/proxy operation, authentication, update cadence, trust/advisory checks, and human opt-in rules before implementation. Static scanning can flag known patterns but cannot prove a skill is safe or correct. No background polling, registry account, model-call budget, or external provider cost is approved by this reference.

If implemented later, test exact source/version tracking, local edit protection, malicious/oversized packages, origin restrictions, stale update drafts, offline behavior, and no auto-enablement. See [Hermes Skills Hub](https://github.com/NousResearch/hermes-agent/blob/8acb7f65801fa7548b223244dee57465adfda8ec/website/docs/user-guide/features/skills.md#skills-hub) as design background, not a runtime dependency.
