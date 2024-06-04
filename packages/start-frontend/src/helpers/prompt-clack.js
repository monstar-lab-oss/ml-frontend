import {
  intro,
  outro,
  spinner,
  text,
  select,
  group,
  multiselect,
  confirm,
} from "@clack/prompts";
import color from "picocolors";
import { setTimeout as sleep } from "node:timers/promises";

const CLIOptions = {
  react: {
    name: "React",
    apiSolution: [
      { name: "RESTful", value: "restful" },
      { name: "GraphQL", value: "graphql" },
    ],
    useModules: [{ name: "Add CRUD Operations", value: "crud" }],
  },
};

async function promptClack() {
  // intro example
  intro(color.blue(`create some app with Clack!`));

  // group example
  const groupUtility = await group(
    {
      location: () =>
        // text example
        text({
          message: color.blue("Which location you want to start project?"),
          placeholder: "./my-app",
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
      // select example
      apiSolution: () =>
        select({
          message: "Select module do you want to use",
          options: CLIOptions.react.apiSolution.map((solution) => {
            return {
              value: solution.value,
              name: solution.name,
            };
          }),
        }),
      // multiselect example
      options: () =>
        multiselect({
          message: "Which options you want to add on your project?",
          options: [
            { value: "eslint", label: "ESLint", hint: "recommended" },
            { value: "prettier", label: "Prettier" },
            { value: "gh-action", label: "GitHub Action" },
          ],
          required: false,
        }),
    },
    {
      // On Cancel callback that wraps the group
      // So if the user cancels one of the prompts in the group this function will be called
      onCancel: ({ results }) => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  // confirm examples
  const useSampleTestCode = await confirm({
    message: "Add Testing codes for Catching bugs early?",
  });

  const useVitest = await confirm({
    message: "Add Vitest for Unit Testing?",
  });

  const useStoryBook = await confirm({
    message: "Add Storybook for Visual Testing?",
  });

  const useE2E = await confirm({
    message: "Add Playwright for End-To-End Testing?",
  });

  // spinner example
  const s = spinner();
  s.start("Installing fake api solution with fake location");

  await sleep(3000);

  s.stop(`Installed fake modules successfully`);

  // outro example
  outro(
    `Finish setting up! 
    Here is your configurations: 
    Options: ${color.blue(
      groupUtility.options.length > 0 ? groupUtility.options.join(", ") : "No"
    )}
    Test sample: ${color.blue(useSampleTestCode ? "Yes" : "No")}
    Use Vitest: ${color.blue(useVitest ? "Yes" : "No")}
    Use Storybook: ${color.blue(useStoryBook ? "Yes" : "No")}
    Use E2E: ${color.blue(useE2E ? "Yes" : "No")}

    ${color.yellow("Next step:")} ${color.blue(
      `cd: ${groupUtility.location} && npm start`
    )}
    `
  );
}

promptClack().catch(console.error);
