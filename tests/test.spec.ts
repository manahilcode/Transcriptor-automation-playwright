import { test, expect } from "@playwright/test";

test("TC01 -- navigate through tabs and verify page content", async ({
  page,
}) => {
  await page.goto("https://www.newweborder.co/");
  await page.click('a[href="/projects"]');
  await page.click('a[href="/about"]');
  await page.click('a[href="/industries"]');
  await page.waitForTimeout(1000);
  await page.click('a[href="/services"]');
  await page.click('a[href="/blogs"]');
  await page.locator(".div-one").click();
  await page.click('//div[@class="close"]');
  await page.waitForTimeout(2000);
  await page.click('a[href="/projects"]');
  await page.waitForTimeout(1000);

  const projectLinks = [
    "/projects/AidenSolutions",
    "/projects/AlbinAI",
    "/projects/filify",
    "/projects/PentAI",
  ];
  for (const link of projectLinks) {
    const card = page.locator(`a.project-card-link[href="${link}"]`);
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(new RegExp(`${link}$`, "i"));
    await page.goBack();
  }
  const button = page.getByRole("button", {
    name: "LET US TAKE THAT LOAD OFF YOU",
  });
  await expect(button).toBeVisible();
  await button.click();
  const clickAndWait = async (selector: string, timeout = 2000) => {
    await page.click(selector);
  };
  await page.click('//div[@class="close"]');

  // Map Links
  await clickAndWait('a[href*="maps.app.goo.gl/37E3n5R6ttZjN1897"]');
  await clickAndWait('a[href*="maps.app.goo.gl/WubDrYhqv1UgGqMN6"]');

  // Verify phone number
  await expect(page.locator("text=+44 7360856434")).toBeVisible();
  await page.waitForTimeout(2000);

  // Mail link
  await clickAndWait('a[href^="mailto:contact@newweborder.co"]');
  await clickAndWait('a[href="/terms"]', 2000);

  await expect(page.locator("text=+44 7360856434")).toBeVisible();
  await page.waitForTimeout(3000);

  await page.click('a[href^="mailto:contact@newweborder.co"]');
  await page.waitForTimeout(3000);

  // Terms page
  await clickAndWait('a[href="/terms"]', 3000);

  // Project links
  const ProjectLinks = [
    'a[href*="projects/AidenSolutions"]',
    'a[href*="projects/AlbinAI"]',
    'a[href*="projects/filify"]',
    'a[href*="projects/PentAI"]',
    'a[href="/projects"]',
  ];
  for (const link of ProjectLinks) {
    await clickAndWait(link, 2000);
  }
  await clickAndWait('a[href="/site-map"]', 3000);
  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('a[href*="grumptoken.com"]'),
  ]);
  await popup.waitForLoadState("load");
});
