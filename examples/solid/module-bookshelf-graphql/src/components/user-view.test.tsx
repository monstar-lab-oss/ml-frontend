import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { test, expect } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@solidjs/testing-library";
import { UserView } from "./user-view";
import { JSXElement } from "solid-js";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: JSXElement }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

test("Should return user when page loaded", async () => {
  render(() => <UserView />, { wrapper });

  await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));
  expect(screen.getByRole("heading", { name: "John", level: 2 })).toBeDefined();
});
