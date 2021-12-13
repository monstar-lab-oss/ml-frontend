import { http } from "@/utils/http";

export const Login = () => {
  const login = async () => {
    const { token } = await http.post<{ token: string }>("/login", {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    console.log(token);
  };
  return <button onClick={login}>Login</button>;
};
