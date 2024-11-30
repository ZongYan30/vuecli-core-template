const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除 dist 目录
const CopyPlugin = require("copy-webpack-plugin"); // 处理静态资源
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 处理模板页面
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包css文件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// webpack的基本配置
module.exports = {
  entry: "./src/main.js", // 获取入口配置
  output: {
    filename: "js/[name].[chunkhash:5].js", // js 输出到 dist/js/xxx
    publicPath: "/", // 公用的公共路径 /
    path: path.resolve(__dirname, "dist"), // 输出目录为 dist
  },
  resolve: {
    extensions: [".js", ".vue", ".json"], //配置可以省略后缀的扩展!!!
    alias: {
      "@": path.resolve(__dirname, "src"), // 别名 @ = src目录
      _: __dirname, // 别名 _ = 工程根目录
    },
  },
  stats: {
    colors: true, // 打包时使用不同的颜色区分信息
    modules: false, // 打包时不显示具体模块信息
    entrypoints: false, // 打包时不显示入口模块信息
    children: false, // 打包时不显示子模块信息
  },
  module: {
    rules: [
      // 处理图片文件
      {
        // 各种图片、字体文件，均交给 url-loader 处理
        test: /\.(png)|(gif)|(jpg)|(svg)|(bmp)|(eot)|(woff)|(ttf)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "static/[name].[hash:5].[ext]",
              esModule: false,
            },
          },
        ],
      },
      // !!! vue文件交给 vue-loader 处理
      /* 
      vue-loader主要是针对 .vue文件做了模板，css,js代码进行编译
      该loader依赖了vue-template-compiler和url-loader,css-loader,file-loader,
      所以安装该loder之前还得安装依赖的那些loader
      */
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      // 对于css配置css-loader和MiniCssExtractPlugin来生成文件，也可以自行配置less
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // 对于js配置babel,babel的配置文件中加了一个vue的预设,依赖是:babel-preset-vue，对于vue代码用babel编译处理
      { test: /\.js$/, use: "babel-loader" },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 应用 清除输出目录 插件
    new CopyPlugin({
      // 应用 复制文件 插件
      patterns: [
        {
          from: path.resolve(__dirname, "public"), // 将public目录中的所有文件
          to: "./", // 复制到 输出目录 的根目录
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      // 打包 css 代码 到文件中
      filename: "css/[name].css",
      chunkFilename: "css/common.[hash:5].css", // 针对公共样式的文件名
    }),
    // 在vue-loader17版本之后，不光需要安装vue-loader，还要安装这个plugin,因为还要对webpack整个流程进行控制
    new VueLoaderPlugin(),
  ],
};
