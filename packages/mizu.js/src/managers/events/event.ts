import { ClientEvents } from "discord.js";
import { bot } from "index";

export default abstract class event<T extends keyof ClientEvents> {
  constructor(protected instance: bot, public name: T) {}

  public abstract run(...args: ClientEvents[T]): Promise<void>;
}
