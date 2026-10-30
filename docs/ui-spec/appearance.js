// Runs before the stylesheet to apply this reference page's last preference.
// Only data attributes govern styles; no inline styles or app settings change.
(() => {
  const key = 'daylist-ui-reference-appearance-v1', root = document.documentElement;
  let preference = { theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', vision: 'standard', density: 'normal' };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && ['light','dark'].includes(saved.theme) && ['standard','distinct'].includes(saved.vision)) preference = { theme: saved.theme, vision: saved.vision, density: saved.density === 'compact' ? 'compact' : 'normal' };
  } catch { /* A denied or malformed preference uses the system brightness. */ }
  const apply = () => { root.dataset.bsTheme = preference.theme; root.dataset.vision = preference.vision; root.dataset.density = preference.density; };
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    const dark = document.querySelector('#theme-dark'), distinct = document.querySelector('#vision-distinct'), compact = document.querySelector('#density-compact'), status = document.querySelector('#appearance-status');
    const announce = () => {
      status.textContent = `${preference.theme === 'dark' ? 'Dark' : 'Light'} · ${preference.vision === 'distinct' ? 'Distinct status colors' : 'Standard palette'} · ${preference.density === 'compact' ? 'Compact' : 'Normal'} spacing`;
      for (const code of document.querySelectorAll('[data-color-value]')) code.textContent = getComputedStyle(root).getPropertyValue(`--ui-${code.dataset.colorValue}`).trim();
    };
    dark.checked = preference.theme === 'dark'; distinct.checked = preference.vision === 'distinct'; compact.checked = preference.density === 'compact';
    dark.disabled = false; distinct.disabled = false; compact.disabled = false; announce();
    const change = () => {
      preference = { theme: dark.checked ? 'dark' : 'light', vision: distinct.checked ? 'distinct' : 'standard', density: compact.checked ? 'compact' : 'normal' };
      apply(); announce();
      try { localStorage.setItem(key, JSON.stringify(preference)); }
      catch { status.textContent += ' · This page cannot remember the preference after reload.'; }
    };
    dark.addEventListener('change', change); distinct.addEventListener('change', change); compact.addEventListener('change', change);
  }, { once: true });
})();
