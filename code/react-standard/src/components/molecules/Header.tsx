import { useAuth as _useAuth } from "@/modules/authentication";
import { Link } from "wouter";

type Props = {
  title: string;
  useAuth?: typeof _useAuth;
};

export const Header = ({ title, useAuth = _useAuth }: Props) => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <header>
      <h1>{title}</h1>
      {isLoggedIn ? (
        <nav>
          <Link to="/home">
            <a>Home</a>
          </Link>
          /
          <a href="#" onClick={logout}>
            Logout
          </a>
        </nav>
      ) : null}
    </header>
  );
};
