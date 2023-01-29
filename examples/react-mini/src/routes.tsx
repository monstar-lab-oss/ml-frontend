import { lazy } from "react";
import { Switch, Route } from "wouter";

const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@/pages/not-found"));

const routes = () => (
  <Switch>
    <Route path="/">
      <Home />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);
export default routes;
