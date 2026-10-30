# Four appearance combinations

Generated from [palettes.mjs](palettes.mjs) and [system.mjs](system.mjs). These are four independently checked palettes, selected by two preferences: brightness and distinct status colors. All modes retain words, focus and native control semantics. The distinct option avoids red/green status opposition; it is not a universal simulation or cure for every color-vision difference.

| Role | Light standard | Dark standard | Light distinct | Dark distinct | Purpose |
| --- | --- | --- | --- | --- | --- |
| primary | #006aa8 | #006aa8 | #006aa8 | #006aa8 | Identify the main available action with a restrained accent; never use this fill for large decorative panels. |
| primary-hover | #005686 | #005686 | #005686 | #005686 | Confirm pointer targeting with a distinct action fill. |
| ink | #242424 | #ededed | #242424 | #ededed | Keep task names and body copy readable with neutral text on the active surfaces. |
| muted | #505050 | #c2c2c2 | #505050 | #c2c2c2 | Distinguish supporting information with neutral text while keeping ordinary text contrast. |
| canvas | #d9d9d9 | #242424 | #d9d9d9 | #242424 | Provide an achromatic gray page background so large areas do not compete with content or meaningful state cues. |
| surface | #e6e6e6 | #2e2e2e | #e6e6e6 | #2e2e2e | Separate reading and editing panels using a nearby opaque gray rather than a bright white or colored field. |
| subtle | #dedede | #383838 | #dedede | #383838 | Group secondary content with a nearby achromatic gray without implying an alarm or disabled state. |
| border | #737373 | #a3a3a3 | #737373 | #a3a3a3 | Identify editable-control boundaries with neutral non-text contrast. |
| divider | #b8b8b8 | #585858 | #b8b8b8 | #585858 | Separate passive groups with a quiet neutral line without making every row a control. |
| focus | #005fcc | #409fea | #005fcc | #409fea | Identify the keyboard destination with a separately governed outline and a neutral offset gap around the control. |
| danger | #9b2c24 | #f58276 | #6d2498 | #d18bf0 | Mark a problem alongside explanatory text. |
| success | #235b3b | #4fc685 | #174b7a | #57adf0 | Reinforce confirmed completion alongside a word label. |
| success-bg | #dedede | #383838 | #dedede | #383838 | Group confirmed results on a neutral gray without making routine completion a colored field. |
| warning | #725000 | #eab54d | #725000 | #eab54d | Highlight a condition that needs attention without declaring failure. |
| warning-bg | #dedede | #383838 | #dedede | #383838 | Keep pending decisions on a neutral gray; their words and compact foreground cues carry the state. |
| disabled | #505050 | #c2c2c2 | #505050 | #c2c2c2 | Keep the reason for an unavailable action readable with neutral text. |
| disabled-bg | #d2d2d2 | #404040 | #d2d2d2 | #404040 | Distinguish unavailable controls with a neutral fill and native disabled semantics rather than a warning color. |
| on-primary | #ffffff | #ffffff | #ffffff | #ffffff | Keep the written principal-action label readable against the selected azure fill in both brightness modes. |
| interactive | #005b90 | #40adf0 | #005b90 | #40adf0 | Keep links, secondary-action labels and compact native selection marks readable using an azure-related blue tuned to adjacent neutral surfaces. |
| on-interactive | #ffffff | #242424 | #ffffff | #242424 | Keep selected switch thumbs distinct from their blue track and provide mode-dependent contrasting text on checked information, status and identity accent fills. |

Contrast is tested using unrounded WCAG relative luminance; the following display values are rounded for inspection only.
## Light · standard

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 11.00:1 |
| muted / canvas | 4.5:1 | 5.71:1 |
| interactive / canvas | 4.5:1 | 5.13:1 |
| danger / canvas | 4.5:1 | 5.35:1 |
| border / canvas | 3:1 | 3.36:1 |
| focus / canvas | 3:1 | 4.24:1 |
| ink / surface | 4.5:1 | 12.44:1 |
| muted / surface | 4.5:1 | 6.46:1 |
| interactive / surface | 4.5:1 | 5.80:1 |
| danger / surface | 4.5:1 | 6.05:1 |
| border / surface | 3:1 | 3.80:1 |
| focus / surface | 3:1 | 4.80:1 |
| ink / subtle | 4.5:1 | 11.54:1 |
| muted / subtle | 4.5:1 | 5.99:1 |
| interactive / subtle | 4.5:1 | 5.38:1 |
| danger / subtle | 4.5:1 | 5.62:1 |
| border / subtle | 3:1 | 3.52:1 |
| focus / subtle | 3:1 | 4.45:1 |
| on-primary / primary | 4.5:1 | 5.79:1 |
| on-primary / primary-hover | 4.5:1 | 7.85:1 |
| success / success-bg | 4.5:1 | 5.93:1 |
| warning / warning-bg | 4.5:1 | 5.45:1 |
| disabled / disabled-bg | 4.5:1 | 5.33:1 |
| surface / muted | 3:1 | 6.46:1 |
| on-interactive / interactive | 3:1 | 7.24:1 |
| on-interactive / interactive | 4.5:1 | 7.24:1 |
| on-interactive / success | 4.5:1 | 7.98:1 |
| on-interactive / danger | 4.5:1 | 7.56:1 |
| on-interactive / warning | 4.5:1 | 7.34:1 |
| on-interactive / muted | 4.5:1 | 8.06:1 |

## Dark · standard

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 13.26:1 |
| muted / canvas | 4.5:1 | 8.71:1 |
| interactive / canvas | 4.5:1 | 6.25:1 |
| danger / canvas | 4.5:1 | 6.16:1 |
| border / canvas | 3:1 | 6.15:1 |
| focus / canvas | 3:1 | 5.44:1 |
| ink / surface | 4.5:1 | 11.60:1 |
| muted / surface | 4.5:1 | 7.62:1 |
| interactive / surface | 4.5:1 | 5.47:1 |
| danger / surface | 4.5:1 | 5.39:1 |
| border / surface | 3:1 | 5.38:1 |
| focus / surface | 3:1 | 4.76:1 |
| ink / subtle | 4.5:1 | 10.02:1 |
| muted / subtle | 4.5:1 | 6.58:1 |
| interactive / subtle | 4.5:1 | 4.72:1 |
| danger / subtle | 4.5:1 | 4.66:1 |
| border / subtle | 3:1 | 4.65:1 |
| focus / subtle | 3:1 | 4.11:1 |
| on-primary / primary | 4.5:1 | 5.79:1 |
| on-primary / primary-hover | 4.5:1 | 7.85:1 |
| success / success-bg | 4.5:1 | 5.44:1 |
| warning / warning-bg | 4.5:1 | 6.26:1 |
| disabled / disabled-bg | 4.5:1 | 5.82:1 |
| surface / muted | 3:1 | 7.62:1 |
| on-interactive / interactive | 3:1 | 6.25:1 |
| on-interactive / interactive | 4.5:1 | 6.25:1 |
| on-interactive / success | 4.5:1 | 7.21:1 |
| on-interactive / danger | 4.5:1 | 6.16:1 |
| on-interactive / warning | 4.5:1 | 8.29:1 |
| on-interactive / muted | 4.5:1 | 8.71:1 |

## Light · distinct status colors

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 11.00:1 |
| muted / canvas | 4.5:1 | 5.71:1 |
| interactive / canvas | 4.5:1 | 5.13:1 |
| danger / canvas | 4.5:1 | 6.31:1 |
| border / canvas | 3:1 | 3.36:1 |
| focus / canvas | 3:1 | 4.24:1 |
| ink / surface | 4.5:1 | 12.44:1 |
| muted / surface | 4.5:1 | 6.46:1 |
| interactive / surface | 4.5:1 | 5.80:1 |
| danger / surface | 4.5:1 | 7.14:1 |
| border / surface | 3:1 | 3.80:1 |
| focus / surface | 3:1 | 4.80:1 |
| ink / subtle | 4.5:1 | 11.54:1 |
| muted / subtle | 4.5:1 | 5.99:1 |
| interactive / subtle | 4.5:1 | 5.38:1 |
| danger / subtle | 4.5:1 | 6.63:1 |
| border / subtle | 3:1 | 3.52:1 |
| focus / subtle | 3:1 | 4.45:1 |
| on-primary / primary | 4.5:1 | 5.79:1 |
| on-primary / primary-hover | 4.5:1 | 7.85:1 |
| success / success-bg | 4.5:1 | 6.72:1 |
| warning / warning-bg | 4.5:1 | 5.45:1 |
| disabled / disabled-bg | 4.5:1 | 5.33:1 |
| surface / muted | 3:1 | 6.46:1 |
| on-interactive / interactive | 3:1 | 7.24:1 |
| on-interactive / interactive | 4.5:1 | 7.24:1 |
| on-interactive / success | 4.5:1 | 9.04:1 |
| on-interactive / danger | 4.5:1 | 8.91:1 |
| on-interactive / warning | 4.5:1 | 7.34:1 |
| on-interactive / muted | 4.5:1 | 8.06:1 |

## Dark · distinct status colors

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 13.26:1 |
| muted / canvas | 4.5:1 | 8.71:1 |
| interactive / canvas | 4.5:1 | 6.25:1 |
| danger / canvas | 4.5:1 | 6.40:1 |
| border / canvas | 3:1 | 6.15:1 |
| focus / canvas | 3:1 | 5.44:1 |
| ink / surface | 4.5:1 | 11.60:1 |
| muted / surface | 4.5:1 | 7.62:1 |
| interactive / surface | 4.5:1 | 5.47:1 |
| danger / surface | 4.5:1 | 5.60:1 |
| border / surface | 3:1 | 5.38:1 |
| focus / surface | 3:1 | 4.76:1 |
| ink / subtle | 4.5:1 | 10.02:1 |
| muted / subtle | 4.5:1 | 6.58:1 |
| interactive / subtle | 4.5:1 | 4.72:1 |
| danger / subtle | 4.5:1 | 4.84:1 |
| border / subtle | 3:1 | 4.65:1 |
| focus / subtle | 3:1 | 4.11:1 |
| on-primary / primary | 4.5:1 | 5.79:1 |
| on-primary / primary-hover | 4.5:1 | 7.85:1 |
| success / success-bg | 4.5:1 | 4.82:1 |
| warning / warning-bg | 4.5:1 | 6.26:1 |
| disabled / disabled-bg | 4.5:1 | 5.82:1 |
| surface / muted | 3:1 | 7.62:1 |
| on-interactive / interactive | 3:1 | 6.25:1 |
| on-interactive / interactive | 4.5:1 | 6.25:1 |
| on-interactive / success | 4.5:1 | 6.39:1 |
| on-interactive / danger | 4.5:1 | 6.40:1 |
| on-interactive / warning | 4.5:1 | 8.29:1 |
| on-interactive / muted | 4.5:1 | 8.71:1 |

## Labelled primary-button boundary observations

These observations have a documented exception, not a waived label or focus check. The selected azure fill/background edge may be below 3:1 for a native button identified by its visible written action label. All 30 required text/control/focus and accent-fill pairs per palette remain enforced. Read [COLOR-SELECTION.md](COLOR-SELECTION.md) for scope, purpose and exclusions.

Keep the selected azure button fill without a permanent outline in both brightness modes. The fill/background boundary is not required to identify this labelled button. It may be below 3:1; label contrast remains at least 4.5:1 and keyboard focus remains visible at 3:1 against its adjacent surface. Never apply this exception to icon-only controls, inputs, selection marks or focus indicators.

| Appearance | Fill / adjacent background | Measured boundary |
| --- | --- | --- |
| Light · standard | primary / canvas | 4.10:1 |
| Light · standard | primary / surface | 4.64:1 |
| Light · standard | primary / subtle | 4.30:1 |
| Light · standard | primary-hover / canvas | 5.56:1 |
| Light · standard | primary-hover / surface | 6.29:1 |
| Light · standard | primary-hover / subtle | 5.83:1 |
| Dark · standard | primary / canvas | 2.68:1 |
| Dark · standard | primary / surface | 2.35:1 |
| Dark · standard | primary / subtle | 2.03:1 |
| Dark · standard | primary-hover / canvas | 1.98:1 |
| Dark · standard | primary-hover / surface | 1.73:1 |
| Dark · standard | primary-hover / subtle | 1.49:1 |
| Light · distinct status colors | primary / canvas | 4.10:1 |
| Light · distinct status colors | primary / surface | 4.64:1 |
| Light · distinct status colors | primary / subtle | 4.30:1 |
| Light · distinct status colors | primary-hover / canvas | 5.56:1 |
| Light · distinct status colors | primary-hover / surface | 6.29:1 |
| Light · distinct status colors | primary-hover / subtle | 5.83:1 |
| Dark · distinct status colors | primary / canvas | 2.68:1 |
| Dark · distinct status colors | primary / surface | 2.35:1 |
| Dark · distinct status colors | primary / subtle | 2.03:1 |
| Dark · distinct status colors | primary-hover / canvas | 1.98:1 |
| Dark · distinct status colors | primary-hover / surface | 1.73:1 |
| Dark · distinct status colors | primary-hover / subtle | 1.49:1 |
