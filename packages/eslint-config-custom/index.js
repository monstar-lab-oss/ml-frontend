module.exports = {
  extends: ["eslint:recommended", "turbo"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-undef": 0,
  },
};
