import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/home.vue"),
    },
    {
      // this is thanks to the last *, meaning repeated params
      // refs. https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/not-found.vue"),
    },
  ],
});

export default router;
