import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Auth {
  isLoggedIn: boolean;
  token?: string;
}

export const AuthContext = createContext<Auth>({
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Process login
    setIsLoggedIn(true);
    setToken("my_token");
  }, [setIsLoggedIn, setToken]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      token,
    }),
    [isLoggedIn, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
