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
      color: 0x456ef6,
      image: {
        url: "https://web-rikuu.vercel.app/api/og",
      },
      footer: {
        text: "Welcome to Riku.js! Get started by editing *index.ts*",
      },
    };
    return void (await interaction.reply({
      embeds: [embed as any],
    }));
  }
}
