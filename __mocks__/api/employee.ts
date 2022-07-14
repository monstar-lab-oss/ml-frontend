import { rest } from "../rest";
import type { Employee } from "../../src/types/employee";
import { getItem, setItem, setInitalItem } from "../mockDatabase";

setInitalItem({
  employee: [
    { id: "1", name: "foo" },
    { id: "2", name: "bar" },
    { id: "3", name: "baz" },
  ],
});

// Simple validator to check response status code
const hasValidParams = (
  params: Partial<Employee>,
  employeeList: Employee[]
) => {
  // check if an id already exists in data
  if (employeeList.find((x) => x.id === params?.id)) return false;

  const diffs = [params, employeeList[0]];
  const allKeys = diffs.reduce(
    (k, o) => k.concat(Object.keys(o)),
    [] as string[]
  );
  const union = new Set(allKeys);
  return diffs.every((x) => union.size === Object.keys(x).length);
};

export const employee = [
  rest.post<Employee>("/employee", (req, res, ctx) => {
    const employeeData: Employee[] = getItem("employee");
    if (!hasValidParams(req.body, employeeData)) return res(ctx.status(400));

    setItem("employee", [...employeeData, req.body]);
    return res(ctx.json(req.body));
  }),

  rest.get("/employee/:id", (req, res, ctx) => {
    const employeeData: Employee[] = getItem("employee");
    const item = employeeData.find((x) => x.id === req.params.id);

    return item ? res(ctx.json(item)) : res(ctx.status(400));
  }),

  rest.put<Employee>("/employee/:id", (req, res, ctx) => {
    const employeeData: Employee[] = getItem("employee");

    if (!employeeData.find((x) => x.id === req.params.id))
      return res(ctx.status(400));

    setItem("employee", [...employeeData, req.body]);
    return res(ctx.json({ id: req.params.id }));
  }),

  rest.delete<{ id: string }>("/employee/:id", (req, res, ctx) => {
    const employeeData: Employee[] = getItem("employee");

    if (!employeeData.find((x) => x.id === req.params.id))
      return res(ctx.status(400));

    setItem("employee", [...employeeData, req.body]);
    return res(ctx.json({ id: req.params.id }));
  }),

  rest.get("/employee", (_, res, ctx) => {
    const employeeData: Employee[] = getItem("employee");
    return res(ctx.json(employeeData));
  }),
];
