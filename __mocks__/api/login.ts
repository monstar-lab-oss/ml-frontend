import { rest } from "../rest";

export const login = [
  rest.post("/login", (_, res, ctx) =>
    res(
      // Delays response for 2000ms.
      ctx.delay(1000),
      ctx.json({
        token: "QpwL5tke4Pnpja7X4",
      })
    )
  ),
];
