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
import path from 'path'

import { MissingDependency } from './has-necessary-dependencies'
import { getPkgManager } from './helpers/get-pkg-manager'
import { install } from './helpers/install'
import { getOnline } from './helpers/get-online'

export type Dependencies = {
  resolved: Map<string, string>
}

export async function installDependencies(
  baseDir: string,
  deps: any,
  dev: boolean = false
) {
  const packageManager = getPkgManager(baseDir)
  const isOnline = await getOnline()

  if (deps.length) {
    console.log()
    console.log(
      `Installing ${
        dev ? 'devDependencies' : 'dependencies'
      } (${packageManager}):`
    )
    for (const dep of deps) {
      console.log(`- ${chalk.cyan(dep.pkg)}`)
    }
    console.log()

    await install(
      path.resolve(baseDir),
      deps.map((dep: MissingDependency) => dep.pkg),
      { devDependencies: dev, isOnline, packageManager }
    )
    console.log()
  }
}
