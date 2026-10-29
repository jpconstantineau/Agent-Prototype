import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TodoStore } from '../src/store.js';
import { ToolRegistry } from '../src/tools.js';
import { harness } from './helpers.js';

const timestamp = '2026-10-26T12:00:00.000Z';
const legacyItems = [
  { id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', title: 'First', notes: 'Keep these details', priority: 'high', dueDate: '2027-01-15', completed: true, createdAt: timestamp, updatedAt: timestamp, completedAt: timestamp },
  { id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', title: 'Second', notes: '', priority: 'normal', dueDate: '', completed: false, createdAt: timestamp, updatedAt: timestamp, completedAt: null },
];

async function seedLegacy(items = legacyItems) {
  const name = `legacy-test-${crypto.randomUUID()}`;
  await new Promise((resolve, reject) => {
    const request = indexedDB.open(name, 1);
    request.onupgradeneeded = () => {
      const store = request.result.createObjectStore('items', { keyPath: 'id' });
      store.createIndex('createdAt', 'createdAt');
      for (const item of items) store.add(item);
    };
    request.onsuccess = () => { request.result.close(); resolve(); };
    request.onerror = () => reject(request.error);
  });
  return name;
}

test('v1 records preserve task fields while gaining stable identity and revision metadata', async t => {
  const name = await seedLegacy();
  const store = await TodoStore.open(name, { broadcast: false });
  t.after(() => store.close());
  assert.equal(store.db.version, 3);
  assert.deepEqual((await store.list()).items.map(({stableId,revision,schemaVersion,tombstone,...item})=>item), legacyItems.map((item, i) => ({ ...item, id: i + 1 })));
  const schema = store.db.transaction('items').objectStore('items');
  assert.equal(schema.autoIncrement, true);
  assert.equal(schema.keyPath, 'id');
  assert.ok(schema.indexNames.contains('createdAt'));
  store.close();
  const reopened = await TodoStore.open(name, { broadcast: false });
  t.after(() => reopened.close());
  const registry = new ToolRegistry(reopened);
  const found = await registry.execute('search_items', { query: 'Second' });
  assert.equal(found.items[0].id, 2);
  assert.equal((await registry.execute('complete_item', { id: found.items[0].id })).item.completed, true);
  assert.equal((await registry.execute('add_item', { title: 'After migration' })).item.id, 3);
  assert.equal((await registry.execute('search_items', { query: 'First' })).items[0].id, 1);
});

test('an empty v1 database migrates and starts allocating at 1', async t => {
  const store = await TodoStore.open(await seedLegacy([]), { broadcast: false });
  t.after(() => store.close());
  assert.equal((await store.add({ title: 'First task' })).item.id, 1);
});

test('an interrupted migration rolls back the schema and all legacy records, then can retry', async t => {
  const name = await seedLegacy();
  const originalAdd = IDBObjectStore.prototype.add;
  const mocked = t.mock.method(IDBObjectStore.prototype, 'add', function (value, ...args) {
    if (this.transaction.mode === 'versionchange' && value.title === 'Second') {
      this.transaction.abort();
      return;
    }
    return originalAdd.call(this, value, ...args);
  });
  try { await assert.rejects(TodoStore.open(name, { broadcast: false }), { name: 'AbortError' }); }
  finally { mocked.mock.restore(); }
  const legacy = await new Promise((resolve, reject) => {
    const request = indexedDB.open(name, 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  try {
    assert.equal(legacy.version, 1);
    const records = await new Promise((resolve, reject) => {
      const store = legacy.transaction('items').objectStore('items');
      assert.equal(store.autoIncrement, false);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    assert.deepEqual(records, legacyItems);
  } finally { legacy.close(); }
  const migrated = await TodoStore.open(name, { broadcast: false });
  t.after(() => migrated.close());
  assert.deepEqual((await migrated.list()).items.map(({stableId,revision,schemaVersion,tombstone,...item})=>item), legacyItems.map((item, i) => ({ ...item, id: i + 1 })));
});

test('concurrent connections allocate unique numeric IDs and retain the counter after reopening', async t => {
  const { store, name } = await harness(t);
  const other = await TodoStore.open(name, { broadcast: false });
  t.after(() => other.close());
  const results = await Promise.all(Array.from({ length: 40 }, (_, i) => (i % 2 ? other : store).add({ title: `Task ${i}` })));
  assert.deepEqual(results.map(result => result.item.id).sort((a, b) => a - b), Array.from({ length: 40 }, (_, i) => i + 1));
  store.close(); other.close();
  const reopened = await TodoStore.open(name, { broadcast: false });
  t.after(() => reopened.close());
  assert.equal((await reopened.add({ title: 'After reopening' })).item.id, 41);
});

test('equal timestamps use numeric ID ordering for stable pagination beyond single digits', async t => {
  const { store } = await harness(t);
  await store.transaction('readwrite', (items, done) => {
    for (let i = 0; i < 12; i++) items.add({ ...legacyItems[1], id: i + 1, title: `Task ${i}`, createdAt: timestamp });
    done();
  });
  const first = await store.list({ limit: 10 });
  assert.deepEqual(first.items.map(item => item.id), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual((await store.list({ offset: first.nextOffset })).items.map(item => item.id), [11, 12]);
});
