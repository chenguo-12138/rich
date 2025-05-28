/*
 * @Author: chenguo
 * @Date: 2025-05-28 16:19:43
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:20:53
 * @FilePath: /rich/src/utils/url.ts
 * @Description:
 */
// 计算远程组件url地址
function computedRemoteUrl(pluginName?: string) {
  let isProduction = process.env.NODE_ENV == "production";

  let remoteUrl = isProduction ? window.location.origin : "";
  // 添加运行时的上下文路径

  if (pluginName) {
    remoteUrl = remoteUrl + "/static/" + pluginName.replace("rich_", "");
  }

  return remoteUrl;
}

export default { computedRemoteUrl };
