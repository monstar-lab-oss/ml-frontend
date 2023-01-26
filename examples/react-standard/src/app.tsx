import { Suspense } from "react";
import { AppProviders } from "@/context";
import Routes from "@/routes";

export const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AppProviders>
      <Routes />
    </AppProviders>
  </Suspense>
);
