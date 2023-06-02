import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { useUser } from "./use-user";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

test("Should fetch user and set loading and error state", async () => {
  const { result } = renderHook(useUser, { wrapper });

  expect(result.current.isLoading).toBe(true);

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.data).toStrictEqual({
    id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
    name: "John",
  });
});
