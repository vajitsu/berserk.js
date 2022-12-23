// eslint-disable-next-line import/no-extraneous-dependencies
import Watchpack from 'berserk/dist/compiled/watchpack'
import { join as pathJoin } from 'path'
import build from '../../build'
import loadJsConfig from '../../build/load-jsconfig'
import * as Log from '../../build/output/log'
import Bot from '../../discord/bot'
import { UnwrapPromise } from '../../lib/coalesced-function'
import { PHASE_DEVELOPMENT_SERVER } from '../../lib/constants'
import { loadEnvConfig } from '../../lib/env'
import { fileExists } from '../../lib/file-exists'
import { recursiveReadDir } from '../../lib/recursive-readdir'
import { flushAllTraces, setGlobal } from '../../trace'
import { BerserkConfigComplete } from '../config-shared'
import Server from '../berserk-server'
import { DevServerOptions } from '../lib/options'
import startServer from '../lib/start-server'

export default class DevServer extends Server {
  private watcher?: Watchpack | null
  private usingTypeScript?: boolean

  private devReady: Promise<void>
  private setDevReady?: Function

  private appDir?: string

  protected dev: boolean
  protected distDir: string
  protected dir: string
  protected quiet: boolean
  protected berserkConfig: BerserkConfigComplete

  protected loadEnvConfig({
    dev,
    forceReload,
  }: {
    dev: boolean
    forceReload?: boolean
  }) {
    loadEnvConfig(this.dir, dev, Log, forceReload)
  }

  constructor(protected options: DevServerOptions, protected bot: Bot) {
    super(options)

    const { dir = '.', quiet = false, conf, dev = false } = options

    this.dev = dev
    this.quiet = quiet
    this.dir = dir
    this.berserkConfig = conf as BerserkConfigComplete
    this.distDir = require('path').join(this.dir, this.berserkConfig.distDir)
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

    // let resolved = false
    return new Promise(async (_resolve, _reject) => {
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
        `^command\\.(?:${this.berserkConfig.commandExtensions.join('|')})$`,
        ''
      )
      const regex_events = new RegExp(
        `^event\\.(?:${this.berserkConfig.eventExtensions.join('|')})$`,
        ''
      )

      const appFiles =
        this.appDir && (await fileExists(this.appDir, 'directory'))
          ? [
              ...(await recursiveReadDir(this.appDir, regex_commands)).map(
                (file) => pathJoin(this.dir, 'app', file)
              ),
              ...(await recursiveReadDir(this.appDir, regex_events)).map(
                (file) => pathJoin(this.dir, 'app', file)
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let enabledTypeScript = this.usingTypeScript

      wp.on('aggregated', async () => {
        const knownFiles = wp.getTimeInfoEntries()
        // const appPaths: Record<string, string[]> = {}

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
              //enabledTypeScript = true
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
            //enabledTypeScript = true
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
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              tsconfigResult = await loadJsConfig(this.dir, this.berserkConfig)
            } catch (_) {
              /* do we want to log if there are syntax errors in tsconfig  while editing? */
            }
          }
        }

        if (appChange) {
          Log.wait('Project modified, building new changes...')
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

  async close() {
    await flushAllTraces()
  }

  async prepare(): Promise<void> {
    setGlobal('distDir', this.distDir)
    setGlobal('phase', PHASE_DEVELOPMENT_SERVER)

    await this.startWatcher()
    this.setDevReady!()
  }
}
