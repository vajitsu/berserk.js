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
import { trace, flushAllTraces, setGlobal } from '../trace'
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
import { validateCommandFile, validateEventFile } from './validate'
import requireFromString from 'jujutsu/dist/compiled/require-from-string'
import { camelCase } from 'jujutsu/dist/compiled/lodash'
import json5 from 'jujutsu/dist/compiled/json5'
import { printAndExit } from '../lib/utils'
import chalk from '../lib/chalk'

interface BuildManifest {
  mode: 'production' | 'development'
  commands: {
    [name: string]: string
  }
  events: {
    [name: string]: string
  }
}

function getDepth(dir: string, filepath: string) {
  const removed_dir = path.dirname(filepath).replace(dir + path.sep, '')
  const split = removed_dir.split(path.sep)
  return split.length
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
      await recursiveDelete(distDir, /^cache/)
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

    // RegEx to catch specific files only in the `events`, `commands`, or `app` directory
    const regex_commands = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_events = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_app_event = new RegExp(`^event\\.(?:js|ts)$`, '')
    const regex_app_command = new RegExp(`^command\\.(?:js|ts)$`, '')

    // All the files, even if they haven't been modified
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

    // Checks if there are any files  in the `events`, `commands`, or `app` directory
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

    // Bundles up all the files into one array
    const allFiles = [
      ...files.app.events,
      ...files.app.commands,
      ...files.commands,
      ...files.events,
    ]

    // Transpile all files into their own 'chunks'
    let chunks = await coldStartSpan
      .traceChild('generate-chunks')
      .traceAsyncFn(async () => {
        const allChunks: {
          code: string
          path: string
          type: 'event' | 'command' | 'app__command' | 'app__event'
        }[] = []
        for (let file of allFiles) {
          mkdirp(distDir)
          const code = await compiler.transformFile(
            file.path,
            path.extname(file.path) === '.ts'
          )
          allChunks.push({
            path: file.path,
            code: code as string,
            type: file.type as any,
          })
        }
        return allChunks
      })

    // Make sure each 'chunk' provides valid information (protects against error when adding slash commands or events)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateChunks = await coldStartSpan
      .traceChild('validate-chunks')
      .traceAsyncFn(async () => {
        let error = false
        const commandChunks = chunks.filter((chunk) =>
          chunk.type.includes('command')
        )
        const eventChunks = chunks.filter((chunk) =>
          chunk.type.includes('event')
        )

        for (let chunk of commandChunks) {
          const mod = requireFromString(chunk.code)
          const fileName = path.basename(chunk.path)
          const name = fileName.replace(path.extname(chunk.path), '')

          const info = {
            name: name,
            description: mod.description,
            dmPermission: mod.dmPermission,
            nsfw: mod.nsfw,
            fn: mod.default,
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

            Log.error(
              `The \`${name}\` slash command has a few errors:\n${message}`
            )
          }
        }

        for (let chunk of eventChunks) {
          const mod = requireFromString(chunk.code)

          const allDirs = path.dirname(chunk.path).replace(dir + path.sep, '')
          const snake_case = allDirs.replace(path.sep, '_')
          const name = camelCase(snake_case)

          const info = {
            name: name,
            description: mod.description,
            dmPermission: mod.dmPermission,
            nsfw: mod.nsfw,
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

            const messages = Object.entries(pre_messages).map((msg) => [
              msg[0],
              msg[1].map((m) => `  - ${m}`).join('\n'),
            ])

            const message = messages
              .filter((data) => data[1].length > 0)
              .map((data) => `${chalk.bold(data[0])}:\n${data[1]}`)
              .join('\n')

            if (chunks.indexOf(chunk) > 0) console.log()

            Log.error(`The \`${name}\` event has a few errors:\n${message}`)
          }
        }

        if (error) {
          console.log()
          printAndExit(
            'Fix these errors before attempting to build your project again.',
            0
          )
          console.log()
        }
      })

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

        const appCommandChunks = chunks.filter(
          (chunk) => chunk.type === 'app__command'
        )
        const filterAppCommands = []

        const appEventChunks = chunks.filter(
          (chunk) => chunk.type === 'app__event'
        )
        const filterAppEvents = []

        for (let chunk of appCommandChunks) {
          const depth = getDepth(appDir, chunk.path)
          const workingDir = path
            .dirname(chunk.path)
            .replace(dir + path.sep, '')
            .split(path.sep)
            .join('/')

          const ending = path.extname(chunk.path)

          if (depth > 2)
            Log.warn(
              `Subcommand at "${workingDir}/command${ending}" is too deep, it will be ignored.`
            )
          else filterAppCommands.push(chunk)
        }

        for (let chunk of appEventChunks) {
          const allDirs = path.dirname(chunk.path).replace(dir + path.sep, '')
          const workingDir = allDirs.split(path.sep).join('/')
          const ending = path.extname(chunk.path)
          const snake_case = allDirs.replace(path.sep, '_')
          const camel_case = camelCase(snake_case)

          if (!DISCORD_EVENTS.includes(camel_case))
            Log.warn(
              `Event at "${workingDir}/event${ending}" is not a valid client event, it will be ignored.`
            )
          else filterAppEvents.push(chunk)
        }

        return {
          commands: filterAppCommands,
          events: filterAppEvents,
        }
      })

    // Replace the unfiltered app chunks with the filtered ones
    chunks = [
      ...filteredAppChunks.commands,
      ...filteredAppChunks.events,
      ...chunks.filter(
        (chunk) => chunk.type !== 'app__command' && chunk.type !== 'app__event'
      ),
    ]

    // Write these valid chunks to the dist directory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const writeChunks = await coldStartSpan
      .traceChild('write-chunks')
      .traceAsyncFn(async () => {
        const information: {
          path: string
          origin: 'event' | 'command' | 'app__command' | 'app__event'
          originPath: string
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
          })
        }
        return information
      })

    // Write the build manifest to the dist directory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildManifest = await coldStartSpan
      .traceChild('create-build-manifest')
      .traceAsyncFn(async () => {
        const commands = writeChunks.filter((t) => t.origin === 'command')
        const events = writeChunks.filter((t) => t.origin === 'event')

        const build_manifest: BuildManifest = {
          mode: dev ? 'development' : 'production',
          commands: Object.fromEntries(
            commands.map((i) => [
              path
                .basename(i.originPath)
                ?.replace(path.extname(i.originPath), ''),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              path.basename(i.path)?.replace(path.extname(i.path), ''),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
        }

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
        const commands = writeChunks.filter((t) => t.origin === 'app__command')
        const events = writeChunks.filter((t) => t.origin === 'app__event')

        const app_build_manifest: BuildManifest = {
          mode: dev ? 'development' : 'production',
          commands: Object.fromEntries(
            commands.map((i) => [
              camelCase(
                i.originPath
                  .replace(path.join(dir, 'app'), '')
                  .replace(path.basename(i.originPath), '')
                  .split(path.sep)
                  .join('_')
              ),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              camelCase(
                i.originPath
                  .replace(path.join(dir, 'app'), '')
                  .replace(path.basename(i.originPath), '')
                  .split(path.sep)
                  .join('_')
              ),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
        }

        await writeFile(
          path.join(distDir, 'app-build-manifest.json'),
          JSON.stringify(app_build_manifest),
          'utf8'
        )
      })

    // Fill the cache with all valid chunks
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fillCache = await coldStartSpan
      .traceChild('fill-cache')
      .traceAsyncFn(async () => {
        const cacheDir = path.join(distDir, 'cache')

        const information: {
          path: string
        }[] = []

        for (let file of allFiles) {
          const fileContent = await readFile(file.path)
          const filePath = file.path.replace(dir, '')
          const outPath = path.join(cacheDir, filePath)
          const compressed = Buffer.from(
            compressSync(fileContent, { level: 9 })
          )

          await mkdirp(path.dirname(outPath))
          await writeFile(outPath, compressed, 'utf8')

          information.push({ path: outPath })
        }
      })

    // Benchmarking
    const end = process.hrtime(start)
    const seconds = end[0] + end[1] / 1000000000
    const template = `in ${seconds.toFixed(4)}s`

    console.log()

    if (dev) Log.event(`updated in ${template}`)
    else Log.info(`done in ${template}`)
  })
}

export async function incrementalBuild({
  dir,
  distDir,
  parentId,
  changedFiles,
  dev,
  dirs,
  invalidCache = false,
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

    // RegEx to catch specific files only in the `events`, `commands`, or `app` directory
    const regex_commands = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_events = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_app_event = new RegExp(`^event\\.(?:js|ts)$`, '')
    const regex_app_command = new RegExp(`^command\\.(?:js|ts)$`, '')

    const filePaths = changedFiles

    // All the files, even if they haven't been modified
    const files_all = {
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

    // Checks if there are any files  in the `events`, `commands`, or `app` directory
    if (
      [
        ...files_all.events,
        ...files_all.commands,
        ...files_all.app.commands,
        ...files_all.app.events,
      ].length === 0
    )
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
      },
    }

    // Removes files that have been deleted from the build
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deletions = await incrementalBuildSpan
      .traceChild('delete-missing-files-from-build')
      .traceAsyncFn(async () => {
        const nonExistent = filePaths.filter(
          (filepath) => !existsSync(filepath)
        )
        const commands = nonExistent.filter((filepath) =>
          filepath.startsWith(path.join(dir, 'commands'))
        )
        const appCommands = nonExistent.filter(
          (filepath) =>
            filepath.startsWith(path.join(dir, 'app')) &&
            path.basename(filepath).replace(path.extname(filepath), '') ===
              'command'
        )

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
                (
                  Object.entries(bm.commands) as unknown as [string, string][]
                ).find(
                  (entry) =>
                    entry[0] ===
                    path.basename(filePath).replace(path.extname(filePath), '')
                ) as any
              ).at(1)
            )

            rmSync(commandPath)
          }

          const cachePath = path.join(
            distDir,
            'cache',
            'commands',
            path.basename(filePath)
          )

          rmSync(cachePath)
        }

        for (let fp of appCommands) {
          if (existsSync(fp)) return

          const abm = json5.parse(
            readFileSync(path.join(distDir, 'app-build-manifest.json'), 'utf8')
          )
          const abmCommands = Object.entries(abm.commands) as unknown as [
            string,
            string
          ][]
          const fileCommand = abmCommands.find(
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
      })

    // Trnaspiles changed files only
    const chunks = await incrementalBuildSpan
      .traceChild('generate-changed-chunks')
      .traceAsyncFn(async () => {
        const allChunks: {
          code: string
          path: string
          type: 'command' | 'event' | 'app__event' | 'app__command'
        }[] = []

        const all = [
          ...files.events,
          ...files.commands,
          ...files.app.commands,
          ...files.app.events,
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
          })
        }
        return allChunks
      })

    // Validates the changed chunks
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateChunks = await incrementalBuildSpan
      .traceChild('validate-chunks')
      .traceAsyncFn(async () => {
        let error = false
        const commandChunks = chunks.filter((chunk) =>
          chunk.type.includes('command')
        )
        for (let chunk of commandChunks) {
          const mod = requireFromString(chunk.code)
          const fileName = path.basename(chunk.path)
          const name = fileName.replace(/\..*$/, '')

          const info = {
            name: name,
            description: mod.description,
            dmPermission: mod.dmPermission,
            nsfw: mod.nsfw,
            fn: mod.default,
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

            Log.error(
              `The \`${name}\` slash command has a few errors:\n${message}`
            )
          }
        }
        if (error) {
          console.log()
          printAndExit(
            'Fix these errors before attempting to build your project again.',
            0
          )
          console.log()
        }
      })

    // Writes changed chunks to dist directory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const writeChunks = await incrementalBuildSpan
      .traceChild('update-chunks')
      .traceAsyncFn(async () => {
        const information: {
          path: string
          origin: 'event' | 'command' | 'app__command' | 'app__event'
          originPath: string
        }[] = []

        for (let chunk of chunks) {
          let outDir = path.join(distDir, 'server')

          if (chunk.type.startsWith('app__')) outDir = path.join(outDir, 'app')

          const outFile = path.join(outDir, `chunk__${nanoid(5)}.js`)

          await mkdirp(outDir)
          await writeFile(outFile, chunk.code, 'utf8')

          information.push({
            path: outFile,
            originPath: chunk.path,
            origin: chunk.type,
          })
        }
        return information
      })

    // Updates build manifest if it has anything new
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildManifest = await incrementalBuildSpan
      .traceChild('update-build-manifest')
      .traceAsyncFn(async () => {
        const commands = writeChunks.filter((t) => t.origin === 'command')
        const events = writeChunks.filter((t) => t.origin === 'event')

        const p = path.join(distDir, 'build-manifest.json')

        const old: BuildManifest = (await pathExists(p))
          ? JSON.parse(readFileSync(p, 'utf8'))
          : []

        const build_manifest: BuildManifest = {
          ...old,
          mode: dev ? 'development' : 'production',
          commands: Object.fromEntries(
            commands.map((i) => [
              path
                .basename(i.originPath)
                .at(-1)
                ?.replace(path.extname(i.originPath), ''),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              path
                .basename(i.originPath)
                ?.replace(path.extname(i.originPath), ''),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
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
        const commands = writeChunks.filter((t) => t.origin === 'app__command')
        const events = writeChunks.filter((t) => t.origin === 'app__event')

        const p = path.join(distDir, 'app-build-manifest.json')

        const old: BuildManifest = (await pathExists(p))
          ? JSON.parse(readFileSync(p, 'utf8'))
          : {}

        const app_build_manifest: BuildManifest = {
          ...old,
          mode: dev ? 'development' : 'production',
          commands: Object.fromEntries(
            commands.map((i) => [
              camelCase(
                i.originPath
                  .replace(path.join(dir, 'app'), '')
                  .replace(path.basename(i.originPath), '')
                  .split(path.sep)
                  .join('_')
              ),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              camelCase(
                i.originPath
                  .replace(path.join(dir, 'app'), '')
                  .replace(path.basename(i.originPath), '')
                  .split(path.sep)
                  .join('_')
              ),
              i.path
                .replace(`${distDir}${path.sep}`, '')
                .split(path.sep)
                .join('/'),
            ])
          ),
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

        const allFiles = []
        if (files.commands) allFiles.push(...files.commands)
        if (files.events) allFiles.push(...files.events)
        if (files.app) allFiles.push(...files.app.commands, ...files.app.events)

        const information: {
          path: string
        }[] = []

        for (let file of allFiles) {
          const fileContent = await readFile(file.path)
          const filePath = file.path.replace(dir, '')
          const outPath = path.join(cacheDir, filePath)
          const compressed = Buffer.from(
            compressSync(fileContent, { level: 9 })
          )

          await mkdirp(path.dirname(outPath))
          await writeFile(outPath, compressed, 'utf8')

          information.push({ path: outPath })
        }
      })

    // Benchmarking
    const end = process.hrtime(start)
    const seconds = end[0] + end[1] / 1000000000
    const template = `in ${seconds.toFixed(4)}s`

    if (!invalidCache) console.log()

    if (dev) Log.event(`updated in ${template}`)
    else Log.info(`done in ${template}`)
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
            invalid: allFiles.map((file) => file.path),
          }

        for (let file of cacheFiles) {
          const relativeFilePath = path.join(dir, file)

          const found = allFiles.find((f) => f.path === relativeFilePath)

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
        allFiles
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
      Log.info('No invalid caches, nothing to update')
    }
  })
}

export default async function build(
  dir: string,
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

      // Called when a user changes their codebase while runnig the `jujutsu dev` command in the CLI
      if (serverDistExists && changedFiles.length > 0)
        return await incrementalBuild({
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
        return await coldStart({
          dir,
          distDir,
          config,
          parentId: jujutsuBuildSpan.id,
          dev,
          dirs,
        })
      // This user is most likely running `jujutsu build` or the initial build check when running `jujutsu dev` (already built their project formerly)
      else if (changedFiles.length < 1 && cacheDirExists)
        return await attemptCacheHit({
          dir,
          distDir,
          parentId: jujutsuBuildSpan.id,
          config,
          dev,
          dirs,
        })
      // No cache but the server directory exists, this is a fallback as we cannot check the cache (Most likely when running `jujutsu build`)
      else if (changedFiles.length < 1) {
        Log.info('No cache to read from, rebuilding project')
        return await coldStart({
          dir,
          distDir,
          config,
          parentId: jujutsuBuildSpan.id,
          dev,
          dirs,
        })
      }
    })
  } finally {
    flushAllTraces()
  }
}
