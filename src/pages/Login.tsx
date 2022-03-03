import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "wouter";

const Login = () => {
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
      <Button
        onClick={onClick}
        disabled={login.isLoading}
        label={login.isLoading ? "Loading..." : "Login"}
      />
    </>
  );
};
export default Login;
