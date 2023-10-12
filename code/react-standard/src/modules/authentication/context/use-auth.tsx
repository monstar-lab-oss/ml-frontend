import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { useLocation } from "wouter";
import { AuthRequest, AuthResponse } from "../types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/constants/localStorage";

type AuthContextData = {
  login: {
    (authRequest: AuthRequest): Promise<void>;
    isLoading?: boolean;
    isError?: boolean;
  };
  logout(): void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextData>({
  async login() {},
  logout() {},
  isLoggedIn: false,
});

export const AuthProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const [_, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    // TODO: We should validate a access token via request to backend
    () => !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  );
  const queryClient = useQueryClient();

  const {
    mutateAsync: authenticateAsync,
    isLoading,
    isError,
  } = useMutation((authRequest: AuthRequest) =>
    http.post<AuthResponse>("/login", authRequest)
  );

  const login = useCallback(
    async (authRequest: AuthRequest) => {
      const data = await authenticateAsync(authRequest);

      // Set token to local storage
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
      setIsLoggedIn(true);

      // e.g http://localhost:3000/search?foo=bar&baz=99
      const params = new URL(window.location.href).searchParams;
      const from = params.get("redirect");
      params.delete("redirect");

      from ? setLocation(`${from}?${params.toString()}`) : setLocation("/home");
    },
    [authenticateAsync]
  ) as AuthContextData["login"];

  login.isLoading = isLoading;
  login.isError = isError;

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    queryClient.clear();
    setIsLoggedIn(false);

    // TODO: Should we need to worry about the search params when user logout?
    // e.g /login?redirect=/page?foo=bar&baz=123
    setLocation("/login");
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
