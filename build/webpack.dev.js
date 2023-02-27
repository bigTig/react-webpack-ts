// 开发环境配置

// webpack.dev.js
const path = require('path')
// 需要借助 webpack-dev-server在开发环境启动服务器来辅助开发, 还需要依赖webpack-merge来合并基本配置
const { merge } = require('webpack-merge')
// 在不需要刷新浏览器的前提下模块热更新,并且能够保留react组件的状态。
// 借助@pmmmwh/react-refresh-webpack-plugin插件来实现,该插件又依赖于react-refresh
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const baseConfig = require('./webpack.base.js')

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 源码调试模式,后面会讲
  devServer: {
    port: 1920, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, '../public'), //托管静态资源public文件夹
    },
  },
  plugins: [
    // 添加热更新插件
    new ReactRefreshWebpackPlugin(),
  ],
})
