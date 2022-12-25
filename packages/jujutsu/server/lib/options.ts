import { Options as ServerOptions } from '../base-server'

export interface DevServerOptions extends ServerOptions {
  /**
   * Tells of Jujutsu.js is running from the `next dev` command
   */
  isJujutsuDevCommand?: boolean
}
