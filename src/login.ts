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
            await this.page.locator(selectors.login).click();
            await this.page.locator(selectors.email).fill("abdullah@newweborder.co");
            await this.page.locator(selectors.password).fill("Abc123123!");
            await this.page.locator(selectors.button).click();
            await this.page.waitForTimeout(5000); // 2000 ms = 2 seconds

            
        });
    }
}