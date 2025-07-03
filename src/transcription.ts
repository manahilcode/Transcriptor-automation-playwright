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
            // Click on the transcription area
            await this.page.locator(selectors.test1).click();
            await this.page.waitForTimeout(1000);

            // Click on a specific timestamp to select text
            await this.page.locator(selectors.description).click();
            await this.page.waitForTimeout(2000);

            // Click on Language dropdown
            console.log('Clicking on Language dropdown...');
            await this.page.locator(selectors.language).click({ force: true });
            await this.page.waitForTimeout(2000);

            // Wait for dropdown to open and French option to be available
            console.log('Waiting for French option...');
            await this.page.waitForSelector(selectors.french, { state: 'visible', timeout: 5000 });
            
            // Select French from dropdown
            console.log('Clicking on French option...');
            await this.page.locator(selectors.french).click({ force: true });
            
            // Wait for French translation to complete
            console.log('Waiting for French translation to complete...');
            await this.page.waitForTimeout(12000);
            
            console.log('French translation should be complete, proceeding to generate...');

            // Wait for Generate button to be visible and clickable
            await this.page.waitForSelector(selectors.generate, { state: 'visible' });
            await this.page.locator(selectors.generate).first().click();
            await this.page.waitForTimeout(1000);

            // Click on Note/Memo option
            await this.page.waitForSelector(selectors.notememo, { state: 'visible' });
            await this.page.locator(selectors.notememo).click();
            await this.page.waitForTimeout(7000);

            // Click Generate again for presentation
            await this.page.waitForSelector(selectors.generate, { state: 'visible' });
            await this.page.locator(selectors.generate).first().click();
            await this.page.waitForTimeout(1000);

            // Click on Presentation option
            await this.page.waitForSelector(selectors.presentation, { state: 'visible' });
            await this.page.locator(selectors.presentation).click();
            await this.page.waitForTimeout(7000);
        });
    }
}
