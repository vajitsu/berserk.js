import { join } from 'path'
import { APP_PATHS_MANIFEST, SERVER_DIRECTORY } from '../lib/constants'

import LRUCache from 'berserk/dist/compiled/lru-cache'
import { CommandNotFoundError, EventNotFoundError } from './lib/utils'

const pagePathCache =
  process.env.NODE_ENV === 'development'
    ? {
        get: (_key: string) => {
          return null
        },
        set: () => {},
        has: () => false,
      }
    : new LRUCache<string, string | null>({
        max: 1000,
      })

export type AppManifest = [
  name: string,
  data: {
    type: 'event' | 'command'
    name: string
    path: string
  }
][]

export function getMaybePagePath(
  page: string,
  distDir: string,
  type: 'command' | 'event'
): string | null {
  const cacheKey = page

  if (pagePathCache.has(cacheKey)) {
    return pagePathCache.get(cacheKey) as string | null
  }

  const serverBuildPath = join(distDir, SERVER_DIRECTORY)

  const appPathsManifest = require(join(
    serverBuildPath,
    APP_PATHS_MANIFEST
  )) as AppManifest

  const checkManifest = (manifest: AppManifest) => {
    let curPath = manifest.find(
      (mod) => mod[0] === type && mod[1].name === page
    ) as [
      name: string,
      data: {
        type: 'event' | 'command'
        name: string
        path: string
      }
    ]
    return curPath[1].path
  }
  let pagePath: string | undefined

  if (appPathsManifest) {
    pagePath = checkManifest(appPathsManifest)
  }

  if (!pagePath) {
    pagePathCache.set(cacheKey, null)
    return null
  }

  const path = join(serverBuildPath, pagePath)
  pagePathCache.set(cacheKey, path)

  return path
}

export function getCommandPath(command: string, distDir: string): string {
  const commandPath = getMaybePagePath(command, distDir, 'command')

  if (!commandPath) {
    throw new CommandNotFoundError(command)
  }

  return commandPath
}

export function requireCommand(command: string, distDir: string): any {
  const commandPath = getCommandPath(command, distDir)
  return require(commandPath)
}

export function getEventPath(event: string, distDir: string): string {
  const eventPath = getMaybePagePath(event, distDir, 'event')

  if (!eventPath) {
    throw new EventNotFoundError(event)
  }

  return eventPath
}

export function requireEvent(event: string, distDir: string): any {
  const eventPath = getEventPath(event, distDir)
  return require(eventPath)
}
