import { QueryClient, QueryClientProvider } from "react-query";
import { Routes } from "@/routes";
import { AuthProvider } from "@/hooks/useAuth";
import { CounterProvider } from "@/hooks/useCounter";

const queryClient = new QueryClient();
export const App = () => (
  // @ts-expect-error The latest version of react-query will solve type error.
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {/* @ts-expect-error The latest version of constate will solve type error. */}
      <CounterProvider initialCount={10}>
        <Routes />
      </CounterProvider>
    </AuthProvider>
  </QueryClientProvider>
);