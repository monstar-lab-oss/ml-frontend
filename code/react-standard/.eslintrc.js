module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // react/jsx-uses-react and react/react-in-jsx-scope rules are no longer necessary and can be turned off or removed.
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
      },
    ],
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["arrowFunctions", "methods", "asyncMethods"] },
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@testing-library/react",
            importNames: ["render"],
            message:
              "Please use render or renderWithQueryClient from '@/tests/utils' instead.",
          },
        ],
      },
    ],
  },
};
