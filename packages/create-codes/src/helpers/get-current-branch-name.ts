import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

export function getCurrentBranchName() {
  return execFileSync("git", ["branch", "--show-current"], {
    encoding: "utf-8",
    cwd: resolve(__dirname, ".."),
  }).trim();
}
