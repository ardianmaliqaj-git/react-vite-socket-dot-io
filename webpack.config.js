const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    path: path.resolve(__dirname, "./src/main.js/"),
  },
  output: {
    clean: true,
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "./socket-dot-io/public/"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/main.html/"),
      favicon: path.resolve(__dirname, "./src/favicon.ico/"),
    }),
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
