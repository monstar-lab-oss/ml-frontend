import { PropsWithChildren } from "react";

type Props = PropsWithChildren<Record<string, unknown>>;

export const SideLayout = ({ children }: Props) => {
  return (
    <div>
      <div>side</div>
      {children}
    </div>
  );
};
