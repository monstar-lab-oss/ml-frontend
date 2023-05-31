import { test, expect } from "vitest";
import { JSXElement } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { renderHook, waitFor } from "@solidjs/testing-library";
import { useBook } from "./use-book";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: JSXElement }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

test("Should fetch a single book and set loading and error state", async () => {
  const { result } = renderHook(() => useBook("ad8ea0da"), { wrapper });

  expect(result.isLoading).toBe(true);

  await waitFor(() => expect(result.isLoading).toBe(false));

  expect(result.data).toStrictEqual({ id: "ad8ea0da", title: "book 1" });
  expect(result.isError).toBe(false);
});

// test
