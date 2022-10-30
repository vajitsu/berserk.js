import Discord from "discord.js";
import { bot } from "index";
import event from "event";

export default class interactionEvent extends event<"interactionCreate"> {
  constructor(protected instance: bot) {
    super(instance, "interactionCreate");
  }

  async run(interaction: Discord.Interaction<Discord.CacheType>) {
    if (!this.instance.ready)
      return void console.log(
        `Ignoring interaction event as client isn't ready yet`
      );

    if (interaction.isChatInputCommand()) {
      if (!interaction.inGuild) return;

      await this.instance.commandManager.run(interaction);
    }
  }
}
