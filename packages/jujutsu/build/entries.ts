import { APP_DIR_ALIAS, DISCORD_EVENTS, ROOT_DIR_ALIAS } from '../lib/constants'
import chalk from 'jujutsu/dist/compiled/chalk'
import { warn } from './output/log'
import { join } from 'path'
import { recursiveReadDir } from '../lib/recursive-readdir'
import { isInvalidCommandName } from './utils'
import { camelCase } from 'jujutsu/dist/compiled/lodash'

type ObjectValue<T> = T extends { [key: string]: infer V } ? V : never

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
  commandExtensions,
  eventExtensions,
}: {
  appDir: string
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

  let commands = await (
    await recursiveReadDir(appDir, regex_commands)
  ).map((path) => (path.startsWith('\\') ? path.substring(1) : path))
  let events = await (
    await recursiveReadDir(appDir, regex_events)
  ).map((path) => (path.startsWith('\\') ? path.substring(1) : path))

  const validCommands = commands
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

  const validEvents = events
    .map((path) => ({
      path: join('app', path),
      name: path.substring(0, path.lastIndexOf('\\')),
    }))
    .map((path) => ({
      ...path,
      name: camelCase(path.name),
    }))
    .filter((curr) => DISCORD_EVENTS.includes(curr.name))

  return {
    commands: validCommands,
    events: validEvents,
  }
}
