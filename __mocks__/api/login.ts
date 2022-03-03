import { rest } from "../rest";

export const login = [
  rest.post("/login", (_, res, ctx) =>
    res(
      // Delays response for 1000ms.
      ctx.delay(1000),
      ctx.json({
        token: "QpwL5tke4Pnpja7X4",
      })
    )
  ),
];
