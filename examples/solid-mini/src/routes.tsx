import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("@/pages/home")),
  },
  {
    path: "**",
    component: lazy(() => import("@/pages/not-found")),
  },
];
export default routes;
