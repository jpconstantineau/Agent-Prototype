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
  await expect(page.locator('.empty h3')).toContainText('fresh start');
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
            if (step === 2) { id = observation.result.item.id; return tool('search_items', { query: 'prototype' }); }
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
  await expect(page.locator('.task-row')).toHaveCount(0);
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
  await page.getByRole('button', { name: '✦ Assistant', exact: true }).click();
  await expect(page.locator('#assistant-panel')).not.toBeVisible();
  await page.getByRole('button', { name: '✦ Assistant', exact: true }).click();
  await expect(page.locator('#assistant-panel')).toBeVisible();
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
