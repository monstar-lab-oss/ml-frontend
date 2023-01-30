import { test, expect } from "@playwright/test";

test.describe("pages/home.tsx", () => {
  test("Loads home page with text", async ({ page }) => {
    await page.goto("/");

    expect(await page.waitForSelector("text=/\\React/")).toBeTruthy();
    expect(
      await page.waitForSelector(
        "text=/\\Click the icon to switch between light and dark mode/"
      )
    ).toBeTruthy();
  });
});
