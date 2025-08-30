import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Cookies from "js-cookie";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/MainPage.vue"),
    beforeEnter: (_to, _from, next) => {
      if (Cookies.get("sid") !== undefined) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/LoginPage.vue"),
  },
  {
    path: "/folder",
    name: "folder",
    component: () => import("@/components/FolderPage.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/components/ErrorPage.vue"),
  },
  // match all route
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/components/NotFoundPage.vue"),
    meta: { layout: "empty" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
