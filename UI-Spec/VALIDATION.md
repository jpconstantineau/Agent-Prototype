# Validation record

Verified on 2026-10-29. This records implementation checks, not maintainer approval of the design.

| Check | Result | Practical limit |
| --- | --- | --- |
| Declaration ledger and CSS generation | **81 rules, 239 declarations**, each with exact property/value, scope, purpose, user intent, proposed review state and verification family | Checks completeness and consistency; human review decides whether the intention and benefit are appropriate. |
| Unit suite | **70 passed**, including seven UI traceability/contrast/provenance checks | Existing app behavior remains covered; no actual user research is implied. |
| Chrome browser suite | **30 passed**, including seven UI reference tests | Installed desktop Chrome; mobile widths and preferences are emulated. Physical mobile, Safari, actual zoom and screen readers remain manual review items. |
| Supported declarations | Every declaration accepted by CSS.supports and present in the browser CSSOM; one audited stylesheet, no inline/extra styles in the reference | Browser acceptance is not proof that a declaration is needed; behavioral tests cover representative states and interactions. |
| Responsive layouts and targets | 320, 390, 767, 768, 991, 992 and 1440px; correct breakpoint stacking/fractions, no whole-page horizontal overflow, project minimum target heights | Bounded comparison tables intentionally scroll horizontally. |
| Enlarged text / user preferences | 200% root text with user letter/word/paragraph spacing; long value wrapping; forced colors and reduced motion | Simulates layout pressures; actual browser zoom, OS magnification and physical device testing remain required. |
| Native editing | Read/draft separation, no blur-save, blank rejection, Save, Cancel/Escape, dirty-collapse protection, select/date, multiline/IME, safe text output, focus and no-JavaScript inspection | Example accepted values stay in page memory. Production persistence, concurrent writes and navigation guards need application integration. |
| Accessibility structure | Named controls/regions, linked help/errors, caption and scoped headers, focusable/pannable table, native dialog focus/Escape | Manual assistive-technology testing is not complete; no WCAG certification is claimed. |
| Contrast | All 16 approved text/control/focus pairings pass their documented 4.5:1 or 3:1 thresholds | Approved pairings are bounded; arbitrary new color combinations need checks. |
| Bootstrap source | Six copied grid declaration groups match the pinned 5.3.8 distribution and its full SHA-256; license retained | Project component styles are separately authored, not claimed to be literal Bootstrap component code. |
| Official Google DESIGN.md lint | **0 errors, 3 warnings** with `@google/design.md@0.4.0`; [raw report with input digest](reports/design-md-lint.json) | Warnings explained below; alpha schema/tool may evolve. |

The three official linter warnings are `orphaned-tokens` for **border**, **divider** and **focus**. These colors are consumed by CSS boundaries/outlines, proven by the local custom-property check and browser audit. They are not referenced by the format’s background/text component fields. The warning is retained rather than mislabeling a border as a text/background role or adding unsupported component fields just to silence the tool. Review that tradeoff if the Google component schema gains appropriate boundary/focus properties.

Desktop, mobile and an open invalid form were visually inspected from browser screenshots. The behavior checks exposed and led to fixes for numeric-column selector precedence and a native progress bar overflowing under enlarged text. The reference keeps both outcomes as regression checks. Removed unused palette data did not become extra styling merely to satisfy token-consumer coverage.

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
npm exec --yes --package=@google/design.md@0.4.0 -- designmd lint ../UI-Spec/DESIGN.md | node ../UI-Spec/record-design-lint.mjs
```

The unit check binds this report to the exact DESIGN.md SHA-256. After editing tokens or design prose, regenerate DESIGN.md, rerun the official check and review any changed findings. The expected warning set is explicit in the unit test, so new findings require review rather than being silently treated as the same result.

See [REVIEW.md](REVIEW.md) for remaining manual review, the acceptance gates and mandatory rework when a maintainer rejects a purpose or user intent.
