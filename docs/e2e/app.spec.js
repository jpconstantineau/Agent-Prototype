import { test, expect } from '@playwright/test';

async function addTask(page, title, notes = '') {
  await page.getByRole('button', { name: 'New task', exact: true }).click();
  await page.getByRole('textbox', { name: 'Task title', exact: true }).fill(title);
  if (notes) await page.locator('#item-notes').fill(notes);
  await page.getByRole('button', { name: 'Add task', exact: true }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('.task-title').filter({ hasText: title })).toBeVisible();
}

test('manual add, edit, complete, reopen, search, reload and safe text rendering', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('.empty h3')).toHaveText('Start with one task');
  await addTask(page, 'Plan the week', 'Make room for the important things.');
  await page.getByRole('button', { name: 'Edit Plan the week', exact: true }).click();
  await page.locator('#item-title').fill('Plan a calmer week');
  await page.locator('#item-priority').selectOption('high');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.locator('.task-title')).toHaveText('Plan a calmer week');
  await expect(page.locator('.priority.high')).toHaveText('High priority');
  await page.getByRole('checkbox', { name: 'Complete Plan a calmer week', exact: true }).click();
  await expect(page.locator('#done-count')).toHaveText('1');
  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Reopen Plan a calmer week', exact: true })).toBeChecked();
  await page.getByRole('checkbox', { name: 'Reopen Plan a calmer week', exact: true }).click();
  await expect(page.locator('#open-count')).toHaveText('1');
  await page.screenshot({ path: '.tmp/daylist-desktop.png', fullPage: true });
  await addTask(page, '<img src=x onerror=alert(1)>', 'Plain text, never HTML.');
  await expect(page.locator('#task-list img')).toHaveCount(0);
  await page.getByRole('searchbox', { name: 'Search tasks' }).fill('IMPORTANT');
  await expect(page.locator('.task-row')).toHaveCount(1);
  await expect(page.locator('.task-title')).toHaveText('Plan a calmer week');
  await page.getByRole('searchbox', { name: 'Search tasks' }).fill('not found');
  await expect(page.locator('.empty h3')).toBeVisible();
  expect(errors).toEqual([]);
});

test('chat performs multiple tool steps through WebMCP and updates the visible list', async ({ page }) => {
  await page.addInitScript(() => {
    const tools = new Map();
    window.testNativeCalls = [];
    Object.defineProperty(document, 'modelContext', { configurable: true, value: {
      registerTool: tool => tools.set(tool.name, tool),
      unregisterTool: name => tools.delete(name),
      getTools: async () => [...tools.values()],
      executeTool: async (tool, args, options) => {
        window.testNativeCalls.push(tool.name);
        return tool.execute(args, options);
      },
    } });
    Object.defineProperty(window, 'LanguageModel', { configurable: true, value: {
      availability: async () => 'available',
      create: async () => {
        let step = 0, id;
        return {
          destroy() {}, addEventListener() {},
          async prompt(input, options) {
            if (!options.responseConstraint) throw new Error('Missing schema');
            const observation = JSON.parse(input);
            const tool = (name, args) => JSON.stringify({ type: 'tool_call', name, arguments: args });
            step++;
            if (step === 1) return tool('add_item', { title: 'Review the browser prototype', notes: 'Check the agent loop and tools.', priority: 'high' });
            if (step === 2) {
              id = observation.result.item.id;
              if (id !== 1) throw new Error('Expected a short numeric task ID');
              return tool('search_items', { query: 'prototype' });
            }
            if (step === 3) {
              if (observation.result.items[0].id !== id) throw new Error('Wrong search result');
              return tool('edit_item', { id, title: 'Review the Chrome prototype' });
            }
            if (step === 4) return tool('complete_item', { id });
            return JSON.stringify({ type: 'final', message: 'Added, updated, and completed “Review the Chrome prototype”.' });
          },
        };
      },
    } });
  });
  await page.goto('./');
  await page.getByRole('button', { name: 'Enable local AI', exact: true }).click();
  await expect(page.locator('#ai-status')).toHaveText('Local AI ready');
  await page.getByRole('textbox', { name: 'Message the assistant' }).fill('Add the prototype review, rename it to Chrome prototype, and complete it.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.assistant-message')).toContainText('Added, updated, and completed');
  await expect(page.locator('.task-title')).toHaveText('Review the Chrome prototype');
  await expect(page.locator('.task-check')).toBeChecked();
  await expect(page.locator('.tool-trace')).toHaveCount(4);
  expect(await page.evaluate(() => window.testNativeCalls)).toEqual(['add_item', 'search_items', 'edit_item', 'complete_item']);
  await page.reload();
  await expect(page.locator('.task-title')).toHaveText('Review the Chrome prototype');
});

test('missing browser APIs show an honest unavailable state and retain manual task management', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'LanguageModel', { configurable: true, value: undefined });
    Object.defineProperty(document, 'modelContext', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'modelContext', { configurable: true, value: undefined });
  });
  await page.goto('./');
  await expect(page.locator('#enable-ai')).toBeDisabled();
  await expect(page.locator('#ai-status')).toHaveText('Local AI unavailable');
  await expect(page.locator('#chat-form')).not.toBeVisible();
  await expect(page.locator('#messages')).not.toBeVisible();
  await page.getByText('Browser connection & setup', { exact: true }).click();
  await expect(page.locator('#webmcp-status')).toContainText('WebMCP unavailable');
  await addTask(page, 'Works without AI');
});

test('stop cancels pending generation and allows a clean new session', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'LanguageModel', { configurable: true, value: {
    availability: async () => 'available',
    create: async () => ({ destroy() {}, prompt: (_, { signal }) => new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true })) }),
  } }));
  await page.goto('./');
  await page.getByRole('button', { name: 'Enable local AI', exact: true }).click();
  await page.getByRole('textbox', { name: 'Message the assistant' }).fill('Add a task');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await page.getByRole('button', { name: 'Stop', exact: true }).click();
  await expect(page.locator('.assistant-message')).toContainText('Stopped.');
  await expect(page.locator('#enable-ai')).toBeVisible();
  await expect(page.locator('#enable-ai')).toBeEnabled();
  await expect(page.locator('#chat-input')).toBeDisabled();
  await expect(page.locator('.task-row')).toHaveCount(0);
});

test('filters, search recovery, and new tasks keep the current list understandable', async ({ page }) => {
  await page.goto('./');
  await addTask(page, 'Prepare the project brief', 'Outline the scope and key decisions.');
  await addTask(page, 'Send the meeting notes');
  await page.getByRole('checkbox', { name: 'Complete Send the meeting notes', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Reopen Send the meeting notes', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'To do 1', exact: true }).click();
  await expect(page.locator('.task-title')).toHaveText('Prepare the project brief');
  await expect(page.locator('[data-filter="open"]')).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('searchbox').fill('missing');
  await expect(page.locator('#search-summary')).toHaveText('0 matches for “missing” in to do');
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await expect(page.getByRole('searchbox')).toBeFocused();
  await expect(page.locator('.task-title')).toHaveText('Prepare the project brief');
  await expect(page.locator('#search-summary')).not.toBeVisible();
  await page.getByRole('button', { name: 'Completed 1', exact: true }).click();
  await page.getByRole('searchbox').fill('missing');
  await addTask(page, 'A task created from a filtered view');
  await expect(page.locator('[data-filter="all"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await expect(page.locator('#total-count')).toHaveText('3');
  await expect(page.locator('.priority.normal')).toHaveCount(0);
  await page.getByRole('checkbox', { name: 'Complete Prepare the project brief', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Reopen Prepare the project brief', exact: true })).toBeChecked();
  await page.getByRole('checkbox', { name: 'Complete A task created from a filtered view', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Reopen A task created from a filtered view', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'To do 0', exact: true }).click();
  await expect(page.locator('.empty h3')).toHaveText('You’re all caught up');
  await page.getByRole('button', { name: 'View all tasks', exact: true }).click();
  await expect(page.locator('.task-row')).toHaveCount(3);
});

test('assistant examples, editor, and layout work across screen sizes', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'LanguageModel', { configurable: true, value: {
    availability: async () => 'available',
    create: async () => ({ destroy() {}, prompt: async () => JSON.stringify({ type: 'final', message: 'Your list is ready.' }) }),
  } }));
  await page.goto('./');
  await expect(page.locator('#chat-input')).toBeDisabled();
  await page.getByRole('button', { name: 'Enable local AI', exact: true }).click();
  await expect(page.locator('#chat-input')).toBeFocused();
  await page.getByRole('button', { name: 'Show my unfinished tasks', exact: true }).click();
  await expect(page.locator('#chat-input')).toHaveValue('What tasks are still open?');
  await page.locator('#chat-input').fill('');
  await expect(page.getByRole('button', { name: 'Send message' })).toBeDisabled();
  for (const [title, notes] of [
    ['Send the project update', 'Share decisions and next steps with the team.'],
    ['Review the first design draft', 'Check the task flow on desktop and mobile.'],
    ['Plan the week', 'Make time for the important things.'],
  ]) await addTask(page, title, notes);
  await page.getByRole('checkbox', { name: 'Complete Send the project update', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Reopen Send the project update', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'Edit Review the first design draft' }).click();
  await page.locator('#item-priority').selectOption('high');
  await page.locator('#item-date').fill('2027-01-15');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.locator('.priority.high')).toHaveText('High priority');
  await page.getByRole('button', { name: 'New task', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'New task' })).toBeVisible();
  await page.screenshot({ path: '.tmp/daylist-editor.png', fullPage: true });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'New task', exact: true })).toBeFocused();
  await page.reload();
  await page.getByRole('button', { name: 'Enable local AI', exact: true }).click();
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 960 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('#assistant-panel')).toBeVisible();
    await page.screenshot({ path: `.tmp/daylist-${width}.png`, fullPage: true });
  }
  await page.getByText('Browser connection & setup', { exact: true }).click();
  await expect(page.locator('#webmcp-status')).toBeVisible();
  await page.getByRole('button', { name: 'Close assistant' }).click();
  await expect(page.locator('#toggle-assistant')).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('storage failures never claim that tasks are saved', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'indexedDB', { configurable: true, value: {
    open() { throw new Error('Storage disabled for this test'); },
  } }));
  await page.goto('./');
  await expect(page.locator('#storage-status')).toHaveText('Task storage unavailable');
  await expect(page.locator('.empty h3')).toHaveText('Task storage is unavailable');
  await expect(page.getByRole('button', { name: 'New task', exact: true })).toBeDisabled();
  await expect(page.locator('#task-list')).toHaveAttribute('aria-busy', 'false');
});

test('another tab sees committed writes through BroadcastChannel', async ({ page, context }) => {
  await page.goto('./');
  await expect(page.locator('.empty h3')).toBeVisible();
  const other = await context.newPage();
  await other.goto('./');
  await expect(other.locator('.empty h3')).toBeVisible();
  await addTask(page, 'Synced between tabs');
  await expect(other.locator('.task-title')).toHaveText('Synced between tabs');
});

test('mobile layout keeps the task editor and assistant usable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await addTask(page, 'A task on a small screen');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('#assistant-panel')).not.toBeVisible();
  await page.getByRole('button', { name: 'Assistant', exact: true }).click();
  await expect(page.locator('#assistant-panel')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close assistant' })).toBeFocused();
  await page.getByRole('button', { name: 'Close assistant' }).click();
  await expect(page.locator('#assistant-panel')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Assistant', exact: true })).toBeFocused();
  await page.screenshot({ path: '.tmp/daylist-mobile.png', fullPage: true });
});

test('native WebMCP registers tools on the installed Chrome when enabled', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.empty h3')).toBeVisible();
  const capabilities = await page.evaluate(() => {
    const ctx = document.modelContext ?? navigator.modelContext;
    return { registration: Boolean(ctx?.registerTool), discovery: Boolean(ctx?.getTools), execution: Boolean(ctx?.executeTool) };
  });
  test.skip(!capabilities.registration, 'This installed Chrome does not expose native WebMCP. Adapter covered with contract mocks.');
  await page.getByText('Browser connection & setup', { exact: true }).click();
  await expect(page.locator('#webmcp-status')).toContainText('WebMCP connected · 5 tools');
  if (capabilities.discovery && capabilities.execution) {
    const outcome = await page.evaluate(async () => {
      const ctx = document.modelContext ?? navigator.modelContext;
      const tools = await ctx.getTools();
      const tool = tools.find(tool => tool.name === 'add_item');
      return ctx.executeTool(tool, { title: 'Created through native WebMCP' });
    });
    expect(JSON.parse(outcome).success).toBe(true);
    await expect(page.locator('.task-title')).toHaveText('Created through native WebMCP');
  }
});

test('existing UUID tasks migrate in Chrome and the assistant completes a listed numeric ID', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'LanguageModel', { configurable: true, value: {
    availability: async () => 'available',
    create: async () => {
      let step = 0;
      return {
        destroy() {},
        async prompt(input) {
          step++;
          if (step === 1) return JSON.stringify({ type: 'tool_call', name: 'list_items', arguments: {} });
          if (step === 2) {
            const item = JSON.parse(input).result.items.find(item => item.title === 'Legacy open task');
            if (item.id !== 2) throw new Error('The migrated ID must be the number 2');
            return JSON.stringify({ type: 'tool_call', name: 'complete_item', arguments: { id: item.id } });
          }
          if (!JSON.parse(input).result.item.completed) throw new Error('Completion was not saved');
          return JSON.stringify({ type: 'final', message: 'Completed the legacy open task.' });
        },
      };
    },
  } }));
  // Seed the previous schema before allowing the application module to open it.
  await page.route('**/src/app.js', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.goto('./');
  const stamp = '2026-10-26T12:00:00.000Z';
  const legacy = [
    { id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', title: 'Legacy completed task', notes: 'Preserve notes and dates', priority: 'high', dueDate: '2027-01-15', completed: true, createdAt: stamp, updatedAt: stamp, completedAt: stamp },
    { id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', title: 'Legacy open task', notes: '', priority: 'normal', dueDate: '', completed: false, createdAt: stamp, updatedAt: stamp, completedAt: null },
  ];
  await page.evaluate(items => new Promise((resolve, reject) => {
    const request = indexedDB.open('chrome-todo-agent', 1);
    request.onupgradeneeded = () => {
      const store = request.result.createObjectStore('items', { keyPath: 'id' });
      store.createIndex('createdAt', 'createdAt');
      items.forEach(item => store.add(item));
    };
    request.onsuccess = () => { request.result.close(); resolve(); };
    request.onerror = () => reject(request.error);
  }), legacy);
  await page.unroute('**/src/app.js');
  await page.reload();
  await expect(page.locator('.task-row')).toHaveCount(2);
  const migrated = await page.evaluate(async () => {
    const { TodoStore } = await import('./src/store.js');
    const store = await TodoStore.open();
    try { return { version: store.db.version, items: (await store.list()).items }; }
    finally { store.close(); }
  });
  expect(migrated).toEqual({ version: 2, items: legacy.map((item, i) => ({ ...item, id: i + 1 })) });
  await page.getByRole('button', { name: 'Enable local AI', exact: true }).click();
  await page.getByRole('textbox', { name: 'Message the assistant' }).fill('Complete the legacy open task.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.assistant-message')).toContainText('Completed the legacy open task.');
  await expect(page.getByRole('checkbox', { name: 'Reopen Legacy open task', exact: true })).toBeChecked();
  await addTask(page, 'First task after migration');
  await expect(page.locator('.task-row[data-id="3"] .task-title')).toHaveText('First task after migration');
  await page.reload();
  await expect(page.locator('.task-row[data-id="2"] .task-check')).toBeChecked();
  await expect(page.locator('.task-row[data-id="3"] .task-title')).toHaveText('First task after migration');
});

test('bare task text, list questions, and completion commands work across chat turns', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'LanguageModel', { configurable: true, value: {
    availability: async () => 'available',
    create: async options => {
      window.testSystemPrompt = options.initialPrompts[0].content;
      let step = 0;
      return {
        destroy() {},
        async prompt(input, options) {
          const observation = JSON.parse(input);
          const tool = (name, args) => JSON.stringify({ type: 'tool_call', name, arguments: args });
          const final = message => JSON.stringify({ type: 'final', message });
          step++;
          if (step === 1) {
            if (observation.request !== 'Review the quarterly report') throw new Error('Wrong bare prompt');
            return tool('add_item', { title: observation.request });
          }
          if (step === 2) return final('Added Review the quarterly report.');
          if (step === 3) {
            const choice = options.responseConstraint.anyOf.find(branch => branch.properties.name?.const === 'list_items');
            if (!choice.description.includes('what is left?')) throw new Error('Missing list selection guidance');
            return tool('list_items', { status: 'open' });
          }
          if (step === 4) {
            if (observation.request !== 'What is left?') throw new Error('Lost list intent');
            return final(`Still to do: ${observation.result.items[0].title}.`);
          }
          if (step === 5) return tool('search_items', { query: 'quarterly report', status: 'open' });
          if (step === 6) {
            if (observation.request !== 'I finished the quarterly report. Mark it done.') throw new Error('Lost completion intent');
            if (!observation.instruction.includes('complete_item')) throw new Error('Missing lookup continuation hint');
            return tool('complete_item', { id: observation.result.items[0].id, completed: true });
          }
          if (step === 7 && observation.result.item.completed) return final('Marked Review the quarterly report done.');
          throw new Error('Unexpected tool flow');
        },
      };
    },
  } }));
  await page.goto('./');
  await page.getByRole('button', { name: 'Enable local AI', exact: true }).click();
  expect(await page.evaluate(() => window.testSystemPrompt)).toContain('Treat a user\'s bare prompt as a request to add a task');
  const input = page.getByRole('textbox', { name: 'Message the assistant' });
  await input.fill('Review the quarterly report');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.task-title')).toHaveText('Review the quarterly report');
  await expect(page.locator('.assistant-message').last()).toHaveText('DAYLISTAdded Review the quarterly report.');
  await input.fill('What is left?');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.assistant-message').last()).toContainText('Still to do: Review the quarterly report.');
  await expect(page.locator('.task-check')).not.toBeChecked();
  await input.fill('I finished the quarterly report. Mark it done.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.assistant-message').last()).toContainText('Marked Review the quarterly report done.');
  await expect(page.locator('.task-check')).toBeChecked();
  await expect(page.locator('.task-row')).toHaveCount(1);
  await expect(page.locator('.tool-trace')).toHaveCount(4);
});

test('finish book adds a task and an ambiguous done report waits for a selection', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'LanguageModel', { configurable: true, value: {
    availability: async () => 'available',
    create: async options => {
      window.testIntentPrompt = options.initialPrompts[0].content;
      let step = 0, selectedId;
      return {
        destroy() {},
        async prompt(input) {
          const observation = JSON.parse(input);
          const tool = (name, args) => JSON.stringify({ type: 'tool_call', name, arguments: args });
          const final = message => JSON.stringify({ type: 'final', message });
          step++;
          if (step === 1) return tool('add_item', { title: observation.request });
          if (step === 2) return final('Added finish book.');
          if (step === 3) return tool('search_items', { query: 'book', status: 'open' });
          if (step === 4) {
            if (observation.result.total !== 2 || !observation.instruction.includes('ask which one and wait')) throw new Error('Missing ambiguity guidance');
            selectedId = observation.result.items.find(item => item.title === 'finish book').id;
            return final('Which task is done: finish book or Read book?');
          }
          if (step === 5) return tool('complete_item', { id: selectedId, completed: true });
          if (step === 6 && observation.result.item.completed) return final('Marked finish book done.');
          throw new Error('Unexpected completion flow');
        },
      };
    },
  } }));
  await page.goto('./');
  await page.getByRole('button', { name: 'Enable local AI', exact: true }).click();
  expect(await page.evaluate(() => window.testIntentPrompt)).toContain('Tense is a clue, not a keyword-only rule');
  const input = page.getByRole('textbox', { name: 'Message the assistant' });
  const send = page.getByRole('button', { name: 'Send message', exact: true });
  await input.fill('finish book');
  await send.click();
  await expect(page.locator('.assistant-message').last()).toContainText('Added finish book.');
  await expect(page.locator('.task-title')).toHaveText('finish book');
  await expect(page.locator('.task-check')).not.toBeChecked();
  await addTask(page, 'Read book');
  await input.fill('book is done');
  await send.click();
  await expect(page.locator('.assistant-message').last()).toContainText('Which task is done: finish book or Read book?');
  await expect(page.locator('.task-check:checked')).toHaveCount(0);
  await input.fill('finish book');
  await send.click();
  await expect(page.locator('.assistant-message').last()).toContainText('Marked finish book done.');
  await expect(page.getByRole('checkbox', { name: 'Reopen finish book', exact: true })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Complete Read book', exact: true })).not.toBeChecked();
  await expect(page.locator('.task-row')).toHaveCount(2);
});
