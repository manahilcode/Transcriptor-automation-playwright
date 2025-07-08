import { test, expect, Page } from '@playwright/test';
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import LoginSteps from '../src/login';
import { popupSelectors } from '../utils/selectors/chrome-selector';
import {
  extensionPath,
  userDataDir,
  validateExtensionPath,
  cleanupUserDataDir,
  launchContext,
} from '../utils/extension-utils';

test('launch Chrome extension and open popup UI', async () => {
  await validateExtensionPath();
  cleanupUserDataDir();

  const context = await launchContext();

  try {
    // normal test page
    const page = await context.newPage();

    page.on('console', (msg) => {
      console.log(`Browser console [${msg.type()}]: ${msg.text()}`);
    });

    page.on('pageerror', (error) => {
      console.error(`Page error: ${error.message}`);
    });

    await page.goto('https://transcripter-webapp-v2.vercel.app/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    await expect(page).toHaveURL('https://transcripter-webapp-v2.vercel.app/');

    const loginSteps = new LoginSteps(page);
    await loginSteps.login();

    // extension background
    const backgroundPages = context.backgroundPages();
    const extensionPage = backgroundPages.find((bgPage) =>
      bgPage.url().includes('chrome-extension://')
    );
    if (!extensionPage) {
      console.warn('No extension background page found (Manifest V3 service worker).');
    } else {
      console.log(`Extension background page loaded: ${extensionPage.url()}`);
    }

    console.log('✅ Extension loaded, opening popup UI...');

    // open popup directly
    const extensionId = 'hpncmacppkomomhljjmldddkmpefankd';
    const popupUrl = `chrome-extension://${extensionId}/src/pages/popup/index.html`;

    const popupPage = await context.newPage();
    await popupPage.goto(popupUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

    console.log(`✅ Extension popup opened at ${popupUrl}`);

    // interact with the popup
    await popupPage.locator(popupSelectors.input).fill(
      'https://youtu.be/DHjqpvDnNGE?si=tP1wN5wiQ0AXht-x'
    );
      await popupPage.locator(popupSelectors.logoButton).click();
    await popupPage.waitForTimeout(5000); 

    console.log(' Interactions with popup completed');

  } catch (error) {
    console.error(' Test failed:', error);
    throw error;
  } finally {
    await context.close();
  }  
});
