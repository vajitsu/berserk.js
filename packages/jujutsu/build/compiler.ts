import { transform, transformSync, parseSync, bundle, Config } from '@swc/core'
import { config as spackConfig } from '@swc/core/spack'
import { builtinModules } from 'module'
import { promises } from 'fs-extra'
import path from 'path'

export default class Compiler {
  private config: Config = {
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

  async transform(code: string) {
    let config = this.config

    const out = await transform(code, { ...(config as Config) })
    return out
  }

  async transformFiles(
    files: { path: string; typescript: boolean; type?: string }[]
  ) {
    const transpilations: {
      name: string
      output: string
      type?: string
    }[] = []

    // Transform each file provided in argument 0
    for (let file of files) {
      const code = await promises.readFile(file.path)
      const out = await this.transform(code.toString('utf8'))
      const fileName = file.path
        .split(path.sep)
        .at(-1)
        ?.replace(/\..*$/, '.js') as string
      
      transpilations.push({
        name: fileName,
        output: out.code,
        type: file.type,
      })
    }

    return transpilations
  }

  transformSync(code: string, typescript = false) {
    let config = this.config
    if (typescript) (config.jsc as any).parser.syntax = 'typescript'

    const out = transformSync(code, config as Config)
    return out
  }

  async bundle(entry: string, dir: string, distDir: string) {
    const packageJson = require(path.join(dir, 'package.json'))

    const fileName = path.basename(entry)
      ?.replace(/\..*$/, '') as string

    const spackEntry = Object.fromEntries([[fileName, entry]])

    const externalModules = [
      ...builtinModules,
      ...builtinModules.map((mod) => `node:${mod}`),
    ]

    if (packageJson.devDependencies)
      externalModules.push(...Object.keys(packageJson.devDependencies))
    if (packageJson.dependencies)
      externalModules.push(...Object.keys(packageJson.dependencies))
    
    console.log(distDir)

    const out = await bundle(
      spackConfig({
        externalModules,
        entry: spackEntry,
        output: {
          path: distDir,
        } as any,
        options: {
          root: distDir
        },
        module: {},
        mode: 'production',
        target: 'node',
      })
    )

    const code = Object.values(out).map((output) => output.code)

    return code
  }

  parseSync(code: string, typescript = false) {
    let config = this.config
    if (typescript) (config.jsc as any).parser.syntax = 'typescript'

    const out = parseSync(code, {
      comments: false,
      decorators: false,
      decoratorsBeforeExport: false,
      exportDefaultFrom: true,
      importAssertions: true,
      syntax: typescript ? 'typescript' : 'ecmascript',
      
    })
    return out
  }
}
