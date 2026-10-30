# Component coverage and HTML contracts

## Purpose

Record every reviewed core-catalog name, its dependency classification, dedicated public classes, executable native example and complete HTML contract. Generated from component-catalog.mjs and catalog-examples.mjs. Read [CSS-COMPONENTS.md](CSS-COMPONENTS.md) for integration, behavior limits and maintainer review.

## User intent

Find an inspectable native component, understand its behavior and avoid confusing a styled shell with a complete application widget.

## Agent intent

Implementation agents use the listed classes/HTML and audited declaration rationale. Runtime agents gain no tool access through this catalog. A visual component neither runs an application action nor grants permission to data.

Reviewed 2026-10-29: [shadcn/ui core catalog](https://ui.shadcn.com/docs/components) (66 names), [daisyUI 5.7.50](https://daisyui.com/components/) (68 names). Names are deduplicated into 96 families: 87 included examples and nine script-dependent widget engines. These are independently authored equivalents, not imported upstream implementations or a promise of every upstream variant. AI extension packages, community registries, chart integrations and form adapters are separate integrations, outside these core catalogs. Their static message/code/disclosure primitives are covered here.

| Family | shadcn/ui names | daisyUI names | Classification | Public classes / example |
| --- | --- | --- | --- | --- |
| Accordion | Accordion | Accordion | native | .ui-accordion · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-accordion) |
| Alert | Alert | Alert | presentation | .ui-alert · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-alert) |
| Alert dialog | Alert Dialog | — | native | .ui-alert-dialog · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-alert-dialog) |
| Aspect ratio | Aspect Ratio | — | presentation | .ui-aspect-ratio · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-aspect-ratio) |
| Attachment | Attachment | — | native | .ui-attachment · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-attachment) |
| Aura / emphasis border | — | Aura | presentation | .ui-aura · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-aura) |
| Avatar | Avatar | Avatar | presentation | .ui-avatar · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-avatar) |
| Badge | Badge | Badge | presentation | .ui-badge · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-badge) |
| Breadcrumbs | Breadcrumb | Breadcrumbs | native | .ui-breadcrumb · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-breadcrumb) |
| Chat messages | Bubble, Message | Chat bubble | presentation | .ui-chat, .ui-bubble, .ui-message · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-chat) |
| Button | Button | Button | native | .ui-button · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-button) |
| Button group / join | Button Group | Join (group items) | presentation | .ui-button-group, .ui-join · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-button-group) |
| Calendar widget | Calendar | Calendar | script | Application logic required |
| Card | Card | Card | presentation | .ui-card · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-card) |
| Carousel / scroll gallery | Carousel | Carousel | alternative | .ui-carousel, .ui-slide · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-carousel) |
| Interactive chart | Chart | — | script | Application logic required |
| Checkbox | Checkbox | Checkbox | native | .ui-checkbox · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-checkbox) |
| Code block | Code Block | — | presentation | .ui-code-block · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-code-block) |
| Collapsible | Collapsible | Collapse | native | .ui-collapse · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-collapse) |
| Native suggestions | Combobox | — | alternative | .ui-combobox · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-combobox) |
| Command palette | Command | — | script | Application logic required |
| Context menu | Context Menu | — | script | Application logic required |
| Data table engine | Data Table | — | script | Application logic required |
| Native date picker | Date Picker | — | alternative | .ui-date-picker · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-date-picker) |
| Dialog / modal | Dialog | Modal | native | .ui-modal · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-dialog) |
| Direction | Direction | — | native | .ui-direction · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-direction) |
| Drawer | Drawer | Drawer sidebar | alternative | .ui-drawer · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-drawer) |
| Dropdown links | Dropdown Menu | Dropdown | alternative | .ui-dropdown · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-dropdown) |
| Empty state | Empty | — | presentation | .ui-empty-state · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-empty) |
| Field and fieldset | Field | Fieldset | native | .ui-fieldset, .ui-form-field · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-field) |
| Hover / focus preview | Hover Card | — | native | .ui-hover-card · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-hover-card) |
| Text input | Input | Text Input | native | .ui-input · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-input) |
| Input group | Input Group | — | presentation | .ui-input-group · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-input-group) |
| One-time code input | Input OTP | OTP | alternative | .ui-otp · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-otp) |
| Item / list | Item | List | presentation | .ui-item-list, .ui-item · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-item) |
| Keyboard key | Kbd | Kbd | presentation | .ui-kbd · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-kbd) |
| Label | Label | Label | native | .ui-label · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-label) |
| Text marker | Marker | — | presentation | .ui-marker · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-marker) |
| Application menubar | Menubar | — | script | Application logic required |
| Automatic message scroller | Message Scroller | — | script | Application logic required |
| Native select | Native Select | Select | native | .ui-select · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-native-select) |
| Navigation links | Navigation Menu | Menu | alternative | .ui-menu · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-navigation-menu) |
| Pagination links | Pagination | Pagination | native | .ui-pagination · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-pagination) |
| Popover | Popover | — | native | .ui-popover · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-popover) |
| Progress | Progress | Progress | native | .ui-progress · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-progress) |
| Questionnaire workflow | Questionnaire | — | script | Application logic required |
| Radio group | Radio Group | Radio | native | .ui-radio · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-radio) |
| Resizable surface | Resizable | — | alternative | .ui-resizable · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-resizable) |
| Scroll area | Scroll Area | — | native | .ui-scroll-area · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-scroll-area) |
| Custom select/listbox | Select | — | script | Application logic required |
| Separator / divider | Separator | Divider | presentation | .ui-divider · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-separator) |
| Sheet | Sheet | — | native | .ui-sheet · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-sheet) |
| Sidebar | Sidebar | — | native | .ui-sidebar · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-sidebar) |
| Skeleton | Skeleton | Skeleton | presentation | .ui-skeleton · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-skeleton) |
| Native range slider | Slider | Range slider | native | .ui-range · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-slider) |
| Loading / spinner | Spinner | Loading | presentation | .ui-spinner · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-spinner) |
| Switch | Switch | Toggle | native | .ui-toggle · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-switch) |
| Table | Table | Table | presentation | .ui-data-table · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-table) |
| Tabbed links / native panel chooser | Tabs | Tabs | alternative | .ui-tabs, .ui-tab-links · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-tabs) |
| Textarea | Textarea | Textarea | native | .ui-textarea · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-textarea) |
| Toast presentation | Toast | Toast | presentation | .ui-toast · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-toast) |
| Checkbox button | Toggle | — | alternative | .ui-toggle-button · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-toggle) |
| Multiple toggle choices | Toggle Group | — | alternative | .ui-toggle-group · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-toggle-group) |
| Tooltip | Tooltip | Tooltip | native | .ui-tooltip · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-tooltip) |
| Trace disclosure | Trace | — | native | .ui-trace · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-trace) |
| Typography | Typography | — | presentation | .ui-prose · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-typography) |
| Countdown number display | — | Countdown | presentation | .ui-countdown · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-countdown) |
| Comparison / diff view | — | Diff | alternative | .ui-diff, .ui-diff-wipe · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-diff) |
| Bottom navigation / dock | — | Dock | native | .ui-dock · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-dock) |
| Corner action / speed dial | — | FAB / Speed Dial | native | .ui-fab · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-fab) |
| File input | — | File Input | native | .ui-file-input · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-file-input) |
| Fixed-data filter | — | Filter | native | .ui-filter · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-filter) |
| Footer | — | Footer | presentation | .ui-footer · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-footer) |
| Introductory panel / hero | — | Hero | presentation | .ui-hero · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-hero) |
| Hover 3D | — | Hover 3D Card | presentation | .ui-hover-3d · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-hover-3d) |
| Hover gallery | — | Hover Gallery | native | .ui-hover-gallery · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-hover-gallery) |
| Indicator | — | Indicator | presentation | .ui-indicator · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-indicator) |
| Link | — | Link | native | .ui-link · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-link) |
| Image mask | — | Mask | presentation | .ui-mask · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-mask) |
| Large navigation popover | — | Megamenu | native | .ui-megamenu · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-megamenu) |
| Browser mockup | — | Browser mockup | presentation | .ui-mockup-browser · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-mockup-browser) |
| Code mockup | — | Code mockup | presentation | .ui-mockup-code · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-mockup-code) |
| Phone mockup | — | Phone mockup | presentation | .ui-mockup-phone · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-mockup-phone) |
| Window mockup | — | Window mockup | presentation | .ui-mockup-window · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-mockup-window) |
| Navigation bar | — | Navbar | native | .ui-navbar · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-navbar) |
| Radial progress | — | Radial progress | presentation | .ui-radial-progress · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-radial-progress) |
| Rating | — | Rating | native | .ui-rating · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-rating) |
| Visual stack | — | Stack | presentation | .ui-visual-stack · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-stack) |
| Statistic | — | Stat | presentation | .ui-stat · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-stat) |
| Status | — | Status | presentation | .ui-status-indicator · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-status) |
| Steps | — | Steps | presentation | .ui-steps · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-steps) |
| Swap | — | Swap | native | .ui-swap · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-swap) |
| Text rotation | — | Text Rotate | presentation | .ui-text-rotate · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-text-rotate) |
| CSS theme preview | — | Theme Controller | native | .ui-theme-controller, .ui-theme-sandbox · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-theme-controller) |
| Timeline | — | Timeline | presentation | .ui-timeline · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-timeline) |
| Native validation styling | — | Validator | native | .ui-validator · [live](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/catalog.html#catalog-validator) |

## Accordion

Purpose: Group related optional explanations.

User intent: Expand one named explanation while keeping other summaries reachable.

Classification: **native**. Native details with a shared name gives exclusive opening; no scripted animation.

Public classes: `.ui-accordion`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<details class="ui-accordion" name="catalog-accordion"><summary>First explanation</summary><p>Opening another summary in this group closes this one.</p></details><details class="ui-accordion" name="catalog-accordion"><summary>Second explanation</summary><p>The browser owns this exclusive open state.</p></details>
```

## Alert

Purpose: Make a condition and its next step readable together.

User intent: Recognize an important message from its wording and structure.

Classification: **presentation**. Static message; live role/announcement timing belongs to real application events.

Public classes: `.ui-alert`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<aside class="ui-alert"><strong>Example notice:</strong> Review the supplied settings before continuing. This static sample is not a live application alert.</aside>
```

## Alert dialog

Purpose: Focus a blocking example decision in the native top layer.

User intent: Read the decision and cancel safely with native focus return.

Classification: **native**. dialog + role=alertdialog + commandfor; example buttons only close, never mutate data.

Public classes: `.ui-alert-dialog`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" commandfor="dialog-alert-dialog" command="show-modal">Open alert-dialog example</button><dialog class="ui-alert-dialog" id="dialog-alert-dialog" role="alertdialog" aria-labelledby="dialog-alert-dialog-title" aria-describedby="dialog-alert-dialog-help"><h3 id="dialog-alert-dialog-title">alert-dialog example</h3><p id="dialog-alert-dialog-help">This is a native presentation example. Closing it does not approve, save or delete anything.</p><button class="ui-button" type="button" autofocus commandfor="dialog-alert-dialog" command="close">Close alert-dialog example</button></dialog>
```

## Aspect ratio

Purpose: Reserve a predictable media frame.

User intent: Inspect media without distortion or layout jumps.

Classification: **presentation**. 16:9 frame; object-fit contains the full source, with a written caption.

Public classes: `.ui-aspect-ratio`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<figure><div class="ui-aspect-ratio"><img src="./content-sample.svg" width="960" height="240" alt="Three neutral blocks increase in height from left to right."></div><figcaption>A 16:9 host contains the full 4:1 source without stretching it.</figcaption></figure>
```

## Attachment

Purpose: Present an explicitly named file destination.

User intent: Open the supplied local sample without a disguised action or automatic upload.

Classification: **native**. Native link; preview parsing, upload progress and attachment permissions are separate.

Public classes: `.ui-attachment`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<a class="ui-attachment" href="./content-sample.svg" download="neutral-sample.svg"><strong>Neutral illustration.svg</strong><span>Local SVG sample</span></a>
```

## Aura / emphasis border

Purpose: Demonstrate an optional accent frame without tinting a large work area.

User intent: Locate the explicitly labelled example emphasis without confusing it with focus.

Classification: **presentation**. Static layered border; no pulsing, no status meaning, no default application adoption.

Public classes: `.ui-aura`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-aura"><strong>Optional emphasis frame</strong><p>The requested border treatment keeps its reading surface neutral and does not mean keyboard focus.</p></div>
```

## Avatar

Purpose: Show an identity thumbnail or initials.

User intent: Associate a written person name with a compact identity mark.

Classification: **presentation**. Initials fallback is authored text; no failed-image detection logic is implied.

Public classes: `.ui-avatar`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-cluster"><span class="ui-avatar" aria-hidden="true">JD</span><span>Jordan Doe · authored initials fallback</span></div>
```

## Badge

Purpose: Keep short metadata visibly grouped.

User intent: Read a state or category without depending on a colored dot.

Classification: **presentation**. Written label is authoritative; no interactive semantics on passive badges.

Public classes: `.ui-badge`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<span class="ui-badge">Example · draft</span>
```

## Breadcrumbs

Purpose: Express a real navigation hierarchy.

User intent: Find the parent destination and identify the current page.

Classification: **native**. Named nav and ordered links; current item uses aria-current=page.

Public classes: `.ui-breadcrumb`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<nav class="ui-breadcrumb" aria-label="Example breadcrumb"><ol role="list"><li><a href="./">UI reference</a></li><li aria-current="page">Component catalog</li></ol></nav>
```

## Chat messages

Purpose: Group author, timestamp and message content.

User intent: Read who said what without relying on left/right alignment or hue alone.

Classification: **presentation**. Static message layout; sending, streaming, receipts and persistence require application logic.

Public classes: `.ui-chat`, `.ui-bubble`, `.ui-message`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<article class="ui-chat" aria-label="Example message"><strong>Jordan · example author</strong><div class="ui-bubble"><p class="ui-message">Please review the document before saving.</p></div><time datetime="2026-10-29T10:00:00-06:00">29 October, 10:00 · example timestamp</time></article>
```

## Button

Purpose: Style a real action target consistently.

User intent: Activate a named action with native pointer and keyboard behavior.

Classification: **native**. Visual variants and disabled semantics; application actions are outside CSS.

Public classes: `.ui-button`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-cluster"><button class="ui-button" type="button" >Example secondary</button><button class="ui-button btn-primary" type="button">Example primary</button><button class="ui-button" type="button" disabled aria-describedby="catalog-disabled-help">Unavailable example</button></div><p id="catalog-disabled-help" class="ui-help">The disabled example has no operation to perform.</p>
```

## Button group / join

Purpose: Keep related actions adjacent while allowing wrapping.

User intent: Recognize peer actions without hidden overflow or roving-menu semantics.

Classification: **presentation**. Native buttons/links retain separate tab stops; joined framing is optional.

Public classes: `.ui-button-group`, `.ui-join`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-button-group" role="group" aria-label="Example action group"><button class="ui-button" type="button" >Review</button><button class="ui-button" type="button" >Export</button></div><div class="ui-join" role="group" aria-label="Example joined actions"><button class="ui-button" type="button" >Earlier</button><button class="ui-button" type="button" >Later</button></div>
```

## Calendar widget

Purpose: Record the boundary of custom calendar behavior.

User intent: Avoid a fake calendar that cannot navigate dates correctly.

Classification: **script**. Month navigation, date arithmetic and custom grid keyboard behavior need logic; native date input is demonstrated separately.

No misleading CSS-only widget is supplied.

## Card

Purpose: Contain one related item and its actions.

User intent: Recognize which heading, content and action belong together.

Classification: **presentation**. Content-driven height; card container itself is not a fake clickable button.

Public classes: `.ui-card`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<article class="ui-card"><h3>A named example item</h3><p>Content determines this card’s height. The card itself is not clickable.</p><a href="./content.html">Inspect document styles</a></article>
```

## Carousel / scroll gallery

Purpose: Offer an ordered horizontally scrollable set of panels.

User intent: Reach every panel through native scrolling and named fragment links.

Classification: **alternative**. CSS scroll snap, no auto-rotation or looping controls; full managed carousel is a separate widget.

Public classes: `.ui-carousel`, `.ui-slide`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p><a href="#catalog-slide-one">First panel</a> · <a href="#catalog-slide-two">Second panel</a></p><div class="ui-carousel" tabindex="0" role="region" aria-label="Example scroll gallery"><section class="ui-slide" id="catalog-slide-one" aria-label="Panel 1 of 2"><h3>First supplied panel</h3><p>Native horizontal scrolling and fragment navigation; no auto-rotation.</p></section><section class="ui-slide" id="catalog-slide-two" aria-label="Panel 2 of 2"><h3>Second supplied panel</h3><p>Every panel remains in source order and keyboard reachable.</p></section></div>
```

## Interactive chart

Purpose: Keep visualization behavior distinct from decorative styling.

User intent: Inspect actual data with correct scales and accessible alternatives.

Classification: **script**. The upstream chart adapter uses a chart engine; data mapping, interactive legends and tooltips need logic.

No misleading CSS-only widget is supplied.

## Checkbox

Purpose: Style a native multiple-choice mark.

User intent: Toggle an explicitly labelled option without custom state synchronization.

Classification: **native**. Native input[type=checkbox] and full-size label; checked is authoritative.

Public classes: `.ui-checkbox`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-choice"><input class="ui-checkbox" type="checkbox">Include example detail</label>
```

## Code block

Purpose: Bound exact source content and its label.

User intent: Inspect selectable source with local scrolling.

Classification: **presentation**. Inert pre/code; copy-to-clipboard and syntax parsing are separate logic.

Public classes: `.ui-code-block`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<pre class="ui-code-block" tabindex="0" role="region" aria-label="Example inert source"><code>const message = "&lt;script&gt;inert source&lt;/script&gt;";
const exactIdentifier = "abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz";</code></pre>
```

## Collapsible

Purpose: Disclose optional supporting material.

User intent: Open and close an explanation with native Enter/Space behavior.

Classification: **native**. Native details/summary; essential instructions remain outside collapsed content.

Public classes: `.ui-collapse`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<details class="ui-collapse"><summary>Optional supporting explanation</summary><p>Native disclosure keeps its original marker and Enter/Space behavior.</p></details>
```

## Native suggestions

Purpose: Offer browser-owned suggestions for an editable value.

User intent: Choose a suggestion or retain typed text without a custom listbox.

Classification: **alternative**. input + datalist; free text remains allowed. Async search and a constrained ARIA combobox need logic.

Public classes: `.ui-combobox`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-suggestion">Suggested label</label><input class="ui-combobox" id="catalog-suggestion" list="catalog-suggestions" autocomplete="off"><datalist id="catalog-suggestions"><option value="Review"><option value="Draft"><option value="Archive"></datalist><p class="ui-help">Browser suggestions allow other typed values; this is not a constrained searchable listbox.</p>
```

## Command palette

Purpose: Separate command discovery and execution from appearance.

User intent: Search and invoke the intended authorized command.

Classification: **script**. Filtering, keyboard selection and command dispatch require logic.

No misleading CSS-only widget is supplied.

## Context menu

Purpose: Avoid replacing browser context behavior with a visual-only menu.

User intent: Use a correctly positioned menu with focus and dismissal behavior.

Classification: **script**. Context invocation, roving focus and target-specific actions require logic.

No misleading CSS-only widget is supplied.

## Data table engine

Purpose: Separate a table engine from native table styling.

User intent: Sort, filter, select and page actual records correctly.

Classification: **script**. Static tables are included; data transformation and selection synchronization need logic.

No misleading CSS-only widget is supplied.

## Native date picker

Purpose: Expose a date through the browser-owned editor.

User intent: Choose or type a valid date with native constraints.

Classification: **alternative**. input[type=date]; not a custom popover calendar or date-range engine.

Public classes: `.ui-date-picker`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-date">Example review date</label><input class="ui-date-picker" id="catalog-date" type="date" value="2026-10-29">
```

## Dialog / modal

Purpose: Present a bounded modal surface with native focus handling.

User intent: Read and dismiss a blocking explanation without losing the opener.

Classification: **native**. Native dialog, command=show-modal/close and autofocus on safe close action; Chrome command support required.

Public classes: `.ui-modal`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" commandfor="dialog-modal" command="show-modal">Open modal example</button><dialog class="ui-modal" id="dialog-modal" aria-labelledby="dialog-modal-title" aria-describedby="dialog-modal-help"><h3 id="dialog-modal-title">modal example</h3><p id="dialog-modal-help">This is a native presentation example. Closing it does not approve, save or delete anything.</p><button class="ui-button" type="button" autofocus commandfor="dialog-modal" command="close">Close modal example</button></dialog>
```

## Direction

Purpose: Respect the document language direction through logical layout.

User intent: Read mixed direction content without visual order hacks.

Classification: **native**. Native dir and bdi; user content cannot inject arbitrary dir attributes through Markdown.

Public classes: `.ui-direction`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p class="ui-direction" dir="rtl" lang="ar">مثال على اتجاه النص <bdi lang="en">Daylist</bdi></p><p class="ui-help">A native RTL example with an isolated Latin name; surrounding page order stays unchanged.</p>
```

## Drawer

Purpose: Place a named modal support surface at an edge.

User intent: Open and dismiss an edge panel with native focus and Escape behavior.

Classification: **alternative**. Native dialog edge placement; swipe gestures, drag velocity and responsive app state are not CSS.

Public classes: `.ui-drawer`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" commandfor="dialog-drawer" command="show-modal">Open drawer example</button><dialog class="ui-drawer" id="dialog-drawer" aria-labelledby="dialog-drawer-title" aria-describedby="dialog-drawer-help"><h3 id="dialog-drawer-title">drawer example</h3><p id="dialog-drawer-help">This is a native presentation example. Closing it does not approve, save or delete anything.</p><button class="ui-button" type="button" autofocus commandfor="dialog-drawer" command="close">Close drawer example</button></dialog>
```

## Dropdown links

Purpose: Expose a compact group of navigation links on request.

User intent: Open the link group and navigate it with ordinary Tab/Enter.

Classification: **alternative**. Native popover and semantic nav; not role=menu or a roving-focus application menu.

Public classes: `.ui-dropdown`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" id="invoker-dropdown" popovertarget="popup-dropdown" >Open dropdown example</button><div class="ui-dropdown" id="popup-dropdown" popover="auto" aria-label="dropdown example"><nav class="ui-menu" aria-label="Example dropdown destinations"><ul role="list"><li><a href="./">Component reference</a></li><li><a href="./content.html">Document styles</a></li></ul></nav></div>
```

## Empty state

Purpose: Explain missing data and one recovery destination.

User intent: Distinguish an empty example from an error or loading state.

Classification: **presentation**. Static explanation; actual empty/loading/error decisions come from application data.

Public classes: `.ui-empty-state`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<section class="ui-empty-state"><h3>No example records</h3><p>This authored empty state is distinct from an error or loading state.</p><a href="./content.html">Review the document example</a></section>
```

## Field and fieldset

Purpose: Group a persistent label, native control and supporting help.

User intent: Understand the question and enter a value without losing its name.

Classification: **native**. Native fieldset/legend/label and described help; no application validation engine.

Public classes: `.ui-fieldset`, `.ui-form-field`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<fieldset class="ui-fieldset"><legend>Example profile</legend><div class="ui-form-field"><label class="ui-label" for="catalog-field-name">Display name</label><input class="ui-input" id="catalog-field-name" value="Example name" aria-describedby="catalog-field-help"><p id="catalog-field-help" class="ui-help">This draft stays in the native control; no save occurs.</p></div></fieldset>
```

## Hover / focus preview

Purpose: Show a supplementary preview without replacing the primary link.

User intent: Inspect extra context on hover, focus or explicit click.

Classification: **native**. Native interestfor plus popovertarget click fallback; no hover-only essential content.

Public classes: `.ui-hover-card`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" id="invoker-hover-card" popovertarget="popup-hover-card" interestfor="popup-hover-card" >Open hover-card example</button><div class="ui-hover-card" id="popup-hover-card" popover="auto" aria-label="hover-card example"><h3>Supplementary preview</h3><p>Native interest shows supplied context on hover/focus. Explicit click remains available.</p><a href="./content.html">Open the full document example</a></div>
```

## Text input

Purpose: Provide a readable native single-line editor.

User intent: Enter and select text with browser affordances and visible focus.

Classification: **native**. Native text/search/email types; domain validation and storage are separate.

Public classes: `.ui-input`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-text">Example text value</label><input class="ui-input" id="catalog-text" value="Review the document">
```

## Input group

Purpose: Associate a fixed prefix or suffix with an input.

User intent: Understand units/context without putting fake values into the editable string.

Classification: **presentation**. Persistent label stays outside; adornments do not replace the accessible name.

Public classes: `.ui-input-group`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-amount">Example duration in minutes</label><div class="ui-input-group"><span aria-hidden="true">Minutes</span><input class="ui-input" type="number" min="0" id="catalog-amount" value="15"></div>
```

## One-time code input

Purpose: Keep a verification code in one native input.

User intent: Paste or receive a whole code without scripted character-box navigation.

Classification: **alternative**. One input, numeric inputmode, pattern, maxlength and one-time-code autocomplete; no verification request or auto-submit.

Public classes: `.ui-otp`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-control-otp">Example six-digit code</label><input class="ui-otp" id="catalog-control-otp" type="text" autocomplete="one-time-code" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" aria-describedby="catalog-control-otp-help"><p id="catalog-control-otp-help" class="ui-help">One native paste target. No code is sent, verified or automatically submitted.</p>
```

## Item / list

Purpose: Present comparable named rows.

User intent: Scan items and use their explicit links without making whole rows clickable.

Classification: **presentation**. Native list semantics and visible labels; selection/virtualization need logic.

Public classes: `.ui-item-list`, `.ui-item`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<ul class="ui-item-list" role="list"><li class="ui-item"><span>Document style guide</span><a href="./content.html">Inspect document</a></li><li class="ui-item"><span>Component reference</span><a href="./">Inspect reference</a></li></ul>
```

## Keyboard key

Purpose: Distinguish a key name from an app control.

User intent: Read a keyboard instruction without trying to click the keycap.

Classification: **presentation**. Native kbd; no role=button or interaction handler.

Public classes: `.ui-kbd`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p>Press <kbd class="ui-kbd">Ctrl</kbd> + <kbd class="ui-kbd">F</kbd> for the browser’s Find command. These keycaps are not buttons.</p>
```

## Label

Purpose: Keep a native control named.

User intent: Activate the associated input by selecting its persistent label.

Classification: **native**. Native for/id association; required wording is visible.

Public classes: `.ui-label`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-label-input">Persistent example label</label><input class="ui-input" id="catalog-label-input" value="Clicking the label focuses this input">
```

## Text marker

Purpose: Identify a relevant text fragment.

User intent: Find the marked phrase without interpreting an alarm color.

Classification: **presentation**. Native mark, neutral checked colors and a thin frame.

Public classes: `.ui-marker`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p>Inspect this <mark class="ui-marker">relevant example phrase</mark> within ordinary reading text.</p>
```

## Application menubar

Purpose: Distinguish an application menu from site links.

User intent: Use the expected arrow-key and submenu behavior.

Classification: **script**. Roving tabindex, command state and nested menu lifecycle require logic; semantic navigation is included.

No misleading CSS-only widget is supplied.

## Automatic message scroller

Purpose: Keep chat scroll-state decisions explicit.

User intent: Read earlier messages without forced jumps while new messages arrive.

Classification: **script**. Unread tracking, stick-to-bottom conditions and streaming observation need logic; native scroll area is included.

No misleading CSS-only widget is supplied.

## Native select

Purpose: Use the browser-owned option picker.

User intent: Choose one value with native keyboard and mobile behavior.

Classification: **native**. Real select/options; no custom listbox, filtering or async options.

Public classes: `.ui-select`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-control-select">Example review stage</label><select class="ui-select" id="catalog-control-select"><option>Draft</option><option>Review</option><option>Accepted</option></select>
```

## Navigation links

Purpose: Keep destinations grouped and keyboard reachable.

User intent: Navigate named destinations with ordinary links and tab order.

Classification: **alternative**. Semantic nav/list; no ARIA menubar or arrow-key submenu emulation.

Public classes: `.ui-menu`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<nav class="ui-menu" aria-label="Example navigation"><ul role="list"><li><a href="./">Component reference</a></li><li><a href="./content.html">Document styles</a></li></ul></nav>
```

## Pagination links

Purpose: Express the current position and available page destinations.

User intent: Navigate a known page without confusing a visual index with loaded data.

Classification: **native**. Real hrefs and aria-current=page; querying or calculating result pages is application logic.

Public classes: `.ui-pagination`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<nav class="ui-pagination" aria-label="Example reference pagination"><ol role="list"><li><a href="./">Components</a></li><li><a href="./content.html">Document content</a></li><li><span aria-current="page">Catalog · current</span></li></ol></nav>
```

## Popover

Purpose: Show nonmodal supporting information in the top layer.

User intent: Open a named surface and dismiss it with Escape or a click outside.

Classification: **native**. Native popover=auto and popovertarget; no manual aria-expanded synchronization.

Public classes: `.ui-popover`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" id="invoker-popover" popovertarget="popup-popover" >Open popover example</button><div class="ui-popover" id="popup-popover" popover="auto" aria-label="popover example"><h3>Nonmodal example</h3><p>Escape or clicking outside dismisses this native popover.</p></div>
```

## Progress

Purpose: Display an actual bounded completion amount.

User intent: Read the quantity both as text and a native progress value.

Classification: **native**. Static fixture value/max; measuring work completion is separate logic.

Public classes: `.ui-progress`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label for="catalog-control-progress">Example review progress · 3 of 5</label><progress class="ui-progress" id="catalog-control-progress" value="3" max="5">3 of 5</progress>
```

## Questionnaire workflow

Purpose: Separate question presentation from a response broker.

User intent: Submit the intended structured answer exactly once.

Classification: **script**. Branching, schema validation and agent continuation require the existing application contracts.

No misleading CSS-only widget is supplied.

## Radio group

Purpose: Present mutually exclusive native choices.

User intent: Use labels and arrow keys to choose one option.

Classification: **native**. Shared native name, fieldset and legend; no invented custom selection state.

Public classes: `.ui-radio`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<fieldset class="ui-fieldset"><legend>Example single choice</legend><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-radio" value="draft" checked>Draft</label><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-radio" value="review" >Review</label><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-radio" value="final" >Final</label></fieldset>
```

## Resizable surface

Purpose: Allow native CSS resizing of a bounded example workspace.

User intent: Enlarge a nonessential inspection area while its content remains reachable.

Classification: **alternative**. CSS resize handle is pointer-oriented, not an accessible split-pane replacement; text/content remains reachable without resizing.

Public classes: `.ui-resizable`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-resizable" tabindex="0" role="region" aria-label="Example native resizable workspace"><p>Use the native pointer resize handle if available. This content remains readable and scrollable without resizing.</p><p>This is not a keyboard-operated split-pane widget.</p></div>
```

## Scroll area

Purpose: Bound an inspection region without clipping content.

User intent: Reach overflow by keyboard, pointer and native scrollbar.

Classification: **native**. Named tabindex=0 region; native scrollbar, no custom drag engine.

Public classes: `.ui-scroll-area`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-scroll-area" tabindex="0" role="region" aria-label="Example scroll area"><p>Supplied example line 1 · native scrolling preserves every line.</p><p>Supplied example line 2 · native scrolling preserves every line.</p><p>Supplied example line 3 · native scrolling preserves every line.</p><p>Supplied example line 4 · native scrolling preserves every line.</p><p>Supplied example line 5 · native scrolling preserves every line.</p><p>Supplied example line 6 · native scrolling preserves every line.</p><p>Supplied example line 7 · native scrolling preserves every line.</p><p>Supplied example line 8 · native scrolling preserves every line.</p><p>Supplied example line 9 · native scrolling preserves every line.</p><p>Supplied example line 10 · native scrolling preserves every line.</p><p>Supplied example line 11 · native scrolling preserves every line.</p><p>Supplied example line 12 · native scrolling preserves every line.</p></div>
```

## Custom select/listbox

Purpose: Keep a custom selection widget separate from its painted surface.

User intent: Select reliably using its expected keyboard, focus and typeahead behavior.

Classification: **script**. The bespoke listbox implementation needs logic; use the included native select when suitable.

No misleading CSS-only widget is supplied.

## Separator / divider

Purpose: Separate topics without extra decorative panels.

User intent: Recognize a change in content group.

Classification: **presentation**. Semantic hr or an explicitly decorative rule; protected 1px boundary.

Public classes: `.ui-divider`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p>First example topic.</p><hr class="ui-divider"><p>Second example topic.</p>
```

## Sheet

Purpose: Place a blocking support surface along the lower edge.

User intent: Read and dismiss supplementary content with native modal behavior.

Classification: **native**. Native dialog; no draggable sheet gestures or snap-position engine.

Public classes: `.ui-sheet`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" commandfor="dialog-sheet" command="show-modal">Open sheet example</button><dialog class="ui-sheet" id="dialog-sheet" aria-labelledby="dialog-sheet-title" aria-describedby="dialog-sheet-help"><h3 id="dialog-sheet-title">sheet example</h3><p id="dialog-sheet-help">This is a native presentation example. Closing it does not approve, save or delete anything.</p><button class="ui-button" type="button" autofocus commandfor="dialog-sheet" command="close">Close sheet example</button></dialog>
```

## Sidebar

Purpose: Group optional navigation or support next to content.

User intent: Reveal a named support list without sacrificing source order.

Classification: **native**. Native details inside aside; no persisted app layout or shortcut manager.

Public classes: `.ui-sidebar`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<aside><details class="ui-sidebar"><summary>Example support navigation</summary><nav class="ui-menu" aria-label="Example sidebar destinations"><ul role="list"><li><a href="./">Component reference</a></li><li><a href="./content.html">Document styles</a></li></ul></nav></details></aside>
```

## Skeleton

Purpose: Reserve the shape of forthcoming content.

User intent: Recognize placeholder structure alongside written loading text.

Classification: **presentation**. Static nonessential blocks, aria-hidden; do not invent progress or replace error text.

Public classes: `.ui-skeleton`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p>Example loading placeholder · no real request is running.</p><div class="ui-skeleton" aria-hidden="true"></div>
```

## Native range slider

Purpose: Expose a bounded numeric choice.

User intent: Change a value with native arrow keys or pointer input.

Classification: **native**. input[type=range]; browser accessibility owns the value, no fake dynamic output.

Public classes: `.ui-range`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-range">Example amount · native range 0 to 100</label><input class="ui-range" id="catalog-range" type="range" min="0" max="100" value="50">
```

## Loading / spinner

Purpose: Supplement a written loading state with an optional motion cue.

User intent: Recognize ongoing work without motion being the only information.

Classification: **presentation**. CSS animation explicitly enabled in the specimen; reduced motion retains a static cue and written text.

Public classes: `.ui-spinner`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-motion-preview"><label class="ui-choice"><input class="ui-checkbox ui-motion-enable" type="checkbox" id="catalog-spin-enable">Animate this supplementary loading preview</label><p><span class="ui-spinner" aria-hidden="true"></span> Example loading state · no actual work is running.</p></div>
```

## Switch

Purpose: Present a named binary native preference.

User intent: Toggle an explicit choice with native checked state and Space.

Classification: **native**. Native checkbox role=switch with the existing track/thumb composition; no silent application save.

Public classes: `.ui-toggle`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-choice ui-switch ui-toggle"><input type="checkbox" role="switch" id="catalog-local-switch">Example local preference</label>
```

## Table

Purpose: Keep a small semantic comparison readable.

User intent: Compare values under real headers without a custom grid widget.

Classification: **presentation**. Native caption/th scope and bounded overflow; sorting/filtering remain excluded.

Public classes: `.ui-data-table`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-scroll-area" tabindex="0" role="region" aria-labelledby="catalog-table-caption"><table class="ui-data-table"><caption id="catalog-table-caption">Supplied example revisions</caption><thead><tr><th scope="col">Revision</th><th scope="col">State</th></tr></thead><tbody><tr><th scope="row">One</th><td>Draft</td></tr><tr><th scope="row">Two</th><td>Reviewed</td></tr></tbody></table></div>
```

## Tabbed links / native panel chooser

Purpose: Offer linked destinations or a native choice between preloaded panels.

User intent: Choose a labelled preview without a fake ARIA tab state.

Classification: **alternative**. Radio fieldset uses native selection and CSS panels; link variant is navigation. Full role=tab keyboard/ARIA synchronization requires logic.

Public classes: `.ui-tabs`, `.ui-tab-links`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<nav aria-label="Example tabbed destinations"><ul class="ui-tab-links" role="list"><li><a href="./">Components</a></li><li><a href="./content.html">Documents</a></li></ul></nav><fieldset class="ui-tabs"><legend>Example native panel chooser</legend><div class="ui-cluster"><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-panel" value="one" checked>Summary preview</label><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-panel" value="two">Details preview</label></div><section class="ui-tab-panel" data-panel="one"><h3>Summary preview panel</h3><p>This is a native radio choice, not an ARIA tabs widget.</p></section><section class="ui-tab-panel" data-panel="two"><h3>Details preview panel</h3><p>The supplied detailed content appears through CSS state.</p></section></fieldset>
```

## Textarea

Purpose: Provide a native multiline editor.

User intent: Enter line breaks and resize notes vertically.

Classification: **native**. Native rows and editable text; no rich-text editing or auto-save.

Public classes: `.ui-textarea`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-notes">Example multiline notes</label><textarea class="ui-textarea" id="catalog-notes" rows="4">Review the spacing.
Keep source text unchanged.</textarea>
```

## Toast presentation

Purpose: Group a settled notification and its text.

User intent: Read feedback without obscuring the active working area.

Classification: **presentation**. In-flow notification stack in the reference; spawning, live timing, timers and dismissal policy need logic.

Public classes: `.ui-toast`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-stack"><aside class="ui-toast"><strong>Example settled notification</strong><p>This in-flow sample has no timer, hidden request or auto-dismiss.</p></aside><aside class="ui-toast">A second supplied notification remains readable below it.</aside></div>
```

## Checkbox button

Purpose: Use native checkbox semantics for a persistent binary choice.

User intent: See and change the selected option without a fake aria-pressed button.

Classification: **alternative**. Visible checkbox with a styled label; a true aria-pressed button needs state synchronization.

Public classes: `.ui-toggle-button`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-toggle-button"><input class="ui-checkbox" type="checkbox" id="catalog-control-toggle">Show example annotations</label>
```

## Multiple toggle choices

Purpose: Keep several persistent binary choices together.

User intent: Select multiple explicit options with native checkbox behavior.

Classification: **alternative**. Native fieldset/checkboxes; no ARIA toolbar or roving focus is claimed.

Public classes: `.ui-toggle-group`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<fieldset class="ui-toggle-group"><legend>Example independent choices</legend><label class="ui-toggle-button"><input class="ui-checkbox" type="checkbox" name="catalog-multi" value="labels">Labels</label><label class="ui-toggle-button"><input class="ui-checkbox" type="checkbox" name="catalog-multi" value="notes">Notes</label></fieldset>
```

## Tooltip

Purpose: Offer supplementary noninteractive help without hiding required instructions.

User intent: Read help on hover/focus/click and dismiss it without moving focus.

Classification: **native**. Chrome native interestfor, hint popover and described text; explicit popovertarget is a click fallback.

Public classes: `.ui-tooltip`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" id="invoker-tooltip" popovertarget="popup-tooltip" interestfor="popup-tooltip" aria-describedby="popup-tooltip">Open tooltip example</button><div class="ui-tooltip" id="popup-tooltip" popover="hint" role="tooltip">Supplementary help: this example has no save action.</div><p class="ui-help">Required instructions stay here in the document. Optional help also opens on explicit click.</p>
```

## Trace disclosure

Purpose: Group a supplied sequence of diagnostic steps.

User intent: Inspect an ordered explanation without mistaking it for live execution.

Classification: **native**. Native details/ol presentation; capturing spans, timing and observability data need logic.

Public classes: `.ui-trace`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<details class="ui-trace"><summary>Supplied example trace · 2 steps</summary><ol><li>Read the supplied example.</li><li>Inspect its presentation. No agent run occurs.</li></ol></details>
```

## Typography

Purpose: Use the established document reading layer.

User intent: Navigate semantic headings, lists, quotations and code.

Classification: **presentation**. Reuses the audited prose classes and separate content specimen.

Public classes: `.ui-prose`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<article class="ui-prose"><h3>Document subsection example</h3><p>The existing document layer governs <strong>emphasis</strong>, native lists and literal <code>source</code>.</p><ul><li>First supplied point.</li><li>Second supplied point.</li></ul><a href="./content.html">Inspect the complete content specimen</a></article>
```

## Countdown number display

Purpose: Keep supplied time fields aligned.

User intent: Read an explicitly static duration example without a misleading running clock.

Classification: **presentation**. Presentation only; clock reads, deadlines and ticking require application logic.

Public classes: `.ui-countdown`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p>Static duration example; this does not tick.</p><time class="ui-countdown" datetime="PT1H23M45S">01:23:45</time>
```

## Comparison / diff view

Purpose: Keep before/after content adjacent for inspection.

User intent: Compare both versions without hiding either from keyboard or touch users.

Classification: **alternative**. Paired comparison plus optional native CSS pointer-resize wipe; both full images remain separately readable. A keyboard range/drag engine is a separate widget.

Public classes: `.ui-diff`, `.ui-diff-wipe`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<p>Optional pointer comparison: drag the native resize handle at the lower edge of the first layer. The two complete labelled versions remain below.</p><figure class="ui-diff-wipe" aria-label="Optional pointer-only image comparison"><img src="./catalog-art-two.svg" width="480" height="160" alt=""><div class="ui-diff-before"><img src="./catalog-art-one.svg" width="480" height="160" alt=""></div></figure><div class="ui-diff"><section class="ui-card"><h3>Before</h3><img src="./catalog-art-one.svg" width="480" height="160" alt="Neutral list layout illustrating the before version."><p>Automatic acceptance.</p></section><section class="ui-card"><h3>After</h3><img src="./catalog-art-two.svg" width="480" height="160" alt="Neutral grid layout illustrating the after version."><p>Explicit review before acceptance.</p></section></div><p class="ui-help">Both supplied versions remain readable. The optional wipe is pointer-only; the full labelled versions provide the non-drag comparison.</p>
```

## Bottom navigation / dock

Purpose: Group a small set of working-area destinations.

User intent: Find the current location without floating over document content.

Classification: **native**. Positioned within its bounded example surface, not a viewport overlay.

Public classes: `.ui-dock`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-component-stage"><p>Example work area. The destination bar remains in its own surface.</p><nav aria-label="Example local dock"><ul class="ui-dock" role="list"><li><a href="./">Reference</a></li><li><a href="./content.html">Documents</a></li></ul></nav></div>
```

## Corner action / speed dial

Purpose: Keep a named corner action and secondary links together.

User intent: Open the extra destinations with native click, keyboard and Escape behavior.

Classification: **native**. Native popover; contained corner positioning avoids covering the page.

Public classes: `.ui-fab`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-component-stage"><p>Example corner action with native secondary destinations.</p><div class="ui-fab"><button class="ui-button" type="button" id="invoker-corner-actions" popovertarget="popup-corner-actions" >Open corner-actions example</button><div class="ui-popover" id="popup-corner-actions" popover="auto" aria-label="corner-actions example"><nav class="ui-menu" aria-label="Example corner destinations"><ul role="list"><li><a href="./">Component reference</a></li><li><a href="./content.html">Document styles</a></li></ul></nav></div></div></div>
```

## File input

Purpose: Expose the browser-owned file chooser.

User intent: Choose a file only after an explicit native action.

Classification: **native**. Local selection only; no upload, reading, permission grant or persistence occurs.

Public classes: `.ui-file-input`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<label class="ui-label" for="catalog-file">Example local file selection</label><input class="ui-file-input" id="catalog-file" type="file" aria-describedby="catalog-file-help"><p class="ui-help" id="catalog-file-help">Choosing a file does not upload, read, store or grant an agent access to it.</p>
```

## Fixed-data filter

Purpose: Filter a bounded preloaded example through native choice state.

User intent: Select a visible criterion and restore all examples with Reset.

Classification: **native**. Native radios/reset and CSS :has; querying stores or computing result counts needs logic.

Public classes: `.ui-filter`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<form class="ui-filter"><fieldset class="ui-fieldset"><legend>Filter supplied example records</legend><div class="ui-cluster"><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-filter" value="all" checked>All</label><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-filter" value="open" >Open</label><label class="ui-choice"><input class="ui-radio" type="radio" name="catalog-filter" value="done" >Done</label></div></fieldset><button type="reset" class="ui-button">Reset example filter</button><div class="ui-filter-results"><article class="ui-filter-result" data-state="open">Open · example review</article><article class="ui-filter-result" data-state="done">Done · example draft</article></div></form>
```

## Footer

Purpose: Group document-end information and destinations.

User intent: Find supporting links without confusing them with the main task.

Classification: **presentation**. Semantic footer with wrapping links; no fixed viewport placement.

Public classes: `.ui-footer`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<footer class="ui-footer"><span>Example project notes</span><a href="./content.html">Document style guide</a><span>Illustrative footer; no fixed placement.</span></footer>
```

## Introductory panel / hero

Purpose: Introduce one purpose and a next destination.

User intent: Understand the surface before choosing an action.

Classification: **presentation**. Quiet neutral panel and existing heading scale; no full-screen marketing treatment.

Public classes: `.ui-hero`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<section class="ui-hero"><h3>Review the reference</h3><p>A quiet introduction explains one purpose and offers one destination.</p><a href="./content.html">Inspect document styles</a></section>
```

## Hover 3D

Purpose: Demonstrate an optional spatial card treatment.

User intent: Inspect the requested visual treatment without moving an interactive target.

Classification: **presentation**. Decorative noninteractive card only, small immediate tilt; disabled for reduced motion and coarse pointers.

Public classes: `.ui-hover-3d`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-hover-3d"><strong>Optional noninteractive tilt example</strong><p>Hover on a fine pointer to inspect a small CSS tilt. No target moves, and reduced motion disables the effect.</p></div>
```

## Hover gallery

Purpose: Preview one of several supplied images.

User intent: Use hover for a temporary preview or native radios for keyboard/touch selection.

Classification: **native**. All choices remain reachable; no auto-advance, fetching or hover-only information.

Public classes: `.ui-hover-gallery`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<fieldset class="ui-hover-gallery"><legend>Example gallery preview</legend><div class="ui-cluster"><label class="ui-choice" data-preview="one"><input class="ui-radio" type="radio" name="catalog-gallery" value="one" checked>Preview 1</label><label class="ui-choice" data-preview="two"><input class="ui-radio" type="radio" name="catalog-gallery" value="two" >Preview 2</label><label class="ui-choice" data-preview="three"><input class="ui-radio" type="radio" name="catalog-gallery" value="three" >Preview 3</label></div><figure data-preview="one"><img src="./catalog-art-one.svg" width="480" height="160" alt="Neutral list layout illustration."><figcaption>Preview 1 · list layout. Hover is temporary; native radio selection works with keyboard and touch.</figcaption></figure><figure data-preview="two"><img src="./catalog-art-two.svg" width="480" height="160" alt="Neutral grid layout illustration."><figcaption>Preview 2 · grid layout. Hover is temporary; native radio selection works with keyboard and touch.</figcaption></figure><figure data-preview="three"><img src="./catalog-art-three.svg" width="480" height="160" alt="Neutral document layout illustration."><figcaption>Preview 3 · document layout. Hover is temporary; native radio selection works with keyboard and touch.</figcaption></figure></fieldset>
```

## Indicator

Purpose: Place compact metadata beside its owning item.

User intent: Read a written count/status in the correct context.

Classification: **presentation**. In-flow corner alignment; no unexplained colored-only badge.

Public classes: `.ui-indicator`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-indicator"><span class="ui-badge">3 supplied examples</span><strong>Reference collection</strong></div>
```

## Link

Purpose: Keep a destination distinguishable from plain text.

User intent: Follow a meaningful underlined destination with native behavior.

Classification: **native**. Native anchor, existing color/focus roles and an actual href.

Public classes: `.ui-link`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<a class="ui-link" href="./content.html">Read the document style specimen</a>
```

## Image mask

Purpose: Demonstrate optional cropping of nonessential artwork.

User intent: Compare shape treatments while retaining a written media explanation.

Classification: **presentation**. Circle and polygon variants; never crop text or essential image information.

Public classes: `.ui-mask`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-cluster"><img class="ui-mask" src="./catalog-art-one.svg" width="480" height="160" alt=""><img class="ui-mask ui-mask--hexagon" src="./catalog-art-two.svg" width="480" height="160" alt=""></div><p>Two optional crops of nonessential neutral artwork. Captions and meaning are never clipped.</p>
```

## Large navigation popover

Purpose: Group several destination categories in one requested surface.

User intent: Open grouped links with ordinary keyboard navigation and native dismissal.

Classification: **native**. Native popover/nav, responsive wrapping; no ARIA menubar, hover trap or fetched content.

Public classes: `.ui-megamenu`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<button class="ui-button" type="button" id="invoker-megamenu" popovertarget="popup-megamenu" >Open megamenu example</button><div class="ui-megamenu" id="popup-megamenu" popover="auto" aria-label="megamenu example"><div><nav class="ui-menu" aria-label="Example design destinations"><h3>Design</h3><ul role="list"><li><a href="./">Component reference</a></li><li><a href="./content.html">Document styles</a></li></ul></nav><nav class="ui-menu" aria-label="Example catalog destinations"><h3>Catalog</h3><ul role="list"><li><a href="#catalog-button">Buttons</a></li><li><a href="#catalog-field">Fields</a></li></ul></nav></div></div>
```

## Browser mockup

Purpose: Frame a labelled example of a browser-like surface.

User intent: Recognize illustrative chrome rather than real navigation controls.

Classification: **presentation**. Static illustration with written mockup label; no fake functional toolbar.

Public classes: `.ui-mockup-browser`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<figure class="ui-mockup-browser"><header>Browser mockup · example.invalid · illustrative text</header><p>Example document surface. This frame is not a real browser toolbar.</p><figcaption>Static browser-like illustration with no fake action controls.</figcaption></figure>
```

## Code mockup

Purpose: Frame a labelled source example.

User intent: Inspect source without mistaking the frame for an executable editor.

Classification: **presentation**. Static pre/code composition and decorative caption only.

Public classes: `.ui-mockup-code`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<figure class="ui-mockup-code"><figcaption>Code mockup · inert source</figcaption><pre><code>const example = "read only";</code></pre></figure>
```

## Phone mockup

Purpose: Bound a small-device preview.

User intent: Inspect a contained illustrative mobile layout without clipping its explanation.

Classification: **presentation**. Static responsive frame, no device emulation or browser API.

Public classes: `.ui-mockup-phone`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<figure class="ui-mockup-phone"><figcaption>Phone mockup · static layout illustration</figcaption><h3>Example mobile view</h3><p>Content stays readable and the frame grows when needed.</p></figure>
```

## Window mockup

Purpose: Frame a labelled desktop-like example.

User intent: Recognize the illustrative content area and caption.

Classification: **presentation**. No fake close/minimize buttons or actual window control.

Public classes: `.ui-mockup-window`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<figure class="ui-mockup-window"><header>Window mockup · illustrative caption</header><p>No actual window controls are supplied.</p><figcaption>Example desktop-like frame.</figcaption></figure>
```

## Navigation bar

Purpose: Group identity and primary destinations.

User intent: Locate navigation that wraps rather than disappearing on narrow screens.

Classification: **native**. Semantic header/nav with normal source order; no scripted responsive menu.

Public classes: `.ui-navbar`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<header class="ui-navbar"><strong>Example workspace</strong><nav class="ui-menu" aria-label="Example top navigation"><ul role="list"><li><a href="./">Component reference</a></li><li><a href="./content.html">Document styles</a></li></ul></nav></header>
```

## Radial progress

Purpose: Pair a supplied completion amount with a circular graphic.

User intent: Read the written percentage and accessible value independently of color.

Classification: **presentation**. CSS graphic derives from aria-valuenow; updating actual work progress requires logic.

Public classes: `.ui-radial-progress`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-radial-progress" role="progressbar" aria-label="Example review completion" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span>75%</span></div><p>Supplied example: 75 of 100. The ring derives from the same accessible value attribute.</p>
```

## Rating

Purpose: Offer a bounded native single-choice scale.

User intent: Choose a named rating with arrow keys and full-size labels.

Classification: **native**. Native radio group with explicit number labels; no star-only names or automatic write.

Public classes: `.ui-rating`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<fieldset class="ui-rating"><legend>Example rating · select 1 to 5</legend><label class="ui-toggle-button"><input class="ui-radio" type="radio" name="catalog-rating" value="1">1 of 5</label><label class="ui-toggle-button"><input class="ui-radio" type="radio" name="catalog-rating" value="2">2 of 5</label><label class="ui-toggle-button"><input class="ui-radio" type="radio" name="catalog-rating" value="3">3 of 5</label><label class="ui-toggle-button"><input class="ui-radio" type="radio" name="catalog-rating" value="4">4 of 5</label><label class="ui-toggle-button"><input class="ui-radio" type="radio" name="catalog-rating" value="5">5 of 5</label></fieldset>
```

## Visual stack

Purpose: Indicate grouped material through nonessential background layers.

User intent: Read the foreground item without hidden essential content beneath it.

Classification: **presentation**. Only decorative rear layers overlap; all meaningful text remains in the foreground.

Public classes: `.ui-visual-stack`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-visual-stack"><h3>Foreground example</h3><p>The rear planes are decorative. No real document or essential text is hidden beneath this one.</p></div>
```

## Statistic

Purpose: Pair a supplied number with its meaning and period.

User intent: Interpret a quantity without a dashboard number lacking context.

Classification: **presentation**. Native definition structure and tabular digits; no invented live measurements.

Public classes: `.ui-stat`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<dl class="ui-stat"><dt>Supplied example records</dt><dd>24</dd></dl><p>Illustrative snapshot · 29 October 2026</p>
```

## Status

Purpose: Keep a state label and supplementary mark together.

User intent: Read the explicit state without relying on hue.

Classification: **presentation**. Written state remains authoritative; status truth comes from the application.

Public classes: `.ui-status-indicator`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<span class="ui-status-indicator">Ready · example state</span>
```

## Steps

Purpose: Present a supplied process order and current step.

User intent: Locate the current point without interpreting color alone.

Classification: **presentation**. Native ordered list, written state and aria-current=step; no workflow advancement logic.

Public classes: `.ui-steps`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<ol class="ui-steps"><li>Read · completed example step</li><li aria-current="step">Review · current example step</li><li>Accept · next example step</li></ol>
```

## Swap

Purpose: Switch between two supplied presentations using a native choice.

User intent: Read an alternate detail level without replacing the control or saving anything.

Classification: **native**. Visible checkbox and CSS states; the stable label describes the choice.

Public classes: `.ui-swap`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-swap"><label class="ui-choice"><input class="ui-checkbox" type="checkbox" id="catalog-control-swap">Show detailed example wording</label><p class="ui-swap-short">Short wording: Review.</p><p class="ui-swap-detail">Detailed wording: Review the supplied document before accepting its next revision.</p></div>
```

## Text rotation

Purpose: Demonstrate an optional sequence of supplementary labels.

User intent: Inspect the effect while the complete wording remains persistently available.

Classification: **presentation**. CSS animation opt-in, pause/reset control and reduced-motion fallback; essential text never exists only in the rotating layer.

Public classes: `.ui-text-rotate`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<div class="ui-motion-preview"><label class="ui-choice"><input class="ui-checkbox ui-motion-enable" type="checkbox" id="catalog-rotate-enable">Animate supplementary example labels</label><div class="ui-text-rotate" aria-hidden="true"><span>Read</span><span>Review</span><span>Accept</span></div><p>Complete persistent wording: Read · Review · Accept. Hover/focus pauses the preview; unchecking resets it.</p></div>
```

## CSS theme preview

Purpose: Preview a complete local palette through native choice state.

User intent: Compare brightness without a script, page-wide preference write or data change.

Classification: **native**. CSS :has checkbox overrides the bounded preview; persistence and system-default resolution remain the existing preference script.

Public classes: `.ui-theme-controller`, `.ui-theme-sandbox`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<section class="ui-theme-sandbox"><label class="ui-choice"><input class="ui-checkbox ui-theme-controller" type="checkbox" id="catalog-local-theme">Use dark colors in this bounded preview</label><p>The complete local palette changes through CSS only. Page preferences and storage are untouched.</p><a href="./content.html">Example destination in the local palette</a></section>
```

## Timeline

Purpose: Group supplied events in chronological order.

User intent: Read event dates, descriptions and ordering as real text.

Classification: **presentation**. Native list/time markup; collecting or sorting events requires logic.

Public classes: `.ui-timeline`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<ol class="ui-timeline" role="list"><li><time datetime="2026-10-28">28 October 2026</time><p>Example draft supplied.</p></li><li><time datetime="2026-10-29">29 October 2026</time><p>Example review supplied.</p></li></ol>
```

## Native validation styling

Purpose: Expose browser-enforced input constraints with visible correction guidance.

User intent: Correct an invalid example without a custom validation engine.

Classification: **native**. Native required/type/pattern and :user-invalid; server/domain checks and custom error synchronization need logic.

Public classes: `.ui-validator`. Supporting classes in the exact composition are covered by the CSS ledger.

```html
<form class="ui-validator" action="#catalog-validator" method="get"><label class="ui-label" for="catalog-email">Example email address (required)</label><input class="ui-input" id="catalog-email" name="example-email" type="email" required aria-describedby="catalog-email-help"><p class="ui-help" id="catalog-email-help">Use a fictitious example such as demo@example.test. Native HTML validates this field. A valid submission navigates within this gallery; no data is stored.</p><p class="ui-validation-error">Error: enter a complete email address before submitting the example.</p><button class="ui-button" type="submit">Check native example constraints</button></form>
```
