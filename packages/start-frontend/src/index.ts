#!/usr/bin/env node
import { format } from "prettier";
import fse from "fs-extra";
import meow from "meow";
import os from "node:os";
import path from "node:path";
import { degitConfig, eslintPackages } from "./constants";
import { deepMergeObjects } from "./helpers/deep-merge-objects";
import { cloneFromRepo } from "./helpers/degit";
import { removeWorkspacePackages } from "./helpers/remove-workspace-packages";
import {
  promptClack,
  propmtClackDir,
  type UserInputTests,
} from "./helpers/prompt-clack";

const help = `
Create a new codes for front-end app

  Usage:
    $ npx start-frontend [<dir>] [flags...]

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

let packageObjs: Record<string, unknown> = {};
let tsconfigObjs: Record<string, unknown> = {};

/**
 * Clone selected project template from repository into a temporary directory.
 */
async function cloneTemplateToTempDir(templateName: string) {
  const { user, repo, codeDir, ref } = degitConfig;
  await cloneFromRepo(
    `${user}/${repo}/${codeDir}/${templateName}#${ref}`,
    TEMP_DIR
  );
}

/**
 * Copy the project base into the target app directory.
 */
function copyBase(appDir: string, useEslint: boolean) {
  const baseSourceDir = path.resolve(TEMP_DIR, "base");

  // FIXME: temporary processing, It would be good to refer to it from config files in the cli templates as well as others.
  const baseExclude = useEslint
    ? EXCLUDE
    : [...EXCLUDE, ".eslintrc.js", ".eslintrc.cjs", ".eslintignore"];

  fse.copySync(baseSourceDir, appDir, {
    filter: (src) => !baseExclude.includes(path.basename(src)),
  });

  fse.copySync(
    path.resolve(baseSourceDir, "vite.config.ts"),
    path.resolve(appDir, "vite.config.ts")
  );

  fse.copySync(
    path.resolve(baseSourceDir, "tsconfig.json"),
    path.resolve(appDir, "tsconfig.json")
  );

  packageObjs = deepMergeObjects(
    packageObjs,
    fse.readJsonSync(path.join(baseSourceDir, "package.json"))
  );

  tsconfigObjs = deepMergeObjects(
    tsconfigObjs,
    fse.readJsonSync(path.join(baseSourceDir, "tsconfig.json"))
  );

  return packageObjs;
}

/**
 * Copy the selected mock handlers into the target app directory.
 */
async function copyApiMocks(
  appDir: string,
  apiSolution: "graphql" | "restful",
  sharedConfigDir: string
) {
  const mockTempDir = path.resolve(TEMP_DIR, "__mocks__");
  const { user, repo, mockDir, ref } = degitConfig;
  await cloneFromRepo(
    `${user}/${repo}/${mockDir}/handlers-${apiSolution}#${ref}`,
    path.resolve(TEMP_DIR, "__mocks__")
  );

  // Copy mock files for the specific api solution.
  const mockSourceDir = path.resolve(mockTempDir);
  const mockDestDir = path.resolve(appDir, "__mocks__");

  fse.copySync(mockSourceDir, mockDestDir);

  fse.copySync(`${sharedConfigDir}/__mocks__`, `${appDir}/__mocks__`, {
    overwrite: true,
  });
}

/**
 * Copy the selected modules into the target app directory.
 */
function copyModules(
  appDir: string,
  apiSolution: string,
  useUnitTests: boolean
) {
  // Currently, there is only an API module, so this is sufficient.
  // However, I want to make it flexible enough to accommodate additional modules in the future.
  const moduleDir = path.resolve(TEMP_DIR, `module-api-${apiSolution}`);
  const packages = path.join(moduleDir, "package.json");

  fse.copySync(
    path.resolve(moduleDir, "src"),
    path.resolve(appDir, `src/modules/${apiSolution}`),
    {
      filter: (src) => {
        if (!useUnitTests && /$(?<=\.test\.(ts|tsx))/.test(src)) return false;
        return !EXCLUDE.includes(path.basename(src));
      },
    }
  );

  // Merge package.json
  packageObjs = deepMergeObjects(packageObjs, {
    dependencies: fse.readJsonSync(packages).dependencies,
  });
}

/**
 * Copy the selected test packages into the target app directory.
 */
async function copyTests(
  tests: UserInputTests,
  jsLibrary: string,
  appDir: string,
  sharedConfigDir: string
) {
  const configDir = path.resolve(CONFIG_TEMPLATES, jsLibrary);

  if (tests.useVitest) {
    const sourceDir = path.resolve(TEMP_DIR, "testing-vitest");
    const packages = path.join(configDir, "vitest", "package.json");
    const tsconfig = path.join(configDir, "vitest", "tsconfig.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !EXCLUDE.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
    tsconfigObjs = deepMergeObjects(tsconfigObjs, fse.readJsonSync(tsconfig));

    // Update the import statement to the path where the mock server is set up
    const fileContent = fse.readFileSync(
      path.join(appDir, "vitest.setup.ts"),
      "utf-8"
    );
    const replaced = fileContent.replace(
      /from "mock-server"/i,
      'from "./__mocks__/server"'
    );
    fse.writeFileSync(path.join(appDir, "vitest.setup.ts"), replaced, "utf-8");
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
    const { user, repo, e2eDir, ref } = degitConfig;
    await cloneFromRepo(
      `${user}/${repo}/${e2eDir}/__tests__#${ref}`,
      path.resolve(TEMP_DIR, "__tests__")
    );

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
function copyCommon(appDir: string, sharedConfigDir: string) {
  fse.copySync(`${sharedConfigDir}/gitignore`, `${appDir}/gitignore`);

  // Rename dot files
  fse.renameSync(
    path.join(appDir, "gitignore"),
    path.join(appDir, ".gitignore")
  );

  // Rewrite package.json
  packageObjs.name = appDir.replace(/.*\//, "");

  // Remove unnecessary fields
  delete packageObjs.main;
  delete packageObjs.types;

  // Remove workspace packages from dependencies
  packageObjs.dependencies = removeWorkspacePackages(
    packageObjs.dependencies as Record<string, string>
  );
  packageObjs.devDependencies = removeWorkspacePackages(
    packageObjs.devDependencies as Record<string, string>
  );

  fse.writeJsonSync(path.join(appDir, "package.json"), packageObjs, {
    spaces: 2,
    EOL: os.EOL,
  });

  // Rewrite tsconfig.json
  fse.writeFileSync(
    path.join(appDir, "tsconfig.json"),
    format(JSON.stringify(tsconfigObjs, null, 2), { parser: "json" })
  );
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

  const appDir = path.resolve(
    process.cwd(),
    dir ? dir : await propmtClackDir()
  );
  const sharedConfigDir = path.resolve(CONFIG_TEMPLATES, "__shared");
  const { jsLibrary, apiSolution, tests, loadingStart, loadingStop } =
    await promptClack();

  // start spinner
  loadingStart();

  const templateName = jsLibrary;
  await cloneTemplateToTempDir(templateName);

  // Copy base codes
  copyBase(appDir, tests?.useEslint ?? false);

  // Copy api mocks
  copyApiMocks(appDir, apiSolution, sharedConfigDir);

  // Copy modules
  copyModules(appDir, apiSolution, tests?.useVitest ?? false);

  // Copy testing libraries
  if (tests !== null) {
    await copyTests(tests, jsLibrary, appDir, sharedConfigDir);
  }

  // FIXME: temporary processing, It would be good to refer to it from package.json under cli templates as well as others.
  if (!tests?.useEslint) {
    removeEslintConfig();
  }

  // Copy commons
  copyCommon(appDir, sharedConfigDir);

  // stop spinner
  loadingStop();
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
