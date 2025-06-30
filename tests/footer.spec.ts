import { test, expect } from "@playwright/test";

test("Footer navigation verification", async ({ page, context }) => {
  await page.goto("https://www.newweborder.co/");

  const clickAndWait = async (selector: string, timeout = 2000) => {
    await page.click(selector);
    await page.waitForTimeout(timeout);
  };
  await clickAndWait('a[href*="maps.app.goo.gl/37E3n5R6ttZjN1897"]');
  await clickAndWait('a[href*="maps.app.goo.gl/WubDrYhqv1UgGqMN6"]');

  // Verify phone number
  await expect(page.locator("text=+44 7360856434")).toBeVisible();
  await page.waitForTimeout(2000);

  // Mail link
  await clickAndWait('a[href^="mailto:contact@newweborder.co"]');

  // Project links
  const projectLinks = [
    'a[href*="projects/AidenSolutions"]',
    'a[href*="projects/AlbinAI"]',
    'a[href*="projects/filify"]',
    'a[href*="projects/PentAI"]',
    'a[href="/projects"]',
  ];
  for (const link of projectLinks) {
    await clickAndWait(link);
  }

  // Static pages
  await clickAndWait('a[href="/terms"]', 1000);
  await clickAndWait('a[href="/site-map"]', 1000);

  // External site
  await clickAndWait('a[href*="grumptoken.com"]');
});
