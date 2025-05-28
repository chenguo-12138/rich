/*
 * @Author: chenguo
 * @Date: 2025-05-28 11:35:56
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:42:37
 * @FilePath: /rich/src/components/frame/RichContent.tsx
 * @Description:
 */
import FrameLayoutContext from "@/pages/FrameLayoutContext";
import { Content } from "antd/es/layout/layout";
import { useContext } from "react";
import { Else, If, Then } from "react-if";
import Plugin from "@/components/basic/Plugin";

interface RichContentProps {
  color: string;
}
const RichContent = (props: RichContentProps) => {
  const frameContextValue = useContext(FrameLayoutContext);
  const { currentRoute } = frameContextValue;

  const { color } = props;
  return (
    <Content className="p-[16px]">
      <div
        className={`rounded-md h-full w-full p-[16px]`}
        style={{ backgroundColor: color }}
      >
        <If condition={currentRoute?.pluginName}>
          <Then>
            <Plugin currentRoute={currentRoute} />
          </Then>
          <Else>
            <div>content</div>
          </Else>
        </If>
      </div>
    </Content>
  );
};

export default RichContent;
