import { EventFileComplete } from '../../../build'
import bot from '../../bot'

export default class EventManager {
  private events: { [name: string]: EventFileComplete } = {}

  constructor(private instance: bot) {
    this.instance.client.on('interactionCreate', (i) => {
      if (i.isChatInputCommand())
        return this.instance.slashCommandManager.runCommand(i)
    })
  }

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
