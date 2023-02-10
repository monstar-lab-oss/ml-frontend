import { rest } from "msw";

const user = {
  id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
  name: "John",
};

export const requestHandlers = [
  rest.get("https://api.example.com/users", (req, res, ctx) => {
    return res(ctx.json(user));
  }),
];
