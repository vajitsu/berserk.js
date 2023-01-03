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
import { promises as fs } from 'fs'
import chalk from 'jujutsu/dist/compiled/chalk'
import * as CommentJson from 'jujutsu/dist/compiled/comment-json'
import semver from 'jujutsu/dist/compiled/semver'
import os from 'os'
import type { CompilerOptions } from 'typescript'
import { getTypeScriptConfiguration } from './get-typescript-configuration'

type DesiredCompilerOptionsShape = {
  [K in keyof CompilerOptions]:
    | { suggested: any }
    | {
        parsedValue?: any
        parsedValues?: Array<any>
        value: any
        reason: string
      }
}

function getDesiredCompilerOptions(
  ts: typeof import('typescript')
): DesiredCompilerOptionsShape {
  const o: DesiredCompilerOptionsShape = {
    // These are suggested values and will be set when not present in the
    // tsconfig.json
    target: { suggested: 'es5' },
    lib: { suggested: ['esnext'] },
    allowJs: { suggested: true },
    skipLibCheck: { suggested: true },
    strict: { suggested: false },
    forceConsistentCasingInFileNames: { suggested: true },
    noEmit: { suggested: true },
    ...(semver.gte(ts.version, '4.4.2')
      ? { incremental: { suggested: true } }
      : undefined),

    // These values are required and cannot be changed by the user
    // Keep this in sync with the webpack config
    // 'parsedValue' matches the output value from ts.parseJsonConfigFileContent()
    esModuleInterop: {
      value: true,
      reason: 'requirement for SWC / babel',
    },
    module: {
      parsedValue: ts.ModuleKind.ESNext,
      // All of these values work:
      parsedValues: [
        ts.ModuleKind.ES2020,
        ts.ModuleKind.ESNext,
        ts.ModuleKind.CommonJS,
        ts.ModuleKind.AMD,
      ],
      value: 'esnext',
      reason: 'for dynamic import() support',
    },
    isolatedModules: {
      value: true,
      reason: 'requirement for SWC / Babel',
    },
  }

  return o
}

export function getRequiredConfiguration(
  ts: typeof import('typescript')
): Partial<import('typescript').CompilerOptions> {
  const res: Partial<import('typescript').CompilerOptions> = {}

  const desiredCompilerOptions = getDesiredCompilerOptions(ts)
  for (const optionKey of Object.keys(desiredCompilerOptions)) {
    const ev = desiredCompilerOptions[optionKey]
    if (!('value' in ev)) {
      continue
    }
    res[optionKey] = ev.parsedValue ?? ev.value
  }

  return res
}

export async function writeConfigurationDefaults(
  ts: typeof import('typescript'),
  tsConfigPath: string,
  isFirstTimeSetup: boolean,
  isAppDirEnabled: boolean,
  distDir: string
): Promise<void> {
  if (isFirstTimeSetup) {
    await fs.writeFile(tsConfigPath, '{}' + os.EOL)
  }

  const desiredCompilerOptions = getDesiredCompilerOptions(ts)
  const { options: tsOptions, raw: rawConfig } =
    await getTypeScriptConfiguration(ts, tsConfigPath, true)

  const userTsConfigContent = await fs.readFile(tsConfigPath, {
    encoding: 'utf8',
  })
  const userTsConfig = CommentJson.parse(userTsConfigContent) as any
  if (userTsConfig.compilerOptions == null && !('extends' in rawConfig)) {
    userTsConfig.compilerOptions = {}
    isFirstTimeSetup = true
  }

  const suggestedActions: string[] = []
  const requiredActions: string[] = []
  for (const optionKey of Object.keys(desiredCompilerOptions)) {
    const check = desiredCompilerOptions[optionKey]
    if ('suggested' in check) {
      if (!(optionKey in tsOptions)) {
        if (!userTsConfig.compilerOptions) {
          userTsConfig.compilerOptions = {}
        }
        userTsConfig.compilerOptions[optionKey] = check.suggested
        suggestedActions.push(
          chalk.cyan(optionKey) + ' was set to ' + chalk.bold(check.suggested)
        )
      }
    } else if ('value' in check) {
      const ev = tsOptions[optionKey]
      if (
        !('parsedValues' in check
          ? check.parsedValues?.includes(ev)
          : 'parsedValue' in check
          ? check.parsedValue === ev
          : check.value === ev)
      ) {
        if (!userTsConfig.compilerOptions) {
          userTsConfig.compilerOptions = {}
        }
        userTsConfig.compilerOptions[optionKey] = check.value
        requiredActions.push(
          chalk.cyan(optionKey) +
            ' was set to ' +
            chalk.bold(check.value) +
            ` (${check.reason})`
        )
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = check
    }
  }

  const nextAppTypes = `${distDir}/types/**/*.ts`

  if (!('include' in rawConfig)) {
    userTsConfig.include = isAppDirEnabled ? ['**/*.ts'] : ['**/*.ts']
    suggestedActions.push(
      chalk.cyan('include') +
        ' was set to ' +
        chalk.bold(isAppDirEnabled ? `['**/*.ts']` : `['**/*.ts']`)
    )
  } else if (isAppDirEnabled && !rawConfig.include.includes(nextAppTypes)) {
    userTsConfig.include.push(nextAppTypes)
    suggestedActions.push(
      chalk.cyan('include') +
        ' was updated to add ' +
        chalk.bold(`'${nextAppTypes}'`)
    )
  }

  if (!('exclude' in rawConfig)) {
    userTsConfig.exclude = ['node_modules']
    suggestedActions.push(
      chalk.cyan('exclude') + ' was set to ' + chalk.bold(`['node_modules']`)
    )
  }

  if (suggestedActions.length < 1 && requiredActions.length < 1) {
    return
  }

  await fs.writeFile(
    tsConfigPath,
    CommentJson.stringify(userTsConfig, null, 2) + os.EOL
  )

  if (isFirstTimeSetup) {
    console.log(
      chalk.green(
        `We detected TypeScript in your project and created a ${chalk.bold(
          'tsconfig.json'
        )} file for you.`
      ) + '\n'
    )
    return
  }

  console.log(
    chalk.green(
      `We detected TypeScript in your project and reconfigured your ${chalk.bold(
        'tsconfig.json'
      )} file for you. Strict-mode is set to ${chalk.bold('false')} by default.`
    ) + '\n'
  )
  if (suggestedActions.length) {
    console.log(
      `The following suggested values were added to your ${chalk.cyan(
        'tsconfig.json'
      )}. These values ${chalk.bold(
        'can be changed'
      )} to fit your project's needs:\n`
    )

    suggestedActions.forEach((action) => console.log(`\t- ${action}`))

    console.log('')
  }

  if (requiredActions.length) {
    console.log(
      `The following ${chalk.bold(
        'mandatory changes'
      )} were made to your ${chalk.cyan('tsconfig.json')}:\n`
    )

    requiredActions.forEach((action) => console.log(`\t- ${action}`))

    console.log('')
  }
}
