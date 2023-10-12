import { rest } from "msw";

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

const endpoint = "https://api.example.com";

export const requestHandlers = [
  rest.get(`${endpoint}/users`, (_, res, ctx) => {
    return res(ctx.json(users));
  }),

  rest.get(`${endpoint}/user/:id`, (req, res, ctx) => {
    return res(ctx.json(users.find((user) => user.id === req.params.id)));
  }),

  rest.post(`${endpoint}/user`, async (req, res, ctx) => {
    const id = generateId();
    const { name } = (await req.json()) as { name: string };

    users = [...users, { id, name }];

    return res(ctx.status(201), ctx.json({ id, name }));
  }),

  rest.patch(`${endpoint}/user/:id`, async (req, res, ctx) => {
    const { name } = (await req.json()) as { name: string };
    users = users.map((user) => (user.id !== req.params.id ? user : user));

    return res(ctx.status(200), ctx.json({ id: req.params.id, name }));
  }),

  rest.delete(`${endpoint}/user/:id`, async ({ params }, res, ctx) => {
    users = users.filter(({ id }) => id !== params.id);

    return res(ctx.status(204));
  }),
];
