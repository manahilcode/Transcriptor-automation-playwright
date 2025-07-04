# Test info

- Name: Full flow >> should perform login, verify home, and use mytranscription
- Location: C:\Users\TECHNIFI\Desktop\Transcriptor\tests\main.spec.ts:9:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://transcripter-webapp-v2.vercel.app/", waiting until "load"

    at C:\Users\TECHNIFI\Desktop\Transcriptor\tests\main.spec.ts:13:16
```

# Test source

```ts
   1 | import { test } from "@playwright/test";
   2 | import LoginSteps from "../src/login";
   3 | import Home from "../src/home";
   4 | import MyTranscription from "../src/mytranscription";
   5 | import Transcription from "../src/transcription";
   6 | const { BASE_URL } = require("../utils/constants");
   7 |
   8 | test.describe("Full flow", () => {
   9 |   test("should perform login, verify home, and use mytranscription", async ({ page }) => {
  10 |      test.setTimeout(80000); 
  11 |
  12 |     // go to the site
> 13 |     await page.goto(BASE_URL);
     |                ^ Error: page.goto: Target page, context or browser has been closed
  14 |
  15 |    
  16 |     const loginSteps = new LoginSteps(page);
  17 |     await loginSteps.login();
  18 |
  19 |    
  20 |     const homepage = new Home(page);
  21 |     await homepage.verifytext();
  22 |     await homepage.scroll();
  23 |
  24 |    
  25 |     const transcription = new MyTranscription(page);
  26 |     await transcription.menu();
  27 |     await transcription.folder();
  28 |     await transcription.bookmark();
  29 |
  30 |     const Transcriptions = new Transcription(page);
  31 |     await Transcriptions.transcribe();
  32 |
  33 |
  34 |
  35 |   });
  36 | });
  37 |
```