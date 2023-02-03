import { defineConfig } from "vite";
import path from "node:path";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [solidPlugin()],
  build: { target: "esnext" },
});
