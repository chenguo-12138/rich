/*
 * @Author: chenguo
 * @Date: 2025-05-28 11:38:34
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 11:38:41
 * @FilePath: /rich/src/components/RichHeader.tsx
 * @Description:
 */
import { theme } from "antd";
import { Header } from "antd/es/layout/layout";

const RichHeader = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return <Header style={{ padding: 0, background: colorBgContainer }}></Header>;
};

export default RichHeader;
