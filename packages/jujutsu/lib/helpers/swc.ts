import { transformFileSync, transformSync, Config } from '@swc/core'

const Compress: Config = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
    },
    target: 'es3',
    loose: true,
    minify: {
      compress: true,
      mangle: false,
    },
  },
  module: {
    type: 'commonjs',
    strict: true,
    strictMode: true,
    noInterop: true,
    lazy: true,
    allowTopLevelThis: true,
  },
  minify: true,
  sourceMaps: false,
}

const Typescript: Config = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
    },
    target: 'es2022',
    loose: true,
    keepClassNames: true,
    minify: {
      compress: false,
      mangle: false,
    },
  },
  module: {
    type: 'commonjs',
    strict: true,
    strictMode: true,
    ignoreDynamic: true,
    importInterop: 'node',
  },
  minify: true,
  sourceMaps: false,
  inlineSourcesContent: true,
}

const Javascript: Config = {
  jsc: {
    parser: {
      syntax: 'ecmascript',
    },
    target: 'es2022',
    loose: true,
    keepClassNames: true,
    minify: {
      compress: false,
      mangle: false,
    },
  },
  module: {
    type: 'commonjs',
    strict: true,
    strictMode: true,
    ignoreDynamic: true,
    importInterop: 'node',
  },
  minify: true,
  sourceMaps: false,
  inlineSourcesContent: true,
}

export function transformFileCode(path: string) {
  const out = transformFileSync(
    path,
    path.endsWith('.ts') ? Typescript : Javascript
  )
  return out.code
}

export function transformCode(code: string) {
  const out = transformSync(code, Javascript)
  return out.code
}
