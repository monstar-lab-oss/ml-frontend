import { createMutation } from "@tanstack/solid-query";
import type { Book } from "../types/book";

type Payload = Omit<Book, "id">;

async function mutationFn(id: Book["id"], payload: Payload) {
  const res = await fetch(`https://api.mocks.com/v1/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return (await res.json()) as Book;
}

export function useUpdateBook(id: Book["id"], payload: Payload) {
  return createMutation({
    mutationFn: () => mutationFn(id, payload),
  });
}
