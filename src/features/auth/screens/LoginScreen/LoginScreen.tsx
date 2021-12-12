import { useCallback } from "react";

import { useAuth } from "@app/features/auth/auth";

import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";

const LoginScreen = () => {
  useRedirectAfterLogin();
  const { login, isLoggingIn } = useAuth();

  const handleLogin = useCallback(() => {
    login("george.bluth@reqres.in", "password");
  }, [login]);

  return (
    <div>
      <div>LoginScreen</div>
      <button onClick={handleLogin} disabled={isLoggingIn}>
        {isLoggingIn ? "Loading..." : "Login"}
      </button>
    </div>
  );
};

export default LoginScreen;
