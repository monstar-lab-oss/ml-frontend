import { describe, test, expect } from "vitest";
import path from "node:path";
import child from "node:child_process";
import util from "node:util";

const exe = util.promisify(child.execFile);

const createCodes = path.resolve(__dirname, "../dist/index.js");

const EXPECTED_HELP = `Usage:
    $ npx create-codes [<dir>] [<lib>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script`;

describe("create-codes cli", () => {
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
