# Daylist UI specification

## Purpose

Give maintainers and coding agents a concrete, reviewable interface system: what a visual rule does, which user intention it supports, why its exact value was chosen, and what evidence could show it is wrong. This is a proposed framework for future app UI work and an isolated reference implementation. It does not migrate the existing Daylist screens or declare their existing CSS audited.

## User intent

Read and compare information, find an action, edit one value deliberately, recover from errors and keep the same workflow usable on desktop, mobile, keyboard and magnified views. The live examples let a maintainer inspect those outcomes before adopting the system.

## Agent intent

An implementation agent reads the design tokens, native HTML contracts and declaration ledger before creating UI. It changes source, rationale, examples and checks together. This specification adds no agent-facing application tools and grants no permission to alter user tasks, settings or data. The example script never imports the app store or inference harness.

## Read and review

| File | Responsibility |
| --- | --- |
| [DESIGN.md](DESIGN.md) | Google DESIGN.md alpha format: exact tokens plus the eight canonical rationale sections; primary entry point for coding agents. Generated from system.mjs and design-body.md. |
| [PALETTES.md](PALETTES.md) / [palettes.mjs](palettes.mjs) | Four resolved color-role tables, contrast matrices and their authoritative source. Alternate Google-format documents are in [themes/](themes/). |
| [HMI-PHILOSOPHY.md](HMI-PHILOSOPHY.md) | ISA-101 inspiration, muted neutral structural colors, color allocation, exact-value reasoning and checks. |
| [REVISIONS.md](REVISIONS.md) | Maintainer-requested changes and retired/replaced declaration IDs. |
| [FOUNDATIONS.md](FOUNDATIONS.md) | Color, typography, spacing, responsive layouts, units and CSS cascade contract. |
| [COMPONENTS.md](COMPONENTS.md) | Semantic HTML/attributes, desktop/mobile components, state contracts and click-to-edit interaction. |
| [CSS-DECISIONS.md](CSS-DECISIONS.md) | Every shipped CSS declaration, including Bootstrap grid declarations, with stable ID, exact value, purpose, user intent and verification family. Generated, not hand-edited. |
| [system.mjs](system.mjs) | Normative token and CSS source. Each declaration tuple has its own specific reason; its containing rule supplies contextual intent. The generated ledger repeats that intent for each declaration. |
| [REVIEW.md](REVIEW.md) | Maintainer gates, rejection/rework procedure, verification matrix and manual checks. |
| [SOURCES.md](SOURCES.md) | Primary sources, versions, project choices and boundaries of the evidence. |
| [VALIDATION.md](VALIDATION.md) | Actual check results, official Google lint findings and remaining manual review. |

## Live examples

Deployed reference: **[UI reference](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/)**. The URL becomes available after this change is published by GitHub Pages. With the local server running, open **http://localhost:5173/ui-spec/**. At the project subpath used in tests, it is http://localhost:5174/Agent-Prototype/ui-spec/.

The page includes token swatches, paired and work/support Bootstrap grids, prefilled native text/notes/select/date editors that reveal their boxes on focus, two appearance sliders, radio/checkbox labels, enabled/disabled actions, a modal, status/error/progress/empty states, a comparison table and a searchable declaration ledger. Example record changes are page memory only and clear on reload. The two appearance choices alone persist under a reference-specific localStorage key. No local-model setup is required.

## Bootstrap contract

This is a locally served **Bootstrap 5.3.8-derived subset**, not a renamed full bundle or a claim of full Bootstrap API compatibility. Six grid rules use literal upstream declarations; components follow the familiar Bootstrap class vocabulary with explicitly authored Daylist styles. The subset deliberately keeps the entire shipped CSS small enough to review declaration by declaration. No third-party CSS is exempt from the ledger.

Supported classes: `container`, `row`, `col-md-6`, `col-lg-8`, `col-lg-4`, `card`, `btn`, `btn-primary`, `form-control`, `form-select`, `table`, `table-responsive`. Classes prefixed `ui-` provide documented extensions. Other Bootstrap utilities, components and JavaScript plugins are absent. Use prefilled focus-styled native controls for inline editing and native dialog for modal decisions. No Bootstrap Collapse/Modal plugin is required. Read [Bootstrap provenance](bootstrap-provenance.json) and the [retained license](../docs/ui-spec/BOOTSTRAP-LICENSE.txt).

## Build and verify

From the repository root:

```sh
node UI-Spec/build.mjs
node UI-Spec/build.mjs --check
cd docs
npm test
npm run test:browser
```

`npm run ui:build` and `npm run ui:check` are equivalent shortcuts from docs. Generated CSS, the live JSON ledger, Markdown ledger and DESIGN.md are committed so GitHub Pages needs no build tool. `UI-Spec/system.mjs` and `design-body.md` are the editing sources. The browser has no dependency on Node, Sass, React, TypeScript, Bootstrap JS, CDN availability or a runtime token compiler.

“CSS attribute” here means **every authored CSS declaration**: property, value and selector/conditional scope, including custom properties, shorthands, focus/hover/invalid/disabled rules, forced-color overrides and copied Bootstrap rules. Browser/OS internal styles are outside our source control; their retained behavior is documented and tested separately. Tests reject extra CSS, inline style attributes, style mutations, missing rationale, mismatched generated output and unsupported declarations. No waiver is hidden in a third-party stylesheet.

All decisions remain **proposed** until a maintainer reviews them. Traceability checks prove that a purpose and intent are recorded; they cannot prove that prose is persuasive or that a user actually benefits. Rejected intent is a requirement to rework the decision, not a request to make the wording sound more confident.
