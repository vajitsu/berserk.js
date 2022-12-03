export const description = 'Say hello!'

import { JujutsuInteraction, JujutsuCommand } from 'jujutsu'

export default async function Hello(
  interaction: JujutsuInteraction
): JujutsuCommand {
  interaction.reply(`Hello, ${interaction.user?.tag}`)
}