/*
 * @Author: chenguo
 * @Date: 2025-05-23 14:14:58
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 15:00:45
 * @FilePath: /rich/src/routes/route.tsx
 * @Description:
 */
import { lazy } from "react";

const FrameLayout = lazy(() => import("@/pages/FrameLayout"));

const routes = [
  {
    path: "/",
    element: <FrameLayout />,
    routes: [],
  },
];

export default routes;
