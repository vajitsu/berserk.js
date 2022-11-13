import Discord from "discord.js";
import { Bot } from "src";

export type URLButton = {
  label: string;
  style: "link";
  disabled?: boolean;
  emoji?: Discord.ComponentEmojiResolvable;
  url: string;
};

export type ButtonData = {
  label: string;
  style: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  emoji?: Discord.ComponentEmojiResolvable;
};

export function ButtonData(
  data: ButtonData
): Partial<Discord.APIButtonComponentWithCustomId> {
  const button = new Discord.ButtonBuilder();

  switch (data.style) {
    case "primary":
      button.setStyle(1);
      break;
    case "secondary":
      button.setStyle(2);
      break;
    case "success":
      button.setStyle(3);
      break;
    case "danger":
      button.setStyle(4);
      break;
    // case "link":
    //   button.setStyle(5);
    //   break;
  }

  button.setLabel(data.label);

  if (data.emoji) button.setEmoji(data.emoji);
  if (typeof data.disabled === "boolean") button.setDisabled(data.disabled);

  //if (data.style === "link") button.setURL(data.url);
  /*else*/

  return button.data as Partial<Discord.APIButtonComponentWithCustomId>;
}

export default abstract class InteractiveButton {
  abstract data: Partial<Discord.APIButtonComponentWithCustomId>;

  abstract run(
    interaction: Discord.ButtonInteraction,
    bot: Bot
  ): Promise<void>;
}
