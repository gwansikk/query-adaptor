import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main, // CommonJS 형식으로 번들링된 파일
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module, // ES 모듈 형식으로 번들링된 파일
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(), // Node.js의 모듈 해석 방식을 사용
      commonjs(), // CommonJS 모듈을 ES6 모듈로 변환
      typescript({ tsconfig: "./tsconfig.json" }), // TypeScript 플러그인 사용
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
  },
];
