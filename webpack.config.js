const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (_, argv) => {
  return {
    devtool: "inline-source-map",
    entry: {
      path: path.resolve(__dirname, "main.js"),
    },
    output: {
      clean: true,
      filename: "main.[contenthash].js",
      path: path.resolve(__dirname, "socket-dot-io", "public"),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "main.html", favicon: "favicon.ico" }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node-moudles/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /node-moudles/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    devServer: {
      port: process.env.PORT || 3000,
      hot: true,
      open: true,
    },
  };
};
