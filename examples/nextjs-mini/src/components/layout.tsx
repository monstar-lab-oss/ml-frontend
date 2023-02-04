import Head from "next/head";
import { PropsWithChildren } from "react";

type Props = {
  title?: string;
};
export function Layout({ title, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>{title || "Next.js App"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/next.svg" />
      </Head>
      <div>{children}</div>
    </>
  );
}
