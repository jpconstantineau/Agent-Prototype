# Maintainer review and verification

## Purpose

Make the purpose and user intent of every CSS declaration first-class approval criteria. Prevent a syntactically valid stylesheet or a pleasant screenshot from being accepted without an explainable use case.

## User intent

Get an interface whose choices reduce real effort, prevent errors and remain operable under actual reading/input conditions.

## Agent intent

Implementation agents expose their reasoning and observable evidence. They do not approve their own design on a maintainer’s behalf and must rework any rejected purpose or intent before calling the affected design accepted.

## Review gates

Each row in CSS-DECISIONS.md has a stable declaration ID. The review scope includes selector and media condition, property, exact value, shorthand effects, source/provenance, purpose, user intent and verification family. Defaults, tokens and copied Bootstrap rules are included. A maintainer reviews these gates in order:

1. **Need:** Which actual user task or failure makes this property necessary? Could the native HTML default satisfy it with less complexity? “Polish”, “modern” or “consistency” alone does not establish a need.
2. **Intent:** Is the recorded user intention accurate for this component and state? Does the rule help the user finish that intention without hiding information or an important choice?
3. **Value:** Why this color, size, unit, fraction, breakpoint or keyword? Are nearby values already available as tokens? Does a shorthand reset unrelated behavior?
4. **Scope:** Does the selector target exactly the intended component/state? Check cascade order, inheritance, native controls, disabled/error/focus states, forced colors and the mobile layout. Check both its minimum and maximum content examples.
5. **Evidence:** Is the declaration in the generated CSS, is it accepted by the browser, does the example exercise its state, and is the relevant verification present? Then manually assess whether the stated benefit is credible.
6. **Tradeoff:** What becomes worse or less flexible? Is that acceptable for this use case? Record alternatives instead of treating a framework default as an unquestionable answer.

No human acceptance is recorded yet. The ledger deliberately labels every decision proposed. A passing `ui:check` does not change that label.

## Rejection and rework procedure

For an objection, record a review comment/issue using this template:

```text
Declaration ID(s): summary.1, summary.2
Review gate: value / need / intent / scope / evidence / tradeoff
Observed user task and context:
Disputed purpose or intent:
Evidence or counterexample:
Required outcome (not merely a replacement color/size):
Status: rework required
```

The implementing agent must reproduce the counterexample, revisit the user intention, remove or revise the declaration, revise its rationale in system.mjs and any affected DESIGN/component guidance, regenerate the ledger/CSS and rerun the relevant checks. Add a behavioral regression check where meaningful. Return the exact changed IDs and evidence for a new review. Do not close an intent disagreement by just rephrasing the same justification. If the rationale is still disputed, retain rework-required status in the review conversation/issue; never label it accepted because tests pass.

Stable IDs identify a rule and tuple slot, not a cryptographic version. Do not insert a tuple before existing IDs; append new declarations, or give a replaced/reorganized rule a new ID and record the mapping in the review. Cite the Git revision alongside IDs when reviewing older values. Human approvals and objections live in the actual review/issue history, not invented automated approval metadata.

## Automated verification families

Every declaration references a named family; each family is explicitly tested in `docs/e2e/ui-spec.spec.js` or `docs/tests/ui-spec.test.js`. One family tests outcomes of several declarations, rather than asserting hundreds of implementation values in meaningless mirror tests.

| Family | Observable checks / evidence |
| --- | --- |
| tokens | Generated output matches source; all Google token references resolve; canonical section ordering; custom properties have consumers; no untracked CSS. |
| colors / contrast | Permitted semantic color pairs meet contrast thresholds; sample colors and browser-supported declarations agree with the registry. |
| type | Body/default size, readable help, heading order, browser-root enlargement, long content and user text spacing remain usable. |
| grid / reflow | Below/at 768 and 992px, paired/work-support widths and source order; 320/390/768/992/1440px page bounds; enlarged text wraps without page overflow. |
| navigation / focus | Skip-to-main, natural summary activation, visible focus outline and return focus after editing/dialog. |
| targets | Primary buttons, summaries, navigation and choice labels meet the 44px project minimum at normal root size. |
| editing | Read/draft separation; opening; valid Save; Cancel/Escape; dirty-collapse handling; no blur-save; textarea newline and IME; select/date values; safe text output; no-JavaScript baseline. |
| validation | Required/blank rejection, linked textual error, invalid field focus, correction and unchanged accepted value. |
| controls | Native radio/checkbox/select/date behavior and genuine disabled attributes. |
| table | Captions/row/column headers, focusable named overflow regions, keyboard panning, numeric alignment and no page-level overflow. |
| states | Textual saved/pending/error/empty states and labeled progress; demo scope always explicit. |
| panels | Containing surfaces grow with content; no fixed-height clipping, reordering or page overlay. |
| dialog | Native modal top layer, safe initial focus, Cancel/Escape, explicit confirmation, focus return, viewport bounds. |
| forced-colors | Emulated forced colors retain visible focus and native controls; no forced-color-adjust:none rule. |

Structural tests reject a missing purpose/intent even when the CSS happens to look correct. Browser CSSOM comparison checks the full generated rule/declaration count and CSS.supports for every property/value, so a typo silently discarded by CSS parsing cannot count as covered. The reference loads only the one audited stylesheet. Inline styles, style elements, style assignment in JavaScript and extra stylesheet imports are prohibited. Negative tests demonstrate that missing rationale, duplicate IDs and altered generated CSS are detected.

These checks provide **traceability and bounded behavioral evidence**, not proof of good intent, complete WCAG conformance or screen-reader usability. Bootstrap’s source match proves provenance, not that the copied default is an appropriate product decision.

## Required manual review before product adoption

- Use a keyboard from the address bar: skip link, navigation, all disclosures, Save/Cancel, invalid Save, table panning and dialog Escape. Confirm the visible focus follows the logical reading order.
- Test at actual browser zoom of 200% and 400%, with enlarged OS text, long translated labels, very long saved values and the mobile software keyboard. Automated root-size/viewport tests approximate these pressures; they do not replace actual browser zoom or a physical mobile device.
- Test with NVDA/Chrome on Windows and VoiceOver/Safari on an Apple device if Safari is a deployment target. Confirm summary names, linked help/errors, status timing, table headers and modal focus. Browser accessibility snapshots cannot certify these experiences.
- Use Windows high contrast / forced colors, reduced motion and default platform controls. There is no authored motion; confirm nothing newly introduced starts animating under a later extension.
- Observe a person unfamiliar with the pattern find Edit, change a value, abandon a draft and correct an invalid value. Specifically challenge whether click-to-edit adds unnecessary steps for a creation-heavy workflow; normal always-open forms may be more suitable there.
- Verify chosen fonts on the supported OSes, copy/paste and input method composition, date localization, touch target comfort, and real persistence/error behavior when integrating with the app store.

Keep uncompleted manual checks visible in the PR/review. Do not present the absence of a manual failure as a manual pass.
