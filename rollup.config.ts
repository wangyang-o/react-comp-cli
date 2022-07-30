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

import packageJson from "./package.json";
import fs from "fs";

const plugins = [
  typescript(),
  resolve(),
  commonjs(),
  babel({
    extensions: [".ts", ".tsx"],
    babelHelpers: "runtime",
  }),
  postcss({
    modules: false,
    extensions: ["scss", "css"],
    extract: "style.css",
    plugins: [autoprefixer()],
  }),
];
const blackList = ["index.ts"];
const componentsList: string[] = fs
  .readdirSync("./src/components")
  .filter((item: string) => !blackList.includes(item));
const folderBuilds: RollupOptions[] = componentsList.map((folder) => {
  return {
    input: `src/components/${folder}/index.tsx`,
    output: {
      file: `dist/${folder}/index.js`,
      sourcemap: true,
      format: "esm",
    },
    plugins,
    external: ["react"],
  };
});
const config: RollupOptions[] = [
  // index打包
  {
    input: ["src/index.ts"],
    external: ["react"],
    plugins,
    output: [
      {
        file: packageJson.module,
        format: "esm",
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
  ...folderBuilds,
  // 声明文件打包
  {
    input: "src/index.ts",
    output: {
      file: packageJson.types,
      format: "esm",
    },
    plugins: [dts()],
  },
];
export default config;
