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
  beforeAll(() => {
    vi.spyOn(global, "fetch");
  });

  test("Should add a user when submitted", async () => {
    render(<UserForm />, { wrapper });

    const user = userEvent.setup();

    await act(async () => user.type(screen.getByRole("textbox"), "Ringo"));

    await act(async () =>
      user.click(screen.getByRole("button", { name: "Submit" }))
    );

    // Verify that the correct API endpoint and data were fetched
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/user", {
      method: "POST",
      body: JSON.stringify({ name: "Ringo" }),
    });
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

    // Verify that the correct API endpoint and data were fetched
    expect(fetch).toHaveBeenCalledWith(`https://api.example.com/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: "Carl" }),
    });
  });

  test("Should remove user when remove button is clicked", async () => {
    const id = "kOnspSl2-U70y-ffLq-32bi-aG5FtG0J18mn";
    render(<UserForm id={id} />, { wrapper });

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const user = userEvent.setup();

    await act(async () =>
      user.click(screen.getByRole("button", { name: "Remove" }))
    );

    // Verify that the correct API endpoint and data were fetched
    expect(fetch).toHaveBeenCalledWith(`https://api.example.com/user/${id}`, {
      method: "DELETE",
    });
  });
});
