import { children, JSXElement } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const queryClient = new QueryClient();

type Props = { children: JSXElement };

export function AppProviders(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children(() => props.children)}
    </QueryClientProvider>
  );
}
