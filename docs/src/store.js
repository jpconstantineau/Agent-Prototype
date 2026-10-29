import { DomainError } from './runtime.js';
export class TodoStore extends EventTarget {
  constructor(db, { broadcast = true } = {}) {
    super();
    this.db = db;
    if (broadcast && globalThis.BroadcastChannel) {
      this.channel = new BroadcastChannel(`${db.name}:changes`);
      this.channel.onmessage = () => this.dispatchEvent(new Event('change'));
    }
    db.onversionchange = () => {
      this.close();
      this.dispatchEvent(new Event('versionchange'));
    };
  }

  static open(name = 'chrome-todo-agent', options) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, 3);
      let blocked = false;
      request.onupgradeneeded = event => {
        const createItems = () => {
          const store = request.result.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
          store.createIndex('createdAt', 'createdAt');
          return store;
        };
        if (event.oldVersion < 3) {
          for (const name of ['operations', 'outbox', 'agentEvents', 'agentRuns', 'settings']) request.result.createObjectStore(name, { keyPath: 'id' });
          request.transaction.objectStore('agentEvents').createIndex('runId', 'runId');
          request.transaction.objectStore('settings').put({ id: 'local-identity', ownerId: crypto.randomUUID(), deviceId: crypto.randomUUID(), version: 1 });
        }
        const identityFields = item => ({ ...item, stableId: item.stableId || crypto.randomUUID(), revision: item.revision || 1, schemaVersion: 1, tombstone: false });
        if (event.oldVersion === 0) { createItems(); return; }
        if (event.oldVersion === 2) {
          const cursor = request.transaction.objectStore('items').openCursor();
          cursor.onsuccess = () => { if (cursor.result) { cursor.result.update(identityFields(cursor.result.value)); cursor.result.continue(); } };
          return;
        }
        // Re-key v1 UUID records inside the upgrade transaction. If any read or
        // write fails, IndexedDB rolls back both the records and schema to v1.
        const read = request.transaction.objectStore('items').getAll();
        read.onsuccess = () => {
          const items = read.result.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
          request.result.deleteObjectStore('items');
          const store = createItems();
          for (const { id: legacyId, ...item } of items) store.add(identityFields(item));
        };
      };
      request.onsuccess = () => { if (blocked) request.result.close(); else resolve(new TodoStore(request.result, options)); };
      request.onerror = () => reject(request.error);
      request.onblocked = () => { blocked = true; reject(new Error('Database upgrade blocked. Close other tabs of this app and reload.')); };
    });
  }

  // Resolve only on transaction commit, not request success. Mutations are atomic
  // across UI actions, the agent, and other tabs (including read-modify-write).
  transaction(mode, operation, signal, context) {
    signal?.throwIfAborted();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(mode === 'readwrite' ? ['items', 'operations', 'outbox'] : ['items'], mode);
      let result;
      let failure;
      let unwatch;
      const abort = () => { try { tx.abort(); } catch { /* already committed */ } };
      const clean = () => { signal?.removeEventListener('abort', abort); unwatch?.(); };
      signal?.addEventListener('abort', abort, { once: true });
      tx.oncomplete = () => {
        clean();
        if (mode === 'readwrite') {
          this.channel?.postMessage('change');
          this.dispatchEvent(new Event('change'));
        }
        resolve(result);
      };
      tx.onabort = tx.onerror = () => {
        clean();
        reject(failure || (signal?.aborted ? signal.reason : tx.error) || new Error('Database transaction failed.'));
      };
      const fail = error => { failure = error; abort(); };
      unwatch = context?.watch?.(fail);
      const done = value => {
        if (mode === 'readwrite' && value?.item) {
          signal?.throwIfAborted(); context?.check?.();
          const operationId = context?.operationId || crypto.randomUUID();
          const receipt = { id: operationId, version: 1, itemStableId: value.item.stableId, localId: value.item.id, revision: value.item.revision,
            runId: context?.runId || null, threadId: context?.threadId || null, ownerId: context?.ownerId || null, deviceId: context?.deviceId || null,
            actor: context?.actor || 'human', policyRevision: context?.policyRevision || 1, committedAt: new Date().toISOString() };
          tx.objectStore('operations').add(receipt);
          tx.objectStore('outbox').add({ ...receipt, state: 'pending', payload: value.item });
          result = { ...value, operationReceiptId: operationId };
        } else result = value;
      };
      try { operation(tx.objectStore('items'), value => { try { done(value); } catch (e) { fail(e); } }, fail); }
      catch (error) { fail(error); }
    });
  }

  async list({ query = '', status = 'all', limit = 25, offset = 0 } = {}, signal) {
    const all = await this.transaction('readonly', (store, done) => {
      const request = store.getAll();
      request.onsuccess = () => done(request.result);
    }, signal);
    const needle = query.trim().toLocaleLowerCase();
    const filtered = all.filter(item => (status === 'all' || item.completed === (status === 'completed')) &&
      (!needle || `${item.title}\n${item.notes}`.toLocaleLowerCase().includes(needle)))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id - b.id);
    const items = filtered.slice(offset, offset + limit);
    return { items, total: filtered.length, offset, nextOffset: offset + items.length < filtered.length ? offset + items.length : null };
  }

  add({ title, notes = '', priority = 'normal', dueDate = '' }, signal, context) {
    const now = new Date().toISOString();
    const item = { title: title.trim(), notes: notes.trim(), priority, dueDate, completed: false, createdAt: now, updatedAt: now, completedAt: null,
      stableId: crypto.randomUUID(), revision: 1, schemaVersion: 1, tombstone: false };
    // IndexedDB owns the counter, so concurrent tabs cannot allocate the same
    // ID. Only return its generated key after the transaction has committed.
    return this.transaction('readwrite', (store, done, fail) => {
      const request = store.add(item);
      request.onsuccess = () => {
        if (!Number.isSafeInteger(request.result)) { fail(new Error('Task ID limit reached.')); return; }
        done({ item: { id: request.result, ...item } });
      };
    }, signal, context);
  }

  update(id, patch, signal, context) {
    return this.transaction('readwrite', (store, done, fail) => {
      const request = store.get(id);
      request.onsuccess = () => {
        if (!request.result) { fail(new DomainError('not_found', `Item ${id} was not found. Search for the item again.`)); return; }
        if (!Number.isSafeInteger(request.result.revision + 1)) { fail(new DomainError('conflict', 'This task cannot advance its revision. Review storage before retrying.')); return; }
        const next = { ...request.result, ...patch, revision: request.result.revision + 1, updatedAt: new Date().toISOString() };
        if (typeof patch.title === 'string') next.title = patch.title.trim();
        if (typeof patch.notes === 'string') next.notes = patch.notes.trim();
        if (Object.hasOwn(patch, 'completed')) next.completedAt = patch.completed ? (request.result.completedAt || next.updatedAt) : null;
        store.put(next);
        done({ item: next });
      };
    }, signal, context);
  }

  close() { this.channel?.close(); this.db.close(); }
}
