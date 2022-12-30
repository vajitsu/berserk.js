/* eslint-disable import/no-extraneous-dependencies */
import {
  AttachmentBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'jujutsu/dist/compiled/discord.js'
import isError from '../../lib/is-error'
import bot from '../bot'
import * as Log from '../../build/output/log'
import { CommandComplete, SubCommandComplete } from '../../build/types'
import assignDefaults from '../lib/assign-defaults'
import { isNumber } from 'jujutsu/dist/compiled/lodash'
import fetch from 'jujutsu/dist/compiled/node-fetch'

const Options = {
  string(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      minLength,
      maxLength,
      required = false,
    }: {
      name: string
      description: string
      minLength?: number | undefined
      maxLength?: number | undefined
      required: boolean
    }
  ) {
    builder.addStringOption((input) => {
      input.setName(name).setRequired(required)
      input.setDescription(description)
      if (isNumber(minLength)) input.setMinLength(minLength)
      if (isNumber(maxLength)) input.setMaxLength(maxLength)
      return input
    })
  },
  boolean(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      required = false,
    }: {
      name: string
      description: string
      required: boolean
    }
  ) {
    builder.addBooleanOption((input) =>
      input.setName(name).setDescription(description).setRequired(required)
    )
  },
  number(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      minValue,
      maxValue,
      required = false,
    }: {
      name: string
      description: string
      minValue?: number | undefined
      maxValue?: number | undefined
      required: boolean
    }
  ) {
    builder.addNumberOption((input) => {
      input.setName(name).setDescription(description).setRequired(required)
      if (isNumber(minValue)) input.setMinValue(minValue)
      if (isNumber(maxValue)) input.setMaxValue(maxValue)
      return input
    })
  },
  integer(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      minValue,
      maxValue,
      required = false,
    }: {
      name: string
      description: string
      minValue?: number | undefined
      maxValue?: number | undefined
      required: boolean
    }
  ) {
    builder.addIntegerOption((input) => {
      input.setName(name).setDescription(description).setRequired(required)
      if (isNumber(minValue)) input.setMinValue(minValue)
      if (isNumber(maxValue)) input.setMaxValue(maxValue)
      return input
    })
  },
  attachment(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      required = false,
    }: {
      name: string
      description: string
      required: boolean
    }
  ) {
    builder.addAttachmentOption((input) =>
      input.setName(name).setDescription(description).setRequired(required)
    )
  },
  channel(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      required = false,
      channelTypes,
    }: {
      name: string
      description: string
      required: boolean
      channelTypes: (
        | ChannelType.GuildText
        | ChannelType.GuildVoice
        | ChannelType.GuildCategory
        | ChannelType.GuildAnnouncement
        | ChannelType.AnnouncementThread
        | ChannelType.PublicThread
        | ChannelType.PrivateThread
        | ChannelType.GuildStageVoice
        | ChannelType.GuildForum
      )[]
    }
  ) {
    builder.addChannelOption((input) => {
      input.setName(name).setDescription(description).setRequired(required)
      if (channelTypes.length > 0) input.addChannelTypes(...channelTypes)
      return input
    })
  },
  role(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      required = false,
    }: {
      name: string
      description: string
      required: boolean
    }
  ) {
    builder.addRoleOption((input) =>
      input.setName(name).setDescription(description).setRequired(required)
    )
  },
  user(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      required = false,
    }: {
      name: string
      description: string
      required: boolean
    }
  ) {
    builder.addUserOption((input) =>
      input.setName(name).setDescription(description).setRequired(required)
    )
  },
  mentionable(
    builder: SlashCommandBuilder,
    {
      name,
      description,
      required = false,
    }: {
      name: string
      description: string
      required: boolean
    }
  ) {
    builder.addMentionableOption((input) =>
      input.setName(name).setDescription(description).setRequired(required)
    )
  },
}

function formData({
  name,
  description,
  dmPermission,
  defaultMemberPermission,
  subcommands,
  options,
}: CommandComplete) {
  const slash_command = new SlashCommandBuilder()
  slash_command.setName(name)
  slash_command.setDescription(description)
  slash_command.setDMPermission(dmPermission)
  slash_command.setDefaultMemberPermissions(defaultMemberPermission)
  for (let option of options) {
    Options[option.type](slash_command, option as any)
  }

  for (let command of subcommands) {
    slash_command.addSubcommand((subcommand) =>
      subcommand.setName(command.name).setDescription(command.description)
    )
  }

  /*
  if (localizations?.name) _.setNameLocalizations(localizations.name)
  if (localizations?.description)
    _.setDescriptionLocalizations(localizations.description)
  // if (options && options.length > 0)
  //   for (let _opt of options) {
  //     let opt = _opt as any
  //     // eslint-disable-next-line default-case
  //     switch (opt.type) {
  //       // Autocomplete, min & max length
  //       case String:
  //         _.addStringOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)
  //           if (opt.autoComplete !== undefined)
  //             i.setAutocomplete(opt.autoComplete)
  //           if (opt.minLength !== undefined) i.setMinLength(opt.minLength)
  //           if (opt.maxLength !== undefined) i.setMaxLength(opt.maxLength)

  //           return i
  //         })

  //         break

  //       // Nothing special
  //       case Boolean:
  //         _.addBooleanOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)

  //           return i
  //         })
  //         break

  //       // Autocomplete, min & max value
  //       case Number:
  //         _.addNumberOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)
  //           if (opt.autoComplete !== undefined)
  //             i.setAutocomplete(opt.autoComplete)
  //           if (opt.minValue !== undefined) i.setMinValue(opt.minValue)
  //           if (opt.maxValue !== undefined) i.setMaxValue(opt.maxValue)

  //           return i
  //         })
  //         break

  //       // Autocomplete, min & max value
  //       case 'Integer':
  //         _.addIntegerOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)
  //           if (opt.autoComplete !== undefined)
  //             i.setAutocomplete(opt.autoComplete)
  //           if (opt.minValue !== undefined) i.setMinValue(opt.minValue)
  //           if (opt.maxValue !== undefined) i.setMaxValue(opt.maxValue)

  //           return i
  //         })
  //         break

  //       // Nothing special
  //       case 'User':
  //         _.addUserOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)

  //           return i
  //         })
  //         break

  //       // Channel Types
  //       case 'Channel':
  //         _.addChannelOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)
  //           if (opt.channelTypes) i.addChannelTypes(opt.channelTypes)

  //           return i
  //         })
  //         break

  //       // Nothing special
  //       case 'Attachment':
  //         _.addAttachmentOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)

  //           return i
  //         })
  //         break

  //       // Nothing special
  //       case 'Role':
  //         _.addRoleOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)

  //           return i
  //         })
  //         break

  //       // Nothing special
  //       case 'Mentionable':
  //         _.addMentionableOption((i) => {
  //           i.setName(opt.name)
  //             .setDescriptionLocalizations(
  //               opt.localizations?.description || null
  //             )
  //             .setNameLocalizations(opt.localizations?.name || null)

  //           if (opt.description) i.setDescription(opt.description)

  //           return i
  //         })
  //         break
  //     }
  //   }
  if (subcommands && subcommands.length > 0)
    // eslint-disable-next-line no-loop-func
    for (let _opt of subcommands)
      _.addSubcommand((_i) => {
        _i.setName(_opt.name)
          .setDescriptionLocalizations(_opt.localizations?.description || null)
          .setNameLocalizations(_opt.localizations?.name || null)

        if (_opt.description) _i.setDescription(_opt.description)

        if (_opt.options && _opt.options.length > 0)
          for (let __opt of _opt.options) {
            let opt = __opt as any
            // eslint-disable-next-line default-case
            switch (opt.type) {
              // Autocomplete, min & max length
              case String:
                _i.addStringOption((is) => {
                  is.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) is.setDescription(opt.description)
                  if (opt.autoComplete !== undefined)
                    is.setAutocomplete(opt.autoComplete)
                  if (opt.minLength !== undefined)
                    is.setMinLength(opt.minLength)
                  if (opt.maxLength !== undefined)
                    is.setMaxLength(opt.maxLength)

                  return is
                })

                break

              // Nothing special
              case Boolean:
                _i.addBooleanOption((ib) => {
                  ib.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) ib.setDescription(opt.description)

                  return ib
                })
                break

              // Autocomplete, min & max value
              case Number:
                _i.addNumberOption((in_) => {
                  in_
                    .setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) in_.setDescription(opt.description)
                  if (opt.autoComplete !== undefined)
                    in_.setAutocomplete(opt.autoComplete)
                  if (opt.minValue !== undefined) in_.setMinValue(opt.minValue)
                  if (opt.maxValue !== undefined) in_.setMaxValue(opt.maxValue)

                  return in_
                })
                break

              // Autocomplete, min & max value
              case 'Integer':
                _i.addIntegerOption((it) => {
                  it.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) it.setDescription(opt.description)
                  if (opt.autoComplete !== undefined)
                    it.setAutocomplete(opt.autoComplete)
                  if (opt.minValue !== undefined) it.setMinValue(opt.minValue)
                  if (opt.maxValue !== undefined) it.setMaxValue(opt.maxValue)

                  return it
                })
                break

              // Nothing special
              case 'User':
                _i.addUserOption((iu) => {
                  iu.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) iu.setDescription(opt.description)

                  return iu
                })
                break

              // Channel Types
              case 'Channel':
                _i.addChannelOption((ic) => {
                  ic.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) ic.setDescription(opt.description)
                  if (opt.channelTypes) ic.addChannelTypes(opt.channelTypes)

                  return ic
                })
                break

              // Nothing special
              case 'Attachment':
                _i.addAttachmentOption((ia) => {
                  ia.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) ia.setDescription(opt.description)

                  return ia
                })
                break

              // Nothing special
              case 'Role':
                _i.addRoleOption((ir) => {
                  ir.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) ir.setDescription(opt.description)

                  return ir
                })
                break

              // Nothing special
              case 'Mentionable':
                _i.addMentionableOption((im) => {
                  _i.setName(opt.name)
                    .setDescriptionLocalizations(
                      opt.localizations?.description || null
                    )
                    .setNameLocalizations(opt.localizations?.name || null)

                  if (opt.description) im.setDescription(opt.description)

                  return im
                })
                break
            }
          }

        return _i
      })
  */

  return slash_command.toJSON()
}

export default class SlashCommandManager {
  constructor(private instance: bot) {}

  private commands: {
    [name: string]: CommandComplete
  } = {}

  addCommand(command: {
    name: string
    absolutePath: string
    subcommands: { name: string; absolutePath: string }[]
  }) {
    const mod = require(command.absolutePath)
    this.commands[command.name] = assignDefaults('command', {
      name: command.name,
      description: mod.description,
      fn: mod.default || mod,
      nsfw: mod.nsfw,
      dmPermission: mod.dmPermission,
      defaultMemberPermission: mod.defaultMemberPermission,
      options: mod.options,
      subcommands:
        command.subcommands.length > 0
          ? command.subcommands
              .map((sub) => [sub.name, require(sub.absolutePath)])
              .map((sub) => ({
                name: sub[0],
                description: sub[1].description,
                fn: sub[1].default || sub[1],
              }))
          : [],
    }) as CommandComplete
  }

  getCommands() {
    return Object.values(this.commands)
  }

  getCommand(name: string) {
    return this.commands[name]
  }

  async runCommand(interaction: ChatInputCommandInteraction) {
    if (!interaction.commandName) return

    const command = this.getCommand(interaction.commandName)

    if (!command) return

    try {
      if (command.subcommands.length > 0) {
        const subCommandName = interaction.options.getSubcommand()
        const subcommand = command.subcommands.find(
          (sub) => sub.name === subCommandName
        ) as SubCommandComplete

        return void (await subcommand.fn({
          interaction,
          client: this.instance.client,
        }))
      } else {
        return void (await command.fn({
          interaction,
          client: this.instance.client,
        }))
      }
    } catch (error) {
      if (isError(error)) {
        const url = new URL('https://jujutsujs.vercel.app/api/og')
        url.searchParams.set('context', 'An error has occurred.')
        url.searchParams.set('content', error.message)

        const res = await fetch(url)

        if (res.ok) {
          const image = new AttachmentBuilder(
            Buffer.from(await res.arrayBuffer())
          )

          interaction
            .reply({
              files: [image.attachment],
              ephemeral: true,
            })
            .then(() => this.instance.events.emit('error', error))
        }
      } else return void this.instance.events.emit('error', error)
    }
  }

  async registerCommands() {
    try {
      if (!this.instance?.client?.application) return

      const commands = this.getCommands().map((com) => formData(com))

      const rest = new REST().setToken(this.instance.config.token as string)

      await rest.put(
        Routes.applicationCommands(this.instance?.client?.application.id),
        {
          body: commands,
        }
      )
    } catch (error) {
      if (isError(error)) this.instance.client.emit('error', error)
      else Log.error(error)
    }
  }
}
