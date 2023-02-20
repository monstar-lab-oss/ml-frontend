import { createMutation } from "@tanstack/solid-query";
import type { Book } from "../types/book";

async function mutationFn(id: Book["id"]) {
  const res = await fetch(`https://api.mocks.com/v1/books/${id}`, {
    method: "DELETE",
  });

  return res.ok;
}

export function useDeleteBook(id: Book["id"]) {
  return createMutation({
    mutationFn: () => mutationFn(id),
  });
}
