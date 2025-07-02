import test, { Page, expect } from "@playwright/test";
import { selectors } from "../utils/selectors/home-selector";

export default class Home {
  constructor(private page: Page) {}

  /**********************************************************************
   *  Automate home page
   * Description: This function will verify heading text and scroll to page end
   ***********************************************************************/
  public async verifytext(){
 const heading = this.page.locator(selectors.text);
 const ExpectedHeading = 'Transcribe, Translate & Summarize'
 

  }


  


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
