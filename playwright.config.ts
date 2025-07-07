import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // Location of your test files
  //timeout: 30000,      // Max time for each test
  retries: 1,          // Retry on failure
  use: {
    headless: true,            // Run browser in headless mode
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
