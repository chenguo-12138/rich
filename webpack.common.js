/*
 * @Author: chenguo
 * @Date: 2025-05-22 11:21:05
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 15:11:42
 * @FilePath: /rich/webpack.common.js
 * @Description:
 */
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_DIR = path.resolve(__dirname, "./src");
const cssRegex = /\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less/;

module.exports = {
  entry: path.resolve(__dirname, "index.tsx"),
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"), // 打包后的代码放在dist目录下
    filename: "./assets/js/[name].[contenthash].js",
    chunkFilename: "./assets/js/[name].[contenthash].js",
  },
  // resolve: {
  //   // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
  //   extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
  //   '@': path.resolve(__dirname, 'src'),
  // },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".less", ".css"],
    aliasFields: ["browser"],
    // 别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      router: path.resolve(__dirname, "router"),
      components: path.resolve(__dirname, "src/components/index"),
      packages: path.resolve(__dirname, "src/packages/index"),
      utils: path.resolve(__dirname, "src/utils/index"),
      hooks: path.resolve(__dirname, "src/hooks/index"),
      assets: path.resolve(__dirname, "src/assets"),
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
              [
                "@babel/preset-react",
                {
                  runtime: "automatic", // 加上这行配置
                },
              ],
            ],
          },
        },
      },
      // 图片打包
      {
        test: /\.(png|bmp|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024,
          },
        },
        generator: {
          filename: "./assets/image/[name].[hash][ext][query]",
        },
      },
      // 字体打包
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/font/[name].[hash][ext][query]",
        },
      },
      {
        // css打包
      test: cssRegex,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        // less打包
        test: lessRegex,
          exclude: lessModuleRegex,
        include: APP_DIR,
        use: [
          // { loader: 'style-loader' },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   modules: { localIdentName: '[local]_[hash:base64:5]', },
            // },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
          
        ],
      },
      // {
      //   // css打包
      //   test: cssRegex,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       // options: { modules: { localIdentName: '[local]_[hash:base64:5]' } },
      //     },
      //     {
      //       loader: "postcss-loader",
      //     },
      //   ],
      // },
      // {
      //   // less打包
      //   test: lessRegex,
      //   exclude: lessModuleRegex,
      //   include: APP_DIR,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       // options: {
      //       //   modules: { localIdentName: '[local]_[hash:base64:5]' },
      //       // },
      //     },
      //     {
      //       loader: "postcss-loader",
      //     },
      //     {
      //       loader: "less-loader",
      //       options: {
      //         lessOptions: {
      //           javascriptEnabled: true,
      //           // modifyVars: {
      //           //   'ant-prefix': 'bonree-itom',
      //           // },
      //         },
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: lessModuleRegex,
        include: APP_DIR,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                exportLocalsConvention: "camelCaseOnly",
                localIdentName: "[local]_[hash:base64:5]", // 添加这一行，支持默认导出
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
     
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"), // 使用自定义模板
    }),
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: "./assets/css/[name].[contenthash].css",
      chunkFilename: "./assets/css/[name].[contenthash].css",
      // filename: '[name].css',
      // chunkFilename: '[name].css',
      ignoreOrder: true,
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        rich_sub1: "rich_sub1@http://192.168.0.29:3002/remoteEntry.js",
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
        },
        "react-dom": "react-dom",
      },
    }),
  ],
};
