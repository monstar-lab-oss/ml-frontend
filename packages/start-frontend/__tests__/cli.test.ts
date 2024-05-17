import { describe, test, expect, beforeAll, afterAll } from "vitest";
import path from "node:path";
import util from "node:util";
import { execFile, spawn } from "node:child_process";
import fse from "fs-extra";
import concat from "concat-stream";

// variables
const keys = {
  ENTER: "\x0D",
  DOWN: "\u001B\u005B\u0042",
  SPACE: "\x20",
};

const cwd = path.resolve(__dirname, "../../../..");
const testDir = "my-test" as const;
const cli = path.resolve(__dirname, "..", "dist", "index.js");

// helpers
const exe = util.promisify(execFile);

async function cleanupTestDir() {
  const installedTestDir = path.resolve(cwd, testDir);

  fse.existsSync(installedTestDir) &&
    fse.rmSync(installedTestDir, { recursive: true });
}

type RunCLIOptions = {
  inputs?: string[];
  delay?: number;
};
function runCLIWithInputs(cliPath: string, opts: RunCLIOptions) {
  const cliProcess = spawn("node", [cliPath], { cwd });
  const { inputs = [], delay = 500 } = opts;

  let currentInputTimeout: NodeJS.Timeout;

  function loop(inputs: string[]) {
    if (!inputs.length) {
      clearTimeout(currentInputTimeout);
      return cliProcess.stdin.end();
    }

    currentInputTimeout = setTimeout(() => {
      cliProcess.stdin.write(inputs[0]);

      loop(inputs.slice(1));
    }, delay);
  }

  return new Promise((resolve) => {
    loop(inputs);

    cliProcess.stdout.pipe(
      concat((result: Buffer) => resolve(result.toString("utf-8")))
    );
  });
}

// tests
describe("start-frontend cli", async () => {
  beforeAll(() => cleanupTestDir());
  afterAll(() => cleanupTestDir());

  test("--version flag works", async () => {
    const { stdout } = await exe("node", [cli, "--version"]);
    expect(stdout.trim()).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
  });

  test("-v flag works", async () => {
    const { stdout } = await exe("node", [cli, "-v"]);
    expect(stdout.trim()).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
  });

  test("--help flag works", async () => {
    const { stdout } = await exe("node", [cli, "-h"]);
    expect(stdout.trim()).toBe(`Create a new codes for front-end app

    Usage:
      $ npx start-frontend [<dir>] [flags...]

    Flags:
      --help, -h          Show this help message
      --version, -v       Show the version of this script`);
  });

  test("-h flag works", async () => {
    const { stdout } = await exe("node", [cli, "-h"]);
    expect(stdout.trim()).toBe(`Create a new codes for front-end app

    Usage:
      $ npx start-frontend [<dir>] [flags...]

    Flags:
      --help, -h          Show this help message
      --version, -v       Show the version of this script`);
  });

  test("handle interactive configuration on CLI", async () => {
    await runCLIWithInputs(cli, {
      inputs: [
        // Where Would You like to Create Your Application?
        keys.ENTER,
        // Select a JavsScript library for UI (Use arrow keys)
        keys.ENTER,
        // Select an API Solution (Use arrow keys)
        keys.ENTER,
        // Select module do you want to use
        keys.ENTER,
        // Add Testing codes for Catching bugs early?
        keys.ENTER,
        // Add Vitest for Unit Testing?
        keys.ENTER,
        // Add Storybook for Visual Testing?
        keys.ENTER,
        // Add Playwright for End-To-End Testing?
        keys.ENTER,
        // Add Prettier for Code Formatting?
        keys.ENTER,
      ],
    });
  });
});
