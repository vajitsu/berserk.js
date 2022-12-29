import {
  transform,
  transformSync,
  transformFile,
  parseSync,
  bundle,
  Config,
} from '@swc/core'
import { compileBundleOptions, config as spackConfig } from '@swc/core/spack'
import { builtinModules } from 'module'
// eslint-disable-next-line import/no-extraneous-dependencies
import { promises } from 'jujutsu/dist/compiled/fs-extra'
import path from 'path'
import { SWC_CONFIG } from '../lib/constants'

export default class Compiler {
  private config: any = SWC_CONFIG

  async transform(code: string, typescript = false) {
    let config = this.config

    if (typescript) (config.jsc as any).parser.syntax = 'typescript'

    const out = await transform(code, config)
    return out.code
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
      const fileName = path
        .basename(file.path)
        ?.replace(/\..*$/, '.js') as string

      transpilations.push({
        name: fileName,
        output: out,
        type: file.type,
      })
    }

    return transpilations
  }

  async transformFile(filepath: string, typescript = false) {
    const out = await transformFile(filepath, {
      ...this.config,
      jsc: { parser: { syntax: typescript ? 'typescript' : 'ecmascript' } },
    })
    return out.code
  }

  transformSync(code: string, typescript = false) {
    let config = this.config
    if (typescript) (config.jsc as any).parser.syntax = 'typescript'

    const out = transformSync(code, config as Config)
    return out
  }

  async bundle(entry: string, dir: string, distDir: string) {
    const packageJson = require(path.join(dir, 'package.json'))

    const fileName = path.basename(entry)?.replace(/\..*$/, '') as string

    const spackEntry = Object.fromEntries([[fileName, entry]])

    const externalModules = [
      ...builtinModules,
      ...builtinModules.map((mod) => `node:${mod}`),
    ]

    if (packageJson.devDependencies)
      externalModules.push(...Object.keys(packageJson.devDependencies))
    if (packageJson.dependencies)
      externalModules.push(...Object.keys(packageJson.dependencies))

    const conf = spackConfig({
      externalModules,
      entry: spackEntry,
      output: {
        path: distDir,
      } as any,
      options: {
        root: distDir,
      },
      module: {},
      mode: 'production',
      target: 'node',
    })

    console.log(await compileBundleOptions(conf))

    const out = await bundle(
      spackConfig({
        externalModules,
        entry: spackEntry,
        output: {
          path: distDir,
        } as any,
        options: {
          root: distDir,
          configFile: path.join(distDir, '.swcrc'),
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
