import { chromium, FullConfig } from "@playwright/test";

const globalSetup = async (_config: FullConfig) => {
  const browser = await chromium.launch({ headless: !!process.env.CI });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/ml-frontend/login");

  await Promise.all([
    page.waitForResponse(
      (resp) => resp.url().includes("/api/v1/login") && resp.status() === 200
    ),
    page.locator("button", { hasText: /^Login$/ }).click(),
  ]);

  // Save signed-in state to 'storageState.json'.
  await page
    .context()
    .storageState({ path: "./tests/e2e/utils/storageState.json" });
  await browser.close();
};

export default globalSetup;
