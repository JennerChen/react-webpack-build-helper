import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import clear from "rollup-plugin-clear";
import license from "rollup-plugin-license";
const path = require("path");
export default {
  input: "src/index.js",
  output: {
    file: "build/react-webpack-build-helper.js",
    format: "cjs"
  },
  external: [
    "react",
    "react-dom",
    "styled-components",
    "anser",
    "html-entities",
    "strip-ansi"
  ],
  plugins: [
    clear({
      targets: ["./build"]
    }),
    json(),
    resolve({
      jsnext: true,
      main: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      include: "src/**",
      exclude: ["node_modules/**"],
      extensions: [".js"],
      ignoreGlobal: false
    }),
    license({
      banner: {
        file: path.join(__dirname,'../LICENSE'),
        encoding: 'utf-8',
      },
    }),
    filesize({
      showGzippedSize: true
    })
  ]
};