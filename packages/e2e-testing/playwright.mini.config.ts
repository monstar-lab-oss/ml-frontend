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
  projects: [
    {
      name: "react-mini",
      testDir: "__tests__/react-mini",
      use: {
        baseURL: "http://localhost:7100",
      },
    },
    {
      name: "nextjs-mini",
      testDir: "__tests__/nextjs-mini",
      use: {
        baseURL: "http://localhost:7400",
      },
    },
  ],
};

export default config;
