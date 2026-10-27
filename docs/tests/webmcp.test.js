import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerWebMCP } from '../src/tools.js';
import { harness } from './helpers.js';

test('registers five validated tools and dispatches native discovery/execution', async t => {
  const { registry } = await harness(t);
  const tools = new Map();
  let nativeCalls = 0;
  const context = {
    registerTool: async tool => tools.set(tool.name, tool),
    unregisterTool: name => tools.delete(name),
    getTools: async () => [...tools.values()],
    executeTool: async (tool, args, options) => { nativeCalls++; return tool.execute(args, options); },
  };
  const connection = await registerWebMCP(registry, { context });
  assert.equal(connection.mode, 'webmcp');
  assert.equal(tools.size, 5);
  assert.equal(tools.get('list_items').annotations.readOnlyHint, true);
  assert.equal(tools.get('add_item').annotations.untrustedContentHint, true);
  const result = await connection.executor.execute('add_item', { title: 'Native tool call' });
  assert.equal(result.success, true);
  assert.equal(nativeCalls, 1);
  assert.equal(result.item.id, 1);
  assert.equal(tools.get('complete_item').inputSchema.properties.id.type, 'integer');
  const listed = await connection.executor.execute('list_items', {});
  const completed = await connection.executor.execute('complete_item', { id: listed.items[0].id });
  assert.equal(completed.item.id, 1);
  assert.equal(completed.item.completed, true);
  assert.equal(nativeCalls, 3);
  assert.equal(JSON.parse(await tools.get('add_item').execute({ title: '' })).success, false);
  assert.equal((await registry.execute('list_items', {})).total, 1);
  connection.dispose();
  assert.equal(tools.size, 0);
});

test('falls back explicitly when WebMCP is absent or registration fails, cleaning partial registration', async t => {
  const { registry } = await harness(t);
  assert.equal((await registerWebMCP(registry, { context: null })).mode, 'local');
  const names = new Set();
  const context = {
    registerTool: tool => { if (names.size === 2) throw new Error('Not supported'); names.add(tool.name); },
    unregisterTool: name => names.delete(name),
  };
  const connection = await registerWebMCP(registry, { context });
  assert.equal(connection.mode, 'local');
  assert.match(connection.message, /registration failed/);
  assert.equal(names.size, 0);
});

test('native execution failures never replay a potentially committed mutation locally', async t => {
  const { registry } = await harness(t);
  const tools = [];
  const context = {
    registerTool: tool => tools.push(tool),
    getTools: () => tools,
    executeTool: async (tool, args) => { await tool.execute(args); throw new Error('Transport failed after commit'); },
  };
  const connection = await registerWebMCP(registry, { context });
  await assert.rejects(connection.executor.execute('add_item', { title: 'Exactly once' }), /after commit/);
  assert.equal((await registry.execute('list_items', {})).total, 1);
});

test('older registration-only WebMCP still exposes tools and uses the shared page dispatcher for chat', async t => {
  const { registry } = await harness(t);
  const context = { registerTool() {} };
  const connection = await registerWebMCP(registry, { context });
  assert.equal(connection.mode, 'webmcp');
  assert.equal(connection.executor, registry);
  assert.match(connection.message, /page dispatcher/);
});
