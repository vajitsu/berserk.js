/* eslint-disable import/no-extraneous-dependencies */
import {
  mkdir,
  mkdirp,
  pathExists,
  pathExistsSync,
  readFile,
  readFileSync,
  writeFile,
} from 'fs-extra'
import { trace, flushAllTraces, setGlobal } from '../trace'
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from '../lib/constants'
import loadConfig from '../server/config'
import { BerserkConfigComplete } from '../server/config-shared'
import path from 'path'
import Compiler from './compiler'
import { findDirs } from '../lib/find-dirs'
import { recursiveReadDir } from '../lib/recursive-readdir'
import isError from '../lib/is-error'
import { isWriteable } from './is-writeable'
import { recursiveDelete } from '../lib/recursive-delete'
import { compressSync, decompressSync } from 'fflate'
import * as Log from './output/log'
import { nanoid } from 'berserk/dist/compiled/nanoid'
import { validateCommandFile } from './validate'
import requireFromString from 'berserk/dist/compiled/require-from-string'
import chalk from '../lib/chalk'
import { printAndExit } from '../lib/utils'

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
  config: BerserkConfigComplete
  parentId: number
  dev: boolean
  dirs: {
    appDir: string | undefined
    eventsDir: string | undefined
    commandsDir: string | undefined
  }
}) {
  const coldStartSpan = trace('berserk-build-cold', parentId, {
    dir,
    distDir,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const coldStartResult = coldStartSpan.traceAsyncFn(async () => {
    const start = process.hrtime()

    const compiler = coldStartSpan
      .traceChild('load-swc-compiler')
      .traceFn(() => new Compiler())

    if (config.cleanDistDir) {
      await recursiveDelete(distDir, /^cache/)
    }

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

    if (!distDirCreated || !(await isWriteable(distDir))) {
      throw new Error('> Build directory is not writeable.')
    }

    // Ensure commonjs handling is used for files in the distDir (generally .berserk)
    // Files outside of the distDir can be "type": "module"
    await writeFile(path.join(distDir, 'package.json'), '{"type": "commonjs"}')

    const { eventsDir, commandsDir, appDir } = dirs
    const regex_commands = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_events = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_app_event = new RegExp(`^event\\.(?:js|ts)$`, '')
    const regex_app_command = new RegExp(`^command\\.(?:js|ts)$`, '')

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

    const allFiles = [
      ...files.app.events,
      ...files.app.commands,
      ...files.commands,
      ...files.events,
    ]

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
          const code = await compiler.bundle(file.path, dir, distDir)
          allChunks.push({
            path: file.path,
            code: code.at(0) as string,
            type: file.type as any,
          })
        }
        return allChunks
      })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateChunks = await coldStartSpan
      .traceChild('validate-chunks')
      .traceAsyncFn(async () => {
        let error = false
        for (let chunk of chunks) {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredAppChunks = await coldStartSpan
      .traceChild('check-app-chunks-depth')
      .traceAsyncFn(async () => {
        if (!appDir) return []

        const appChunks = chunks.filter(
          (chunk) => chunk.type === 'app__command'
        )
        const filterAppCommands = []

        for (let chunk of appChunks) {
          const depth = getDepth(appDir, chunk.path)
          const workingDir = path
            .dirname(chunk.path)
            .replace(dir + path.sep, '')

          const ending = path.extname(chunk.path)

          if (depth > 2)
            Log.warn(
              `Subcommand at "${workingDir}${path.sep}command${ending}" is too deep, it will be ignored.`
            )
          else filterAppCommands.push(chunk)
        }

        return filterAppCommands
      })

    chunks = [
      ...filteredAppChunks,
      ...chunks.filter((chunk) => chunk.type !== 'app__command'),
    ]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const writeChunks = await coldStartSpan
      .traceChild('write-chunks')
      .traceAsyncFn(async () => {
        const information: {
          path: string
          origin: 'event' | 'command' | 'app__command' | 'app__event'
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
          })
        }
        return information
      })

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
              i.path.split(path.sep).at(-1)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              i.path.split(path.sep).at(-1)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
            ])
          ),
        }

        await writeFile(
          path.join(distDir, 'build-manifest.json'),
          JSON.stringify(build_manifest),
          'utf8'
        )
      })

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
              i.path.split(path.sep).at(-1)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              i.path.split(path.sep).at(-1)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
            ])
          ),
        }

        await writeFile(
          path.join(distDir, 'app-build-manifest.json'),
          JSON.stringify(app_build_manifest),
          'utf8'
        )
      })

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

    const end = process.hrtime(start)
    const seconds = end[0] + end[1] / 1000000000
    const template = `in ${seconds.toFixed(4)}s`

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
}: {
  dir: string
  distDir: string
  config: BerserkConfigComplete
  parentId: number
  changedFiles: string[]
  dev: boolean
  dirs: {
    appDir: string | undefined
    eventsDir: string | undefined
    commandsDir: string | undefined
  }
}) {
  const incrementalBuildSpan = trace('berserk-build-incremental', parentId, {
    dir,
    distDir,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const incrementalBuildResult = incrementalBuildSpan.traceAsyncFn(async () => {
    const start = process.hrtime()

    const compiler = incrementalBuildSpan
      .traceChild('load-swc-compiler')
      .traceFn(() => new Compiler())

    const { eventsDir, commandsDir, appDir } = dirs
    const regex_commands = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_events = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_app_event = new RegExp(`^event\\.(?:js|ts)$`, '')
    const regex_app_command = new RegExp(`^command\\.(?:js|ts)$`, '')

    const filePaths = changedFiles

    const files = {
      commands: commandsDir
        ? (await recursiveReadDir(commandsDir, regex_commands))
            .map((file) => ({
              path: path.join(dir, 'commands', file),
              type: 'command',
            }))
            .filter((file) => filePaths.includes(file.path))
        : undefined,
      events: eventsDir
        ? (await recursiveReadDir(eventsDir, regex_events))
            .map((file) => ({
              path: path.join(dir, 'events', file),
              type: 'event',
            }))
            .filter((file) => filePaths.includes(file.path))
        : undefined,
      app: appDir
        ? {
            commands: (await recursiveReadDir(appDir, regex_app_command))
              .map((file) => ({
                path: path.join(dir, 'app', file),
                type: 'app__command',
              }))
              .filter((file) => filePaths.includes(file.path)),
            events: (await recursiveReadDir(appDir, regex_app_event))
              .map((file) => ({
                path: path.join(dir, 'app', file),
                type: 'app__event',
              }))
              .filter((file) => filePaths.includes(file.path)),
          }
        : undefined,
    }

    const chunks = await incrementalBuildSpan
      .traceChild('generate-changed-chunks')
      .traceAsyncFn(async () => {
        const allChunks: {
          code: string
          path: string
          type: 'command' | 'event' | 'app__event' | 'app__command'
        }[] = []

        const all = [...(files.events || []), ...(files.commands || [])]

        for (let file of all) {
          mkdirp(distDir)
          const code = await compiler.bundle(file.path, dir, distDir)
          allChunks.push({
            path: file.path,
            code: code.at(0) as string,
            type: file.type as any,
          })
        }
        return allChunks
      })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateChunks = await incrementalBuildSpan
      .traceChild('validate-chunks')
      .traceAsyncFn(async () => {
        let error = false
        for (let chunk of chunks) {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const writeChunks = await incrementalBuildSpan
      .traceChild('update-chunks')
      .traceAsyncFn(async () => {
        const information: {
          path: string
          origin: 'event' | 'command' | 'app__command' | 'app__event'
          originalPath: string
        }[] = []

        for (let chunk of chunks) {
          const fileName = path
            .basename(chunk.path)
            ?.replace(/\.js$/, '.js')
            .replace(/\.ts$/, '.js') as string

          let outDir = path.join(distDir, 'server')

          if (chunk.type.startsWith('app__')) outDir = path.join(outDir, 'app')

          const outFile = path.join(outDir, fileName)

          await mkdirp(outDir)
          await writeFile(outFile, chunk.code, 'utf8')

          information.push({
            path: outFile,
            originalPath: chunk.path,
            origin: chunk.type,
          })
        }
        return information
      })

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
              path.basename(i.originalPath).at(-1)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              path.basename(i.originalPath)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
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
              i.path.split(path.sep).at(-1)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
            ])
          ),
          events: Object.fromEntries(
            events.map((i) => [
              i.path.split(path.sep).at(-1)?.replace(/\..*$/, ''),
              i.path.replace(`${distDir}${path.sep}`, '').replace('\\', '/'),
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

    const end = process.hrtime(start)
    const seconds = end[0] + end[1] / 1000000000
    const template = `in ${seconds.toFixed(4)}s`

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
  config: BerserkConfigComplete
  parentId: number
  dev: boolean
  dirs: {
    appDir: string | undefined
    eventsDir: string | undefined
    commandsDir: string | undefined
  }
}) {
  const attemptCacheHitSpan = trace('berserk-attempt-cache-hit', parentId, {
    dir,
    distDir,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const attemptCacheHitResult = attemptCacheHitSpan.traceAsyncFn(async () => {
    const cacheDir = path.join(distDir, 'cache')
    const { eventsDir, commandsDir, appDir } = dirs

    const regex_commands = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_events = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')
    const regex_app_event = new RegExp(`^event\\.(?:js|ts)$`, '')
    const regex_app_command = new RegExp(`^command\\.(?:js|ts)$`, '')
    const regex_cache = new RegExp(`^[\\w\\-\\.\\ ]+\\.(?:js|ts)$`, '')

    const files = {
      commands: commandsDir
        ? (await recursiveReadDir(commandsDir, regex_commands)).map((file) => ({
            path: path.join(dir, 'commands', file),
            type: 'command',
          }))
        : undefined,
      events: eventsDir
        ? (await recursiveReadDir(eventsDir, regex_events)).map((file) => ({
            path: path.join(dir, 'events', file),
            type: 'event',
          }))
        : undefined,
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
        : undefined,
    }

    const allFiles = await attemptCacheHitSpan
      .traceChild('read-files')
      .traceAsyncFn(async () => {
        const all = []
        if (files.commands) all.push(...files.commands)
        if (files.events) all.push(...files.events)
        if (files.app) all.push(...files.app.events, ...files.app.commands)

        return all.map((file) => ({
          content: readFileSync(file.path),
          path: file.path,
        }))
      })

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
            misses: allFiles.map((file) => file.path),
          }

        for (let file of cacheFiles) {
          const relativeFilePath = path.join(dir, file)

          const found = allFiles.find(
            (f) =>
              f.path === relativeFilePath.replace(/\.cache$/, '.ts') ||
              f.path === relativeFilePath.replace(/\.cache$/, '.js')
          )

          if (found) {
            const fileContent = readFileSync(path.join(cacheDir, file))
            const de = Buffer.from(decompressSync(fileContent))

            const hit = de.equals(found.content)
            if (hit) hits.push(found.path)
            else miss.push(found.path)
          }
        }

        return {
          hits,
          misses: miss,
        }
      })

    if (existingCaches.misses.length > 0) {
      Log.info(
        `${existingCaches.misses.length} cache(s) missed, rebuilding changed files`
      )

      await incrementalBuild({
        dir,
        distDir,
        config,
        parentId: attemptCacheHitSpan.id,
        changedFiles: existingCaches.misses,
        dev,
        dirs,
      })
    } else if (existingCaches.misses.length < 1)
      Log.info('No missing caches, nothing to update')
  })
}

export default async function build(
  dir: string,
  dev = false,
  changedFiles: string[] = []
) {
  try {
    const berserkBuildSpan = trace('berserk-build', undefined, {
      version: process.env.__BERSERK_VERSION as string,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildResult = berserkBuildSpan.traceAsyncFn(async () => {
      const phase = dev ? PHASE_DEVELOPMENT_SERVER : PHASE_PRODUCTION_BUILD

      const config: BerserkConfigComplete = await berserkBuildSpan
        .traceChild('load-berserk-config')
        .traceAsyncFn(() => loadConfig(phase, dir))

      const distDir = path.join(dir, config.distDir)

      setGlobal('phase', phase)
      setGlobal('distDir', distDir)

      const distDirExists = pathExistsSync(distDir)

      const isAppDirEnabled = !!config.experimental.appDir
      const dirs = findDirs(dir, isAppDirEnabled)

      if (distDirExists && changedFiles.length > 0)
        return await incrementalBuild({
          changedFiles,
          parentId: berserkBuildSpan.id,
          dir,
          distDir,
          config,
          dev,
          dirs,
        })
      else if (!distDirExists)
        return await coldStart({
          dir,
          distDir,
          config,
          parentId: berserkBuildSpan.id,
          dev,
          dirs,
        })
      else if (changedFiles.length < 1)
        return await attemptCacheHit({
          dir,
          distDir,
          parentId: berserkBuildSpan.id,
          config,
          dev,
          dirs,
        })
    })
  } finally {
    flushAllTraces()
  }
}
