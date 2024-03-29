import { describe, test, expect, beforeAll, afterAll } from "vitest";
import path from "node:path";
import fse from "fs-extra";
import child, { ChildProcessWithoutNullStreams } from "node:child_process";
import util from "node:util";
import concat from "concat-stream";
import { spawn } from "node:child_process";

const keys = {
  ENTER: "\x0D",
  DOWN: "\u001B\u005B\u0042",
};

// outside monorepo
const cwd = path.resolve(__dirname, "../../../..");

const testDir = "my-test" as const;

const exe = util.promisify(child.execFile);

const startFrontend = path.resolve(__dirname, "../dist/index.js");

const EXPECTED_HELP = `Create a new codes for front-end app

    Usage:
      $ npx start-frontend [<dir>] [flags...]

    Flags:
      --help, -h          Show this help message
      --version, -v       Show the version of this script`;

describe("start-frontend cli", () => {
  beforeAll(() => cleanupTestDir());
  afterAll(() => cleanupTestDir());

  describe("install react boilerplate with cli", () => {
    test("interactively configure", async () => {
      const cli = spawn("node", [startFrontend], { cwd });
      const results = await exeInteractive(cli, [
        testDir,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
        keys.ENTER,
      ]);

      expect(results).toContain(`start-frontend`);
      expect(results).toContain(`Welcome!`);
      expect(results).toContain(
        `? Where Would You like to Create Your Application?`
      );
      expect(results).toContain(`? Select a JavsScript library for UI`);
      expect(results).toContain(`? Select an API Solution`);
      expect(results).toContain(`? Select module do you want to use`);
      expect(results).toContain(`? Add Testing codes for Catching bugs early?`);
      expect(results).toContain(`? Add Vitest for Unit Testing?`);
      expect(results).toContain(`? Add Storybook for Visual Testing?`);
      expect(results).toContain(`? Add Playwright for End-To-End Testing?`);
      expect(results).toContain(`? Add ESLint for Code Linting?`);
      expect(results).toContain(`? Add Prettier for Code Formatting?`);
      expect(results).toContain(`Success! Created a new app at "my-test".`);
    });
  });

  // TODO: Skip testing as it is not yet implemented.
  describe.skip("install react boilerplate to specify dir", () => {
    test("install", async () => {
      await exe("node", [startFrontend, testDir], { cwd });

      const expectDirs = [
        ".env.template",
        ".eslintrc.js",
        ".gitignore",
        "README.md",
        "__mocks__",
        "babel.config.js",
        "index.html",
        "jest-setup.ts",
        "package.json",
        "public",
        "src",
        "tests",
        "tsconfig.json",
        "vite.config.ts",
        "yarn.lock",
      ];

      expect(fse.readdirSync(path.resolve(cwd, testDir))).toStrictEqual(
        expectDirs
      );
    });
  });

  describe("printing help message", () => {
    test("--help flag works", async () => {
      const { stdout } = await exe("node", [startFrontend, "--help"]);
      expect(stdout.trim()).toBe(EXPECTED_HELP);
    });

    test("-h flag works", async () => {
      const { stdout } = await exe("node", [startFrontend, "-h"]);
      expect(stdout.trim()).toBe(EXPECTED_HELP);
    });
  });

  describe("printing version", () => {
    test("--version flag works", async () => {
      const { stdout } = await exe("node", [startFrontend, "--version"]);
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      expect(stdout.trim()).toBe(process.env.npm_package_version);
    });

    test("-v flag works", async () => {
      const { stdout } = await exe("node", [startFrontend, "-v"]);
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      expect(stdout.trim()).toBe(process.env.npm_package_version);
    });
  });
});

function cleanupTestDir() {
  const installedTestDir = path.resolve(cwd, testDir);

  fse.existsSync(installedTestDir) &&
    fse.rmSync(installedTestDir, { recursive: true });
}
// FIXME: Displaying loading in the process of cli execution cause test errors.
function exeInteractive(
  cli: ChildProcessWithoutNullStreams,
  inputs: string[] = [],
  delay: number = 200
) {
  let currentInputTimeout: NodeJS.Timeout;

  cli.stdin.setDefaultEncoding("utf-8");

  const loop = (inputs: string[]) => {
    if (!inputs.length) return void cli.stdin.end();

    currentInputTimeout = setTimeout(() => {
      cli.stdin.write(inputs[0]);
      loop(inputs.slice(1));
    }, delay);
  };

  return new Promise((resolve, reject) => {
    cli.stderr.once("data", (err) => {
      cli.stdin.end();

      if (currentInputTimeout) clearTimeout(currentInputTimeout);
      reject(err.toString());
    });

    cli.on("error", reject);

    loop(inputs);

    cli.stdout.pipe(
      concat((result: Buffer) => resolve(result.toString("utf-8")))
    );
  });
}
