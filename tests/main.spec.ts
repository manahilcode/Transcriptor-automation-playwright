import { test } from "@playwright/test";
import LoginSteps from "../src/login";
import Home from "../src/home";
import MyTranscription from "../src/mytranscription";
import Transcription from "../src/transcription";
const { BASE_URL } = require("../utils/constants");

test.describe("Full Flow Suite", () => {
  test.beforeEach(async ({ page }) => {
     test.setTimeout(80000); 
    await page.goto(BASE_URL);
    const loginSteps = new LoginSteps(page);
    await loginSteps.login();
  });

  test.only("TC01 - Verify Home Page", async ({ page }) => {
    const homepage = new Home(page);
    await homepage.verifytext();
    await homepage.scroll();
  });

  test("TC02 - Use My Transcription Page", async ({ page }) => {
    const transcriptionPage = new MyTranscription(page);
    await transcriptionPage.menu();
    await transcriptionPage.folder();
    await transcriptionPage.bookmark();
  });

  test("TC03 - Use Transcription Feature", async ({ page }) => {
    const transcription = new Transcription(page);
    await transcription.transcribe();
  });
});
