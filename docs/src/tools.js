import { object, validate, ValidationError } from './schema.js';
import { DomainError, failure, abortable } from './runtime.js';
import { TOOL_GUIDANCE } from './tool-guidance.js';

const fields = {
  title: { type: 'string', minLength: 1, maxLength: 200, description: 'Short task title.' },
  notes: { type: 'string', maxLength: 2000, description: 'Task details. Empty clears the notes.' },
  priority: { type: 'string', enum: ['low', 'normal', 'high'] },
  dueDate: { type: 'string', format: 'date', description: 'YYYY-MM-DD in the user’s local calendar, or empty to clear.' },
};
const id = { type: 'integer', minimum: 1, maximum: Number.MAX_SAFE_INTEGER, description: 'Short numeric task ID returned by add_item, list_items, or search_items (for example, 3). Copy the id as a JSON number, not a quoted string or list position. Never invent IDs.' };
const pagination = {
  status: { type: 'string', enum: ['all', 'open', 'completed'], description: 'Filter only; does not change tasks. all = every task (default), open = unfinished/still to do, completed = already done/finished. Use complete_item to change status.' },
  limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Page size. Defaults to 25.' },
  offset: { type: 'integer', minimum: 0, maximum: 1000000, description: 'Defaults to 0. Use nextOffset to continue.' },
};
const receiptId = { type: 'string', minLength: 1, maxLength: 80 };
const itemSchema = object({ id, ...fields, completed: { type: 'boolean' }, createdAt: { type: 'string', minLength: 1, maxLength: 40 }, updatedAt: { type: 'string', minLength: 1, maxLength: 40 },
  completedAt: { anyOf: [{ type: 'null' }, { type: 'string', minLength: 1, maxLength: 40 }] }, stableId: receiptId, revision: { type: 'integer', minimum: 1 }, schemaVersion: { type: 'integer', minimum: 1, maximum: 1 }, tombstone: { type: 'boolean' } },
['id','title','notes','priority','dueDate','completed','createdAt','updatedAt','completedAt']);
const success = { type: 'boolean', const: true };
const mutationResultSchema = object({ success, item: itemSchema, operationReceiptId: receiptId }, ['success','item','operationReceiptId']);
const pageResultSchema = object({ success, items: { type: 'array', minItems: 0, maxItems: 50, items: itemSchema }, total: { type: 'integer', minimum: 0 }, offset: { type: 'integer', minimum: 0 }, nextOffset: { anyOf: [{ type: 'null' }, { type: 'integer', minimum: 0 }] }, truncated: { type: 'boolean' } }, ['success','items','total','offset','nextOffset','truncated']);

export class ToolRegistry {
  constructor(store, { policy, identity } = {}) {
    this.policy = policy;
    this.identity = identity;
    this.tools = [
      { name: 'add_item', description: TOOL_GUIDANCE.add_item.description, inputSchema: object(fields, ['title']), execute: (args, signal, context) => store.add(args, signal, context) },
      { name: 'edit_item', description: TOOL_GUIDANCE.edit_item.description, inputSchema: object({ id, ...fields }, ['id']), execute: ({ id, ...patch }, signal, context) => {
        if (!Object.keys(patch).length) throw new ValidationError('Supply at least one field to edit.');
        return store.update(id, patch, signal, context);
      } },
      { name: 'complete_item', description: TOOL_GUIDANCE.complete_item.description, inputSchema: object({ id, completed: { type: 'boolean', description: 'true = mark done/finished/check off (default); false = reopen/undo completion/mark not done. To view done tasks instead, call list_items with status="completed".' } }, ['id']), execute: ({ id, completed = true }, signal, context) => store.update(id, { completed }, signal, context) },
      { name: 'list_items', description: TOOL_GUIDANCE.list_items.description, inputSchema: object(pagination), readOnly: true, execute: async (args, signal) => capPage(await store.list(args, signal)) },
      { name: 'search_items', description: TOOL_GUIDANCE.search_items.description, inputSchema: object({ query: { type: 'string', minLength: 1, maxLength: 200, description: 'Literal words from the task title or notes, e.g. "milk". Not a full instruction or a status word. Matching ignores case.' }, ...pagination }, ['query']), readOnly: true, execute: async (args, signal) => capPage(await store.list(args, signal)) },
    ];
  }

  definitions() {
    return this.tools.filter(t => this.policy?.allows(t.name) !== false).map(({ name, description, inputSchema }) => ({ name, description, inputSchema }));
  }

  async execute(name, args, { signal, context, actor = 'main_agent' } = {}) {
    signal?.throwIfAborted();
    try {
      const tool = this.tools.find(tool => tool.name === name);
      if (!tool) throw new ValidationError('Unknown tool.');
      this.policy?.check(name, actor);
      validate(tool.inputSchema, args);
      const result = { success: true, ...await tool.execute(args, signal, { ...this.identity, ...context, actor,
        check: () => this.policy?.check(name, actor),
        watch: reject => {
          const listener = () => { try { this.policy?.check(name, actor); } catch (e) { reject(e); } };
          this.policy?.addEventListener('change', listener);
          return () => this.policy?.removeEventListener('change', listener);
        },
      }) };
      signal?.throwIfAborted(); this.validateResult(name, args, result); return result;
    } catch (error) {
      if (signal?.aborted || error.name === 'AbortError') throw error;
      if (error instanceof ValidationError || error instanceof DomainError) return failure(error.code, error.message);
      throw error;
    }
  }

  validateResult(name, args, result) {
    if (!result || typeof result.success !== 'boolean') throw new Error('Unexpected task result. Review saved changes before retrying.');
    if (!result.success) { if (typeof result.error !== 'string' || !result.error.trim() || result.error.length > 500) throw new Error('Invalid tool error.'); return; }
    try {
      validate(['list_items','search_items'].includes(name) ? pageResultSchema : mutationResultSchema, result, 'result');
      if (result.items && result.total < result.items.length) throw new Error('Invalid page totals.');
    } catch { throw new Error('Invalid task result. Review saved changes before continuing.'); }
  }
}

// Keep every returned item intact, but reduce the page to fit local-model context.
// nextOffset reflects items actually returned, so no matches get silently skipped.
function capPage(page) {
  const items = [];
  let size = 200; // envelope overhead
  for (const item of page.items) {
    const length = JSON.stringify(item).length + 1;
    if (items.length && size + length > 12000) break;
    items.push(item); size += length;
  }
  return { ...page, items, truncated: items.length < page.items.length, nextOffset: page.offset + items.length < page.total ? page.offset + items.length : null };
}

// This adapter exposes exactly the same validated dispatcher to external agents.
// document.modelContext is current; navigator.modelContext supports earlier builds.
export async function registerWebMCP(registry, { context = globalThis.document?.modelContext ?? globalThis.navigator?.modelContext } = {}) {
  if (!context?.registerTool) return { mode: 'local', message: 'WebMCP unavailable · page tools active', dispose() {} };
  const registered = [];
  try {
    for (const tool of registry.tools.filter(t => registry.policy?.allows(t.name) !== false)) {
      await context.registerTool({
        name: tool.name, description: tool.description, inputSchema: tool.inputSchema,
        annotations: { readOnlyHint: Boolean(tool.readOnly), untrustedContentHint: true },
        execute: async (args, { signal } = {}) => JSON.stringify(await registry.execute(tool.name, args, { signal, actor: 'external_agent' })),
      });
      registered.push(tool.name);
    }
    let executor = registry;
    if (context.getTools && context.executeTool) {
      const discovered = await context.getTools();
      const owned = registry.tools.filter(t => registered.includes(t.name)).map(tool => {
        const match = discovered.find(candidate => candidate.name === tool.name && (!candidate.window || candidate.window === globalThis.window));
        if (!match) throw new Error(`Registered tool ${tool.name} was not discovered.`);
        return match;
      });
      executor = {
        definitions: () => registry.definitions(),
        execute: async (name, args, { signal } = {}) => {
          signal?.throwIfAborted(); registry.policy?.check(name);
          const definition = registry.tools.find(tool => tool.name === name);
          if (!definition) throw new Error(`Unknown tool: ${name}`);
          validate(definition.inputSchema, args);
          // Never retry a failed native dispatch locally: a mutation might have
          // committed before the browser reported an error.
          const value = await abortable(context.executeTool(owned.find(tool => tool.name === name), args, { signal }), signal);
          const result = typeof value === 'string' ? JSON.parse(value) : value;
          signal?.throwIfAborted(); registry.validateResult(name, args, result);
          if (!result || typeof result.success !== 'boolean') throw new Error('Unexpected WebMCP result. Review your list before retrying.');
          return result;
        },
        validateResult: (...args) => registry.validateResult(...args),
      };
    }
    const revoked = () => {
      for (const name of [...registered]) if (!registry.policy.allows(name)) { context.unregisterTool?.(name); registered.splice(registered.indexOf(name), 1); }
    };
    registry.policy?.addEventListener('change', revoked);
    return {
      mode: 'webmcp', executor, message: `WebMCP connected · ${registered.length} tools${executor === registry ? ' · chat uses page dispatcher' : ''}`,
      dispose: () => { registry.policy?.removeEventListener('change', revoked); for (const name of registered) context.unregisterTool?.(name); },
    };
  } catch (error) {
    for (const name of registered) context.unregisterTool?.(name);
    return { mode: 'local', message: `WebMCP registration failed: ${error.message}. Page tools active.`, dispose() {} };
  }
}
