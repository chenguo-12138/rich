/*
 * @Author: chenguo
 * @Date: 2025-05-22 16:56:24
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 14:25:07
 * @FilePath: /rich/types/global.d.ts
 * @Description:
 */
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.less";
// declare module "*.css";

interface RichRoute {
  path: string;
  //嵌套路由
  routes?: RichRoute[];
  // 远程插件名
  pluginName?: string;
  // 远程组件名
  componentName?: string;
  // 菜单名
  name?: string;
  // 菜单图标
  icon?: string;
}
