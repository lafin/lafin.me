const { addPlugins, createConfig, defineConstants, env, entryPoint, setOutput, performance, sourceMaps } = require("@webpack-blocks/webpack2");
const babel = require("@webpack-blocks/babel6");
const devServer = require("@webpack-blocks/dev-server2");
const postcss = require("@webpack-blocks/postcss");
const extractText = require("@webpack-blocks/extract-text2");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const csso = require("postcss-csso");
const plugins = require("./webpack.plugins");

function CustomLoaders () {
    return () => ({
        module: {
            loaders: [
                {
                    test: /\.jade$/,
                    include: /client/,
                    loaders: [ "pug-loader" ]
                },
                {
                    test: /sw\.js$/,
                    include: /client/,
                    loader: "file-loader?name=[name].[ext]"
                },
                {
                    test: /manifest\.json$/,
                    include: /client/,
                    loader: "file-loader?name=[name].[ext]!web-app-manifest-loader"
                }
            ]
        }
    });
}

module.exports = createConfig([
    entryPoint("./client/index.js"),
    setOutput("./dist/bundle.js"),
    babel(),
    CustomLoaders(),
    addPlugins(plugins.basePlugins),
    postcss([
        precss(),
        autoprefixer({ browsers: ["last 2 versions"] }),
        csso()
    ]),
    defineConstants({
        "process.env.NODE_ENV": process.env.NODE_ENV
    }),
    env("development", [
        sourceMaps(),
        devServer({
            port: 3000
        }),
        performance({
            // Increase performance budget thresholds for development mode
            maxAssetSize: 1500000,
            maxEntrypointSize: 1500000
        }),
        addPlugins(plugins.developmentPlugins)
    ]),
    env("production", [
        extractText("[name].css"),
        addPlugins(plugins.productionPlugins)
    ])
]);