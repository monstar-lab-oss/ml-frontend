import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("pages/home.vue", () => {
  test("Loads homepage", async ({ page }) => {
    expect(
      await page.waitForSelector("text=/\\Getting started with Vue/")
    ).toBeTruthy();
  });

  test("Toggle theme button works", async ({ page }) => {
    // const button = page.getByRole("button", {
    //   name: /Click to switch (light|dark) mode/i,
    // });
    const button = page.getByRole("button", {
      // name: "Click to switch (light|dark) mode/i,
    });

    expect(await button.textContent()).toBe("Click to switch dark mode");
    await button.click();
    expect(await button.textContent()).toBe("Click to switch light mode");
  });
});
