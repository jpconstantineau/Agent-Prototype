import { endpointUrl } from './src/provider-profile-store.js';
// Loopback is the only default network expansion. LAN deployment origins must
// be listed by the operator as exact origins, then separately chosen in Settings.
export function contentSecurityPolicy(extraOrigins = '') {
  const extras = extraOrigins.split(',').map(s => s.trim()).filter(Boolean).map(value => {
    const url = new URL(value);
    if (url.origin !== value) throw new Error('LOCAL_MODEL_ORIGINS requires exact origins without paths or trailing slashes.');
    endpointUrl(`${url.origin}/v1/`, { allowLan: true });
    return url.origin;
  });
  const loopback = ['http://localhost:*', 'https://localhost:*', 'http://127.0.0.1:*', 'https://127.0.0.1:*', 'http://[::1]:*', 'https://[::1]:*'];
  return `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self' ${[...loopback, ...extras].join(' ')}; object-src 'none'; base-uri 'none'; frame-ancestors 'none'`;
}
