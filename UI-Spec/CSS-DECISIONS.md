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
| tokens.11 | --ui-focus | #005fcc | Publish semantic values for consistent reuse. Identify the keyboard destination with a separately governed outline and a neutral offset gap around the control. | Recognize the same meaning across screens. | proposed |
| tokens.12 | --ui-danger | #9b2c24 | Publish semantic values for consistent reuse. Mark a problem alongside explanatory text. | Recognize the same meaning across screens. | proposed |
| tokens.13 | --ui-success | #235b3b | Publish semantic values for consistent reuse. Reinforce confirmed completion alongside a word label. | Recognize the same meaning across screens. | proposed |
| tokens.14 | --ui-success-bg | #dedede | Publish semantic values for consistent reuse. Group confirmed results on a neutral gray without making routine completion a colored field. | Recognize the same meaning across screens. | proposed |
| tokens.15 | --ui-warning | #725000 | Publish semantic values for consistent reuse. Highlight a condition that needs attention without declaring failure. | Recognize the same meaning across screens. | proposed |
| tokens.16 | --ui-warning-bg | #dedede | Publish semantic values for consistent reuse. Keep pending decisions on a neutral gray; their words and compact foreground cues carry the state. | Recognize the same meaning across screens. | proposed |
| tokens.17 | --ui-disabled | #505050 | Publish semantic values for consistent reuse. Keep the reason for an unavailable action readable with neutral text. | Recognize the same meaning across screens. | proposed |
| tokens.18 | --ui-disabled-bg | #d2d2d2 | Publish semantic values for consistent reuse. Distinguish unavailable controls with a neutral fill and native disabled semantics rather than a warning color. | Recognize the same meaning across screens. | proposed |
| tokens.19 | --ui-space-xs | 0.25rem | Publish semantic values for consistent reuse. Keep a minimum inset around compact status text. Normal is 0.25rem; compact is 0.25rem. Read a short state without touching its boundary in either density. | Recognize the same meaning across screens. | proposed |
| tokens.20 | --ui-space-sm | 0.5rem | Publish semantic values for consistent reuse. Separate tightly related labels, marks and field rows while leaving room for the offset focus ring. Normal is 0.5rem; compact is 0.375rem. Identify related content and see focus without excessive empty space. | Recognize the same meaning across screens. | proposed |
| tokens.21 | --ui-space-md | 0.75rem | Publish semantic values for consistent reuse. Give individual values, cells and action clusters local separation. Normal is 0.75rem; compact is 0.5rem. Scan neighboring values without confusing their ownership. | Recognize the same meaning across screens. | proposed |
| tokens.22 | --ui-space-lg | 1rem | Publish semantic values for consistent reuse. Separate body blocks and provide local reading insets. Normal is 1rem; compact is 0.75rem. Read related paragraphs and controls as distinct steps. | Recognize the same meaning across screens. | proposed |
| tokens.23 | --ui-space-xl | 1.5rem | Publish semantic values for consistent reuse. Inset panels and separate peer blocks and Bootstrap gutters. Normal is 1.5rem; compact is 1rem. Distinguish groups while fitting more working content in compact mode. | Recognize the same meaning across screens. | proposed |
| tokens.24 | --ui-space-section | 2rem | Publish semantic values for consistent reuse. Give page entry and empty-state explanations a clear start. Normal is 2rem; compact is 1.5rem. Recognize a working area without spending excessive height on clearance. | Recognize the same meaning across screens. | proposed |
| tokens.25 | --ui-space-page | 3rem | Publish semantic values for consistent reuse. Separate major topics and leave trailing document room. Normal is 3rem; compact is 2rem. Locate a new section while reducing repeated scrolling in compact mode. | Recognize the same meaning across screens. | proposed |
| tokens.26 | --ui-radius-small | 0.375rem | Publish semantic values for consistent reuse. Keep small controls and states visibly bounded without oversized corners. Normal is 0.375rem; compact is 0.25rem. Recognize the same control family at either density. | Recognize the same meaning across screens. | proposed |
| tokens.27 | --ui-radius-panel | 0.75rem | Publish semantic values for consistent reuse. Distinguish containing panels from their smaller controls. Normal is 0.75rem; compact is 0.5rem. Recognize a group boundary while compact panels use less corner space. | Recognize the same meaning across screens. | proposed |
| tokens.28 | --ui-font | system-ui, -apple-system, "Segoe UI", sans-serif | Publish semantic values for consistent reuse. Use installed fonts so text is immediately available without a font download. | Recognize the same meaning across screens. | proposed |
| tokens.29 | --ui-on-primary | #ffffff | Publish semantic values for consistent reuse. Keep the written principal-action label readable against the selected azure fill in both brightness modes. | Recognize the same meaning across screens. | proposed |
| tokens.30 | --ui-interactive | #005b90 | Publish semantic values for consistent reuse. Keep links, secondary-action labels and compact native selection marks readable using an azure-related blue tuned to adjacent neutral surfaces. | Recognize the same meaning across screens. | proposed |
| tokens.31 | --ui-on-interactive | #ffffff | Publish semantic values for consistent reuse. Keep the selected switch thumb distinct from its interactive-blue track without changing the native checked state. | Recognize the same meaning across screens. | proposed |
| tokens.32 | --ui-control-min | 2.75rem | Publish semantic values for consistent reuse. Set a minimum native target height, allowing content to grow rather than fixing height. Activate controls comfortably; compact fine-pointer targets stay at least 36px at the default root, with a separate 44px coarse/no-pointer floor. | Recognize the same meaning across screens. | proposed |
| tokens.33 | --ui-control-pad-block | 0.5rem | Publish semantic values for consistent reuse. Give entered values and button labels vertical breathing room independently of minimum target height. Read text inside a control while compact mode recovers redundant interior space. | Recognize the same meaning across screens. | proposed |
| tokens.34 | --ui-notes-min | 7rem | Publish semantic values for consistent reuse. Provide a usable initial multi-line notes viewport without fixing its eventual height. Read several note lines and enlarge the native textarea when needed. | Recognize the same meaning across screens. | proposed |
| tokens.35 | --ui-notice-stroke | 4px | Publish semantic values for consistent reuse. Mark routine guidance with a neutral emphasis stroke, narrower in compact mode. Recognize contextual guidance without a heavy decorative edge. | Recognize the same meaning across screens. | proposed |
| tokens.36 | --ui-switch-stroke | 2px | Publish semantic values for consistent reuse. Keep a crisp visible switch track with an integer-pixel boundary. Locate the native preference mark while the compact track occupies less space. | Recognize the same meaning across screens. | proposed |
| tokens.37 | --ui-switch-width | 3rem | Publish semantic values for consistent reuse. Provide space for two visibly different thumb positions. Recognize on/off position without relying on track hue. | Recognize the same meaning across screens. | proposed |
| tokens.38 | --ui-switch-height | 1.75rem | Publish semantic values for consistent reuse. Fit the decorative thumb inside a track shorter than its full clickable label. See the preference mark while retaining the larger label target. | Recognize the same meaning across screens. | proposed |
| tokens.39 | --ui-switch-thumb | 1.125rem | Publish semantic values for consistent reuse. Keep the decorative thumb large enough to identify in its selected position. Distinguish on/off position without oversized marks in compact mode. | Recognize the same meaning across screens. | proposed |
| tokens.40 | --ui-swatch-size | 3rem | Publish semantic values for consistent reuse. Provide a visible color sample without letting demonstration patches dominate the reference. Compare actual color roles while compact mode shows more samples and content. | Recognize the same meaning across screens. | proposed |
| tokens.41 | --ui-dialog-clearance | 1rem | Publish semantic values for consistent reuse. Keep a modal inside the viewport with an external escape margin. Read and scroll a blocking decision without losing its edges at narrow widths. | Recognize the same meaning across screens. | proposed |

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
| palette-dark-standard.11 | --ui-focus | #409fea | Apply the complete Dark · standard palette. Identify the keyboard destination with a separately governed outline and a neutral offset gap around the control. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
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
| palette-light-distinct.11 | --ui-focus | #005fcc | Apply the complete Light · distinct status colors palette. Identify the keyboard destination with a separately governed outline and a neutral offset gap around the control. This value is independently contrast checked in this palette. Inherit the preferred standard light-mode blue so changing status colors keeps the same keyboard destination cue; violet remains the error role. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
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
| palette-dark-distinct.11 | --ui-focus | #409fea | Apply the complete Dark · distinct status colors palette. Identify the keyboard destination with a separately governed outline and a neutral offset gap around the control. This value is independently contrast checked in this palette. Use a richer midtone rather than a pale tint so this compact cue is distinct on charcoal without coloring the surrounding panel. Use the same azure-blue focus as dark standard mode instead of a second amber; pending retains its named golden state cue. | Read and operate the same components in the chosen appearance without losing semantic cues. | proposed |
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

## density-compact

Selector: `:root[data-density="compact"]`. Source: project. Verification family: `density`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| density-compact.1 | --ui-space-xs | 0.25rem | Apply the explicit compact box-model profile. Keep a minimum inset around compact status text. Normal is 0.25rem; compact is 0.25rem. Read a short state without touching its boundary in either density. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.2 | --ui-space-sm | 0.375rem | Apply the explicit compact box-model profile. Separate tightly related labels, marks and field rows while leaving room for the offset focus ring. Normal is 0.5rem; compact is 0.375rem. Identify related content and see focus without excessive empty space. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.3 | --ui-space-md | 0.5rem | Apply the explicit compact box-model profile. Give individual values, cells and action clusters local separation. Normal is 0.75rem; compact is 0.5rem. Scan neighboring values without confusing their ownership. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.4 | --ui-space-lg | 0.75rem | Apply the explicit compact box-model profile. Separate body blocks and provide local reading insets. Normal is 1rem; compact is 0.75rem. Read related paragraphs and controls as distinct steps. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.5 | --ui-space-xl | 1rem | Apply the explicit compact box-model profile. Inset panels and separate peer blocks and Bootstrap gutters. Normal is 1.5rem; compact is 1rem. Distinguish groups while fitting more working content in compact mode. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.6 | --ui-space-section | 1.5rem | Apply the explicit compact box-model profile. Give page entry and empty-state explanations a clear start. Normal is 2rem; compact is 1.5rem. Recognize a working area without spending excessive height on clearance. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.7 | --ui-space-page | 2rem | Apply the explicit compact box-model profile. Separate major topics and leave trailing document room. Normal is 3rem; compact is 2rem. Locate a new section while reducing repeated scrolling in compact mode. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.8 | --ui-radius-small | 0.25rem | Apply the explicit compact box-model profile. Keep small controls and states visibly bounded without oversized corners. Normal is 0.375rem; compact is 0.25rem. Recognize the same control family at either density. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.9 | --ui-radius-panel | 0.5rem | Apply the explicit compact box-model profile. Distinguish containing panels from their smaller controls. Normal is 0.75rem; compact is 0.5rem. Recognize a group boundary while compact panels use less corner space. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.10 | --ui-control-min | 2.25rem | Apply the explicit compact box-model profile. Set a minimum native target height, allowing content to grow rather than fixing height. Normal is 2.75rem; compact is 2.25rem. Activate controls comfortably; compact fine-pointer targets stay at least 36px at the default root, with a separate 44px coarse/no-pointer floor. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.11 | --ui-control-pad-block | 0.25rem | Apply the explicit compact box-model profile. Give entered values and button labels vertical breathing room independently of minimum target height. Normal is 0.5rem; compact is 0.25rem. Read text inside a control while compact mode recovers redundant interior space. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.12 | --ui-notes-min | 5.5rem | Apply the explicit compact box-model profile. Provide a usable initial multi-line notes viewport without fixing its eventual height. Normal is 7rem; compact is 5.5rem. Read several note lines and enlarge the native textarea when needed. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.13 | --ui-notice-stroke | 3px | Apply the explicit compact box-model profile. Mark routine guidance with a neutral emphasis stroke, narrower in compact mode. Normal is 4px; compact is 3px. Recognize contextual guidance without a heavy decorative edge. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.14 | --ui-switch-stroke | 1px | Apply the explicit compact box-model profile. Keep a crisp visible switch track with an integer-pixel boundary. Normal is 2px; compact is 1px. Locate the native preference mark while the compact track occupies less space. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.15 | --ui-switch-width | 2.5rem | Apply the explicit compact box-model profile. Provide space for two visibly different thumb positions. Normal is 3rem; compact is 2.5rem. Recognize on/off position without relying on track hue. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.16 | --ui-switch-height | 1.5rem | Apply the explicit compact box-model profile. Fit the decorative thumb inside a track shorter than its full clickable label. Normal is 1.75rem; compact is 1.5rem. See the preference mark while retaining the larger label target. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.17 | --ui-switch-thumb | 1rem | Apply the explicit compact box-model profile. Keep the decorative thumb large enough to identify in its selected position. Normal is 1.125rem; compact is 1rem. Distinguish on/off position without oversized marks in compact mode. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.18 | --ui-swatch-size | 2.5rem | Apply the explicit compact box-model profile. Provide a visible color sample without letting demonstration patches dominate the reference. Normal is 3rem; compact is 2.5rem. Compare actual color roles while compact mode shows more samples and content. | Fit more working content without shrinking reading text or losing control semantics. | proposed |
| density-compact.19 | --ui-dialog-clearance | 0.75rem | Apply the explicit compact box-model profile. Keep a modal inside the viewport with an external escape margin. Normal is 1rem; compact is 0.75rem. Read and scroll a blocking decision without losing its edges at narrow widths. | Fit more working content without shrinking reading text or losing control semantics. | proposed |

## density-coarse-floor

Selector: `:root[data-density="compact"]`; condition: `(any-pointer: coarse), (pointer: none)`. Source: project. Verification family: `density`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| density-coarse-floor.1 | --ui-control-min | 2.75rem | Protect targets on touch, hybrid and no-pointer surfaces. Keep the 44px-at-default-root minimum for coarse or absent pointers; only compact fine-pointer targets use the smaller 36px minimum. | Activate controls comfortably while retaining compact content spacing. | proposed |

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
| grid-gap.1 | --bs-gutter-y | var(--ui-space-xl) | Separate wrapped panels vertically. Use the 24px normal or 16px compact peer gap through Bootstrap’s existing row contract. | Tell one panel from the next on mobile. | proposed |

## grid-density

Selector: `.container, .row`. Source: project. Verification family: `density`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| grid-density.1 | --bs-gutter-x | var(--ui-space-xl) | Give Bootstrap gutters the same density owner as panels. Override the copied local 24px gutter with the chosen 24px normal or 16px compact value while retaining the literal upstream rules. | Keep outer edges and neighboring columns aligned when changing density. | proposed |

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
| cluster.3 | gap | var(--ui-space-md) | Group peer actions while allowing wrapping. Separate action targets by 12px normal or 8px compact while letting the cluster wrap. | Find related actions together on both narrow and wide screens. | proposed |
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
| nav-target.3 | min-block-size | var(--ui-control-min) | Make text navigation comfortable to activate. Use the density minimum: 44px normal or 36px compact for fine pointers at the default root; coarse/no-pointer compact retains 44px. | Tap section links accurately. | proposed |
| nav-target.4 | padding-inline | var(--ui-space-sm) | Make text navigation comfortable to activate. Add space around each link’s text. | Tap section links accurately. | proposed |

## main

Selector: `main`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| main.1 | padding-block | var(--ui-space-section) var(--ui-space-page) | Separate page content from the header and footer. Use 32/48px entry/trailing clearance normally and 24/32px in compact mode, retaining a distinct page start and end. | Start reading without feeling the title is crowded against navigation. | proposed |

## stack

Selector: `.ui-stack`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| stack.1 | display | flex | Express a vertical group of related blocks. Create an explicit layout group without extra margins on children. | Follow content in a predictable reading order. | proposed |
| stack.2 | flex-direction | column | Express a vertical group of related blocks. Keep the visual order identical to document order. | Follow content in a predictable reading order. | proposed |
| stack.3 | gap | var(--ui-space-xl) | Express a vertical group of related blocks. Separate peer blocks by 24px normal or 16px compact rather than adding child margins. | Follow content in a predictable reading order. | proposed |

## stack-reset

Selector: `.ui-stack > *`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| stack-reset.1 | margin-block-end | 0 | Avoid doubling component and stack spacing. Let the parent gap own separation for direct children. | Perceive one consistent gap between related blocks. | proposed |

## section

Selector: `.ui-section`. Source: project. Verification family: `reflow`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| section.1 | margin-block-start | var(--ui-space-page) | Separate major component families. Separate major topics by 48px normal or 32px compact so section boundaries remain visible while scrolling less. | Recognize the start of a new topic when scrolling. | proposed |
| section.2 | scroll-margin-block-start | var(--ui-space-lg) | Separate major component families. Keep anchor destinations clear of the viewport edge without a sticky header. | Recognize the start of a new topic when scrolling. | proposed |

## panel

Selector: `.card`. Source: project. Verification family: `panels`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| panel.1 | background-color | var(--ui-surface) | Contain a related task or reference example. Give the group an opaque surface distinct from the canvas. | Recognize which information and actions belong together. | proposed |
| panel.2 | border | 1px solid var(--ui-divider) | Contain a related task or reference example. Keep panel edges recognizable on adjacent palette surfaces. | Recognize which information and actions belong together. | proposed |
| panel.3 | border-radius | var(--ui-radius-panel) | Contain a related task or reference example. Use the larger corner role for containing groups. | Recognize which information and actions belong together. | proposed |
| panel.4 | padding | var(--ui-space-xl) | Contain a related task or reference example. Inset panel content by 24px normal or 16px compact, leaving more than the 6px focus-ring extent. | Recognize which information and actions belong together. | proposed |
| panel.5 | block-size | 100% | Contain a related task or reference example. Align peer panel bottoms within a Bootstrap row without fixing content height. | Recognize which information and actions belong together. | proposed |

## panel-last-margin

Selector: `.card:not(.ui-stack) > :last-child`. Source: project. Verification family: `density`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| panel-last-margin.1 | margin-block-end | 0 | Let panel padding own the final inset. Remove the last child’s trailing margin in ordinary panels; stack panels already reset child margins through their gap owner. | Read a group with balanced clearance rather than an extra paragraph margin below its last item. | proposed |

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
| button.5 | min-block-size | var(--ui-control-min) | Present an explicit action as a native button. Use the density minimum without fixing height: 44px normal, 36px compact for fine pointers, and 44px compact for coarse/no pointers at the default root. | Recognize an available action and activate it precisely. | proposed |
| button.6 | padding | var(--ui-control-pad-block) var(--ui-space-lg) | Present an explicit action as a native button. Use 8/16px vertical/horizontal padding normally and 4/12px compact; the independent minimum target still governs short labels. | Recognize an available action and activate it precisely. | proposed |
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
| control.3 | min-block-size | var(--ui-control-min) | Expose ordinary native editing controls. Use the selected minimum target and let native content grow; compact fine-pointer controls can use 36px while touch retains 44px at the default root. | Enter or choose values using familiar browser behavior. | proposed |
| control.4 | padding | var(--ui-control-pad-block) var(--ui-space-md) | Expose ordinary native editing controls. Inset values by 8/12px vertically/horizontally normally or 4/8px compact, without reducing type size. | Enter or choose values using familiar browser behavior. | proposed |
| control.5 | color | var(--ui-ink) | Expose ordinary native editing controls. Use the body text contrast role for entered values. | Enter or choose values using familiar browser behavior. | proposed |
| control.6 | background-color | var(--ui-surface) | Expose ordinary native editing controls. Indicate the active editable surface. | Enter or choose values using familiar browser behavior. | proposed |
| control.7 | border | 1px solid var(--ui-border) | Expose ordinary native editing controls. Distinguish the input boundary with at least 3:1 contrast. | Enter or choose values using familiar browser behavior. | proposed |
| control.8 | border-radius | var(--ui-radius-small) | Expose ordinary native editing controls. Use the shared control corner role. | Enter or choose values using familiar browser behavior. | proposed |

## textarea

Selector: `textarea.form-control`. Source: project. Verification family: `editing`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| textarea.1 | min-block-size | var(--ui-notes-min) | Let multi-line content grow under user control. Use a 112px normal or 88px compact minimum at the default root while retaining three native rows and user-controlled resizing. | Review a longer draft without a tiny fixed viewport. | proposed |
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
| choice.3 | gap | var(--ui-space-md) | Make the whole native choice label a touch target. Leave 12px normal or 8px compact between the unchanged native mark and its explanation. | Select an option without needing to hit a small mark. | proposed |
| choice.4 | min-block-size | var(--ui-control-min) | Make the whole native choice label a touch target. Use the density target minimum on the full label: 44px normal or 36px compact with fine pointers, retaining 44px for touch/no pointers at the default root. | Select an option without needing to hit a small mark. | proposed |
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
| cells.1 | padding | var(--ui-space-md) var(--ui-space-lg) | Keep cell content aligned and separated. Use 12/16px vertical/horizontal cell clearance normally and 8/12px compact so more rows fit without changing text or column relationships. | Scan a row without confusing neighboring values. | proposed |
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
| notice.2 | border-inline-start | var(--ui-notice-stroke) solid var(--ui-border) | Group relevant guidance without interrupting the page. Identify guidance with a neutral 4px normal or 3px compact stroke; retain contrast rather than borrowing an action color. | Read a condition and continue the same task. | proposed |
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
| swatches.3 | gap | var(--ui-space-lg) | Present color roles as a responsive comparison group. Separate role samples by 16px normal or 12px compact without merging their labels. | Compare named colors at narrow and wide widths. | proposed |

## swatch

Selector: `.ui-swatch`. Source: project. Verification family: `colors`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| swatch.1 | block-size | var(--ui-swatch-size) | Show a token’s actual color as a sample. Use a 48px normal or 40px compact sample at the default root, large enough to inspect without dominating the page. | Associate a documented name and hex value with its appearance. | proposed |
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
| dialog.1 | inline-size | min(32rem, calc(100% - 2 * var(--ui-dialog-clearance))) | Present a focused decision in the native top layer. Cap the decision at 32rem with 16px normal or 12px compact viewport clearance per side at the default root. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.2 | max-block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | Present a focused decision in the native top layer. Bound the dialog by the dynamic viewport minus the selected external clearance, preserving its internal scroll. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.3 | overflow | auto | Present a focused decision in the native top layer. Allow long or magnified content to remain reachable. | Finish or cancel a blocking choice without losing page context. | proposed |
| dialog.4 | padding | var(--ui-space-xl) | Present a focused decision in the native top layer. Inset dialog content by 24px normal or 16px compact, leaving space for the offset focus perimeter. | Finish or cancel a blocking choice without losing page context. | proposed |
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
| inline-field.3 | display | grid | Separate values in a directly editable record. Give the label, value, help and error one explicit layout owner instead of relying on paragraph-margin collapse. | Scan a field’s current value and focus it without opening another surface. | proposed |
| inline-field.4 | row-gap | var(--ui-space-sm) | Separate values in a directly editable record. Leave 8px normal or 6px compact between field rows, clearing the 6px extent of the offset focus perimeter. | Scan a field’s current value and focus it without opening another surface. | proposed |
| inline-field.5 | grid-template-columns | minmax(0, 1fr) | Separate values in a directly editable record. Allow long native values and enlarged text to stay inside the field rather than imposing an intrinsic grid-column minimum. | Scan a field’s current value and focus it without opening another surface. | proposed |

## field-margins

Selector: `.ui-field > *`. Source: project. Verification family: `density`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| field-margins.1 | margin-block | 0 | Remove a second source of spacing inside a field. Let the field row gap own both sides of child separation rather than adding inherited paragraph bottom margins. | Read label, input and help as one group with a visible unobstructed focus ring. | proposed |

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
| appearance-box.1 | margin-block-start | var(--ui-space-xl) | Group the independent appearance and density preferences. Separate appearance preferences from navigation and the reference introduction. | Choose brightness and status palette without changing task drafts. | proposed |

## switch-track

Selector: `.ui-switch input[type="checkbox"]`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-track.1 | appearance | none | Show a sliding binary preference using a native checkbox. Replace only the visual checkbox mark; keep its native checked state, input events and switch semantics. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.2 | display | inline-grid | Show a sliding binary preference using a native checkbox. Place a decorative thumb within the native checkbox footprint. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.3 | align-items | center | Show a sliding binary preference using a native checkbox. Center the thumb vertically without absolute positioning. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.4 | inline-size | var(--ui-switch-width) | Show a sliding binary preference using a native checkbox. Use a 48px normal or 40px compact track at the default root, inside the larger clickable label. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.5 | block-size | var(--ui-switch-height) | Show a sliding binary preference using a native checkbox. Use a 28px normal or 24px compact track at the default root, preserving a distinguishable thumb. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.6 | padding | 2px | Show a sliding binary preference using a native checkbox. Keep the thumb away from the track boundary. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.7 | border | var(--ui-switch-stroke) solid var(--ui-border) | Show a sliding binary preference using a native checkbox. Retain a crisp 2px normal or 1px compact track boundary in every palette. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.8 | border-radius | 1rem | Show a sliding binary preference using a native checkbox. Distinguish a sliding preference from a square choice mark. | Set a named on/off preference with native click, touch and Space behavior. | proposed |
| switch-track.9 | background-color | var(--ui-muted) | Show a sliding binary preference using a native checkbox. Give the off position a neutral, contrast-tested track. | Set a named on/off preference with native click, touch and Space behavior. | proposed |

## switch-thumb

Selector: `.ui-switch input[type="checkbox"]::before`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-thumb.1 | content | "" | Mark the slider’s current position without using color alone. Create a decorative thumb only; the actual label and checked state carry the meaning. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.2 | inline-size | var(--ui-switch-thumb) | Mark the slider’s current position without using color alone. Use an 18px normal or 16px compact thumb at the default root so position remains identifiable. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.3 | block-size | var(--ui-switch-thumb) | Mark the slider’s current position without using color alone. Keep the thumb circular rather than stretching it with label text. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.4 | border-radius | 50% | Mark the slider’s current position without using color alone. Make the moving thumb distinguishable from its rounded track. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.5 | background-color | var(--ui-surface) | Mark the slider’s current position without using color alone. Contrast the off-position thumb against the neutral track. | Distinguish on and off from the thumb’s left/right position. | proposed |
| switch-thumb.6 | transform | translateX(0) | Mark the slider’s current position without using color alone. Place the off thumb at the start of the travel computed from its track, border, padding and thumb dimensions. | Distinguish on and off from the thumb’s left/right position. | proposed |

## switch-on

Selector: `.ui-switch input[type="checkbox"]:checked`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-on.1 | background-color | var(--ui-interactive) | Reinforce an enabled slider preference. Use the blue interactive role so the checked state contrasts with adjacent neutral surfaces; the labelled-button exception does not apply to selection marks. | Recognize the enabled setting through both position and native state. | proposed |

## switch-thumb-on

Selector: `.ui-switch input[type="checkbox"]:checked::before`. Source: project. Verification family: `controls`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| switch-thumb-on.1 | transform | translateX(calc(var(--ui-switch-width) - var(--ui-switch-thumb) - 2 * var(--ui-switch-stroke) - 4px)) | Move and contrast the enabled slider thumb. Derive the end position from track width minus thumb, two borders and two 2px insets: 22px normal or 18px compact at the default root, with no animation. | Read the on position in every brightness and palette combination. | proposed |
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

## prose-root

Selector: `.ui-prose`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-root.1 | display | flow-root | Provide an opt-in reading surface for document content. Contain block margin behavior within the document surface without clipping focus or content. | Read a document without changing application navigation, forms or task lists. | proposed |
| prose-root.2 | max-inline-size | 65ch | Provide an opt-in reading surface for document content. Limit sustained reading width while allowing the available viewport to be narrower. | Read a document without changing application navigation, forms or task lists. | proposed |
| prose-root.3 | min-inline-size | 0 | Provide an opt-in reading surface for document content. Let embedded documents shrink inside flex/grid workspaces instead of forcing page overflow. | Read a document without changing application navigation, forms or task lists. | proposed |
| prose-root.4 | color | var(--ui-ink) | Provide an opt-in reading surface for document content. Keep document text on the existing contrast-checked ink role. | Read a document without changing application navigation, forms or task lists. | proposed |
| prose-root.5 | line-height | 1.5 | Provide an opt-in reading surface for document content. Use the same readable body rhythm in both density profiles. | Read a document without changing application navigation, forms or task lists. | proposed |

## prose-reset

Selector: `.ui-prose :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-reset.1 | margin-block | 0 | Give document block spacing one explicit owner. Reset both block margins before applying sibling rhythm; the first/last block adds no outside margin. | Read paragraphs, quotations and lists without accumulated browser-default margins. | proposed |
| prose-reset.2 | margin-inline | 0 | Give document block spacing one explicit owner. Remove browser quote/figure side margins so their documented inset owns horizontal space. | Read paragraphs, quotations and lists without accumulated browser-default margins. | proposed |

## prose-rhythm

Selector: `.ui-prose :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table) + :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-rhythm.1 | margin-block-start | var(--ui-space-lg) | Separate consecutive document blocks. Use one 16px normal / 12px compact gap between ordinary neighboring blocks. | Recognize a new reading block without doubled trailing and leading margins. | proposed |

## prose-heading

Selector: `.ui-prose :where(h1, h2, h3, h4, h5, h6)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-heading.1 | font-weight | 600 | Keep all six document ranks visibly related. Distinguish headings from 400-weight body text without extra colors or all-caps labels. | Find the document structure using readable, consistent heading emphasis. | proposed |
| prose-heading.2 | scroll-margin-block-start | var(--ui-space-lg) | Keep all six document ranks visibly related. Leave breathing room above a heading reached by an anchor without adding flow height. | Find the document structure using readable, consistent heading emphasis. | proposed |

## prose-h1

Selector: `.ui-prose h1`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-h1.1 | font-size | 2rem | Express the document heading hierarchy. Identify the document title at the largest reading size. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. | proposed |
| prose-h1.2 | line-height | 1.2 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. | proposed |

## prose-h2

Selector: `.ui-prose h2`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-h2.1 | font-size | 1.75rem | Express the document heading hierarchy. Separate major document sections below the title. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. | proposed |
| prose-h2.2 | line-height | 1.25 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. | proposed |

## prose-h3

Selector: `.ui-prose h3`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-h3.1 | font-size | 1.5rem | Express the document heading hierarchy. Identify a subsection within a major document topic. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. | proposed |
| prose-h3.2 | line-height | 1.25 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. | proposed |

## prose-h4

Selector: `.ui-prose h4`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-h4.1 | font-size | 1.25rem | Express the document heading hierarchy. Mark a local topic without competing with its parent section. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. | proposed |
| prose-h4.2 | line-height | 1.3 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. | proposed |

## prose-h5

Selector: `.ui-prose h5`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-h5.1 | font-size | 1.125rem | Express the document heading hierarchy. Distinguish a detailed subdivision while staying above body size. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. | proposed |
| prose-h5.2 | line-height | 1.35 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. | proposed |

## prose-h6

Selector: `.ui-prose h6`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-h6.1 | font-size | 1rem | Express the document heading hierarchy. Keep the deepest heading readable at body size, with heading weight. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. | proposed |
| prose-h6.2 | line-height | 1.4 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. | proposed |

## prose-heading-before

Selector: `.ui-prose :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table) + :where(h1, h2, h3, h4, h5, h6)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-heading-before.1 | margin-block-start | var(--ui-space-xl) | Make a new document topic distinct from preceding content. Use 24px normal / 16px compact before a heading, greater than its following gap. | Associate the heading with what follows rather than the paragraph before it. | proposed |

## prose-heading-after

Selector: `.ui-prose :where(h1, h2, h3, h4, h5, h6) + :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-heading-after.1 | margin-block-start | var(--ui-space-md) | Connect a heading to its introductory content. Use 12px normal / 8px compact after a heading; when two headings are consecutive, this nearer grouping takes precedence. | Start reading the correct section without an oversized gap below its title. | proposed |

## prose-lists

Selector: `.ui-prose :where(ul, ol)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-lists.1 | padding-inline-start | var(--ui-space-xl) | Keep list markers outside aligned item text. Reserve a 24px normal / 16px compact bullet gutter using logical direction. | Follow wrapped items and distinguish nesting without inserting typed bullet characters. | proposed |
| prose-lists.2 | list-style-position | outside | Keep list markers outside aligned item text. Align wrapped text with item text rather than wrapping beneath the marker. | Follow wrapped items and distinguish nesting without inserting typed bullet characters. | proposed |

## prose-bullets

Selector: `.ui-prose ul`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-bullets.1 | list-style-type | disc | Keep unordered content recognizable at every nesting level. Use a familiar filled bullet; indentation and native list semantics carry nesting. | Recognize a real list even when browser default nested marker choices differ. | proposed |

## prose-numbering

Selector: `.ui-prose ol`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-numbering.1 | list-style-type | decimal | Keep sequence visible and preserve native start/value semantics. Use native decimal counters rather than CSS-generated essential numbers. | Read steps in their actual order, including explicit continuation numbers. | proposed |
| prose-numbering.2 | padding-inline-start | 4ch | Keep sequence visible and preserve native start/value semantics. Reserve a protected character-based gutter for ordinary multi-digit step numbers. | Read steps in their actual order, including explicit continuation numbers. | proposed |

## prose-wide-numbering

Selector: `.ui-prose ol[start], .ui-prose ol.ui-list-wide`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-wide-numbering.1 | padding-inline-start | 8ch | Allow larger explicit starting numbers. Reserve six digits, punctuation and separation; this structural marker allowance does not shrink with density. | Read up to six-digit sequence numbers without clipping them at the content edge. | proposed |

## prose-item-gap

Selector: `.ui-prose li + li`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-item-gap.1 | margin-block-start | var(--ui-space-sm) | Separate sibling list items. Use 8px normal / 6px compact between item boxes. | Scan individual points while keeping them grouped more closely than independent paragraphs. | proposed |

## prose-nested-list

Selector: `.ui-prose li > :where(ul, ol)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-nested-list.1 | margin-block-start | var(--ui-space-sm) | Keep a nested list attached to its owning item. Use the related-content gap after the parent text; no extra list bottom margin is added. | Read supporting subpoints as part of the parent rather than a new document block. | proposed |

## prose-loose-item

Selector: `.ui-prose li > p + p`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-loose-item.1 | margin-block-start | var(--ui-space-sm) | Separate paragraphs within one list item. Use one related-content gap rather than full document paragraph separation. | Read a longer explanation without confusing each paragraph with a new numbered step. | proposed |

## prose-term

Selector: `.ui-prose dt`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-term.1 | font-weight | 600 | Identify a definition term without changing its semantics. Use heading-like emphasis at body size, without pretending a term is a section heading. | Find the term whose explanation follows. | proposed |

## prose-definition

Selector: `.ui-prose dd`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-definition.1 | margin-inline-start | var(--ui-space-lg) | Associate a definition with its preceding term. Inset definitions by 16px normal / 12px compact instead of the browser default 40px. | Read a term and explanation as one entry with a modest inset. | proposed |
| prose-definition.2 | margin-block | var(--ui-space-xs) 0 | Associate a definition with its preceding term. Keep 4px after the term and no trailing margin that could double the next entry gap. | Read a term and explanation as one entry with a modest inset. | proposed |

## prose-next-term

Selector: `.ui-prose dd + dt`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-next-term.1 | margin-block-start | var(--ui-space-md) | Separate consecutive definition entries. Use a 12px normal / 8px compact entry boundary. | Recognize where the next term starts. | proposed |

## prose-quote

Selector: `.ui-prose blockquote`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-quote.1 | padding-inline-start | var(--ui-space-lg) | Set quoted material apart without suggesting an alert. Separate quote text from its neutral start rule by 16px normal / 12px compact. | Distinguish another author’s words while reading them at normal body contrast. | proposed |
| prose-quote.2 | border-inline-start | var(--ui-notice-stroke) solid var(--ui-border) | Set quoted material apart without suggesting an alert. Reuse the neutral 4px normal / 3px compact guidance stroke as a quotation boundary. | Distinguish another author’s words while reading them at normal body contrast. | proposed |

## prose-attribution

Selector: `.ui-prose .ui-attribution`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-attribution.1 | font-size | 0.875rem | Identify a quotation attribution. Use the existing readable secondary size, unchanged by density. | Find the source separately from the quoted passage. | proposed |
| prose-attribution.2 | color | var(--ui-muted) | Identify a quotation attribution. Use the checked supporting-text role rather than fading the entire quote. | Find the source separately from the quoted passage. | proposed |

## prose-strong

Selector: `.ui-prose :where(strong, b)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-strong.1 | font-weight | 700 | Make textual importance visible. Use a stronger weight than headings where the author marks inline importance or attention. | Recognize emphasis without relying on color. | proposed |

## prose-emphasis

Selector: `.ui-prose :where(em, i, cite, dfn)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-emphasis.1 | font-style | italic | Retain recognizable inline emphasis and titles. Retain native italic semantics without changing text color or size. | Distinguish stress, a cited work or a defined term from ordinary prose. | proposed |

## prose-mark

Selector: `.ui-prose mark`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-mark.1 | background-color | var(--ui-subtle) | Identify a relevant text passage using a neutral framed highlight. Reuse the contrast-tested neutral support plane instead of browser-default yellow. | Locate highlighted content in either brightness without mistaking it for success or error. | proposed |
| prose-mark.2 | color | var(--ui-ink) | Identify a relevant text passage using a neutral framed highlight. Keep highlighted text at full reading contrast on that plane. | Locate highlighted content in either brightness without mistaking it for success or error. | proposed |
| prose-mark.3 | outline | 1px solid currentColor | Identify a relevant text passage using a neutral framed highlight. Make the highlight detectable through its boundary as well as a small background difference. | Locate highlighted content in either brightness without mistaking it for success or error. | proposed |

## prose-insertion

Selector: `.ui-prose ins`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-insertion.1 | text-decoration-line | underline | Keep inserted text visibly distinct without green coding. Use a non-color insertion cue. | Recognize an insertion alongside a written change explanation. | proposed |
| prose-insertion.2 | text-decoration-style | double | Keep inserted text visibly distinct without green coding. Distinguish insertion from ordinary underlined links. | Recognize an insertion alongside a written change explanation. | proposed |

## prose-deletion

Selector: `.ui-prose :where(del, s)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-deletion.1 | text-decoration-line | line-through | Keep removed or outdated text visible. Preserve readable source words while indicating their removal or loss of relevance. | Compare the original wording with its replacement. | proposed |

## prose-monospace

Selector: `.ui-prose :where(code, pre, kbd, samp)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-monospace.1 | font-family | ui-monospace, Consolas, "Liberation Mono", monospace | Make literal code, key names and machine output identifiable. Use installed monospace fonts without a remote font dependency. | Copy exact characters without proportional text disguising their spacing. | proposed |
| prose-monospace.2 | font-size | 0.875em | Make literal code, key names and machine output identifiable. Keep literal text readable while avoiding oversized monospace glyphs. | Copy exact characters without proportional text disguising their spacing. | proposed |
| prose-monospace.3 | color | var(--ui-ink) | Make literal code, key names and machine output identifiable. Keep code and output at checked reading contrast, including inside links. | Copy exact characters without proportional text disguising their spacing. | proposed |

## prose-inline-code

Selector: `.ui-prose :not(pre) > code`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-inline-code.1 | background-color | var(--ui-subtle) | Separate a short literal identifier from surrounding prose. Use the existing neutral secondary plane rather than a new syntax palette. | Recognize code without treating it as a button or reducing its copyable content. | proposed |
| prose-inline-code.2 | padding-inline | var(--ui-space-xs) | Separate a short literal identifier from surrounding prose. Keep 4px at either edge of the identifier without adding line-height-changing block padding. | Recognize code without treating it as a button or reducing its copyable content. | proposed |
| prose-inline-code.3 | box-decoration-break | clone | Separate a short literal identifier from surrounding prose. Keep the inline code inset/background on each wrapped fragment. | Recognize code without treating it as a button or reducing its copyable content. | proposed |

## prose-pre

Selector: `.ui-prose pre`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-pre.1 | max-inline-size | 100% | Preserve exact source layout inside a bounded reading block. Bound the preformatted box by its document container. | Inspect indentation and long code lines without horizontal scrolling of the whole page. | proposed |
| prose-pre.2 | overflow | auto | Preserve exact source layout inside a bounded reading block. Keep long lines and enlarged text reachable inside the code box. | Inspect indentation and long code lines without horizontal scrolling of the whole page. | proposed |
| prose-pre.3 | white-space | pre | Preserve exact source layout inside a bounded reading block. Preserve source spaces and newlines; wrapping is not silently inserted into code. | Inspect indentation and long code lines without horizontal scrolling of the whole page. | proposed |
| prose-pre.4 | overflow-wrap | normal | Preserve exact source layout inside a bounded reading block. Prevent the inherited prose wrapping rule from breaking literal source layout. | Inspect indentation and long code lines without horizontal scrolling of the whole page. | proposed |
| prose-pre.5 | padding | var(--ui-space-lg) | Preserve exact source layout inside a bounded reading block. Inset code by 16px normal / 12px compact, leaving room for focus. | Inspect indentation and long code lines without horizontal scrolling of the whole page. | proposed |
| prose-pre.6 | border | 1px solid var(--ui-divider) | Preserve exact source layout inside a bounded reading block. Give the code region a quiet boundary without implying an editable form. | Inspect indentation and long code lines without horizontal scrolling of the whole page. | proposed |
| prose-pre.7 | background-color | var(--ui-subtle) | Preserve exact source layout inside a bounded reading block. Keep the code block neutral in every palette. | Inspect indentation and long code lines without horizontal scrolling of the whole page. | proposed |

## prose-pre-code

Selector: `.ui-prose pre code`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-pre-code.1 | font-size | inherit | Keep the code block’s type scale single-owned. Cancel the nested 0.875em reduction; the pre element already owns that scale. | Read a code block without compounded font-size reduction. | proposed |

## prose-key

Selector: `.ui-prose kbd`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-key.1 | padding | 0 var(--ui-space-xs) | Identify keyboard input as a key name. Reserve a small inline inset while preserving the paragraph rhythm. | Recognize an instruction such as Ctrl and Enter without a fake interactive button. | proposed |
| prose-key.2 | border | 1px solid var(--ui-border) | Identify keyboard input as a key name. Use a clear neutral key boundary, never a hover/click state. | Recognize an instruction such as Ctrl and Enter without a fake interactive button. | proposed |
| prose-key.3 | border-radius | var(--ui-radius-small) | Identify keyboard input as a key name. Relate the small keycap shape to other bounded UI without adding a shadow. | Recognize an instruction such as Ctrl and Enter without a fake interactive button. | proposed |

## prose-abbreviation

Selector: `.ui-prose abbr[title]`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-abbreviation.1 | text-decoration | underline dotted | Signal that an abbreviation has an expansion. Use a dotted underline rather than the solid link convention; prose must still explain the term on first use. | Notice supplementary terminology without confusing it with a link. | proposed |
| prose-abbreviation.2 | text-underline-offset | 0.2em | Signal that an abbreviation has an expansion. Separate the indicator from letter descenders as for existing text links. | Notice supplementary terminology without confusing it with a link. | proposed |

## prose-annotations

Selector: `.ui-prose :where(sub, sup)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-annotations.1 | font-size | 0.875em | Keep small baseline annotations readable. Use a readable relative annotation size instead of a tiny absolute label. | Read formula indices and references without changing the whole line rhythm. | proposed |
| prose-annotations.2 | line-height | 0 | Keep small baseline annotations readable. Let the surrounding body line own spacing while native sub/super vertical alignment places the annotation. | Read formula indices and references without changing the whole line rhythm. | proposed |

## prose-rule

Selector: `.ui-prose hr`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-rule.1 | border | 0 | Mark a thematic change using a quiet separator. Remove browser inset borders before drawing one intended edge. | Recognize a break in topic without an alarm-like color band. | proposed |
| prose-rule.2 | border-block-start | 1px solid var(--ui-divider) | Mark a thematic change using a quiet separator. Draw one passive divider with protected 1px width. | Recognize a break in topic without an alarm-like color band. | proposed |

## prose-table-region

Selector: `.ui-prose .ui-prose-table`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-table-region.1 | max-inline-size | 100% | Contain a document table’s two-dimensional layout. Bound the region to the prose width. | Compare wide columns using a named keyboard-accessible region without panning the page. | proposed |
| prose-table-region.2 | overflow-x | auto | Contain a document table’s two-dimensional layout. Keep horizontal scrolling local to the table. | Compare wide columns using a named keyboard-accessible region without panning the page. | proposed |
| prose-table-region.3 | padding | var(--ui-space-sm) | Contain a document table’s two-dimensional layout. Reserve 8px normal / 6px compact inner clearance for links and their focus outlines. | Compare wide columns using a named keyboard-accessible region without panning the page. | proposed |

## prose-table

Selector: `.ui-prose table`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-table.1 | inline-size | 100% | Fit document tables to their content and reading region. Use the available comparison width. | Read a small table without inheriting the application example’s six-column width. | proposed |
| prose-table.2 | min-inline-size | 0 | Fit document tables to their content and reading region. Override the .table sample’s 36rem minimum when reused inside a document. | Read a small table without inheriting the application example’s six-column width. | proposed |
| prose-table.3 | border-collapse | collapse | Fit document tables to their content and reading region. Avoid doubled cell dividers. | Read a small table without inheriting the application example’s six-column width. | proposed |
| prose-table.4 | overflow-wrap | normal | Fit document tables to their content and reading region. Keep words and identifiers intact for comparison; a wide table scrolls inside its named region instead of squeezing columns to single letters. | Read a small table without inheriting the application example’s six-column width. | proposed |

## prose-cell

Selector: `.ui-prose :where(th, td)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-cell.1 | padding | var(--ui-space-sm) var(--ui-space-md) | Keep document cells legible and related to their headers. Use 8/12px normal and 6/8px compact vertical/horizontal clearance. | Compare values using semantic columns without cramped or overflowing cells. | proposed |
| prose-cell.2 | text-align | start | Keep document cells legible and related to their headers. Align ordinary text with its reading direction. | Compare values using semantic columns without cramped or overflowing cells. | proposed |
| prose-cell.3 | vertical-align | top | Keep document cells legible and related to their headers. Align multiline cells at the start of each record. | Compare values using semantic columns without cramped or overflowing cells. | proposed |
| prose-cell.4 | border-block-end | 1px solid var(--ui-divider) | Keep document cells legible and related to their headers. Separate rows without heavy full grids. | Compare values using semantic columns without cramped or overflowing cells. | proposed |

## prose-table-caption

Selector: `.ui-prose caption`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-table-caption.1 | caption-side | top | Introduce the comparison before its data. Keep the caption before the data. | Know the table’s purpose before navigating its headers. | proposed |
| prose-table-caption.2 | text-align | start | Introduce the comparison before its data. Align the caption with reading order. | Know the table’s purpose before navigating its headers. | proposed |
| prose-table-caption.3 | padding-block-end | var(--ui-space-sm) | Introduce the comparison before its data. Separate the caption from header cells by the related-content gap. | Know the table’s purpose before navigating its headers. | proposed |
| prose-table-caption.4 | color | var(--ui-muted) | Introduce the comparison before its data. Use the checked supporting role. | Know the table’s purpose before navigating its headers. | proposed |

## prose-image

Selector: `.ui-prose img`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-image.1 | display | block | Fit an explicitly permitted image without distortion. Avoid an inline baseline gap below an illustration. | Inspect local document media without horizontal page overflow. | proposed |
| prose-image.2 | max-inline-size | 100% | Fit an explicitly permitted image without distortion. Scale down an image wider than its reading container. | Inspect local document media without horizontal page overflow. | proposed |
| prose-image.3 | block-size | auto | Fit an explicitly permitted image without distortion. Preserve intrinsic aspect ratio, including dimensions reserved by HTML width/height. | Inspect local document media without horizontal page overflow. | proposed |

## prose-figure-caption

Selector: `.ui-prose figcaption`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-figure-caption.1 | margin-block-start | var(--ui-space-sm) | Keep a figure’s explanation attached to its image. Use the related-content gap between media and its caption. | Read the image’s meaning and source without confusing the caption with body content. | proposed |
| prose-figure-caption.2 | font-size | 0.875rem | Keep a figure’s explanation attached to its image. Use the existing readable secondary size. | Read the image’s meaning and source without confusing the caption with body content. | proposed |
| prose-figure-caption.3 | color | var(--ui-muted) | Keep a figure’s explanation attached to its image. Keep the explanation readable in every palette. | Read the image’s meaning and source without confusing the caption with body content. | proposed |

## prose-details

Selector: `.ui-prose details`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-details.1 | padding | var(--ui-space-lg) | Bound optional supporting document material. Leave 16px normal / 12px compact inset for text and focus. | Recognize information that can be expanded without hiding the main explanation. | proposed |
| prose-details.2 | border | 1px solid var(--ui-divider) | Bound optional supporting document material. Identify the optional group with a quiet boundary. | Recognize information that can be expanded without hiding the main explanation. | proposed |

## prose-summary

Selector: `.ui-prose summary`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-summary.1 | min-block-size | var(--ui-control-min) | Keep native disclosure activation visible and comfortable. Use the governed fine/coarse pointer target floor on the native summary. | Open optional material with click, touch, Enter or Space and see its current state. | proposed |
| prose-summary.2 | cursor | pointer | Keep native disclosure activation visible and comfortable. Confirm activation without replacing the native triangle or keyboard behavior. | Open optional material with click, touch, Enter or Space and see its current state. | proposed |
| prose-summary.3 | font-weight | 600 | Keep native disclosure activation visible and comfortable. Distinguish the persistent disclosure label from its revealed content. | Open optional material with click, touch, Enter or Space and see its current state. | proposed |

## prose-summary-focus

Selector: `.ui-prose summary:focus-visible`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-summary-focus.1 | outline | 3px solid var(--ui-focus) | Expose keyboard focus on a native disclosure label. Match the protected keyboard focus perimeter used by other native controls. | Find the disclosure receiving keyboard input in every appearance. | proposed |
| prose-summary-focus.2 | outline-offset | 3px | Expose keyboard focus on a native disclosure label. Separate keyboard focus from the disclosure text and containing border. | Find the disclosure receiving keyboard input in every appearance. | proposed |

## prose-summary-forced-focus

Selector: `.ui-prose summary:focus-visible`; condition: `(forced-colors: active)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-summary-forced-focus.1 | outline-color | Highlight | Respect the system focus color on document disclosures. Use the user-selected platform focus role rather than the authored palette. | Find the optional-content control under a forced-color preference. | proposed |

## prose-summary-content

Selector: `.ui-prose details[open] > summary + *`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-summary-content.1 | margin-block-start | var(--ui-space-sm) | Separate an expanded disclosure from its label. Use one related-content gap after the open summary. | Recognize which content was revealed by the summary. | proposed |

## prose-task-list

Selector: `.ui-prose .ui-task-list`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-task-list.1 | list-style-type | none | Present task markers as read-only document information. Avoid a second bullet beside the explicitly worded task indicator. | Read checked and unchecked states without accidentally changing application tasks. | proposed |

## prose-task-marker

Selector: `.ui-prose .ui-task-marker`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-task-marker.1 | font-weight | 600 | Keep a noninteractive task status next to its text. Emphasize the explicit state word without color dependence. | Recognize the written Done/Open state without mistaking it for an actionable checkbox. | proposed |

## prose-forced-mark

Selector: `.ui-prose mark`; condition: `(forced-colors: active)`. Source: project. Verification family: `prose`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| prose-forced-mark.1 | background-color | Mark | Keep marked text readable in the platform contrast palette. Use the system highlight background. | Find highlighted passages when authored colors are replaced by the user. | proposed |
| prose-forced-mark.2 | color | MarkText | Keep marked text readable in the platform contrast palette. Use its paired system text foreground. | Find highlighted passages when authored colors are replaced by the user. | proposed |

## catalog-card

Selector: `.ui-card`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-card.1 | padding | var(--ui-space-xl) | Contain one related item and its actions. Inset content with the governed panel token and clear offset focus. | Recognize which heading, content and action belong together. | proposed |
| catalog-card.2 | min-inline-size | 0 | Contain one related item and its actions. Allow the containing card to shrink around bounded source and native editors. | Recognize which heading, content and action belong together. | proposed |
| catalog-card.3 | border | 1px solid var(--ui-divider) | Contain one related item and its actions. Keep the passive group edge crisp. | Recognize which heading, content and action belong together. | proposed |
| catalog-card.4 | border-radius | var(--ui-radius-panel) | Contain one related item and its actions. Distinguish the container from its controls. | Recognize which heading, content and action belong together. | proposed |
| catalog-card.5 | background-color | var(--ui-surface) | Contain one related item and its actions. Use the checked opaque reading plane. | Recognize which heading, content and action belong together. | proposed |
| catalog-card.6 | color | var(--ui-ink) | Contain one related item and its actions. Keep copy at the checked reading contrast. | Recognize which heading, content and action belong together. | proposed |

## catalog-gallery

Selector: `.ui-catalog`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery.1 | display | grid | Lay out independently inspectable component examples. Give sections one gap owner. | Review components without page-level horizontal panning. | proposed |
| catalog-gallery.2 | grid-template-columns | minmax(0, 1fr) | Lay out independently inspectable component examples. Keep the page track shrinkable even when a sample contains long literal source. | Review components without page-level horizontal panning. | proposed |
| catalog-gallery.3 | gap | var(--ui-space-xl) | Lay out independently inspectable component examples. Separate peer sections with the governed token. | Review components without page-level horizontal panning. | proposed |
| catalog-gallery.4 | min-inline-size | 0 | Lay out independently inspectable component examples. Let long content shrink within the page. | Review components without page-level horizontal panning. | proposed |

## catalog-sample

Selector: `.ui-catalog-sample`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-sample.1 | padding | var(--ui-space-lg) | Bound the live component within its review example. Clear content and offset focus from the boundary. | Distinguish the example from gallery navigation and adjacent components. | proposed |
| catalog-sample.2 | border | 1px solid var(--ui-divider) | Bound the live component within its review example. Identify the live example without status color. | Distinguish the example from gallery navigation and adjacent components. | proposed |
| catalog-sample.3 | min-inline-size | 0 | Bound the live component within its review example. Allow native controls to fit narrow hosts. | Distinguish the example from gallery navigation and adjacent components. | proposed |

## catalog-sample-children

Selector: `.ui-catalog-sample > *`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-sample-children.1 | margin-block-end | 0 | Let the live sample own its trailing inset. Remove extra child trailing gaps. | Read a balanced sample without duplicate paragraph margins. | proposed |

## catalog-sample-siblings

Selector: `.ui-catalog-sample > * + *`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-sample-siblings.1 | margin-block-start | var(--ui-space-md) | Separate peer controls inside one example. Use one leading local-content gap. | Recognize separate sample elements while keeping their group together. | proposed |

## catalog-index

Selector: `.ui-catalog-index`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-index.1 | display | grid | Keep the component index responsive. Lay out independent links in available columns. | Find a named example without an excessively long single-column index. | proposed |
| catalog-index.2 | grid-template-columns | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | Keep the component index responsive. Preserve a useful link measure while allowing one narrow column. | Find a named example without an excessively long single-column index. | proposed |
| catalog-index.3 | gap | var(--ui-space-sm) | Keep the component index responsive. Separate related index links. | Find a named example without an excessively long single-column index. | proposed |
| catalog-index.4 | padding-inline-start | var(--ui-space-lg) | Keep the component index responsive. Reserve a native marker gutter. | Find a named example without an excessively long single-column index. | proposed |

## catalog-source

Selector: `.ui-catalog-source`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-source.1 | max-inline-size | 100% | Keep inspectable markup bounded. Bound source to its card. | Copy literal example markup without panning the document. | proposed |
| catalog-source.2 | overflow | auto | Keep inspectable markup bounded. Keep overflow locally reachable. | Copy literal example markup without panning the document. | proposed |
| catalog-source.3 | padding | var(--ui-space-lg) | Keep inspectable markup bounded. Leave reading and focus clearance. | Copy literal example markup without panning the document. | proposed |
| catalog-source.4 | background-color | var(--ui-subtle) | Keep inspectable markup bounded. Distinguish source from the live surface. | Copy literal example markup without panning the document. | proposed |
| catalog-source.5 | white-space | pre-wrap | Keep inspectable markup bounded. Preserve line breaks while wrapping long markup. | Copy literal example markup without panning the document. | proposed |

## catalog-source-code

Selector: `.ui-catalog-source code`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-source-code.1 | font-size | inherit | Keep nested source type single-owned. Let pre own the source type size. | Read literal markup without compounded size reduction. | proposed |

## catalog-button

Selector: `.ui-button`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-button.1 | display | inline-flex | Style a real action target consistently. Make one aligned native action target. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.2 | align-items | center | Style a real action target consistently. Center the label vertically. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.3 | justify-content | center | Style a real action target consistently. Center short labels. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.4 | gap | var(--ui-space-sm) | Style a real action target consistently. Separate a mark from its written action. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.5 | min-block-size | var(--ui-control-min) | Style a real action target consistently. Use the pointer-specific target floor. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.6 | min-inline-size | var(--ui-control-min) | Style a real action target consistently. Keep short targets sufficiently wide. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.7 | padding | var(--ui-control-pad-block) var(--ui-space-lg) | Style a real action target consistently. Apply governed target clearance without smaller text. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.8 | border-width | 1px | Style a real action target consistently. Reserve a crisp boundary without resetting primary border color. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.9 | border-style | solid | Style a real action target consistently. Keep boundary geometry stable. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.10 | border-radius | var(--ui-radius-small) | Style a real action target consistently. Use the control corner role. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.11 | font-size | inherit | Style a real action target consistently. Respect the body reading size rather than a smaller platform default. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.12 | font-weight | 600 | Style a real action target consistently. Identify the action label. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.13 | text-align | center | Style a real action target consistently. Balance wrapped labels. | Activate a named action with native pointer and keyboard behavior. | proposed |
| catalog-button.14 | cursor | pointer | Style a real action target consistently. Confirm pointer activation. | Activate a named action with native pointer and keyboard behavior. | proposed |

## catalog-secondary

Selector: `.ui-button:not(.btn-primary)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-secondary.1 | color | var(--ui-interactive) | Style neutral named actions. Use the tested blue text role. | Recognize secondary actions through readable labels and boundaries. | proposed |
| catalog-secondary.2 | background-color | var(--ui-surface) | Style neutral named actions. Use a checked reading plane. | Recognize secondary actions through readable labels and boundaries. | proposed |
| catalog-secondary.3 | border-color | var(--ui-border) | Style neutral named actions. Expose the unfilled action boundary. | Recognize secondary actions through readable labels and boundaries. | proposed |

## catalog-secondary-hover

Selector: `.ui-button:not(.btn-primary):hover:not(:disabled)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-secondary-hover.1 | background-color | var(--ui-subtle) | Confirm the action under the pointer. Use the neutral hover plane. | Recognize the targeted action without geometry movement. | proposed |

## catalog-disabled

Selector: `.ui-button:disabled`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-disabled.1 | color | var(--ui-disabled) | Keep unavailable native actions legible. Use the checked disabled text. | Read why an action is unavailable without interpreting low opacity. | proposed |
| catalog-disabled.2 | background-color | var(--ui-disabled-bg) | Keep unavailable native actions legible. Use the neutral unavailable plane. | Read why an action is unavailable without interpreting low opacity. | proposed |
| catalog-disabled.3 | cursor | not-allowed | Keep unavailable native actions legible. Supplement native disabled semantics. | Read why an action is unavailable without interpreting low opacity. | proposed |

## catalog-button-group

Selector: `.ui-button-group, .ui-join`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-button-group.1 | display | flex | Keep related actions adjacent while allowing wrapping. Group peer native targets in source order. | Recognize peer actions without hidden overflow or roving-menu semantics. | proposed |
| catalog-button-group.2 | flex-wrap | wrap | Keep related actions adjacent while allowing wrapping. Keep long actions visible. | Recognize peer actions without hidden overflow or roving-menu semantics. | proposed |
| catalog-button-group.3 | gap | var(--ui-space-sm) | Keep related actions adjacent while allowing wrapping. Clear offset focus between peer actions. | Recognize peer actions without hidden overflow or roving-menu semantics. | proposed |

## catalog-join

Selector: `.ui-join`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-join.1 | padding | var(--ui-space-sm) | Frame a related action group. Clear contained focus perimeters. | Recognize joined actions while each remains separately reachable. | proposed |
| catalog-join.2 | border | 1px solid var(--ui-divider) | Frame a related action group. Add a passive outer group edge. | Recognize joined actions while each remains separately reachable. | proposed |
| catalog-join.3 | border-radius | var(--ui-radius-small) | Frame a related action group. Use a related-control shape. | Recognize joined actions while each remains separately reachable. | proposed |

## catalog-editors

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-editors.1 | font | inherit | Keep native editors readable and bounded. Preserve normal control type. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.2 | color | var(--ui-ink) | Keep native editors readable and bounded. Keep text at checked contrast. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.3 | background-color | var(--ui-surface) | Keep native editors readable and bounded. Use the known editing plane. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.4 | border | 1px solid var(--ui-border) | Keep native editors readable and bounded. Identify real native editing boundaries. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.5 | border-radius | var(--ui-radius-small) | Keep native editors readable and bounded. Use the existing control shape. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.6 | padding | var(--ui-control-pad-block) var(--ui-space-md) | Keep native editors readable and bounded. Use governed editor insets. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.7 | min-block-size | var(--ui-control-min) | Keep native editors readable and bounded. Protect pointer-specific targets. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.8 | inline-size | 100% | Keep native editors readable and bounded. Fit the available field width. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.9 | min-inline-size | 0 | Keep native editors readable and bounded. Remove intrinsic native width floors. | Enter values with platform affordances and visible focus. | proposed |
| catalog-editors.10 | max-inline-size | 100% | Keep native editors readable and bounded. Keep the box within its host. | Enter values with platform affordances and visible focus. | proposed |

## catalog-textarea

Selector: `.ui-textarea`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-textarea.1 | min-block-size | var(--ui-notes-min) | Provide a native multiline editor. Offer the governed initial multiline viewport. | Enter line breaks and resize notes vertically. | proposed |
| catalog-textarea.2 | resize | vertical | Provide a native multiline editor. Allow more notes height without widening the page. | Enter line breaks and resize notes vertically. | proposed |

## catalog-otp

Selector: `.ui-otp`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-otp.1 | font-family | ui-monospace, Consolas, monospace | Keep a verification code in one native input. Distinguish exact code characters. | Paste or receive a whole code without scripted character-box navigation. | proposed |
| catalog-otp.2 | letter-spacing | 0.25em | Keep a verification code in one native input. Separate characters while preserving one native paste target. | Paste or receive a whole code without scripted character-box navigation. | proposed |

## catalog-file-input

Selector: `.ui-file-input::file-selector-button`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-file-input.1 | font | inherit | Expose the browser-owned file chooser. Keep the chooser at reading size. | Choose a file only after an explicit native action. | proposed |
| catalog-file-input.2 | min-block-size | var(--ui-control-min) | Expose the browser-owned file chooser. Protect native chooser activation. | Choose a file only after an explicit native action. | proposed |
| catalog-file-input.3 | margin-inline-end | var(--ui-space-sm) | Expose the browser-owned file chooser. Separate the chooser from the native filename. | Choose a file only after an explicit native action. | proposed |

## catalog-field

Selector: `.ui-fieldset, .ui-form-field`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-field.1 | display | grid | Group a persistent label, native control and supporting help. Give label, editor and help one gap owner. | Understand the question and enter a value without losing its name. | proposed |
| catalog-field.2 | gap | var(--ui-space-sm) | Group a persistent label, native control and supporting help. Clear the offset focus ring between rows. | Understand the question and enter a value without losing its name. | proposed |
| catalog-field.3 | min-inline-size | 0 | Group a persistent label, native control and supporting help. Let native controls fit the host. | Understand the question and enter a value without losing its name. | proposed |
| catalog-field.4 | padding | 0 | Group a persistent label, native control and supporting help. Avoid duplicating panel inset. | Understand the question and enter a value without losing its name. | proposed |
| catalog-field.5 | border | 0 | Group a persistent label, native control and supporting help. Retain fieldset semantics without a duplicate frame. | Understand the question and enter a value without losing its name. | proposed |
| catalog-field.6 | margin | 0 | Group a persistent label, native control and supporting help. Remove browser fieldset outer gaps. | Understand the question and enter a value without losing its name. | proposed |

## catalog-label

Selector: `.ui-label`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-label.1 | display | block | Keep a native control named. Keep a persistent name on its own line. | Activate the associated input by selecting its persistent label. | proposed |
| catalog-label.2 | font-weight | 600 | Keep a native control named. Distinguish the question from its value. | Activate the associated input by selecting its persistent label. | proposed |

## catalog-input-group

Selector: `.ui-input-group`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-input-group.1 | display | flex | Associate a fixed prefix or suffix with an input. Keep fixed units beside the editor. | Understand units/context without putting fake values into the editable string. | proposed |
| catalog-input-group.2 | align-items | center | Associate a fixed prefix or suffix with an input. Align the adornment with the value. | Understand units/context without putting fake values into the editable string. | proposed |
| catalog-input-group.3 | gap | var(--ui-space-sm) | Associate a fixed prefix or suffix with an input. Separate fixed text while clearing focus. | Understand units/context without putting fake values into the editable string. | proposed |
| catalog-input-group.4 | min-inline-size | 0 | Associate a fixed prefix or suffix with an input. Allow the editor to shrink. | Understand units/context without putting fake values into the editable string. | proposed |

## catalog-group-input

Selector: `.ui-input-group > input`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-group-input.1 | flex | 1 1 0 | Give editable text the remaining group width. Use available space and permit shrinking. | Read units without losing the editable region. | proposed |
| catalog-group-input.2 | min-inline-size | 0 | Give editable text the remaining group width. Remove the native intrinsic width floor. | Read units without losing the editable region. | proposed |

## catalog-checkbox

Selector: `.ui-checkbox, .ui-radio`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-checkbox.1 | inline-size | 1.25rem | Style a native multiple-choice mark. Keep the existing 20px native mark. | Toggle an explicitly labelled option without custom state synchronization. | proposed |
| catalog-checkbox.2 | block-size | 1.25rem | Style a native multiple-choice mark. Keep the native mark square. | Toggle an explicitly labelled option without custom state synchronization. | proposed |
| catalog-checkbox.3 | accent-color | var(--ui-interactive) | Style a native multiple-choice mark. Use the checked selection accent. | Toggle an explicitly labelled option without custom state synchronization. | proposed |

## catalog-radio

Selector: `.ui-radio`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-radio.1 | flex-shrink | 0 | Present mutually exclusive native choices. Prevent long option labels from compressing marks. | Use labels and arrow keys to choose one option. | proposed |

## catalog-slider

Selector: `.ui-range`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-slider.1 | inline-size | 100% | Expose a bounded numeric choice. Expose the available native track. | Change a value with native arrow keys or pointer input. | proposed |
| catalog-slider.2 | min-inline-size | 0 | Expose a bounded numeric choice. Keep the track within narrow hosts. | Change a value with native arrow keys or pointer input. | proposed |
| catalog-slider.3 | min-block-size | var(--ui-control-min) | Expose a bounded numeric choice. Protect native slider hit height. | Change a value with native arrow keys or pointer input. | proposed |
| catalog-slider.4 | accent-color | var(--ui-interactive) | Expose a bounded numeric choice. Retain native value/keyboard behavior with the selection accent. | Change a value with native arrow keys or pointer input. | proposed |

## catalog-switch

Selector: `.ui-toggle`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-switch.1 | border-radius | var(--ui-radius-small) | Present a named binary native preference. Relate the choice label to existing switches. | Toggle an explicit choice with native checked state and Space. | proposed |
| catalog-switch.2 | padding-inline | var(--ui-space-sm) | Present a named binary native preference. Clear the native mark and label from the edge. | Toggle an explicit choice with native checked state and Space. | proposed |

## catalog-toggle

Selector: `.ui-toggle-button`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-toggle.1 | display | inline-flex | Use native checkbox semantics for a persistent binary choice. Keep the real check and stable label together. | See and change the selected option without a fake aria-pressed button. | proposed |
| catalog-toggle.2 | align-items | center | Use native checkbox semantics for a persistent binary choice. Align native state with text. | See and change the selected option without a fake aria-pressed button. | proposed |
| catalog-toggle.3 | gap | var(--ui-space-sm) | Use native checkbox semantics for a persistent binary choice. Separate mark and name. | See and change the selected option without a fake aria-pressed button. | proposed |
| catalog-toggle.4 | min-block-size | var(--ui-control-min) | Use native checkbox semantics for a persistent binary choice. Use the governed target floor. | See and change the selected option without a fake aria-pressed button. | proposed |
| catalog-toggle.5 | padding | var(--ui-control-pad-block) var(--ui-space-md) | Use native checkbox semantics for a persistent binary choice. Inset the selectable label. | See and change the selected option without a fake aria-pressed button. | proposed |
| catalog-toggle.6 | border | 1px solid var(--ui-border) | Use native checkbox semantics for a persistent binary choice. Expose the option boundary. | See and change the selected option without a fake aria-pressed button. | proposed |
| catalog-toggle.7 | border-radius | var(--ui-radius-small) | Use native checkbox semantics for a persistent binary choice. Use a control shape. | See and change the selected option without a fake aria-pressed button. | proposed |

## catalog-checked-option

Selector: `.ui-toggle-button:has(input:checked)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-checked-option.1 | background-color | var(--ui-subtle) | Make the actual native choice distinct. Use neutral selected grouping. | Recognize checked state through mark and emphasis. | proposed |
| catalog-checked-option.2 | font-weight | 600 | Make the actual native choice distinct. Supplement the native check with emphasis. | Recognize checked state through mark and emphasis. | proposed |

## catalog-toggle-group

Selector: `.ui-toggle-group`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-toggle-group.1 | display | flex | Keep several persistent binary choices together. Group native choices together. | Select multiple explicit options with native checkbox behavior. | proposed |
| catalog-toggle-group.2 | flex-wrap | wrap | Keep several persistent binary choices together. Keep all choices reachable. | Select multiple explicit options with native checkbox behavior. | proposed |
| catalog-toggle-group.3 | gap | var(--ui-space-sm) | Keep several persistent binary choices together. Clear peer focus. | Select multiple explicit options with native checkbox behavior. | proposed |
| catalog-toggle-group.4 | border | 0 | Keep several persistent binary choices together. Retain group semantics without another frame. | Select multiple explicit options with native checkbox behavior. | proposed |
| catalog-toggle-group.5 | padding | 0 | Keep several persistent binary choices together. Let the host own its inset. | Select multiple explicit options with native checkbox behavior. | proposed |

## catalog-rating

Selector: `.ui-rating`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-rating.1 | display | flex | Offer a bounded native single-choice scale. Keep rating labels in sequence. | Choose a named rating with arrow keys and full-size labels. | proposed |
| catalog-rating.2 | flex-wrap | wrap | Offer a bounded native single-choice scale. Preserve all options on mobile. | Choose a named rating with arrow keys and full-size labels. | proposed |
| catalog-rating.3 | gap | var(--ui-space-sm) | Offer a bounded native single-choice scale. Separate complete label targets. | Choose a named rating with arrow keys and full-size labels. | proposed |
| catalog-rating.4 | border | 0 | Offer a bounded native single-choice scale. Retain native group semantics. | Choose a named rating with arrow keys and full-size labels. | proposed |
| catalog-rating.5 | padding | 0 | Offer a bounded native single-choice scale. Use the containing inset. | Choose a named rating with arrow keys and full-size labels. | proposed |

## catalog-disclosures

Selector: `.ui-accordion, .ui-collapse, .ui-sidebar, .ui-trace`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-disclosures.1 | padding | var(--ui-space-lg) | Frame optional native disclosures. Clear reading and focus from the edge. | Find the named summary and inspect optional content. | proposed |
| catalog-disclosures.2 | border | 1px solid var(--ui-divider) | Frame optional native disclosures. Use a quiet containing edge. | Find the named summary and inspect optional content. | proposed |
| catalog-disclosures.3 | border-radius | var(--ui-radius-small) | Frame optional native disclosures. Use the bounded-support shape. | Find the named summary and inspect optional content. | proposed |

## catalog-summaries

Selector: `.ui-accordion > summary, .ui-collapse > summary, .ui-sidebar > summary, .ui-trace > summary`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-summaries.1 | min-block-size | var(--ui-control-min) | Keep native disclosure labels operable. Protect the summary target height. | Use original summary markers and native activation keys. | proposed |
| catalog-summaries.2 | font-weight | 600 | Keep native disclosure labels operable. Identify the controlling label. | Use original summary markers and native activation keys. | proposed |
| catalog-summaries.3 | cursor | pointer | Keep native disclosure labels operable. Supplement the native affordance. | Use original summary markers and native activation keys. | proposed |

## catalog-summary-focus

Selector: `.ui-accordion > summary:focus-visible, .ui-collapse > summary:focus-visible, .ui-sidebar > summary:focus-visible, .ui-trace > summary:focus-visible`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-summary-focus.1 | outline | 3px solid var(--ui-focus) | Include summaries in governed keyboard focus. Use the protected focus perimeter. | Find the disclosure receiving the next keystroke. | proposed |
| catalog-summary-focus.2 | outline-offset | 3px | Include summaries in governed keyboard focus. Separate focus from text and boundaries. | Find the disclosure receiving the next keystroke. | proposed |

## catalog-summary-forced

Selector: `.ui-accordion > summary:focus-visible, .ui-collapse > summary:focus-visible, .ui-sidebar > summary:focus-visible, .ui-trace > summary:focus-visible`; condition: `(forced-colors: active)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-summary-forced.1 | outline-color | Highlight | Honor system focus on native disclosures. Use the platform focus role. | Find controls in the requested high-contrast palette. | proposed |

## catalog-disclosed-content

Selector: `.ui-accordion[open] > summary + *, .ui-collapse[open] > summary + *, .ui-sidebar[open] > summary + *, .ui-trace[open] > summary + *`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-disclosed-content.1 | margin-block-start | var(--ui-space-sm) | Separate revealed content from its control. Use a related-content gap. | Read the revealed content as part of the selected explanation. | proposed |

## catalog-accordion

Selector: `.ui-accordion + .ui-accordion`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-accordion.1 | margin-block-start | var(--ui-space-sm) | Group related optional explanations. Separate peer summaries without splitting the family. | Expand one named explanation while keeping other summaries reachable. | proposed |

## catalog-collapse

Selector: `.ui-collapse`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-collapse.1 | background-color | var(--ui-subtle) | Disclose optional supporting material. Use the existing optional-support plane. | Open and close an explanation with native Enter/Space behavior. | proposed |

## catalog-sidebar

Selector: `.ui-sidebar`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-sidebar.1 | max-inline-size | 24rem | Group optional navigation or support next to content. Keep support navigation at a bounded measure. | Reveal a named support list without sacrificing source order. | proposed |

## catalog-trace

Selector: `.ui-trace ol`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-trace.1 | padding-inline-start | 4ch | Group a supplied sequence of diagnostic steps. Reserve native step-number space. | Inspect an ordered explanation without mistaking it for live execution. | proposed |

## catalog-alert

Selector: `.ui-alert`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-alert.1 | padding | var(--ui-space-lg) | Make a condition and its next step readable together. Keep condition and next step clear of the edge. | Recognize an important message from its wording and structure. | proposed |
| catalog-alert.2 | border-inline-start | var(--ui-notice-stroke) solid var(--ui-border) | Make a condition and its next step readable together. Identify guidance with the neutral governed stroke. | Recognize an important message from its wording and structure. | proposed |
| catalog-alert.3 | background-color | var(--ui-subtle) | Make a condition and its next step readable together. Keep routine guidance quiet. | Recognize an important message from its wording and structure. | proposed |

## catalog-empty

Selector: `.ui-empty-state`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-empty.1 | padding | var(--ui-space-section) | Explain missing data and one recovery destination. Give absence and recovery a clear working area. | Distinguish an empty example from an error or loading state. | proposed |
| catalog-empty.2 | border | 1px dashed var(--ui-border) | Explain missing data and one recovery destination. Distinguish a placeholder from populated content. | Distinguish an empty example from an error or loading state. | proposed |
| catalog-empty.3 | border-radius | var(--ui-radius-small) | Explain missing data and one recovery destination. Use the bounded-support shape. | Distinguish an empty example from an error or loading state. | proposed |

## catalog-avatar

Selector: `.ui-avatar`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-avatar.1 | display | inline-grid | Show an identity thumbnail or initials. Center authored initials within a compact mark. | Associate a written person name with a compact identity mark. | proposed |
| catalog-avatar.2 | place-items | center | Show an identity thumbnail or initials. Align initials on both axes. | Associate a written person name with a compact identity mark. | proposed |
| catalog-avatar.3 | inline-size | var(--ui-swatch-size) | Show an identity thumbnail or initials. Use the governed visual sample size. | Associate a written person name with a compact identity mark. | proposed |
| catalog-avatar.4 | aspect-ratio | 1 | Show an identity thumbnail or initials. Reserve a square before cropping. | Associate a written person name with a compact identity mark. | proposed |
| catalog-avatar.5 | border-radius | 50% | Show an identity thumbnail or initials. Distinguish identity from an action. | Associate a written person name with a compact identity mark. | proposed |
| catalog-avatar.6 | border | 1px solid var(--ui-border) | Show an identity thumbnail or initials. Keep the silhouette visible. | Associate a written person name with a compact identity mark. | proposed |
| catalog-avatar.7 | background-color | var(--ui-subtle) | Show an identity thumbnail or initials. Use a checked neutral plane. | Associate a written person name with a compact identity mark. | proposed |
| catalog-avatar.8 | font-weight | 600 | Show an identity thumbnail or initials. Keep short initials identifiable. | Associate a written person name with a compact identity mark. | proposed |

## catalog-badge

Selector: `.ui-badge`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-badge.1 | display | inline-block | Keep short metadata visibly grouped. Keep short metadata together. | Read a state or category without depending on a colored dot. | proposed |
| catalog-badge.2 | padding | var(--ui-space-xs) var(--ui-space-sm) | Keep short metadata visibly grouped. Inset text by the governed compact steps. | Read a state or category without depending on a colored dot. | proposed |
| catalog-badge.3 | border | 1px solid var(--ui-border) | Keep short metadata visibly grouped. Provide a visible non-color boundary. | Read a state or category without depending on a colored dot. | proposed |
| catalog-badge.4 | border-radius | var(--ui-radius-small) | Keep short metadata visibly grouped. Use the short-label shape. | Read a state or category without depending on a colored dot. | proposed |
| catalog-badge.5 | font-size | 0.875rem | Keep short metadata visibly grouped. Use the readable secondary size. | Read a state or category without depending on a colored dot. | proposed |

## catalog-aura

Selector: `.ui-aura`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-aura.1 | padding | var(--ui-space-lg) | Demonstrate an optional accent frame without tinting a large work area. Separate the requested accent from text. | Locate the explicitly labelled example emphasis without confusing it with focus. | proposed |
| catalog-aura.2 | border | var(--ui-switch-stroke) solid transparent | Demonstrate an optional accent frame without tinting a large work area. Reserve a governed area for the optional border treatment. | Locate the explicitly labelled example emphasis without confusing it with focus. | proposed |
| catalog-aura.3 | border-radius | var(--ui-radius-panel) | Demonstrate an optional accent frame without tinting a large work area. Keep the outer shape a containing group. | Locate the explicitly labelled example emphasis without confusing it with focus. | proposed |
| catalog-aura.4 | background | linear-gradient(var(--ui-surface), var(--ui-surface)) padding-box, conic-gradient(var(--ui-interactive), var(--ui-divider), var(--ui-interactive)) border-box | Demonstrate an optional accent frame without tinting a large work area. Limit the static accent to the border while keeping the reading field neutral. | Locate the explicitly labelled example emphasis without confusing it with focus. | proposed |

## catalog-aspect-ratio

Selector: `.ui-aspect-ratio`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-aspect-ratio.1 | aspect-ratio | 16 / 9 | Reserve a predictable media frame. Reserve a familiar wide media rectangle. | Inspect media without distortion or layout jumps. | proposed |
| catalog-aspect-ratio.2 | display | grid | Reserve a predictable media frame. Keep media within the reserved frame. | Inspect media without distortion or layout jumps. | proposed |
| catalog-aspect-ratio.3 | background-color | var(--ui-subtle) | Reserve a predictable media frame. Keep letterboxed space neutral. | Inspect media without distortion or layout jumps. | proposed |

## catalog-aspect-image

Selector: `.ui-aspect-ratio img`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-aspect-image.1 | inline-size | 100% | Keep the whole supplied image within its frame. Fit the frame width. | Inspect media without distortion or essential cropping. | proposed |
| catalog-aspect-image.2 | block-size | 100% | Keep the whole supplied image within its frame. Fit its reserved height. | Inspect media without distortion or essential cropping. | proposed |
| catalog-aspect-image.3 | min-block-size | 0 | Keep the whole supplied image within its frame. Permit grid shrinking. | Inspect media without distortion or essential cropping. | proposed |
| catalog-aspect-image.4 | object-fit | contain | Keep the whole supplied image within its frame. Preserve the full source aspect ratio. | Inspect media without distortion or essential cropping. | proposed |

## catalog-attachment

Selector: `.ui-attachment`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-attachment.1 | display | inline-flex | Present an explicitly named file destination. Group the file name with its metadata. | Open the supplied local sample without a disguised action or automatic upload. | proposed |
| catalog-attachment.2 | flex-wrap | wrap | Present an explicitly named file destination. Keep long metadata within the host. | Open the supplied local sample without a disguised action or automatic upload. | proposed |
| catalog-attachment.3 | gap | var(--ui-space-sm) | Present an explicitly named file destination. Separate name and format. | Open the supplied local sample without a disguised action or automatic upload. | proposed |
| catalog-attachment.4 | padding | var(--ui-space-md) | Present an explicitly named file destination. Give the destination an inspection target. | Open the supplied local sample without a disguised action or automatic upload. | proposed |
| catalog-attachment.5 | border | 1px solid var(--ui-border) | Present an explicitly named file destination. Identify the supplied file destination. | Open the supplied local sample without a disguised action or automatic upload. | proposed |
| catalog-attachment.6 | min-block-size | var(--ui-control-min) | Present an explicitly named file destination. Protect the target minimum. | Open the supplied local sample without a disguised action or automatic upload. | proposed |

## catalog-navigation-lists

Selector: `.ui-breadcrumb ol, .ui-pagination ol, .ui-tab-links, .ui-dock, .ui-menu ul`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-navigation-lists.1 | display | flex | Keep ordinary destinations in predictable source order. Group related destinations. | Navigate real links without fake application-menu semantics. | proposed |
| catalog-navigation-lists.2 | flex-wrap | wrap | Keep ordinary destinations in predictable source order. Keep long labels visible. | Navigate real links without fake application-menu semantics. | proposed |
| catalog-navigation-lists.3 | gap | var(--ui-space-sm) | Keep ordinary destinations in predictable source order. Separate native targets. | Navigate real links without fake application-menu semantics. | proposed |
| catalog-navigation-lists.4 | list-style-type | none | Keep ordinary destinations in predictable source order. Remove decorative bullets while retaining explicit list semantics. | Navigate real links without fake application-menu semantics. | proposed |
| catalog-navigation-lists.5 | padding | 0 | Keep ordinary destinations in predictable source order. Let the host own the inset. | Navigate real links without fake application-menu semantics. | proposed |
| catalog-navigation-lists.6 | margin | 0 | Keep ordinary destinations in predictable source order. Avoid duplicate list gaps. | Navigate real links without fake application-menu semantics. | proposed |

## catalog-navigation-menu

Selector: `.ui-menu ul`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-navigation-menu.1 | flex-direction | column | Keep destinations grouped and keyboard reachable. Present a vertical list of ordinary destinations. | Navigate named destinations with ordinary links and tab order. | proposed |

## catalog-breadcrumb

Selector: `.ui-breadcrumb [aria-current="page"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-breadcrumb.1 | font-weight | 600 | Express a real navigation hierarchy. Identify the current location beyond color. | Find the parent destination and identify the current page. | proposed |

## catalog-pagination

Selector: `.ui-pagination [aria-current="page"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-pagination.1 | font-weight | 600 | Express the current position and available page destinations. Distinguish the current index. | Navigate a known page without confusing a visual index with loaded data. | proposed |
| catalog-pagination.2 | border-block-end | 2px solid currentColor | Express the current position and available page destinations. Give the current page a non-color cue. | Navigate a known page without confusing a visual index with loaded data. | proposed |

## catalog-tabs

Selector: `.ui-tabs`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-tabs.1 | display | grid | Offer linked destinations or a native choice between preloaded panels. Keep native choices before their panels. | Choose a labelled preview without a fake ARIA tab state. | proposed |
| catalog-tabs.2 | gap | var(--ui-space-sm) | Offer linked destinations or a native choice between preloaded panels. Clear choice focus. | Choose a labelled preview without a fake ARIA tab state. | proposed |
| catalog-tabs.3 | border | 0 | Offer linked destinations or a native choice between preloaded panels. Retain the legend without another frame. | Choose a labelled preview without a fake ARIA tab state. | proposed |
| catalog-tabs.4 | padding | 0 | Offer linked destinations or a native choice between preloaded panels. Use the containing inset. | Choose a labelled preview without a fake ARIA tab state. | proposed |
| catalog-tabs.5 | margin | 0 | Offer linked destinations or a native choice between preloaded panels. Remove default fieldset outer gaps. | Choose a labelled preview without a fake ARIA tab state. | proposed |

## catalog-tab-links

Selector: `.ui-tab-links a`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-tab-links.1 | padding | var(--ui-space-sm) | Distinguish destination links without fake tab roles. Inset the written label. | Follow a real destination using normal keyboard activation. | proposed |
| catalog-tab-links.2 | border-block-end | 2px solid var(--ui-divider) | Distinguish destination links without fake tab roles. Identify the row of destinations. | Follow a real destination using normal keyboard activation. | proposed |
| catalog-tab-links.3 | min-block-size | var(--ui-control-min) | Distinguish destination links without fake tab roles. Protect native link activation. | Follow a real destination using normal keyboard activation. | proposed |

## catalog-nav-targets

Selector: `.ui-breadcrumb a, .ui-pagination a, .ui-dock a, .ui-menu a`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-nav-targets.1 | display | inline-flex | Keep component navigation usable. Allow minimum dimensions on real links. | Activate named destinations accurately. | proposed |
| catalog-nav-targets.2 | align-items | center | Keep component navigation usable. Center text within the target. | Activate named destinations accurately. | proposed |
| catalog-nav-targets.3 | min-block-size | var(--ui-control-min) | Keep component navigation usable. Use the pointer-specific target floor. | Activate named destinations accurately. | proposed |
| catalog-nav-targets.4 | padding-inline | var(--ui-space-sm) | Keep component navigation usable. Clear the label from peer links. | Activate named destinations accurately. | proposed |

## catalog-navbar

Selector: `.ui-navbar`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-navbar.1 | display | flex | Group identity and primary destinations. Keep identity and destinations related. | Locate navigation that wraps rather than disappearing on narrow screens. | proposed |
| catalog-navbar.2 | flex-wrap | wrap | Group identity and primary destinations. Preserve every destination on mobile. | Locate navigation that wraps rather than disappearing on narrow screens. | proposed |
| catalog-navbar.3 | align-items | center | Group identity and primary destinations. Align identity with links. | Locate navigation that wraps rather than disappearing on narrow screens. | proposed |
| catalog-navbar.4 | justify-content | space-between | Group identity and primary destinations. Separate roles without changing DOM order. | Locate navigation that wraps rather than disappearing on narrow screens. | proposed |
| catalog-navbar.5 | gap | var(--ui-space-md) | Group identity and primary destinations. Keep a local group gap. | Locate navigation that wraps rather than disappearing on narrow screens. | proposed |
| catalog-navbar.6 | padding | var(--ui-space-lg) | Group identity and primary destinations. Clear text and native targets. | Locate navigation that wraps rather than disappearing on narrow screens. | proposed |
| catalog-navbar.7 | background-color | var(--ui-subtle) | Group identity and primary destinations. Use a quiet navigation plane. | Locate navigation that wraps rather than disappearing on narrow screens. | proposed |

## catalog-dock

Selector: `.ui-dock`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-dock.1 | justify-content | space-around | Group a small set of working-area destinations. Distribute the small destination set. | Find the current location without floating over document content. | proposed |
| catalog-dock.2 | border-block-start | 1px solid var(--ui-divider) | Group a small set of working-area destinations. Expose the local navigation boundary. | Find the current location without floating over document content. | proposed |
| catalog-dock.3 | padding | var(--ui-space-sm) | Group a small set of working-area destinations. Clear native link focus. | Find the current location without floating over document content. | proposed |

## catalog-footer

Selector: `.ui-footer`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-footer.1 | display | flex | Group document-end information and destinations. Group closing text and destinations. | Find supporting links without confusing them with the main task. | proposed |
| catalog-footer.2 | flex-wrap | wrap | Group document-end information and destinations. Preserve closing content on narrow screens. | Find supporting links without confusing them with the main task. | proposed |
| catalog-footer.3 | gap | var(--ui-space-lg) | Group document-end information and destinations. Separate footer purposes. | Find supporting links without confusing them with the main task. | proposed |
| catalog-footer.4 | padding-block | var(--ui-space-lg) | Group document-end information and destinations. Give closing information reading clearance. | Find supporting links without confusing them with the main task. | proposed |
| catalog-footer.5 | border-block-start | 1px solid var(--ui-divider) | Group document-end information and destinations. Mark the end of main content. | Find supporting links without confusing them with the main task. | proposed |

## catalog-hero

Selector: `.ui-hero`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-hero.1 | padding | var(--ui-space-section) | Introduce one purpose and a next destination. Give the introduction a clear start. | Understand the surface before choosing an action. | proposed |
| catalog-hero.2 | background-color | var(--ui-subtle) | Introduce one purpose and a next destination. Keep the large field neutral. | Understand the surface before choosing an action. | proposed |
| catalog-hero.3 | max-inline-size | 65ch | Introduce one purpose and a next destination. Bound sustained introductory copy. | Understand the surface before choosing an action. | proposed |

## catalog-chat

Selector: `.ui-chat`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-chat.1 | display | grid | Group author, timestamp and message content. Keep author, body and time in order. | Read who said what without relying on left/right alignment or hue alone. | proposed |
| catalog-chat.2 | gap | var(--ui-space-sm) | Group author, timestamp and message content. Separate message parts without extra cards. | Read who said what without relying on left/right alignment or hue alone. | proposed |

## catalog-bubble

Selector: `.ui-bubble`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-bubble.1 | padding | var(--ui-space-md) | Bound supplied conversation text. Use the local message inset. | Read a message as belonging to its written author. | proposed |
| catalog-bubble.2 | border-radius | var(--ui-radius-panel) | Bound supplied conversation text. Identify the message group. | Read a message as belonging to its written author. | proposed |
| catalog-bubble.3 | background-color | var(--ui-subtle) | Bound supplied conversation text. Use a neutral conversation plane. | Read a message as belonging to its written author. | proposed |
| catalog-bubble.4 | max-inline-size | 65ch | Bound supplied conversation text. Keep message lines readable. | Read a message as belonging to its written author. | proposed |

## catalog-message

Selector: `.ui-message`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-message.1 | margin | 0 | Separate message content from its metadata. Let the chat gap own separation. | Read exact wording without depending on alignment. | proposed |
| catalog-message.2 | overflow-wrap | anywhere | Separate message content from its metadata. Keep long message tokens bounded. | Read exact wording without depending on alignment. | proposed |

## catalog-item

Selector: `.ui-item-list`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-item.1 | list-style-type | none | Present comparable named rows. Use comparable rows with explicit list semantics. | Scan items and use their explicit links without making whole rows clickable. | proposed |
| catalog-item.2 | padding | 0 | Present comparable named rows. Let each item own its inset. | Scan items and use their explicit links without making whole rows clickable. | proposed |
| catalog-item.3 | margin | 0 | Present comparable named rows. Avoid duplicate list outer gaps. | Scan items and use their explicit links without making whole rows clickable. | proposed |

## catalog-item-row

Selector: `.ui-item`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-item-row.1 | display | flex | Separate supplied records from peers. Keep record information and link together. | Scan the named record and its explicit destination. | proposed |
| catalog-item-row.2 | flex-wrap | wrap | Separate supplied records from peers. Preserve long names. | Scan the named record and its explicit destination. | proposed |
| catalog-item-row.3 | justify-content | space-between | Separate supplied records from peers. Separate content and action without reordering. | Scan the named record and its explicit destination. | proposed |
| catalog-item-row.4 | gap | var(--ui-space-sm) | Separate supplied records from peers. Leave focus room around links. | Scan the named record and its explicit destination. | proposed |
| catalog-item-row.5 | padding | var(--ui-space-md) | Separate supplied records from peers. Inset each record. | Scan the named record and its explicit destination. | proposed |
| catalog-item-row.6 | border-block-end | 1px solid var(--ui-divider) | Separate supplied records from peers. Separate records quietly. | Scan the named record and its explicit destination. | proposed |

## catalog-kbd

Selector: `.ui-kbd`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-kbd.1 | font-family | ui-monospace, Consolas, monospace | Distinguish a key name from an app control. Identify literal key names. | Read a keyboard instruction without trying to click the keycap. | proposed |
| catalog-kbd.2 | padding | 0 var(--ui-space-xs) | Distinguish a key name from an app control. Leave inline clearance without inflating line rhythm. | Read a keyboard instruction without trying to click the keycap. | proposed |
| catalog-kbd.3 | border | 1px solid var(--ui-border) | Distinguish a key name from an app control. Identify a noninteractive keycap. | Read a keyboard instruction without trying to click the keycap. | proposed |
| catalog-kbd.4 | border-radius | var(--ui-radius-small) | Distinguish a key name from an app control. Use the bounded-control shape. | Read a keyboard instruction without trying to click the keycap. | proposed |

## catalog-marker

Selector: `.ui-marker`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-marker.1 | color | var(--ui-ink) | Identify a relevant text fragment. Keep the phrase readable. | Find the marked phrase without interpreting an alarm color. | proposed |
| catalog-marker.2 | background-color | var(--ui-subtle) | Identify a relevant text fragment. Avoid default yellow/status coloring. | Find the marked phrase without interpreting an alarm color. | proposed |
| catalog-marker.3 | outline | 1px solid currentColor | Identify a relevant text fragment. Expose a non-color highlight boundary. | Find the marked phrase without interpreting an alarm color. | proposed |

## catalog-direction

Selector: `.ui-direction`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-direction.1 | text-align | start | Respect the document language direction through logical layout. Let native dir choose the reading edge. | Read mixed direction content without visual order hacks. | proposed |
| catalog-direction.2 | border-inline-start | var(--ui-notice-stroke) solid var(--ui-border) | Respect the document language direction through logical layout. Demonstrate a logical start boundary. | Read mixed direction content without visual order hacks. | proposed |
| catalog-direction.3 | padding-inline-start | var(--ui-space-md) | Respect the document language direction through logical layout. Clear text from the direction-aware boundary. | Read mixed direction content without visual order hacks. | proposed |

## catalog-popover-panels

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-popover-panels.1 | padding | var(--ui-space-lg) | Style browser-owned nonmodal top-layer surfaces. Clear reading text and focus. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.2 | border | 1px solid var(--ui-border) | Style browser-owned nonmodal top-layer surfaces. Expose the top-layer boundary. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.3 | border-radius | var(--ui-radius-small) | Style browser-owned nonmodal top-layer surfaces. Use the support-surface shape. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.4 | background-color | var(--ui-surface) | Style browser-owned nonmodal top-layer surfaces. Use a checked opaque plane. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.5 | color | var(--ui-ink) | Style browser-owned nonmodal top-layer surfaces. Keep support text readable. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.6 | max-inline-size | min(32rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | Style browser-owned nonmodal top-layer surfaces. Fit the surface within narrow viewports. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.7 | max-block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | Style browser-owned nonmodal top-layer surfaces. Fit enlarged content inside the dynamic viewport. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.8 | overflow | auto | Style browser-owned nonmodal top-layer surfaces. Keep long content reachable. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.9 | margin | var(--ui-space-sm) | Style browser-owned nonmodal top-layer surfaces. Clear the popup from its invoker. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.10 | inset | auto | Style browser-owned nonmodal top-layer surfaces. Replace UA viewport centering with implicit-anchor placement. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.11 | position-area | block-end | Style browser-owned nonmodal top-layer surfaces. Place support beside its native invoker. | Read support while native dismissal and relationships remain authoritative. | proposed |
| catalog-popover-panels.12 | position-try-fallbacks | flip-block, flip-inline | Style browser-owned nonmodal top-layer surfaces. Allow placement on another side when edges lack space. | Read support while native dismissal and relationships remain authoritative. | proposed |

## catalog-popover

Selector: `.ui-popover`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-popover.1 | inline-size | min(28rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | Show nonmodal supporting information in the top layer. Give this support type useful bounded width while preserving viewport clearance. | Open a named surface and dismiss it with Escape or a click outside. | proposed |

## catalog-dropdown

Selector: `.ui-dropdown`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-dropdown.1 | inline-size | min(20rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | Expose a compact group of navigation links on request. Give this support type useful bounded width while preserving viewport clearance. | Open the link group and navigate it with ordinary Tab/Enter. | proposed |

## catalog-hover-card

Selector: `.ui-hover-card`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-hover-card.1 | inline-size | min(24rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | Show a supplementary preview without replacing the primary link. Give this support type useful bounded width while preserving viewport clearance. | Inspect extra context on hover, focus or explicit click. | proposed |

## catalog-tooltip

Selector: `.ui-tooltip`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-tooltip.1 | inline-size | min(24rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | Offer supplementary noninteractive help without hiding required instructions. Give this support type useful bounded width while preserving viewport clearance. | Read help on hover/focus/click and dismiss it without moving focus. | proposed |

## catalog-megamenu

Selector: `.ui-megamenu`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-megamenu.1 | inline-size | min(40rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | Group several destination categories in one requested surface. Give this support type useful bounded width while preserving viewport clearance. | Open grouped links with ordinary keyboard navigation and native dismissal. | proposed |

## catalog-tooltip-type

Selector: `.ui-tooltip`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-tooltip-type.1 | font-size | 0.875rem | Keep optional help readable without overpowering its invoker. Use the protected readable help size. | Read supplementary help in the established secondary size. | proposed |

## catalog-megamenu-grid

Selector: `.ui-megamenu > div`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-megamenu-grid.1 | display | grid | Lay out destination categories within a native popover. Keep categories together. | Find grouped destinations without panning the page. | proposed |
| catalog-megamenu-grid.2 | grid-template-columns | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | Lay out destination categories within a native popover. Fit columns only when each has useful width. | Find grouped destinations without panning the page. | proposed |
| catalog-megamenu-grid.3 | gap | var(--ui-space-lg) | Lay out destination categories within a native popover. Separate destination categories. | Find grouped destinations without panning the page. | proposed |

## catalog-modal-panels

Selector: `.ui-modal, .ui-alert-dialog, .ui-drawer, .ui-sheet`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-modal-panels.1 | inline-size | min(32rem, calc(100% - 2 * var(--ui-dialog-clearance))) | Bound browser-owned modal surfaces. Preserve governed outer clearance. | Dismiss support natively while keeping long content reachable. | proposed |
| catalog-modal-panels.2 | max-block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | Bound browser-owned modal surfaces. Fit the dynamic viewport. | Dismiss support natively while keeping long content reachable. | proposed |
| catalog-modal-panels.3 | padding | var(--ui-space-xl) | Bound browser-owned modal surfaces. Clear text and safe-close focus from the edge. | Dismiss support natively while keeping long content reachable. | proposed |
| catalog-modal-panels.4 | overflow | auto | Bound browser-owned modal surfaces. Keep enlarged content reachable. | Dismiss support natively while keeping long content reachable. | proposed |

## catalog-dialog

Selector: `.ui-modal`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-dialog.1 | border-radius | var(--ui-radius-panel) | Present a bounded modal surface with native focus handling. Use the containing-group modal shape. | Read and dismiss a blocking explanation without losing the opener. | proposed |

## catalog-alert-dialog

Selector: `.ui-alert-dialog`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-alert-dialog.1 | border-inline-start-width | var(--ui-notice-stroke) | Focus a blocking example decision in the native top layer. Give the blocking decision a restrained neutral start emphasis. | Read the decision and cancel safely with native focus return. | proposed |

## catalog-drawer

Selector: `.ui-drawer`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-drawer.1 | inset-inline-start | auto | Place a named modal support surface at an edge. Align to the inline end. | Open and dismiss an edge panel with native focus and Escape behavior. | proposed |
| catalog-drawer.2 | inset-inline-end | var(--ui-dialog-clearance) | Place a named modal support surface at an edge. Preserve outer edge clearance. | Open and dismiss an edge panel with native focus and Escape behavior. | proposed |
| catalog-drawer.3 | inset-block | var(--ui-dialog-clearance) | Place a named modal support surface at an edge. Leave visible top/bottom edges. | Open and dismiss an edge panel with native focus and Escape behavior. | proposed |
| catalog-drawer.4 | margin | 0 | Place a named modal support surface at an edge. Prevent UA auto-centering. | Open and dismiss an edge panel with native focus and Escape behavior. | proposed |
| catalog-drawer.5 | inline-size | min(24rem, calc(100% - 2 * var(--ui-dialog-clearance))) | Place a named modal support surface at an edge. Keep support narrow and mobile-bounded. | Open and dismiss an edge panel with native focus and Escape behavior. | proposed |
| catalog-drawer.6 | block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | Place a named modal support surface at an edge. Use available height with outer clearance. | Open and dismiss an edge panel with native focus and Escape behavior. | proposed |

## catalog-sheet

Selector: `.ui-sheet`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-sheet.1 | inset-block-start | auto | Place a blocking support surface along the lower edge. Place support near the bottom. | Read and dismiss supplementary content with native modal behavior. | proposed |
| catalog-sheet.2 | inset-block-end | var(--ui-dialog-clearance) | Place a blocking support surface along the lower edge. Preserve bottom outer clearance. | Read and dismiss supplementary content with native modal behavior. | proposed |
| catalog-sheet.3 | margin-block | 0 | Place a blocking support surface along the lower edge. Avoid vertical auto-centering. | Read and dismiss supplementary content with native modal behavior. | proposed |
| catalog-sheet.4 | inline-size | min(48rem, calc(100% - 2 * var(--ui-dialog-clearance))) | Place a blocking support surface along the lower edge. Allow wider support without mobile overflow. | Read and dismiss supplementary content with native modal behavior. | proposed |

## catalog-carousel

Selector: `.ui-carousel`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-carousel.1 | display | flex | Offer an ordered horizontally scrollable set of panels. Keep supplied panels in real horizontal order. | Reach every panel through native scrolling and named fragment links. | proposed |
| catalog-carousel.2 | gap | var(--ui-space-lg) | Offer an ordered horizontally scrollable set of panels. Separate panel boundaries. | Reach every panel through native scrolling and named fragment links. | proposed |
| catalog-carousel.3 | overflow-x | auto | Offer an ordered horizontally scrollable set of panels. Keep scrolling local and native. | Reach every panel through native scrolling and named fragment links. | proposed |
| catalog-carousel.4 | scroll-snap-type | x proximity | Offer an ordered horizontally scrollable set of panels. Help settle near panels without mandatory scroll trapping. | Reach every panel through native scrolling and named fragment links. | proposed |
| catalog-carousel.5 | padding | var(--ui-space-sm) | Offer an ordered horizontally scrollable set of panels. Clear focus around links in slides. | Reach every panel through native scrolling and named fragment links. | proposed |

## catalog-slide

Selector: `.ui-slide`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-slide.1 | flex | 0 0 100% | Give one supplied panel a local viewport. Keep panels from becoming squeezed fragments. | Inspect one panel and reach peers without auto-rotation. | proposed |
| catalog-slide.2 | scroll-snap-align | start | Give one supplied panel a local viewport. Settle at the reading start. | Inspect one panel and reach peers without auto-rotation. | proposed |
| catalog-slide.3 | padding | var(--ui-space-lg) | Give one supplied panel a local viewport. Clear panel contents. | Inspect one panel and reach peers without auto-rotation. | proposed |
| catalog-slide.4 | border | 1px solid var(--ui-divider) | Give one supplied panel a local viewport. Identify peer panels. | Inspect one panel and reach peers without auto-rotation. | proposed |
| catalog-slide.5 | min-inline-size | 0 | Give one supplied panel a local viewport. Let supplied text wrap. | Inspect one panel and reach peers without auto-rotation. | proposed |

## catalog-code-block

Selector: `.ui-code-block`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-code-block.1 | max-inline-size | 100% | Bound exact source content and its label. Bound source by its host. | Inspect selectable source with local scrolling. | proposed |
| catalog-code-block.2 | overflow | auto | Bound exact source content and its label. Preserve long lines with local scrolling. | Inspect selectable source with local scrolling. | proposed |
| catalog-code-block.3 | white-space | pre | Bound exact source content and its label. Keep source whitespace exact. | Inspect selectable source with local scrolling. | proposed |
| catalog-code-block.4 | overflow-wrap | normal | Bound exact source content and its label. Do not split literal source. | Inspect selectable source with local scrolling. | proposed |
| catalog-code-block.5 | padding | var(--ui-space-lg) | Bound exact source content and its label. Clear source and focus. | Inspect selectable source with local scrolling. | proposed |
| catalog-code-block.6 | background-color | var(--ui-subtle) | Bound exact source content and its label. Use a neutral source plane. | Inspect selectable source with local scrolling. | proposed |

## catalog-scroll-area

Selector: `.ui-scroll-area`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-scroll-area.1 | max-block-size | 12rem | Bound an inspection region without clipping content. Give the inspection region a bounded initial viewport. | Reach overflow by keyboard, pointer and native scrollbar. | proposed |
| catalog-scroll-area.2 | overflow | auto | Bound an inspection region without clipping content. Keep all content natively reachable. | Reach overflow by keyboard, pointer and native scrollbar. | proposed |
| catalog-scroll-area.3 | padding | var(--ui-space-lg) | Bound an inspection region without clipping content. Clear reading and focus. | Reach overflow by keyboard, pointer and native scrollbar. | proposed |
| catalog-scroll-area.4 | border | 1px solid var(--ui-border) | Bound an inspection region without clipping content. Identify independent scrolling. | Reach overflow by keyboard, pointer and native scrollbar. | proposed |

## catalog-resizable

Selector: `.ui-resizable`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-resizable.1 | inline-size | min(100%, 28rem) | Allow native CSS resizing of a bounded example workspace. Start at a bounded inspection width. | Enlarge a nonessential inspection area while its content remains reachable. | proposed |
| catalog-resizable.2 | max-inline-size | 100% | Allow native CSS resizing of a bounded example workspace. Prevent resizing past its host. | Enlarge a nonessential inspection area while its content remains reachable. | proposed |
| catalog-resizable.3 | min-block-size | 6rem | Allow native CSS resizing of a bounded example workspace. Keep a useful initial inspection area. | Enlarge a nonessential inspection area while its content remains reachable. | proposed |
| catalog-resizable.4 | resize | both | Allow native CSS resizing of a bounded example workspace. Expose native pointer resizing, not a split-pane keyboard contract. | Enlarge a nonessential inspection area while its content remains reachable. | proposed |
| catalog-resizable.5 | overflow | auto | Allow native CSS resizing of a bounded example workspace. Make content reachable without resizing. | Enlarge a nonessential inspection area while its content remains reachable. | proposed |
| catalog-resizable.6 | padding | var(--ui-space-lg) | Allow native CSS resizing of a bounded example workspace. Leave internal reading clearance. | Enlarge a nonessential inspection area while its content remains reachable. | proposed |
| catalog-resizable.7 | border | 1px solid var(--ui-border) | Allow native CSS resizing of a bounded example workspace. Identify the resize surface. | Enlarge a nonessential inspection area while its content remains reachable. | proposed |

## catalog-separator

Selector: `.ui-divider`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-separator.1 | border | 0 | Separate topics without extra decorative panels. Remove the browser inset rule before drawing one intended edge. | Recognize a change in content group. | proposed |
| catalog-separator.2 | border-block-start | 1px solid var(--ui-divider) | Separate topics without extra decorative panels. Separate topics with one passive crisp boundary. | Recognize a change in content group. | proposed |
| catalog-separator.3 | margin-block | var(--ui-space-lg) | Separate topics without extra decorative panels. Separate neighboring topics with a governed gap. | Recognize a change in content group. | proposed |

## catalog-progress

Selector: `.ui-progress`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-progress.1 | inline-size | 100% | Display an actual bounded completion amount. Use available width for the supplied amount. | Read the quantity both as text and a native progress value. | proposed |
| catalog-progress.2 | max-inline-size | 100% | Display an actual bounded completion amount. Bound native intrinsic sizing. | Read the quantity both as text and a native progress value. | proposed |
| catalog-progress.3 | accent-color | var(--ui-interactive) | Display an actual bounded completion amount. Use the existing native selection accent. | Read the quantity both as text and a native progress value. | proposed |

## catalog-radial-progress

Selector: `.ui-radial-progress`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-radial-progress.1 | display | inline-grid | Pair a supplied completion amount with a circular graphic. Overlay the decorative ring and real amount. | Read the written percentage and accessible value independently of color. | proposed |
| catalog-radial-progress.2 | place-items | center | Pair a supplied completion amount with a circular graphic. Center the supplied text. | Read the written percentage and accessible value independently of color. | proposed |
| catalog-radial-progress.3 | inline-size | calc(2 * var(--ui-swatch-size)) | Pair a supplied completion amount with a circular graphic. Use the governed visual scale without smaller type. | Read the written percentage and accessible value independently of color. | proposed |
| catalog-radial-progress.4 | aspect-ratio | 1 | Pair a supplied completion amount with a circular graphic. Keep the amount graphic square. | Read the written percentage and accessible value independently of color. | proposed |
| catalog-radial-progress.5 | border-radius | 50% | Pair a supplied completion amount with a circular graphic. Make the graphic circular. | Read the written percentage and accessible value independently of color. | proposed |
| catalog-radial-progress.6 | background | conic-gradient(var(--ui-interactive) calc(attr(aria-valuenow type(<number>), 0) * 3.6deg), var(--ui-divider) 0deg) | Pair a supplied completion amount with a circular graphic. Derive the graphic from the accessible percentage rather than a second independently authored value. | Read the written percentage and accessible value independently of color. | proposed |

## catalog-radial-hole

Selector: `.ui-radial-progress::before`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-radial-hole.1 | content | "" | Keep the ring center a readable neutral plane. Draw only a decorative center. | Read the amount without text over competing colors. | proposed |
| catalog-radial-hole.2 | grid-area | 1 / 1 | Keep the ring center a readable neutral plane. Place the center behind text in one grid cell. | Read the amount without text over competing colors. | proposed |
| catalog-radial-hole.3 | inline-size | calc(100% - 2 * var(--ui-space-sm)) | Keep the ring center a readable neutral plane. Apply governed ring thickness. | Read the amount without text over competing colors. | proposed |
| catalog-radial-hole.4 | aspect-ratio | 1 | Keep the ring center a readable neutral plane. Keep the center square before cropping. | Read the amount without text over competing colors. | proposed |
| catalog-radial-hole.5 | border-radius | 50% | Keep the ring center a readable neutral plane. Match the circular outer edge. | Read the amount without text over competing colors. | proposed |
| catalog-radial-hole.6 | background-color | var(--ui-surface) | Keep the ring center a readable neutral plane. Use checked text/background pairing. | Read the amount without text over competing colors. | proposed |

## catalog-radial-label

Selector: `.ui-radial-progress > span`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-radial-label.1 | grid-area | 1 / 1 | Keep the supplied amount above its decorative center. Overlay real text after the decorative center. | Read the percentage independently of the circular graphic. | proposed |
| catalog-radial-label.2 | position | relative | Keep the supplied amount above its decorative center. Paint text above the center without a z-index ladder. | Read the percentage independently of the circular graphic. | proposed |
| catalog-radial-label.3 | color | var(--ui-ink) | Keep the supplied amount above its decorative center. Use checked reading ink. | Read the percentage independently of the circular graphic. | proposed |

## catalog-skeleton

Selector: `.ui-skeleton`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-skeleton.1 | min-block-size | var(--ui-swatch-size) | Reserve the shape of forthcoming content. Reserve a governed placeholder shape. | Recognize placeholder structure alongside written loading text. | proposed |
| catalog-skeleton.2 | border | 1px dashed var(--ui-border) | Reserve the shape of forthcoming content. Identify placeholder structure without pulsing. | Recognize placeholder structure alongside written loading text. | proposed |
| catalog-skeleton.3 | background-color | var(--ui-subtle) | Reserve the shape of forthcoming content. Keep loading placeholders neutral. | Recognize placeholder structure alongside written loading text. | proposed |
| catalog-skeleton.4 | border-radius | var(--ui-radius-small) | Reserve the shape of forthcoming content. Relate the placeholder to bounded content. | Recognize placeholder structure alongside written loading text. | proposed |

## catalog-spinner

Selector: `.ui-spinner`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-spinner.1 | display | inline-block | Supplement a written loading state with an optional motion cue. Keep a small decorative work cue beside written text. | Recognize ongoing work without motion being the only information. | proposed |
| catalog-spinner.2 | inline-size | 1.25rem | Supplement a written loading state with an optional motion cue. Use the existing native-mark scale. | Recognize ongoing work without motion being the only information. | proposed |
| catalog-spinner.3 | aspect-ratio | 1 | Supplement a written loading state with an optional motion cue. Reserve a square before cropping. | Recognize ongoing work without motion being the only information. | proposed |
| catalog-spinner.4 | border | var(--ui-switch-stroke) solid var(--ui-border) | Supplement a written loading state with an optional motion cue. Keep the static perimeter crisp with the governed 2px normal / 1px compact stroke. | Recognize ongoing work without motion being the only information. | proposed |
| catalog-spinner.5 | border-block-start-color | var(--ui-interactive) | Supplement a written loading state with an optional motion cue. Distinguish a segment during optional rotation. | Recognize ongoing work without motion being the only information. | proposed |
| catalog-spinner.6 | border-radius | 50% | Supplement a written loading state with an optional motion cue. Keep the work cue circular. | Recognize ongoing work without motion being the only information. | proposed |

## catalog-spin-enabled

Selector: `.ui-motion-preview:has(.ui-motion-enable:checked) .ui-spinner`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-spin-enabled.1 | animation | ui-catalog-spin 1s linear infinite | Enable only the explicitly requested loading preview. Rotate the supplementary cue only after native opt-in. | Inspect motion with written state and an immediate stop control. | proposed |

## catalog-text-rotate

Selector: `.ui-text-rotate`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-text-rotate.1 | display | flex | Demonstrate an optional sequence of supplementary labels. Keep all labels visible in static fallback. | Inspect the effect while the complete wording remains persistently available. | proposed |
| catalog-text-rotate.2 | flex-wrap | wrap | Demonstrate an optional sequence of supplementary labels. Preserve complete supplied wording. | Inspect the effect while the complete wording remains persistently available. | proposed |
| catalog-text-rotate.3 | gap | var(--ui-space-sm) | Demonstrate an optional sequence of supplementary labels. Separate the static labels. | Inspect the effect while the complete wording remains persistently available. | proposed |

## catalog-rotation-layout

Selector: `.ui-motion-preview:has(.ui-motion-enable:checked) .ui-text-rotate`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-rotation-layout.1 | display | grid | Reserve one text position for an explicitly requested effect. Overlay supplementary labels in a stable cell. | Inspect rotation without moving surrounding controls. | proposed |

## catalog-rotation-labels

Selector: `.ui-motion-preview:has(.ui-motion-enable:checked) .ui-text-rotate > span`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-rotation-labels.1 | grid-area | 1 / 1 | Rotate supplementary labels whose wording remains persistent elsewhere. Keep label position stable. | Inspect the effect without losing content. | proposed |
| catalog-rotation-labels.2 | opacity | 0 | Rotate supplementary labels whose wording remains persistent elsewhere. Hide inactive decorative copies, not essential text. | Inspect the effect without losing content. | proposed |
| catalog-rotation-labels.3 | animation | ui-catalog-word 9s linear infinite | Rotate supplementary labels whose wording remains persistent elsewhere. Show three supplementary labels slowly over nine seconds. | Inspect the effect without losing content. | proposed |

## catalog-rotation-second

Selector: `.ui-motion-preview:has(.ui-motion-enable:checked) .ui-text-rotate > span:nth-child(2)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-rotation-second.1 | animation-delay | 3s | Sequence the second supplementary label. Offset by one third of the loop. | Compare labels in a predictable order. | proposed |

## catalog-rotation-third

Selector: `.ui-motion-preview:has(.ui-motion-enable:checked) .ui-text-rotate > span:nth-child(3)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-rotation-third.1 | animation-delay | 6s | Sequence the third supplementary label. Offset by two thirds of the loop. | Compare labels in a predictable order. | proposed |

## catalog-rotation-pause

Selector: `.ui-motion-preview:hover .ui-text-rotate > span, .ui-motion-preview:focus-within .ui-text-rotate > span`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-rotation-pause.1 | animation-play-state | paused | Allow stationary inspection of the optional effect. Pause on hover/focus; the checkbox resets to complete static wording. | Pause rotation while interacting with its preview. | proposed |

## catalog-motion-reduced

Selector: `.ui-motion-preview:has(.ui-motion-enable:checked) .ui-spinner, .ui-motion-preview:has(.ui-motion-enable:checked) .ui-text-rotate > span`; condition: `(prefers-reduced-motion: reduce)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-motion-reduced.1 | animation | none | Honor reduced motion even when the preview is selected. Disable the requested visual motion under the platform preference. | Read the same complete labels without authored animation. | proposed |
| catalog-motion-reduced.2 | opacity | 1 | Honor reduced motion even when the preview is selected. Keep every static label visible. | Read the same complete labels without authored animation. | proposed |
| catalog-motion-reduced.3 | grid-area | auto | Honor reduced motion even when the preview is selected. Return static labels to separate cells. | Read the same complete labels without authored animation. | proposed |

## catalog-spin-frame

Selector: `to`. Source: project. Animation: ui-catalog-spin. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-spin-frame.1 | transform | rotate(1turn) | Define only the explicitly enabled supplementary animation. Complete one optional rotation; reduced motion disables it. | Inspect visual motion without changing essential content or data. | proposed |

## catalog-word-visible

Selector: `0%, 30%`. Source: project. Animation: ui-catalog-word. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-word-visible.1 | opacity | 1 | Define only the explicitly enabled supplementary animation. Keep the current supplementary label readable. | Inspect visual motion without changing essential content or data. | proposed |

## catalog-word-hidden

Selector: `33%, 100%`. Source: project. Animation: ui-catalog-word. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-word-hidden.1 | opacity | 0 | Define only the explicitly enabled supplementary animation. Let the next decorative label occupy the cell while persistent text remains. | Inspect visual motion without changing essential content or data. | proposed |

## catalog-table

Selector: `.ui-data-table`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-table.1 | inline-size | 100% | Keep a small semantic comparison readable. Use the available comparison width. | Compare values under real headers without a custom grid widget. | proposed |
| catalog-table.2 | border-collapse | collapse | Keep a small semantic comparison readable. Avoid doubled record dividers. | Compare values under real headers without a custom grid widget. | proposed |
| catalog-table.3 | overflow-wrap | normal | Keep a small semantic comparison readable. Preserve whole words and use local scrolling for wide data. | Compare values under real headers without a custom grid widget. | proposed |

## catalog-table-cells

Selector: `.ui-data-table th, .ui-data-table td`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-table-cells.1 | padding | var(--ui-space-sm) var(--ui-space-md) | Keep supplied records aligned with real headers. Use governed cell clearance. | Compare rows without compressed words or a heavy full grid. | proposed |
| catalog-table-cells.2 | text-align | start | Keep supplied records aligned with real headers. Align with the reading direction. | Compare rows without compressed words or a heavy full grid. | proposed |
| catalog-table-cells.3 | vertical-align | top | Keep supplied records aligned with real headers. Align multiline record starts. | Compare rows without compressed words or a heavy full grid. | proposed |
| catalog-table-cells.4 | border-block-end | 1px solid var(--ui-divider) | Keep supplied records aligned with real headers. Separate rows quietly. | Compare rows without compressed words or a heavy full grid. | proposed |

## catalog-toast

Selector: `.ui-toast`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-toast.1 | padding | var(--ui-space-lg) | Group a settled notification and its text. Clear settled notification text. | Read feedback without obscuring the active working area. | proposed |
| catalog-toast.2 | border | 1px solid var(--ui-border) | Group a settled notification and its text. Identify the feedback item. | Read feedback without obscuring the active working area. | proposed |
| catalog-toast.3 | border-radius | var(--ui-radius-small) | Group a settled notification and its text. Use the short-support shape. | Read feedback without obscuring the active working area. | proposed |
| catalog-toast.4 | background-color | var(--ui-subtle) | Group a settled notification and its text. Keep feedback neutral and in flow. | Read feedback without obscuring the active working area. | proposed |

## catalog-countdown

Selector: `.ui-countdown`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-countdown.1 | font-variant-numeric | tabular-nums | Keep supplied time fields aligned. Align supplied duration digits. | Read an explicitly static duration example without a misleading running clock. | proposed |
| catalog-countdown.2 | font-family | ui-monospace, Consolas, monospace | Keep supplied time fields aligned. Keep time fields stable without implying ticking. | Read an explicitly static duration example without a misleading running clock. | proposed |
| catalog-countdown.3 | font-size | 1.5rem | Keep supplied time fields aligned. Make the explicitly static duration inspectable. | Read an explicitly static duration example without a misleading running clock. | proposed |

## catalog-diff

Selector: `.ui-diff`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-diff.1 | display | grid | Keep before/after content adjacent for inspection. Keep both supplied versions in peer groups. | Compare both versions without hiding either from keyboard or touch users. | proposed |
| catalog-diff.2 | grid-template-columns | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | Keep before/after content adjacent for inspection. Pair versions only when useful reading width exists. | Compare both versions without hiding either from keyboard or touch users. | proposed |
| catalog-diff.3 | gap | var(--ui-space-lg) | Keep before/after content adjacent for inspection. Separate versions without hiding either. | Compare both versions without hiding either from keyboard or touch users. | proposed |

## catalog-stage

Selector: `.ui-component-stage`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-stage.1 | position | relative | Bound corner-position examples within their own workspace. Make this sample the placement containing block. | Inspect positioning without covering page controls. | proposed |
| catalog-stage.2 | min-block-size | 12rem | Bound corner-position examples within their own workspace. Reserve visible space around the corner action. | Inspect positioning without covering page controls. | proposed |
| catalog-stage.3 | padding | var(--ui-space-lg) | Bound corner-position examples within their own workspace. Clear ordinary stage text. | Inspect positioning without covering page controls. | proposed |
| catalog-stage.4 | padding-block-end | calc(var(--ui-control-min) + 2 * var(--ui-space-lg)) | Bound corner-position examples within their own workspace. Reserve flow room for the corner action instead of covering text. | Inspect positioning without covering page controls. | proposed |
| catalog-stage.5 | border | 1px solid var(--ui-divider) | Bound corner-position examples within their own workspace. Expose the local workspace boundary. | Inspect positioning without covering page controls. | proposed |

## catalog-fab

Selector: `.ui-fab`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-fab.1 | position | absolute | Keep a named corner action and secondary links together. Place the action within its named stage, not the viewport. | Open the extra destinations with native click, keyboard and Escape behavior. | proposed |
| catalog-fab.2 | inset-inline-end | var(--ui-space-lg) | Keep a named corner action and secondary links together. Leave governed edge clearance. | Open the extra destinations with native click, keyboard and Escape behavior. | proposed |
| catalog-fab.3 | inset-block-end | var(--ui-space-lg) | Keep a named corner action and secondary links together. Use the governed bottom clearance. | Open the extra destinations with native click, keyboard and Escape behavior. | proposed |

## catalog-filter

Selector: `.ui-filter`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-filter.1 | display | grid | Filter a bounded preloaded example through native choice state. Keep native criteria before supplied results. | Select a visible criterion and restore all examples with Reset. | proposed |
| catalog-filter.2 | gap | var(--ui-space-md) | Filter a bounded preloaded example through native choice state. Separate criteria from results. | Select a visible criterion and restore all examples with Reset. | proposed |

## catalog-filter-results

Selector: `.ui-filter-results`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-filter-results.1 | display | grid | Keep supplied matching records together. Give results one gap owner. | Read preloaded records matching the native choice. | proposed |
| catalog-filter-results.2 | gap | var(--ui-space-sm) | Keep supplied matching records together. Separate related result items. | Read preloaded records matching the native choice. | proposed |

## catalog-filter-open

Selector: `.ui-filter:has(input[value="open"]:checked) .ui-filter-result:not([data-state="open"])`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-filter-open.1 | display | none | Apply a native criterion to fixed supplied records. Hide only nonmatching preloaded records; Reset restores the default. | Inspect matches without an invented query or result count. | proposed |

## catalog-filter-done

Selector: `.ui-filter:has(input[value="done"]:checked) .ui-filter-result:not([data-state="done"])`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-filter-done.1 | display | none | Apply a native criterion to fixed supplied records. Hide only nonmatching preloaded records; Reset restores the default. | Inspect matches without an invented query or result count. | proposed |

## catalog-hover-3d

Selector: `.ui-hover-3d`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-hover-3d.1 | padding | var(--ui-space-xl) | Demonstrate an optional spatial card treatment. Clear the noninteractive card for its optional tilt. | Inspect the requested visual treatment without moving an interactive target. | proposed |
| catalog-hover-3d.2 | border | 1px solid var(--ui-divider) | Demonstrate an optional spatial card treatment. Keep the example bounded. | Inspect the requested visual treatment without moving an interactive target. | proposed |
| catalog-hover-3d.3 | background-color | var(--ui-subtle) | Demonstrate an optional spatial card treatment. Use a quiet readable surface. | Inspect the requested visual treatment without moving an interactive target. | proposed |

## catalog-tilt

Selector: `.ui-hover-3d:hover`; condition: `(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-tilt.1 | transform | perspective(40rem) rotateX(2deg) rotateY(-2deg) | Demonstrate a small spatial treatment on noninteractive content. Use a small fixed CSS tilt rather than script-based pointer tracking. | Inspect the requested 3D appearance without continuous motion. | proposed |

## catalog-hover-gallery

Selector: `.ui-hover-gallery`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-hover-gallery.1 | display | grid | Preview one of several supplied images. Put native choices before supplied figures. | Use hover for a temporary preview or native radios for keyboard/touch selection. | proposed |
| catalog-hover-gallery.2 | gap | var(--ui-space-sm) | Preview one of several supplied images. Clear choice focus from media. | Use hover for a temporary preview or native radios for keyboard/touch selection. | proposed |
| catalog-hover-gallery.3 | border | 0 | Preview one of several supplied images. Retain the legend without extra framing. | Use hover for a temporary preview or native radios for keyboard/touch selection. | proposed |
| catalog-hover-gallery.4 | padding | 0 | Preview one of several supplied images. Use the host inset. | Use hover for a temporary preview or native radios for keyboard/touch selection. | proposed |

## catalog-gallery-figures

Selector: `.ui-hover-gallery > figure`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-figures.1 | margin | 0 | Keep supplied previews grouped as native figures. Let the gallery gap own separation. | Inspect the chosen image and caption without losing the choices. | proposed |
| catalog-gallery-figures.2 | display | none | Keep supplied previews grouped as native figures. Hide only nonselected previews. | Inspect the chosen image and caption without losing the choices. | proposed |

## catalog-gallery-one

Selector: `.ui-hover-gallery:has(input[value="one"]:checked) > figure[data-preview="one"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-one.1 | display | block | Show the preview selected through native radio state. Expose this selected figure and caption. | Inspect the same image using keyboard, pointer or touch. | proposed |

## catalog-gallery-two

Selector: `.ui-hover-gallery:has(input[value="two"]:checked) > figure[data-preview="two"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-two.1 | display | block | Show the preview selected through native radio state. Expose this selected figure and caption. | Inspect the same image using keyboard, pointer or touch. | proposed |

## catalog-gallery-three

Selector: `.ui-hover-gallery:has(input[value="three"]:checked) > figure[data-preview="three"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-three.1 | display | block | Show the preview selected through native radio state. Expose this selected figure and caption. | Inspect the same image using keyboard, pointer or touch. | proposed |

## catalog-gallery-hover-hide

Selector: `.ui-hover-gallery:has(label[data-preview]:hover) > figure[data-preview]`; condition: `(hover: hover) and (pointer: fine)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-hover-hide.1 | display | none | Replace the selected preview only during pointer inspection. Hide all supplied figures before exposing the hovered one. | Inspect another image temporarily without changing native selection. | proposed |

## catalog-gallery-hover-one

Selector: `.ui-hover-gallery:has(label[data-preview="one"]:hover) > figure[data-preview="one"]`; condition: `(hover: hover) and (pointer: fine)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-hover-one.1 | display | block | Expose the figure associated with the hovered choice. Show only the supplied figure for the hovered choice. | Use hover inspection while radios remain the keyboard/touch route. | proposed |

## catalog-gallery-hover-two

Selector: `.ui-hover-gallery:has(label[data-preview="two"]:hover) > figure[data-preview="two"]`; condition: `(hover: hover) and (pointer: fine)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-hover-two.1 | display | block | Expose the figure associated with the hovered choice. Show only the supplied figure for the hovered choice. | Use hover inspection while radios remain the keyboard/touch route. | proposed |

## catalog-gallery-hover-three

Selector: `.ui-hover-gallery:has(label[data-preview="three"]:hover) > figure[data-preview="three"]`; condition: `(hover: hover) and (pointer: fine)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-hover-three.1 | display | block | Expose the figure associated with the hovered choice. Show only the supplied figure for the hovered choice. | Use hover inspection while radios remain the keyboard/touch route. | proposed |

## catalog-gallery-image

Selector: `.ui-hover-gallery img`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-gallery-image.1 | display | block | Keep supplied gallery media responsive. Remove the inline baseline gap. | Inspect local media without page overflow. | proposed |
| catalog-gallery-image.2 | max-inline-size | 100% | Keep supplied gallery media responsive. Bound media to its host. | Inspect local media without page overflow. | proposed |
| catalog-gallery-image.3 | block-size | auto | Keep supplied gallery media responsive. Preserve source aspect ratio. | Inspect local media without page overflow. | proposed |

## catalog-indicator

Selector: `.ui-indicator`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-indicator.1 | display | inline-grid | Place compact metadata beside its owning item. Keep item and metadata in one local group. | Read a written count/status in the correct context. | proposed |
| catalog-indicator.2 | gap | var(--ui-space-xs) | Place compact metadata beside its owning item. Separate the written indicator. | Read a written count/status in the correct context. | proposed |
| catalog-indicator.3 | justify-items | end | Place compact metadata beside its owning item. Associate metadata with a corner without overlay. | Read a written count/status in the correct context. | proposed |

## catalog-link

Selector: `.ui-link`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-link.1 | text-decoration-thickness | 0.1em | Keep a destination distinguishable from plain text. Keep the existing underline intentional without color-only meaning. | Follow a meaningful underlined destination with native behavior. | proposed |

## catalog-mask

Selector: `.ui-mask`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-mask.1 | display | block | Demonstrate optional cropping of nonessential artwork. Separate the illustrative crop from prose. | Compare shape treatments while retaining a written media explanation. | proposed |
| catalog-mask.2 | inline-size | var(--ui-swatch-size) | Demonstrate optional cropping of nonessential artwork. Use the governed visual sample size. | Compare shape treatments while retaining a written media explanation. | proposed |
| catalog-mask.3 | aspect-ratio | 1 | Demonstrate optional cropping of nonessential artwork. Reserve a square crop area. | Compare shape treatments while retaining a written media explanation. | proposed |
| catalog-mask.4 | object-fit | cover | Demonstrate optional cropping of nonessential artwork. Fill the nonessential shape without distortion. | Compare shape treatments while retaining a written media explanation. | proposed |
| catalog-mask.5 | clip-path | circle(50%) | Demonstrate optional cropping of nonessential artwork. Demonstrate cropping only on nonessential artwork. | Compare shape treatments while retaining a written media explanation. | proposed |

## catalog-mask-hexagon

Selector: `.ui-mask--hexagon`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-mask-hexagon.1 | clip-path | polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%) | Offer another optional crop shape. Use a hexagonal crop with unchanged external explanation. | Compare shape treatments while the caption carries meaning. | proposed |

## catalog-mockup-frames

Selector: `.ui-mockup-browser, .ui-mockup-code, .ui-mockup-phone, .ui-mockup-window`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-mockup-frames.1 | padding | var(--ui-space-md) | Frame explicitly illustrative interface samples. Clear the supplied example contents. | Recognize illustration rather than actual system controls. | proposed |
| catalog-mockup-frames.2 | border | var(--ui-switch-stroke) solid var(--ui-border) | Frame explicitly illustrative interface samples. Use a governed illustrative frame. | Recognize illustration rather than actual system controls. | proposed |
| catalog-mockup-frames.3 | border-radius | var(--ui-radius-panel) | Frame explicitly illustrative interface samples. Use the containing shape. | Recognize illustration rather than actual system controls. | proposed |
| catalog-mockup-frames.4 | background-color | var(--ui-subtle) | Frame explicitly illustrative interface samples. Keep the illustrative host neutral. | Recognize illustration rather than actual system controls. | proposed |
| catalog-mockup-frames.5 | max-inline-size | 100% | Frame explicitly illustrative interface samples. Keep the mockup within its host. | Recognize illustration rather than actual system controls. | proposed |
| catalog-mockup-frames.6 | margin | 0 | Frame explicitly illustrative interface samples. Let the component inset own its edges rather than adding native figure margins to its explicit width. | Recognize illustration rather than actual system controls. | proposed |

## catalog-mockup-browser

Selector: `.ui-mockup-browser > header`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-mockup-browser.1 | padding-block-end | var(--ui-space-sm) | Frame a labelled example of a browser-like surface. Separate the written illustrative address. | Recognize illustrative chrome rather than real navigation controls. | proposed |
| catalog-mockup-browser.2 | border-block-end | 1px solid var(--ui-divider) | Frame a labelled example of a browser-like surface. Show a toolbar boundary without fake controls. | Recognize illustrative chrome rather than real navigation controls. | proposed |

## catalog-mockup-code

Selector: `.ui-mockup-code pre`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-mockup-code.1 | overflow | auto | Frame a labelled source example. Keep exact source locally reachable. | Inspect source without mistaking the frame for an executable editor. | proposed |
| catalog-mockup-code.2 | white-space | pre | Frame a labelled source example. Preserve the illustrated source as text. | Inspect source without mistaking the frame for an executable editor. | proposed |

## catalog-mockup-phone

Selector: `.ui-mockup-phone`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-mockup-phone.1 | inline-size | min(18rem, 100%) | Bound a small-device preview. Use a small responsive device-preview frame. | Inspect a contained illustrative mobile layout without clipping its explanation. | proposed |
| catalog-mockup-phone.2 | min-block-size | 20rem | Bound a small-device preview. Give the illustration room without clipping text. | Inspect a contained illustrative mobile layout without clipping its explanation. | proposed |
| catalog-mockup-phone.3 | border-width | var(--ui-space-sm) | Bound a small-device preview. Distinguish the static device frame from live input boundaries. | Inspect a contained illustrative mobile layout without clipping its explanation. | proposed |

## catalog-mockup-window

Selector: `.ui-mockup-window > header`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-mockup-window.1 | font-weight | 600 | Frame a labelled desktop-like example. Identify the written mockup caption. | Recognize the illustrative content area and caption. | proposed |
| catalog-mockup-window.2 | border-block-end | 1px solid var(--ui-divider) | Frame a labelled desktop-like example. Separate the illustrative caption from its body. | Recognize the illustrative content area and caption. | proposed |

## catalog-stack

Selector: `.ui-visual-stack`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-stack.1 | padding | var(--ui-space-lg) | Indicate grouped material through nonessential background layers. Clear foreground content from the optional rear-layer cue. | Read the foreground item without hidden essential content beneath it. | proposed |
| catalog-stack.2 | border | 1px solid var(--ui-border) | Indicate grouped material through nonessential background layers. Bound the meaningful foreground. | Read the foreground item without hidden essential content beneath it. | proposed |
| catalog-stack.3 | box-shadow | var(--ui-space-xs) var(--ui-space-xs) 0 0 var(--ui-divider), var(--ui-space-sm) var(--ui-space-sm) 0 0 var(--ui-subtle) | Indicate grouped material through nonessential background layers. Suggest two empty rear planes without overlapping meaningful content. | Read the foreground item without hidden essential content beneath it. | proposed |
| catalog-stack.4 | background-color | var(--ui-surface) | Indicate grouped material through nonessential background layers. Keep foreground copy on a checked plane. | Read the foreground item without hidden essential content beneath it. | proposed |

## catalog-stat

Selector: `.ui-stat`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-stat.1 | display | grid | Pair a supplied number with its meaning and period. Keep number and context in a definition group. | Interpret a quantity without a dashboard number lacking context. | proposed |
| catalog-stat.2 | gap | var(--ui-space-xs) | Pair a supplied number with its meaning and period. Attach the context to its quantity. | Interpret a quantity without a dashboard number lacking context. | proposed |
| catalog-stat.3 | margin | 0 | Pair a supplied number with its meaning and period. Let the host own outside clearance. | Interpret a quantity without a dashboard number lacking context. | proposed |

## catalog-stat-value

Selector: `.ui-stat dd`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-stat-value.1 | margin | 0 | Make supplied quantities readable with context. Avoid default definition indentation. | Interpret the quantity alongside its title and period. | proposed |
| catalog-stat-value.2 | font-size | 2rem | Make supplied quantities readable with context. Use the existing title scale for the contextual quantity. | Interpret the quantity alongside its title and period. | proposed |
| catalog-stat-value.3 | font-variant-numeric | tabular-nums | Make supplied quantities readable with context. Keep digits stable where the font supports it. | Interpret the quantity alongside its title and period. | proposed |

## catalog-status

Selector: `.ui-status-indicator`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-status.1 | display | inline-flex | Keep a state label and supplementary mark together. Keep mark and wording together. | Read the explicit state without relying on hue. | proposed |
| catalog-status.2 | align-items | center | Keep a state label and supplementary mark together. Align the supplementary mark. | Read the explicit state without relying on hue. | proposed |
| catalog-status.3 | gap | var(--ui-space-sm) | Keep a state label and supplementary mark together. Separate the real state word. | Read the explicit state without relying on hue. | proposed |

## catalog-status-dot

Selector: `.ui-status-indicator::before`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-status-dot.1 | content | "" | Supplement written state with a nonessential mark. Generate no essential words. | Recognize a compact state without relying on hue. | proposed |
| catalog-status-dot.2 | inline-size | 0.75rem | Supplement written state with a nonessential mark. Keep the cue subordinate to text. | Recognize a compact state without relying on hue. | proposed |
| catalog-status-dot.3 | aspect-ratio | 1 | Supplement written state with a nonessential mark. Keep a square before cropping. | Recognize a compact state without relying on hue. | proposed |
| catalog-status-dot.4 | border-radius | 50% | Supplement written state with a nonessential mark. Distinguish the passive mark from a control. | Recognize a compact state without relying on hue. | proposed |
| catalog-status-dot.5 | background-color | var(--ui-success) | Supplement written state with a nonessential mark. Use the checked state color as a supplementary cue. | Recognize a compact state without relying on hue. | proposed |

## catalog-steps

Selector: `.ui-steps`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-steps.1 | padding-inline-start | 4ch | Present a supplied process order and current step. Reserve native step numbering space. | Locate the current point without interpreting color alone. | proposed |
| catalog-steps.2 | margin | 0 | Present a supplied process order and current step. Let the host own outside gaps. | Locate the current point without interpreting color alone. | proposed |

## catalog-current-step

Selector: `.ui-steps [aria-current="step"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-current-step.1 | font-weight | 600 | Identify the supplied current process position. Supplement the explicit Current word. | Locate the current point through wording and emphasis. | proposed |
| catalog-current-step.2 | text-decoration | underline | Identify the supplied current process position. Provide a non-color visual cue. | Locate the current point through wording and emphasis. | proposed |

## catalog-timeline

Selector: `.ui-timeline`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-timeline.1 | list-style-type | none | Group supplied events in chronological order. Use written timestamps rather than extra glyphs. | Read event dates, descriptions and ordering as real text. | proposed |
| catalog-timeline.2 | padding | 0 | Group supplied events in chronological order. Let events own their inset. | Read event dates, descriptions and ordering as real text. | proposed |
| catalog-timeline.3 | margin | 0 | Group supplied events in chronological order. Remove duplicate outer gaps. | Read event dates, descriptions and ordering as real text. | proposed |

## catalog-timeline-events

Selector: `.ui-timeline li`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-timeline-events.1 | padding | var(--ui-space-sm) var(--ui-space-lg) | Connect supplied chronological events. Use governed event clearance. | Read time and description as one event in source order. | proposed |
| catalog-timeline-events.2 | border-inline-start | 2px solid var(--ui-divider) | Connect supplied chronological events. Provide a passive timeline rule. | Read time and description as one event in source order. | proposed |

## catalog-swap

Selector: `.ui-swap`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-swap.1 | display | grid | Switch between two supplied presentations using a native choice. Keep control and alternative text together. | Read an alternate detail level without replacing the control or saving anything. | proposed |
| catalog-swap.2 | gap | var(--ui-space-sm) | Switch between two supplied presentations using a native choice. Separate the stable label from its output. | Read an alternate detail level without replacing the control or saving anything. | proposed |

## catalog-swap-short

Selector: `.ui-swap:has(input:checked) .ui-swap-short`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-swap-short.1 | display | none | Keep the supplied detail level controlled by native choice. Hide short text when detailed presentation is selected. | Read alternate wording without replacing the control. | proposed |

## catalog-swap-detail

Selector: `.ui-swap:not(:has(input:checked)) .ui-swap-detail`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-swap-detail.1 | display | none | Reserve detailed wording for its native choice. Hide detail until the visible checkbox is selected. | Choose when to inspect longer supplied wording. | proposed |

## catalog-theme-controller

Selector: `.ui-theme-controller`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-theme-controller.1 | accent-color | var(--ui-interactive) | Preview a complete local palette through native choice state. Keep the native preview mark aligned with the local palette. | Compare brightness without a script, page-wide preference write or data change. | proposed |

## catalog-theme-sandbox

Selector: `.ui-theme-sandbox`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-theme-sandbox.1 | padding | var(--ui-space-lg) | Bound a purely CSS palette comparison. Clear preview text and controls. | Compare local brightness without changing stored preferences or data. | proposed |
| catalog-theme-sandbox.2 | background-color | var(--ui-surface) | Bound a purely CSS palette comparison. Use the locally resolved reading plane. | Compare local brightness without changing stored preferences or data. | proposed |
| catalog-theme-sandbox.3 | color | var(--ui-ink) | Bound a purely CSS palette comparison. Use the locally resolved checked ink. | Compare local brightness without changing stored preferences or data. | proposed |
| catalog-theme-sandbox.4 | border | 1px solid var(--ui-border) | Bound a purely CSS palette comparison. Identify the preview boundary. | Compare local brightness without changing stored preferences or data. | proposed |

## catalog-theme-standard

Selector: `:root:not([data-vision="distinct"]) .ui-theme-sandbox:has(.ui-theme-controller:checked)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-theme-standard.1 | --ui-primary | #006aa8 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard primary role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.2 | --ui-primary-hover | #005686 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard primary-hover role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.3 | --ui-ink | #ededed | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard ink role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.4 | --ui-muted | #c2c2c2 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard muted role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.5 | --ui-canvas | #242424 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard canvas role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.6 | --ui-surface | #2e2e2e | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard surface role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.7 | --ui-subtle | #383838 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard subtle role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.8 | --ui-border | #a3a3a3 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard border role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.9 | --ui-divider | #585858 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard divider role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.10 | --ui-focus | #409fea | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard focus role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.11 | --ui-danger | #f58276 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard danger role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.12 | --ui-success | #4fc685 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard success role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.13 | --ui-success-bg | #383838 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard success-bg role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.14 | --ui-warning | #eab54d | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard warning role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.15 | --ui-warning-bg | #383838 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard warning-bg role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.16 | --ui-disabled | #c2c2c2 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard disabled role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.17 | --ui-disabled-bg | #404040 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard disabled-bg role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.18 | --ui-on-primary | #ffffff | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard on-primary role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.19 | --ui-interactive | #40adf0 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard interactive role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.20 | --ui-on-interactive | #242424 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-standard on-interactive role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-standard.21 | color-scheme | dark | Apply a complete checked palette only inside the native preview. Keep browser-owned native marks coherent with the preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |

## catalog-theme-distinct

Selector: `:root[data-vision="distinct"] .ui-theme-sandbox:has(.ui-theme-controller:checked)`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-theme-distinct.1 | --ui-primary | #006aa8 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct primary role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.2 | --ui-primary-hover | #005686 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct primary-hover role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.3 | --ui-ink | #ededed | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct ink role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.4 | --ui-muted | #c2c2c2 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct muted role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.5 | --ui-canvas | #242424 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct canvas role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.6 | --ui-surface | #2e2e2e | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct surface role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.7 | --ui-subtle | #383838 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct subtle role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.8 | --ui-border | #a3a3a3 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct border role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.9 | --ui-divider | #585858 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct divider role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.10 | --ui-focus | #409fea | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct focus role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.11 | --ui-danger | #d18bf0 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct danger role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.12 | --ui-success | #57adf0 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct success role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.13 | --ui-success-bg | #383838 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct success-bg role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.14 | --ui-warning | #eab54d | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct warning role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.15 | --ui-warning-bg | #383838 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct warning-bg role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.16 | --ui-disabled | #c2c2c2 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct disabled role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.17 | --ui-disabled-bg | #404040 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct disabled-bg role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.18 | --ui-on-primary | #ffffff | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct on-primary role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.19 | --ui-interactive | #40adf0 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct interactive role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.20 | --ui-on-interactive | #242424 | Apply a complete checked palette only inside the native preview. Reuse the independently checked dark-distinct on-interactive role in this explicit local preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |
| catalog-theme-distinct.21 | color-scheme | dark | Apply a complete checked palette only inside the native preview. Keep browser-owned native marks coherent with the preview. | Inspect a coherent dark appearance without script or storage writes. | proposed |

## catalog-validator

Selector: `.ui-validator`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-validator.1 | display | grid | Expose browser-enforced input constraints with visible correction guidance. Keep constraints and guidance in one field sequence. | Correct an invalid example without a custom validation engine. | proposed |
| catalog-validator.2 | gap | var(--ui-space-sm) | Expose browser-enforced input constraints with visible correction guidance. Clear focus between the input and explanation. | Correct an invalid example without a custom validation engine. | proposed |

## catalog-validation-rest

Selector: `.ui-validator .ui-validation-error`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-validation-rest.1 | display | none | Reserve supplementary correction for a real invalid interaction. Keep correction out of the initial flow. | Read error guidance after the native value is invalid. | proposed |

## catalog-validation-border

Selector: `.ui-validator input:user-invalid`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-validation-border.1 | border-color | var(--ui-danger) | Expose browser-determined invalid input. Use the checked error role after native user-invalid is true. | Find the actual value needing correction. | proposed |

## catalog-validation-message

Selector: `.ui-validator:has(input:user-invalid) .ui-validation-error`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-validation-message.1 | display | block | Show written guidance for the actual invalid value. Show the authored correction beside the invalid editor. | Correct the example without interpreting a colored border alone. | proposed |
| catalog-validation-message.2 | color | var(--ui-danger) | Show written guidance for the actual invalid value. Retain checked error text contrast. | Correct the example without interpreting a colored border alone. | proposed |

## catalog-tab-panel-one

Selector: `.ui-tabs:not(:has(input[value="one"]:checked)) .ui-tab-panel[data-panel="one"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-tab-panel-one.1 | display | none | Map native radio state to a supplied preview. Hide only the nonselected preloaded panel. | Read the chosen panel without fake ARIA tab state. | proposed |

## catalog-tab-panel-two

Selector: `.ui-tabs:not(:has(input[value="two"]:checked)) .ui-tab-panel[data-panel="two"]`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-tab-panel-two.1 | display | none | Map native radio state to a supplied preview. Hide only the nonselected preloaded panel. | Read the chosen panel without fake ARIA tab state. | proposed |

## catalog-motion-preview

Selector: `.ui-motion-preview`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-motion-preview.1 | padding | var(--ui-space-lg) | Keep optional visual effects and their controls together. Clear the opt-in control and supplementary effect. | Stop or reset the effect through a visible native choice. | proposed |
| catalog-motion-preview.2 | border | 1px solid var(--ui-divider) | Keep optional visual effects and their controls together. Identify the bounded optional-motion example. | Stop or reset the effect through a visible native choice. | proposed |

## catalog-diff-wipe

Selector: `.ui-diff-wipe`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-diff-wipe.1 | position | relative | Provide an optional native pointer-resize image comparison. Contain both supplied illustration layers. | Inspect a wipe effect while complete labelled versions remain separately readable. | proposed |
| catalog-diff-wipe.2 | container-type | inline-size | Provide an optional native pointer-resize image comparison. Give both layers the same container-relative image width during native resizing. | Inspect a wipe effect while complete labelled versions remain separately readable. | proposed |
| catalog-diff-wipe.3 | inline-size | 100% | Provide an optional native pointer-resize image comparison. Fit the available example width. | Inspect a wipe effect while complete labelled versions remain separately readable. | proposed |
| catalog-diff-wipe.4 | aspect-ratio | 3 / 1 | Provide an optional native pointer-resize image comparison. Reserve the supplied illustrations’ intrinsic ratio. | Inspect a wipe effect while complete labelled versions remain separately readable. | proposed |
| catalog-diff-wipe.5 | margin | 0 | Provide an optional native pointer-resize image comparison. Let the host own outer clearance. | Inspect a wipe effect while complete labelled versions remain separately readable. | proposed |
| catalog-diff-wipe.6 | border | 1px solid var(--ui-border) | Provide an optional native pointer-resize image comparison. Expose the comparison frame. | Inspect a wipe effect while complete labelled versions remain separately readable. | proposed |

## catalog-diff-image

Selector: `.ui-diff-wipe img`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-diff-image.1 | display | block | Keep supplied comparison layers aligned. Remove image baseline gaps. | Compare clipping rather than stretching either illustration. | proposed |
| catalog-diff-image.2 | inline-size | 100cqw | Keep supplied comparison layers aligned. Keep the source width tied to the whole comparison frame. | Compare clipping rather than stretching either illustration. | proposed |
| catalog-diff-image.3 | block-size | 100% | Keep supplied comparison layers aligned. Fill the reserved frame height. | Compare clipping rather than stretching either illustration. | proposed |
| catalog-diff-image.4 | object-fit | cover | Keep supplied comparison layers aligned. Preserve aspect ratio while covering the same frame. | Compare clipping rather than stretching either illustration. | proposed |

## catalog-diff-before

Selector: `.ui-diff-before`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-diff-before.1 | position | absolute | Let the browser resize the optional foreground reveal. Overlay the before image on its peer. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.2 | inset-block-start | 0 | Let the browser resize the optional foreground reveal. Align both source images at the top. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.3 | inset-inline-start | 0 | Let the browser resize the optional foreground reveal. Align both sources at the reading start. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.4 | inline-size | 50% | Let the browser resize the optional foreground reveal. Start with both versions partially visible. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.5 | max-inline-size | 100% | Let the browser resize the optional foreground reveal. Prevent native resizing past the frame. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.6 | min-inline-size | 2rem | Let the browser resize the optional foreground reveal. Keep the optional handle visible. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.7 | block-size | 100% | Let the browser resize the optional foreground reveal. Keep the reveal at full image height. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.8 | resize | horizontal | Let the browser resize the optional foreground reveal. Use the native pointer resize handle; full versions remain the keyboard alternative. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.9 | overflow | hidden | Let the browser resize the optional foreground reveal. Clip only the optional duplicate before layer, never the labelled original. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.10 | border-inline-end | 2px solid var(--ui-border) | Let the browser resize the optional foreground reveal. Identify the reveal boundary. | Inspect the supplied before layer without custom pointer code. | proposed |
| catalog-diff-before.11 | background-color | var(--ui-surface) | Let the browser resize the optional foreground reveal. Keep the duplicate illustration plane opaque. | Inspect the supplied before layer without custom pointer code. | proposed |

## catalog-diff-full-images

Selector: `.ui-diff img`. Source: project. Verification family: `catalog`.

| ID | Property | Exact value | Purpose and reason | User intent | Review |
| --- | --- | --- | --- | --- | --- |
| catalog-diff-full-images.1 | display | block | Keep both original comparison images fully available. Separate each supplied image from its caption. | Inspect either full version without relying on the optional pointer-only reveal. | proposed |
| catalog-diff-full-images.2 | max-inline-size | 100% | Keep both original comparison images fully available. Keep the full image within its comparison card. | Inspect either full version without relying on the optional pointer-only reveal. | proposed |
| catalog-diff-full-images.3 | block-size | auto | Keep both original comparison images fully available. Preserve the source image ratio. | Inspect either full version without relying on the optional pointer-only reveal. | proposed |
