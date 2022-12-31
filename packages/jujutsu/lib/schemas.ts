/* eslint-disable import/no-extraneous-dependencies */
import {
  Client,
  Events,
  ChatInputCommandInteraction,
} from 'jujutsu/dist/compiled/discord.js'
import { z } from 'jujutsu/dist/compiled/zod'

export const discordJs = {
  client: z.instanceof(Client),
  channelTypes: z.number().positive().min(0).max(15),
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
  options: z
    .array(
      z.object({
        name: z
          .string({
            required_error: 'The option name is a required field',
            invalid_type_error: 'The option name must be a string type',
          })
          .min(1, {
            message: 'Must be longer than or equal to 1 character',
          })
          .max(32, {
            message: 'Must be less than or equal to 32 characters',
          }),
        description: z
          .string({
            required_error: 'The option description is a required field',
            invalid_type_error: 'The option name must be a string type',
          })
          .min(1, {
            message: 'Must be longer than or equal to 1 character',
          })
          .max(100, {
            message: 'Must be less than or equal to 100 characters',
          }),
        minLength: z
          .number({
            invalid_type_error: 'The `minLength` field must be a number',
          })
          .positive('Minimum length must be a postive number')
          .optional(),
        maxLength: z
          .number({
            invalid_type_error: 'The `maxLength` field must be a number',
          })
          .positive('Maximum length must be a postive number')
          .optional(),
        minValue: z
          .number({
            invalid_type_error: 'The `minValue` field must be a number',
          })
          .positive('Minimum value must be a postive number')
          .optional(),
        maxValue: z
          .number({
            invalid_type_error: 'The `maxValue` field must be a number',
          })
          .positive('Maximum value must be a postive number')
          .optional(),
        channelTypes: z.array(discordJs.channelTypes).optional(),
        required: z.boolean().optional().default(false),
        type: z
          .string({
            required_error: 'The option type is a required field',
            invalid_type_error: 'The option type must be of type string',
          })
          .regex(
            /^(?:string|boolean|number|integer|attachment|channel|role|user|mentionable)$/,
            `The option type must be one of the values: ${[
              'string',
              'boolean',
              'number',
              'integer',
              'attachmemt',
              'channel',
              'role',
              'user',
              'mentionable',
            ]
              .map((val) => `\`${val}\``)
              .join(', ')}`
          ),
      })
    )
    .default([])
    .optional(),
  nsfw: z.boolean().optional().default(false),
}

export interface CommandFile {
  name: string
  description: string
  dmPermission: boolean
  nsfw: boolean
  options: {
    name:
      | 'string'
      | 'boolean'
      | 'number'
      | 'integer'
      | 'attachment'
      | 'channel'
      | 'role'
      | 'user'
      | 'mentionable'
    description: string
    minLength?: number
    maxLength?: number
    minValue?: number
    maxValue?: number
    required: boolean
  }[]
  fn: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => void | Promise<void>
}

export const commandFile = z.object({
  ...slashCommand,
  // middleware: z
  //   .function()
  //   .args(z.object({ interaction: z.any(), client: discordJs.client })),
  fn: z
    .function()
    .args(z.object({ interaction: z.any(), client: discordJs.client }))
    .returns(z.void().promise().or(z.void())),
})

export interface SubcommandFile {
  name: string
  description: string
  fn: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => void | Promise<void>
}

export const subcommandFile = z.object({
  name: slashCommand.name,
  description: slashCommand.description,
  fn: z
    .function()
    .args(
      z.object({
        client: discordJs.client,
        interaction: z.any(),
      })
    )
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
  fn: z.function().returns(z.void().promise().or(z.void())),
})
