import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@app/api/base-query";

import { UserEndpointsEnum } from "../constants/user.endpoints";
import { UserDef, UserResponseDef, USER_API_KEY } from "../user";

export const userApi = createApi({
  reducerPath: USER_API_KEY,
  baseQuery,
  endpoints: builder => ({
    getUser: builder.query<UserDef, number>({
      query: id => `${UserEndpointsEnum.USERS}/${id}`,
      transformResponse: (response: UserResponseDef) => ({
        ...response.data,
        name: `${response.data.first_name} ${response.data.last_name}`,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
