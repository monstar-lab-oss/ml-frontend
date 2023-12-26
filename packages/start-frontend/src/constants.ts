export const degitConfig = {
  user: "monstar-lab-oss",
  repo: "ml-frontend",
  codeDir: "code",
  mockDir: "packages/mock-server",
  e2eDir: "packages/e2e-testing",
  ref: process.env.BRANCH_NAME,
};

// TODO: Maybe we can detect if they are actually using it?
export const eslintPackages = [
  "@tanstack/eslint-plugin-query",
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint",
  "eslint-plugin-react",
];

export type JSLibrary = "react";

export const CLIOptions = {
  react: {
    name: "React",
    apiSolution: [
      { name: "RESTful", value: "restful" },
      { name: "GraphQL", value: "graphql" },
    ],
    useModules: [{ name: "Add CRUD Operations", value: "crud" }],
  },
} satisfies Record<JSLibrary, unknown>;
