import path from "path";

import { nodeResolve } from "@rollup/plugin-node-resolve";

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import css from "rollup-plugin-import-css";
import htmlTemplate from "rollup-plugin-generate-html-template";
import cleaner from "rollup-plugin-cleaner";

export default {
  input: path.join("src", "index.js"),
  output: {
    file: path.join("server", "public", "index.js"),
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    css(),
    htmlTemplate({
      template: path.join("src", "index.html"),
      target: "index.html",
    }),
    cleaner({
      targets: [path.join("server", "public")],
    }),
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    babel({
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
      extensions: [".js", ".html"],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: path.join("server", "public"),
      host: "localhost",
      port: 10001,
    }),
    livereload({
      watch: "public",
    }),
  ],
};
