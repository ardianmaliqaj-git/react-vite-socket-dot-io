import { nodeResolve } from "@rollup/plugin-node-resolve";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

import cleaner from "rollup-plugin-cleaner";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-import-css";
import htmlTemplate from "rollup-plugin-generate-html-template";
import livereload from "rollup-plugin-livereload";
import outputManifest from "rollup-plugin-output-manifest";
import serve from "rollup-plugin-serve";

export default {
  input: "./src/index.js/",
  output: {
    file: "./server/public/index.js/",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    css(),
    outputManifest(),
    htmlTemplate({
      template: "./src/index.html/",
      target: "index.html",
    }),
    cleaner({
      targets: ["./server/public/"],
    }),
    copy({
      targets: [
        {
          src: "./src/favicon.ico",
          dest: "./server/public",
        },
      ],
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
      contentBase: "./server/public/",
      host: "localhost",
      port: 10001,
    }),
    livereload({
      watch: "public",
    }),
  ],
};
