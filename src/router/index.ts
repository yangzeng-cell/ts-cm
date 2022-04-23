import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login-page",
    name: "login-page",
    component: () => import("@/views/login-page/login-page.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
router.beforeEach((to) => {
  if (to.path !== "/login-page") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login-page";
    }
    console.log(to);
    if (to.path === "/main") {
      return firstMenu.url;
    }
  }
});
export default router;
