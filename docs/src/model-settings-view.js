import { LocalHttpProvider, testEndpoint } from './local-http-provider.js';
import { validateProfile } from './provider-profile-store.js';
export class ModelSettingsView {
  constructor({ dialog, profiles, schema, changed, status }) {
    Object.assign(this, { dialog, profiles, schema, changed, status });
    this.form = dialog.querySelector('form'); this.token = ''; this.tested = null;
    this.form.addEventListener('submit', e => { e.preventDefault(); this.save(); });
    dialog.querySelector('[data-close-settings]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-test-endpoint]').addEventListener('click', () => this.test());
    dialog.querySelector('[data-forget-token]').addEventListener('click', () => { this.token = ''; this.field('token').value = ''; this.tested = null; this.status.textContent = 'Session token forgotten. Connect / Test again before using the endpoint.'; this.changed(); });
    this.form.addEventListener('input', () => { this.dirty = true; this.tested = null; this.status.textContent = 'Disconnected · save and test changed settings before using the endpoint.'; this.changed(); });
    dialog.addEventListener('close', () => { this.testing?.abort(); this.field('token').value = ''; });
  }
  field(name) { return this.form.elements.namedItem(name); }
  async load() { this.saved = await this.profiles.load(); this.render(); }
  render() {
    const { profile: p, route: r, allowLan } = this.saved;
    const values = { primary: r.primary, fallback: r.fallback, label: p?.label || 'Local server', baseUrl: p?.baseUrl || 'http://localhost:11434/v1/', model: p?.model || '', contextWindowTokens: p?.contextWindowTokens || 32768, inputCharLimit: p?.inputCharLimit || 24000, maxOutputTokens: p?.maxOutputTokens || 2048, timeoutMs: p?.timeoutMs || 90000 };
    for (const [key, value] of Object.entries(values)) this.field(key).value = value;
    this.field('allowLan').checked = allowLan; this.field('token').value = '';
    this.field('localModel').checked = false;
    this.dirty = false;
  }
  open() { this.render(); this.dialog.showModal(); }
  connection() { return { ...this.saved, token: this.token, testedSchemaSignature: this.tested?.schemaSignature }; }
  async save() {
    if (this.testing) return;
    const output = this.dialog.querySelector('[data-settings-error]'); output.textContent = '';
    try {
      const primary = this.field('primary').value, old = this.saved;
      let profile = old.profile;
      if (primary === 'local_http') {
        if (!this.field('localModel').checked) throw new Error('Confirm that the server uses a locally served, inference-only model.');
        profile = { profileId: profile?.profileId || crypto.randomUUID(), revision: (profile?.revision || 0) + 1,
          label: this.field('label').value.trim(), baseUrl: this.field('baseUrl').value.trim(), model: this.field('model').value.trim(), protocol: 'openai_chat', schemaMode: 'json_schema' };
        for (const key of ['contextWindowTokens','inputCharLimit','maxOutputTokens','timeoutMs']) profile[key] = Number(this.field(key).value);
        validateProfile(profile, { allowLan: this.field('allowLan').checked });
      }
      const route = { ...old.route, revision: (old.version ? old.route.revision : 0) + 1, primary, endpointProfileId: primary === 'local_http' ? profile.profileId : null, fallback: this.field('fallback').value };
      const next = { route, profile, allowLan: this.field('allowLan').checked };
      this.saved = await this.profiles.save(next, old.version ? old.route.revision : 0);
      if (this.field('token').value) this.token = this.field('token').value;
      this.field('token').value = ''; this.tested = null;
      this.dirty = false;
      this.status.textContent = primary === 'chrome' ? 'Chrome selected · enable AI to connect.' : 'Disconnected · settings saved. Connect / Test before enabling the endpoint.';
      this.changed();
    } catch (e) { output.textContent = e.message; }
  }
  async test() {
    if (this.testing) return;
    const error = this.dialog.querySelector('[data-settings-error]'); error.textContent = '';
    if (this.dirty || this.saved.route.primary !== 'local_http' || !this.saved.profile) { error.textContent = 'Save the local endpoint settings first.'; return; }
    this.testing = new AbortController();
    const saved = this.saved;
    const controls = [...this.form.querySelectorAll('input,select,[data-forget-token]')];
    for (const control of controls) control.disabled = true;
    const button = this.dialog.querySelector('[data-test-endpoint]'); button.disabled = true;
    this.dialog.querySelector('[type="submit"]').disabled = true;
    this.status.textContent = 'Testing · three harmless structured-output probes; no tools execute.';
    let provider;
    try {
      provider = new LocalHttpProvider({ ...this.connection(), profile: this.saved.profile });
      this.tested = await testEndpoint(provider, this.schema(), this.testing.signal);
      if (this.dirty || this.saved !== saved) { this.tested = null; throw new Error('Settings changed during the test. Save and test the current revision.'); }
      this.status.textContent = `Ready · ${this.saved.profile.model} · ${new URL(this.saved.profile.baseUrl).origin}`;
      this.changed();
    } catch (e) { this.tested = null; this.status.textContent = 'Blocked / unavailable · endpoint test did not complete.'; if (e.name !== 'AbortError') error.textContent = e.message; }
    finally { provider?.dispose(); this.testing = null; for (const control of controls) control.disabled = false; button.disabled = false; this.dialog.querySelector('[type="submit"]').disabled = false; }
  }
}
