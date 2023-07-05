import React, { FC, ReactElement } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { RenderOptions } from "@testing-library/react";
import { render } from "@/tests/utils";
import "@/__mocks__/nodeServer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set retry to false for testing error test cases
      // because if retry: true react-query will retry and cause timeout error in testing
      retry: false,
    },
  },
});

const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default function renderWithQueryClient(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: Provider, ...options });
}
