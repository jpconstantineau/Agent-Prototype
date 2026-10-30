# Review changes

## Purpose

Record maintainer feedback that changed a design decision, the replaced behavior, affected declaration IDs and required evidence. Passing tests do not overrule a rejected user intent.

## User intent

Edit an existing value directly, and choose a readable appearance without relying on hue to understand the interface.

## Agent intent

Implement the corrected interaction and appearance requirements across source, generated CSS, guidelines, examples and checks. Keep the reference separate from production tasks/settings; revised proposals still require final maintainer review.

## TailAdmin contextual review after 7d00fc2

Reviewed the requested TailAdmin UI Elements index and all 21 linked HTML examples, plus Button groups in its demo navigation. TAILADMIN-REVIEW.md records every source, mapped component ID, gap decision and use case. No upstream source code, assets, palette or runtime is imported.

Four original project families extend the existing 96 core families: announcement, image, ribbon and native video. There are now 100 families, with 91 runnable compositions and nine script-dependent engine boundaries. Existing samples add recovery links on colored alerts, avatar sizes/image/named presence, quiet metadata badges, text-plus-symbol actions, safe danger previews, responsive media cards/footers, native choice lists, grouped popover navigation, explicit pagination context, native dialog-form validation, settled semantic notifications and indeterminate native progress.

Existing approved choices remain authoritative, including muted structural fields, selected azure, native folder tabs, count/status distinction and border-only alert dialogs. Optional media preserve complete meaningful frames and use original local fixtures; the silent video is played through native controls with captions/transcript and no autoplay. Ribbons reserve in-flow space instead of covering content. CSS never infers event truth, saves a local dialog draft, grants an agent permission or supplies a live notification policy.

New catalog- records document each composition’s geometry and intent. catalog-accent-default expands to the announcement/notification consumers; existing palette values and density profiles remain unchanged. The registry contains 400 style/frame records, 1,264 declarations and 674 geometry entries. Quiet badge text adds success/surface and warning/surface requirements, bringing contrast checks to 128 across four palettes. Filled-alert links use checked on-fill text/focus plus a forced-color override. The exact changed/new IDs appear in CSS-DECISIONS.md and BOX-MODEL-AUDIT.md.

The Google-format component narrative now distinguishes the 96 core families from the four project additions. All eight documents were re-linted against the pinned official schema with zero errors and the same three documented warnings per appearance/density document. Maintainer review of purposes, real assistive technology and physical-device behavior remains separate from automated evidence.

## Border-only dialogs, offset information badges and dashboard reference after ffd5b7d

The maintainer clarified that alert dialogs should color only their border, badges should convey extra information rather than duplicate aligned state indicators, and each rating option needs its own visible star count. The latest contracts supersede the earlier colored-heading, badge-dot and cumulative-star proposals below.

- Removed the nested alert from every alert dialog. catalog-dialog-accent.1 now colors all outer border sides; the heading, body and controls retain neutral reading colors. Native modal dismissal and focus return are unchanged.
- Reworked catalog-badge to place metadata inside its fill, replacing the former gap slot with fill/text/centering decisions. catalog-badge-anchor, -offset and -counter reserve a superscript corner and display actual count text. catalog-badge-dot now styles a real empty notification node rather than generating a dot before every badge. The inline badge, numeric disc/pill, count-free offset dot and separate aligned status all have live examples. The indicator example composes the same owner/badge structure.
- Removed catalog-rating-filled-rest, -filled and -outline. Each radio choice now contains one through five real filled star characters, preserving its explicit accessible name. catalog-rating-choice bounds and wraps long labels at enlarged text sizes; native checked state and emphasis identify the selected option.
- Added DASHBOARDS.md research comparing Charts.css, Carbon, Tremor, Mantine and Adobe Spectrum. Eight original dashboard compositions have generated HTML/source inspection and dedicated dashboard- audited rules. They remain separately counted from the 96-family/87-example upstream component catalog. No production app dashboard, data fetch or chart runtime is introduced.

The shared registry now has 370 style/frame records, 1,181 declarations and 624 geometry entries. Every added rule records its purpose and user intent. Existing colors, density profiles and 120 contrast requirements remain in force. Dashboard plot measures preserve readable geometry in both densities; native tables, written trend/period explanations and unknown-state wording remain available without JavaScript.

## Component presentation corrections after 9b3a9bf

Maintainer review requested visible semantic colors, clearer identity and loading marks, conventional navigation and a readable conversation. The changes apply to the isolated reference catalog and its published contracts.

| Feedback | Result and review intent |
| --- | --- |
| Colored alert, alert dialog and aura variants | Success/error/pending/information/neutral consume existing palette roles. Alerts use checked fills; dialogs combine a colored heading and edge with a neutral control plane; aura frames use the governed notice stroke. Focus remains reserved for keyboard focus. |
| Empty-looking avatar, missing badge dot, one status color | Avatars are filled discs with contrasting initials and written names. Badges have a visible 10px dot; status indicators have 12px dots in all five semantic variants with written labels. Avatar color asserts no personal status. |
| Breadcrumb alignment and separator; numerical pagination | Slash separators are small real aria-hidden text, centered with the levels and native targets. Numerical 1–3 links have descriptive names and real reference destinations; the current page is noninteractive and marked. |
| Chat alignment, hue and response | End-aligned blue outgoing message followed by a start-aligned neutral reply, each with author and time, bounded lines and a mobile gutter. Source order remains conversation order. |
| Loading visibility | Optional slow skeleton border-color animation, off initially, with written loading text and reduced-motion fallback. Spinner diameter grows to 24px and its 3px stroke is protected in compact density. |
| Folder tabs and star labels | Real link destinations and native radio labels use folder silhouettes. Clipped radio paint retains native semantics, arrow selection and full-label protected focus. Native rating choices use accessible one-to-five names and cumulative outlined/filled real star glyphs. |

Changed declaration IDs include catalog-alert.2–3 (edge/fill), catalog-avatar.6–7 (disc edge/fill), catalog-badge.1 (inline dot/text group), catalog-aura.2/.4 (stroke/accent frame), catalog-tab-links.1 (folder-link decoration), catalog-spinner.2/.4 (diameter/stroke), and catalog-status-dot.5 (variant color). Former catalog-tab-links.2–3 are superseded by the shared folder rules. New properties append to the existing component records; additional tone, dot, layout, folder-focus, rating and skeleton frame rules have dedicated catalog IDs. The on-interactive role explanation now covers checked fill text as well as the existing switch thumb; palette values stay unchanged.

The registry contains 342 style/frame records, 1,075 declarations and 564 geometry entries. Contrast coverage expands from 100 to 120 requirements, enforcing 4.5:1 ink on every semantic fill in all four palettes. Review CSS-DECISIONS.md and BOX-MODEL-AUDIT.md for every exact property, purpose and user intent. Native interaction, actual computed color, eight appearance/density combinations, mobile bounds, star selection, protected folder focus, loading phases and reduced motion are covered in the Chrome checks; automation does not substitute for maintainer approval or physical assistive-technology review.

## Native component catalog after b274445

The maintainer requested CSS-only counterparts from the shadcn/ui and daisyUI catalogs. A dated core inventory maps 66 and 68 names into 96 families, with 87 live native/presentation/alternative examples and nine excluded script-dependent engines. The generated coverage contract records exact classes/HTML and explicit behavior limits. New catalog-* rules/frames append after existing prose rules without changing earlier component objects or palette values.

The live gallery uses one stylesheet, shared preference script and browser-owned component behavior. Native dialog commands, popovers, interest tooltips, fieldsets, radios and details avoid fake ARIA widgets. Motion remains optional/off by default, with persistent text and reduced-motion rules; three audited frames support the two requested visual effects. decisions.json version 5 records animation scope and components.json exposes the independent component contract. Source/DOM checks found and corrected duplicate IDs, a nonshrinking gallery track, native figure margins and selector specificity for gallery/animation states.

## Document content additions after a3e02c5

The maintainer accepted filling the document-formatting gaps. prose.mjs appends scoped prose-* rules through the shared registry, with a six-level document scale, explicit block/list spacing, inline meaning, quotations, literal content, document tables, responsive figures and native disclosures. Existing application heading sizes and IDs retain their values. CONTENT.md distinguishes authored styles, retained native behavior and renderer integration requirements. The authored content.html specimen shares all appearance/density settings and one audited stylesheet. Styles do not expand Markdown v1 or implement a parser.

Document heading typography/components are added to all eight Google-format documents. Tests cover scope isolation, all combinations, nested and continued lists, inert source, local scrolling, disclosures/focus, media fallback, user spacing/forced colors and no JavaScript. Native summary focus needed a dedicated governed rule because the earlier component focus selector did not include summary.

## Box-model and margin review after fcb1d71

The maintainer requested normal/compact density and specifically included margins. BOX-MODEL.md defines each gap owner; the generated BOX-MODEL-AUDIT.md inventories every geometry declaration with source, normal/compact behavior, purpose and user intent. density.mjs registers all dimensional tokens and rejects new unregistered length-valued custom properties.

Compact reduces heading/paragraph/section margins, panel and field padding, toolbar/field/stack gaps, Bootstrap gutters, initial notes height, radii, switch geometry and heavier guidance strokes. Ordinary panels now remove their final child’s redundant trailing margin. Inline fields explicitly reset child margins and use grid row gaps, with minmax(0, 1fr) preventing intrinsic-width overflow. One-pixel boundaries, focus geometry, type, structural zero/auto/percentage values and reading widths remain protected. Coarse/hybrid/no-pointer surfaces retain the normal target floor.

Existing root token tuple IDs and consumer IDs remain stable; new root declarations append after existing entries. New rule IDs are density-compact, density-coarse-floor, grid-density, field-margins and panel-last-margin. inline-field appends grid layout declarations after its existing slots. Six copied Bootstrap groups retain their pinned source values; project gutter overrides follow them.

A third native Compact mode switch persists density alongside theme/vision under the existing reference key, with old records defaulting to normal. Eight resolved Google-format documents and browser cases cover the independent combinations. Switching retains native nodes, drafts and validation. Tests measure actual form/table reduction and margin ownership, rather than claiming every value can be uniformly scaled. This revision affects the isolated UI reference and guidelines.

## Shared light focus after b010254

The maintainer preferred standard light-mode focus and requested the same blue in the distinct-status appearance. Light/distinct now inherits focus #005fcc from the light palette instead of overriding it with interim azure #006aa8. The existing focus declaration in `palette-light-distinct` keeps its stable ID and revised rationale. Other role values retain their previous values.

Focus is now consistent between standard/distinct preferences at each brightness: #005fcc in light and #409fea in dark. The unit checks enforce that relationship, and existing browser checks cover actual patches, captions, focused controls and the simultaneous violet error state. COLOR-SELECTION.md records purpose and measured contrast.

## Dark distinct-mode focus separation after 8293cd8

The maintainer found pending and focus too similar in dark/distinct mode and asked whether the color patches reflected the preceding changes. Patches already used the same resolved role tokens as controls; the browser checks now explicitly compare every actual swatch fill and hex caption against its palette in all four modes.

Dark/distinct focus moves from amber #e5af3b to azure-blue #409fea, matching standard dark focus and leaving pending gold #eab54d. The existing `palette-dark-distinct` focus declaration keeps its stable ID with a revised rationale. Other color values retain their prior contracts. COLOR-SELECTION.md records purpose, mapping and all three dark-background contrast measurements; regenerated CSS and patches follow the same token change.

## Light distinct-mode focus separation after eb7e53c

The maintainer found light/distinct focus #7025b4 too close to violet error #6d2498 and requested focus nearer to primary. The existing focus token declaration in `palette-light-distinct` now uses azure #006aa8, with its per-declaration rationale updated and stable ID retained. The error color and other palette values retain their previous values. COLOR-SELECTION.md records the purpose and all three light-background contrast measurements.

The light/distinct browser case now checks a focused invalid input with an azure outline, violet border and linked written error simultaneously. Existing contrast, keyboard, forced-color and vision-simulation coverage remains in place. Shared design documents, CSS and review artifacts are regenerated from the same source.

## Richer dark focus and state colors after 6381813

The maintainer requested stronger dark-mode focus, error, success and pending colors with moderate emphasis. Standard mode replaces pale blue/coral/mint/amber with richer blue/coral/green/gold midtones. Distinct mode similarly enriches its amber focus, violet error and blue success; pending shares the richer gold. COLOR-SELECTION.md records previous/revised values, each user purpose and measured contrast.

Only the existing focus/danger/success/warning token declarations in `palette-dark-standard` and `palette-dark-distinct` change, retaining stable IDs. Their per-declaration rationale records compact emphasis on charcoal. Light palettes, azure buttons, structural fills, non-color cues, focus geometry and contrast thresholds retain their prior contracts. The existing four-appearance tests cover actual computed colors and interaction; new status/focus screenshots support visual review rather than adding tests that mirror each hex change.

## Azure and borderless actions after 72ff76e

The maintainer rejected the inherited green primary, selected azure #006aa8 for light mode, rejected the pale dark-mode candidates and accepted the same azure fill on charcoal without a permanent outline. The selected seed/treatment is recorded here; this does not automatically approve every individual declaration rationale. [COLOR-SELECTION.md](COLOR-SELECTION.md) records the monochromatic role method and exact contrast scope.

| Changed decision | Replacement / consequence |
| --- | --- |
| Existing primary/hover/on-primary color declarations in `tokens` and palette overrides | Azure #006aa8, deeper #005686 hover and white written labels in all four combinations; no alternate/pale dark-mode primary. |
| Appended interactive/on-interactive color declarations | Related blue roles for readable links, secondary labels and selected native marks, plus a separate contrasting switch thumb. Existing root token IDs are retained by appending both declarations after on-primary. |
| `primary.2`, `primary-hover.2` | Transparent permanent borders reserve the existing width; white labels identify the native button and the separate keyboard focus indicator remains. |
| `links.1`, `button.10`, `native-accent.1`, `switch-on.1`, `switch-thumb-on.2` | Use the new readable-interactive/selected-thumb roles rather than reusing primary fill and white label everywhere. |
| `swatch-interactive.1`, `forced-primary.1` | Demonstrate the new foreground/accent role; allow system ButtonText boundaries under forced colors. |
| Contrast matrix and exception contract | 100 required pair checks remain enforced. The 24 normal/hover button-fill/background observations are published separately under the written-label button exception; no text, selection or focus threshold is weakened. |
| Verification | All four palettes check actual borderless normal/hover buttons, stable geometry, visible written labels, keyboard focus, readable links/secondary labels, native accents, switch track/thumb and forced-color boundaries. |

Secondary actions remain an emphasis level with neutral framing and a blue label; no second or third brand hue was selected. The revision stays within UI-Spec and the live reference.

## Muted backgrounds after ffa59bc

The maintainer requested more subdued main-screen backgrounds using high-performance HMI principles such as ISA-101. The previous light near-white/warm surfaces and green-tinted dark surfaces are replaced by achromatic gray/charcoal planes. See [HMI-PHILOSOPHY.md](HMI-PHILOSOPHY.md) for the exact rationale and source interpretation.

| Changed decision | Replacement / consequence |
| --- | --- |
| `tokens`, `palette-dark-standard`, `palette-light-distinct`, `palette-dark-distinct` structural color declarations | Shared neutral structural roles within each brightness; modest gray separation for page/panels/support. Every resolved palette and contrast matrix is regenerated. Stable declaration IDs are retained. |
| `page.6` and structural color role rationale | Background purpose now explicitly keeps large fields quiet so meaningful content and cues have priority. Consumers retain semantic tokens. |
| `status.2`, `status.6`, `pending.2` | Compact success/pending labels keep colored foreground cues and words but use neutral backgrounds. They do not become colored panels. |
| `notice.2`, `notice.3` | Routine guidance gets a neutral boundary and fill rather than borrowing the primary action accent. |
| `backdrop.1` | Neutral black alpha dimming replaces the green-tinted modal veil. |
| Evidence | A regression check rejects hue in structural roles, mismatched structural colors across status preferences, excessive background separation and pure black/white structural fields. Browser checks verify actual header, notice and table backgrounds as well as body/panels; existing four-mode editing, contrast and preference checks continue to apply. |

The design is inspired by ISA-published principles. Exact gray values and the dark variant are project choices, not an ISA color mandate or evidence of industrial HMI conformance. This revision remains within the live reference and UI-Spec scope.

## Feedback on d837f50

The maintainer rejected interpreting click-to-edit as opening a disclosure to reveal a separate editor. The required behavior is a prefilled native input whose border/background blend into the page at rest and reveal on focus. This replaces the earlier interaction, not just its label.

| Retired or changed decision | Replacement / consequence |
| --- | --- |
| `editor`, `summary`, `summary-hover`, `summary-label`, `edit-cue`, `edit-form` and their declaration IDs | Removed. No details/summary, duplicated read value or open/close editor is used by the reference form. |
| `inline-field`, `inline-control`, `inline-control-focus`, `inline-control-invalid` | The same enabled prefilled native node stays present. Reserved border/padding prevents layout jumps. Only CSS focus reveals the box; errors and forced colors deliberately retain boundaries. |
| `inline-notes-rest`, `inline-notes-focus` | Keep the resize handle quiet until notes receive focus, then allow native vertical resizing. |
| Editing transaction | One visible record form with explicit Save changes / Cancel changes. Draft values remain visible after blur; no silent save, concealment or reversion. |
| `tokens` | Append on-primary without renumbering existing token declarations. Action text must contrast with action fill independently of panel surface. |
| `primary.3` and principal-button token variants | Foreground changes from surface to on-primary, preventing light-on-light action labels in dark mode. |
| `palette-dark-standard`, `palette-light-distinct`, `palette-dark-distinct` | Complete, independently checked color-role overrides rather than partial inversion. Native color-scheme follows brightness. |
| `appearance-box`, `switch-track`, `switch-thumb`, `switch-on`, `switch-thumb-on` | Two labeled native checkbox-based slider switches choose brightness and distinct status colors, creating four combinations. Position, text and checked state convey meaning. |
| `distinct-status`, `distinct-pending` | Add solid/dashed state boundaries to the alternate palette; named state words remain mandatory in every mode. |
| `forced-inline`, `forced-inline-focus`, `forced-switch`, `forced-switch-thumb` | Respect the system high-contrast palette and restore native checkbox marks for sliders. |

Shared rule purposes now describe palette roles rather than assuming white surfaces or green/blue values. Grid source rules and Bootstrap provenance are unchanged. All current proposals remain open to review; implemented feedback is not an automatic acceptance stamp.

Required evidence: the input’s identity and geometry stay unchanged on focus; rest/hover remain borderless; direct focus reveals a box without JavaScript; drafts survive blur and theme changes; Save/Cancel/IME work correctly; all four effective CSS palettes match their tokens; approved text/boundary/focus/slider pairs meet contrast thresholds; words and line patterns remain present under color-vision simulations. See [VALIDATION.md](VALIDATION.md) for actual results and limits.
