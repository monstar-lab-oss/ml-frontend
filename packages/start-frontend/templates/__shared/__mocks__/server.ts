import { setupServer } from "msw/node";
import { requestHandlers } from "./request-handlers";

export const server = setupServer(...requestHandlers);
