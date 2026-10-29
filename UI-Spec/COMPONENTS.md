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
| details/summary/open | Review a value and disclose its editor | Keep the native marker and summary keyboard behavior. Opening alone never writes. Do not add redundant button roles or aria-expanded to summary. |
| form/name | Group one deliberate update and identify submitted values | One form per edit transaction; never nest forms. Reference forms do not submit to an app/backend. |
| label for / matching input id | Name a real control persistently | Click activates/focuses the control. The summary’s saved text is not the editing control’s accessible label. |
| input type=text/search/date; textarea; select/option | Use native text, search, date, multiline and choice editing | Preserve select arrow/date picker and browser keyboard behavior. No contenteditable or custom listbox. |
| required/maxlength/rows | State and enforce the field’s actual domain constraints | Required is written in the visible label. Length help matches the attribute. Rows gives a useful starting height, not an unchangeable viewport. |
| autocomplete/inputmode | Support appropriate completion and virtual keyboards | Use actual domain tokens for personal data (name/email/etc.) in real forms. These fictitious task-title examples opt out; do not copy autocomplete=off blindly into personal-data fields. Use inputmode only when the domain justifies it. |
| fieldset/legend; input name/value/checked | Name related choices and establish radio grouping | Radio names match only within a real group. Initial checked state must reflect a real saved/default value, never an invented human answer. Associated labels supply touch targets. |
| disabled + described reason | Prevent unavailable actions without hiding why | Native disabled enforces behavior; adjacent help explains the dependency. Do not enable writes merely by removing a disabled class. |
| readonly | Allow copying a fixed value when a real input must remain present | Not used to make the click-to-edit display; summary text is simpler. Do not confuse read-only with disabled or omit a label. |
| hidden | Remove inactive error/status content | No CSS override may expose it accidentally. Do not hide content containing the active focus. |
| aria-describedby / aria-invalid | Associate help and an actual validation failure | Space-separated IDs resolve; invalid appears only after failed validation and clears after correction. Text explains the fix. |
| role=status / aria-live=polite | Announce settled saves, cancellations and results | Do not announce each keystroke. A status line does not prove a database commit. |
| role=alert | Announce a new blocking input error | Populate it on failed submission, keep it adjacent and focus the invalid field. Avoid duplicate modal error announcements. |
| table/caption/thead/tbody/th scope | Preserve row and column meaning | Header cells use col/row scope. No ARIA grid, clickable rows or block-display table transformations. |
| role=region + accessible name + tabindex=0 | Make a wide table’s overflow intentionally reachable | Region is bounded; keyboard focus has a visible outline; only the table region may pan horizontally. |
| dialog/showModal/form method=dialog | Put a true blocking decision into the native top layer | Accessible title and description; initially focus the safe action; Escape/cancel returns focus to the opener. No manual focus trap. |
| progress value/max + label | Announce known, actual progress | Visible text repeats the quantity. For unknown progress omit value and explain what is happening; do not invent percent completion. |
| data-* / class | Bind examples and styles without altering semantics | Data values are implementation hooks, never trust boundaries or user-visible truth. No inline style attributes. |

## Click-to-edit state machine

The term “label-like” describes the presentation of a saved value. It is not permission to replace a native interactive element with a clickable label/div. The read state is a native summary containing field name, saved text and an always-visible Edit cue. Essential text is real HTML, not pseudo-element content. Summary retains its browser disclosure marker.

| State / event | UI and data outcome | User intention protected |
| --- | --- | --- |
| Closed, summary activated by click/Enter/Space | Browser opens details; enhancement focuses its control | Choose one value to edit without navigating away. |
| Open, type/select/date change | Only the draft control changes | Explore a change without committing it. |
| Open, blur/outside click | Nothing saves; draft remains | Consult other content without an unintended write. |
| Open, invalid Save | Keep editor open, show linked error, aria-invalid=true, focus field | Understand and correct the precise problem without losing input. |
| Open, valid Save | Validate, copy draft to example saved state, update summary with textContent, close and return summary focus; announce result | Commit deliberately and see what was accepted. |
| Open, Cancel/Escape outside IME composition | Restore the saved draft, clear error, close, focus summary, announce cancellation | Back out without modifying the accepted value. |
| Open, dirty summary collapsed | Enhancement reopens it and explains Save or Cancel | Avoid concealing an unsaved draft behind a saved-value label. No automatic save or silent discard. |
| Open, unchanged summary collapsed | Native details closes normally | Leave inspection without an unnecessary confirmation. |
| Enter in textarea / IME composition | Native newline/composition; not an implicit Save | Finish writing before deciding to submit. |
| Reload/navigation | Reference drafts and sample saves are lost | Scope is explicit; reference is not a persistence demo. Production integration must warn/persist under its own contract. |
| No JavaScript | Native summary, labels, fields and constraints remain available; example Save/Cancel disabled with explanation | Retain inspectability without pretending to persist. |

The sample retains whitespace in optional notes; no hidden cleanup changes the accepted text. Required titles reject blank and whitespace-only values, with the visible maximum length. A select stores its option value while its summary displays the option’s label. Empty optional dates display Not set; real applications should localize date display without changing the canonical stored date.

For production asynchronous saves, add a named Saving state, block duplicate submissions, preserve the draft on failure and announce Saved only after the authoritative transaction commits. Keep Cancel during a write aligned with actual transaction cancellation; never claim cancellation after a committed operation. Out-of-order responses must not replace a newer accepted value. Storage, authorization, concurrent updates and dirty-page navigation are application integration requirements, not CSS features implemented by this reference.

## Layout and component recipes

| Pattern | Desktop | Mobile / enlarged text | Purpose and decision |
| --- | --- | --- | --- |
| Page shell | Capped container, ordinary header, primary workspace first | Navigation wraps; header scrolls away; source order retained | Keep identity and destinations findable without permanent chrome taking viewport height. |
| Main/support workspace | 8/4 Bootstrap pair from lg | One column, task before explanation | Prioritize the work while keeping context adjacent when space permits. |
| Peer cards | Half-width from md | Stack with vertical gutter | Compare equal-role information without duplicating actions. Cards group content; they are not clickable unless a real named link is provided. |
| Action toolbar | Wrapping flex cluster | Actions wrap and remain full-size | No icon-only mystery buttons or horizontal button strip that disappears off screen. |
| Editable record | Values scanned in disclosure summaries | Same structure, 44px minimum targets | No hover-only Edit action; the user chooses the transaction explicitly. |
| Data table | Native two-dimensional comparison | Named horizontal scroll region | Keep comparison semantics; ordinary forms remain outside dense table cells. Never hide essential columns. |
| Search/filter | Persistent label, search input, result count | Full available width; no submit-on-every-keystroke inference | Filter already-loaded reference data locally; zero results keeps the query editable and announces zero. |
| Pagination | Real Prev/Next buttons/links plus visible range | Wrapping controls, same order | Use for genuinely long server/store collections; not needed for the tiny static sample table. Preserve filters and current position on error. |
| Empty state | Reason and one relevant recovery action inside the empty region | Same explanation and target size | Distinguish no data from no search matches and loading failure; do not fabricate totals or force a modal. |
| Status/error/progress | Text near the affected work | Wrap; do not overlay the keyboard or editor | A pending state is not success. Keep recovery next to its cause. |
| Modal | Native dialog, safe initial action | Bounded dynamic viewport, internal scrolling | Use only for a blocking decision; disclosures handle normal editing. |
| Agent chat/support panel | Optional sibling region with clear run/Stop/answer status | Place after task content or an explicitly opened full-width surface | Preserve focus and pending forms when toggled. Adopt through the app’s separate interaction specs; this reference does not implement chat. |

Do not add breadcrumbs without a real hierarchy, tabs without correct selection/keyboard semantics, toasts as the only record of an error, or summary metrics that do not support a user decision. When a native select is suitable, use it before implementing an autocomplete/listbox. Form layout must remain one logical reading order; side-by-side unrelated required questions are a poor default even on desktop.
