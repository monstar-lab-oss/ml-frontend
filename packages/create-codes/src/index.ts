#!/usr/bin/env node

import path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import inquirer from "inquirer";

const help = `
Create a new codes for front-end app

  Usage:
    $ npx create-codes [<dir>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;

const TEMPLATE_DIR = path.resolve(__dirname, "../templates/react");
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
              message: "Where would you like to create your app?",
              default: "./my-app",
            },
          ])
        ).dir
  );

  fse.copySync(TEMPLATE_DIR, appDir, {
    filter: (src) =>
      !["node_modules", "dist", "turbo"].includes(path.basename(src)),
  });
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
