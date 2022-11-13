import Discord from "discord.js";
import type { Bot } from "../dist";

declare type SlashCommandData = {
  nameLocalizations?: Discord.LocalizationMap;
  description: string;
  descriptionLocalizations?: Discord.LocalizationMap;
  defaultMemberPermissions?: Discord.Permissions | null;
  dmPermission?: boolean;
  subcommands?: Array<Discord.SlashCommandSubcommandBuilder>;
  subcommandGroups?: Array<Discord.SlashCommandSubcommandGroupBuilder>;
};
declare function data({
  nameLocalizations,
  description,
  descriptionLocalizations,
  defaultMemberPermissions,
  dmPermission,
  subcommandGroups,
  subcommands,
}: SlashCommandData): Discord.SlashCommandBuilder;
declare abstract class SlashCommand {
  protected instance: Bot;
  abstract data: Discord.RESTPostAPIChatInputApplicationCommandsJSONBody;
  vanished: boolean;
  interactive: false | string;
  private permissions;
  constructor(instance: Bot, permissions?: Discord.PermissionResolvable);
  abstract run(
    interaction: Discord.ChatInputCommandInteraction,
    bot: Discord.Client<true>,
    id?: string,
    unhookInteraction?: () => void
  ): Promise<void>;
  calculatePermissions(
    interaction: Discord.ChatInputCommandInteraction
  ): Discord.PermissionResolvable;
  protected requireUserPemission(
    permission: Discord.PermissionResolvable,
    member: Discord.GuildMember,
    interaction: Discord.ChatInputCommandInteraction
  ): void;
}

export { data, SlashCommand as default };
