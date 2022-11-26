import Discord from 'discord.js'

declare abstract class ActionRow {
  abstract components: Array<Discord.AnyComponentBuilder>
  private row
  build():
    | Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>
    | Discord.JSONEncodable<
        Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>
      >
    | Discord.ActionRowData<
        | Discord.MessageActionRowComponentBuilder
        | Discord.MessageActionRowComponentData
      >
}

export { ActionRow as default }
