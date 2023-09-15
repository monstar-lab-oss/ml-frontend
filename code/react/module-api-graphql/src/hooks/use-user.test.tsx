import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useUsers } from "./use-user";

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
