// eslint-disable-next-line import/no-extraneous-dependencies
import { Client, ClientOptions } from 'jujutsu/dist/compiled/discord.js'
import { DiscordConfig } from '../server/config-shared'
import SlashCommandManager from './lib/managers/slash-commands'
// eslint-disable-next-line import/no-extraneous-dependencies
import { EventEmitter } from 'jujutsu/dist/compiled/ws'
import EventManager from './lib/managers/events'
import isError, { JujutsuError } from '../lib/is-error'
import * as Log from '../build/output/log'
import { printAndExit } from '../lib/utils'

interface ExtendedConfig extends DiscordConfig {
  quiet: boolean
}

export default class bot {
  static instance: bot

  public client: Client
  public slashCommandManager: SlashCommandManager
  public eventManager: EventManager

  constructor(
    public config: ExtendedConfig,
    public events: EventEmitter,
    public dev = false,
    public debug = false
  ) {
    if (config.options == null)
      printAndExit(
        "> Couldn't find `discord.options`. Add a value for `options` to your `jujutsu.config.js` configuration under `discord`."
      )

    this.client = new Client(config.options as ClientOptions)
    this.slashCommandManager = new SlashCommandManager(this)
    this.eventManager = new EventManager(this)
  }

  public hookServerEvents() {
    this.client.on('ready', async () => {
      this.events.emit('ready', this.client)
      await this.slashCommandManager.registerCommands()
    })
    this.client.on('error', (e: JujutsuError) => {
      if (this.config.quiet) return void 0
      Log.error(e.type === 'init' ? e.message : e)
      if (this.dev) Log.wait('waiting for changes')
      else process.exit(1)
    })
    this.client.on('debug', (message) =>
      this.debug && !this.config.quiet ? Log.event(message) : void 0
    )
  }

  public async init() {
    try {
      if (
        !this.config.token ||
        (this.config.token && this.config.token.length < 1)
      )
        printAndExit(
          "> Couldn't find `discord.token`. Add a value for `token` to your `jujutsu.config.js` configuration under `discord`."
        )

      await this.client.login(this.config.token)
    } catch (error) {
      if (isError(error)) {
        error.type = 'init'
        this.client.emit('error', error)
      }
    }
  }
}
