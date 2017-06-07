var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin') //清空发布目录
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件

const ENV = process.env.NODE_ENV = process.env.ENV = 'production'

module.exports = {
  entry: {
    vendor: [ 'react', 'react-dom',
              'redux', 'redux-thunk',
              'react-redux', 'react-router-dom',
              'leancloud-storage', 'path', 'underscore' ]
  },
  output: {
    path: path.join(__dirname, 'react'),
    filename: '[name].dll.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(ENV) }
    }),
    new CopyWebpackPlugin(
      [{ from: './build', to: './' }],
      { ignore: [ '.DS_Store', '.svn','*.svn-base' ] }
    ),
    //清空发布目录
    new CleanWebpackPlugin(['react'],{
      root: __dirname, //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    }),
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.join(__dirname,'react','[name]-manifest.json')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      mangle: { except: ['$scope', '$'] }
    })
  ]
}
