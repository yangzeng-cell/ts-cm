import type { RouteRecordRaw } from "vue-router";
import { IBreadCrumb } from "@/components/nav-header/type/type";

let firstMenu: any = null;
export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);

  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  const _recurseGetRoute = function (menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => {
          return item.path === menu.url;
        });
        if (route) {
          routes.push(route);
        }
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  console.log(routes, "allll");
  return routes;
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadCrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadCrumb[],
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export { firstMenu };
