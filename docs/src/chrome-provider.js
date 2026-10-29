import { MODEL_OPTIONS, ProviderError, finite, unknownUsage } from './inference-provider.js';
import { abortable } from './runtime.js';
export async function modelAvailability(api = globalThis.LanguageModel) {
  return api ? api.availability(MODEL_OPTIONS) : 'unsupported';
}
export class ChromeProvider {
  constructor({ api = globalThis.LanguageModel, onProgress = () => {} } = {}) {
    this.api = api; this.onProgress = onProgress; this.identity = { provider: 'chrome', profileId: null, model: null }; this.overflow = false; this.disposed = false;
  }
  // Call immediately from the button handler when activation/download is needed.
  prepare(initialPrompts, options = {}, signal) {
    if (!this.api) throw new ProviderError('unavailable', 'Chrome Prompt API is unavailable.');
    signal?.throwIfAborted();
    const creation = this.api.create({ ...MODEL_OPTIONS, initialPrompts, signal,
      monitor: monitor => monitor.addEventListener('downloadprogress', e => this.onProgress(e.loaded)),
    });
    return abortable(Promise.resolve(creation).then(session => {
      if (this.disposed || signal?.aborted) { session.destroy(); signal?.throwIfAborted(); throw new ProviderError('unavailable', 'The model session was released.'); }
      this.session = session;
      this.onOverflow = () => { this.overflow = true; };
      session.addEventListener?.('contextoverflow', this.onOverflow);
      return this;
    }), signal);
  }
  async measure({ input, responseSchema, signal, messages = [] }) {
    if (this.overflow) throw new ProviderError('context_overflow', 'Chrome discarded conversation context. Start a fresh chat; saved operations will not be replayed.');
    const capacity = finite(this.session.contextWindow), retained = finite(this.session.contextUsage);
    let next = null;
    if (typeof this.session.measureContextUsage === 'function') {
      try { next = finite(await abortable(this.session.measureContextUsage(input, { responseConstraint: responseSchema, signal }), signal)); }
      catch (e) { if (e.name !== 'NotSupportedError') throw e; }
    }
    signal?.throwIfAborted();
    return { capacity: capacity > 0 ? capacity : null, retained, next, reserve: capacity > 0 ? Math.ceil(capacity * 0.2) : null,
      provenance: capacity > 0 && retained !== null && next !== null ? 'measured' : 'unknown', unit: 'chrome_context_units',
      inputChars: JSON.stringify(messages).length + input.length + JSON.stringify(responseSchema).length };
  }
  async generate(input, responseSchema, manifest, signal) {
    const text = await abortable(this.session.prompt(input, { responseConstraint: responseSchema, signal }), signal);
    signal?.throwIfAborted();
    if (this.overflow) throw new ProviderError('context_overflow', 'Chrome discarded context during generation. Review saved changes and start a fresh chat.');
    if (typeof text !== 'string' || !text.trim() || text.length > 48000) throw new ProviderError('invalid_response', 'Chrome returned an empty or oversized action.');
    return { text, finishReason: 'complete', usage: { ...unknownUsage(), context: finite(this.session.contextUsage), unit: 'chrome_context_units', provenance: finite(this.session.contextUsage) === null ? 'unknown' : 'measured' }, identity: this.identity };
  }
  dispose() {
    this.disposed = true;
    this.session?.removeEventListener?.('contextoverflow', this.onOverflow);
    this.session?.destroy(); this.session = null;
  }
}
