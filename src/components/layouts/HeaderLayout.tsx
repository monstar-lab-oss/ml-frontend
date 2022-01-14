import { useAuth } from "@/hooks/useAuth";
import { PropsWithChildren } from "react";
import { Link } from "wouter";

type Props = PropsWithChildren<{}>;
export const HeaderLayout = ({ children }: Props) => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/count">Count</Link>
            </li>
            <li>
              <Link to="/setcount">SetCount</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : null}
      </ul>
      <div>{children}</div>
    </div>
  );
};
