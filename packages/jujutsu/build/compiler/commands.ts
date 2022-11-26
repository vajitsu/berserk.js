import type { CommandFileComplete as CommandInfo } from '../index'
import { join as pathJoin } from 'path'
import { bundle as spack } from '@swc/core'
import { mkdirp } from 'fs-extra'
import uid from 'uid-promise'
import { promises } from 'fs'
import * as swc from '../swc'
import { SWC_CONFIG } from '../../lib/constants'
import { LoadedEnvFiles, processEnv } from '../../lib/env'
import { escapeStringRegexp } from '../../lib/escape-regexp'
import { isNumber } from 'jujutsu/dist/compiled/lodash'
import findUp from 'jujutsu/dist/compiled/find-up'

export default async function compileCommands(
  commands: Set<string>,
  commandInfos: Map<string, CommandInfo>,
  loadedEnvFiles: LoadedEnvFiles,
  dir: string,
  swcMinify: boolean,
  dev = false
) {
  const manifest: {
    path: string
    name: string
  }[] = []

  for (let _ of commands) {
    const command = commandInfos.get(_)

    if (!command) return

    const build = dev ? 'dev' : 'build'

    const buildDir = pathJoin(dir, '.jujutsu', build)

    let env = processEnv(loadedEnvFiles, dir)

    const envEntries = (Object.entries(env) as [string, string][]).map((e) => [
      'process.env.'.concat(e[0]),
      isNumber(parseInt(e[1])) && e[1] !== 'true' && e[1] !== 'false'
        ? `\"${escapeStringRegexp(e[1])}\"`
        : e[1],
    ])

    const unique = await (await uid(7)).toLowerCase()

    const output = pathJoin(dir, '.jujutsu', build, `bundle.${unique}.js`)

    // Don't bundle packages that are meant to be used in production
    let pkgJson
    const packageJsonPath = await findUp('package.json', { cwd: dir })
    if (packageJsonPath) pkgJson = require(packageJsonPath)

    const bundled = await spack({
      externalModules:
        pkgJson && pkgJson.dependencies
          ? Object.keys(pkgJson.dependencies).filter((dep) => !!require(dep))
          : [],
      mode: 'production',
      target: 'node',
      entry: command.absolutePath,
      output: {
        path: buildDir,
        name: `bundle.${unique}.js`,
      },
      module: {},
      options: SWC_CONFIG,
    })

    const code = bundled['command.js']
      ? bundled['command.js'].code
      : bundled['command.ts'].code

    const transformed = await swc.transform(
      code.concat(`module.exports.__name = "${command.name}"`),
      {
        ...SWC_CONFIG,
        jsc: {
          transform: {
            optimizer: {
              simplify: true,
              globals: {
                vars: {
                  ...Object.fromEntries(envEntries),
                },
              },
            },
          },
          minify: {
            mangle: true,
            compress: true,
            module: true,
          },
        },
        minify: swcMinify,
      }
    )

    // Create directory if not already exists
    await mkdirp(buildDir)

    // Write transformed code to file
    await promises.writeFile(
      output,
      `"use command";`.concat(transformed.code),
      'utf8'
    )

    manifest.push({
      path: output,
      name: command.name,
    })
  }

  return manifest
}
