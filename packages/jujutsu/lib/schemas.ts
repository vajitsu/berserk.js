/* eslint-disable import/no-extraneous-dependencies */
import { Client, Events } from 'jujutsu/dist/compiled/discord.js'
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
  dmPermission: z.boolean().default(true),
  nsfw: z.boolean().optional().default(false),
}

export interface CommandFile {
  name: string
  description: string
  dmPermission: boolean
  nsfw: boolean
  fn: () => void | Promise<void>
}

export const commandFile = z.object({
  ...slashCommand,
  fn: z.function().args().returns(z.void()),
})

export interface EventFile {
  name: string
  fn: () => void | Promise<void>
}

export const eventFile = z.object({
  name: z.nativeEnum(Events, {
    invalid_type_error: 'Event does not exist on list of available events',
    required_error: "The event's name is a required field",
  }),
  fn: z.function().args().returns(z.void()),
})
