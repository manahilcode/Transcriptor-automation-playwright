import test, { Page } from "@playwright/test";
import { selectors } from "../utils/selectors/login-selector";

export default class LoginSteps {
    constructor(private page: Page) {}

    /**********************************************************************
    * Login the Application
    * Description: This function will login user to the application
    ***********************************************************************/
    public async login() {
        await test.step(`Logging into the application`, async () => {
            console.log(" Starting login process...");

            await this.page.locator(selectors.login).click();
            console.log(" Entering email...");
            await this.page.locator(selectors.email).fill("abdullah@newweborder.co");

            console.log(" Entering password...");
            await this.page.locator(selectors.password).fill("Abc123123!");

            console.log(" Clicking on login button...");
            await this.page.locator(selectors.button).click();

            console.log(" Waiting for login to complete...");
            await this.page.waitForTimeout(5000);

            console.log(" Login flow finished.");
        });
    }
}