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
      console.log(" Clicking on 'My Transcription' menu...");
      await this.page.locator(selectors.mytranscription).click();
    });
  }

  /**********************************************************************
  * Folder Management
  * Description: This function creates a folder, handles duplicates,
  * renames it using a timestamp, and deletes it.
  ***********************************************************************/
  public async folder() {
    await test.step(`manage folder`, async () => {
      console.log("Navigating to folder management...");
      await this.page.locator(selectors.folders).click();

      let folderName = "automationfolder";
      const inputField = this.page.locator(selectors.inputfoldername);
      const createBtn = this.page.locator(selectors.create);

      const duplicateToast = this.page.locator("//li[@role='status']");
      const folderCount = await this.page.locator(selectors.createfolder).count();

      if (folderCount > 0) {
        console.log(" Clicking on 'Create Folder' button...");
        await this.page.locator(selectors.createfolder).click();
      } else {
        console.log(" Creating first folder...");
        await this.page.locator("//button[normalize-space()='Create Your First Folder']").click();
      }

      console.log(` Trying to create folder: "${folderName}"`);
      await inputField.fill(folderName);
      await createBtn.click();

      // Check for duplicate error
      const isDuplicate = await duplicateToast
        .filter({ hasText: "A folder with this name already exists" })
        .isVisible({ timeout: 3000 })
        .catch(() => false);

      if (isDuplicate) {
        folderName = `auto_${generateTimestamp()}`;
        console.log(`Duplicate folder found. Renaming to: "${folderName}"`);
        await inputField.fill(folderName);
        await createBtn.click();
      }

      // Rename with timestamp
      const renamed = `renamed_${generateTimestamp()}`;
      console.log(` Renaming folder to: "${renamed}"`);
      await this.page.locator(selectors.menubutton).click();
      await this.page.locator(selectors.rename).click();
      const renameInput = this.page.locator(selectors.inputreanme);
      await renameInput.fill("");
      await renameInput.type(renamed);
      await this.page.locator(selectors.renamebutton).click();

      // Delete folder
      console.log("Deleting the folder...");
      await this.page.locator(selectors.menubutton).click();
      await this.page.locator(selectors.delete).click();
      await this.page.locator(selectors.deletebutton).click();
      await this.page.waitForTimeout(500);
      console.log("Folder deleted.");
    });
  }

  /**********************************************************************
  * Bookmark Transcription
  * Description: This function bookmarks a transcription, verifies it
  * in the bookmark tab, and then returns to the all transcription view.
  ***********************************************************************/
  public async bookmark() {
    await test.step(`bookmark transcriptions`, async () => {
      console.log(" Bookmarking a transcription...");
      await this.page.locator(selectors.alltarnscription).click();
      await this.page.locator(selectors.bookmark).click();
      await this.page.locator(selectors.bookmarktab).click();
      await this.page.waitForTimeout(500);
      console.log(" Verified in bookmark tab. Returning to all transcriptions...");
      await this.page.locator(selectors.alltarnscription).click();
    });
  }
}

/**********************************************************************
* Timestamp Generator
* Description: Generates a timestamp like 20250709143125
***********************************************************************/
export function generateTimestamp(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}${MM}${dd}${hh}${mm}${ss}`;
}
