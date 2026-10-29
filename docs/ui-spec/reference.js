// Reference-only behavior; never imports the app store, tools or inference.
const status = document.querySelector('#edit-status');
for (const editor of document.querySelectorAll('[data-editor]')) {
  const form = editor.querySelector('form'), control = form.querySelector('input, textarea, select');
  const summary = editor.querySelector('summary'), readValue = editor.querySelector('[data-read-value]');
  const error = form.querySelector('[data-error]');
  let saved = control.value, wasOpen = false;
  const title = editor.dataset.editor === 'date' ? 'Due date' : editor.dataset.editor[0].toUpperCase() + editor.dataset.editor.slice(1);
  form.noValidate = true;
  for (const button of form.querySelectorAll('button')) button.disabled = false;
  const clearError = () => { error.hidden = true; error.textContent = ''; control.removeAttribute('aria-invalid'); };
  const dirty = () => control.value !== saved;
  const close = () => { editor.open = false; summary.focus(); };
  const cancel = () => { control.value = saved; clearError(); close(); status.textContent = `${title} changes cancelled.`; };
  editor.addEventListener('toggle', () => {
    if (!editor.open && dirty()) {
      editor.open = true;
      status.textContent = `Unsaved ${title.toLowerCase()} changes. Choose Save or Cancel before closing.`;
      return;
    }
    if (editor.open && !wasOpen) control.focus();
    wasOpen = editor.open;
  });
  form.addEventListener('input', clearError);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!control.checkValidity() || (control.required && !control.value.trim())) {
      error.textContent = control.validity.valueMissing || !control.value.trim() ? `Enter a ${title.toLowerCase()} before saving.` : control.validationMessage;
      error.hidden = false; control.setAttribute('aria-invalid','true'); control.focus(); return;
    }
    // Preserve user-entered whitespace in optional notes; no implicit normalization.
    saved = control.value;
    readValue.textContent = control instanceof HTMLSelectElement ? control.selectedOptions[0].textContent : saved || 'Not set';
    clearError(); close(); status.textContent = `${title} saved in this example page only.`;
  });
  form.querySelector('[data-cancel]').addEventListener('click', cancel);
  editor.addEventListener('keydown', event => { if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); cancel(); } });
}
const dialog = document.querySelector('#review-dialog'), opener = document.querySelector('#open-review');
opener.disabled = false;
opener.addEventListener('click', () => dialog.showModal());
dialog.addEventListener('close', () => {
  document.querySelector('#dialog-status').textContent = dialog.returnValue === 'confirm' ? 'Example decision confirmed in this page only.' : 'Example decision cancelled.';
  opener.focus();
});
// Clear a previous confirm result before the native Escape cancellation path.
dialog.addEventListener('cancel', () => { dialog.returnValue = 'cancel'; });

async function loadDecisions() {
  const count = document.querySelector('#decision-count'), input = document.querySelector('#decision-search');
  try {
    const response = await fetch('./decisions.json'); if (!response.ok) throw new Error('Unavailable');
    const {rules} = await response.json();
    const all = rules.flatMap(rule => rule.declarations.map(d => ({...d, selector: rule.selector, media: rule.media})));
    const render = () => {
      const query = input.value.trim().toLowerCase(), selected = all.filter(d => JSON.stringify(d).toLowerCase().includes(query));
      const rows = selected.map(d => {
        const row = document.createElement('tr');
        for (const value of [`${d.id} · ${d.selector}${d.media ? ` @media ${d.media}` : ''}`, `${d.property}: ${d.value}`, d.purpose, d.intent, `${d.check} · ${d.status}`]) {
          const cell = document.createElement('td'); cell.textContent = value; row.append(cell);
        }
        return row;
      });
      document.querySelector('#decision-rows').replaceChildren(...rows);
      count.textContent = `${selected.length} of ${all.length} declarations shown. All await maintainer approval.`;
    };
    input.addEventListener('input', render); render();
  } catch { count.textContent = 'The decision ledger could not load. Reload this page or read UI-Spec/CSS-DECISIONS.md in the repository.'; }
}
loadDecisions();
