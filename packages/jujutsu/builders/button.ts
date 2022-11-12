import Discord from "discord.js";

export default abstract class Button {
  abstract id: string;

  /**
   * The text display on your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#label)
   */
  public abstract label: string;

  /**
   * Esstentially the background color of your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle)
   */
  public abstract style:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "link";

  /** Whether or not users will be able to interact with the button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#disabled)
   */
  public disabled?: boolean = false;

  /**
   * Attachs an emoji to the left side of your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#emoji)
   */
  public emoji?: Discord.ComponentEmojiResolvable = undefined;

  public url?: string = undefined;

  private button: Discord.ButtonBuilder = new Discord.ButtonBuilder();

  /**
   * Builds your button and returns the output -
   * [Learn More](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId)
   */
  public build() {
    this.button.setLabel(this.label);
    if (this.disabled) this.button.setDisabled(this.disabled);
    if (this.emoji) this.button.setEmoji(this.emoji);
    if (this.url) this.button.setURL(this.url);
    else this.button.setCustomId(this.id);

    switch (this.style) {
      case "primary":
        this.button.setStyle(1);
        break;
      case "secondary":
        this.button.setStyle(2);
        break;
      case "success":
        this.button.setStyle(3);
        break;
      case "danger":
        this.button.setStyle(4);
        break;
      case "link":
        this.button.setStyle(5);
        break;
    }

    return this.button;
  }
}
