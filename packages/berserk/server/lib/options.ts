import { Options as ServerOptions } from '../base-server'

export interface DevServerOptions extends ServerOptions {
  /**
   * Tells of Berserk.js is running from the `next dev` command
   */
  isBerserkDevCommand?: boolean
}
