import { RollupOptions } from "rollup";
// ts支持
import typescript from "@rollup/plugin-typescript";
// 解决引入三方依赖
import resolve from "@rollup/plugin-node-resolve";
// 转化 commonjs 为 esm
import commonjs from "@rollup/plugin-commonjs";
// 压缩代码
// import { terser } from "rollup-plugin-terser";
//
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json";

const config: RollupOptions[] = [
  {
    input: "src/index.ts",
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      resolve(),
      commonjs(),
      // terser(),
      postcss(),
    ],
    output: [
      {
        // file: packageJson.main,
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        name: "react-preview",
      },
      {
        file: packageJson.module,
        // dir: "dist/esm",
        format: "esm",
        sourcemap: true,
      },
    ],
  },
  // {
  //   input: "src/index.ts",
  // },
];
export default config;
