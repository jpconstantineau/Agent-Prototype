import { object, validate } from './schema.js';
const str = max => ({ type: 'string', minLength: 1, maxLength: max });
export const profileSchema = object({
  profileId: str(80), revision: { type: 'integer', minimum: 1 }, label: str(80), baseUrl: str(500), model: str(200),
  protocol: { type: 'string', const: 'openai_chat' }, schemaMode: { type: 'string', const: 'json_schema' },
  contextWindowTokens: { type: 'integer', minimum: 1024, maximum: 131072 },
  inputCharLimit: { type: 'integer', minimum: 2000, maximum: 200000 },
  maxOutputTokens: { type: 'integer', minimum: 256, maximum: 8192 },
  timeoutMs: { type: 'integer', minimum: 5000, maximum: 180000 },
}, ['profileId','revision','label','baseUrl','model','protocol','schemaMode','contextWindowTokens','inputCharLimit','maxOutputTokens','timeoutMs']);
export const routeSchema = object({ routeId: str(80), revision: { type: 'integer', minimum: 1 }, label: str(80), primary: { type: 'string', enum: ['local_http','chrome'] }, endpointProfileId: { anyOf: [str(80), { type: 'null' }] }, fallback: { type: 'string', enum: ['automatic','ask','off'] } }, ['routeId','revision','label','primary','endpointProfileId','fallback']);
export function endpointUrl(baseUrl, { allowLan = false } = {}) {
  let url; try { url = new URL(baseUrl); } catch { throw new Error('Enter an absolute local endpoint URL ending in /v1/.'); }
  if (!['http:','https:'].includes(url.protocol) || url.username || url.password || /[?#]/.test(baseUrl) || !url.pathname.endsWith('/v1/') || /%/.test(url.pathname)) throw new Error('Use a local HTTP(S) URL ending in /v1/, without credentials, query, or fragment.');
  const host = url.hostname.toLowerCase(), ipv4 = host.split('.').map(Number);
  const loopback = host === 'localhost' || host.endsWith('.localhost') || host === '[::1]' || (/^127(?:\.\d+){3}$/.test(host));
  const lan = (ipv4.length === 4 && ipv4.every(n => Number.isInteger(n) && n >= 0 && n <= 255) && (ipv4[0] === 10 || (ipv4[0] === 172 && ipv4[1] >= 16 && ipv4[1] <= 31) || (ipv4[0] === 192 && ipv4[1] === 168) || (ipv4[0] === 169 && ipv4[1] === 254))) || /^\[(?:f[cd][0-9a-f]{2}:|fe[89ab][0-9a-f]:)/i.test(host) || host.endsWith('.local');
  if (!loopback && !(allowLan && lan && url.protocol === 'https:')) throw new Error('Use loopback, or explicitly approve a private LAN HTTPS address. Public/cloud endpoints and LAN HTTP are unsupported.');
  return new URL('chat/completions', url).href;
}
export function validateProfile(profile, options) {
  validate(profileSchema, profile, 'profile');
  if (profile.maxOutputTokens >= profile.contextWindowTokens / 2) throw new Error('The output cap must be less than half the configured context window.');
  endpointUrl(profile.baseUrl, options); return profile;
}
export function validateRoute(route) {
  validate(routeSchema, route, 'route');
  if ((route.primary === 'chrome') !== (route.endpointProfileId === null)) throw new Error('The route must reference exactly its local profile or Chrome.');
  return route;
}
// No token is accepted here. Credentials live only in the Settings controller.
export class ProviderProfileStore {
  constructor(runtime) { this.runtime = runtime; }
  async load() {
    const saved = await this.runtime.get('settings', 'device-model-route');
    if (saved) { validateRoute(saved.route); if (saved.profile) validateProfile(saved.profile, { allowLan: saved.allowLan === true }); }
    return saved || { id: 'device-model-route', route: { routeId: crypto.randomUUID(), revision: 1, label: 'This device', primary: 'chrome', endpointProfileId: null, fallback: 'automatic' }, profile: null, allowLan: false };
  }
  async save({ route, profile, allowLan }, expectedRevision) {
    validateRoute(route); if (profile) validateProfile(profile, { allowLan });
    if (route.primary === 'local_http' && profile?.profileId !== route.endpointProfileId) throw new Error('The route/profile binding is invalid.');
    return this.runtime.saveSettings({ id: 'device-model-route', version: 1, route, profile, allowLan: allowLan === true }, expectedRevision);
  }
}
