import { rest as _rest } from "msw";

const BASE_API_URL = "/api/v1";

// Not support yet: allow to define general configuration https://github.com/mswjs/msw/issues/617
export const rest = {
  get: (url: string, fn) => _rest.get(`${BASE_API_URL}${url}`, fn),
  post: (url: string, fn) => _rest.post(`${BASE_API_URL}${url}`, fn),
  put: (url: string, fn) => _rest.put(`${BASE_API_URL}${url}`, fn),
  delete: (url: string, fn) => _rest.delete(`${BASE_API_URL}${url}`, fn),
} as typeof _rest;
