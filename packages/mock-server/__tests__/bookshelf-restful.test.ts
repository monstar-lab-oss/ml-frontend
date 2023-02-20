import { describe, test, expect, afterEach } from "vitest";
import { reset } from "../handlers/bookshelf-restful";

describe("bookshelf-restful", () => {
  afterEach(() => reset());

  test("create new book", async () => {
    const data = await fetch("https://api.mocks.com/v1/books", {
      method: "post",
      body: JSON.stringify({ title: "new book" }),
    }).then((res) => res.json());

    expect(data).toMatchObject({ title: "new book" });
  });

  test("read book list", async () => {
    const data = await fetch("https://api.mocks.com/v1/books").then((res) =>
      res.json()
    );

    expect(data).toEqual([
      { id: "ad8ea0da", title: "book 1" },
      { id: "0da49c8b", title: "book 2" },
    ]);
  });

  test("read single book", async () => {
    const data = await fetch("https://api.mocks.com/v1/books/ad8ea0da").then(
      (res) => res.json()
    );

    expect(data).toEqual({ id: "ad8ea0da", title: "book 1" });
  });

  test("update single book", async () => {
    const data = await fetch("https://api.mocks.com/v1/books/ad8ea0da", {
      method: "put",
      body: JSON.stringify({ title: "update book" }),
    }).then((res) => res.json());

    expect(data).toEqual({
      id: "ad8ea0da",
      title: "update book",
    });
  });

  test("delete single book", async () => {
    const res = await fetch("https://api.mocks.com/v1/books/ad8ea0da", {
      method: "delete",
    });

    expect(res.status).toBe(204);
  });
});
