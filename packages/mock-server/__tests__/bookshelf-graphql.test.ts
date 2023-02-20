import { describe, test, expect, afterEach } from "vitest";
import { reset } from "../handlers/bookshelf-graphql";
import { request, gql } from "graphql-request";

describe("bookshelf-graphql", () => {
  afterEach(() => reset());

  test("createBook", async () => {
    const data = await request(
      "https://api.mocks.com/graphql",
      gql`
        mutation createBook($title: String!) {
          book(id: $id, title: $title) {
            id
            title
          }
        }
      `,
      { title: "new book" }
    );

    expect(data).toMatchObject({ title: "new book" });
  });

  test("books", async () => {
    const data = await request(
      "https://api.mocks.com/graphql",
      gql`
        query books {
          title
        }
      `
    );

    expect(data).toEqual([
      { id: "ad8ea0da", title: "book 1" },
      { id: "0da49c8b", title: "book 2" },
    ]);
  });

  test("book", async () => {
    const data = await request(
      "https://api.mocks.com/graphql",
      gql`
        query book($id: ID!) {
          book(id: $id) {
            id
            title
          }
        }
      `,
      { id: "ad8ea0da" }
    );

    expect(data).toEqual({ id: "ad8ea0da", title: "book 1" });
  });

  test("updateBook", async () => {
    const data = await request(
      "https://api.mocks.com/graphql",
      gql`
        mutation updateBook($id: ID!, $title: String!) {
          book(id: $id, title: $title) {
            id
            title
          }
        }
      `,
      { id: "ad8ea0da", title: "updated book" }
    );

    expect(data).toEqual({ id: "ad8ea0da", title: "updated book" });
  });

  test("deleteBook", async () => {
    const data = await request(
      "https://api.mocks.com/graphql",
      gql`
        mutation deleteBook($id: ID!) {
          book(id: $id) {
            deleted
          }
        }
      `,
      { id: "ad8ea0da" }
    );

    expect(data).toEqual({ deleted: true });
  });
});
