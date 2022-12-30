import {
  Awaitable,
  ChatInputCommandInteraction,
  Client,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'jujutsu/dist/compiled/discord.js'

export interface SubCommandComplete {
  name: string
  description: string
  fn: (props: {
    interaction: ChatInputCommandInteraction
    client: Client
  }) => Promise<void> | void
}

export interface CommandComplete {
  name: string
  description: string
  nsfw: boolean
  dmPermission: boolean
  defaultMemberPermission: number | bigint | null
  subcommands: SubCommandComplete[]
  options: {
    type:
      | 'string'
      | 'boolean'
      | 'number'
      | 'integer'
      | 'attachment'
      | 'channel'
      | 'role'
      | 'user'
      | 'mentionable'
    name: string
    description: string
    minLength?: number
    maxLength?: number
    minValue?: number
    maxValue?: number
    required?: boolean
  }[]
  fn: (props: {
    interaction: ChatInputCommandInteraction
    client: Client
  }) => Promise<void> | void
}

export interface EventComplete {
  name: string
  fn: (client: Client, ...args: any) => Awaitable<void>
}
