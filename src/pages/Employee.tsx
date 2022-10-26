import { Route, Router, Switch } from "wouter";
import EmployeeList from "@/pages/EmployeeList";
import EmployeeUpdate from "@/pages/EmployeeUpdate";
import EmployeeCreate from "@/pages/EmployeeCreate";

const Employee = () => {
  return (
    <Router base="/employees">
      <EmployeeList />
      <Switch>
        <Route path="/new">
          <EmployeeCreate />
        </Route>
        <Route path="/:id">{({ id }) => <EmployeeUpdate id={id} />}</Route>
      </Switch>
    </Router>
  );
};
export default Employee;