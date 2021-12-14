import { ReactNode } from "react";

import { Link } from "react-router-dom";

import { useAuth, useLogout } from "@app/features/auth/auth";

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { isLoggedIn } = useAuth();
  const { logout } = useLogout();

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/users">User List</Link>
        </li>
      </ul>
      {isLoggedIn && <button onClick={logout}>Logout</button>}
      <div>{children}</div>
    </div>
  );
};

export default HeaderLayout;
