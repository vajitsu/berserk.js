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

export function findAppDir(
  dir: string,
  isAppDirEnabled: boolean
): {
  appDir: string | undefined
} {
  const appDir = findDir(dir, 'app') || undefined

  if (appDir == null) {
    throw new Error(
      "> Couldn't find the `app` directory. Please create one under the project root"
    )
  }

  return {
    appDir,
  }
}

export function findCommandsDir(dir: string): {
  commandsDir: string | undefined
} {
  const commandsDir = findDir(dir, 'commands') || undefined

  return {
    commandsDir,
  }
}

export function findEventsDir(dir: string): {
  eventsDir: string | undefined
} {
  const eventsDir = findDir(dir, 'commands') || undefined

  return {
    eventsDir,
  }
}
