/*
 * @Author: chenguo
 * @Date: 2025-05-27 10:41:42
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-27 11:14:41
 * @FilePath: /rich/src/utils/route.ts
 * @Description:
 */
/**
 *  递归匹配路由
 * @param routes
 * @param path
 */
function getMatchRoute(
  routes: RichRoute[] | undefined,
  path: string | undefined
): RichRoute | undefined {
  if (routes && path) {
    for (let route of routes) {
      if (isMatchPath(route.path, path)) {
        return route;
      } else {
        let matchRoute = getMatchRoute(route.routes, path);
        if (matchRoute) {
          return matchRoute;
        }
      }
    }
  }
  return undefined;
}

function isMatchPath(
  routePath: string | undefined,
  pathName: string | undefined
): boolean {
  if (routePath && pathName) {
    if (routePath == pathName) {
      return true;
    } else {
      let routePaths = routePath.split("/");
      let paths = pathName.split("/");
      if (routePaths && paths && routePaths.length == paths.length) {
        let matched = true;
        for (let i = 0; i < routePaths.length; i++) {
          if (!routePaths[i].startsWith(":") && routePaths[i] != paths[i]) {
            matched = false;
          }
        }
        return matched;
      }
    }
  }

  return false;
}

export { getMatchRoute };
