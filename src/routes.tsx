import { ComponentProps, lazy, Suspense } from "react";
import { Route as _Route,Router, Redirect, Switch, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { HeaderLayout } from "@/components/layouts/HeaderLayout";
import { BlankLayout } from "@/components/layouts/BlankLayout";
import { Path } from "@/types/path";

// pages
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Profile = lazy(() => import("@/pages/Profile"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const SharedStateCount = lazy(() => import("@/pages/SharedStateCount"));
const StateHistoryCount = lazy(() => import("@/pages/StateHistoryCount"));
const Employee = lazy(() => import("@/pages/Employee"));

// TODO:
// RestrictAccess.tsx

// page layouts
const blankLayout: Path[] = ["/login"];

const getPageLayout = (path: Path) => {
  if (blankLayout.includes(path)) return BlankLayout;

  return HeaderLayout;
};

// routes
type RouteProps = ComponentProps<typeof _Route> & { path?: Path };
const Route = ({ children, path }: RouteProps) => {
  return <_Route path={path}>{children}</_Route>;
};

const PrivateRoute = ({ path, children }: RouteProps) => {
  const { isLoggedIn } = useAuth();

  const params = new URL(document.location.href).searchParams.toString();
  const qs = params ? `?redirect=${path}&${params}` : `?redirect=${path}`;

  const renderChildren = () =>
    isLoggedIn ? children : <Redirect to={`/login${qs}`} />;

  return <Route path={path}>{renderChildren()}</Route>;
};

export const Routes = () => {
  const [location] = useLocation();
  const Layout = getPageLayout(location as Path);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Switch>
          <Route path="/">
            <Redirect to={"/home"} />
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
          <PrivateRoute path="/count">
            <SharedStateCount />
          </PrivateRoute>
          <PrivateRoute path="/count_with_history">
            <StateHistoryCount />
          </PrivateRoute>
          <PrivateRoute path="/employees/:rest*">
            <Employee />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Suspense>
  );
};
