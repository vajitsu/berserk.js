import { GuildInteraction } from "utils";
import * as Discord from "discord.js";
import axios from "axios";
import command from "command";

export default class helloCommand extends command {
  name = "hello";
  data = new Discord.SlashCommandBuilder()
    .setName("hello")
    .setDescription("Hello World! Learn more about Riku.js");

  async run(
    interaction: Discord.ChatInputCommandInteraction & GuildInteraction
  ) {
    const response = await axios.get("https://web-rikuu.vercel.app/api/og", {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    const file = new Discord.AttachmentBuilder(buffer);

    return void (await interaction.reply({
      files: [file],
    }));
  }
}
