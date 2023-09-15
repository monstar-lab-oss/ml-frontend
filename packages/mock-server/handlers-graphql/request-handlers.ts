import { graphql } from "msw";

const graph = graphql.link("https://api.example.com/graphql");

function generateId() {
  return `${hash(8)}-${hash(4)}-${hash(4)}-${hash(4)}-${hash(12)}`;
}

function hash(n: number) {
  return btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(n)))
  ).substring(0, n);
}

let users = [
  {
    id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
    name: "John",
  },
  {
    id: "l7rWHn41-f5G9-6iBf-DV2T-yhYhhtD1kFbz",
    name: "Paul",
  },
  {
    id: "kOnspSl2-U70y-ffLq-32bi-aG5FtG0J18mn",
    name: "George",
  },
];

export const requestHandlers = [
  graph.query("GetUserList", (_, res, ctx) => {
    return res(ctx.data(users));
  }),

  graph.query("GetUser", ({ variables }, res, ctx) => {
    const user = users.find((user) => user.id === variables.id);

    if (!user)
      return res(ctx.status(404), ctx.errors([{ message: "User not found" }]));

    return res(ctx.data(user));
  }),

  graph.mutation("AddUser", async ({ variables }, res, ctx) => {
    const id = generateId();
    const { name } = variables;
    users = [...users, { id, name }];

    return res(ctx.data({ id, name }));
  }),

  graph.mutation("UpdateUser", ({ variables }, res, ctx) => {
    users = users.map((user) => (user.id !== variables.id ? user : user));

    return res(ctx.data({ id: variables.id, name: variables.name }));
  }),

  graph.mutation("RemoveUser", ({ variables }, res, ctx) => {
    users = users.filter(({ id }) => id !== variables.id);

    return res(ctx.status(204));
  }),
];
