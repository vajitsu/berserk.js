import {
  ChatInputCommandInteraction,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'jujutsu/dist/compiled/discord.js'
import { CommandFileComplete } from '../../../build'
import { DiscordConfig } from '../../../client/config-shared'
import bot from '../../bot'

function formData({
  name,
  description,
  dmPermission,
  defaultMemberPermissions,
  options,
  localizations,
}: CommandFileComplete) {
  const _ = new SlashCommandBuilder()
  _.setName(name)
  if (description) _.setDescription(description)
  if (dmPermission !== undefined) _.setDMPermission(dmPermission)
  if (defaultMemberPermissions !== undefined)
    _.setDefaultMemberPermissions(defaultMemberPermissions)
  if (localizations?.name) _.setNameLocalizations(localizations.name)
  if (localizations?.description)
    _.setDescriptionLocalizations(localizations.description)
  if (options)
    for (let _opt of options) {
      let opt = _opt as any
      switch (opt.type) {
        // Autocomplete, min & max length
        case String:
          _.addStringOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)
            if (opt.autoComplete !== undefined)
              i.setAutocomplete(opt.autoComplete)
            if (opt.minLength !== undefined) i.setMinLength(opt.minLength)
            if (opt.maxLength !== undefined) i.setMaxLength(opt.maxLength)

            return i
          })

          break

        // Nothing special
        case Boolean:
          _.addBooleanOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)

            return i
          })
          break

        // Autocomplete, min & max value
        case Number:
          _.addNumberOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)
            if (opt.autoComplete !== undefined)
              i.setAutocomplete(opt.autoComplete)
            if (opt.minValue !== undefined) i.setMinValue(opt.minValue)
            if (opt.maxValue !== undefined) i.setMaxValue(opt.maxValue)

            return i
          })
          break

        // Autocomplete, min & max value
        case 'Integer':
          _.addIntegerOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)
            if (opt.autoComplete !== undefined)
              i.setAutocomplete(opt.autoComplete)
            if (opt.minValue !== undefined) i.setMinValue(opt.minValue)
            if (opt.maxValue !== undefined) i.setMaxValue(opt.maxValue)

            return i
          })
          break

        // Nothing special
        case 'User':
          _.addUserOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)

            return i
          })
          break

        // Channel Types
        case 'Channel':
          _.addChannelOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)
            if (opt.channelTypes) i.addChannelTypes(opt.channelTypes)

            return i
          })
          break

        // Nothing special
        case 'Attachment':
          _.addAttachmentOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)

            return i
          })
          break

        // Nothing special
        case 'Role':
          _.addRoleOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)

            return i
          })
          break

        // Nothing special
        case 'Mentionable':
          _.addMentionableOption((i) => {
            i.setName(opt.name)
              .setDescriptionLocalizations(
                opt.localizations?.description || null
              )
              .setNameLocalizations(opt.localizations?.name || null)

            if (opt.description) i.setDescription(opt.description)

            return i
          })
          break
      }
    }

  return _.toJSON()
}

export default class SlashCommandManager {
  constructor(private instance: bot) {
    this.config = this.instance.getConfig(
      this.instance.client.token
    ) as DiscordConfig
  }

  private config: DiscordConfig

  private commands: { [name: string]: CommandFileComplete } = {}

  addCommand(command: CommandFileComplete) {
    this.commands[command.name] = command
  }

  getCommands() {
    return Object.values(this.commands)
  }

  getCommand(name: string) {
    return this.commands[name]
  }

  async runCommand(interaction: ChatInputCommandInteraction) {
    if (!interaction.command?.name) return

    const command = this.getCommand(interaction.command?.name)

    if (!command) return

    try {
      void command.default(interaction, this.instance.client)
    } catch (error) {
      void this.instance.events.emit('error', error)
    }
  }

  async registerCommands() {
    if (!this.instance?.client?.application) return

    const commands = this.getCommands().map((com) => formData(com))
    const rest = new REST().setToken(this.config.token)

    await rest.put(
      Routes.applicationCommands(this.instance?.client?.application.id),
      {
        body: commands,
      }
    )
  }
}
