import { rest } from "../rest";
import { getItem, setItem, setInitalItem } from "../mockDatabase";

const testUser = {
  id: 1,
  email: "george.bluth@reqres.in",
  first_name: "George",
  last_name: "Bluth",
  avatar: "https://reqres.in/img/faces/1-image.jpg",
  avatar_size_width: 128,
  avatar_size_height: 128,
};
setInitalItem({ testUser });

// Validate a token in the backend that is specific to a user
const isValidatedAccessToken = (token?: string) => !!token;

export const user = [
  rest.get("/users/1", (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ").at(-1);

    if (!isValidatedAccessToken(token)) {
      return res(
        ctx.status(401),
        ctx.json({
          error: "Invalid Access Token",
        })
      );
    }

    return res(ctx.json(getItem("testUser")));
  }),
  rest.post<{
    email: string;
    first_name: string;
    last_name: string;
  }>("/users/1", (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.split(" ").at(-1);

    if (!isValidatedAccessToken(token)) {
      return res(
        ctx.status(401),
        ctx.json({
          error: "Invalid Access Token",
        })
      );
    }

    setItem("testUser", {
      ...testUser,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    return res(
      ctx.delay(1000),
      ctx.json({
        message: "Update success!\nYou can check with reload or refresh a page",
      })
    );
  }),
];
