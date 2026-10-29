# Foundations and CSS framework

## Purpose

Turn the DESIGN.md identity into predictable implementation choices, including exact boundaries for when a style is justified. The declaration ledger supplies the per-property details; this file explains how those details work together.

## User intent

Read content comfortably, distinguish values from actions and states, compare records and use the same interface at a narrow width or larger text size.

## Agent intent

Implementation agents use these constraints to choose existing patterns and tokens. They must record a new purpose and user intent before adding a rule; ordinary app agents do not control styles through a tool.

## Color roles and contrast

The authoritative values are `tokens.colors` in system.mjs and the YAML front matter in DESIGN.md. Use role names rather than hard-coded color values in a component. The system preserves Daylist’s deep green action identity while separating focus blue from state colors.

| Role / pairing | Concrete purpose | User intention / consequence |
| --- | --- | --- |
| Ink on canvas/surface/subtle | Sustained reading across document and work panels | Read a task or explanation without changing visual interpretation between surfaces. |
| Muted on canvas/surface/subtle | Lower emphasis for help and metadata, still at ordinary text contrast | Consult supporting detail without confusing it with the main value. “Muted” never means unreadable. |
| Surface text on primary / primary-hover | Principal action and pointer feedback | Locate the main next step and confirm its target without layout movement. |
| Primary on surface | Links, secondary actions and edit cue | Recognize an available action; underlines or button boundaries also identify its behavior. |
| Border on surface | Editable boundaries at minimum 3:1 non-text contrast | Identify where to enter a value. Divider is lighter because it separates passive groups, not controls. |
| Focus on surface/canvas | Keyboard destination; outline offset separates it from dark button fill | Know which control receives the next keystroke. The forced-color rule uses the system Highlight role. |
| Danger / success / warning on their approved light backgrounds | Error, confirmed result and pending decision | Read the actual state word or error text. Color reinforces rather than replaces text. |
| Disabled on disabled-bg | Legible unavailable control | Understand its label and the associated reason rather than interpreting low opacity. |

The executable `contrastPairs` matrix tests these permitted combinations. Text uses at least 4.5:1, including help and disabled copy as a project readability rule; input boundaries and focus use at least 3:1 against adjacent backgrounds. WCAG exempts some disabled/nonessential decoration, but the project chooses stronger legibility. Large-text exceptions are not used to excuse low contrast. Dividers and color swatches are nonessential decoration; no state depends on their contrast alone.

No dark theme is supplied in v1. `color-scheme: light` matches native input surfaces to the actual light tokens; it does not disable forced colors. Do not add dark CSS by merely changing the canvas: all text, input, disabled, error, modal and focus pairings must be reviewed together. No CSS-generated words/icons are essential to understanding a value.

## Typography and reading

| Element | Exact size / rhythm | Why this value |
| --- | --- | --- |
| Body and native controls | 1rem / 1.5; weight 400 | Respect the browser default and keep controls at the reading size; unitless line height scales with user text preferences. |
| Help and status | 0.875rem / inherited rhythm | Distinguish secondary content without dropping below 14px at the usual 16px default. |
| Page title | 2rem / 1.2; weight 600 | Identify the page while fitting a narrow viewport without display-size marketing type. |
| Section heading | 1.5rem / 1.25; weight 600 | Mark a major topic without competing with the page title. |
| Local heading | 1.125rem / 1.25; weight 600 | Identify one card or group with modest hierarchy. |
| Code | 0.875em | Prevent monospace text from overpowering prose; it remains selectable text. |
| Numeric data | Native font with tabular-nums | Align digit widths where the platform font provides tabular figures. |

Use installed `system-ui, -apple-system, "Segoe UI", sans-serif`. This avoids invisible text, font downloads and an external font dependency; exact glyph metrics can vary by OS, so test the intended platforms. Do not add letter spacing or font smoothing solely for visual polish. Explanatory prose caps at 65ch; flexible wrapping protects long URLs and translated labels. `overflow-wrap: anywhere` is a fallback for long unbroken content, not a substitute for readable labels.

Keep actual h1–h3 hierarchy, paragraphs, lists and code elements. HTML heading levels express structure, never a desired font size. Rem values respond to the user’s root size. Do not set `html { font-size: ... }`, disable pinch zoom or assume 1rem always equals 16px.

## Spacing, sizes and breakpoints

| Token | Rem | Default px | Purpose |
| --- | --- | --- | --- |
| xs | .25 | 4 | Compact separation inside a status label. |
| sm | .5 | 8 | Choice separation, button vertical padding and small navigation insets. |
| md | .75 | 12 | Field/value separation and cell padding. |
| lg | 1 | 16 | Between related controls and local text blocks. |
| xl | 1.5 | 24 | Panel inset and gaps between peer panels. |
| section | 2 | 32 | Start-of-document and empty-state clearance. |
| page | 3 | 48 | Major topic separation and trailing page room. |

The 44px minimum target is a project comfort rule, above WCAG 2.2’s 24px minimum subject to its exceptions. It maps to `min-block-size: 2.75rem`, never a fixed height; at enlarged text, controls grow. The 20px native checkbox/radio mark sits inside its full-height clickable label. Inline prose links retain native inline behavior; navigation links get the larger target treatment.

| Viewport | Layout | User purpose |
| --- | --- | --- |
| Below 768px | Source-order single column | Read and edit without needing to pan the page or jump across columns. |
| 768px and above | `col-md-6` paired panels | Compare related content when both panels have useful reading width. |
| 992px and above | `col-lg-8` main / `col-lg-4` support | Preserve the main task’s prominence while keeping context nearby. |
| All widths | 100% fluid container capped at 75rem, total 1.5rem horizontal gutter | Keep edge clearance on mobile and cap scanning distance on large screens. |

These use Bootstrap’s md/lg thresholds and twelve-column fractions. Other standard Bootstrap thresholds (sm 576, xl 1200, xxl 1400) are reference information, not implemented class families. Add a breakpoint only when content demonstrates the need. Use CSS media queries, not user-agent/device detection or JavaScript width calculations. The color sample gallery uses CSS grid auto-fit for a different task: fitting equal, small samples. Do not use CSS grid as a replacement for semantic tables.

The copied Bootstrap row starts with a zero vertical gutter, and `grid-gap` explicitly replaces it with 1.5rem for the reference. Retaining the literal baseline makes upstream comparison possible; the project override expresses the chosen visible separation. Review this small redundancy as part of adopting a Bootstrap-derived baseline, rather than reading the copied zero as the effective reference gap.

Bootstrap’s copied LTR grid rules retain physical left/right gutters. Other new styles use logical properties. This reference is tested in English LTR. RTL adoption requires a reviewed grid adaptation and browser verification, not a claim that logical properties alone make the copied grid fully RTL-ready. Never reverse source order with CSS to simulate RTL.

## Cascade and property ownership

Order is tokens → baseline → Bootstrap grid → project layouts → controls/states → reference samples → native dialog/keyboard/forced-color adaptations. All reference CSS is generated into one stylesheet; the app’s legacy styles are not loaded here. Class names do not make this a complete Bootstrap distribution. The `card`, `btn`, `form-control` and table styles are project implementations using the familiar Bootstrap component vocabulary.

Prefer a single-class selector and a documented component/state scope. One deliberate `!important` honors the HTML `hidden` contract even when another component has a display declaration. Do not add more to win an avoidable specificity contest. Attribute selectors reflect real state such as `aria-invalid`, `disabled` and native `open`; no class may pretend that an operation committed.

No animations or transitions are introduced: native interaction and immediate feedback meet this reference’s goals. This also respects reduced-motion users without an unnecessary override of animations that do not exist. No fixed/sticky page chrome, decorative transforms, full-page overflow clipping, ellipsis of essential values, arbitrary z-index ladder or layout-height locks are allowed. The skip-link transform is a documented keyboard navigation exception; the dialog uses the native top layer.

CSS custom properties are real declarations and appear in the ledger. Shorthands are also declarations: reviewers must consider every longhand they reset. For example `font: inherit` makes control size/family/weight/line-height agree with text; `border` sets width/style/color together; `flex: 0 0 auto` disables both growth and shrink while keeping width authoritative. If only one longhand should change, do not use a shorthand that erases unrelated behavior.
