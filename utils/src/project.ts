import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import {projectpageselector} from "../selectors/projects"

export async function navigateToProjectForm(page: Page): Promise<void> {
  await page.click('a[href="/projects"]');
}

export async function visitProjectCards(page: Page): Promise<void> {
 
  for (const selector of projectpageselector.projectSelectors) {
    const card = page.locator(selector);
    await expect(card).toBeVisible({ timeout: 5000 });

    await card.scrollIntoViewIfNeeded();
    await card.click();
    await page.waitForTimeout(1000); // Wait for card details to load

    const externalLink = page.locator('a.link-text[target="_blank"]');

    if (await externalLink.isVisible()) {
      const [newTab] = await Promise.all([
        page.context().waitForEvent("page", { timeout: 10000 }),
        externalLink.click(),
      ]);

      try {
        await newTab.waitForLoadState("load", { timeout: 40000 }); // 30s for full load
        console.log("Opened external link:", await newTab.title());
      } catch (error) {
        console.warn(
          '⚠️ Timeout while waiting for "load" state on the link. Trying "domcontentloaded"'
        );
        try {
          await newTab.waitForLoadState("domcontentloaded", { timeout: 20000 }); // 15s for partial load
          console.log(
            "Opened external link (partial load):",
            await newTab.title()
          );
        } catch (innerError) {
          console.error(
            '❌ Timeout on both "load" and "domcontentloaded" for: ${await newTab.url()}'
          );
        }
      }
      await newTab.close();
    } else {
      console.log("No external link found in: ${selector}");
    }

    await page.click('a[href="/projects"]');
    await page.waitForTimeout(500); // Ensure navigation back
  }
}
