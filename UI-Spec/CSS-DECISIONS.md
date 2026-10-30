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
