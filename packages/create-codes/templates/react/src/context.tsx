import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/modules/authentication";
import { CounterProvider } from "@/modules/local-context-count";

export const AppProviders = ({ children }: PropsWithChildren) => (
  <>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <CounterProvider initialCount={10}>{children}</CounterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </>
);
