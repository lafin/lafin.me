var rucksack = require('rucksack-css')
var precss = require('precss')
var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var PurifyCssPlugin = require('purifycss-webpack-plugin')

var contentPath = path.join(__dirname, './client')

function isDev () {
  return process.env.NODE_ENV === 'development';
}

module.exports = {
  context: contentPath,
  entry: {
    js: './index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jade$/,
      include: /client/,
      loader: 'jade-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!csso-loader!postcss-loader')
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?\d+)?$/,
      loader: 'url-loader'
    }, {
      test: /\.js$/,
      include: /client/,
      loader: 'babel-loader'
    }, ],
  },
  resolve: {
    modulesDirectories: [
      'client',
      'node_modules',
    ]
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
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CompressionPlugin({
      test: /\.(js|html|css)$/
    }),
    new PurifyCssPlugin({
      paths: [
        '../index.html'
      ]
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
  ],
  devServer: {
    contentBase: contentPath,
    compress: isDev(),
    hot: isDev()
  }
}