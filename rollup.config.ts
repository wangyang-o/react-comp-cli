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
// css浏览器前缀
import packageJson from "./package.json";
import fs from "fs";

const plugins = [
  typescript({ tsconfig: "./tsconfig.json", exclude: "./example" }),
  resolve(),
  commonjs(),
  postcss(),
];
const blackList = ["index.ts"];
const componentsList: string[] = fs
  .readdirSync("./src/components")
  .filter((item) => !blackList.includes(item));
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
    plugins: [
      typescript({ tsconfig: "./tsconfig.json", exclude: "./example" }),
      resolve(),
      commonjs(),
      postcss({
        modules: true,
        use: ["sass"],
        extensions: ["scss", "css"],
        extract: true,
      }),
    ],
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
