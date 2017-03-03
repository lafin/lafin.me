const { webpack } = require("@webpack-blocks/webpack2");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

exports.basePlugins = [];

exports.developmentPlugins = [
    new HtmlWebpackPlugin({
        inject: true,
        template: "./client/index.jade"
    })
];

exports.productionPlugins = [
    new HtmlWebpackPlugin({
        inject: true,
        template: "./client/index.jade",
        filename: "index.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "async"
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        },
        screwIe8: true,
        sourceMap: false
    })
];
