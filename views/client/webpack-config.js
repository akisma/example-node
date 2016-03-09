var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    jsx: './www/js/app.jsx'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [path.join(__dirname, './node_modules')],
        loader: 'babel-loader',
      }
    ],
    postLoaders: [
      {
        loader: "transform?envify"
      }
    ]
  },
  output: {
    path: "./www/dist",
    publicPath: "/dist/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  externals: {
    "analytics.js": 'analytics',
    firebase: 'Firebase'
  },
  devtool: 'source-map'
};