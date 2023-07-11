import { NavLink } from "@/ui/nav-link";
import { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavLink />
      {children}
    </>
  );
}
