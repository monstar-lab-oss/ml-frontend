import { chromium, FullConfig } from "@playwright/test";

const globalSetup = async (_config: FullConfig) => {
  const browser = await chromium.launch({ headless: !!process.env.CI });
  const page = await browser.newPage();

  // Save signed-in state to 'storageState.json'.
  await page
    .context()
    .storageState({ path: "./__tests__/utils/storageState.json" });
  await browser.close();
};

export default globalSetup;
