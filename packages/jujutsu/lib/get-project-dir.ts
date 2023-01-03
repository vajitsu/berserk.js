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
import fs from 'fs'
import path from 'path'
import { commands } from './commands'
import * as Log from '../build/output/log'
import { detectTypo } from './detect-typo'

export function getProjectDir(dir?: string) {
  try {
    const resolvedDir = path.resolve(dir || '.')
    const realDir = fs.realpathSync.native(resolvedDir)

    if (
      resolvedDir !== realDir &&
      resolvedDir.toLowerCase() === realDir.toLowerCase()
    ) {
      Log.warn(
        `Invalid casing detected for project dir, received ${resolvedDir} actual path ${realDir}.`
      )
    }

    return realDir
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      if (typeof dir === 'string') {
        const detectedTypo = detectTypo(dir, Object.keys(commands))

        if (detectedTypo) {
          Log.error(
            `"jujutsu ${dir}" does not exist. Did you mean "jujutsu ${detectedTypo}"?`
          )
          process.exit(1)
        }
      }

      Log.error(
        `Invalid project directory provided, no such directory: ${path.resolve(
          dir || '.'
        )}`
      )
      process.exit(1)
    }
    throw err
  }
}
