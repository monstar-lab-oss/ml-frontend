import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page = await browser.newPage();
  await page.goto("count");
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Count page", () => {
  test("should count up from 10 to 11", async () => {
    // Make sure the initial count is 10
    await expect(page.locator("h3")).toHaveText(["10"]);
    // Click the button to increase the count
    await page.locator("button", { hasText: /^\+$/ }).click();
    // Make sure the count now has 11
    await expect(page.locator("h3")).toHaveText(["11"]);
  });
});
