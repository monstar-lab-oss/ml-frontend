#!/usr/bin/env node

import os from "node:os";
import path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import gradient from "gradient-string";
import chalk from "chalk";
import tinycolor from "tinycolor2";
import degit from "degit";
import {
  intro,
  outro,
  select,
  spinner,
  isCancel,
  cancel,
  text,
  multiselect,
  note,
} from "@clack/prompts";
import {
  degitConfig,
  eslintPackages,
  JSLibrary,
  CLIOptions,
} from "./constants";
import { deepMergeObjects } from "./helpers/deep-merge-objects";

const introTitle = `${chalk.bold(
  gradient(tinycolor("#E3F2FD").triad())("≛ Create Codes")
)} :: Write less boilerplate, focus on the your front-end magic.`;

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
  const { input } = meow(help, {
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      version: { type: "boolean", default: false, alias: "v" },
    },
  });

  const [dir] = input;

  console.log();
  intro(introTitle);

  // App directory
  const whereDir = await text({
    message: "Where would you like to create your app?",
    placeholder: "./my-app",
  });
  if (isCancel(whereDir)) return exit();

  const appDir = path.resolve(process.cwd(), dir ? dir : whereDir);

  // JavaScript library
  const jsLibrary = (await select({
    message: "Select a JavsScript library for UI",
    options: (Object.keys(CLIOptions) as JSLibrary[]).map((key) => ({
      value: key,
      label: CLIOptions[key].name,
    })),
    initialValue: "solid",
  })) as JSLibrary;
  if (isCancel(jsLibrary)) return exit();

  // API
  const apiSolution = await select({
    message: "Select an API solution",
    options: CLIOptions[jsLibrary].apiSolution,
    initialValue: "restful",
  });
  if (isCancel(apiSolution)) return exit();

  // App modules
  const useModules = await multiselect({
    message: "Select the app features you want to use",
    options: CLIOptions[jsLibrary].useModules,
    initialValue: "crud",
  });
  if (isCancel(useModules)) return exit();

  // Testing tools
  const useCodeTesting = await multiselect({
    message: "Select the testing type that you want to use",
    options: [
      { label: "Vitest for Unit testing", value: "needsVitest" },
      { label: "Storybook for visual testing", value: "needsStorybook" },
      { label: "Playwright for end-to-end testing", value: "needsPlaywright" },
    ],
  });
  if (isCancel(useCodeTesting)) return exit();

  // Additional tools
  const useCodeQuality = await multiselect({
    message: "Select tools that help with code quality",
    options: [
      { label: "ESLint for code linting", value: "needsESLint" },
      { label: "Prettier for code formatting", value: "needsPrettier" },
    ],
  });
  if (isCancel(useCodeQuality)) return exit();

  // options
  const needsVitest = useCodeTesting.includes("needsVitest");
  const needsStorybook = useCodeTesting.includes("needsStorybook");
  const needsPlaywright = useCodeTesting.includes("needsPlaywright");
  const needsESLint = useCodeQuality.includes("needsESLint");
  const needsPrettier = useCodeQuality.includes("needsPrettier");

  const templateName = jsLibrary;
  const TEMP_DIR = path.resolve(__dirname, "temp");

  let packageObjs: Record<string, unknown> = {};

  const s = spinner();
  s.start("Downloading Templates files");

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

  s.stop("Downloaded Templates files");

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
  const baseExclude = useCodeQuality.includes("needsESLint")
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
        if (!needsVitest && /$(?<=\.test\.(ts|tsx))/.test(src)) return false;
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

  // TODO: add some example codes
  if (needsPlaywright) {
    const sourceDir = path.resolve(sharedConfigDir, "playwright");
    const packages = path.join(sourceDir, "package.json");

    fse.copySync(sourceDir, appDir, {
      filter: (src) => !exclude.includes(path.basename(src)),
    });

    packageObjs = deepMergeObjects(packageObjs, fse.readJsonSync(packages));
  }

  // FIXME: temporary processing, It would be good to refer to it from package.json under cli templates as well as others.
  if (!needsESLint) {
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

  let nextSteps = `Inside this directory, you can run:

  pnpm dev
    Develop your app with development server
  
  pnpm build
    Build directory with a production build of your app`;

  note(nextSteps, `Success! Created a new app at "${path.basename(appDir)}"`);
  outro(chalk.underline(chalk.cyan("Happy hacking!")));
}
run();

function exit() {
  cancel("Cancelled");
  return process.exit(0);
}
