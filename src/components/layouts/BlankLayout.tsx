import { PropsWithChildren } from "react";

type Props = PropsWithChildren<Record<string, unknown>>;

export const BlankLayout = ({ children }: Props) => {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>{children}</div>
    </div>
  );
};
