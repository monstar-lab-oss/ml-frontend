import { type PlaywrightTestConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  testMatch: /.*\.e2e\.ts/,
  use: {
    headless: isCI,
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
  projects: [],
};

export default config;
