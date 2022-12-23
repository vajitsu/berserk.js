import { transform, transformSync, bundle, Config } from '@swc/core'
import { config as spackConfig } from '@swc/core/spack'
import { SWC_CONFIG } from '../lib/constants'
import { promises } from 'fs-extra'
// import { Module } from 'module'
import path from 'path'
import { builtinModules } from 'module'

export default class Compiler {
  private config: Config = {
    ...SWC_CONFIG,
  }

  async transform(code: string, typescript = false) {
    let config = this.config
    if (typescript) (config.jsc as any).parser.syntax = 'typescript'

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
      const out = await this.transform(code.toString('utf8'), file.typescript)
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

  async bundle(
    entry: {
      path: string
      origin: 'command' | 'event'
    },
    distDir: string
  ) {
    const fileName = entry.path
      .split(path.sep)
      .at(-1)
      ?.replace(/\..*$/, '.js') as string

    const out = await bundle(
      spackConfig({
        externalModules: [
          ...builtinModules,
          ...builtinModules.map((mod) => `node:${mod}`),
        ],
        entry: {
          index: entry.path,
        },
        output: {
          path: distDir,
          name: fileName,
        },
        options: this.config,
        module: {},
        mode: 'production',
        target: 'node',
      })
    )

    const code = Object.values(out).map((output) => output.code)

    return code
  }
}
