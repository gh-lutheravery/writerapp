const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const path = require("path")


module.exports = {
    mode: "development",
    entry: "./src/index.js",
    module: {
        rules: [
            {
                loader: "babel-loader",
                test: /\.js?$/i,
                exclude: "/node_modules/",
                options: { presets: ['@babel/preset-env','@babel/preset-react'] },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                exclude: "/src/pages/",
            }
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
        })
    ],

    output: {
        filename: "index.js"
    }
}