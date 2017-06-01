var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件
var imageminPngquant = require('imagemin-pngquant');//png压缩
var ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
var imageminJpegRecompress = require('imagemin-jpeg-recompress');//jpg压缩
var ExtractTextPlugin = require('extract-text-webpack-plugin')
process.env.NODE_ENV = 'production'

module.exports = {
  devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
  entry: __dirname + "/index.js", //唯一入口文件
  output: {
    publicPath: './',
    // path: __dirname + "/dist", //打包后的文件存放的地方
    filename: "main/[name]-[hash].js", //打包后输出文件的文件名
    path: __dirname + '/dist', //打包后的文件存放的地方
    // chunkFilename: '[name]-[hash].bundle.js'
  },
  module: {
   loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      { test: /\.(png|jpg)$/, loader: "url?name=[path]-[name].[ext]&limit=8192" },
      { test: /\.js$/,   loader: 'babel-loader',
        exclude: /node_modules/, query: { presets: ['es2015','react','stage-0'] } }
    ]
  },
  plugins: [
    // ExtractTextPlugin：分离CSS和JS文件
    new ExtractTextPlugin("[name]/[name]-[hash].css"),
    // Copyright
    new webpack.BannerPlugin("Copyright maimaiparty inc."), //在这个数组中new一个就可以了
    // 生成最终的Html文件
    new HtmlWebpackPlugin({
      title: 'maimaiparty', //标题
      keywords: '我的页面关键字',
      description: '我的页面描述',
      filename: './index.html',
      template: __dirname + "/dist/index.html", //new 这个插件的实例，并传入相关的参数
      favicon: __dirname + '/app/img/userhead.png', //网页的图标
      hash: true, //添加一个唯一的 webpack每次编译都在文件名中插入一个不同的哈希值
      showErrors: true, //错误信息会写入到 HTML
      inject: true, //要把script插入到标签里
    }),
    // 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
    new webpack.optimize.DedupePlugin(),
    // 调用dll的内容
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   //这里引入manifest文件
    //   manifest: require('./dist/vendor-manifest.json')
    // }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    //提取公共部分
    new webpack.optimize.CommonsChunkPlugin({
       names: 'inline',
       filename: 'inline.js',
       minChunks: Infinity,
    }),
    //热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // UglifyJsPlugin：压缩JS代码；
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: { except: ['$scope', '$'] },
      output: { comments: false }
    }),
    //图片压缩
    new ImageminPlugin({
      test: 'image/**',
      plugins: [
        imageminPngquant({ quality: '60', speed: 3 }),
        imageminJpegRecompress({ quality: 'high', max: 60, min: 40 })
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true,  keep_fnames: true },
      compress: { screw_ie8: true },
      comments: false
    }),
    //拷贝文件到dist目录
    new CopyWebpackPlugin(
      [{ from: './app/img', to: 'image' }],
      { ignore: [ '.DS_Store', '.svn','*.svn-base' ]
    })
  ]
}
