import { test } from "@playwright/test";
import percySnapshot from '@percy/playwright'; // 👈 Percy import
import LoginSteps from "../src/login";
import Home from "../src/home";
import MyTranscription from "../src/mytranscription";
import Transcription from "../src/transcription";
import { setupTestEnvironment, openAndUsePopup } from "../src/extension";

const { BASE_URL } = require("../utils/constants");

test.describe("Full Flow Suite", () => {
  test.setTimeout(80000);

  test("TC01 - Launch Chrome extension and use popup", async () => {
    const { context } = await setupTestEnvironment();

    try {
      await openAndUsePopup(context);
    } finally {
      await context.close();
    }
  });

  test.only("TC02 - Verify Home Page", async ({ page }) => {
    await page.goto(BASE_URL);
    const loginSteps = new LoginSteps(page);
    await loginSteps.login();

    const homepage = new Home(page);
    await homepage.verifytext();
    await homepage.scroll();

    await percySnapshot(page, 'TC02 - Home Page'); // 👈 Percy snapshot
  });

  test("TC03 - Use My Transcription Page", async ({ page }) => {
    await page.goto(BASE_URL);
    const loginSteps = new LoginSteps(page);
    await loginSteps.login();

    const transcriptionPage = new MyTranscription(page);
    await transcriptionPage.menu();
    await transcriptionPage.folder();
    await transcriptionPage.bookmark();

    await percySnapshot(page, 'TC03 - My Transcription Page'); // 👈 Percy snapshot
  });

  test("TC04 - Use Transcription Feature", async ({ page }) => {
    await page.goto(BASE_URL);
    const loginSteps = new LoginSteps(page);
    await loginSteps.login();

    const transcription = new Transcription(page);
    await transcription.transcribe();

    await percySnapshot(page, 'TC04 - Transcription Page'); // 👈 Percy snapshot
  });
});
