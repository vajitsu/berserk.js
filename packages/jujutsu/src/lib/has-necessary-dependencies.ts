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
import { promises as fs } from 'fs'
import { fileExists } from './file-exists'
import { resolveFrom } from './resolve-from'
import { dirname, join, relative } from 'path'

export interface MissingDependency {
  file: string
  pkg: string
  exportsRestrict: boolean
}

export type NecessaryDependencies = {
  resolved: Map<string, string>
  missing: MissingDependency[]
}

export async function hasNecessaryDependencies(
  baseDir: string,
  requiredPackages: MissingDependency[]
): Promise<NecessaryDependencies> {
  let resolutions = new Map<string, string>()
  const missingPackages: MissingDependency[] = []

  await Promise.all(
    requiredPackages.map(async (p) => {
      try {
        const pkgPath = await fs.realpath(
          resolveFrom(baseDir, `${p.pkg}/package.json`)
        )
        const pkgDir = dirname(pkgPath)

        if (p.exportsRestrict) {
          const fileNameToVerify = relative(p.pkg, p.file)
          if (fileNameToVerify) {
            const fileToVerify = join(pkgDir, fileNameToVerify)
            if (await fileExists(fileToVerify)) {
              resolutions.set(p.pkg, fileToVerify)
            } else {
              return missingPackages.push(p)
            }
          } else {
            resolutions.set(p.pkg, pkgPath)
          }
        } else {
          resolutions.set(p.pkg, resolveFrom(baseDir, p.file))
        }
      } catch (_) {
        return missingPackages.push(p)
      }
    })
  )

  return {
    resolved: resolutions,
    missing: missingPackages,
  }
}
