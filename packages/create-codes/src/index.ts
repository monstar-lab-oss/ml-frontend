#!/usr/bin/env node

import path from "node:path";
import fse from "fs-extra";
import meow from "meow";

const help = `
  Usage:
    $ npx create-codes [<dir>] [<lib>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;

const required_dir_message = `
Please specify the directory:
  npx create-codes <directory>
`;

const TEMPLATE_DIR = path.resolve(__dirname, "../templates/react");
const TEMPLATE_SHARE_DIR = path.resolve(__dirname, "../templates/__shared");

function run() {
  const { input } = meow(help, {
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      version: { type: "boolean", default: false, alias: "v" },
    },
  });

  const [dir] = input;
  if (!dir) return console.log(required_dir_message);

  const appDir = path.resolve(process.cwd(), dir);

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
}
run();
