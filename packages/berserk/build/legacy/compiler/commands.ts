/* eslint-disable import/no-extraneous-dependencies */
import type { CommandFileComplete as CommandInfo } from '..'
import { join as pathJoin } from 'path'
import { bundle as spack, transform } from '@swc/core'
import { mkdirp } from 'fs-extra'
import { promises } from 'fs'
import { SERVER_DIRECTORY, SWC_CONFIG } from '../../../lib/constants'
import { LoadedEnvFiles, processEnv } from '../../../lib/env'
import { escapeStringRegexp } from '../../../lib/escape-regexp'
import { isNumber } from 'berserk/dist/compiled/lodash'
import findUp from 'berserk/dist/compiled/find-up'
import { nanoid } from 'berserk/dist/compiled/nanoid'
import { Module } from 'module'

export default async function compileCommands(
  commands: Set<string>,
  commandInfos: Map<string, CommandInfo>,
  loadedEnvFiles: LoadedEnvFiles,
  dir: string,
  swcMinify: boolean
) {
  const manifest: {
    path: string
    name: string
  }[] = []

  for (let _ of commands) {
    const command = commandInfos.get(_)

    if (!command) return

    const isTypescript = command.absolutePath.endsWith('.ts')

    const distDir = pathJoin(dir, '.berserk')

    let env = processEnv(loadedEnvFiles, dir)

    const envEntries = (Object.entries(env) as [string, string][]).map((e) => [
      'process.env.'.concat(e[0]),
      isNumber(parseInt(e[1])) && e[1] !== 'true' && e[1] !== 'false'
        ? `"${escapeStringRegexp(e[1])}"`
        : e[1],
    ])

    const id = nanoid(5)
    const unique = `bundle_${id}.js`

    const output = pathJoin(distDir, SERVER_DIRECTORY, unique)

    // Don't bundle packages that are meant to be used in production
    let pkgJson
    const packageJsonPath = await findUp('package.json', { cwd: dir })
    if (packageJsonPath) pkgJson = require(packageJsonPath)

    process.traceDeprecation = false
    ;(process as any).noDeprecation = true

    const nodeModules = Module.builtinModules.filter((mod) => !!require(mod))

    nodeModules.push(...nodeModules.map((mod) => `node:${mod}`))

    const bundled = await spack({
      externalModules:
        pkgJson && pkgJson.dependencies
          ? [
              ...Object.keys(pkgJson.dependencies)
                .filter((dep) => !dep.startsWith('@types'))
                .filter((dep) => !!require(dep)),
              ...nodeModules,
            ]
          : [...nodeModules],
      mode: 'production',
      target: 'node',
      entry: command.absolutePath,
      output: {
        path: pathJoin(distDir, SERVER_DIRECTORY),
        name: unique,
      },
      module: {},
      options: {
        ...SWC_CONFIG,
        jsc: {
          parser: isTypescript
            ? {
                syntax: 'typescript',
              }
            : {
                syntax: 'ecmascript',
                exportDefaultFrom: true,
                importAssertions: true,
              },
        },
      },
    })

    const code = bundled['command.js']
      ? bundled['command.js'].code
      : bundled['command.ts']
      ? bundled['command.ts'].code
      : Object.values(bundled)[0].code

    const transformed = await transform(
      code.concat(
        `exports.__name = "${
          command.name
        }";exports.subcommands = ${JSON.stringify(command.subcommands)};`
      ),
      {
        ...SWC_CONFIG,
        jsc: {
          parser: isTypescript
            ? {
                syntax: 'typescript',
              }
            : {
                syntax: 'ecmascript',
                exportDefaultFrom: true,
                importAssertions: true,
              },
          transform: {
            optimizer: {
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
    await mkdirp(pathJoin(distDir, SERVER_DIRECTORY))

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
