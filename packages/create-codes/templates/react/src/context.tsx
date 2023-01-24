import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import { CounterProvider } from "@/hooks/useCounter";

export const AppProviders = ({ children }: PropsWithChildren) => (
  <>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <CounterProvider initialCount={10}>{children}</CounterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </>
);
