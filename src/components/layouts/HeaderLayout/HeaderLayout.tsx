import { ReactNode } from "react";

import { Link } from "react-router-dom";

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HeaderLayout;
