import { defineConfig } from '@playwright/test';

// Exercise the same project subpath used by GitHub Pages, rather than just '/'.
const basePath = '/Agent-Prototype/';
const baseURL = `http://localhost:5174${basePath}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL,
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
    viewport: { width: 1440, height: 960 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: { args: ['--enable-features=WebMCP'] },
  },
  webServer: {
    command: 'node server.mjs', url: baseURL, reuseExistingServer: !process.env.CI,
    env: { PORT: '5174', BASE_PATH: basePath },
  },
});
