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
import postcssModules from "postcss-modules";
// 可视化分析rollup打包
import { visualizer } from "rollup-plugin-visualizer";
// 规范化
import eslint from "@rollup/plugin-eslint";

const plugins = [
  postcss({
    // extensions: ["*.scss", "*.css"],
    extract: true,
    modules: true,
    use: ["sass"],
    plugins: [
      autoprefixer(),
      postcssModules({
        getJSON: () => undefined,
        generateScopedName: "[name]_[folder]",
      }),
    ],
  }),
  eslint({ throwOnError: true }),
  typescript(),
  resolve(),
  commonjs(),
  babel({ babelHelpers: "bundled" }),
  visualizer({ filename: "analyze.html" }),
];

const config: RollupOptions[] = [
  // index打包
  {
    input: "src/index.ts",
    external: ["react"],
    plugins,
    preserveModules: true,
    output: [
      {
        dir: "dist",
        sourcemap: true,
      },
      // 压缩文件打包
      {
        dir: "dist/min",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
  },
  // 声明文件打包
  {
    input: "src/index.ts",
    preserveModules: true,
    output: {
      dir: "dist/types",
    },
    plugins: [dts()],
    external: [/\/*.scss/],
  },
];
export default config;
