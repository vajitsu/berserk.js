/* eslint-disable no-unused-vars */
const jujutsuDistPath =
  /(jujutsu[\\/]dist[\\/]shared[\\/]lib)|(jujutsu[\\/]dist[\\/]client)|(jujutsu[\\/]dist[\\/]pages)/

export function getParserOptions({ filename, jsConfig, ...rest }) {
  const isTSFile = filename.endsWith('.ts')
  const isTypeScript = isTSFile || filename.endsWith('.tsx')
  const enableDecorators = Boolean(
    jsConfig?.compilerOptions?.experimentalDecorators
  )
  return {
    ...rest,
    syntax: isTypeScript ? 'typescript' : 'ecmascript',
    dynamicImport: true,
    decorators: enableDecorators,
    // Exclude regular TypeScript files from React transformation to prevent e.g. generic parameters and angle-bracket type assertion from being interpreted as JSX tags.
    [isTypeScript ? 'tsx' : 'jsx']: !isTSFile,
    importAssertions: true,
  }
}
