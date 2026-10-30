# Review changes

## Purpose

Record maintainer feedback that changed a design decision, the replaced behavior, affected declaration IDs and required evidence. Passing tests do not overrule a rejected user intent.

## User intent

Edit an existing value directly, and choose a readable appearance without relying on hue to understand the interface.

## Agent intent

Implement the corrected interaction and appearance requirements across source, generated CSS, guidelines, examples and checks. Keep the reference separate from production tasks/settings; revised proposals still require final maintainer review.

## Dark distinct-mode focus separation after 8293cd8

The maintainer found pending and focus too similar in dark/distinct mode and asked whether the color patches reflected the preceding changes. Patches already used the same resolved role tokens as controls; the browser checks now explicitly compare every actual swatch fill and hex caption against its palette in all four modes.

Dark/distinct focus moves from amber #e5af3b to azure-blue #409fea, matching standard dark focus and leaving pending gold #eab54d. The existing `palette-dark-distinct` focus declaration keeps its stable ID with a revised rationale. Other color values retain their prior contracts. COLOR-SELECTION.md records purpose, mapping and all three dark-background contrast measurements; regenerated CSS and patches follow the same token change.

## Light distinct-mode focus separation after eb7e53c

The maintainer found light/distinct focus #7025b4 too close to violet error #6d2498 and requested focus nearer to primary. The existing focus token declaration in `palette-light-distinct` now uses azure #006aa8, with its per-declaration rationale updated and stable ID retained. The error color and other palette values retain their previous values. COLOR-SELECTION.md records the purpose and all three light-background contrast measurements.

The light/distinct browser case now checks a focused invalid input with an azure outline, violet border and linked written error simultaneously. Existing contrast, keyboard, forced-color and vision-simulation coverage remains in place. Shared design documents, CSS and review artifacts are regenerated from the same source.

## Richer dark focus and state colors after 6381813

The maintainer requested stronger dark-mode focus, error, success and pending colors with moderate emphasis. Standard mode replaces pale blue/coral/mint/amber with richer blue/coral/green/gold midtones. Distinct mode similarly enriches its amber focus, violet error and blue success; pending shares the richer gold. COLOR-SELECTION.md records previous/revised values, each user purpose and measured contrast.

Only the existing focus/danger/success/warning token declarations in `palette-dark-standard` and `palette-dark-distinct` change, retaining stable IDs. Their per-declaration rationale records compact emphasis on charcoal. Light palettes, azure buttons, structural fills, non-color cues, focus geometry and contrast thresholds retain their prior contracts. The existing four-appearance tests cover actual computed colors and interaction; new status/focus screenshots support visual review rather than adding tests that mirror each hex change.

## Azure and borderless actions after 72ff76e

The maintainer rejected the inherited green primary, selected azure #006aa8 for light mode, rejected the pale dark-mode candidates and accepted the same azure fill on charcoal without a permanent outline. The selected seed/treatment is recorded here; this does not automatically approve every individual declaration rationale. [COLOR-SELECTION.md](COLOR-SELECTION.md) records the monochromatic role method and exact contrast scope.

| Changed decision | Replacement / consequence |
| --- | --- |
| Existing primary/hover/on-primary color declarations in `tokens` and palette overrides | Azure #006aa8, deeper #005686 hover and white written labels in all four combinations; no alternate/pale dark-mode primary. |
| Appended interactive/on-interactive color declarations | Related blue roles for readable links, secondary labels and selected native marks, plus a separate contrasting switch thumb. Existing root token IDs are retained by appending both declarations after on-primary. |
| `primary.2`, `primary-hover.2` | Transparent permanent borders reserve the existing width; white labels identify the native button and the separate keyboard focus indicator remains. |
| `links.1`, `button.10`, `native-accent.1`, `switch-on.1`, `switch-thumb-on.2` | Use the new readable-interactive/selected-thumb roles rather than reusing primary fill and white label everywhere. |
| `swatch-interactive.1`, `forced-primary.1` | Demonstrate the new foreground/accent role; allow system ButtonText boundaries under forced colors. |
| Contrast matrix and exception contract | 100 required pair checks remain enforced. The 24 normal/hover button-fill/background observations are published separately under the written-label button exception; no text, selection or focus threshold is weakened. |
| Verification | All four palettes check actual borderless normal/hover buttons, stable geometry, visible written labels, keyboard focus, readable links/secondary labels, native accents, switch track/thumb and forced-color boundaries. |

Secondary actions remain an emphasis level with neutral framing and a blue label; no second or third brand hue was selected. The revision stays within UI-Spec and the live reference.

## Muted backgrounds after ffa59bc

The maintainer requested more subdued main-screen backgrounds using high-performance HMI principles such as ISA-101. The previous light near-white/warm surfaces and green-tinted dark surfaces are replaced by achromatic gray/charcoal planes. See [HMI-PHILOSOPHY.md](HMI-PHILOSOPHY.md) for the exact rationale and source interpretation.

| Changed decision | Replacement / consequence |
| --- | --- |
| `tokens`, `palette-dark-standard`, `palette-light-distinct`, `palette-dark-distinct` structural color declarations | Shared neutral structural roles within each brightness; modest gray separation for page/panels/support. Every resolved palette and contrast matrix is regenerated. Stable declaration IDs are retained. |
| `page.6` and structural color role rationale | Background purpose now explicitly keeps large fields quiet so meaningful content and cues have priority. Consumers retain semantic tokens. |
| `status.2`, `status.6`, `pending.2` | Compact success/pending labels keep colored foreground cues and words but use neutral backgrounds. They do not become colored panels. |
| `notice.2`, `notice.3` | Routine guidance gets a neutral boundary and fill rather than borrowing the primary action accent. |
| `backdrop.1` | Neutral black alpha dimming replaces the green-tinted modal veil. |
| Evidence | A regression check rejects hue in structural roles, mismatched structural colors across status preferences, excessive background separation and pure black/white structural fields. Browser checks verify actual header, notice and table backgrounds as well as body/panels; existing four-mode editing, contrast and preference checks continue to apply. |

The design is inspired by ISA-published principles. Exact gray values and the dark variant are project choices, not an ISA color mandate or evidence of industrial HMI conformance. This revision remains within the live reference and UI-Spec scope.

## Feedback on d837f50

The maintainer rejected interpreting click-to-edit as opening a disclosure to reveal a separate editor. The required behavior is a prefilled native input whose border/background blend into the page at rest and reveal on focus. This replaces the earlier interaction, not just its label.

| Retired or changed decision | Replacement / consequence |
| --- | --- |
| `editor`, `summary`, `summary-hover`, `summary-label`, `edit-cue`, `edit-form` and their declaration IDs | Removed. No details/summary, duplicated read value or open/close editor is used by the reference form. |
| `inline-field`, `inline-control`, `inline-control-focus`, `inline-control-invalid` | The same enabled prefilled native node stays present. Reserved border/padding prevents layout jumps. Only CSS focus reveals the box; errors and forced colors deliberately retain boundaries. |
| `inline-notes-rest`, `inline-notes-focus` | Keep the resize handle quiet until notes receive focus, then allow native vertical resizing. |
| Editing transaction | One visible record form with explicit Save changes / Cancel changes. Draft values remain visible after blur; no silent save, concealment or reversion. |
| `tokens` | Append on-primary without renumbering existing token declarations. Action text must contrast with action fill independently of panel surface. |
| `primary.3` and principal-button token variants | Foreground changes from surface to on-primary, preventing light-on-light action labels in dark mode. |
| `palette-dark-standard`, `palette-light-distinct`, `palette-dark-distinct` | Complete, independently checked color-role overrides rather than partial inversion. Native color-scheme follows brightness. |
| `appearance-box`, `switch-track`, `switch-thumb`, `switch-on`, `switch-thumb-on` | Two labeled native checkbox-based slider switches choose brightness and distinct status colors, creating four combinations. Position, text and checked state convey meaning. |
| `distinct-status`, `distinct-pending` | Add solid/dashed state boundaries to the alternate palette; named state words remain mandatory in every mode. |
| `forced-inline`, `forced-inline-focus`, `forced-switch`, `forced-switch-thumb` | Respect the system high-contrast palette and restore native checkbox marks for sliders. |

Shared rule purposes now describe palette roles rather than assuming white surfaces or green/blue values. Grid source rules and Bootstrap provenance are unchanged. All current proposals remain open to review; implemented feedback is not an automatic acceptance stamp.

Required evidence: the input’s identity and geometry stay unchanged on focus; rest/hover remain borderless; direct focus reveals a box without JavaScript; drafts survive blur and theme changes; Save/Cancel/IME work correctly; all four effective CSS palettes match their tokens; approved text/boundary/focus/slider pairs meet contrast thresholds; words and line patterns remain present under color-vision simulations. See [VALIDATION.md](VALIDATION.md) for actual results and limits.
