import Discord from "discord.js";

export default abstract class ActionRow {
  public abstract components: Array<Discord.AnyComponentBuilder>;

  private row: Discord.ActionRowBuilder<Discord.AnyComponentBuilder> =
    new Discord.ActionRowBuilder();

  public build() {
    this.row.addComponents(this.components);
    return this.row as
      | Discord.JSONEncodable<
          Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>
        >
      | Discord.ActionRowData<
          | Discord.MessageActionRowComponentData
          | Discord.MessageActionRowComponentBuilder
        >
      | Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>;
  }
}
