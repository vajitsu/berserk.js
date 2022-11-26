import type { DevServerOptions, ServerOptions } from './lib/options'
import Watchpack from 'jujutsu/dist/compiled/watchpack'
import { findAppDir, findDir } from '../lib/find-app-dir'
import * as Log from '../build/output/log'
import { loadEnvConfig } from '../lib/env'
import { join as pathJoin } from 'path'
import BaseServer from './base-server'
import { UnwrapPromise } from '../lib/coalesced-function'
import loadJsConfig from '../build/load-jsconfig'
import { PHASE_DEVELOPMENT_SERVER } from '../lib/constants'
import { setGlobal } from '../trace'

export type JujutsuServerOptions = Partial<DevServerOptions>

export class JujutsuServer extends BaseServer {
  constructor(options: ServerOptions) {
    // Initialize super class
    super(options)
  }

  protected loadEnvConfig({
    dev,
    forceReload,
  }: {
    dev: boolean
    forceReload?: boolean
  }) {
    loadEnvConfig(this.dir, dev, Log, forceReload)
  }

  protected getHasAppDir(): boolean {
    return Boolean(findDir(this.dir, 'app'))
  }

  async start() {}
}

export class JujutsuDevServer extends JujutsuServer {
  private watcher?: Watchpack | null
  private usingTypeScript?: boolean

  private devReady: Promise<void>
  private setDevReady?: Function

  private appDir?: string

  constructor(options: DevServerOptions) {
    super({ ...options, dev: true })
    this.devReady = new Promise((resolve) => {
      this.setDevReady = resolve
    })

    const { appDir } = findAppDir(this.dir, true)
    this.appDir = appDir
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

    await super.prepare()
    await this.startWatcher()
    await this.startWatcher()
    this.setDevReady!()
  }
}
