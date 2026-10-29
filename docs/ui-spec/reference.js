// Reference-only behavior; never imports the app store, tools or inference.
const status = document.querySelector('#edit-status');
for (const form of document.querySelectorAll('[data-inline-record]')) {
  const controls = [...form.querySelectorAll('input, textarea, select')];
  let saved = controls.map(control => control.value);
  form.noValidate = true;
  for (const button of form.querySelectorAll('button')) button.disabled = false;
  const errorFor = control => form.querySelector(`#${control.dataset.error}`);
  const clearError = control => { const error = errorFor(control); error.hidden = true; error.textContent = ''; control.removeAttribute('aria-invalid'); };
  const dirty = () => controls.some((control,index) => control.value !== saved[index]);
  const cancel = () => {
    controls.forEach((control,index) => { control.value = saved[index]; clearError(control); });
    status.textContent = 'Example changes cancelled. The last saved values have been restored.';
    controls[0].focus();
  };
  form.addEventListener('input', event => {
    if (!controls.includes(event.target)) return;
    clearError(event.target);
    status.textContent = dirty() ? 'Unsaved example changes. Use Save changes or Cancel changes; leaving a field does not save.' : 'No unsaved example changes.';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    let firstInvalid;
    for (const control of controls) {
      clearError(control);
      if (control.checkValidity() && !(control.required && !control.value.trim())) continue;
      const error = errorFor(control);
      error.textContent = control.required && !control.value.trim() ? 'Error: enter a task title before saving.' : `Error: ${control.validationMessage}`;
      error.hidden = false; control.setAttribute('aria-invalid','true'); firstInvalid ||= control;
    }
    if (firstInvalid) { firstInvalid.focus(); return; }
    saved = controls.map(control => control.value);
    status.textContent = 'Example changes saved in this page only.';
  });
  form.querySelector('[data-cancel]').addEventListener('click', cancel);
  form.addEventListener('keydown', event => { if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); cancel(); } });
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
