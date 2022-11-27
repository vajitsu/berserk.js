import fs from 'fs'
import path from 'path'
import * as Log from '../build/output/log'

export const existsSync = (f: string): boolean => {
  try {
    fs.accessSync(f, fs.constants.F_OK)
    return true
  } catch (_) {
    return false
  }
}

export function findDir(
  dir: string,
  name: 'app' | 'commands' | 'events'
): string | null {
  // prioritize ./${name} over ./src/${name}
  let curDir = path.join(dir, name)
  if (existsSync(curDir)) return curDir

  curDir = path.join(dir, 'src', name)
  if (existsSync(curDir)) return curDir

  return null
}

export function findDirs(
  dir: string,
  isAppDirEnabled: boolean
): {
  appDir: string | undefined
  eventsDir: string | undefined
  commandsDir: string | undefined
} {
  const commandsDir = findDir(dir, 'commands') || undefined
  const eventsDir = findDir(dir, 'events') || undefined
  const appDir = findDir(dir, 'app') || undefined

  if (
    isAppDirEnabled &&
    appDir == null &&
    commandsDir == null &&
    eventsDir === null
  ) {
    throw new Error(
      "> Couldn't find any `commands`, `events`, or `app` directory. Please create one under the project root"
    )
  }

  if (!isAppDirEnabled) {
    if (appDir != null && commandsDir == null && eventsDir == null) {
      throw new Error(
        '> The `app` directory is experimental. To enable, add `appDir: true` to your `jujutsu.config.js` configuration under `experimental`.'
      )
    }
    if (appDir != null && (commandsDir != null || eventsDir != null)) {
      Log.warn(
        'The `app` directory is experimental. To enable, add `appDir: true` to your `jujutsu.config.js` configuration under `experimental`.'
      )
    }
    if (commandsDir == null && eventsDir == null) {
      throw new Error(
        "> Couldn't find a `events` or `commands` directory. Please create one under the project root"
      )
    }
  }

  return {
    appDir: isAppDirEnabled ? appDir : undefined,
    eventsDir,
    commandsDir,
  }
}
