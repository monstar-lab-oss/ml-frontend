import { createContext, useMemo, ReactNode } from "react";

import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
  AxiosInstance,
} from "axios";

import { ApiStatusCodes } from "@app/constants/api.constants";
import { ENV } from "@app/constants/env";
import { useAuth, useLogout } from "@app/features/auth/auth";
import { Response } from "@app/types/api.types";

export const ApiContext = createContext<AxiosInstance>({} as AxiosInstance);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { accessToken } = useAuth();
  const { logout } = useLogout();

  const api = useMemo(() => {
    const headers: AxiosRequestHeaders = { "Content-Type": "application/json" };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const apiInstance = axios.create({
      baseURL: ENV.API_HOST,
      headers,
    });

    apiInstance.interceptors.response.use(
      (response: AxiosResponse<Response>) => response.data,
      (error: AxiosError<Response>) => {
        // Process error here
        if (error.response?.status === ApiStatusCodes.UNAUTHORIZED) {
          // Redirect to login URL
          logout();
        }

        return Promise.reject(error);
      }
    );

    return apiInstance;
  }, [accessToken, logout]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
