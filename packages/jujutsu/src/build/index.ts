/* eslint-disable import/no-extraneous-dependencies */
import {
  mkdir,
  mkdirp,
  pathExists,
  pathExistsSync,
  readFile,
  readFileSync,
  writeFile,
  rmSync,
  existsSync,
} from 'jujutsu/dist/compiled/fs-extra'
import { trace, flushAllTraces, setGlobal, Span } from '../trace'
import {
  DISCORD_EVENTS,
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from '../lib/constants'
import loadConfig from '../server/config'
import { JujutsuConfigComplete } from '../server/config-shared'
import path from 'path'
import Compiler from './compiler'
import { findDirs } from '../lib/find-dirs'
import { recursiveReadDir } from '../lib/recursive-readdir'
import isError from '../lib/is-error'
import { isWriteable } from './is-writeable'
import { recursiveDelete } from '../lib/recursive-delete'
import { compressSync, decompressSync } from 'jujutsu/dist/compiled/fflate'
import * as Log from './output/log'
import { nanoid } from 'jujutsu/dist/compiled/nanoid'
import {
  validateCommandFile,
  validateEventFile,
  validateSubcommandFile,
} from './validate'
import requireFromString from 'jujutsu/dist/compiled/require-from-string'
import { camelCase, snakeCase } from 'jujutsu/dist/compiled/lodash'
import { Events } from 'jujutsu/dist/compiled/discord.js'
import json5 from 'jujutsu/dist/compiled/json5'
import { printAndExit } from '../lib/utils'
import chalk from '../lib/chalk'
import isFileEmpty from '../lib/is-file-empty'
import { Worker as JestWorker } from 'jujutsu/dist/compiled/jest-worker'
import leven from './leven'
import createSpinner from './spinner'

interface BuildManifest {
  mode: 'production' | 'development'
  commands: {
    [name: string]: string
  }
  events: {
    [name: string]: string
  }
}

interface AppBuildManifest extends BuildManifest {
  subcommands: {
    [name: string]: string
  }
}

interface BaseChunk {
  code: string
  path: string
  app: boolean
}

interface EventChunk extends BaseChunk {
  type: 'event'
  app: false
}

interface CommandChunk extends BaseChunk {
  type: 'command'
  app: false
}

interface SubCommandChunk extends BaseChunk {
  app: true
  type: 'subcommand'
}

interface AppEventChunk extends BaseChunk {
  type: 'event'
  app: true
}

interface AppCommandChunk extends BaseChunk {
  type: 'command'
  app: true
}

type AllFiles = (
  | Omit<AppEventChunk, 'code'>
  | Omit<AppCommandChunk, 'code'>
  | Omit<CommandChunk, 'code'>
  | Omit<EventChunk, 'code'>
  | Omit<SubCommandChunk, 'code'>
)[]

type AllChunks = (
  | AppEventChunk
  | AppCommandChunk
  | CommandChunk
  | EventChunk
  | SubCommandChunk
)[]

/**
 * typescript will be loaded in "next/lib/verifyTypeScriptSetup" and
 * then passed to "next/lib/typescript/runTypeCheck" as a parameter.
 *
 * Since it is impossible to pass a function from main thread to a worker,
 * instead of running "next/lib/typescript/runTypeCheck" in a worker,
 * we will run entire "next/lib/verifyTypeScriptSetup" in a worker instead.
 */
function verifyTypeScriptSetup(
  dir: string,
  distDir: string,
  intentDirs: string[],
  typeCheckPreflight: boolean,
  tsconfigPath: string,
  cacheDir: string | undefined,
  numWorkers: number | undefined,
  enableWorkerThreads: boolean | undefined,
  isAppDirEnabled: boolean
) {
  const typeCheckWorker = new JestWorker(
    require.resolve('../lib/verify-typescript-setup'),
    {
      numWorkers,
      enableWorkerThreads,
      maxRetries: 0,
    }
  ) as JestWorker & {
    verifyTypeScriptSetup: typeof import('../lib/verify-typescript-setup').verifyTypeScriptSetup
  }

  typeCheckWorker.getStdout().pipe(process.stdout)
  typeCheckWorker.getStderr().pipe(process.stderr)

  return typeCheckWorker
    .verifyTypeScriptSetup({
      dir,
      distDir,
      intentDirs,
      typeCheckPreflight,
      tsconfigPath,
      cacheDir,
      isAppDirEnabled,
    })
    .then((result) => {
      typeCheckWorker.end()
      return result
    })
}

function benchmark(start: [number, number], dev = false) {
  // Benchmarking
  const end = process.hrtime(start)
  const seconds = end[0] + end[1] / 1000000000
  const template = `in ${seconds.toFixed(4)}s`

  console.log()

  if (dev) Log.event(`updated in ${template}`)
  else Log.info(`done in ${template}`)
}

function findSimilar(word: string, candidates: string[], options = {}) {
  let { maxScore = 3 } = options as any
  const { criteria = 0.5, prefix = '' } = options as any
  const matches = []
  for (const candidate of candidates) {
    const length = Math.max(word.length, candidate.length)
    const score = leven(word, candidate)
    const similarity = (length - score) / length
    if (similarity >= criteria && score <= maxScore) {
      if (score < maxScore) {
        maxScore = score
        matches.length = 0
      }
      matches.push(prefix + candidate)
    }
  }
  return matches
}

function getDepth(dir: string, filepath: string) {
  const removed_dir = path.dirname(filepath).replace(dir, '')
  const split = removed_dir.split(path.sep).filter((d) => d.length > 0)
  return split.length
}

function validate(dir: string, chunks: AllChunks) {
  let error = false
  const subcommandChunks = chunks
    .filter((chunk) => chunk.type === 'subcommand')
    .map((chunk) => ({
      ...chunk,
      parent: chunk.path
        .replace(path.join(dir, 'app') + path.sep, '')
        .replace(path.sep + path.basename(chunk.path), '')
        .split(path.sep)
        .at(0),
    }))
  const commandChunks = chunks.filter((chunk) => chunk.type === 'command')
  const eventChunks = chunks.filter((chunk) => chunk.type === 'event')

  // Commands
  for (let chunk of commandChunks) {
    const inApp = chunk.app
    const mod = requireFromString(chunk.code)
    const fileName = path.basename(chunk.path)
    const name = inApp
      ? camelCase(
          chunk.path
            .replace(path.join(dir, 'app'), '')
            .replace(path.basename(chunk.path), '')
            .replace(path.extname(chunk.path), '')
            .split(path.sep)
            .join('_')
        )
      : fileName.replace(path.extname(chunk.path), '')

    const info = {
      name: name,
      description: mod.description,
      dmPermission: mod.dmPermission,
      defaultMemberPermission: mod.defaultMemberPermission,
      nsfw: mod.nsfw,
      options: mod.options,
      fn: mod.default,
      middleware: mod.middleware,
    }
    const result = validateCommandFile(info)

    if (!result.pass) {
      error = true
      const pre_messages = {
        'default export (function)': [] as unknown as string[],
        'name (file name/parent directory)': [] as unknown as string[],
        '`nsfw` export': [] as unknown as string[],
        '`description` export': [] as unknown as string[],
        '`dmPermission` export': [] as unknown as string[],
        '`options` export': [] as unknown as string[],
        '`defaultMemberPermission` export': [] as unknown as string[],
        '`middleware` export (function)': [] as unknown as string[],
      }
      for (let err of result.errors) {
        pre_messages[err.origin].push(err.message)
      }

      const messages = Object.entries(pre_messages).map((msg) => [
        msg[0],
        msg[1].map((m) => ` - ${m}`).join('\n'),
      ])

      const message = messages
        .filter((data) => data[1].length > 0)
        .map((data) => `${chalk.bold(data[0])}:\n${data[1]}`)
        .join('\n')

      if (chunks.indexOf(chunk) > 0) console.log()

      Log.error(`The \`${name}\` slash command has a few errors:\n${message}`)
    }
  }

  // Events
  for (let chunk of eventChunks) {
    const inApp = chunk.app
    const mod = requireFromString(chunk.code)
    const allDirs = path.dirname(chunk.path).replace(dir + path.sep, '')
    const snake_case = allDirs.replace(path.sep, '_')
    const name = inApp
      ? camelCase(snake_case)
      : path.basename(chunk.path).replace(path.extname(chunk.path), '')

    const info = {
      name,
      fn: mod.default,
    }
    const result = validateEventFile(info)

    if (!result.pass) {
      error = true
      const pre_messages = {
        'default export (function)': [] as unknown as string[],
        'name (file name/parent directory)': [] as unknown as string[],
      }
      for (let err of result.errors) {
        pre_messages[err.origin].push(err.message)
      }

      const events = Object.entries(Events).map((ev) => ev[1])

      const messages = Object.entries(pre_messages).map((msg) => [
        msg[0],
        msg[1]
          .map((m) => {
            const similars = findSimilar(name, events)
            const similar = similars.length > 0 ? similars[0] : null
            return `  - ${
              m.startsWith('Invalid enum value.')
                ? `Invalid value, did you mean \`${similar}\`?`
                : m
            }`
          })
          .join('\n'),
      ])

      const message = messages
        .filter((data) => data[1].length > 0)
        .map((data) => `${chalk.bold(data[0])}:\n${data[1]}`)
        .join('\n')

      if (chunks.indexOf(chunk) > 0) console.log()

      Log.error(`The \`${name}\` event has a few errors:\n${message}`)
    }
  }

  // Subcommands
  for (let chunk of subcommandChunks) {
    const mod = requireFromString(chunk.code)
    const name = camelCase(
      chunk.path
        .replace(path.join(dir, 'app'), '')
        .replace(path.basename(chunk.path), '')
        .replace(path.extname(chunk.path), '')
        .split(path.sep)
        .join('_')
    )

    const info = {
      name: name,
      description: mod.description,
      dmPermission: mod.dmPermission,
      nsfw: mod.nsfw,
      fn: mod.default,
    }
    const result = validateSubcommandFile(info)

    if (!result.pass) {
      error = true
      const pre_messages = {
        'default export (function)': [] as unknown as string[],
        'name (file name/parent directory)': [] as unknown as string[],
        '`description` export': [] as unknown as string[],
      }
      for (let err of result.errors) {
        pre_messages[err.origin].push(err.message)
      }

      const messages = Object.entries(pre_messages).map((msg) => [
        msg[0],
        msg[1].map((m) => `  - ${m}`).join('\n'),
      ])

      const message = messages
        .filter((data) => data[1].length > 0)
        .map((data) => `${chalk.bold(data[0])}:\n${data[1]}`)
        .join('\n')

      if (chunks.indexOf(chunk) > 0) console.log()

      Log.error(`The \`${name}\` slash command has a few errors:\n${message}`)
    }
  }

  // Exits build process if theres any issues
  if (error) {
    console.log()
    printAndExit(
      '> Fix these errors before attempting to build your project again.'
    )
    console.log()
  }
}

function normalizeChunkPath(
  filepath: string,
  dir: string,
  type: 'command' | 'event' | 'subcommand',
  inAppDir = false
) {
  const replaceDir = inAppDir
    ? path.join(dir, 'app')
    : type === 'event'
    ? path.join(dir, 'events')
    : path.join(dir, 'commands')
  const replaceBase = inAppDir
    ? path.sep + path.basename(filepath)
    : path.extname(filepath)
  const replaced = filepath.replace(replaceDir, '').replace(replaceBase, '')
  return inAppDir ? (replaced.split(path.sep).at(-1) as string) : replaced
}

async function getFiles(
  dir: string,
  dirs: {
    appDir: string | undefined
    eventsDir: string | undefined
    commandsDir: string | undefined
  }
): Promise<{
  commands: Omit<CommandChunk, 'code'>[]
  events: Omit<EventChunk, 'code'>[]
  app: {
    commands: Omit<AppCommandChunk, 'code'>[]
    events: Omit<AppEventChunk, 'code'>[]
    subcommands: Omit<SubCommandChunk, 'code'>[]
  }
}> {
  const { eventsDir, commandsDir, appDir } = dirs

  // RegEx to catch specific files only in the `events`, `commands`, or `app` directory
  const regex_commands = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
  const regex_events = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
  const regex_app_event = new RegExp(`^event\\.(?:js|ts)$`, '')
  const regex_app_command = new RegExp(`^command\\.(?:js|ts)$`, '')

  return {
    commands: commandsDir
      ? (await recursiveReadDir(commandsDir, regex_commands)).map(
          (file) =>
            ({
              path: path.join(dir, 'commands', file),
              type: 'command',
              app: false,
            } as const)
        )
      : [],
    events: eventsDir
      ? (await recursiveReadDir(eventsDir, regex_events)).map(
          (file) =>
            ({
              path: path.join(dir, 'events', file),
              type: 'event',
              app: false,
            } as const)
        )
      : [],
    app: appDir
      ? {
          commands: (await recursiveReadDir(appDir, regex_app_command))
            .map(
              (file) =>
                ({
                  path: path.join(dir, 'app', file),
                  type: 'command',
                  app: true,
                } as const)
            )
            .filter((file) => getDepth(appDir, file.path) === 1),
          events: (await recursiveReadDir(appDir, regex_app_event)).map(
            (file) =>
              ({
                path: path.join(dir, 'app', file),
                type: 'event',
                app: true,
              } as const)
          ),
          subcommands: (await recursiveReadDir(appDir, regex_app_command))
            .map(
              (file) =>
                ({
                  path: path.join(dir, 'app', file),
                  type: 'subcommand',
                  app: true,
                } as const)
            )
            .filter((file) => getDepth(appDir, file.path) === 2),
        }
      : {
          commands: [],
          events: [],
          subcommands: [],
        },
  }
}

function generateBuildManifest({
  commands,
  events,
  dev,
  distDir,
}: {
  commands: {
    path: string
    app: boolean
    originPath: string
    origin: 'command'
  }[]
  events: {
    path: string
    app: boolean
    originPath: string
    origin: 'event'
  }[]
  dev: boolean
  distDir: string
}) {
  const build_manifest: BuildManifest = {
    mode: dev ? 'development' : 'production',
    commands: Object.fromEntries(
      commands.map((i) => [
        path.basename(i.originPath)?.replace(path.extname(i.originPath), ''),
        i.path.replace(`${distDir}${path.sep}`, '').split(path.sep).join('/'),
      ])
    ),
    events: Object.fromEntries(
      events.map((i) => [
        path.basename(i.originPath)?.replace(path.extname(i.originPath), ''),
        i.path.replace(`${distDir}${path.sep}`, '').split(path.sep).join('/'),
      ])
    ),
  }
  return build_manifest
}

function generateAppBuildManifest({
  subcommands,
  commands,
  distDir,
  events,
  dev,
  dir,
}: {
  commands: {
    path: string
    app: boolean
    originPath: string
    origin: 'command'
  }[]
  events: {
    path: string
    app: boolean
    originPath: string
    origin: 'event'
  }[]
  subcommands: {
    path: string
    app: boolean
    originPath: string
    origin: 'subcommand'
  }[]
  dev: boolean
  dir: string
  distDir: string
}) {
  const app_build_manifest: AppBuildManifest = {
    mode: dev ? 'development' : 'production',
    commands: Object.fromEntries(
      commands.map((i) => [
        camelCase(
          i.originPath
            .replace(path.join(dir, 'app') + path.sep, '')
            .replace(path.sep + path.basename(i.originPath), '')
            .split(path.sep)
            .join('_')
        ),
        i.path.replace(`${distDir}${path.sep}`, '').split(path.sep).join('/'),
      ])
    ),
    events: Object.fromEntries(
      events.map((i) => [
        camelCase(
          i.originPath
            .replace(path.join(dir, 'app') + path.sep, '')
            .replace(path.sep + path.basename(i.originPath), '')
            .split(path.sep)
            .join('_')
        ),
        i.path.replace(`${distDir}${path.sep}`, '').split(path.sep).join('/'),
      ])
    ),
    subcommands: Object.fromEntries(
      subcommands.map((i) => [
        i.originPath
          .replace(path.join(dir, 'app') + path.sep, '')
          .replace(path.sep + path.basename(i.originPath), '')
          .split(path.sep)
          .at(1),
        {
          path: i.path
            .replace(`${distDir}${path.sep}`, '')
            .split(path.sep)
            .join('/'),
          parent: i.originPath
            .replace(path.join(dir, 'app') + path.sep, '')
            .replace(path.sep + path.basename(i.originPath), '')
            .split(path.sep)
            .at(0),
        },
      ])
    ),
  }
  return app_build_manifest
}

async function startTypeChecking({
  config,
  span,
  dirs,
  dir,
  cacheDir,
  isAppDirEnabled,
}: {
  config: JujutsuConfigComplete
  span: Span
  dirs: (string | undefined)[]
  dir: string
  cacheDir: string
  isAppDirEnabled: boolean
}) {
  const ignoreTypeScriptErrors = Boolean(config.typescript.ignoreBuildErrors)
  if (ignoreTypeScriptErrors) {
    Log.info('Skipping validation of types')
  }
  let typeCheckingSpinnerPrefixText: string | undefined
  let typeCheckingSpinner: ReturnType<typeof createSpinner> | undefined

  if (!ignoreTypeScriptErrors) {
    typeCheckingSpinnerPrefixText = 'Checking validity of types'
  }

  // we will not create a spinner if both ignoreTypeScriptErrors and ignoreESLint are
  // enabled, but we will still verifying project's tsconfig and dependencies.
  if (typeCheckingSpinnerPrefixText) {
    typeCheckingSpinner = createSpinner({
      prefixText: `${Log.prefixes.info} ${typeCheckingSpinnerPrefixText}`,
    })
  }

  const typeCheckStart = process.hrtime()

  try {
    await Promise.all([
      span.traceChild('verify-typescript-setup').traceAsyncFn(() =>
        verifyTypeScriptSetup(
          dir,
          config.distDir,
          dirs.filter(Boolean) as string[],
          !ignoreTypeScriptErrors,
          config.typescript.tsconfigPath,
          cacheDir,
          1,
          false,
          isAppDirEnabled
        ).then((resolved) => {
          const checkEnd = process.hrtime(typeCheckStart)
          return [resolved, checkEnd] as const
        })
      ),
    ])
    typeCheckingSpinner?.stopAndPersist()
  } catch (err) {
    // prevent showing jest-worker internal error as it
    // isn't helpful for users and clutters output
    if (isError(err) && err.message === 'Call retries were exceeded') {
      process.exit(1)
    }
    throw err
  }
}

export async function coldStart({
  dir,
  distDir,
  config,
  parentId,
  dev,
  dirs,
}: {
  dir: string
  distDir: string
  config: JujutsuConfigComplete
  parentId: number
  dev: boolean
  dirs: {
    appDir: string | undefined
    eventsDir: string | undefined
    commandsDir: string | undefined
  }
}) {
  const coldStartSpan = trace('jujutsu-build-cold', parentId, {
    dir,
    distDir,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const coldStartResult = coldStartSpan.traceAsyncFn(async () => {
    // Benchmarking
    const start = process.hrtime()

    // Load SWC Compiler with custom functions
    const compiler = coldStartSpan
      .traceChild('load-swc-compiler')
      .traceFn(() => new Compiler())

    // Remove everything except the cache (edge case: if there is a cache folder, it would default to inc. build isntead of cold start)
    if (config.cleanDistDir) {
      await recursiveDelete(distDir)
    }

    // Create custom or default dist directory
    const distDirCreated = await coldStartSpan
      .traceChild('create-dist-dir')
      .traceAsyncFn(async () => {
        try {
          await mkdir(distDir, { recursive: true })
          return true
        } catch (err) {
          if (isError(err) && err.code === 'EPERM') {
            return false
          }
          throw err
        }
      })

    // Ensure that we can add files to this directory, and that it has successfully been created
    if (!distDirCreated || !(await isWriteable(distDir))) {
      throw new Error('> Build directory is not writeable.')
    }

    // Ensure commonjs handling is used for files in the distDir (generally .jujutsu)
    // Files outside of the distDir can be "type": "module"
    await writeFile(path.join(distDir, 'package.json'), '{"type": "commonjs"}')

    const { eventsDir, commandsDir, appDir } = dirs

    // All the files, even if they haven't been modified
    const files = await getFiles(dir, dirs)

    // Combines all files into one array
    const allFiles: AllFiles = [
      ...files.events,
      ...files.commands,
      ...files.app.subcommands,
      ...files.app.commands,
      ...files.app.events,
    ]

    // Checks if there are any files  in the `events`, `commands`, or `app` directory
    if (allFiles.length === 0)
      printAndExit(
        '\n> No files found in the `commands`, `events`, and `app` directory.',
        0
      )

    // Transpile all files into their own 'chunks'
    let chunks = await coldStartSpan
      .traceChild('generate-chunks')
      .traceAsyncFn(async () => {
        const allChunks: AllChunks = []
        for (let file of allFiles) {
          mkdirp(distDir)
          const code = await compiler.transformFile(
            file.path,
            file.path.endsWith('.ts')
          )
          allChunks.push({
            path: file.path,
            code: code as string,
            type: file.type as any,
            app: file.app,
          })
        }
        return allChunks
      })

    // Make sure each 'chunk' provides valid information (protects against error when adding slash commands or events)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateChunks = await coldStartSpan
      .traceChild('validate-chunks')
      .traceAsyncFn(async () => validate(dir, chunks))

    // Ignore cases for `command` files:
    // 1. If the `command` file is too deep into the `app` directory (3 or more directories)
    // 2. If the `command` file has a depth of 2, make sure it has another `command` file in the parent directory
    // Note: At the depth of 2, all `command` files are treated as subcommands
    // --
    // Ignore case for `event` files: Event name (all directories -> snake-case -> camel case) aren't actual client events supported by the Discord API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredAppChunks = await coldStartSpan
      .traceChild('filter-app-chunks')
      .traceAsyncFn(async () => {
        if (!appDir)
          return {
            commands: [],
            events: [],
          }

        const appCommandChunks: AppCommandChunk[] = chunks.filter(
          (chunk) =>
            (chunk.type === 'command' || chunk.type === 'subcommand') &&
            chunk.app
        ) as any
        const filterAppCommands = []

        const appEventChunks: AppEventChunk[] = chunks.filter(
          (chunk) => chunk.type === 'event' && chunk.app
        ) as any
        const filterAppEvents = []

        for (let chunk of appCommandChunks) {
          const depth = getDepth(appDir, chunk.path)
          const workingDir = path
            .dirname(chunk.path)
            .replace(appDir + path.sep, '')
            .split(path.sep)
            .join('/')

          const ending = path.extname(chunk.path)

          if (depth > 2) {
            Log.warn(
              `Command at \`app/${workingDir}/command${ending}\` is too deep, it will be ignored.`
            )
          } else if (depth === 2) {
            const parentDir = workingDir.split('/').at(0) as string
            const hasCommand =
              existsSync(path.join(dir, 'app', parentDir, 'command.js')) ||
              existsSync(path.join(dir, 'app', parentDir, 'command.ts'))
            if (!hasCommand)
              Log.warn(
                `Subcommand at \`app/${workingDir}/command${ending}\` does not have a parent command, it will be ignored.`
              )
            else filterAppCommands.push(chunk)
          } else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filterAppCommands.push(chunk)
        }

        for (let chunk of appEventChunks) {
          const allDirs = path
            .dirname(chunk.path)
            .replace(appDir + path.sep, '')
          const workingDir = allDirs.split(path.sep).join('/')
          const ending = path.extname(chunk.path)
          const snake_case = allDirs.replace(path.sep, '_')
          const camel_case = camelCase(snake_case)

          if (!DISCORD_EVENTS.includes(camel_case))
            Log.warn(
              `event at "app/${workingDir}/event${ending}" is not a valid client event, it will be ignored.`
            )
          else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filterAppEvents.push(chunk)
        }

        return {
          commands: filterAppCommands,
          events: filterAppEvents,
        }
      })

    // Filters a command or event file in `events` or `commands` directory if they are too deep into the directory
    const filteredRegularChunks = await coldStartSpan
      .traceChild('filter-regular-chunks')
      .traceAsyncFn(async () => {
        const commandChunks = commandsDir
          ? chunks.filter((chunk) => chunk.type === 'command')
          : []
        const eventChunks = eventsDir
          ? chunks.filter((chunk) => chunk.type === 'event')
          : []
        const filtered: {
          commands: CommandChunk[]
          events: EventChunk[]
        } = {
          events: [],
          commands: [],
        }

        if (eventChunks.length === 0 && commandChunks.length === 0)
          return filtered

        for (let chunk of commandChunks) {
          const depth = getDepth(commandsDir as string, chunk.path)
          if (depth > 1) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(
              `Command at ${workingFile} is too deep, it will be ignored.`
            )
          } else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filtered.commands.push(chunk as any)
        }

        for (let chunk of eventChunks) {
          const depth = getDepth(eventsDir as string, chunk.path)
          if (depth > 1) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`Event at ${workingFile} is too deep, it will be ignored.`)
          } else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filtered.commands.push(chunk as any)
        }

        return filtered
      })

    // Replace the unfiltered app chunks with the filtered ones
    chunks = [
      ...filteredAppChunks.commands,
      ...filteredAppChunks.events,
      ...filteredRegularChunks.commands,
      ...filteredRegularChunks.events,
    ]

    // Ensures that there are files that remained after validation and filtration
    if (chunks.length === 0) {
      console.log()
      printAndExit(
        `> There are no remaining files that are valid, fix the errors associated with each file before ${
          dev ? 'updating' : 'building'
        } your project again.`
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const findConflictingChunks = await coldStartSpan
      .traceChild('check-for-conflicting-chunks')
      .traceAsyncFn(async () => {
        let conflict = false
        for (let chunk of chunks) {
          const name = normalizeChunkPath(
            chunk.path,
            dir,
            chunk.type,
            chunk.app
          )
          const type = chunk.type
          const filtered = chunks
            .map((c) => ({
              ...c,
              name: normalizeChunkPath(c.path, dir, c.type, c.app),
              refinedType: c.type.includes('command') ? 'command' : 'event',
            }))
            .filter((c) => c.name === name && c.refinedType === type)

          if (filtered.length > 1) {
            conflict = true
            const message = filtered
              .map(
                (c) =>
                  `  - ${c.path
                    .replace(dir + path.sep, '')
                    .split(path.sep)
                    .join('/')}`
              )
              .join('\n')
            Log.error(
              `These files are conflicting each other for The \`${name}\` ${
                type === 'command' ? 'slash ' + type : type
              }:\n${message}`
            )
          }
        }
        if (conflict)
          printAndExit(
            `> Fix these conflicts before ${
              dev ? 'updating' : 'building'
            } your project again.`
          )
      })

    // Write these valid chunks to the dist directory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const writeChunks = await coldStartSpan
      .traceChild('write-chunks')
      .traceAsyncFn(async () => {
        const information: {
          path: string
          app: boolean
          originPath: string
          origin: 'event' | 'command' | 'subcommand'
        }[] = []
        for (let chunk of chunks) {
          let outDir = path.join(distDir, 'server')

          if (chunk.type.startsWith('app__')) outDir = path.join(outDir, 'app')

          const outFile = path.join(outDir, `chunk__${nanoid(5)}.js`)

          await mkdirp(outDir)
          await writeFile(outFile, chunk.code, 'utf8')

          information.push({
            path: outFile,
            origin: chunk.type,
            originPath: chunk.path,
            app: chunk.app,
          })
        }
        return information
      })

    // Write the build manifest to the dist directory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildManifest = await coldStartSpan
      .traceChild('create-build-manifest')
      .traceAsyncFn(async () => {
        const commands = writeChunks.filter(
          (t) => t.origin === 'command' && !t.app
        ) as any
        const events = writeChunks.filter(
          (t) => t.origin === 'event' && !t.app
        ) as any

        const build_manifest = generateBuildManifest({
          commands,
          events,
          dev,
          distDir,
        })

        await writeFile(
          path.join(distDir, 'build-manifest.json'),
          JSON.stringify(build_manifest),
          'utf8'
        )
      })

    // Write the app build manifest to the dist directory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const appBuildManifest = await coldStartSpan
      .traceChild('create-app-build-manifest')
      .traceAsyncFn(async () => {
        const commands = writeChunks.filter(
          (chunk) => chunk.origin === 'command' && chunk.app
        ) as any
        const subcommands = writeChunks.filter(
          (chunk) => chunk.origin === 'subcommand' && chunk.app
        ) as any
        const events = writeChunks.filter(
          (chunk) => chunk.origin === 'event' && chunk.app
        ) as any

        const app_build_manifest = generateAppBuildManifest({
          commands,
          subcommands,
          events,
          dev,
          dir,
          distDir,
        })

        await writeFile(
          path.join(distDir, 'app-build-manifest.json'),
          JSON.stringify(app_build_manifest),
          'utf8'
        )
      })

    // Fill the cache with valid chunks only
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fillCache = await coldStartSpan
      .traceChild('fill-cache')
      .traceAsyncFn(async () => {
        const cacheDir = path.join(distDir, 'cache')

        const information: {
          path: string
        }[] = []

        for (let file of writeChunks) {
          const fileContent = await readFile(file.originPath)
          const filePath = file.originPath.replace(dir, '')
          const outPath = path.join(cacheDir, filePath)
          const compressed = Buffer.from(
            compressSync(fileContent, { level: 9 })
          )

          await mkdirp(path.dirname(outPath))
          await writeFile(outPath, compressed, 'utf8')

          information.push({ path: outPath })
        }
      })

    benchmark(start, dev)
  })
}

export async function incrementalBuild({
  dir,
  distDir,
  parentId,
  changedFiles,
  dev,
  dirs,
}: {
  dir: string
  distDir: string
  config: JujutsuConfigComplete
  parentId: number
  changedFiles: string[]
  dev: boolean
  dirs: {
    appDir: string | undefined
    eventsDir: string | undefined
    commandsDir: string | undefined
  }
  invalidCache?: boolean
}) {
  const incrementalBuildSpan = trace('jujutsu-build-incremental', parentId, {
    dir,
    distDir,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const incrementalBuildResult = incrementalBuildSpan.traceAsyncFn(async () => {
    // Benchmarking
    const start = process.hrtime()

    // Load SWC Compiler with custom functions
    const compiler = incrementalBuildSpan
      .traceChild('load-swc-compiler')
      .traceFn(() => new Compiler())

    const { eventsDir, commandsDir, appDir } = dirs

    const filePaths = changedFiles

    // All the files, even if they haven't been modified
    const files_all = await getFiles(dir, dirs)

    // Combines all files into one array
    const allFiles: AllFiles = [
      ...files_all.events,
      ...files_all.commands,
      ...files_all.app.subcommands,
      ...files_all.app.commands,
      ...files_all.app.events,
    ]

    // Checks if there are any files  in the `events`, `commands`, or `app` directory
    if (allFiles.length === 0)
      printAndExit(
        '\n> No files found in the `commands`, `events`, and `app` directory.',
        0
      )

    // Filters out all the files to just those that have been modified
    const files = {
      commands: files_all.commands.filter((file) =>
        filePaths.includes(file.path)
      ),
      events: files_all.events.filter((file) => filePaths.includes(file.path)),
      app: {
        commands: files_all.app.commands.filter((file) =>
          filePaths.includes(file.path)
        ),
        events: files_all.app.events.filter((file) =>
          filePaths.includes(file.path)
        ),
        subcommands: files_all.app.subcommands.filter((file) =>
          filePaths.includes(file.path)
        ),
      },
    }

    // Removes files that have been deleted from the build
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deletions = await incrementalBuildSpan
      .traceChild('delete-missing-files')
      .traceAsyncFn(async () => {
        const nonExistent = filePaths.filter(
          (filepath) => !existsSync(filepath)
        )
        const commands = nonExistent.filter((filepath) =>
          filepath.startsWith(path.join(dir, 'commands'))
        )
        const events = nonExistent.filter((filepath) =>
          filepath.startsWith(path.join(dir, 'events'))
        )
        const appCommands = nonExistent.filter(
          (filepath) =>
            filepath.startsWith(path.join(dir, 'app')) &&
            path.basename(filepath).replace(path.extname(filepath), '') ===
              'command'
        )
        const appEvents = nonExistent.filter(
          (filepath) =>
            filepath.startsWith(path.join(dir, 'app')) &&
            path.basename(filepath).replace(path.extname(filepath), '') ===
              'event'
        )

        // Commands in `commands` directory
        for (let filePath of commands) {
          if (existsSync(filePath)) return

          const bm = json5.parse(
            readFileSync(path.join(distDir, 'build-manifest.json'), 'utf8')
          )
          const bmCommands = Object.entries(bm.commands) as unknown as [
            string,
            string
          ][]
          const fileCommand = bmCommands.find(
            (entry) =>
              entry[0] ===
              path.basename(filePath).replace(path.extname(filePath), '')
          )

          if (fileCommand) {
            const commandPath = path.join(
              distDir,
              (
                bmCommands.find(
                  (entry) =>
                    entry[0] ===
                    path.basename(filePath).replace(path.extname(filePath), '')
                ) as any
              ).at(1)
            )

            if (existsSync(commandPath)) rmSync(commandPath)
          }

          const cachePath = path.join(
            distDir,
            'cache',
            'commands',
            path.basename(filePath)
          )

          if (existsSync(cachePath)) rmSync(cachePath)
        }

        // Events in `events` directory
        for (let filePath of events) {
          if (existsSync(filePath)) return

          const bm = json5.parse(
            readFileSync(path.join(distDir, 'build-manifest.json'), 'utf8')
          )
          const bmEvents = Object.entries(bm.events) as unknown as [
            string,
            string
          ][]
          const fileEvent = bmEvents.find(
            (entry) =>
              entry[0] ===
              path.basename(filePath).replace(path.extname(filePath), '')
          )

          if (fileEvent) {
            const eventPath = path.join(
              distDir,
              (
                bmEvents.find(
                  (entry) =>
                    entry[0] ===
                    path.basename(filePath).replace(path.extname(filePath), '')
                ) as any
              ).at(1)
            )

            if (existsSync(eventPath)) rmSync(eventPath)
          }

          const cachePath = path.join(
            distDir,
            'cache',
            'events',
            path.basename(filePath)
          )

          if (existsSync(cachePath)) rmSync(cachePath)
        }

        // Commands and subcommands in `app` directory
        for (let fp of appCommands) {
          if (existsSync(fp)) return

          const abm = json5.parse(
            readFileSync(path.join(distDir, 'app-build-manifest.json'), 'utf8')
          )
          const abmCommands = Object.entries(abm.commands) as unknown as [
            string,
            string
          ][]
          const abmSubCommands = Object.entries(abm.subcommands) as unknown as [
            string,
            string
          ][]

          const depth = getDepth(path.join(dir, 'app'), fp)

          const fileCommand =
            depth === 1
              ? abmCommands.find(
                  (entry) =>
                    entry[0] ===
                    camelCase(
                      fp
                        .replace(path.join(dir, 'app'), '')
                        .replace(path.basename(fp), '')
                        .split(path.sep)
                        .at(0)
                    )
                )
              : depth === 2
              ? abmSubCommands.find(
                  (entry) =>
                    entry[0] ===
                    camelCase(
                      fp
                        .replace(path.join(dir, 'app'), '')
                        .replace(path.basename(fp), '')
                        .split(path.sep)
                        .at(1)
                    )
                )
              : undefined

          if (fileCommand) {
            const commandPath = path.join(distDir, fileCommand.at(1) as string)

            if (existsSync(commandPath)) rmSync(commandPath)
          }

          const cachePath = path.join(
            distDir,
            'cache',
            'app',
            fp.replace(path.join(dir, 'app'), '')
          )

          if (existsSync(cachePath)) rmSync(cachePath)
        }

        // Events in `app` directory
        for (let fp of appEvents) {
          if (existsSync(fp)) return

          const abm = json5.parse(
            readFileSync(path.join(distDir, 'app-build-manifest.json'), 'utf8')
          )
          const abmEvents = Object.entries(abm.events) as unknown as [
            string,
            string
          ][]
          const fileEvent = abmEvents.find(
            (entry) =>
              entry[0] ===
              camelCase(
                fp
                  .replace(path.join(dir, 'app'), '')
                  .replace(path.basename(fp), '')
                  .split(path.sep)
                  .join('_')
              )
          )

          if (fileEvent) {
            const eventPath = path.join(distDir, fileEvent.at(1) as string)

            if (existsSync(eventPath)) rmSync(eventPath)
          }

          const cachePath = path.join(
            distDir,
            'cache',
            'app',
            fp.replace(path.join(dir, 'app'), '')
          )

          if (existsSync(cachePath)) rmSync(cachePath)
        }
      })

    // Trnaspiles changed files only
    let chunks = await incrementalBuildSpan
      .traceChild('generate-changed-chunks')
      .traceAsyncFn(async () => {
        const allChunks: AllChunks = []

        const all = [
          ...files.app.subcommands,
          ...files.app.commands,
          ...files.app.events,
          ...files.commands,
          ...files.events,
        ]

        for (let file of all) {
          mkdirp(distDir)
          const code = await compiler.transformFile(
            file.path,
            path.extname(file.path) === '.ts'
          )
          allChunks.push({
            path: file.path,
            code: code as string,
            type: file.type as any,
            app: file.app,
          })
        }
        return allChunks
      })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteOldChunks = await incrementalBuildSpan
      .traceChild('delete-old-chunks')
      .traceAsyncFn(async () => {
        // Commands in `commands` directory
        // Events in `events` directory
        const bm = json5.parse(
          readFileSync(path.join(distDir, 'build-manifest.json'), 'utf8')
        )
        const bmCommands = Object.entries(bm.commands) as unknown as [
          string,
          string
        ][]
        const bmEvents = Object.entries(bm.events) as unknown as [
          string,
          string
        ][]

        // Commands and events in `app` directory
        const abm = json5.parse(
          readFileSync(path.join(distDir, 'app-build-manifest.json'), 'utf8')
        )
        const abmCommands = Object.entries(abm.commands) as unknown as [
          string,
          string
        ][]
        const abmEvents = Object.entries(abm.events) as unknown as [
          string,
          string
        ][]

        for (let command of bmCommands) {
          const name = command[0]
          const chunkPath = path.join(distDir, command[1])
          if (
            filePaths.find(
              (fp) => fp === path.join(dir, 'commands', name) + path.extname(fp)
            ) &&
            existsSync(chunkPath)
          )
            rmSync(chunkPath, { maxRetries: 3 })
        }
        for (let event of bmEvents) {
          const name = event[0]
          const chunkPath = path.join(distDir, event[1])
          if (
            filePaths.find(
              (fp) => fp === path.join(dir, 'events', name) + path.extname(fp)
            ) &&
            existsSync(chunkPath)
          )
            rmSync(chunkPath, { maxRetries: 3 })
        }
        for (let command of abmCommands) {
          const name = snakeCase(command[0]).replace('_', path.sep)
          const chunkPath = path.join(distDir, command[1])
          if (
            filePaths.find(
              (fp) =>
                fp === path.join(dir, 'app', name, 'command') + path.extname(fp)
            ) &&
            existsSync(chunkPath)
          )
            rmSync(chunkPath, { maxRetries: 3 })
        }
        for (let event of abmEvents) {
          const name = snakeCase(event[0]).replace('_', path.sep)
          const chunkPath = path.join(distDir, event[1])
          if (
            filePaths.find(
              (fp) =>
                fp === path.join(dir, 'app', name, 'event') + path.extname(fp)
            ) &&
            existsSync(chunkPath)
          )
            rmSync(chunkPath, { maxRetries: 3 })
        }
      })

    // Validates the changed chunks
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateChunks = await incrementalBuildSpan
      .traceChild('validate-chunks')
      .traceAsyncFn(async () => validate(dir, chunks))

    // Ignore cases for `command` files:
    // 1. If the `command` file is too deep into the `app` directory (3 or more directories)
    // 2. If the `command` file has a depth of 2, make sure it has another `command` file in the parent directory
    // Note: At the depth of 2, all `command` files are treated as subcommands
    // --
    // Ignore case for `event` files: Event name (all directories -> snake-case -> camel case) aren't actual client events supported by the Discord API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredAppChunks = await incrementalBuildSpan
      .traceChild('filter-app-chunks')
      .traceAsyncFn(async () => {
        if (!appDir)
          return {
            commands: [],
            events: [],
          }

        const appCommandChunks: AppCommandChunk[] = chunks.filter(
          (chunk) =>
            (chunk.type === 'command' || chunk.type === 'subcommand') &&
            chunk.app
        ) as any
        const filterAppCommands = []

        const appEventChunks: AppEventChunk[] = chunks.filter(
          (chunk) => chunk.type === 'event' && chunk.app
        ) as any
        const filterAppEvents = []

        for (let chunk of appCommandChunks) {
          const depth = getDepth(appDir, chunk.path)
          const workingDir = path
            .dirname(chunk.path)
            .replace(appDir + path.sep, '')
            .split(path.sep)
            .join('/')

          const ending = path.extname(chunk.path)

          if (depth > 2) {
            Log.warn(
              `Command at "app/${workingDir}/command${ending}" is too deep, it will be ignored.`
            )
          } else if (depth === 2) {
            const parentDir = workingDir.split('/').at(0) as string
            const hasCommand =
              existsSync(path.join(dir, 'app', parentDir, 'command.js')) ||
              existsSync(path.join(dir, 'app', parentDir, 'command.ts'))
            if (!hasCommand)
              Log.warn(
                `Subcommand at "app/${workingDir}/command${ending}" does not have a parent command, it will be ignored.`
              )
            else filterAppCommands.push(chunk)
          } else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filterAppCommands.push(chunk)
        }

        for (let chunk of appEventChunks) {
          const allDirs = path
            .dirname(chunk.path)
            .replace(appDir + path.sep, '')
          const workingDir = allDirs.split(path.sep).join('/')
          const ending = path.extname(chunk.path)
          const snake_case = allDirs.replace(path.sep, '_')
          const camel_case = camelCase(snake_case)

          if (!DISCORD_EVENTS.includes(camel_case))
            Log.warn(
              `Event at "app/${workingDir}/event${ending}" is not a valid client event, it will be ignored.`
            )
          else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filterAppEvents.push(chunk)
        }

        return {
          commands: filterAppCommands,
          events: filterAppEvents,
        }
      })

    // Filters a command or event file in `events` or `commands` directory if they are too deep into the directory
    const filteredRegularChunks = await incrementalBuildSpan
      .traceChild('filter-regular-chunks')
      .traceAsyncFn(async () => {
        const commandChunks = commandsDir
          ? chunks.filter((chunk) => chunk.type === 'command')
          : []
        const eventChunks = eventsDir
          ? chunks.filter((chunk) => chunk.type === 'event')
          : []
        const filtered: {
          commands: CommandChunk[]
          events: EventChunk[]
        } = {
          events: [],
          commands: [],
        }

        if (eventChunks.length === 0 && commandChunks.length === 0)
          return filtered

        for (let chunk of commandChunks) {
          const depth = getDepth(commandsDir as string, chunk.path)
          if (depth > 1) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(
              `Command at \`${workingFile}\` is too deep, it will be ignored.`
            )
          } else if (depth === 2) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            const parentDir = path.dirname(workingFile).at(-1) as string
            const hasCommand =
              existsSync(path.join(dir, 'app', parentDir, 'command.js')) ||
              existsSync(path.join(dir, 'app', parentDir, 'command.ts'))
            if (!hasCommand)
              Log.warn(
                `Subcommand at \`${workingFile}\` does not have a parent command, it will be ignored.`
              )
            else filtered.commands.push(chunk as any)
          } else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filtered.commands.push(chunk as any)
        }

        for (let chunk of eventChunks) {
          const depth = getDepth(eventsDir as string, chunk.path)
          if (depth > 1) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`Event at ${workingFile} is too deep, it will be ignored.`)
          } else if (isFileEmpty(chunk.path, true)) {
            const workingFile = chunk.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(`\`${workingFile}\` has no contents, it will be ignored.`)
          } else filtered.commands.push(chunk as any)
        }

        return filtered
      })

    // Replace the unfiltered app chunks with the filtered ones
    chunks = [
      ...filteredAppChunks.commands,
      ...filteredAppChunks.events,
      ...filteredRegularChunks.commands,
    ]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const findConflictingChunks = await incrementalBuildSpan
      .traceChild('check-for-conflicting-chunks')
      .traceAsyncFn(async () => {
        let conflict = false
        for (let chunk of chunks) {
          const name = normalizeChunkPath(
            chunk.path,
            dir,
            chunk.type.includes('command') ? 'command' : 'event',
            chunk.type.includes('app')
          )
          const type = chunk.type.includes('command') ? 'command' : 'event'
          const filtered = chunks
            .map((c) => ({
              ...c,
              name: normalizeChunkPath(
                c.path,
                dir,
                c.type.includes('command') ? 'command' : 'event',
                c.type.includes('app')
              ),
              refinedType: c.type.includes('command') ? 'command' : 'event',
            }))
            .filter((c) => c.name === name && c.refinedType === type)

          if (filtered.length > 1) {
            conflict = true
            const message = filtered
              .map(
                (c) =>
                  `  - ${c.path
                    .replace(dir + path.sep, '')
                    .split(path.sep)
                    .join('/')}`
              )
              .join('\n')
            Log.error(
              `These files are conflicting each other for The \`${name}\` ${
                type === 'command' ? 'slash ' + type : type
              }:\n${message}`
            )
          }
        }
        if (conflict)
          printAndExit(
            `> Fix these conflicts before ${
              dev ? 'updating' : 'building'
            } your project again.`
          )
      })

    // Writes changed chunks to dist directory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const writeChunks = await incrementalBuildSpan
      .traceChild('update-chunks')
      .traceAsyncFn(async () => {
        const information: {
          path: string
          app: boolean
          origin: 'event' | 'command' | 'subcommand'
          originPath: string
        }[] = []

        for (let chunk of chunks) {
          let outDir = path.join(distDir, 'server')

          if (chunk.app) outDir = path.join(outDir, 'app')

          const outFile = path.join(outDir, `chunk__${nanoid(5)}.js`)

          await mkdirp(outDir)
          await writeFile(outFile, chunk.code, 'utf8')

          information.push({
            path: outFile,
            originPath: chunk.path,
            origin: chunk.type,
            app: chunk.app,
          })
        }
        return information
      })

    // Updates build manifest if it has anything new
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildManifest = await incrementalBuildSpan
      .traceChild('update-build-manifest')
      .traceAsyncFn(async () => {
        const commands = writeChunks.filter(
          (t) => t.origin === 'command' && !t.app
        ) as any
        const events = writeChunks.filter(
          (t) => t.origin === 'event' && !t.app
        ) as any

        const p = path.join(distDir, 'build-manifest.json')

        const old: BuildManifest = (await pathExists(p))
          ? JSON.parse(readFileSync(p, 'utf8'))
          : []
        const over = generateBuildManifest({
          distDir,
          dev,
          commands,
          events,
        })
        const build_manifest: BuildManifest = {
          ...old,
          ...over,
        }

        const no_changes =
          old.commands === build_manifest.commands &&
          old.events === build_manifest.events &&
          old.mode === build_manifest.mode

        if (!no_changes)
          await writeFile(
            path.join(distDir, 'build-manifest.json'),
            JSON.stringify(build_manifest),
            'utf8'
          )
      })

    // Updates app build manifest if it has anything new
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const appBuildManifest = await incrementalBuildSpan
      .traceChild('create-app-build-manifest')
      .traceAsyncFn(async () => {
        const commands = writeChunks.filter(
          (chunk) => chunk.origin === 'command' && chunk.app
        ) as any
        const subcommands = writeChunks.filter(
          (chunk) => chunk.origin === 'subcommand' && chunk.app
        ) as any
        const events = writeChunks.filter(
          (chunk) => chunk.origin === 'event' && chunk.app
        ) as any

        const p = path.join(distDir, 'app-build-manifest.json')

        const old: AppBuildManifest = (await pathExists(p))
          ? JSON.parse(readFileSync(p, 'utf8'))
          : {}

        const over = generateAppBuildManifest({
          commands,
          subcommands,
          events,
          distDir,
          dev,
          dir,
        })

        const app_build_manifest: AppBuildManifest = {
          ...old,
          ...over,
        }

        const no_changes =
          old.commands === app_build_manifest.commands &&
          old.events === app_build_manifest.events &&
          old.mode === app_build_manifest.mode

        if (!no_changes)
          await writeFile(
            path.join(distDir, 'app-build-manifest.json'),
            JSON.stringify(app_build_manifest),
            'utf8'
          )
      })

    // Updates cache with new files
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateCache = await incrementalBuildSpan
      .traceChild('update-cache')
      .traceAsyncFn(async () => {
        const cacheDir = path.join(distDir, 'cache')

        const information: {
          path: string
        }[] = []

        for (let file of writeChunks) {
          const fileContent = await readFile(file.originPath)
          const filePath = file.originPath.replace(dir, '')
          const outPath = path.join(cacheDir, filePath)
          const compressed = Buffer.from(
            compressSync(fileContent, { level: 9 })
          )

          await mkdirp(path.dirname(outPath))
          await writeFile(outPath, compressed, 'utf8')

          information.push({ path: outPath })
        }
      })

    benchmark(start, dev)
  })
}

export async function attemptCacheHit({
  dir,
  distDir,
  config,
  parentId,
  dev,
  dirs,
}: {
  dir: string
  distDir: string
  config: JujutsuConfigComplete
  parentId: number
  dev: boolean
  dirs: {
    appDir: string | undefined
    eventsDir: string | undefined
    commandsDir: string | undefined
  }
}) {
  const attemptCacheHitSpan = trace('jujutsu-attempt-cache-hit', parentId, {
    dir,
    distDir,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const attemptCacheHitResult = attemptCacheHitSpan.traceAsyncFn(async () => {
    // Load SWC Compiler with custom functions
    const compiler = attemptCacheHitSpan
      .traceChild('load-swc-compiler')
      .traceFn(() => new Compiler())

    // Get neccessary directories for function
    const cacheDir = path.join(distDir, 'cache')
    const { eventsDir, commandsDir, appDir } = dirs

    // RegEx to catch specific files only in the `events`, `commands`, or `app` directory
    const regex_commands = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_events = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_app_event = new RegExp(`^event\\.(?:js|ts)$`, '')
    const regex_app_command = new RegExp(`^command\\.(?:js|ts)$`, '')
    const regex_cache = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')

    // All files in the `events`, `commands`, or `app` directory
    const files = {
      commands: commandsDir
        ? (await recursiveReadDir(commandsDir, regex_commands)).map((file) => ({
            path: path.join(dir, 'commands', file),
            type: 'command',
          }))
        : [],
      events: eventsDir
        ? (await recursiveReadDir(eventsDir, regex_events)).map((file) => ({
            path: path.join(dir, 'events', file),
            type: 'event',
          }))
        : [],
      app: appDir
        ? {
            commands: (await recursiveReadDir(appDir, regex_app_command)).map(
              (file) => ({
                path: path.join(dir, 'app', file),
                type: 'app__command',
              })
            ),
            events: (await recursiveReadDir(appDir, regex_app_event)).map(
              (file) => ({
                path: path.join(dir, 'app', file),
                type: 'app__event',
              })
            ),
          }
        : {
            commands: [],
            events: [],
          },
    }

    // Checks if any files exist in the `events`, `commands`, or `app` directory
    if (
      [
        ...files.events,
        ...files.commands,
        ...files.app.commands,
        ...files.app.events,
      ].length === 0
    )
      printAndExit(
        '\n> No files found in the `commands`, `events`, and `app` directory.',
        0
      )

    // Reads alls the files
    const allFiles = await attemptCacheHitSpan
      .traceChild('read-files')
      .traceAsyncFn(async () => {
        const all = [
          ...files.commands,
          ...files.events,
          ...files.app.events,
          ...files.app.commands,
        ]

        return all.map((file) => ({
          content: readFileSync(file.path),
          path: file.path,
          origin: file.type,
        }))
      })

    const validFilesOnly = await attemptCacheHitSpan
      .traceChild('validate-files')
      .traceAsyncFn(async () => {
        const valid: {
          content: Buffer
          path: string
          origin: string
        }[] = []

        for (let file of allFiles) {
          const mod = requireFromString(
            await compiler.transform(
              file.content.toString('utf8'),
              file.path.endsWith('.ts')
            )
          )

          if (file.origin.includes('command')) {
            const inApp = file.origin.includes('app')
            const fileName = path.basename(file.path)
            const name = inApp
              ? camelCase(
                  file.path
                    .replace(path.join(dir, 'app'), '')
                    .replace(path.basename(file.path), '')
                    .replace(path.extname(file.path), '')
                    .split(path.sep)
                    .join('_')
                )
              : fileName.replace(path.extname(file.path), '')

            const info = {
              name: name,
              description: mod.description,
              dmPermission: mod.dmPermission,
              defaultMemberPermission: mod.defaultMemberPermission,
              nsfw: mod.nsfw,
              options: mod.options,
              fn: mod.default,
              middleware: mod.middleware,
            }
            const result = validateCommandFile(info)

            if (!result.pass) {
              const pre_messages = {
                'default export (function)': [] as unknown as string[],
                'name (file name/parent directory)': [] as unknown as string[],
                '`nsfw` export': [] as unknown as string[],
                '`description` export': [] as unknown as string[],
                '`dmPermission` export': [] as unknown as string[],
                '`options` export': [] as unknown as string[],
                '`defaultMemberPermission` export': [] as unknown as string[],
                '`middleware` export (function)': [] as unknown as string[],
              }
              for (let err of result.errors) {
                pre_messages[err.origin].push(err.message)
              }

              const messages = Object.entries(pre_messages).map((msg) => [
                msg[0],
                msg[1].map((m) => `   - ${m}`).join('\n'),
              ])

              const message = messages
                .filter((data) => data[1].length > 0)
                .map((data) => `${chalk.bold(data[0])}:\n${data[1]}`)
                .join('\n')

              if (allFiles.indexOf(file) > 0) console.log()

              Log.error(
                `The \`${name}\` slash command has a few errors:\n${message}`
              )
            } else valid.push(file)
          } else if (file.origin.includes('event')) {
            const inApp = file.origin.includes('app')
            const allDirs = path.dirname(file.path).replace(dir + path.sep, '')
            const snake_case = allDirs.replace(path.sep, '_')
            const name = inApp
              ? camelCase(snake_case)
              : path.basename(file.path).replace(path.extname(file.path), '')

            const info = {
              name: name,
              fn: mod.default,
            }
            const result = validateEventFile(info)

            if (!result.pass) {
              const pre_messages = {
                'default export (function)': [] as unknown as string[],
                'name (file name/parent directory)': [] as unknown as string[],
              }
              for (let err of result.errors) {
                pre_messages[err.origin].push(err.message)
              }

              const events = Object.entries(Events).map((ev) => ev[1])

              const messages = Object.entries(pre_messages).map((msg) => [
                msg[0],
                msg[1]
                  .map((m) => {
                    const similars = findSimilar(name, events)
                    const similar = similars.length > 0 ? similars[0] : null
                    return `  - ${
                      m.startsWith('Invalid enum value.') && similar
                        ? `Invalid value, did you mean \`${similar}\`?`
                        : m
                    }`
                  })
                  .join('\n'),
              ])

              const message = messages
                .filter((data) => data[1].length > 0)
                .map((data) => `${chalk.bold(data[0])}:\n${data[1]}`)
                .join('\n')

              if (allFiles.indexOf(file) > 0) console.log()

              Log.error(`The \`${name}\` event has a few errors:\n${message}`)
            } else valid.push(file)
          }
        }

        if (valid.length !== allFiles.length) {
          Log.warn('The invalid files will be ignored.')
        } else if (valid.length === 0)
          printAndExit(
            `> No valid files out of the all modified files. Fix these errors before ${
              dev ? 'updating' : 'building'
            } your project again.`
          )

        return valid
      })

    // Ignore cases for `command` files:
    // 1. If the `command` file is too deep into the `app` directory (3 or more directories)
    // 2. If the `command` file has a depth of 2, make sure it has another `command` file in the parent directory
    // Note: At the depth of 2, all `command` files are treated as subcommands
    // --
    // Ignore case for `event` files: Event name (all directories -> snake-case -> camel case) aren't actual client events supported by the Discord API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredAppFiles = await attemptCacheHitSpan
      .traceChild('filter-app-files')
      .traceAsyncFn(async () => {
        if (!appDir)
          return {
            commands: [],
            events: [],
          }

        const appCommandFiles = validFilesOnly.filter(
          (file) => file.origin === 'app__command'
        )
        const filterAppCommands = []

        const appEventFiles = validFilesOnly.filter(
          (file) => file.origin === 'app__event'
        )
        const filterAppEvents = []

        for (let file of appCommandFiles) {
          const depth = getDepth(appDir, file.path)
          const workingDir = path
            .dirname(file.path)
            .replace(appDir + path.sep, '')
            .split(path.sep)
            .join('/')

          const ending = path.extname(file.path)

          if (depth > 2) {
            Log.warn(
              `Command at "app/${workingDir}/command${ending}" is too deep, it will be ignored.`
            )
          } else filterAppCommands.push(file)
        }

        for (let file of appEventFiles) {
          const allDirs = path.dirname(file.path).replace(appDir + path.sep, '')
          const workingDir = allDirs.split(path.sep).join('/')
          const ending = path.extname(file.path)
          const snake_case = allDirs.replace(path.sep, '_')
          const camel_case = camelCase(snake_case)

          if (!DISCORD_EVENTS.includes(camel_case))
            Log.warn(
              `Event at "app/${workingDir}/event${ending}" is not a valid client event, it will be ignored.`
            )
          else filterAppEvents.push(file)
        }

        return {
          commands: filterAppCommands,
          events: filterAppEvents,
        }
      })

    // Filters a command or event file in `events` or `commands` directory if they are too deep into the directory
    const filteredRegularFiles = await attemptCacheHitSpan
      .traceChild('filter-regular-file')
      .traceAsyncFn(async () => {
        const commandFiles = commandsDir
          ? validFilesOnly.filter((file) => file.origin === 'command')
          : []
        const eventFiles = eventsDir
          ? validFilesOnly.filter((file) => file.origin === 'event')
          : []
        const filtered: {
          commands: {
            content: Buffer
            path: string
            origin: string
          }[]
          events: {
            content: Buffer
            path: string
            origin: string
          }[]
        } = {
          events: [],
          commands: [],
        }

        if (commandFiles.length === 0 && eventFiles.length === 0)
          return filtered

        for (let file of commandFiles) {
          const depth = getDepth(commandsDir as string, file.path)
          if (depth > 1) {
            const workingFile = file.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(
              `Command at \`${workingFile}\` is too deep, it will be ignored.`
            )
          } else filtered.commands.push(file)
        }

        for (let file of eventFiles) {
          const depth = getDepth(eventsDir as string, file.path)
          if (depth > 1) {
            const workingFile = file.path
              .replace(dir + path.sep, '')
              .split(path.sep)
              .join('/')
            Log.warn(
              `Event at \`${workingFile}\` is too deep, it will be ignored.`
            )
          } else filtered.commands.push(file)
        }

        return filtered
      })

    // Replace the unfiltered files with the filtered ones
    const validFiles = [
      ...filteredAppFiles.commands,
      ...filteredAppFiles.events,
      ...filteredRegularFiles.commands,
      ...filteredRegularFiles.events,
    ]

    // If it has a existing cache, compare it to the decompressed cache
    // If no cache if found, mark the file as invalid
    const existingCaches = await attemptCacheHitSpan
      .traceChild('compare-current-to-cache')
      .traceAsyncFn(async () => {
        const cacheFiles = (await pathExists(cacheDir))
          ? await recursiveReadDir(path.join(distDir, 'cache'), regex_cache)
          : []

        const hits: string[] = []
        const miss: string[] = []

        if (cacheFiles.length < 1)
          return {
            hits,
            invalid: validFiles.map((file) => file.path),
          }

        for (let file of cacheFiles) {
          const relativeFilePath = path.join(dir, file)

          const found = validFiles.find((f) => f.path === relativeFilePath)

          if (found) {
            const fileContent = readFileSync(path.join(cacheDir, file))
            const de = Buffer.from(decompressSync(fileContent))

            const hit = de.equals(found.content)
            if (hit) hits.push(found.path)
            else miss.push(found.path)
          } else miss.push(relativeFilePath)
        }

        return {
          hits,
          invalid: miss,
        }
      })

    // Add files that are found but are not in the hit or invalid groups (possible edge case)
    const missingCaches = await attemptCacheHitSpan
      .traceChild('find-missing-caches')
      .traceAsyncFn(async () =>
        validFiles
          .filter(
            (file) =>
              !existingCaches.hits.includes(file.path) &&
              !existingCaches.invalid.includes(file.path)
          )
          .map((file) => file.path)
      )

    // Push the (possible) missing caches to the invalid caches
    existingCaches.invalid.push(...missingCaches)

    // Run an inc. build, or do nothing and exit the process.
    if (existingCaches.invalid.length > 0) {
      Log.info(
        `${existingCaches.invalid.length} invalid cache(s), rebuilding modified files`
      )

      await incrementalBuild({
        dir,
        distDir,
        config,
        parentId: attemptCacheHitSpan.id,
        changedFiles: existingCaches.invalid,
        dev,
        dirs,
        invalidCache: true,
      })
    } else if (existingCaches.invalid.length < 1) {
      console.log()
      Log.info('no invalid caches, nothing to update')
    }
  })
}

export default async function build(
  dir: string,
  force = false,
  dev = false,
  changedFiles: string[] = []
) {
  try {
    const jujutsuBuildSpan = trace('jujutsu-build', undefined, {
      version: process.env.__JUJUTSU_VERSION as string,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildResult = jujutsuBuildSpan.traceAsyncFn(async () => {
      // Set phase based on the development or production (dev and prod both use this function)
      const phase = dev ? PHASE_DEVELOPMENT_SERVER : PHASE_PRODUCTION_BUILD

      // Fetch configuration
      const config: JujutsuConfigComplete = await jujutsuBuildSpan
        .traceChild('load-jujutsu-config')
        .traceAsyncFn(() => loadConfig(phase, dir))

      // Get dist directory for later use
      const distDir = path.join(dir, config.distDir)

      // Set trace globals
      setGlobal('phase', phase)
      setGlobal('distDir', distDir)

      // Check if the `cache` directory or `server` directory exists under the dist directory
      const cacheDirExists = pathExistsSync(path.join(distDir, 'cache'))
      const serverDistExists = pathExistsSync(path.join(distDir, 'server'))

      // Is the app dir enabled?
      const isAppDirEnabled = !!config.experimental.appDir
      // Find directories that will be used in children processes
      const dirs = findDirs(dir, isAppDirEnabled)

      startTypeChecking({
        config,
        span: jujutsuBuildSpan,
        cacheDir: path.join(distDir, 'cache'),
        dirs: [dirs.appDir, dirs.eventsDir, dirs.commandsDir],
        dir,
        isAppDirEnabled,
      }).then(() => {
        // Developer opted-in to a 'cold start'
        if (force)
          coldStart({
            dir,
            distDir,
            config,
            parentId: jujutsuBuildSpan.id,
            dev,
            dirs,
          })
        // Called when a user changes their codebase while runnig the `jujutsu dev` command in the CLI
        else if (serverDistExists && changedFiles.length > 0)
          incrementalBuild({
            changedFiles,
            parentId: jujutsuBuildSpan.id,
            dir,
            distDir,
            config,
            dev,
            dirs,
          })
        // Called when the `server` directory does not exist, this user has not built their project yet
        else if (!serverDistExists)
          coldStart({
            dir,
            distDir,
            config,
            parentId: jujutsuBuildSpan.id,
            dev,
            dirs,
          })
        // This user is most likely running `jujutsu build` or the initial build check when running `jujutsu dev` (already built their project formerly)
        else if (changedFiles.length < 1 && cacheDirExists)
          attemptCacheHit({
            dir,
            distDir,
            parentId: jujutsuBuildSpan.id,
            config,
            dev,
            dirs,
          })
        // No cache but the server directory exists, this is a fallback as we cannot check the cache (Most likely when running `jujutsu build`)
        else if (changedFiles.length < 1) {
          Log.info('no cache to read from, rebuilding project')
          coldStart({
            dir,
            distDir,
            config,
            parentId: jujutsuBuildSpan.id,
            dev,
            dirs,
          })
        }
      })
    })
  } finally {
    flushAllTraces()
  }
}
