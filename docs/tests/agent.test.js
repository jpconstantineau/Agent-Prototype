import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AgentLoop, modelAvailability, createModelSession, MODEL_OPTIONS } from '../src/agent.js';
import { harness, scriptedSession, call, final } from './helpers.js';

test('model → add → search → edit → complete → final using the IndexedDB store', async t => {
  const { registry } = await harness(t);
  const inputs = [], events = [];
  let id;
  const session = scriptedSession([
    call('add_item', { title: 'Buy milk' }),
    input => { id = JSON.parse(input).result.item.id; assert.equal(id, 1); return call('search_items', { query: 'milk' }); },
    input => { assert.equal(JSON.parse(input).result.items[0].id, id); return call('edit_item', { id, title: 'Buy oat milk' }); },
    () => call('complete_item', { id }),
    final('Added, updated, and completed Buy oat milk.'),
  ], inputs);
  const agent = new AgentLoop({ registry, session, onEvent: event => events.push(event) });
  const result = await agent.run('Add milk, rename it to oat milk, then complete it.');
  assert.equal(result.status, 'completed');
  assert.equal(result.iterations, 5);
  assert.equal(result.trace.filter(e => e.type === 'tool_result').length, 4);
  assert.equal(events.length, result.trace.length);
  assert.equal((await registry.execute('list_items', {})).items[0].completed, true);
  assert.equal((await registry.execute('list_items', {})).items[0].title, 'Buy oat milk');
  assert.ok(inputs.every(({ options }) => options.responseConstraint.anyOf));
  assert.equal(JSON.parse(inputs[0].input).kind, 'user_request');
});

test('failed tools return observations to the model so it can recover', async t => {
  const { registry } = await harness(t);
  const session = scriptedSession([
    call('edit_item', { id: 999, title: 'Updated' }),
    input => {
      const observation = JSON.parse(input);
      assert.equal(observation.result.success, false);
      assert.match(observation.result.error, /not found/);
      return final('I could not find that task. Which one should I edit?');
    },
  ]);
  const result = await new AgentLoop({ registry, session }).run('Edit that task');
  assert.equal(result.status, 'completed');
  assert.equal(result.trace.find(e => e.type === 'tool_result').result.success, false);
});

test('add result can feed complete directly, and list result can feed edit in the next call', async t => {
  const { registry } = await harness(t);
  const session = scriptedSession([
    call('add_item', { title: 'Review numeric IDs' }),
    input => {
      const { item } = JSON.parse(input).result;
      assert.equal(item.id, 1);
      return call('complete_item', { id: item.id });
    },
    input => { assert.equal(JSON.parse(input).result.item.completed, true); return call('list_items'); },
    input => {
      const { items } = JSON.parse(input).result;
      assert.equal(items[0].id, 1);
      return call('edit_item', { id: items[0].id, notes: 'Passed between tool calls' });
    },
    final('Completed the task and added the note.'),
  ]);
  const result = await new AgentLoop({ registry, session }).run('Add Review numeric IDs, complete it, then add a note.');
  assert.equal(result.status, 'completed');
  assert.deepEqual(result.trace.filter(e => e.type === 'tool_start').map(e => e.name), ['add_item', 'complete_item', 'list_items', 'edit_item']);
  const { items } = await registry.execute('list_items', {});
  assert.equal(items[0].completed, true);
  assert.equal(items[0].notes, 'Passed between tool calls');
});

test('invalid JSON, unknown tools and malformed arguments never reach execution', async t => {
  const { registry } = await harness(t);
  const session = scriptedSession(['not json', call('delete_everything', {}), call('add_item', { title: '' }), final('Please provide a title.')]);
  const result = await new AgentLoop({ registry, session }).run('Do something');
  assert.equal(result.status, 'completed');
  assert.equal(result.trace.filter(e => e.type === 'invalid_response').length, 3);
  assert.equal((await registry.execute('list_items', {})).total, 0);
});

test('iteration limit terminates without another model call', async t => {
  const { registry } = await harness(t);
  const inputs = [];
  const session = scriptedSession([call('list_items'), call('list_items')], inputs);
  const result = await new AgentLoop({ registry, session, maxIterations: 2 }).run('Loop forever');
  assert.equal(result.status, 'max_iterations');
  assert.equal(result.iterations, 2);
  assert.equal(inputs.length, 2);
});

test('cancellation after a model reply prevents the requested write', async t => {
  const { registry } = await harness(t);
  const controller = new AbortController();
  const session = scriptedSession([() => { controller.abort(); return call('add_item', { title: 'Must not write' }); }]);
  const result = await new AgentLoop({ registry, session }).run('Add a task', { signal: controller.signal });
  assert.equal(result.status, 'cancelled');
  assert.equal((await registry.execute('list_items', {})).total, 0);
});

test('concurrent runs are rejected; generation abort releases the busy flag', async t => {
  const { registry } = await harness(t);
  const controller = new AbortController();
  const session = { prompt: (_, { signal }) => new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true })) };
  const agent = new AgentLoop({ registry, session });
  const first = agent.run('List tasks', { signal: controller.signal });
  await assert.rejects(agent.run('Second request'), /already in progress/);
  controller.abort();
  assert.equal((await first).status, 'cancelled');
  assert.equal(agent.busy, false);
});

test('model errors terminate with explicit status and preserve earlier committed changes', async t => {
  const { registry } = await harness(t);
  const session = scriptedSession([call('add_item', { title: 'Saved before error' }), () => { throw new Error('GPU unavailable'); }]);
  const result = await new AgentLoop({ registry, session }).run('Add a task');
  assert.equal(result.status, 'model_error');
  assert.match(result.text, /GPU unavailable/);
  assert.equal((await registry.execute('list_items', {})).total, 1);
});

test('availability and creation share options; creation passes the system prompt and progress monitor', async t => {
  const { registry } = await harness(t);
  let availableOptions, createOptions, progress;
  const api = {
    availability: async options => { availableOptions = options; return 'downloadable'; },
    create: async options => { createOptions = options; options.monitor({ addEventListener: (_, cb) => cb({ loaded: 0.5 }) }); return { prompt() {} }; },
  };
  assert.equal(await modelAvailability(api), 'downloadable');
  await createModelSession(registry, { api, onProgress: value => { progress = value; } });
  assert.deepEqual(availableOptions, MODEL_OPTIONS);
  assert.deepEqual(createOptions.expectedInputs, availableOptions.expectedInputs);
  assert.deepEqual(createOptions.expectedOutputs, availableOptions.expectedOutputs);
  assert.match(createOptions.initialPrompts[0].content, /untrusted data/);
  assert.ok(createOptions.initialPrompts[0].content.includes(JSON.stringify(registry.definitions())));
  assert.equal(progress, 0.5);
});

test('tool choice descriptions reach constrained responses and original intent survives a lookup', async t => {
  const { registry } = await harness(t);
  const { item } = await registry.execute('add_item', { title: 'Buy milk' });
  const request = 'I finished buying milk. Mark it done.';
  const session = scriptedSession([
    (_, options) => {
      for (const tool of registry.definitions()) {
        const choice = options.responseConstraint.anyOf.find(branch => branch.properties.name?.const === tool.name);
        assert.equal(choice.description, tool.description);
      }
      return call('search_items', { query: 'milk', status: 'open' });
    },
    input => {
      const observation = JSON.parse(input);
      assert.equal(observation.request, request);
      assert.match(observation.instruction, /complete_item/);
      assert.match(observation.instruction, /untrusted data/);
      return call('complete_item', { id: observation.result.items[0].id, completed: true });
    },
    input => {
      const observation = JSON.parse(input);
      assert.equal(observation.request, request);
      assert.equal(observation.result.item.id, item.id);
      assert.equal(observation.result.item.completed, true);
      assert.match(observation.instruction, /completion status was saved/);
      return final('Marked Buy milk done.');
    },
  ]);
  const result = await new AgentLoop({ registry, session }).run(request);
  assert.equal(result.status, 'completed');
  assert.deepEqual(result.trace.filter(e => e.type === 'tool_start').map(e => e.name), ['search_items', 'complete_item']);
});

test('a completed-list question carries read-only guidance and does not change tasks', async t => {
  const { registry } = await harness(t);
  const { item } = await registry.execute('add_item', { title: 'Already done' });
  await registry.execute('complete_item', { id: item.id });
  await registry.execute('add_item', { title: 'Still open' });
  const before = await registry.execute('list_items', {});
  const session = scriptedSession([
    call('list_items', { status: 'completed' }),
    input => {
      const observation = JSON.parse(input);
      assert.equal(observation.request, 'What have I completed?');
      assert.match(observation.instruction, /do not change tasks/);
      assert.deepEqual(observation.result.items.map(item => item.title), ['Already done']);
      return final('Already done is completed.');
    },
  ]);
  const result = await new AgentLoop({ registry, session }).run('What have I completed?');
  assert.equal(result.status, 'completed');
  assert.deepEqual(await registry.execute('list_items', {}), before);
});

test('ambiguous completion inspects every result page and waits for a choice before writing', async t => {
  const { registry } = await harness(t);
  const read = (await registry.execute('add_item', { title: 'Read book' })).item;
  const write = (await registry.execute('add_item', { title: 'Write book' })).item;
  const before = await registry.execute('list_items', {});
  let candidates = [];
  const session = scriptedSession([
    call('search_items', { query: 'book', status: 'open', limit: 1 }),
    input => {
      const observation = JSON.parse(input);
      assert.equal(observation.request, 'book is done');
      assert.match(observation.instruction, /1 of 2 matches/);
      assert.match(observation.instruction, /More matches remain/);
      candidates.push(...observation.result.items);
      return call('search_items', { query: 'book', status: 'open', limit: 1, offset: observation.result.nextOffset });
    },
    input => {
      const observation = JSON.parse(input);
      candidates.push(...observation.result.items);
      assert.equal(observation.result.nextOffset, null);
      assert.match(observation.instruction, /ask which one and wait/);
      return final(`Which task is done: ${candidates.map(item => `${item.title} (${item.id})`).join(' or ')}?`);
    },
    () => call('complete_item', { id: candidates.find(item => item.title === 'Write book').id, completed: true }),
    final('Marked Write book done.'),
  ]);
  const agent = new AgentLoop({ registry, session });
  const question = await agent.run('book is done');
  assert.equal(question.status, 'completed');
  assert.match(question.text, /Read book/);
  assert.match(question.text, /Write book/);
  assert.deepEqual(question.trace.filter(event => event.type === 'tool_start').map(event => event.name), ['search_items', 'search_items']);
  assert.deepEqual(await registry.execute('list_items', {}), before);
  const selected = await agent.run('Write book');
  assert.equal(selected.status, 'completed');
  assert.deepEqual(selected.trace.filter(event => event.type === 'tool_start').map(event => event.name), ['complete_item']);
  const after = await registry.execute('list_items', {});
  assert.equal(after.total, 2);
  assert.equal(after.items.find(item => item.id === read.id).completed, false);
  assert.equal(after.items.find(item => item.id === write.id).completed, true);
});

test('a completion report with no matching task can clarify without creating a replacement', async t => {
  const { registry } = await harness(t);
  const session = scriptedSession([
    call('search_items', { query: 'book', status: 'open' }),
    input => {
      const observation = JSON.parse(input);
      assert.equal(observation.result.total, 0);
      assert.match(observation.instruction, /Never invent an id or create a replacement task/);
      return final('I could not find a matching book task. Which task did you mean?');
    },
  ]);
  const result = await new AgentLoop({ registry, session }).run('completed book');
  assert.equal(result.status, 'completed');
  assert.equal((await registry.execute('list_items', {})).total, 0);
  assert.deepEqual(result.trace.filter(event => event.type === 'tool_start').map(event => event.name), ['search_items']);
});
