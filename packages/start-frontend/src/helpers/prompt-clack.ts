import {
  intro,
  text,
  select,
  group,
  confirm,
  cancel,
  multiselect,
} from "@clack/prompts";
import * as color from "picocolors";
import gradient from "gradient-string";

export type UserInputTests = {
  useVitest: boolean | undefined;
  useStorybook: boolean | undefined;
  useE2E: boolean | undefined;
  useEslint: boolean | undefined;
  usePrettier: boolean | undefined;
};

interface CLIOptionsInterface {
  [key: string]: {
    name: string;
    apiSolution: { name: string; value: "graphql" | "restful" }[];
    useModules: { name: string; value: string; label: string }[];
  };
}

const CLIOptions: CLIOptionsInterface = {
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

export async function propmtClackDir() {
  intro(`${g("ꮙ START-")}${t("FRONTEND")}`);
  const result = await text({
    message: color.blue("Where Would You like to Create Your Application?"),
    placeholder: "./my-app",
    initialValue: "./my-app",
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
  });

  return JSON.stringify(result);
}

export async function promptClack() {
  const groupUtility = await group(
    {
      // Select JS Library
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

      // Select API Solution
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

      // Select modules for selected JS Library
      modules: (value) => {
        return multiselect({
          message:
            "Select the modules that you would like to use (Press 'space' to select)",
          options: CLIOptions[value.results.jsLibrary as string].useModules,
          required: false,
          initialValues: [
            CLIOptions[value.results.jsLibrary as string].useModules[0].value,
          ],
        }) as Promise<string[]>;
      },

      isUseSampleTestCode: () => {
        return confirm({
          message: "Add testing codes for catching bugs early?",
        });
      },
    },
    {
      // On Cancel callback that wraps the group
      // So if the user cancels one of the prompts in the group this function will be called
      onCancel: () => {
        cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  let testGroupUtility: UserInputTests | undefined;

  if (groupUtility.isUseSampleTestCode) {
    // Select testing packages
    testGroupUtility = await group(
      {
        useVitest: () => {
          return confirm({
            message: "Add Vitest for Unit Testing?",
            initialValue: true,
          });
        },
        useStorybook: () => {
          return confirm({
            message: "Add Storybook for Visual Testing?",
            initialValue: true,
          });
        },
        useE2E: () => {
          return confirm({
            message: "Add Playwright for End-To-End Testing?",
            initialValue: true,
          });
        },
        useEslint: () => {
          return confirm({
            message: "Add ESLint for Code Linting?",
            initialValue: true,
          });
        },
        usePrettier: () => {
          return confirm({
            message: "Add Prettier for Code Formatting?",
            initialValue: true,
          });
        },
      },
      {
        // On Cancel callback that wraps the group
        // So if the user cancels one of the prompts in the group this function will be called
        onCancel: () => {
          cancel("Operation cancelled.");
          process.exit(0);
        },
      }
    );
  }

  return {
    jsLibrary: groupUtility.jsLibrary,
    apiSolution: groupUtility.apiSolution,
    tests: testGroupUtility ?? null,
    modules: groupUtility.modules,
  };
}
