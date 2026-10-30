# Box-model declaration audit

Generated from system.mjs and density.mjs. Every spacing, sizing, margin, padding, gap, border, outline, radius, position, type-rhythm and density-token declaration has a scope, owner, normal/compact expression, purpose and user intent. Expressions are not a substitute for browser layout. Conditional rows apply only in their recorded condition. Bootstrap rows describe the literal pinned baseline; project gutter overrides govern the effective density. Read [BOX-MODEL.md](BOX-MODEL.md) for the box and margin ownership contract.

## tokens.19

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-xs | 0.25rem | 0.25rem | 0.25rem | Publish semantic values for consistent reuse. Keep a minimum inset around compact status text. Normal is 0.25rem; compact is 0.25rem. Read a short state without touching its boundary in either density. | Recognize the same meaning across screens. |

## tokens.20

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-sm | 0.5rem | 0.5rem | 0.375rem | Publish semantic values for consistent reuse. Separate tightly related labels, marks and field rows while leaving room for the offset focus ring. Normal is 0.5rem; compact is 0.375rem. Identify related content and see focus without excessive empty space. | Recognize the same meaning across screens. |

## tokens.21

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-md | 0.75rem | 0.75rem | 0.5rem | Publish semantic values for consistent reuse. Give individual values, cells and action clusters local separation. Normal is 0.75rem; compact is 0.5rem. Scan neighboring values without confusing their ownership. | Recognize the same meaning across screens. |

## tokens.22

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-lg | 1rem | 1rem | 0.75rem | Publish semantic values for consistent reuse. Separate body blocks and provide local reading insets. Normal is 1rem; compact is 0.75rem. Read related paragraphs and controls as distinct steps. | Recognize the same meaning across screens. |

## tokens.23

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-xl | 1.5rem | 1.5rem | 1rem | Publish semantic values for consistent reuse. Inset panels and separate peer blocks and Bootstrap gutters. Normal is 1.5rem; compact is 1rem. Distinguish groups while fitting more working content in compact mode. | Recognize the same meaning across screens. |

## tokens.24

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-section | 2rem | 2rem | 1.5rem | Publish semantic values for consistent reuse. Give page entry and empty-state explanations a clear start. Normal is 2rem; compact is 1.5rem. Recognize a working area without spending excessive height on clearance. | Recognize the same meaning across screens. |

## tokens.25

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-page | 3rem | 3rem | 2rem | Publish semantic values for consistent reuse. Separate major topics and leave trailing document room. Normal is 3rem; compact is 2rem. Locate a new section while reducing repeated scrolling in compact mode. | Recognize the same meaning across screens. |

## tokens.26

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-radius-small | 0.375rem | 0.375rem | 0.25rem | Publish semantic values for consistent reuse. Keep small controls and states visibly bounded without oversized corners. Normal is 0.375rem; compact is 0.25rem. Recognize the same control family at either density. | Recognize the same meaning across screens. |

## tokens.27

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-radius-panel | 0.75rem | 0.75rem | 0.5rem | Publish semantic values for consistent reuse. Distinguish containing panels from their smaller controls. Normal is 0.75rem; compact is 0.5rem. Recognize a group boundary while compact panels use less corner space. | Recognize the same meaning across screens. |

## tokens.32

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-control-min | 2.75rem | 2.75rem | 2.25rem | Publish semantic values for consistent reuse. Set a minimum native target height, allowing content to grow rather than fixing height. Activate controls comfortably; compact fine-pointer targets stay at least 36px at the default root, with a separate 44px coarse/no-pointer floor. | Recognize the same meaning across screens. |

## tokens.33

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-control-pad-block | 0.5rem | 0.5rem | 0.25rem | Publish semantic values for consistent reuse. Give entered values and button labels vertical breathing room independently of minimum target height. Read text inside a control while compact mode recovers redundant interior space. | Recognize the same meaning across screens. |

## tokens.34

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-notes-min | 7rem | 7rem | 5.5rem | Publish semantic values for consistent reuse. Provide a usable initial multi-line notes viewport without fixing its eventual height. Read several note lines and enlarge the native textarea when needed. | Recognize the same meaning across screens. |

## tokens.35

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-notice-stroke | 4px | 4px | 3px | Publish semantic values for consistent reuse. Mark routine guidance with a neutral emphasis stroke, narrower in compact mode. Recognize contextual guidance without a heavy decorative edge. | Recognize the same meaning across screens. |

## tokens.36

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-stroke | 2px | 2px | 1px | Publish semantic values for consistent reuse. Keep a crisp visible switch track with an integer-pixel boundary. Locate the native preference mark while the compact track occupies less space. | Recognize the same meaning across screens. |

## tokens.37

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-width | 3rem | 3rem | 2.5rem | Publish semantic values for consistent reuse. Provide space for two visibly different thumb positions. Recognize on/off position without relying on track hue. | Recognize the same meaning across screens. |

## tokens.38

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-height | 1.75rem | 1.75rem | 1.5rem | Publish semantic values for consistent reuse. Fit the decorative thumb inside a track shorter than its full clickable label. See the preference mark while retaining the larger label target. | Recognize the same meaning across screens. |

## tokens.39

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-thumb | 1.125rem | 1.125rem | 1rem | Publish semantic values for consistent reuse. Keep the decorative thumb large enough to identify in its selected position. Distinguish on/off position without oversized marks in compact mode. | Recognize the same meaning across screens. |

## tokens.40

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-swatch-size | 3rem | 3rem | 2.5rem | Publish semantic values for consistent reuse. Provide a visible color sample without letting demonstration patches dominate the reference. Compare actual color roles while compact mode shows more samples and content. | Recognize the same meaning across screens. |

## tokens.41

Selector: `:root`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-dialog-clearance | 1rem | 1rem | 0.75rem | Publish semantic values for consistent reuse. Keep a modal inside the viewport with an external escape margin. Read and scroll a blocking decision without losing its edges at narrow widths. | Recognize the same meaning across screens. |

## density-compact.1

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-xs | 0.25rem | Not active | 0.25rem | Apply the explicit compact box-model profile. Keep a minimum inset around compact status text. Normal is 0.25rem; compact is 0.25rem. Read a short state without touching its boundary in either density. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.2

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-sm | 0.375rem | Not active | 0.375rem | Apply the explicit compact box-model profile. Separate tightly related labels, marks and field rows while leaving room for the offset focus ring. Normal is 0.5rem; compact is 0.375rem. Identify related content and see focus without excessive empty space. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.3

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-md | 0.5rem | Not active | 0.5rem | Apply the explicit compact box-model profile. Give individual values, cells and action clusters local separation. Normal is 0.75rem; compact is 0.5rem. Scan neighboring values without confusing their ownership. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.4

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-lg | 0.75rem | Not active | 0.75rem | Apply the explicit compact box-model profile. Separate body blocks and provide local reading insets. Normal is 1rem; compact is 0.75rem. Read related paragraphs and controls as distinct steps. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.5

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-xl | 1rem | Not active | 1rem | Apply the explicit compact box-model profile. Inset panels and separate peer blocks and Bootstrap gutters. Normal is 1.5rem; compact is 1rem. Distinguish groups while fitting more working content in compact mode. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.6

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-section | 1.5rem | Not active | 1.5rem | Apply the explicit compact box-model profile. Give page entry and empty-state explanations a clear start. Normal is 2rem; compact is 1.5rem. Recognize a working area without spending excessive height on clearance. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.7

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-space-page | 2rem | Not active | 2rem | Apply the explicit compact box-model profile. Separate major topics and leave trailing document room. Normal is 3rem; compact is 2rem. Locate a new section while reducing repeated scrolling in compact mode. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.8

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-radius-small | 0.25rem | Not active | 0.25rem | Apply the explicit compact box-model profile. Keep small controls and states visibly bounded without oversized corners. Normal is 0.375rem; compact is 0.25rem. Recognize the same control family at either density. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.9

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-radius-panel | 0.5rem | Not active | 0.5rem | Apply the explicit compact box-model profile. Distinguish containing panels from their smaller controls. Normal is 0.75rem; compact is 0.5rem. Recognize a group boundary while compact panels use less corner space. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.10

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-control-min | 2.25rem | Not active | 2.25rem | Apply the explicit compact box-model profile. Set a minimum native target height, allowing content to grow rather than fixing height. Normal is 2.75rem; compact is 2.25rem. Activate controls comfortably; compact fine-pointer targets stay at least 36px at the default root, with a separate 44px coarse/no-pointer floor. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.11

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-control-pad-block | 0.25rem | Not active | 0.25rem | Apply the explicit compact box-model profile. Give entered values and button labels vertical breathing room independently of minimum target height. Normal is 0.5rem; compact is 0.25rem. Read text inside a control while compact mode recovers redundant interior space. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.12

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-notes-min | 5.5rem | Not active | 5.5rem | Apply the explicit compact box-model profile. Provide a usable initial multi-line notes viewport without fixing its eventual height. Normal is 7rem; compact is 5.5rem. Read several note lines and enlarge the native textarea when needed. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.13

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-notice-stroke | 3px | Not active | 3px | Apply the explicit compact box-model profile. Mark routine guidance with a neutral emphasis stroke, narrower in compact mode. Normal is 4px; compact is 3px. Recognize contextual guidance without a heavy decorative edge. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.14

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-stroke | 1px | Not active | 1px | Apply the explicit compact box-model profile. Keep a crisp visible switch track with an integer-pixel boundary. Normal is 2px; compact is 1px. Locate the native preference mark while the compact track occupies less space. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.15

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-width | 2.5rem | Not active | 2.5rem | Apply the explicit compact box-model profile. Provide space for two visibly different thumb positions. Normal is 3rem; compact is 2.5rem. Recognize on/off position without relying on track hue. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.16

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-height | 1.5rem | Not active | 1.5rem | Apply the explicit compact box-model profile. Fit the decorative thumb inside a track shorter than its full clickable label. Normal is 1.75rem; compact is 1.5rem. See the preference mark while retaining the larger label target. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.17

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-switch-thumb | 1rem | Not active | 1rem | Apply the explicit compact box-model profile. Keep the decorative thumb large enough to identify in its selected position. Normal is 1.125rem; compact is 1rem. Distinguish on/off position without oversized marks in compact mode. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.18

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-swatch-size | 2.5rem | Not active | 2.5rem | Apply the explicit compact box-model profile. Provide a visible color sample without letting demonstration patches dominate the reference. Normal is 3rem; compact is 2.5rem. Compare actual color roles while compact mode shows more samples and content. | Fit more working content without shrinking reading text or losing control semantics. |

## density-compact.19

Selector: `:root[data-density="compact"]`. Policy: Compact override.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-dialog-clearance | 0.75rem | Not active | 0.75rem | Apply the explicit compact box-model profile. Keep a modal inside the viewport with an external escape margin. Normal is 1rem; compact is 0.75rem. Read and scroll a blocking decision without losing its edges at narrow widths. | Fit more working content without shrinking reading text or losing control semantics. |

## density-coarse-floor.1

Selector: `:root[data-density="compact"]`; condition: `(any-pointer: coarse), (pointer: none)`. Policy: Protected pointer floor.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --ui-control-min | 2.75rem | Not active | 2.75rem | Protect targets on touch, hybrid and no-pointer surfaces. Keep the 44px-at-default-root minimum for coarse or absent pointers; only compact fine-pointer targets use the smaller 36px minimum. | Activate controls comfortably while retaining compact content spacing. |

## box.1

Selector: `*, *::before, *::after`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| box-sizing | border-box | border-box | border-box | Make declared sizes include padding and borders. Prevent padded elements from unexpectedly exceeding their allotted width. | Keep controls and columns within the visible viewport. |

## page.1

Selector: `body`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Establish a readable document baseline. Remove the browser page margin so the container owns one consistent outer gutter. | Read and navigate ordinary content without zoom or horizontal panning. |

## page.3

Selector: `body`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1rem | 1rem | 1rem | Establish a readable document baseline. Respect the browser default reading size instead of shrinking all content. | Read and navigate ordinary content without zoom or horizontal panning. |

## page.4

Selector: `body`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.5 | 1.5 | 1.5 | Establish a readable document baseline. Leave room between lines for sustained reading and text spacing preferences. | Read and navigate ordinary content without zoom or horizontal panning. |

## headings.1

Selector: `h1, h2, h3`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 0 var(--ui-space-lg) | 0 0 1rem | 0 0 0.75rem | Create hierarchy without changing document semantics. Separate headings from following content without cumulative top gaps. | Scan sections and locate the task at hand. |

## headings.3

Selector: `h1, h2, h3`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.25 | 1.25 | 1.25 | Create hierarchy without changing document semantics. Group heading lines more tightly than paragraphs. | Scan sections and locate the task at hand. |

## title.1

Selector: `h1`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 2rem | 2rem | 2rem | Identify the page once. Keep the main title legible at narrow widths without oversized display type. | Know which workspace or example is open. |

## title.2

Selector: `h1`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.2 | 1.2 | 1.2 | Identify the page once. Keep a wrapped page title visually together. | Know which workspace or example is open. |

## section-title.1

Selector: `h2`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.5rem | 1.5rem | 1.5rem | Identify major sections. Distinguish sections from both the page title and body. | Find the relevant family of examples. |

## subheading.1

Selector: `h3`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.125rem | 1.125rem | 1.125rem | Identify a component or card. Create a local heading without competing with a section title. | Understand a local group before acting. |

## copy.1

Selector: `p, ul, ol, dl`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block | 0 var(--ui-space-lg) | 0 1rem | 0 0.75rem | Keep prose spacing predictable. Leave one body-text gap after paragraphs and lists. | Read related information as a single group. |

## small.1

Selector: `small, .ui-help`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875rem | 0.875rem | 0.875rem | Distinguish secondary explanations. Keep help at a readable 14px when the default is 16px. | Read help without mistaking it for an editable value. |

## links.3

Selector: `a`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| text-underline-offset | 0.2em | 0.2em | 0.2em | Make navigation identifiable without color alone. Keep the underline clear of letter descenders. | Recognize destinations before clicking. |

## focus.1

Selector: `:where(a, button, input, select, textarea, [tabindex]):focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | Expose keyboard focus on every interactive surface. Use a sufficiently thick, contrasting perimeter instead of removing the native indicator. | Know exactly where keyboard input will act. |

## focus.2

Selector: `:where(a, button, input, select, textarea, [tabindex]):focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline-offset | 3px | 3px | 3px | Expose keyboard focus on every interactive surface. Separate the focus perimeter from the control border and active button fill. | Know exactly where keyboard input will act. |

## progress-cap.1

Selector: `progress`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep native progress readable inside a narrow panel. Cap the browser’s font-relative intrinsic width at the available panel width. | Inspect progress while using enlarged text without panning the page. |

## checkbox.1

Selector: `input[type="checkbox"], input[type="radio"]`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 1.25rem | 1.25rem | 1.25rem | Keep native choice marks visibly identifiable. Provide a 20px mark while the surrounding label supplies the full touch area. | See which option is selected inside its larger label target. |

## checkbox.2

Selector: `input[type="checkbox"], input[type="radio"]`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1.25rem | 1.25rem | 1.25rem | Keep native choice marks visibly identifiable. Give the native choice mark a square footprint. | See which option is selected inside its larger label target. |

## bs-container.1

Selector: `.container`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --bs-gutter-x | 1.5rem | 1.5rem | 1.5rem | Use Bootstrap container gutters and centering. Set a 24px total horizontal gutter at the default font size. | Read columns with consistent edge clearance on every screen. |

## bs-container.2

Selector: `.container`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --bs-gutter-y | 0 | 0 | 0 | Use Bootstrap container gutters and centering. Start without a vertical gutter until the page grid opts into one. | Read columns with consistent edge clearance on every screen. |

## bs-container.3

Selector: `.container`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| width | 100% | 100% | 100% | Use Bootstrap container gutters and centering. Fill the available width before the project maximum is applied. | Read columns with consistent edge clearance on every screen. |

## bs-container.4

Selector: `.container`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-right | calc(var(--bs-gutter-x) * 0.5) | calc(1.5rem * 0.5) | calc(1rem * 0.5) | Use Bootstrap container gutters and centering. Supply the right half of the Bootstrap gutter. | Read columns with consistent edge clearance on every screen. |

## bs-container.5

Selector: `.container`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-left | calc(var(--bs-gutter-x) * 0.5) | calc(1.5rem * 0.5) | calc(1rem * 0.5) | Use Bootstrap container gutters and centering. Supply the left half of the Bootstrap gutter. | Read columns with consistent edge clearance on every screen. |

## bs-container.6

Selector: `.container`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-right | auto | auto | auto | Use Bootstrap container gutters and centering. Center unused space to the right. | Read columns with consistent edge clearance on every screen. |

## bs-container.7

Selector: `.container`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-left | auto | auto | auto | Use Bootstrap container gutters and centering. Center unused space to the left. | Read columns with consistent edge clearance on every screen. |

## bs-row.1

Selector: `.row`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --bs-gutter-x | 1.5rem | 1.5rem | 1.5rem | Use Bootstrap wrapping rows. Provide one consistent total horizontal column gap. | See columns stack naturally when space is limited. |

## bs-row.2

Selector: `.row`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --bs-gutter-y | 0 | 0 | 0 | Use Bootstrap wrapping rows. Let the project opt into vertical gaps explicitly. | See columns stack naturally when space is limited. |

## bs-row.5

Selector: `.row`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-top | calc(-1 * var(--bs-gutter-y)) | calc(-1 * 1.5rem) | calc(-1 * 1rem) | Use Bootstrap wrapping rows. Cancel the first row of child top gutters. | See columns stack naturally when space is limited. |

## bs-row.6

Selector: `.row`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-right | calc(-0.5 * var(--bs-gutter-x)) | calc(-0.5 * 1.5rem) | calc(-0.5 * 1rem) | Use Bootstrap wrapping rows. Align column content with the container right edge. | See columns stack naturally when space is limited. |

## bs-row.7

Selector: `.row`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-left | calc(-0.5 * var(--bs-gutter-x)) | calc(-0.5 * 1.5rem) | calc(-0.5 * 1rem) | Use Bootstrap wrapping rows. Align column content with the container left edge. | See columns stack naturally when space is limited. |

## bs-children.2

Selector: `.row > *`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| width | 100% | 100% | 100% | Apply Bootstrap gutters to immediate columns. Stack every column before a responsive size is selected. | Keep adjacent panels apart without reducing their reading width unpredictably. |

## bs-children.3

Selector: `.row > *`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-width | 100% | 100% | 100% | Apply Bootstrap gutters to immediate columns. Prevent a column from exceeding its row. | Keep adjacent panels apart without reducing their reading width unpredictably. |

## bs-children.4

Selector: `.row > *`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-right | calc(var(--bs-gutter-x) * 0.5) | calc(1.5rem * 0.5) | calc(1rem * 0.5) | Apply Bootstrap gutters to immediate columns. Supply a column right half gutter. | Keep adjacent panels apart without reducing their reading width unpredictably. |

## bs-children.5

Selector: `.row > *`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-left | calc(var(--bs-gutter-x) * 0.5) | calc(1.5rem * 0.5) | calc(1rem * 0.5) | Apply Bootstrap gutters to immediate columns. Supply a column left half gutter. | Keep adjacent panels apart without reducing their reading width unpredictably. |

## bs-children.6

Selector: `.row > *`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-top | var(--bs-gutter-y) | 1.5rem | 1rem | Apply Bootstrap gutters to immediate columns. Supply the selected vertical separation between wrapped columns. | Keep adjacent panels apart without reducing their reading width unpredictably. |

## bs-half.1

Selector: `.col-md-6`; condition: `(min-width: 768px)`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| flex | 0 0 auto | 0 0 auto | 0 0 auto | Split paired content at the Bootstrap md breakpoint. Keep the responsive column at its explicit fraction. | Compare related panels side by side when each has enough space. |

## bs-half.2

Selector: `.col-md-6`; condition: `(min-width: 768px)`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| width | 50% | 50% | 50% | Split paired content at the Bootstrap md breakpoint. Allocate six of the twelve Bootstrap columns. | Compare related panels side by side when each has enough space. |

## bs-main.1

Selector: `.col-lg-8`; condition: `(min-width: 992px)`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| flex | 0 0 auto | 0 0 auto | 0 0 auto | Give the main task two thirds of a wide row. Keep the main column at its intended fraction. | Keep the primary workspace more prominent than its supporting panel. |

## bs-main.2

Selector: `.col-lg-8`; condition: `(min-width: 992px)`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| width | 66.66666667% | 66.66666667% | 66.66666667% | Give the main task two thirds of a wide row. Allocate eight of twelve Bootstrap columns. | Keep the primary workspace more prominent than its supporting panel. |

## bs-side.1

Selector: `.col-lg-4`; condition: `(min-width: 992px)`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| flex | 0 0 auto | 0 0 auto | 0 0 auto | Give supporting information one third of a wide row. Keep the supporting column at its intended fraction. | Read context without losing the main workspace. |

## bs-side.2

Selector: `.col-lg-4`; condition: `(min-width: 992px)`. Policy: Framework baseline; project gutter override governs density.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| width | 33.33333333% | 33.33333333% | 33.33333333% | Give supporting information one third of a wide row. Allocate four of twelve Bootstrap columns. | Read context without losing the main workspace. |

## container-cap.1

Selector: `.container`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-width | 75rem | 75rem | 75rem | Bound the total scanning distance. Cap the reference workspace at 1200px with fluid space on smaller screens. | Keep work and navigation close on a large monitor. |

## grid-gap.1

Selector: `.row`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --bs-gutter-y | var(--ui-space-xl) | 1.5rem | 1rem | Separate wrapped panels vertically. Use the 24px normal or 16px compact peer gap through Bootstrap’s existing row contract. | Tell one panel from the next on mobile. |

## grid-density.1

Selector: `.container, .row`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| --bs-gutter-x | var(--ui-space-xl) | 1.5rem | 1rem | Give Bootstrap gutters the same density owner as panels. Override the copied local 24px gutter with the chosen 24px normal or 16px compact value while retaining the literal upstream rules. | Keep outer edges and neighboring columns aligned when changing density. |

## shrink.1

Selector: `.row > *, .ui-stack, .ui-cluster > *`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Allow text-bearing flex and grid children to wrap. Remove the min-content floor that can force overflow inside flexible layouts. | Read long values without unintended horizontal page scrolling. |

## header.2

Selector: `.ui-header`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Separate navigation from the working document. Mark the header boundary without a decorative shadow. | Find home and component links without mistaking them for editable content. |

## header.3

Selector: `.ui-header`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block | var(--ui-space-lg) | 1rem | 0.75rem | Separate navigation from the working document. Give header links room above and below. | Find home and component links without mistaking them for editable content. |

## cluster.3

Selector: `.ui-cluster`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-md) | 0.75rem | 0.5rem | Group peer actions while allowing wrapping. Separate action targets by 12px normal or 8px compact while letting the cluster wrap. | Find related actions together on both narrow and wide screens. |

## nav-target.3

Selector: `.ui-nav a`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Make text navigation comfortable to activate. Use the density minimum: 44px normal or 36px compact for fine pointers at the default root; coarse/no-pointer compact retains 44px. | Tap section links accurately. |

## nav-target.4

Selector: `.ui-nav a`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline | var(--ui-space-sm) | 0.5rem | 0.375rem | Make text navigation comfortable to activate. Add space around each link’s text. | Tap section links accurately. |

## main.1

Selector: `main`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block | var(--ui-space-section) var(--ui-space-page) | 2rem 3rem | 1.5rem 2rem | Separate page content from the header and footer. Use 32/48px entry/trailing clearance normally and 24/32px in compact mode, retaining a distinct page start and end. | Start reading without feeling the title is crowded against navigation. |

## stack.3

Selector: `.ui-stack`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xl) | 1.5rem | 1rem | Express a vertical group of related blocks. Separate peer blocks by 24px normal or 16px compact rather than adding child margins. | Follow content in a predictable reading order. |

## stack-reset.1

Selector: `.ui-stack > *`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-end | 0 | 0 | 0 | Avoid doubling component and stack spacing. Let the parent gap own separation for direct children. | Perceive one consistent gap between related blocks. |

## section.1

Selector: `.ui-section`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-page) | 3rem | 2rem | Separate major component families. Separate major topics by 48px normal or 32px compact so section boundaries remain visible while scrolling less. | Recognize the start of a new topic when scrolling. |

## section.2

Selector: `.ui-section`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| scroll-margin-block-start | var(--ui-space-lg) | 1rem | 0.75rem | Separate major component families. Keep anchor destinations clear of the viewport edge without a sticky header. | Recognize the start of a new topic when scrolling. |

## panel.2

Selector: `.card`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Contain a related task or reference example. Keep panel edges recognizable on adjacent palette surfaces. | Recognize which information and actions belong together. |

## panel.3

Selector: `.card`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) | 0.75rem | 0.5rem | Contain a related task or reference example. Use the larger corner role for containing groups. | Recognize which information and actions belong together. |

## panel.4

Selector: `.card`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xl) | 1.5rem | 1rem | Contain a related task or reference example. Inset panel content by 24px normal or 16px compact, leaving more than the 6px focus-ring extent. | Recognize which information and actions belong together. |

## panel.5

Selector: `.card`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 100% | 100% | 100% | Contain a related task or reference example. Align peer panel bottoms within a Bootstrap row without fixing content height. | Recognize which information and actions belong together. |

## panel-last-margin.1

Selector: `.card:not(.ui-stack) > :last-child`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-end | 0 | 0 | 0 | Let panel padding own the final inset. Remove the last child’s trailing margin in ordinary panels; stack panels already reset child margins through their gap owner. | Read a group with balanced clearance rather than an extra paragraph margin below its last item. |

## measure.1

Selector: `.ui-measure`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 65ch | 65ch | 65ch | Bound prose line length. Keep explanatory copy near a comfortable reading measure while allowing narrower wrapping. | Read explanations without losing the next line on a wide monitor. |

## button.4

Selector: `.btn`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Present an explicit action as a native button. Keep optional icon and label distinct. | Recognize an available action and activate it precisely. |

## button.5

Selector: `.btn`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Present an explicit action as a native button. Use the density minimum without fixing height: 44px normal, 36px compact for fine pointers, and 44px compact for coarse/no pointers at the default root. | Recognize an available action and activate it precisely. |

## button.6

Selector: `.btn`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-control-pad-block) var(--ui-space-lg) | 0.5rem 1rem | 0.25rem 0.75rem | Present an explicit action as a native button. Use 8/16px vertical/horizontal padding normally and 4/12px compact; the independent minimum target still governs short labels. | Recognize an available action and activate it precisely. |

## button.7

Selector: `.btn`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Present an explicit action as a native button. Show a visible secondary action boundary. | Recognize an available action and activate it precisely. |

## button.8

Selector: `.btn`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Present an explicit action as a native button. Use the common control corner role. | Recognize an available action and activate it precisely. |

## control.2

Selector: `.form-control, .form-select`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Expose ordinary native editing controls. Use the available column width for input. | Enter or choose values using familiar browser behavior. |

## control.3

Selector: `.form-control, .form-select`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Expose ordinary native editing controls. Use the selected minimum target and let native content grow; compact fine-pointer controls can use 36px while touch retains 44px at the default root. | Enter or choose values using familiar browser behavior. |

## control.4

Selector: `.form-control, .form-select`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-control-pad-block) var(--ui-space-md) | 0.5rem 0.75rem | 0.25rem 0.5rem | Expose ordinary native editing controls. Inset values by 8/12px vertically/horizontally normally or 4/8px compact, without reducing type size. | Enter or choose values using familiar browser behavior. |

## control.7

Selector: `.form-control, .form-select`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Expose ordinary native editing controls. Distinguish the input boundary with at least 3:1 contrast. | Enter or choose values using familiar browser behavior. |

## control.8

Selector: `.form-control, .form-select`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Expose ordinary native editing controls. Use the shared control corner role. | Enter or choose values using familiar browser behavior. |

## textarea.1

Selector: `textarea.form-control`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-notes-min) | 7rem | 5.5rem | Let multi-line content grow under user control. Use a 112px normal or 88px compact minimum at the default root while retaining three native rows and user-controlled resizing. | Review a longer draft without a tiny fixed viewport. |

## textarea.2

Selector: `textarea.form-control`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| resize | vertical | vertical | vertical | Let multi-line content grow under user control. Allow more reading height without breaking the column width. | Review a longer draft without a tiny fixed viewport. |

## fieldset.1

Selector: `fieldset`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Keep native group semantics without duplicate visual framing. Allow a named group to fit a narrow column. | Understand related options as one named question. |

## fieldset.2

Selector: `fieldset`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Keep native group semantics without duplicate visual framing. Let the parent stack determine outer spacing. | Understand related options as one named question. |

## fieldset.3

Selector: `fieldset`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Keep native group semantics without duplicate visual framing. Use the parent panel’s padding instead of double insetting choices. | Understand related options as one named question. |

## fieldset.4

Selector: `fieldset`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Keep native group semantics without duplicate visual framing. Avoid a second box around an already named choice group. | Understand related options as one named question. |

## legend.1

Selector: `legend`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Give choice groups a persistent visible name. Place the named question above the option targets. | Know what the following radio or checkbox options answer. |

## legend.2

Selector: `legend`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1rem | 1rem | 1rem | Give choice groups a persistent visible name. Keep question names at readable body size. | Know what the following radio or checkbox options answer. |

## legend.3

Selector: `legend`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-end | var(--ui-space-sm) | 0.5rem | 0.375rem | Give choice groups a persistent visible name. Separate the group name from its first option. | Know what the following radio or checkbox options answer. |

## choice.3

Selector: `.ui-choice`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-md) | 0.75rem | 0.5rem | Make the whole native choice label a touch target. Leave 12px normal or 8px compact between the unchanged native mark and its explanation. | Select an option without needing to hit a small mark. |

## choice.4

Selector: `.ui-choice`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Make the whole native choice label a touch target. Use the density target minimum on the full label: 44px normal or 36px compact with fine pointers, retaining 44px for touch/no pointers at the default root. | Select an option without needing to hit a small mark. |

## choice.5

Selector: `.ui-choice`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block | var(--ui-space-sm) | 0.5rem | 0.375rem | Make the whole native choice label a touch target. Keep multi-line options comfortably separated. | Select an option without needing to hit a small mark. |

## table-region.2

Selector: `.table-responsive`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Contain genuinely two-dimensional information. Expose the bounded table region. | Compare columns on desktop and intentionally pan only the table on mobile. |

## table-region.3

Selector: `.table-responsive`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Contain genuinely two-dimensional information. Use the control-sized corner role for this bounded region. | Compare columns on desktop and intentionally pan only the table on mobile. |

## table.1

Selector: `.table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Present comparable records with native table semantics. Fill the available region for consistent column scanning. | Read row and column relationships without a custom grid widget. |

## table.2

Selector: `.table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 36rem | 36rem | 36rem | Present comparable records with native table semantics. Preserve six short comparison columns instead of compressing their meaning. | Read row and column relationships without a custom grid widget. |

## table.3

Selector: `.table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-collapse | collapse | collapse | collapse | Present comparable records with native table semantics. Draw single shared row dividers rather than doubled cell borders. | Read row and column relationships without a custom grid widget. |

## cells.1

Selector: `.table th, .table td`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-md) var(--ui-space-lg) | 0.75rem 1rem | 0.5rem 0.75rem | Keep cell content aligned and separated. Use 12/16px vertical/horizontal cell clearance normally and 8/12px compact so more rows fit without changing text or column relationships. | Scan a row without confusing neighboring values. |

## cells.4

Selector: `.table th, .table td`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Keep cell content aligned and separated. Separate records without adding a heavy cell grid. | Scan a row without confusing neighboring values. |

## caption.2

Selector: `caption`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Name a native table at its entry point. Keep the caption clear of the table perimeter. | Understand what is being compared before entering the rows. |

## status.2

Selector: `.ui-status`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xs) var(--ui-space-sm) | 0.25rem 0.5rem | 0.25rem 0.375rem | Present an explicit named result or state. Separate status text from its neutral background. | Understand a state without interpreting an isolated colored dot. |

## status.3

Selector: `.ui-status`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Present an explicit named result or state. Use the same compact shape for peer status labels. | Understand a state without interpreting an isolated colored dot. |

## status.4

Selector: `.ui-status`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875rem | 0.875rem | 0.875rem | Present an explicit named result or state. Keep supplementary state labels readable without competing with task names. | Understand a state without interpreting an isolated colored dot. |

## notice.1

Selector: `.ui-notice`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Group relevant guidance without interrupting the page. Give the guidance its own readable block. | Read a condition and continue the same task. |

## notice.2

Selector: `.ui-notice`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | var(--ui-notice-stroke) solid var(--ui-border) | 4px solid var(--ui-border) | 3px solid var(--ui-border) | Group relevant guidance without interrupting the page. Identify guidance with a neutral 4px normal or 3px compact stroke; retain contrast rather than borrowing an action color. | Read a condition and continue the same task. |

## empty.1

Selector: `.ui-empty`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-section) | 2rem | 1.5rem | Explain absence of content in its working area. Leave room for the empty-state explanation and action. | Understand what is missing and which action can resolve it. |

## empty.2

Selector: `.ui-empty`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px dashed var(--ui-border) | 1px dashed var(--ui-border) | 1px dashed var(--ui-border) | Explain absence of content in its working area. Distinguish an empty placeholder from a populated editable panel. | Understand what is missing and which action can resolve it. |

## empty.3

Selector: `.ui-empty`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Explain absence of content in its working area. Keep the empty region visually related to other bounded components. | Understand what is missing and which action can resolve it. |

## code.1

Selector: `code`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875em | 0.875em | 0.875em | Distinguish literal implementation identifiers in the reference. Keep monospace snippets from dominating surrounding prose. | Recognize text to copy separately from product instructions. |

## swatches.2

Selector: `.ui-swatch-grid`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | Present color roles as a responsive comparison group. Fit as many 12rem role samples as space allows while permitting one narrow column. | Compare named colors at narrow and wide widths. |

## swatches.3

Selector: `.ui-swatch-grid`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Present color roles as a responsive comparison group. Separate role samples by 16px normal or 12px compact without merging their labels. | Compare named colors at narrow and wide widths. |

## swatch.1

Selector: `.ui-swatch`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | var(--ui-swatch-size) | 3rem | 2.5rem | Show a token’s actual color as a sample. Use a 48px normal or 40px compact sample at the default root, large enough to inspect without dominating the page. | Associate a documented name and hex value with its appearance. |

## swatch.2

Selector: `.ui-swatch`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Show a token’s actual color as a sample. Keep even white and pale swatches visible. | Associate a documented name and hex value with its appearance. |

## swatch.3

Selector: `.ui-swatch`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Show a token’s actual color as a sample. Use the common compact sample shape. | Associate a documented name and hex value with its appearance. |

## dialog.1

Selector: `dialog`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(32rem, calc(100% - 2 * var(--ui-dialog-clearance))) | min(32rem, calc(100% - 2 * 1rem)) | min(32rem, calc(100% - 2 * 0.75rem)) | Present a focused decision in the native top layer. Cap the decision at 32rem with 16px normal or 12px compact viewport clearance per side at the default root. | Finish or cancel a blocking choice without losing page context. |

## dialog.2

Selector: `dialog`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | calc(100dvh - 2 * 1rem) | calc(100dvh - 2 * 0.75rem) | Present a focused decision in the native top layer. Bound the dialog by the dynamic viewport minus the selected external clearance, preserving its internal scroll. | Finish or cancel a blocking choice without losing page context. |

## dialog.4

Selector: `dialog`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xl) | 1.5rem | 1rem | Present a focused decision in the native top layer. Inset dialog content by 24px normal or 16px compact, leaving space for the offset focus perimeter. | Finish or cancel a blocking choice without losing page context. |

## dialog.5

Selector: `dialog`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Present a focused decision in the native top layer. Expose the decision boundary when backdrop perception is limited. | Finish or cancel a blocking choice without losing page context. |

## dialog.6

Selector: `dialog`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) | 0.75rem | 0.5rem | Present a focused decision in the native top layer. Use the containing-panel corner role. | Finish or cancel a blocking choice without losing page context. |

## skip.2

Selector: `.ui-skip`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Provide a keyboard shortcut to the working document. Place the revealed shortcut near the top edge. | Bypass repeated navigation. |

## skip.3

Selector: `.ui-skip`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Provide a keyboard shortcut to the working document. Place it at the start of the reading direction. | Bypass repeated navigation. |

## skip.4

Selector: `.ui-skip`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| transform | translateY(-200%) | translateY(-200%) | translateY(-200%) | Provide a keyboard shortcut to the working document. Keep the shortcut outside the viewport until focused while preserving keyboard reachability. | Bypass repeated navigation. |

## skip.6

Selector: `.ui-skip`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-md) | 0.75rem | 0.5rem | Provide a keyboard shortcut to the working document. Give the focused shortcut a comfortable target. | Bypass repeated navigation. |

## skip-focus.1

Selector: `.ui-skip:focus`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| transform | translateY(0) | translateY(0) | translateY(0) | Reveal the skip shortcut on keyboard focus. Return the focused link to its visible start-edge position. | See the bypass action before activating it. |

## inline-field.1

Selector: `.ui-field`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block | var(--ui-space-md) | 0.75rem | 0.5rem | Separate values in a directly editable record. Keep each persistent label and prefilled value visually grouped. | Scan a field’s current value and focus it without opening another surface. |

## inline-field.2

Selector: `.ui-field`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Separate values in a directly editable record. Distinguish neighboring values without putting a box around every unfocused input. | Scan a field’s current value and focus it without opening another surface. |

## inline-field.4

Selector: `.ui-field`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| row-gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate values in a directly editable record. Leave 8px normal or 6px compact between field rows, clearing the 6px extent of the offset focus perimeter. | Scan a field’s current value and focus it without opening another surface. |

## inline-field.5

Selector: `.ui-field`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | minmax(0, 1fr) | minmax(0, 1fr) | minmax(0, 1fr) | Separate values in a directly editable record. Allow long native values and enlarged text to stay inside the field rather than imposing an intrinsic grid-column minimum. | Scan a field’s current value and focus it without opening another surface. |

## field-margins.1

Selector: `.ui-field > *`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block | 0 | 0 | 0 | Remove a second source of spacing inside a field. Let the field row gap own both sides of child separation rather than adding inherited paragraph bottom margins. | Read label, input and help as one group with a visible unobstructed focus ring. |

## inline-control-focus.3

Selector: `.ui-inline-control:focus`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | Reveal native input boundaries as soon as editing receives focus. Identify editing focus even when it was reached with a pointer rather than focus-visible. | Know exactly which value is being edited using pointer, touch or keyboard. |

## inline-control-focus.4

Selector: `.ui-inline-control:focus`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline-offset | 3px | 3px | 3px | Reveal native input boundaries as soon as editing receives focus. Separate the focus perimeter from the native input border. | Know exactly which value is being edited using pointer, touch or keyboard. |

## inline-notes-rest.1

Selector: `textarea.ui-inline-control`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| resize | none | none | none | Keep an unfocused notes value visually quiet. Hide only the resize handle while resting; native rows still provide multiline reading space. | Read a prefilled note without a persistent resize handle suggesting an open editor. |

## inline-notes-focus.1

Selector: `textarea.ui-inline-control:focus`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| resize | vertical | vertical | vertical | Restore native note resizing during editing. Allow more editing height without changing its column width. | Enlarge the notes workspace when the field receives focus. |

## appearance-box.1

Selector: `.ui-appearance`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-xl) | 1.5rem | 1rem | Group the independent appearance and density preferences. Separate appearance preferences from navigation and the reference introduction. | Choose brightness and status palette without changing task drafts. |

## switch-track.4

Selector: `.ui-switch input[type="checkbox"]`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | var(--ui-switch-width) | 3rem | 2.5rem | Show a sliding binary preference using a native checkbox. Use a 48px normal or 40px compact track at the default root, inside the larger clickable label. | Set a named on/off preference with native click, touch and Space behavior. |

## switch-track.5

Selector: `.ui-switch input[type="checkbox"]`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | var(--ui-switch-height) | 1.75rem | 1.5rem | Show a sliding binary preference using a native checkbox. Use a 28px normal or 24px compact track at the default root, preserving a distinguishable thumb. | Set a named on/off preference with native click, touch and Space behavior. |

## switch-track.6

Selector: `.ui-switch input[type="checkbox"]`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 2px | 2px | 2px | Show a sliding binary preference using a native checkbox. Keep the thumb away from the track boundary. | Set a named on/off preference with native click, touch and Space behavior. |

## switch-track.7

Selector: `.ui-switch input[type="checkbox"]`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | var(--ui-switch-stroke) solid var(--ui-border) | 2px solid var(--ui-border) | 1px solid var(--ui-border) | Show a sliding binary preference using a native checkbox. Retain a crisp 2px normal or 1px compact track boundary in every palette. | Set a named on/off preference with native click, touch and Space behavior. |

## switch-track.8

Selector: `.ui-switch input[type="checkbox"]`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 1rem | 1rem | 1rem | Show a sliding binary preference using a native checkbox. Distinguish a sliding preference from a square choice mark. | Set a named on/off preference with native click, touch and Space behavior. |

## switch-thumb.2

Selector: `.ui-switch input[type="checkbox"]::before`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | var(--ui-switch-thumb) | 1.125rem | 1rem | Mark the slider’s current position without using color alone. Use an 18px normal or 16px compact thumb at the default root so position remains identifiable. | Distinguish on and off from the thumb’s left/right position. |

## switch-thumb.3

Selector: `.ui-switch input[type="checkbox"]::before`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | var(--ui-switch-thumb) | 1.125rem | 1rem | Mark the slider’s current position without using color alone. Keep the thumb circular rather than stretching it with label text. | Distinguish on and off from the thumb’s left/right position. |

## switch-thumb.4

Selector: `.ui-switch input[type="checkbox"]::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 50% | 50% | 50% | Mark the slider’s current position without using color alone. Make the moving thumb distinguishable from its rounded track. | Distinguish on and off from the thumb’s left/right position. |

## switch-thumb.6

Selector: `.ui-switch input[type="checkbox"]::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| transform | translateX(0) | translateX(0) | translateX(0) | Mark the slider’s current position without using color alone. Place the off thumb at the start of the travel computed from its track, border, padding and thumb dimensions. | Distinguish on and off from the thumb’s left/right position. |

## switch-thumb-on.1

Selector: `.ui-switch input[type="checkbox"]:checked::before`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| transform | translateX(calc(var(--ui-switch-width) - var(--ui-switch-thumb) - 2 * var(--ui-switch-stroke) - 4px)) | translateX(calc(3rem - 1.125rem - 2 * 2px - 4px)) | translateX(calc(2.5rem - 1rem - 2 * 1px - 4px)) | Move and contrast the enabled slider thumb. Derive the end position from track width minus thumb, two borders and two 2px insets: 22px normal or 18px compact at the default root, with no animation. | Read the on position in every brightness and palette combination. |

## distinct-status.1

Selector: `:root[data-vision="distinct"] .ui-status`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid currentColor | 1px solid currentColor | 1px solid currentColor | Add a shape cue to the alternate status palette. Outline named state labels in their contrast-tested text color. | Identify status boundaries without depending on hue perception. |

## forced-switch.2

Selector: `.ui-switch input[type="checkbox"]`; condition: `(forced-colors: active)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 1.25rem | 1.25rem | 1.25rem | Return slider presentation to a native mark under forced colors. Use the ordinary native mark width inside the unchanged large label target. | Use a visible native on/off control in the selected system palette. |

## forced-switch.3

Selector: `.ui-switch input[type="checkbox"]`; condition: `(forced-colors: active)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1.25rem | 1.25rem | 1.25rem | Return slider presentation to a native mark under forced colors. Use the ordinary native mark height while preserving its checked state. | Use a visible native on/off control in the selected system palette. |

## forced-switch.4

Selector: `.ui-switch input[type="checkbox"]`; condition: `(forced-colors: active)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Return slider presentation to a native mark under forced colors. Remove custom-track padding from the restored native mark. | Use a visible native on/off control in the selected system palette. |

## prose-root.2

Selector: `.ui-prose`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 65ch | 65ch | 65ch | Provide an opt-in reading surface for document content. Limit sustained reading width while allowing the available viewport to be narrower. | Read a document without changing application navigation, forms or task lists. |

## prose-root.3

Selector: `.ui-prose`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Provide an opt-in reading surface for document content. Let embedded documents shrink inside flex/grid workspaces instead of forcing page overflow. | Read a document without changing application navigation, forms or task lists. |

## prose-root.5

Selector: `.ui-prose`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.5 | 1.5 | 1.5 | Provide an opt-in reading surface for document content. Use the same readable body rhythm in both density profiles. | Read a document without changing application navigation, forms or task lists. |

## prose-reset.1

Selector: `.ui-prose :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block | 0 | 0 | 0 | Give document block spacing one explicit owner. Reset both block margins before applying sibling rhythm; the first/last block adds no outside margin. | Read paragraphs, quotations and lists without accumulated browser-default margins. |

## prose-reset.2

Selector: `.ui-prose :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-inline | 0 | 0 | 0 | Give document block spacing one explicit owner. Remove browser quote/figure side margins so their documented inset owns horizontal space. | Read paragraphs, quotations and lists without accumulated browser-default margins. |

## prose-rhythm.1

Selector: `.ui-prose :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table) + :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table)`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-lg) | 1rem | 0.75rem | Separate consecutive document blocks. Use one 16px normal / 12px compact gap between ordinary neighboring blocks. | Recognize a new reading block without doubled trailing and leading margins. |

## prose-heading.2

Selector: `.ui-prose :where(h1, h2, h3, h4, h5, h6)`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| scroll-margin-block-start | var(--ui-space-lg) | 1rem | 0.75rem | Keep all six document ranks visibly related. Leave breathing room above a heading reached by an anchor without adding flow height. | Find the document structure using readable, consistent heading emphasis. |

## prose-h1.1

Selector: `.ui-prose h1`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 2rem | 2rem | 2rem | Express the document heading hierarchy. Identify the document title at the largest reading size. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h1.2

Selector: `.ui-prose h1`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.2 | 1.2 | 1.2 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h2.1

Selector: `.ui-prose h2`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.75rem | 1.75rem | 1.75rem | Express the document heading hierarchy. Separate major document sections below the title. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h2.2

Selector: `.ui-prose h2`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.25 | 1.25 | 1.25 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h3.1

Selector: `.ui-prose h3`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.5rem | 1.5rem | 1.5rem | Express the document heading hierarchy. Identify a subsection within a major document topic. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h3.2

Selector: `.ui-prose h3`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.25 | 1.25 | 1.25 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h4.1

Selector: `.ui-prose h4`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.25rem | 1.25rem | 1.25rem | Express the document heading hierarchy. Mark a local topic without competing with its parent section. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h4.2

Selector: `.ui-prose h4`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.3 | 1.3 | 1.3 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h5.1

Selector: `.ui-prose h5`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.125rem | 1.125rem | 1.125rem | Express the document heading hierarchy. Distinguish a detailed subdivision while staying above body size. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h5.2

Selector: `.ui-prose h5`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.35 | 1.35 | 1.35 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h6.1

Selector: `.ui-prose h6`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1rem | 1rem | 1rem | Express the document heading hierarchy. Keep the deepest heading readable at body size, with heading weight. This size is protected in both densities. | Recognize a heading rank without reducing text size in compact mode. |

## prose-h6.2

Selector: `.ui-prose h6`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1.4 | 1.4 | 1.4 | Express the document heading hierarchy. Keep wrapped heading lines together while allowing glyphs and annotations room. | Recognize a heading rank without reducing text size in compact mode. |

## prose-heading-before.1

Selector: `.ui-prose :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table) + :where(h1, h2, h3, h4, h5, h6)`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-xl) | 1.5rem | 1rem | Make a new document topic distinct from preceding content. Use 24px normal / 16px compact before a heading, greater than its following gap. | Associate the heading with what follows rather than the paragraph before it. |

## prose-heading-after.1

Selector: `.ui-prose :where(h1, h2, h3, h4, h5, h6) + :where(p, ul, ol, dl, blockquote, pre, figure, details, hr, h1, h2, h3, h4, h5, h6, .ui-prose-table)`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-md) | 0.75rem | 0.5rem | Connect a heading to its introductory content. Use 12px normal / 8px compact after a heading; when two headings are consecutive, this nearer grouping takes precedence. | Start reading the correct section without an oversized gap below its title. |

## prose-lists.1

Selector: `.ui-prose :where(ul, ol)`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | var(--ui-space-xl) | 1.5rem | 1rem | Keep list markers outside aligned item text. Reserve a 24px normal / 16px compact bullet gutter using logical direction. | Follow wrapped items and distinguish nesting without inserting typed bullet characters. |

## prose-lists.2

Selector: `.ui-prose :where(ul, ol)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| list-style-position | outside | outside | outside | Keep list markers outside aligned item text. Align wrapped text with item text rather than wrapping beneath the marker. | Follow wrapped items and distinguish nesting without inserting typed bullet characters. |

## prose-numbering.2

Selector: `.ui-prose ol`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | 4ch | 4ch | 4ch | Keep sequence visible and preserve native start/value semantics. Reserve a protected character-based gutter for ordinary multi-digit step numbers. | Read steps in their actual order, including explicit continuation numbers. |

## prose-wide-numbering.1

Selector: `.ui-prose ol[start], .ui-prose ol.ui-list-wide`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | 8ch | 8ch | 8ch | Allow larger explicit starting numbers. Reserve six digits, punctuation and separation; this structural marker allowance does not shrink with density. | Read up to six-digit sequence numbers without clipping them at the content edge. |

## prose-item-gap.1

Selector: `.ui-prose li + li`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate sibling list items. Use 8px normal / 6px compact between item boxes. | Scan individual points while keeping them grouped more closely than independent paragraphs. |

## prose-nested-list.1

Selector: `.ui-prose li > :where(ul, ol)`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep a nested list attached to its owning item. Use the related-content gap after the parent text; no extra list bottom margin is added. | Read supporting subpoints as part of the parent rather than a new document block. |

## prose-loose-item.1

Selector: `.ui-prose li > p + p`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate paragraphs within one list item. Use one related-content gap rather than full document paragraph separation. | Read a longer explanation without confusing each paragraph with a new numbered step. |

## prose-definition.1

Selector: `.ui-prose dd`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-inline-start | var(--ui-space-lg) | 1rem | 0.75rem | Associate a definition with its preceding term. Inset definitions by 16px normal / 12px compact instead of the browser default 40px. | Read a term and explanation as one entry with a modest inset. |

## prose-definition.2

Selector: `.ui-prose dd`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block | var(--ui-space-xs) 0 | 0.25rem 0 | 0.25rem 0 | Associate a definition with its preceding term. Keep 4px after the term and no trailing margin that could double the next entry gap. | Read a term and explanation as one entry with a modest inset. |

## prose-next-term.1

Selector: `.ui-prose dd + dt`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-md) | 0.75rem | 0.5rem | Separate consecutive definition entries. Use a 12px normal / 8px compact entry boundary. | Recognize where the next term starts. |

## prose-quote.1

Selector: `.ui-prose blockquote`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | var(--ui-space-lg) | 1rem | 0.75rem | Set quoted material apart without suggesting an alert. Separate quote text from its neutral start rule by 16px normal / 12px compact. | Distinguish another author’s words while reading them at normal body contrast. |

## prose-quote.2

Selector: `.ui-prose blockquote`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | var(--ui-notice-stroke) solid var(--ui-border) | 4px solid var(--ui-border) | 3px solid var(--ui-border) | Set quoted material apart without suggesting an alert. Reuse the neutral 4px normal / 3px compact guidance stroke as a quotation boundary. | Distinguish another author’s words while reading them at normal body contrast. |

## prose-attribution.1

Selector: `.ui-prose .ui-attribution`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875rem | 0.875rem | 0.875rem | Identify a quotation attribution. Use the existing readable secondary size, unchanged by density. | Find the source separately from the quoted passage. |

## prose-mark.3

Selector: `.ui-prose mark`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 1px solid currentColor | 1px solid currentColor | 1px solid currentColor | Identify a relevant text passage using a neutral framed highlight. Make the highlight detectable through its boundary as well as a small background difference. | Locate highlighted content in either brightness without mistaking it for success or error. |

## prose-monospace.2

Selector: `.ui-prose :where(code, pre, kbd, samp)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875em | 0.875em | 0.875em | Make literal code, key names and machine output identifiable. Keep literal text readable while avoiding oversized monospace glyphs. | Copy exact characters without proportional text disguising their spacing. |

## prose-inline-code.2

Selector: `.ui-prose :not(pre) > code`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline | var(--ui-space-xs) | 0.25rem | 0.25rem | Separate a short literal identifier from surrounding prose. Keep 4px at either edge of the identifier without adding line-height-changing block padding. | Recognize code without treating it as a button or reducing its copyable content. |

## prose-pre.1

Selector: `.ui-prose pre`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Preserve exact source layout inside a bounded reading block. Bound the preformatted box by its document container. | Inspect indentation and long code lines without horizontal scrolling of the whole page. |

## prose-pre.5

Selector: `.ui-prose pre`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Preserve exact source layout inside a bounded reading block. Inset code by 16px normal / 12px compact, leaving room for focus. | Inspect indentation and long code lines without horizontal scrolling of the whole page. |

## prose-pre.6

Selector: `.ui-prose pre`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Preserve exact source layout inside a bounded reading block. Give the code region a quiet boundary without implying an editable form. | Inspect indentation and long code lines without horizontal scrolling of the whole page. |

## prose-pre-code.1

Selector: `.ui-prose pre code`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | inherit | inherit | inherit | Keep the code block’s type scale single-owned. Cancel the nested 0.875em reduction; the pre element already owns that scale. | Read a code block without compounded font-size reduction. |

## prose-key.1

Selector: `.ui-prose kbd`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 var(--ui-space-xs) | 0 0.25rem | 0 0.25rem | Identify keyboard input as a key name. Reserve a small inline inset while preserving the paragraph rhythm. | Recognize an instruction such as Ctrl and Enter without a fake interactive button. |

## prose-key.2

Selector: `.ui-prose kbd`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Identify keyboard input as a key name. Use a clear neutral key boundary, never a hover/click state. | Recognize an instruction such as Ctrl and Enter without a fake interactive button. |

## prose-key.3

Selector: `.ui-prose kbd`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Identify keyboard input as a key name. Relate the small keycap shape to other bounded UI without adding a shadow. | Recognize an instruction such as Ctrl and Enter without a fake interactive button. |

## prose-abbreviation.2

Selector: `.ui-prose abbr[title]`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| text-underline-offset | 0.2em | 0.2em | 0.2em | Signal that an abbreviation has an expansion. Separate the indicator from letter descenders as for existing text links. | Notice supplementary terminology without confusing it with a link. |

## prose-annotations.1

Selector: `.ui-prose :where(sub, sup)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875em | 0.875em | 0.875em | Keep small baseline annotations readable. Use a readable relative annotation size instead of a tiny absolute label. | Read formula indices and references without changing the whole line rhythm. |

## prose-annotations.2

Selector: `.ui-prose :where(sub, sup)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 0 | 0 | 0 | Keep small baseline annotations readable. Let the surrounding body line own spacing while native sub/super vertical alignment places the annotation. | Read formula indices and references without changing the whole line rhythm. |

## prose-rule.1

Selector: `.ui-prose hr`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Mark a thematic change using a quiet separator. Remove browser inset borders before drawing one intended edge. | Recognize a break in topic without an alarm-like color band. |

## prose-rule.2

Selector: `.ui-prose hr`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-start | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Mark a thematic change using a quiet separator. Draw one passive divider with protected 1px width. | Recognize a break in topic without an alarm-like color band. |

## prose-table-region.1

Selector: `.ui-prose .ui-prose-table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Contain a document table’s two-dimensional layout. Bound the region to the prose width. | Compare wide columns using a named keyboard-accessible region without panning the page. |

## prose-table-region.3

Selector: `.ui-prose .ui-prose-table`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) | 0.5rem | 0.375rem | Contain a document table’s two-dimensional layout. Reserve 8px normal / 6px compact inner clearance for links and their focus outlines. | Compare wide columns using a named keyboard-accessible region without panning the page. |

## prose-table.1

Selector: `.ui-prose table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Fit document tables to their content and reading region. Use the available comparison width. | Read a small table without inheriting the application example’s six-column width. |

## prose-table.2

Selector: `.ui-prose table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Fit document tables to their content and reading region. Override the .table sample’s 36rem minimum when reused inside a document. | Read a small table without inheriting the application example’s six-column width. |

## prose-table.3

Selector: `.ui-prose table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-collapse | collapse | collapse | collapse | Fit document tables to their content and reading region. Avoid doubled cell dividers. | Read a small table without inheriting the application example’s six-column width. |

## prose-cell.1

Selector: `.ui-prose :where(th, td)`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) var(--ui-space-md) | 0.5rem 0.75rem | 0.375rem 0.5rem | Keep document cells legible and related to their headers. Use 8/12px normal and 6/8px compact vertical/horizontal clearance. | Compare values using semantic columns without cramped or overflowing cells. |

## prose-cell.4

Selector: `.ui-prose :where(th, td)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Keep document cells legible and related to their headers. Separate rows without heavy full grids. | Compare values using semantic columns without cramped or overflowing cells. |

## prose-table-caption.3

Selector: `.ui-prose caption`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block-end | var(--ui-space-sm) | 0.5rem | 0.375rem | Introduce the comparison before its data. Separate the caption from header cells by the related-content gap. | Know the table’s purpose before navigating its headers. |

## prose-image.2

Selector: `.ui-prose img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Fit an explicitly permitted image without distortion. Scale down an image wider than its reading container. | Inspect local document media without horizontal page overflow. |

## prose-image.3

Selector: `.ui-prose img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | auto | auto | auto | Fit an explicitly permitted image without distortion. Preserve intrinsic aspect ratio, including dimensions reserved by HTML width/height. | Inspect local document media without horizontal page overflow. |

## prose-figure-caption.1

Selector: `.ui-prose figcaption`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep a figure’s explanation attached to its image. Use the related-content gap between media and its caption. | Read the image’s meaning and source without confusing the caption with body content. |

## prose-figure-caption.2

Selector: `.ui-prose figcaption`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875rem | 0.875rem | 0.875rem | Keep a figure’s explanation attached to its image. Use the existing readable secondary size. | Read the image’s meaning and source without confusing the caption with body content. |

## prose-details.1

Selector: `.ui-prose details`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Bound optional supporting document material. Leave 16px normal / 12px compact inset for text and focus. | Recognize information that can be expanded without hiding the main explanation. |

## prose-details.2

Selector: `.ui-prose details`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Bound optional supporting document material. Identify the optional group with a quiet boundary. | Recognize information that can be expanded without hiding the main explanation. |

## prose-summary.1

Selector: `.ui-prose summary`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Keep native disclosure activation visible and comfortable. Use the governed fine/coarse pointer target floor on the native summary. | Open optional material with click, touch, Enter or Space and see its current state. |

## prose-summary-focus.1

Selector: `.ui-prose summary:focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | Expose keyboard focus on a native disclosure label. Match the protected keyboard focus perimeter used by other native controls. | Find the disclosure receiving keyboard input in every appearance. |

## prose-summary-focus.2

Selector: `.ui-prose summary:focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline-offset | 3px | 3px | 3px | Expose keyboard focus on a native disclosure label. Separate keyboard focus from the disclosure text and containing border. | Find the disclosure receiving keyboard input in every appearance. |

## prose-summary-content.1

Selector: `.ui-prose details[open] > summary + *`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate an expanded disclosure from its label. Use one related-content gap after the open summary. | Recognize which content was revealed by the summary. |

## catalog-card.1

Selector: `.ui-card`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xl) | 1.5rem | 1rem | Contain one related item and its actions. Inset content with the governed panel token and clear offset focus. | Recognize which heading, content and action belong together. |

## catalog-card.2

Selector: `.ui-card`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Contain one related item and its actions. Allow the containing card to shrink around bounded source and native editors. | Recognize which heading, content and action belong together. |

## catalog-card.3

Selector: `.ui-card`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Contain one related item and its actions. Keep the passive group edge crisp. | Recognize which heading, content and action belong together. |

## catalog-card.4

Selector: `.ui-card`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) | 0.75rem | 0.5rem | Contain one related item and its actions. Distinguish the container from its controls. | Recognize which heading, content and action belong together. |

## catalog-gallery.2

Selector: `.ui-catalog`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | minmax(0, 1fr) | minmax(0, 1fr) | minmax(0, 1fr) | Lay out independently inspectable component examples. Keep the page track shrinkable even when a sample contains long literal source. | Review components without page-level horizontal panning. |

## catalog-gallery.3

Selector: `.ui-catalog`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xl) | 1.5rem | 1rem | Lay out independently inspectable component examples. Separate peer sections with the governed token. | Review components without page-level horizontal panning. |

## catalog-gallery.4

Selector: `.ui-catalog`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Lay out independently inspectable component examples. Let long content shrink within the page. | Review components without page-level horizontal panning. |

## catalog-sample.1

Selector: `.ui-catalog-sample`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Bound the live component within its review example. Clear content and offset focus from the boundary. | Distinguish the example from gallery navigation and adjacent components. |

## catalog-sample.2

Selector: `.ui-catalog-sample`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Bound the live component within its review example. Identify the live example without status color. | Distinguish the example from gallery navigation and adjacent components. |

## catalog-sample.3

Selector: `.ui-catalog-sample`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Bound the live component within its review example. Allow native controls to fit narrow hosts. | Distinguish the example from gallery navigation and adjacent components. |

## catalog-sample-children.1

Selector: `.ui-catalog-sample > *`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-end | 0 | 0 | 0 | Let the live sample own its trailing inset. Remove extra child trailing gaps. | Read a balanced sample without duplicate paragraph margins. |

## catalog-sample-siblings.1

Selector: `.ui-catalog-sample > * + *`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-md) | 0.75rem | 0.5rem | Separate peer controls inside one example. Use one leading local-content gap. | Recognize separate sample elements while keeping their group together. |

## catalog-index.2

Selector: `.ui-catalog-index`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | Keep the component index responsive. Preserve a useful link measure while allowing one narrow column. | Find a named example without an excessively long single-column index. |

## catalog-index.3

Selector: `.ui-catalog-index`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep the component index responsive. Separate related index links. | Find a named example without an excessively long single-column index. |

## catalog-index.4

Selector: `.ui-catalog-index`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | var(--ui-space-lg) | 1rem | 0.75rem | Keep the component index responsive. Reserve a native marker gutter. | Find a named example without an excessively long single-column index. |

## catalog-source.1

Selector: `.ui-catalog-source`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep inspectable markup bounded. Bound source to its card. | Copy literal example markup without panning the document. |

## catalog-source.3

Selector: `.ui-catalog-source`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Keep inspectable markup bounded. Leave reading and focus clearance. | Copy literal example markup without panning the document. |

## catalog-source-code.1

Selector: `.ui-catalog-source code`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | inherit | inherit | inherit | Keep nested source type single-owned. Let pre own the source type size. | Read literal markup without compounded size reduction. |

## catalog-button.4

Selector: `.ui-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Style a real action target consistently. Separate a mark from its written action. | Activate a named action with native pointer and keyboard behavior. |

## catalog-button.5

Selector: `.ui-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Style a real action target consistently. Use the pointer-specific target floor. | Activate a named action with native pointer and keyboard behavior. |

## catalog-button.6

Selector: `.ui-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | var(--ui-control-min) | 2.75rem | 2.25rem | Style a real action target consistently. Keep short targets sufficiently wide. | Activate a named action with native pointer and keyboard behavior. |

## catalog-button.7

Selector: `.ui-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-control-pad-block) var(--ui-space-lg) | 0.5rem 1rem | 0.25rem 0.75rem | Style a real action target consistently. Apply governed target clearance without smaller text. | Activate a named action with native pointer and keyboard behavior. |

## catalog-button.8

Selector: `.ui-button`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-width | 1px | 1px | 1px | Style a real action target consistently. Reserve a crisp boundary without resetting primary border color. | Activate a named action with native pointer and keyboard behavior. |

## catalog-button.10

Selector: `.ui-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Style a real action target consistently. Use the control corner role. | Activate a named action with native pointer and keyboard behavior. |

## catalog-button.11

Selector: `.ui-button`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | inherit | inherit | inherit | Style a real action target consistently. Respect the body reading size rather than a smaller platform default. | Activate a named action with native pointer and keyboard behavior. |

## catalog-button-group.3

Selector: `.ui-button-group, .ui-join`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep related actions adjacent while allowing wrapping. Clear offset focus between peer actions. | Recognize peer actions without hidden overflow or roving-menu semantics. |

## catalog-join.1

Selector: `.ui-join`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) | 0.5rem | 0.375rem | Frame a related action group. Clear contained focus perimeters. | Recognize joined actions while each remains separately reachable. |

## catalog-join.2

Selector: `.ui-join`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Frame a related action group. Add a passive outer group edge. | Recognize joined actions while each remains separately reachable. |

## catalog-join.3

Selector: `.ui-join`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Frame a related action group. Use a related-control shape. | Recognize joined actions while each remains separately reachable. |

## catalog-editors.4

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Keep native editors readable and bounded. Identify real native editing boundaries. | Enter values with platform affordances and visible focus. |

## catalog-editors.5

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Keep native editors readable and bounded. Use the existing control shape. | Enter values with platform affordances and visible focus. |

## catalog-editors.6

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-control-pad-block) var(--ui-space-md) | 0.5rem 0.75rem | 0.25rem 0.5rem | Keep native editors readable and bounded. Use governed editor insets. | Enter values with platform affordances and visible focus. |

## catalog-editors.7

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Keep native editors readable and bounded. Protect pointer-specific targets. | Enter values with platform affordances and visible focus. |

## catalog-editors.8

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Keep native editors readable and bounded. Fit the available field width. | Enter values with platform affordances and visible focus. |

## catalog-editors.9

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Keep native editors readable and bounded. Remove intrinsic native width floors. | Enter values with platform affordances and visible focus. |

## catalog-editors.10

Selector: `.ui-input, .ui-select, .ui-textarea, .ui-date-picker, .ui-combobox, .ui-otp, .ui-file-input`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep native editors readable and bounded. Keep the box within its host. | Enter values with platform affordances and visible focus. |

## catalog-textarea.1

Selector: `.ui-textarea`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-notes-min) | 7rem | 5.5rem | Provide a native multiline editor. Offer the governed initial multiline viewport. | Enter line breaks and resize notes vertically. |

## catalog-textarea.2

Selector: `.ui-textarea`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| resize | vertical | vertical | vertical | Provide a native multiline editor. Allow more notes height without widening the page. | Enter line breaks and resize notes vertically. |

## catalog-otp.2

Selector: `.ui-otp`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| letter-spacing | 0.25em | 0.25em | 0.25em | Keep a verification code in one native input. Separate characters while preserving one native paste target. | Paste or receive a whole code without scripted character-box navigation. |

## catalog-file-input.2

Selector: `.ui-file-input::file-selector-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Expose the browser-owned file chooser. Protect native chooser activation. | Choose a file only after an explicit native action. |

## catalog-file-input.3

Selector: `.ui-file-input::file-selector-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-inline-end | var(--ui-space-sm) | 0.5rem | 0.375rem | Expose the browser-owned file chooser. Separate the chooser from the native filename. | Choose a file only after an explicit native action. |

## catalog-field.2

Selector: `.ui-fieldset, .ui-form-field`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Group a persistent label, native control and supporting help. Clear the offset focus ring between rows. | Understand the question and enter a value without losing its name. |

## catalog-field.3

Selector: `.ui-fieldset, .ui-form-field`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Group a persistent label, native control and supporting help. Let native controls fit the host. | Understand the question and enter a value without losing its name. |

## catalog-field.4

Selector: `.ui-fieldset, .ui-form-field`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Group a persistent label, native control and supporting help. Avoid duplicating panel inset. | Understand the question and enter a value without losing its name. |

## catalog-field.5

Selector: `.ui-fieldset, .ui-form-field`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Group a persistent label, native control and supporting help. Retain fieldset semantics without a duplicate frame. | Understand the question and enter a value without losing its name. |

## catalog-field.6

Selector: `.ui-fieldset, .ui-form-field`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Group a persistent label, native control and supporting help. Remove browser fieldset outer gaps. | Understand the question and enter a value without losing its name. |

## catalog-input-group.3

Selector: `.ui-input-group`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Associate a fixed prefix or suffix with an input. Separate fixed text while clearing focus. | Understand units/context without putting fake values into the editable string. |

## catalog-input-group.4

Selector: `.ui-input-group`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Associate a fixed prefix or suffix with an input. Allow the editor to shrink. | Understand units/context without putting fake values into the editable string. |

## catalog-group-input.1

Selector: `.ui-input-group > input`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| flex | 1 1 0 | 1 1 0 | 1 1 0 | Give editable text the remaining group width. Use available space and permit shrinking. | Read units without losing the editable region. |

## catalog-group-input.2

Selector: `.ui-input-group > input`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Give editable text the remaining group width. Remove the native intrinsic width floor. | Read units without losing the editable region. |

## catalog-checkbox.1

Selector: `.ui-checkbox, .ui-radio`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 1.25rem | 1.25rem | 1.25rem | Style a native multiple-choice mark. Keep the existing 20px native mark. | Toggle an explicitly labelled option without custom state synchronization. |

## catalog-checkbox.2

Selector: `.ui-checkbox, .ui-radio`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1.25rem | 1.25rem | 1.25rem | Style a native multiple-choice mark. Keep the native mark square. | Toggle an explicitly labelled option without custom state synchronization. |

## catalog-slider.1

Selector: `.ui-range`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Expose a bounded numeric choice. Expose the available native track. | Change a value with native arrow keys or pointer input. |

## catalog-slider.2

Selector: `.ui-range`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Expose a bounded numeric choice. Keep the track within narrow hosts. | Change a value with native arrow keys or pointer input. |

## catalog-slider.3

Selector: `.ui-range`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Expose a bounded numeric choice. Protect native slider hit height. | Change a value with native arrow keys or pointer input. |

## catalog-switch.1

Selector: `.ui-toggle`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Present a named binary native preference. Relate the choice label to existing switches. | Toggle an explicit choice with native checked state and Space. |

## catalog-switch.2

Selector: `.ui-toggle`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline | var(--ui-space-sm) | 0.5rem | 0.375rem | Present a named binary native preference. Clear the native mark and label from the edge. | Toggle an explicit choice with native checked state and Space. |

## catalog-toggle.3

Selector: `.ui-toggle-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Use native checkbox semantics for a persistent binary choice. Separate mark and name. | See and change the selected option without a fake aria-pressed button. |

## catalog-toggle.4

Selector: `.ui-toggle-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Use native checkbox semantics for a persistent binary choice. Use the governed target floor. | See and change the selected option without a fake aria-pressed button. |

## catalog-toggle.5

Selector: `.ui-toggle-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-control-pad-block) var(--ui-space-md) | 0.5rem 0.75rem | 0.25rem 0.5rem | Use native checkbox semantics for a persistent binary choice. Inset the selectable label. | See and change the selected option without a fake aria-pressed button. |

## catalog-toggle.6

Selector: `.ui-toggle-button`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Use native checkbox semantics for a persistent binary choice. Expose the option boundary. | See and change the selected option without a fake aria-pressed button. |

## catalog-toggle.7

Selector: `.ui-toggle-button`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Use native checkbox semantics for a persistent binary choice. Use a control shape. | See and change the selected option without a fake aria-pressed button. |

## catalog-toggle-group.3

Selector: `.ui-toggle-group`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep several persistent binary choices together. Clear peer focus. | Select multiple explicit options with native checkbox behavior. |

## catalog-toggle-group.4

Selector: `.ui-toggle-group`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Keep several persistent binary choices together. Retain group semantics without another frame. | Select multiple explicit options with native checkbox behavior. |

## catalog-toggle-group.5

Selector: `.ui-toggle-group`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Keep several persistent binary choices together. Let the host own its inset. | Select multiple explicit options with native checkbox behavior. |

## catalog-rating.3

Selector: `.ui-rating`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Offer a bounded native single-choice scale. Separate complete label targets. | Choose a named rating with arrow keys and full-size labels. |

## catalog-rating.4

Selector: `.ui-rating`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Offer a bounded native single-choice scale. Retain native group semantics. | Choose a named rating with arrow keys and full-size labels. |

## catalog-rating.5

Selector: `.ui-rating`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Offer a bounded native single-choice scale. Use the containing inset. | Choose a named rating with arrow keys and full-size labels. |

## catalog-rating-star.1

Selector: `.ui-rating-star`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.5rem | 1.5rem | 1.5rem | Use familiar star labels alongside real native rating choices. Make the star silhouette clearly distinguishable. | Choose the named one-to-five rating without interpreting unlabeled symbols. |

## catalog-rating-star.2

Selector: `.ui-rating-star`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| line-height | 1 | 1 | 1 | Use familiar star labels alongside real native rating choices. Keep the star within the protected choice target. | Choose the named one-to-five rating without interpreting unlabeled symbols. |

## catalog-disclosures.1

Selector: `.ui-accordion, .ui-collapse, .ui-sidebar, .ui-trace`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Frame optional native disclosures. Clear reading and focus from the edge. | Find the named summary and inspect optional content. |

## catalog-disclosures.2

Selector: `.ui-accordion, .ui-collapse, .ui-sidebar, .ui-trace`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Frame optional native disclosures. Use a quiet containing edge. | Find the named summary and inspect optional content. |

## catalog-disclosures.3

Selector: `.ui-accordion, .ui-collapse, .ui-sidebar, .ui-trace`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Frame optional native disclosures. Use the bounded-support shape. | Find the named summary and inspect optional content. |

## catalog-summaries.1

Selector: `.ui-accordion > summary, .ui-collapse > summary, .ui-sidebar > summary, .ui-trace > summary`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Keep native disclosure labels operable. Protect the summary target height. | Use original summary markers and native activation keys. |

## catalog-summary-focus.1

Selector: `.ui-accordion > summary:focus-visible, .ui-collapse > summary:focus-visible, .ui-sidebar > summary:focus-visible, .ui-trace > summary:focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | Include summaries in governed keyboard focus. Use the protected focus perimeter. | Find the disclosure receiving the next keystroke. |

## catalog-summary-focus.2

Selector: `.ui-accordion > summary:focus-visible, .ui-collapse > summary:focus-visible, .ui-sidebar > summary:focus-visible, .ui-trace > summary:focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline-offset | 3px | 3px | 3px | Include summaries in governed keyboard focus. Separate focus from text and boundaries. | Find the disclosure receiving the next keystroke. |

## catalog-disclosed-content.1

Selector: `.ui-accordion[open] > summary + *, .ui-collapse[open] > summary + *, .ui-sidebar[open] > summary + *, .ui-trace[open] > summary + *`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate revealed content from its control. Use a related-content gap. | Read the revealed content as part of the selected explanation. |

## catalog-accordion.1

Selector: `.ui-accordion + .ui-accordion`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-sm) | 0.5rem | 0.375rem | Group related optional explanations. Separate peer summaries without splitting the family. | Expand one named explanation while keeping other summaries reachable. |

## catalog-sidebar.1

Selector: `.ui-sidebar`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 24rem | 24rem | 24rem | Group optional navigation or support next to content. Keep support navigation at a bounded measure. | Reveal a named support list without sacrificing source order. |

## catalog-trace.1

Selector: `.ui-trace ol`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | 4ch | 4ch | 4ch | Group a supplied sequence of diagnostic steps. Reserve native step-number space. | Inspect an ordered explanation without mistaking it for live execution. |

## catalog-alert.1

Selector: `.ui-alert`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Make a condition and its next step readable together. Keep condition and next step clear of the edge. | Recognize an important message from its wording and structure. |

## catalog-alert.2

Selector: `.ui-alert`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | var(--ui-notice-stroke) solid currentColor | 4px solid currentColor | 3px solid currentColor | Make a condition and its next step readable together. Retain an edge cue in addition to the labelled semantic fill. | Recognize an important message from its wording and structure. |

## catalog-empty.1

Selector: `.ui-empty-state`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-section) | 2rem | 1.5rem | Explain missing data and one recovery destination. Give absence and recovery a clear working area. | Distinguish an empty example from an error or loading state. |

## catalog-empty.2

Selector: `.ui-empty-state`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px dashed var(--ui-border) | 1px dashed var(--ui-border) | 1px dashed var(--ui-border) | Explain missing data and one recovery destination. Distinguish a placeholder from populated content. | Distinguish an empty example from an error or loading state. |

## catalog-empty.3

Selector: `.ui-empty-state`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Explain missing data and one recovery destination. Use the bounded-support shape. | Distinguish an empty example from an error or loading state. |

## catalog-avatar.3

Selector: `.ui-avatar`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | var(--ui-swatch-size) | 3rem | 2.5rem | Show an identity thumbnail or initials. Use the governed visual sample size. | Associate a written person name with a compact identity mark. |

## catalog-avatar.4

Selector: `.ui-avatar`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 1 | 1 | 1 | Show an identity thumbnail or initials. Reserve a square before cropping. | Associate a written person name with a compact identity mark. |

## catalog-avatar.5

Selector: `.ui-avatar`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 50% | 50% | 50% | Show an identity thumbnail or initials. Distinguish identity from an action. | Associate a written person name with a compact identity mark. |

## catalog-avatar.6

Selector: `.ui-avatar`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-accent) | 1px solid var(--ui-accent) | 1px solid var(--ui-accent) | Show an identity thumbnail or initials. Keep the silhouette continuous with the filled identity disc. | Associate a written person name with a compact identity mark. |

## catalog-badge.2

Selector: `.ui-badge`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xs) var(--ui-space-sm) | 0.25rem 0.5rem | 0.25rem 0.375rem | Keep short metadata visibly grouped. Inset text by the governed compact steps. | Read supplemental metadata or counts in their owner’s context. |

## catalog-badge.3

Selector: `.ui-badge`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Keep short metadata visibly grouped. Provide a visible non-color boundary. | Read supplemental metadata or counts in their owner’s context. |

## catalog-badge.4

Selector: `.ui-badge`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Keep short metadata visibly grouped. Use the short-label shape. | Read supplemental metadata or counts in their owner’s context. |

## catalog-badge.5

Selector: `.ui-badge`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875rem | 0.875rem | 0.875rem | Keep short metadata visibly grouped. Use the readable secondary size. | Read supplemental metadata or counts in their owner’s context. |

## catalog-aura.1

Selector: `.ui-aura`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Demonstrate an optional accent frame without tinting a large work area. Separate the requested accent from text. | Locate the explicitly labelled example emphasis without confusing it with focus. |

## catalog-aura.2

Selector: `.ui-aura`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | var(--ui-notice-stroke) solid transparent | 4px solid transparent | 3px solid transparent | Demonstrate an optional accent frame without tinting a large work area. Keep the colored frame visible with the governed 4px normal / 3px compact notice stroke. | Locate the explicitly labelled example emphasis without confusing it with focus. |

## catalog-aura.3

Selector: `.ui-aura`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) | 0.75rem | 0.5rem | Demonstrate an optional accent frame without tinting a large work area. Keep the outer shape a containing group. | Locate the explicitly labelled example emphasis without confusing it with focus. |

## catalog-badge-anchor.3

Selector: `.ui-badge-anchor`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block-start | var(--ui-space-md) | 0.75rem | 0.5rem | Associate extra metadata with an owner while reserving its offset space. Reserve space for the superscript badge above the owner. | Read the owner and its supplementary count without clipping either. |

## catalog-badge-anchor.4

Selector: `.ui-badge-anchor`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-end | var(--ui-space-md) | 0.75rem | 0.5rem | Associate extra metadata with an owner while reserving its offset space. Reserve half a typical count disc so it straddles the owner’s trailing corner. | Read the owner and its supplementary count without clipping either. |

## catalog-badge-anchor.5

Selector: `.ui-badge-anchor`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Associate extra metadata with an owner while reserving its offset space. Keep the owner and reserved corner within the sample. | Read the owner and its supplementary count without clipping either. |

## catalog-badge-offset.2

Selector: `.ui-badge--offset`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block-start | 0 | 0 | 0 | Place metadata at its owner’s upper trailing corner. Align the annotation with the reserved top edge. | Recognize counts as annotations rather than aligned operational status. |

## catalog-badge-offset.3

Selector: `.ui-badge--offset`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-end | 0 | 0 | 0 | Place metadata at its owner’s upper trailing corner. Follow the logical trailing corner in both reading directions. | Recognize counts as annotations rather than aligned operational status. |

## catalog-badge-counter.1

Selector: `.ui-badge--counter`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 1.5rem | 1.5rem | 1.5rem | Give short counts the familiar superscript disc or pill presentation. Reserve a readable two-digit count at the default root. | Read the actual count inside its colored annotation. |

## catalog-badge-counter.2

Selector: `.ui-badge--counter`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | 1.5rem | 1.5rem | 1.5rem | Give short counts the familiar superscript disc or pill presentation. Keep a single-digit count disc clearly visible. | Read the actual count inside its colored annotation. |

## catalog-badge-counter.3

Selector: `.ui-badge--counter`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 var(--ui-space-xs) | 0 0.25rem | 0 0.25rem | Give short counts the familiar superscript disc or pill presentation. Allow longer counts such as 99+ to expand into a pill. | Read the actual count inside its colored annotation. |

## catalog-badge-counter.4

Selector: `.ui-badge--counter`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 999px | 999px | 999px | Give short counts the familiar superscript disc or pill presentation. Keep the annotation round without clipping longer content. | Read the actual count inside its colored annotation. |

## catalog-badge-dot.1

Selector: `.ui-badge--dot`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 0.625rem | 0.625rem | 0.625rem | Offer an empty offset notification dot when an exact count is unavailable. Keep the count-free dot compact but visible. | Recognize the supplementary cue through the owner’s name and written explanation. |

## catalog-badge-dot.2

Selector: `.ui-badge--dot`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 0.625rem | 0.625rem | 0.625rem | Offer an empty offset notification dot when an exact count is unavailable. Keep a circular ten-pixel dot at the default root. | Recognize the supplementary cue through the owner’s name and written explanation. |

## catalog-badge-dot.3

Selector: `.ui-badge--dot`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Offer an empty offset notification dot when an exact count is unavailable. Avoid making an empty dot look like a missing text label. | Recognize the supplementary cue through the owner’s name and written explanation. |

## catalog-badge-dot.4

Selector: `.ui-badge--dot`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Offer an empty offset notification dot when an exact count is unavailable. Let the checked fill define the decorative silhouette. | Recognize the supplementary cue through the owner’s name and written explanation. |

## catalog-badge-dot.5

Selector: `.ui-badge--dot`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 50% | 50% | 50% | Offer an empty offset notification dot when an exact count is unavailable. Distinguish the count-free notification from a numeric pill. | Recognize the supplementary cue through the owner’s name and written explanation. |

## catalog-rating-choice.2

Selector: `.ui-rating-choice`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep the visibly different one-to-five star labels inside their targets. Bound long star labels by the available sample width. | Compare complete star counts without a hidden numeric meaning. |

## catalog-aspect-ratio.1

Selector: `.ui-aspect-ratio`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 16 / 9 | 16 / 9 | 16 / 9 | Reserve a predictable media frame. Reserve a familiar wide media rectangle. | Inspect media without distortion or layout jumps. |

## catalog-aspect-image.1

Selector: `.ui-aspect-ratio img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Keep the whole supplied image within its frame. Fit the frame width. | Inspect media without distortion or essential cropping. |

## catalog-aspect-image.2

Selector: `.ui-aspect-ratio img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 100% | 100% | 100% | Keep the whole supplied image within its frame. Fit its reserved height. | Inspect media without distortion or essential cropping. |

## catalog-aspect-image.3

Selector: `.ui-aspect-ratio img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | 0 | 0 | 0 | Keep the whole supplied image within its frame. Permit grid shrinking. | Inspect media without distortion or essential cropping. |

## catalog-aspect-image.4

Selector: `.ui-aspect-ratio img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| object-fit | contain | contain | contain | Keep the whole supplied image within its frame. Preserve the full source aspect ratio. | Inspect media without distortion or essential cropping. |

## catalog-attachment.3

Selector: `.ui-attachment`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Present an explicitly named file destination. Separate name and format. | Open the supplied local sample without a disguised action or automatic upload. |

## catalog-attachment.4

Selector: `.ui-attachment`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-md) | 0.75rem | 0.5rem | Present an explicitly named file destination. Give the destination an inspection target. | Open the supplied local sample without a disguised action or automatic upload. |

## catalog-attachment.5

Selector: `.ui-attachment`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Present an explicitly named file destination. Identify the supplied file destination. | Open the supplied local sample without a disguised action or automatic upload. |

## catalog-attachment.6

Selector: `.ui-attachment`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Present an explicitly named file destination. Protect the target minimum. | Open the supplied local sample without a disguised action or automatic upload. |

## catalog-navigation-lists.3

Selector: `.ui-breadcrumb ol, .ui-pagination ol, .ui-tab-links, .ui-dock, .ui-menu ul`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep ordinary destinations in predictable source order. Separate native targets. | Navigate real links without fake application-menu semantics. |

## catalog-navigation-lists.5

Selector: `.ui-breadcrumb ol, .ui-pagination ol, .ui-tab-links, .ui-dock, .ui-menu ul`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Keep ordinary destinations in predictable source order. Let the host own the inset. | Navigate real links without fake application-menu semantics. |

## catalog-navigation-lists.6

Selector: `.ui-breadcrumb ol, .ui-pagination ol, .ui-tab-links, .ui-dock, .ui-menu ul`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Keep ordinary destinations in predictable source order. Avoid duplicate list gaps. | Navigate real links without fake application-menu semantics. |

## catalog-breadcrumb-align.3

Selector: `.ui-breadcrumb li`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Align parent links, path separators and the current location. Give the conventional slash separator breathing room. | Read the navigation path on a consistent vertical center line. |

## catalog-breadcrumb-align.4

Selector: `.ui-breadcrumb li`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Align parent links, path separators and the current location. Match the current level to the height of parent links. | Read the navigation path on a consistent vertical center line. |

## catalog-breadcrumb-separator.2

Selector: `.ui-path-separator`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875rem | 0.875rem | 0.875rem | Show a conventional path separator without adding a destination. Keep the slash smaller than destination labels. | Distinguish adjacent navigation levels visually. |

## catalog-pagination.2

Selector: `.ui-pagination [aria-current="page"]`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 2px solid currentColor | 2px solid currentColor | 2px solid currentColor | Express the current position and available page destinations. Give the current page a non-color cue. | Navigate a known page without confusing a visual index with loaded data. |

## catalog-tabs.2

Selector: `.ui-tabs`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Offer linked destinations or a native choice between preloaded panels. Clear choice focus. | Choose a labelled preview without a fake ARIA tab state. |

## catalog-tabs.3

Selector: `.ui-tabs`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Offer linked destinations or a native choice between preloaded panels. Retain the legend without another frame. | Choose a labelled preview without a fake ARIA tab state. |

## catalog-tabs.4

Selector: `.ui-tabs`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Offer linked destinations or a native choice between preloaded panels. Use the containing inset. | Choose a labelled preview without a fake ARIA tab state. |

## catalog-tabs.5

Selector: `.ui-tabs`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Offer linked destinations or a native choice between preloaded panels. Remove default fieldset outer gaps. | Choose a labelled preview without a fake ARIA tab state. |

## catalog-folder-row.3

Selector: `.ui-folder-tabs, .ui-tab-links`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xs) | 0.25rem | 0.25rem | Arrange familiar folder tabs above their content. Leave a compact gap between folder silhouettes. | Find adjacent panel or page choices without visible radio circles. |

## catalog-folder-row.4

Selector: `.ui-folder-tabs, .ui-tab-links`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Arrange familiar folder tabs above their content. Identify the common content edge. | Find adjacent panel or page choices without visible radio circles. |

## catalog-folder-tab.4

Selector: `.ui-folder-tab, .ui-tab-links a`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Give native choices and real links a familiar folder-tab shape. Preserve the governed pointer target floor. | Recognize labelled tabs while retaining their native interaction. |

## catalog-folder-tab.5

Selector: `.ui-folder-tab, .ui-tab-links a`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-control-pad-block) var(--ui-space-md) | 0.5rem 0.75rem | 0.25rem 0.5rem | Give native choices and real links a familiar folder-tab shape. Clear label text from the tab edges. | Recognize labelled tabs while retaining their native interaction. |

## catalog-folder-tab.6

Selector: `.ui-folder-tab, .ui-tab-links a`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Give native choices and real links a familiar folder-tab shape. Expose each folder-tab boundary. | Recognize labelled tabs while retaining their native interaction. |

## catalog-folder-tab.7

Selector: `.ui-folder-tab, .ui-tab-links a`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-start-width | 3px | 3px | 3px | Give native choices and real links a familiar folder-tab shape. Reserve the selected top edge without shifting geometry. | Recognize labelled tabs while retaining their native interaction. |

## catalog-folder-tab.8

Selector: `.ui-folder-tab, .ui-tab-links a`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) var(--ui-radius-panel) 0 0 | 0.75rem 0.75rem 0 0 | 0.5rem 0.5rem 0 0 | Give native choices and real links a familiar folder-tab shape. Round the folder shoulders while joining the lower content edge. | Recognize labelled tabs while retaining their native interaction. |

## catalog-folder-radio.2

Selector: `.ui-folder-tab > .ui-radio`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 1px | 1px | 1px | Hide only the native radio paint while preserving its focus and group behavior. Retain a real focusable control without visible radio chrome. | Choose folders using native Tab, arrow keys, Space or the complete label. |

## catalog-folder-radio.3

Selector: `.ui-folder-tab > .ui-radio`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1px | 1px | 1px | Hide only the native radio paint while preserving its focus and group behavior. Keep the clipped control out of the visual silhouette. | Choose folders using native Tab, arrow keys, Space or the complete label. |

## catalog-folder-radio.4

Selector: `.ui-folder-tab > .ui-radio`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| clip-path | inset(50%) | inset(50%) | inset(50%) | Hide only the native radio paint while preserving its focus and group behavior. Clip the radio paint without display:none or removing native semantics. | Choose folders using native Tab, arrow keys, Space or the complete label. |

## catalog-folder-radio.5

Selector: `.ui-folder-tab > .ui-radio`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Hide only the native radio paint while preserving its focus and group behavior. Prevent native radio margins from influencing the tab shape. | Choose folders using native Tab, arrow keys, Space or the complete label. |

## catalog-folder-focus.1

Selector: `.ui-folder-tab:has(input:focus-visible)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | 3px solid var(--ui-focus) | Move the protected keyboard focus perimeter onto the full folder label. Use the protected focus perimeter around the visible target. | Find the native radio receiving the next keystroke. |

## catalog-folder-focus.2

Selector: `.ui-folder-tab:has(input:focus-visible)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline-offset | 3px | 3px | 3px | Move the protected keyboard focus perimeter onto the full folder label. Separate focus from the folder border. | Find the native radio receiving the next keystroke. |

## catalog-pagination-targets.4

Selector: `.ui-pagination a, .ui-pagination [aria-current="page"]`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | var(--ui-control-min) | 2.75rem | 2.25rem | Give numerical pages comparable square targets. Give each number a reliable target width. | Select a numbered destination and identify the current position. |

## catalog-pagination-targets.5

Selector: `.ui-pagination a, .ui-pagination [aria-current="page"]`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Give numerical pages comparable square targets. Match the governed link target height. | Select a numbered destination and identify the current position. |

## catalog-nav-targets.3

Selector: `.ui-breadcrumb a, .ui-pagination a, .ui-dock a, .ui-menu a`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-control-min) | 2.75rem | 2.25rem | Keep component navigation usable. Use the pointer-specific target floor. | Activate named destinations accurately. |

## catalog-nav-targets.4

Selector: `.ui-breadcrumb a, .ui-pagination a, .ui-dock a, .ui-menu a`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep component navigation usable. Clear the label from peer links. | Activate named destinations accurately. |

## catalog-navbar.5

Selector: `.ui-navbar`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-md) | 0.75rem | 0.5rem | Group identity and primary destinations. Keep a local group gap. | Locate navigation that wraps rather than disappearing on narrow screens. |

## catalog-navbar.6

Selector: `.ui-navbar`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Group identity and primary destinations. Clear text and native targets. | Locate navigation that wraps rather than disappearing on narrow screens. |

## catalog-dock.2

Selector: `.ui-dock`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-start | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Group a small set of working-area destinations. Expose the local navigation boundary. | Find the current location without floating over document content. |

## catalog-dock.3

Selector: `.ui-dock`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) | 0.5rem | 0.375rem | Group a small set of working-area destinations. Clear native link focus. | Find the current location without floating over document content. |

## catalog-footer.3

Selector: `.ui-footer`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Group document-end information and destinations. Separate footer purposes. | Find supporting links without confusing them with the main task. |

## catalog-footer.4

Selector: `.ui-footer`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block | var(--ui-space-lg) | 1rem | 0.75rem | Group document-end information and destinations. Give closing information reading clearance. | Find supporting links without confusing them with the main task. |

## catalog-footer.5

Selector: `.ui-footer`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-start | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Group document-end information and destinations. Mark the end of main content. | Find supporting links without confusing them with the main task. |

## catalog-hero.1

Selector: `.ui-hero`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-section) | 2rem | 1.5rem | Introduce one purpose and a next destination. Give the introduction a clear start. | Understand the surface before choosing an action. |

## catalog-hero.3

Selector: `.ui-hero`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 65ch | 65ch | 65ch | Introduce one purpose and a next destination. Bound sustained introductory copy. | Understand the surface before choosing an action. |

## catalog-chat.2

Selector: `.ui-chat`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Group author, timestamp and message content. Separate message parts without extra cards. | Read who said what without relying on left/right alignment or hue alone. |

## catalog-bubble.1

Selector: `.ui-bubble`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-md) | 0.75rem | 0.5rem | Bound supplied conversation text. Use the local message inset. | Read a message as belonging to its written author. |

## catalog-bubble.2

Selector: `.ui-bubble`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) | 0.75rem | 0.5rem | Bound supplied conversation text. Identify the message group. | Read a message as belonging to its written author. |

## catalog-bubble.4

Selector: `.ui-bubble`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 65ch | 65ch | 65ch | Bound supplied conversation text. Keep message lines readable. | Read a message as belonging to its written author. |

## catalog-message.1

Selector: `.ui-message`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Separate message content from its metadata. Let the chat gap own separation. | Read exact wording without depending on alignment. |

## catalog-chat-turn.1

Selector: `.ui-chat`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | fit-content | fit-content | fit-content | Bound each conversation turn while preserving source order. Let short messages use only their needed width. | Associate author and time with a readable message at either edge. |

## catalog-chat-turn.2

Selector: `.ui-chat`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | min(65ch, calc(100% - var(--ui-space-xl))) | min(65ch, calc(100% - 1.5rem)) | min(65ch, calc(100% - 1rem)) | Bound each conversation turn while preserving source order. Keep a visible reply gutter and a bounded reading measure. | Associate author and time with a readable message at either edge. |

## catalog-chat-outgoing.1

Selector: `.ui-chat--outgoing`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-inline-start | auto | auto | auto | Place the authored user message on the outgoing side. Align the outgoing turn to the logical end. | Distinguish the user turn through its written name and familiar alignment. |

## catalog-chat-incoming.1

Selector: `.ui-chat--incoming`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-inline-end | auto | auto | auto | Place the reply on the incoming side. Align the incoming turn to the logical start. | Follow the response beneath the message it answers. |

## catalog-item.2

Selector: `.ui-item-list`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Present comparable named rows. Let each item own its inset. | Scan items and use their explicit links without making whole rows clickable. |

## catalog-item.3

Selector: `.ui-item-list`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Present comparable named rows. Avoid duplicate list outer gaps. | Scan items and use their explicit links without making whole rows clickable. |

## catalog-item-row.4

Selector: `.ui-item`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate supplied records from peers. Leave focus room around links. | Scan the named record and its explicit destination. |

## catalog-item-row.5

Selector: `.ui-item`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-md) | 0.75rem | 0.5rem | Separate supplied records from peers. Inset each record. | Scan the named record and its explicit destination. |

## catalog-item-row.6

Selector: `.ui-item`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Separate supplied records from peers. Separate records quietly. | Scan the named record and its explicit destination. |

## catalog-kbd.2

Selector: `.ui-kbd`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 var(--ui-space-xs) | 0 0.25rem | 0 0.25rem | Distinguish a key name from an app control. Leave inline clearance without inflating line rhythm. | Read a keyboard instruction without trying to click the keycap. |

## catalog-kbd.3

Selector: `.ui-kbd`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Distinguish a key name from an app control. Identify a noninteractive keycap. | Read a keyboard instruction without trying to click the keycap. |

## catalog-kbd.4

Selector: `.ui-kbd`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Distinguish a key name from an app control. Use the bounded-control shape. | Read a keyboard instruction without trying to click the keycap. |

## catalog-marker.3

Selector: `.ui-marker`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 1px solid currentColor | 1px solid currentColor | 1px solid currentColor | Identify a relevant text fragment. Expose a non-color highlight boundary. | Find the marked phrase without interpreting an alarm color. |

## catalog-direction.2

Selector: `.ui-direction`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | var(--ui-notice-stroke) solid var(--ui-border) | 4px solid var(--ui-border) | 3px solid var(--ui-border) | Respect the document language direction through logical layout. Demonstrate a logical start boundary. | Read mixed direction content without visual order hacks. |

## catalog-direction.3

Selector: `.ui-direction`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | var(--ui-space-md) | 0.75rem | 0.5rem | Respect the document language direction through logical layout. Clear text from the direction-aware boundary. | Read mixed direction content without visual order hacks. |

## catalog-popover-panels.1

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Style browser-owned nonmodal top-layer surfaces. Clear reading text and focus. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover-panels.2

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Style browser-owned nonmodal top-layer surfaces. Expose the top-layer boundary. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover-panels.3

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Style browser-owned nonmodal top-layer surfaces. Use the support-surface shape. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover-panels.6

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | min(32rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | min(32rem, calc(100vw - 2 * 1rem)) | min(32rem, calc(100vw - 2 * 0.75rem)) | Style browser-owned nonmodal top-layer surfaces. Fit the surface within narrow viewports. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover-panels.7

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | calc(100dvh - 2 * 1rem) | calc(100dvh - 2 * 0.75rem) | Style browser-owned nonmodal top-layer surfaces. Fit enlarged content inside the dynamic viewport. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover-panels.9

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | var(--ui-space-sm) | 0.5rem | 0.375rem | Style browser-owned nonmodal top-layer surfaces. Clear the popup from its invoker. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover-panels.10

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset | auto | auto | auto | Style browser-owned nonmodal top-layer surfaces. Replace UA viewport centering with implicit-anchor placement. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover-panels.11

Selector: `.ui-popover, .ui-dropdown, .ui-hover-card, .ui-tooltip, .ui-megamenu`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| position-area | block-end | block-end | block-end | Style browser-owned nonmodal top-layer surfaces. Place support beside its native invoker. | Read support while native dismissal and relationships remain authoritative. |

## catalog-popover.1

Selector: `.ui-popover`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(28rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | min(28rem, calc(100vw - 2 * 1rem)) | min(28rem, calc(100vw - 2 * 0.75rem)) | Show nonmodal supporting information in the top layer. Give this support type useful bounded width while preserving viewport clearance. | Open a named surface and dismiss it with Escape or a click outside. |

## catalog-dropdown.1

Selector: `.ui-dropdown`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(20rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | min(20rem, calc(100vw - 2 * 1rem)) | min(20rem, calc(100vw - 2 * 0.75rem)) | Expose a compact group of navigation links on request. Give this support type useful bounded width while preserving viewport clearance. | Open the link group and navigate it with ordinary Tab/Enter. |

## catalog-hover-card.1

Selector: `.ui-hover-card`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(24rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | min(24rem, calc(100vw - 2 * 1rem)) | min(24rem, calc(100vw - 2 * 0.75rem)) | Show a supplementary preview without replacing the primary link. Give this support type useful bounded width while preserving viewport clearance. | Inspect extra context on hover, focus or explicit click. |

## catalog-tooltip.1

Selector: `.ui-tooltip`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(24rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | min(24rem, calc(100vw - 2 * 1rem)) | min(24rem, calc(100vw - 2 * 0.75rem)) | Offer supplementary noninteractive help without hiding required instructions. Give this support type useful bounded width while preserving viewport clearance. | Read help on hover/focus/click and dismiss it without moving focus. |

## catalog-megamenu.1

Selector: `.ui-megamenu`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(40rem, calc(100vw - 2 * var(--ui-dialog-clearance))) | min(40rem, calc(100vw - 2 * 1rem)) | min(40rem, calc(100vw - 2 * 0.75rem)) | Group several destination categories in one requested surface. Give this support type useful bounded width while preserving viewport clearance. | Open grouped links with ordinary keyboard navigation and native dismissal. |

## catalog-tooltip-type.1

Selector: `.ui-tooltip`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 0.875rem | 0.875rem | 0.875rem | Keep optional help readable without overpowering its invoker. Use the protected readable help size. | Read supplementary help in the established secondary size. |

## catalog-megamenu-grid.2

Selector: `.ui-megamenu > div`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | Lay out destination categories within a native popover. Fit columns only when each has useful width. | Find grouped destinations without panning the page. |

## catalog-megamenu-grid.3

Selector: `.ui-megamenu > div`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Lay out destination categories within a native popover. Separate destination categories. | Find grouped destinations without panning the page. |

## catalog-modal-panels.1

Selector: `.ui-modal, .ui-alert-dialog, .ui-drawer, .ui-sheet`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(32rem, calc(100% - 2 * var(--ui-dialog-clearance))) | min(32rem, calc(100% - 2 * 1rem)) | min(32rem, calc(100% - 2 * 0.75rem)) | Bound browser-owned modal surfaces. Preserve governed outer clearance. | Dismiss support natively while keeping long content reachable. |

## catalog-modal-panels.2

Selector: `.ui-modal, .ui-alert-dialog, .ui-drawer, .ui-sheet`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | calc(100dvh - 2 * 1rem) | calc(100dvh - 2 * 0.75rem) | Bound browser-owned modal surfaces. Fit the dynamic viewport. | Dismiss support natively while keeping long content reachable. |

## catalog-modal-panels.3

Selector: `.ui-modal, .ui-alert-dialog, .ui-drawer, .ui-sheet`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xl) | 1.5rem | 1rem | Bound browser-owned modal surfaces. Clear text and safe-close focus from the edge. | Dismiss support natively while keeping long content reachable. |

## catalog-dialog.1

Selector: `.ui-modal`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) | 0.75rem | 0.5rem | Present a bounded modal surface with native focus handling. Use the containing-group modal shape. | Read and dismiss a blocking explanation without losing the opener. |

## catalog-alert-dialog.1

Selector: `.ui-alert-dialog`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start-width | var(--ui-notice-stroke) | 4px | 3px | Focus a blocking example decision in the native top layer. Give the blocking decision a restrained neutral start emphasis. | Read the decision and cancel safely with native focus return. |

## catalog-drawer.1

Selector: `.ui-drawer`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-start | auto | auto | auto | Place a named modal support surface at an edge. Align to the inline end. | Open and dismiss an edge panel with native focus and Escape behavior. |

## catalog-drawer.2

Selector: `.ui-drawer`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-end | var(--ui-dialog-clearance) | 1rem | 0.75rem | Place a named modal support surface at an edge. Preserve outer edge clearance. | Open and dismiss an edge panel with native focus and Escape behavior. |

## catalog-drawer.3

Selector: `.ui-drawer`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block | var(--ui-dialog-clearance) | 1rem | 0.75rem | Place a named modal support surface at an edge. Leave visible top/bottom edges. | Open and dismiss an edge panel with native focus and Escape behavior. |

## catalog-drawer.4

Selector: `.ui-drawer`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Place a named modal support surface at an edge. Prevent UA auto-centering. | Open and dismiss an edge panel with native focus and Escape behavior. |

## catalog-drawer.5

Selector: `.ui-drawer`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(24rem, calc(100% - 2 * var(--ui-dialog-clearance))) | min(24rem, calc(100% - 2 * 1rem)) | min(24rem, calc(100% - 2 * 0.75rem)) | Place a named modal support surface at an edge. Keep support narrow and mobile-bounded. | Open and dismiss an edge panel with native focus and Escape behavior. |

## catalog-drawer.6

Selector: `.ui-drawer`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | calc(100dvh - 2 * var(--ui-dialog-clearance)) | calc(100dvh - 2 * 1rem) | calc(100dvh - 2 * 0.75rem) | Place a named modal support surface at an edge. Use available height with outer clearance. | Open and dismiss an edge panel with native focus and Escape behavior. |

## catalog-sheet.1

Selector: `.ui-sheet`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block-start | auto | auto | auto | Place a blocking support surface along the lower edge. Place support near the bottom. | Read and dismiss supplementary content with native modal behavior. |

## catalog-sheet.2

Selector: `.ui-sheet`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block-end | var(--ui-dialog-clearance) | 1rem | 0.75rem | Place a blocking support surface along the lower edge. Preserve bottom outer clearance. | Read and dismiss supplementary content with native modal behavior. |

## catalog-sheet.3

Selector: `.ui-sheet`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block | 0 | 0 | 0 | Place a blocking support surface along the lower edge. Avoid vertical auto-centering. | Read and dismiss supplementary content with native modal behavior. |

## catalog-sheet.4

Selector: `.ui-sheet`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(48rem, calc(100% - 2 * var(--ui-dialog-clearance))) | min(48rem, calc(100% - 2 * 1rem)) | min(48rem, calc(100% - 2 * 0.75rem)) | Place a blocking support surface along the lower edge. Allow wider support without mobile overflow. | Read and dismiss supplementary content with native modal behavior. |

## catalog-carousel.2

Selector: `.ui-carousel`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Offer an ordered horizontally scrollable set of panels. Separate panel boundaries. | Reach every panel through native scrolling and named fragment links. |

## catalog-carousel.5

Selector: `.ui-carousel`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) | 0.5rem | 0.375rem | Offer an ordered horizontally scrollable set of panels. Clear focus around links in slides. | Reach every panel through native scrolling and named fragment links. |

## catalog-slide.1

Selector: `.ui-slide`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| flex | 0 0 100% | 0 0 100% | 0 0 100% | Give one supplied panel a local viewport. Keep panels from becoming squeezed fragments. | Inspect one panel and reach peers without auto-rotation. |

## catalog-slide.2

Selector: `.ui-slide`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| scroll-snap-align | start | start | start | Give one supplied panel a local viewport. Settle at the reading start. | Inspect one panel and reach peers without auto-rotation. |

## catalog-slide.3

Selector: `.ui-slide`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Give one supplied panel a local viewport. Clear panel contents. | Inspect one panel and reach peers without auto-rotation. |

## catalog-slide.4

Selector: `.ui-slide`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Give one supplied panel a local viewport. Identify peer panels. | Inspect one panel and reach peers without auto-rotation. |

## catalog-slide.5

Selector: `.ui-slide`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Give one supplied panel a local viewport. Let supplied text wrap. | Inspect one panel and reach peers without auto-rotation. |

## catalog-code-block.1

Selector: `.ui-code-block`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Bound exact source content and its label. Bound source by its host. | Inspect selectable source with local scrolling. |

## catalog-code-block.5

Selector: `.ui-code-block`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Bound exact source content and its label. Clear source and focus. | Inspect selectable source with local scrolling. |

## catalog-scroll-area.1

Selector: `.ui-scroll-area`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-block-size | 12rem | 12rem | 12rem | Bound an inspection region without clipping content. Give the inspection region a bounded initial viewport. | Reach overflow by keyboard, pointer and native scrollbar. |

## catalog-scroll-area.3

Selector: `.ui-scroll-area`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Bound an inspection region without clipping content. Clear reading and focus. | Reach overflow by keyboard, pointer and native scrollbar. |

## catalog-scroll-area.4

Selector: `.ui-scroll-area`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Bound an inspection region without clipping content. Identify independent scrolling. | Reach overflow by keyboard, pointer and native scrollbar. |

## catalog-resizable.1

Selector: `.ui-resizable`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(100%, 28rem) | min(100%, 28rem) | min(100%, 28rem) | Allow native CSS resizing of a bounded example workspace. Start at a bounded inspection width. | Enlarge a nonessential inspection area while its content remains reachable. |

## catalog-resizable.2

Selector: `.ui-resizable`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Allow native CSS resizing of a bounded example workspace. Prevent resizing past its host. | Enlarge a nonessential inspection area while its content remains reachable. |

## catalog-resizable.3

Selector: `.ui-resizable`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | 6rem | 6rem | 6rem | Allow native CSS resizing of a bounded example workspace. Keep a useful initial inspection area. | Enlarge a nonessential inspection area while its content remains reachable. |

## catalog-resizable.4

Selector: `.ui-resizable`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| resize | both | both | both | Allow native CSS resizing of a bounded example workspace. Expose native pointer resizing, not a split-pane keyboard contract. | Enlarge a nonessential inspection area while its content remains reachable. |

## catalog-resizable.6

Selector: `.ui-resizable`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Allow native CSS resizing of a bounded example workspace. Leave internal reading clearance. | Enlarge a nonessential inspection area while its content remains reachable. |

## catalog-resizable.7

Selector: `.ui-resizable`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Allow native CSS resizing of a bounded example workspace. Identify the resize surface. | Enlarge a nonessential inspection area while its content remains reachable. |

## catalog-separator.1

Selector: `.ui-divider`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Separate topics without extra decorative panels. Remove the browser inset rule before drawing one intended edge. | Recognize a change in content group. |

## catalog-separator.2

Selector: `.ui-divider`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-start | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Separate topics without extra decorative panels. Separate topics with one passive crisp boundary. | Recognize a change in content group. |

## catalog-separator.3

Selector: `.ui-divider`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block | var(--ui-space-lg) | 1rem | 0.75rem | Separate topics without extra decorative panels. Separate neighboring topics with a governed gap. | Recognize a change in content group. |

## catalog-progress.1

Selector: `.ui-progress`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Display an actual bounded completion amount. Use available width for the supplied amount. | Read the quantity both as text and a native progress value. |

## catalog-progress.2

Selector: `.ui-progress`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Display an actual bounded completion amount. Bound native intrinsic sizing. | Read the quantity both as text and a native progress value. |

## catalog-radial-progress.3

Selector: `.ui-radial-progress`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | calc(2 * var(--ui-swatch-size)) | calc(2 * 3rem) | calc(2 * 2.5rem) | Pair a supplied completion amount with a circular graphic. Use the governed visual scale without smaller type. | Read the written percentage and accessible value independently of color. |

## catalog-radial-progress.4

Selector: `.ui-radial-progress`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 1 | 1 | 1 | Pair a supplied completion amount with a circular graphic. Keep the amount graphic square. | Read the written percentage and accessible value independently of color. |

## catalog-radial-progress.5

Selector: `.ui-radial-progress`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 50% | 50% | 50% | Pair a supplied completion amount with a circular graphic. Make the graphic circular. | Read the written percentage and accessible value independently of color. |

## catalog-radial-hole.3

Selector: `.ui-radial-progress::before`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | calc(100% - 2 * var(--ui-space-sm)) | calc(100% - 2 * 0.5rem) | calc(100% - 2 * 0.375rem) | Keep the ring center a readable neutral plane. Apply governed ring thickness. | Read the amount without text over competing colors. |

## catalog-radial-hole.4

Selector: `.ui-radial-progress::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 1 | 1 | 1 | Keep the ring center a readable neutral plane. Keep the center square before cropping. | Read the amount without text over competing colors. |

## catalog-radial-hole.5

Selector: `.ui-radial-progress::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 50% | 50% | 50% | Keep the ring center a readable neutral plane. Match the circular outer edge. | Read the amount without text over competing colors. |

## catalog-skeleton.1

Selector: `.ui-skeleton`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | var(--ui-swatch-size) | 3rem | 2.5rem | Reserve the shape of forthcoming content. Reserve a governed placeholder shape. | Recognize placeholder structure alongside written loading text. |

## catalog-skeleton.2

Selector: `.ui-skeleton`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px dashed var(--ui-border) | 1px dashed var(--ui-border) | 1px dashed var(--ui-border) | Reserve the shape of forthcoming content. Identify placeholder structure without pulsing. | Recognize placeholder structure alongside written loading text. |

## catalog-skeleton.4

Selector: `.ui-skeleton`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Reserve the shape of forthcoming content. Relate the placeholder to bounded content. | Recognize placeholder structure alongside written loading text. |

## catalog-spinner.2

Selector: `.ui-spinner`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 1.5rem | 1.5rem | 1.5rem | Supplement a written loading state with an optional motion cue. Make the loading ring large enough to resolve its moving segment. | Recognize ongoing work without motion being the only information. |

## catalog-spinner.3

Selector: `.ui-spinner`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 1 | 1 | 1 | Supplement a written loading state with an optional motion cue. Reserve a square before cropping. | Recognize ongoing work without motion being the only information. |

## catalog-spinner.4

Selector: `.ui-spinner`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 3px solid var(--ui-border) | 3px solid var(--ui-border) | 3px solid var(--ui-border) | Supplement a written loading state with an optional motion cue. Protect a clearly visible three-pixel ring in normal and compact density. | Recognize ongoing work without motion being the only information. |

## catalog-spinner.6

Selector: `.ui-spinner`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 50% | 50% | 50% | Supplement a written loading state with an optional motion cue. Keep the work cue circular. | Recognize ongoing work without motion being the only information. |

## catalog-text-rotate.3

Selector: `.ui-text-rotate`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Demonstrate an optional sequence of supplementary labels. Separate the static labels. | Inspect the effect while the complete wording remains persistently available. |

## catalog-spin-frame.1

Selector: `to`; condition: `Animation ui-catalog-spin`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| transform | rotate(1turn) | rotate(1turn) | rotate(1turn) | Define only the explicitly enabled supplementary animation. Complete one optional rotation; reduced motion disables it. | Inspect visual motion without changing essential content or data. |

## catalog-table.1

Selector: `.ui-data-table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Keep a small semantic comparison readable. Use the available comparison width. | Compare values under real headers without a custom grid widget. |

## catalog-table.2

Selector: `.ui-data-table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-collapse | collapse | collapse | collapse | Keep a small semantic comparison readable. Avoid doubled record dividers. | Compare values under real headers without a custom grid widget. |

## catalog-table-cells.1

Selector: `.ui-data-table th, .ui-data-table td`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) var(--ui-space-md) | 0.5rem 0.75rem | 0.375rem 0.5rem | Keep supplied records aligned with real headers. Use governed cell clearance. | Compare rows without compressed words or a heavy full grid. |

## catalog-table-cells.4

Selector: `.ui-data-table th, .ui-data-table td`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Keep supplied records aligned with real headers. Separate rows quietly. | Compare rows without compressed words or a heavy full grid. |

## catalog-toast.1

Selector: `.ui-toast`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Group a settled notification and its text. Clear settled notification text. | Read feedback without obscuring the active working area. |

## catalog-toast.2

Selector: `.ui-toast`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Group a settled notification and its text. Identify the feedback item. | Read feedback without obscuring the active working area. |

## catalog-toast.3

Selector: `.ui-toast`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Group a settled notification and its text. Use the short-support shape. | Read feedback without obscuring the active working area. |

## catalog-countdown.3

Selector: `.ui-countdown`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 1.5rem | 1.5rem | 1.5rem | Keep supplied time fields aligned. Make the explicitly static duration inspectable. | Read an explicitly static duration example without a misleading running clock. |

## catalog-diff.2

Selector: `.ui-diff`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 16rem), 1fr)) | Keep before/after content adjacent for inspection. Pair versions only when useful reading width exists. | Compare both versions without hiding either from keyboard or touch users. |

## catalog-diff.3

Selector: `.ui-diff`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Keep before/after content adjacent for inspection. Separate versions without hiding either. | Compare both versions without hiding either from keyboard or touch users. |

## catalog-stage.2

Selector: `.ui-component-stage`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | 12rem | 12rem | 12rem | Bound corner-position examples within their own workspace. Reserve visible space around the corner action. | Inspect positioning without covering page controls. |

## catalog-stage.3

Selector: `.ui-component-stage`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Bound corner-position examples within their own workspace. Clear ordinary stage text. | Inspect positioning without covering page controls. |

## catalog-stage.4

Selector: `.ui-component-stage`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block-end | calc(var(--ui-control-min) + 2 * var(--ui-space-lg)) | calc(2.75rem + 2 * 1rem) | calc(2.25rem + 2 * 0.75rem) | Bound corner-position examples within their own workspace. Reserve flow room for the corner action instead of covering text. | Inspect positioning without covering page controls. |

## catalog-stage.5

Selector: `.ui-component-stage`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Bound corner-position examples within their own workspace. Expose the local workspace boundary. | Inspect positioning without covering page controls. |

## catalog-fab.2

Selector: `.ui-fab`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-end | var(--ui-space-lg) | 1rem | 0.75rem | Keep a named corner action and secondary links together. Leave governed edge clearance. | Open the extra destinations with native click, keyboard and Escape behavior. |

## catalog-fab.3

Selector: `.ui-fab`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block-end | var(--ui-space-lg) | 1rem | 0.75rem | Keep a named corner action and secondary links together. Use the governed bottom clearance. | Open the extra destinations with native click, keyboard and Escape behavior. |

## catalog-filter.2

Selector: `.ui-filter`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-md) | 0.75rem | 0.5rem | Filter a bounded preloaded example through native choice state. Separate criteria from results. | Select a visible criterion and restore all examples with Reset. |

## catalog-filter-results.2

Selector: `.ui-filter-results`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep supplied matching records together. Separate related result items. | Read preloaded records matching the native choice. |

## catalog-hover-3d.1

Selector: `.ui-hover-3d`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xl) | 1.5rem | 1rem | Demonstrate an optional spatial card treatment. Clear the noninteractive card for its optional tilt. | Inspect the requested visual treatment without moving an interactive target. |

## catalog-hover-3d.2

Selector: `.ui-hover-3d`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Demonstrate an optional spatial card treatment. Keep the example bounded. | Inspect the requested visual treatment without moving an interactive target. |

## catalog-tilt.1

Selector: `.ui-hover-3d:hover`; condition: `(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| transform | perspective(40rem) rotateX(2deg) rotateY(-2deg) | perspective(40rem) rotateX(2deg) rotateY(-2deg) | perspective(40rem) rotateX(2deg) rotateY(-2deg) | Demonstrate a small spatial treatment on noninteractive content. Use a small fixed CSS tilt rather than script-based pointer tracking. | Inspect the requested 3D appearance without continuous motion. |

## catalog-hover-gallery.2

Selector: `.ui-hover-gallery`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Preview one of several supplied images. Clear choice focus from media. | Use hover for a temporary preview or native radios for keyboard/touch selection. |

## catalog-hover-gallery.3

Selector: `.ui-hover-gallery`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 0 | 0 | 0 | Preview one of several supplied images. Retain the legend without extra framing. | Use hover for a temporary preview or native radios for keyboard/touch selection. |

## catalog-hover-gallery.4

Selector: `.ui-hover-gallery`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Preview one of several supplied images. Use the host inset. | Use hover for a temporary preview or native radios for keyboard/touch selection. |

## catalog-gallery-figures.1

Selector: `.ui-hover-gallery > figure`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Keep supplied previews grouped as native figures. Let the gallery gap own separation. | Inspect the chosen image and caption without losing the choices. |

## catalog-gallery-image.2

Selector: `.ui-hover-gallery img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep supplied gallery media responsive. Bound media to its host. | Inspect local media without page overflow. |

## catalog-gallery-image.3

Selector: `.ui-hover-gallery img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | auto | auto | auto | Keep supplied gallery media responsive. Preserve source aspect ratio. | Inspect local media without page overflow. |

## catalog-indicator.2

Selector: `.ui-indicator`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xs) | 0.25rem | 0.25rem | Place compact metadata beside its owning item. Separate the written indicator. | Read a written count/status in the correct context. |

## catalog-mask.2

Selector: `.ui-mask`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | var(--ui-swatch-size) | 3rem | 2.5rem | Demonstrate optional cropping of nonessential artwork. Use the governed visual sample size. | Compare shape treatments while retaining a written media explanation. |

## catalog-mask.3

Selector: `.ui-mask`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 1 | 1 | 1 | Demonstrate optional cropping of nonessential artwork. Reserve a square crop area. | Compare shape treatments while retaining a written media explanation. |

## catalog-mask.4

Selector: `.ui-mask`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| object-fit | cover | cover | cover | Demonstrate optional cropping of nonessential artwork. Fill the nonessential shape without distortion. | Compare shape treatments while retaining a written media explanation. |

## catalog-mask.5

Selector: `.ui-mask`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| clip-path | circle(50%) | circle(50%) | circle(50%) | Demonstrate optional cropping of nonessential artwork. Demonstrate cropping only on nonessential artwork. | Compare shape treatments while retaining a written media explanation. |

## catalog-mask-hexagon.1

Selector: `.ui-mask--hexagon`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| clip-path | polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%) | polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%) | polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%) | Offer another optional crop shape. Use a hexagonal crop with unchanged external explanation. | Compare shape treatments while the caption carries meaning. |

## catalog-mockup-frames.1

Selector: `.ui-mockup-browser, .ui-mockup-code, .ui-mockup-phone, .ui-mockup-window`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-md) | 0.75rem | 0.5rem | Frame explicitly illustrative interface samples. Clear the supplied example contents. | Recognize illustration rather than actual system controls. |

## catalog-mockup-frames.2

Selector: `.ui-mockup-browser, .ui-mockup-code, .ui-mockup-phone, .ui-mockup-window`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | var(--ui-switch-stroke) solid var(--ui-border) | 2px solid var(--ui-border) | 1px solid var(--ui-border) | Frame explicitly illustrative interface samples. Use a governed illustrative frame. | Recognize illustration rather than actual system controls. |

## catalog-mockup-frames.3

Selector: `.ui-mockup-browser, .ui-mockup-code, .ui-mockup-phone, .ui-mockup-window`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-panel) | 0.75rem | 0.5rem | Frame explicitly illustrative interface samples. Use the containing shape. | Recognize illustration rather than actual system controls. |

## catalog-mockup-frames.5

Selector: `.ui-mockup-browser, .ui-mockup-code, .ui-mockup-phone, .ui-mockup-window`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Frame explicitly illustrative interface samples. Keep the mockup within its host. | Recognize illustration rather than actual system controls. |

## catalog-mockup-frames.6

Selector: `.ui-mockup-browser, .ui-mockup-code, .ui-mockup-phone, .ui-mockup-window`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Frame explicitly illustrative interface samples. Let the component inset own its edges rather than adding native figure margins to its explicit width. | Recognize illustration rather than actual system controls. |

## catalog-mockup-browser.1

Selector: `.ui-mockup-browser > header`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block-end | var(--ui-space-sm) | 0.5rem | 0.375rem | Frame a labelled example of a browser-like surface. Separate the written illustrative address. | Recognize illustrative chrome rather than real navigation controls. |

## catalog-mockup-browser.2

Selector: `.ui-mockup-browser > header`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Frame a labelled example of a browser-like surface. Show a toolbar boundary without fake controls. | Recognize illustrative chrome rather than real navigation controls. |

## catalog-mockup-phone.1

Selector: `.ui-mockup-phone`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | min(18rem, 100%) | min(18rem, 100%) | min(18rem, 100%) | Bound a small-device preview. Use a small responsive device-preview frame. | Inspect a contained illustrative mobile layout without clipping its explanation. |

## catalog-mockup-phone.2

Selector: `.ui-mockup-phone`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-block-size | 20rem | 20rem | 20rem | Bound a small-device preview. Give the illustration room without clipping text. | Inspect a contained illustrative mobile layout without clipping its explanation. |

## catalog-mockup-phone.3

Selector: `.ui-mockup-phone`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-width | var(--ui-space-sm) | 0.5rem | 0.375rem | Bound a small-device preview. Distinguish the static device frame from live input boundaries. | Inspect a contained illustrative mobile layout without clipping its explanation. |

## catalog-mockup-window.2

Selector: `.ui-mockup-window > header`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Frame a labelled desktop-like example. Separate the illustrative caption from its body. | Recognize the illustrative content area and caption. |

## catalog-stack.1

Selector: `.ui-visual-stack`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Indicate grouped material through nonessential background layers. Clear foreground content from the optional rear-layer cue. | Read the foreground item without hidden essential content beneath it. |

## catalog-stack.2

Selector: `.ui-visual-stack`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Indicate grouped material through nonessential background layers. Bound the meaningful foreground. | Read the foreground item without hidden essential content beneath it. |

## catalog-stack.3

Selector: `.ui-visual-stack`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| box-shadow | var(--ui-space-xs) var(--ui-space-xs) 0 0 var(--ui-divider), var(--ui-space-sm) var(--ui-space-sm) 0 0 var(--ui-subtle) | 0.25rem 0.25rem 0 0 var(--ui-divider), 0.5rem 0.5rem 0 0 var(--ui-subtle) | 0.25rem 0.25rem 0 0 var(--ui-divider), 0.375rem 0.375rem 0 0 var(--ui-subtle) | Indicate grouped material through nonessential background layers. Suggest two empty rear planes without overlapping meaningful content. | Read the foreground item without hidden essential content beneath it. |

## catalog-stat.2

Selector: `.ui-stat`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xs) | 0.25rem | 0.25rem | Pair a supplied number with its meaning and period. Attach the context to its quantity. | Interpret a quantity without a dashboard number lacking context. |

## catalog-stat.3

Selector: `.ui-stat`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Pair a supplied number with its meaning and period. Let the host own outside clearance. | Interpret a quantity without a dashboard number lacking context. |

## catalog-stat-value.1

Selector: `.ui-stat dd`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Make supplied quantities readable with context. Avoid default definition indentation. | Interpret the quantity alongside its title and period. |

## catalog-stat-value.2

Selector: `.ui-stat dd`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| font-size | 2rem | 2rem | 2rem | Make supplied quantities readable with context. Use the existing title scale for the contextual quantity. | Interpret the quantity alongside its title and period. |

## catalog-status.3

Selector: `.ui-status-indicator`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep a state label and supplementary mark together. Separate the real state word. | Read the explicit state without relying on hue. |

## catalog-status-dot.2

Selector: `.ui-status-indicator::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 0.75rem | 0.75rem | 0.75rem | Supplement written state with a nonessential mark. Keep the cue subordinate to text. | Recognize a compact state without relying on hue. |

## catalog-status-dot.3

Selector: `.ui-status-indicator::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 1 | 1 | 1 | Supplement written state with a nonessential mark. Keep a square before cropping. | Recognize a compact state without relying on hue. |

## catalog-status-dot.4

Selector: `.ui-status-indicator::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | 50% | 50% | 50% | Supplement written state with a nonessential mark. Distinguish the passive mark from a control. | Recognize a compact state without relying on hue. |

## catalog-steps.1

Selector: `.ui-steps`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-inline-start | 4ch | 4ch | 4ch | Present a supplied process order and current step. Reserve native step numbering space. | Locate the current point without interpreting color alone. |

## catalog-steps.2

Selector: `.ui-steps`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Present a supplied process order and current step. Let the host own outside gaps. | Locate the current point without interpreting color alone. |

## catalog-timeline.2

Selector: `.ui-timeline`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Group supplied events in chronological order. Let events own their inset. | Read event dates, descriptions and ordering as real text. |

## catalog-timeline.3

Selector: `.ui-timeline`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Group supplied events in chronological order. Remove duplicate outer gaps. | Read event dates, descriptions and ordering as real text. |

## catalog-timeline-events.1

Selector: `.ui-timeline li`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) var(--ui-space-lg) | 0.5rem 1rem | 0.375rem 0.75rem | Connect supplied chronological events. Use governed event clearance. | Read time and description as one event in source order. |

## catalog-timeline-events.2

Selector: `.ui-timeline li`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | 2px solid var(--ui-divider) | 2px solid var(--ui-divider) | 2px solid var(--ui-divider) | Connect supplied chronological events. Provide a passive timeline rule. | Read time and description as one event in source order. |

## catalog-swap.2

Selector: `.ui-swap`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Switch between two supplied presentations using a native choice. Separate the stable label from its output. | Read an alternate detail level without replacing the control or saving anything. |

## catalog-theme-sandbox.1

Selector: `.ui-theme-sandbox`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Bound a purely CSS palette comparison. Clear preview text and controls. | Compare local brightness without changing stored preferences or data. |

## catalog-theme-sandbox.4

Selector: `.ui-theme-sandbox`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Bound a purely CSS palette comparison. Identify the preview boundary. | Compare local brightness without changing stored preferences or data. |

## catalog-validator.2

Selector: `.ui-validator`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Expose browser-enforced input constraints with visible correction guidance. Clear focus between the input and explanation. | Correct an invalid example without a custom validation engine. |

## catalog-motion-preview.1

Selector: `.ui-motion-preview`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Keep optional visual effects and their controls together. Clear the opt-in control and supplementary effect. | Stop or reset the effect through a visible native choice. |

## catalog-motion-preview.2

Selector: `.ui-motion-preview`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Keep optional visual effects and their controls together. Identify the bounded optional-motion example. | Stop or reset the effect through a visible native choice. |

## catalog-diff-wipe.3

Selector: `.ui-diff-wipe`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Provide an optional native pointer-resize image comparison. Fit the available example width. | Inspect a wipe effect while complete labelled versions remain separately readable. |

## catalog-diff-wipe.4

Selector: `.ui-diff-wipe`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 3 / 1 | 3 / 1 | 3 / 1 | Provide an optional native pointer-resize image comparison. Reserve the supplied illustrations’ intrinsic ratio. | Inspect a wipe effect while complete labelled versions remain separately readable. |

## catalog-diff-wipe.5

Selector: `.ui-diff-wipe`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Provide an optional native pointer-resize image comparison. Let the host own outer clearance. | Inspect a wipe effect while complete labelled versions remain separately readable. |

## catalog-diff-wipe.6

Selector: `.ui-diff-wipe`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Provide an optional native pointer-resize image comparison. Expose the comparison frame. | Inspect a wipe effect while complete labelled versions remain separately readable. |

## catalog-diff-image.2

Selector: `.ui-diff-wipe img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100cqw | 100cqw | 100cqw | Keep supplied comparison layers aligned. Keep the source width tied to the whole comparison frame. | Compare clipping rather than stretching either illustration. |

## catalog-diff-image.3

Selector: `.ui-diff-wipe img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 100% | 100% | 100% | Keep supplied comparison layers aligned. Fill the reserved frame height. | Compare clipping rather than stretching either illustration. |

## catalog-diff-image.4

Selector: `.ui-diff-wipe img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| object-fit | cover | cover | cover | Keep supplied comparison layers aligned. Preserve aspect ratio while covering the same frame. | Compare clipping rather than stretching either illustration. |

## catalog-diff-before.2

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block-start | 0 | 0 | 0 | Let the browser resize the optional foreground reveal. Align both source images at the top. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-before.3

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-start | 0 | 0 | 0 | Let the browser resize the optional foreground reveal. Align both sources at the reading start. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-before.4

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 50% | 50% | 50% | Let the browser resize the optional foreground reveal. Start with both versions partially visible. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-before.5

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Let the browser resize the optional foreground reveal. Prevent native resizing past the frame. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-before.6

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 2rem | 2rem | 2rem | Let the browser resize the optional foreground reveal. Keep the optional handle visible. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-before.7

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 100% | 100% | 100% | Let the browser resize the optional foreground reveal. Keep the reveal at full image height. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-before.8

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| resize | horizontal | horizontal | horizontal | Let the browser resize the optional foreground reveal. Use the native pointer resize handle; full versions remain the keyboard alternative. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-before.10

Selector: `.ui-diff-before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-end | 2px solid var(--ui-border) | 2px solid var(--ui-border) | 2px solid var(--ui-border) | Let the browser resize the optional foreground reveal. Identify the reveal boundary. | Inspect the supplied before layer without custom pointer code. |

## catalog-diff-full-images.2

Selector: `.ui-diff img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep both original comparison images fully available. Keep the full image within its comparison card. | Inspect either full version without relying on the optional pointer-only reveal. |

## catalog-diff-full-images.3

Selector: `.ui-diff img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | auto | auto | auto | Keep both original comparison images fully available. Preserve the source image ratio. | Inspect either full version without relying on the optional pointer-only reveal. |

## catalog-alert-link-focus.1

Selector: `.ui-alert a:focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline | 3px solid var(--ui-on-interactive) | 3px solid var(--ui-on-interactive) | 3px solid var(--ui-on-interactive) | Adapt the protected focus perimeter to a colored alert surface. Use ink checked against every alert fill instead of a neutral-surface blue. | Find the actual recovery link receiving keyboard input. |

## catalog-alert-link-focus.2

Selector: `.ui-alert a:focus-visible`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| outline-offset | 3px | 3px | 3px | Adapt the protected focus perimeter to a colored alert surface. Separate the focus perimeter from the link’s text. | Find the actual recovery link receiving keyboard input. |

## catalog-avatar-small.1

Selector: `.ui-avatar--small`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 2rem | 2rem | 2rem | Use a compact identity mark alongside dense record rows. Reserve a protected 32px identity disc at the default root. | Recognize short initials without reducing readable text size. |

## catalog-avatar-large.1

Selector: `.ui-avatar--large`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 4rem | 4rem | 4rem | Give a profile or detailed identity a stronger visual anchor. Reserve a 64px identity disc without enlarging unrelated controls. | Associate supplied artwork or initials with the persistent written name. |

## catalog-avatar-image.1

Selector: `.ui-avatar img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Fit a supplied identity thumbnail to its disc. Fit the governed avatar width. | Recognize the thumbnail while its written identity remains available. |

## catalog-avatar-image.2

Selector: `.ui-avatar img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 100% | 100% | 100% | Fit a supplied identity thumbnail to its disc. Fit the reserved square disc. | Recognize the thumbnail while its written identity remains available. |

## catalog-avatar-image.3

Selector: `.ui-avatar img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| object-fit | cover | cover | cover | Fit a supplied identity thumbnail to its disc. Crop only the identity thumbnail, never meaningful document artwork. | Recognize the thumbnail while its written identity remains available. |

## catalog-avatar-image.4

Selector: `.ui-avatar img`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | inherit | inherit | inherit | Fit a supplied identity thumbnail to its disc. Follow the containing disc’s silhouette. | Recognize the thumbnail while its written identity remains available. |

## catalog-avatar-group.3

Selector: `.ui-avatar-group`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Keep several named identities together without hidden overlapping faces. Separate independently named members. | Inspect all supplied members and their written identities. |

## catalog-avatar-group.5

Selector: `.ui-avatar-group`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Keep several named identities together without hidden overlapping faces. Let the sample own its inset. | Inspect all supplied members and their written identities. |

## catalog-avatar-group.6

Selector: `.ui-avatar-group`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Keep several named identities together without hidden overlapping faces. Avoid duplicate list outer gaps. | Inspect all supplied members and their written identities. |

## catalog-avatar-member.2

Selector: `.ui-avatar-group > li`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xs) | 0.25rem | 0.25rem | Associate one identity mark with its own name and state. Attach names and aligned presence to the mark. | Read which status belongs to which member. |

## catalog-avatar-member.3

Selector: `.ui-avatar-group > li`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Associate one identity mark with its own name and state. Permit names to wrap within their member group. | Read which status belongs to which member. |

## catalog-button-icon.2

Selector: `.ui-button-icon`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 1.25em | 1.25em | 1.25em | Keep a supplementary action symbol with the visible name. Align the symbol to the control’s existing text size. | Read the complete action without relying on an icon alone. |

## catalog-card-horizontal.2

Selector: `.ui-card--horizontal`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | minmax(0, 1fr) | minmax(0, 1fr) | minmax(0, 1fr) | Arrange supplied media and content as one named record. Stack content while available width is limited. | Read the complete record before selecting its actual destination. |

## catalog-card-horizontal.3

Selector: `.ui-card--horizontal`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Arrange supplied media and content as one named record. Separate the visual from its explanation. | Read the complete record before selecting its actual destination. |

## catalog-card-horizontal-wide.1

Selector: `.ui-card--horizontal`; condition: `(min-width: 768px)`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | minmax(0, 1fr) minmax(0, 2fr) | minmax(0, 1fr) minmax(0, 2fr) | minmax(0, 1fr) minmax(0, 2fr) | Use a horizontal record when both media and text have useful width. Give the explanatory content twice the media width at the existing medium breakpoint. | Compare the illustration with its explanation without excessive vertical scrolling. |

## catalog-card-media.2

Selector: `.ui-card-media`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Keep a record’s supplied image responsive and fully visible. Fit its allocated grid track. | Inspect meaningful artwork without stretching or cropping. |

## catalog-card-media.3

Selector: `.ui-card-media`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | auto | auto | auto | Keep a record’s supplied image responsive and fully visible. Preserve intrinsic image proportions. | Inspect meaningful artwork without stretching or cropping. |

## catalog-card-media.4

Selector: `.ui-card-media`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep a record’s supplied image responsive and fully visible. Prevent intrinsic width from widening the card. | Inspect meaningful artwork without stretching or cropping. |

## catalog-card-content.1

Selector: `.ui-card-content`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Let long record wording fit its available grid column. Allow long text to wrap inside the content track. | Read the complete description without page-level overflow. |

## catalog-card-actions.3

Selector: `.ui-card-actions`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate a record’s actual destinations from its explanatory content. Clear focus around peer destinations. | Identify actions belonging to this record without making its whole surface clickable. |

## catalog-card-actions.4

Selector: `.ui-card-actions`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block-start | var(--ui-space-md) | 0.75rem | 0.5rem | Separate a record’s actual destinations from its explanatory content. Separate actions from the preceding explanation. | Identify actions belonging to this record without making its whole surface clickable. |

## catalog-card-actions.5

Selector: `.ui-card-actions`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-start | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Separate a record’s actual destinations from its explanatory content. Mark the action footer with a passive separator. | Identify actions belonging to this record without making its whole surface clickable. |

## catalog-modal-form.2

Selector: `.ui-modal-form`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep a local native dialog draft labelled and bounded. Protect focus clearance between local form controls. | Enter a preview value with native validation before closing the local form. |

## catalog-modal-form.3

Selector: `.ui-modal-form`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-lg) | 1rem | 0.75rem | Keep a local native dialog draft labelled and bounded. Separate the safe Close action from the optional form preview. | Enter a preview value with native validation before closing the local form. |

## catalog-notification-edge.1

Selector: `.ui-toast`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | var(--ui-notice-stroke) solid var(--ui-accent) | 4px solid var(--ui-accent) | 3px solid var(--ui-accent) | Give settled item-level notifications a compact semantic cue. Use the existing notice stroke and labelled event color. | Read the event title and explanation without a floating timed overlay. |

## catalog-announcement.2

Selector: `.ui-announcement`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Explain a condition or update that applies to the current page. Separate the scope explanation from available destinations. | Find the scope, timing and available next steps without an overlay hiding work. |

## catalog-announcement.3

Selector: `.ui-announcement`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-lg) | 1rem | 0.75rem | Explain a condition or update that applies to the current page. Clear text and focus from the bounded banner edge. | Find the scope, timing and available next steps without an overlay hiding work. |

## catalog-announcement.4

Selector: `.ui-announcement`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | var(--ui-notice-stroke) solid var(--ui-accent) | 4px solid var(--ui-accent) | 3px solid var(--ui-accent) | Explain a condition or update that applies to the current page. Identify the page-wide message using a compact information edge. | Find the scope, timing and available next steps without an overlay hiding work. |

## catalog-announcement-actions.3

Selector: `.ui-announcement-actions`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Keep real next-step destinations within their announcement context. Keep peer target focus separate. | Choose a relevant follow-up without obscuring the current work. |

## catalog-image.2

Selector: `.ui-image`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Present complete meaningful images with intrinsic dimensions and captions. Fit the containing image or gallery track. | Inspect related visuals at the available width without stretching or losing essential content. |

## catalog-image.3

Selector: `.ui-image`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Present complete meaningful images with intrinsic dimensions and captions. Prevent intrinsic media from widening the page. | Inspect related visuals at the available width without stretching or losing essential content. |

## catalog-image.4

Selector: `.ui-image`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | auto | auto | auto | Present complete meaningful images with intrinsic dimensions and captions. Preserve the complete source aspect ratio. | Inspect related visuals at the available width without stretching or losing essential content. |

## catalog-image-grid.2

Selector: `.ui-image-grid`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) | Group related complete images using the available space. Add columns only when an image has useful inspection width. | Compare all visuals and their captions without a scripted gallery. |

## catalog-image-grid.3

Selector: `.ui-image-grid`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Group related complete images using the available space. Separate each meaningful visual from its peers. | Compare all visuals and their captions without a scripted gallery. |

## catalog-image-figure.1

Selector: `.ui-image-grid > figure`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Give the gallery sole ownership of figure clearance. Avoid native figure margins being added to the grid gap. | Read a balanced image/caption group without native side offsets. |

## catalog-ribbon.2

Selector: `.ui-ribbon`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | fit-content | fit-content | fit-content | Highlight a record-level version or category without covering its content. Bound the filled accent to its written metadata. | Read the special metadata before the item heading and distinguish it from operational status. |

## catalog-ribbon.3

Selector: `.ui-ribbon`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Highlight a record-level version or category without covering its content. Let long metadata remain within its record. | Read the special metadata before the item heading and distinguish it from operational status. |

## catalog-ribbon.4

Selector: `.ui-ribbon`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xs) var(--ui-space-lg) | 0.25rem 1rem | 0.25rem 0.75rem | Highlight a record-level version or category without covering its content. Make the flag readable without becoming an action target. | Read the special metadata before the item heading and distinguish it from operational status. |

## catalog-ribbon.7

Selector: `.ui-ribbon`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-start | var(--ui-notice-stroke) solid currentColor | 4px solid currentColor | 3px solid currentColor | Highlight a record-level version or category without covering its content. Give the flag a distinct non-color start edge. | Read the special metadata before the item heading and distinguish it from operational status. |

## catalog-ribbon-host.2

Selector: `.ui-ribbon-host`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-md) | 0.75rem | 0.5rem | Reserve real layout space for a record’s flag and heading. Separate the record flag from its content. | Read metadata without an overlay covering its associated content. |

## catalog-video.2

Selector: `.ui-video`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Present a supplied video with browser-owned playback controls and alternatives. Fit the supplied video to its containing surface. | Choose when to play, pause or inspect captions without automatic media or cropped content. |

## catalog-video.3

Selector: `.ui-video`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Present a supplied video with browser-owned playback controls and alternatives. Prevent native intrinsic sizing from widening the page. | Choose when to play, pause or inspect captions without automatic media or cropped content. |

## catalog-video.4

Selector: `.ui-video`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 16 / 9 | 16 / 9 | 16 / 9 | Present a supplied video with browser-owned playback controls and alternatives. Reserve a common wide video frame before loading media. | Choose when to play, pause or inspect captions without automatic media or cropped content. |

## catalog-video.5

Selector: `.ui-video`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| object-fit | contain | contain | contain | Present a supplied video with browser-owned playback controls and alternatives. Keep the whole supplied video visible rather than crop its meaning. | Choose when to play, pause or inspect captions without automatic media or cropped content. |

## catalog-video-figure.1

Selector: `.ui-video-figure`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Keep native video and its caption inside the governed sample clearance. Give the sample sole ownership of outer media clearance. | Inspect the supplied clip without unnecessary native figure side offsets. |

## catalog-video-caption.1

Selector: `.ui-video-figure figcaption`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-end | var(--ui-space-md) | 0.75rem | 0.5rem | Separate the video label from its native control focus. Reserve more than the protected focus perimeter before the player. | Read the format and locate keyboard focus without overlapping the caption. |

## catalog-video-standard.1

Selector: `.ui-video--standard`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 4 / 3 | 4 / 3 | 4 / 3 | Fit older or instructional recordings in their familiar frame. Reserve a standard-format media host without stretching its contents. | Inspect the full supplied video within a four-to-three surface. |

## catalog-video-square.1

Selector: `.ui-video--square`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| aspect-ratio | 1 | 1 | 1 | Show square-format media without a custom player. Reserve a square host while object-fit preserves the supplied video. | Use the same native controls and inspect the complete frame. |

## dashboard-grid.2

Selector: `.ui-dashboard-grid`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| grid-template-columns | repeat(auto-fit, minmax(min(100%, 20rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 20rem), 1fr)) | repeat(auto-fit, minmax(min(100%, 20rem), 1fr)) | Arrange independent dashboard summaries using the available width. Add columns only when a readable card fits. | Compare quantities without losing content on a small display. |

## dashboard-grid.3

Selector: `.ui-dashboard-grid`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-lg) | 1rem | 0.75rem | Arrange independent dashboard summaries using the available width. Separate independent metric contexts. | Compare quantities without losing content on a small display. |

## dashboard-grid.4

Selector: `.ui-dashboard-grid`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Arrange independent dashboard summaries using the available width. Let long metric wording wrap within the viewport. | Compare quantities without losing content on a small display. |

## dashboard-trend.3

Selector: `.ui-trend`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xs) | 0.25rem | 0.25rem | Keep the trend direction and comparison wording together. Clear the supplementary arrow from the words. | Read direction independently of success or failure color coding. |

## dashboard-figure.1

Selector: `.ui-dashboard-figure`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Keep a dashboard graphic and its explanation in one semantic group. Use the containing card’s clearance instead of native figure offsets. | Find units, summary and data before interpreting its shape. |

## dashboard-figure.2

Selector: `.ui-dashboard-figure`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 0 | 0 | 0 | Keep a dashboard graphic and its explanation in one semantic group. Keep the chart group shrinkable. | Find units, summary and data before interpreting its shape. |

## dashboard-figure-parts.1

Selector: `.ui-dashboard-figure > * + *`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-md) | 0.75rem | 0.5rem | Separate caption, narrative, graphic and data without duplicate outer gaps. Use a governed related-content gap. | Follow the explanation and reach the source observations. |

## dashboard-scroll.1

Selector: `.ui-dashboard-scroll`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 100% | 100% | 100% | Keep wide source tables readable inside their chart card. Bound the data region by its card. | Inspect every value with native keyboard and pointer scrolling. |

## dashboard-scroll.3

Selector: `.ui-dashboard-scroll`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-xs) | 0.25rem | 0.25rem | Keep wide source tables readable inside their chart card. Clear source cells and the region’s native focus. | Inspect every value with native keyboard and pointer scrolling. |

## dashboard-table.1

Selector: `.ui-dashboard-table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Preserve native table relationships alongside compact charts. Share the chart card’s available width. | Read exact observations with their headers and units. |

## dashboard-table.2

Selector: `.ui-dashboard-table`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-collapse | collapse | collapse | collapse | Preserve native table relationships alongside compact charts. Avoid doubled separators between observations. | Read exact observations with their headers and units. |

## dashboard-cells.1

Selector: `.ui-dashboard-table th, .ui-dashboard-table td`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | var(--ui-space-sm) | 0.5rem | 0.375rem | Separate source labels and measurements clearly. Give each data cell a governed inset. | Compare individual values without a dense full-cell grid. |

## dashboard-cells.3

Selector: `.ui-dashboard-table th, .ui-dashboard-table td`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | 1px solid var(--ui-divider) | Separate source labels and measurements clearly. Separate records using a passive line. | Compare individual values without a dense full-cell grid. |

## dashboard-bar-value.2

Selector: `.ui-bar-value`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| min-inline-size | 6rem | 6rem | 6rem | Keep exact numeric content above its proportional horizontal bar. Keep short comparison rows at a useful visible measure. | Read the same value that determines the compact comparison graphic. |

## dashboard-bar-graphic.3

Selector: `.ui-bar-value::after`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 0.75rem | 0.75rem | 0.75rem | Derive the supplementary bar from the supplied normalized page attribute. Keep the comparison bar visible without becoming a large colored field. | Compare values on a common zero-to-one-hundred scale. |

## dashboard-bar-graphic.4

Selector: `.ui-bar-value::after`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin-block-start | var(--ui-space-xs) | 0.25rem | 0.25rem | Derive the supplementary bar from the supplied normalized page attribute. Separate the number from the supplementary graphic. | Compare values on a common zero-to-one-hundred scale. |

## dashboard-sparkline.2

Selector: `.ui-sparkline`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 4rem | 4rem | 4rem | Reserve one compact plot for an equal-interval trend. Keep the sparkline compact while making its changes discernible. | See the weekly shape beside a written summary and complete source values. |

## dashboard-sparkline.3

Selector: `.ui-sparkline`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding-block | 3px | 3px | 3px | Reserve one compact plot for an equal-interval trend. Protect endpoint strokes at the zero and maximum edges. | See the weekly shape beside a written summary and complete source values. |

## dashboard-sparkline.5

Selector: `.ui-sparkline`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 24rem | 24rem | 24rem | Reserve one compact plot for an equal-interval trend. Keep the sparkline a compact inline-context graphic rather than stretching it across a desktop page. | See the weekly shape beside a written summary and complete source values. |

## dashboard-spark-segment.1

Selector: `.ui-spark-segment`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| flex | 1 1 0 | 1 1 0 | 1 1 0 | Draw one straight segment between adjacent supplied observations. Distribute equal time intervals equally. | Inspect a truthful line shape without an interactive chart dependency. |

## dashboard-spark-segment.2

Selector: `.ui-spark-segment`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 100% | 100% | 100% | Draw one straight segment between adjacent supplied observations. Map each segment to the same vertical scale. | Inspect a truthful line shape without an interactive chart dependency. |

## dashboard-spark-segment.4

Selector: `.ui-spark-segment`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| clip-path | polygon(0 calc(100% - attr(data-from type(<number>), 0) * 1% - 1.5px), 100% calc(100% - attr(data-to type(<number>), 0) * 1% - 1.5px), 100% calc(100% - attr(data-to type(<number>), 0) * 1% + 1.5px), 0 calc(100% - attr(data-from type(<number>), 0) * 1% + 1.5px)) | polygon(0 calc(100% - attr(data-from type(<number>), 0) * 1% - 1.5px), 100% calc(100% - attr(data-to type(<number>), 0) * 1% - 1.5px), 100% calc(100% - attr(data-to type(<number>), 0) * 1% + 1.5px), 0 calc(100% - attr(data-from type(<number>), 0) * 1% + 1.5px)) | polygon(0 calc(100% - attr(data-from type(<number>), 0) * 1% - 1.5px), 100% calc(100% - attr(data-to type(<number>), 0) * 1% - 1.5px), 100% calc(100% - attr(data-to type(<number>), 0) * 1% + 1.5px), 0 calc(100% - attr(data-from type(<number>), 0) * 1% + 1.5px)) | Draw one straight segment between adjacent supplied observations. Make a visible three-pixel strip between two validated percentages; line endpoints come from the same observations as the data table. | Inspect a truthful line shape without an interactive chart dependency. |

## dashboard-spark-bars.3

Selector: `.ui-spark-bars`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-sm) | 0.5rem | 0.375rem | Compare equal-interval values on a shared zero baseline. Separate discrete observations. | Read relative volume without a truncated bar scale. |

## dashboard-spark-bars.4

Selector: `.ui-spark-bars`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 8rem | 8rem | 8rem | Compare equal-interval values on a shared zero baseline. Provide a compact readable common scale. | Read relative volume without a truncated bar scale. |

## dashboard-spark-bars.5

Selector: `.ui-spark-bars`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-block-end | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Compare equal-interval values on a shared zero baseline. Expose the common zero baseline. | Read relative volume without a truncated bar scale. |

## dashboard-spark-bars.7

Selector: `.ui-spark-bars`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| max-inline-size | 24rem | 24rem | 24rem | Compare equal-interval values on a shared zero baseline. Keep a short series compact while its exact data table remains independently readable. | Read relative volume without a truncated bar scale. |

## dashboard-spark-column.1

Selector: `.ui-spark-column`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| flex | 1 1 0 | 1 1 0 | 1 1 0 | Map a supplied normalized observation to column height. Give equal intervals equal widths. | Compare the same measurements that remain available in the native table. |

## dashboard-spark-column.2

Selector: `.ui-spark-column`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | Map a supplied normalized observation to column height. Bound visual height to the declared zero-to-one-hundred scale. | Compare the same measurements that remain available in the native table. |

## dashboard-bullet.2

Selector: `.ui-bullet`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1.5rem | 1.5rem | 1.5rem | Place actual and target markers on one compact shared scale. Keep the target tick distinct from the inner measure. | Recognize the shortfall using both the written amounts and the marker shapes. |

## dashboard-bullet.4

Selector: `.ui-bullet`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Place actual and target markers on one compact shared scale. Expose the full measurement range. | Recognize the shortfall using both the written amounts and the marker shapes. |

## dashboard-bullet-actual.3

Selector: `.ui-bullet::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-start | 0 | 0 | 0 | Draw the actual measure below its target marker. Start the measure at the common zero. | Compare the actual extent with the written target amount. |

## dashboard-bullet-actual.4

Selector: `.ui-bullet::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block | 25% | 25% | 25% | Draw the actual measure below its target marker. Keep the measure slimmer than the target tick. | Compare the actual extent with the written target amount. |

## dashboard-bullet-actual.5

Selector: `.ui-bullet::before`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | Draw the actual measure below its target marker. Derive actual extent from the validated normalized value. | Compare the actual extent with the written target amount. |

## dashboard-bullet-target.3

Selector: `.ui-bullet::after`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-inline-start | clamp(0px, calc(attr(data-target type(<number>), 0) * 1% - 1.5px), calc(100% - 3px)) | clamp(0px, calc(attr(data-target type(<number>), 0) * 1% - 1.5px), calc(100% - 3px)) | clamp(0px, calc(attr(data-target type(<number>), 0) * 1% - 1.5px), calc(100% - 3px)) | Draw a narrow target tick distinct from the actual bar. Center the three-pixel tick at its validated target while protecting both endpoints. | Locate the target without relying on a second hue. |

## dashboard-bullet-target.4

Selector: `.ui-bullet::after`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inset-block | 0 | 0 | 0 | Draw a narrow target tick distinct from the actual bar. Make the target taller than the actual measure. | Locate the target without relying on a second hue. |

## dashboard-bullet-target.5

Selector: `.ui-bullet::after`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 3px | 3px | 3px | Draw a narrow target tick distinct from the actual bar. Keep the target visible at either density. | Locate the target without relying on a second hue. |

## dashboard-meter.1

Selector: `.ui-meter`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 100% | 100% | 100% | Use browser-owned bounded measurement semantics for capacity. Use the labelled measurement’s available width. | Read the amount and thresholds without mistaking it for loading progress. |

## dashboard-meter.2

Selector: `.ui-meter`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1.5rem | 1.5rem | 1.5rem | Use browser-owned bounded measurement semantics for capacity. Keep the native scalar indicator visible. | Read the amount and thresholds without mistaking it for loading progress. |

## dashboard-meter-track.2

Selector: `.ui-meter::-webkit-meter-bar`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Give the native Chrome meter a governed neutral range. Expose the full bounded range. | See remaining capacity within a clearly bounded scalar measurement. |

## dashboard-meter-track.3

Selector: `.ui-meter::-webkit-meter-bar`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-radius | var(--ui-radius-small) | 0.375rem | 0.25rem | Give the native Chrome meter a governed neutral range. Use the shared bounded-control corner role. | See remaining capacity within a clearly bounded scalar measurement. |

## dashboard-segment-bar.2

Selector: `.ui-segment-bar`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1.5rem | 1.5rem | 1.5rem | Show bounded contributions to one explicitly stated total. Give contributions a visible common strip. | Compare contributions while exact counts and shares remain in the table. |

## dashboard-segment-bar.3

Selector: `.ui-segment-bar`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border | 1px solid var(--ui-border) | 1px solid var(--ui-border) | 1px solid var(--ui-border) | Show bounded contributions to one explicitly stated total. Expose the total extent without implying progress. | Compare contributions while exact counts and shares remain in the table. |

## dashboard-segment.1

Selector: `.ui-segment`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | calc(clamp(0, attr(data-percent type(<number>), 0), 100) * 1%) | Derive each contribution’s width from the supplied normalized share. Map validated shares to their stated total. | Associate the ordered contribution with its written category. |

## dashboard-segment.3

Selector: `.ui-segment`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| border-inline-end | 2px solid var(--ui-surface) | 2px solid var(--ui-surface) | 2px solid var(--ui-surface) | Derive each contribution’s width from the supplied normalized share. Separate adjacent portions without relying only on hue. | Associate the ordered contribution with its written category. |

## dashboard-tracker.3

Selector: `.ui-tracker`. Policy: Density governed.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| gap | var(--ui-space-xs) | 0.25rem | 0.25rem | Present discrete service observations in chronological order. Separate discrete intervals. | Locate unavailable and unknown intervals with symbols and exact source data. |

## dashboard-tracker.5

Selector: `.ui-tracker`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| padding | 0 | 0 | 0 | Present discrete service observations in chronological order. Use the figure’s existing clearance. | Locate unavailable and unknown intervals with symbols and exact source data. |

## dashboard-tracker.6

Selector: `.ui-tracker`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| margin | 0 | 0 | 0 | Present discrete service observations in chronological order. Avoid native list offsets around the graph. | Locate unavailable and unknown intervals with symbols and exact source data. |

## dashboard-tracker-cell.3

Selector: `.ui-tracker-cell`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| inline-size | 1.5rem | 1.5rem | 1.5rem | Use a compact symbol tile for one supplied observation. Make interval symbols discernible without implying an interactive target. | Recognize an available interval using shape and the written legend. |

## dashboard-tracker-cell.4

Selector: `.ui-tracker-cell`. Policy: Protected geometry or structural reset.

| Property | Source value | Normal | Compact | Purpose | User intent |
| --- | --- | --- | --- | --- | --- |
| block-size | 1.5rem | 1.5rem | 1.5rem | Use a compact symbol tile for one supplied observation. Keep each observation square. | Recognize an available interval using shape and the written legend. |
