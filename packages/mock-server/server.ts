import { setupServer } from "msw/node";
import { requestHandlers as restfulHandlers } from "./handlers-restful/request-handlers";
import { requestHandlers as graphQLHandlers } from "./handlers-graphql/request-handlers";

export const server = setupServer(...restfulHandlers, ...graphQLHandlers);
