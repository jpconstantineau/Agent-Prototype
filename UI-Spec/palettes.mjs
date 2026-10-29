// Full resolved palettes share roles. Distinct is a user preference, not a claim
// that one palette represents every color-vision deficiency.
const light = { primary: '#284637', 'primary-hover': '#1d3529', ink: '#20352a', muted: '#526258', canvas: '#f5f5f0', surface: '#ffffff', subtle: '#eaf0e5', border: '#6c7c70', divider: '#d6ded5', focus: '#005fcc', danger: '#9b2c24', success: '#235b3b', 'success-bg': '#eaf5ec', warning: '#725000', 'warning-bg': '#fff4d6', disabled: '#526258', 'disabled-bg': '#e8ece6', 'on-primary': '#ffffff' };
const dark = { primary: '#9bd2ae', 'primary-hover': '#b5e3c4', ink: '#edf5ef', muted: '#bac9bf', canvas: '#101712', surface: '#18231c', subtle: '#24352a', border: '#8b9e90', divider: '#465c4d', focus: '#80b6ff', danger: '#ffb4ac', success: '#a4ddb4', 'success-bg': '#1b3826', warning: '#f5d483', 'warning-bg': '#3b3018', disabled: '#b1c2b5', 'disabled-bg': '#2b3b30', 'on-primary': '#102318' };
export const palettes = {
  'light-standard': { theme: 'light', vision: 'standard', label: 'Light · standard', colors: light },
  'dark-standard': { theme: 'dark', vision: 'standard', label: 'Dark · standard', colors: dark },
  'light-distinct': { theme: 'light', vision: 'distinct', label: 'Light · distinct status colors', colors: { ...light, primary: '#174b7a', 'primary-hover': '#10395f', focus: '#7025b4', danger: '#6d2498', success: '#174b7a', 'success-bg': '#e8f1fa' } },
  'dark-distinct': { theme: 'dark', vision: 'distinct', label: 'Dark · distinct status colors', colors: { ...dark, primary: '#9fcaff', 'primary-hover': '#c3deff', 'on-primary': '#101f30', focus: '#f1c75b', danger: '#e2b4ff', success: '#b3d5ff', 'success-bg': '#1b304a' } },
};
export const designFiles = {
  'light-standard': 'UI-Spec/DESIGN.md',
  'dark-standard': 'UI-Spec/themes/dark.DESIGN.md',
  'light-distinct': 'UI-Spec/themes/light-distinct.DESIGN.md',
  'dark-distinct': 'UI-Spec/themes/dark-distinct.DESIGN.md',
};
