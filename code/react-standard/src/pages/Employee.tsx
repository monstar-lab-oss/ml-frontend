import { Route, Router, Switch } from "wouter";
import {
  EmployeeList,
  EmployeeUpdate,
  EmployeeCreate,
} from "@/modules/employee-restful";

const Employee = () => {
  return (
    <Router base="/employees">
      <EmployeeList />
      <Switch>
        <Route path="/new">
          <EmployeeCreate />
        </Route>
        <Route path="/:id">
          {({ id }) => (id ? <EmployeeUpdate id={id} /> : null)}
        </Route>
      </Switch>
    </Router>
  );
};
export default Employee;
