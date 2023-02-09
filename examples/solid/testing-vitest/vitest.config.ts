import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";
import path from "node:path";

export default defineConfig({
  plugins: [solid()],
  test: {
    // solid needs to be inline to work around
    // refs https://github.com/solidjs/solid-testing-library/issues/10
    deps: { inline: [/solid-js/] },
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "vitest.setup.ts"),
  },
});