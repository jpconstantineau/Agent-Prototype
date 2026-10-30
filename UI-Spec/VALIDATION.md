# Validation record

Verified on 2026-10-29. This records implementation checks, not maintainer approval of the design.

| Check | Result | Practical limit |
| --- | --- | --- |
| Declaration ledger and CSS generation | **97 rules, 334 declarations**, each with exact property/value, scope, purpose, user intent, proposed review state and verification family | Checks completeness and consistency; human review decides whether the intention and benefit are appropriate. |
| Unit suite | **72 passed**, including nine UI traceability/contrast/neutrality/exception/provenance checks | Existing app behavior remains covered; no actual user research is implied. |
| Chrome browser suite | **13 UI reference tests passed** for the shared light-focus revision; the complete 36-test suite passed for the preceding azure revision | Installed desktop Chrome; mobile widths and preferences are emulated. Physical mobile, Safari, actual zoom and screen readers remain manual review items. |
| Four governed appearances | Light/dark × standard/distinct; effective body/panel/action/link/secondary/native-accent/switch/disabled/status/error/input/hover colors match the palette; azure/white primary buttons have transparent normal/hover borders, stable geometry and visible keyboard focus; switching preserves drafts | Primary fill is the same selected azure in all modes. Distinct adds solid/dashed status boundaries; this is not a universal color-blind/OK categorization. |
| Supported declarations | Every declaration accepted by CSS.supports and present in the browser CSSOM; one audited stylesheet, no inline/extra styles in the reference | Browser acceptance is not proof that a declaration is needed; behavioral tests cover representative states and interactions. |
| Responsive layouts and targets | 320, 390, 767, 768, 991, 992 and 1440px; correct breakpoint stacking/fractions, no whole-page horizontal overflow, project minimum target heights | Bounded comparison tables intentionally scroll horizontally. |
| Enlarged text / user preferences | 200% root text with user letter/word/paragraph spacing; long value wrapping; forced colors and reduced motion | Simulates layout pressures; actual browser zoom, OS magnification and physical device testing remain required. |
| Native editing | Prefilled native inputs, CSS-only focus reveal with unchanged node/geometry, no blur-save, blank rejection, record Save/Cancel/Escape, select/date, multiline/IME, safe value handling and no-JavaScript focus styling | Example accepted values stay in page memory. Production persistence, concurrent writes and navigation guards need application integration. |
| Accessibility structure | Named controls/regions, linked help/errors, caption and scoped headers, focusable/pannable table, native dialog focus/Escape | Manual assistive-technology testing is not complete; no WCAG certification is claimed. |
| Contrast | All 100 required text/control/focus/slider checks (25 pairs in each of four palettes) pass their documented 4.5:1 or 3:1 thresholds | Approved pairings are bounded; arbitrary new color combinations need checks. |
| Richer dark focus and state cues | Standard and distinct dark palettes use stronger midtones; lowest required dark error/success/pending text pairing is 4.66:1 and lowest dark focus pairing is 4.11:1. Actual status/error/focus colors are checked and captured for visual review | Values are adjusted for compact emphasis on neutral surfaces. Degree of emphasis remains a maintainer visual judgement, not something contrast arithmetic alone decides. |
| Shared light focus and distinct-mode error separation | Both light modes use standard focus blue #005fcc. Focus contrasts are 4.24:1 on canvas, 4.80:1 on surface and 4.45:1 on subtle. A focused invalid field retains the blue outline, violet error border and linked error wording together. Unit checks require focus equality across status preferences at each brightness | Geometry and wording supplement hue; no universal color-vision guarantee is implied. Forced colors remains system governed. |
| Dark distinct focus/pending separation and patches | Focus now uses azure-blue #409fea while pending stays gold #eab54d. Focus contrasts are 5.44:1 on canvas, 4.76:1 on surface and 4.11:1 on subtle. Every color-patch fill and hex caption matches its resolved role in all four appearances | Color patches, focus rings and pending labels use shared tokens. Hue separation is supported by the focus perimeter, written labels and status line patterns. |
| Labelled primary-button boundary | 24 normal/hover fill/background observations are published separately. Normal azure on a dark panel is 2.35:1; its white label is 5.79:1. Keyboard focus remains 3px with 3px offset; forced colors restores a system boundary | Explicit written-label native-button exception in COLOR-SELECTION.md, not a claim that the fill/background edge passes 3:1. Inputs, icon-only controls, selection marks and focus retain their requirements. |
| Muted HMI-inspired structure | All four appearances have achromatic structural roles, identical backgrounds between status preferences and nearby gray planes within 24 channel steps. Actual body, panel, header, guidance and table fills resolve to the intended roles; routine guidance has a neutral boundary | Project constraints inspired by ISA-published principles, not ISA-prescribed RGB values or a conformance claim. Human review must assess hierarchy and real viewing conditions. |
| Bootstrap source | Six copied grid declaration groups match the pinned 5.3.8 distribution and its full SHA-256; license retained | Project component styles are separately authored, not claimed to be literal Bootstrap component code. |
| Official Google DESIGN.md lint | **0 errors, 3 warnings per palette document** with `@google/design.md@0.4.0`; [raw report with input digest](reports/design-md-lint.json) | Warnings explained below; alpha schema/tool may evolve. |

Each of the four documents has the same three official linter warnings, for 12 warnings in total. These are `orphaned-tokens` for **border**, **divider** and **focus**. These colors are consumed by CSS boundaries/outlines, proven by the local custom-property check and browser audit. They are not referenced by the format’s background/text component fields. The warning is retained rather than mislabeling a border as a text/background role or adding unsupported component fields just to silence the tool. Review that tradeoff if the Google component schema gains appropriate boundary/focus properties.

Desktop, mobile, a focused/invalid native field, dark and distinct palettes, and an achromatopsia simulation were visually inspected from browser screenshots. Azure buttons were inspected on gray and charcoal panels without permanent outlines. Richer dark error/success/pending text and focus perimeters were inspected in both dark modes. Shared light-mode blue focus and the distinct palette's violet error were inspected simultaneously on a focused invalid field. Dark/distinct azure-blue focus and golden pending were also inspected in their color patches and actual examples. All four combinations exercise protanopia, deuteranopia, tritanopia and achromatopsia emulation as supplementary visual checks. Palette contrast uses measured CSS roles; the simulation tests do not claim clinical equivalence or prove usability for every person. The preceding azure revision passed the complete 36-test suite and a UI follow-up with an explicit forced-color hover check, ensuring hover cannot remove the requested system boundary. This shared-focus revision reran the 13 UI tests and all 72 unit tests. Earlier behavior checks exposed and led to fixes for numeric-column selector precedence and a native progress bar overflowing under enlarged text. The reference keeps these outcomes as regression checks.

## Reproduce

From the repository root:

```sh
node UI-Spec/build.mjs --check
node UI-Spec/verify-bootstrap.mjs
cd docs
npm test
npm run test:browser
```

To rerun the separate official format check from docs, with the pinned CLI (downloaded as a development check, not a browser dependency):

```sh
npm exec --yes --package=@google/design.md@0.4.0 -- designmd lint ../UI-Spec/DESIGN.md | node ../UI-Spec/record-design-lint.mjs light-standard
npm exec --yes --package=@google/design.md@0.4.0 -- designmd lint ../UI-Spec/themes/dark.DESIGN.md | node ../UI-Spec/record-design-lint.mjs dark-standard
npm exec --yes --package=@google/design.md@0.4.0 -- designmd lint ../UI-Spec/themes/light-distinct.DESIGN.md | node ../UI-Spec/record-design-lint.mjs light-distinct
npm exec --yes --package=@google/design.md@0.4.0 -- designmd lint ../UI-Spec/themes/dark-distinct.DESIGN.md | node ../UI-Spec/record-design-lint.mjs dark-distinct
```

The unit check binds each report to its exact palette DESIGN.md SHA-256. After editing tokens or design prose, regenerate DESIGN.md, rerun the official check and review any changed findings. The expected warning set is explicit in the unit test, so new findings require review rather than being silently treated as the same result.

See [REVIEW.md](REVIEW.md) for remaining manual review, the acceptance gates and mandatory rework when a maintainer rejects a purpose or user intent.
