import { createQuery } from "@tanstack/solid-query";

async function queryFn() {
  const res = await fetch("https://api.example.com/users");
  return (await res.json()) as { id: string; name: string };
}

export function useUser() {
  return createQuery(() => ["user"], queryFn);
}
