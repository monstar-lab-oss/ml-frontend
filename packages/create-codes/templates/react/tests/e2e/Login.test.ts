import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("/");

  // logout first
  const logout = await page.locator("a", { hasText: "Logout" });
  await logout.click();
});

test.afterAll(async () => {
  await page.close();
});

test.describe("playwright e2e test for login page", () => {
  test("success login", async () => {
    const email = await page.locator("#email");
    const password = await page.locator("#password");
    const submitButton = await page.locator("button[type=submit]");

    await email.clear();
    await email.type("eve.holt@reqres.in");
    await password.clear();
    await password.type("cityslicka");
    await submitButton.click();

    await expect(page).toHaveURL(/.*home/);
  });

  test("fail login", async () => {
    const email = await page.locator("#email");
    const submitButton = await page.locator("button[type=submit]");

    await email.clear();
    await email.type("test@123123abcabc");
    await submitButton.click();
    await page.waitForTimeout(3000);

    await expect(page.locator("#erroremail")).toBeVisible();
    await expect(page.locator("#errorpassword")).toBeVisible();
  });
});
