import { JujutsuConfigComplete } from '../client/config-shared'
import { trace, flushAllTraces, setGlobal } from '../trace'
import { AppManifest, createAppManifest } from './entries'
import { recursiveDelete } from '../lib/recursive-delete'
import { PHASE_PRODUCTION_BUILD, SWC_CONFIG } from '../lib/constants'
import compileCommands from './compiler/commands'
import { findAppDir } from '../lib/find-app-dir'
import { fileExists } from '../lib/file-exists'
import * as ciEnvironment from '../lib/ci-info'
import title from 'jujutsu/dist/compiled/title'
import { isWriteable } from './is-writeable'
import { loadEnvConfig, processEnv } from '../lib/env'
import loadConfig from '../client/config'
import isError from '../lib/is-error'
import createSpinner from './spinner'
import * as Log from './output/log'
import { promises, existsSync } from 'fs'
import path, { join as pathJoin } from 'path'
import esm from 'esm'
import ms from 'ms'

import {
  lockfilePatchPromise,
  teardownTraceSubscriber,
  teardownCrashReporter,
  loadBindings,
  transformSync,
  transform,
} from './swc'
import { isBoolean, isFunction } from 'jujutsu/dist/compiled/lodash'
import {
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  Locale,
  LocalizationMap,
  SlashCommandBuilder,
} from 'jujutsu/dist/compiled/discord.js'
import { printAndExit } from '../lib/utils'
import compileEvents from './compiler/events'
import { mkdirp } from 'fs-extra'
import uuid from 'jujutsu/dist/compiled/uid-promise'
import { recursiveReadDir } from '../lib/recursive-readdir'

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
  options?: Array<{
    type:
      | NumberConstructor
      | BooleanConstructor
      | StringConstructor
      | 'Integer'
      | 'User'
      | 'Channel'
      | 'Role'
      | 'Mentionable'
      | 'Attachment'
    name: string
    description?: string
    localizations?: {
      name?: LocalizationMap
      description?: LocalizationMap
    }
    required?: boolean
  }>
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
  name: string
}

export default async function build(dir: string, conf = null): Promise<void> {
  try {
    const jujutsuBuildSpan = trace('jujutsu-build', undefined, {
      version: process.env.__JUJUTSU_VERSION as string,
    })

    const buildResult = await jujutsuBuildSpan.traceAsyncFn(async () => {
      // attempt to load global env values so they are available in jujutsu.config.js
      const { loadedEnvFiles } = jujutsuBuildSpan
        .traceChild('load-dotenv')
        .traceFn(() => loadEnvConfig(dir, false, Log))

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

      if (config.cleanDistDir) {
        await recursiveDelete(distDir, /^cache/)
      }

      // Ensure commonjs handling is used for files in the distDir (generally .next)
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

      let appManifest: AppManifestComplete | undefined

      if (appDir) {
        const appManifestUncomplete = await jujutsuBuildSpan
          .traceChild('generate-app-manifest')
          .traceAsyncFn(() =>
            createAppManifest({
              appDir,
              commandExtensions: config.commandExtensions,
              eventExtensions: config.eventExtensions,
            })
          )

        const appManifestCommands = appManifestUncomplete.commands.map(
          (command) => ({
            ...command,
            absolutePath: path.join(process.cwd(), command.path),
          })
        ) as AppManifestComplete['commands']
        const appManifestEvents = appManifestUncomplete.events.map((event) => ({
          ...event,
          absolutePath: path.join(process.cwd(), event.path),
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

        function interopDefaultForCommand(mod: any): CommandFile {
          if (mod.default) return mod as CommandFile
          else {
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
              (_['localizations'] = mod.localizations),
                delete mod['localizations']

            if (mod.defaultMemberPermissions)
              (_['defaultMemberPermissions'] = mod.defaultMemberPermissions),
                delete mod['defaultMemberPermissions']

            if (mod.dmPermission)
              (_['dmPermission'] = mod.dmPermission), delete mod['dmPermission']

            if (mod.options) (_['options'] = mod.options), delete mod['options']

            new SlashCommandBuilder().options

            return _ as CommandFile
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

        function interopDefaultForEvent(mod: any): EventFile {
          if (mod.default) return mod as EventFile
          else
            return {
              default: mod,
            } as EventFile
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
          const now =
            existsSync(cacheDir) &&
            (await recursiveReadDir(cacheDir, /^\\fallback\.[a-z0-9]+\.js$/))
          console.log(now)

          const content = (await promises.readFile(path)).toString('utf8')

          await loadBindings()
          const { code } = await transform(content, SWC_CONFIG)

          await mkdirp(cacheDir)

          const outpath = pathJoin(cacheDir, `fallback.${await uuid(7)}.js`)
          await promises.writeFile(outpath, code, 'utf8')
          return {
            path: outpath,
            mod: require(outpath),
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
                  Module = interopDefaultForCommand(
                    esm(module, {
                      mode: 'auto',
                      cjs: true,
                    })(command.absolutePath)
                  )
                } catch (_) {
                  Fallback = await fallback(command.absolutePath)
                  Module = interopDefaultForCommand(Fallback.mod)
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
                      `Skipping "${command.absolutePath}"\n       Reason: Command file has no exported contents.`
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
                  Module = interopDefaultForEvent(
                    esm(module, {
                      mode: 'auto',
                      cjs: true,
                    })(event.absolutePath)
                  )
                } catch (_) {
                  Fallback = await fallback(event.absolutePath)
                  Module = interopDefaultForEvent(Fallback.mod)
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
                      name: event.name,
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

      const buildSpinner = await createSpinner({
        prefixText: `${Log.prefixes.info} Creating an optimized production build`,
      })

      //await (async () => {
      if (allCommands.size > 0)
        await compileCommands(allCommands, allCommandInfos, loadedEnvFiles)
      if (allEvents.size > 0)
        await compileEvents(allEvents, allEventInfos, loadedEnvFiles)
      //})()
    })

    // const distDirCreated =

    // if (!distDirCreated || !(await isWriteable(distDir))) {
    //   throw new Error(
    //     '> Build directory is not writeable. https://nextjs.org/docs/messages/build-dir-not-writeable'
    //   )
    // }

    // if (config && config.cleanDistDir) {
    //   await recursiveDelete(distDir, /^cache/)
    // }

    // const postCompileSpinner = createSpinner({
    //   prefixText: `${Log.prefixes.info} Transforming your code`,
    // })

    // const startBuild = performance.now()
    // compiler.compileBuild(dir)
    // const endBuild = performance.now()

    // if (postCompileSpinner) postCompileSpinner.stopAndPersist()

    // const end = performance.now()

    // console.log(
    //   Log.jujutsu(
    //     'Succesfully compilied project',
    //     `\n\nBuild finished in ${ms(startBuild - endBuild)}\nDone in ${ms(
    //       start - end
    //     )}`
    //   )
    // )
  } finally {
    // Ensure we wait for lockfile patching if present
    await lockfilePatchPromise.cur

    // Ensure all traces are flushed before finishing the command
    await flushAllTraces()
    teardownTraceSubscriber()
    teardownCrashReporter()
  }
}
