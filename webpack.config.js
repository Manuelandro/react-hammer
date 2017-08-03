const webpack = require("webpack")
const path = require("path")
const ShakePlugin = require("webpack-common-shake").Plugin
const isVerbose = process.argv.includes("--verbose")

module.exports = {
    name: "client",
    target: "web",
    watch: true,
    entry: {
        build: ["babel-polyfill", "./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: false,
                    babelrc: false,
                    presets: ["es2015", "stage-2", "react", "react-optimize"]
                }
            }
        ]
    },
    plugins: [
        // https://github.com/indutny/webpack-common-shake
        new ShakePlugin(),

        // https://github.com/mishoo/UglifyJS2#compressor-options
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: isVerbose,
                unused: true,
                dead_code: true
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })
    ].filter(Boolean),
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: false,
    bail: true,
    cache: false,
    stats: {
        colors: true,
        reasons: false,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose
    },
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
}
