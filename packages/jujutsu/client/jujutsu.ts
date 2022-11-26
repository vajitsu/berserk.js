import type { DevServerOptions, ServerOptions } from './lib/options'
import Watchpack from 'jujutsu/dist/compiled/watchpack'
import { findAppDir, findDir } from '../lib/find-app-dir'
import * as Log from '../build/output/log'
import { loadEnvConfig } from '../lib/env'
import { join as pathJoin } from 'path'
import { UnwrapPromise } from '../lib/coalesced-function'
import loadJsConfig from '../build/load-jsconfig'
import { PHASE_DEVELOPMENT_SERVER } from '../lib/constants'
import { setGlobal } from '../trace'
import bot from '../discord/bot'
import startServer from './lib/start-server'
import { JujutsuConfigComplete } from './config-shared'
import { recursiveReadDirSync } from './lib/recursive-readdir-sync'
import build from '../build'
import { recursiveReadDir } from '../lib/recursive-readdir'

// export type JujutsuServerOptions = Partial<DevServerOptions>

// export class JujutsuServer extends BaseServer {
//   constructor(protected options: ServerOptions, protected bot: bot) {
//     // Initialize super class
//     super(options, bot)
//   }

//   protected loadEnvConfig({
//     dev,
//     forceReload,
//   }: {
//     dev: boolean
//     forceReload?: boolean
//   }) {
//     loadEnvConfig(this.dir, dev, Log, forceReload)
//   }

//   protected getHasAppDir(): boolean {
//     return Boolean(findDir(this.dir, 'app'))
//   }

//   async start() {
//     startServer(this.options, this.bot)
//   }
// }

export class JujutsuDevServer {
  private watcher?: Watchpack | null
  private usingTypeScript?: boolean

  private devReady: Promise<void>
  private setDevReady?: Function

  private appDir?: string

  protected distDir: string
  protected dir: string
  protected quiet: boolean
  protected jujutsuConfig: JujutsuConfigComplete

  protected loadEnvConfig({
    dev,
    forceReload,
  }: {
    dev: boolean
    forceReload?: boolean
  }) {
    loadEnvConfig(this.dir, dev, Log, forceReload)
  }

  constructor(protected options: DevServerOptions, protected bot: bot) {
    const { dir = '.', quiet = false, conf, dev = false } = options

    this.quiet = quiet
    this.dir = dir
    this.jujutsuConfig = conf as JujutsuConfigComplete
    this.distDir = require('path').join(this.dir, this.jujutsuConfig.distDir)
    this.appDir = require('path').join(this.dir, 'app')

    this.devReady = new Promise((resolve) => {
      this.setDevReady = resolve
    })
  }

  public logError(err: Error): void {
    if (this.quiet) return
    console.error(err)
  }

  async startWatcher(): Promise<void> {
    if (this.watcher) {
      return
    }

    let resolved = false
    return new Promise(async (resolve, reject) => {
      const app = this.appDir ? [this.appDir] : []

      const directories = [...app]
      const files: string[] = []

      const envFiles = [
        '.env.development.local',
        '.env.local',
        '.env.development',
        '.env',
      ].map((file) => pathJoin(this.dir, file))
      files.push(...envFiles)

      const regex_commands = new RegExp(
        `^command\\.(?:${this.jujutsuConfig.commandExtensions.join('|')})$`,
        ''
      )
      const regex_events = new RegExp(
        `^event\\.(?:${this.jujutsuConfig.eventExtensions.join('|')})$`,
        ''
      )

      const appFiles = this.appDir
        ? [
            ...(await recursiveReadDir(this.appDir, regex_commands)).map(
              (file) => pathJoin(this.dir, 'app', file)
            ),
            ...(await recursiveReadDir(this.appDir, regex_events)).map((file) =>
              pathJoin(this.dir, 'app', file)
            ),
          ]
        : []
      files.push(...appFiles)

      // tsconfig/jsonfig paths hot-reloading
      const tsconfigPaths = [
        pathJoin(this.dir, 'tsconfig.json'),
        pathJoin(this.dir, 'jsconfig.json'),
      ]
      files.push(...tsconfigPaths)

      const wp = (this.watcher = new Watchpack({
        ignored: (pathname: string) => {
          return (
            !files.some((file) => file.startsWith(pathname)) &&
            !directories.some(
              (dir) => pathname.startsWith(dir) || dir.startsWith(pathname)
            )
          )
        },
      }))

      wp.watch({ directories: [this.dir], startTime: 0 })
      const fileWatchTimes = new Map()
      let enabledTypeScript = this.usingTypeScript

      wp.on('aggregated', async () => {
        const knownFiles = wp.getTimeInfoEntries()
        const appPaths: Record<string, string[]> = {}

        let envChange = false
        let tsconfigChange = false
        let appChange = false

        for (const [fileName, meta] of knownFiles) {
          if (
            !files.includes(fileName) &&
            !directories.some((dir) => fileName.startsWith(dir))
          ) {
            continue
          }

          const watchTime = fileWatchTimes.get(fileName)
          const watchTimeChange = watchTime && watchTime !== meta?.timestamp
          fileWatchTimes.set(fileName, meta.timestamp)

          if (envFiles.includes(fileName)) {
            if (watchTimeChange) {
              envChange = true
            }
            continue
          }

          if (tsconfigPaths.includes(fileName)) {
            if (fileName.endsWith('tsconfig.json')) {
              enabledTypeScript = true
            }
            if (watchTimeChange) {
              tsconfigChange = true
            }
            continue
          }

          if (appFiles.includes(fileName)) {
            if (watchTimeChange) {
              appChange = true
            }
            continue
          }

          if (fileName.endsWith('.ts')) {
            enabledTypeScript = true
          }
        }

        if (envChange || tsconfigChange) {
          if (envChange) {
            this.loadEnvConfig({ dev: true, forceReload: true })
          }
          let tsconfigResult:
            | UnwrapPromise<ReturnType<typeof loadJsConfig>>
            | undefined

          if (tsconfigChange) {
            try {
              tsconfigResult = await loadJsConfig(this.dir, this.jujutsuConfig)
            } catch (_) {
              /* do we want to log if there are syntax errors in tsconfig  while editing? */
            }
          }
        }

        if (appChange) {
          Log.wait('Project modified... building new changes')
          this.bot.client.destroy()
          this.stopWatcher()
          build(this.dir, null, true)
          startServer(this.options)
        }
      })
    })
  }

  async stopWatcher(): Promise<void> {
    if (!this.watcher) {
      return
    }

    this.watcher.close()
    this.watcher = null
  }

  async prepare(): Promise<void> {
    setGlobal('distDir', this.distDir)
    setGlobal('phase', PHASE_DEVELOPMENT_SERVER)

    await this.startWatcher()
    await this.startWatcher()
    this.setDevReady!()
  }
}

// export class JujutsuDevServer extends JujutsuServer {
//   private watcher?: Watchpack | null
//   private usingTypeScript?: boolean

//   private devReady: Promise<void>
//   private setDevReady?: Function

//   private appDir?: string

//   constructor(options: DevServerOptions, bot: bot) {
//     super({ ...options, dev: true }, bot)
//     this.devReady = new Promise((resolve) => {
//       this.setDevReady = resolve
//     })

//     const { appDir } = findAppDir(this.dir, true)
//     this.appDir = appDir
//   }

// }
