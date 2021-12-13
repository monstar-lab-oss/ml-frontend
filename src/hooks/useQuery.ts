import { useQuery as useReactQuery, UseQueryOptions } from "react-query";

import useApi from "@app/hooks/useApi";
import { Response, ApiError } from "@app/types/api.types";

type Options<ResponseData = unknown> = Omit<
  UseQueryOptions<Response<ResponseData>, unknown, Response<ResponseData>>,
  "queryKey"
>;

/**
 *
 * @param url for example: login, users
 */
export default function useQuery<ResponseData = unknown>(
  url: string,
  options?: Options<ResponseData>
) {
  const api = useApi();

  const query = useReactQuery<Response<ResponseData>, ApiError>(
    url,
    () => api.get(url),
    {
      // Disable refetchOnWindowFocus by default, maybe we can set to true in the future
      refetchOnWindowFocus: false,
      ...options,
    }
  );

  return query;
}
