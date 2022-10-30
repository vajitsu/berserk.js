import * as Discord from "discord.js";
import { v4 as uuidv4 } from "uuid";

export default abstract class button {
  /**
   * Automatically generated id using UUID (v4) -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#custom_id)
   */
  readonly id: string = uuidv4();

  /**
   * The text display on your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#label)
   */
  public abstract readonly label: string;

  /**
   * Esstentially the background color of your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle)
   */
  public abstract readonly style: Discord.ButtonStyle;

  /** Whether or not users will be able to interact with the button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#disabled)
   */
  public readonly disabled?: boolean = false;

  /**
   * Attachs an emoji to the left side of your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#emoji)
   */
  public readonly emoji?: Discord.ComponentEmojiResolvable = undefined;

  public readonly url?: string = undefined;

  private button: Discord.ButtonBuilder = new Discord.ButtonBuilder();

  /**
   * Builds your button and returns the output -
   * [Learn More](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId)
   */
  public build() {
    this.button.setLabel(this.label).setStyle(this.style);
    if (this.disabled) this.button.setDisabled(this.disabled);
    if (this.emoji) this.button.setEmoji(this.emoji);
    if (this.url) this.button.setURL(this.url);
    else this.button.setCustomId(this.id);
    return this.button;
  }
}
