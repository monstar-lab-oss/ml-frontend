import { test, expect } from "vitest";
import { JSXElement } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { renderHook, waitFor } from "@solidjs/testing-library";
import { useUpdateBook } from "./use-update-book";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: JSXElement }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

test("Should update a single book and set loading and error state", async () => {
  const { result } = renderHook(
    () => useUpdateBook("ad8ea0da", { title: "updated book" }),
    {
      wrapper,
    }
  );

  // fire mutate function
  result.mutate();

  expect(result.isLoading).toBe(true);

  await waitFor(() => expect(result.isLoading).toBe(false));

  expect(result.data).toStrictEqual({ id: "ad8ea0da", title: "updated book" });
  expect(result.isError).toBe(false);
});
