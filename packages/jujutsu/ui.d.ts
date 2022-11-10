import Discord from 'discord.js';

declare abstract class ActionRow {
  abstract components: Array<Discord.AnyComponentBuilder>;
  private row;
  build(): any;
}

declare abstract class Button {
  /**
   * Automatically generated id using UUID (v4) -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#custom_id)
   */
  readonly id: string;
  /**
   * The text display on your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#label)
   */
  abstract readonly label: string;
  /**
   * Esstentially the background color of your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle)
   */
  abstract readonly style: Discord.ButtonStyle;
  /** Whether or not users will be able to interact with the button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#disabled)
   */
  readonly disabled?: boolean;
  /**
   * Attachs an emoji to the left side of your button -
   * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#emoji)
   */
  readonly emoji?: Discord.ComponentEmojiResolvable;
  readonly url?: string;
  private button;
  /**
   * Builds your button and returns the output -
   * [Learn More](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId)
   */
  build(): Discord.ButtonBuilder;
}

declare const ui: {
  ActionRow: typeof ActionRow;
  Button: typeof Button;
};

export { ui as default };
