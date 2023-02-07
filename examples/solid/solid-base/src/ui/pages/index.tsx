import { createQuery } from "@tanstack/solid-query";
import { Match, Switch } from "solid-js";

export default function Home() {
  const query = createQuery(
    () => ["repoData"],
    // Client-side request are mocked by `__mocks__/browser.ts`.
    () => fetch("https://api.example.com/welcome").then((res) => res.json()),
    { enabled: false }
  );

  const onClick = () => query.refetch();

  return (
    <>
      <pre>Get started by editing src/ui/pages/index.tsx</pre>
      <button onClick={onClick}>Load message</button>

      <Switch>
        <Match when={query.fetchStatus === "fetching"}>
          <p aria-label="loading">Loading...</p>
        </Match>
        <Match when={query.isSuccess}>
          <p>{query.data?.message}</p>
        </Match>
      </Switch>
    </>
  );
}
