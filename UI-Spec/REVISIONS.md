# Review changes

## Purpose

Record maintainer feedback that changed a design decision, the replaced behavior, affected declaration IDs and required evidence. Passing tests do not overrule a rejected user intent.

## User intent

Edit an existing value directly, and choose a readable appearance without relying on hue to understand the interface.

## Agent intent

Implement the corrected interaction and appearance requirements across source, generated CSS, guidelines, examples and checks. Keep the reference separate from production tasks/settings; revised proposals still require final maintainer review.

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
