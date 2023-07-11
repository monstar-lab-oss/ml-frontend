import { lazy } from "react";
import { Route, Redirect, Switch } from "wouter";
import { useAuth } from "@/modules/authentication";
import { HeaderLayout } from "@/components/layouts/HeaderLayout";
import { BlankLayout } from "@/components/layouts/BlankLayout";

// pages
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Profile = lazy(() => import("@/pages/Profile"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const SharedStateCount = lazy(() => import("@/pages/SharedStateCount"));
const StateHistoryCount = lazy(() => import("@/pages/StateHistoryCount"));
const Employee = lazy(() => import("@/pages/Employee"));

const AuthenticatedRoutes = () => (
  <HeaderLayout>
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/count">
        <SharedStateCount />
      </Route>
      <Route path="/count_with_history">
        <StateHistoryCount />
      </Route>
      <Route path="/employees/:rest*">
        <Employee />
      </Route>
      <Route path="/">
        <Redirect to={"home"} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </HeaderLayout>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <BlankLayout>
        <Login />
      </BlankLayout>
    </Route>
    <Route path="/home">
      <HeaderLayout>
        <Home />
      </HeaderLayout>
    </Route>
    <Route path="/">
      <Redirect to={"home"} />
    </Route>
    <Route path="/:path">
      {({ path }) => <Redirect to={`login?redirect=${path}`} />}
    </Route>
  </Switch>
);

const Routes = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};

export default Routes;
