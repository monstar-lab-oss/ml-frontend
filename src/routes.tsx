import { ComponentProps } from "react";
import { Route as _Route, Redirect, Switch, useLocation } from "wouter";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Profile } from "@/pages/Profile";
import { NotFound } from "@/pages/NotFound";
import { SharedStateCount } from "@/pages/SharedStateCount";
import { useAuth } from "@/hooks/useAuth";
import { HeaderLayout } from "@/components/layouts/HeaderLayout";
import { SideLayout } from "@/components/layouts/SideLayout";
import { BlankLayout } from "@/components/layouts/BlankLayout";
import { Path } from "@/types/path";

// TODO
// RestrictAccess.tsx

// page layouts
const blankLayout: Path[] = ["/login"];
const sidebarLayout: Path[] = [];

const getPageLayout = (path: Path) => {
  if (blankLayout.includes(path)) return BlankLayout;
  if (sidebarLayout.includes(path)) return SideLayout;

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

  return <Route path={path}>{renderChildren}</Route>;
};

export const Routes = () => {
  const [location] = useLocation();
  const Layout = getPageLayout(location as Path);

  return (
    <Layout>
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
        <PrivateRoute path="/count">
          <SharedStateCount />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};
