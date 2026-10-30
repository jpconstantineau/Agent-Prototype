# Quiet surfaces and meaningful color

## Purpose

Apply high-performance HMI principles to the reference interface so large background fields do not compete with work, focus or a condition requiring attention. Record why each structural color changed and how to review it. This governs the reference and future app adoption through the design system. [COLOR-SELECTION.md](COLOR-SELECTION.md) separately governs the selected azure action and its written-label boundary exception.

## User intent

Review tasks on a subdued background, find relevant information and recognize an available action or problem without interpreting decorative color. Choose light/dark and distinct status colors while keeping the same hierarchy and readable text.

## Agent intent

Implementation agents must use the semantic roles and declaration ledger, keep normal structural areas neutral and verify every supported appearance. Runtime agents do not change the user's appearance or interpret chat/task states as industrial process alarms through this spec.

## Standards interpretation

Reviewed 2026-10-29 against the [ISA-101 series catalog](https://www.isa.org/standards-and-publications/isa-standards/isa-101-standards). Its current listing identifies ISA-101.01-2015 as the core standard, with ISA-TR101.01-2022 for HMI philosophy and ISA-TR101.02-2019 for usability and performance. [ISA's InTech discussion](https://www.isa.org/intech-home/2023/april-2023/features/how-dcs-migration-improves-operator-experience) describes grayscale backgrounds and restrained color as part of a broader approach including information hierarchy and operator needs.

This app borrows those visual principles for a task/chat interface. Exact RGB values below are project decisions, not prescriptions from the ISA standard. The published catalog and article do not establish conformance of this app. Dark mode is a separately checked adaptation for user preference, not an ISA requirement. Background color alone does not establish reduced fatigue or better performance; ambient lighting, displays and real use need review.

## Structural decisions

The values below are identical between standard and distinct status preferences at the same brightness. Equal RGB channels deliberately remove hue from the normal operating background. All text and controls retain their independent contrast requirements in [PALETTES.md](PALETTES.md).

| Role | Light | Dark | Purpose and user intent |
| --- | --- | --- | --- |
| canvas | #d9d9d9 | #242424 | Provide a gray/charcoal working field instead of an almost-white or green-tinted page; let work and meaningful cues take visual priority. |
| surface | #e6e6e6 | #2e2e2e | Separate panels, navigation, editing fields, table cells and dialogs with a nearby gray; avoid large white cards or colored panel fields. Content and spacing carry the grouping alongside a divider. |
| subtle | #dedede | #383838 | Group table headings, help blocks and secondary hover feedback without suggesting success or warning. |
| ink | #242424 | #ededed | Keep ordinary values and headings neutral and readable across all structural surfaces. |
| muted | #505050 | #c2c2c2 | De-emphasize metadata through measured luminance, retaining ordinary text contrast. |
| border | #737373 | #a3a3a3 | Identify controls and routine guidance with neutral boundaries; control edges meet at least 3:1 on approved adjacent backgrounds. |
| divider | #b8b8b8 | #585858 | Separate passive groups without giving every row a heavy control boundary; spacing and semantics also identify groups. |
| disabled / disabled-bg | #505050 / #d2d2d2 | #c2c2c2 / #404040 | Keep unavailable actions legible and neutral; native disabled behavior and adjacent explanation communicate availability. |
| success-bg / warning-bg | #dedede | #383838 | Group short state labels without painting normal completion or pending review as a large colored field. Explicit words, foreground cues and optional line patterns carry the distinction. |
| modal backdrop | #00000080 | #00000080 | Dim inactive content with approximately 50% neutral black; avoid introducing a green cast over the page. The native dialog and focus behavior identify the active decision. |

Canvas, surface and subtle sit within 24 RGB channel steps in light mode and 20 in dark mode. This bounded separation is a project review constraint to keep structural fields subdued, not a text contrast target. Neither white nor black is used for large opaque structural fills. White may still be an action label. Muted surfaces must never be implemented by lowering the whole page's opacity, which would also reduce content contrast.

## Color allocation and hierarchy

- Keep color on compact actionable elements, links, native selected marks, focus perimeters and explicit state foregrounds. The primary-action role must not become a decorative section, header or panel fill. The reference color samples are intentionally labeled token demonstrations, not a normal application layout recipe.
- Routine guidance uses a gray boundary and background. A guidance block is not automatically a warning. Confirmed and pending statuses use small text labels on gray; avoid large green/amber success or pending banners.
- Error words, linked validation messages and visible focus retain prominence. Distinct status mode uses its separate foreground palette plus solid/dashed state boundaries. Every combination remains usable without hue as the sole cue; native forced colors remains authoritative.
- Preserve the existing task/support hierarchy, headings, spacing and progressive access to support information. Do not copy industrial display levels or alarm priorities into this app without a corresponding product need and separate design.
- Quiet inline inputs continue to reveal their existing border and focus outline on focus. Background muting must not make them unreadable or change Save/Cancel/draft behavior.

## Maintainer review and evidence

Every affected CSS token and consumer retains its stable ID and purpose/intent in [CSS-DECISIONS.md](CSS-DECISIONS.md). `palettes.mjs` owns exact values, `system.mjs` owns declarations/rationale and `build.mjs` generates deployed CSS plus all four DESIGN.md documents. Do not patch generated colors separately.

Automated checks require achromatic structural roles, equal structural colors across status preferences, nearby bounded background levels, and all 120 required foreground/background checks, including text on bounded semantic accent fills. The 24 labelled primary-button normal/hover fill/background observations are published separately under their bounded exception; they are not asserted to pass a 3:1 boundary target. Chrome checks resolve actual component colors, retain focus/editing behavior and exercise color-vision simulations and forced colors. See [VALIDATION.md](VALIDATION.md) for the actual run and limits.

Review desktop/mobile in all four appearances under realistic lighting. Confirm that normal backgrounds recede, state words and focus remain easy to find, and panel grouping is clear without hue. Rework the palette and its per-declaration rationale if any purpose or user intent is rejected; passing arithmetic does not decide visual appropriateness.
