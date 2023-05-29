import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { PropsWithChildren } from "react";
import { UserView } from "./user-view";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

test("Should return user when page loaded", async () => {
  render(<UserView />, { wrapper });

  await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));
  expect(screen.getByRole("heading", { name: "John", level: 2 })).toBeDefined();
});
