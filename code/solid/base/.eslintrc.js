module.exports = {
  plugins: ["@typescript-eslint", "solid"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:solid/typescript",
  ],
  parser: "@typescript-eslint/parser",
  root: true,
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_",
      },
    ],
    "solid/self-closing-comp": ["error"],
  },
};
