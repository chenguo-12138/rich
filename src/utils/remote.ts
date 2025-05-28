/*
 * @Author: chenguo
 * @Date: 2025-05-28 15:54:29
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:56:35
 * @FilePath: /rich/src/utils/remote.ts
 * @Description:
 */

import random from "./random";

export interface ComponentOption {
  url: string;
  pluginName: string;
  componentName: string;
  contextPath?: string;
}
// 全局固定，不要修改
const remoteFileName = "remoteEntry.js";

export async function load(remoteComponent: ComponentOption) {
  const componentName = "./" + remoteComponent.componentName;
  const pluginName = remoteComponent.pluginName;
  let hash = random.getHashCode();
  const remoteFallbackUrl =
    remoteComponent.url + "/" + remoteFileName + "?" + hash;

  await loadjs(pluginName, "default", remoteFallbackUrl);
  //   @ts-ignore
  const container = window[pluginName];

  try {
    const factory = await container.get(componentName);
    console.log("factory", factory);
    const Module = factory();
    return Module;
  } catch (error) {
    console.warn(error);
  }
}

// 远程加载js
export function loadjs(
  remote: string,
  shareScope: string,
  remoteFallbackUrl: string
) {
  return new Promise<void>((resolve, reject) => {
    // @ts-ignore 判断模块是否在window下
    if (!window[remote]) {
      // 搜索dom的tag查看远程模块是否存在，这时模块可能正在加载（异步）
      const existingRemote = document.querySelector(
        `[data-webpack="${remote}"]`
      );
      // 模块正在加载中
      const onload = (originOnload: (() => void) | null) => async () => {
        // @ts-ignore 检查远程模块是否已经初始化
        if (window[remote] && !window[remote].__initialized) {
          // @ts-ignore
          if (typeof __webpack_share_scopes__ === "undefined") {
            // @ts-ignore 使用shareCope的default值
            await window[remote].init(shareScope.default);
          } else {
            // @ts-ignore 手动设置shareScope
            await window[remote].init(__webpack_share_scopes__[shareScope]);
          }
          // @ts-ignore 标记远程模块已加载完成
          window[remote].__initialized = true;
        }
        // 加载完成
        resolve();
        originOnload && originOnload();
      };

      if (existingRemote) {
        // @ts-ignore 等待远程模块加载完成
        existingRemote.onload = onload(existingRemote.onload);
        // @ts-ignore
        existingRemote.onerror = reject;
      } else if (remoteFallbackUrl) {
        // 通过inject方式渲染到html中
        // @ts-ignore
        let d = document;
        // @ts-ignore
        let script = d.createElement("script");
        script.type = "text/javascript";
        // 标记一个属性，方便追踪远程加载状态
        script.setAttribute("data-webpack", `${remote}`);
        script.async = true;
        script.onerror = reject;
        script.onload = onload(null);
        script.src = remoteFallbackUrl;
        d.getElementsByTagName("head")[0].appendChild(script);
      } else {
        // 没有模块存在，直接报错
        reject(`Cannot Find Remote ${remote} to inject`);
      }
    } else {
      // remote已经在window下，直接返回
      resolve();
    }
  });
}

export default { load };
