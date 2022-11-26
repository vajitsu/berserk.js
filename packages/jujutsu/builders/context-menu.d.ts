import Discord from 'discord.js'
import { Bot } from '../dist'

declare type ContextMenuData = {
  nameLocalizations?: Discord.LocalizationMap
  defaultMemberPermissions?: Discord.Permissions | null
  dmPermission?: boolean
  type: Discord.ContextMenuCommandType
}
declare function ContextMenuData({
  nameLocalizations,
  defaultMemberPermissions,
  dmPermission,
}: ContextMenuData): Discord.ContextMenuCommandBuilder
declare abstract class ContextMenu {
  abstract data: Discord.ContextMenuCommandBuilder
  abstract run(
    interaction: Discord.ContextMenuCommandInteraction,
    bot: Bot
  ): Promise<void>
}

export { ContextMenuData, ContextMenu as default }
