// utils/extension-utils.ts
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

export const extensionPath = path.resolve(
  'C:/Users/TECHNIFI/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/hpncmacppkomomhljjmldddkmpefankd/1.0.1_0'
);
export const userDataDir = path.resolve('tmp-user-data-dir');

export async function validateExtensionPath() {
  if (!fs.existsSync(path.join(extensionPath, 'manifest.json'))) {
    throw new Error(`Extension manifest not found at: ${extensionPath}`);
  }

  if (!fs.existsSync(extensionPath)) {
    throw new Error(`Extension path does not exist: ${extensionPath}`);
  }
}

export function cleanupUserDataDir() {
  if (fs.existsSync(userDataDir)) {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }
}

export async function launchContext() {
  return await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
}
