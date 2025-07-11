import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // Location of your test files
     
  retries: 1,          // Retry on failure
  use: {
    
    headless:true,            // Run browser in headless mode
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/playwright-report.json' }],
    ['junit', { outputFile: 'results.xml' }],
  ],
});
