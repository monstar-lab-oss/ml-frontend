#!/usr/bin/env node

import path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import inquirer from "inquirer";
import degit from "degit";
import { degitConfig } from "./constants";

const help = `
Create a new codes for front-end app

  Usage:
    $ npx create-codes [<dir>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;

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

  // TODO:
  const jsLibrary = (
    await inquirer.prompt<{ jsLibrary: string }>([
      {
        type: "list",
        name: "jsLibrary",
        message: "Select a JavsScript library for UI",
        choices: [
          { name: "React" },
          { name: "Vue" },
          { name: "Next.js" },
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

  // TODO:
  const hasTesting = (
    await inquirer.prompt<{ hasTesting: boolean }>([
      {
        type: "confirm",
        name: "hasTesting",
        message: "Add Testing codes for Code Quality?",
        default: true,
      },
    ])
  ).hasTesting;

  // TODO:
  const hasUnitTesting = (
    await inquirer.prompt<{ hasUnitTesting?: boolean }>([
      {
        type: "confirm",
        name: "hasUnitTesting",
        message: "Add Vitest for Unit Testing?",
        default: true,
        when: () => hasTesting,
      },
    ])
  ).hasUnitTesting;

  // TODO:
  const hasVisualTesting = (
    await inquirer.prompt<{ hasVisualTesting?: boolean }>([
      {
        type: "confirm",
        name: "hasVisualTesting",
        message: "Add Storybook for Visual Testing?",
        default: true,
        when: () => !!hasTesting,
      },
    ])
  ).hasVisualTesting;

  // TODO:
  const hasE2ETesting = (
    await inquirer.prompt<{ hasE2ETesting?: boolean }>([
      {
        type: "confirm",
        name: "hasE2ETesting",
        message: "Add Playwright for End-To-End Testing?",
        default: true,
        when: () => hasTesting,
      },
    ])
  ).hasE2ETesting;

  // TODO:
  const HasLint = (
    await inquirer.prompt<{ hasLint?: boolean }>([
      {
        type: "confirm",
        name: "hasLint",
        message: "Add ESLint for Code Linting?",
        default: true,
        when: () => hasTesting,
      },
    ])
  ).hasLint;

  // TODO:
  const hasPrettier = (
    await inquirer.prompt<{ hasPrettier?: boolean }>([
      {
        type: "confirm",
        name: "hasPrettier",
        message: "Add Prettier for Code Formatting?",
        default: true,
        when: () => hasTesting,
      },
    ])
  ).hasPrettier;

  console.debug({
    jsLibrary,
    apiSolution,
    hasTesting,
    hasUnitTesting,
    hasVisualTesting,
    hasE2ETesting,
    HasLint,
    hasPrettier,
  });

  // Currently only the React is supported, but will be extended in the future.
  const templateName = "react-standard";
  const TEMPLATE_DIR = path.resolve(__dirname, "temp");

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
    emitter.clone(TEMPLATE_DIR).then(() => resolve({}));
  });

  fse.copySync(TEMPLATE_DIR, appDir);
  fse.copySync(TEMPLATE_SHARE_DIR, appDir);

  // Rename dot files
  fse.renameSync(
    path.join(appDir, "gitignore"),
    path.join(appDir, ".gitignore")
  );

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
