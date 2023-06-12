export const degitConfig = {
  user: "monstar-lab-oss",
  repo: "reactjs-boilerplate",
  examplesDir: "examples",
  e2eDir: "packages/e2e-testing",
  // TODO: After v1.0.0 is published, it should be download from the `main` branch.
  ref: "add-e2e-test-samples",
};

// TODO: Maybe we can detect if they are actually using it?
export const eslintPackages = [
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint",
  "eslint-plugin-solid",
];

export type JSLibrary = "react" | "solid";

export const CLIOptions = {
  react: {
    name: "React",
    apiSolution: [
      { name: "RESTful", value: "restful" },
      { name: "GraphQL", value: "graphql" },
    ],
    useModules: [
      // {
      //   name: "Add Router for SPA Development",
      //   value: "router",
      // },
      { name: "Add CRUD Operations", value: "crud" },
      // { name: "Add Zustand for State Management", value: "store" },
      // {
      //   name: "Add Authentication Feature",
      //   value: "auth",
      // },
    ],
  },
  // vue: {
  //   name: "Vue",
  //   apiSolution: [
  //     { name: "RESTful", value: "restful" },
  //     { name: "GraphQL", value: "graphql" },
  //   ],
  //   useModules: [
  //     {
  //       name: "Add Router for SPA Development",
  //       value: "router",
  //     },
  //     { name: "Add CRUD Operations", value: "crud" },
  //     { name: "Add Pinia for State Management", value: "store" },
  //     {
  //       name: "Add Authentication Feature",
  //       value: "auth",
  //     },
  //   ],
  // },
  // nextjs: {
  //   name: "Next.js",
  //   apiSolution: [
  //     { name: "RESTful", value: "restful" },
  //     { name: "GraphQL", value: "graphql" },
  //     { name: "tRPC", value: "trpc" },
  //   ],
  //   useModules: [
  //     { name: "Add CRUD Operations", value: "crud" },
  //     { name: "Add Zustand for State Management", value: "store" },
  //     {
  //       name: "Add Authentication Feature",
  //       value: "auth",
  //     },
  //   ],
  // },
  solid: {
    name: "Solid",
    apiSolution: [
      { name: "RESTful", value: "restful" },
      { name: "GraphQL", value: "graphql" },
    ],
    useModules: [
      {
        name: "Add Router for SPA Development",
        value: "router",
      },
      { name: "Add CRUD Operations", value: "crud" },
      { name: "Add Zustand for State Management", value: "store" },
      {
        name: "Add Authentication Feature",
        value: "auth",
      },
    ],
  },
  // svelte: {
  //   name: "Svelte",
  //   apiSolution: [
  //     { name: "RESTful", value: "restful" },
  //     { name: "GraphQL", value: "graphql" },
  //   ],
  //   useModules: [
  //     { name: "Add CRUD Operations", value: "crud" },
  //     { name: "Add Zustand for State Management", value: "store" },
  //     {
  //       name: "Add Authentication Feature",
  //       value: "auth",
  //     },
  //   ],
  // },
} satisfies Record<JSLibrary, unknown>;
