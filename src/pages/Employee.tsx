import { Route, Router, Switch } from "wouter";

// TODO: not yet implemented
const EmployeeList = () => <>list</>;

// TODO: not yet implemented
const EmployeeCreate = () => <>create</>;

// TODO: not yet implemented
const EmployeeUpdate = ({ id }: { id: string }) => <>update {id}</>;

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
