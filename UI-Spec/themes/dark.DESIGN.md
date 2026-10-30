---
version: "alpha"
name: "Daylist · clear work · Dark · standard · normal"
description: "A Bootstrap-based, native HTML interface for reviewing work and making deliberate changes."
colors:
  primary: "#006aa8"
  primary-hover: "#005686"
  ink: "#ededed"
  muted: "#c2c2c2"
  canvas: "#242424"
  surface: "#2e2e2e"
  subtle: "#383838"
  border: "#a3a3a3"
  divider: "#585858"
  focus: "#409fea"
  danger: "#f58276"
  success: "#4fc685"
  success-bg: "#383838"
  warning: "#eab54d"
  warning-bg: "#383838"
  disabled: "#c2c2c2"
  disabled-bg: "#404040"
  on-primary: "#ffffff"
  interactive: "#40adf0"
  on-interactive: "#242424"
typography:
  document-h1:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
  document-h2:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
  document-h3:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  document-h4:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  document-h5:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  document-h6:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  heading:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  small: "0.375rem"
  panel: "0.75rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  section: "2rem"
  page: "3rem"
components:
  document-h1:
    textColor: "{colors.ink}"
    typography: "{typography.document-h1}"
  document-h2:
    textColor: "{colors.ink}"
    typography: "{typography.document-h2}"
  document-h3:
    textColor: "{colors.ink}"
    typography: "{typography.document-h3}"
  document-h4:
    textColor: "{colors.ink}"
    typography: "{typography.document-h4}"
  document-h5:
    textColor: "{colors.ink}"
    typography: "{typography.document-h5}"
  document-h6:
    textColor: "{colors.ink}"
    typography: "{typography.document-h6}"
  page:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  help:
    textColor: "{colors.muted}"
    typography: "{typography.small}"
  notice:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.ink}"
    padding: "{spacing.lg}"
  status-saved:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success}"
    rounded: "{rounded.small}"
  status-pending:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning}"
    rounded: "{rounded.small}"
  control-disabled:
    backgroundColor: "{colors.disabled-bg}"
    textColor: "{colors.disabled}"
  error-message:
    textColor: "{colors.danger}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.small}"
    padding: "0.5rem 1rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.xl}"
  input-editing:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.small}"
    height: "2.75rem"
  link:
    textColor: "{colors.interactive}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.interactive}"
    rounded: "{rounded.small}"
  switch-on:
    backgroundColor: "{colors.interactive}"
  switch-thumb-on:
    backgroundColor: "{colors.on-interactive}"
---

## Overview

This token document resolves **Dark · standard / normal density**. Component references bind to these values; compact minimum heights describe fine-pointer use, with the protected 44px-at-default-root coarse/no-pointer minimum in the shared CSS. Shared rules and review remain in the parent UI-Spec folder.

Daylist helps people review work, change it deliberately, and understand what an assistant actually did. The interface should feel calm, concrete and inspectable. An achromatic gray canvas and nearby gray panels keep large areas quiet, inspired by ISA-101 high-performance HMI principles. The maintainer-selected azure identifies compact written-label primary actions in every appearance without a permanent outline. Individual declaration purposes and user intents remain subject to maintainer review.

Read this file before generating reference UI. Use the exact tokens above and the Bootstrap subset in [system.mjs](../system.mjs). Read [COMPONENTS.md](../COMPONENTS.md) for native HTML and click-to-edit behavior. Every shipped declaration, including the copied Bootstrap grid, has its own purpose and user intent in [CSS-DECISIONS.md](../CSS-DECISIONS.md). Additions need the same coverage. Browser tests cannot decide whether the stated intent is the right product decision; use [REVIEW.md](../REVIEW.md) to challenge and revise it.

## Colors

Use semantic roles, not approximate hex values or arbitrary Bootstrap contextual colors. Primary is azure #006aa8 with white written labels in both brightness modes; hover uses the related deeper #005686. Brightness and distinct-status preferences select complete role palettes while retaining these action fills. Interactive is a separate related blue for readable links, secondary-action labels and native selection marks; on-interactive contrasts the selected switch thumb. Do not reuse the primary fill as ordinary dark-page text. [COLOR-SELECTION.md](../COLOR-SELECTION.md) records the seed, monochromatic selection method, exact decisions and bounded button-boundary exception. No separate secondary or tertiary brand hue is implied.

Ink is for sustained reading. Muted text remains readable body information. Light mode uses a medium-light gray canvas and slightly lighter gray panels; dark mode uses charcoal with nearby gray panels. Structural surfaces, supporting text, dividers, disabled fills and routine guidance boundaries are achromatic in all four combinations. Success and pending labels also use neutral backgrounds. Reserve color for compact actions, focus and explicit state foregrounds; never tint entire sections to decorate normal activity. Error, success and pending states require words as well as color. Border has control-boundary contrast; divider is only for noninteractive grouping. Disabled controls remain legible and need a nearby explanation.

Read [HMI-PHILOSOPHY.md](../HMI-PHILOSOPHY.md) for the source interpretation, exact gray choices and review criteria. These are project-selected web palettes inspired by ISA-101 and ISA-published high-performance HMI guidance, not mandated ISA RGB values or a conformance claim. The light palette is the reference baseline; dark mode is a user preference requiring its own checks. Muting background color must never reduce reading contrast or hide actionable states.

Dark-mode focus and state foregrounds use richer midtones rather than pale tints: azure-blue focus, coral error, green success and golden pending in standard mode; the same azure-blue focus, violet error, blue success and golden pending in distinct mode. Dark distinct focus must not use a second amber close to pending. Keep these colors on compact cues and neutral status backgrounds. Their exact decisions and measured contrast are recorded in COLOR-SELECTION.md. Stronger color must not become a glow, large colored panel or substitute for state wording and focus semantics. Color patches and their captions use the same resolved tokens as the controls.

Both light modes share the preferred standard focus blue #005fcc. Distinct-status mode inherits this focus role while errors retain violet #6d2498. A focused invalid field shows the separate offset blue ring, violet border and textual error together; changing status colors must not change the keyboard destination cue. The ring exceeds 3:1 against every permitted light background. Focus remains a separately governed role from the primary fill. Both dark modes likewise share focus #409fea.

The executable contrast matrix in system.mjs specifies permitted pairings, including 4.5:1 ordinary text and 3:1 required control boundaries/focus against their adjacent palette surfaces. A native primary button identified by its visible written action label may have a lower-contrast fill/background edge under the explicit contrastExceptions contract; its label and keyboard focus requirements are unchanged. Transparent borders preserve size in normal and hover states. The exception never applies to selection marks, inputs, icon-only controls or focus. Do not assume any two palette colors may be combined. No gradients or image-backed text are supplied. Four resolved combinations are supplied: light/standard, dark/standard, light/distinct and dark/distinct. Read [PALETTES.md](../PALETTES.md) for every value, passing pair and separate boundary observation. Two native checkbox-based slider switches independently choose Dark mode and Distinct status colors. The optional blue/amber status palette also adds solid/dashed state boundaries; it does not claim to represent every color-vision difference. All four modes use explicit words, visible focus and native state semantics. Native forced-color preferences remain authoritative.

## Typography

Use installed system fonts, a 1rem body and unitless 1.5 line height. At the normal 16px root, body is 16px and secondary copy is 14px. The browser default size remains authoritative. Heading levels carry document meaning; typography classes must not replace heading order. Page title is 2rem, section title 1.5rem and local heading 1.125rem. Use 600 weight for headings and actionable labels, 400 for ordinary values. Never use all caps or extra tracking as the only hierarchy cue.

Opt-in document content uses `.ui-prose`: h1–h6 sizes are 2 / 1.75 / 1.5 / 1.25 / 1.125 / 1rem with weight 600 and protected type across densities. [CONTENT.md](../CONTENT.md) defines the precise hierarchy, block and list rhythm, inline meaning, code, tables, figures and native disclosures. Its specimen is authored HTML; CSS support never expands the Markdown dialect or supplies agent authority.

Keep explanatory prose within 65ch. Short labels may remain shorter; a table is not a paragraph. Long names wrap, numbers use tabular figures when supported, and text spacing/zoom must not hide content. Let platform font rendering work normally; no antialiasing overrides, remote font blocking, fixed-height text boxes or font-size reset on html.

## Layout

The framework uses literal Bootstrap 5.3.8 flex-grid declarations for container, row and selected responsive columns, then explicit project component styles. It is an audited subset, not the full Bootstrap bundle. The CSS is local, with no CDN runtime request, Bootstrap JavaScript, Sass build or component framework required by the page.

Below 768px, columns stack in source order. At md (768px), paired panels can take half widths. At lg (992px), the work/support pair takes eight/four of twelve columns. The container is fluid to a protected 75rem cap; the shared gutter is 24px normal or 16px compact at the default root. The reference uses these two meaningful breakpoints rather than shipping every unused utility. Density does not change breakpoints or source order. Breakpoints are viewport widths, not tests for a particular device. Content with long translations must still wrap.

Normal spacing uses the 4px-based rem steps 4, 8, 12, 16, 24, 32 and 48px at the default root; compact uses the explicit 4, 6, 8, 12, 16, 24 and 32px profile. Margins separate topics, padding insets content and one parent gap owns peer separation. Reset child margins inside stacks/field grids and the final margin in an ordinary panel so they do not duplicate the owner's gap or padding. A field's label/value/help gap stays at least 6px to clear the offset focus perimeter. Read [BOX-MODEL.md](../BOX-MODEL.md) for every owner and protected setting and [BOX-MODEL-AUDIT.md](../BOX-MODEL-AUDIT.md) for the exhaustive declaration inventory. Native grid and flexible stacks handle content growth; avoid absolute-positioned fields, fixed-height cards, page zoom/transforms or smaller text to create density.

## Elevation & Depth

Use a surface fill and a single divider for ordinary grouping. No ornamental shadows, sticky page header or high z-index ladder is required. Native dialog uses the browser top layer and its backdrop; inactive content is dimmed to show which decision owns input. Its height is bounded by the dynamic viewport and its content can scroll. The skip link uses only the minimal local stacking needed to appear over the ordinary header. Do not create a competing overlay with a larger arbitrary z-index.

## Shapes

Use control/panel corners of 0.375/0.75rem normally or 0.25/0.5rem compact. Shapes express component scale, not success or failure. Inputs and buttons have minimum target heights of 2.75rem normally or 2.25rem compact with fine pointers; compact coarse/no-pointer surfaces retain the 2.75rem floor. Token-document height fields describe these minima, never fixed heights. Native choice marks have larger associated labels. Ordinary boundaries stay 1px, guidance strokes reduce from 4 to 3px and switch strokes from 2 to 1px. Focus stays a 3px outline with a 3px offset. Keep native select arrows, ordinary checkbox marks and date pickers. Appearance/density sliders retain native checkbox behavior and role=switch; forced colors restores their native marks. Never make a control discoverable only by hovering or by a cursor change.

## Components

Use semantic header/nav/main/footer landmarks; named sections; native links for destinations; buttons for actions; details/summary only for unrelated optional disclosures, never as the inline editing mechanism; dialog for a real blocking decision; progress with an associated label; tables with caption and scoped headers; and real labels and fieldsets for forms. The supported Bootstrap vocabulary is deliberately small: container, row, col-md-6, col-lg-8, col-lg-4, card, btn/btn-primary, form-control/form-select, table/table-responsive. Project classes use ui-; do not assume omitted Bootstrap utilities exist.

Click-to-edit means the prefilled input itself looks like ordinary information until it receives focus. Use a persistent label and a real input/textarea/select; reserve its border width and padding, then set only border color and background transparent while unfocused. CSS :focus restores the input surface, contrast-tested border and focus perimeter for pointer, touch and keyboard. No disclosure, duplicated saved-value label, readonly toggle, element replacement, contenteditable or JavaScript focus styling is involved. The value stays in the same DOM node. A linked validation error and the user’s forced-color preference are explicit exceptions that may keep a boundary visible after blur.

The example saves one record through its visible Save changes button; Cancel changes/Escape restores its last accepted values. Blurring never commits, hides a draft or reverts it. Textareas retain native newline behavior, inputs retain native form submission and IME composition is not cancelled by Escape handling. Without JavaScript, CSS focus treatment and prefilled controls still work; demonstration Save/Cancel and preference selection are disabled with an explanation and normal density remains the fallback. Example record changes are page memory only. Three independent appearance preferences persist under the reference-page localStorage key: brightness, distinct status colors and normal/compact density. Legacy two-preference records retain their color choices and default to normal density. Changing density preserves the same input nodes, drafts, errors and focused switch. Four palettes and two densities yield eight resolved token documents.

Comparison tables retain their two-dimensional relationships in a labeled, keyboard-focusable horizontal scroll region on narrow screens. Ordinary record editing stays in the single-column review form. Do not turn table elements into block cards or apply ARIA grid unless the full grid keyboard interaction is actually implemented. Use textual empty/error/pending/saved states and one relevant recovery action. Technical endpoint configuration and diagnostic evidence belong in support surfaces, not every task workflow.

## Do's and Don'ts

- Do read purpose and user intent before changing a declaration. Do revise the rationale, exact value, demonstration and verification together after reviewer disagreement.
- Do use the native HTML baseline first, retain visible labels and focus, and keep actions explicit. Do test keyboard, touch, constrained width, text spacing, zoom, no JavaScript and forced colors.
- Do use generated CSS and the checked-in token source. Do treat the Google format and source recommendations as inputs to a project decision rather than a guarantee of usability.
- Don't add a CSS property for vague polish or consistency alone. Identify the concrete user action, failure prevented, scope and verification.
- Don't import a full CSS framework, add inline styles, set arbitrary style properties in JavaScript, hide overflow at the page level, remove focus, use CSS-generated essential text, or silently save on blur.
- Don't interpret passing automated checks as maintainer approval, assistive-technology certification or user research. Unresolved purpose/intent disagreements require rework.
