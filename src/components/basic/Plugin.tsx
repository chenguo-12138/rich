import { Else, If, Then } from "react-if";
import Remote from "./Remote";
import { url } from "@/utils";

/*
 * @Author: chenguo
 * @Date: 2025-05-28 15:40:15
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:53:50
 * @FilePath: /rich/src/components/basic/Plugin.tsx
 * @Description:
 */
interface PluginProps {
  currentRoute: RichRoute | undefined;
}
const Plugin = (props: PluginProps) => {
  const { currentRoute } = props;
  return (
    <>
      <If
        condition={
          currentRoute && currentRoute.pluginName && currentRoute.componentName
        }
      >
        <Then>
          <Remote
            // 为了避免类型错误，使用空字符串作为默认值
            pluginName={currentRoute?.pluginName || ""}
            componentName={currentRoute?.componentName || ""}
            url={url.computedRemoteUrl(currentRoute?.pluginName) || ""}
          />
        </Then>
        <Else>空</Else>
      </If>
    </>
  );
};
export default Plugin;
