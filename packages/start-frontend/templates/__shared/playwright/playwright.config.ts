import { PlaywrightTestConfig, devices } from "@playwright/test";
import { resolve } from "node:path";

const CI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  globalSetup: resolve("./__tests__/utils/global-setup"),
  testDir: "__tests__",
  webServer: {
    command: "npm run setup:e2e",
    url: "http://localhost:3000",
    reuseExistingServer: !CI,
  },
  use: {
    baseURL: "http://localhost:3000",
    headless: CI,
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: "./__tests__/utils/storageState.json",
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
};

export default config;
