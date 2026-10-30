# Native components and interaction contracts

## Purpose

Make desktop and mobile components share predictable semantics and state transitions, rather than merely matching screenshots. CSS decisions are specified separately; HTML and JavaScript must preserve the user’s intended action.

## User intent

Find information, choose actions and change values without accidental writes, hidden validation, lost drafts or inaccessible custom widgets.

## Agent intent

An implementation agent composes these native patterns and documents any extension. Application agents do not control these demo components through tools; an actual tool action would need the app’s separate policy, validation and receipt contracts.

## Semantic element and attribute inventory

| Element / attribute | Purpose and user intent | Required behavior |
| --- | --- | --- |
| `html lang`, charset | Announce the right language and decode text reliably | Set actual page language; do not infer it from the visual theme. |
| viewport width=device-width, initial-scale=1 | Fit mobile layout while allowing user zoom | Never add maximum-scale or user-scalable=no. |
| header/nav/main/footer; named section/aside | Expose navigation, work and support boundaries | One visible h1, ordered headings, a labeled nav and a reachable main skip destination. |
| a href | Travel to another destination or anchor | Native Enter/open-in-new-tab semantics; meaningful link text; no fake href used for an action. |
| button type | Perform an action or submit a form | Specify button versus submit where ambiguity could accidentally submit. Native keyboard behavior; visible action label. |
| details/summary/open | Disclose genuinely optional supporting content | Not the inline-edit pattern. Direct editing never opens a details element or swaps display and input nodes. |
| form/name | Group one deliberate update and identify submitted values | One form per edit transaction; never nest forms. Reference forms do not submit to an app/backend. |
| label for / matching input id | Name a real control persistently | Click activates/focuses the control. The label remains present whether or not the field has focus. |
| input type=text/search/date; textarea; select/option | Use native text, search, date, multiline and choice editing | Preserve select arrow/date picker and browser keyboard behavior. No contenteditable or custom listbox. |
| required/maxlength/rows | State and enforce the field’s actual domain constraints | Required is written in the visible label. Length help matches the attribute. Rows gives a useful starting height, not an unchangeable viewport. |
| autocomplete/inputmode | Support appropriate completion and virtual keyboards | Use actual domain tokens for personal data (name/email/etc.) in real forms. These fictitious task-title examples opt out; do not copy autocomplete=off blindly into personal-data fields. Use inputmode only when the domain justifies it. |
| fieldset/legend; input name/value/checked | Name related choices and establish radio grouping | Radio names match only within a real group. Initial checked state must reflect a real saved/default value, never an invented human answer. Associated labels supply touch targets. |
| disabled + described reason | Prevent unavailable actions without hiding why | Native disabled enforces behavior; adjacent help explains the dependency. Do not enable writes merely by removing a disabled class. |
| readonly | Allow copying a fixed value when a real input must remain present | Do not toggle readonly to enter this edit pattern: the input is always editable and focusable. Do not confuse read-only with disabled or omit a label. |
| hidden | Remove inactive error/status content | No CSS override may expose it accidentally. Do not hide content containing the active focus. |
| aria-describedby / aria-invalid | Associate help and an actual validation failure | Space-separated IDs resolve; invalid appears only after failed validation and clears after correction. Text explains the fix. |
| role=status / aria-live=polite | Announce settled saves, cancellations and results | Do not announce each keystroke. A status line does not prove a database commit. |
| role=alert | Announce a new blocking input error | Populate it on failed submission, keep it adjacent and focus the invalid field. Avoid duplicate modal error announcements. |
| table/caption/thead/tbody/th scope | Preserve row and column meaning | Header cells use col/row scope. No ARIA grid, clickable rows or block-display table transformations. |
| role=region + accessible name + tabindex=0 | Make a wide table’s overflow intentionally reachable | Region is bounded; keyboard focus has a visible outline; only the table region may pan horizontally. |
| dialog/showModal/form method=dialog | Put a true blocking decision into the native top layer | Accessible title and description; initially focus the safe action; Escape/cancel returns focus to the opener. No manual focus trap. |
| progress value/max + label | Announce known, actual progress | Visible text repeats the quantity. For unknown progress omit value and explain what is happening; do not invent percent completion. |
| data-* / class | Bind examples and styles without altering semantics | Data values are implementation hooks, never trust boundaries or user-visible truth. No inline style attributes. |

## Focus-to-edit native values

The existing value is already in a real input, textarea or select. Labels persist above it. The ordinary control dimensions and padding remain in place, but .ui-inline-control sets the unfocused border color and background to transparent. CSS :focus restores a contrast-tested boundary, surface and outline immediately for keyboard, pointer or touch. Nothing opens, swaps nodes or changes readonly/disabled state. A simple text value looks like information until selected; the native control remains the accessible interaction throughout.

Only CSS owns that visual state. JavaScript manages record drafts, validation and explicit Save/Cancel, never style attributes or focus classes. A field with aria-invalid=true keeps its error border after blur, alongside its textual error. Forced-color users get system control boundaries even at rest. These two documented exceptions prioritize finding a problem/control over the quiet resting appearance. Native select/date affordances remain available; only text/notes chrome is quieted. Notes restore their native resize handle while focused.

| Event | UI and data outcome | User intention protected |
| --- | --- | --- |
| Initial record | Prefilled native controls are visible, enabled and keyboard reachable; only their chrome is quiet | Read the current information without opening an editor. |
| Click, tap, label activation or Tab into a value | The same DOM control receives focus and CSS reveals its existing box | Edit directly in one focus action without layout movement. |
| Type/select/date change | Draft values change and an Unsaved status is announced | Understand that the visible values are drafts. |
| Blur/outside click | Box returns to quiet styling; the visible draft remains; no write, revert or hide occurs | Consult another field without losing or silently accepting changes. |
| Invalid Save | Keep values, show linked Error text, mark aria-invalid, focus the first invalid field | Correct the problem without losing other field drafts. |
| Valid Save changes | Validate the whole example record, accept its values and announce a settled save | Commit the record deliberately; no hidden focus/blur transaction. |
| Cancel changes / Escape outside IME composition | Restore all fields to the last accepted record and clear errors; focus the title | Back out of the whole draft without a write. |
| Enter in text input | Native form submission activates the visible Save action | Keep familiar native form behavior. |
| Enter in textarea / IME composition | Native newline/composition; no implicit Save or composition-time Escape cancellation | Finish the text before deciding to submit. |
| Change appearance | Change only the governing palette/density attributes; retain focus and all field values | Inspect another mode without altering the record. |
| Reload/navigation | Example draft and accepted record values reset; appearance preference alone may persist | Keep this reference’s limited persistence scope explicit. |
| No JavaScript | Prefilled controls, label focus and CSS box reveal work; example Save/Cancel and appearance controls disabled with an explanation | Preserve inspectability without pretending to persist or apply preferences. |

Fields use a grid of label, value, help and visible error. Child block margins are zero; the parent row gap supplies 8px normal / 6px compact separation, clearing the 3px focus outline plus 3px offset. Field padding and divider separate neighboring records. Ordinary panels remove their final child’s trailing margin; stack panels own their gaps. Density never changes font size, line height, Save/Cancel semantics or a draft. See [BOX-MODEL.md](BOX-MODEL.md) for border floors and every margin owner.

The sample preserves whitespace in optional notes. Required titles reject blank/whitespace-only input, with a visible maxlength constraint. A select keeps native option values and labels; a date keeps native date-picker behavior. Single-line inputs can scroll internally to inspect a long value; choose a textarea when every line must stay visible without caret movement. Never duplicate a read value over an input, overlay an invisible input, use contenteditable, hide a value with CSS text clipping or add a fake clickable label in place of the control.

For asynchronous production saves, add a named Saving state, block duplicate submissions, preserve drafts on failure and announce Saved only after the authoritative transaction commits. Cancellation must reflect the real transaction outcome. Ignore stale responses and keep concurrent-update handling explicit. These are application integration requirements, not persistence claims made by this CSS example.

## Azure primary buttons

Use native buttons with visible written action labels. `.btn-primary` keeps azure #006aa8 and white text in every appearance, with a transparent permanent border and deeper azure hover. The reserved 1px border width keeps its geometry stable. Do not add a bright border, shadow or pale dark-mode fill. Keyboard :focus-visible still shows the separate 3px focus outline with 3px offset; forced colors uses a system ButtonText border and Highlight focus.

The written label identifies this control, so its fill/background edge has the bounded exception in [COLOR-SELECTION.md](COLOR-SELECTION.md). On charcoal panels it is 2.35:1, while the white label is 5.79:1 against azure. Do not generalize that exception to inputs, selection marks, icon-only buttons or focus. Secondary actions retain a neutral boundary/surface and an interactive-blue text label. Links and native selected accents use interactive rather than the primary fill to retain contrast on their actual backgrounds.

## Appearance controls and eight combinations

Three labeled native input[type=checkbox] controls have role=switch and a CSS slider track/thumb: **Dark mode**, **Distinct status colors** and **Compact mode**. Labels do not change with state. Space toggles a focused switch; native checked is authoritative, so no redundant aria-checked is assigned. The whole label provides the large target; thumb position and a written status identify the selected combination without hue. Checked tracks use interactive and thumbs use on-interactive, with at least 3:1 thumb/track contrast. These graphic marks do not inherit the labelled-button boundary exception. Forced colors restores a native mark. Movement is immediate with no animation.

| Dark mode | Distinct status colors | Result |
| --- | --- | --- |
| Off | Off | Light / standard |
| On | Off | Dark / standard |
| Off | On | Light / distinct blue/amber status palette |
| On | On | Dark / distinct blue/amber status palette |

Each palette above supports normal and compact density, for eight combinations. The root data-bs-theme attribute follows Bootstrap’s light/dark convention; data-vision adds standard/distinct and data-density adds normal/compact. Complete palettes and density profiles govern every component through the same custom properties. A small external script applies a valid preference before CSS, uses system brightness when none exists, and persists {theme, vision, density} to the reference-specific localStorage key daylist-ui-reference-appearance-v1. Existing two-property records preserve their theme/vision and default density to normal; invalid density also defaults to normal. Malformed or denied storage never blocks the page; changed preferences still apply in memory. Appearance is not a theme setting for the production app and does not enter agent prompts or task data. No-JavaScript mode stays in the complete light/standard/normal fallback.

“Distinct” is a preference rather than a color-blind/OK classification. All four combinations must remain understandable without color. Named Saved/Pending/Error states, native marks, focus and persistent labels are mandatory. Distinct status labels also use solid versus dashed borders; error wording never depends on red versus green. Color-vision simulations are useful visual checks, not a universal guarantee or a substitute for testing with people.

## Layout and component recipes

| Pattern | Desktop | Mobile / enlarged text | Purpose and decision |
| --- | --- | --- | --- |
| Page shell | Capped container, ordinary header, primary workspace first | Navigation wraps; header scrolls away; source order retained | Keep identity and destinations findable without permanent chrome taking viewport height. |
| Main/support workspace | 8/4 Bootstrap pair from lg | One column, task before explanation | Prioritize the work while keeping context adjacent when space permits. |
| Peer cards | Half-width from md | Stack with vertical gutter | Compare equal-role information without duplicating actions. Cards group content; they are not clickable unless a real named link is provided. |
| Action toolbar | Wrapping flex cluster | Actions wrap and remain full-size | No icon-only mystery buttons or horizontal button strip that disappears off screen. |
| Editable record | Prefilled native values with quiet unfocused borders | Same structure, 44px normal; compact 36px fine-pointer / 44px coarse-pointer minima | Focus reveals the same field; Save/Cancel explicitly accepts or reverts the draft. |
| Data table | Native two-dimensional comparison | Named horizontal scroll region | Keep comparison semantics; ordinary forms remain outside dense table cells. Never hide essential columns. |
| Search/filter | Persistent label, search input, result count | Full available width; no submit-on-every-keystroke inference | Filter already-loaded reference data locally; zero results keeps the query editable and announces zero. |
| Pagination | Real Prev/Next buttons/links plus visible range | Wrapping controls, same order | Use for genuinely long server/store collections; not needed for the tiny static sample table. Preserve filters and current position on error. |
| Empty state | Reason and one relevant recovery action inside the empty region | Same explanation and target size | Distinguish no data from no search matches and loading failure; do not fabricate totals or force a modal. |
| Status/error/progress | Text near the affected work | Wrap; do not overlay the keyboard or editor | A pending state is not success. Keep recovery next to its cause. |
| Modal | Native dialog, safe initial action | Bounded dynamic viewport, internal scrolling | Use only for a blocking decision; native prefilled fields handle ordinary editing. |
| Agent chat/support panel | Optional sibling region with clear run/Stop/answer status | Place after task content or an explicitly opened full-width surface | Preserve focus and pending forms when toggled. Adopt through the app’s separate interaction specs; this reference does not implement chat. |

Do not add breadcrumbs without a real hierarchy, tabs without correct selection/keyboard semantics, toasts as the only record of an error, or summary metrics that do not support a user decision. When a native select is suitable, use it before implementing an autocomplete/listbox. Form layout must remain one logical reading order; side-by-side unrelated required questions are a poor default even on desktop.

## Document content

Use the opt-in `.ui-prose` reading layer described in [CONTENT.md](CONTENT.md). It defines six document heading ranks, native lists/definitions/quotations, inline meaning, literal code, document tables, figures and disclosures. The [content specimen](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/content.html) separates Markdown v1 output from additional authored HTML. This layer supplies presentation, not a parser or new tool permission. Place application forms/toolbars outside prose.

## Expanded HTML/CSS catalog

[CSS-COMPONENTS.md](CSS-COMPONENTS.md) defines the native/presentation/alternative/script distinction, platform requirements and integration rules for the expanded component framework. [COMPONENT-CATALOG.md](COMPONENT-CATALOG.md) supplies the exhaustive reviewed name mapping, public classes and complete example markup. Inspect the [live catalog](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html). Native browser actions work without component JavaScript; state engines, application writes and async data remain separate.
