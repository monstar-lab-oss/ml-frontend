import { useEffect } from "react";

import { useAppDispatch } from "@app/redux/store";

import { updateToken, usePostLoginMutation } from "../../auth";
import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";

const LoginScreen = () => {
  useRedirectAfterLogin();
  const [postLogin, { isLoading, data, error }] = usePostLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    postLogin({
      email: "george.bluth@reqres.in",
      password: "password",
    });
  };

  useEffect(() => {
    if (!isLoading && !!data && !error) {
      dispatch(updateToken(data));
    }
  }, [isLoading, data, error, dispatch]);

  return (
    <div>
      <div>LoginScreen</div>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
};

export default LoginScreen;
