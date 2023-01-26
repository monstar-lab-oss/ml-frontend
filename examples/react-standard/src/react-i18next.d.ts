import { resources } from "./i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["en"];
  }
}
