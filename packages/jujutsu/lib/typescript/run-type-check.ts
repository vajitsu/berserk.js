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
import {
  DiagnosticCategory,
  getFormattedDiagnostic,
} from './diagnostic-formatter'
import { getTypeScriptConfiguration } from './get-typescript-configuration'
import { getRequiredConfiguration } from './write-configuration-defaults'

import { CompileError } from '../compile-error'
import { warn } from '../../build/output/log'

export interface TypeCheckResult {
  hasWarnings: boolean
  warnings?: string[]
  inputFilesCount: number
  totalFilesCount: number
  incremental: boolean
}

export async function runTypeCheck(
  ts: typeof import('typescript'),
  baseDir: string,
  distDir: string,
  tsConfigPath: string,
  cacheDir?: string,
  isAppDirEnabled?: boolean
): Promise<TypeCheckResult> {
  const effectiveConfiguration = await getTypeScriptConfiguration(
    ts,
    tsConfigPath
  )

  if (effectiveConfiguration.fileNames.length < 1) {
    return {
      hasWarnings: false,
      inputFilesCount: 0,
      totalFilesCount: 0,
      incremental: false,
    }
  }
  const requiredConfig = getRequiredConfiguration(ts)

  const options = {
    ...effectiveConfiguration.options,
    ...requiredConfig,
    declarationMap: false,
    emitDeclarationOnly: false,
    noEmit: true,
  }

  let program:
    | import('typescript').Program
    | import('typescript').BuilderProgram
  let incremental = false
  if ((options.incremental || options.composite) && cacheDir) {
    if (options.composite) {
      warn(
        'TypeScript project references are not fully supported. Attempting to build in incremental mode.'
      )
    }
    incremental = true
    program = ts.createIncrementalProgram({
      rootNames: effectiveConfiguration.fileNames,
      options: {
        ...options,
        composite: false,
        incremental: true,
        tsBuildInfoFile: path.join(cacheDir, '.tsbuildinfo'),
      },
    })
  } else {
    program = ts.createProgram(effectiveConfiguration.fileNames, options)
  }

  const result = program.emit()

  // Intended to match:
  // - pages/test.js
  // - pages/apples.test.js
  // - pages/__tests__/a.js
  //
  // But not:
  // - pages/contest.js
  // - pages/other.js
  // - pages/test/a.js
  //
  const regexIgnoredFile =
    /[\\/]__(?:tests|mocks)__[\\/]|(?<=[\\/.])(?:spec|test)\.[^\\/]+$/
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program as import('typescript').Program)
    .concat(result.diagnostics)
    .filter((d) => !(d.file && regexIgnoredFile.test(d.file.fileName)))

  const firstError =
    allDiagnostics.find(
      (d) => d.category === DiagnosticCategory.Error && Boolean(d.file)
    ) ?? allDiagnostics.find((d) => d.category === DiagnosticCategory.Error)

  if (firstError) {
    throw new CompileError(
      await getFormattedDiagnostic(
        ts,
        baseDir,
        distDir,
        firstError,
        isAppDirEnabled
      )
    )
  }

  const warnings = await Promise.all(
    allDiagnostics
      .filter((d) => d.category === DiagnosticCategory.Warning)
      .map((d) =>
        getFormattedDiagnostic(ts, baseDir, distDir, d, isAppDirEnabled)
      )
  )
  return {
    hasWarnings: true,
    warnings,
    inputFilesCount: effectiveConfiguration.fileNames.length,
    totalFilesCount: program.getSourceFiles().length,
    incremental,
  }
}
