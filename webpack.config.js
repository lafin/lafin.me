var rucksack = require('rucksack-css')
var precss = require('precss')
var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  context: path.join(__dirname, './client'),
  entry: {
    js: './index.js',
    vendor: []
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jade$/,
        include: /client/,
        loader: 'jade-loader'
      },
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'csso-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=\d\.\d\.\d)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'csso-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
  resolve: {
    modulesDirectories: [
      'client',
      'node_modules',
    ],
    extensions: ['', '.js']
  },
  postcss: [
    precss,
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.jade'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    contentBase: './client',
    hot: true
  }
}
