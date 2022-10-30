import Utils, { GuildInteraction } from "utils";
import * as Discord from "discord.js";
import { bot } from "index";

/**
 * Create a `command` instance that can be used within the **Riku.js** command manager
 *
 * ```js
 * class ping extends command {
 *   name: "ping";
 *   data: new riku.Discord.SlashCommandBuiler()
 *     .setName("ping")
 *     .setDescription("Recieve a 'pong'");
 *   async run(i) {
 *     i.reply("pong")
 *   }
 * }
 * ```
 */
export default abstract class command {
  public abstract name: string;
  public abstract data: Discord.SlashCommandBuilder;

  public vanished = false;
  public interactive: false | string = false;
  private permissions: Discord.PermissionResolvable = [
    Discord.PermissionFlagsBits.SendMessages,
    Discord.PermissionFlagsBits.ViewChannel,
    Discord.PermissionFlagsBits.EmbedLinks,
  ];

  constructor(
    protected instance: bot,
    permissions?: Discord.PermissionResolvable
  ) {
    if (permissions)
      this.permissions =
        new Discord.PermissionsBitField(this.permissions).bitfield |
        new Discord.PermissionsBitField(permissions).bitfield;
  }

  public abstract run(
    interaction: Discord.ChatInputCommandInteraction & GuildInteraction,
    id: string,
    unhookInteraction: () => void
  ): Promise<void>;

  public async calculatePermissions(
    interaction: Discord.ChatInputCommandInteraction & GuildInteraction
  ): Promise<Discord.PermissionResolvable> {
    return this.permissions;
  }

  protected requireUserPemission(
    permission: Discord.PermissionResolvable,
    member: Discord.GuildMember,
    interaction: Discord.ChatInputCommandInteraction & GuildInteraction
  ) {
    if (!member.permissions.has(permission)) {
      const missing = new Discord.PermissionsBitField(permission);
      const identifiers = Utils.permissions.getIdentifiers(missing);
      interaction.reply(
        "> **Permissions Error!**\n" +
          "You are missing the following permissions\n" +
          identifiers
            .map(Utils.permissions.translate)
            .map((name) => `- \`${name}\``)
            .join("\n")
      );
    }
  }
}
