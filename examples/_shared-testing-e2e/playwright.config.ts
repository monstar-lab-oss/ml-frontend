import { PlaywrightTestConfig, devices } from "@playwright/test";

const CI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  testDir: "__tests__",
  use: {
    baseURL: "http://localhost:3000",
    headless: CI,
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
};

export default config;
