import Discord from "discord.js";
import Utils from "../utils";
import { Bot } from "../dist";

type SlashCommandData = {
  nameLocalizations?: Discord.LocalizationMap;
  description: string;
  descriptionLocalizations?: Discord.LocalizationMap;
  defaultMemberPermissions?: Discord.Permissions | null;
  dmPermission?: boolean;
  subcommands?: Array<Discord.SlashCommandSubcommandBuilder>;
  subcommandGroups?: Array<Discord.SlashCommandSubcommandGroupBuilder>;
};

export function data({
  nameLocalizations,
  description,
  descriptionLocalizations,
  defaultMemberPermissions,
  dmPermission,
  subcommandGroups,
  subcommands,
}: SlashCommandData) {
  const command = new Discord.SlashCommandBuilder();

  command.setDescription(description);

  if (subcommands) for (const sub of subcommands) command.addSubcommand(sub);
  if (subcommandGroups)
    for (const sub of subcommandGroups) command.addSubcommandGroup(sub);

  if (nameLocalizations) command.setNameLocalizations(nameLocalizations);
  if (descriptionLocalizations)
    command.setDescriptionLocalizations(descriptionLocalizations);
  if (typeof dmPermission === "boolean") command.setDMPermission(dmPermission);
  if (typeof defaultMemberPermissions === "boolean")
    command.setDefaultMemberPermissions(defaultMemberPermissions);

  return command;
}

export default abstract class SlashCommand {
  public abstract data: Discord.RESTPostAPIChatInputApplicationCommandsJSONBody;

  public vanished = false;
  public interactive: false | string = false;
  private permissions: Discord.PermissionResolvable = [
    Discord.PermissionFlagsBits.SendMessages,
    Discord.PermissionFlagsBits.ViewChannel,
    Discord.PermissionFlagsBits.EmbedLinks,
  ];

  constructor(
    protected instance: Bot,
    permissions?: Discord.PermissionResolvable
  ) {
    if (permissions)
      this.permissions =
        new Discord.PermissionsBitField(this.permissions).bitfield |
        new Discord.PermissionsBitField(permissions).bitfield;
  }

  public abstract run(
    interaction: Discord.ChatInputCommandInteraction,
    bot: Bot,
    id?: string,
    unhookInteraction?: () => void
  ): Promise<void>;

  public calculatePermissions(
    interaction: Discord.ChatInputCommandInteraction
  ): Discord.PermissionResolvable {
    return this.permissions;
  }

  protected requireUserPemission(
    permission: Discord.PermissionResolvable,
    member: Discord.GuildMember,
    interaction: Discord.ChatInputCommandInteraction
  ) {
    if (!member.permissions.has(permission)) {
      const missing = new Discord.PermissionsBitField(permission);
      const identifiers = Utils.Permissions.getIdentifiers(missing);
      interaction.reply(
        "> **Permissions Error!**\n" +
          "You are missing the following permissions\n" +
          identifiers
            .map(Utils.Permissions.translate)
            .map((name) => `- \`${name}\``)
            .join("\n")
      );
    }
  }
}
