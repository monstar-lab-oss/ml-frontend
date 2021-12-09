import { Route, Switch } from "wouter";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Profile } from "@/pages/Profile";
import { NotFound } from "@/pages/NotFound";

// TODO
// LoginRedirect.tsx
// RestrictAccess.tsx

export const routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);
