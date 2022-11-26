import Discord from 'discord.js'
import { Bot } from '../dist'

type SelectMenuData = {
  placeholder: string
  disabled?: boolean
  maxValues?: number
  minValues?: number
  options?: Discord.SelectMenuComponentOptionData[]
}

export function SelectMenuData(data: SelectMenuData) {
  const _ = new Discord.SelectMenuBuilder(data)
  return _.data
}

export default abstract class SelectMenu {
  abstract data: Partial<Discord.APISelectMenuComponent>

  abstract run(
    interaction: Discord.SelectMenuInteraction,
    bot: Bot
  ): Promise<void>
}
