import { createQuery } from "@tanstack/solid-query";
import type { Book } from "../types/book";

async function queryFn() {
  const res = await fetch("https://api.mocks.com/v1/books");
  return (await res.json()) as Book[];
}

export function useBooks() {
  return createQuery(() => ["books"], queryFn);
}
