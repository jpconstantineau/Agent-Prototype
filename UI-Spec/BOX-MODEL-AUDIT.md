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
