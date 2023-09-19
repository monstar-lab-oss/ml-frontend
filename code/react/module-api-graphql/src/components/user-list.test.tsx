import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { UserList } from "./user-list";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

describe("UserList", () => {
  test("Should render user list when page loaded", async () => {
    render(<UserList />, { wrapper });

    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));

    expect(
      screen.getAllByRole("listitem").map((listitem) => listitem.textContent)
    ).toStrictEqual(["John", "Paul", "George"]);
  });
});
