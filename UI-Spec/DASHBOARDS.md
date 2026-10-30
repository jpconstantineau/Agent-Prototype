# Native dashboard components and research

## Purpose

Extend the statistic and duration specimens into useful dashboard compositions, using the existing design system, native HTML and audited CSS. Record which patterns can show supplied page data without a chart runtime, why they are useful, their limits, and the data and accessibility contracts needed to implement them. Research reviewed 30 October 2026. This is a reference catalog; it does not add telemetry, a dashboard product or agent data access to the app.

## User intent

Understand a quantity, its unit and age; compare it with a prior period or target; recognize a trend or an exception; and inspect exact observations. Read these meanings in light/dark and standard/distinct appearances, at either density, using a small display, keyboard or assistive technology. Do not infer operational health from unexplained color, a large isolated number or an animation.

## Agent intent

Implementation agents compose the documented HTML/classes, supply validated measurements and preserve their written context and data alternatives. Runtime agents do not act through this presentation specification. It grants no monitoring, network, clock, scheduling, storage or mutation tools. A runtime agent may propose content only through separately authorized app contracts; a chart cannot make a measurement true or authorize an action.

## Research findings and decisions

These are assessments of portable patterns, not claims that the original libraries run without JavaScript. No library implementation, package, color theme or framework is imported.

| Source | Useful finding | Project decision |
| --- | --- | --- |
| [Charts.css data](https://chartscss.org/components/data/) and [line charts](https://chartscss.org/charts/line/) | HTML data and CSS can form bars, columns and connected segments. The documented sizing approach supplies normalized values and line endpoints. | Use original CSS and semantic source tables. Our numeric HTML attributes replace per-element inline styling so every declaration remains in the shared ledger. |
| [Carbon simple charts](https://www.carbondesignsystem.com/building-blocks/data-visualization/simple-charts) and [bullet charts](https://charts.carbondesignsystem.com/bullet) | The catalog includes compact trend, comparison, target and measurement patterns. Bullet charts compare an actual amount with a benchmark efficiently. | Prefer compact linear actual/target displays to large gauges for ordinary dashboard goals. Carbon provides pattern guidance; its chart engine is not a CSS-only dependency. |
| [Tremor spark charts](https://www.tremor.so/docs/visualizations/spark-chart) and [bar lists](https://www.tremor.so/docs/visualizations/barlist) | Small trend graphics and labelled horizontal comparisons fit beside dashboard metrics. Its spark implementation uses Recharts. | Implement limited one-series static equivalents. Keep source labels outside fills and exact values accessible. Do not copy React/Recharts, tooltips or event behavior. |
| [Mantine ring progress](https://mantine.dev/core/ring-progress/) and [semicircle progress](https://mantine.dev/core/semi-circle-progress/) | Bounded radial/arc layouts can summarize fractions; segmented rings need a valid combined total. | Reuse the existing radial-progress specimen where a fraction benefits from that shape. Prefer the linear meter or bullet when comparing several values; avoid a second circular primitive without a specific use case. |
| [Adobe Spectrum meter](https://spectrum.adobe.com/web/rsp/components/meter) and [progress circle](https://spectrum.adobe.com/web/rsp/components/progress-circle) | Measurement and operation progress are separate concepts. | Use native meter for a scalar in a known range, native progress for operation completion, and the existing spinner for indeterminate work. Do not substitute one semantic role for another. |
| [HTML meter standard](https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element) | Native value/range/threshold semantics and label association are defined independently of a component library. | Preserve the browser-owned meter contract and its real label; CSS governs appearance rather than duplicating its state. |
| [Chrome typed attr()](https://developer.chrome.com/blog/advanced-attr) | Chrome 133 added typed attributes usable beyond generated text. | Read validated numeric attributes in CSS for lengths, percentages and segment endpoints. The target remains current Chrome; test geometry rather than relying only on syntax support. |
| [USWDS visualization guidance](https://designsystem.digital.gov/components/data-visualizations/) | Data access and an explanation of the insight complement the visual. | Every graphic has real labels, units, time context, exact values and a narrative of the relevant pattern. A source table alone does not replace the trend explanation. |

## Component inventory

[Live dashboard specimens](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/dashboard.html) contain eight independently inspectable compositions. Each exposes exact HTML through a native source disclosure. The original 96-family upstream catalog remains separately counted; these are project dashboard additions, not invented entries in those upstream inventories.

| Component | Purpose and user benefit | Native/CSS implementation and limit |
| --- | --- | --- |
| Statistic + trend + snapshot | Give a KPI its comparison, direction and age. | Existing ui-stat, real arrow and written change, a native time duration and responsive ui-dashboard-grid. An increase is not automatically success. Changes and deadlines are supplied; the example does not calculate live time. |
| Horizontal comparison bars | Compare labelled bounded scores and read exact values. | Ordinary table with ui-bar-value data elements. A CSS pseudo-element draws a normalized bar beneath each value; table semantics stay intact. No ranking, sorting or data fetch occurs in CSS. |
| Line sparkline | Scan the chronological shape beside a written trend. | ui-sparkline flex row of clipped straight ui-spark-segment elements derived from adjacent observations. Fixed common domain, equal intervals and one series; native disclosure exposes the complete table. No smoothing, missing-point interpolation, hover-only values or zoom engine. |
| Columns / spark bars | Compare discrete observations on a shared zero baseline. | ui-spark-bars and ui-spark-column heights from supplied normalized percentages, with chronological exact values. Current example is nonnegative. Negative/diverging values need a separate signed-zero contract. |
| Bullet / actual versus target | Assess shortfall compactly. | ui-bullet draws a slimmer actual bar and a full-height neutral target tick. Real text gives actual, target, range and difference. This is a one-target presentation; qualitative range bands or multiple targets need an explicit extension. |
| Capacity meter | Read a scalar amount and threshold ranges. | Native meter min/max/low/high/optimum/value and persistent label. ui-meter adapts Chrome’s native track/fill styling. Scalar semantics remain browser-owned; use progress for work completion. |
| Segmented composition bar | Understand contributions to one total. | ui-segment-bar contains supplied percentages with category modifiers and visible boundaries. Ordered direct wording and a full count/share table remove dependence on color. Shares must sum to 100; this is composition, not a progress claim. |
| Availability/event tracker | Locate observed exceptions and unknown intervals. | ui-tracker has static symbol tiles for available, unavailable and unknown observations. Exact intervals/states remain in a native table. Missing samples are explicitly unknown, never filled as success. There are no automatic probes. |

Other candidates worth considering, with no new runtime dependency:

| Candidate | Possible native/CSS approach | Decision / prerequisite |
| --- | --- | --- |
| Heatmap / calendar heatmap | A semantic table with intensity classes, written cell values and time/category headers. | Useful for activity by hour/day; define bins, missing data, timezone and a numeric legend before adding a specimen. Intensity alone is insufficient. |
| Waffle / unit grid | A bounded grid of decorative equal-unit cells beside a real count/total. | Useful for a small discrete total; avoid hundreds of DOM cells or a grid that implies precision the data lacks. |
| Donut / semicircle gauge | Existing circular progress styling or a conic-gradient arc, plus exact fraction. | Technically possible; existing radial-progress already covers the basic fraction. Use a new shape only when it improves the stated task, not to duplicate a KPI. |
| Grouped bars / histograms | Tables and repeated CSS columns with supplied bins or categories. | Feasible once shared domains, bin widths, sample counts and series identification are explicit. CSS does not calculate a histogram or aggregate raw events. |
| Range / deviation bar | Marker positioned relative to a declared signed domain and visible zero. | Useful for tolerance and variance; requires a correct zero/reference, units and treatment of outliers. A positive-only fill must not be reused for signed data. |
| Scatter, box plots, financial/time-series exploration, maps | A server/generated SVG or an interactive chart engine with source data and equivalent interactions. | Keep outside the current HTML/CSS subset. Statistics, hit testing, pan/zoom, tooltips and keyboard exploration are additional behavior contracts. |

## Data contract and mapping to HTML

Application code or a page generator supplies data. CSS presents that data; it does not query IndexedDB, aggregate history, infer trends, fetch endpoints or decide whether a service is healthy. Use plain JavaScript data, independently of a framework:

```javascript
{
  title: "Daily reviews",
  unit: "reviews",
  asOf: "2026-10-30T10:00:00Z",
  domain: { min: 0, max: 100 },
  observations: [
    { label: "Monday", value: 30 },
    { label: "Tuesday", value: 45 }
  ],
  target: 75 // optional, in the same unit/domain
}
```

1. Require finite numeric values and a finite domain with max greater than min. Reject numeric strings, NaN, Infinity and out-of-range values. UI-Spec/dashboard-examples.mjs exports percentage(value, min, max), including rejection of malformed values, and uses it when generating specimen geometry. A line domain may include negatives; bar comparisons in this subset start at a true zero.
2. Normalize geometry as 100 × (value − min) / (max − min). Preserve the original number and unit in real text. Do not normalize independently per bar, silently truncate a baseline or choose a convenient minimum that exaggerates a difference.
3. Publish labels, units, range, period, timezone/as-of value and an accurate written trend. Format them with DOM textContent or a trusted escaping helper. Do not accept HTML/CSS strings as data. Snapshot descriptions must correspond to the same observations as the graphic.
4. For a comparison row, data.value holds the actual quantity; data-percent holds its normalized 0–100 geometry. For a line segment, data-from and data-to come from adjacent observations. For a bullet, data-percent and data-target use the same domain. For a native meter, native value/min/max/low/high/optimum stay authoritative; do not add a stale duplicate aria-valuenow.
5. For composition, validate counts, a positive total and the complete set of proportions before publishing segments. Compute both labels and attributes from the same record. Do not silently discard a remainder or let percentages exceeding 100 overlap. Apply rounding only after calculation and explain displayed rounding if it changes totals.
6. The compact line assumes evenly spaced complete observations. Missing values require separate segments with a gap and an explicit source state. Irregular dates need explicit x positions or a different visualization. Never connect across missing data or turn null into zero. An empty dataset shows “No observations”; zero is a valid measurement; unavailable, stale and unknown are separate states.
7. Attributes are numeric data, never injected inline styles. CSS bounds percentages defensively, but this does not replace input validation or certify the underlying measurement. A fallback zero for a malformed attribute must never be published as a legitimate zero measurement by the application.
8. Build the graphic, written summary and table from one validated snapshot. A future update changes all three together and supplies a new as-of time. The existing duration specimen stays static; a real countdown requires a clock, deadline, timezone and stale/resume handling in app logic.

## CSS, layout and accessibility contract

All dashboard styles are original declarations in dashboard-styles.mjs installed into the shared registry by system.mjs. They use the dashboard verification family, appear in CSS-DECISIONS.md and the box audit, and load through the same design-system.css as every reference page. No inline style, canvas renderer, SVG chart dependency, extra stylesheet or component script is added. The only authored browser script on the specimen page is the existing appearance preference script.

Large surfaces remain neutral. A single-series chart uses the existing interactive blue, not success/error hues. Semantic composition/tracker colors apply only to explicitly named conditions. Real text on colored tiles/badges uses the existing checked on-interactive ink; the four palette contrast matrices remain authoritative. In forced colors a decorative graph may lose distinctions; the written summary and exact data remain available. Do not opt out of the user’s forced-color preference to preserve a chart.

Every new CSS declaration has its exact property, value, scope, purpose and user intent in the shared ledger. Geometry intentions include: 4rem sparkline height for a compact trend, a 24rem maximum width to retain its contextual scale, a protected 3px line/tick for visibility, an 8rem column plot for volume comparison, and 1.5rem meter/segment/tracker measures for legibility. These are plot geometry, not smaller text or pointer targets; normal/compact use the same data scale. Spacing, card insets, gaps and radii use the existing governed density tokens. Metric text remains at the normal readable scale.

Do not replace a real table with display:grid/flex on its rows or cells. Graphics that repeat the accessible data are aria-hidden; the native table retains caption, column headers and row headers. Details/summary exposes exact source values without JavaScript, and the narrative remains visible before expansion. Scrollable data regions are named and keyboard focusable. No chart point is presented as a fake button, and no essential data exists only on hover. Responsive metric cards stack using available space; long source data scrolls inside a bounded region rather than widening the page.

## Maintained files and verification

| File | Responsibility |
| --- | --- |
| dashboard-examples.mjs | Trusted sample snapshots, numeric normalization, exact HTML, public classes, purpose, intent and research links |
| dashboard-styles.mjs | Audited original presentation, plot geometry and native Chrome meter styling |
| dashboard-output.mjs | Generated page, source disclosures, index and links |
| docs/ui-spec/dashboard.html | Deployed static reference; development server explicitly allows this asset |
| docs/e2e/ui-dashboard.spec.js | All eight appearance/density combinations, computed colors/geometry, native data access, reflow, no-script, enlarged text and forced-color checks |

The unit checks reject malformed normalization inputs, verify no inline executable styles/scripts, and tie every declared public class to markup and audited rules. The complete CSSOM audit includes every dashboard declaration. Browser checks measure actual columns/target positions, confirm typed attributes affect geometry, inspect exact observations and unknown states, and exercise 320/390/768/1440px bounds. These checks establish bounded evidence; maintainer review, physical devices and assistive-technology testing remain necessary for product adoption.
