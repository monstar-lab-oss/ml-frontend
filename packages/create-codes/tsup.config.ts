import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  format: ["cjs"],
  clean: true,
  define: {
    "process.env.BRANCH_NAME": `"${process.env.BRANCH_NAME}"`,
  },
  ...options,
}));
