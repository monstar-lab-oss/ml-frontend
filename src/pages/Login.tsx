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
    <div>
      <div>LoginScreen</div>
      <button onClick={onClick} disabled={login.isLoading}>
        {login.isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
};
