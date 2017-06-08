var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = 'production'

module.exports = {
  entry: __dirname + "/index.js", //唯一入口文件
  output: {
    publicPath: './',
    filename: "[name].[hash:6].js", //打包后输出文件的文件名
    path: path.join(__dirname, 'react') //打包后的文件存放的地方
  },
  module: {
   loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      { test: /\.(png|jpg)$/,
        loader: "file-loader?name=img/[name].[ext]&limit=8192" },
      { test: /\.js$/, loader: 'babel-loader',
        exclude: /node_modules/, query: { presets: ['es2015','react','stage-0'] } }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx', 'css', 'png', 'jpg', 'jpeg'],
      alias: { //模块别名定义，方便后续直接引用别名，无须多写长的地址
      'navigator': path.join(__dirname, '/app/components/common/navigator')
    }
  },
  plugins: [
    // ExtractTextPlugin：分离CSS和JS文件
    new ExtractTextPlugin("[name].[hash:6].css"),
    // 生成最终的Html文件
    new HtmlWebpackPlugin({
      title: 'maimaiparty', //标题
      filename: './index.html',
      template: __dirname + "/react/index.html", //new 这个插件的实例，并传入相关的参数
      favicon: __dirname + '/app/img/userhead.png', //网页的图标
      hash: false, //添加一个唯一的 webpack每次编译都在文件名中插入一个不同的哈希值
      showErrors: true, //错误信息会写入到 HTML
      inject: true, //要把script插入到标签里
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    //提取公共部分
    new webpack.optimize.CommonsChunkPlugin({
       names: 'common',
       filename: 'common.js',
       minChunks: Infinity,
    }),
    // UglifyJsPlugin：压缩JS代码；
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: { except: ['$scope', '$'] },
      output: { comments: false }
    }),
    new webpack.LoaderOptionsPlugin({
      options: { context: __dirname },
      minimize: true,
      debug: false
    })
  ]
}
