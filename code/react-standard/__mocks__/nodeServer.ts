import { setupServer } from "msw/node";
import { resetEmployeeDatabase } from "./api/employee";
import handlers from "./handlers";

beforeAll(() => mockNodeServer.listen());
afterEach(() => {
  mockNodeServer.resetHandlers();

  resetEmployeeDatabase();
});
afterAll(() => mockNodeServer.close());

export const mockNodeServer = setupServer(...handlers);
