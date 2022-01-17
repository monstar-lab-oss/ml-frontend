import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";

export const Login = () => {
  const { isLoggedIn, login } = useAuth();

  const onClick = () =>
    login({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });

  return isLoggedIn ? (
    <Redirect to="/home" />
  ) : (
    <>
      <h2>LoginScreen</h2>
      <button onClick={onClick} disabled={login.isLoading}>
        {login.isLoading ? "Loading..." : "Login"}
      </button>
    </>
  );
};
