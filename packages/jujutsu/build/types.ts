import {
  ChatInputCommandInteraction,
  Client,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'jujutsu/dist/compiled/discord.js'

export interface SubCommandComplete {
  name: string
  description: string
  fn: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => Promise<void> | void
}

export interface CommandComplete {
  name: string
  description: string
  nsfw: boolean
  dmPermission: boolean
  defaultMemberPermission: number | bigint | null
  subcommands: SubCommandComplete[]
  fn: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => Promise<void> | void
}

export interface EventComplete {
  name: string
  fn: (client: Client) => Promise<void> | void
}
