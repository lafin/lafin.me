var rucksack = require('rucksack-css')
var precss = require('precss')
var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')

var contentPath = path.join(__dirname, './client')

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
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=\d\.\d\.\d)?$/,
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
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.jade'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  devServer: {
    contentBase: contentPath,
    compress: true,
    hot: process.env.NODE_ENV === 'development'
  }
}