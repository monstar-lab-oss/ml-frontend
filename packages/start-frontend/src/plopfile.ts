import type { NodePlopAPI } from "node-plop";
import path from "node:path";

const TEMP_DIR = path.resolve(__dirname, "temp");

module.exports = function (plop: NodePlopAPI) {
  plop.setHelper("reverseEach", (ctx, { fn }) =>
    ctx.reverse().map(fn).join("")
  );

  plop.setGenerator("constructBase", {
    actions: [
      {
        type: "add",
        force: true,
        path: "src/app.tsx",
        templateFile: path.resolve(
          TEMP_DIR,
          "handlebar-templates",
          "app.tsx.hbs"
        ),
      },
    ],
  });
};
