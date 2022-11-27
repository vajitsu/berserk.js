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
// source: https://github.com/sindresorhus/resolve-from
import fs from 'fs'
import path from 'path'
import isError from './is-error'

const Module = require('module')

export const resolveFrom = (
  fromDirectory: string,
  moduleId: string,
  silent?: boolean
) => {
  if (typeof fromDirectory !== 'string') {
    throw new TypeError(
      `Expected \`fromDir\` to be of type \`string\`, got \`${typeof fromDirectory}\``
    )
  }

  if (typeof moduleId !== 'string') {
    throw new TypeError(
      `Expected \`moduleId\` to be of type \`string\`, got \`${typeof moduleId}\``
    )
  }

  try {
    fromDirectory = fs.realpathSync(fromDirectory)
  } catch (error: unknown) {
    if (isError(error) && error.code === 'ENOENT') {
      fromDirectory = path.resolve(fromDirectory)
    } else if (silent) {
      return
    } else {
      throw error
    }
  }

  const fromFile = path.join(fromDirectory, 'noop.js')

  const resolveFileName = () =>
    Module._resolveFilename(moduleId, {
      id: fromFile,
      filename: fromFile,
      paths: Module._nodeModulePaths(fromDirectory),
    })

  if (silent) {
    try {
      return resolveFileName()
    } catch (error) {
      return
    }
  }

  return resolveFileName()
}
