import Discord from "discord.js";
import { Bot } from "../dist";

type ContextMenuData = {
  nameLocalizations?: Discord.LocalizationMap;
  defaultMemberPermissions?: Discord.Permissions | null;
  dmPermission?: boolean;
  type: Discord.ContextMenuCommandType;
};

export function ContextMenuData({
  nameLocalizations,
  defaultMemberPermissions,
  dmPermission,
}: ContextMenuData) {
  const _ = new Discord.ContextMenuCommandBuilder();
  if (nameLocalizations) _.setNameLocalizations(nameLocalizations);
  if (typeof dmPermission === "boolean") _.setDMPermission(dmPermission);
  if (typeof defaultMemberPermissions === "boolean")
    _.setDefaultMemberPermissions(defaultMemberPermissions);

  return _;
}

export default abstract class ContextMenu {
  abstract data: Discord.ContextMenuCommandBuilder;

  abstract run(
    interaction: Discord.ContextMenuCommandInteraction,
    bot: Bot
  ): Promise<void>;
}
