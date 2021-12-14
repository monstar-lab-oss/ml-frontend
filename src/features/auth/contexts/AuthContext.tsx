import React, { createContext, ReactNode, useCallback, useMemo } from "react";

import createPersistedState from "use-persisted-state";

const useIsLoggedInState = createPersistedState("isLoggedIn");
const useAccessTokenState = createPersistedState("accessToken");

type LoginData = {
  accessToken?: string;
  refreshToken?: string; // TODO: Maybe need refreshToken to fetch access token automatically
};

type Auth = LoginData & {
  isLoggedIn: boolean;
  handleLogin: (data: LoginData) => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<Auth>({} as Auth);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedInState(false);
  const [accessToken, setAccessToken] = useAccessTokenState("");

  const handleLogin = useCallback(
    (data: LoginData) => {
      if (data.accessToken) {
        setIsLoggedIn(true);
        setAccessToken(data.accessToken);
      }
    },
    [setIsLoggedIn, setAccessToken]
  );

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setAccessToken("");
  }, [setIsLoggedIn, setAccessToken]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      accessToken,
      handleLogin,
      handleLogout,
    }),
    [isLoggedIn, accessToken, handleLogout, handleLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
