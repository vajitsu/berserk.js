import {
  ChatInputCommandInteraction,
  Client,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'jujutsu/dist/compiled/discord.js'

export interface CommandComplete {
  name: string
  description: string
  nsfw: boolean
  dmPermission: boolean
  fn: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => Promise<void> | void
}

export interface EventCompelte {
  name: string
  fn: (client: Client) => Promise<void> | void
}
