#!/usr/bin/env node

import path from "node:path";
import { userPrompt } from "./user-prompt";
import { generateCode } from "./generate-code";
import { intro, outro } from "@clack/prompts";

async function main() {
  intro(":: Start message ::");

  const { dir, ...answer } = await userPrompt();
  const destBasePath = path?.resolve(process.cwd(), dir);

  generateCode({ destBasePath, ...answer });

  outro(":: Outro message ::");
}

main();
