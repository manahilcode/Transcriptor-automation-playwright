import { test, expect } from "@playwright/test";
import {
  navigateToContactForm,
  fillContactForm,
  submitContactForm,
} from "../utils/src/contact";

const { BASE_URL } = require("../utils/constants");

test("Fill and submit the contact form", async ({ page }) => {
  await page.goto(BASE_URL);
  await navigateToContactForm(page);
  const now = new Date().toISOString(); // Generates timestamp like '2025-04-23T14:45:00.123Z'

  await fillContactForm(
    page,
    "Auto - QA Test",
    "test@testingqa.com",
    "Next 30 Days",
    "$5,000 - $10,000",
    `This is a test message to check the contact form automation. Timestamp: ${now}`
  );

  await submitContactForm(page);
});
