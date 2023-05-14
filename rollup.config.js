import terser from "@rollup/plugin-terser";
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import vue from "rollup-plugin-vue";

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
  plugins: [
    typescript(),
    vue(),
    postcss({
      extract: true,
    }),
  ],
  external: ["vue"],
});
