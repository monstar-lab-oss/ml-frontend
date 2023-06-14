import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  format: ["cjs"],
  clean: true,
  define: {
    "process.env.REF_NAME": `"${process.env.REF_NAME}"`,
  },
  ...options,
}));
