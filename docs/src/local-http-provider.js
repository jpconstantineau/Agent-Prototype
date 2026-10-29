import { validate, object } from './schema.js';
import { validateProfile, endpointUrl } from './provider-profile-store.js';
import { ProviderError, unknownUsage } from './inference-provider.js';
import { abortable } from './runtime.js';
import { validateQuestionRequest } from './user-input-contract.js';
const MAX_BYTES = 1024 * 1024;
async function readJson(response, signal) {
  if (!/\bapplication\/(?:[\w.-]+\+)?json\b/i.test(response.headers.get('content-type') || '')) throw new ProviderError('incompatible', 'The endpoint did not return JSON.');
  if (Number(response.headers.get('content-length')) > MAX_BYTES) throw new ProviderError('incompatible', 'The endpoint response exceeds 1 MiB.');
  const reader = response.body?.getReader();
  if (!reader) throw new ProviderError('incompatible', 'The endpoint response body is unavailable.');
  const decoder = new TextDecoder(); let bytes = 0, text = '';
  try {
    for (;;) {
      const { value, done } = await abortable(reader.read(), signal); if (done) break;
      bytes += value.byteLength; if (bytes > MAX_BYTES) throw new ProviderError('incompatible', 'The endpoint response exceeds 1 MiB.');
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally { await reader.cancel().catch(() => {}); }
  try { return JSON.parse(text); } catch { throw new ProviderError('incompatible', 'The endpoint returned invalid JSON.'); }
}
export function parseCompletion(body) {
  const choice = body?.choices?.[0], message = choice?.message;
  if (!Array.isArray(body?.choices) || body.choices.length !== 1 || choice.index !== 0 || message?.role !== 'assistant' || typeof message.content !== 'string' || !message.content.trim() || message.content.length > 48000 || Object.hasOwn(message, 'tool_calls') || Object.hasOwn(message, 'function_call') || message.refusal || choice.finish_reason !== 'stop') {
    const error = new ProviderError('invalid_response', 'The endpoint returned an unsupported, refused, truncated, or native-tool response.');
    error.actionText = typeof message?.content === 'string' && message.content.length <= 48000 ? message.content : null;
    throw error;
  }
  const usage = { ...unknownUsage(), unit: 'provider_tokens' };
  for (const [remote, local] of [['prompt_tokens','input'],['completion_tokens','output'],['total_tokens','context']]) {
    const value = body.usage?.[remote];
    if (value !== undefined) {
      if (!Number.isSafeInteger(value) || value < 0) throw new ProviderError('invalid_response', 'The endpoint returned invalid usage metrics.');
      usage[local] = value;
    }
  }
  if (usage.input !== null || usage.output !== null) usage.provenance = 'measured';
  // total_tokens is per-request usage, never a Chrome retained-context measure.
  return { text: message.content, finishReason: 'complete', usage };
}
export class LocalHttpProvider {
  constructor({ profile, token = '', allowLan = false, fetchImpl = globalThis.fetch?.bind(globalThis) } = {}) {
    validateProfile(profile, { allowLan });
    if (typeof token !== 'string' || /[\r\n]/.test(token) || token.length > 4000) throw new Error('The session token is invalid.');
    this.profile = structuredClone(profile); this.token = token; this.fetchImpl = fetchImpl;
    this.url = endpointUrl(profile.baseUrl, { allowLan });
    this.identity = { provider: 'local_http', profileId: profile.profileId, profileRevision: profile.revision, model: profile.model };
    this.disposed = false;
  }
  prepare(initialPrompts, options, signal) { signal?.throwIfAborted(); this.initialPrompts = structuredClone(initialPrompts); return Promise.resolve(this); }
  measure({ input, responseSchema, messages = [] }) {
    return { capacity: this.profile.contextWindowTokens, retained: null, next: null, reserve: this.profile.maxOutputTokens,
      provenance: 'estimated', unit: 'configured_provider_tokens', inputChars: JSON.stringify([...messages, { role: 'user', content: input }]).length + JSON.stringify(responseSchema).length };
  }
  async generate(input, responseSchema, manifest = {}, signal) {
    signal?.throwIfAborted(); if (this.disposed) throw new ProviderError('unavailable', 'The endpoint session was released.');
    const messages = [...(manifest.messages || this.initialPrompts), { role: 'user', content: input }];
    if (JSON.stringify(messages).length + JSON.stringify(responseSchema).length > this.profile.inputCharLimit) throw new ProviderError('context_limit', 'This request exceeds the configured local input character limit. Start a smaller explicit request or a fresh chat.');
    const controller = new AbortController(); this.pending = controller;
    const abort = () => controller.abort(signal.reason);
    signal?.addEventListener('abort', abort, { once: true });
    const timer = setTimeout(() => controller.abort(new ProviderError('timeout', 'The local endpoint timed out.', true)), this.profile.timeoutMs);
    try {
      const response = await abortable(this.fetchImpl(this.url, {
        method: 'POST', mode: 'cors', credentials: 'omit', cache: 'no-store', redirect: 'error', signal: controller.signal,
        headers: { 'Content-Type': 'application/json', ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}) },
        body: JSON.stringify({ model: this.profile.model, messages, stream: false, n: 1, max_tokens: this.profile.maxOutputTokens,
          response_format: { type: 'json_schema', json_schema: { name: manifest.purpose || 'agent_action', strict: true, schema: responseSchema } } }),
      }), controller.signal);
      signal?.throwIfAborted();
      if (!response.ok) {
        await response.body?.cancel().catch(() => {});
        const denied = [401,403].includes(response.status);
        throw new ProviderError(denied ? 'permission_denied' : 'service_error', denied ? 'The endpoint refused authentication or permission. Check Settings; provider fallback is not allowed for this refusal.' : `The endpoint returned HTTP ${response.status}.`, [429,500,502,503,504].includes(response.status));
      }
      const result = parseCompletion(await readJson(response, controller.signal));
      signal?.throwIfAborted(); controller.signal.throwIfAborted();
      return { ...result, identity: this.identity };
    } catch (error) {
      if (signal?.aborted) throw signal.reason;
      if (controller.signal.aborted) throw controller.signal.reason;
      if (error instanceof ProviderError) throw error;
      throw new ProviderError('network', 'The browser could not reach the endpoint. Check CORS, local-network permission, TLS, CSP, and server availability; the exact cause is not exposed.', true);
    } finally { clearTimeout(timer); signal?.removeEventListener('abort', abort); if (this.pending === controller) this.pending = null; }
  }
  dispose() { this.disposed = true; this.pending?.abort(); this.token = ''; }
}
export async function testEndpoint(provider, actionSchema, signal) {
  // Three bounded, harmless probes: no proposed action is ever executed.
  const simple = object({ type: { type: 'string', const: 'final' }, message: { type: 'string', minLength: 1, maxLength: 80 } }, ['type','message']);
  const vocabulary = object({ version: { type: 'integer', minimum: 1, maximum: 1 }, values: { type: 'array', minItems: 1, maxItems: 2, uniqueItems: true, items: { type: 'string', enum: ['ready','ok'] } }, optional: { anyOf: [{ type: 'null' }, { type: 'number', minimum: 0, maximum: 1 }] } }, ['version','values','optional']);
  const questionAvailable = actionSchema.anyOf?.some(branch => branch.properties?.name?.const === 'request_user_input');
  const probes = [
    [simple, 'Reply with {"type":"final","message":"ready"}.'],
    [vocabulary, 'Reply with {"version":1,"values":["ready"],"optional":null}.'],
    [actionSchema, questionAvailable ? 'Return request_user_input with version 1, title Connection test, and one required single-choice question (id test, header Test, question Which example?). Set allowCustomAnswer false. Supply two options (id first, label First, description Example one) and (id second, label Second, description Example two). No tool executes.' : 'Return a final message saying ready. Do not perform any task operation.'],
  ];
  const messages = [{ role: 'system', content: 'Harmless schema connection test. Return exactly the requested JSON. No tools execute.' }];
  for (const [schema, input] of probes) {
    const result = await provider.generate(input, schema, { messages }, signal);
    let action;
    try {
      action = JSON.parse(result.text); validate(schema, action);
      if (schema === actionSchema && questionAvailable) {
        if (action.name !== 'request_user_input') throw new Error('The nested question probe was not followed.');
        validateQuestionRequest(action.arguments);
      }
    } catch { throw new ProviderError('incompatible', 'The endpoint did not satisfy the required structured-output schema and nested question probe.'); }
  }
  return { status: 'ready', identity: provider.identity, schemaSignature: JSON.stringify(actionSchema), profileRevision: provider.profile.revision };
}
