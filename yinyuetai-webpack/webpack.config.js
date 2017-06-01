var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var imageminPngquant = require('imagemin-pngquant');//png压缩
var ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
var imageminJpegRecompress = require('imagemin-jpeg-recompress');//jpg压缩
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件

module.exports = {
  devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
  entry:  __dirname + "/index.js", //唯一入口文件
  output: {
    path: __dirname + "/build", //打包后的文件存放的地方
    filename: "[name]-[hash].js" //打包后输出文件的文件名
  },
  module: {
   loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/,  use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      { test: /\.js$/,   loader: 'babel-loader',
        exclude: /node_modules/, query: { presets: ['es2015','react','stage-0'] } }
    ]
  },
  plugins: [
    // ExtractTextPlugin：分离CSS和JS文件
    new ExtractTextPlugin("[name]-[hash].css"),
    // Copyright
    new webpack.BannerPlugin("Copyright maimaiparty inc."), //在这个数组中new一个就可以了
    // 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
    new webpack.optimize.DedupePlugin(),
    // 生成最终的Html5文件,每次编译都在文件名中插入一个不同的哈希值
    new HtmlWebpackPlugin({
      template: __dirname + "/build/index.html", //new 这个插件的实例，并传入相关的参数
      favicon: __dirname + '/app/img/userhead.png', //网页的图标
      hash: true, //添加一个唯一的 webpack每次编译都在文件名中插入一个不同的哈希值
      showErrors: true, //错误信息会写入到 HTML
      title: 'maiaimaiparty', //标题
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    // OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    // new webpack.optimize.OccurenceOrderPlugin(),
    // UglifyJsPlugin：压缩JS代码；
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
      mangle: true
    }),
    //图片压缩
    new ImageminPlugin({
      test: 'image/**',
      plugins: [
        imageminPngquant({ quality: '60', speed: 3 }),
        imageminJpegRecompress({ quality: 'high', max: 60, min: 40 })
      ]
    }),
    //拷贝文件到dist目录
    new CopyWebpackPlugin(
    [{ from: './app/img', to: 'image' }],
    { ignore: [ '.DS_Store', '.svn','*.svn-base' ]} )
  ],
  // 本地服务器
  devServer: {
    port: '3000', //端口号
    hot: true, //热加载插件启动
    inline: true, //实时刷新
    contentBase: "./app", //本地服务器所加载的页面所在的目录
    historyApiFallback: true //不跳转
  }
}
