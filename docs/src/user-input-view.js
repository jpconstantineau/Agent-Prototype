import { canonicalAnswers } from './user-input-contract.js';
const el = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
};
export class UserInputView {
  constructor({ host, broker, cancel, visible, status }) {
    Object.assign(this, { host, broker, cancel, visible, status });
    this.cards = new Map(); this.active = null;
  }
  focus() { this.active?.heading.focus({ preventScroll: true }); }
  event(event) {
    if (event.type === 'user_input_requested') this.mount(event);
    if (event.type === 'user_input_submitted') this.settle(event.requestId, event.result);
    if (event.type === 'user_input_cancelled') this.settle(event.requestId, null);
  }
  mount(event) {
    if (!this.host?.isConnected || this.active) throw new Error('The question host is unavailable.');
    const card = el('section', undefined, 'question-card'); card.setAttribute('aria-live', 'off');
    const heading = el('h3', event.arguments.title); heading.tabIndex = -1;
    card.append(heading, el('p', 'Answer below to continue. Nothing changes until you submit.'));
    const form = el('form'); form.noValidate = true;
    const errorSummary = el('p', '', 'form-error'); errorSummary.setAttribute('role', 'alert');
    const rows = new Map();
    let composing = false, attempted = false;
    const read = () => ({ requestId: event.requestId, answers: event.arguments.questions.flatMap(q => {
      const r = rows.get(q.id);
      if (r.skipped) return [{ questionId: q.id, kind: 'skipped' }];
      if (q.mode === 'text' || r.custom?.checked) return [{ questionId: q.id, kind: 'text', text: r.text.value }];
      const selected = r.choices.filter(c => c.input.checked).map(c => c.id);
      return selected.length ? [{ questionId: q.id, kind: 'choice', optionIds: selected }] : [];
    }) });
    const submit = el('button', 'Answer and continue', 'button primary'); submit.type = 'submit'; submit.disabled = true;
    const update = () => {
      const checked = canonicalAnswers(event.arguments, read());
      submit.disabled = Boolean(checked.errors) || composing || [...rows.values()].some(r => r.pasteError && !r.skipped && (r.mode === 'text' || r.custom?.checked));
      for (const [id, r] of rows) {
        const customActive = r.custom?.checked;
        for (const c of r.choices) c.input.disabled = r.skipped || (r.mode === 'multi' && customActive);
        if (r.custom) r.custom.disabled = r.skipped;
        if (r.text) {
          r.text.disabled = r.skipped || (r.mode !== 'text' && !customActive);
          r.text.hidden = r.mode !== 'text' && !customActive;
          r.textLabel.hidden = r.text.hidden;
          r.count.hidden = r.text.hidden;
          r.count.textContent = `${2000 - r.text.value.length} characters remaining`;
        }
        r.skip && (r.skip.textContent = r.skipped ? 'Undo skip' : 'Skip this question');
        const error = attempted && checked.errors?.find(e => e.questionId === id);
        const pasteError = r.pasteError && !r.skipped && (r.mode === 'text' || customActive) ? r.pasteError : '';
        r.error.textContent = pasteError || error?.message || '';
        r.group.setAttribute('aria-invalid', String(Boolean(error || pasteError)));
      }
      if (attempted) errorSummary.textContent = checked.errors?.find(e => e.questionId === null)?.message || '';
    };
    for (const q of event.arguments.questions) {
      const group = el('fieldset'), legend = el('legend', q.question);
      group.append(legend, el('p', `${q.header}${q.required ? '' : ' · Optional'}`, 'question-caption'));
      if (q.mode === 'multi') group.append(el('p', 'Choose one or more.', 'question-caption'));
      const row = { group, mode: q.mode, choices: [], skipped: false };
      rows.set(q.id, row);
      const radioName = crypto.randomUUID();
      for (const option of q.options) {
        const label = el('label', undefined, 'question-option');
        const input = el('input'); input.type = q.mode === 'single' ? 'radio' : 'checkbox'; input.name = radioName;
        const body = el('span'); body.append(el('span', option.label));
        if (option.recommended) body.append(el('span', 'Recommended', 'question-recommended'));
        const description = el('small', option.description); description.id = `description-${crypto.randomUUID()}`;
        body.append(description); input.setAttribute('aria-describedby', description.id);
        label.append(input, body); group.append(label); row.choices.push({ id: option.id, input });
      }
      if (q.allowCustomAnswer) {
        const label = el('label', undefined, 'question-option'), input = el('input');
        input.type = q.mode === 'single' ? 'radio' : 'checkbox'; input.name = radioName;
        label.append(input, document.createTextNode(q.mode === 'single' ? 'Other answer' : 'Use a custom answer instead'));
        group.append(label); row.custom = input;
      }
      if (q.mode === 'text' || q.allowCustomAnswer) {
        row.text = el('textarea'); row.text.maxLength = 2000; row.text.rows = 3;
        row.text.id = `answer-${crypto.randomUUID()}`;
        const label = el('label', q.mode === 'text' ? 'Your answer' : 'Your custom answer'); label.htmlFor = row.text.id; row.textLabel = label;
        row.count = el('small', '', 'question-caption');
        row.text.addEventListener('input', () => { row.pasteError = ''; });
        row.text.addEventListener('paste', event => {
          const pasted = event.clipboardData?.getData('text/plain');
          if (pasted && row.text.value.length - (row.text.selectionEnd - row.text.selectionStart) + pasted.length > 2000) {
            event.preventDefault(); row.pasteError = 'That paste exceeds 2000 characters. Nothing was pasted; shorten it before trying again.'; update();
          }
        });
        group.append(label, row.text, row.count);
      }
      if (!q.required) {
        row.skip = el('button', 'Skip this question', 'text-button'); row.skip.type = 'button';
        row.skip.addEventListener('click', () => { row.skipped = !row.skipped; update(); }); group.append(row.skip);
      }
      row.error = el('p', '', 'form-error'); row.error.id = `error-${crypto.randomUUID()}`;
      group.setAttribute('aria-describedby', row.error.id); group.append(row.error); form.append(group);
    }
    const cancel = el('button', 'Cancel request', 'button secondary'); cancel.type = 'button'; cancel.addEventListener('click', this.cancel);
    const actions = el('div', undefined, 'question-actions'); actions.append(submit, cancel); form.append(errorSummary, actions); card.append(form);
    form.addEventListener('compositionstart', () => { composing = true; update(); });
    form.addEventListener('compositionend', () => { composing = false; update(); });
    form.addEventListener('input', update); form.addEventListener('change', update);
    form.addEventListener('submit', e => {
      e.preventDefault(); if (composing) return;
      attempted = true;
      const response = this.broker.submit(read());
      if (!response.accepted) {
        update(); errorSummary.textContent = response.errors.map(e => e.message).join(' ');
        const row = rows.get(response.errors.find(e => e.questionId)?.questionId);
        (row?.group.querySelector('input:not(:disabled),textarea:not(:disabled)') || heading).focus();
      }
    });
    const entry = { card, heading, form, arguments: event.arguments };
    this.cards.set(event.requestId, entry); this.active = entry;
    this.host.append(card); update();
    if (this.visible()) { heading.focus({ preventScroll: true }); card.scrollIntoView({ block: 'nearest' }); }
  }
  settle(id, result) {
    const entry = this.cards.get(id); if (!entry || entry !== this.active) return;
    const hadFocus = entry.card.contains(document.activeElement);
    for (const input of entry.form.elements) input.disabled = true;
    const summary = el('div', undefined, 'question-summary');
    summary.append(el('p', result ? 'Answer sent. Continuing.' : 'Cancelled. No answer was sent.'));
    if (result) for (const q of entry.arguments.questions) {
      const a = result.answers.find(a => a.questionId === q.id);
      const text = a.kind === 'skipped' ? 'Skipped' : a.kind === 'text' ? a.text : q.options.filter(o => a.optionIds.includes(o.id)).map(o => o.label).join(', ');
      summary.append(el('p', `${q.header}: ${text}`));
    }
    entry.form.replaceWith(summary); entry.form = null; entry.card.classList.add('settled'); this.active = null;
    if (hadFocus) this.status.focus({ preventScroll: true });
  }
  clear() { for (const [id, card] of this.cards) if (card === this.active) this.settle(id, null); this.cards.clear(); this.active = null; }
}
