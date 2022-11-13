import { transformFileSync, transformSync, Config } from "@swc/core";

const swcrc: Config = {
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: false,
    },
    target: "es2017",
    loose: true,
    minify: {
      compress: false,
      mangle: false,
    },
  },
  module: {
    type: "commonjs",
  },
  minify: true,
  sourceMaps: false,
};

export function transformFileCode(path: string) {
  const out = transformFileSync(path, swcrc);
  return out.code;
}

export function transformCode(code: string) {
  const out = transformSync(code, swcrc);
  return out.code;
}
