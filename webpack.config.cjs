const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const path = require("path")




module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.resolve('src/index.js'),
        background: path.resolve('background.js'),
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                test: /\.js?$/i,
                exclude: "/node_modules/",
                options: { presets: ['@babel/preset-env','@babel/preset-react'] },
            },
            {
                test: /\.ts?/,
                use: [{loader: 'ts-loader', options: {onlyCompileBundledFiles: true}}],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                exclude: "/src/pages/",
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve("manifest.json"), to: path.resolve("dist") },
                { from: path.resolve("src/assets/square-logo.png"), to: path.resolve("dist") },
                { from: path.resolve("src/assets/wa-logo.png"), to: path.resolve("dist") }
                //{ from: "other", to: "public" }
            ],
        }),
        new HtmlPlugin({
            title: "Writerapp",
            filename: "popup.html",
            chunks: ["popup"],
            template: "src/pages/popup.html"
        })
    ],

    output: {
        filename: '[name].js'
    }
}