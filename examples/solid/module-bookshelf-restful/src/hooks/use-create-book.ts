import { createMutation } from "@tanstack/solid-query";
import type { Book } from "../types/book";

type Payload = Omit<Book, "id">;

async function mutationFn(payload: Payload) {
  const res = await fetch("https://api.mocks.com/v1/books", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return (await res.json()) as Book;
}

export function useCreateBook(payload: Payload) {
  return createMutation({
    mutationFn: () => mutationFn(payload),
  });
}
