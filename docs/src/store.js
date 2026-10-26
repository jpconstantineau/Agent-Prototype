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
      const request = indexedDB.open(name, 1);
      let blocked = false;
      request.onupgradeneeded = () => {
        const store = request.result.createObjectStore('items', { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt');
      };
      request.onsuccess = () => { if (blocked) request.result.close(); else resolve(new TodoStore(request.result, options)); };
      request.onerror = () => reject(request.error);
      request.onblocked = () => { blocked = true; reject(new Error('Database upgrade blocked. Close other tabs of this app and reload.')); };
    });
  }

  // Resolve only on transaction commit, not request success. Mutations are atomic
  // across UI actions, the agent, and other tabs (including read-modify-write).
  transaction(mode, operation, signal) {
    signal?.throwIfAborted();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('items', mode);
      let result;
      let failure;
      const abort = () => { try { tx.abort(); } catch { /* already committed */ } };
      const clean = () => signal?.removeEventListener('abort', abort);
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
      try { operation(tx.objectStore('items'), value => { result = value; }, fail); }
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
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id));
    const items = filtered.slice(offset, offset + limit);
    return { items, total: filtered.length, offset, nextOffset: offset + items.length < filtered.length ? offset + items.length : null };
  }

  add({ title, notes = '', priority = 'normal', dueDate = '' }, signal) {
    const now = new Date().toISOString();
    const item = { id: crypto.randomUUID(), title: title.trim(), notes: notes.trim(), priority, dueDate, completed: false, createdAt: now, updatedAt: now, completedAt: null };
    return this.transaction('readwrite', (store, done) => { store.add(item); done({ item }); }, signal);
  }

  update(id, patch, signal) {
    return this.transaction('readwrite', (store, done, fail) => {
      const request = store.get(id);
      request.onsuccess = () => {
        if (!request.result) { fail(new Error(`Item ${id} was not found. Search for the item again.`)); return; }
        const next = { ...request.result, ...patch, updatedAt: new Date().toISOString() };
        if (typeof patch.title === 'string') next.title = patch.title.trim();
        if (typeof patch.notes === 'string') next.notes = patch.notes.trim();
        if (Object.hasOwn(patch, 'completed')) next.completedAt = patch.completed ? (request.result.completedAt || next.updatedAt) : null;
        store.put(next);
        done({ item: next });
      };
    }, signal);
  }

  close() { this.channel?.close(); this.db.close(); }
}
