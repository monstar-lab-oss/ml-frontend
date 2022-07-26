import { PropsWithChildren } from "react";
import { Header } from "@/components/molecules/Header";

type Props = PropsWithChildren<Record<string, unknown>>;

export const HeaderLayout = ({ children }: Props) => (
  <div>
    <Header title="React boilerplate" />
    <main>{children}</main>
  </div>
);
