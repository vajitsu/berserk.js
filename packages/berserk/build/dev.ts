import { PathLike, mkdirp, pathExists, promises } from 'fs-extra'
import { trace, flushAllTraces, setGlobal } from '../trace'
import { PHASE_DEVELOPMENT_SERVER } from '../lib/constants'
import loadConfig from '../server/config'
import { BerserkConfigComplete } from '../server/config-shared'
import path from 'path'
import Compiler from './compiler'
import { findDirs } from '../lib/find-dirs'
import { recursiveReadDir } from '../lib/recursive-readdir'
import isError from '../lib/is-error'
import { isWriteable } from './is-writeable'
import { recursiveDelete } from '../lib/recursive-delete'

export async function coldStart({
  dir,
  distDir,
  config,
  parentId,
}: {
  dir: string
  distDir: string
  config: BerserkConfigComplete
  parentId: number
}) {
  const coldStartSpan = trace('berserk-build-cold', parentId, {
    dir,
    distDir,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const coldStartResult = coldStartSpan.traceAsyncFn(async () => {
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

    // Ensure commonjs handling is used for files in the distDir (generally .berserk)
    // Files outside of the distDir can be "type": "module"
    await promises.writeFile(
      path.join(distDir, 'package.json'),
      '{"type": "commonjs"}'
    )

    const isAppDirEnabled = !!config.experimental.appDir

    const { commandsDir, eventsDir, appDir } = findDirs(dir, isAppDirEnabled)

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

    const chunks = await coldStartSpan
      .traceChild('generate-chunks')
      .traceAsyncFn(async () => {
        const all = [...(files.events || []), ...(files.commands || [])]
        const allChunks: {
          code: string
          path: string
          type: 'event' | 'command' | 'app__command' | 'app__event'
        }[] = []
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
    const writeChunks = await coldStartSpan
      .traceChild('write-chunks')
      .traceAsyncFn(async () => {
        const information: {
          path: string
          origin: 'event' | 'command' | 'app__command' | 'app__event'
        }[] = []
        for (let chunk of chunks) {
          const fileName = chunk.path
            .split(path.sep)
            .at(-1)
            ?.replace(/\.js$/, '.js')
            .replace(/\.ts$/, '.js') as string

          let outDir = path.join(distDir, 'server')

          if (chunk.type.startsWith('app__')) outDir = path.join(outDir, 'app')

          const outFile = path.join(outDir, fileName)

          await mkdirp(outDir)
          await promises.writeFile(outFile, chunk.code, 'utf8')

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

        const build_manifest = {
          dev: true,
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

        await promises.writeFile(
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

        const app_build_manifest = {
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

        await promises.writeFile(
          path.join(distDir, 'app-build-manifest.json'),
          JSON.stringify(app_build_manifest),
          'utf8'
        )
      })
  })
}

// TODO: Run this during a change while running `berserk dev`
export async function incrementalBuild({
  dir,
  distDir,
  config,
  parentId,
  changedFiles,
}: {
  dir: string
  distDir: string
  config: BerserkConfigComplete
  parentId: number
  changedFiles: PathLike[]
}) {
  const incrementalBuildSpan = trace('berserk-build-incremental', parentId, {
    dir,
    distDir,
  })

  const incrementalBuildResult = incrementalBuildSpan.traceAsyncFn(
    async () => {}
  )
}

export default function build(dir: string, changedFiles: PathLike[] = []) {
  try {
    const berserkBuildSpan = trace('berserk-build', undefined, {
      version: process.env.__BERSERK_VERSION as string,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const buildResult = berserkBuildSpan.traceAsyncFn(async () => {
      const config: BerserkConfigComplete = await berserkBuildSpan
        .traceChild('load-berserk-config')
        .traceAsyncFn(() => loadConfig(PHASE_DEVELOPMENT_SERVER, dir, {}))

      const distDir = path.join(dir, config.distDir)

      setGlobal('phase', PHASE_DEVELOPMENT_SERVER)
      setGlobal('distDir', distDir)

      const distDirExists = await pathExists(distDir)

      if (distDirExists && changedFiles.length > 0)
        incrementalBuild({
          changedFiles,
          parentId: berserkBuildSpan.id,
          dir,
          distDir,
          config,
        })
      else if (!distDirExists || (distDirExists && changedFiles.length < 1))
        coldStart({ dir, distDir, config, parentId: berserkBuildSpan.id })
    })
  } finally {
    flushAllTraces()
  }
}
