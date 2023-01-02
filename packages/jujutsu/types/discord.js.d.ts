import { ChatInputCommandInteraction as Interaction, Client } from 'discord.js'

interface CommandProps {
  interaction: Interaction
  client: Client
}
export { CommandProps, Interaction, Client }
