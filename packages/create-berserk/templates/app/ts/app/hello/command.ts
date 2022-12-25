export const description = 'Say hello!'

import { DiscordJsInteraction } from 'berserk'

export default async function Hello(interaction: DiscordJsInteraction) {
  interaction.reply(`Hello, ${interaction.user?.tag}`)
}
