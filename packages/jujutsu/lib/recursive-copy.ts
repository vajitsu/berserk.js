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
import { promises, constants, Dirent, Stats } from 'fs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Sema } from 'async-sema'
import isError from './is-error'

const COPYFILE_EXCL = constants.COPYFILE_EXCL

export async function recursiveCopy(
  source: string,
  dest: string,
  {
    concurrency = 32,
    overwrite = false,
    filter = () => true,
  }: {
    concurrency?: number
    overwrite?: boolean
    filter?(filePath: string): boolean
  } = {}
): Promise<void> {
  const cwdPath = process.cwd()
  const from = path.resolve(cwdPath, source)
  const to = path.resolve(cwdPath, dest)

  const sema = new Sema(concurrency)

  // deep copy the file/directory
  async function _copy(item: string, lstats?: Stats | Dirent): Promise<void> {
    const target = item.replace(from, to)

    await sema.acquire()

    if (!lstats) {
      // after lock on first run
      lstats = await promises.lstat(from)
    }

    // readdir & lstat do not follow symbolic links
    // if part is a symbolic link, follow it with stat
    let isFile = lstats.isFile()
    let isDirectory = lstats.isDirectory()
    if (lstats.isSymbolicLink()) {
      const stats = await promises.stat(item)
      isFile = stats.isFile()
      isDirectory = stats.isDirectory()
    }

    if (isDirectory) {
      try {
        await promises.mkdir(target, { recursive: true })
      } catch (err) {
        // do not throw `folder already exists` errors
        if (isError(err) && err.code !== 'EEXIST') {
          throw err
        }
      }
      sema.release()
      const files = await promises.readdir(item, { withFileTypes: true })
      await Promise.all(
        files.map((file) => _copy(path.join(item, file.name), file))
      )
    } else if (
      isFile &&
      // before we send the path to filter
      // we remove the base path (from) and replace \ by / (windows)
      filter(item.replace(from, '').replace(/\\/g, '/'))
    ) {
      await promises.copyFile(
        item,
        target,
        overwrite ? undefined : COPYFILE_EXCL
      )
      sema.release()
    } else {
      sema.release()
    }
  }

  await _copy(from)
}
