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
import path from 'path'
import { fileExists } from '../file-exists'
import { recursiveReadDir } from '../recursive-readdir'

export type TypeScriptIntent = { firstTimeSetup: boolean }

export async function getTypeScriptIntent(
  baseDir: string,
  intentDirs: string[],
  tsconfigPath: string
): Promise<TypeScriptIntent | false> {
  const resolvedTsConfigPath = path.join(baseDir, tsconfigPath)

  // The integration turns on if we find a `tsconfig.json` in the user's
  // project.
  const hasTypeScriptConfiguration = await fileExists(resolvedTsConfigPath)
  if (hasTypeScriptConfiguration) {
    const content = await fs
      .readFile(resolvedTsConfigPath, { encoding: 'utf8' })
      .then(
        (txt) => txt.trim(),
        () => null
      )
    return { firstTimeSetup: content === '' || content === '{}' }
  }

  // Next.js also offers a friendly setup mode that bootstraps a TypeScript
  // project for the user when we detect TypeScript files. So, we need to check
  // the `pages/` directory for a TypeScript file.
  // Checking all directories is too slow, so this is a happy medium.
  for (const dir of intentDirs) {
    const typescriptFiles = await recursiveReadDir(
      dir,
      /.*\.(ts|tsx)$/,
      /(node_modules|.*\.d\.ts)/
    )
    if (typescriptFiles.length) {
      return { firstTimeSetup: true }
    }
  }

  return false
}
