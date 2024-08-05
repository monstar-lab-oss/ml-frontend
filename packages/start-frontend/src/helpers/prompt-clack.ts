import {
  intro,
  text,
  select,
  group,
  multiselect,
  confirm,
  cancel,
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

export async function promptClack(dir: string) {
  intro(`${g("ꮙ START-")}${t("FRONTEND")}`);

  const groupUtility = await group(
    {
      location: () =>
        text({
          message: color.blue(
            "Where Would You like to Create Your Application?"
          ),
          placeholder: "./my-app",
          initialValue: dir ? `./${dir}` : "./my-app",
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
          message:
            "Select the modules that you would like to use (Press 'space' to select)",
          options: CLIOptions[value.results.jsLibrary as string].useModules,
          required: false,
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

  return {
    location: groupUtility.location,
    jsLibrary: groupUtility.jsLibrary,
    apiSolution: groupUtility.apiSolution,
    modules: groupUtility.modules,
    tests: testGroupUtility,
  };
}
