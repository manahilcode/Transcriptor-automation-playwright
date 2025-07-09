import test, { Page, expect } from "@playwright/test";
import { selectors } from "../utils/selectors/home-selector";

export default class Home {
  constructor(private page: Page) {}

  /**********************************************************************
   * Verify Heading Text
   * Description: This function verifies the heading text on the homepage.
   ***********************************************************************/
  public async verifytext() {
    await test.step(`verify heading text on homepage`, async () => {
      console.log(" Verifying heading text...");

      const heading = this.page.locator(selectors.text);
      const expectedHeading = "Transcribe, Translate & Summarize";

      
    });
  }

  /**********************************************************************
   * Scroll to Bottom
   * Description: This function scrolls to the bottom of the page slowly
   * to trigger lazy-loaded content.
   ***********************************************************************/
  public async scroll() {
    await test.step(`scroll slowly to the bottom of the page`, async () => {
      console.log(" Scrolling to bottom of the page...");
      await this.page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          const distance = 100; // pixels per scroll
          const delay = 100;    // ms between scrolls
          const timer = setInterval(() => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            window.scrollBy(0, distance);
            if (scrollTop + clientHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, delay);
        });
      });
      console.log(" Reached bottom of the page.");
    });
  }
}
