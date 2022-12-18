import Bot from '../discord/bot'
import { default as BotServer } from './berserk-server'
import type { DevServerOptions } from './lib/options'
import * as log from '../build/output/log'
import loadConfig from './config'
import { resolve } from 'path'
import { NON_STANDARD_NODE_ENV } from '../lib/constants'
import { PHASE_DEVELOPMENT_SERVER } from '../lib/constants'
import { PHASE_PRODUCTION_SERVER } from '../lib/constants'
// eslint-disable-next-line import/no-extraneous-dependencies
import { EventEmitter } from 'berserk/dist/compiled/ws'

export type JujutsuServerOptions = Partial<DevServerOptions>

let BotImpl: typeof BotServer

const getBotImpl = async () => {
  if (BotImpl === undefined) {
    BotImpl = (await Promise.resolve(require('./berserk-server'))).default
  }
  return BotImpl
}

export class JujutsuServer {
  private server?: BotServer
  private serverPromise?: Promise<BotServer>
  public options: JujutsuServerOptions

  constructor(options: JujutsuServerOptions) {
    this.options = options
  }

  private async loadConfig() {
    return loadConfig(
      this.options.dev ? PHASE_DEVELOPMENT_SERVER : PHASE_PRODUCTION_SERVER,
      resolve(this.options.dir || '.'),
      this.options.conf
    )
  }

  private async createBotServer(options: DevServerOptions): Promise<BotServer> {
    if (options.dev) {
      const DevServer = require('./dev/berserk-dev-server').default
      return new DevServer(options)
    }
    const BotImplementation = await getBotImpl()
    return new BotImplementation(options)
  }

  private async getServer() {
    if (!this.serverPromise) {
      this.serverPromise = this.loadConfig().then(async (conf) => {
        this.server = await this.createBotServer({
          ...this.options,
          conf,
          bot: new Bot(
            {
              ...conf.discord,
              quiet: this.options.quiet || false,
            },
            new EventEmitter(),
            false
          ),
        })
        return this.server
      })
    }
    return this.serverPromise
  }
}

// This file is used for when users run `require('berserk')`
function createServer(options: JujutsuServerOptions): JujutsuServer {
  // The package is used as a TypeScript plugin.
  if (
    options &&
    'typescript' in options &&
    'version' in (options as any).typescript
  ) {
    return require('./berserk-typescript').createTSPlugin(options)
  }

  if (options == null) {
    throw new Error('The server has not been instantiated properly.')
  }

  if (
    !('isJujutsuDevCommand' in options) &&
    process.env.NODE_ENV &&
    !['production', 'development', 'test'].includes(process.env.NODE_ENV)
  ) {
    log.warn(NON_STANDARD_NODE_ENV)
  }

  if (options.dev && typeof options.dev !== 'boolean') {
    console.warn(
      "Warning: 'dev' is not a boolean which could introduce unexpected behavior."
    )
  }

  return new JujutsuServer(options)
}

// Support commonjs `require('berserk')`
module.exports = createServer
exports = module.exports

// Support `import berserk from 'berserk'`
export default createServer
