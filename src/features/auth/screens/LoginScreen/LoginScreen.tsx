import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";

const LoginScreen = () => {
  useRedirectAfterLogin();
  return <div>LoginScreen</div>;
};

export default LoginScreen;
