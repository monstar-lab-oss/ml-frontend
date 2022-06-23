import { PropsWithChildren } from "react";
import { Header } from "@/components/molecules/Header";

type Props = PropsWithChildren<Record<string, unknown>>;

export const HeaderLayout = ({ children }: Props) => (
  <div>
    <Header title="Admin app" />
    <main style={{ padding: 24 }}>{children}</main>
  </div>
);
