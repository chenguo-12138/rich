/*
 * @Author: chenguo
 * @Date: 2025-05-28 15:47:24
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 17:01:15
 * @FilePath: /rich/src/components/basic/Remote.tsx
 * @Description:
 */

import { remote } from "@/utils";
import { lazy, Suspense, useMemo } from "react";

interface RemoteProps {
  pluginName: string;
  componentName: string;
  url: string;
}

const Remote: React.FC<RemoteProps> = (props) => {
  const { pluginName, componentName, url } = props;
  const Loading = () => (
    // <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
    //   <Spin size="large" spinning />
    // </div>
    <div></div>
  );

  // 使用 React.lazy 动态导入组件
  const Component = useMemo(() => {
    return lazy(() => {
      // 这里需要根据实际情况实现动态加载逻辑
      // 假设 remote.load 是一个返回 Promise 的函数
      return remote.load({
        pluginName,
        componentName,
        url,
      });
    });
  }, [componentName]);

  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Remote;
