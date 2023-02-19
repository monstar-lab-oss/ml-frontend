import { setupServer } from "msw/node";
import bookShelfRestful from "./handlers/bookshelf-restful";

import { requestHandlers as restfulHandlers } from "./handlers-restful/request-handlers";
import { requestHandlers as graphQLHandlers } from "./handlers-graphql/request-handlers";

const handlers = [...bookShelfRestful, ...restfulHandlers, ...graphQLHandlers];

export const server = setupServer(...handlers);
