import { useUsers } from "../hooks/use-user";

export function UserList() {
  const { isLoading, isError, data } = useUsers();

  if (isLoading) return <span aria-label="loading">Loading...</span>;
  if (isError) return <span aria-label="error">Error</span>;
  if (!data.length) return <span>No data!</span>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
