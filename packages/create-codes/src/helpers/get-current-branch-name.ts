import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

function executeGitCommand(command: string[]) {
  return execFileSync("git", [...command], {
    encoding: "utf-8",
    cwd: resolve(__dirname, ".."),
  });
}

export async function getCurrentBranchName() {
  const currentBranch = executeGitCommand(["branch", "--show-current"]).trim();
  const isRemote = executeGitCommand(["ls-remote", "origin", currentBranch]);

  return isRemote ? currentBranch : "main";
}
