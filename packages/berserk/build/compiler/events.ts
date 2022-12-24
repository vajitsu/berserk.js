/* eslint-disable import/no-extraneous-dependencies */
import type { EventFileComplete as EventInfo } from '../legacy'
import { join as pathJoin } from 'path'
import swc, { bundle as spack } from '@swc/core'
import { mkdirp } from 'fs-extra'
import { promises } from 'fs'
import { SERVER_DIRECTORY, SWC_CONFIG } from '../../lib/constants'
import { LoadedEnvFiles, processEnv } from '../../lib/env'
import { escapeStringRegexp } from '../../lib/escape-regexp'
import { isNumber } from 'berserk/dist/compiled/lodash'
import findUp from 'berserk/dist/compiled/find-up'
import { nanoid } from 'berserk/dist/compiled/nanoid'
import { Module } from 'module'

export default async function compileEvents(
  events: Set<string>,
  eventInfos: Map<string, EventInfo>,
  loadedEnvFiles: LoadedEnvFiles,
  dir: string,
  swcMinify: boolean
) {
  const manifest: {
    path: string
    name: string
  }[] = []

  for (let _ of events) {
    const event = eventInfos.get(_)

    if (!event) return

    let env = processEnv(loadedEnvFiles, dir)

    const isTypescript = event.absolutePath.endsWith('.ts')

    const envEntries = (Object.entries(env) as [string, string][]).map((e) => [
      'process.env.'.concat(e[0]),
      isNumber(parseInt(e[1])) && e[1] !== 'true' && e[1] !== 'false'
        ? `"${escapeStringRegexp(e[1])}"`
        : e[1],
    ])

    const id = nanoid(5)
    const unique = `bundle_${id}.js`

    const buildDir = pathJoin(dir, '.berserk', SERVER_DIRECTORY)
    const output = pathJoin(dir, '.berserk', SERVER_DIRECTORY, unique)

    // Don't bundle packages that are meant to be used in production
    let pkgJson
    const packageJsonPath = await findUp('package.json', { cwd: dir })
    if (packageJsonPath) pkgJson = require(packageJsonPath)

    process.traceDeprecation = false

    const nodeModules = Module.builtinModules
      .filter((mod) => !!require(mod))
      .map((mod) => {
        try {
          const m = require(`node:${mod}`)
          if (!m) return mod
          return `node:${mod}`
        } catch {
          return mod
        }
      })

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
      entry: event.absolutePath,
      output: {
        path: buildDir,
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

    const code = bundled['event.js']
      ? bundled['event.js'].code
      : bundled['event.ts']
      ? bundled['event.ts'].code
      : Object.values(bundled)[0].code

    const transformed = await swc.transform(
      code.concat(`exports.__name = "${event.name}"`),
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
    await mkdirp(buildDir)

    // Write transformed code to file
    await promises.writeFile(
      output,
      `"use event";`.concat(transformed.code),
      'utf8'
    )

    manifest.push({
      path: output,
      name: event.name,
    })
  }

  return manifest
}
