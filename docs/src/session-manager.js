import { ChromeProvider, modelAvailability } from './chrome-provider.js';
import { LocalHttpProvider } from './local-http-provider.js';
import { ProviderError, RetryInference, MODEL_OPTIONS } from './inference-provider.js';
import { abortable } from './runtime.js';
export class SessionManager {
  constructor({ route, profile, token, allowLan, api, fetchImpl, onProgress, onEvent = () => {}, requestFallback, testedSchemaSignature } = {}) {
    Object.assign(this, { route: route || { primary: 'chrome', fallback: 'automatic' }, profile, token, allowLan, api, fetchImpl, onProgress, onEvent, requestFallback, testedSchemaSignature });
    this.route = structuredClone(this.route); this.profile = this.profile ? structuredClone(this.profile) : null;
    this.messages = []; this.generation = 1; this.busy = false; this.disposed = false;
  }
  prepare(initialPrompts, options = {}, signal) {
    if (this.disposed) throw new ProviderError('unavailable', 'This session was released.');
    this.messages = structuredClone(initialPrompts);
    if (this.route.primary === 'local_http') {
      if (this.testedSchemaSignature !== JSON.stringify(options.responseSchema)) throw new ProviderError('incompatible', 'Connect/Test this endpoint with the current tool schema before enabling it.');
      this.provider = new LocalHttpProvider(this);
    } else this.provider = new ChromeProvider(this);
    // Preserve Chrome activation: no unrelated await before prepare/create.
    return this.provider.prepare(this.messages, options, signal).then(() => this);
  }
  get identity() { return this.provider?.identity; }
  configurationSnapshot() {
    return structuredClone({ route: this.route, profile: this.profile, allowLan: this.allowLan === true, modelOptions: MODEL_OPTIONS, generation: this.generation, identity: this.identity });
  }
  async generate(input, responseSchema, manifest = {}, signal) {
    if (this.busy || this.disposed) throw new ProviderError('busy', 'This model session is busy or released.');
    this.busy = true;
    const generation = this.generation, controller = new AbortController(); this.pending = controller;
    const abort = () => controller.abort(signal.reason);
    signal?.addEventListener('abort', abort, { once: true });
    try {
      signal?.throwIfAborted();
      const measurement = await this.provider.measure({ input, responseSchema, messages: this.messages, signal: controller.signal });
      controller.signal.throwIfAborted();
      this.onEvent({ type: 'context_measurement', generation, identity: this.identity, measurement, observedAt: new Date().toISOString() });
      if (measurement.provenance === 'measured' && measurement.retained + measurement.next + measurement.reserve > measurement.capacity) throw new ProviderError('context_limit', 'The next exchange cannot fit with the required reply reserve. Start a fresh, smaller chat; no context or saved operations were silently discarded.');
      if (measurement.provenance === 'unknown' && measurement.inputChars > 48000) throw new ProviderError('context_limit', 'Context capacity is unknown and this conversation exceeds the conservative character bound. Start a smaller chat.');
      const response = await abortable(this.provider.generate(input, responseSchema, { ...manifest, messages: structuredClone(this.messages) }, controller.signal), controller.signal);
      controller.signal.throwIfAborted();
      if (this.disposed || generation !== this.generation) throw new DOMException('Stale generation.', 'AbortError');
      this.messages.push({ role: 'user', content: input }, { role: 'assistant', content: response.text });
      return response;
    } catch (e) {
      controller.signal.throwIfAborted();
      if (e instanceof ProviderError && e.recoverable && this.identity?.provider === 'local_http' && this.route.fallback !== 'off' && manifest.remainingCalls > 0) {
        await this.fallback(e, controller.signal);
        throw new RetryInference();
      }
      throw e;
    } finally { signal?.removeEventListener('abort', abort); if (this.pending === controller) this.pending = null; this.busy = false; }
  }
  async fallback(error, signal) {
    const previous = this.identity;
    const create = () => {
      const provider = new ChromeProvider(this);
      // Called directly by the explicit Continue button when activation is needed.
      return provider.prepare(structuredClone(this.messages), {}, signal).catch(e => { provider.dispose(); throw e; });
    };
    let replacement;
    if (this.route.fallback === 'automatic' && await modelAvailability(this.api).catch(() => 'unavailable') === 'available') {
      try { replacement = await create(); } catch (e) { if (signal.aborted) throw e; }
    }
    if (!replacement) {
      if (!this.requestFallback) throw new ProviderError('unavailable', 'The local endpoint failed. Enable Chrome and start a fresh session to continue.');
      replacement = await abortable(this.requestFallback({ reason: error.message, create, signal }), signal);
    }
    signal.throwIfAborted();
    if (!replacement) throw new ProviderError('unavailable', 'Fallback was declined. Saved changes remain committed.');
    this.provider.dispose(); this.provider = replacement; this.generation++;
    this.onEvent({ type: 'provider_fallback', reason: error.code, previous, identity: this.identity, generation: this.generation });
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.generation++; this.pending?.abort(); this.provider?.dispose(); this.token = ''; this.messages = [];
  }
  destroy() { this.dispose(); }
}
