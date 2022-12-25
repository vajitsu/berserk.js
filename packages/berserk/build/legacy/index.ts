/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { BerserkConfigComplete } from '../../server/config-shared'
import { trace, flushAllTraces, setGlobal } from '../../trace'
import { AppManifest, createAppManifest } from './entries'
import { recursiveDelete } from '../../lib/recursive-delete'
import {
  APP_PATHS_MANIFEST,
  BUILD_MANIFEST,
  PHASE_PRODUCTION_BUILD,
  SWC_CONFIG,
} from '../../lib/constants'
import { transform } from '@swc/core'
import compileCommands from './compiler/commands'
import { findDirs } from '../../lib/find-dirs'
import { fileExists } from '../../lib/file-exists'
import * as ciEnvironment from '../../lib/ci-info'
import title from 'berserk/dist/compiled/title'
import { isWriteable } from '../is-writeable'
import { loadEnvConfig } from '../../lib/env'
import loadConfig from '../../server/config'
import isError from '../../lib/is-error'
import * as Log from '../output/log'
import { promises } from 'fs'
import path, { join as pathJoin } from 'path'
import ms from 'ms'
import { isBoolean, isFunction } from 'berserk/dist/compiled/lodash'
import {
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  Locale,
  LocalizationMap,
  ChannelType,
} from 'berserk/dist/compiled/discord.js'
import { printAndExit } from '../../lib/utils'
import compileEvents from './compiler/events'
import { mkdirp } from 'fs-extra'
import uuid from 'berserk/dist/compiled/uid-promise'
import chalk from 'berserk/dist/compiled/chalk'
import { exists } from 'berserk/dist/compiled/find-up'
import { rm } from 'fs/promises'

export interface AppManifestComplete extends AppManifest {
  commands: {
    name: string
    path: string
    absolutePath: string
  }[]
  events: {
    name: string
    path: string
    absolutePath: string
  }[]
  subcommands: {
    name: string
    path: string
    parent: string
    absolutePath: string
  }[]
}

interface CommandOption_Integer extends CommandOption_Bland<'Integer'> {
  autoComplete?: boolean
  minValue?: number
  maxValue?: number
}
interface CommandOption_Number extends CommandOption_Bland<NumberConstructor> {
  autoComplete?: boolean
  minValue?: number
  maxValue?: number
}
interface CommandOption_String extends CommandOption_Bland<StringConstructor> {
  autoComplete?: boolean
  minLength?: number
  maxLength?: number
}
interface CommandOption_Channel extends CommandOption_Bland<'Channel'> {
  channelTypes: (
    | ChannelType.GuildText
    | ChannelType.GuildVoice
    | ChannelType.GuildCategory
    | ChannelType.GuildAnnouncement
    | ChannelType.AnnouncementThread
    | ChannelType.PublicThread
    | ChannelType.PrivateThread
    | ChannelType.GuildStageVoice
    | ChannelType.GuildForum
  )[]
}
type CommandOption_Bland<Type> = {
  name: string
  description: string
  localizations?: {
    name?: LocalizationMap
    description?: LocalizationMap
  }
  required?: boolean
  type: Type
}

type CommandOption =
  | CommandOption_Number
  | CommandOption_String
  | CommandOption_Integer
  | CommandOption_Channel
  | CommandOption_Bland<BooleanConstructor>
  | CommandOption_Bland<'Attachment'>
  | CommandOption_Bland<'Role'>
  | CommandOption_Bland<'User'>
  | CommandOption_Bland<'Mentionable'>

export type CommandFile = {
  description?: string
  default: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => Promise<void>
  localizations?: {
    name?: LocalizationMap
    description?: LocalizationMap
  }
  defaultMemberPermissions?: string | number | bigint
  dmPermission?: boolean
  options?: Array<CommandOption>
}
export interface CommandFileComplete extends CommandFile {
  absolutePath: string
  name: string
  subcommands?: CommandFileComplete[]
}

export type EventFile<T extends keyof ClientEvents> = {
  default: (...args: ClientEvents[T]) => Promise<void>
}
export interface EventFileComplete extends EventFile<any> {
  absolutePath: string
  name: keyof ClientEvents
}

export function interopForEvent(mod: any): EventFile<any> {
  if (mod.default) {
    delete mod['__name']
    return mod as EventFile<any>
  } else
    return {
      default: mod,
    } as EventFile<any>
}
export function interopForCommand(mod: any, _sub = false): CommandFile {
  if (mod.default) {
    delete mod['__name']
    return mod as CommandFile
  } else {
    const _: Partial<CommandFile> = { default: mod }

    if (mod.description) {
      _['description'] = mod.description
      delete mod['description']
    }

    if (
      mod.localizations &&
      ((!!mod.localizations.name &&
        Object.values(mod.localizations.name).length > 0) ||
        (!!mod.localizations.description &&
          Object.values(mod.localizations.description).length > 0))
    ) {
      _['localizations'] = mod.localizations
      delete mod['localizations']
    }

    if (mod.defaultMemberPermissions) {
      _['defaultMemberPermissions'] = mod.defaultMemberPermissions
      delete mod['defaultMemberPermissions']
    }

    if (mod.dmPermission) {
      _['dmPermission'] = mod.dmPermission
      delete mod['dmPermission']
    }

    if (mod.options) {
      _['options'] = mod.options
      delete mod['options']
    }

    return _ as CommandFile
  }
}

export default async function build(
  dir: string,
  conf = null,
  dev = false
): Promise<void> {
  try {
    let start: [number, number] | undefined
    let end: number | undefined

    const berserkBuildSpan = trace('berserk-build', undefined, {
      version: process.env.__BERSERK_VERSION as string,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildResult = await berserkBuildSpan.traceAsyncFn(async () => {
      start = process.hrtime()
      // attempt to load global env values so they are available in berserk.config.js
      const { loadedEnvFiles } = berserkBuildSpan
        .traceChild('load-dotenv')
        .traceFn(() => loadEnvConfig(dir, dev, Log))

      const config: BerserkConfigComplete = await berserkBuildSpan
        .traceChild('load-berserk-config')
        .traceAsyncFn(() => loadConfig(PHASE_PRODUCTION_BUILD, dir, conf))

      const distDir = path.join(dir, config.distDir)
      setGlobal('phase', PHASE_PRODUCTION_BUILD)
      setGlobal('distDir', distDir)

      const distDirCreated = await berserkBuildSpan
        .traceChild('create-dist-dir')
        .traceAsyncFn(async () => {
          try {
            await promises.mkdir(distDir, { recursive: true })
            return true
          } catch (err) {
            if (isError(err) && err.code === 'EPERM') {
              return false
            }
            throw err
          }
        })

      if (!distDirCreated || !(await isWriteable(distDir))) {
        throw new Error('> Build directory is not writeable.')
      }

      const tempDir = pathJoin(distDir, 'fallback')

      if (config.cleanDistDir) {
        await recursiveDelete(distDir, /^cache/)
      }

      // Ensure commonjs handling is used for files in the distDir (generally .berserk)
      // Files outside of the distDir can be "type": "module"
      await promises.writeFile(
        path.join(distDir, 'package.json'),
        '{"type": "commonjs"}'
      )

      const cacheDir = path.join(distDir, 'cache')
      if (ciEnvironment.isCI && !ciEnvironment.hasBerserkSupport) {
        const hasCache = await fileExists(cacheDir)

        if (!hasCache) {
          // Intentionally not piping to stderr in case people fail in CI when
          // stderr is detected.
          console.log(
            `${Log.prefixes.warn} No build cache found. Please configure build caching for faster rebuilds.`
          )
        }
      }

      const isAppDirEnabled = !!config.experimental.appDir
      const { appDir, eventsDir, commandsDir } = findDirs(dir, isAppDirEnabled)

      let appManifest: AppManifestComplete | undefined

      const appManifestUncomplete = await berserkBuildSpan
        .traceChild('generate-app-manifest')
        .traceAsyncFn(() =>
          createAppManifest({
            appDir,
            commandExtensions: config.commandExtensions,
            eventExtensions: config.eventExtensions,
            subCommandsEnabled: true,
            commandsDir,
            eventsDir,
            isAppDirEnabled,
          })
        )

      const appManifestCommands = appManifestUncomplete.commands.map(
        (command) => ({
          ...command,
          absolutePath: path.join(dir, command.path),
        })
      ) as AppManifestComplete['commands']
      const appManifestSubcommands = appManifestUncomplete.subcommands.map(
        (command) => ({
          ...command,
          absolutePath: path.join(dir, command.path),
        })
      ) as AppManifestComplete['subcommands']
      const appManifestEvents = appManifestUncomplete.events.map((event) => ({
        ...event,
        absolutePath: path.join(dir, event.path),
      })) as AppManifestComplete['events']

      appManifest = {
        subcommands: appManifestSubcommands,
        commands: appManifestCommands,
        events: appManifestEvents,
      }

      const allCommands = new Set<string>()
      let allCommandInfos = new Map<string, CommandFileComplete>()

      const allEvents = new Set<string>()
      let allEventInfos = new Map<string, EventFileComplete>()

      if (appManifest) {
        async function detectConflictingNames({
          events,
          commands,
          subcommands,
        }: AppManifest) {
          let conflictingEvents: string[][] = []
          let conflictingCommands: string[][] = []
          let conflictingSubcommands: string[][] = []

          // Discover conflicting event names
          for (let event of events) {
            if (events.filter((ev) => ev.name === event.name).length > 1) {
              const other = events
                .filter(
                  (ev) => ev.name === event.name && ev.path !== event.path
                )
                .map((ev) => ev.path.replace('app\\', ''))
              conflictingEvents.push([
                event.path.replace('app\\', ''),
                ...other,
              ])
            }
          }

          // Discover conflicting command names
          for (let command of commands) {
            if (commands.filter((co) => co.name === command.name).length > 1) {
              const other = commands
                .filter(
                  (co) => co.name === command.name && co.path !== command.path
                )
                .map((co) => co.path.replace('app\\', ''))
              conflictingCommands.push([
                command.path.replace('app\\', ''),
                ...other,
              ])
            }
          }

          for (let subcommand of subcommands) {
            if (
              subcommands.filter(
                (sco) =>
                  sco.name === subcommand.name &&
                  sco.parent === subcommand.parent
              ).length > 1
            ) {
              const other = commands
                .filter(
                  (sco) =>
                    sco.name === subcommand.name && sco.path !== subcommand.path
                )
                .map((sco) => sco.path.replace('app\\', ''))
              conflictingSubcommands.push([
                subcommand.path.replace('app\\', ''),
                ...other,
              ])
            }
          }

          let numCommandConflicts = conflictingCommands.length
          let numEventConflicts = conflictingEvents.length
          let numSubcommandConflicts = conflictingSubcommands.length

          if (commands.length > 0 && numCommandConflicts > 0) {
            Log.error(
              `Conflicting command name${
                numCommandConflicts === 1 ? ' was' : 's were'
              } found, please remove the conflicting command names to continue:`
            )
            for (const [...paths] of conflictingCommands) {
              Log.error(`  ${paths.map((p) => `"${p}"`).join(' - ')}`)
            }
            process.exit(1)
          }

          if (subcommands.length > 0 && numSubcommandConflicts > 0) {
            Log.error(
              `Conflicting sub-command name${
                numCommandConflicts === 1 ? ' was' : 's were'
              } found, please remove the conflicting sub-command names to continue:`
            )
            for (const [...paths] of conflictingCommands) {
              Log.error(`  ${paths.map((p) => `"${p}"`).join(' - ')}`)
            }
            process.exit(1)
          }

          if (events.length > 0 && numEventConflicts > 0) {
            conflictingEvents = [
              conflictingEvents.reduce((prev, curr) => {
                if (curr.values() === prev.values()) return prev
                else return curr
              }),
            ]

            Log.error(
              `Conflicting event name${
                numCommandConflicts === 1 ? ' was' : 's were'
              } found, please remove the conflicting event names to continue:`
            )
            for (const paths of conflictingEvents) {
              Log.error(`${paths.map((p) => `"${p}"`).join(' - ')}`)
            }
            process.exit(1)
          }
        }
        function validateCommandInfo(mod: CommandFile) {
          const errors: {
            trace:
              | 'description'
              | 'options'
              | 'localizations'
              | 'dm permission'
              | 'default member permission'
              | 'execute function'
            message: string
          }[] = []

          if (typeof mod.description !== 'string') {
            errors.push({
              trace: 'description',
              message:
                'A description is required for slash commands and sub-commands',
            })
          }

          const optionTypes = [
            String,
            Boolean,
            Number,
            'Integer',
            'User',
            'Channel',
            'Role',
            'Mentionable',
            'Attachment',
          ]
          // Check options' items
          if (mod.options) {
            for (let opt of mod.options) {
              const validType = optionTypes.includes(opt.type)
              !validType &&
                errors.push({
                  trace: 'options',
                  message: 'Invalid option type has been passed.',
                })
            }
          }

          // Check export default or module.exports value
          if (!isFunction(mod.default)) {
            errors.push({
              trace: 'execute function',
              message: 'Default export is not a function.',
            })
          }

          // Check DM Permission value
          if (mod.dmPermission && !isBoolean(mod.dmPermission)) {
            errors.push({
              trace: 'dm permission',
              message: `Expected true or false, recieved "${mod.dmPermission}".`,
            })
          }

          // Check Default Member Permission value
          if (mod.defaultMemberPermissions) {
            const type = typeof mod.defaultMemberPermissions
            if (type !== 'bigint' && type !== 'string' && type !== 'number')
              errors.push({
                trace: 'default member permission',
                message: `Expected a bigint/number/string, recieved ${mod.defaultMemberPermissions}.`,
              })
          }

          // Check localization's keys and values
          const DiscordLocales = Object.values(Locale) as string[]
          if (mod.localizations && mod.localizations.description) {
            for (let locale in mod.localizations.description) {
              if (!DiscordLocales.includes(locale))
                errors.push({
                  trace: 'localizations',
                  message: `Key "${locale}" does not exist in available list of locales for the description.`,
                })
              else if (
                typeof mod.localizations.description[locale as Locale] !==
                'string'
              )
                errors.push({
                  trace: 'localizations',
                  message: `Value of "${locale}" is not a string.`,
                })
            }
          } else if (mod.localizations && mod.localizations.name) {
            for (let locale in mod.localizations.name) {
              if (!DiscordLocales.includes(locale))
                errors.push({
                  trace: 'localizations',
                  message: `Key "${locale}" does not exist in available list of locales for the name.`,
                })
              else if (
                typeof mod.localizations.name[locale as Locale] !== 'string'
              )
                errors.push({
                  trace: 'localizations',
                  message: `Value of "${locale}" is not a string.`,
                })
            }
          }

          return errors
        }
        function validateEventInfo(mod: EventFile<any>) {
          const errors: {
            trace: 'execute function'
            message: string
          }[] = []

          // Check export default or module.exports value
          if (!isFunction(mod.default)) {
            errors.push({
              trace: 'execute function',
              message: 'Default export is not a function.',
            })
          }

          return errors
        }
        async function fallback(
          _path: string,
          uid: string | Promise<string> = uuid(7)
        ) {
          const outpath = pathJoin(tempDir, `fallback.${await uid}.js`)
          const alreadyExists = await exists(outpath)

          const content = (await promises.readFile(_path)).toString('utf8')
          const { code } = await transform(content, {
            ...SWC_CONFIG,
            jsc: {
              parser: _path.endsWith('.ts')
                ? {
                    syntax: 'typescript',
                  }
                : {
                    syntax: 'ecmascript',
                    exportDefaultFrom: true,
                    importAssertions: true,
                  },
            },
          })

          await mkdirp(tempDir)

          let current =
            alreadyExists && (await promises.readFile(outpath)).toString('utf8')

          if ((current && current !== code) || !current)
            await promises.writeFile(outpath, code, 'utf8')

          await promises.writeFile(outpath, code, 'utf8')

          const mod = require(outpath)

          return {
            path: outpath,
            mod,
          }
        }

        await detectConflictingNames(appManifest)

        if (
          appManifest.commands.length > 0 ||
          appManifest.events.length > 0 ||
          appManifest.subcommands.length > 0
        ) {
          let conflicts: Array<{
            path: string
            conflicts: Array<{
              trace: string
              message: string
            }>
          }> = []
          if (appManifest.commands.length > 0) {
            for (let command of appManifest.commands) {
              try {
                let Module: CommandFile | undefined
                let Fallback

                try {
                  Module = interopForCommand(require(command.absolutePath))
                } catch (_) {
                  Fallback = await fallback(
                    command.absolutePath,
                    Buffer.from(command.name).toString('base64url')
                  )
                  Module = interopForCommand(Fallback.mod)
                }

                if (Module) {
                  const errors = validateCommandInfo(Module)
                  if (errors.length > 0) {
                    conflicts.push({
                      path: command.path.replace('app\\', ''),
                      conflicts: errors,
                    })
                    Fallback && (await promises.rm(Fallback.path))
                  } else {
                    allCommands.add(command.name)
                    allCommandInfos.set(command.name, {
                      absolutePath: command.absolutePath,
                      name: command.name,
                      ...Module,
                    })
                  }
                }
              } catch (error) {
                if (isError(error)) {
                  if (error.code === 'MODULE_NOT_FOUND')
                    Log.warn(
                      `Skipping "${command.absolutePath}" - Command file is empty.`
                    )
                  else Log.error(error)
                } else console.error(error)
              }
            }
          }

          if (appManifest.events.length > 0) {
            for (let event of appManifest.events) {
              try {
                let Module: EventFile<any> | undefined
                let Fallback

                try {
                  Module = interopForEvent(require(event.absolutePath))
                } catch (_) {
                  Fallback = await fallback(
                    event.absolutePath,
                    Buffer.from(event.name).toString('base64url')
                  )
                  Module = interopForEvent(Fallback.mod)
                }

                if (Module) {
                  const errors = validateEventInfo(Module)
                  if (errors.length > 0) {
                    conflicts.push({
                      path: event.path.replace('app\\', ''),
                      conflicts: errors,
                    })
                    Fallback && (await promises.rm(Fallback.path))
                  } else {
                    allEvents.add(event.name)
                    allEventInfos.set(event.name, {
                      absolutePath: event.absolutePath,
                      name: event.name as any,
                      ...Module,
                    })
                  }
                }
              } catch (error) {
                if (isError(error)) {
                  if (error.code === 'MODULE_NOT_FOUND')
                    Log.warn(
                      `Skipping "${event.absolutePath}" - Event file is empty.`
                    )
                  else Log.error(error)
                } else console.error(error)
              }
            }
          }

          if (appManifest.subcommands.length > 0) {
            for (let command of appManifest.subcommands) {
              try {
                let Module: CommandFile | undefined
                let Fallback

                try {
                  Module = interopForCommand(
                    require(command.absolutePath),
                    true
                  )
                } catch (_) {
                  Fallback = await fallback(
                    command.absolutePath,
                    Buffer.from(command.name).toString('base64url')
                  )
                  Module = interopForCommand(Fallback.mod, true)
                }

                if (Module) {
                  const errors = validateCommandInfo(Module)
                  if (errors.length > 0) {
                    conflicts.push({
                      path: command.path.replace('app\\', ''),
                      conflicts: errors,
                    })
                    Fallback && (await promises.rm(Fallback.path))
                  } else {
                    const Parent = allCommandInfos.get(
                      command.parent
                    ) as CommandFileComplete
                    if (Parent)
                      allCommandInfos.set(command.parent, {
                        ...Parent,
                        subcommands: Parent.subcommands
                          ? [
                              ...Parent.subcommands,
                              {
                                absolutePath: command.absolutePath,
                                name: command.name,
                                ...Module,
                              },
                            ]
                          : [
                              {
                                absolutePath: command.absolutePath,
                                name: command.name,
                                ...Module,
                              },
                            ],
                      })
                    else
                      allCommandInfos.set(command.parent, {
                        subcommands: [
                          {
                            absolutePath: command.absolutePath,
                            name: command.name,
                            ...Module,
                          },
                        ],
                      } as CommandFileComplete)
                  }
                }
              } catch (error) {
                if (isError(error)) {
                  if (error.code === 'MODULE_NOT_FOUND')
                    Log.warn(
                      `Skipping "${command.absolutePath}" - Command file is empty.`
                    )
                  else Log.error(error)
                } else console.error(error)
              }
            }
          }

          for (let conflict of conflicts) {
            const index = conflicts.indexOf(conflict)

            Log.warn(
              `The following errors have been found in "${conflict.path}":`
            )
            for (let err of conflict.conflicts) {
              Log.warn(
                `${err.message} [${title(err.trace, {
                  special: ['DM Permission'],
                })}]`
              )
            }
            if (index === conflicts.length - 1)
              Log.warn('All files that have invalid values will be skipped.')
          }
        }
      } else {
        printAndExit(
          '> No events or commands have been found in the `app` directory.'
        )
      }

      if (allEvents.size === 0 && allCommands.size === 0) {
        printAndExit(
          '> No valid commands or events have been found in the `app` directory.\n  Therefore, exiting as there are no files to build for production.'
        )
      }

      let manifests: {
        commands:
          | {
              path: string
              name: string
            }[]
          | undefined
        events:
          | {
              path: string
              name: string
            }[]
          | undefined
      } = {
        commands: undefined,
        events: undefined,
      }

      if (allCommands.size > 0)
        manifests.commands = await compileCommands(
          allCommands,
          allCommandInfos,
          loadedEnvFiles,
          dir,
          config.experimental.swcMinify || false
        )
      if (allEvents.size > 0)
        manifests.events = await compileEvents(
          allEvents,
          allEventInfos,
          loadedEnvFiles,
          dir,
          config.experimental.swcMinify || false
        )

      if (!dev && (await exists(tempDir)))
        await rm(tempDir, { recursive: true })

      const appPathsManifest = []

      if (manifests.commands)
        appPathsManifest.push(
          ...manifests.commands?.map((x) => ({ type: 'command', ...x }))
        )
      if (manifests.events)
        appPathsManifest.push(
          ...manifests.events?.map((x) => ({ type: 'event', ...x }))
        )

      await mkdirp(pathJoin(distDir))

      await promises.writeFile(
        pathJoin(distDir, APP_PATHS_MANIFEST),
        appPathsManifest.filter((x) => x.path.includes(pathJoin(dir, 'app')))
          .length > 0
          ? JSON.stringify(
              appPathsManifest
                .filter((x) => x.path.includes(pathJoin(dir, 'app')))
                .map((x) => [x.name, x])
            )
          : '[]',
        'utf8'
      )

      const buildManifest = [...appPathsManifest]
      if (!!manifests.commands)
        buildManifest.push(
          ...manifests.commands.map((command) => ({
            ...command,
            type: 'command',
          }))
        )
      if (!!manifests.events)
        buildManifest.push(
          ...manifests.events.map((event) => ({
            ...event,
            type: 'event',
          }))
        )

      await promises.writeFile(
        pathJoin(distDir, BUILD_MANIFEST),
        JSON.stringify({
          commands: buildManifest
            .filter((manifest) => manifest.type === 'command')
            .map((manifest) => ({
              app: manifest.path.includes(pathJoin(dir, 'app')),
              type: 'command',
              path: manifest.path,
              name: manifest.name,
            })),
          events: buildManifest
            .filter((manifest) => manifest.type === 'event')
            .map((manifest) => ({
              app: manifest.path.includes(pathJoin(dir, 'app')),
              type: 'event',
              path: manifest.path,
              name: manifest.name,
            })),
        })
      )

      const _end = process.hrtime(start)
      end = parseInt(
        (
          ((_end.at(0) as number) * 1000000000 + (_end.at(1) as number)) /
          1000000
        ).toFixed(0)
      )
    })

    const isTTY = process.stdout.isTTY
    const jjGradient = `${chalk.bold(
      isTTY
        ? require('berserk/dist/compiled/gradient-string')('cyan', 'violet')(
            '>>> BERSERK'
          )
        : '>>> Ready for producition use'
    )} ${chalk.dim(`(alpha - built in ${ms(end as number)})`)}\n\n`

    let thankYouMsg = `Thank you for using the Berserk v1 for your Discord bot! As a reminder,\nBerserk is a very new framework and you may come across some issues.\n\nPlease report issues here: https://github.com/vajitsu/berserk.js/issues.`
    // eslint-disable-next-line no-sequences
    if (!dev) console.log(), console.log(jjGradient + thankYouMsg)
  } finally {
    // Ensure all traces are flushed before finishing the command
    await flushAllTraces()
  }
}
