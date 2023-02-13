import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
      __mocks__: fileURLToPath(new URL("__mocks__", import.meta.url)),
    },
  },
});
