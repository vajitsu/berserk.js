import { GuildInteraction } from "utils";
import * as Discord from "discord.js";
import command from "command";

export default class helloCommand extends command {
  name = "hello";
  data = new Discord.SlashCommandBuilder()
    .setName("hello")
    .setDescription("Hello World! Learn more about Riku.js");

  async run(
    interaction: Discord.ChatInputCommandInteraction & GuildInteraction
  ) {
    const embed: Discord.EmbedData = {
      color: 0x6084ff,
      title: "Welcome to Riku.js!",
      description: "Get started by editing `commands/hello.ts`",
    };
    return void (await interaction.reply({
      embeds: [embed as any],
    }));
  }
}
