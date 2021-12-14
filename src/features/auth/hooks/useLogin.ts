import { useCallback } from "react";

import { AuthEndpointsEnum, useAuth } from "@app/features/auth/auth";
import useMutation from "@app/hooks/useMutation";

type LoginRequestData = {
  username: string;
  password: string;
};

type LoginResponseData = {
  token: string;
};

export default function useLogin() {
  const { handleLogin } = useAuth();

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
        handleLogin({
          accessToken: res.token,
        });
      }

      return res;
    },
    [mutateLogin, handleLogin]
  );

  return {
    login,
    isLoggingIn,
  };
}
