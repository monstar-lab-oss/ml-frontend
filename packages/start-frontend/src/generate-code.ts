import path from "node:path";
import {
  appendFileSync,
  existsSync,
  rmdirSync,
  rmSync,
  mkdirSync,
  cpSync,
} from "node:fs";
import nodePlop from "node-plop";

const capitalize = (str?: string) =>
  str
    ? str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
    : undefined;

const src = {
  baseCode: path.resolve(__dirname, "../code/base"),
  modules: path.resolve(__dirname, "../code/modules"),
  plopfile: path.resolve(__dirname, "../code/templates/plopfile.ts"),
  templates: path.resolve(__dirname, "templates"),
} as const;

type Payload = {
  destBasePath: string;
  modules: string[];
  router?: string;
};
export async function generateCode({ destBasePath, modules, router }: Payload) {
  // TODO: Update comment
  existsSync(destBasePath) && rmSync(destBasePath, { recursive: true });
  mkdirSync(destBasePath);

  // TODO: Update comment
  cpSync(src.baseCode, destBasePath, { recursive: true });

  // TODO: Update comment
  modules
    .filter((m) => m.startsWith("provider."))
    .forEach((m) => {
      mkdirSync(`${destBasePath}/src/modules/${m}`);
      cpSync(`${src.modules}/${m}`, `${destBasePath}/src/modules`, {
        recursive: true,
      });
    });

  // TODO: Update comment
  const plop = await nodePlop(src.plopfile, { destBasePath, force: true });

  // const providers = modules
  //   .filter((m) => m.startsWith("provider."))
  //   .map((m) => ({
  //     fileName: "functions/" + m.split(".").at(-1),
  //     componentName: capitalize(m.split(".").at(-1)),
  //   }));

  // if (router) {
  //   // Make folder for router files
  //   mkdirSync(`${destBasePath}/src/router`);

  //   const routes = [
  //     {
  //       path: "about",
  //       name: "About",
  //     },
  //     {
  //       path: "contact",
  //       name: "ContactMe",
  //     },
  //     // Append routes from other modules
  //     // Example: Login page from authentication module
  //   ];

  //   // Generate router files
  //   // plop.getGenerator("constructRouter").runActions({ router, routes });
  // }

  // // plop.getGenerator("constructComponent").runActions({ providers });
  // // plop.getGenerator("constructBase").runActions({ router });
}
