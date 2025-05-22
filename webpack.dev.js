/*
 * @Author: chenguo
 * @Date: 2025-05-22 11:21:12
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-22 14:20:43
 * @FilePath: /rich-web/rich-main/webpack.dev.js
 * @Description: 
 */
const { merge } = require('webpack-merge')
const base = require('./webpack.common.js')

module.exports = merge(base, {
  mode: 'development', // 开发模式
  devServer: {
	open: true, // 编译完自动打开浏览器
    port: 9002,
  },
})
