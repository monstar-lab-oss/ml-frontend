import { rest } from "msw";
import crypto from "node:crypto";

const seeds = [
  { id: "ad8ea0da", title: "book 1" },
  { id: "0da49c8b", title: "book 2" },
];

let db = [...seeds];

export function reset() {
  db = [...seeds];
}

const url = "https://api.mocks.com/v1";

export default [
  rest.get(`${url}/books`, (_, res, ctx) => {
    return res(ctx.json(db));
  }),

  rest.get(`${url}/books/:id`, (req, res, ctx) => {
    const book = db.find((book) => book.id === req.params.id);
    if (!book) return res(ctx.status(404));

    return res(ctx.json(book));
  }),

  rest.post(`${url}/books`, async (req, res, ctx) => {
    const newBook = {
      id: crypto.randomBytes(4).toString("hex"),
      title: (await req.json<{ title: string }>()).title,
    };
    db = [...db, newBook];

    return res(ctx.json(newBook));
  }),

  rest.put(`${url}/books/:id`, async (req, res, ctx) => {
    const book = db.find((book) => book.id === req.params.id);
    if (!book) return res(ctx.status(404));

    const updated = {
      id: book.id,
      title: (await req.json<{ title: string }>()).title,
    };
    db = db.map((book) => (book.id === req.params.id ? updated : book));

    return res(ctx.json(updated));
  }),

  rest.delete(`${url}/books/:id`, async (req, res, ctx) => {
    const book = db.find((book) => book.id === req.params.id);
    if (!book) return res(ctx.status(404));

    db = db.filter((book) => book.id !== req.params.id);

    return res(ctx.status(204));
  }),
];
