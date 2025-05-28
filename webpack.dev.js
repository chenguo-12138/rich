/*
 * @Author: chenguo
 * @Date: 2025-05-22 11:21:12
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 15:08:53
 * @FilePath: /rich/webpack.dev.js
 * @Description:
 */
const { merge } = require("webpack-merge");
const base = require("./webpack.common.js");

module.exports = merge(base, {
  mode: "development", // 开发模式
  devServer: {
    port: 3001,
    historyApiFallback: true,
    compress: false,
    hot: true,
    host:'0.0.0.0'
    // allowedHosts: "all",
    // open: true,
    // proxy: [
    //   {
    //     "/localhost:3002": {
    //       target: "http://192.168.0.29:3002/",
    //     },
    //   },
    // ],
  },
});
