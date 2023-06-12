import { PlaywrightTestConfig, devices } from "@playwright/test";
import { resolve } from "node:path";

const CI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  globalSetup: resolve("./__tests__/utils/global-setup"),
  testDir: "__tests__",
  use: {
    baseURL: "http://localhost:3000",
    headless: CI,
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
};

export default config;
