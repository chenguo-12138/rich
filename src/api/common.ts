/*
 * @Author: chenguo
 * @Date: 2025-05-26 15:29:32
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:00:26
 * @FilePath: /rich/src/api/common.ts
 * @Description:
 */
import { http } from "@/utils/request";
import { Route } from "./module/common";

enum Api {
  getRouteJson = "/api/route.json",
  postLogin = "/api/login",
}

export const getRouteJson = () =>
  http.get<{ code: number; data: { routes: Array<Route> }; msg: string }>({
    url: Api.getRouteJson,
  });

export const postLogin = (params: any) =>
  http.post({ url: Api.postLogin, params });
