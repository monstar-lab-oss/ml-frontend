const ENDPOINT = import.meta.env.VITE_REACT_APP_API_HOST || "/api/v1";

const http = async (url: string, opts?: RequestInit): Promise<any> => {
  const response = await fetch(`${ENDPOINT}${url}`, {
    ...opts,
    method: opts?.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(opts?.body),
  });

  const data = await response.json();
  return data;
};

export const request = {
  get: (url: string) => http(url),
  post: (url: string, body: any) => http(url, { method: "POST", body }),
};
