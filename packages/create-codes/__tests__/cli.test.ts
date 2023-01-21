import { describe, test, expect, beforeAll, afterAll } from "vitest";
import path from "node:path";
import fse from "fs-extra";
import child from "node:child_process";
import util from "node:util";

const cwd = path.resolve(__dirname, "../../../..");
const testDir = path.resolve(cwd, "my-test-dir");

const exe = util.promisify(child.execFile);

const createCodes = path.resolve(__dirname, "../dist/index.js");

const EXPECTED_HELP = `Usage:
    $ npx create-codes [<dir>] [<lib>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script`;

describe("create-codes cli", () => {
  beforeAll(() => cleanupTestDir());
  afterAll(() => cleanupTestDir());

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
  fse.existsSync(testDir) && fse.rmSync(testDir, { recursive: true });
}
