import { rest } from "../rest";
import type { Employee } from "../../src/types/employee";
import { getItem, setItem, setInitalItem } from "../mockDatabase";

const createId = () => String(Math.floor(Date.now() * Math.random()));

setInitalItem({
  employee: [
    { id: createId(), name: "foo" },
    { id: createId(), name: "bar" },
    { id: createId(), name: "baz" },
  ],
});

const getEmployeeById = (id: Employee["id"]) =>
  (getItem("employee") as Employee[]).find((x) => x.id === id);

export const employee = [
  rest.get("/employee", (_, res, ctx) =>
    res(ctx.json(getItem("employee") as Employee[]))
  ),

  rest.get("/employee/:id", (req, res, ctx) => {
    const employee = getEmployeeById(req.params.id as string);
    return employee ? res(ctx.json(employee)) : res(ctx.status(400));
  }),

  rest.post<Omit<Employee, "id">>("/employee", (req, res, ctx) => {
    setItem("employee", [
      ...getItem("employee"),
      { id: createId(), ...req.body },
    ]);
    return res(ctx.json({ message: "create success" }));
  }),

  rest.put<Omit<Employee, "id">>("/employee/:id", (req, res, ctx) => {
    const employee = getEmployeeById(req.params.id as string);
    if (!employee) return res(ctx.status(400));

    setItem("employee", [
      ...(getItem("employee") as Employee[]).map((x) =>
        x.id === employee.id ? { ...x, ...req.body } : x
      ),
    ]);
    return res(ctx.json({ message: "update success" }));
  }),
];
