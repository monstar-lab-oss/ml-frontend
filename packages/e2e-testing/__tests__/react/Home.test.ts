import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeEach(async ({ browser }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page = await browser.newPage();
  await page.goto("/");
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Home page", () => {
  test("Home page has a button and 2 links", async () => {
    const homeLocator = await page.locator("a", {
      hasText: "Home",
    });
    const aboutLocator = await page.locator("a", {
      hasText: "About",
    });
    const buttonLocator = await page.locator("button");

    // test each anchor
    await expect(homeLocator).toHaveAttribute("href", "/");
    await expect(aboutLocator).toHaveAttribute("href", "/about");

    // test button
    await expect(buttonLocator).toHaveText("Load message");
  });

  test("Move to about page", async () => {
    const aboutLocator = await page.locator("a", {
      hasText: "About",
    });
    // move to profile
    await aboutLocator.click();
    await expect(page).toHaveURL(/.*about/);
  });

  test("Load message", async () => {
    // Click button
    await page.locator("button", { hasText: "Load message" }).click();
    // Check if loading message is displayed
    await page.locator("p", { hasText: /Loading/ });
    await page.locator("p", { hasText: /Hello, World!/ });
  });
});
