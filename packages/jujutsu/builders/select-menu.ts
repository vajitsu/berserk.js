import Discord from "discord.js";

export default abstract class SelectMenu {
  public abstract id: string;
  public abstract placeholder: string;

  public disabled?: boolean;
  public maxValues?: number;
  public minValues?: number;

  public abstract options: Discord.RestOrArray<
    | Discord.SelectMenuComponentOptionData
    | Discord.APISelectMenuOption
    | Discord.SelectMenuOptionBuilder
  >;

  private selectMenu = new Discord.SelectMenuBuilder();

  public build() {
    this.selectMenu.setCustomId(this.id);
    this.selectMenu.setPlaceholder(this.placeholder);
    this.selectMenu.setDisabled(this.disabled || false);
    this.selectMenu.setOptions(...this.options);
    if (typeof this.maxValues === "number")
      this.selectMenu.setMaxValues(this.maxValues);
    if (typeof this.minValues === "number")
      this.selectMenu.setMinValues(this.minValues);
    return this.selectMenu;
  }
}
