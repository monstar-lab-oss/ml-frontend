import { setupServer } from "msw/node";
import bookShelfRestful from "./handlers/bookshelf-restful";
import bookShelfGraphQL from "./handlers/bookshelf-graphql";

// TODO: remove unused handlers
import { requestHandlers as restfulHandlers } from "./handlers-restful/request-handlers";
import { requestHandlers as graphQLHandlers } from "./handlers-graphql/request-handlers";

const handlers = [
  ...bookShelfRestful,
  ...bookShelfGraphQL,
  // TODO: remove unused handlers
  ...restfulHandlers,
  ...graphQLHandlers,
];

export const server = setupServer(...handlers);
