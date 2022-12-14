import { EventComplete } from '../../build/types'
import bot from '../bot'
import assignDefaults from '../lib/assign-defaults'

export default class EventManager {
  private events: { [name: string]: EventComplete } = {}

  constructor(private instance: bot) {
    this.instance.client.on('interactionCreate', (i) => {
      if (i.isChatInputCommand())
        return this.instance.slashCommandManager.runCommand(i)
    })
  }

  registerEvent(event: { name: string; absolutePath: string }) {
    const mod = require(event.absolutePath)
    this.events[event.name] = assignDefaults('event', {
      name: event.name,
      fn: mod.default || mod,
    }) as EventComplete
    const { fn, name } = this.events[event.name]
    this.instance.client.on(name, (...args) =>
      fn(this.instance.client, ...args)
    )
  }

  public getEvent(name: string) {
    return this.events[name]
  }

  public getEvents() {
    return Object.values(this.events)
  }
}
