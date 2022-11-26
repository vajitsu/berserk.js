import { DISCORD_EVENTS } from '../lib/constants'
import { join } from 'path'
import { recursiveReadDir } from '../lib/recursive-readdir'
import { isInvalidCommandName } from './utils'
import { camelCase } from 'jujutsu/dist/compiled/lodash'
import isFileEmpty from '../lib/is-file-empty'

/**
 * For a given command path removes the provided extensions.
 */
export function getCommandFromPath(
  commandPath: string,
  commandExtensions: string[]
) {
  let command = commandPath.replace(
    new RegExp(`.+(${commandExtensions.join('|')})$`),
    ''
  )

  return command
}

export interface AppManifest {
  commands: Array<{
    name: string
    path: string
  }>
  events: Array<{
    name: string
    path: string
  }>
}

export async function createAppManifest({
  appDir,
  eventsDir,
  commandsDir,
  commandExtensions,
  eventExtensions,
}: {
  appDir: string
  eventsDir?: string
  commandsDir?: string
  commandExtensions: string[]
  eventExtensions: string[]
}): Promise<AppManifest> {
  const regex_commands = new RegExp(
    `^command\\.(?:${commandExtensions.join('|')})$`,
    ''
  )
  const regex_events = new RegExp(
    `^event\\.(?:${eventExtensions.join('|')})$`,
    ''
  )

  const regex_commands_dir = new RegExp(
    `^[\\w\\-\\.\\ ]+\.(?:${commandExtensions.join('|')})$`,
    ''
  )
  const regex_events_dir = new RegExp(
    `^[\\w\\-\\.\\ ]+\.(?:${eventExtensions.join('|')})$`,
    ''
  )

  let app_commands = (await recursiveReadDir(appDir, regex_commands)).map(
    (path) => (path.startsWith('\\') ? path.substring(1) : path)
  )
  let app_events = (await recursiveReadDir(appDir, regex_events)).map((path) =>
    path.startsWith('\\') ? path.substring(1) : path
  )
  let commands_dir = commandsDir
    ? (await recursiveReadDir(commandsDir, regex_commands_dir)).map((path) =>
        path.startsWith('\\') ? path.substring(1) : path
      )
    : []
  let events_dir = eventsDir
    ? (await recursiveReadDir(eventsDir, regex_events_dir)).map((path) =>
        path.startsWith('\\') ? path.substring(1) : path
      )
    : []

  const validAppCommands = app_commands
    .map((path) => ({
      path: join('app', path),
      name: path.substring(0, path.lastIndexOf('\\')),
    }))
    .filter(
      (curr) =>
        (!isInvalidCommandName(curr.name) &&
          regex_commands.test(curr.name) === false) ||
        curr.name.length > 0
    )
    .filter((path) => !isFileEmpty(path.path))

  const validCommands = commands_dir
    .filter((path) => {
      const sl = path.match(/\\/g)
      if (sl && sl.length >= 1) {
        return regex_commands.test(path.split('\\')[1])
      } else return true
    })
    .map((path) => ({
      path: join('commands', path),
      name: path.substring(0, path.lastIndexOf('\\')),
    }))
    .filter((path) => !isFileEmpty(path.path))

  const validAppEvents = app_events
    .map((path) => ({
      path: join('app', path),
      name: path.substring(0, path.lastIndexOf('\\')),
    }))
    .map((path) => ({
      ...path,
      name: camelCase(path.name),
    }))
    .filter((curr) => DISCORD_EVENTS.includes(curr.name))
    .filter((path) => !isFileEmpty(path.path))

  const validEvents = events_dir
    .filter((path) => {
      const sl = path.match(/\\/g)
      if (sl && sl.length >= 1) {
        return regex_events.test(path.split('\\')[1])
      } else return true
    })
    .map((path) => {
      return {
        path: join('events', path),
        name: path.substring(0, path.lastIndexOf('\\')),
      }
    })
    .map((path) => ({
      ...path,
      name: camelCase(path.name),
    }))
    .filter((curr) => DISCORD_EVENTS.includes(curr.name))
    .filter((path) => !isFileEmpty(path.path))

  return {
    commands: [...validCommands, ...validAppCommands],
    events: [...validEvents, ...validAppEvents],
  }
}
