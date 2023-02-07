import { Routes, Route } from "@solidjs/router";
import { lazy, JSXElement } from "solid-js";
import { Layout } from "@/ui/pages/layout";

const Home = lazy(() => import("@/ui/pages/index"));
const About = lazy(() => import("@/ui/pages/about"));
const NotFound = lazy(() => import("@/ui/pages/not-found"));

type Props = {
  children: JSXElement;
};
function WithLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}

const routes = () => {
  return (
    <Routes>
      <Route
        path="/about"
        element={
          <WithLayout>
            <About />
          </WithLayout>
        }
      />
      <Route
        path="/"
        element={
          <WithLayout>
            <Home />
          </WithLayout>
        }
      />
      <Route path="/**" component={NotFound} />
    </Routes>
  );
};

export default routes;
