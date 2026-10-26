import 'fake-indexeddb/auto';
import { TodoStore } from '../src/store.js';
import { ToolRegistry } from '../src/tools.js';

export async function harness(t) {
  const name = `todo-test-${crypto.randomUUID()}`;
  const store = await TodoStore.open(name, { broadcast: false });
  const registry = new ToolRegistry(store);
  t.after(() => store.close());
  return { name, store, registry };
}

export function scriptedSession(actions, inputs = []) {
  return {
    async prompt(input, options) {
      inputs.push({ input, options });
      if (!actions.length) throw new Error('Unexpected extra model call');
      const next = actions.shift();
      const value = typeof next === 'function' ? await next(input, options) : next;
      return typeof value === 'string' ? value : JSON.stringify(value);
    },
  };
}

export const call = (name, args = {}) => ({ type: 'tool_call', name, arguments: args });
export const final = message => ({ type: 'final', message });
