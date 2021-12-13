import { PropsWithChildren } from "react";
import { Redirect, Route, Switch } from "wouter";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Profile } from "@/pages/Profile";
import { NotFound } from "@/pages/NotFound";
import { HeaderLayout } from "@/components/layouts/HeaderLayout";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/constants/localStorage";

// TODO
// RestrictAccess.tsx

const PrivateRoute = ({
  path,
  children,
}: PropsWithChildren<{ path: string }>) => {
  // TODO should we validate a access token on backend?
  const hasToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const renderChildren = () => (hasToken ? children : <Redirect to="/login" />);

  return <Route path={path}>{renderChildren}</Route>;
};

export const Routes = () => (
  <HeaderLayout>
    <Switch>
      <Route path="/">
        <Redirect to={"home"} />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <PrivateRoute path="/profile">
        <Profile />
      </PrivateRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </HeaderLayout>
);
