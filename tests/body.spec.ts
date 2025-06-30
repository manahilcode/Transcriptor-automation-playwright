import { test, expect } from "@playwright/test";

test("Homepage should contain legacy branding text", async ({ page }) => {
  await page.goto("https://www.newweborder.co/");

  await expect(page.locator("body")).toContainText(
    "They say empires crumble, and fortunes fade. But at New Web Order, we're building something far more enduring. We're not just crafting websites and apps – we're forging the digital cornerstones of your legacy."
  );
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

    // Optional: verify navigation
    await expect(page).toHaveURL(new RegExp(`${link}$`, "i"));

    // Navigate back to homepage to click the next card
    await page.goBack();
  }
  const button = page.getByRole("button", {
    name: "LET US TAKE THAT LOAD OFF YOU",
  });
  await expect(button).toBeVisible();
  await button.click();
});
