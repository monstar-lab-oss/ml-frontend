import { rest } from "../rest";

export const login = [
  rest.post("/login", async (req, res, ctx) => {
    const { email, password } = await req.json();

    return res(
      // Delays response for 1000ms.
      ctx.delay(1000),
      email !== "eve.holt@reqres.in" || password !== "cityslicka"
        ? ctx.status(401)
        : ctx.json({ token: "QpwL5tke4Pnpja7X4" })
    );
  }),
];
