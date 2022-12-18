import type { BeserkConfig, BeserkConfigComplete } from './config-shared'
import { setConfig } from '../lib/runtime-config'

export interface Options {
  /**
   * Object containing the configuration berserk.config.js
   */
  conf: BeserkConfig
  /**
   * Tells if Beserk.js is running in dev mode
   */
  dev?: boolean
  /**
   * Where the Jujutsu project is located
   */
  dir?: string
  /**
   * Tells if Beserk.js is running in a Serverless platform
   */
  minimalMode?: boolean
  /**
   * Hide error messages containing server information
   */
  quiet?: boolean
  /**
   * Discord Client
   */
  bot: import('../discord/bot').default
}

export default abstract class Server<ServerOptions extends Options = Options> {
  protected dir: string
  protected quiet: boolean
  protected jujutsuConfig: BeserkConfigComplete
  protected distDir: string
  protected hasAppDir: boolean
  protected minimalMode: boolean

  protected serverOptions: ServerOptions

  protected abstract loadEnvConfig(params: {
    dev: boolean
    forceReload?: boolean
  }): void

  protected abstract getHasAppDir(dev: boolean): boolean

  public constructor(options: ServerOptions) {
    const {
      dir = '.',
      quiet = false,
      conf,
      dev = false,
      minimalMode = false,
    } = options
    this.serverOptions = options

    this.dir =
      process.env.NEXT_RUNTIME === 'edge' ? dir : require('path').resolve(dir)

    this.quiet = quiet
    this.loadEnvConfig({ dev })

    // TODO: should conf be normalized to prevent missing
    // values from causing issues as this can be user provided
    this.jujutsuConfig = conf as BeserkConfigComplete
    this.distDir =
      process.env.JUJUTSU_RUNTIME === 'edge'
        ? this.jujutsuConfig.distDir
        : require('path').join(this.dir, this.jujutsuConfig.distDir)

    // Only serverRuntimeConfig needs the default
    // publicRuntimeConfig gets it's default in client/index.js
    const { serverRuntimeConfig = {}, publicRuntimeConfig } = this.jujutsuConfig

    this.minimalMode = minimalMode || !!process.env.JUJUTSU_PRIVATE_MINIMAL_MODE

    this.hasAppDir = true
    // !!this.jujutsuConfig.experimental.appDir && this.getHasAppDir(dev)

    // Initialize berserk/config with the environment configuration
    setConfig({
      serverRuntimeConfig,
      publicRuntimeConfig,
    })
  }

  public logError(err: Error): void {
    if (this.quiet) return
    console.error(err)
  }

  // Backwards compatibility
  public async prepare(): Promise<void> {}

  // Backwards compatibility
  protected async close(): Promise<void> {}
}
