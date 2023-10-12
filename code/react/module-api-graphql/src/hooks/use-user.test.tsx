import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor, act } from "@testing-library/react";
import {
  useAddUser,
  useRemoveUser,
  useUpdateUser,
  useUser,
  useUsers,
} from "./use-user";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = (props: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

describe("useUsers", () => {
  test("Should fetch users and update loading and error state", async () => {
    const { result } = renderHook(useUsers, { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toStrictEqual([
      {
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        name: "John",
      },
      {
        id: "l7rWHn41-f5G9-6iBf-DV2T-yhYhhtD1kFbz",
        name: "Paul",
      },
      {
        id: "kOnspSl2-U70y-ffLq-32bi-aG5FtG0J18mn",
        name: "George",
      },
    ]);
    expect(result.current.isError).toBe(false);
  });
});

describe("useUser", () => {
  test("Should fetch user and set loading and error state", async () => {
    const { result } = renderHook(
      () => useUser("l7rWHn41-f5G9-6iBf-DV2T-yhYhhtD1kFbz"),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toStrictEqual({
      id: "l7rWHn41-f5G9-6iBf-DV2T-yhYhhtD1kFbz",
      name: "Paul",
    });

    expect(result.current.isError).toBe(false);
  });
});

describe("useAddUser", () => {
  test("Should add a user without any errors", async () => {
    const { result } = renderHook(useAddUser, { wrapper });

    await act(async () => result.current.mutate({ name: "Ringo" }));

    expect(result.current.data).toMatchObject({ name: "Ringo" });
    expect(result.current.isError).toBe(false);
  });
});

describe("useUpdateUser", () => {
  test("Should update a user without any errors", async () => {
    const { result } = renderHook(useUpdateUser, { wrapper });

    await act(async () =>
      result.current.mutate({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        name: "Brian",
      })
    );

    expect(result.current.data).toStrictEqual({
      id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
      name: "Brian",
    });
    expect(result.current.isError).toBe(false);
  });
});

describe("useRemoveUser", () => {
  test("Should remove a user without any errors", async () => {
    const { result } = renderHook(useRemoveUser, { wrapper });

    await act(async () =>
      result.current.mutate("f79e82e8-c34a-4dc7-a49e-9fadc0979fda")
    );
    expect(result.current.status).toBe("success");
    expect(result.current.isError).toBe(false);
  });
});
