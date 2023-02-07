export const degitConfig = {
  user: "monstar-lab-oss",
  repo: "reactjs-boilerplate",
  examplesDir: "examples",
  // TODO: After v1.0.0 is published, it should be download from the `main` branch.
  ref: "next-v1",
};

// TODO: Maybe we can detect if they are actually using it?
export const eslintPackages = [
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint",
  "eslint-plugin-solid",
];
