import { useMemo } from "react";

import axios, { AxiosResponse, AxiosError } from "axios";

import { ENV } from "@app/constants/env";
import { Response } from "@app/types/api.types";

export default function useApi() {
  // TODO: Get token from context
  const api = useMemo(() => {
    const apiInstance = axios.create({
      baseURL: ENV.API_HOST,
      headers: { "Content-Type": "application/json" },
    });

    apiInstance.interceptors.response.use(
      (response: AxiosResponse<Response>) => response.data,
      (error: AxiosError<Response>) => {
        // Process error here
        if (error.response?.status === 401) {
          // Redirect to login URL
        }

        return Promise.reject(error);
      }
    );

    return apiInstance;
  }, []);

  return api;
}
