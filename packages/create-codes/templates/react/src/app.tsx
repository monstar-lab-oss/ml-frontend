import { Routes } from "@/routes";
import { AppProviders } from "@/context";

export const App = () => (
  <AppProviders>
    <Routes />
  </AppProviders>
);
