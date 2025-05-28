/*
 * @Author: chenguo
 * @Date: 2025-05-26 16:23:53
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:52:12
 * @FilePath: /rich/src/pages/FrameLayout.tsx
 * @Description:
 */
import useRichRoute from "@/hooks/useRichRoute";
import { useSafeState, useUpdateEffect } from "ahooks";
import { getMatchRoute } from "@/utils/route";
import routes from "@/routes/route";
import Layout from "antd/es/layout/layout";
import { RichContent, RichHeader, RichSideBar } from "@/components/frame";
import { theme } from "antd";
import FrameLayoutContext from "./FrameLayoutContext";
import { useLocation } from "react-router-dom";

const FrameLayout = () => {
  const { allRoutes, remoteRoutes, isReady } = useRichRoute(routes[0]);
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useSafeState<RichRoute | undefined>(
    undefined
  );

  //获取当前路由
  useUpdateEffect(() => {
    setCurrentRoute(getMatchRoute(allRoutes.routes, location.pathname));
  }, [location.pathname, isReady]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <FrameLayoutContext.Provider value={{ allRoutes, currentRoute }}>
      <Layout className="h-full">
        <RichSideBar />
        <Layout>
          <RichHeader />
          <RichContent color={colorBgContainer} />
        </Layout>
      </Layout>
    </FrameLayoutContext.Provider>
  );
};

export default FrameLayout;
