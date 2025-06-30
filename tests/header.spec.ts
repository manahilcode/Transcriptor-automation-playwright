import { test, expect } from "@playwright/test";

test("navigate through tabs and verify page content", async ({ page }) => {
  await page.goto("https://www.newweborder.co/");

  await page.click('a[href="/projects"]');

  await page.waitForTimeout(2000);

  await page.click('a[href="/about"]');

  await page.waitForTimeout(2000);

  await page.click('a[href="/industries"]');

  await page.waitForTimeout(2000);

  await page.click('a[href="/services"]');

  await page.waitForTimeout(2000);

  await page.click('a[href="/blogs"]');

  await page.waitForTimeout(2000);

  await page.locator(".div-one").click();

  await page.waitForTimeout(2000);
});
