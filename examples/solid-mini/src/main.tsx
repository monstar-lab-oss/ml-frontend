import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { useRoutes } from "@solidjs/router";
import routes from "@/routes";
import "@/index.css";

render(() => {
  const Route = useRoutes(routes);
  return (
    <Router>
      <Route />
    </Router>
  );
}, document.getElementById("root") as HTMLElement);
