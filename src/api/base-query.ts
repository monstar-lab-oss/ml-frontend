import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { ENV } from "@app/constants/env";
import { RootState } from "@app/redux/root-reducer";

export const baseQuery = fetchBaseQuery({
  baseUrl: ENV.API_HOST,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});
