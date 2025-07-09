import mytarnscription from "../../src/mytranscription";

export const selectors = {
    mytranscription:'a[href="/transcriptions"]',
    folders:'//button[normalize-space(text())="Folders"]',
    createfolder: '//span[text()="Create new folder"]', //1
    inputfoldername:'//input[@placeholder="Folder Name"]',
    create:'//button[normalize-space(text())="Create"]',
    menubutton:'(//button[contains(@id,"radix")])[2]',
    rename:'(//div[@role="menuitem"])[1]',
    inputreanme:'//input[@placeholder="New Name"]',
    renamebutton:'//button[normalize-space(text())="Rename"]',
    delete:'(//div[@role="menuitem"])[2]',
    deletebutton:'//button[text()="Delete"]', //2
    alltarnscription: '//button[text()="All Transcriptions"]',
    bookmark:`//div//div//div//div[1]//a[1]//button[1]//*[name()='svg']`,  //4
    bookmarktab: '//button[text()="Bookmarks"]', //4
}