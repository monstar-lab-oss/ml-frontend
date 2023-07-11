import { setupWorker } from "msw";
import handlers from "./handlers";

export const mockServer = setupWorker(...handlers);
