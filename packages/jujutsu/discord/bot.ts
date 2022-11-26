import { Client } from 'jujutsu/dist/compiled/discord.js'
import { DiscordConfig } from '../client/config-shared'
import SlashCommandManager from './lib/managers/slash-commands'
import { EventEmitter } from 'jujutsu/dist/compiled/ws'
import EventManager from './lib/managers/events'
import isError from '../lib/is-error'
import * as Log from '../build/output/log'

interface ExtendedConfig extends DiscordConfig {
  quiet: boolean
}

export default class bot {
  static instance: bot

  public client: Client
  public slashCommandManager: SlashCommandManager
  public eventManager: EventManager

  constructor(private config: ExtendedConfig, public events: EventEmitter) {
    this.client = new Client(config.options)
    this.slashCommandManager = new SlashCommandManager(this)
    this.eventManager = new EventManager(this)
  }

  public getConfig(token: string | null) {
    return token && this.config.token === token ? this.config : null
  }

  public hookServerEvents() {
    this.client.on('ready', () => void this.events.emit('ready', this.client))
  }

  public async init() {
    await this.slashCommandManager.registerCommands()
    try {
      await this.client.login(this.config.token)
    } catch (error) {
      if (isError(error)) Log.error(error.message)
    }
  }
}
