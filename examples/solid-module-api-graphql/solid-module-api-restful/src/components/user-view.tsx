import { useUser } from "../hooks/use-user";
import { Match, Switch } from "solid-js";

export function UserView() {
  const query = useUser();

  return (
    <Switch>
      <Match when={query.isLoading}>
        <span aria-label="loading">Loading...</span>
      </Match>
      <Match when={query.isError}>
        <span aria-label="error">Error</span>
      </Match>
      <Match when={query.isSuccess}>
        <h2>{query.data?.name}</h2>
      </Match>
    </Switch>
  );
}
