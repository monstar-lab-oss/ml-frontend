import { LOCAL_STORAGE_TOKEN_KEY } from "@/constants/localStorage";
import { getApiHost } from '@/utils/env'

const ENDPOINT = getApiHost() || "/api/v1";

const request = async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const fullPath = /^https?:\/\/[\w]/.test(url) ? url : `${ENDPOINT}${url}`;

  const response = await fetch(fullPath, {
    ...opts,
    method: opts?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
    },
    body: JSON.stringify(opts?.body),
  });
  // TODO handle error
  try {
    const data: T = await response.json();
    return data;
  } catch (e) {
    throw new HttpError('Server error') 
  }
};
// FIXME: parameter used in hooks/useAuth.tsx may be wrong.
export const http = {
  get: <T>(url: string) => request<T>(url),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(url: string, body: any) =>
    request<T>(url, { method: "POST", body }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: <T>(url: string, body: any) => request<T>(url, { method: "PUT", body }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};

export class HttpError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}