#!/usr/bin/env node

import meow from "meow";

const help = `
  Usage:
    $ npx create-codes [<dir>] [<lib>] [flags...]

  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;

function run() {
  meow(help, {
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      version: { type: "boolean", default: false, alias: "v" },
    },
  });
}
run();
