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
import { join, isAbsolute, dirname } from 'path'
import isError from './is-error'

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout))

const unlinkPath = async (p: string, isDir = false, t = 1): Promise<void> => {
  try {
    if (isDir) {
      await promises.rmdir(p)
    } else {
      await promises.unlink(p)
    }
  } catch (e) {
    const code = isError(e) && e.code
    if (
      (code === 'EBUSY' ||
        code === 'ENOTEMPTY' ||
        code === 'EPERM' ||
        code === 'EMFILE') &&
      t < 3
    ) {
      await sleep(t * 100)
      return unlinkPath(p, isDir, t++)
    }

    if (code === 'ENOENT') {
      return
    }

    throw e
  }
}

/**
 * Recursively delete directory contents
 * @param  {string} dir Directory to delete the contents of
 * @param  {RegExp} [exclude] Exclude based on relative file path
 * @param  {string} [previousPath] Ensures that parameter dir exists, this is not passed recursively
 * @returns Promise void
 */
export async function recursiveDelete(
  dir: string,
  exclude?: RegExp,
  previousPath: string = ''
): Promise<void> {
  let result
  try {
    result = await promises.readdir(dir, { withFileTypes: true })
  } catch (e) {
    if (isError(e) && e.code === 'ENOENT') {
      return
    }
    throw e
  }

  await Promise.all(
    result.map(async (part: Dirent) => {
      const absolutePath = join(dir, part.name)

      // readdir does not follow symbolic links
      // if part is a symbolic link, follow it using stat
      let isDirectory = part.isDirectory()
      const isSymlink = part.isSymbolicLink()

      if (isSymlink) {
        const linkPath = await promises.readlink(absolutePath)

        try {
          const stats = await promises.stat(
            isAbsolute(linkPath)
              ? linkPath
              : join(dirname(absolutePath), linkPath)
          )
          isDirectory = stats.isDirectory()
        } catch (_) {}
      }

      const pp = join(previousPath, part.name)
      const isNotExcluded = !exclude || !exclude.test(pp)

      if (isNotExcluded) {
        if (isDirectory) {
          await recursiveDelete(absolutePath, exclude, pp)
        }
        return unlinkPath(absolutePath, !isSymlink && isDirectory)
      }
    })
  )
}
