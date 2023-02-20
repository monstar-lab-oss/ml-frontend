import { graphql } from "msw";
import crypto from "node:crypto";

const seeds = [
  { id: "ad8ea0da", title: "book 1" },
  { id: "0da49c8b", title: "book 2" },
];

let db = [...seeds];

export function reset() {
  db = [...seeds];
}

const graph = graphql.link("https://api.mocks.com/graphql");

// TODO: use resolver
// refs. https://gist.github.com/jinmayamashita/795be1608f316ec3f8316e798a02a8a4

export default [
  graph.query("books", (_, res, ctx) => {
    return res(ctx.data(db));
  }),

  graph.query("book", (req, res, ctx) => {
    const book = db.find((book) => book.id === req.variables.id);
    if (!book) return res(ctx.status(404));

    return res(ctx.data(book));
  }),

  graph.mutation("createBook", (req, res, ctx) => {
    const newBook = {
      id: crypto.randomBytes(4).toString("hex"),
      title: req.variables.title,
    };
    db = [...db, newBook];

    return res(ctx.data(newBook));
  }),

  graph.mutation("updateBook", (req, res, ctx) => {
    const book = db.find((book) => book.id === req.variables.id);
    if (!book) return res(ctx.status(404));

    const updated = {
      id: book.id,
      title: req.variables.title,
    };

    db = db.map((book) => (book.id === req.variables.id ? updated : book));

    return res(ctx.data(updated));
  }),

  graph.mutation("deleteBook", (req, res, ctx) => {
    const book = db.find((book) => book.id === req.variables.id);
    if (!book) return res(ctx.status(404));

    db = db.filter((book) => book.id !== req.variables.id);

    return res(ctx.data({ deleted: true }));
  }),
];
