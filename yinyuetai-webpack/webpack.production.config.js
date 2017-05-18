var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.js$/,   loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,  loader: 'style-loader!css-loader!postcss-loader?modules' }
    ]
  },
  plugins: [
    require('autoprefixer')
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    })
  ]
}
