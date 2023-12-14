# React App

This is a starter web front-end package, using [React](https://react.dev/).

## Getting Started

1. Install packages.

```sh
npm install
#or
pnpm install
#or
yarn install
```

2. Run local server for development.

```sh
npm run dev
```

3. Open the app on `http://localhost:3000`.

## Building the Project

1. Build the project.

```sh
npm run build
```

2. If there were no build errors, a build for production deployment will be generated in `/dist`.
3. To check the generated build locally, run the following command.

```sh
npm run preview
#or
npm run start
```

## Other Scripts

```sh
# Run the Typescript Compiler to compile and check for type errors and warnings.
npm run type

# (If ESLint was included in the project)
# Identify problematic patterns in the source code.
npm run lint

# (If Vitest was included in the project)
# Run tests with Vitest
npm run test

# (If Storybook was included in the project)
# Deploy a local Storybook server
npm run storybook

# (If Playwright was included in the project)
# Build the project for E2E testing
npm run build:e2e

# (If Playwright was included in the project)
# Build and deploy a local web server for E2E testing
npm run setup:e2e

# (If Playwright was included in the project)
# Run E2E tests with Playwright
npm run test:e2e

```

## File Structure

```sh
├── __mocks__/          # mocks used for tests
├── __tests__/          # E2E test cases
├── dist/               # generated build for deployment
├── public/             # public static files
├── src/
|  ├── app.tsx
|  ├── assets/          # global styles and other assets
|  |  ├── base.css
|  |  └── main.css
|  ├── components/      # app components
|  |  ├── Button.tsx
|  |  ├── button.module.css
|  |  └── ...
|  ├── modules/         # installed modules
|  |  ├── components/
|  |  |  ├── user-form.test.tsx
|  |  |  ├── user-form.tsx
|  |  |  ├── ...
|  |  ├── hooks/
|  |  |  ├── use-user.test.tsx
|  |  |  ├── use-user.ts
|  |  |  └── ...
|  |  └── ...
|  ├── routes.tsx
|  └── ui/
|     ├── nav-link.tsx
|     └── pages/        # app pages
|        ├── about/
|        |  └── index.tsx
|        ├── index.tsx
|        ├── layout.tsx
|        └── not-found/
|           └── index.tsx
└── stories/            # Storybook stories
   ├── Button.stories.tsx
   └── ...
```
