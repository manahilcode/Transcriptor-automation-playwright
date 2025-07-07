// import { test, expect, Page } from '@playwright/test';
// import { chromium } from 'playwright';
// import path from 'path';
// import fs from 'fs';
// import LoginSteps from '../src/login';

// test('launch Chrome extension and open popup UI', async () => {
//   const extensionPath = path.resolve(
//     'C:/Users/TECHNIFI/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/hpncmacppkomomhljjmldddkmpefankd/1.0.1_0'
//   );
//   const userDataDir = path.resolve('tmp-user-data-dir');

//   // Validate manifest
//   if (!fs.existsSync(path.join(extensionPath, 'manifest.json'))) {
//     throw new Error(`Extension manifest not found at: ${extensionPath}`);
//   }

//   if (!fs.existsSync(extensionPath)) {
//     throw new Error(`Extension path does not exist: ${extensionPath}`);
//   }

//   if (fs.existsSync(userDataDir)) {
//     fs.rmSync(userDataDir, { recursive: true, force: true });
//   }

//   // Launch Chrome with the extension
//   const context = await chromium.launchPersistentContext(userDataDir, {
//     headless: false,
//     args: [
//       `--disable-extensions-except=${extensionPath}`,
//       `--load-extension=${extensionPath}`,
//     ],
//     executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // adjust if needed
//   });

//   try {
//     // normal test page
//     const page = await context.newPage();

//     page.on('console', (msg) => {
//       console.log(`Browser console [${msg.type()}]: ${msg.text()}`);
//     });

//     page.on('pageerror', (error) => {
//       console.error(`Page error: ${error.message}`);
//     });

//     await page.goto('https://transcripter-webapp-v2.vercel.app/', {
//       waitUntil: 'domcontentloaded',
//       timeout: 30000,
//     });

//     await expect(page).toHaveURL('https://transcripter-webapp-v2.vercel.app/');

//     const loginSteps = new LoginSteps(page);
//     await loginSteps.login();

//     // extension background
//     const backgroundPages = context.backgroundPages();
//     const extensionPage = backgroundPages.find((bgPage) =>
//       bgPage.url().includes('chrome-extension://')
//     );
//     if (!extensionPage) {
//       console.warn('No extension background page found (Manifest V3 service worker).');
//     } else {
//       console.log(`Extension background page loaded: ${extensionPage.url()}`);
//     }

//     console.log('✅ Extension loaded, opening popup UI...');

//     // open popup directly
//     const extensionId = 'hpncmacppkomomhljjmldddkmpefankd';
//     const popupUrl = `chrome-extension://${extensionId}/src/pages/popup/index.html`;

//     const popupPage = await context.newPage();
//     await popupPage.goto(popupUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

//     console.log(`✅ Extension popup opened at ${popupUrl}`);

//     // interact with the popup
//     await popupPage.locator('//div//input[@type="text"]').fill(
//       'https://youtu.be/DHjqpvDnNGE?si=tP1wN5wiQ0AXht-x'
//     );
//     await popupPage.locator('//img[@alt="Sound Scribe logo"]').click();
//     await popupPage.waitForTimeout(5000); 

//     console.log(' Interactions with popup completed');

//   } catch (error) {
//     console.error(' Test failed:', error);
//     throw error;
//   } finally {
//     await context.close();
//   }
// });
