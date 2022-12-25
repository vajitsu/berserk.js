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
// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'jujutsu/dist/compiled/chalk'
import os from 'os'
import path from 'path'

import { FatalError } from '../fatal-error'
import isError from '../is-error'

export async function getTypeScriptConfiguration(
  ts: typeof import('typescript'),
  tsConfigPath: string,
  metaOnly?: boolean
): Promise<import('typescript').ParsedCommandLine> {
  try {
    const formatDiagnosticsHost: import('typescript').FormatDiagnosticsHost = {
      getCanonicalFileName: (fileName: string) => fileName,
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getNewLine: () => os.EOL,
    }

    const { config, error } = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
    if (error) {
      throw new FatalError(ts.formatDiagnostic(error, formatDiagnosticsHost))
    }

    let configToParse: any = config

    const result = ts.parseJsonConfigFileContent(
      configToParse,
      // When only interested in meta info,
      // avoid enumerating all files (for performance reasons)
      metaOnly
        ? {
            ...ts.sys,
            readDirectory(_path, extensions, _excludes, _includes, _depth) {
              return [extensions ? `file${extensions[0]}` : `file.ts`]
            },
          }
        : ts.sys,
      path.dirname(tsConfigPath)
    )

    if (result.errors) {
      result.errors = result.errors.filter(
        ({ code }) =>
          // No inputs were found in config file
          code !== 18003
      )
    }

    if (result.errors?.length) {
      throw new FatalError(
        ts.formatDiagnostic(result.errors[0], formatDiagnosticsHost)
      )
    }

    return result
  } catch (err) {
    if (isError(err) && err.name === 'SyntaxError') {
      const reason = '\n' + (err.message ?? '')
      throw new FatalError(
        chalk.red.bold(
          'Could not parse',
          chalk.cyan('tsconfig.json') +
            '.' +
            ' Please make sure it contains syntactically correct JSON.'
        ) + reason
      )
    }
    throw err
  }
}
