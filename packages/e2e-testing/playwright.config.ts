import { type PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  testDir: "__tests__",
  retries: process.env.CI ? 2 : 0,
  globalSetup: require.resolve("./__tests__/utils/global-setup"),
  use: {
    headless: !!process.env.CI,
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: "./__tests__/utils/storageState.json",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "react",
      use: {
        baseURL: "http://localhost:3000",
        ...devices["Desktop Chrome"],
      },
    },
  ],
};
export default config;
