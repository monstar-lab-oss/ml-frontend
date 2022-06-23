import { LOCAL_STORAGE_TOKEN_KEY } from "@/constants/localStorage";

const ENDPOINT = import.meta.env.VITE_REACT_APP_API_HOST || "/api/v1";

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
  const data: T = await response.json();
  return data;
};

export const http = {
  get: <T>(url: string) => request<T>(url),
  // FIXME: parameter used in hooks/useAuth.tsx may be wrong.
  post: <T>(url: string, body: any) =>
    request<T>(url, { method: "POST", body }),
};
