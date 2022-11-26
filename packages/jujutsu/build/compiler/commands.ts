import type { CommandFileComplete as CommandInfo } from '../index'
import { join as pathJoin } from 'path'
import { bundle } from '@swc/core'
import { mkdirp } from 'fs-extra'
import uid from 'uid-promise'
import { promises } from 'fs'
import * as swc from '../swc'
import { SWC_CONFIG } from '../../lib/constants'
import { LoadedEnvFiles, processEnv } from '../../lib/env'
import { escapeStringRegexp } from '../../lib/escape-regexp'
import { isNumber } from 'jujutsu/dist/compiled/lodash'

escapeStringRegexp

export default async function compileCommands(
  commands: Set<string>,
  commandInfos: Map<string, CommandInfo>,
  loadedEnvFiles: LoadedEnvFiles
) {
  const manifest: {
    path: string
    name: string
  }[] = []

  for (let _ of commands) {
    const command = commandInfos.get(_)

    if (!command) return

    const buildDir = pathJoin(process.cwd(), '.jujutsu', 'build')

    let env = processEnv(loadedEnvFiles, process.cwd())

    const envEntries = (Object.entries(env) as [string, string][]).map((e) => [
      'process.env.'.concat(e[0]),
      isNumber(parseInt(e[1])) && e[1] !== 'true' && e[1] !== 'false'
        ? `\"${escapeStringRegexp(e[1])}\"`
        : e[1],
    ])

    const unique = await (await uid(7)).toLowerCase()

    swc.loadBindings()

    const output = pathJoin(
      process.cwd(),
      '.jujutsu',
      'build',
      `bundle.${unique}.js`
    )

    const bundled = await bundle({
      externalModules: ['discord.js', 'node:events'],
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

    const transformed = await swc.transform(code, {
      ...SWC_CONFIG,
      jsc: {
        transform: {
          optimizer: {
            simplify: false,
            globals: {
              vars: {
                ...Object.fromEntries(envEntries),
              },
            },
          },
        },
      },
    })

    // Create directory if not already exists
    await mkdirp(buildDir)

    // Write transformed code to file
    await promises.writeFile(output, transformed.code, 'utf8')

    manifest.push({
      path: output,
      name: command.name,
    })
  }

  return manifest
}
