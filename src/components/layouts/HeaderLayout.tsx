import { ReactNode } from "react";
import { Link } from "wouter";

type Props = {
  children: ReactNode;
};
export const HeaderLayout = ({ children }: Props) => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
    <div>{children}</div>
  </div>
);
