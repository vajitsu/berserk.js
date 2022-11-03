import helloActionRow from "@/presets/action-rows/hello";
import command from "@/managers/commands/command";
import { GuildInteraction } from "@/utils/index";
import * as Discord from "discord.js";
import axios from "axios";
import path from "path";
import fs from "fs";

export default class helloCommand extends command {
  name = "hello";
  data = new Discord.SlashCommandBuilder()
    .setName("hello")
    .setDescription("Hello World! Learn more about Riku.js");

  async run(
    interaction: Discord.ChatInputCommandInteraction & GuildInteraction
  ) {
    const response = await axios.get(
      `https://vajitsu.com/api/og${
        fs.existsSync(path.join(process.cwd(), "index.ts"))
          ? "?typescript=yes"
          : ""
      }`,
      {
        responseType: "arraybuffer",
      }
    );
    const buffer = Buffer.from(response.data, "utf-8");
    const file = new Discord.AttachmentBuilder(buffer);

    const row = new helloActionRow().build();

    return void (await interaction.reply({
      files: [file],
      components: [row],
    }));
  }
}
