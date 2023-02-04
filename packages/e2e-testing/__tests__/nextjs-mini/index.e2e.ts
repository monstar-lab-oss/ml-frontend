import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("pages/index.tsx", () => {
  test("Loads homepage", async ({ page }) => {
    expect(
      await page.waitForSelector("text=/\\Getting started with Next.js/")
    ).toBeTruthy();
  });

  test("Toggle theme button works", async ({ page }) => {
    const button = page.getByRole("button", {
      name: /Click to switch (light|dark) mode/i,
    });

    expect(await button.textContent()).toBe("Click to switch dark mode");
    await button.click();
    expect(await button.textContent()).toBe("Click to switch light mode");
  });
});
