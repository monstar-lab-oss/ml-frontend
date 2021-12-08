import { AUTH_ROUTES } from "@app/features/auth/auth";
import { HOME_ROUTES } from "@app/features/home/home";
import { USER_ROUTES } from "@app/features/user/user";

export const ROOT_ROUTE = "/";

export const PUBLIC_LIST = [...AUTH_ROUTES, ...HOME_ROUTES];
export const PRIVATE_LIST = [...USER_ROUTES];
