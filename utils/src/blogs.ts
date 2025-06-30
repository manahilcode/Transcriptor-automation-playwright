import { Page } from "@playwright/test";
import { blogPageSelectors } from "../selectors/blogs";

export async function navigateToBlogs(page: Page): Promise<void> {
  // Navigate to the blogs page
  await page.locator('//a[text()="Blogs"]').click();
  await page.waitForTimeout(1000); // Wait for page to load properly
  
  // Process each blog
  for (const blogSelector of blogPageSelectors.blogs) {
    try {
      // Check if the page is still valid before proceeding
      if (!page.isClosed()) {
        const blog = page.locator(blogSelector);
        
        // Check if blog element exists before interacting
        if (await blog.count() > 0) {
          await blog.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          
          await blog.click();
          
          // Scroll down the blog post
          for (let i = 0; i < 5; i++) {
            if (!page.isClosed()) {
              await page.mouse.wheel(0, 500);
              await page.waitForTimeout(800);
            } else {
              break;
            }
          }
          
          // Navigate back to blogs page if not closed
          if (!page.isClosed()) {
            await page.locator('//a[text()="Blogs"]').click();
            await page.waitForTimeout(1000); // Increased timeout for page to load
          }
        }
      } else {
        console.log("Page was closed, breaking the loop");
        break;
      }
    } catch (error) {
      console.error(`Failed to process blog: ${blogSelector}`, error);
      
      // If the error is related to page being closed, break the loop
      if (String(error).includes("has been closed")) {
        console.log("Page closed error detected, breaking loop");
        break;
      }
      
      // Try to navigate back to blogs if we can
      try {
        if (!page.isClosed()) {
          await page.locator('//a[text()="Blogs"]').click();
          await page.waitForTimeout(1000);
        }
      } catch (navError) {
        console.error("Failed to navigate back to blogs after error", navError);
      }
    }
  }
  
  // Safely handle the "Load More" button
  try {
    if (!page.isClosed()) {
      const loadMoreButton = page.locator('(//span[text()="LOAD MORE"])[1]');
      const isLoadMoreVisible = await loadMoreButton.isVisible().catch(() => false);
      
      if (isLoadMoreVisible) {
        await loadMoreButton.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await loadMoreButton.click();
        await page.waitForTimeout(1000);
      } else {
        console.log("LOAD MORE button not visible");
      }
      
      // Final scroll
      for (let i = 0; i < 5 && !page.isClosed(); i++) {
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(800);
      }
    }
  } catch (error) {
    console.error("Error in load more section:", error);
  }
}