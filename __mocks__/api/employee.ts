import { rest } from "../rest";

type Employee = { id: string; name: string };

const items: Employee[] = [
  { id: "1", name: "foo" },
  { id: "2", name: "bar" },
  { id: "3", name: "baz" },
];

// Simple validator to check response status code
const hasValidParams = (params: Partial<Employee>) => {
  // check if an id already exists in data
  if (items.find((x) => x.id === params?.id)) return false;

  const diffs = [params, items[0]];
  const allKeys = diffs.reduce(
    (k, o) => k.concat(Object.keys(o)),
    [] as string[]
  );
  const union = new Set(allKeys);
  return diffs.every((x) => union.size === Object.keys(x).length);
};

export const employee = [
  rest.post<Employee>("/employee", (req, res, ctx) =>
    hasValidParams(req.body)
      ? res(ctx.json([...items, req.body]))
      : res(ctx.status(400))
  ),

  rest.get("/employee/:id", (req, res, ctx) => {
    const item = items.find((x) => x.id === req.params.id);

    return item ? res(ctx.json(item)) : res(ctx.status(400));
  }),

  rest.put<Employee>("/employee/:id", (req, res, ctx) =>
    items.find((x) => x.id === req.params.id)
      ? res(
          ctx.json(
            items.map((x) =>
              x.id === req.params.id ? { ...x, ...req.body } : x
            )
          )
        )
      : res(ctx.status(400))
  ),

  rest.delete<{ id: string }>("/employee/:id", (req, res, ctx) =>
    items.find((x) => x.id === req.params.id)
      ? res(ctx.json(items.filter((x) => x.id === req.params.id)))
      : res(ctx.status(400))
  ),

  rest.get("/employee", (_, res, ctx) => res(ctx.json(items))),
];
