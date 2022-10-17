import { setupWorker } from "msw";
import { user } from "./api/user";
import { employee } from "./api/employee";
import { login } from "./api/login";

const requestHandler = [...login, ...user, ...employee];

export const mockServer = setupWorker(...requestHandler);
