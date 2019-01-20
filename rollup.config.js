import typescript from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";
import shebang from "./rollup-plugin-preserve-shebang/index";
import { join } from "path";

export default {
  input: "src/main.ts",
  external: ["fs"],
  plugins: [
    typescript(),
    resolve(),
    shebang({
      entry: join(__dirname, "dist/index.js"),
      shebang: "#!/usr/bin/env node"
    })
  ],
  output: {
    file: "dist/index.js",
    format: "cjs"
  }
};
