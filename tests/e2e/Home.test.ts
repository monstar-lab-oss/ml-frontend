import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeEach(async ({ browser }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page = await browser.newPage();
  await page.goto("");
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Home page", () => {
  test("Home has title, description and 3 links", async () => {
    const profileLocator = await page.locator("a", {
      hasText: "Profile",
    });

    const countLocator = await page.locator("a", {
      hasText: "Count",
    });

    const countWithHistoryLocator = await page.locator("a", {
      hasText: "Undo/Redo",
    });

    // test each anchor
    await expect(profileLocator).toHaveAttribute("href", "/ml-frontend/profile");
    await expect(countLocator).toHaveAttribute("href", "/ml-frontend/count");
    await expect(countWithHistoryLocator).toHaveAttribute(
      "href",
      "/ml-frontend/count_with_history"
    );
  });

  test("Move to profile page", async () => {
    
    const profileLocator = await page.locator("a", {
      hasText: "Profile",
    });
    // move to profile
    await profileLocator.click();
    await expect(page).toHaveURL(/.*profile/);
  });

  test("Move to count page", async () => {
    const countLocator = await page.locator("a", {
      hasText: "Count",
    });
    // move to count
    await countLocator.click();
    await expect(page).toHaveURL(/.*count/);
  });

  test("Move to count with history page", async () => {
    const countWithHistoryLocator = await page.locator("a", {
      hasText: "Undo/Redo",
    });
    // move to count with history
    await countWithHistoryLocator.click();
    await expect(page).toHaveURL(/.*count_with_history/);
  });
});
