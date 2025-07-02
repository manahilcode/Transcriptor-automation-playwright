import { test } from "@playwright/test";
import LoginSteps from "../src/login";
import Home from "../src/home";
import MyTranscription from "../src/mytranscription";
const { BASE_URL } = require("../utils/constants");

test.describe("Full flow", () => {
  test("should perform login, verify home, and use mytranscription", async ({ page }) => {
    // go to the site
    await page.goto(BASE_URL);

    // Login
    const loginSteps = new LoginSteps(page);
    await loginSteps.login();

    // Home page verification
    const homepage = new Home(page);
    await homepage.verifytext();
    await homepage.scroll();

    // My transcription
    const transcription = new MyTranscription(page);
    await transcription.menu();
    await transcription.folder();
    await transcription.bookmark();
  });
});
