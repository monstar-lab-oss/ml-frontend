import { useUser } from "../hooks/use-user";

export function UserView() {
  const query = useUser();

  if (query.isLoading) return <span aria-label="loading">Loading...</span>;
  if (query.isError) return <span aria-label="error">Error</span>;

  return <h2>{query.data?.user.name}</h2>;
}
