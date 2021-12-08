import { memo, ReactNode } from "react";

type BlankLayoutProps = {
  children: ReactNode;
};

const BlankLayout = memo(({ children }: BlankLayoutProps) => {
  return <div>{children}</div>;
});

export default BlankLayout;
