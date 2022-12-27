/* eslint-disable import/no-extraneous-dependencies */
import {
  Client,
  Events,
  ChatInputCommandInteraction,
} from 'jujutsu/dist/compiled/discord.js'
import { z } from 'jujutsu/dist/compiled/zod'

export const discordJs = {
  client: z.instanceof(Client),
}

export const slashCommand = {
  name: z
    .string()
    .min(1, {
      message: 'Must be longer than or equal to 1 character',
    })
    .max(32, {
      message: 'Must be less than or equal to 32 characters',
    }),
  description: z
    .string({
      required_error: 'This is a required export',
    })
    .min(1, {
      message: 'Must be longer than or equal to 1 character',
    })
    .max(100, {
      message: 'Must be less than or equal to 100 characters',
    }),
  dmPermission: z.boolean().default(false),
  defaultMemberPermission: z
    .bigint({
      invalid_type_error:
        'Default member permission must be a bigint or number',
    })
    .or(
      z.number({
        invalid_type_error:
          'Default member permission must be a bigint or number',
      })
    )
    .nullable()
    .default(null),
  nsfw: z.boolean().optional().default(false),
}

export interface CommandFile {
  name: string
  description: string
  dmPermission: boolean
  nsfw: boolean
  fn: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => void | Promise<void>
}

export const commandFile = z.object({
  ...slashCommand,
  fn: z
    .function()
    .args(z.unknown(), discordJs.client)
    .returns(z.void().promise().or(z.void())),
})

export interface EventFile {
  name: string
  fn: (client: Client) => void | Promise<void>
}

export const eventFile = z.object({
  name: z.nativeEnum(Events, {
    invalid_type_error: 'Event does not exist on list of available events',
    required_error: "The event's name is a required field",
  }),
  fn: z
    .function()
    .args(discordJs.client)
    .returns(z.void().promise().or(z.void())),
})
