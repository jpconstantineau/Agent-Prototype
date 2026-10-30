# Box model, margins and content density

## Purpose

Give every space-setting a concrete purpose, make one component responsible for each visible gap, and provide normal/compact density without shrinking the whole page. This contract governs margins, padding, gaps, gutters, borders, radii, dimensions and protected reading/interaction geometry. [BOX-MODEL-AUDIT.md](BOX-MODEL-AUDIT.md) is the exhaustive generated declaration inventory; [CSS-DECISIONS.md](CSS-DECISIONS.md) retains all CSS declarations, including colors and behavior.

## User intent

Fit more useful content on screen when desired, while reading at the same text size, finding group boundaries and focus, and activating controls reliably. Change density independently of brightness/status colors without losing drafts.

## Agent intent

Implementation agents choose a space owner and an existing density token before adding CSS. They update the recorded purpose, user intent, source, examples and checks together. Runtime application agents do not change appearance preferences or user data through this spec. Passing tests establish traceability and bounded behavior; a maintainer still judges whether the reason is persuasive.

## What each box layer does

`box-sizing: border-box` means declared dimensions include padding and border. Content retains its own reading size. Padding separates content from its containing edge. A border identifies a boundary or state. Margin separates a box from a neighboring group; it is not extra internal padding. A parent's gap separates its children without relying on their margins. Outline draws focus outside the box and does not take layout space; the existing 3px outline plus 3px offset requires 6px of surrounding clearance.

These roles must not be substituted arbitrarily. Do not use a transform/zoom, body font reduction, negative decorative margins, clipped overflow or hidden labels to create compact mode. Use native controls and the same DOM in both modes.

## Margin and gap ownership audit

| Location / owner | Normal → compact at a 16px root | Reason and user intent |
| --- | --- | --- |
| Body margin | 0 → 0 | The Bootstrap container supplies the outer gutter; a second body margin would duplicate it. |
| Container inline auto margins | auto → auto | Center the capped document. Free viewport space is not a spacing token to squeeze or a reason to widen reading lines. |
| Heading bottom margin | 16 → 12px | Connect a heading to its following content, retaining a clear topic boundary. Top/side margins stay zero to prevent cumulative empty space. |
| Paragraph/list bottom margin | 16 → 12px | Separate ordinary reading blocks. Their top margin stays zero so two adjacent paragraphs do not each add a full gap. |
| `.ui-stack` children | bottom margin 0 in both; parent gap 24 → 16px | One parent owns peer separation. Children must not add a paragraph/heading margin to that gap. |
| Ordinary panel's final child | bottom margin 0 in both | Panel padding owns the final inset; remove the previously redundant last-paragraph margin. Stack panels already apply their own child reset. |
| Inline field children | block margins 0 in both; row gap 8 → 6px | A field is now an explicit grid of label, value, help and error. This replaces hidden paragraph-margin contributions and clears the offset focus ring between rows. Hidden errors do not reserve a row or gap. |
| Field block padding | 12 → 8px per block side | Separate neighboring values from the field divider. This insets the row group inside its field boundary; it is separate from the label/value row gap. |
| Section start margin | 48 → 32px | Make a change of topic recognizable while compact mode reduces repeated scrolling. |
| Anchor scroll margin | 16 → 12px | Keep the section heading away from the viewport edge after anchor navigation; it does not add document-flow height. |
| Appearance group start margin | 24 → 16px | Separate preferences from navigation without merging their purposes. |
| Legend bottom margin | 8 → 6px | Associate a named question with the following option group. |
| Fieldset margin/padding/border | 0 in both | The surrounding panel and named legend provide grouping; native semantics do not require a duplicate frame. |
| Bootstrap row negative margins and child top gutters | Derived from 24 → 16px gutters | Cancel the outer half-gutters/first-row gutter while preserving column alignment. These structural negative margins are not decorative compression. Keep the six pinned Bootstrap rules literal; project overrides own the active gutter values. |
| Footer paragraph bottom margin | 16 → 12px | With no extra footer padding, leave a small closing clearance after its final text. Main's separate 48 → 32px bottom padding separates the document from that footer. |

Ordinary block margins can collapse; flex/grid child margins do not. The design does not rely on adding two collapsing margins to calculate a gap. Stack/field resets and explicit gap owners make the repeated groups predictable. See the [CSS margin-collapse rules](https://www.w3.org/TR/CSS22/box.html#collapsing-margins).

## Density values and reasons

`density.mjs` is authoritative. Every entry includes normal/compact values, purpose and user intent. All rem values respond to the user's root text preference; pixel equivalents below assume 16px. Normal remains the default and the no-JavaScript fallback.

| Setting | Normal | Compact | Reason |
| --- | --- | --- | --- |
| xs | 4px | 4px | Preserve a minimum inset around small state labels. |
| sm | 8px | 6px | Tight related content while retaining clearance for the 6px focus extent. |
| md | 12px | 8px | Local field/cell/action separation. |
| lg | 16px | 12px | Body-block separation and local insets. |
| xl | 24px | 16px | Peer gaps, panel/dialog insets and horizontal/vertical Bootstrap gutters. |
| section | 32px | 24px | Page entry and empty-state clearance. |
| page | 48px | 32px | Major topic separation and trailing document room. |
| Small / panel radius | 6 / 12px | 4 / 8px | Retain the scale difference between a control and its container with tighter corners. |
| Control minimum height | 44px | 36px for fine pointers; 44px for coarse/no pointers | More desktop content while retaining comfortable touch/hybrid targets. These are minima, never fixed heights. |
| Control block padding | 8px | 4px | Reduce interior clearance while keeping the normal 16px body/control text and 1.5 line height. A short compact control still grows to its minimum. |
| Notes minimum | 112px | 88px | Preserve a multi-line viewport with native rows/resizing, recovering excess initial height. |
| Guidance emphasis stroke | 4px | 3px | Keep a neutral guidance cue with less visual weight. |
| Switch stroke | 2px | 1px | Use a crisp integer-pixel boundary rather than a fractional hairline. |
| Switch track / thumb | 48×28 / 18px | 40×24 / 16px | Retain two clear thumb positions inside the larger clickable label. Both keep 2px inner padding. Travel is computed as width − two borders − two insets − thumb: 22 / 18px. |
| Color-patch height | 48px | 40px | Keep colors inspectable while recovering demonstration space. |
| Dialog viewport clearance | 16px each side | 12px each side | Preserve a visible modal edge while fitting more content; content can scroll within the dynamic viewport. |

Normal uses the existing 4px-based scale; compact uses an explicit 2px rhythm where useful. It is not a universal percentage reduction. Values such as auto, zero, 100%, breakpoint fractions, 65ch prose measure, the 75rem container cap and the 36rem comparison-table minimum retain structural purposes and do not shrink.

## Protected boundaries and reading space

Most component borders are already **1 CSS pixel**: input/secondary-button boundaries, panel/table/field dividers, status patterns and empty placeholders. They stay 1px in both modes. Smaller fractional borders would save negligible space and can render unevenly. Primary buttons retain their transparent reserved border and the existing written-label contrast exception. Focus stays **3px with a 3px offset**. Text size, line height, native 20px choice marks, native form affordances and forced-color semantics do not shrink.

Compact's 36px fine-pointer minimum is a project choice above the [WCAG minimum target-size rule](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html); this is not a claim that WCAG requires 36 or 44px. The `(any-pointer: coarse), (pointer: none)` override restores the normal 44px-at-default-root target floor on touch, hybrid and no-pointer surfaces while retaining compact content spacing. Choice/switch labels supply the full hit target around their smaller marks. Minimum inline sizes must also remain sufficient; labels and buttons in this reference meet at least 36×36 or 44×44 as appropriate. Inline prose links retain their applicable native inline treatment.

## UI, persistence and token mapping

The **Compact mode** native checkbox-based switch joins Dark mode and Distinct status colors in the reference appearance group. Off selects normal; on selects compact. Root `data-density` controls CSS variables. Density is independent of the four color palettes, giving eight resolved appearance/density combinations. It neither changes the viewport breakpoints nor enters prompts, task data or the app's production settings.

The reference-specific `daylist-ui-reference-appearance-v1` record now stores `{theme, vision, density}` with density `normal` or `compact`. Existing records containing only theme/vision retain those choices and default to normal density; missing/invalid density also defaults to normal. Invalid theme/vision uses the existing system-brightness fallback. Denied storage keeps preferences usable in memory and reports that they cannot be remembered. No JavaScript leaves normal spacing and disables the preference controls.

Changing density keeps the same input nodes, current drafts, validation state and focused preference control. It does not save or cancel a record. Density changes may reflow the page; no content is hidden, ellipsized or reordered to make it appear denser. Normal/compact token documents in themes/ describe resolved values, with protected pointer adaptation explained alongside their minimum control dimensions.

## Maintainer review and tests

The generated audit lists every authored box-setting declaration, including structural resets, type rhythm and copied framework geometry. Each row identifies its scope, ownership policy, normal/compact expressions, purpose and user intent. New length-valued custom properties must be registered in the density contract; new declarations must retain full ledger rationale. Inspect shorthands for all longhands they reset. Root token IDs and existing rule/tuple IDs remain stable; new declarations are appended or assigned new rule IDs.

Tests verify audit coverage and rejected unregistered/missing decisions; exact generated output and Google-format documents; every custom-property consumer; actual normal/compact margins, padding, gutters, strokes and field gaps; stable input geometry across focus; preserved drafts/preferences; real reduction in form/table height without reducing type; all eight combinations; and a coarse-pointer target floor, text enlargement, forced colors and narrow viewports. See VALIDATION.md for actual results. These checks cannot prove a purpose is persuasive; rejected intent still requires rework.
