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
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'jujutsu/dist/compiled/chalk'
import spawn from 'jujutsu/dist/compiled/cross-spawn'

export type PackageManager = 'npm' | 'pnpm' | 'yarn'

interface InstallArgs {
  /**
   * Indicate whether to install packages using npm, pnpm or Yarn.
   */
  packageManager: PackageManager
  /**
   * Indicate whether there is an active Internet connection.
   */
  isOnline: boolean
  /**
   * Indicate whether the given dependencies are devDependencies.
   */
  devDependencies?: boolean
}

/**
 * Spawn a package manager installation with either Yarn or NPM.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
export function install(
  root: string,
  dependencies: string[] | null,
  { packageManager, isOnline, devDependencies }: InstallArgs
): Promise<void> {
  /**
   * (p)npm-specific command-line flags.
   */
  const npmFlags: string[] = []
  /**
   * Yarn-specific command-line flags.
   */
  const yarnFlags: string[] = []
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    let args: string[]
    let command = packageManager
    const useYarn = packageManager === 'yarn'

    if (dependencies && dependencies.length) {
      /**
       * If there are dependencies, run a variation of `{packageManager} add`.
       */
      if (useYarn) {
        /**
         * Call `yarn add --exact (--offline)? (-D)? ...`.
         */
        args = ['add', '--exact']
        if (!isOnline) args.push('--offline')
        args.push('--cwd', root)
        if (devDependencies) args.push('--dev')
        args.push(...dependencies)
      } else {
        /**
         * Call `(p)npm install [--save|--save-dev] ...`.
         */
        args = ['install', '--save-exact']
        args.push(devDependencies ? '--save-dev' : '--save')
        args.push(...dependencies)
      }
    } else {
      /**
       * If there are no dependencies, run a variation of `{packageManager}
       * install`.
       */
      args = ['install']
      if (!isOnline) {
        console.log(chalk.yellow('You appear to be offline.'))
        if (useYarn) {
          console.log(chalk.yellow('Falling back to the local Yarn cache.'))
          console.log()
          args.push('--offline')
        } else {
          console.log()
        }
      }
    }
    /**
     * Add any package manager-specific flags.
     */
    if (useYarn) {
      args.push(...yarnFlags)
    } else {
      args.push(...npmFlags)
    }
    /**
     * Spawn the installation process.
     */
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: {
        ...process.env,
        ADBLOCK: '1',
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: 'development',
        DISABLE_OPENCOLLECTIVE: '1',
      },
    })
    child.on('close', (code: number) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` })
        return
      }
      resolve()
    })
  })
}
