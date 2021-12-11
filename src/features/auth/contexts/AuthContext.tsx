import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AuthEndpointsEnum } from "@app/features/auth/auth";
import useMutation from "@app/hooks/useMutation";
import { Response } from "@app/types/api.types";

interface LoginRequestData {
  username: string;
  password: string;
}

interface LoginResponseData {
  token: string;
}

interface Auth {
  isLoggedIn: boolean;
  token?: string;
  login: (
    username: string,
    password: string
  ) => Promise<Response<LoginResponseData>>;
}

export const AuthContext = createContext<Auth>({} as Auth);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const { mutateAsync: mutateLogin } = useMutation<
    LoginResponseData,
    LoginRequestData
  >(AuthEndpointsEnum.LOGIN);

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await mutateLogin({
        username,
        password,
      });

      if (res.token) {
        setIsLoggedIn(true);
        setToken(res.token);
      }

      return res;
    },
    [mutateLogin, setIsLoggedIn, setToken]
  );

  useEffect(() => {
    // Maybe in the future we need persistent authentication, so can get token from localStorage here
  }, [setIsLoggedIn, setToken]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      token,
      login,
    }),
    [isLoggedIn, token, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
