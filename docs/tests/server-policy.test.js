import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentSecurityPolicy } from '../server-policy.mjs';
test('development CSP permits loopback and only explicitly configured private LAN origins',()=>{
  const csp=contentSecurityPolicy();assert.match(csp,/http:\/\/localhost:\*/);assert(!csp.includes('connect-src *'));assert.match(csp,/script-src 'self'/);
  assert.match(contentSecurityPolicy('https://192.168.1.2:8443'),/https:\/\/192\.168\.1\.2:8443/);
  for(const bad of ['https://example.com','https://192.168.1.2/path','http://192.168.1.2','https://192.168.1.2/','*'])assert.throws(()=>contentSecurityPolicy(bad));
});
