/**
 * Response type of API
 * Need to use generic Data, so if your API return response format like the following
 * { status: boolean, data: any, message: string }
 * you can modify the Response type like below
export type Response<Data = unknown> = {
  status: boolean;
  data: Data;
  message?: string;
};
 *
 */
export type Response<Data = unknown> = Data;
