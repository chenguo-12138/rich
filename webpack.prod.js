/*
 * @Author: chenguo
 * @Date: 2025-05-22 11:21:18
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-22 14:17:07
 * @FilePath: /rich-web/rich-main/webpack.prod.js
 * @Description: 
 */
// webpack.prod.js
const { merge } = require("webpack-merge");
const base = require("./webpack.common.js");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(base, {
  mode: "production", // 生产模式
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用 MiniCssExtractPlugin.loader 代替 style-loader
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
              // 也包括会自动帮助我们添加 autoprefixer
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "less-loader",
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
    //   new CssMinimizerPlugin({
    //     // 默认开启
    //     // parallel true:  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
    //   }),
    ],
  },
  plugins: [
    // 清除目录文件
    new CleanWebpackPlugin({
      root: path.resolve(__dirname),
      verbose: true,
      dry: false,
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[hash:8].css", // 将css单独提测出来放在assets/css 下
    }),
    // js压缩
    new TerserWebpackPlugin({
      // 压缩js
      test: /\.js(\?.*)?$/i,
      // 使用多进程并发运行
      parallel: true,
      terserOptions: {
        // 删除注释
        output: { comments: false },
        compress: {
          // 去除console.log/console.info
          // pure_funcs: ['console.log', 'console.info'],
        },
      },
      // 将注释剥离到单独的文件中
      extractComments: false,
    }),
  ],
});
