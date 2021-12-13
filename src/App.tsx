import { QueryClient, QueryClientProvider } from "react-query";
import { Routes } from "@/routes";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </QueryClientProvider>
);
