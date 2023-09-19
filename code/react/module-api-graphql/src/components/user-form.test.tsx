import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import {
  act,
  render,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import { UserForm } from "./user-form";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

describe("UserForm", () => {
  test("Should add a user when submitted", async () => {
    render(<UserForm />, { wrapper });

    const user = userEvent.setup();

    await act(async () => user.type(screen.getByRole("textbox"), "Ringo"));

    await act(async () =>
      user.click(screen.getByRole("button", { name: "Submit" }))
    );

    // TODO: Add assertion here to check if the user is added using GraphQL
    // For example:
    // expect(someGraphQLFunctionToCheckUserAddition).toHaveBeenCalledWith("Ringo");
  });

  test("Should update user when submitted", async () => {
    const id = "f79e82e8-c34a-4dc7-a49e-9fadc0979fda";
    render(<UserForm id={id} />, { wrapper });
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const user = userEvent.setup();

    await act(async () => user.type(screen.getByRole("textbox"), "Carl"));
    await act(async () =>
      user.click(screen.getByRole("button", { name: "Submit" }))
    );

    // TODO: Add assertion here to check if the user is updated using GraphQL
    // For example:
    // expect(someGraphQLFunctionToCheckUserUpdate).toHaveBeenCalledWith(id, "Carl");
  });

  test("Should remove user when remove button is clicked", async () => {
    const id = "kOnspSl2-U70y-ffLq-32bi-aG5FtG0J18mn";
    render(<UserForm id={id} />, { wrapper });

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const user = userEvent.setup();

    await act(async () =>
      user.click(screen.getByRole("button", { name: "Remove" }))
    );

    // TODO: Add assertion here to check if the user is removed using GraphQL
    // For example:
    // expect(someGraphQLFunctionToCheckUserRemoval).toHaveBeenCalledWith(id);
  });
});
