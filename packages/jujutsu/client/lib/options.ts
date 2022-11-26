import type { JujutsuConfig } from '../config-shared'

export interface ServerOptions {
  /**
   * Object containing the configuration jujutsu.config.js
   */
  conf: JujutsuConfig
  /**
   * Tells if Jujutsu.js is running in dev mode
   */
  dev?: boolean
  /**
   * Where the Jujutsu project is located
   */
  dir?: string
  quiet: boolean
}

export interface DevServerOptions extends ServerOptions {
  /**
   * Tells of Jujutsu.js is running from the `next dev` command
   */
  isJujutsuDevCommand?: boolean
}
