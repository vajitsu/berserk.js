/*
The MIT License (MIT)

Copyright (c) 2022 Vercel, Inc.

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
import path from 'path'
import { fileExists } from '../lib/file-exists'
import { JujutsuConfigComplete } from '../server/config-shared'
import { getTypeScriptConfiguration } from '../lib/typescript/get-configuration'
import * as Log from './output/log'
import { readFileSync } from 'fs'
import isError from '../lib/is-error'
import { hasNecessaryDependencies } from '../lib/has-necessary-dependencies'

let TSCONFIG_WARNED = false

function parseJsonFile(filePath: string) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const JSON5 = require('jujutsu/dist/compiled/json5')
  const contents = readFileSync(filePath, 'utf8')

  // Special case an empty file
  if (contents.trim() === '') {
    return {}
  }

  try {
    return JSON5.parse(contents)
  } catch (err) {
    if (!isError(err)) throw err
    const {
      codeFrameColumns,
    } = require('jujutsu/dist/compiled/babel/code-frame')
    const codeFrame = codeFrameColumns(
      String(contents),
      {
        start: {
          line: (err as Error & { lineNumber?: number }).lineNumber || 0,
          column: (err as Error & { columnNumber?: number }).columnNumber || 0,
        },
      },
      { message: err.message, highlightCode: true }
    )
    throw new Error(`Failed to parse "${filePath}":\n${codeFrame}`)
  }
}

export default async function loadJsConfig(
  dir: string,
  config: JujutsuConfigComplete
) {
  let typeScriptPath: string | undefined
  try {
    const deps = await hasNecessaryDependencies(dir, [
      {
        pkg: 'typescript',
        file: 'typescript/lib/typescript.js',
        exportsRestrict: true,
      },
    ])
    typeScriptPath = deps.resolved.get('typescript')
  } catch (_) {}
  const tsConfigPath = path.join(dir, config.typescript.tsconfigPath)
  const useTypeScript = Boolean(
    typeScriptPath && (await fileExists(tsConfigPath))
  )

  let implicitBaseurl
  let jsConfig
  // jsconfig is a subset of tsconfig
  if (useTypeScript) {
    if (
      config.typescript.tsconfigPath !== 'tsconfig.json' &&
      TSCONFIG_WARNED === false
    ) {
      TSCONFIG_WARNED = true
      Log.info(`Using tsconfig file: ${config.typescript.tsconfigPath}`)
    }

    const ts = (await Promise.resolve(
      require(typeScriptPath!)
    )) as typeof import('typescript')
    const tsConfig = await getTypeScriptConfiguration(ts, tsConfigPath, true)
    jsConfig = { compilerOptions: tsConfig.options }
    implicitBaseurl = path.dirname(tsConfigPath)
  }

  const jsConfigPath = path.join(dir, 'jsconfig.json')
  if (!useTypeScript && (await fileExists(jsConfigPath))) {
    jsConfig = parseJsonFile(jsConfigPath)
    implicitBaseurl = path.dirname(jsConfigPath)
  }

  let resolvedBaseUrl
  if (jsConfig) {
    if (jsConfig.compilerOptions?.baseUrl) {
      resolvedBaseUrl = path.resolve(dir, jsConfig.compilerOptions.baseUrl)
    } else {
      resolvedBaseUrl = implicitBaseurl
    }
  }

  return {
    useTypeScript,
    jsConfig,
    resolvedBaseUrl,
  }
}
