import { rest } from "msw";

export const requestHandlers = [
  rest.get("https://api.example.com/welcome", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json({ message: "Hello, World!" }));
  }),
];
