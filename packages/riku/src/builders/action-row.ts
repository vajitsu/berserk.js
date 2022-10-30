import * as Discord from "discord.js";

export default abstract class actionRow {
  public abstract components: Array<Discord.AnyComponentBuilder>;

  private row: Discord.ActionRowBuilder<Discord.AnyComponentBuilder> =
    new Discord.ActionRowBuilder();

  public build() {
    this.row.addComponents(this.components);
    return this.row as any;
  }
}
