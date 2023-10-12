import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { UserView } from "./user-view";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

describe("UserView", () => {
  test("Should render user when page loaded", async () => {
    render(<UserView id={"f79e82e8-c34a-4dc7-a49e-9fadc0979fda"} />, {
      wrapper,
    });

    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));
    expect(
      screen.getByRole("heading", { name: "John", level: 2 })
    ).toBeDefined();
  });
});
