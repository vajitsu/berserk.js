import { JujutsuConfigComplete } from '../client/config-shared'
import { trace, flushAllTraces, setGlobal } from '../trace'
import { AppManifest, createAppManifest } from './entries'
import { recursiveDelete } from '../lib/recursive-delete'
import { PHASE_PRODUCTION_BUILD, SWC_CONFIG } from '../lib/constants'
import compileCommands from './compiler/commands'
import { findAppDir, findCommandsDir, findEventsDir } from '../lib/find-app-dir'
import { fileExists } from '../lib/file-exists'
import * as ciEnvironment from '../lib/ci-info'
import title from 'jujutsu/dist/compiled/title'
import { isWriteable } from './is-writeable'
import { loadEnvConfig } from '../lib/env'
import loadConfig from '../client/config'
import isError from '../lib/is-error'
import * as Log from './output/log'
import { promises } from 'fs'
import path, { join as pathJoin } from 'path'
import esm from 'esm'
import ms from 'ms'

import {
  lockfilePatchPromise,
  teardownTraceSubscriber,
  teardownCrashReporter,
  loadBindings,
  transform,
} from './swc'
import { isBoolean, isFunction } from 'jujutsu/dist/compiled/lodash'
import {
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  Locale,
  LocalizationMap,
  ChannelType,
  Events,
} from 'jujutsu/dist/compiled/discord.js'
import { printAndExit } from '../lib/utils'
import compileEvents from './compiler/events'
import { mkdirp } from 'fs-extra'
import uuid from 'jujutsu/dist/compiled/uid-promise'
import chalk from 'jujutsu/dist/compiled/chalk'
import { exists } from 'jujutsu/dist/compiled/find-up'
import { rm } from 'fs/promises'

interface AppManifestComplete extends AppManifest {
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
}

export type EventFile = {
  default: (...args: ClientEvents[keyof ClientEvents]) => Promise<void>
}
export interface EventFileComplete extends EventFile {
  absolutePath: string
  name: keyof ClientEvents
}

export function interopForEvent(mod: any): EventFile {
  if (mod.default) {
    delete mod['__name']
    return mod as EventFile
  } else
    return {
      default: mod,
    } as EventFile
}
export function interopForCommand(mod: any): CommandFile {
  if (mod.default) {
    delete mod['__name']
    return mod as CommandFile
  } else {
    const _: Partial<CommandFile> = { default: mod }

    if (mod.description)
      (_['description'] = mod.description), delete mod['description']

    if (
      mod.localizations &&
      ((!!mod.localizations.name &&
        Object.values(mod.localizations.name).length > 0) ||
        (!!mod.localizations.description &&
          Object.values(mod.localizations.description).length > 0))
    )
      (_['localizations'] = mod.localizations), delete mod['localizations']

    if (mod.defaultMemberPermissions)
      (_['defaultMemberPermissions'] = mod.defaultMemberPermissions),
        delete mod['defaultMemberPermissions']

    if (mod.dmPermission)
      (_['dmPermission'] = mod.dmPermission), delete mod['dmPermission']

    if (mod.options) (_['options'] = mod.options), delete mod['options']

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

    const jujutsuBuildSpan = trace('jujutsu-build', undefined, {
      version: process.env.__JUJUTSU_VERSION as string,
    })

    const buildResult = await jujutsuBuildSpan.traceAsyncFn(async () => {
      start = process.hrtime()
      // attempt to load global env values so they are available in jujutsu.config.js
      const { loadedEnvFiles } = jujutsuBuildSpan
        .traceChild('load-dotenv')
        .traceFn(() => loadEnvConfig(dir, dev, Log))

      const config: JujutsuConfigComplete = await jujutsuBuildSpan
        .traceChild('load-jujutsu-config')
        .traceAsyncFn(() => loadConfig(PHASE_PRODUCTION_BUILD, dir, conf))

      const distDir = path.join(dir, config.distDir)
      setGlobal('phase', PHASE_PRODUCTION_BUILD)
      setGlobal('distDir', distDir)

      const distDirCreated = await jujutsuBuildSpan
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

      const tempDir = pathJoin(distDir, 'temp')

      if (config.cleanDistDir) {
        await recursiveDelete(distDir, /^cache/)
      }

      // Ensure commonjs handling is used for files in the distDir (generally .jujutsu)
      // Files outside of the distDir can be "type": "module"
      await promises.writeFile(
        path.join(distDir, 'package.json'),
        '{"type": "commonjs"}'
      )

      const cacheDir = path.join(distDir, 'cache')
      if (ciEnvironment.isCI && !ciEnvironment.hasJujutsuSupport) {
        const hasCache = await fileExists(cacheDir)

        if (!hasCache) {
          // Intentionally not piping to stderr in case people fail in CI when
          // stderr is detected.
          console.log(
            `${Log.prefixes.warn} No build cache found. Please configure build caching for faster rebuilds.`
          )
        }
      }

      const isAppDirEnabled = true
      const { appDir } = findAppDir(dir, isAppDirEnabled)

      // Allow for use of the events or commands directory
      const { commandsDir } = findCommandsDir(dir)
      const { eventsDir } = findEventsDir(dir)

      let appManifest: AppManifestComplete | undefined

      if (appDir) {
        const opt: any = {
          appDir,
          commandExtensions: config.commandExtensions,
          eventExtensions: config.eventExtensions,
        }
        if (commandsDir) opt['commandsDir'] = commandsDir
        if (eventsDir) opt['eventsDir'] = eventsDir

        const appManifestUncomplete = await jujutsuBuildSpan
          .traceChild('generate-app-manifest')
          .traceAsyncFn(() => createAppManifest(opt))

        const appManifestCommands = appManifestUncomplete.commands.map(
          (command) => ({
            ...command,
            absolutePath: path.join(dir, command.path),
          })
        ) as AppManifestComplete['commands']
        const appManifestEvents = appManifestUncomplete.events.map((event) => ({
          ...event,
          absolutePath: path.join(dir, event.path),
        })) as AppManifestComplete['events']

        appManifest = {
          commands: appManifestCommands,
          events: appManifestEvents,
        }
      }

      const allCommands = new Set<string>()
      let allCommandInfos = new Map<string, CommandFileComplete>()

      const allEvents = new Set<string>()
      let allEventInfos = new Map<string, EventFileComplete>()

      if (appManifest) {
        async function detectConflictingNames({
          events,
          commands,
        }: AppManifest) {
          let conflictingEvents: string[][] = []
          let conflictingCommands: string[][] = []

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

          let numCommandConflicts = conflictingCommands.length
          let numEventConflicts = conflictingEvents.length

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
        function validateEventInfo(mod: EventFile) {
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
        async function fallback(path: string) {
          const content = (await promises.readFile(path)).toString('utf8')

          await loadBindings()
          const { code } = await transform(content, SWC_CONFIG)

          await mkdirp(tempDir)

          const outpath = pathJoin(tempDir, `fallback.${await uuid(7)}.js`)

          await promises.writeFile(outpath, code, 'utf8')

          const mod = require(outpath)

          return {
            path: outpath,
            mod,
          }
        }

        await detectConflictingNames(appManifest)

        if (appManifest.commands.length > 0 || appManifest.events.length > 0) {
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
                  Module = interopForCommand(
                    esm(module, {
                      mode: 'auto',
                      cjs: true,
                    })(command.absolutePath)
                  )
                } catch (_) {
                  Fallback = await fallback(command.absolutePath)
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
                      `Skipping "${command.absolutePath}" - Command file has no exported contents.`
                    )
                  else Log.error(error)
                } else console.error(error)
              }
            }
          }

          if (appManifest.events.length > 0) {
            for (let event of appManifest.events) {
              try {
                let Module: EventFile | undefined
                let Fallback

                try {
                  Module = interopForEvent(
                    esm(module, {
                      mode: 'auto',
                      cjs: true,
                    })(event.absolutePath)
                  )
                } catch (_) {
                  Fallback = await fallback(event.absolutePath)
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
                      `Skipping "${event.absolutePath}" - Event file has no exported contents.`
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
          config.swcMinify,
          dev
        )
      if (allEvents.size > 0)
        manifests.events = await compileEvents(
          allEvents,
          allEventInfos,
          loadedEnvFiles,
          dir,
          config.swcMinify,
          dev
        )

      if (await exists(tempDir)) await rm(tempDir, { recursive: true })

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
        ? require('jujutsu/dist/compiled/gradient-string')('cyan', 'violet')(
            '>>> JUJUTSU'
          )
        : '>>> Ready for producition use'
    )} ${chalk.dim(`(alpha - built in ${ms(end as number)})`)}\n\n`

    let thankYouMsg = `Thank you for using the Jujutsu v1 for your Discord bot! As a reminder,\nJujutsu is a very new framework and you may come across some issues.\n\nPlease report issues here: https://github.com/vajitsu/jujutsu.js/issues.`
    if (!dev) console.log(), console.log(jjGradient + thankYouMsg)
  } finally {
    // Ensure we wait for lockfile patching if present
    await lockfilePatchPromise.cur

    // Ensure all traces are flushed before finishing the command
    await flushAllTraces()
    teardownTraceSubscriber()
    teardownCrashReporter()
  }
}
