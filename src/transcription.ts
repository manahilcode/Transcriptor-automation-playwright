import test, { Page } from "@playwright/test";
import { selectors } from "../utils/selectors/transcription";

export default class Transcription {
  constructor(private page: Page) {}

  /**********************************************************************
   * Transcribe Chat
   * Description: This function will transcribe a chat into multiple
   * languages (French, etc.), generate a note/memo, and then generate
   * a presentation, simulating user interactions on the transcription page.
   ***********************************************************************/
  public async transcribe() {
    await test.step(`transcribe the chat into multiple languages`, async () => {
      console.log(" Navigating to My Transcription section...");
      await this.page.locator(selectors.mytranscription).click();

      console.log(" Selecting test transcription...");
      await this.page.locator(selectors.test1).click();
      await this.page.waitForTimeout(1000);

      console.log(" Clicking on a timestamp/description...");
      await this.page.locator(selectors.description).click();
      await this.page.waitForTimeout(2000);

      console.log(" Opening Language dropdown...");
      await this.page.locator(selectors.language).click({ force: true });
      await this.page.waitForTimeout(2000);

      console.log("Waiting for and selecting French language...");
      await this.page.waitForSelector(selectors.french, { state: 'visible', timeout: 5000 });
      await this.page.locator(selectors.french).click({ force: true });

      console.log(" Waiting for French translation to complete...");
      await this.page.waitForTimeout(12000);

      console.log(" Translation complete. Clicking Generate button...");
      await this.page.waitForSelector(selectors.generate, { state: 'visible' });
      await this.page.locator(selectors.generate).first().click();
      await this.page.waitForTimeout(1000);

      console.log(" Selecting Note/Memo generation...");
      await this.page.waitForSelector(selectors.notememo, { state: 'visible' });
      await this.page.locator(selectors.notememo).click();
      await this.page.waitForTimeout(7000);

      console.log(" Generating presentation...");
      await this.page.waitForSelector(selectors.generate, { state: 'visible' });
      await this.page.locator(selectors.generate).first().click();
      await this.page.waitForTimeout(1000);

      console.log(" Selecting Presentation option...");
      await this.page.waitForSelector(selectors.presentation, { state: 'visible' });
      await this.page.locator(selectors.presentation).click();
      await this.page.waitForTimeout(7000);

      console.log(" Transcription flow completed successfully.");
    });
  }
}
