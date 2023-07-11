import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const query = useQuery({
    queryKey: ["welcome"],
    queryFn: () =>
      // Client-side request are mocked by `__mocks__/browser.ts`.
      fetch("https://api.example.com/welcome").then(
        (res) => res.json() as Promise<{ message: string }>
      ),
    enabled: false,
  });

  const onClick = () => query.refetch();

  return (
    <>
      <pre>Get started by editing src/ui/pages/index.tsx</pre>
      <button onClick={onClick}>Load message</button>

      {query.fetchStatus === "fetching" ? (
        <p aria-label="loading">Loading...</p>
      ) : (
        query.data && <p>{query.data.message}</p>
      )}
    </>
  );
}
