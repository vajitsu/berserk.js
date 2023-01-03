/*
The MIT License (MIT)

Copyright (c) 2023 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'jujutsu/dist/compiled/chalk'
import path from 'path'

import {
  hasNecessaryDependencies,
  NecessaryDependencies,
} from './has-necessary-dependencies'
import semver from 'jujutsu/dist/compiled/semver'
import { CompileError } from './compile-error'
import { FatalError } from './fatal-error'
import * as log from '../build/output/log'

import { getTypeScriptIntent } from './typescript/get-typescript-intent'
import { TypeCheckResult } from './typescript/run-type-check'
import { writeConfigurationDefaults } from './typescript/write-configuration-defaults'
import { installDependencies } from './install-dependencies'
import { missingDepsError } from './typescript/missing-dependency-error'
import { isCI } from './ci-info'

const requiredPackages = [
  {
    file: 'typescript/lib/typescript.js',
    pkg: 'typescript',
    exportsRestrict: true,
  },
  {
    file: '@types/node/index.d.ts',
    pkg: '@types/node',
    exportsRestrict: true,
  },
]

export async function verifyTypeScriptSetup({
  dir,
  distDir,
  cacheDir,
  intentDirs,
  tsconfigPath,
  typeCheckPreflight,
  isAppDirEnabled,
}: {
  dir: string
  distDir: string
  cacheDir?: string
  tsconfigPath: string
  intentDirs: string[]
  typeCheckPreflight: boolean
  isAppDirEnabled: boolean
}): Promise<{ result?: TypeCheckResult; version: string | null }> {
  const resolvedTsConfigPath = path.join(dir, tsconfigPath)

  try {
    // Check if the project uses TypeScript:
    const intent = await getTypeScriptIntent(dir, intentDirs, tsconfigPath)
    if (!intent) {
      return { version: null }
    }

    // Ensure TypeScript and necessary `@types/*` are installed:
    let deps: NecessaryDependencies = await hasNecessaryDependencies(
      dir,
      requiredPackages
    )

    if (deps.missing?.length > 0) {
      if (isCI) {
        // we don't attempt auto install in CI to avoid side-effects
        // and instead log the error for installing needed packages
        await missingDepsError(dir, deps.missing)
      }
      console.log(
        chalk.bold.yellow(
          `It looks like you're trying to use TypeScript but do not have the required package(s) installed.`
        ) +
          '\n' +
          'Installing dependencies' +
          '\n\n' +
          chalk.bold(
            'If you are not trying to use TypeScript, please remove the ' +
              chalk.cyan('tsconfig.json') +
              ' file from your package root (and any TypeScript files in your pages directory).'
          ) +
          '\n'
      )
      await installDependencies(dir, deps.missing, true).catch((err) => {
        if (err && typeof err === 'object' && 'command' in err) {
          console.error(
            `Failed to install required TypeScript dependencies, please install them manually to continue:\n` +
              (err as any).command +
              '\n'
          )
        }
        throw err
      })
      deps = await hasNecessaryDependencies(dir, requiredPackages)
    }

    // Load TypeScript after we're sure it exists:
    const tsPath = deps.resolved.get('typescript')!
    const ts = (await Promise.resolve(
      require(tsPath)
    )) as typeof import('typescript')

    if (semver.lt(ts.version, '4.3.2')) {
      log.warn(
        `Minimum recommended TypeScript version is v4.3.2, older versions can potentially be incompatible with Next.js. Detected: ${ts.version}`
      )
    }

    // Reconfigure (or create) the user's `tsconfig.json` for them:
    await writeConfigurationDefaults(
      ts,
      resolvedTsConfigPath,
      intent.firstTimeSetup,
      isAppDirEnabled,
      distDir
    )

    let result
    if (typeCheckPreflight) {
      const { runTypeCheck } = require('./typescript/run-type-check')

      // Verify the project passes type-checking before we go to webpack phase:
      result = await runTypeCheck(
        ts,
        dir,
        distDir,
        resolvedTsConfigPath,
        cacheDir,
        isAppDirEnabled
      )
    }
    return { result, version: ts.version }
  } catch (err) {
    // These are special errors that should not show a stack trace:
    if (err instanceof CompileError) {
      console.error(chalk.red('Failed to compile.\n'))
      console.error(err.message)
      process.exit(1)
    } else if (err instanceof FatalError) {
      console.error(err.message)
      process.exit(1)
    }
    throw err
  }
}
