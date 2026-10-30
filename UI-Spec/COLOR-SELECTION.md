# Azure actions and readable blue accents

## Purpose

Record the maintainer's selected azure and borderless button treatment, how related colors are chosen, and the bounded contrast exception that makes this treatment explicit. Prevent one brand color from being reused as unreadable text or a low-contrast selection mark.

## User intent

Recognize a clear blue primary action on muted gray/charcoal surfaces, without a permanent outline or a pale dark-mode fill. Read links, distinguish checked choices and find keyboard focus in either appearance.

## Agent intent

Implementation agents use the role-specific tokens, preserve the visible-label/focus conditions and update rationale plus checks with any color change. Runtime agents do not select themes or reinterpret semantic status colors through this spec.

## Selected direction and selection method

The maintainer selected **azure #006AA8** from the light-mode comparisons and accepted the same fill on charcoal without a permanent contrasting outline. Earlier inherited forest green, indigo/petrol candidates and pale dark-mode primary fills are superseded. The original green had continuity and contrast rationale but no documented color-wheel derivation.

The resulting method is **a role-based monochromatic blue palette**, anchored in that selected seed. Related hover and interactive colors stay approximately within 201–203 degrees of HSL hue; their lightness and saturation are adjusted for actual use, then the resulting sRGB values are checked against every permitted adjacent surface. This describes a restrained hue family, not a claim that equal HSL steps have equal perceived brightness. No complementary/triadic scheme, new secondary hue or tertiary hue was selected.

| Role | Light | Dark | Purpose and user intent |
| --- | --- | --- | --- |
| primary | #006aa8 | #006aa8 | Preserve the selected azure filled action in both appearances. Use for compact, visibly labelled primary buttons; not ordinary text or large panel fills. |
| primary-hover | #005686 | #005686 | A deeper related azure confirms pointer targeting without moving the button or introducing an outlined/pastel state. |
| on-primary | #ffffff | #ffffff | Keep the written button label readable: 5.79:1 on the normal fill and 7.85:1 on hover. |
| interactive | #005b90 | #40adf0 | Use a deeper blue for links and secondary-action labels on light grays and a brighter saturated blue on dark grays. Both meet 4.5:1 on canvas/surface/subtle. Native selected accents and switch tracks also use this role because they must remain distinguishable from adjacent surfaces. This does not change the selected primary fill. |
| on-interactive | #ffffff | #242424 | Keep the selected slider thumb at least 3:1 against the interactive track. Also provide text at least 4.5:1 against the five checked information/status/identity fills in the component catalog. The primary-button label keeps its separate on-primary role; native checkbox/radio marks stay browser-owned. |

The Distinct status colors preference changes state colors and line patterns, not focus, primary, hover or interactive roles. Focus is shared between standard/distinct at each brightness. A secondary button retains a neutral surface, neutral boundary and interactive-blue label. “Secondary action” is an emphasis level, not an extra brand hue. There is no tertiary brand accent until a concrete use case and rationale are approved. Success/warning/error remain semantic roles; neutrals are selected for reading/grouping, not from a color-wheel harmony rule. [PALETTES.md](PALETTES.md) records exact values and pairings in every combination.

## Shared light focus and distinct-mode error separation

The maintainer preferred standard light-mode focus and requested the same color in the distinct-status appearance. Both light modes now use **blue #005fcc**, inherited from the standard light palette. This supersedes the interim distinct-mode azure #006aa8 and the earlier focus violet #7025b4 that was too close to error violet #6d2498. Error remains violet in light/distinct mode. Changing status preferences must preserve the keyboard destination cue.

The focus outline remains 3px with a 3px offset. Its contrast is 4.24:1 on canvas, 4.80:1 on surface and 4.45:1 on subtle, exceeding the required 3:1 on all approved light backgrounds. Focus remains a separate role from primary fill #006aa8. The offset neutral gap identifies the ring around an azure button; an invalid field retains a violet border plus error wording inside the separate blue focus perimeter. Neither condition relies on hue alone, and forced colors still uses the system focus palette.

The unit checks require standard/distinct focus equality at each brightness. Four-appearance browser checks cover actual color-patch fills, hex captions and the focus ring. The light/distinct case also submits a blank field and checks that the focused invalid input simultaneously retains its shared blue outline, violet error border and linked error text. Only the light/distinct focus value changes in this revision; other palette values retain their prior contracts.

## Dark distinct-mode focus and pending separation

The maintainer found dark distinct-mode amber focus #e5af3b too close to pending #eab54d. Focus now uses **azure-blue #409fea**, matching standard dark-mode focus and staying in the selected primary family. Pending keeps its golden amber. Focus has 5.44:1 contrast on canvas, 4.76:1 on surface and 4.11:1 on subtle, exceeding its 3:1 requirement on every approved dark background. The focus outline retains its separate 3px perimeter and 3px neutral offset; pending retains its written label and dashed status boundary.

The color patches and their hex captions are governed by the same CSS roles as the controls: swatches use `--ui-focus`/`--ui-warning`, the focus outline uses `--ui-focus`, pending text uses `--ui-warning`, and appearance.js reads resolved tokens when updating captions. The browser checks both actual swatch fills and captions in all four appearances, alongside the actual focus ring and pending text. Patches cannot retain a previous palette independently of the examples. This change affects only the dark/distinct focus value.

## Richer dark focus and state cues

The maintainer requested less pastel focus, error, success and pending colors in dark mode. The revised foregrounds have less white and stronger chromatic separation from charcoal. Error, success and pending retain their semantic hue families; focus uses azure-blue in both dark appearances to separate it from pending amber. Saturation is confined to compact text/marks and focus perimeters; neutral backgrounds keep the main screen subdued. Both dark combinations receive the adjustment. The selected azure button treatment retains its previous values; the light/distinct focus refinement is documented above.

| Dark appearance / role | Previous | Revised | Lowest approved contrast | Purpose and user intent |
| --- | --- | --- | --- | --- |
| Standard focus | #80b6ff | #409fea | 4.11:1, boundary minimum 3:1 | A clearer medium blue makes the active input/keyboard destination easier to locate without a pale halo. |
| Standard error | #ffb4ac | #f58276 | 4.66:1, text minimum 4.5:1 | Richer coral makes correction text and an invalid field conspicuous while preserving ordinary-size readability. |
| Standard success | #a4ddb4 | #4fc685 | 5.44:1, text minimum 4.5:1 | A stronger green distinguishes a confirmed result from neutral metadata; keep the written state and gray label background. |
| Standard and distinct pending | #f5d483 | #eab54d | 6.26:1, text minimum 4.5:1 | Golden amber gives unresolved decisions clearer emphasis without a large bright warning fill. |
| Distinct focus | #e5af3b | #409fea | 4.11:1, boundary minimum 3:1 | Azure-blue matches standard dark focus and separates the active keyboard/input perimeter from pending amber. |
| Distinct error | #e2b4ff | #d18bf0 | 4.84:1, text minimum 4.5:1 | Stronger violet preserves the alternative to red/green status opposition while keeping textual error identification. |
| Distinct success | #b3d5ff | #57adf0 | 4.82:1, text minimum 4.5:1 | A more saturated blue identifies the named confirmed result on neutral gray; solid/dashed status boundaries continue to add a non-hue cue. |

These rounded measurements are for inspection; checks use unrounded values. The role matrix remains authoritative. The change does not add glow, colored section fills, animation or a permanent outline to primary actions. Review actual focus/error/status examples, including vision-deficiency simulation, because passing contrast alone does not establish the desired degree of emphasis.

## Written-label button boundary exception

The approved normal button has a transparent border with its width reserved, an azure fill and a visible written action label. There is no permanent contrasting perimeter or shadow. Hover retains a transparent border. The normal 3px keyboard focus outline with 3px offset still appears through :focus-visible; do not remove it. Forced colors explicitly restores a system ButtonText border and Highlight focus, honoring the user's contrast preference.

On the dark panel #2e2e2e, the normal azure fill has **2.35:1** contrast against its surroundings while its white label has **5.79:1** against the fill. These are different measurements. The fill is below the project's usual 3:1 meaningful-boundary target. It is not recorded as passing that target.

[W3C's explanation of WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries) allows a boundary to be unnecessary when visible text sufficiently identifies the control. Apply this narrowly to native primary buttons identified by their visible written action labels. Their labels retain at least 4.5:1 against the actual normal/hover fill; their focus indicators retain at least 3:1 against adjacent surfaces. Native behavior, minimum target dimensions and the existing Save/Cancel workflow continue to apply. These conditions support this specific treatment; they do not establish whole-app WCAG conformance.

The exception does **not** cover icon-only controls, text inputs, checkboxes, radio marks, switch selection, focus indicators or status graphics. Never reuse primary as a dark-page link color or a native selected mark just because it is the brand seed. Those uses retain their separate measured contrast requirements. New backgrounds need their own text, focus and boundary review.

## Source, CSS mapping and verification

- `palettes.mjs` owns exact color values; `system.mjs` owns all CSS declarations and the executable `contrastPairs` and `contrastExceptions` contracts. Generated DESIGN.md, CSS, JSON and ledgers must agree.
- `primary.1`/`.2`/`.3` apply fill, transparent border and written label. `primary-hover.1`/`.2` retain the hover fill and transparent boundary. The inherited button border width remains reserved; no focus or hover layout jump is introduced.
- `links.1`, `button.10`, `native-accent.1` and `switch-on.1` consume interactive rather than primary. `switch-thumb-on.2` consumes on-interactive. Existing root token IDs remain stable; the two new token declarations are appended.
- `focus.1`/`.2` still govern the separate visible keyboard outline. `forced-primary.1` governs the explicit system-color boundary exception under forced colors.
- All **100** required pair checks (25 per appearance) remain enforced. The **24** normal/hover fill/background observations (six per appearance) are published separately as the documented boundary exception, not added to the passing matrix with weakened thresholds.
- Chrome checks visible labels, normal/hover fill and label contrast, transparent resting/hover border, keyboard focus without layout movement, secondary/link colors, native accents, selected switch track/thumb, disabled styles and forced-color boundaries in all four combinations. Existing form/persistence/navigation checks still apply. See [VALIDATION.md](VALIDATION.md) for actual results.

The maintainer selected this seed and button treatment. Individual declaration rationales remain subject to review; keep the palette method and exception explicit when assessing later changes.
