import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TodoStore } from '../src/store.js';
import { harness } from './helpers.js';

test('add, edit, complete, reopen and persist after closing the database', async t => {
  const { store, registry, name } = await harness(t);
  const added = await registry.execute('add_item', { title: '  Buy coffee  ', notes: 'Whole beans', priority: 'high', dueDate: '2028-02-29' });
  assert.equal(added.success, true);
  assert.equal(added.item.title, 'Buy coffee');
  const id = added.item.id;
  let result = await registry.execute('edit_item', { id, title: 'Buy decaf', dueDate: '' });
  assert.equal(result.item.notes, 'Whole beans');
  assert.equal(result.item.priority, 'high');
  assert.equal(result.item.dueDate, '');
  result = await registry.execute('complete_item', { id });
  assert.equal(result.item.completed, true);
  assert.ok(result.item.completedAt);
  const completedAt = result.item.completedAt;
  assert.equal((await registry.execute('complete_item', { id })).item.completedAt, completedAt);
  store.close();
  const reopened = await TodoStore.open(name, { broadcast: false });
  t.after(() => reopened.close());
  const list = await reopened.list();
  assert.equal(list.items[0].id, id);
  assert.equal(list.items[0].completed, true);
  await reopened.update(id, { completed: false });
  assert.equal((await reopened.list()).items[0].completedAt, null);
});

test('search titles and notes, filter and paginate without losing matches', async t => {
  const { registry } = await harness(t);
  const first = await registry.execute('add_item', { title: 'Buy APPLES' });
  await registry.execute('add_item', { title: 'Shopping', notes: 'apples and pears' });
  await registry.execute('add_item', { title: 'Call dentist' });
  await registry.execute('complete_item', { id: first.item.id });
  const found = await registry.execute('search_items', { query: 'ApPlEs', limit: 1 });
  assert.equal(found.total, 2);
  assert.equal(found.items.length, 1);
  assert.equal(found.nextOffset, 1);
  const second = await registry.execute('search_items', { query: 'apples', limit: 1, offset: found.nextOffset });
  assert.equal(second.nextOffset, null);
  assert.notEqual(second.items[0].id, found.items[0].id);
  assert.equal((await registry.execute('list_items', { status: 'open' })).total, 2);
  assert.equal((await registry.execute('search_items', { query: 'apples', status: 'completed' })).total, 1);
});

test('the execution boundary rejects malformed inputs and unknown tools without mutation', async t => {
  const { registry } = await harness(t);
  const bad = [
    ['add_item', { title: '   ' }], ['add_item', { title: 42 }], ['add_item', { title: 'x', completed: true }],
    ['add_item', { title: 'x', priority: 'urgent' }], ['add_item', { title: 'x', dueDate: '2026-02-30' }],
    ['add_item', { title: 'x', dueDate: 'tomorrow' }], ['add_item', { title: 'x'.repeat(201) }],
    ['add_item', { title: 'x', notes: 'y'.repeat(2001) }], ['add_item', null],
    ['list_items', { limit: 0 }], ['list_items', { limit: 51 }], ['list_items', { offset: -1 }],
    ['list_items', { limit: 1.5 }], ['list_items', { status: 'anything' }],
    ['complete_item', { id: 'missing', completed: 'yes' }], ['edit_item', { id: 'missing' }],
    ['search_items', { query: '' }], ['delete_item', {}],
    ['toString', {}], ['add_item', JSON.parse('{"title":"x","__proto__":{}}')],
  ];
  for (const [name, args] of bad) assert.equal((await registry.execute(name, args)).success, false, `${name} ${JSON.stringify(args)}`);
  assert.equal((await registry.execute('list_items', {})).total, 0);
  assert.equal((await registry.execute('edit_item', { id: 'missing', title: 'New' })).success, false);
});

test('atomic concurrent edits preserve independent fields', async t => {
  const { registry } = await harness(t);
  const { item } = await registry.execute('add_item', { title: 'Plan trip' });
  await Promise.all([
    registry.execute('edit_item', { id: item.id, notes: 'Bring passport' }),
    registry.execute('complete_item', { id: item.id }),
    registry.execute('edit_item', { id: item.id, priority: 'high' }),
  ]);
  const { items } = await registry.execute('list_items', {});
  assert.equal(items[0].notes, 'Bring passport');
  assert.equal(items[0].completed, true);
  assert.equal(items[0].priority, 'high');
});

test('pre-aborted tools never write', async t => {
  const { registry } = await harness(t);
  const controller = new AbortController(); controller.abort();
  await assert.rejects(registry.execute('add_item', { title: 'No write' }, { signal: controller.signal }), { name: 'AbortError' });
  assert.equal((await registry.execute('list_items', {})).total, 0);
});

test('aborting an in-flight write rolls back the transaction', async t => {
  const { registry } = await harness(t);
  const controller = new AbortController();
  const pending = registry.execute('add_item', { title: 'Rolled back' }, { signal: controller.signal });
  controller.abort();
  await assert.rejects(pending, { name: 'AbortError' });
  assert.equal((await registry.execute('list_items', {})).total, 0);
});

test('a mutation resolves after commit and emits a change notification', async t => {
  const { store, registry } = await harness(t);
  let count = 0;
  store.addEventListener('change', () => count++);
  await registry.execute('add_item', { title: '<img src=x onerror=alert(1)>' });
  assert.equal(count, 1);
  assert.equal((await store.list()).items[0].title, '<img src=x onerror=alert(1)>');
});

test('long tool result pages respect the context budget and paginate without skipping items', async t => {
  const { registry } = await harness(t);
  for (let index = 0; index < 20; index++) await registry.execute('add_item', { title: `Task ${index}`, notes: 'x'.repeat(2000) });
  const ids = new Set();
  let offset = 0;
  do {
    const result = await registry.execute('list_items', { limit: 50, offset });
    assert.ok(JSON.stringify(result).length <= 12000);
    for (const item of result.items) {
      assert.equal(item.notes.length, 2000);
      assert.equal(ids.has(item.id), false);
      ids.add(item.id);
    }
    offset = result.nextOffset;
  } while (offset !== null);
  assert.equal(ids.size, 20);
});
