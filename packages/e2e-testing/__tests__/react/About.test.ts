import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("/about");
});

test.afterAll(async () => {
  await page.close();
});

test.describe("About page", () => {
  test("About page has title and 2 links", async () => {
    const homeLocator = await page.locator("a", {
      hasText: "Home",
    });
    const aboutLocator = await page.locator("a", {
      hasText: "About",
    });
    const titleLocator = await page.locator("text=About");

    // test each anchor
    await expect(homeLocator).toHaveAttribute("href", "/");
    await expect(aboutLocator).toHaveAttribute("href", "/about");

    // test if title is displayed
    await expect(titleLocator).toBeVisible();
  });
});
