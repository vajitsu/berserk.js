import { Events } from 'jujutsu/dist/compiled/discord.js'
import { EventFileComplete } from '../../../build'
import { DiscordConfig } from '../../../client/config-shared'
import bot from '../../bot'

export default class EventManager {
  private events: { [name: string]: EventFileComplete } = {}

  constructor(private instance: bot) {}

  registerEvent(event: EventFileComplete) {
    this.events[event.name] = event
    this.instance.client.on(event.name, event.default.bind(event))
  }

  public getEvent(name: string) {
    return this.events[name]
  }

  public getEvents() {
    return Object.values(this.events)
  }
}
