import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@app/api/base-query";

import {
  AuthEndpointsEnum,
  AUTH_API_KEY,
  LoginRequestDef,
  LoginResponseDef,
} from "../auth";

export const authApi = createApi({
  reducerPath: AUTH_API_KEY,
  baseQuery,
  endpoints: builder => ({
    postLogin: builder.mutation<LoginResponseDef, LoginRequestDef>({
      query: data => ({
        url: AuthEndpointsEnum.LOGIN,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = authApi;
