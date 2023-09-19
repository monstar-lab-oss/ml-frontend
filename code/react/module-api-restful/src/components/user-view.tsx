import { useUser } from "../hooks/use-user";

type Props = {
  id: string;
};

export function UserView({ id }: Props) {
  const { isLoading, isError, data } = useUser(id);

  if (isLoading) return <span aria-label="loading">Loading...</span>;
  if (isError) return <span aria-label="error">Error</span>;
  if (!data) return <span>No data!</span>;

  return <h2>{data.name}</h2>;
}
