import { GuildInteraction } from "utils";
import * as Discord from "discord.js"
import command from "command"

export default class helloCommand extends command {
    name = "hello"
    data = new Discord.SlashCommandBuilder()
        .setName("hello")
        .setDescription("Hello World! Learn more about mizu.js");
    
    async run(
        interaction: Discord.ChatInputCommandInteraction & GuildInteraction
    ) {
        const embed: Discord.EmbedData = {
            color: 0xE44D2E,
            title: "Welcome to Mizu.js!",
            description: "Get started by editing `commands/hello.ts`"
        };
        return void (await interaction.reply({
            embeds: [embed as any]
        }))
    } 
}