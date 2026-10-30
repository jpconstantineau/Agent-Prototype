// Full resolved palettes share roles. Distinct is a user preference, not a claim
// that one palette represents every color-vision deficiency.
// Achromatic structural roles keep large areas quiet in every appearance.
// Exact grays are project choices; ISA-101 does not prescribe these hex values.
// Primary is the maintainer-selected filled-button color in every appearance.
// Interactive is a related, independently checked blue for text/native marks.
const light = { primary: '#006aa8', 'primary-hover': '#005686', ink: '#242424', muted: '#505050', canvas: '#d9d9d9', surface: '#e6e6e6', subtle: '#dedede', border: '#737373', divider: '#b8b8b8', focus: '#005fcc', danger: '#9b2c24', success: '#235b3b', 'success-bg': '#dedede', warning: '#725000', 'warning-bg': '#dedede', disabled: '#505050', 'disabled-bg': '#d2d2d2', 'on-primary': '#ffffff', interactive: '#005b90', 'on-interactive': '#ffffff' };
// Dark focus/state foregrounds use richer midtones instead of pale tints.
// These remain compact cues on neutral fills, with unchanged contrast thresholds.
const dark = { primary: '#006aa8', 'primary-hover': '#005686', ink: '#ededed', muted: '#c2c2c2', canvas: '#242424', surface: '#2e2e2e', subtle: '#383838', border: '#a3a3a3', divider: '#585858', focus: '#409fea', danger: '#f58276', success: '#4fc685', 'success-bg': '#383838', warning: '#eab54d', 'warning-bg': '#383838', disabled: '#c2c2c2', 'disabled-bg': '#404040', 'on-primary': '#ffffff', interactive: '#40adf0', 'on-interactive': '#242424' };
export const palettes = {
  'light-standard': { theme: 'light', vision: 'standard', label: 'Light · standard', colors: light },
  'dark-standard': { theme: 'dark', vision: 'standard', label: 'Dark · standard', colors: dark },
  'light-distinct': { theme: 'light', vision: 'distinct', label: 'Light · distinct status colors', colors: { ...light, focus: '#7025b4', danger: '#6d2498', success: '#174b7a' } },
  'dark-distinct': { theme: 'dark', vision: 'distinct', label: 'Dark · distinct status colors', colors: { ...dark, focus: '#e5af3b', danger: '#d18bf0', success: '#57adf0' } },
};
export const designFiles = {
  'light-standard': 'UI-Spec/DESIGN.md',
  'dark-standard': 'UI-Spec/themes/dark.DESIGN.md',
  'light-distinct': 'UI-Spec/themes/light-distinct.DESIGN.md',
  'dark-distinct': 'UI-Spec/themes/dark-distinct.DESIGN.md',
};
