import { usePostLoginMutation } from "../../auth";
import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";

const LoginScreen = () => {
  useRedirectAfterLogin();
  const [postLogin, { isLoading }] = usePostLoginMutation();

  const handleLogin = () => {
    postLogin({
      email: "george.bluth@reqres.in",
      password: "password",
    });
  };

  return (
    <div>
      <div>LoginScreen</div>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
};

export default LoginScreen;
