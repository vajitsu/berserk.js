export default {
    minify: true,
    env: {
      forceAllTransforms: true,
      mode: 'usage'
    },
    jsc: {
      loose: true,
      parser: {
        syntax: 'typescript',
      },
      target: 'es5',
      externalHelpers: true,
    },
    module: {
      type: 'commonjs',
      lazy: true,
      noInterop: true,
      strict: true,
      strictMode: true,
    },
  }