const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    devtool: "inline-source-map",
    entry: {
      path: path.resolve(__dirname, "src", "index.js"),
    },
    output: {
      path: path.resolve(__dirname, "server", "public"),
      filename: "index.[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Production",
        template: path.resolve(__dirname, "src", "index.html"),
        favicon: path.resolve(__dirname, "src", "favicon.ico"),
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
    devServer: { port: 3000, open: true },
  };
};
