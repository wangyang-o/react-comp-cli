import { RollupOptions } from "rollup";
// ts支持
import typescript from "@rollup/plugin-typescript";
// 解决引入三方依赖
import resolve from "@rollup/plugin-node-resolve";
// 转化 commonjs 为 esm
import commonjs from "@rollup/plugin-commonjs";
// 压缩代码
import { terser } from "rollup-plugin-terser";
// 编译css预处理器
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json";
import fs from "fs";
const plugins = [
  typescript({ tsconfig: "./tsconfig.json", exclude: "./example" }),
  resolve(),
  commonjs(),
  postcss(),
];
const componentsList: string[] = fs
  .readdirSync("./src/components")
  .filter((item) => item !== "index.ts");
const folderBuilds: RollupOptions[] = componentsList.map((folder) => {
  return {
    input: `src/components/${folder}/index.ts`,
    output: {
      // ensure file destination is same as where the typings are
      file: `dist/${folder}/index.js`,
      sourcemap: true,
      exports: "named",
    },
    plugins,
    external: ["react", "react-dom"],
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
    // external: ["react-preview"],
    output: {
      dir: packageJson.types,
      format: "esm",
    },
    plugins: [dts()],
  },
];
export default config;
