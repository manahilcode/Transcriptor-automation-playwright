import { Page, expect } from "@playwright/test";

export async function navigateToContactForm(page: Page): Promise<void> {
  await page.locator(".div-one").click();
}
export async function fillContactForm(
  page: Page,
  fullname: string,
  email: string,
  startdate: string,
  budget: string,
  message: string
): Promise<void> {
  await page
    .locator('//input[@class="form-input" and @placeholder="John Doe"]')
    .fill(fullname);
  await page
    .locator(
      '//input[@class="form-input" and @placeholder="johndoe@example.com"]'
    )
    .fill(email);
  await page.waitForTimeout(2000);
  await page
    .locator('(//div[@class="Dropdown-placeholder placeholer is-selected"])[1]')
    .click();
  await page.waitForTimeout(1000);
  await page.locator('//div[text()="In 6 months"]').click();
  await page
    .locator('(//div[@class="Dropdown-placeholder placeholer is-selected"])[2]')
    .click();
  await page.locator('//div[text()="$50,000 - $74,999"]').click();
  await page.waitForTimeout(2000);
  await page
    .locator('//textarea[@placeholder="Maximum of 1000 characters."]')
    .fill(message);
}
export async function submitContactForm(page: Page): Promise<void> {
  await page.click('//button[text()="Send Details"]');
}
