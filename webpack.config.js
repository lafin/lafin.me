var rucksack = require('rucksack-css')
var precss = require('precss')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: []
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        loader: 'style!css!csso?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=\d\.\d\.\d)?$/,
        loader: 'url'
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css!csso?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
    ],
  },
  resolve: {
    modulesDirectories: [
      'client',
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    precss,
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: './client',
    hot: true
  }
}
