import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("@/pages/home.vue") },
    { path: "/:pathMatch(.*)*", component: import("@/pages/not-found.vue") },
  ],
});

export default router;
