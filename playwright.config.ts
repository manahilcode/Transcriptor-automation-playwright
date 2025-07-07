import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
<<<<<<< HEAD
    headless: false,
=======
    headless: true,            // Run browser in headless mode
>>>>>>> bf753309328c2e3fe512779bde2437ea80d480ec
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'results.xml' }],
    ['json', { outputFile: 'playwright-report/playwright-report.json' }],
  ],
});
