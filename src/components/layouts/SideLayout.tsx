import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export const SideLayout = ({ children }: Props) => {
  return (
    <div>
      <div>side</div>
      {children}
    </div>
  );
};
