const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  devtool: "inline-source-map",
  entry: {
    path: path.resolve(__dirname, "index.js"),
  },
  output: {
    clean: true,
    filename: "index.[contenthash].js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html", favicon: "favicon.ico" }),
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
    liveReload: true,
    open: true,
  },
};
