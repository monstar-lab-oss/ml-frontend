import { createQuery } from "@tanstack/solid-query";
import type { Book } from "../types/book";

async function queryFn(id: Book["id"]) {
  const res = await fetch(`https://api.mocks.com/v1/books/${id}`);
  return (await res.json()) as Book[];
}

export function useBook(id: Book["id"]) {
  return createQuery(
    () => ["book", id],
    () => queryFn(id)
  );
}
