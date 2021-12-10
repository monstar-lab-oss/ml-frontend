import { setupWorker, rest } from "msw";

const BASE = "/api/v1";

const users = [
  rest.get(`${BASE}/users/1`, (_, res, ctx) =>
    res(
      ctx.json({
        data: {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        support: {
          url: "https://reqres.in/#support-heading",
          text: "To keep ReqRes free, contributions towards server costs are appreciated!",
        },
      })
    )
  ),
];

const login = [
  rest.post(`${BASE}/login`, (_, res, ctx) =>
    res(
      ctx.json({
        token: "QpwL5tke4Pnpja7X4",
      })
    )
  ),
];

const requestHandler = [...users, ...login];

export const mockServer = setupWorker(...requestHandler);
