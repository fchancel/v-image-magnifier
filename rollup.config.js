import terser from '@rollup/plugin-terser';
import typescript from "rollup-plugin-typescript2";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "source/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: "dist/index.min.js",
      format: "cjs",
      exports: "named",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
  external: ["vue"],
});