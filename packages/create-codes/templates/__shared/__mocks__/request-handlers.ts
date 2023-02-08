import { rest, graphql } from "msw";

const graph = graphql.link("https://api.example.com/graphql");

const user = {
  id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
  name: "John",
};

export const requestHandlers = [
  rest.get("https://api.example.com/welcome", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ message: "Hello, World!" }));
  }),

  rest.get("https://api.example.com/users", (req, res, ctx) => {
    return res(ctx.json(user));
  }),

  graph.query("GetUser", (req, res, ctx) => {
    return res(ctx.data({ user }));
  }),
];
