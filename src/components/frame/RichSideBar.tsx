/*
 * @Author: chenguo
 * @Date: 2025-05-27 11:44:56
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:38:18
 * @FilePath: /rich/src/components/frame/RichSideBar.tsx
 * @Description:
 */
import FrameLayoutContext from "@/pages/FrameLayoutContext";
import { LeftOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import { useSafeState } from "ahooks";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const SideBar = () => {
  const navigate = useNavigate();
  const frameContextValue = useContext(FrameLayoutContext);
  //侧边栏是否收起
  const [isCollapsed, setIsCollapsed] = useSafeState(false);
  //移动端侧边栏是否展开
  const [isMobileOpen, setIsMobileOpen] = useSafeState(false);

  function transFormRoutesToMenuItems(routes: RichRoute[]): MenuItem[] {
    return routes.map((item) => {
      let menuItem: MenuItem = {
        key: item.path,
        label: item.name,
        icon: item.icon ? (
          <div dangerouslySetInnerHTML={{ __html: item.icon }} />
        ) : null,
      };
      if (item.routes) {
        //@ts-ignore
        menuItem.children = transFormRoutesToMenuItems(item.routes);
      }
      return menuItem;
    });
  }

  const navItems = useMemo(() => {
    if (frameContextValue.allRoutes?.routes) {
      return transFormRoutesToMenuItems(frameContextValue.allRoutes?.routes);
    }
    return [];
  }, [frameContextValue.allRoutes?.routes]);

  const selectedKeys = useMemo(() => {
    if (frameContextValue.currentRoute?.path) {
      return [frameContextValue.currentRoute?.path];
    }
    return [];
  }, [frameContextValue.currentRoute?.path]);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md leading-1"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
      >
        <MenuOutlined />
      </button>
      <Sider
        theme="light"
        className={`${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } !fixed top-[64px] h-[90%] shadow-md rounded-md lg:!relative lg:h-full lg:top-0`}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
      >
        <div
          className={`h-[40px] p-4 flex items-center ${
            !isCollapsed ? "justify-between" : "justify-center"
          }`}
        >
          {!isCollapsed ? "Home" : ""}
          <Button type="text" onClick={() => setIsCollapsed(!isCollapsed)}>
            {!isCollapsed ? (
              <LeftOutlined style={{ fontSize: "12px" }} />
            ) : (
              <RightOutlined style={{ fontSize: "12px" }} />
            )}
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="flex-1 space-y-1 px-2 py-4">
            <Menu
              selectedKeys={selectedKeys}
              theme="light"
              mode="inline"
              items={navItems}
              onSelect={(val) => {
                navigate(val.key as string);
              }}
            ></Menu>
          </nav>
        </div>
      </Sider>
    </>
  );
};
export default SideBar;
