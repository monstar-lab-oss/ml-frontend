#!/usr/bin/env node

import os from "node:os";
import path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import inquirer from "inquirer";
import degit from "degit";
import { degitConfig, eslintPackages } from "./constants";

const help = `
Create a new codes for front-end app

  Usage:
    $ npx create-codes [<dir>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;
const TEMPLATE_DIR = path.resolve(__dirname, "../templates");
const TEMPLATE_SHARE_DIR = path.resolve(__dirname, "../templates/__shared");

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
    await inquirer.prompt<{ jsLibrary: string }>([
      {
        type: "list",
        name: "jsLibrary",
        message: "Select a JavsScript library for UI",
        choices: [
          // TODO: Comment out the modules when it is ready to copy.
          // { name: "React" },
          // { name: "Vue" },
          // { name: "Next.js" },
          { name: "Solid" },
        ],
        default: 0,
        filter: (val: string) => val.toLowerCase().replace(/\./g, ""),
      },
    ])
  ).jsLibrary;

  // TODO:
  const apiSolution = (
    await inquirer.prompt<{ apiSolution: string }>([
      {
        type: "list",
        name: "apiSolution",
        message: "Select an API Solution",
        choices: [
          { name: "RESTful", value: "restful" },
          { name: "GraphQL", value: "graphql" },
        ],
        default: "restful",
      },
    ])
  ).apiSolution;

  // TODO: MAYBE
  // const useModules = (
  //   await inquirer.prompt<{ useModules: string[] }>([
  //     {
  //       type: "checkbox",
  //       name: "useModules",
  //       message: "Select module do you want to use",
  //       choices: [
  //         { name: "module name1", value: "module1" },
  //         { name: "module name2", value: "module2" },
  //         { name: "module name3", value: "module3" },
  //       ],
  //     },
  //   ])
  // ).useModules;

  // TODO: MAYBE
  // const hasStore = (
  //   await inquirer.prompt<{ hasStore: boolean }>([
  //     {
  //       type: "confirm",
  //       name: "hasStore",
  //       message: "Add Zustand for State Management?",
  //       default: true,
  //     },
  //   ])
  // ).hasStore;

  // TODO: MAYBE
  // const hasRouter = (
  //   await inquirer.prompt<{ hasRouter: boolean }>([
  //     {
  //       type: "confirm",
  //       name: "hasRouter",
  //       message: "Add Router for Single Page Application Development?",
  //       default: true,
  //     },
  //   ])
  // ).hasRouter;

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

  // TODO:
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

  // Copy base
  fse.copySync(path.resolve(TEMP_DIR, "base"), appDir);

  // package.json
  const packageJson = path.resolve(appDir, "package.json");
  const packageObj = fse.readJsonSync(packageJson);

  const exclude = [
    "node_modules",
    "vite.config.ts",
    "package.json",
    "tsconfig.json",
    "README.md",
  ];

  // Copy modules
  fse.copySync(
    path.resolve(TEMP_DIR, `module-api-${apiSolution}`),
    path.resolve(appDir, "src/modules"),
    {
      filter: (src) => {
        return !exclude.includes(path.basename(src));
      },
    }
  );

  // Copy testing libraries
  if (needsVitest) {
    fse.copySync(path.resolve(TEMP_DIR, `testing-vitest`), appDir, {
      filter: (src) => {
        return !exclude.includes(path.basename(src));
      },
    });
  }

  if (needsStorybook) {
    fse.copySync(path.resolve(TEMP_DIR, `testing-storybook`), appDir, {
      filter: (src) => {
        return !exclude.includes(path.basename(src));
      },
    });

    const storybookDir = path.resolve(TEMPLATE_DIR, `storybook-${jsLibrary}`);

    const { devDependencies, scripts } = fse.readJsonSync(
      path.resolve(storybookDir, "package.json")
    );

    packageObj.scripts = {
      ...packageObj.scripts,
      ...scripts,
    };

    packageObj.devDependencies = {
      ...packageObj.devDependencies,
      ...devDependencies,
    };
  }

  if (needsE2eTesting) {
    const playwrightDir = path.resolve(TEMPLATE_SHARE_DIR, "playwright");
    fse.copySync(playwrightDir, appDir, {
      filter: (src) => path.basename(src) !== "package.json",
    });

    const { devDependencies, scripts } = fse.readJsonSync(
      path.resolve(playwrightDir, "package.json")
    );

    packageObj.scripts = {
      ...packageObj.scripts,
      ...scripts,
    };

    packageObj.devDependencies = {
      ...packageObj.devDependencies,
      ...devDependencies,
    };

    // TODO: add some test codes
  }

  if (!needsEslint) {
    fse.removeSync(path.resolve(appDir, ".eslintrc.js"));

    delete packageObj.scripts.lint;

    Object.keys(packageObj.devDependencies).forEach((key) => {
      eslintPackages.includes(key) && delete packageObj.devDependencies[key];
    });
  }

  if (needsPrettier) {
    const prettierDir = path.resolve(TEMPLATE_SHARE_DIR, "prettier");

    fse.copySync(prettierDir, appDir, {
      filter: (src) => path.basename(src) !== "package.json",
    });

    const { devDependencies } = fse.readJsonSync(
      path.resolve(prettierDir, "package.json")
    );

    packageObj.devDependencies = {
      ...packageObj.devDependencies,
      ...devDependencies,
    };
  }

  // Copy commons
  fse.copySync(`${TEMPLATE_SHARE_DIR}/gitignore`, `${appDir}/gitignore`);

  // Rename dot files
  fse.renameSync(
    path.join(appDir, "gitignore"),
    path.join(appDir, ".gitignore")
  );

  // Rewrite package.json
  fse.writeJsonSync(packageJson, packageObj, { spaces: 2, EOL: os.EOL });

  console.log();
  console.log(`Success! Created a new app at "${path.basename(appDir)}".`);
  console.log("Inside this directory, you can run:");
  console.log();
  console.log(`  pnpm run build`);
  console.log(`     Build directory with a production build of your app`);
  console.log();
  console.log(`  pnpm run dev`);
  console.log(`     Develop your app with development server`);
  console.log();
}
run();
