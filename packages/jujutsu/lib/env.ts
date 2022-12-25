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
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'jujutsu/dist/compiled/dotenv'
import { expand as dotenvExpand } from 'jujutsu/dist/compiled/dotenv-expand'

export type Env = { [key: string]: string | undefined }
export type LoadedEnvFiles = Array<{
  path: string
  contents: string
}>

let initialEnv: Env | undefined = undefined
let combinedEnv: Env | undefined = undefined
let cachedLoadedEnvFiles: LoadedEnvFiles = []
let previousLoadedEnvFiles: LoadedEnvFiles = []

type Log = {
  info: (...args: any[]) => void
  error: (...args: any[]) => void
}

export function processEnv(
  loadedEnvFiles: LoadedEnvFiles,
  dir?: string,
  log: Log = console,
  forceReload = false,
  dev = false
) {
  if (!initialEnv) {
    initialEnv = Object.assign({}, process.env)
  }
  // only reload env when forceReload is specified
  if (
    !forceReload &&
    (process.env.__JUJUTSU_PROCESSED_ENV || loadedEnvFiles.length === 0)
  ) {
    return process.env as Env
  }
  // flag that we processed the environment values in case a serverless
  // function is re-used or we are running in `next start` mode
  process.env.__JUJUTSU_PROCESSED_ENV = 'true'

  const origEnv = Object.assign({}, initialEnv)
  const parsed: dotenv.DotenvParseOutput = {}

  for (const envFile of loadedEnvFiles) {
    try {
      let result: dotenv.DotenvConfigOutput = {}
      result.parsed = dotenv.parse(envFile.contents)

      result = dotenvExpand(result)

      if (
        result.parsed &&
        !previousLoadedEnvFiles.some(
          (item) =>
            item.contents === envFile.contents && item.path === envFile.path
        )
      ) {
        if (!dev)
          log.info(`Loaded env from ${path.join(dir || '', envFile.path)}`)
      }

      for (const key of Object.keys(result.parsed || {})) {
        if (
          typeof parsed[key] === 'undefined' &&
          typeof origEnv[key] === 'undefined'
        ) {
          parsed[key] = result.parsed?.[key]!
        }
      }
    } catch (err) {
      log.error(
        `Failed to load env from ${path.join(dir || '', envFile.path)}`,
        err
      )
    }
  }
  return Object.assign(process.env, parsed)
}

export function loadEnvConfig(
  dir: string,
  dev?: boolean,
  log: Log = console,
  forceReload = false
): {
  combinedEnv: Env
  loadedEnvFiles: LoadedEnvFiles
} {
  if (!initialEnv) {
    initialEnv = Object.assign({}, process.env)
  }
  // only reload env when forceReload is specified
  if (combinedEnv && !forceReload) {
    return { combinedEnv, loadedEnvFiles: cachedLoadedEnvFiles }
  }
  process.env = Object.assign({}, initialEnv)
  previousLoadedEnvFiles = cachedLoadedEnvFiles
  cachedLoadedEnvFiles = []

  const isTest = process.env.NODE_ENV === 'test'
  const mode = isTest ? 'test' : dev ? 'development' : 'production'
  const dotenvFiles = [
    `.env.${mode}.local`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    mode !== 'test' && `.env.local`,
    `.env.${mode}`,
    '.env',
  ].filter(Boolean) as string[]

  for (const envFile of dotenvFiles) {
    // only load .env if the user provided has an env config file
    const dotEnvPath = path.join(dir, envFile)

    try {
      const stats = fs.statSync(dotEnvPath)

      // make sure to only attempt to read files
      if (!stats.isFile()) {
        continue
      }

      const contents = fs.readFileSync(dotEnvPath, 'utf8')
      cachedLoadedEnvFiles.push({
        path: envFile,
        contents,
      })
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        log.error(`Failed to load env from ${envFile}`, err)
      }
    }
  }
  combinedEnv = processEnv(cachedLoadedEnvFiles, dir, log, forceReload, dev)
  return { combinedEnv, loadedEnvFiles: cachedLoadedEnvFiles }
}
