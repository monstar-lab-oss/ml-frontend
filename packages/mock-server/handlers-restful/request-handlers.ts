import { graphql } from "msw";

const graph = graphql.link("https://api.example.com/graphql");

const user = {
  id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
  name: "John",
};

export const requestHandlers = [
  graph.query("GetUser", (req, res, ctx) => {
    return res(ctx.data({ user }));
  }),
];
