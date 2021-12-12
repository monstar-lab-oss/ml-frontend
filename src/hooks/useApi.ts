import { useMemo } from "react";

import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

import { ApiStatusCodes } from "@app/constants/api.constants";
import { ENV } from "@app/constants/env";
import { useAuth, AuthEndpointsEnum } from "@app/features/auth/auth";
import { Response } from "@app/types/api.types";

const anonymousEndpoints = [AuthEndpointsEnum.LOGIN.toString()];

export default function useApi() {
  const { accessToken } = useAuth();

  const api = useMemo(() => {
    const apiInstance = axios.create({
      baseURL: ENV.API_HOST,
      headers: { "Content-Type": "application/json" },
    });

    apiInstance.interceptors.request.use(
      async (request: AxiosRequestConfig) => {
        const isAnonymous = anonymousEndpoints.some(endpoint =>
          request.url?.startsWith(endpoint)
        );

        if (!request.headers) {
          request.headers = {};
        }

        // TODO: Maybe add accessToken to headers above
        if (accessToken) {
          request.headers.Authorization = `Bearer ${accessToken}`;
          return request;
        }

        if (!accessToken && !isAnonymous) {
          // TODO: handle when UNAUTHORIZED;
          // return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
          return request;
        }

        return request;
      }
    );

    apiInstance.interceptors.response.use(
      (response: AxiosResponse<Response>) => response.data,
      (error: AxiosError<Response>) => {
        // Process error here
        if (error.response?.status === ApiStatusCodes.UNAUTHORIZED) {
          // Redirect to login URL
        }

        return Promise.reject(error);
      }
    );

    return apiInstance;
  }, [accessToken]);

  return api;
}
