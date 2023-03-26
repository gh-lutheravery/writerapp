const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const path = require("path")


module.exports = {
    mode: "development",
    entry: "src/index.js",
    module: {
        rules: [
            {
                exclude: "/node_modules/"
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