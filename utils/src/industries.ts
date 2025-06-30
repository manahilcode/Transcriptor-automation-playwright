import { Page, expect } from "@playwright/test";
import{industriespageselector, industriespagesubselector} from "../selectors/industries"

export async function navigateToIndustries(page: Page): Promise<void> {
  // Click on Industries first
  await page.locator('//span[text()="Industries"]').click();

 
  for (const industrySelector of industriespageselector.industries) {
    // Click on the industry
    const industry = page.locator(industrySelector);
    await expect(industry).toBeVisible({ timeout: 5000 }); // wait for industry visible
    await industry.click();

    // Small wait to let the page load (only 1 sec)
    await page.waitForTimeout(1000);

    for (const subLinkSelector of industriespagesubselector.subLinks) {
      const subLink = page.locator(subLinkSelector);
      const isVisible = await subLink.isVisible();

      if (isVisible) {
        await subLink.click();

        // Wait for something after click to ensure page is ready
        await page.waitForLoadState("domcontentloaded");
        await page.waitForTimeout(1000); // light wait after load
      }
    }

    // Click Industries again to open dropdown
    const industriesMenu = page.locator('//span[text()="Industries"]');
    await expect(industriesMenu).toBeVisible({ timeout: 5000 });
    await industriesMenu.click();

    // Small pause to ensure dropdown opens
    await page.waitForTimeout(500);
  }
}
