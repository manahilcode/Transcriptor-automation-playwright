import test, { Page, expect } from "@playwright/test";
import { selectors } from "../utils/selectors/home-selector";

export default class Home {
  constructor(private page: Page) {}

  /**********************************************************************
   * Verify Heading Text
   * Description: This function will verify the heading text of the
   * homepage matches the expected value.
   ***********************************************************************/
  public async verifytext() {
    const heading = this.page.locator(selectors.text);
    const expectedHeading = "Transcribe, Translate & Summarize";
    
  }

  /**********************************************************************
   * Scroll to Bottom
   * Description: This function will scroll slowly to the bottom of the page
   * to trigger any lazy-loaded content.
   ***********************************************************************/
  public async scroll() {
    await test.step(`scroll slowly to the bottom of the page`, async () => {
      await this.page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          const distance = 100; // pixels to scroll each time
          const delay = 100;    // milliseconds between scrolls
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
    });
  }
}
