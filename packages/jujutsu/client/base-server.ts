import { JujutsuConfigComplete } from './config-shared'
import { ServerOptions as Options } from './lib/options'

export default abstract class Server<ServerOptions extends Options = Options> {
  protected dir: string
  protected quiet: boolean
  protected jujutsuConfig: JujutsuConfigComplete
  protected distDir: string
  protected hasAppDir: boolean

  protected abstract getHasAppDir(dev: boolean): boolean

  protected abstract loadEnvConfig(params: {
    dev: boolean
    forceReload?: boolean
  }): void

  public constructor(options: ServerOptions) {
    const { dir = '.', conf, dev = false, quiet = false } = options

    this.dir = require('path').resolve(dir)
    this.quiet = quiet

    this.loadEnvConfig({ dev })

    this.jujutsuConfig = conf as JujutsuConfigComplete
    this.distDir = require('path').join(this.dir, this.jujutsuConfig.distDir)

    this.hasAppDir = this.getHasAppDir(dev)
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
