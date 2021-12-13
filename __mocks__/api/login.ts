import { rest } from "../rest";

export const login = [
  rest.post("/login", (_, res, ctx) =>
    res(
      ctx.json({
        token: "QpwL5tke4Pnpja7X4",
      })
    )
  ),
];
