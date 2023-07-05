import { setupWorker } from "msw";
import { requestHandlers } from "./request-handlers";

export const worker = setupWorker(...requestHandlers);
