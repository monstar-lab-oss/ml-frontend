import type { NodePlopAPI } from "node-plop";
import path from "node:path";
import prettier from "prettier";

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
        transform: async (template) => {
          return await prettier.format(template, { parser: "typescript" });
        },
      },
    ],
  });

  plop.setGenerator("constructRouter", {
    actions: (data) => {
      // If the router module is not selected, no actions are needed
      if (!data?.router) return [];

      const templateFileDirectory = path.resolve(
        TEMP_DIR,
        "handlebar-templates/router",
        data.router
      );

      return [
        {
          type: "add",
          force: true,
          path: "src/router/index.tsx",
          templateFile: path.resolve(templateFileDirectory, "index.tsx.hbs"),
          transform: async (template) => {
            return await prettier.format(template, { parser: "typescript" });
          },
        },
        {
          type: "add",
          force: true,
          path: "src/router/routes.tsx",
          templateFile: path.resolve(templateFileDirectory, "routes.tsx.hbs"),
          transform: async (template) => {
            return await prettier.format(template, { parser: "typescript" });
          },
        },
      ];
    },
  });
};
