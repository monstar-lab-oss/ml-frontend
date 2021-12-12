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

// TODO: interface or type?
interface Auth {
  isLoggedIn: boolean;
  accessToken?: string;
  login: (
    username: string,
    password: string
  ) => Promise<Response<LoginResponseData>>;
  isLoggingIn: boolean;
}

export const AuthContext = createContext<Auth>({} as Auth);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const { mutateAsync: mutateLogin, isLoading: isLoggingIn } = useMutation<
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
        setAccessToken(res.token);
      }

      return res;
    },
    [mutateLogin, setIsLoggedIn, setAccessToken]
  );

  useEffect(() => {
    // Maybe in the future we need persistent authentication, so can get token from localStorage here
  }, [setIsLoggedIn, setAccessToken]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      accessToken,
      login,
      isLoggingIn,
    }),
    [isLoggedIn, accessToken, login, isLoggingIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
