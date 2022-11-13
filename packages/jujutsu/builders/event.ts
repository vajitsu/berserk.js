import Discord from "discord.js";
import { Bot } from "../src/index";

export default abstract class Event<T extends keyof Discord.ClientEvents> {
  constructor(protected instance: Bot, public name: T) {}

  public abstract run(client: Discord.Client, ...args: Discord.ClientEvents[T]): Promise<void>;
}