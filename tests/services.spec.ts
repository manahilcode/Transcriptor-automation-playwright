import { test, expect } from "@playwright/test";
import { navigateToServices } from "../utils/src/services";
const { BASE_URL } = require("../utils/constants");

test("Automate Proejcts naviagtion", async ({ page }) => {
  await page.goto(BASE_URL);
  test.setTimeout(300000);
  await navigateToServices(page);
});
