import { server } from "./__mocks__/server";
import { beforeAll, afterAll, afterEach } from "vitest";
import fetch from "node-fetch";

//@ts-expect-error Add `fetch` polyfill. but only use testing
global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
