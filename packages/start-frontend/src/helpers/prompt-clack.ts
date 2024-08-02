// to execute this file
// run node ./packages/start-frontend/src/helpers/prompt-clack.js

import {
  intro,
  outro,
  spinner,
  text,
  select,
  group,
  multiselect,
  confirm,
  cancel,
} from "@clack/prompts";
import * as color from "picocolors";
import { setTimeout as sleep } from "node:timers/promises";
import gradient = require("gradient-string");

export type UserInputTests = {
  useVitest: boolean | undefined;
  useStorybook: boolean | undefined;
  useE2E: boolean | undefined;
  useEslint: boolean | undefined;
  usePrettier: boolean | undefined;
};

interface CLIOptions {
  [key: string]: {
    name: string;
    apiSolution: { name: string; value: "graphql" | "restful" }[];
    useModules: { name: string; value: string; label: string }[];
  };
}

const CLIOptions: CLIOptions = {
  react: {
    name: "React",
    apiSolution: [
      { name: "RESTful", value: "restful" },
      { name: "GraphQL", value: "graphql" },
    ],
    useModules: [{ name: "Add CRUD Operations", value: "crud", label: "CRUD" }],
  },
};

// ML Colors
const g = gradient("#53575a", "#53575a");
const t = gradient("#53575a", "#ffff00");

export async function promptClack(dir) {
  // intro example
  intro(
    `${g("ꮙ START-")}${t(
      "FRONTEND"
    )} \n\n Welcome to the frontend setup wizard!`
  );

  // group example
  const groupUtility = await group(
    {
      location: () =>
        // text example
        text({
          message: color.blue("Which location you want to start project?"),
          placeholder: "./my-app",
          initialValue: `./${dir}` || "",
          validate: (value) => {
            if (!value) {
              return "Please provide a location path";
            }
            // regular expression that text start from ./
            const Reg = new RegExp("^\\./");
            if (!Reg.test(value)) {
              return "Please input a valid location path";
            }
          },
        }),
      jsLibrary: () => {
        return select({
          message: "Select a JavaScript library for UI",
          options: Object.keys(CLIOptions).map((key) => {
            return {
              value: key,
              label: CLIOptions[key].name,
            };
          }),
        }) as Promise<string>;
      },

      // select example
      apiSolution: () => {
        return select({
          message: "Select an API Solution (Use arrow keys)",
          options: CLIOptions.react.apiSolution.map((solution) => {
            return {
              value: solution.value,
              label: solution.name,
            };
          }),
        }) as Promise<"graphql" | "restful">;
      },

      modules: (value) => {
        return multiselect({
          message: "Select module do you want to use (Press 'space' to select)",
          options: CLIOptions[value.results.jsLibrary as string].useModules,
          required: false,
        }) as Promise<string[]>;
      },

      isUseSampleTestCode: () => {
        return confirm({
          message: "Add Testing codes for Catching bugs early?",
        });
      },
    },
    {
      // On Cancel callback that wraps the group
      // So if the user cancels one of the prompts in the group this function will be called
      onCancel: ({ results }) => {
        cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  const testGroupUtility = await group({
    useVitest: () => {
      return confirm({
        message: "Add Vitest for Unit Testing?",
      });
    },
    useStorybook: () => {
      return confirm({
        message: "Add Storybook for Visual Testing?",
      });
    },
    useE2E: () => {
      return confirm({
        message: "Add Playwright for End-To-End Testing?",
      });
    },
    useEslint: () => {
      return confirm({
        message: "Add ESLint for Code Linting?",
      });
    },
    usePrettier: () => {
      return confirm({
        message: "Add Prettier for Code Formatting?",
      });
    },
  });

  const s = spinner();
  s.start("Installing fake api solution with fake location");

  await sleep(3000);

  s.stop(`Installed fake modules successfully`);

  // outro example
  outro(
    `Finish setting up! 
    Here is your configurations:
    JS library: ${color.blue(groupUtility.jsLibrary)}
    Options: ${color.blue(
      (groupUtility.modules as string[]).length > 0
        ? (groupUtility.modules as string[]).join(", ")
        : "No"
    )}
    Test sample: ${color.blue(groupUtility.isUseSampleTestCode ? "Yes" : "No")}
    Use Vitest: ${color.blue(testGroupUtility.useVitest ? "Yes" : "No")}
    Use Storybook: ${color.blue(testGroupUtility.useStorybook ? "Yes" : "No")}
    Use E2E: ${color.blue(testGroupUtility.useE2E ? "Yes" : "No")}
    Use Eslint: ${color.blue(testGroupUtility.useEslint ? "Yes" : "No")}
    Use Prettier: ${color.blue(testGroupUtility.usePrettier ? "Yes" : "No")}

    ${color.yellow("Next step:")} ${color.blue(
      `cd: ${groupUtility.location} && npm start`
    )}
    `
  );

  return {
    location: groupUtility.location,
    jsLibrary: groupUtility.jsLibrary,
    apiSolution: groupUtility.apiSolution,
    modules: groupUtility.modules,
    tests: testGroupUtility,
  };
}
