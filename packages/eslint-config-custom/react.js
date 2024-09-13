import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import unicorn from "eslint-plugin-unicorn";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import tailwindcss from "eslint-plugin-tailwindcss";
import storybook from "eslint-plugin-storybook";

/** @type {import('typescript-eslint').Config} */
export default [
  // JS
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { ...js.configs.recommended },
  {
    files: ["**/*.@(ts|tsx|js|jsx|mjs|cjs)"],
    plugins: { unicorn },
    rules: {
      // https://typescript-eslint.io/rules/naming-convention/
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        {
          selector: "interface",
          format: ["PascalCase"],
        },
      ],
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      // https://eslint.org/docs/latest/rules/no-console
      "no-console": "error",
      // https://eslint.org/docs/latest/rules/eqeqeq
      eqeqeq: "error",
      // https://eslint.org/docs/latest/rules/no-magic-numbers
      "no-magic-numbers": ["error", { ignore: [0, 1, 2] }],
      // https://eslint.org/docs/latest/rules/no-negated-condition
      "no-negated-condition": "error",
      // https://eslint.org/docs/latest/rules/no-useless-rename
      "no-useless-rename": "error",
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
      "unicorn/better-regex": "error",
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
      "unicorn/no-nested-ternary": "error",
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            Args: true,
            args: true,
            Arg: true,
            arg: true,
            Props: true,
            props: true,
            Prop: true,
            prop: true,
            Refs: true,
            refs: true,
            Ref: true,
            ref: true,
            env: true,
          },
        },
      ],
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
      "unicorn/no-array-for-each": "error",
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-push-push.md
      "unicorn/no-array-push-push": "error",
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
      "unicorn/no-array-reduce": "error",
      // https://eslint.org/docs/latest/rules/no-eval
      "no-eval": "error",
    },
  },

  // TS
  { files: ["**/*.@(ts|tsx)"] },
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  { languageOptions: { parserOptions: { project: true } } },

  // React
  {
    files: ["src/**/*.{ts,tsx}"],
    ...reactRecommended,
  },
  {
    settings: { react: { version: "detect" } },
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      ...reactJsxRuntime.rules,
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/hook-use-state.md
      "react/hook-use-state": "error",
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/jsx-boolean-value.md
      "react/jsx-boolean-value": "error",
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
      "react/jsx-curly-brace-presence": "error",
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/destructuring-assignment.md
      "react/destructuring-assignment": "error",
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/function-component-definition.md
      "react/function-component-definition": [
        "error",
        { unnamedComponents: "function-expression" },
      ],
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/jsx-filename-extension.md
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/no-danger.md
      "react/no-danger": "error",
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/no-unstable-nested-components.md
      "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
      // https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/no-array-index-key.md
      "react/no-array-index-key": "error",
      "react/prop-types": "off",
    },
  },

  // Tailwind CSS
  {
    files: ["src/**/*.tsx"],
    plugins: { tailwindcss },
    rules: {
      ...tailwindcss.configs.recommended.rules,
      // https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-negative-arbitrary-values.md
      "tailwindcss/enforces-negative-arbitrary-values": "error",
      // https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/enforces-shorthand.md
      "tailwindcss/enforces-shorthand": "error",
      // https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/master/docs/rules/no-unnecessary-arbitrary-value.md
      "tailwindcss/no-unnecessary-arbitrary-value": "error",
    },
    settings: {
      tailwindcss: {
        callees: ["clsx", "cn", "tv"],
      },
    },
  },

  // Storybook
  {
    files: ["**/*.stories.@(ts|tsx)"],
    // TODO: Support flat config
    // https://github.com/storybookjs/eslint-plugin-storybook/pull/156
    plugins: { storybook },
    rules: {
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/csf-component.md
      "storybook/csf-component": "error",
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/default-exports.md
      "storybook/default-exports": "error",
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/no-redundant-story-name.md
      "storybook/no-redundant-story-name": "error",
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/hierarchy-separator.md
      "storybook/hierarchy-separator": "error",
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/story-exports.md
      "storybook/story-exports": "error",
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/no-title-property-in-meta.md
      "storybook/no-title-property-in-meta": "error",
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/prefer-pascal-case.md
      "storybook/prefer-pascal-case": "error",
      // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/meta-inline-properties.md
      "storybook/meta-inline-properties": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules",
      ".next",
      "eslint.config.js",
      ".storybook",
      "storybook-static",
      "dist",
    ],
  },
];
