import { test } from "@playwright/test";
import LoginSteps from "../src/login";
import Home from "../src/home";
import MyTranscription from "../src/mytranscription";
import Transcription from "../src/transcription";
const { BASE_URL } = require("../utils/constants");

test.describe("Full flow", () => {
  test("should perform login, verify home, and use mytranscription", async ({ page }) => {
     test.setTimeout(80000); 

    // go to the site
    await page.goto(BASE_URL);

   
    const loginSteps = new LoginSteps(page);
    await loginSteps.login();

   
    const homepage = new Home(page);
    await homepage.verifytext();
    await homepage.scroll();

   
    const transcription = new MyTranscription(page);
    await transcription.menu();
    await transcription.folder();
    await transcription.bookmark();

    const Transcriptions = new Transcription(page);
    await Transcriptions.transcribe();



  });

}

);
