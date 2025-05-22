/*
 * @Author: chenguo
 * @Date: 2025-05-22 11:21:05
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-22 14:20:37
 * @FilePath: /rich-web/rich-main/webpack.common.js
 * @Description: 
 */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"), // 打包后的代码放在dist目录下
    filename: './assets/js/[name].[contenthash].js',
    chunkFilename: './assets/js/[name].[contenthash].js',
  },
  // resolve: {
  //   // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
  //   extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
  //   '@': path.resolve(__dirname, 'src'),
  // },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.less', '.css'],
    aliasFields: ['browser'],
    // 别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      router: path.resolve(__dirname, 'router'),
      components: path.resolve(__dirname, 'src/components/index'),
      packages: path.resolve(__dirname, 'src/packages/index'),
      utils: path.resolve(__dirname, 'src/utils/index'),
      hooks: path.resolve(__dirname, 'src/hooks/index'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets:
                    "iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead", // 根据项目去配置
                  useBuiltIns: "usage", // 会根据配置的目标环境找出需要的polyfill进行部分引入
                  corejs: 3, // 使用 core-js@3 版本
                },
              ],
              ["@babel/preset-typescript"],
              ["@babel/preset-react"],
            ],
          },
        },
      },
       // 图片打包
       {
        test: /\.(png|bmp|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024, 
          },
        },
        generator: {
          filename: './assets/image/[name].[hash][ext][query]',
        },
      },
      // 字体打包
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/font/[name].[hash][ext][query]',
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            // options: {		
            //   postcssOptions: {
            //     [['postcss-preset-env', {}]]
            //   },
            // },
          },
          'less-loader',
        ],
                // 排除 node_modules 目录
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'), // 使用自定义模板
    }),
  ],
};
