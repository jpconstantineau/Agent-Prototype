# CSS declaration decisions

Generated from [system.mjs](system.mjs). Every declaration has a stable ID, exact value, purpose, user intent and verification family. All decisions are **proposed**, pending maintainer review. Tests establish traceability and observable constraints, not approval of the rationale. Shorthand properties cover every expanded longhand; changing a shorthand value requires reviewing all of its effects.

## tokens

Selector: `:root`. Source: project. Verification family: `tokens`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| tokens.1 | color-scheme | light | Publish semantic values for consistent reuse. Provide the default light native-control scheme before a selected palette overrides it; forced colors remain user controlled. | Recognize the same meaning across screens. | proposed |
| tokens.2 | --ui-primary | #006aa8 | Publish semantic values for consistent reuse. Identify the main available action with a restrained accent; never use this fill for large decorative panels. | Recognize the same meaning across screens. | proposed |
| tokens.3 | --ui-primary-hover | #005686 | Publish semantic values for consistent reuse. Confirm pointer targeting with a distinct action fill. | Recognize the same meaning across screens. | proposed |
| tokens.4 | --ui-ink | #242424 | Publish semantic values for consistent reuse. Keep task names and body copy readable with neutral text on the active surfaces. | Recognize the same meaning across screens. | proposed |
| tokens.5 | --ui-muted | #505050 | Publish semantic values for consistent reuse. Distinguish supporting information with neutral text while keeping ordinary text contrast. | Recognize the same meaning across screens. | proposed |
| tokens.6 | --ui-canvas | #d9d9d9 | Publish semantic values for consistent reuse. Provide an achromatic gray page background so large areas do not compete with content or meaningful state cues. | Recognize the same meaning across screens. | proposed |
| tokens.7 | --ui-surface | #e6e6e6 | Publish semantic values for consistent reuse. Separate reading and editing panels using a nearby opaque gray rather than a bright white or colored field. | Recognize the same meaning across screens. | proposed |
| tokens.8 | --ui-subtle | #dedede | Publish semantic values for consistent reuse. Group secondary content with a nearby achromatic gray without implying an alarm or disabled state. | Recognize the same meaning across screens. | proposed |
| tokens.9 | --ui-border | #737373 | Publish semantic values for consistent reuse. Identify editable-control boundaries with neutral non-text contrast. | Recognize the same meaning across screens. | proposed |
| tokens.10 | --ui-divider | #b8b8b8 | Publish semantic values for consistent reuse. Separate passive groups with a quiet neutral line without making every row a control. | Recognize the same meaning across screens. | proposed |
| tokens.11 | --ui-focus | #005fcc | Publish semantic values for consistent reuse. Identify the keyboard destination independently of the primary action color. | Recognize the same meaning across screens. | proposed |
| tokens.12 | --ui-danger | #9b2c24 | Publish semantic values for consistent reuse. Mark a problem alongside explanatory text. | Recognize the same meaning across screens. | proposed |
| tokens.13 | --ui-success | #235b3b | Publish semantic values for consistent reuse. Reinforce confirmed completion alongside a word label. | Recognize the same meaning across screens. | proposed |
| tokens.14 | --ui-success-bg | #dedede | Publish semantic values for consistent reuse. Group confirmed results on a neutral gray without making routine completion a colored field. | Recognize the same meaning across screens. | proposed |
| tokens.15 | --ui-warning | #725000 | Publish semantic values for consistent reuse. Highlight a condition that needs attention without declaring failure. | Recognize the same meaning across screens. | proposed |
| tokens.16 | --ui-warning-bg | #dedede | Publish semantic values for consistent reuse. Keep pending decisions on a neutral gray; their words and compact foreground cues carry the state. | Recognize the same meaning across screens. | proposed |
| tokens.17 | --ui-disabled | #505050 | Publish semantic values for consistent reuse. Keep the reason for an unavailable action readable with neutral text. | Recognize the same meaning across screens. | proposed |
| tokens.18 | --ui-disabled-bg | #d2d2d2 | Publish semantic values for consistent reuse. Distinguish unavailable controls with a neutral fill and native disabled semantics rather than a warning color. | Recognize the same meaning across screens. | proposed |
| tokens.19 | --ui-space-xs | 0.25rem | Publish semantic values for consistent reuse. Use the xs spacing step to express content grouping; its exact use is recorded at each consumer. | Recognize the same meaning across screens. | proposed |
| tokens.20 | --ui-space-sm | 0.5rem | Publish semantic values for consistent reuse. Use the sm spacing step to express content grouping; its exact use is recorded at each consumer. | Recognize the same meaning across screens. | proposed |
| tokens.21 | --ui-space-md | 0.75rem | Publish semantic values for consistent reuse. Use the md spacing step to express content grouping; its exact use is recorded at each consumer. | Recognize the same meaning across screens. | proposed |
| tokens.22 | --ui-space-lg | 1rem | Publish semantic values for consistent reuse. Use the lg spacing step to express content grouping; its exact use is recorded at each consumer. | Recognize the same meaning across screens. | proposed |
| tokens.23 | --ui-space-xl | 1.5rem | Publish semantic values for consistent reuse. Use the xl spacing step to express content grouping; its exact use is recorded at each consumer. | Recognize the same meaning across screens. | proposed |
| tokens.24 | --ui-space-section | 2rem | Publish semantic values for consistent reuse. Use the section spacing step to express content grouping; its exact use is recorded at each consumer. | Recognize the same meaning across screens. | proposed |
| tokens.25 | --ui-space-page | 3rem | Publish semantic values for consistent reuse. Use the page spacing step to express content grouping; its exact use is recorded at each consumer. | Recognize the same meaning across screens. | proposed |
| tokens.26 | --ui-radius-small | 0.375rem | Publish semantic values for consistent reuse. Use the small corner size to distinguish controls from containing panels. | Recognize the same meaning across screens. | proposed |
| tokens.27 | --ui-radius-panel | 0.75rem | Publish semantic values for consistent reuse. Use the panel corner size to distinguish controls from containing panels. | Recognize the same meaning across screens. | proposed |
| tokens.28 | --ui-font | system-ui, -apple-system, "Segoe UI", sans-serif | Publish semantic values for consistent reuse. Use installed fonts so text is immediately available without a font download. | Recognize the same meaning across screens. | proposed |
| tokens.29 | --ui-on-primary | #ffffff | Publish semantic values for consistent reuse. Keep the written principal-action label readable against the selected azure fill in both brightness modes. | Recognize the same meaning across screens. | proposed |
| tokens.30 | --ui-interactive | #005b90 | Publish semantic values for consistent reuse. Keep links, secondary-action labels and compact native selection marks readable using an azure-related blue tuned to adjacent neutral surfaces. | Recognize the same meaning across screens. | proposed |
| tokens.31 | --ui-on-interactive | #ffffff | Publish semantic values for consistent reuse. Keep the selected switch thumb distinct from its interactive-blue track without changing the native checked state. | Recognize the same meaning across screens. | proposed |

## palette-dark-standard

Selector: `:root[data-bs-theme="dark"]:not([data-vision="distinct"])`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| palette-dark-standard.1 | color-scheme | dark | Apply the complete Dark · standard palette. Align native controls and scrollbars with this appearance. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.2 | --ui-primary | #006aa8 | Apply the complete Dark · standard palette. Identify the main available action with a restrained accent; never use this fill for large decorative panels. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.3 | --ui-primary-hover | #005686 | Apply the complete Dark · standard palette. Confirm pointer targeting with a distinct action fill. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.4 | --ui-ink | #ededed | Apply the complete Dark · standard palette. Keep task names and body copy readable with neutral text on the active surfaces. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.5 | --ui-muted | #c2c2c2 | Apply the complete Dark · standard palette. Distinguish supporting information with neutral text while keeping ordinary text contrast. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.6 | --ui-canvas | #242424 | Apply the complete Dark · standard palette. Provide an achromatic gray page background so large areas do not compete with content or meaningful state cues. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.7 | --ui-surface | #2e2e2e | Apply the complete Dark · standard palette. Separate reading and editing panels using a nearby opaque gray rather than a bright white or colored field. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.8 | --ui-subtle | #383838 | Apply the complete Dark · standard palette. Group secondary content with a nearby achromatic gray without implying an alarm or disabled state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.9 | --ui-border | #a3a3a3 | Apply the complete Dark · standard palette. Identify editable-control boundaries with neutral non-text contrast. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.10 | --ui-divider | #585858 | Apply the complete Dark · standard palette. Separate passive groups with a quiet neutral line without making every row a control. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.11 | --ui-focus | #409fea | Apply the complete Dark · standard palette. Identify the keyboard destination independently of the primary action color. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.12 | --ui-danger | #f58276 | Apply the complete Dark · standard palette. Mark a problem alongside explanatory text. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.13 | --ui-success | #4fc685 | Apply the complete Dark · standard palette. Reinforce confirmed completion alongside a word label. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.14 | --ui-success-bg | #383838 | Apply the complete Dark · standard palette. Group confirmed results on a neutral gray without making routine completion a colored field. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.15 | --ui-warning | #eab54d | Apply the complete Dark · standard palette. Highlight a condition that needs attention without declaring failure. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.16 | --ui-warning-bg | #383838 | Apply the complete Dark · standard palette. Keep pending decisions on a neutral gray; their words and compact foreground cues carry the state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.17 | --ui-disabled | #c2c2c2 | Apply the complete Dark · standard palette. Keep the reason for an unavailable action readable with neutral text. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.18 | --ui-disabled-bg | #404040 | Apply the complete Dark · standard palette. Distinguish unavailable controls with a neutral fill and native disabled semantics rather than a warning color. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.19 | --ui-on-primary | #ffffff | Apply the complete Dark · standard palette. Keep the written principal-action label readable against the selected azure fill in both brightness modes. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.20 | --ui-interactive | #40adf0 | Apply the complete Dark · standard palette. Keep links, secondary-action labels and compact native selection marks readable using an azure-related blue tuned to adjacent neutral surfaces. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-standard.21 | --ui-on-interactive | #242424 | Apply the complete Dark · standard palette. Keep the selected switch thumb distinct from its interactive-blue track without changing the native checked state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |

## palette-light-distinct

Selector: `:root[data-vision="distinct"]:not([data-bs-theme="dark"])`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| palette-light-distinct.1 | color-scheme | light | Apply the complete Light · distinct status colors palette. Align native controls and scrollbars with this appearance. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.2 | --ui-primary | #006aa8 | Apply the complete Light · distinct status colors palette. Identify the main available action with a restrained accent; never use this fill for large decorative panels. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.3 | --ui-primary-hover | #005686 | Apply the complete Light · distinct status colors palette. Confirm pointer targeting with a distinct action fill. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.4 | --ui-ink | #242424 | Apply the complete Light · distinct status colors palette. Keep task names and body copy readable with neutral text on the active surfaces. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.5 | --ui-muted | #505050 | Apply the complete Light · distinct status colors palette. Distinguish supporting information with neutral text while keeping ordinary text contrast. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.6 | --ui-canvas | #d9d9d9 | Apply the complete Light · distinct status colors palette. Provide an achromatic gray page background so large areas do not compete with content or meaningful state cues. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.7 | --ui-surface | #e6e6e6 | Apply the complete Light · distinct status colors palette. Separate reading and editing panels using a nearby opaque gray rather than a bright white or colored field. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.8 | --ui-subtle | #dedede | Apply the complete Light · distinct status colors palette. Group secondary content with a nearby achromatic gray without implying an alarm or disabled state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.9 | --ui-border | #737373 | Apply the complete Light · distinct status colors palette. Identify editable-control boundaries with neutral non-text contrast. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.10 | --ui-divider | #b8b8b8 | Apply the complete Light · distinct status colors palette. Separate passive groups with a quiet neutral line without making every row a control. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.11 | --ui-focus | #7025b4 | Apply the complete Light · distinct status colors palette. Identify the keyboard destination independently of the primary action color. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.12 | --ui-danger | #6d2498 | Apply the complete Light · distinct status colors palette. Mark a problem alongside explanatory text. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.13 | --ui-success | #174b7a | Apply the complete Light · distinct status colors palette. Reinforce confirmed completion alongside a word label. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.14 | --ui-success-bg | #dedede | Apply the complete Light · distinct status colors palette. Group confirmed results on a neutral gray without making routine completion a colored field. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.15 | --ui-warning | #725000 | Apply the complete Light · distinct status colors palette. Highlight a condition that needs attention without declaring failure. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.16 | --ui-warning-bg | #dedede | Apply the complete Light · distinct status colors palette. Keep pending decisions on a neutral gray; their words and compact foreground cues carry the state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.17 | --ui-disabled | #505050 | Apply the complete Light · distinct status colors palette. Keep the reason for an unavailable action readable with neutral text. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.18 | --ui-disabled-bg | #d2d2d2 | Apply the complete Light · distinct status colors palette. Distinguish unavailable controls with a neutral fill and native disabled semantics rather than a warning color. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.19 | --ui-on-primary | #ffffff | Apply the complete Light · distinct status colors palette. Keep the written principal-action label readable against the selected azure fill in both brightness modes. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.20 | --ui-interactive | #005b90 | Apply the complete Light · distinct status colors palette. Keep links, secondary-action labels and compact native selection marks readable using an azure-related blue tuned to adjacent neutral surfaces. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-light-distinct.21 | --ui-on-interactive | #ffffff | Apply the complete Light · distinct status colors palette. Keep the selected switch thumb distinct from its interactive-blue track without changing the native checked state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |

## palette-dark-distinct

Selector: `:root[data-bs-theme="dark"][data-vision="distinct"]`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| palette-dark-distinct.1 | color-scheme | dark | Apply the complete Dark · distinct status colors palette. Align native controls and scrollbars with this appearance. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.2 | --ui-primary | #006aa8 | Apply the complete Dark · distinct status colors palette. Identify the main available action with a restrained accent; never use this fill for large decorative panels. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.3 | --ui-primary-hover | #005686 | Apply the complete Dark · distinct status colors palette. Confirm pointer targeting with a distinct action fill. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.4 | --ui-ink | #ededed | Apply the complete Dark · distinct status colors palette. Keep task names and body copy readable with neutral text on the active surfaces. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.5 | --ui-muted | #c2c2c2 | Apply the complete Dark · distinct status colors palette. Distinguish supporting information with neutral text while keeping ordinary text contrast. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.6 | --ui-canvas | #242424 | Apply the complete Dark · distinct status colors palette. Provide an achromatic gray page background so large areas do not compete with content or meaningful state cues. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.7 | --ui-surface | #2e2e2e | Apply the complete Dark · distinct status colors palette. Separate reading and editing panels using a nearby opaque gray rather than a bright white or colored field. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.8 | --ui-subtle | #383838 | Apply the complete Dark · distinct status colors palette. Group secondary content with a nearby achromatic gray without implying an alarm or disabled state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.9 | --ui-border | #a3a3a3 | Apply the complete Dark · distinct status colors palette. Identify editable-control boundaries with neutral non-text contrast. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.10 | --ui-divider | #585858 | Apply the complete Dark · distinct status colors palette. Separate passive groups with a quiet neutral line without making every row a control. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.11 | --ui-focus | #e5af3b | Apply the complete Dark · distinct status colors palette. Identify the keyboard destination independently of the primary action color. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.12 | --ui-danger | #d18bf0 | Apply the complete Dark · distinct status colors palette. Mark a problem alongside explanatory text. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.13 | --ui-success | #57adf0 | Apply the complete Dark · distinct status colors palette. Reinforce confirmed completion alongside a word label. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.14 | --ui-success-bg | #383838 | Apply the complete Dark · distinct status colors palette. Group confirmed results on a neutral gray without making routine completion a colored field. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.15 | --ui-warning | #eab54d | Apply the complete Dark · distinct status colors palette. Highlight a condition that needs attention without declaring failure. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.16 | --ui-warning-bg | #383838 | Apply the complete Dark · distinct status colors palette. Keep pending decisions on a neutral gray; their words and compact foreground cues carry the state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.17 | --ui-disabled | #c2c2c2 | Apply the complete Dark · distinct status colors palette. Keep the reason for an unavailable action readable with neutral text. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.18 | --ui-disabled-bg | #404040 | Apply the complete Dark · distinct status colors palette. Distinguish unavailable controls with a neutral fill and native disabled semantics rather than a warning color. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.19 | --ui-on-primary | #ffffff | Apply the complete Dark · distinct status colors palette. Keep the written principal-action label readable against the selected azure fill in both brightness modes. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.20 | --ui-interactive | #40adf0 | Apply the complete Dark · distinct status colors palette. Keep links, secondary-action labels and compact native selection marks readable using an azure-related blue tuned to adjacent neutral surfaces. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
| palette-dark-distinct.21 | --ui-on-interactive | #242424 | Apply the complete Dark · distinct status colors palette. Keep the selected switch thumb distinct from its interactive-blue track without changing the native checked state. This value is independently contrast checked in this palette. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |

## box

Selector: `*, *::before, *::after`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| box.1 | box-sizing | border-box | Make declared sizes include padding and borders. Prevent padded elements from unexpectedly exceeding their allotted width. | Keep controls and columns within the visible viewport. | proposed |

## page

Selector: `body`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| page.1 | margin | 0 | Establish a readable document baseline. Remove the browser page margin so the container owns one consistent outer gutter. | Read and navigate ordinary content without zoom or horizontal panning. | proposed |
| page.2 | font-family | var(--ui-font) | Establish a readable document baseline. Render body text with the documented installed font stack. | Read and navigate ordinary content without zoom or horizontal panning. | proposed |
| page.3 | font-size | 1rem | Establish a readable document baseline. Respect the browser default reading size instead of shrinking all content. | Read and navigate ordinary content without zoom or horizontal panning. | proposed |
| page.4 | line-height | 1.5 | Establish a readable document baseline. Leave room between lines for sustained reading and text spacing preferences. | Read and navigate ordinary content without zoom or horizontal panning. | proposed |
| page.5 | color | var(--ui-ink) | Establish a readable document baseline. Use the main text role on the active canvas. | Read and navigate ordinary content without zoom or horizontal panning. | proposed |
| page.6 | background-color | var(--ui-canvas) | Establish a readable document baseline. Use a quiet achromatic canvas so the page does not compete with work panels or state cues in any palette. | Read and navigate ordinary content without zoom or horizontal panning. | proposed |
| page.7 | overflow-wrap | anywhere | Establish a readable document baseline. Wrap long names and URLs rather than widening the page. | Read and navigate ordinary content without zoom or horizontal panning. | proposed |

## headings

Selector: `h1, h2, h3`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| headings.1 | margin | 0 0 var(--ui-space-lg) | Create hierarchy without changing document semantics. Separate headings from following content without cumulative top gaps. | Scan sections and locate the task at hand. | proposed |
| headings.2 | font-weight | 600 | Create hierarchy without changing document semantics. Make headings distinct while keeping their letterforms readable. | Scan sections and locate the task at hand. | proposed |
| headings.3 | line-height | 1.25 | Create hierarchy without changing document semantics. Group heading lines more tightly than paragraphs. | Scan sections and locate the task at hand. | proposed |

## title

Selector: `h1`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| title.1 | font-size | 2rem | Identify the page once. Keep the main title legible at narrow widths without oversized display type. | Know which workspace or example is open. | proposed |
| title.2 | line-height | 1.2 | Identify the page once. Keep a wrapped page title visually together. | Know which workspace or example is open. | proposed |

## section-title

Selector: `h2`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| section-title.1 | font-size | 1.5rem | Identify major sections. Distinguish sections from both the page title and body. | Find the relevant family of examples. | proposed |

## subheading

Selector: `h3`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| subheading.1 | font-size | 1.125rem | Identify a component or card. Create a local heading without competing with a section title. | Understand a local group before acting. | proposed |

## copy

Selector: `p, ul, ol, dl`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| copy.1 | margin-block | 0 var(--ui-space-lg) | Keep prose spacing predictable. Leave one body-text gap after paragraphs and lists. | Read related information as a single group. | proposed |

## small

Selector: `small, .ui-help`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| small.1 | font-size | 0.875rem | Distinguish secondary explanations. Keep help at a readable 14px when the default is 16px. | Read help without mistaking it for an editable value. | proposed |
| small.2 | color | var(--ui-muted) | Distinguish secondary explanations. Reduce emphasis while retaining AA text contrast on every supported palette surface. | Read help without mistaking it for an editable value. | proposed |

## links

Selector: `a`. Source: project. Verification family: `focus`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| links.1 | color | var(--ui-interactive) | Make navigation identifiable without color alone. Use the blue text role that meets ordinary text contrast on each neutral surface; primary is a button fill only. | Recognize destinations before clicking. | proposed |
| links.2 | text-decoration | underline | Make navigation identifiable without color alone. Distinguish links from plain text for all color perception. | Recognize destinations before clicking. | proposed |
| links.3 | text-underline-offset | 0.2em | Make navigation identifiable without color alone. Keep the underline clear of letter descenders. | Recognize destinations before clicking. | proposed |

## focus

Selector: `:where(a, button, input, select, textarea, [tabindex]):focus-visible`. Source: project. Verification family: `focus`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| focus.1 | outline | 3px solid var(--ui-focus) | Expose keyboard focus on every interactive surface. Use a sufficiently thick, contrasting perimeter instead of removing the native indicator. | Know exactly where keyboard input will act. | proposed |
| focus.2 | outline-offset | 3px | Expose keyboard focus on every interactive surface. Separate the focus perimeter from the control border and active button fill. | Know exactly where keyboard input will act. | proposed |

## hidden

Selector: `[hidden]`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| hidden.1 | display | none !important | Honor the HTML hidden state. Prevent component display rules from revealing hidden errors and inactive status. | Encounter only active content in the current interaction. | proposed |

## native-font

Selector: `button, input, select, textarea`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| native-font.1 | font | inherit | Keep native controls typographically consistent. Prevent platform form controls from silently shrinking to a small default. | Read labels and values at the same size as surrounding text. | proposed |

## native-accent

Selector: `input[type="checkbox"], input[type="radio"], progress`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| native-accent.1 | accent-color | var(--ui-interactive) | Retain native control behavior with the action color. Use a blue with contrast against the adjacent neutral surfaces while leaving native marks and forced-color adaptation intact. | Recognize selection and progress without learning custom widgets. | proposed |

## progress-cap

Selector: `progress`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| progress-cap.1 | max-inline-size | 100% | Keep native progress readable inside a narrow panel. Cap the browser’s font-relative intrinsic width at the available panel width. | Inspect progress while using enlarged text without panning the page. | proposed |

## checkbox

Selector: `input[type="checkbox"], input[type="radio"]`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| checkbox.1 | inline-size | 1.25rem | Keep native choice marks visibly identifiable. Provide a 20px mark while the surrounding label supplies the full touch area. | See which option is selected inside its larger label target. | proposed |
| checkbox.2 | block-size | 1.25rem | Keep native choice marks visibly identifiable. Give the native choice mark a square footprint. | See which option is selected inside its larger label target. | proposed |
| checkbox.3 | flex-shrink | 0 | Keep native choice marks visibly identifiable. Prevent long label text from compressing the mark. | See which option is selected inside its larger label target. | proposed |

## bs-container

Selector: `.container`. Source: bootstrap. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| bs-container.1 | --bs-gutter-x | 1.5rem | Use Bootstrap container gutters and centering. Set a 24px total horizontal gutter at the default font size. | Read columns with consistent edge clearance on every screen. | proposed |
| bs-container.2 | --bs-gutter-y | 0 | Use Bootstrap container gutters and centering. Start without a vertical gutter until the page grid opts into one. | Read columns with consistent edge clearance on every screen. | proposed |
| bs-container.3 | width | 100% | Use Bootstrap container gutters and centering. Fill the available width before the project maximum is applied. | Read columns with consistent edge clearance on every screen. | proposed |
| bs-container.4 | padding-right | calc(var(--bs-gutter-x) * 0.5) | Use Bootstrap container gutters and centering. Supply the right half of the Bootstrap gutter. | Read columns with consistent edge clearance on every screen. | proposed |
| bs-container.5 | padding-left | calc(var(--bs-gutter-x) * 0.5) | Use Bootstrap container gutters and centering. Supply the left half of the Bootstrap gutter. | Read columns with consistent edge clearance on every screen. | proposed |
| bs-container.6 | margin-right | auto | Use Bootstrap container gutters and centering. Center unused space to the right. | Read columns with consistent edge clearance on every screen. | proposed |
| bs-container.7 | margin-left | auto | Use Bootstrap container gutters and centering. Center unused space to the left. | Read columns with consistent edge clearance on every screen. | proposed |

## bs-row

Selector: `.row`. Source: bootstrap. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| bs-row.1 | --bs-gutter-x | 1.5rem | Use Bootstrap wrapping rows. Provide one consistent total horizontal column gap. | See columns stack naturally when space is limited. | proposed |
| bs-row.2 | --bs-gutter-y | 0 | Use Bootstrap wrapping rows. Let the project opt into vertical gaps explicitly. | See columns stack naturally when space is limited. | proposed |
| bs-row.3 | display | flex | Use Bootstrap wrapping rows. Lay columns out using the actual Bootstrap flex grid. | See columns stack naturally when space is limited. | proposed |
| bs-row.4 | flex-wrap | wrap | Use Bootstrap wrapping rows. Move columns to another line rather than squeezing their content. | See columns stack naturally when space is limited. | proposed |
| bs-row.5 | margin-top | calc(-1 * var(--bs-gutter-y)) | Use Bootstrap wrapping rows. Cancel the first row of child top gutters. | See columns stack naturally when space is limited. | proposed |
| bs-row.6 | margin-right | calc(-0.5 * var(--bs-gutter-x)) | Use Bootstrap wrapping rows. Align column content with the container right edge. | See columns stack naturally when space is limited. | proposed |
| bs-row.7 | margin-left | calc(-0.5 * var(--bs-gutter-x)) | Use Bootstrap wrapping rows. Align column content with the container left edge. | See columns stack naturally when space is limited. | proposed |

## bs-children

Selector: `.row > *`. Source: bootstrap. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| bs-children.1 | flex-shrink | 0 | Apply Bootstrap gutters to immediate columns. Preserve a chosen column fraction rather than silently shrinking it. | Keep adjacent panels apart without reducing their reading width unpredictably. | proposed |
| bs-children.2 | width | 100% | Apply Bootstrap gutters to immediate columns. Stack every column before a responsive size is selected. | Keep adjacent panels apart without reducing their reading width unpredictably. | proposed |
| bs-children.3 | max-width | 100% | Apply Bootstrap gutters to immediate columns. Prevent a column from exceeding its row. | Keep adjacent panels apart without reducing their reading width unpredictably. | proposed |
| bs-children.4 | padding-right | calc(var(--bs-gutter-x) * 0.5) | Apply Bootstrap gutters to immediate columns. Supply a column right half gutter. | Keep adjacent panels apart without reducing their reading width unpredictably. | proposed |
| bs-children.5 | padding-left | calc(var(--bs-gutter-x) * 0.5) | Apply Bootstrap gutters to immediate columns. Supply a column left half gutter. | Keep adjacent panels apart without reducing their reading width unpredictably. | proposed |
| bs-children.6 | margin-top | var(--bs-gutter-y) | Apply Bootstrap gutters to immediate columns. Supply the selected vertical separation between wrapped columns. | Keep adjacent panels apart without reducing their reading width unpredictably. | proposed |

## bs-half

Selector: `.col-md-6`; condition: `(min-width: 768px)`. Source: bootstrap. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| bs-half.1 | flex | 0 0 auto | Split paired content at the Bootstrap md breakpoint. Keep the responsive column at its explicit fraction. | Compare related panels side by side when each has enough space. | proposed |
| bs-half.2 | width | 50% | Split paired content at the Bootstrap md breakpoint. Allocate six of the twelve Bootstrap columns. | Compare related panels side by side when each has enough space. | proposed |

## bs-main

Selector: `.col-lg-8`; condition: `(min-width: 992px)`. Source: bootstrap. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| bs-main.1 | flex | 0 0 auto | Give the main task two thirds of a wide row. Keep the main column at its intended fraction. | Keep the primary workspace more prominent than its supporting panel. | proposed |
| bs-main.2 | width | 66.66666667% | Give the main task two thirds of a wide row. Allocate eight of twelve Bootstrap columns. | Keep the primary workspace more prominent than its supporting panel. | proposed |

## bs-side

Selector: `.col-lg-4`; condition: `(min-width: 992px)`. Source: bootstrap. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| bs-side.1 | flex | 0 0 auto | Give supporting information one third of a wide row. Keep the supporting column at its intended fraction. | Read context without losing the main workspace. | proposed |
| bs-side.2 | width | 33.33333333% | Give supporting information one third of a wide row. Allocate four of twelve Bootstrap columns. | Read context without losing the main workspace. | proposed |

## container-cap

Selector: `.container`. Source: project. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| container-cap.1 | max-width | 75rem | Bound the total scanning distance. Cap the reference workspace at 1200px with fluid space on smaller screens. | Keep work and navigation close on a large monitor. | proposed |

## grid-gap

Selector: `.row`. Source: project. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| grid-gap.1 | --bs-gutter-y | 1.5rem | Separate wrapped panels vertically. Add a 24px vertical gutter using Bootstrap’s existing row contract. | Tell one panel from the next on mobile. | proposed |

## shrink

Selector: `.row > *, .ui-stack, .ui-cluster > *`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| shrink.1 | min-inline-size | 0 | Allow text-bearing flex and grid children to wrap. Remove the min-content floor that can force overflow inside flexible layouts. | Read long values without unintended horizontal page scrolling. | proposed |

## header

Selector: `.ui-header`. Source: project. Verification family: `navigation`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| header.1 | background-color | var(--ui-surface) | Separate navigation from the working document. Give navigation its own opaque reading surface. | Find home and component links without mistaking them for editable content. | proposed |
| header.2 | border-block-end | 1px solid var(--ui-divider) | Separate navigation from the working document. Mark the header boundary without a decorative shadow. | Find home and component links without mistaking them for editable content. | proposed |
| header.3 | padding-block | var(--ui-space-lg) | Separate navigation from the working document. Give header links room above and below. | Find home and component links without mistaking them for editable content. | proposed |

## cluster

Selector: `.ui-cluster`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| cluster.1 | display | flex | Group peer actions while allowing wrapping. Place peer actions on a shared axis. | Find related actions together on both narrow and wide screens. | proposed |
| cluster.2 | flex-wrap | wrap | Group peer actions while allowing wrapping. Let controls wrap instead of truncating their text. | Find related actions together on both narrow and wide screens. | proposed |
| cluster.3 | gap | var(--ui-space-md) | Group peer actions while allowing wrapping. Separate individual action targets by 12px. | Find related actions together on both narrow and wide screens. | proposed |
| cluster.4 | align-items | center | Group peer actions while allowing wrapping. Align mixed controls by their visual center. | Find related actions together on both narrow and wide screens. | proposed |

## spread

Selector: `.ui-spread`. Source: project. Verification family: `navigation`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| spread.1 | justify-content | space-between | Separate an identity or title from peer navigation. Use available cluster space to separate the two roles while preserving DOM order. | Distinguish where they are from where they can go. | proposed |

## nav-target

Selector: `.ui-nav a`. Source: project. Verification family: `targets`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| nav-target.1 | display | inline-flex | Make text navigation comfortable to activate. Allow minimum target height without replacing link semantics. | Tap section links accurately. | proposed |
| nav-target.2 | align-items | center | Make text navigation comfortable to activate. Keep link text centered in its target. | Tap section links accurately. | proposed |
| nav-target.3 | min-block-size | 2.75rem | Make text navigation comfortable to activate. Offer at least a 44px target at the default font size. | Tap section links accurately. | proposed |
| nav-target.4 | padding-inline | var(--ui-space-sm) | Make text navigation comfortable to activate. Add space around each link’s text. | Tap section links accurately. | proposed |

## main

Selector: `main`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| main.1 | padding-block | var(--ui-space-section) var(--ui-space-page) | Separate page content from the header and footer. Give the title 32px of separation and the last section 48px of trailing space. | Start reading without feeling the title is crowded against navigation. | proposed |

## stack

Selector: `.ui-stack`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| stack.1 | display | flex | Express a vertical group of related blocks. Create an explicit layout group without extra margins on children. | Follow content in a predictable reading order. | proposed |
| stack.2 | flex-direction | column | Express a vertical group of related blocks. Keep the visual order identical to document order. | Follow content in a predictable reading order. | proposed |
| stack.3 | gap | var(--ui-space-xl) | Express a vertical group of related blocks. Separate peer blocks by 24px. | Follow content in a predictable reading order. | proposed |

## stack-reset

Selector: `.ui-stack > *`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| stack-reset.1 | margin-block-end | 0 | Avoid doubling component and stack spacing. Let the parent gap own separation for direct children. | Perceive one consistent gap between related blocks. | proposed |

## section

Selector: `.ui-section`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| section.1 | margin-block-start | var(--ui-space-page) | Separate major component families. Leave a 48px interval before each major reference section. | Recognize the start of a new topic when scrolling. | proposed |
| section.2 | scroll-margin-block-start | var(--ui-space-lg) | Separate major component families. Keep anchor destinations clear of the viewport edge without a sticky header. | Recognize the start of a new topic when scrolling. | proposed |

## panel

Selector: `.card`. Source: project. Verification family: `panels`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| panel.1 | background-color | var(--ui-surface) | Contain a related task or reference example. Give the group an opaque surface distinct from the canvas. | Recognize which information and actions belong together. | proposed |
| panel.2 | border | 1px solid var(--ui-divider) | Contain a related task or reference example. Keep panel edges recognizable on adjacent palette surfaces. | Recognize which information and actions belong together. | proposed |
| panel.3 | border-radius | var(--ui-radius-panel) | Contain a related task or reference example. Use the larger corner role for containing groups. | Recognize which information and actions belong together. | proposed |
| panel.4 | padding | var(--ui-space-xl) | Contain a related task or reference example. Leave 24px of internal reading and interaction clearance. | Recognize which information and actions belong together. | proposed |
| panel.5 | block-size | 100% | Contain a related task or reference example. Align peer panel bottoms within a Bootstrap row without fixing content height. | Recognize which information and actions belong together. | proposed |

## measure

Selector: `.ui-measure`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| measure.1 | max-inline-size | 65ch | Bound prose line length. Keep explanatory copy near a comfortable reading measure while allowing narrower wrapping. | Read explanations without losing the next line on a wide monitor. | proposed |

## button

Selector: `.btn`. Source: project. Verification family: `targets`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| button.1 | display | inline-flex | Present an explicit action as a native button. Size button content as one target without changing its native semantics. | Recognize an available action and activate it precisely. | proposed |
| button.2 | align-items | center | Present an explicit action as a native button. Center text vertically in the minimum target. | Recognize an available action and activate it precisely. | proposed |
| button.3 | justify-content | center | Present an explicit action as a native button. Keep short button labels centered. | Recognize an available action and activate it precisely. | proposed |
| button.4 | gap | var(--ui-space-sm) | Present an explicit action as a native button. Keep optional icon and label distinct. | Recognize an available action and activate it precisely. | proposed |
| button.5 | min-block-size | 2.75rem | Present an explicit action as a native button. Provide a 44px target without imposing a fixed height on wrapped labels. | Recognize an available action and activate it precisely. | proposed |
| button.6 | padding | var(--ui-space-sm) var(--ui-space-lg) | Present an explicit action as a native button. Add 8px vertical and 16px horizontal target clearance. | Recognize an available action and activate it precisely. | proposed |
| button.7 | border | 1px solid var(--ui-border) | Present an explicit action as a native button. Show a visible secondary action boundary. | Recognize an available action and activate it precisely. | proposed |
| button.8 | border-radius | var(--ui-radius-small) | Present an explicit action as a native button. Use the common control corner role. | Recognize an available action and activate it precisely. | proposed |
| button.9 | background-color | var(--ui-surface) | Present an explicit action as a native button. Keep secondary actions quieter than the primary. | Recognize an available action and activate it precisely. | proposed |
| button.10 | color | var(--ui-interactive) | Present an explicit action as a native button. Use the contrast-tested blue foreground for unfilled secondary labels rather than the filled-button color. | Recognize an available action and activate it precisely. | proposed |
| button.11 | font-weight | 600 | Present an explicit action as a native button. Distinguish actionable labels from surrounding prose. | Recognize an available action and activate it precisely. | proposed |
| button.12 | text-align | center | Present an explicit action as a native button. Keep wrapped button labels visually balanced. | Recognize an available action and activate it precisely. | proposed |
| button.13 | cursor | pointer | Present an explicit action as a native button. Confirm that the button accepts activation when a pointer is used. | Recognize an available action and activate it precisely. | proposed |

## primary

Selector: `.btn-primary`. Source: project. Verification family: `contrast`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| primary.1 | background-color | var(--ui-primary) | Identify the principal action within a local group. Use the selected azure fill in both brightness modes; the written label identifies the button under the documented boundary exception. | Choose the intended next step without scanning equal-weight buttons. | proposed |
| primary.2 | border-color | transparent | Identify the principal action within a local group. Remove a permanent perimeter while reserving border width for stable sizing; visible text and keyboard focus remain mandatory. | Choose the intended next step without scanning equal-weight buttons. | proposed |
| primary.3 | color | var(--ui-on-primary) | Identify the principal action within a local group. Keep the written label at ordinary text contrast against the azure fill in every appearance. | Choose the intended next step without scanning equal-weight buttons. | proposed |

## button-hover

Selector: `.btn:hover:not(:disabled)`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| button-hover.1 | background-color | var(--ui-subtle) | Give pointer feedback for secondary actions. Change the fill without moving or resizing the target. | Confirm which action is currently targeted. | proposed |

## primary-hover

Selector: `.btn-primary:hover:not(:disabled)`. Source: project. Verification family: `contrast`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| primary-hover.1 | background-color | var(--ui-primary-hover) | Give pointer feedback for the principal action. Darken the related azure fill while preserving label contrast and the visible-text boundary exception. | Keep the primary action recognizable while pointing at it. | proposed |
| primary-hover.2 | border-color | transparent | Give pointer feedback for the principal action. Retain the borderless treatment while hovered; a keyboard focus outline is controlled independently. | Keep the primary action recognizable while pointing at it. | proposed |

## disabled

Selector: `.btn:disabled, input:disabled, select:disabled, textarea:disabled`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| disabled.1 | color | var(--ui-disabled) | Show that an action or value is unavailable. Keep disabled text readable instead of lowering the entire element opacity. | Read an unavailable control and look for its adjacent explanation. | proposed |
| disabled.2 | background-color | var(--ui-disabled-bg) | Show that an action or value is unavailable. Distinguish unavailable values from editable controls. | Read an unavailable control and look for its adjacent explanation. | proposed |
| disabled.3 | cursor | not-allowed | Show that an action or value is unavailable. Give a pointer hint that activation is unavailable; the native disabled attribute enforces it. | Read an unavailable control and look for its adjacent explanation. | proposed |

## label

Selector: `label, legend`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| label.1 | font-weight | 600 | Identify the value or choices being requested. Distinguish persistent field names from values and help. | Understand a field before entering information. | proposed |

## control

Selector: `.form-control, .form-select`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| control.1 | display | block | Expose ordinary native editing controls. Place the control below its persistent label. | Enter or choose values using familiar browser behavior. | proposed |
| control.2 | inline-size | 100% | Expose ordinary native editing controls. Use the available column width for input. | Enter or choose values using familiar browser behavior. | proposed |
| control.3 | min-block-size | 2.75rem | Expose ordinary native editing controls. Give editing controls a 44px minimum target. | Enter or choose values using familiar browser behavior. | proposed |
| control.4 | padding | var(--ui-space-sm) var(--ui-space-md) | Expose ordinary native editing controls. Keep entered text clear of the control border. | Enter or choose values using familiar browser behavior. | proposed |
| control.5 | color | var(--ui-ink) | Expose ordinary native editing controls. Use the body text contrast role for entered values. | Enter or choose values using familiar browser behavior. | proposed |
| control.6 | background-color | var(--ui-surface) | Expose ordinary native editing controls. Indicate the active editable surface. | Enter or choose values using familiar browser behavior. | proposed |
| control.7 | border | 1px solid var(--ui-border) | Expose ordinary native editing controls. Distinguish the input boundary with at least 3:1 contrast. | Enter or choose values using familiar browser behavior. | proposed |
| control.8 | border-radius | var(--ui-radius-small) | Expose ordinary native editing controls. Use the shared control corner role. | Enter or choose values using familiar browser behavior. | proposed |

## textarea

Selector: `textarea.form-control`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| textarea.1 | min-block-size | 7rem | Let multi-line content grow under user control. Show several lines of a normal note before scrolling. | Review a longer draft without a tiny fixed viewport. | proposed |
| textarea.2 | resize | vertical | Let multi-line content grow under user control. Allow more reading height without breaking the column width. | Review a longer draft without a tiny fixed viewport. | proposed |

## fieldset

Selector: `fieldset`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| fieldset.1 | min-inline-size | 0 | Keep native group semantics without duplicate visual framing. Allow a named group to fit a narrow column. | Understand related options as one named question. | proposed |
| fieldset.2 | margin | 0 | Keep native group semantics without duplicate visual framing. Let the parent stack determine outer spacing. | Understand related options as one named question. | proposed |
| fieldset.3 | padding | 0 | Keep native group semantics without duplicate visual framing. Use the parent panel’s padding instead of double insetting choices. | Understand related options as one named question. | proposed |
| fieldset.4 | border | 0 | Keep native group semantics without duplicate visual framing. Avoid a second box around an already named choice group. | Understand related options as one named question. | proposed |

## legend

Selector: `legend`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| legend.1 | inline-size | 100% | Give choice groups a persistent visible name. Place the named question above the option targets. | Know what the following radio or checkbox options answer. | proposed |
| legend.2 | font-size | 1rem | Give choice groups a persistent visible name. Keep question names at readable body size. | Know what the following radio or checkbox options answer. | proposed |
| legend.3 | margin-block-end | var(--ui-space-sm) | Give choice groups a persistent visible name. Separate the group name from its first option. | Know what the following radio or checkbox options answer. | proposed |

## choice

Selector: `.ui-choice`. Source: project. Verification family: `targets`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| choice.1 | display | flex | Make the whole native choice label a touch target. Keep the native mark adjacent to its text. | Select an option without needing to hit a small mark. | proposed |
| choice.2 | align-items | center | Make the whole native choice label a touch target. Align the native mark and label text. | Select an option without needing to hit a small mark. | proposed |
| choice.3 | gap | var(--ui-space-md) | Make the whole native choice label a touch target. Leave 12px between the mark and its explanation. | Select an option without needing to hit a small mark. | proposed |
| choice.4 | min-block-size | 2.75rem | Make the whole native choice label a touch target. Offer at least 44px of label height for activation. | Select an option without needing to hit a small mark. | proposed |
| choice.5 | padding-block | var(--ui-space-sm) | Make the whole native choice label a touch target. Keep multi-line options comfortably separated. | Select an option without needing to hit a small mark. | proposed |

## invalid

Selector: `[aria-invalid="true"]`. Source: project. Verification family: `validation`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| invalid.1 | border-color | var(--ui-danger) | Identify a field requiring correction. Pair the textual error with a consistent error border. | Find the input mentioned in the accompanying error message. | proposed |

## error

Selector: `.ui-error`. Source: project. Verification family: `validation`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| error.1 | color | var(--ui-danger) | Explain errors next to the affected field. Use the error text role at normal text contrast. | Understand what to fix without interpreting color alone. | proposed |
| error.2 | font-weight | 600 | Explain errors next to the affected field. Make correction guidance distinguishable from optional help. | Understand what to fix without interpreting color alone. | proposed |

## table-region

Selector: `.table-responsive`. Source: project. Verification family: `table`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| table-region.1 | overflow-x | auto | Contain genuinely two-dimensional information. Keep a wide comparison table from widening the whole page. | Compare columns on desktop and intentionally pan only the table on mobile. | proposed |
| table-region.2 | border | 1px solid var(--ui-divider) | Contain genuinely two-dimensional information. Expose the bounded table region. | Compare columns on desktop and intentionally pan only the table on mobile. | proposed |
| table-region.3 | border-radius | var(--ui-radius-small) | Contain genuinely two-dimensional information. Use the control-sized corner role for this bounded region. | Compare columns on desktop and intentionally pan only the table on mobile. | proposed |

## table

Selector: `.table`. Source: project. Verification family: `table`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| table.1 | inline-size | 100% | Present comparable records with native table semantics. Fill the available region for consistent column scanning. | Read row and column relationships without a custom grid widget. | proposed |
| table.2 | min-inline-size | 36rem | Present comparable records with native table semantics. Preserve six short comparison columns instead of compressing their meaning. | Read row and column relationships without a custom grid widget. | proposed |
| table.3 | border-collapse | collapse | Present comparable records with native table semantics. Draw single shared row dividers rather than doubled cell borders. | Read row and column relationships without a custom grid widget. | proposed |
| table.4 | background-color | var(--ui-surface) | Present comparable records with native table semantics. Keep cell copy on a known contrast-tested surface. | Read row and column relationships without a custom grid widget. | proposed |

## cells

Selector: `.table th, .table td`. Source: project. Verification family: `table`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| cells.1 | padding | var(--ui-space-md) var(--ui-space-lg) | Keep cell content aligned and separated. Add 12px vertical and 16px horizontal reading clearance. | Scan a row without confusing neighboring values. | proposed |
| cells.2 | text-align | start | Keep cell content aligned and separated. Align text with the document’s reading direction. | Scan a row without confusing neighboring values. | proposed |
| cells.3 | vertical-align | top | Keep cell content aligned and separated. Align multi-line records by their start rather than their center. | Scan a row without confusing neighboring values. | proposed |
| cells.4 | border-block-end | 1px solid var(--ui-divider) | Keep cell content aligned and separated. Separate records without adding a heavy cell grid. | Scan a row without confusing neighboring values. | proposed |

## table-head

Selector: `.table thead`. Source: project. Verification family: `table`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| table-head.1 | background-color | var(--ui-subtle) | Distinguish column definitions from records. Give the heading row a separate low-emphasis surface. | Know how to interpret each vertical series of values. | proposed |

## caption

Selector: `caption`. Source: project. Verification family: `table`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| caption.1 | caption-side | top | Name a native table at its entry point. Put the table’s purpose before its data in visual reading order. | Understand what is being compared before entering the rows. | proposed |
| caption.2 | padding | var(--ui-space-lg) | Name a native table at its entry point. Keep the caption clear of the table perimeter. | Understand what is being compared before entering the rows. | proposed |
| caption.3 | color | var(--ui-muted) | Name a native table at its entry point. Distinguish explanatory caption text from record values. | Understand what is being compared before entering the rows. | proposed |
| caption.4 | text-align | start | Name a native table at its entry point. Keep the caption aligned with row labels. | Understand what is being compared before entering the rows. | proposed |

## numeric

Selector: `.table .ui-numeric`. Source: project. Verification family: `table`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| numeric.1 | text-align | end | Align comparable numeric quantities. Override the table’s ordinary start alignment for a numeric column and align its units place. | Compare task counts without shifting digit widths. | proposed |
| numeric.2 | font-variant-numeric | tabular-nums | Align comparable numeric quantities. Give digits equal advance widths where the installed font supports it. | Compare task counts without shifting digit widths. | proposed |

## status

Selector: `.ui-status`. Source: project. Verification family: `states`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| status.1 | display | inline-block | Present an explicit named result or state. Keep a short status label together as one visual item. | Understand a state without interpreting an isolated colored dot. | proposed |
| status.2 | padding | var(--ui-space-xs) var(--ui-space-sm) | Present an explicit named result or state. Separate status text from its neutral background. | Understand a state without interpreting an isolated colored dot. | proposed |
| status.3 | border-radius | var(--ui-radius-small) | Present an explicit named result or state. Use the same compact shape for peer status labels. | Understand a state without interpreting an isolated colored dot. | proposed |
| status.4 | font-size | 0.875rem | Present an explicit named result or state. Keep supplementary state labels readable without competing with task names. | Understand a state without interpreting an isolated colored dot. | proposed |
| status.5 | color | var(--ui-success) | Present an explicit named result or state. Use the success text role only for confirmed successful states. | Understand a state without interpreting an isolated colored dot. | proposed |
| status.6 | background-color | var(--ui-success-bg) | Present an explicit named result or state. Group confirmed-state text on gray so routine results do not become competing colored panels. | Understand a state without interpreting an isolated colored dot. | proposed |

## pending

Selector: `.ui-status-pending`. Source: project. Verification family: `states`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| pending.1 | color | var(--ui-warning) | Distinguish pending review from completed work. Use a contrast-tested warning text role with an explicit Pending label. | Know which item still needs a decision. | proposed |
| pending.2 | background-color | var(--ui-warning-bg) | Distinguish pending review from completed work. Keep the pending label on a neutral surface; its words, foreground and optional dashed boundary carry the distinction. | Know which item still needs a decision. | proposed |

## notice

Selector: `.ui-notice`. Source: project. Verification family: `states`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| notice.1 | padding | var(--ui-space-lg) | Group relevant guidance without interrupting the page. Give the guidance its own readable block. | Read a condition and continue the same task. | proposed |
| notice.2 | border-inline-start | 4px solid var(--ui-border) | Group relevant guidance without interrupting the page. Identify routine guidance with a neutral boundary so it does not borrow action or alarm color. | Read a condition and continue the same task. | proposed |
| notice.3 | background-color | var(--ui-subtle) | Group relevant guidance without interrupting the page. Group the note on a quiet gray without hiding nearby controls or suggesting abnormality. | Read a condition and continue the same task. | proposed |

## empty

Selector: `.ui-empty`. Source: project. Verification family: `states`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| empty.1 | padding | var(--ui-space-section) | Explain absence of content in its working area. Leave room for the empty-state explanation and action. | Understand what is missing and which action can resolve it. | proposed |
| empty.2 | border | 1px dashed var(--ui-border) | Explain absence of content in its working area. Distinguish an empty placeholder from a populated editable panel. | Understand what is missing and which action can resolve it. | proposed |
| empty.3 | border-radius | var(--ui-radius-small) | Explain absence of content in its working area. Keep the empty region visually related to other bounded components. | Understand what is missing and which action can resolve it. | proposed |

## code

Selector: `code`. Source: project. Verification family: `type`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| code.1 | font-size | 0.875em | Distinguish literal implementation identifiers in the reference. Keep monospace snippets from dominating surrounding prose. | Recognize text to copy separately from product instructions. | proposed |
| code.2 | color | var(--ui-ink) | Distinguish literal implementation identifiers in the reference. Preserve reading contrast on supported reference surfaces. | Recognize text to copy separately from product instructions. | proposed |

## swatches

Selector: `.ui-swatch-grid`. Source: project. Verification family: `grid`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatches.1 | display | grid | Present color roles as a responsive comparison group. Lay out equal role samples without unrelated framework utilities. | Compare named colors at narrow and wide widths. | proposed |
| swatches.2 | grid-template-columns | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | Present color roles as a responsive comparison group. Fit as many 12rem role samples as space allows while permitting one narrow column. | Compare named colors at narrow and wide widths. | proposed |
| swatches.3 | gap | var(--ui-space-lg) | Present color roles as a responsive comparison group. Keep separate role samples 16px apart. | Compare named colors at narrow and wide widths. | proposed |

## swatch

Selector: `.ui-swatch`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch.1 | block-size | 3rem | Show a token’s actual color as a sample. Make the color sample large enough to inspect without turning it into a dominant panel. | Associate a documented name and hex value with its appearance. | proposed |
| swatch.2 | border | 1px solid var(--ui-border) | Show a token’s actual color as a sample. Keep even white and pale swatches visible. | Associate a documented name and hex value with its appearance. | proposed |
| swatch.3 | border-radius | var(--ui-radius-small) | Show a token’s actual color as a sample. Use the common compact sample shape. | Associate a documented name and hex value with its appearance. | proposed |

## swatch-primary

Selector: `.ui-swatch-primary`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-primary.1 | background-color | var(--ui-primary) | Demonstrate the primary color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-ink

Selector: `.ui-swatch-ink`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-ink.1 | background-color | var(--ui-ink) | Demonstrate the ink color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-muted

Selector: `.ui-swatch-muted`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-muted.1 | background-color | var(--ui-muted) | Demonstrate the muted color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-canvas

Selector: `.ui-swatch-canvas`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-canvas.1 | background-color | var(--ui-canvas) | Demonstrate the canvas color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-surface

Selector: `.ui-swatch-surface`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-surface.1 | background-color | var(--ui-surface) | Demonstrate the surface color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-focus

Selector: `.ui-swatch-focus`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-focus.1 | background-color | var(--ui-focus) | Demonstrate the focus color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-danger

Selector: `.ui-swatch-danger`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-danger.1 | background-color | var(--ui-danger) | Demonstrate the danger color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-success

Selector: `.ui-swatch-success`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-success.1 | background-color | var(--ui-success) | Demonstrate the success color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-warning

Selector: `.ui-swatch-warning`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-warning.1 | background-color | var(--ui-warning) | Demonstrate the warning color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## swatch-interactive

Selector: `.ui-swatch-interactive`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch-interactive.1 | background-color | var(--ui-interactive) | Demonstrate the interactive color token. Apply the exact token without a decorative gradient. | Inspect the actual named color before approving its use. | proposed |

## dialog

Selector: `dialog`. Source: project. Verification family: `dialog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| dialog.1 | inline-size | min(32rem, calc(100% - 2rem)) | Present a focused decision in the native top layer. Keep the decision compact with a 16px viewport clearance on each side. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.2 | max-block-size | calc(100dvh - 2rem) | Present a focused decision in the native top layer. Keep the dialog scrollable inside the currently visible viewport. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.3 | overflow | auto | Present a focused decision in the native top layer. Allow long or magnified content to remain reachable. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.4 | padding | var(--ui-space-xl) | Present a focused decision in the native top layer. Give the dialog content 24px of internal clearance. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.5 | border | 1px solid var(--ui-border) | Present a focused decision in the native top layer. Expose the decision boundary when backdrop perception is limited. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.6 | border-radius | var(--ui-radius-panel) | Present a focused decision in the native top layer. Use the containing-panel corner role. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.7 | background-color | var(--ui-surface) | Present a focused decision in the native top layer. Use the known opaque reading surface. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.8 | color | var(--ui-ink) | Present a focused decision in the native top layer. Keep dialog text aligned with the page text role. | Finish or cancel a blocking choice without losing page context. | proposed |

## backdrop

Selector: `dialog::backdrop`. Source: project. Verification family: `dialog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| backdrop.1 | background-color | #00000080 | Separate a modal decision from its inactive background. Dim the inactive page with neutral 50% black instead of casting a state-like hue over its content. | Know which surface currently receives input. | proposed |

## skip

Selector: `.ui-skip`. Source: project. Verification family: `focus`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| skip.1 | position | absolute | Provide a keyboard shortcut to the working document. Keep the skip target independent of header layout. | Bypass repeated navigation. | proposed |
| skip.2 | inset-block-start | var(--ui-space-sm) | Provide a keyboard shortcut to the working document. Place the revealed shortcut near the top edge. | Bypass repeated navigation. | proposed |
| skip.3 | inset-inline-start | var(--ui-space-sm) | Provide a keyboard shortcut to the working document. Place it at the start of the reading direction. | Bypass repeated navigation. | proposed |
| skip.4 | transform | translateY(-200%) | Provide a keyboard shortcut to the working document. Keep the shortcut outside the viewport until focused while preserving keyboard reachability. | Bypass repeated navigation. | proposed |
| skip.5 | z-index | 1 | Provide a keyboard shortcut to the working document. Show the shortcut above ordinary header content without introducing a sticky overlay. | Bypass repeated navigation. | proposed |
| skip.6 | padding | var(--ui-space-md) | Provide a keyboard shortcut to the working document. Give the focused shortcut a comfortable target. | Bypass repeated navigation. | proposed |
| skip.7 | background-color | var(--ui-surface) | Provide a keyboard shortcut to the working document. Keep shortcut text readable over header content. | Bypass repeated navigation. | proposed |

## skip-focus

Selector: `.ui-skip:focus`. Source: project. Verification family: `focus`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| skip-focus.1 | transform | translateY(0) | Reveal the skip shortcut on keyboard focus. Return the focused link to its visible start-edge position. | See the bypass action before activating it. | proposed |

## forced-focus

Selector: `:where(a, button, input, select, textarea, [tabindex]):focus-visible`; condition: `(forced-colors: active)`. Source: project. Verification family: `forced-colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| forced-focus.1 | outline-color | Highlight | Respect the user’s forced-color focus palette. Use the platform focus role rather than preserving the authored focus color. | Find the active target in a high-contrast environment. | proposed |

## inline-field

Selector: `.ui-field`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| inline-field.1 | padding-block | var(--ui-space-md) | Separate values in a directly editable record. Keep each persistent label and prefilled value visually grouped. | Scan a field’s current value and focus it without opening another surface. | proposed |
| inline-field.2 | border-block-end | 1px solid var(--ui-divider) | Separate values in a directly editable record. Distinguish neighboring values without putting a box around every unfocused input. | Scan a field’s current value and focus it without opening another surface. | proposed |

## inline-control

Selector: `.ui-inline-control`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| inline-control.1 | border-color | transparent | Present an unfocused native input like ordinary information. Keep the existing border width reserved so focusing does not move text or change size. | Read existing values and edit them directly with one focus action. | proposed |
| inline-control.2 | background-color | transparent | Present an unfocused native input like ordinary information. Let the unfocused value sit on its containing surface instead of looking like an empty form box. | Read existing values and edit them directly with one focus action. | proposed |

## inline-control-focus

Selector: `.ui-inline-control:focus`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| inline-control-focus.1 | border-color | var(--ui-border) | Reveal native input boundaries as soon as editing receives focus. Expose a contrast-checked input boundary while focused. | Know exactly which value is being edited using pointer, touch or keyboard. | proposed |
| inline-control-focus.2 | background-color | var(--ui-surface) | Reveal native input boundaries as soon as editing receives focus. Give the focused field the active editing surface. | Know exactly which value is being edited using pointer, touch or keyboard. | proposed |
| inline-control-focus.3 | outline | 3px solid var(--ui-focus) | Reveal native input boundaries as soon as editing receives focus. Identify editing focus even when it was reached with a pointer rather than focus-visible. | Know exactly which value is being edited using pointer, touch or keyboard. | proposed |
| inline-control-focus.4 | outline-offset | 3px | Reveal native input boundaries as soon as editing receives focus. Separate the focus perimeter from the native input border. | Know exactly which value is being edited using pointer, touch or keyboard. | proposed |

## inline-control-invalid

Selector: `.ui-inline-control[aria-invalid="true"]`. Source: project. Verification family: `validation`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| inline-control-invalid.1 | border-color | var(--ui-danger) | Keep a correction visible after focus leaves an invalid field. Make a validation error an explicit exception to borderless unfocused values; linked error text also explains it. | Find the value named by its textual error without guessing from color. | proposed |

## inline-notes-rest

Selector: `textarea.ui-inline-control`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| inline-notes-rest.1 | resize | none | Keep an unfocused notes value visually quiet. Hide only the resize handle while resting; native rows still provide multiline reading space. | Read a prefilled note without a persistent resize handle suggesting an open editor. | proposed |

## inline-notes-focus

Selector: `textarea.ui-inline-control:focus`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| inline-notes-focus.1 | resize | vertical | Restore native note resizing during editing. Allow more editing height without changing its column width. | Enlarge the notes workspace when the field receives focus. | proposed |

## appearance-box

Selector: `.ui-appearance`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| appearance-box.1 | margin-block-start | var(--ui-space-xl) | Group the two independent appearance preferences. Separate appearance preferences from navigation and the reference introduction. | Choose brightness and status palette without changing task drafts. | proposed |

## switch-track

Selector: `.ui-switch input[type="checkbox"]`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-track.1 | appearance | none | Show a sliding binary preference using a native checkbox. Replace only the visual checkbox mark; keep its native checked state, input events and switch semantics. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.2 | display | inline-grid | Show a sliding binary preference using a native checkbox. Place a decorative thumb within the native checkbox footprint. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.3 | align-items | center | Show a sliding binary preference using a native checkbox. Center the thumb vertically without absolute positioning. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.4 | inline-size | 3rem | Show a sliding binary preference using a native checkbox. Provide a clear horizontal travel distance within the labeled target. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.5 | block-size | 1.75rem | Show a sliding binary preference using a native checkbox. Give the track enough height for a distinct thumb. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.6 | padding | 2px | Show a sliding binary preference using a native checkbox. Keep the thumb away from the track boundary. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.7 | border | 2px solid var(--ui-border) | Show a sliding binary preference using a native checkbox. Preserve a visible track outline in all four palettes. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.8 | border-radius | 1rem | Show a sliding binary preference using a native checkbox. Distinguish a sliding preference from a square choice mark. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.9 | background-color | var(--ui-muted) | Show a sliding binary preference using a native checkbox. Give the off position a neutral, contrast-tested track. | Set a named on/off preference with native click, touch and Space behavior. | proposed |

## switch-thumb

Selector: `.ui-switch input[type="checkbox"]::before`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-thumb.1 | content | "" | Mark the slider’s current position without using color alone. Create a decorative thumb only; the actual label and checked state carry the meaning. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.2 | inline-size | 1.125rem | Mark the slider’s current position without using color alone. Keep the thumb large enough to locate inside the track. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.3 | block-size | 1.125rem | Mark the slider’s current position without using color alone. Keep the thumb circular rather than stretching it with label text. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.4 | border-radius | 50% | Mark the slider’s current position without using color alone. Make the moving thumb distinguishable from its rounded track. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.5 | background-color | var(--ui-surface) | Mark the slider’s current position without using color alone. Contrast the off-position thumb against the neutral track. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.6 | transform | translateX(0) | Mark the slider’s current position without using color alone. Place the off thumb at the start of its 22px travel without changing the target size. | Distinguish on and off from the thumb’s left/right position. | proposed |

## switch-on

Selector: `.ui-switch input[type="checkbox"]:checked`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-on.1 | background-color | var(--ui-interactive) | Reinforce an enabled slider preference. Use the blue interactive role so the checked state contrasts with adjacent neutral surfaces; the labelled-button exception does not apply to selection marks. | Recognize the enabled setting through both position and native state. | proposed |

## switch-thumb-on

Selector: `.ui-switch input[type="checkbox"]:checked::before`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-thumb-on.1 | transform | translateX(1.375rem) | Move and contrast the enabled slider thumb. Move the thumb to the end of the available inner track with no animation. | Read the on position in every brightness and palette combination. | proposed |
| switch-thumb-on.2 | background-color | var(--ui-on-interactive) | Move and contrast the enabled slider thumb. Contrast the checked thumb against its interactive track independently of the white filled-button label. | Read the on position in every brightness and palette combination. | proposed |

## distinct-status

Selector: `:root[data-vision="distinct"] .ui-status`. Source: project. Verification family: `states`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| distinct-status.1 | border | 1px solid currentColor | Add a shape cue to the alternate status palette. Outline named state labels in their contrast-tested text color. | Identify status boundaries without depending on hue perception. | proposed |

## distinct-pending

Selector: `:root[data-vision="distinct"] .ui-status-pending`. Source: project. Verification family: `states`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| distinct-pending.1 | border-style | dashed | Separate pending status by line pattern as well as wording. Pair the Pending word with a dashed boundary distinct from solid saved-state boundaries. | Recognize a pending decision even when colors look similar. | proposed |

## forced-inline

Selector: `.ui-inline-control`; condition: `(forced-colors: active)`. Source: project. Verification family: `forced-colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| forced-inline.1 | border-color | CanvasText | Respect an explicit forced-color preference over the borderless presentation. Use the user’s system boundary color even when the unfocused design would normally be borderless. | Locate native editing controls in a high-contrast environment. | proposed |

## forced-inline-focus

Selector: `.ui-inline-control:focus`; condition: `(forced-colors: active)`. Source: project. Verification family: `forced-colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| forced-inline-focus.1 | outline-color | Highlight | Preserve the system focus indicator for directly edited values. Use the platform focus role for pointer and keyboard editing focus. | Find the active field under forced colors. | proposed |

## forced-switch

Selector: `.ui-switch input[type="checkbox"]`; condition: `(forced-colors: active)`. Source: project. Verification family: `forced-colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| forced-switch.1 | appearance | auto | Return slider presentation to a native mark under forced colors. Let the user agent paint its own high-contrast checkbox for this switch. | Use a visible native on/off control in the selected system palette. | proposed |
| forced-switch.2 | inline-size | 1.25rem | Return slider presentation to a native mark under forced colors. Use the ordinary native mark width inside the unchanged large label target. | Use a visible native on/off control in the selected system palette. | proposed |
| forced-switch.3 | block-size | 1.25rem | Return slider presentation to a native mark under forced colors. Use the ordinary native mark height while preserving its checked state. | Use a visible native on/off control in the selected system palette. | proposed |
| forced-switch.4 | padding | 0 | Return slider presentation to a native mark under forced colors. Remove custom-track padding from the restored native mark. | Use a visible native on/off control in the selected system palette. | proposed |

## forced-switch-thumb

Selector: `.ui-switch input[type="checkbox"]::before`; condition: `(forced-colors: active)`. Source: project. Verification family: `forced-colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| forced-switch-thumb.1 | display | none | Remove the decorative thumb when the native mark returns. Leave the forced-color native checkbox as the only mark. | Read one unambiguous checked state rather than two overlapping marks. | proposed |

## forced-primary

Selector: `.btn-primary, .btn-primary:hover:not(:disabled)`; condition: `(forced-colors: active)`. Source: project. Verification family: `forced-colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| forced-primary.1 | border-color | ButtonText | Honor the system palette for a labelled primary button. Override both normal and hover transparent borders with the requested system-contrast boundary without changing the reserved control size. | Find the action boundary when explicitly using a forced-color appearance. | proposed |
