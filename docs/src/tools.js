import { object, validate } from './schema.js';

const fields = {
  title: { type: 'string', minLength: 1, maxLength: 200, description: 'Short task title.' },
  notes: { type: 'string', maxLength: 2000, description: 'Task details. Empty clears the notes.' },
  priority: { type: 'string', enum: ['low', 'normal', 'high'] },
  dueDate: { type: 'string', format: 'date', description: 'YYYY-MM-DD in the user’s local calendar, or empty to clear.' },
};
const id = { type: 'integer', minimum: 1, maximum: Number.MAX_SAFE_INTEGER, description: 'Short numeric task ID returned by add_item, list_items, or search_items (for example, 3). Copy the id as a JSON number, not a quoted string or list position. Never invent IDs.' };
const pagination = {
  status: { type: 'string', enum: ['all', 'open', 'completed'], description: 'Defaults to all.' },
  limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Page size. Defaults to 25.' },
  offset: { type: 'integer', minimum: 0, maximum: 1000000, description: 'Defaults to 0. Use nextOffset to continue.' },
};

export class ToolRegistry {
  constructor(store) {
    this.tools = [
      { name: 'add_item', description: 'Add one new to-do item. Returns the saved item with a short numeric id, which can be passed directly to edit_item or complete_item.', inputSchema: object(fields, ['title']), execute: (args, signal) => store.add(args, signal) },
      { name: 'edit_item', description: 'Edit a known item. Supply its exact ID and only the fields to change. Search first if its ID is unknown. Omitted fields are preserved.', inputSchema: object({ id, ...fields }, ['id']), execute: ({ id, ...patch }, signal) => {
        if (!Object.keys(patch).length) throw new Error('Supply at least one field to edit.');
        return store.update(id, patch, signal);
      } },
      { name: 'complete_item', description: 'Complete a known item, or reopen it with completed=false. Use the numeric id returned by add, list, or search. Search first only if its ID is unknown. Defaults to completed=true.', inputSchema: object({ id, completed: { type: 'boolean' } }, ['id']), execute: ({ id, completed = true }, signal) => store.update(id, { completed }, signal) },
      { name: 'list_items', description: 'List items with optional status and pagination. Results are capped to a 12000-character budget; follow nextOffset until null to see all items. Returns exact IDs and complete item fields.', inputSchema: object(pagination), readOnly: true, execute: async (args, signal) => capPage(await store.list(args, signal)) },
      { name: 'search_items', description: 'Case-insensitive literal substring search across titles and notes. Optional status and pagination. Results are capped to a 12000-character budget; follow nextOffset until null for all matches.', inputSchema: object({ query: { type: 'string', minLength: 1, maxLength: 200 }, ...pagination }, ['query']), readOnly: true, execute: async (args, signal) => capPage(await store.list(args, signal)) },
    ];
  }

  definitions() {
    return this.tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }));
  }

  async execute(name, args, { signal } = {}) {
    signal?.throwIfAborted();
    try {
      const tool = this.tools.find(tool => tool.name === name);
      if (!tool) throw new Error(`Unknown tool: ${name}`);
      validate(tool.inputSchema, args);
      return { success: true, ...await tool.execute(args, signal) };
    } catch (error) {
      if (signal?.aborted || error.name === 'AbortError') throw error;
      return { success: false, error: error.message };
    }
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
    for (const tool of registry.tools) {
      await context.registerTool({
        name: tool.name, description: tool.description, inputSchema: tool.inputSchema,
        annotations: { readOnlyHint: Boolean(tool.readOnly), untrustedContentHint: true },
        execute: async (args, { signal } = {}) => JSON.stringify(await registry.execute(tool.name, args, { signal })),
      });
      registered.push(tool.name);
    }
    let executor = registry;
    if (context.getTools && context.executeTool) {
      const discovered = await context.getTools();
      const owned = registry.tools.map(tool => {
        const match = discovered.find(candidate => candidate.name === tool.name && (!candidate.window || candidate.window === globalThis.window));
        if (!match) throw new Error(`Registered tool ${tool.name} was not discovered.`);
        return match;
      });
      executor = {
        definitions: () => registry.definitions(),
        execute: async (name, args, { signal } = {}) => {
          const definition = registry.tools.find(tool => tool.name === name);
          if (!definition) throw new Error(`Unknown tool: ${name}`);
          validate(definition.inputSchema, args);
          // Never retry a failed native dispatch locally: a mutation might have
          // committed before the browser reported an error.
          const value = await context.executeTool(owned.find(tool => tool.name === name), args, { signal });
          const result = typeof value === 'string' ? JSON.parse(value) : value;
          if (!result || typeof result.success !== 'boolean') throw new Error('Unexpected WebMCP result. Review your list before retrying.');
          return result;
        },
      };
    }
    return {
      mode: 'webmcp', executor, message: `WebMCP connected · ${registered.length} tools${executor === registry ? ' · chat uses page dispatcher' : ''}`,
      dispose: () => { for (const name of registered) context.unregisterTool?.(name); },
    };
  } catch (error) {
    for (const name of registered) context.unregisterTool?.(name);
    return { mode: 'local', message: `WebMCP registration failed: ${error.message}. Page tools active.`, dispose() {} };
  }
}
