// 公共配置

// webpack.base.js
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
const cssRegex = /\.css$/
const lessRegex = /\.(less)$/

module.exports = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.tsx'),
  // 打包文件出口
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称 加上[chunkhash:8]
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4 需要配置 clean-webpack-plugin 来删除 dist 文件, webpack5 内置了
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  resolve: {
    // extensions是webpack的resolve解析配置下的选项，在引入模块时不带文件后缀时，会来
    // 该配置数组里面依次添加后缀查找文件，因为ts不支持引入以 .ts, tsx为后缀的文件，所
    // 以要在extensions中配置，而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
    extensions: ['.js', '.tsx', '.ts'],
    // 设置别名alias,设置别名可以让后续引用的地方减少路径的复杂度
    // 修改tsconfig.json,添加baseUrl和paths
    alias: {
      '@': path.join(__dirname, '../src'),
    },
    // 查找第三方模块只在本项目的node_modules中查找
    // 使用require和import引入模块时如果有准确的相对或者绝对路径,就会去按路径查询,如果引入的模块没有路径,
    // 会优先查询node核心模块,如果没有找到会去当前目录下node_modules中寻找,如果没有找到会查从父级文件夹
    // 查找node_modules,一直查到系统node全局模块。
    // 这样会有两个问题,一个是当前项目没有安装某个依赖,但是上一级目录下node_modules或者全局模块有安装,就也会引入成功,
    // 但是部署到服务器时可能就会找不到造成报错,另一个问题就是一级一级查询比较消耗时间。
    // 可以告诉 webpack搜索目录范围,来规避这两个问题
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  module: {
    rules: [
      {
        // 配置 loader 解析 ts 和 jsx
        include: [path.resolve(__dirname, '../src')], // 只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        // thread-loader就是用来开启多进程解析loader的
        // 借助多核cpu开启多线程loader解析,可以极大地提升loader解析的速度
        use: ['thread-loader', 'babel-loader'],
      },
      // 如果node_moduels中也有要处理的语法，可以把js|jsx文件配置加上
      // {
      //   test: /.(js|jsx)$/,
      //   use: 'babel-loader',
      // },
      {
        // 配置 style-loader css-loader 解析 css less 文件
        // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
        // css-loader: 解析css文件代码
        // loader执行顺序是从右往左,从下往上的,匹配到css文件后先用css-loader解析css,
        // 最后借助style-loader把css插入到头部style标签中
        // less-loader: 解析less文件代码,把less编译为css
        // less: less核心
        test: cssRegex,
        include: [path.resolve(__dirname, '../src')],
        use: [
          // 开发环境使用style-looader,打包模式抽离css
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },

          // postcss-loader就是来给css3加浏览器前缀的
          // postcss-loader：处理css时自动加前缀
          // autoprefixer：决定添加哪些浏览器前缀到css中
          // postcss.config.js是postcss-loader的配置文件,会自动读取配置,根目录新建postcss.config.js：
          'postcss-loader',
        ],
      },
      {
        test: lessRegex, // 匹配所有的 less 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          // 开发环境使用style-looader,打包模式抽离css
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 4,
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        // 匹配图片文件
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名 加上[contenthash:8]
        },
      },
      {
        // 匹配字体图标文件
        test: /.(woff2?|eot|ttf|otf)$/,
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
      {
        // 匹配媒体文件
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名 加上[contenthash:8]
        },
      },
    ],
  },
  plugins: [
    // webpack需要把最终构建好的静态资源都引入到一个html文件中,这样才能在浏览器中运行,
    // html-webpack-plugin就是来做这件事情的
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    // 当前是打包模式,业务环境是开发环境,这里需要把process.env.BASE_ENV注入到业务代码里面,
    // 就可以通过该环境变量设置对应环境的接口地址和其他数据,
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    }),
    new StylelintPlugin({
      configFile: path.resolve(__dirname, '../.stylelintrc.js'),
      extensions: ['less'],
      files: 'src/**/*.less',
      fix: true,
      customSyntax: 'postcss-less',
      lintDirtyModulesOnly: true,
      threads: true,
      exclude: ['node_modules'],
    }),
  ],
  // 使用文件缓存
  // 持久化缓存、改进缓存算法等优化,通过配置 webpack 持久化缓存,来缓存生成的 webpack 模块
  // 和 chunk,改善下一次打包的构建速度,可提速 90% 左右
  // 配置好缓存后第二次打包,通过对文件做哈希对比来验证文件前后是否一致,
  // 如果一致则采用上一次的缓存,可以极大地节省时间。
  cache: {
    type: 'filesystem',
  },
}
