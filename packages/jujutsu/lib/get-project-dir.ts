import fs from 'fs'
import path from 'path'
import { commands } from './commands'
import * as Log from '../build/output/log'
import { detectTypo } from './detect-typo'

export function getProjectDir(dir?: string) {
  try {
    const resolvedDir = path.resolve(dir || '.')
    const realDir = fs.realpathSync.native(resolvedDir)

    if (
      resolvedDir !== realDir &&
      resolvedDir.toLowerCase() === realDir.toLowerCase()
    ) {
      Log.warn(
        `Invalid casing detected for project dir, received ${resolvedDir} actual path ${realDir}.`
      )
    }

    return realDir
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      if (typeof dir === 'string') {
        const detectedTypo = detectTypo(dir, Object.keys(commands))

        if (detectedTypo) {
          Log.error(
            `"jujutsu ${dir}" does not exist. Did you mean "jujutsu ${detectedTypo}"?`
          )
          process.exit(1)
        }
      }

      Log.error(
        `Invalid project directory provided, no such directory: ${path.resolve(
          dir || '.'
        )}`
      )
      process.exit(1)
    }
    throw err
  }
}
