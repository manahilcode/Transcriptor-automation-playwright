import test, { Page } from "@playwright/test";
import { selectors } from "../utils/selectors/mytranscription-selector";

export default class mytranscription {
  constructor(private page: Page) {}

  /**********************************************************************
  * Menu Navigation
  * Description: This function clicks on the My Transcription menu.
  ***********************************************************************/
  public async menu() {
    await test.step(`click on menu`, async () => {
      await this.page.locator(selectors.mytranscription).click();
    });
  }

  /**********************************************************************
  * Folder Management
  * Description: This function manages folders by creating, renaming,
  * and deleting a folder. It handles duplicate folder names as well.
  ***********************************************************************/
  public async folder() {
    await test.step(`manage folder`, async () => {
      await this.page.locator(selectors.folders).click();

      // check if folders are listed
      const folderCount = await this.page.locator(selectors.createfolder).count();

      if (folderCount > 0) {
        // folders exist, create a new folder
        await this.page.locator(selectors.createfolder).click();
        await this.page.locator(selectors.inputfoldername).fill("automationfolder");
        await this.page.locator(selectors.create).click();

        // check for duplicate name
        const duplicatePopup = this.page.getByText("A folder with this name already exists");
        if (await duplicatePopup.isVisible({ timeout: 3000 }).catch(() => false)) {
          console.log("Duplicate folder name found, trying another name.");
          await this.page.locator(selectors.inputfoldername).fill("automationfolder2");
          await this.page.locator(selectors.create).click();
        }

        await this.page.locator(selectors.menubutton).click();
        await this.page.locator(selectors.rename).click();
        const input = this.page.locator(selectors.inputreanme);
        await input.fill("");
        await input.type("Automation");
        await this.page.locator(selectors.renamebutton).click();
        await this.page.locator(selectors.menubutton).click();
        await this.page.locator(selectors.delete).click();
        await this.page.locator(selectors.deletebutton).click();

      } else {
        // no folders, click "Create Your First Folder"
        await this.page.locator("//button[normalize-space()='Create Your First Folder']").click();
        await this.page.locator(selectors.inputfoldername).fill("automationfolder");
        await this.page.locator(selectors.create).click();

        // check for duplicate name
        const duplicatePopup = this.page.getByText("A folder with this name already exists");
        if (await duplicatePopup.isVisible({ timeout: 3000 }).catch(() => false)) {
          console.log("Duplicate folder name found, trying another name.");
          await this.page.locator(selectors.inputfoldername).fill("automationfolder3");
          await this.page.locator(selectors.create).click();
        }

        await this.page.locator(selectors.menubutton).click();
        await this.page.locator(selectors.rename).click();
        const input = this.page.locator(selectors.inputreanme);
        await input.fill("");
        await input.type("Automation");
        await this.page.locator(selectors.renamebutton).click();
        await this.page.locator(selectors.menubutton).click();
        await this.page.locator(selectors.delete).click();
        await this.page.locator(selectors.deletebutton).click();
        await this.page.waitForTimeout(500);
      }
    });
  }

  /**********************************************************************
  * Bookmark Transcription
  * Description: This function bookmarks a transcription, verifies it
  * in the bookmark tab, and then returns to the all transcription view.
  ***********************************************************************/
  public async bookmark() {
    await test.step(`bookmark transcriptions`, async () => {
      await this.page.locator(selectors.alltarnscription).click();
      await this.page.locator(selectors.bookmark).click();
      await this.page.locator(selectors.bookmarktab).click();
      await this.page.waitForTimeout(500);
      await this.page.locator(selectors.alltarnscription).click();
    });
  }
}
