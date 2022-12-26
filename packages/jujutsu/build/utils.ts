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
import { LocalizationMap as localizationMap } from 'jujutsu/dist/compiled/discord.js'
// eslint-disable-next-line import/no-extraneous-dependencies
import getGzipSize from 'jujutsu/dist/compiled/gzip-size'
import { promises as fs } from 'fs'
import { SLASH_COMMAND } from '../lib/constants'

const fileGzipStats: { [k: string]: Promise<number> | undefined } = {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fsStatGzip = (file: string) => {
  const cached = fileGzipStats[file]
  if (cached) return cached
  return (fileGzipStats[file] = getGzipSize.file(file))
}

const fileSize = async (file: string) => (await fs.stat(file)).size

const fileStats: { [k: string]: Promise<number> | undefined } = {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fsStat = (file: string) => {
  const cached = fileStats[file]
  if (cached) return cached
  return (fileStats[file] = fileSize(file))
}

export function unique<T>(main: ReadonlyArray<T>, sub: ReadonlyArray<T>): T[] {
  return [...new Set([...main, ...sub])]
}

export function difference<T>(
  main: ReadonlyArray<T> | ReadonlySet<T>,
  sub: ReadonlyArray<T> | ReadonlySet<T>
): T[] {
  const a = new Set(main)
  const b = new Set(sub)
  return [...a].filter((x) => !b.has(x))
}

/**
 * Return an array of the items shared by both arrays.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function intersect<T>(main: ReadonlyArray<T>, sub: ReadonlyArray<T>): T[] {
  const a = new Set(main)
  const b = new Set(sub)
  return [...new Set([...a].filter((x) => b.has(x)))]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sum(a: ReadonlyArray<number>): number {
  return a.reduce((size, stat) => size + stat, 0)
}

export interface CommandInfo {
  name: string
  description?: string
  localizations?: {
    name: Array<localizationMap>
    descripton: Array<localizationMap>
  }
}

export function isValidCommandName(commandName: string) {
  const result = SLASH_COMMAND.safeParse(commandName)
  return result.success
}
