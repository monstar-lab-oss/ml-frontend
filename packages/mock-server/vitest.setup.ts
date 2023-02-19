import { server } from "./server";
import { beforeAll, afterAll, afterEach } from "vitest";
import fetch from "node-fetch";

// @ts-expect-error
global.fetch = fetch;

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
