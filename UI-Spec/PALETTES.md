# Four appearance combinations

Generated from [palettes.mjs](palettes.mjs) and [system.mjs](system.mjs). These are four independently checked palettes, selected by two preferences: brightness and distinct status colors. All modes retain words, focus and native control semantics. The distinct option avoids red/green status opposition; it is not a universal simulation or cure for every color-vision difference.

| Role | Light standard | Dark standard | Light distinct | Dark distinct | Purpose |
| --- | --- | --- | --- | --- | --- |
| primary | #284637 | #9bd2ae | #174b7a | #9fcaff | Identify the main available action with the active palette’s action role. |
| primary-hover | #1d3529 | #b5e3c4 | #10395f | #c3deff | Confirm pointer targeting with a distinct action fill. |
| ink | #20352a | #edf5ef | #20352a | #edf5ef | Keep task names and body copy readable on the active surfaces. |
| muted | #526258 | #bac9bf | #526258 | #bac9bf | Distinguish supporting information while keeping ordinary text contrast. |
| canvas | #f5f5f0 | #101712 | #f5f5f0 | #101712 | Separate the page background from editable panels. |
| surface | #ffffff | #18231c | #ffffff | #18231c | Provide an opaque reading and editing plane. |
| subtle | #eaf0e5 | #24352a | #eaf0e5 | #24352a | Group secondary content without implying a disabled state. |
| border | #6c7c70 | #8b9e90 | #6c7c70 | #8b9e90 | Identify editable-control boundaries with non-text contrast. |
| divider | #d6ded5 | #465c4d | #d6ded5 | #465c4d | Separate noninteractive rows without making every row a control. |
| focus | #005fcc | #80b6ff | #7025b4 | #f1c75b | Identify the keyboard destination independently of the primary action color. |
| danger | #9b2c24 | #ffb4ac | #6d2498 | #e2b4ff | Mark a problem alongside explanatory text. |
| success | #235b3b | #a4ddb4 | #174b7a | #b3d5ff | Reinforce confirmed completion alongside a word label. |
| success-bg | #eaf5ec | #1b3826 | #e8f1fa | #1b304a | Group successful results without an interrupting dialog. |
| warning | #725000 | #f5d483 | #725000 | #f5d483 | Highlight a condition that needs attention without declaring failure. |
| warning-bg | #fff4d6 | #3b3018 | #fff4d6 | #3b3018 | Give pending decisions a separate, readable surface. |
| disabled | #526258 | #b1c2b5 | #526258 | #b1c2b5 | Keep the reason for an unavailable action readable. |
| disabled-bg | #e8ece6 | #2b3b30 | #e8ece6 | #2b3b30 | Distinguish unavailable controls from enabled controls. |
| on-primary | #ffffff | #102318 | #ffffff | #101f30 | Keep the principal-action label and selected slider thumb legible against the active action fill. |

Contrast is tested using unrounded WCAG relative luminance; the following display values are rounded for inspection only.
## Light · standard

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 11.97:1 |
| muted / canvas | 4.5:1 | 5.91:1 |
| primary / canvas | 4.5:1 | 9.50:1 |
| danger / canvas | 4.5:1 | 6.91:1 |
| border / canvas | 3:1 | 4.04:1 |
| focus / canvas | 3:1 | 5.47:1 |
| ink / surface | 4.5:1 | 13.09:1 |
| muted / surface | 4.5:1 | 6.47:1 |
| primary / surface | 4.5:1 | 10.39:1 |
| danger / surface | 4.5:1 | 7.56:1 |
| border / surface | 3:1 | 4.42:1 |
| focus / surface | 3:1 | 5.98:1 |
| ink / subtle | 4.5:1 | 11.28:1 |
| muted / subtle | 4.5:1 | 5.57:1 |
| primary / subtle | 4.5:1 | 8.95:1 |
| danger / subtle | 4.5:1 | 6.51:1 |
| border / subtle | 3:1 | 3.81:1 |
| focus / subtle | 3:1 | 5.16:1 |
| on-primary / primary | 4.5:1 | 10.39:1 |
| on-primary / primary-hover | 4.5:1 | 13.18:1 |
| success / success-bg | 4.5:1 | 7.13:1 |
| warning / warning-bg | 4.5:1 | 6.69:1 |
| disabled / disabled-bg | 4.5:1 | 5.41:1 |
| surface / muted | 3:1 | 6.47:1 |

## Dark · standard

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 16.39:1 |
| muted / canvas | 4.5:1 | 10.57:1 |
| primary / canvas | 4.5:1 | 10.60:1 |
| danger / canvas | 4.5:1 | 10.73:1 |
| border / canvas | 3:1 | 6.41:1 |
| focus / canvas | 3:1 | 8.72:1 |
| ink / surface | 4.5:1 | 14.59:1 |
| muted / surface | 4.5:1 | 9.41:1 |
| primary / surface | 4.5:1 | 9.43:1 |
| danger / surface | 4.5:1 | 9.55:1 |
| border / surface | 3:1 | 5.70:1 |
| focus / surface | 3:1 | 7.76:1 |
| ink / subtle | 4.5:1 | 11.69:1 |
| muted / subtle | 4.5:1 | 7.54:1 |
| primary / subtle | 4.5:1 | 7.56:1 |
| danger / subtle | 4.5:1 | 7.65:1 |
| border / subtle | 3:1 | 4.57:1 |
| focus / subtle | 3:1 | 6.21:1 |
| on-primary / primary | 4.5:1 | 9.58:1 |
| on-primary / primary-hover | 4.5:1 | 11.56:1 |
| success / success-bg | 4.5:1 | 8.28:1 |
| warning / warning-bg | 4.5:1 | 9.02:1 |
| disabled / disabled-bg | 4.5:1 | 6.35:1 |
| surface / muted | 3:1 | 9.41:1 |

## Light · distinct status colors

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 11.97:1 |
| muted / canvas | 4.5:1 | 5.91:1 |
| primary / canvas | 4.5:1 | 8.26:1 |
| danger / canvas | 4.5:1 | 8.15:1 |
| border / canvas | 3:1 | 4.04:1 |
| focus / canvas | 3:1 | 7.35:1 |
| ink / surface | 4.5:1 | 13.09:1 |
| muted / surface | 4.5:1 | 6.47:1 |
| primary / surface | 4.5:1 | 9.04:1 |
| danger / surface | 4.5:1 | 8.91:1 |
| border / surface | 3:1 | 4.42:1 |
| focus / surface | 3:1 | 8.04:1 |
| ink / subtle | 4.5:1 | 11.28:1 |
| muted / subtle | 4.5:1 | 5.57:1 |
| primary / subtle | 4.5:1 | 7.79:1 |
| danger / subtle | 4.5:1 | 7.68:1 |
| border / subtle | 3:1 | 3.81:1 |
| focus / subtle | 3:1 | 6.93:1 |
| on-primary / primary | 4.5:1 | 9.04:1 |
| on-primary / primary-hover | 4.5:1 | 11.85:1 |
| success / success-bg | 4.5:1 | 7.92:1 |
| warning / warning-bg | 4.5:1 | 6.69:1 |
| disabled / disabled-bg | 4.5:1 | 5.41:1 |
| surface / muted | 3:1 | 6.47:1 |

## Dark · distinct status colors

| Foreground / background | Required | Measured |
| --- | --- | --- |
| ink / canvas | 4.5:1 | 16.39:1 |
| muted / canvas | 4.5:1 | 10.57:1 |
| primary / canvas | 4.5:1 | 10.72:1 |
| danger / canvas | 4.5:1 | 10.58:1 |
| border / canvas | 3:1 | 6.41:1 |
| focus / canvas | 3:1 | 11.32:1 |
| ink / surface | 4.5:1 | 14.59:1 |
| muted / surface | 4.5:1 | 9.41:1 |
| primary / surface | 4.5:1 | 9.54:1 |
| danger / surface | 4.5:1 | 9.42:1 |
| border / surface | 3:1 | 5.70:1 |
| focus / surface | 3:1 | 10.08:1 |
| ink / subtle | 4.5:1 | 11.69:1 |
| muted / subtle | 4.5:1 | 7.54:1 |
| primary / subtle | 4.5:1 | 7.64:1 |
| danger / subtle | 4.5:1 | 7.55:1 |
| border / subtle | 3:1 | 4.57:1 |
| focus / subtle | 3:1 | 8.07:1 |
| on-primary / primary | 4.5:1 | 9.81:1 |
| on-primary / primary-hover | 4.5:1 | 12.07:1 |
| success / success-bg | 4.5:1 | 8.85:1 |
| warning / warning-bg | 4.5:1 | 9.02:1 |
| disabled / disabled-bg | 4.5:1 | 6.35:1 |
| surface / muted | 3:1 | 9.41:1 |
