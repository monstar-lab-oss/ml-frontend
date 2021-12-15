import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export const BlankLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};
