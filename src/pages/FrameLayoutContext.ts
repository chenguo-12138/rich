/*
 * @Author: chenguo
 * @Date: 2025-05-28 11:56:54
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 12:00:07
 * @FilePath: /rich/src/pages/FrameLayoutContext.ts
 * @Description:
 */
import { createContext } from "react";

interface FrameLayoutContextType {
  allRoutes: RichRoute | undefined;
  currentRoute: RichRoute | undefined;
}

const FrameLayoutContext = createContext<FrameLayoutContextType>({
  allRoutes: undefined,
  currentRoute: undefined,
});

export default FrameLayoutContext;
