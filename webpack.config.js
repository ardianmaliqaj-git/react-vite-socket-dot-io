const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
  return {
    entry: {
      path: path.resolve(__dirname, "src", "index.js"),
    },
    output: {
      path: path.resolve(__dirname, "server", "public"),
      filename: "index.[contenthash].js",
      clean: true,
    },
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
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { sourceMap: false } },
            { loader: "sass-loader", options: { sourceMap: false } },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Production",
        template: path.resolve(__dirname, "src", "index.html"),
        favicon: path.resolve(__dirname, "src", "favicon.ico"),
      }),
      new MiniCssExtractPlugin({ filename: "index.[contenthash].css" }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    devServer: { port: 3000, open: true },
  };
};
