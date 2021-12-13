import { useAuth } from "@/hooks/useAuth";

export const Login = () => {
  const { login } = useAuth();

  const onClick = () =>
    login({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });

  return (
    <div>
      <div>LoginScreen</div>
      <button onClick={onClick} disabled={login.isLoading}>
        {login.isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
};
