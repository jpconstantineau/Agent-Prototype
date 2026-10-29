# Four appearance combinations

Generated from [palettes.mjs](palettes.mjs) and [system.mjs](system.mjs). These are four independently checked palettes, selected by two preferences: brightness and distinct status colors. All modes retain words, focus and native control semantics. The distinct option avoids red/green status opposition; it is not a universal simulation or cure for every color-vision difference.

| Role | Light standard | Dark standard | Light distinct | Dark distinct | Purpose |
| --- | --- | --- | --- | --- | --- |
| primary | #284637 | #9bd2ae | #174b7a | #9fcaff | Identify the main available action with a restrained accent; never use this fill for large decorative panels. |
| primary-hover | #1d3529 | #b5e3c4 | #10395f | #c3deff | Confirm pointer targeting with a distinct action fill. |
| ink | #242424 | #ededed | #242424 | #ededed | Keep task names and body copy readable with neutral text on the active surfaces. |
| muted | #505050 | #c2c2c2 | #505050 | #c2c2c2 | Distinguish supporting information with neutral text while keeping ordinary text contrast. |
| canvas | #d9d9d9 | #242424 | #d9d9d9 | #242424 | Provide an achromatic gray page background so large areas do not compete with content or meaningful state cues. |
| surface | #e6e6e6 | #2e2e2e | #e6e6e6 | #2e2e2e | Separate reading and editing panels using a nearby opaque gray rather than a bright white or colored field. |
| subtle | #dedede | #383838 | #dedede | #383838 | Group secondary content with a nearby achromatic gray without implying an alarm or disabled state. |
| border | #737373 | #a3a3a3 | #737373 | #a3a3a3 | Identify editable-control boundaries with neutral non-text contrast. |
| divider | #b8b8b8 | #585858 | #b8b8b8 | #585858 | Separate passive groups with a quiet neutral line without making every row a control. |
| focus | #005fcc | #80b6ff | #7025b4 | #f1c75b | Identify the keyboard destination independently of the primary action color. |
| danger | #9b2c24 | #ffb4ac | #6d2498 | #e2b4ff | Mark a problem alongside explanatory text. |
| success | #235b3b | #a4ddb4 | #174b7a | #b3d5ff | Reinforce confirmed completion alongside a word label. |
| success-bg | #dedede | #383838 | #dedede | #383838 | Group confirmed results on a neutral gray without making routine completion a colored field. |
| warning | #725000 | #f5d483 | #725000 | #f5d483 | Highlight a condition that needs attention without declaring failure. |
| warning-bg | #dedede | #383838 | #dedede | #383838 | Keep pending decisions on a neutral gray; their words and compact foreground cues carry the state. |
| disabled | #505050 | #c2c2c2 | #505050 | #c2c2c2 | Keep the reason for an unavailable action readable with neutral text. |
| disabled-bg | #d2d2d2 | #404040 | #d2d2d2 | #404040 | Distinguish unavailable controls with a neutral fill and native disabled semantics rather than a warning color. |
| on-primary | #ffffff | #102318 | #ffffff | #101f30 | Keep the principal-action label and selected slider thumb legible against the active action fill. |

Contrast is tested using unrounded WCAG relative luminance; the following display values are rounded for inspection only.
## Light · standard

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 11.00:1 |
| muted / canvas | 4.5:1 | 5.71:1 |
| primary / canvas | 4.5:1 | 7.36:1 |
| danger / canvas | 4.5:1 | 5.35:1 |
| border / canvas | 3:1 | 3.36:1 |
| focus / canvas | 3:1 | 4.24:1 |
| ink / surface | 4.5:1 | 12.44:1 |
| muted / surface | 4.5:1 | 6.46:1 |
| primary / surface | 4.5:1 | 8.32:1 |
| danger / surface | 4.5:1 | 6.05:1 |
| border / surface | 3:1 | 3.80:1 |
| focus / surface | 3:1 | 4.80:1 |
| ink / subtle | 4.5:1 | 11.54:1 |
| muted / subtle | 4.5:1 | 5.99:1 |
| primary / subtle | 4.5:1 | 7.72:1 |
| danger / subtle | 4.5:1 | 5.62:1 |
| border / subtle | 3:1 | 3.52:1 |
| focus / subtle | 3:1 | 4.45:1 |
| on-primary / primary | 4.5:1 | 10.39:1 |
| on-primary / primary-hover | 4.5:1 | 13.18:1 |
| success / success-bg | 4.5:1 | 5.93:1 |
| warning / warning-bg | 4.5:1 | 5.45:1 |
| disabled / disabled-bg | 4.5:1 | 5.33:1 |
| surface / muted | 3:1 | 6.46:1 |

## Dark · standard

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 13.26:1 |
| muted / canvas | 4.5:1 | 8.71:1 |
| primary / canvas | 4.5:1 | 9.04:1 |
| danger / canvas | 4.5:1 | 9.15:1 |
| border / canvas | 3:1 | 6.15:1 |
| focus / canvas | 3:1 | 7.43:1 |
| ink / surface | 4.5:1 | 11.60:1 |
| muted / surface | 4.5:1 | 7.62:1 |
| primary / surface | 4.5:1 | 7.90:1 |
| danger / surface | 4.5:1 | 8.00:1 |
| border / surface | 3:1 | 5.38:1 |
| focus / surface | 3:1 | 6.50:1 |
| ink / subtle | 4.5:1 | 10.02:1 |
| muted / subtle | 4.5:1 | 6.58:1 |
| primary / subtle | 4.5:1 | 6.83:1 |
| danger / subtle | 4.5:1 | 6.91:1 |
| border / subtle | 3:1 | 4.65:1 |
| focus / subtle | 3:1 | 5.61:1 |
| on-primary / primary | 4.5:1 | 9.58:1 |
| on-primary / primary-hover | 4.5:1 | 11.56:1 |
| success / success-bg | 4.5:1 | 7.58:1 |
| warning / warning-bg | 4.5:1 | 8.17:1 |
| disabled / disabled-bg | 4.5:1 | 5.82:1 |
| surface / muted | 3:1 | 7.62:1 |

## Light · distinct status colors

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 11.00:1 |
| muted / canvas | 4.5:1 | 5.71:1 |
| primary / canvas | 4.5:1 | 6.40:1 |
| danger / canvas | 4.5:1 | 6.31:1 |
| border / canvas | 3:1 | 3.36:1 |
| focus / canvas | 3:1 | 5.69:1 |
| ink / surface | 4.5:1 | 12.44:1 |
| muted / surface | 4.5:1 | 6.46:1 |
| primary / surface | 4.5:1 | 7.24:1 |
| danger / surface | 4.5:1 | 7.14:1 |
| border / surface | 3:1 | 3.80:1 |
| focus / surface | 3:1 | 6.44:1 |
| ink / subtle | 4.5:1 | 11.54:1 |
| muted / subtle | 4.5:1 | 5.99:1 |
| primary / subtle | 4.5:1 | 6.72:1 |
| danger / subtle | 4.5:1 | 6.63:1 |
| border / subtle | 3:1 | 3.52:1 |
| focus / subtle | 3:1 | 5.97:1 |
| on-primary / primary | 4.5:1 | 9.04:1 |
| on-primary / primary-hover | 4.5:1 | 11.85:1 |
| success / success-bg | 4.5:1 | 6.72:1 |
| warning / warning-bg | 4.5:1 | 5.45:1 |
| disabled / disabled-bg | 4.5:1 | 5.33:1 |
| surface / muted | 3:1 | 6.46:1 |

## Dark · distinct status colors

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 13.26:1 |
| muted / canvas | 4.5:1 | 8.71:1 |
| primary / canvas | 4.5:1 | 9.14:1 |
| danger / canvas | 4.5:1 | 9.02:1 |
| border / canvas | 3:1 | 6.15:1 |
| focus / canvas | 3:1 | 9.65:1 |
| ink / surface | 4.5:1 | 11.60:1 |
| muted / surface | 4.5:1 | 7.62:1 |
| primary / surface | 4.5:1 | 8.00:1 |
| danger / surface | 4.5:1 | 7.89:1 |
| border / surface | 3:1 | 5.38:1 |
| focus / surface | 3:1 | 8.45:1 |
| ink / subtle | 4.5:1 | 10.02:1 |
| muted / subtle | 4.5:1 | 6.58:1 |
| primary / subtle | 4.5:1 | 6.91:1 |
| danger / subtle | 4.5:1 | 6.82:1 |
| border / subtle | 3:1 | 4.65:1 |
| focus / subtle | 3:1 | 7.29:1 |
| on-primary / primary | 4.5:1 | 9.81:1 |
| on-primary / primary-hover | 4.5:1 | 12.07:1 |
| success / success-bg | 4.5:1 | 7.75:1 |
| warning / warning-bg | 4.5:1 | 8.17:1 |
| disabled / disabled-bg | 4.5:1 | 5.82:1 |
| surface / muted | 3:1 | 7.62:1 |
