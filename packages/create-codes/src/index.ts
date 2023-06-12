#!/usr/bin/env node

import os from "node:os";
import path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import inquirer from "inquirer";
import degit from "degit";
import {
  degitConfig,
  eslintPackages,
  JSLibrary,
  CLIOptions,
} from "./constants";
import { deepMergeObjects } from "./helpers/deep-merge-objects";
import { getCurrentBranchName } from "./helpers/get-current-branch-name";

const help = `
Create a new codes for front-end app

  Usage:
    $ npx create-codes [<dir>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;
const CONFIG_TEMPLATES = path.resolve(__dirname, "../templates");

async function run() {
  const ref = await getCurrentBranchName();

  const { input } = meow(help, {
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      version: { type: "boolean", default: false, alias: "v" },
    },
  });

  const [dir] = input;

  console.log("\nCreate Codes\n");
  console.log("Welcome!\n");

  const appDir = path.resolve(
    process.cwd(),
    dir
      ? dir
      : (
          await inquirer.prompt<{ dir: string }>([
            {
              type: "input",
              name: "dir",
              message: "Where Would You like to Create Your Application?",
              default: "./my-app",
            },
          ])
        ).dir
  );

  const jsLibrary = (
    await inquirer.prompt<{ jsLibrary: JSLibrary }>([
      {
        type: "list",
        name: "jsLibrary",
        message: "Select a JavsScript library for UI",
        choices: (Object.keys(CLIOptions) as JSLibrary[]).map(
          (key) => CLIOptions[key].name
        ),
        default: 0,
        filter: (val: string) => val.toLowerCase().replace(/\./g, ""),
      },
    ])
  ).jsLibrary;

  const apiSolution = (
    await inquirer.prompt<{ apiSolution: string }>([
      {
        type: "list",
        name: "apiSolution",
        message: "Select an API Solution",
        choices: CLIOptions[jsLibrary].apiSolution,
        default: "restful",
      },
    ])
  ).apiSolution;

  // TODO: Use modules
  // eslint-disable-next-line no-unused-vars
  const useModules = (
    await inquirer.prompt<{ useModules: string[] }>([
      {
        type: "checkbox",
        name: "useModules",
        message: "Select module do you want to use",
        choices: CLIOptions[jsLibrary].useModules,
      },
    ])
  ).useModules;

  const needsTesting = (
    await inquirer.prompt<{ needsTesting: boolean }>([
      {
        type: "confirm",
        name: "needsTesting",
        message: "Add Testing codes for Catching bugs early?",
        default: true,
      },
    ])
  ).needsTesting;

  const needsVitest = (
    await inquirer.prompt<{ needsVitest?: boolean }>([
      {
        type: "confirm",
        name: "needsVitest",
        message: "Add Vitest for Unit Testing?",
        default: true,
        when: () => needsTesting,
      },
    ])
  ).needsVitest;

  const needsStorybook = (
    await inquirer.prompt<{ needsStorybook?: boolean }>([
      {
        type: "confirm",
        name: "needsStorybook",
        message: "Add Storybook for Visual Testing?",
        default: true,
        when: () => !!needsTesting,
      },
    ])
  ).needsStorybook;

  const needsE2eTesting = (
    await inquirer.prompt<{ needsE2eTesting?: boolean }>([
      {
        type: "confirm",
        name: "needsE2eTesting",
        message: "Add Playwright for End-To-End Testing?",
        default: true,
        when: () => needsTesting,
      },
    ])
  ).needsE2eTesting;

  const needsEslint = (
    await inquirer.prompt<{ needsEslint?: boolean }>([
      {
        type: "confirm",
        name: "needsEslint",
        message: "Add ESLint for Code Linting?",
        default: true,
        when: () => needsTesting,
      },
    ])
  ).needsEslint;

  const needsPrettier = (
    await inquirer.prompt<{ needsPrettier?: boolean }>([
      {
        type: "confirm",
        name: "needsPrettier",
        message: "Add Prettier for Code Formatting?",
        default: true,
        when: () => needsTesting,
      },
    ])
  ).needsPrettier;

  const templateName = jsLibrary;
  const TEMP_DIR = path.resolve(__dirname, "temp");

  let packageObjs: Record<string, unknown> = {};

  await new Promise((resolve, reject) => {
    const { user, repo, examplesDir } = degitConfig;

    const emitter = degit(
      `${user}/${repo}/${examplesDir}/${templateName}#${ref}`,
      {
        cache: false,
        force: true,
        verbose: true,
      }
    );
    emitter.on("warn", (err) => reject(err));
    emitter.clone(TEMP_DIR).then(() => resolve({}));
  });

  const exclude = [
    "node_modules",
    "vite.config.ts",
    "package.json",
    "tsconfig.json",
    "README.md",
  ];

  // Copy base codes
  const baseSourceDir = path.resolve(TEMP_DIR, "base");
  // FIXME: temporary processing, It would be good to refer to it from config files in the cli templates as well as others.
  const baseExclude = needsEslint
    ? exclude
    : [...exclude, ".eslintrc.js", ".eslintignore"];

  fse.copySync(baseSourceDir, appDir, {
    filter: (src) => !baseExclude.includes(path.basename(src)),
  });

  packageObjs = deepMergeObjects(
    packageObjs,
    fse.readJsonSync(path.join(baseSourceDir, "package.json"))
  );

  const configDir = path.resolve(CONFIG_TEMPLATES, jsLibrary);
  const sharedConfigDir = path.resolve(CONFIG_TEMPLATES, "__shared");

  // TODO: Copy modules
  fse.copySync(
    path.resolve(TEMP_DIR, `module-api-${apiSolution}`),
    path.resolve(appDir, "src/modules"),
    {
      filter: (src) => {
        if (!needsTesting && /$(?<=\.test\.(ts|tsx))/.test(src)) return false;
        return !exclude.includes(path.basename(src));
      },
    }
  );

  // Copy testing libraries
  if (needsVitest) {
    const sourceDir = path.resolve(TEMP_DIR, "testing-vitest");
    const packages = path.join(configDir, "vitest", "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !exclude.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  if (needsStorybook) {
    const sourceDir = path.resolve(TEMP_DIR, "testing-storybook");
    const packages = path.join(configDir, "storybook", "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !exclude.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  if (needsE2eTesting) {
    // Copy example test cases
    const e2eTestingDir = path.resolve(TEMP_DIR, "__tests__");
    await new Promise((resolve, reject) => {
      const { user, repo, e2eDir } = degitConfig;

      // Retrieve e2e test sample files
      const e2eTestingDirEmitter = degit(
        `${user}/${repo}/${e2eDir}/__tests__#${ref}`,
        {
          cache: false,
          force: true,
          verbose: true,
        }
      );
      e2eTestingDirEmitter.on("warn", (err) => reject(err));
      e2eTestingDirEmitter
        .clone(path.resolve(TEMP_DIR, "__tests__"))
        .then(() => resolve({}));
    });

    // Copy library-specific e2e test files
    const e2eSourceDir = path.resolve(e2eTestingDir, jsLibrary);
    const e2eDestDir = path.resolve(appDir, "__tests__");
    fse.copySync(e2eSourceDir, e2eDestDir);

    // Copy util for e2e testing
    const utilSourceDir = path.resolve(e2eTestingDir, "utils");
    const utilDestDir = path.resolve(appDir, "__tests__/utils");
    fse.copySync(utilSourceDir, utilDestDir);

    // Copy E2E config
    const sourceDir = path.resolve(sharedConfigDir, "playwright");
    const packages = path.join(sourceDir, "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !exclude.includes(path.basename(src)),
    });

    // Merge package.json
    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  // FIXME: temporary processing, It would be good to refer to it from package.json under cli templates as well as others.
  if (!needsEslint) {
    // TODO: copy .eslintignore from base
    // fse.removeSync(path.resolve(appDir, ".eslintrc.js"));
    //@ts-expect-error
    delete packageObjs.scripts.lint;
    //@ts-expect-error
    Object.keys(packageObjs.devDependencies).forEach((key) => {
      //@ts-expect-error
      eslintPackages.includes(key) && delete packageObjs.devDependencies[key];
    });
  }

  if (needsPrettier) {
    const sourceDir = path.resolve(sharedConfigDir, "prettier");
    const packages = path.join(sourceDir, "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !exclude.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  // Copy commons
  fse.copySync(`${sharedConfigDir}/gitignore`, `${appDir}/gitignore`);
  // FIXME: reuse codes with internal package
  fse.copySync(`${sharedConfigDir}/__mocks__`, `${appDir}/__mocks__`, {
    overwrite: true,
  });
  // Rename dot files
  fse.renameSync(
    path.join(appDir, "gitignore"),
    path.join(appDir, ".gitignore")
  );

  // Rewrite package.json
  fse.writeJsonSync(path.join(appDir, "package.json"), packageObjs, {
    spaces: 2,
    EOL: os.EOL,
  });

  console.log();
  console.log(`Success! Created a new app at "${path.basename(appDir)}".`);
  console.log("Inside this directory, you can run:");
  console.log();
  console.log(`  pnpm install`);
  console.log(`     Install the required packages for the app`);
  console.log(`     * Required before running 'build' or 'dev'`);
  console.log();
  console.log(`  pnpm run build`);
  console.log(`     Generate a production build of your app`);
  console.log();
  console.log(`  pnpm run dev`);
  console.log(`     Start a local development server`);
  console.log();
}
run();
