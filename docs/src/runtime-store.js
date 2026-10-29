import { DomainError } from './runtime.js';
export class RuntimeStore {
  constructor(db) { this.db = db; }
  transaction(names, mode, operation) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(names, mode); let value, failure;
      tx.oncomplete = () => resolve(value);
      tx.onerror = tx.onabort = () => reject(failure || tx.error || new Error('Runtime storage failed.'));
      try { operation(tx, result => { value = result; }, e => { failure = e; tx.abort(); }); } catch (e) { failure = e; tx.abort(); }
    });
  }
  get(store, id) { return this.transaction([store], 'readonly', (tx, done) => { const r = tx.objectStore(store).get(id); r.onsuccess = () => done(r.result); }); }
  put(store, value) { return this.transaction([store], 'readwrite', tx => tx.objectStore(store).put(value)); }
  saveSettings(value, expectedRevision) {
    if (value.route.revision !== expectedRevision + 1) return Promise.reject(new DomainError('conflict', 'Settings must advance exactly one revision.'));
    return this.transaction(['settings'], 'readwrite', (tx, done, fail) => {
      const store = tx.objectStore('settings'), r = store.get(value.id);
      r.onsuccess = () => {
        if ((r.result?.route?.revision ?? 0) !== expectedRevision) { fail(new DomainError('conflict', 'Model settings changed in another tab. Reopen Settings before saving.')); return; }
        store.put(value); done(value);
      };
    });
  }
  record(event) {
    const value = { ...event, id: crypto.randomUUID(), version: 1, observedAt: new Date().toISOString() };
    return this.put('agentEvents', value);
  }
  events(runId) {
    return this.transaction(['agentEvents'], 'readonly', (tx, done) => {
      const r = runId ? tx.objectStore('agentEvents').index('runId').getAll(runId, 2000) : tx.objectStore('agentEvents').getAll(undefined, 2000);
      r.onsuccess = () => done(r.result.sort((a, b) => (a.runId || '').localeCompare(b.runId || '') || (a.sequence || 0) - (b.sequence || 0)));
    });
  }
  interruptRun(runId) {
    return this.transaction(['agentRuns'], 'readwrite', tx => {
      const store = tx.objectStore('agentRuns'), r = store.get(runId);
      r.onsuccess = () => { if (r.result?.status === 'running') store.put({ ...r.result, status: 'interrupted', endedAt: new Date().toISOString() }); };
    });
  }
}
