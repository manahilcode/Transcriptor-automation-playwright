import { Page, BrowserContext, expect, test } from '@playwright/test';
import LoginSteps from '../src/login';
import { popupSelectors } from '../utils/selectors/chrome-selector';
import {
  validateExtensionPath,
  cleanupUserDataDir,
  launchContext,
} from '../utils/extension-utils';

/**********************************************************************
 * Setup Test Environment
 * Description: Validates extension path, cleans user data dir,
 * launches Chrome with extension, logs in, and returns context + page.
 **********************************************************************/
export async function setupTestEnvironment(): Promise<{ context: BrowserContext; page: Page }> {
  console.log("Setting up test environment...");

  await validateExtensionPath();
  cleanupUserDataDir();

  const context = await launchContext();
  const page = await context.newPage();

  page.on('console', (msg) => {
    console.log(` Browser console [${msg.type()}]: ${msg.text()}`);
  });

  page.on('pageerror', (error) => {
    console.error(` Page error: ${error.message}`);
  });

  console.log(" Navigating to app URL...");
  await page.goto('https://transcripter-webapp-v2.vercel.app/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  await expect(page).toHaveURL('https://transcripter-webapp-v2.vercel.app/');
  console.log(" Successfully landed on the app.");

  const loginSteps = new LoginSteps(page);
  await loginSteps.login();

  console.log("Login successful. Environment ready.");
  return { context, page };
}

/**********************************************************************
 * Open and Use Popup
 * Description: Opens the Chrome extension popup and interacts with it.
 **********************************************************************/
export async function openAndUsePopup(context: BrowserContext): Promise<void> {
  const extensionId = 'hpncmacppkomomhljjmldddkmpefankd';
  const popupUrl = `chrome-extension://${extensionId}/src/pages/popup/index.html`;

  console.log(" Opening extension popup...");

  const popupPage = await context.newPage();
  await popupPage.goto(popupUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 10000,
  });

  console.log(` Extension popup opened at ${popupUrl}`);

  console.log(" Filling YouTube link...");
  await popupPage.locator(popupSelectors.input).fill(
    'https://youtu.be/DHjqpvDnNGE?si=tP1wN5wiQ0AXht-x'
  );

  console.log("Clicking the logo button to start processing...");
  await popupPage.locator(popupSelectors.logoButton).click();

  await popupPage.waitForTimeout(5000);
  console.log('Popup interaction completed.');
}
