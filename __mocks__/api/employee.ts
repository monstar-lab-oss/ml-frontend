import { rest } from "../rest";
import type { Employee } from "../../src/types/employee";
import { getItem, setItem } from "../mockDatabase";

const createId = () => String(Math.floor(Date.now() * Math.random()));

const setInitialEmployees = () => {
  setItem('employee', [
    { id: '2', name: "foo" },
    { id: '3', name: "bar" },
    { id: '4', name: "baz" },
    { id: '5', name: "error employee" }, // Can not update or delete this user
  ]);
}

getItem("employee") ?? setInitialEmployees();

const getEmployeeById = (id: Employee["id"]) =>
  (getItem("employee") as Employee[]).find((x) => x.id === id);

export const employee = [
  rest.get("/users", (_, res, ctx) =>
    res(ctx.json({ data: getItem("employee") as Employee[] }))
  ),

  rest.get("/users/:id", (req, res, ctx) => {
    const employee = getEmployeeById(req.params.id as string);
    return employee ? res(ctx.json(employee)) : res(ctx.status(400));
  }),

  rest.post<Omit<Employee, "id">>("/users", (req, res, ctx) => {
    setItem("employee", [
      ...getItem("employee"),
      { id: createId(), ...req.body },
    ]);
    return res(ctx.json({ message: "create success" }));
  }),

  rest.put<Omit<Employee, "id">>("/users/:id", (req, res, ctx) => {
    const employee = getEmployeeById(req.params.id as string);
    if (!employee) return res(ctx.status(400));

    if (employee.id === '5') {
      return res(ctx.status(500))
    }

    setItem("employee", [
      ...(getItem("employee") as Employee[]).map((x) =>
        x.id === employee.id ? { ...x, ...req.body } : x
      ),
    ]);
    return res(ctx.json({ message: "update success" }));
  }),

  rest.delete<{ id: Employee["id"] }>("/users/:id", (req, res, ctx) => {
    const employee = getEmployeeById(req.params.id as string);
    if (!employee) return res(ctx.status(400));

    if (employee.id === '5') {
      return res(ctx.status(500))
    }

    setItem("employee", [
      ...(getItem("employee") as Employee[]).filter(
        (x) => x.id !== employee.id
      ),
    ]);
    return res(ctx.json({ message: "remove success" }));
  }),
];

export const resetEmployeeDatabase = setInitialEmployees
