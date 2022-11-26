import Discord from 'discord.js'
import { Bot } from '../dist'

declare type SelectMenuData = {
  placeholder: string
  disabled?: boolean
  maxValues?: number
  minValues?: number
  options?: Discord.SelectMenuComponentOptionData[]
}
declare function SelectMenuData(
  data: SelectMenuData
): Partial<Discord.APISelectMenuComponent>
declare abstract class SelectMenu {
  abstract data: Partial<Discord.APISelectMenuComponent>
  abstract run(
    interaction: Discord.SelectMenuInteraction,
    bot: Bot
  ): Promise<void>
}

export { SelectMenuData, SelectMenu as default }
