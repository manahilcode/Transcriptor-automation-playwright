import { Page, expect } from "@playwright/test";
import { servicespageselector , servicespagesubselector } from "../selectors/services";

export async function navigateToServices(page: Page): Promise<void> {
  const servicesMenu = page.locator('//span[text()="Services"]');
  await expect(servicesMenu).toBeVisible({ timeout: 10000 });
  await servicesMenu.click();
  
  for (const serviceXPath of servicespageselector.services) {
    await page.waitForTimeout(500);
    await expect(servicesMenu).toBeVisible({ timeout: 10000 });
    await servicesMenu.click();
    await page.waitForTimeout(500);
    const service = page.locator(serviceXPath);

    await service.waitFor({ state: "visible", timeout: 10000 });
    await service.scrollIntoViewIfNeeded();

    try {
      await Promise.all([
        page.waitForNavigation({
          waitUntil: "domcontentloaded",
          timeout: 15000,
        }),
        service.click(),
      ]);
    } catch (error) {
      console.log(
        `Navigation after clicking service failed: ${serviceXPath}`,
        error
      );
      await page.reload();
      continue;
    }

    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1500);

    for (const subLinkXPath of servicespagesubselector.subLinks) {
      const subLink = page.locator(subLinkXPath);
      const isVisible = await subLink.isVisible().catch(() => false);

      if (isVisible) {
        await subLink.scrollIntoViewIfNeeded();
        await subLink.click();
        await page.waitForLoadState("domcontentloaded");
        await page.waitForTimeout(1000);
      }
    }

    const toolsTechSection = page.locator('//h2[text()="Tools & Technology"]');
    const isTechSectionVisible = await toolsTechSection
      .isVisible()
      .catch(() => false);

    if (isTechSectionVisible) {
      await toolsTechSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    } else {
      console.log(
        `"Tools & Technology" section not found for service: ${serviceXPath}`
      );
    }

    const whyChooseUsSection = page.locator('//h2[text()="Why Choose Us?"]');
    const isWhyChooseUsSectionVisible = await whyChooseUsSection
      .isVisible()
      .catch(() => false);

    if (isWhyChooseUsSectionVisible) {
      await whyChooseUsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    } else {
      console.log(
        `"Why Choose Us?" section not found for service: ${serviceXPath}`
      );
    }
  }
}
