/*
 * @Author: chenguo
 * @Date: 2025-05-22 11:19:59
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-22 11:20:15
 * @FilePath: /rich-web/rich-main/index.tsx
 * @Description:
 */
// index.tsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./src/App";

const root = ReactDOM.createRoot(document.getElementById("app")!);
// v18 的新方法
root.render(<App />);
