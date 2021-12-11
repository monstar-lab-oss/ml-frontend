import {
  useMutation as useReactQueryMutation,
  UseMutationResult,
  UseMutationOptions,
} from "react-query";

import { ApiMethods } from "@app/constants/api.constants";
import useApi from "@app/hooks/useApi";
import { Response } from "@app/types/api.types";

type Options<ResponseData = unknown, RequestData = void> = Omit<
  UseMutationOptions<Response<ResponseData>, unknown, RequestData>,
  "mutationKey"
>;

export default function useMutation<ResponseData = unknown, RequestData = void>(
  url: string,
  method:
    | ApiMethods.POST
    | ApiMethods.PUT
    | ApiMethods.DELETE = ApiMethods.POST,
  options?: Options<ResponseData, RequestData>
): UseMutationResult<Response<ResponseData>, unknown, RequestData> {
  const api = useApi();
  const mutation = useReactQueryMutation<
    Response<ResponseData>,
    unknown,
    RequestData
  >(async data => {
    // A little trick to use mutation dynamically, for example url is /users/:id
    // and request data will be { ":id": 1, name: "Example" }
    // :id in the url will be replace with :id in the request data
    // Note: Waiting this discussion https://github.com/tannerlinsley/react-query/discussions/1226
    let parsedUrl = url;
    if (typeof data === "object") {
      Object.keys(data).forEach(paramStr => {
        const param = paramStr as keyof RequestData;
        if ((param as string).startsWith(":")) {
          parsedUrl = parsedUrl.replace(
            new RegExp(param as string, "g"),
            data[param] as unknown as string
          );
          delete data[param];
        }
      });
    }

    return api[method.toLowerCase() as "post" | "put" | "delete"](url, data);
  }, options);

  return mutation;
}
