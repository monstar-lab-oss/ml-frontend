module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'prettier.config.cjs'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  rules: {
    'no-console': 2,
    eqeqeq: 2,
  },
  overrides: [
    {
      files: ['**/*.{jsx,ts,tsx}'],
      rules: {
        'react/jsx-pascal-case': 2,
        '@typescript-eslint/naming-convention': [
          2,
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'has', 'did', 'will', 'can', 'should'],
          },
          {
            selector: ['variable', 'function'],
            types: ['function'],
            format: ['camelCase', 'StrictPascalCase'],
          },
          {
            selector: ['interface', 'typeLike'],
            format: ['PascalCase'],
          },
        ],
        'react/jsx-handler-names': [
          2,
          {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
            checkLocalVariables: false,
            checkInlineFunction: false,
          },
        ],
        'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
        'react/destructuring-assignment': [2, 'always'],
        'react/hook-use-state': [2, { allowDestructuredState: false }],
        'react/jsx-props-no-spreading': 2,
        'react/no-unstable-nested-components': 2,
        'react/prefer-stateless-function': 2,
        'react/jsx-no-useless-fragment': 2,
        'react/forbid-component-props': 2,
        'unicorn/prevent-abbreviations': [
          'error',
          {
            allowList: {
              Props: true,
            },
          },
        ],
      },
    },
  ],
};