#!/usr/bin/env node

import os from "node:os";
import path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import degit from "degit";
import { degitConfig, eslintPackages } from "./constants";
import { deepMergeObjects } from "./helpers/deep-merge-objects";
import {
  type UserInputTests,
  promptAppDir,
  promptUserInput,
} from "./helpers/prompt";

const help = `
Create a new codes for front-end app

  Usage:
    $ npx create-codes [<dir>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;
const CONFIG_TEMPLATES = path.resolve(__dirname, "../templates");
const TEMP_DIR = path.resolve(__dirname, "temp");
const EXCLUDE = [
  "node_modules",
  "vite.config.ts",
  "package.json",
  "tsconfig.json",
  "README.md",
];

/**
 * Clone selected project template from repository into a temporary directory.
 */
async function cloneTemplateToTempDir(templateName: string) {
  await new Promise((resolve, reject) => {
    const { user, repo, examplesDir, ref } = degitConfig;

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
}

/**
 * Copy the project base into the target app directory.
 */
function copyBase(
  appDir: string,
  packageObjs: Record<string, unknown>,
  useEslint: boolean
) {
  const baseSourceDir = path.resolve(TEMP_DIR, "base");

  // FIXME: temporary processing, It would be good to refer to it from config files in the cli templates as well as others.
  const baseExclude = useEslint
    ? EXCLUDE
    : [...EXCLUDE, ".eslintrc.js", ".eslintignore"];

  fse.copySync(baseSourceDir, appDir, {
    filter: (src) => !baseExclude.includes(path.basename(src)),
  });

  packageObjs = deepMergeObjects(
    packageObjs,
    fse.readJsonSync(path.join(baseSourceDir, "package.json"))
  );

  return packageObjs;
}

/**
 * Copy the selected modules into the target app directory.
 */
function copyModules(appDir: string, apiSolution: string, useTests: boolean) {
  // TODO: Copy modules (currently only copying the API solution)
  fse.copySync(
    path.resolve(TEMP_DIR, `module-api-${apiSolution}`),
    path.resolve(appDir, "src/modules"),
    {
      filter: (src) => {
        if (!useTests && /$(?<=\.test\.(ts|tsx))/.test(src)) return false;
        return !EXCLUDE.includes(path.basename(src));
      },
    }
  );
}

/**
 * Copy the selected test packages into the target app directory.
 */
async function copyTests(
  tests: UserInputTests,
  jsLibrary: string,
  appDir: string,
  sharedConfigDir: string,
  packageObjs: Record<string, unknown>
) {
  const configDir = path.resolve(CONFIG_TEMPLATES, jsLibrary);

  if (tests.useVitest) {
    const sourceDir = path.resolve(TEMP_DIR, "testing-vitest");
    const packages = path.join(configDir, "vitest", "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !EXCLUDE.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  if (tests.useStorybook) {
    const sourceDir = path.resolve(TEMP_DIR, "testing-storybook");
    const packages = path.join(configDir, "storybook", "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !EXCLUDE.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  if (tests.useE2E) {
    // Copy example test cases
    const e2eTestingDir = path.resolve(TEMP_DIR, "__tests__");
    await new Promise((resolve, reject) => {
      const { user, repo, e2eDir, ref } = degitConfig;

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
      filter: (src) => !EXCLUDE.includes(path.basename(src)),
    });

    // Merge package.json
    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  if (tests.usePrettier) {
    const sourceDir = path.resolve(sharedConfigDir, "prettier");
    const packages = path.join(sourceDir, "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !EXCLUDE.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  return packageObjs;
}

/**
 * Copy common files into the target app directory
 */
function copyCommon(
  appDir: string,
  sharedConfigDir: string,
  packageObjs: Record<string, unknown>
) {
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
}

/**
 * Remove ESLint-related config from output project files.
 */
function removeEslintConfig() {
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

async function run() {
  const { input } = meow(help, {
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      version: { type: "boolean", default: false, alias: "v" },
    },
  });

  const [dir] = input;

  console.log("\nCreate Codes\n");
  console.log("Welcome!\n");

  const appDir = path.resolve(process.cwd(), dir ? dir : await promptAppDir());
  const sharedConfigDir = path.resolve(CONFIG_TEMPLATES, "__shared");
  const { jsLibrary, apiSolution, modules, tests } = await promptUserInput();

  const templateName = jsLibrary;
  await cloneTemplateToTempDir(templateName);

  let packageObjs: Record<string, unknown> = {};

  // Copy base codes
  packageObjs = copyBase(appDir, packageObjs, tests?.useEslint ?? false);

  // Copy modules
  copyModules(appDir, apiSolution, tests !== null);

  // Copy testing libraries
  if (tests !== null) {
    packageObjs = await copyTests(
      tests,
      jsLibrary,
      appDir,
      sharedConfigDir,
      packageObjs
    );
  }

  // FIXME: temporary processing, It would be good to refer to it from package.json under cli templates as well as others.
  if (!tests?.useEslint) {
    removeEslintConfig();
  }

  // Copy commons
  copyCommon(appDir, sharedConfigDir, packageObjs);

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
