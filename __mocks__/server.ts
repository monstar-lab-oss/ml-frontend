import { setupWorker } from "msw";
import { user } from "./api/user";
import { login } from "./api/login";

const requestHandler = [...login, ...user];

export const mockServer = setupWorker(...requestHandler);
