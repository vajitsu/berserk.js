import Discord from 'discord.js'
import { Bot } from '../dist'

declare abstract class Event<T extends keyof Discord.ClientEvents> {
  protected instance: Bot
  name: T
  constructor(instance: Bot, name: T)
  abstract run(...args: Discord.ClientEvents[T]): Promise<void>
}

export { Event as default }
