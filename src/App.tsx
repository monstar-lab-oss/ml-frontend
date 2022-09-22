import { QueryClient, QueryClientProvider } from "react-query";
import { Routes } from "@/routes";
import { AuthProvider } from "@/hooks/useAuth";
import { CounterProvider } from "@/hooks/useCounter";

const queryClient = new QueryClient();
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CounterProvider initialCount={10}>
        <Routes />
      </CounterProvider>
    </AuthProvider>
  </QueryClientProvider>
);
