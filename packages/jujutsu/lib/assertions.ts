/* eslint-disable import/no-extraneous-dependencies */
import {
  ButtonStyle,
  ChannelType,
  type APIMessageComponentEmoji,
  Locale,
  type APIApplicationCommandOptionChoice,
  type LocalizationMap,
} from 'discord-api-types/v10'
import {
  StringSelectMenuOptionBuilder,
  ToAPIApplicationCommandOptions,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  ApplicationCommandOptionBase,
} from 'jujutsu/dist/compiled/discord.js/builders'

import { isSafeInteger } from 'jujutsu/dist/compiled/lodash'
import { z } from 'jujutsu/dist/compiled/zod'

export const customIdValidator = z.string().min(1).max(100)

export const emojiValidator = z
  .object({
    id: z.string(),
    name: z.string(),
    animated: z.boolean(),
  })
  .partial()
  .strict()

export const buttonLabelValidator = z.string().min(1).max(80)

export const buttonStyleValidator = z.nativeEnum(ButtonStyle)

export const placeholderValidator = z.string().max(150)

export const minMaxValidator = z.number().int().min(0).max(25)

export const labelValueDescriptionValidator = z.string().min(1).max(100)

export const jsonOptionValidator = z.object({
  label: labelValueDescriptionValidator,
  value: labelValueDescriptionValidator,
  description: labelValueDescriptionValidator.optional(),
  emoji: emojiValidator.optional(),
  default: z.boolean().optional(),
})

export const optionValidator = z.instanceof(StringSelectMenuOptionBuilder)

export const optionsValidator = optionValidator.array().min(0)

export const optionsLengthValidator = z.number().int().min(0).max(25)

export function validateRequiredSelectMenuParameters(
  options: StringSelectMenuOptionBuilder[],
  customId?: string
) {
  customIdValidator.parse(customId)
  optionsValidator.parse(options)
}

export const defaultValidator = z.boolean

export function validateRequiredSelectMenuOptionParameters(
  label?: string,
  value?: string
) {
  labelValueDescriptionValidator.parse(label)
  labelValueDescriptionValidator.parse(value)
}

export const channelTypesValidator = z.nativeEnum(ChannelType).array

export const urlValidator = z.string().url()

export function validateRequiredButtonParameters(
  style?: ButtonStyle,
  label?: string,
  emoji?: APIMessageComponentEmoji,
  customId?: string,
  url?: string
) {
  if (url && customId) {
    throw new RangeError('URL and custom id are mutually exclusive')
  }

  if (!label && !emoji) {
    throw new RangeError('Buttons must have a label and/or an emoji')
  }

  if (style === ButtonStyle.Link) {
    if (!url) {
      throw new RangeError('Link buttons must have a url')
    }
  } else if (url) {
    throw new RangeError('Non-link buttons cannot have a url')
  }
}

export const booleanPredicate = z.boolean()

export const slashCommand = {
  namePredicate: z
    .string()
    .min(1)
    .max(32)
    .regex(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u),
  descriptionPredicate: z.string().min(1).max(100),
  localePredicate: z.nativeEnum(Locale),
  maxArrayLengthPredicate: z.unknown().array().max(25),
  choicesLengthPredicate: z.number().max(25),
  localizationMapPredicate: z
    .object(
      Object.fromEntries(
        Object.values(Locale).map((locale) => [locale, z.string().nullish()])
      )
    )
    .strict()
    .nullish(),
  dmPermissionPredicate: z.boolean().nullish(),
  memberPermissionPredicate: z
    .union([
      z.bigint().transform((value) => value.toString()),
      z
        .number()
        .int()
        .refine((value) => isSafeInteger(value))
        .transform((value) => value.toString()),
      z.string().regex(/^\d+$/),
    ])
    .nullish(),
  validateName: function (name: unknown): asserts name is string {
    this.namePredicate.parse(name)
  },
  validateDescription: function (
    description: unknown
  ): asserts description is string {
    this.descriptionPredicate.parse(description)
  },
  validateLocale: function (locale: unknown) {
    return this.localePredicate.parse(locale)
  },
  validateMaxOptionsLength: function (
    options: unknown
  ): asserts options is ToAPIApplicationCommandOptions[] {
    this.maxArrayLengthPredicate.parse(options)
  },
  validateRequiredParameters: function (
    name: string,
    description: string,
    options: ToAPIApplicationCommandOptions[]
  ) {
    // Assert name matches all conditions
    // @ts-expect-error
    this.validateName(name)

    // Assert description conditions
    // @ts-expect-error
    this.validateDescription(description)

    // Assert options conditions
    // @ts-expect-error
    this.validateMaxOptionsLength(options)
  },
  validateChoicesLength: function (
    amountAdding: number,
    choices?: APIApplicationCommandOptionChoice[]
  ): void {
    this.choicesLengthPredicate.parse((choices?.length ?? 0) + amountAdding)
  },
  validateLocalizationMap: function (
    value: unknown
  ): asserts value is LocalizationMap {
    this.localizationMapPredicate.parse(value)
  },
  validateDMPermission: function (
    value: unknown
  ): asserts value is boolean | null | undefined {
    this.dmPermissionPredicate.parse(value)
  },
  validateDefaultMemberPermissions: function (permissions: unknown) {
    return this.memberPermissionPredicate.parse(permissions)
  },
  validateNSFW(value: unknown): asserts value is boolean {
    booleanPredicate.parse(value)
  },
  validateDefaultPermission: function (
    value: unknown
  ): asserts value is boolean {
    booleanPredicate.parse(value)
  },
  validateRequired: function (required: unknown): asserts required is boolean {
    booleanPredicate.parse(required)
  },
  assertReturnOfBuilder: function <
    T extends
      | ApplicationCommandOptionBase
      | SlashCommandSubcommandBuilder
      | SlashCommandSubcommandGroupBuilder
  >(input: unknown, ExpectedInstanceOf: new () => T): asserts input is T {
    z.instanceof(ExpectedInstanceOf).parse(input)
  },
}
