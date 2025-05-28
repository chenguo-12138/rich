/*
 * @Author: chenguo
 * @Date: 2025-05-22 11:19:43
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:47:39
 * @FilePath: /rich/src/App.tsx
 * @Description:
 */
// App.tsx
import React from "react";
import { useTitle } from "ahooks";
import { BrowserRouter } from "react-router-dom";
import FrameLayout from "./pages/FrameLayout";
import "@/assets/css/global.css";

const App: React.FC = () => {
  useTitle("主");

  return (
    <BrowserRouter basename="/">
      <FrameLayout />
    </BrowserRouter>
  );
};

export default App;
