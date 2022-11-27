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
import { Dirent, promises } from 'fs'
import { join } from 'path'

/**
 * Recursively read directory
 * @param  {string} dir Directory to read
 * @param  {RegExp} filter Filter for the file name, only the name part is considered, not the full path
 * @param  {string[]=[]} arr This doesn't have to be provided, it's used for the recursion
 * @param  {string=dir`} rootDir Used to replace the initial path, only the relative path is left, it's faster than path.relative.
 * @returns Promise array holding all relative paths
 */
export async function recursiveReadDir(
  dir: string,
  filter: RegExp,
  ignore?: RegExp,
  arr: string[] = [],
  rootDir: string = dir
): Promise<string[]> {
  const result = await promises.readdir(dir, { withFileTypes: true })

  await Promise.all(
    result.map(async (part: Dirent) => {
      const absolutePath = join(dir, part.name)
      if (ignore && ignore.test(part.name)) return

      // readdir does not follow symbolic links
      // if part is a symbolic link, follow it using stat
      let isDirectory = part.isDirectory()
      if (part.isSymbolicLink()) {
        const stats = await promises.stat(absolutePath)
        isDirectory = stats.isDirectory()
      }

      if (isDirectory) {
        await recursiveReadDir(absolutePath, filter, ignore, arr, rootDir)
        return
      }

      if (!filter.test(part.name)) {
        return
      }

      arr.push(absolutePath.replace(rootDir, ''))
    })
  )

  return arr.sort()
}
