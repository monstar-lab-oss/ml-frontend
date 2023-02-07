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
  // TODO: [list] Select a UI library
  // TODO: [list] Add an API Solution?
  // TODO: [checkbox] Select module do you want to use
  // TODO: [confirm] Add Zustand for State Management?
  // TODO: [confirm] Add Router for Single Page Application Development?
  // TODO: [confirm] Add Vitest for Unit Testing?
  // TODO: [confirm] Add Storybook for Visual Testing?
  // TODO: [confirm] Add Playwright for End-To-End Testing?
  // TODO: [confirm] Add Eslint for Code Linting?
  // TODO: [confirm] Add Prettier for Code Formatting?

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
