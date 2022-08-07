import { RollupOptions } from "rollup";
// ts支持
import typescript from "rollup-plugin-typescript2";
// 解决引入三方依赖
import resolve from "@rollup/plugin-node-resolve";
// 转化 commonjs 为 esm
import commonjs from "@rollup/plugin-commonjs";
// 压缩代码
import { terser } from "rollup-plugin-terser";
// 编译css预处理器
import postcss from "rollup-plugin-postcss";
// 声明文件
import dts from "rollup-plugin-dts";
// babel
import { babel } from "@rollup/plugin-babel";
// css前缀
import autoprefixer from "autoprefixer";
// 可视化分析rollup打包
import { visualizer } from "rollup-plugin-visualizer";

const plugins = [
  postcss({
    extensions: ["scss", "css"],
    extract: "style.css",
    plugins: [autoprefixer()],
  }),
  typescript(),
  resolve(),
  commonjs(),
  babel(),
  visualizer({ open: true, filename: "analyze.html" }),
];

const config: RollupOptions[] = [
  // index打包
  {
    input: "src/index.ts",
    external: ["react"],
    plugins,
    output: [
      {
        dir: "dist",
        format: "esm",
        preserveModules: true,
        sourcemap: true,
      },
      // 压缩文件打包
      {
        file: "dist/index.min.js",
        format: "esm",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
  },
  // 声明文件打包
  {
    input: "src/index.ts",
    output: {
      dir: "dist/types",
      format: "esm",
      preserveModules: true,
    },
    plugins: [dts()],
    external: [/\/*.scss/],
  },
];
export default config;
