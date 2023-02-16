import { describe, test, expect, beforeAll, afterAll } from "vitest";
import path from "node:path";
import {
  execFile,
  spawn,
  ChildProcessWithoutNullStreams,
} from "node:child_process";
import { promisify } from "node:util";
import fse from "fs-extra";
import stripAnsi from "strip-ansi";

const KEYS = {
  ENTER: "\x0D",
  SPACE: "\x20",
};

// outside of monorepo
const cwd = path.resolve(__dirname, "../../../..");
const createCodes = path.resolve(__dirname, "../dist/index.js");

describe("create-codes", () => {
  const testDir = "my-test" as const;

  const exe = promisify(execFile);

  const EXPECTED_HELP = `Create a new codes for front-end app

    Usage:
      $ npx create-codes [<dir>] [flags...]

    Flags:
      --help, -h          Show this help message
      --version, -v       Show the version of this script`;

  beforeAll(() => cleanup(testDir));
  afterAll(() => cleanup(testDir));

  describe("install boilerplate files with cli", () => {
    test("interactively configure", async () => {
      const cli = spawn("node", [createCodes], { cwd });
      const stdout = await run(cli, testDir);

      expect(stdout).toContain(`
┌  ≛ Create Codes :: Write less boilerplate, focus on the your front-end magic.
│
`);
      expect(stdout).toContain(`
●  Where would you like to create your app?
│  ./my-app
└
`);
      expect(stdout).toContain(`
●  Select a JavsScript library for UI
│  ● Solid 
└
`);
      expect(stdout).toContain(`
●  Select an API solution
│  ● RESTful 
│  ○ GraphQL
└
`);
      expect(stdout).toContain(`
●  Select the app features you want to use
│  ◻ Add Router for SPA Development
│  ◻ Add CRUD Operations 
│  ◻ Add Zustand for State Management
│  ◻ Add Authentication Feature
└
`);
      expect(stdout).toContain(`
●  Select the testing type that you want to use
│  ◻ Vitest for Unit testing 
│  ◻ Storybook for visual testing
│  ◻ Playwright for end-to-end testing
└
`);
      expect(stdout).toContain(`
●  Select tools that help with code quality
│  ◻ ESLint for code linting 
│  ◻ Prettier for code formatting
└
`);
      expect(stdout).toContain(`
○  Downloading Templates files
`);
      expect(stdout).toContain(`
○  Downloaded Templates files
`);

      expect(stdout).toContain(`
○  Success! Created a new app at "${testDir}" ─────────────────╮
│                                                           │
│  Inside this directory, you can run:                      │
│                                                           │
│    pnpm dev                                               │
│      Develop your app with development server             │
│                                                           │
│    pnpm build                                             │
│      Build directory with a production build of your app  │
│                                                           │
├───────────────────────────────────────────────────────────╯
│
└  Happy hacking!
`);
    });

    test.todo("installed boilerplate file is structured as intended", () => {
      //TODO:
    });
  });

  describe("printing help message", () => {
    test("--help flag works", async () => {
      const { stdout } = await exe("node", [createCodes, "--help"]);
      expect(stdout.trim()).toBe(EXPECTED_HELP);
    });

    test("-h flag works", async () => {
      const { stdout } = await exe("node", [createCodes, "-h"]);
      expect(stdout.trim()).toBe(EXPECTED_HELP);
    });
  });

  describe("printing version", () => {
    test("--version flag works", async () => {
      const { stdout } = await exe("node", [createCodes, "--version"]);
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      expect(stdout.trim()).toBe(process.env.npm_package_version);
    });

    test("-v flag works", async () => {
      const { stdout } = await exe("node", [createCodes, "-v"]);
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      expect(stdout.trim()).toBe(process.env.npm_package_version);
    });
  });
});

async function run(cli: ChildProcessWithoutNullStreams, testDir: string) {
  let acc = "";

  return new Promise((resolve, reject) => {
    cli.stdout.on("data", async (data) => {
      acc += data.toString("utf-8");

      if (acc.match(/Where would you like to create your app/)) {
        cli.stdin.write(Buffer.from(testDir, "utf-8"));
        cli.stdin.write(KEYS.ENTER);
      }

      if (acc.match(/Select a JavsScript library for UI/)) {
        cli.stdin.write(KEYS.ENTER);
      }

      if (acc.match(/Select an API solution/)) {
        cli.stdin.write(KEYS.ENTER);
      }

      if (acc.match(/Select the app features you want to use/)) {
        cli.stdin.write(KEYS.SPACE);
        cli.stdin.write(KEYS.ENTER);
      }

      if (acc.match(/Select the testing type that you want to use/)) {
        cli.stdin.write(KEYS.SPACE);
        cli.stdin.write(KEYS.ENTER);
      }

      if (acc.match(/Select tools that help with code quality/)) {
        cli.stdin.write(KEYS.SPACE);
        cli.stdin.write(KEYS.ENTER);
      }
    });

    cli.on("exit", () => resolve(stripAnsi(acc)));
    cli.on("error", (e) => reject(e));
  });
}

function cleanup(dir: string) {
  const installedDir = path.resolve(cwd, dir);
  fse.existsSync(installedDir) && fse.rmSync(installedDir, { recursive: true });
}
