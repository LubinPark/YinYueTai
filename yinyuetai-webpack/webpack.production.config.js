var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:  __dirname + "/index.js", //唯一入口文件
  output: {
    path: __dirname + "/build", //打包后的文件存放的地方
    filename: "[name]-[hash].js" //打包后输出文件的文件名
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/,  loader: 'style-loader!css-loader!postcss-loader?modules' },
      { test: /\.js$/,   loader: 'babel-loader',
        exclude: /node_modules/, query: { presets: ['es2015','react','stage-0'] } }
    ]
  },
  plugins: [
    require('autoprefixer')
    new HtmlWebpackPlugin({
      template: __dirname + "/build/index.html"
    })
  ]
}
