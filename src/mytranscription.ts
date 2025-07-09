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
  // public async folder() {
  //   await test.step(`manage folder`, async () => {
  //     await this.page.locator(selectors.folders).click();

  //     // check if folders are listed
  //     const folderCount = await this.page.locator(selectors.createfolder).count();

  //     if (folderCount > 0) {
  //       // folders exist, create a new folder
  //       await this.page.locator(selectors.createfolder).click();
  //       await this.page.locator(selectors.inputfoldername).fill("automationfolder");
  //       await this.page.locator(selectors.create).click();

  //       // check for duplicate name
  //       const duplicatePopup = this.page.getByText("A folder with this name already exists");
  //       if (await duplicatePopup.isVisible({ timeout: 3000 }).catch(() => false)) {
  //         console.log("Duplicate folder name found, trying another name.");
  //         await this.page.locator(selectors.inputfoldername).fill("automationfolder2");
  //         await this.page.locator(selectors.create).click();
  //       }

  //       await this.page.locator(selectors.menubutton).click();
  //       await this.page.locator(selectors.rename).click();
  //       const input = this.page.locator(selectors.inputreanme);
  //       await input.fill("");
  //       await input.type("Automation1");
  //       await this.page.locator(selectors.renamebutton).click();
  //       await this.page.locator(selectors.menubutton).click();
  //       await this.page.locator(selectors.delete).click();
  //       await this.page.locator(selectors.deletebutton).click();

  //     } else {
  //       // no folders, click "Create Your First Folder"
  //       await this.page.locator("//button[normalize-space()='Create Your First Folder']").click();
  //       await this.page.locator(selectors.inputfoldername).fill("automationfolder");
  //       await this.page.locator(selectors.create).click();

  //       // check for duplicate name
  //       const duplicatePopup = this.page.getByText("A folder with this name already exists");
  //       if (await duplicatePopup.isVisible({ timeout: 3000 }).catch(() => false)) {
  //         console.log("Duplicate folder name found, trying another name.");
  //         await this.page.locator(selectors.inputfoldername).fill("automationfolder3");
  //         await this.page.locator(selectors.create).click();
  //       }

  //       await this.page.locator(selectors.menubutton).click();
  //       await this.page.locator(selectors.rename).click();
  //       const input = this.page.locator(selectors.inputreanme);
  //       await input.fill("");
  //       await input.type("Automation");
  //       await this.page.locator(selectors.renamebutton).click();
  //       await this.page.locator(selectors.menubutton).click();
  //       await this.page.locator(selectors.delete).click();
  //       await this.page.locator(selectors.deletebutton).click();
  //       await this.page.waitForTimeout(500);
  //     }
  //   });
  // }

  


public async folder() {
  await test.step(`manage folder`, async () => {
    await this.page.locator(selectors.folders).click();

    let folderName = "automationfolder";
    const inputField = this.page.locator(selectors.inputfoldername);
    const createBtn = this.page.locator(selectors.create);
    
    const duplicateToast = this.page.locator("//li[@role='status']");

    const folderCount = await this.page.locator(selectors.createfolder).count();

    if (folderCount > 0) {
      await this.page.locator(selectors.createfolder).click();
    } else {
      await this.page.locator("//button[normalize-space()='Create Your First Folder']").click();
    }

    // First attempt
    await inputField.fill(folderName);
    await createBtn.click();

    // Check for duplicate error
    const isDuplicate = await duplicateToast
      .filter({ hasText: "A folder with this name already exists" })
      .isVisible({ timeout: 3000 })
      .catch(() => false);


    if (isDuplicate) {
      folderName = `auto_${generateRandomString(6)}`;
      await inputField.fill(folderName);
      await createBtn.click();
    }
    

    // Rename with random name
    const renamed = `renamed_${generateRandomString(6)}`;
    await this.page.locator(selectors.menubutton).click();
    await this.page.locator(selectors.rename).click();
    const renameInput = this.page.locator(selectors.inputreanme);
    await renameInput.fill("");
    await renameInput.type(renamed);
    await this.page.locator(selectors.renamebutton).click();

    // Delete folder
    // await this.page.locator(selectors.menubutton).click();
    // await this.page.locator(selectors.delete).click();
    // await this.page.locator(selectors.deletebutton).click();
    // await this.page.waitForTimeout(500);
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
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
