import { EventCompelte } from '../../../build/types'
import bot from '../../bot'
import assignDefaults from '../assign-defaults'

export default class EventManager {
  private events: { [name: string]: EventCompelte } = {}

  constructor(private instance: bot) {
    this.instance.client.on('interactionCreate', (i) => {
      if (i.isChatInputCommand())
        return this.instance.slashCommandManager.runCommand(i)
    })
  }

  registerEvent(event: { name: string; absolutePath: string }) {
    this.events[event.name] = assignDefaults(
      'event',
      require(event.absolutePath)
    ) as EventCompelte
    const new_event = this.events[event.name]
    this.instance.client.on(new_event.name, new_event.fn.bind(event))
  }

  public getEvent(name: string) {
    return this.events[name]
  }

  public getEvents() {
    return Object.values(this.events)
  }
}
