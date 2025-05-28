/*
 * @Author: chenguo
 * @Date: 2025-05-26 16:14:49
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 14:51:35
 * @FilePath: /rich/src/hooks/useRichRoute.ts
 * @Description:
 */
import { getRouteJson } from "@/api/common";
import { useCreation, useRequest } from "ahooks";
import { cloneDeep } from "lodash";
import { useEffect } from "react";

const useRichRoute = (initRoute: RichRoute) => {
  const route_cache = useCreation<{
    allRoutes: RichRoute;
    remoteRoutes: RichRoute[];
    isReady?: boolean;
  }>(() => {
    return {
      allRoutes: initRoute,
      remoteRoutes: [],
    };
  }, []);

  const { loading, error, runAsync } = useRequest(getRouteJson, {
    manual: true,
    onSuccess: (res) => {
      route_cache.remoteRoutes = res.data.routes;
      mergeRoutes();
    },
    onError: (err) => {
      console.error("请求子应用路由失败:", err);
    },
  });

  function mergeRoutes() {
    let cloneRoutes = cloneDeep(initRoute);
    const remoteRoutes = route_cache.remoteRoutes;
    cloneRoutes.routes = remoteRoutes;
    route_cache.allRoutes = cloneRoutes;
    route_cache.isReady = true;
  }

  useEffect(() => {
    runAsync();
  }, []);

  return {
    ...route_cache,
  };
};

export default useRichRoute;
