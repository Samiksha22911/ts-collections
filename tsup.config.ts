import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/ArrayList.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true
});
