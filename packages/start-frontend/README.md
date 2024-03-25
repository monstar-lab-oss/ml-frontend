# start-frontend

## Getting Started

### For users

Run `start-frontend` with the following command:

```sh
npx start-frontend [<new-project-directory>]
```

Follow the CLI prompts to generate a new project in the specified directory.

---

### For developers

To develop locally, you can use the `pnpm dev` command.

This will enable watch mode, which triggers a rebuild whenever changes are made.

#### Adding the environment variables file

Copy `.env.template` to `.env` for your local environment configuration.

Note: The `.env` file should not be committed to Git and is meant for local usage only.
