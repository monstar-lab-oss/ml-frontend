import { describe, test, expect, beforeAll, afterAll } from "vitest";
import path from "node:path";
import util from "node:util";
import { exec, execFile, execSync } from "node:child_process";
import fse from "fs-extra";

const START_FRONTEND = path.resolve(__dirname, "..", "dist", "index.js");

const KEY = {
  ENTER: "\x0D",
  DOWN: "\u001B\u005B\u0042",
  SPACE: "\x20",
};

// Timeout duration for interactive tests, to allow for code stub downloads
const INTERACTIVE_TEST_TIMEOUT = 60000;

let testDir = "my-test";

const exe = util.promisify(execFile);

async function cleanupTestDir() {
  fse.existsSync(testDir) && fse.rmSync(testDir, { recursive: true });
}

async function executeCLI(inputs: string[], delay = 500) {
  const cliProcess = exec(`node ${START_FRONTEND} ${testDir}`);

  function nextPrompt(inputs: string[]) {
    if (!inputs.length) return;

    // Write the input to the CLI process with a delay
    setTimeout(() => {
      console.log("test" + inputs[0]);
      cliProcess?.stdin?.write(inputs[0]);
      nextPrompt(inputs.slice(1));
    }, delay);
  }

  nextPrompt(inputs);

  return new Promise((resolve) => cliProcess.on("exit", resolve));
}

describe("start-frontend", () => {
  beforeAll(() => {
    // Initialize TEST_DIR before all tests
    testDir =
      // Use the default GitHub Actions temporary directory for development in the CI environment.
      // refs: https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      // path: /home/runner/work/_temp
      process.env.RUNNER_TEMP ||
      execSync("mktemp -d -t my-test").toString("utf-8");
    cleanupTestDir();
  });

  afterAll(cleanupTestDir);

  test("--version works", async () => {
    const { stdout } = await exe("node", [START_FRONTEND, "--version"]);
    expect(stdout.trim()).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
  });

  test("-v flag works", async () => {
    const { stdout } = await exe("node", [START_FRONTEND, "-v"]);
    expect(stdout.trim()).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
  });

  test("--help flag works", async () => {
    const { stdout } = await exe("node", [START_FRONTEND, "--help"]);
    expect(stdout.trim()).toBe(`Create a new codes for front-end app

    Usage:
      $ npx start-frontend [<dir>] [flags...]

    Flags:
      --help, -h          Show this help message
      --version, -v       Show the version of this script`);
  });

  test("-h flag works", async () => {
    const { stdout } = await exe("node", [START_FRONTEND, "-h"]);
    expect(stdout.trim()).toBe(`Create a new codes for front-end app

    Usage:
      $ npx start-frontend [<dir>] [flags...]

    Flags:
      --help, -h          Show this help message
      --version, -v       Show the version of this script`);
  });

  test(
    "handle interactive configuration on CLI",
    async () => {
      await executeCLI([
        // Which location you want to start project?
        KEY.ENTER,
        // Select a JavaScript library for UI
        KEY.ENTER,
        // Select an API Solution (Use arrow keys)
        KEY.ENTER,
        // Select module do you want to use (Press 'space' to select)
        KEY.ENTER,
        // Add Testing codes for Catching bugs early?
        KEY.ENTER,
        // Add Vitest for Unit Testing?
        KEY.ENTER,
        // Add Storybook for Visual Testing?
        KEY.ENTER,
        // Add Playwright for End-To-End Testing?
        KEY.ENTER,
        // Add ESLint for Code Linting?
        KEY.ENTER,
        // Add Prettier for Code Formatting?
        KEY.ENTER,
        // for confirmation
        KEY.ENTER,
      ]);

      // Execute tree-cli to get the directory structure and convert it to a string
      const result = execSync(
        `npx tree-cli -a -l 5 --base ${testDir}`
      ).toString("utf-8");

      console.log("result", result);

      expect(result).toContain(`
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .storybook
|  ├── main.ts
|  ├── preview-head.html
|  └── preview.ts
├── __mocks__
|  ├── browser.ts
|  ├── index.ts
|  ├── request-handlers.ts
|  └── server.ts
├── __tests__
|  ├── About.test.ts
|  ├── Home.test.ts
|  └── utils
|     └── global-setup.ts
├── env.d.ts
├── index.html
├── package.json
├── playwright.config.ts
├── public
|  ├── favicon.svg
|  └── mockServiceWorker.js
├── src
|  ├── app.tsx
|  ├── assets
|  |  ├── base.css
|  |  └── main.css
|  ├── components
|  |  ├── Button.tsx
|  |  └── button.module.css
|  ├── context.tsx
|  ├── main.tsx
|  ├── modules
|  |  └── restful
|  |     ├── components
|  |     |  ├── user-form.test.tsx
|  |     |  ├── user-form.tsx
|  |     |  ├── user-list.test.tsx
|  |     |  ├── user-list.tsx
|  |     |  ├── user-view.test.tsx
|  |     |  └── user-view.tsx
|  |     ├── hooks
|  |     |  ├── use-user.test.tsx
|  |     |  └── use-user.ts
|  |     └── index.ts
|  ├── routes.tsx
|  └── ui
|     ├── nav-link.tsx
|     └── pages
|        ├── about
|        |  └── index.tsx
|        ├── index.tsx
|        ├── layout.tsx
|        └── not-found
|           └── index.tsx
├── stories
|  └── Button.stories.tsx
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── vitest.setup.ts`);
    },
    INTERACTIVE_TEST_TIMEOUT
  );
});
