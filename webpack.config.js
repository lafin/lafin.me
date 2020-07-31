const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: { main: "index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "assets"),
      path.resolve(__dirname, "node_modules"),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jade$/,
        loader: "pug-loader",
        query: {
          root: path.resolve(__dirname, "src"),
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|ico|xml)$/,
        loader: "file-loader",
      },
      {
        type: "javascript/auto",
        test: /\.(json|webmanifest)$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.jade",
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets/**/*.{xml,ico,json,svg,png,webmanifest}",
        },
      ],
    }),
    new WebpackMd5Hash(),
  ],
};
