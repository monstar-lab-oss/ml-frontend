import { request } from "@/utils/request";

export const Login = () => {
  const login = async () => {
    const token = await request.post("/login", {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    console.log(token);
  };
  return <button onClick={login}>Login</button>;
};
