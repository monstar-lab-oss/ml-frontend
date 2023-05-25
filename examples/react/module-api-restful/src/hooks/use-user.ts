import { useQuery } from "@tanstack/react-query";

async function queryFn() {
  const res = await fetch("https://api.example.com/users");
  return (await res.json()) as { id: string; name: string };
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: queryFn,
  });
}
