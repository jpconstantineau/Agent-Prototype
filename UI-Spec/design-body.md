## Overview

Daylist helps people review work, change it deliberately, and understand what an assistant actually did. The interface should feel calm, concrete and inspectable. Its green identity connects primary actions to the existing app; neutral surfaces leave content in charge. This is an implementation proposal, not evidence that maintainers or users have approved these choices.

Read this file before generating reference UI. Use the exact tokens above and the Bootstrap subset in [system.mjs](system.mjs). Read [COMPONENTS.md](COMPONENTS.md) for native HTML and click-to-edit behavior. Every shipped declaration, including the copied Bootstrap grid, has its own purpose and user intent in [CSS-DECISIONS.md](CSS-DECISIONS.md). Additions need the same coverage. Browser tests cannot decide whether the stated intent is the right product decision; use [REVIEW.md](REVIEW.md) to challenge and revise it.

## Colors

Use semantic roles, not approximate hex values or arbitrary Bootstrap contextual colors. Primary is deep green for deliberate actions; ink is for sustained reading. Muted text remains readable body information. White surfaces sit on a warm neutral canvas. Focus blue has a separate meaning from action green. Error, success and pending states require words as well as color. Border has control-boundary contrast; divider is only for noninteractive grouping. Disabled controls remain legible and need a nearby explanation.

The executable contrast matrix in system.mjs specifies permitted pairings, including 4.5:1 ordinary text and 3:1 control boundaries/focus against their adjacent light surfaces. Do not assume any two palette colors may be combined. No gradients or image-backed text are supplied. The current palette is light; native forced-color preferences remain active. A future dark theme requires a complete paired palette and its own contrast/reflow review rather than automatic inversion.

## Typography

Use installed system fonts, a 1rem body and unitless 1.5 line height. At the normal 16px root, body is 16px and secondary copy is 14px. The browser default size remains authoritative. Heading levels carry document meaning; typography classes must not replace heading order. Page title is 2rem, section title 1.5rem and local heading 1.125rem. Use 600 weight for headings and actionable labels, 400 for ordinary values. Never use all caps or extra tracking as the only hierarchy cue.

Keep explanatory prose within 65ch. Short labels may remain shorter; a table is not a paragraph. Long names wrap, numbers use tabular figures when supported, and text spacing/zoom must not hide content. Let platform font rendering work normally; no antialiasing overrides, remote font blocking, fixed-height text boxes or font-size reset on html.

## Layout

The framework uses literal Bootstrap 5.3.8 flex-grid declarations for container, row and selected responsive columns, then explicit project component styles. It is an audited subset, not the full Bootstrap bundle. The CSS is local, with no CDN runtime request, Bootstrap JavaScript, Sass build or component framework required by the page.

Below 768px, columns stack in source order. At md (768px), paired panels can take half widths. At lg (992px), the work/support pair takes eight/four of twelve columns. The container is fluid to a 75rem cap; the 24px gutter remains consistent. The reference uses these two meaningful breakpoints rather than shipping every unused utility. Breakpoints are viewport widths, not tests for a particular device. Content with long translations must still wrap.

Spacing is a 4px-based rem scale: 4, 8, 12, 16, 24, 32 and 48px at the default root. Use 8–12px inside controls, 16px between related controls, 24px between peer panels, and 48px between major topics. Each concrete consumer is justified in the CSS ledger. Native grid and flexible stacks handle content growth; avoid absolute-positioned form fields, fixed-height cards and changing visual order independently of the DOM.

## Elevation & Depth

Use a surface fill and a single divider for ordinary grouping. No ornamental shadows, sticky page header or high z-index ladder is required. Native dialog uses the browser top layer and its backdrop; inactive content is dimmed to show which decision owns input. Its height is bounded by the dynamic viewport and its content can scroll. The skip link uses only the minimal local stacking needed to appear over the ordinary header. Do not create a competing overlay with a larger arbitrary z-index.

## Shapes

Use 0.375rem corners for controls and compact states, 0.75rem for containing panels and dialogs. Shapes express component scale, not success or failure. Inputs and buttons have a 2.75rem minimum target height, not a fixed height; native choice marks have larger associated labels. Focus uses a 3px outline with a 3px offset. Keep native select arrows, disclosure markers, checkbox marks and date pickers. Never make an interactive region discoverable only by hovering or by a cursor change.

## Components

Use semantic header/nav/main/footer landmarks; named sections; native links for destinations; buttons for actions; details/summary for local disclosures; dialog for a real blocking decision; progress with an associated label; tables with caption and scoped headers; and real labels and fieldsets for forms. The supported Bootstrap vocabulary is deliberately small: container, row, col-md-6, col-lg-8, col-lg-4, card, btn/btn-primary, form-control/form-select, table/table-responsive. Project classes use ui-; do not assume omitted Bootstrap utilities exist.

Click-to-edit means a native summary displays the field name, saved value and visible Edit cue. Opening reveals a real form with a persistent label, help, constraints, Save and Cancel. It does not mean a clickable div, placeholder as a label, disabled input as plain text, or contenteditable. Keep read and draft values separate. Save validates before updating the read value; Cancel/Escape explicitly restores the saved value. Blur and outside clicks never commit. Unsaved closing is held open with an explanation when JavaScript is active; no-JavaScript disclosure remains natively usable and retains its input draft. Changes in the reference page are page-memory demonstrations only.

Comparison tables retain their two-dimensional relationships in a labeled, keyboard-focusable horizontal scroll region on narrow screens. Ordinary record editing stays in the single-column review form. Do not turn table elements into block cards or apply ARIA grid unless the full grid keyboard interaction is actually implemented. Use textual empty/error/pending/saved states and one relevant recovery action. Technical endpoint configuration and diagnostic evidence belong in support surfaces, not every task workflow.

## Do's and Don'ts

- Do read purpose and user intent before changing a declaration. Do revise the rationale, exact value, demonstration and verification together after reviewer disagreement.
- Do use the native HTML baseline first, retain visible labels and focus, and keep actions explicit. Do test keyboard, touch, constrained width, text spacing, zoom, no JavaScript and forced colors.
- Do use generated CSS and the checked-in token source. Do treat the Google format and source recommendations as inputs to a project decision rather than a guarantee of usability.
- Don't add a CSS property for vague polish or consistency alone. Identify the concrete user action, failure prevented, scope and verification.
- Don't import a full CSS framework, add inline styles, set arbitrary style properties in JavaScript, hide overflow at the page level, remove focus, use CSS-generated essential text, or silently save on blur.
- Don't interpret passing automated checks as maintainer approval, assistive-technology certification or user research. Unresolved purpose/intent disagreements require rework.
