import { describe, test, expect, beforeAll, afterAll } from "vitest";
import path from "node:path";
import fse from "fs-extra";
import child, { ChildProcessWithoutNullStreams } from "node:child_process";
import util from "node:util";
import concat from "concat-stream";
import { spawn } from "node:child_process";

const keys = {
  ENTER: "\x0D",
};

// outside monorepo
const cwd = path.resolve(__dirname, "../../../..");

const testDir = "my-test" as const;

const exe = util.promisify(child.execFile);

const createCodes = path.resolve(__dirname, "../dist/index.js");

const EXPECTED_HELP = `Create a new codes for front-end app

    Usage:
      $ npx create-codes [<dir>] [flags...]

    Flags:
      --help, -h          Show this help message
      --version, -v       Show the version of this script`;

describe("create-codes cli", () => {
  beforeAll(() => cleanupTestDir());
  afterAll(() => cleanupTestDir());

  describe("install react boilerplate with cli", () => {
    test("interactively configure", async () => {
      const cli = spawn("node", [createCodes], { cwd });
      const results = await exeInteractive(cli, [testDir, keys.ENTER]);

      expect(results).toContain(`Create Codes`);
      expect(results).toContain(`Welcome!`);
      expect(results).toContain(`? Where would you like to create your app?`);
      expect(results).toContain(`Success! Created a new app at "my-test".`);
    });
  });

  describe("install react boilerplate to specify dir", () => {
    test("install", async () => {
      await exe("node", [createCodes, testDir]);

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
        "playwright.config.ts",
        "public",
        "src",
        "tests",
        "tsconfig.json",
        "vite.config.ts",
        "yarn.lock",
      ];

      expect(fse.readdirSync(testDir)).toStrictEqual(expectDirs);
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

function cleanupTestDir() {
  const installedTestDir = path.resolve(cwd, testDir);

  fse.existsSync(installedTestDir) &&
    fse.rmSync(installedTestDir, { recursive: true });
}

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
