# Daylist interface rationale

This file records the current app interface. The proposed forward-looking framework is in [UI-Spec/DESIGN.md](../UI-Spec/DESIGN.md), with [component contracts and declaration review](../UI-Spec/README.md). Its [reference page](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/) is isolated from the app until maintainers adopt individual patterns.

The primary job is to capture a task, find it later, and mark it done. The assistant is an optional way to perform those same actions. The interface should make these operations clear before explaining the technology behind them.

## Review of the original page

- The sidebar repeated the same three filters already above the list. Its personal avatar and workspace label implied account or workspace switching that the product did not offer.
- Summary cards, a navigation badge, and a list badge repeated totals without adding a decision or action.
- A breadcrumb described a hierarchy with no navigable parent. Motivational headings, decorative sparks, and footer slogans displaced the working list.
- Storage and local AI claims appeared in multiple places. An unavailable assistant still occupied a full-height column with a composer that could not send.
- Small supporting text and faint colors made task details and controls unnecessarily hard to read.

## Purpose of the retained elements

| Element | User purpose and behavior |
| --- | --- |
| Brand and home link | Identify the product and return to its initial view. The existing checkmark and green identity remain recognizable. |
| Skip link and main heading | Let keyboard and screen reader users reach and identify the task workspace. |
| Current date | Give due dates and overdue labels a reference in the user's local day. |
| New task | Provide one consistent primary action. It is disabled until storage opens. |
| All / To do / Completed | Choose which tasks to see. Counts live inside these controls, showing the size of each collection before selecting it. Counts are independent of search. |
| Search and conditional match summary | Find titles or notes within the selected collection. Show the query, collection, and number of matches only while a search is active. |
| Task title and optional notes | Identify the work and expose the user's context. Long content wraps; long notes scroll within the row and remain editable in full. |
| Completion checkbox | Complete or reopen a task directly. Text and check state communicate completion without relying on color. |
| Priority and due date | Surface exceptions and deadlines. Normal priority adds no distinguishing information, so its badge is omitted; high and low priority remain explicit. Overdue dates have both a label and a different color. |
| Edit | Make changing a task discoverable without interpreting an unlabeled icon. |
| Empty states | Explain whether the list is new, complete, unmatched, or has no completed tasks. Offer Clear search or View all tasks only when it resolves the current state. |
| Pagination | Navigate lists longer than 25 tasks and show the displayed range. Hidden for shorter lists. |
| Storage footer | State the actual persistence boundary once: this browser, without cloud sync. Storage failures replace the saved message. |
| Assistant toggle and close | Let users allocate space to chat or tasks. The panel starts closed on mobile; opening and closing move keyboard focus appropriately. |
| AI connection status and enable action | Explain availability before asking for input. Enable starts the existing local model flow, including download progress. Unavailable AI produces a compact explanation and setup disclosure instead of unusable chat controls. |
| Example requests | Teach the natural-language interaction with two distinct operations. They prepare editable input and never submit automatically. |
| Conversation and tool activity | Show what the user asked and what the assistant actually did. Expandable tool results retain the prototype's inspectability without filling the main task workspace. |
| Composer, Send, and Stop | Submit a request or cancel a run. Input requires a connected model; keyboard guidance explains Enter and Shift+Enter. |
| New chat | Reset conversation context when there is a conversation to reset. It is unavailable during an active run or model initialization. |
| Browser setup disclosure | Keep technical connection details, setup links, and conversation persistence information available when needed. |
| Task editor | Collect a required title and optional notes, priority, and date. Save, Cancel, close, and Escape have clear outcomes; errors remain beside the form. |
| Toast and live status | Confirm saved operations and announce failures without forcing a navigation or interrupting editing. |

## Layout and interaction decisions

The task list is the primary white surface on a warm neutral canvas. A muted green assistant panel distinguishes the optional interaction from saved task data. Dark green denotes the main action and selected controls. Text is generally 13–16px, with a larger task heading; supporting labels have readable contrast. No external fonts, images or runtime dependencies are added. A human-configured local inference endpoint is optional.

The sidebar, metric cards, duplicate add row, and decorative copy are removed. On narrow screens the search field moves below the filters. Task titles wrap, the editor stacks its fields, and the assistant opens below the task workspace. Hidden panels leave the accessibility tree. Opening an editor focuses its title; closing the assistant returns focus to its toggle. Reduced-motion preferences are respected.

A newly created task clears search and returns to All tasks so the saved item is visible, even if it was created while viewing Completed or an unrelated search. Editing preserves the selected collection. Existing storage, cross-tab updates, tool contracts, cancellation behavior, and native WebMCP integration remain in place.

## Verification

The browser suite exercises task CRUD, safe text rendering, persistence, cross-tab updates, filters and recovery, creation from a filtered view, assistant connection and cancellation, storage failure, keyboard focus, native WebMCP, and layouts at 320, 390, 768, 1024, and 1440px. Screenshots are written to ignored `docs/.tmp/` for review. Scripted model responses verify interaction behavior, not real local-model accuracy.

## Foundation interaction surfaces

The native question card is part of the conversation and outside the composer form. Its fieldsets use actual radio, checkbox and text controls. Recommendations annotate choices without selecting them. The card owns only a local draft until explicit submission; Skip is explicit, custom mode excludes inactive choices, and Cancel shares Stop. A read-only summary records what was actually sent. Waiting does not block manual task editing. Focus moves on arrival and settlement, not on every edit; the hidden-panel toggle announces Answer needed.

Model settings is a human-owned modal that saves a device-local route and tests compatibility separately. Saving and editing never start a chat run. Load models explicitly queries the configured endpoint and populates a native selector with exact model IDs; it never selects the first result automatically or runs inference. Changing the connection clears choices, and stale replies cannot repopulate them. Bearer tokens are direct user inputs held only in page memory, with an explicit Forget action. Visible provider/context status distinguishes Chrome measurements, configured server values and Unknown. Fallback has its own visible marker or explicit Continue choice, preserving the original run budget and committed operations.

The setup disclosure explains diagnostic persistence and offers the last run’s JSON log for troubleshooting. It does not suggest that logs are resumable chat history. The full diagnostics inspector remains a separate epic.
