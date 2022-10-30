import * as Discord from "discord.js";
import { bot } from "index";

/**
   * Create a `command` instance that can be used within the **Riku.js** command manager
   *
   * ```js
   * class ready extends event<"ready"> {
   *   constructor(instance: bot) { super(instance, riku.Discord.Events.ClientReady) }
   *   public async run() {
   *     console.log(`Logged in as ${this.instance?.client.user?.tag}`);
   *   }
   * }
   * ```
   */
export default abstract class event<T extends keyof Discord.ClientEvents> {
  constructor(protected instance: bot, public name: T) {}

  public abstract run(...args: Discord.ClientEvents[T]): Promise<void>;
}
