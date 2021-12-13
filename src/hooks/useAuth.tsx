import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import { AuthRequest, AuthResponse } from "@/types/auth";
import { useMutation, useQueryClient } from "react-query";
import { http } from "@/utils/http";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/constants/localStorage";

type AuthContextData = {
  login: {
    (authRequest: AuthRequest): Promise<void>;
    isLoading?: boolean;
  };
  logout(): void;
};

const AuthContext = createContext<AuthContextData>({
  async login() {},
  logout() {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = useQueryClient();

  const { mutateAsync: authenticateAsync, isLoading } = useMutation(
    (authRequest: AuthRequest) =>
      http.post<AuthResponse>("/login", { body: authRequest })
  );

  const login = useCallback(
    async (authRequest: AuthRequest) => {
      const data = await authenticateAsync(authRequest);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
    },
    [authenticateAsync]
  ) as AuthContextData["login"];

  login.isLoading = isLoading;

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    queryClient.clear();
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
