import { type PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  testDir: "./tests/e2e",
  webServer: {
    command: "yarn dev",
    port: 3000,
  },
  retries: process.env.CI ? 2 : 0,
  globalSetup: require.resolve("./tests/e2e/utils/global-setup"),
  use: {
    headless: !!process.env.CI,
    baseURL: "http://localhost:3000/ml-frontend/",
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: "./tests/e2e/utils/storageState.json",
    trace: "on-first-retry",
    testIdAttribute: "data-testid",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};
export default config;
