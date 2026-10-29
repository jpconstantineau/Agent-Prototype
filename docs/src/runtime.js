export class DomainError extends Error {
  constructor(code, message) { super(message); this.name = 'DomainError'; this.code = code; }
}
export function failure(code, message) { return { success: false, code, error: message.slice(0, 500) }; }
export const abortError = () => new DOMException('Request cancelled.', 'AbortError');
export function abortable(promise, signal) {
  if (!signal) return Promise.resolve(promise);
  return new Promise((resolve, reject) => {
    const clean = () => signal.removeEventListener('abort', abort);
    const abort = () => { clean(); reject(signal.reason || abortError()); };
    signal.addEventListener('abort', abort, { once: true });
    // Install handlers even for an already-aborted signal to consume late rejection.
    Promise.resolve(promise).then(v => { clean(); resolve(v); }, e => { clean(); reject(e); });
    if (signal.aborted) abort();
  });
}
export function immutable(value) {
  const copy = structuredClone(value);
  const freeze = node => { if (node && typeof node === 'object') { Object.values(node).forEach(freeze); Object.freeze(node); } };
  freeze(copy); return copy;
}
// Shared eligibility boundary; human task controls retain direct authority.
export class ToolPolicy extends EventTarget {
  constructor() { super(); this.disabled = new Set(); this.revision = 1; }
  allows(name) { return !this.disabled.has(name); }
  check(name, actor) { if (actor !== 'human' && !this.allows(name)) throw new DomainError('disabled', 'This tool was disabled. Start a fresh session after reviewing settings.'); }
  setEnabled(name, enabled) {
    if (enabled) this.disabled.delete(name); else this.disabled.add(name);
    this.revision++; this.dispatchEvent(new Event('change'));
  }
}
