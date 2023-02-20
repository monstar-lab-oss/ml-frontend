import { test, expect } from "vitest";
import { JSXElement } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { renderHook, waitFor } from "@solidjs/testing-library";
import { useUser } from "./use-user";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: JSXElement }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

test("Should fetch user and set loading and error state", async () => {
  const { result } = renderHook(useUser, { wrapper });

  expect(result.isLoading).toBe(true);

  await waitFor(() => {
    expect(result.isLoading).toBe(false);
  });

  expect(result.data).toEqual({
    id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
    name: "John",
  });
});
