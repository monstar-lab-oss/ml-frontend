import inquirer from "inquirer";
import { JSLibrary, CLIOptions } from "../constants";

export type UserInputTests = {
  useVitest: boolean | undefined;
  useStorybook: boolean | undefined;
  useE2E: boolean | undefined;
  useEslint: boolean | undefined;
  usePrettier: boolean | undefined;
};

export type UserInput = {
  jsLibrary: JSLibrary;
  apiSolution: "restful" | "graphql";
  modules: string[];
  router: "react-router" | "wouter" | undefined;
  tests: UserInputTests | null;
};

/**
 * Prompt user for desired app directory
 */
export async function promptAppDir() {
  return (
    await inquirer.prompt<{ dir: string }>([
      {
        type: "input",
        name: "dir",
        message: "Where Would You like to Create Your Application?",
        default: "./my-app",
      },
    ])
  ).dir;
}

/**
 * Prompt user to select app configuration
 */
export async function promptUserInput() {
  // Select JS Library
  const jsLibrary = (
    await inquirer.prompt<{ jsLibrary: JSLibrary }>([
      {
        type: "list",
        name: "jsLibrary",
        message: "Select a JavsScript library for UI",
        choices: (Object.keys(CLIOptions) as JSLibrary[]).map(
          (key) => CLIOptions[key].name
        ),
        default: 0,
        filter: (val: string) => val.toLowerCase().replace(/\./g, ""),
      },
    ])
  ).jsLibrary;

  // Select API Solution
  const apiSolution = (
    await inquirer.prompt<{ apiSolution: "restful" | "graphql" }>([
      {
        type: "list",
        name: "apiSolution",
        message: "Select an API Solution",
        choices: CLIOptions[jsLibrary].apiSolution,
        default: "restful",
      },
    ])
  ).apiSolution;

  // Select modules for selected JS Library
  // TODO: Use modules
  // eslint-disable-next-line no-unused-vars
  const modules = (
    await inquirer.prompt<{ useModules: string[] }>([
      {
        type: "checkbox",
        name: "useModules",
        message: "Select module do you want to use",
        choices: CLIOptions[jsLibrary].useModules,
      },
    ])
  ).useModules;

  const router = (
    await inquirer.prompt<{ router: "react-router" | "wouter" }>([
      {
        type: "list",
        name: "router",
        message: "Select a routing solution",
        choices: CLIOptions[jsLibrary].routing,
        when: () => modules.includes("routing"),
      },
    ])
  ).router;

  // Select testing packages
  const useTesting = (
    await inquirer.prompt<{ useTesting: boolean }>([
      {
        type: "confirm",
        name: "useTesting",
        message: "Add Testing codes for Catching bugs early?",
        default: true,
      },
    ])
  ).useTesting;

  const useVitest = (
    await inquirer.prompt<{ useVitest?: boolean }>([
      {
        type: "confirm",
        name: "useVitest",
        message: "Add Vitest for Unit Testing?",
        default: true,
        when: () => useTesting,
      },
    ])
  ).useVitest;

  const useStorybook = (
    await inquirer.prompt<{ useStorybook?: boolean }>([
      {
        type: "confirm",
        name: "useStorybook",
        message: "Add Storybook for Visual Testing?",
        default: true,
        when: () => !!useTesting,
      },
    ])
  ).useStorybook;

  const useE2E = (
    await inquirer.prompt<{ useE2E?: boolean }>([
      {
        type: "confirm",
        name: "useE2E",
        message: "Add Playwright for End-To-End Testing?",
        default: true,
        when: () => useTesting,
      },
    ])
  ).useE2E;

  const useEslint = (
    await inquirer.prompt<{ useEslint?: boolean }>([
      {
        type: "confirm",
        name: "useEslint",
        message: "Add ESLint for Code Linting?",
        default: true,
        when: () => useTesting,
      },
    ])
  ).useEslint;

  const usePrettier = (
    await inquirer.prompt<{ usePrettier?: boolean }>([
      {
        type: "confirm",
        name: "usePrettier",
        message: "Add Prettier for Code Formatting?",
        default: true,
        when: () => useTesting,
      },
    ])
  ).usePrettier;

  const tests = !useTesting
    ? null
    : {
        useVitest,
        useStorybook,
        useE2E,
        useEslint,
        usePrettier,
      };

  const userInput: UserInput = {
    jsLibrary,
    apiSolution,
    modules,
    router,
    tests,
  };

  return userInput;
}
